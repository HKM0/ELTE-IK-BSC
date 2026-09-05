import { faker } from "@faker-js/faker";

const random = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

const radioList = {
  "Klasszik rádió": [],
  "Bartók rádió": [],
  "Retro rádió": [],
  "Mária rádió": [],
  "Jazzy rádió": [],
  "Petőfi rádió": [],
};

const genProgram = () => {
  return {
    timestamp: new Date().toLocaleString(),
    name: `(${faker.music.genre()}) ${faker.name.findName()}: ${faker.random.words()}`,
  };
};

const addRandomProgram = () => {
  const radioChannels = Object.keys(radioList);
  const randomChannel = radioChannels[random(0, radioChannels.length - 1)];
  const program = genProgram();
  radioList[randomChannel].push(program);
  return {
    radio: randomChannel,
    program,
  };
};

const initialFill = () => {
  for (let i = 0; i < 20; i++) {
    addRandomProgram();
  }
};

initialFill();

const sendProgram = (io) => {
  setTimeout(() => {
    const { radio, program } = addRandomProgram();
    io.to(radio).emit("program-added", {
      radio,
      program: program.name,
    });
    console.log(radio, program);
    sendProgram(io);
  }, random(3, 5) * 1000);
};

export const radios = (io) => {
  io.on("connection", (socket) => {
    console.log("Radios: client connected", socket.id);

    const radioChannels = Object.keys(radioList);

    socket.on("list-radios", () => {
      socket.emit("radios-listed", radioChannels);
    });

    socket.on("join-radio", (radio) => {
      try {
        // nincs ilyen szoba
        const allRooms = io.sockets.adapter.rooms;
        if (!Object.keys(radioList).includes(radio)) {
          throw new Error("No such radio on the socket.io server.");
        }

        // Már a szobában van a kliens
        if (socket.rooms.has(radio)) {
          throw new Error("The client has already joined to this radio.");
        }

        socket.join(radio);
        io.to(radio).emit("counter-updated", {
          radio,
          counter: allRooms.get(radio).size,
        });

        // visszaadás
        socket.emit("radio-joined", {
          radio,
          program: radioList[radio][radioList[radio].length - 1]?.name,
        });
      } catch (e) {
        socket.emit("error", e.message);
      }
    });

    socket.on("leave-radio", async (radio) => {
      try {
        // nincs ilyen szoba
        const allRooms = io.sockets.adapter.rooms;
        if (!Object.keys(radioList).includes(radio)) {
          throw new Error("No such radio on the socket.io server.");
        }

        // Nincs a szobában a kliens
        if (!socket.rooms.has(radio)) {
          throw new Error("The client is not in this room.");
        }

        // broadcast
        socket.leave(radio);
        io.to(radio).emit("counter-updated", allRooms.get(radio)?.size || 0);

        socket.emit("radio-left", radio);
      } catch (e) {
        socket.emit("error", e.message);
      }
    });
  });
  sendProgram(io);
};
