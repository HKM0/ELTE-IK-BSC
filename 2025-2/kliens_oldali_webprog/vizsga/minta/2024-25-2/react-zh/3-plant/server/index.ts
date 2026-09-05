// @ts-nocheck
import Fastify from "fastify";
import chalk from "chalk";
import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";
import fastifyStatic from "@fastify/static";
import fastifyCors from "@fastify/cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
    logger: true
});

const dataToEntity = (fields, _id = null) => {
    try {
        const entity = {
            id: parseInt(_id ?? idGenerator.next().value),
            name: fields.name.toString(),
            species: fields.species.toString(),
            waterFrequency: fields.waterFrequency.toString(),
            wateringIntervalDays: parseInt(fields.wateringIntervalDays),
            sunlight: fields.sunlight.toString(),
            description: fields.description ? fields.description.toString() : null,
            imageUrl: fields.imageUrl ? fields.imageUrl.toString() : null,
            lastWateredAt: null,
            nextWateringOn: null,
            isWatered: false,
            createdAt: _id
                ? db.find((ent) => ent.id === parseInt(_id))?.createdAt
                : new Date(),
            updatedAt: new Date()
        };
        return entity;
    } catch (e) {
        throw Error("Unable to parse given data to database entry!");
    }
};

function* _idGenerator() {
    let id = 0;
    for (;;) yield ++id;
}
const idGenerator = _idGenerator();

// Register static file serving
fastify.register(fastifyStatic, {
    root: path.join(__dirname, "public"),
    prefix: "/"
});

// Initial plants data with both waterFrequency (string) and wateringIntervalDays (integer)
const initialPlants = [
    {
        name: 'Peace Lily',
        species: 'Spathiphyllum',
        waterFrequency: 'Daily',
        wateringIntervalDays: 1,
        sunlight: 'Low to medium indirect',
        description: 'Produces elegant white flowers and requires consistent moisture. Droops dramatically when thirsty.',
        imageUrl: 'http://localhost:3030/peace-lily.png'
    },
    {
        name: 'Boston Fern',
        species: 'Nephrolepis exaltata',
        waterFrequency: 'Every 2-3 days',
        wateringIntervalDays: 2,
        sunlight: 'Medium indirect',
        description: 'Loves humidity and needs frequent watering to maintain lush fronds.',
        imageUrl: 'http://localhost:3030/boston-fern.png'
    },
    {
        name: 'Pothos',
        species: 'Epipremnum aureum',
        waterFrequency: 'Weekly',
        wateringIntervalDays: 7,
        sunlight: 'Low to bright indirect',
        description: 'A trailing vine plant that\'s very easy to propagate and grow. Can tolerate some drought.',
        imageUrl: 'http://localhost:3030/pothos.png'
    },
    {
        name: 'Monstera Deliciosa',
        species: 'Monstera deliciosa',
        waterFrequency: 'Every 7-10 days',
        wateringIntervalDays: 8,
        sunlight: 'Medium to bright indirect',
        description: 'Famous for its unique leaf holes and splits, also called Swiss Cheese Plant.',
        imageUrl: 'http://localhost:3030/monstera.png'
    },
    {
        name: 'Snake Plant',
        species: 'Sansevieria trifasciata',
        waterFrequency: 'Every 2-3 weeks',
        wateringIntervalDays: 14,
        sunlight: 'Low to bright indirect',
        description: 'Extremely drought-tolerant and perfect for beginners. Rarely needs watering.',
        imageUrl: 'http://localhost:3030/snake-plant.png'
    },
    {
        name: 'ZZ Plant',
        species: 'Zamioculcas zamiifolia',
        waterFrequency: 'Every 3-4 weeks',
        wateringIntervalDays: 21,
        sunlight: 'Low to bright indirect',
        description: 'An extremely hardy plant that can tolerate neglect and very infrequent watering.',
        imageUrl: 'http://localhost:3030/zz-plant.png'
    },
    {
        name: 'Calathea Orbifolia',
        species: 'Calathea orbifolia',
        waterFrequency: 'Every 4-5 days',
        wateringIntervalDays: 4,
        sunlight: 'Medium indirect',
        description: 'Known for striking round leaves with silver stripes. Likes consistent moisture.',
        imageUrl: 'http://localhost:3030/calathea.png'
    },
    {
        name: 'Cacti Mix',
        species: 'Various cacti',
        waterFrequency: 'Every 4-6 weeks',
        wateringIntervalDays: 30,
        sunlight: 'Bright direct',
        description: 'Desert plants that store water in their tissues. Extremely drought-tolerant.',
        imageUrl: 'http://localhost:3030/cacti.png'
    }
];

