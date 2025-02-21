"use strict";
function isUser(person) {
    return person.type === 'user';
}
function isAdmin(person) {
    return person.type === 'admin';
}
function filterPersons(persons, personType, criteria) {
    return persons
        .filter(person => {
        if (personType === 'user' && isUser(person)) {
            return Object.entries(criteria).every(([key, value]) => {
                return person[key] === value;
            });
        }
        if (personType === 'admin' && isAdmin(person)) {
            return Object.entries(criteria).every(([key, value]) => {
                return person[key] === value;
            });
        }
        return false;
    });
}
const persons = [
    {
        id: 1,
        name: "John",
        type: "user",
        email: "john@example.com",
        role: "developer"
    },
    {
        id: 2,
        name: "Jane",
        type: "admin",
        accessLevel: 5,
        department: "IT"
    },
    {
        id: 3,
        name: "Bob",
        type: "user",
        email: "bob@example.com",
        role: "designer"
    }
];
const developers = filterPersons(persons, "user", { role: "developer" });
developers.forEach(person => {
    console.log(`${person.name} is ${isUser(person) ? 'User' : 'Admin'}`);
});
const itAdmins = filterPersons(persons, "admin", { department: "IT" });
itAdmins.forEach(person => {
    console.log(`${person.name} is ${isAdmin(person) ? 'Admin' : 'User'}`);
});
//# sourceMappingURL=index.js.map