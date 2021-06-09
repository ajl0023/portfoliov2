import style from "./landing.module.scss";
import chatapp from "./projectphotos/chatapp.png";
import covidTracker from "./projectphotos/covidTracker.png";
import CssIcon from "./projectphotos/css3.svg";
import HtmlIcon from "./projectphotos/html5.svg";
import JsIcon from "./projectphotos/javascript.svg";
import NodeIcon from "./projectphotos/node.svg";
import playlists from "./projectphotos/playlists.png";
import tftapp from "./projectphotos/tftapp.png";
import ReactIcon from "./projectphotos/react.svg";
import readdit from "./projectphotos/readdit.png";
import tesla from "./projectphotos/tesla-clone.png";

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
];

export const renderLanding = (fragment) => {
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
 
      
       <button class=${
         style["project-container"]
       }> <a href="https://github.com/ajl0023/chatApp" >
          <img src=${chatapp} class=${style["project-image"]} />
        </a></button>
       
    
  

      <button class=${style["project-container"]}>
        <a href="https://github.com/ajl0023/Covid-tracker" target="_blank" class=${
          style["project-container"]
        }>
          <img src=${covidTracker} class=${style["project-image"]} />
        </a>
      </button>
      <button class=${style["project-container"]}>
        <a href="https://github.com/ajl0023/readditv2" target="_blank" class=${
          style["project-container"]
        }>
          <img src=${readdit} class=${style["project-image"]} />
        </a>
      </button>
      <button class=${style["project-container"]}>
        <a href="https://github.com/ajl0023/spotifyPlaylists" target="_blank" class=${
          style["project-container"]
        }>
          <img src=${playlists} class=${style["project-image"]} />
        </a>
      </button>
      <button class=${
        style["project-container"]
      }><a href="https://github.com/ajl0023/teslaClone" target="_blank" class=${
    style["project-container"]
  }>
          <img src=${tesla} class=${style["project-image"]} />
        </a></button>

      <button class=${
        style["project-container"]
      }><a href="https://github.com/ajl0023/tftapp2" target="_blank" class=${
    style["project-container"]
  }>
          <img src=${tftapp} class=${`${style["project-image"]} ${style["portfolio-image"]}`} />
        </a>
      </button>
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
  const root = fragment.getElementById("#root");
  root.appendChild(element);
  const techContainer = fragment.getElementById("tech-container");
  techImages.map((item) => {
    let icon = document.createElement("div");
    icon.classList.add(style["icon-container"]);
    icon.innerHTML = /*html*/ `${item.image} <p class=${style["icon-label"]}>${item.name}</p>`;
    techContainer.appendChild(icon);
  });
};
