const fastify = require('fastify')({ logger: true });

function* idGenerator() {
  let id = 0;
  for (;;) yield ++id;
}
const bookIds = idGenerator();
const borrowIds = idGenerator();

const listResponse = (data) => ({
  total: data.length,
  limit: data.length,
  skip: 0,
  data,
});

let books = [
  { id: bookIds.next().value, title: 'A Gyűrűk Ura', author: 'J.R.R. Tolkien', year: 1954, available: false, currentBorrower: 'Nagy János' },
  { id: bookIds.next().value, title: 'Harry Potter és a bölcsek köve', author: 'J.K. Rowling', year: 1997, available: false, currentBorrower: 'Kiss Éva' },
  { id: bookIds.next().value, title: 'Száz év magány', author: 'Gabriel García Márquez', year: 1967, available: false, currentBorrower: 'Szabó Péter' },
  { id: bookIds.next().value, title: 'Az öreg halász és a tenger', author: 'Ernest Hemingway', year: 1952, available: true, currentBorrower: null },
  { id: bookIds.next().value, title: '1984', author: 'George Orwell', year: 1949, available: true, currentBorrower: null },
  { id: bookIds.next().value, title: 'A kis herceg', author: 'Antoine de Saint-Exupéry', year: 1943, available: true, currentBorrower: null },
  { id: bookIds.next().value, title: 'Don Quijote', author: 'Miguel de Cervantes', year: 1605, available: true, currentBorrower: null },
  { id: bookIds.next().value, title: 'Bűn és bűnhődés', author: 'Fjodor Dosztojevszkij', year: 1866, available: true, currentBorrower: null },
];

let borrows = [
  { id: borrowIds.next().value, bookId: 1, borrowerName: 'Nagy János', borrowedAt: '2026-05-10T10:00:00.000Z', returnedAt: null },
  { id: borrowIds.next().value, bookId: 2, borrowerName: 'Kiss Éva', borrowedAt: '2026-05-12T14:30:00.000Z', returnedAt: null },
  { id: borrowIds.next().value, bookId: 3, borrowerName: 'Szabó Péter', borrowedAt: '2026-05-15T09:00:00.000Z', returnedAt: null },
];

const PORT = Number(process.env.PORT) || 3032;

const start = async () => {
  await fastify.register(require('@fastify/cors'), {
    origin: 'http://localhost:5173',
  });

  await fastify.register(require('@fastify/swagger'), {
    openapi: {
      info: {
        title: 'Könyvkölcsönző API',
        description: 'REST API könyvkölcsönzés kezeléséhez',
        version: '1.0.0',
      },
    },
  });

  await fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
  });

  fastify.get('/books', async (_request, reply) => {
    return reply.send(listResponse(books));
  });

  fastify.get('/borrows', async (_request, reply) => {
    const records = [...borrows]
      .sort((a, b) => new Date(b.borrowedAt) - new Date(a.borrowedAt))
      .map((borrow) => {
        const book = books.find((b) => b.id === borrow.bookId);
        return {
          ...borrow,
          bookTitle: book?.title ?? '?',
          author: book?.author ?? '?',
        };
      });
    return reply.send(listResponse(records));
  });

  fastify.post('/books/:id/borrows', async (request, reply) => {
    const bookId = parseInt(request.params.id, 10);
    const book = books.find((b) => b.id === bookId);
    if (!book) {
      return reply.status(404).send({ message: `Nincs ilyen könyv: ${request.params.id}` });
    }
    if (!book.available) {
      return reply.status(409).send({ message: 'A könyv már ki van kölcsönözve' });
    }

    const { borrowerName, borrowedAt } = request.body || {};
    if (!borrowerName?.trim()) {
      return reply.status(400).send({ message: 'A kölcsönző neve kötelező' });
    }
    if (!borrowedAt) {
      return reply.status(400).send({ message: 'A kölcsönzés dátuma kötelező' });
    }

    const record = {
      id: borrowIds.next().value,
      bookId,
      borrowerName: borrowerName.trim(),
      borrowedAt: new Date(borrowedAt).toISOString(),
      returnedAt: null,
    };
    borrows.push(record);
    book.available = false;
    book.currentBorrower = record.borrowerName;

    const responseRecord = {
      ...record,
      bookTitle: book.title,
      author: book.author,
    };
    return reply.status(201).send(responseRecord);
  });

  fastify.patch('/borrows/:id', async (request, reply) => {
    const id = parseInt(request.params.id, 10);
    const borrow = borrows.find((b) => b.id === id);
    if (!borrow) {
      return reply.status(404).send({ message: 'Kölcsönzés nem található' });
    }
    if (borrow.returnedAt !== null) {
      return reply.status(400).send({ message: 'Ez a kölcsönzés már le van zárva' });
    }

    const { returnedAt } = request.body || {};
    if (!returnedAt) {
      return reply.status(400).send({ message: 'A visszahozás időpontja (returnedAt) kötelező' });
    }

    borrow.returnedAt = new Date(returnedAt).toISOString();
    const book = books.find((b) => b.id === borrow.bookId);
    if (book) {
      book.available = true;
      book.currentBorrower = null;
    }

    const responseRecord = {
      ...borrow,
      bookTitle: book?.title ?? '?',
      author: book?.author ?? '?',
    };
    return reply.send(responseRecord);
  });

  console.log('Memória DB – újraindításkor az adatok visszaállnak.');
  console.log(`Könyvek száma: ${books.length}`);

  await fastify.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`Könyvkölcsönző API – http://localhost:${PORT}`);
  console.log(`OpenAPI (Swagger UI) – http://localhost:${PORT}/docs`);
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
