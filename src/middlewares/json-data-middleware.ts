import {readData, setData} from "../json";
import Contact from "../models/contact";

export async function jsonDataMiddleware(req, res, next) {
  req.contacts = await readData();
  next();
}

export type ContactsRequest = Request & {contacts: Contact[]};