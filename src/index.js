// import "./main.css";
// import "../cubes/cubes";
// import "../cubes/cubes.css";
import Prism from "prismjs";
// Prism.highlightAll();

import { renderNav } from "./navbar/navbar";

import { renderLanding } from "./landing/landing";
import { renderAbout } from "./about/about";

// import "./about/about";
const docFrag = new DocumentFragment();
const body = document.createElement("div");
body.setAttribute("id", "#root");
docFrag.appendChild(body);

renderNav(docFrag);
renderLanding(docFrag);
renderAbout(docFrag);

// pass in the target node, as well as the observer options
document.body.appendChild(docFrag);
