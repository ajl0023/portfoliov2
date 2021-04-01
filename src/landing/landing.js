import style from "./landing.module.scss";
import chatapp from "./projectphotos/chatapp.png";
import covidTracker from "./projectphotos/covidTracker.png";
import playlists from "./projectphotos/playlists.png";
import portfolio from "./projectphotos/portfolio.png";
import readdit from "./projectphotos/readdit.png";
import tesla from "./projectphotos/tesla-clone.png";
import CssIcon from "./projectphotos/css3.svg";
import GitIcon from "./projectphotos/github.svg";
import HtmlIcon from "./projectphotos/html5.svg";
import JsIcon from "./projectphotos/javascript.svg";
import NodeIcon from "./projectphotos/node.svg";
import ReactIcon from "./projectphotos/react.svg";
const element = document.createElement("section");
console.log(HtmlIcon.toString());
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
];

element.innerHTML = /*html*/ `
<div class=${style["center-container"]}>

    <div class=${style["container"]}>
      <div class=${style["text-container"]}>
        <h1 class=${style["main-title"]}>Hi, I'm <span>Austin</span></h1>
        <h4 class=${style["description"]}>
          Here are some of my projects I've been working on.
        </h4>
      </div>
      <div class=${style["image-container"]}>
        <a
          ref="https://github.com/ajl0023/chatApp"
          target="_blank"
          class=${style["project-container"]}
        >
          <img src=${chatapp} class=${style["project-image"]} />
        </a>
        <a
          href="https://github.com/ajl0023/Covid-tracker"
          target="_blank"
          class=${style["project-container"]}
        >
          <img src=${covidTracker} class=${style["project-image"]} />
        </a>
        <a
          href="https://github.com/ajl0023/readit"
          target="_blank"
          class=${style["project-container"]}
        >
          <img src=${readdit} class=${style["project-image"]} />
        </a>
        <a
          href="https://github.com/ajl0023/spotifyPlaylists"
          target="_blank"
          class=${style["project-container"]}
        >
          <img src=${playlists} class=${style["project-image"]} />
        </a>
        <a
          href="https://github.com/ajl0023/tesla-clone"
          target="_blank"
          class=${style["project-container"]}
        >
          <img src=${tesla} class=${style["project-image"]} />
        </a>
        <a
          href="https://github.com/ajl0023/portfolio"
          target="_blank"
          class=${style["project-container"]}
        >
          <img
            src=${portfolio}
            class=${`${style["project-image"]} ${style["portfolio-image"]}`}
          />
        </a>
      </div>
      
  </div>
  <div class=${style["tech-wrapper"]}>
          <p class=${style["tech-container-title"]}>
            Technologies used in these projects
          </p>
          <div id='tech-container' class=${style["tech-icon-container"]}>
            
          </div>
        </div>
    </div>`;

document.body.appendChild(element);
const techContainer = document.getElementById("tech-container");
techImages.map((item) => {
  let icon = document.createElement("div");
  icon.classList.add(style["icon-container"]);
  icon.innerHTML = /*html*/ `${item.image} <p class=${style["icon-label"]}>${item.name}</p>`;
  techContainer.appendChild(icon);
});
