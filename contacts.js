import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("./db/","contacts.json");

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  const contactsList = JSON.parse(data);
  return contactsList;
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const requestedContact = contacts.find((contact) => contact.id === contactId);
  if (!requestedContact)
    return console.error("This contact doesn't exist in your phonebook");
    console.log(requestedContact);
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2), {
    encoding: "utf-8",
  });
    console.table(filteredContacts);
};

export const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  
  const updatedContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), {
    encoding: "utf-8",
  });
  console.table(updatedContacts);
};