// Function to generate random date between two dates
const randomDateBetween = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Function to generate 3-5 random watering dates going back from a given date
const generateWateringHistory = (plant, count) => {
    const wateringRecords = [];
    const now = new Date();
    // Start 60 days ago 
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 60);
    
    let lastDate = new Date(now);
    
    // Generate records from newest to oldest
    for (let i = 0; i < count; i++) {
        // For the first record (most recent), use a random recent date
        const wateringDate = randomDateBetween(
            i === 0 ? new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) : startDate, 
            lastDate
        );
        
        wateringRecords.push({
            lastWateredAt: wateringDate.toISOString(),
            isWatered: true, // All historical records are completed waterings
            notes: `${i === 0 ? 'Latest' : 'Regular'} watering for ${plant.name}`
        });
        
        // Set this date as the upper bound for the next record
        // Subtract at least 3 days for the next watering record
        lastDate = new Date(wateringDate);
        lastDate.setDate(lastDate.getDate() - Math.floor(Math.random() * 7) - 3);
    }
    
    return wateringRecords;
};

// Initialize database with plants and their watering history
let db = initialPlants.map((plant, index) => {
    const entity = dataToEntity(plant);
    // Generate 3-5 random watering records for this plant
    const recordCount = Math.floor(Math.random() * 3) + 3; // 3-5 records
    let wateringRecords = generateWateringHistory(plant, recordCount);
    // Sort watering history by most recent first
    wateringRecords.sort((a, b) => new Date(b.lastWateredAt) - new Date(a.lastWateredAt));
    if (index < 2) {
        // First 2 plants: need watering today
        const customDate = new Date();
        customDate.setDate(customDate.getDate() - plant.wateringIntervalDays);
        wateringRecords[0].lastWateredAt = customDate.toISOString();
        entity.isWatered = false;
    } else if (index < 6) {
        // Next 4 plants: overdue for a couple days
        const customDate = new Date();
        customDate.setDate(customDate.getDate() - plant.wateringIntervalDays - (Math.floor(Math.random() * 3) + 2)); // 2-4 days overdue
        wateringRecords[0].lastWateredAt = customDate.toISOString();
        entity.isWatered = false;
    } else {
        // Last 2 plants: freshly watered
        const now = new Date();
        wateringRecords[0].lastWateredAt = now.toISOString();
        entity.isWatered = true;
    }
    // Set the plant's watering status based on the most recent watering
    if (wateringRecords.length > 0) {
        wateringRecords.sort((a, b) => new Date(b.lastWateredAt).getTime() - new Date(a.lastWateredAt).getTime());
        const lastWatering = new Date(wateringRecords[0].lastWateredAt);
        entity.lastWateredAt = lastWatering.toISOString();
        // Calculate next watering date using wateringIntervalDays
        const nextWatering = new Date(lastWatering);
        nextWatering.setDate(nextWatering.getDate() + plant.wateringIntervalDays);
        entity.nextWateringOn = nextWatering.toISOString();
    }
    return entity;
});

// In-memory watering records
let wateringDb = [];
let wateringIdCounter = 1;

// Add watering records for each plant on startup (simulate seed.ts logic)
db.forEach(plant => {
    // Generate 3-5 random watering records for this plant
    const recordCount = Math.floor(Math.random() * 3) + 3;
    const generateWateringHistory = (plant, count) => {
        const wateringRecords = [];
        const now = new Date();
        const startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 60);
        let lastDate = new Date(now);
        for (let i = 0; i < count; i++) {
            const wateringDate = new Date(startDate.getTime() + Math.random() * (lastDate.getTime() - startDate.getTime()));
            wateringRecords.push({
                id: wateringIdCounter++,
                plantId: plant.id,
                lastWateredAt: wateringDate.toISOString(),
                isWatered: true,
                notes: `${i === 0 ? 'Latest' : 'Regular'} watering for ${plant.name}`
            });
            lastDate = new Date(wateringDate);
            lastDate.setDate(lastDate.getDate() - Math.floor(Math.random() * 7) - 3);
        }
        return wateringRecords;
    };
    wateringDb.push(...generateWateringHistory(plant, recordCount));
});

