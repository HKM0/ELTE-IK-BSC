const path = require('path');
const fastify = require('fastify')({ logger: true });
const chalk = require('chalk');
const readline = require('readline');

function* idGenerator() {
  let id = 0;
  for (;;) yield ++id;
}
const spotIds = idGenerator();
const sessionIds = idGenerator();

const FLOOR_LEVELS = [-1, -2, -3];
const SPOTS_PER_FLOOR = 8;
const COLS_PER_ROW = 4;

const initialSpots = [];
for (const floor of FLOOR_LEVELS) {
  for (let place = 1; place <= SPOTS_PER_FLOOR; place++) {
    const col = ((place - 1) % COLS_PER_ROW) + 1;
    const row = Math.floor((place - 1) / COLS_PER_ROW) + 1;
    initialSpots.push({
      floor,
      place,
      code: `${floor}-${String(place).padStart(2, '0')}`,
      row,
      col,
    });
  }
}

const randomPastDate = (daysAgoMax) => {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysAgoMax) - 1);
  return d.toISOString();
};

let spots = initialSpots.map((s, index) => ({
  id: spotIds.next().value,
  code: s.code,
  floor: s.floor,
  place: s.place,
  row: s.row,
  col: s.col,
  status: index < 5 ? 'occupied' : 'free',
  currentPlate: index < 5 ? `ABC-${100 + index}` : null,
}));

let sessions = [];

const syncSpot = (spotId) => {
  const spot = spots.find((s) => s.id === spotId);
  if (!spot) return;
  const active = sessions.find((s) => s.spotId === spotId && s.leftAt === null);
  if (active) {
    spot.status = 'occupied';
    spot.currentPlate = active.plate;
  } else {
    spot.status = 'free';
    spot.currentPlate = null;
  }
};

const seedSessions = () => {
  spots.forEach((spot) => {
    const historyCount = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < historyCount; i++) {
      const parkedAt = randomPastDate(30);
      const leftAt = new Date(parkedAt);
      leftAt.setHours(leftAt.getHours() + 2 + i);
      sessions.push({
        id: sessionIds.next().value,
        spotId: spot.id,
        plate: `HIS-${spot.id}${i}`,
        parkedAt,
        leftAt: leftAt.toISOString(),
        notes: `Korábbi parkolás (${spot.code})`,
      });
    }
    if (spot.status === 'occupied') {
      sessions.push({
        id: sessionIds.next().value,
        spotId: spot.id,
        plate: spot.currentPlate,
        parkedAt: randomPastDate(2),
        leftAt: null,
        notes: 'Aktív parkolás',
      });
    }
  });
};

seedSessions();

const listResponse = (data) => ({
  total: data.length,
  limit: data.length,
  skip: 0,
  data,
});

const sessionWithSpot = (session) => {
  const spot = spots.find((s) => s.id === session.spotId);
  return {
    ...session,
    spotCode: spot?.code ?? '?',
    floor: spot?.floor ?? null,
  };
};

const PORT = Number(process.env.PORT) || 3031;

const start = async () => {
  await fastify.register(require('@fastify/cors'), {
    origin: 'http://localhost:5173',
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

  fastify.get('/spots', async (_request, reply) => {
    return reply.send(listResponse(spots));
  });

  fastify.get('/sessions', async (_request, reply) => {
    const records = [...sessions]
      .sort((a, b) => new Date(b.parkedAt) - new Date(a.parkedAt))
      .map(sessionWithSpot);
    return reply.send(listResponse(records));
  });

  fastify.post('/spots/:id/sessions', async (request, reply) => {
    const spotId = parseInt(request.params.id, 10);
    const spot = spots.find((s) => s.id === spotId);
    if (!spot) {
      return reply.status(404).send({ message: `Nincs ilyen hely: ${request.params.id}` });
    }

    const hasActive = sessions.some((s) => s.spotId === spotId && s.leftAt === null);
    if (hasActive) {
      return reply.status(409).send({ message: 'A hely már foglalt' });
    }

    const { plate, parkedAt, notes } = request.body || {};
    if (!plate?.trim()) {
      return reply.status(400).send({ message: 'A rendszám kötelező' });
    }
    if (!parkedAt) {
      return reply.status(400).send({ message: 'A parkolás kezdete kötelező' });
    }

    const record = {
      id: sessionIds.next().value,
      spotId,
      plate: plate.trim().toUpperCase(),
      parkedAt: new Date(parkedAt).toISOString(),
      leftAt: null,
      notes: notes?.toString() || '',
    };
    sessions.push(record);
    syncSpot(spotId);
    return reply.status(201).send(sessionWithSpot(record));
  });

  fastify.patch('/sessions/:spotId', async (request, reply) => {
    const spotId = parseInt(request.params.spotId, 10);
    const spot = spots.find((s) => s.id === spotId);
    if (!spot) {
      return reply.status(404).send({ message: `Nincs ilyen hely: ${request.params.spotId}` });
    }

    const session = sessions.find((s) => s.spotId === spotId && s.leftAt === null);
    if (!session) {
      return reply.status(404).send({ message: 'Nincs aktív parkolás ezen a helyen' });
    }

    const { leftAt, notes } = request.body || {};
    if (!leftAt) {
      return reply.status(400).send({ message: 'A távozás időpontja (leftAt) kötelező' });
    }

    session.leftAt = new Date(leftAt).toISOString();
    if (notes !== undefined) {
      session.notes = notes.toString();
    }
    syncSpot(spotId);
    return reply.send(sessionWithSpot(session));
  });

  console.log(
    chalk.blue('Memória DB – újraindításkor az adatok visszaállnak.'),
  );
  console.log(chalk.yellow(`Parkolóhelyek: ${chalk.white(spots.length)}`));

  await fastify.listen({ port: PORT, host: '0.0.0.0' });
  console.log(chalk.green(`Parking API – http://localhost:${PORT}`));
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
    console.table(spots);
    console.table(sessions);
  }
});
