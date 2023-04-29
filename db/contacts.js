const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}
async function getContactById(id) {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  const result = contacts.find((item) => item.id === id);
  return result || null;
  // ...твій код
}
async function addContact({ name, email, phone }) {
  const { nanoid } = await import("nanoid");
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
  // ...твій код
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