console.log(
    chalk.blue(
        `A backend az egyszerűség kedvéért memóriában tárolja az adatokat, tehát leállításkor vagy újraindításkor az eddigi változások elvesznek!`
    )
);
console.log(
    chalk.yellow(
        `Az adatbázisban jelenleg ${chalk.white(
            db.length
        )} növény van.`
    )
);
console.log(
    chalk.yellow(
        `Az ${chalk.white(
            "ENTER"
        )} billentyű lenyomásával bármikor belenézhetsz az aktuálisan tárolt adatokba.`
    )
);

// GET all plants (FeathersJS style)
fastify.get("/plants", async (request, reply) => {
    return reply.send({
        total: db.length,
        limit: db.length,
        skip: 0,
        data: db
    });
});

// GET single plant
fastify.get("/plants/:id", async (request, reply) => {
    const plant = db.find((p) => p.id === parseInt(request.params.id));
    if (!plant) {
        return reply.status(404).send(`No plant found with ID ${request.params.id}`);
    }
    return reply.send(plant);
});

// POST new plant
fastify.post(
    "/plants",
    {
        schema: {
            body: {
                type: "object",
                required: ["name", "species", "waterFrequency", "sunlight"],
                properties: {
                    name: { type: "string" },
                    species: { type: "string" },
                    waterFrequency: { type: "string" },
                    sunlight: { type: "string" },
                    description: { type: "string", nullable: true },
                    imageUrl: { type: "string", nullable: true }
                }
            }
        }
    },
    async (request, reply) => {
        try {
            const entity = dataToEntity(request.body);
            db.push(entity);
            return reply.status(201).send(entity);
        } catch (e) {
            console.log(chalk.red("A növény létrehozása nem sikerült!"));
            return reply.status(400).send("Error creating plant.");
        }
    }
);

// PATCH plant
fastify.patch(
    "/plants/:id",
    {
        schema: {
            body: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    species: { type: "string" },
                    waterFrequency: { type: "string" },
                    sunlight: { type: "string" },
                    description: { type: "string", nullable: true },
                    imageUrl: { type: "string", nullable: true }
                }
            },
            params: {
                type: "object",
                properties: {
                    id: { type: "integer" }
                }
            }
        }
    },
    async (request, reply) => {
        try {
            const plant = db.find((p) => p.id === parseInt(request.params.id));
            if (!plant) {
                return reply.status(404).send(`No plant found with ID ${request.params.id}`);
            }

            const updatedPlant = dataToEntity(
                {
                    name: request.body.name ?? plant.name,
                    species: request.body.species ?? plant.species,
                    waterFrequency: request.body.waterFrequency ?? plant.waterFrequency,
                    wateringIntervalDays: parseInt(request.body.wateringIntervalDays) ?? plant.wateringIntervalDays,
                    sunlight: request.body.sunlight ?? plant.sunlight,
                    description: request.body.description ?? plant.description,
                    imageUrl: request.body.imageUrl ?? plant.imageUrl
                },
                request.params.id
            );

            db = db.map(p => p.id === parseInt(request.params.id) ? updatedPlant : p);
            return reply.send(updatedPlant);
        } catch (e) {
            console.log(chalk.red("A növény módosítása nem sikerült!"));
            return reply.status(400).send("Error updating plant.");
        }
    }
);

// DELETE plant
fastify.delete(
    "/plants/:id",
    {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "integer" }
                }
            }
        }
    },
    async (request, reply) => {
        const count = db.reduce(
            (counter, plant) => counter + (plant.id === parseInt(request.params.id) ? 1 : 0),
            0
        );
        db = db.filter((plant) => plant.id !== parseInt(request.params.id));
        return reply.send(count);
    }
);

