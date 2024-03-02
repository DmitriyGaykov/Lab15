"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const config_1 = require("./config");
const expHbs = require("express-handlebars");
const routes_1 = require("./routes");
const json_data_middleware_1 = require("./middlewares/json-data-middleware");
const handlebars = require("handlebars");
const fs = require("fs");
async function start() {
    try {
        const app = express();
        registerHbs(app);
        app.use(express.static('public'));
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(json_data_middleware_1.jsonDataMiddleware);
        app.use(routes_1.default);
        await app.listen(config_1.PORT);
        console.log(`Server started on PORT ${config_1.PORT}`);
    }
    catch (e) {
        console.error(e);
    }
}
function registerHbs(app) {
    app.engine('hbs', expHbs.engine({ extname: '.hbs' }));
    app.set('view engine', 'hbs');
    handlebars.registerPartial('field', fs.readFileSync('views/templates/field.hbs', { encoding: 'utf-8' }));
    handlebars.registerPartial('btn', fs.readFileSync('views/templates/btn.hbs', { encoding: 'utf-8' }));
    handlebars.registerPartial('input', fs.readFileSync('views/templates/input.hbs', { encoding: 'utf-8' }));
    handlebars.registerHelper('cancel', function () {
        return new handlebars.SafeString(`
        <button class="btn cancel btn-dark" name="cancel" type="button">
          Cancel
        </button>
        `);
    });
}
start();
