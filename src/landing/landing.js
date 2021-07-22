import style from "./landing.module.scss";
import chatapp from "./projectphotos/chatapp.png";
import covidTracker from "./projectphotos/covidTracker.png";
import CssIcon from "./projectphotos/css3.svg";
import HtmlIcon from "./projectphotos/html5.svg";
import JsIcon from "./projectphotos/javascript.svg";
import sqlIcon from "./projectphotos/mysql.svg";
import NodeIcon from "./projectphotos/node.svg";
import playlists from "./projectphotos/playlists.png";
import tftapp from "./projectphotos/tftapp.png";
import ReactIcon from "./projectphotos/react.svg";
import readdit from "./projectphotos/readdit.png";
import aiiwoe from "./projectphotos/aiiwoe.png";
import tesla from "./projectphotos/tesla-clone.png";
import arrow from "./rightarrow.svg";
import leftArrow from "./leftarrow.svg";
const element = document.createElement("section");

element.classList.add(style["wrapper"]);
const techImages = [
  {
    image: ReactIcon,
    name: "React",
  },
  { image: JsIcon, name: "Js ES6" },
  {
    image: NodeIcon,
    name: "Node",
  },
  {
    image: HtmlIcon,
    name: "Html",
  },
  {
    image: CssIcon,
    name: "Css",
  },
  {
    image: sqlIcon,
    name: "MySQL",
  },
];
const projects = [
  {
    url: "https://github.com/ajl0023/chatApp",
    src: chatapp,
  },
  {
    url: "https://github.com/ajl0023/Covid-tracker",
    src: covidTracker,
  },
  {
    url: "https://github.com/ajl0023/redditSqlMaster",
    src: readdit,
  },
  {
    url: "https://github.com/ajl0023/betterPlaylist",
    src: playlists,
  },
  {
    url: "https://github.com/ajl0023/teslaClone",
    src: tesla,
  },
  {
    url: "https://github.com/ajl0023/tftapp2",
    src: tftapp,
  },
  {
    url: "https://github.com/ajl0023/aiiwoe",
    src: aiiwoe,
  },
];
const projEles = [];
let temp = [];
for (let i = 0; i < projects.length; i++) {
  const button = document.createElement("button");
  const a = document.createElement("a");
  a.href = projects[i].url;
  a.className = style["project-container"];
  button.appendChild(a);
  button.className = style["project-container"];

  const image = new Image();
  image.src = projects[i].src;
  image.className = style["project-image"];
  a.appendChild(image);

  if (i % 6 === 0 && i > 0) {
    console.log(500);
    projEles.push(temp);
    temp = [];
  }
  temp.push(button);
}
console.log(temp);
if (temp.length > 0) {
  projEles.push(temp);
}
console.log(projEles);
export const renderLanding = (fragment) => {
  element.innerHTML = /* HTML */ ` <div class=${style["center-container"]}>
    <div class=${style["container"]}>
      <div class=${style["text-container"]}>
        <h1 class=${style["main-title"]}>Hi, I'm <span>Austin</span></h1>

        <h4 class=${style["description"]}>
          Here are some of my projects I've been working on.
        </h4>
      </div>
      <div id="project-container" class=${style["image-container"]}></div>
      <div id="next-page-button" class=${style["right-arrow"]}>${arrow}</div>
    </div>
    <div class=${style["tech-wrapper"]}>
      <p class=${style["tech-container-title"]}>
        Technologies used in these projects
      </p>
      <div id="tech-container" class=${style["tech-icon-container"]}></div>
    </div>
  </div>`;
  const root = fragment.getElementById("#root");

  root.appendChild(element);
  const imageContainer = fragment.getElementById("project-container");
  const arr = [];
  let next = true;
  let currPage = 0;
  const button = fragment.getElementById("next-page-button");
  button.addEventListener("click", () => {
    if (next) {
      currPage = currPage + 1;
    } else {
      currPage = currPage - 1;
    }
    if (currPage === 0) {
      next = true;
      button.innerHTML = arrow;
    }
    if (currPage === projEles.length - 1) {
      next = false;
      while (button.firstChild) {
        button.removeChild(button.firstChild);
      }
      console.log(leftArrow);
      button.innerHTML = leftArrow;
    }
    insertImages();
  });
  function insertImages() {
    while (imageContainer.firstChild) {
      imageContainer.removeChild(imageContainer.firstChild);
    }
    for (let i = 0; i < projEles[currPage].length; i++) {
      imageContainer.appendChild(projEles[currPage][i]);
    }
  }
  insertImages();

  const techContainer = fragment.getElementById("tech-container");
  techImages.map((item) => {
    let icon = document.createElement("div");
    icon.classList.add(style["icon-container"]);
    icon.innerHTML = /*html*/ `
    ${item.image} <p class=${style["icon-label"]}>${item.name}</p>`;
    techContainer.appendChild(icon);
  });
};
