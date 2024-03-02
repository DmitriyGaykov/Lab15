"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const json_1 = require("./json");
// @ts-ignore
const routes = new express();
routes.get('/', (req, res) => {
    res.render('index', { contacts: req.contacts });
});
routes.get('/add', (req, res) => {
    res.render('add-form', { contacts: req.contacts });
});
routes.post('/add', async (req, res) => {
    const contacts = req.contacts;
    const contact = req.body;
    contacts.push(contact);
    await (0, json_1.setData)(contacts);
    res.redirect('/');
});
routes.get('/update', (req, res) => {
    const { phone, name } = req.query;
    const contacts = req.contacts;
    res.render('update-form.hbs', { phone, name, contacts });
});
routes.post('/update', async (req, res) => {
    const contacts = req.contacts;
    const contact = req.body;
    const index = contacts.findIndex(c => c.phone === contact.phone);
    contacts[index] = contact;
    await (0, json_1.setData)(contacts);
    res.redirect('/');
});
routes.post('/delete', async (req, res) => {
    const contacts = req.contacts;
    const { phone } = req.body;
    const index = contacts.findIndex(c => c.phone === phone);
    contacts.splice(index, 1);
    await (0, json_1.setData)(contacts);
    res.redirect('/');
});
exports.default = routes;
