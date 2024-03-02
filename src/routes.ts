import * as express from "express";
import {ContactsRequest} from "./middlewares/json-data-middleware";
import Contact from "./models/contact";
import {setData} from "./json";

// @ts-ignore
const routes = new express();

routes.get('/', (req: ContactsRequest, res): void => {
  res.render('index', {contacts: req.contacts});
})

routes.get('/add', (req, res): void => {
  res.render('add-form', {contacts: req.contacts});
});

routes.post('/add', async (req: ContactsRequest, res) => {
  const contacts = req.contacts;
  const contact = req.body as Contact;
  contacts.push(contact);
  await setData(contacts);
  res.redirect('/');
})
routes.get('/update', (req, res) => {
  const {phone, name} = req.query;
  const contacts = req.contacts;
  res.render('update-form.hbs', {phone, name, contacts});
});

routes.post('/update', async (req: ContactsRequest, res) => {
  const contacts = req.contacts;
  const contact = req.body as Contact;
  const index = contacts.findIndex(c => c.phone === contact.phone);
  contacts[index] = contact;
  await setData(contacts);
  res.redirect('/');
});

routes.post('/delete', async (req: ContactsRequest, res) => {
  const contacts = req.contacts;
  const {phone} = req.body as Contact;
  const index = contacts.findIndex(c => c.phone === phone);
  contacts.splice(index, 1);
  await setData(contacts);
  res.redirect('/');
})

export default routes;