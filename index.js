// index.js
const argv = require("yargs").argv;
const contacts = require("./db/contacts");

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      // ...
      break;

    case "get":
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      // ... id
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      // ... name email phone
      break;

    case "remove":
      const deliteContacts = await contacts.removeContact(id);
      console.log(deliteContacts);
      // ... id
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
