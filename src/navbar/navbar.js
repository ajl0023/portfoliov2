import style from "./navbar.module.scss";
import LIlogo from "./navlogos/linkedin.svg";
import GHlogo from "./navlogos/github.svg";
import GMLogo from "./navlogos/gmail.svg";

export const renderNav = (docFrag) => {
  const root = docFrag.getElementById("#root");

  const navContainer = document.createElement("nav");

  navContainer.innerHTML = /*html*/ `<div class=${style["container"]}>
    <div class=${style["contact-icon-container"]}>
   <a href="https://github.com/ajl0023" class=${style["contact-icon"]}> ${GHlogo}</a>
   <a href="mailto:austinjlee.0@gmail.com
" class=${style["contact-icon"]}> ${GMLogo}</a>
   <a href="https://github.com/ajl0023" class=${style["contact-icon"]}>${LIlogo}</a>
    <div class=${style["divider-line"]}></div>
    </div>
    </div>`;
  root.appendChild(navContainer);
};
