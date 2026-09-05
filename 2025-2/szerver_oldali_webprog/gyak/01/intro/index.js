const { fakerHU: faker } = require('@faker-js/faker');
for (let i = 0; i < 10; i++) {
    console.log(faker.person.fullName())
    console.log(faker.location.city())
    console.log(faker.internet.email());
    console.log(faker.lorem.paragraph());
    console.log(faker.person.jobTitle());
    console.log(faker.internet.password());
    console.log(faker.location.street());
    console.log(faker.phone.number());
}