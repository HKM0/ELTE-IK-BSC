const {fakerHU: faker} = require("@faker-js/faker");
for (let i = 0; i <10; i++){
    console.log(faker.person.fullName())
    console.log(faker.location.city())
}