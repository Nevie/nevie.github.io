import 'babel-polyfill';
import {Controller} from "./controllers/Controller.js";
let newsController = new Controller(document.getElementsByTagName("section")[0]);
newsController.getNewsChannels();