import style from "./about.module.scss";
import Prism from "prismjs";

const element = document.createElement("section");
element.classList.add(style["container"]);

window.onload = () => {
  let options = {
    threshold: [0.2],
  };
  const laptop = document.getElementById("main-laptop-obs");
  const trackSvg = (entries) => {
    if (entries[0].isIntersecting) {
      var i = 0;
      var txt = `const app = express();\napp.get('api/skills', (req,res) =>\n{ res.json(["React","Javascript",\n"nodeJS", "CSS", "HTML"])})`;
      const server = document.getElementById("server-text");
      const client = document.getElementById("client-text");
      var speed = 10;

      function serverAnimation() {
        if (i < txt.length) {
          server.innerHTML += txt.charAt(i);
          i++;
          const timeout = setTimeout(serverAnimation, speed);
          if (i === txt.length) {
            clearTimeout(timeout);
            i = 0;
            clientAnimation();
          }
        }
        Prism.highlightElement(server);
      }
      function clientAnimation() {
        let txt = `const mySkills = await \n axios.get('/api/skills')\n console.log(mySkills.data)`;

        if (i < txt.length) {
          client.innerHTML += txt.charAt(i);

          i++;
          setTimeout(clientAnimation, speed);
        }
        Prism.highlightElement(client);
      }
      observer.disconnect();
      serverAnimation();
    }
  };
  let observer = new IntersectionObserver(trackSvg, options);

  observer.observe(laptop);
};
export const renderAbout = (fragment) => {
  element.innerHTML = /*html*/ `<div class=${style["container"]}>
      <div class=${style["main-content"]}>
        <div class=${style["code-editor-container"]}>
          <div id='main-laptop-obs' class=${style["laptop"]}>
            <div class=${style["code-editor"]}>
              <div class=${style["client-editor"]}>
                <div class=${style["line-number-container"]}>
                  <div class=${style["line-container"]}>
                    <pre class=${"line-numbers"}>
                      <code
                        id="client-text"
                        class=${`language-js`}
                      ></code>
                    </pre>
                  </div>
                </div>
              </div>
              <div class=${style["server-editor"]}>
                <div class=${style["line-number-container"]}>
                  <div class=${style["line-container"]}>
                    <pre class=${"line-numbers"}>
                      <code
                        id="server-text"
                        class=${`language-js`}
                      ></code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            <div class=${style["base"]}></div>
          </div>
        </div>

        <div class=${style["text-content"]}>
          <div class=${style["text-container"]}>
            <h3 class=${style["main-header"]}>Javascript developer</h3>
            <p class=${style["description"]}>
              Hello, I'm Austin, a web developer with a primary focus in React
              development. I'm confident in working with the various MERN stack
              technologies and I'm on a persistent journey in honing my craft in
              web development.
            </p>
          </div>
        </div>
      </div>
    </div>
`;
  const root = fragment.getElementById("#root");
  root.appendChild(element);
};
