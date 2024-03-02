import * as express from 'express';
import {PORT} from "./config";
import {Express} from "express";
import * as expHbs from 'express-handlebars';
import routes from "./routes";
import {jsonDataMiddleware} from "./middlewares/json-data-middleware";
import * as handlebars from "handlebars";
import * as fs from "fs";

async function start(): Promise<void> {
  try {
    const app = express();
    registerHbs(app);

    app.use(express.static('public'));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(jsonDataMiddleware);

    app.use(routes);
    await app.listen(PORT);
    console.log(`Server started on PORT ${PORT}`);
  } catch (e) {
    console.error(e);
  }
}

function registerHbs(app: Express): void {
  app.engine('hbs', expHbs.engine({extname: '.hbs'}));
  app.set('view engine', 'hbs');

  handlebars.registerPartial(
    'field',
    fs.readFileSync('views/templates/field.hbs', {encoding: 'utf-8'})
  );

  handlebars.registerPartial(
    'btn',
    fs.readFileSync('views/templates/btn.hbs', {encoding: 'utf-8'})
  );

  handlebars.registerPartial(
    'input',
    fs.readFileSync('views/templates/input.hbs', {encoding: 'utf-8'})
  );

  handlebars.registerHelper(
    'cancel',
    function () {
      return new handlebars.SafeString(
        `
        <button class="btn cancel btn-dark" name="cancel" type="button">
          Cancel
        </button>
        `
      );
    }
  )
}

start();