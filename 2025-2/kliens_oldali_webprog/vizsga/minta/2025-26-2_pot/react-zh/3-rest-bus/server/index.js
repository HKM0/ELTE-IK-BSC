const path = require('path');
const fastify = require('fastify')({ logger: true });
const chalk = require('chalk');
const readline = require('readline');

function* idGenerator() {
  let id = 0;
  for (;;) yield ++id;
}
const ticketIds = idGenerator();
const activationIds = idGenerator();

const DURATIONS = {
  single: 90 * 60 * 1000,
  '24h': 24 * 60 * 60 * 1000,
  '72h': 72 * 60 * 60 * 1000,
};

const msAgo = (ms) => new Date(Date.now() - ms).toISOString();
const minsAgo = (m) => msAgo(m * 60 * 1000);
const hoursAgo = (h) => msAgo(h * 3600 * 1000);
const daysAgo = (d) => msAgo(d * 24 * 3600 * 1000);

const withStatus = (t) => {
  if (!t.activatedAt) return { ...t, status: 'unused', expiresAt: null };
  const exp = new Date(new Date(t.activatedAt).getTime() + DURATIONS[t.type]);
  return {
    ...t,
    status: exp > new Date() ? 'active' : 'expired',
    expiresAt: exp.toISOString(),
  };
};

const listResponse = (data) => ({
  total: data.length,
  limit: data.length,
  skip: 0,
  data,
});

let tickets = [
  // unused
  { id: ticketIds.next().value, type: 'single', buyerName: 'Kiss Péter',     purchasedAt: daysAgo(2),      activatedAt: null },
  { id: ticketIds.next().value, type: '24h',    buyerName: 'Nagy Zsuzsa',    purchasedAt: daysAgo(1),      activatedAt: null },
  // active
  { id: ticketIds.next().value, type: 'single', buyerName: 'Varga Erzsébet', purchasedAt: hoursAgo(1),     activatedAt: minsAgo(30)  },
  { id: ticketIds.next().value, type: '24h',    buyerName: 'Tóth László',    purchasedAt: hoursAgo(8),     activatedAt: hoursAgo(6)  },
  // expired
  { id: ticketIds.next().value, type: 'single', buyerName: 'Pap István',     purchasedAt: hoursAgo(3),     activatedAt: hoursAgo(2)  },
  { id: ticketIds.next().value, type: '24h',    buyerName: 'Balogh Júlia',   purchasedAt: daysAgo(3),      activatedAt: daysAgo(2)   },

];

let activations = tickets
  .filter((t) => t.activatedAt !== null)
  .sort((a, b) => new Date(b.activatedAt) - new Date(a.activatedAt))
  .map((t) => ({
    id: activationIds.next().value,
    ticketId: t.id,
    buyerName: t.buyerName,
    type: t.type,
    activatedAt: t.activatedAt,
  }));

const PORT = Number(process.env.PORT) || 3032;

const start = async () => {
  await fastify.register(require('@fastify/cors'), {
    origin: true,
  });

  await fastify.register(require('@fastify/swagger'), {
    mode: 'static',
    specification: {
      path: path.join(__dirname, 'openapi.yaml'),
      baseDir: __dirname,
    },
  });

  await fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
  });

  fastify.get('/tickets', async (_request, reply) => {
    const sorted = [...tickets].sort((a, b) => a.id - b.id);
    return reply.send(listResponse(sorted.map(withStatus)));
  });

  fastify.post('/tickets', async (request, reply) => {
    const { buyerName, type, purchasedAt } = request.body || {};

    if (!buyerName?.trim()) {
      return reply.status(400).send({ message: 'Az utas neve kötelező' });
    }
    if (!['single', '24h', '72h'].includes(type)) {
      return reply.status(400).send({ message: 'Érvénytelen jegytípus' });
    }
    if (!purchasedAt) {
      return reply.status(400).send({ message: 'A vásárlás időpontja kötelező' });
    }

    const ticket = {
      id: ticketIds.next().value,
      type,
      buyerName: buyerName.trim(),
      purchasedAt: new Date(purchasedAt).toISOString(),
      activatedAt: null,
    };
    tickets.push(ticket);
    return reply.status(201).send(withStatus(ticket));
  });

  fastify.patch('/tickets/:id/activate', async (request, reply) => {
    const id = parseInt(request.params.id, 10);
    const ticket = tickets.find((t) => t.id === id);

    if (!ticket) {
      return reply.status(404).send({ message: `Nincs ilyen jegy: ${id}` });
    }
    if (ticket.activatedAt !== null) {
      return reply.status(409).send({ message: 'A jegy már érvényesítve van' });
    }

    const { activatedAt } = request.body || {};
    if (!activatedAt) {
      return reply.status(400).send({ message: 'Az érvényesítés időpontja (activatedAt) kötelező' });
    }

    ticket.activatedAt = new Date(activatedAt).toISOString();
    activations.unshift({
      id: activationIds.next().value,
      ticketId: ticket.id,
      buyerName: ticket.buyerName,
      type: ticket.type,
      activatedAt: ticket.activatedAt,
    });

    return reply.send(withStatus(ticket));
  });

  fastify.get('/activations', async (_request, reply) => {
    const sorted = [...activations].sort(
      (a, b) => new Date(b.activatedAt) - new Date(a.activatedAt),
    );
    return reply.send(listResponse(sorted));
  });

  console.log(chalk.blue('Memória DB – újraindításkor az adatok visszaállnak.'));
  console.log(chalk.yellow(`Jegyek: ${chalk.white(tickets.length)}`));

  await fastify.listen({ port: PORT, host: '0.0.0.0' });
  console.log(chalk.green(`Bus Ticket API – http://localhost:${PORT}`));
  console.log(chalk.green(`OpenAPI (Swagger UI) – http://localhost:${PORT}/docs`));
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);
process.stdin.on('keypress', (_chunk, key) => {
  if (key.ctrl && (key.name === 'c' || key.name === 'd')) {
    process.exit();
  }
  if (key.name === 'return') {
    console.table(tickets.map(withStatus));
    console.table(activations);
  }
});
