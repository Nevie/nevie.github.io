const css = require("./styles/style.css");
import {Controller} from "./controllers/Controller.js";
let newsController = new Controller(document.getElementById("newsApplication"));
newsController.getNewsChannels();