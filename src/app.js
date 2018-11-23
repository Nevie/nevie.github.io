const css= require("./styles/style.css");
import {Controller} from "./controllers/Controller.js";
let newsController = new Controller(document.getElementsByTagName("section")[0]);
newsController.getNewsChannels();