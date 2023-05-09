import * as Contacts from "./contacts.js";
import * as commander from "commander";

commander.program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

commander.program.parse(process.argv);

const argv = commander.program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
       const contacts = Contacts.listContacts();
       console.table(contacts);
      break;

    case "get":
      const requestedContact = Contacts.getContactById(id);
      console.log(requestedContact);
      break;

    case "add":
      Contacts.addContact(name, email, phone);
      break;

    case "remove":
      Contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
