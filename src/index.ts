// Define base types
interface BasePerson {
          id: number;
          name: string;
          type: string;
}

interface User extends BasePerson {
          type: 'user';
          email: string;
          role: string;
}

interface Admin extends BasePerson {
          type: 'admin';
          accessLevel: number;
          department: string;
}

// Type guards
function isUser(person: BasePerson): person is User {
          return person.type === 'user';
}

function isAdmin(person: BasePerson): person is Admin {
          return person.type === 'admin';
}

// Criteria types (excluding 'type' field)
type UserCriteria = Partial<Omit<User, 'type'>>;
type AdminCriteria = Partial<Omit<Admin, 'type'>>;

// Overloaded function signatures
function filterPersons(persons: (User | Admin)[], personType: 'user', criteria: UserCriteria): User[];
function filterPersons(persons: (User | Admin)[], personType: 'admin', criteria: AdminCriteria): Admin[];
function filterPersons(
          persons: (User | Admin)[],
          personType: 'user' | 'admin',
          criteria: UserCriteria | AdminCriteria
): (User | Admin)[] {
          return persons
                    .filter(person => {
                              if (personType === 'user' && isUser(person)) {
                                        return Object.entries(criteria).every(([key, value]) => {
                                                  return person[key as keyof User] === value;
                                        });
                              }
                              if (personType === 'admin' && isAdmin(person)) {
                                        return Object.entries(criteria).every(([key, value]) => {
                                                  return person[key as keyof Admin] === value;
                                        });
                              }
                              return false;
                    });
}

// Example usage:
const persons: (User | Admin)[] = [
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

// Filter users
const developers = filterPersons(persons, "user", { role: "developer" });
developers.forEach(person => {
          console.log(`${person.name} is ${isUser(person) ? 'User' : 'Admin'}`);
});

// Filter admins
const itAdmins = filterPersons(persons, "admin", { department: "IT" });
itAdmins.forEach(person => {
          console.log(`${person.name} is ${isAdmin(person) ? 'Admin' : 'User'}`);
});