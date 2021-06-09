import style from "./navbar.module.scss";
import LIlogo from "./navlogos/linkedin.svg";
import GHlogo from "./navlogos/github.svg";
import GMLogo from "./navlogos/gmail.svg";

export const renderNav = (docFrag) => {
  const root = docFrag.getElementById("#root");

  const navContainer = document.createElement("nav");

  navContainer.innerHTML = /*html*/ `<div class=${style["container"]}>
    <div class=${style["contact-icon-container"]}>
   <li class=${style["contact-icon"]}> ${GHlogo}</li>
   <li class=${style["contact-icon"]}> ${GMLogo}</li>
   <li class=${style["contact-icon"]}>${LIlogo}</li>
    <div class=${style["divider-line"]}></div>
    </div>
    </div>`;
  root.appendChild(navContainer);
};