// Water plant
fastify.post(
    "/plants/:id/water",
    {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "integer" }
                }
            }
        }
    },
    async (request, reply) => {
        const plant = db.find((p) => p.id === parseInt(request.params.id));
        if (!plant) {
            return reply.status(404).send(`No plant found with ID ${request.params.id}`);
        }

        const now = new Date();
        plant.lastWateredAt = now.toISOString();
        plant.isWatered = true;

        // Calculate next watering date using waterFrequency
        const nextWatering = new Date(now);
        nextWatering.setDate(nextWatering.getDate() + plant.wateringIntervalDays);
        plant.nextWateringOn = nextWatering.toISOString();

        db = db.map(p => p.id === parseInt(request.params.id) ? plant : p);
        return reply.send(plant);
    }
);

// GET watering records for a plant (FeathersJS style)
fastify.get('/plants/:id/waterings', async (request, reply) => {
    const plantId = parseInt(request.params.id);
    let records = wateringDb.filter(w => w.plantId === plantId);
    // Sort by most recent first
    records = records.sort((a, b) => new Date(b.lastWateredAt) - new Date(a.lastWateredAt));
    return reply.send({
        total: records.length,
        limit: records.length,
        skip: 0,
        data: records
    });
});

// POST new watering record for a plant
fastify.post('/plants/:id/waterings', async (request, reply) => {
    const plantId = parseInt(request.params.id);
    const { lastWateredAt, isWatered, notes } = request.body;
    const record = {
        id: wateringIdCounter++,
        plantId,
        lastWateredAt: lastWateredAt || new Date().toISOString(),
        isWatered: isWatered !== undefined ? isWatered : true,
        notes: notes || ''
    };
    wateringDb.push(record);
    const plant = db.find(p => p.id === plantId);
    if (plant) {
        plant.isWatered = true;
        plant.lastWateredAt = record.lastWateredAt;
        const last = new Date(record.lastWateredAt);
        const next = new Date(last);
        next.setDate(last.getDate() + plant.wateringIntervalDays);
        plant.nextWateringOn = next.toISOString();
    }
    return reply.status(201).send(record);
});

// DELETE watering record
fastify.delete('/waterings/:wateringId', async (request, reply) => {
    const { wateringId } = request.params;
    const idx = wateringDb.findIndex(w => w.id == wateringId);
    if (idx === -1) {
        return reply.status(404).send({ message: 'Watering record not found' });
    }
    const [deleted] = wateringDb.splice(idx, 1);
    // Update plant's watering info
    const plant = db.find(p => p.id === deleted.plantId);
    if (plant) {
        const plantWaterings = wateringDb.filter(w => w.plantId === plant.id);
        if (plantWaterings.length > 0) {
            // Find the most recent watering
            plantWaterings.sort((a, b) => new Date(b.lastWateredAt) - new Date(a.lastWateredAt));
            const last = new Date(plantWaterings[0].lastWateredAt);
            plant.lastWateredAt = last.toISOString();
            plant.isWatered = true;
            const next = new Date(last);
            next.setDate(last.getDate() + plant.wateringIntervalDays);
            plant.nextWateringOn = next.toISOString();
        } else {
            plant.lastWateredAt = null;
            plant.nextWateringOn = null;
            plant.isWatered = false;
        }
    }
    return reply.send(deleted);
});

// Enable CORS
fastify.register(fastifyCors, {
    origin: "http://localhost:5173"
});

// Start server
fastify.listen({ port: 3030 }, (err, _address) => {
    if (err) throw err;
    console.log(
        chalk.green(`A Fastify kiszolgáló elindult - http://localhost:3030`)
    );
});

// Handle keyboard input
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);
process.stdin.on("keypress", (chunk, key) => {
    if (key.ctrl && (key.name === "c" || key.name === "d")) {
        console.log(chalk.blue("A szerver leáll."));
        process.exit();
    } else if (key.name === "return") {
        console.log(
            `\nA tárolt növények ${new Date().toLocaleString("hu-hu")}-kor:`
        );
        console.table(db);
        console.log();
    }
}); 