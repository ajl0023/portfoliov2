/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./cubes/cubes.js":
/*!************************!*\
  !*** ./cubes/cubes.js ***!
  \************************/
/***/ (() => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Strut = {
  random: function random(e, t) {
    return Math.random() * (t - e) + e;
  },
  arrayRandom: function arrayRandom(e) {
    return e[Math.floor(Math.random() * e.length)];
  },
  interpolate: function interpolate(e, t, n) {
    return e * (1 - n) + t * n;
  },
  rangePosition: function rangePosition(e, t, n) {
    return (n - e) / (t - e);
  },
  clamp: function clamp(e, t, n) {
    return Math.max(Math.min(e, n), t);
  },
  queryArray: function queryArray(e, t) {
    return t || (t = document.body), Array.prototype.slice.call(t.querySelectorAll(e));
  },
  ready: function ready(e) {
    document.readyState == "complete" ? e() : document.addEventListener("DOMContentLoaded", e);
  }
};
var reduceMotion = matchMedia("(prefers-reduced-motion)").matches;
{
  // =======
  // helpers
  // =======
  var setState = function setState(state, speed) {
    return directions.forEach(function (axis) {
      state[axis] += speed[axis];
      if (Math.abs(state[axis]) < 360) return;
      var max = Math.max(state[axis], 360);
      var min = max == 360 ? Math.abs(state[axis]) : 360;
      state[axis] = max - min;
    });
  };

  var cubeIsHidden = function cubeIsHidden(left) {
    return left > parentWidth + 30;
  }; // =================
  // shared references
  // =================


  var headerIsHidden = false;
  var template = document.getElementById("cube-template");
  var parent = document.getElementById("header-hero");

  var getParentWidth = function getParentWidth() {
    return parent.getBoundingClientRect().width;
  };

  var parentWidth = getParentWidth();
  window.addEventListener("resize", function () {
    return parentWidth = getParentWidth();
  });
  var directions = ["x", "y"];
  var palette = {
    white: {
      color: [131, 96, 255],
      shading: [160, 190, 218]
    },
    orange: {
      color: [255, 250, 230],
      shading: [255, 120, 50]
    },
    green: {
      color: [46, 255, 204],
      shading: [0, 211, 136]
    }
  }; // ==============
  // cube instances
  // ==============

  var setCubeStyles = function setCubeStyles(_ref) {
    var cube = _ref.cube,
        size = _ref.size,
        left = _ref.left,
        top = _ref.top;
    Object.assign(cube.style, {
      width: "".concat(size, "px"),
      height: "".concat(size, "px"),
      left: "".concat(left, "px"),
      top: "".concat(top, "px")
    });
    Object.assign(cube.querySelector(".shadow").style, {
      filter: "blur(".concat(Math.round(size * 0.6), "px)"),
      opacity: Math.min(size / 120, 0.4)
    });
  };

  var createCube = function createCube(size) {
    var fragment = document.importNode(template.content, true);
    var cube = fragment.querySelector(".cube");
    var state = {
      x: 0,
      y: 0
    };
    var speed = directions.reduce(function (object, axis) {
      var max = size > sizes.m ? 0.3 : 0.6;
      object[axis] = Strut.random(-max, max);
      return object;
    }, {});
    var sides = Strut.queryArray(".sides div", cube).reduce(function (object, side) {
      object[side.className] = {
        side: side,
        hidden: false,
        rotate: {
          x: 0,
          y: 0
        }
      };
      return object;
    }, {});
    sides.top.rotate.x = 90;
    sides.bottom.rotate.x = -90;
    sides.left.rotate.y = -90;
    sides.right.rotate.y = 90;
    sides.back.rotate.y = -180;
    return {
      fragment: fragment,
      cube: cube,
      state: state,
      speed: speed,
      sides: Object.values(sides)
    };
  };

  var sizes = {
    xs: 15,
    s: 25,
    m: 40,
    l: 100,
    xl: 120
  };
  var cubes = [{
    tint: palette.green,
    size: sizes.xl,
    bottom: 0,
    right: 0
  } // {
  //   tint: palette.green,
  //   size: sizes.xs,
  //   left: 35,
  //   top: 465,
  // },
  // {
  //   tint: palette.white,
  //   size: sizes.s,
  //   left: 55,
  //   top: 415,
  // },
  // {
  //   tint: palette.white,
  //   size: sizes.xl,
  //   left: 140,
  //   top: 400,
  // },
  // {
  //   tint: palette.white,
  //   size: sizes.m,
  //   left: 420,
  //   top: 155,
  // },
  // {
  //   tint: palette.green,
  //   size: sizes.xs,
  //   left: 440,
  //   top: 280,
  // },
  // {
  //   tint: palette.orange,
  //   size: sizes.s,
  //   left: 480,
  //   top: 228,
  // },
  // {
  //   tint: palette.white,
  //   size: sizes.l,
  //   left: 580,
  //   top: 255,
  // },
  // {
  //   tint: palette.green,
  //   size: sizes.s,
  //   left: 780,
  //   top: 320,
  // },
  // {
  //   tint: palette.white,
  //   size: sizes.xl,
  //   left: 780,
  //   top: 120,
  // },
  // {
  //   tint: palette.orange,
  //   size: sizes.l,
  //   left: 900,
  //   top: 310,
  // },
  // {
  //   tint: palette.green,
  //   size: sizes.m,
  //   left: 1030,
  //   top: 1200,
  // },
  // {
  //   tint: palette.green,
  //   size: sizes.m,
  //   left: 2000,
  //   top: 600,
  // },
  // {
  //   tint: palette.green,
  //   size: sizes.m,
  //   left: 1900,
  //   top: 200,
  // },
  // {
  //   tint: palette.green,
  //   size: sizes.m,
  //   left: 100,
  //   top: 200,
  // },
  // {
  //   tint: palette.green,
  //   size: sizes.m,
  //   left: 1030,
  //   top: 200,
  // },
  // {
  //   tint: palette.green,
  //   size: sizes.m,
  //   left: 1500,
  //   top: 200,
  // },
  // {
  //   tint: palette.green,
  //   size: sizes.m,
  //   left: 10,
  //   top: 200,
  // },
  ].map(function (object) {
    return Object.assign(createCube(object.size), object);
  });
  cubes.forEach(setCubeStyles); // =======================
  // cube rotating animation
  // =======================

  var getDistance = function getDistance(state, rotate) {
    return directions.reduce(function (object, axis) {
      object[axis] = Math.abs(state[axis] + rotate[axis]);
      return object;
    }, {});
  };

  var getRotation = function getRotation(state, size, rotate) {
    var axis = rotate.x ? "Z" : "Y";
    var direction = rotate.x > 0 ? -1 : 1;
    return "\n        rotateX(".concat(state.x + rotate.x, "deg)\n        rotate").concat(axis, "(").concat(direction * (state.y + rotate.y), "deg)\n        translateZ(").concat(size / 2, "px)\n      ");
  };

  var getShading = function getShading(tint, rotate, distance) {
    var darken = directions.reduce(function (object, axis) {
      var delta = distance[axis];
      var ratio = delta / 180;
      object[axis] = delta > 180 ? Math.abs(2 - ratio) : ratio;
      return object;
    }, {});
    if (rotate.x) darken.y = 0;else {
      var x = distance.x;
      if (x > 90 && x < 270) directions.forEach(function (axis) {
        return darken[axis] = 1 - darken[axis];
      });
    }
    var alpha = (darken.x + darken.y) / 2;

    var blend = function blend(value, index) {
      return Math.round(Strut.interpolate(value, tint.shading[index], alpha));
    };

    var _tint$color$map = tint.color.map(blend),
        _tint$color$map2 = _slicedToArray(_tint$color$map, 3),
        r = _tint$color$map2[0],
        g = _tint$color$map2[1],
        b = _tint$color$map2[2];

    return "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
  };

  var shouldHide = function shouldHide(rotateX, x, y) {
    if (rotateX) return x > 90 && x < 270;
    if (x < 90) return y > 90 && y < 270;
    if (x < 270) return y < 90;
    return y > 90 && y < 270;
  };

  var updateSides = function updateSides(_ref2) {
    var state = _ref2.state,
        speed = _ref2.speed,
        size = _ref2.size,
        tint = _ref2.tint,
        sides = _ref2.sides,
        left = _ref2.left;
    if (headerIsHidden || cubeIsHidden(left)) return;

    var animate = function animate(object) {
      var side = object.side,
          rotate = object.rotate,
          hidden = object.hidden;
      var distance = getDistance(state, rotate); // don't animate hidden sides

      if (shouldHide(rotate.x, distance.x, distance.y)) {
        if (!hidden) {
          side.hidden = true;
          object.hidden = true;
        }

        return;
      }

      if (hidden) {
        side.hidden = false;
        object.hidden = false;
      }

      side.style.transform = getRotation(state, size, rotate);
      side.style.backgroundColor = getShading(tint, rotate, distance);
    };

    setState(state, speed);
    sides.forEach(animate);
  };

  var tick = function tick() {
    cubes.forEach(updateSides);
    if (reduceMotion) return;
    requestAnimationFrame(tick);
  }; // ===============
  // parallax scroll
  // ===============
  // give it some extra space to account for the parallax and the shadows of the cubes


  var parallaxLimit = document.querySelector("main > header").getBoundingClientRect().height + 80;
  window.addEventListener("scroll", function () {
    var scroll = window.scrollY;

    if (scroll < parallaxLimit) {
      headerIsHidden = false;
      cubes.forEach(function (_ref3) {
        var cube = _ref3.cube,
            speed = _ref3.speed;
        return cube.style.transform = "translateY(".concat(Math.abs(speed.x * 0.5) * scroll, "px)");
      });
      return;
    }

    headerIsHidden = true;
  }); // ==========
  // initialize
  // ==========

  var container = document.createElement("div");
  container.className = "cubes";
  cubes.forEach(function (_ref4) {
    var fragment = _ref4.fragment;
    return container.appendChild(fragment);
  });

  var start = function start() {
    tick();
    parent.appendChild(container);
  };

  "requestIdleCallback" in window ? requestIdleCallback(start) : start();
} //code from https://codepen.io/tomatouiui/pen/mLmvov

/***/ }),

/***/ "./src/about/about.js":
/*!****************************!*\
  !*** ./src/about/about.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderAbout": () => (/* binding */ renderAbout)
/* harmony export */ });
/* harmony import */ var _about_module_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./about.module.scss */ "./src/about/about.module.scss");
/* harmony import */ var prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prismjs/components/prism-core */ "./node_modules/prismjs/components/prism-core.js");
/* harmony import */ var prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prismjs_components_prism_clike__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prismjs/components/prism-clike */ "./node_modules/prismjs/components/prism-clike.js");
/* harmony import */ var prismjs_components_prism_clike__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_clike__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prismjs_components_prism_markup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prismjs/components/prism-markup */ "./node_modules/prismjs/components/prism-markup.js");
/* harmony import */ var prismjs_components_prism_markup__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_markup__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prismjs_components_prism_javascript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prismjs/components/prism-javascript */ "./node_modules/prismjs/components/prism-javascript.js");
/* harmony import */ var prismjs_components_prism_javascript__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_javascript__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prismjs_components_prism_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prismjs/components/prism-css */ "./node_modules/prismjs/components/prism-css.js");
/* harmony import */ var prismjs_components_prism_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prismjs_plugins_line_numbers_prism_line_numbers_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prismjs/plugins/line-numbers/prism-line-numbers.css */ "./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css");
/* harmony import */ var prismjs_plugins_line_numbers_prism_line_numbers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prismjs/plugins/line-numbers/prism-line-numbers */ "./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js");
/* harmony import */ var prismjs_plugins_line_numbers_prism_line_numbers__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prismjs_plugins_line_numbers_prism_line_numbers__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prismjs_themes_prism_okaidia_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prismjs/themes/prism-okaidia.css */ "./node_modules/prismjs/themes/prism-okaidia.css");









var element = document.createElement("section");
element.classList.add(_about_module_scss__WEBPACK_IMPORTED_MODULE_0__.default.container);

window.onload = function () {
  var options = {
    threshold: [0.2]
  };
  var laptop = document.getElementById("main-laptop-obs");

  var trackSvg = function trackSvg(entries) {
    if (entries[0].isIntersecting) {
      var serverAnimation = function serverAnimation() {
        if (i < txt.length) {
          server.innerHTML += txt.charAt(i);
          i++;
          var timeout = setTimeout(serverAnimation, speed);

          if (i === txt.length) {
            clearTimeout(timeout);
            i = 0;
            clientAnimation();
          }
        }

        prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_1___default().highlightElement(server);
      };

      var clientAnimation = function clientAnimation() {
        var txt = "const mySkills = await \n axios.get('/api/skills')\n console.log(mySkills.data)";

        if (i < txt.length) {
          client.innerHTML += txt.charAt(i);
          i++;
          setTimeout(clientAnimation, speed);
        }

        prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_1___default().highlightElement(client);
      };

      var i = 0;
      var txt = "const app = express();\napp.get('api/skills', (req,res) =>\n{ res.json([\"React\",\"Javascript\",\n\"nodeJS\", \"CSS\", \"HTML\"])})";
      var server = document.getElementById("server-text");
      var client = document.getElementById("client-text");
      var speed = 10;
      observer.disconnect();
      serverAnimation();
    }
  };

  var observer = new IntersectionObserver(trackSvg, options);
  observer.observe(laptop);
};

var renderAbout = function renderAbout(fragment) {
  element.innerHTML =
  /*html*/
  "<div class=".concat(_about_module_scss__WEBPACK_IMPORTED_MODULE_0__.default.container, ">\n      <div class=").concat(_about_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["main-content"], ">\n        <div class=").concat(_about_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["code-editor-container"], ">\n          <div id='main-laptop-obs' class=").concat(_about_module_scss__WEBPACK_IMPORTED_MODULE_0__.default.laptop, ">\n            <div class=").concat(_about_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["code-editor"], ">\n              <div class=").concat(_about_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["client-editor"], ">\n                <div class=").concat(_about_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["line-number-container"], ">\n                  <div class=").concat(_about_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["line-container"], ">\n                    <pre class=", "line-numbers", ">\n                      <code\n                        id=\"client-text\"\n                        class=", "language-js", "\n                      ></code>\n                    </pre>\n                  </div>\n                </div>\n              </div>\n              <div class=").concat(_about_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["server-editor"], ">\n                <div class=").concat(_about_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["line-number-container"], ">\n                  <div class=").concat(_about_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["line-container"], ">\n                    <pre class=", "line-numbers", ">\n                      <code\n                        id=\"server-text\"\n                        class=", "language-js", "\n                      ></code>\n                    </pre>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=").concat(_about_module_scss__WEBPACK_IMPORTED_MODULE_0__.default.base, "></div>\n          </div>\n        </div>\n\n        <div class=").concat(_about_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["text-content"], ">\n          <div class=").concat(_about_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["text-container"], ">\n            <h3 class=").concat(_about_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["main-header"], ">Javascript developer</h3>\n            <p class=").concat(_about_module_scss__WEBPACK_IMPORTED_MODULE_0__.default.description, ">\n              Hello, I'm Austin, a web developer with a primary focus in React\n              development. I'm confident in working with the various MERN stack\n              technologies and I'm on a persistent journey in honing my craft in\n              web development.\n            </p>\n          </div>\n        </div>\n      </div>\n    </div>\n");
  var root = fragment.getElementById("#root");
  root.appendChild(element);
};

/***/ }),

/***/ "./src/landing/landing.js":
/*!********************************!*\
  !*** ./src/landing/landing.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderLanding": () => (/* binding */ renderLanding)
/* harmony export */ });
/* harmony import */ var _landing_module_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./landing.module.scss */ "./src/landing/landing.module.scss");
/* harmony import */ var _projectphotos_chatapp_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectphotos/chatapp.png */ "./src/landing/projectphotos/chatapp.png");
/* harmony import */ var _projectphotos_covidTracker_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projectphotos/covidTracker.png */ "./src/landing/projectphotos/covidTracker.png");
/* harmony import */ var _projectphotos_css3_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projectphotos/css3.svg */ "./src/landing/projectphotos/css3.svg");
/* harmony import */ var _projectphotos_html5_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projectphotos/html5.svg */ "./src/landing/projectphotos/html5.svg");
/* harmony import */ var _projectphotos_javascript_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./projectphotos/javascript.svg */ "./src/landing/projectphotos/javascript.svg");
/* harmony import */ var _projectphotos_node_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./projectphotos/node.svg */ "./src/landing/projectphotos/node.svg");
/* harmony import */ var _projectphotos_playlists_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./projectphotos/playlists.png */ "./src/landing/projectphotos/playlists.png");
/* harmony import */ var _projectphotos_portfolio_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./projectphotos/portfolio.png */ "./src/landing/projectphotos/portfolio.png");
/* harmony import */ var _projectphotos_react_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./projectphotos/react.svg */ "./src/landing/projectphotos/react.svg");
/* harmony import */ var _projectphotos_readdit_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./projectphotos/readdit.png */ "./src/landing/projectphotos/readdit.png");
/* harmony import */ var _projectphotos_tesla_clone_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./projectphotos/tesla-clone.png */ "./src/landing/projectphotos/tesla-clone.png");












var element = document.createElement("section");
element.classList.add(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default.wrapper);
var techImages = [{
  image: _projectphotos_react_svg__WEBPACK_IMPORTED_MODULE_9__,
  name: "React"
}, {
  image: _projectphotos_javascript_svg__WEBPACK_IMPORTED_MODULE_5__,
  name: "Js ES6"
}, {
  image: _projectphotos_node_svg__WEBPACK_IMPORTED_MODULE_6__,
  name: "Node"
}, {
  image: _projectphotos_html5_svg__WEBPACK_IMPORTED_MODULE_4__,
  name: "Html"
}, {
  image: _projectphotos_css3_svg__WEBPACK_IMPORTED_MODULE_3__,
  name: "Css"
}];
var renderLanding = function renderLanding(fragment) {
  element.innerHTML =
  /*html*/
  "\n<div class=".concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["center-container"], ">\n\n    <div class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default.container, ">\n      <div class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["text-container"], ">\n        <h1 class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["main-title"], ">Hi, I'm <span>Austin</span></h1>\n        <h4 class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default.description, ">\n          Here are some of my projects I've been working on.\n        </h4>\n      </div>\n      <div class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["image-container"], ">\n        <a\n          ref=\"https://github.com/ajl0023/chatApp\"\n          target=\"_blank\"\n          class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], "\n        >\n          <img src=").concat(_projectphotos_chatapp_png__WEBPACK_IMPORTED_MODULE_1__, " class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " />\n        </a>\n        <a\n          href=\"https://github.com/ajl0023/Covid-tracker\"\n          target=\"_blank\"\n          class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], "\n        >\n          <img src=").concat(_projectphotos_covidTracker_png__WEBPACK_IMPORTED_MODULE_2__, " class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " />\n        </a>\n        <a\n          href=\"https://github.com/ajl0023/readit\"\n          target=\"_blank\"\n          class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], "\n        >\n          <img src=").concat(_projectphotos_readdit_png__WEBPACK_IMPORTED_MODULE_10__, " class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " />\n        </a>\n        <a\n          href=\"https://github.com/ajl0023/spotifyPlaylists\"\n          target=\"_blank\"\n          class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], "\n        >\n          <img src=").concat(_projectphotos_playlists_png__WEBPACK_IMPORTED_MODULE_7__, " class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " />\n        </a>\n        <a\n          href=\"https://github.com/ajl0023/tesla-clone\"\n          target=\"_blank\"\n          class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], "\n        >\n          <img src=").concat(_projectphotos_tesla_clone_png__WEBPACK_IMPORTED_MODULE_11__, " class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " />\n        </a>\n        <a\n          href=\"https://github.com/ajl0023/portfoliov2\"\n          target=\"_blank\"\n          class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], "\n        >\n          <img\n            src=").concat(_projectphotos_portfolio_png__WEBPACK_IMPORTED_MODULE_8__, "\n            class=", "".concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " ").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["portfolio-image"]), "\n          />\n        </a>\n      </div>\n      \n  </div>\n  <div class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["tech-wrapper"], ">\n          <p class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["tech-container-title"], ">\n            Technologies used in these projects\n          </p>\n          <div id='tech-container' class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["tech-icon-container"], ">\n            \n          </div>\n        </div>\n    </div>");
  var root = fragment.getElementById("#root");
  root.appendChild(element);
  var techContainer = fragment.getElementById("tech-container");
  techImages.map(function (item) {
    var icon = document.createElement("div");
    icon.classList.add(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["icon-container"]);
    icon.innerHTML =
    /*html*/
    "".concat(item.image, " <p class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["icon-label"], ">").concat(item.name, "</p>");
    techContainer.appendChild(icon);
  });
};

/***/ }),

/***/ "./src/navbar/navbar.js":
/*!******************************!*\
  !*** ./src/navbar/navbar.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderNav": () => (/* binding */ renderNav)
/* harmony export */ });
/* harmony import */ var _navbar_module_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navbar.module.scss */ "./src/navbar/navbar.module.scss");
/* harmony import */ var _navlogos_linkedin_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navlogos/linkedin.svg */ "./src/navbar/navlogos/linkedin.svg");
/* harmony import */ var _navlogos_github_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navlogos/github.svg */ "./src/navbar/navlogos/github.svg");
/* harmony import */ var _navlogos_gmail_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navlogos/gmail.svg */ "./src/navbar/navlogos/gmail.svg");




var renderNav = function renderNav(docFrag) {
  var root = docFrag.getElementById("#root");
  var navContainer = document.createElement("nav");
  navContainer.innerHTML =
  /*html*/
  "<div class=".concat(_navbar_module_scss__WEBPACK_IMPORTED_MODULE_0__.default.container, ">\n    <div class=").concat(_navbar_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["contact-icon-container"], ">\n    ").concat(_navlogos_github_svg__WEBPACK_IMPORTED_MODULE_2__, "\n    ").concat(_navlogos_gmail_svg__WEBPACK_IMPORTED_MODULE_3__, "\n   ").concat(_navlogos_linkedin_svg__WEBPACK_IMPORTED_MODULE_1__, "\n    <div class=").concat(_navbar_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["divider-line"], "></div>\n    </div>\n    </div>");
  root.appendChild(navContainer);
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./node_modules/sass-loader/dist/cjs.js!./cubes/cubes.css":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./node_modules/sass-loader/dist/cjs.js!./cubes/cubes.css ***!
  \**********************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".square-container {\n  position: fixed;\n  width: 500px;\n  height: 500px;\n  z-index: 1;\n}\n\n.cubes {\n  z-index: 1;\n}\n\n.cubes .cube {\n  z-index: 1;\n  position: absolute;\n  height: 100px;\n  width: 100px;\n  margin: 0;\n  -webkit-animation: cube-fade-in 2s cubic-bezier(0.165, 0.84, 0.44, 1);\n  animation: cube-fade-in 2s cubic-bezier(0.165, 0.84, 0.44, 1);\n  will-change: transform;\n}\n\n@-webkit-keyframes cube-fade-in {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale(0.5);\n    transform: scale(0.5);\n  }\n}\n@keyframes cube-fade-in {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale(0.5);\n    transform: scale(0.5);\n  }\n}\n.cubes .cube * {\n  z-index: 1;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n}\n\n.cubes .cube .shadow {\n  background: #8360c3;\n  top: 40%;\n}\n\n.cubes .cube .sides {\n  -webkit-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  -webkit-perspective: 600px;\n  perspective: 600px;\n}\n\n.cubes .cube .sides div {\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  will-change: transform;\n}\n\n.cubes .cube .sides .front {\n  z-index: 1 !important;\n  -webkit-transform: rotateY(0deg) translateZ(50px);\n  transform: rotateY(0deg) translateZ(50px);\n}\n\n.cubes .cube .sides .back {\n  z-index: 1 !important;\n  -webkit-transform: rotateY(-180deg) translateZ(50px);\n  transform: rotateY(-180deg) translateZ(50px);\n}\n\n.cubes .cube .sides .left {\n  z-index: 1 !important;\n  -webkit-transform: rotateY(-90deg) translateZ(50px);\n  transform: rotateY(-90deg) translateZ(50px);\n}\n\n.cubes .cube .sides .right {\n  z-index: 1 !important;\n  -webkit-transform: rotateY(90deg) translateZ(50px);\n  transform: rotateY(90deg) translateZ(50px);\n}\n\n.cubes .cube .sides .top {\n  z-index: 1 !important;\n  -webkit-transform: rotateX(90deg) translateZ(50px);\n  transform: rotateX(90deg) translateZ(50px);\n}\n\n.cubes .cube .sides .bottom {\n  z-index: 1 !important;\n  -webkit-transform: rotateX(-90deg) translateZ(50px);\n  transform: rotateX(-90deg) translateZ(50px);\n}\n\n/*# sourceMappingURL=cubes.css.map */", "",{"version":3,"sources":["webpack://./cubes/cubes.css"],"names":[],"mappings":"AAAA;EACE,eAAA;EACA,YAAA;EACA,aAAA;EACA,UAAA;AACF;;AAGA;EACE,UAAA;AAAF;;AAGA;EACE,UAAA;EACA,kBAAA;EACA,aAAA;EACA,YAAA;EACA,SAAA;EACA,qEAAA;EACA,6DAAA;EACA,sBAAA;AAAF;;AAGA;EACE;IACE,UAAA;IACA,6BAAA;IACA,qBAAA;EAAF;AACF;AAGA;EACE;IACE,UAAA;IACA,6BAAA;IACA,qBAAA;EADF;AACF;AAIA;EACE,UAAA;EACA,kBAAA;EACA,YAAA;EACA,WAAA;AAFF;;AAKA;EACE,mBAAA;EACA,QAAA;AAFF;;AAKA;EACE,oCAAA;EACA,4BAAA;EACA,0BAAA;EACA,kBAAA;AAFF;;AAKA;EACE,mCAAA;EACA,2BAAA;EACA,sBAAA;AAFF;;AAKA;EACE,qBAAA;EACA,iDAAA;EACA,yCAAA;AAFF;;AAKA;EACE,qBAAA;EACA,oDAAA;EACA,4CAAA;AAFF;;AAKA;EACE,qBAAA;EACA,mDAAA;EACA,2CAAA;AAFF;;AAKA;EACE,qBAAA;EACA,kDAAA;EACA,0CAAA;AAFF;;AAKA;EACE,qBAAA;EACA,kDAAA;EACA,0CAAA;AAFF;;AAKA;EACE,qBAAA;EACA,mDAAA;EACA,2CAAA;AAFF;;AAIA,oCAAA","sourcesContent":[".square-container {\r\n  position: fixed;\r\n  width: 500px;\r\n  height: 500px;\r\n  z-index: 1;\r\n\r\n}\r\n\r\n.cubes {\r\n  z-index: 1;\r\n}\r\n\r\n.cubes .cube {\r\n  z-index: 1;\r\n  position: absolute;\r\n  height: 100px;\r\n  width: 100px;\r\n  margin: 0;\r\n  -webkit-animation: cube-fade-in 2s cubic-bezier(0.165, 0.84, 0.44, 1);\r\n  animation: cube-fade-in 2s cubic-bezier(0.165, 0.84, 0.44, 1);\r\n  will-change: transform;\r\n}\r\n\r\n@-webkit-keyframes cube-fade-in {\r\n  0% {\r\n    opacity: 0;\r\n    -webkit-transform: scale(0.5);\r\n    transform: scale(0.5);\r\n  }\r\n}\r\n\r\n@keyframes cube-fade-in {\r\n  0% {\r\n    opacity: 0;\r\n    -webkit-transform: scale(0.5);\r\n    transform: scale(0.5);\r\n  }\r\n}\r\n\r\n.cubes .cube * {\r\n  z-index: 1;\r\n  position: absolute;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n.cubes .cube .shadow {\r\n  background: #8360c3;\r\n  top: 40%;\r\n}\r\n\r\n.cubes .cube .sides {\r\n  -webkit-transform-style: preserve-3d;\r\n  transform-style: preserve-3d;\r\n  -webkit-perspective: 600px;\r\n  perspective: 600px;\r\n}\r\n\r\n.cubes .cube .sides div {\r\n  -webkit-backface-visibility: hidden;\r\n  backface-visibility: hidden;\r\n  will-change: transform;\r\n}\r\n\r\n.cubes .cube .sides .front {\r\n  z-index: 1 !important;\r\n  -webkit-transform: rotateY(0deg) translateZ(50px);\r\n  transform: rotateY(0deg) translateZ(50px);\r\n}\r\n\r\n.cubes .cube .sides .back {\r\n  z-index: 1 !important;\r\n  -webkit-transform: rotateY(-180deg) translateZ(50px);\r\n  transform: rotateY(-180deg) translateZ(50px);\r\n}\r\n\r\n.cubes .cube .sides .left {\r\n  z-index: 1 !important;\r\n  -webkit-transform: rotateY(-90deg) translateZ(50px);\r\n  transform: rotateY(-90deg) translateZ(50px);\r\n}\r\n\r\n.cubes .cube .sides .right {\r\n  z-index: 1 !important;\r\n  -webkit-transform: rotateY(90deg) translateZ(50px);\r\n  transform: rotateY(90deg) translateZ(50px);\r\n}\r\n\r\n.cubes .cube .sides .top {\r\n  z-index: 1 !important;\r\n  -webkit-transform: rotateX(90deg) translateZ(50px);\r\n  transform: rotateX(90deg) translateZ(50px);\r\n}\r\n\r\n.cubes .cube .sides .bottom {\r\n  z-index: 1 !important;\r\n  -webkit-transform: rotateX(-90deg) translateZ(50px);\r\n  transform: rotateX(-90deg) translateZ(50px);\r\n}\r\n/*# sourceMappingURL=cubes.css.map */\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "pre[class*=language-].line-numbers {\n  position: relative;\n  padding-left: 3.8em;\n  counter-reset: linenumber;\n}\n\npre[class*=language-].line-numbers > code {\n  position: relative;\n  white-space: inherit;\n}\n\n.line-numbers .line-numbers-rows {\n  position: absolute;\n  pointer-events: none;\n  top: 0;\n  font-size: 100%;\n  left: -3.8em;\n  width: 3em;\n  /* works for line-numbers below 1000 lines */\n  letter-spacing: -1px;\n  border-right: 1px solid #999;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.line-numbers-rows > span {\n  display: block;\n  counter-increment: linenumber;\n}\n\n.line-numbers-rows > span:before {\n  content: counter(linenumber);\n  color: #999;\n  display: block;\n  padding-right: 0.8em;\n  text-align: right;\n}", "",{"version":3,"sources":["webpack://./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css"],"names":[],"mappings":"AAAA;EACC,kBAAA;EACA,mBAAA;EACA,yBAAA;AACD;;AAEA;EACC,kBAAA;EACA,oBAAA;AACD;;AAEA;EACC,kBAAA;EACA,oBAAA;EACA,MAAA;EACA,eAAA;EACA,YAAA;EACA,UAAA;EAAY,4CAAA;EACZ,oBAAA;EACA,4BAAA;EAEA,yBAAA;EACA,sBAAA;EACA,qBAAA;EACA,iBAAA;AACD;;AAGC;EACC,cAAA;EACA,6BAAA;AAAF;;AAGE;EACC,4BAAA;EACA,WAAA;EACA,cAAA;EACA,oBAAA;EACA,iBAAA;AAAH","sourcesContent":["pre[class*=\"language-\"].line-numbers {\n\tposition: relative;\n\tpadding-left: 3.8em;\n\tcounter-reset: linenumber;\n}\n\npre[class*=\"language-\"].line-numbers > code {\n\tposition: relative;\n\twhite-space: inherit;\n}\n\n.line-numbers .line-numbers-rows {\n\tposition: absolute;\n\tpointer-events: none;\n\ttop: 0;\n\tfont-size: 100%;\n\tleft: -3.8em;\n\twidth: 3em; /* works for line-numbers below 1000 lines */\n\tletter-spacing: -1px;\n\tborder-right: 1px solid #999;\n\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\n}\n\n\t.line-numbers-rows > span {\n\t\tdisplay: block;\n\t\tcounter-increment: linenumber;\n\t}\n\n\t\t.line-numbers-rows > span:before {\n\t\t\tcontent: counter(linenumber);\n\t\t\tcolor: #999;\n\t\t\tdisplay: block;\n\t\t\tpadding-right: 0.8em;\n\t\t\ttext-align: right;\n\t\t}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/prismjs/themes/prism-okaidia.css":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/prismjs/themes/prism-okaidia.css ***!
  \****************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/**\n * okaidia theme for JavaScript, CSS and HTML\n * Loosely based on Monokai textmate theme by http://www.monokai.nl/\n * @author ocodia\n */\ncode[class*=language-],\npre[class*=language-] {\n  color: #f8f8f2;\n  background: none;\n  text-shadow: 0 1px rgba(0, 0, 0, 0.3);\n  font-family: Consolas, Monaco, \"Andale Mono\", \"Ubuntu Mono\", monospace;\n  font-size: 1em;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  word-wrap: normal;\n  line-height: 1.5;\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n  -webkit-hyphens: none;\n  -moz-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none;\n}\n\n/* Code blocks */\npre[class*=language-] {\n  padding: 1em;\n  margin: 0.5em 0;\n  overflow: auto;\n  border-radius: 0.3em;\n}\n\n:not(pre) > code[class*=language-],\npre[class*=language-] {\n  background: #272822;\n}\n\n/* Inline code */\n:not(pre) > code[class*=language-] {\n  padding: 0.1em;\n  border-radius: 0.3em;\n  white-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: #8292a2;\n}\n\n.token.punctuation {\n  color: #f8f8f2;\n}\n\n.token.namespace {\n  opacity: 0.7;\n}\n\n.token.property,\n.token.tag,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: #f92672;\n}\n\n.token.boolean,\n.token.number {\n  color: #ae81ff;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: #a6e22e;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string,\n.token.variable {\n  color: #f8f8f2;\n}\n\n.token.atrule,\n.token.attr-value,\n.token.function,\n.token.class-name {\n  color: #e6db74;\n}\n\n.token.keyword {\n  color: #66d9ef;\n}\n\n.token.regex,\n.token.important {\n  color: #fd971f;\n}\n\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n\n.token.italic {\n  font-style: italic;\n}\n\n.token.entity {\n  cursor: help;\n}", "",{"version":3,"sources":["webpack://./node_modules/prismjs/themes/prism-okaidia.css"],"names":[],"mappings":"AAAA;;;;EAAA;AAMA;;EAEC,cAAA;EACA,gBAAA;EACA,qCAAA;EACA,sEAAA;EACA,cAAA;EACA,gBAAA;EACA,gBAAA;EACA,oBAAA;EACA,kBAAA;EACA,iBAAA;EACA,gBAAA;EAEA,gBAAA;EACA,cAAA;EACA,WAAA;EAEA,qBAAA;EACA,kBAAA;EACA,iBAAA;EACA,aAAA;AAFD;;AAKA,gBAAA;AACA;EACC,YAAA;EACA,eAAA;EACA,cAAA;EACA,oBAAA;AAFD;;AAKA;;EAEC,mBAAA;AAFD;;AAKA,gBAAA;AACA;EACC,cAAA;EACA,oBAAA;EACA,mBAAA;AAFD;;AAKA;;;;EAIC,cAAA;AAFD;;AAKA;EACC,cAAA;AAFD;;AAKA;EACC,YAAA;AAFD;;AAKA;;;;;EAKC,cAAA;AAFD;;AAKA;;EAEC,cAAA;AAFD;;AAKA;;;;;;EAMC,cAAA;AAFD;;AAKA;;;;;;EAMC,cAAA;AAFD;;AAKA;;;;EAIC,cAAA;AAFD;;AAKA;EACC,cAAA;AAFD;;AAKA;;EAEC,cAAA;AAFD;;AAKA;;EAEC,iBAAA;AAFD;;AAIA;EACC,kBAAA;AADD;;AAIA;EACC,YAAA;AADD","sourcesContent":["/**\n * okaidia theme for JavaScript, CSS and HTML\n * Loosely based on Monokai textmate theme by http://www.monokai.nl/\n * @author ocodia\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tcolor: #f8f8f2;\n\tbackground: none;\n\ttext-shadow: 0 1px rgba(0, 0, 0, 0.3);\n\tfont-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n\tfont-size: 1em;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-moz-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\n/* Code blocks */\npre[class*=\"language-\"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n\tborder-radius: 0.3em;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tbackground: #272822;\n}\n\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n\tpadding: .1em;\n\tborder-radius: .3em;\n\twhite-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: #8292a2;\n}\n\n.token.punctuation {\n\tcolor: #f8f8f2;\n}\n\n.token.namespace {\n\topacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.constant,\n.token.symbol,\n.token.deleted {\n\tcolor: #f92672;\n}\n\n.token.boolean,\n.token.number {\n\tcolor: #ae81ff;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n\tcolor: #a6e22e;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string,\n.token.variable {\n\tcolor: #f8f8f2;\n}\n\n.token.atrule,\n.token.attr-value,\n.token.function,\n.token.class-name {\n\tcolor: #e6db74;\n}\n\n.token.keyword {\n\tcolor: #66d9ef;\n}\n\n.token.regex,\n.token.important {\n\tcolor: #fd971f;\n}\n\n.token.important,\n.token.bold {\n\tfont-weight: bold;\n}\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/main.css":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/main.css ***!
  \*******************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.language-js {\n  font-size: 0.8vw !important;\n  background-color: transparent !important;\n  word-break: break-word !important;\n}\n\n.code-toolbar {\n  max-width: 100%;\n}\n\npre {\n  width: 100% !important;\n  text-align: left !important;\n  white-space: pre-wrap !important;\n  padding: 15px 30px 15px 15px;\n}\n\n.app-wrapper {\n  height: 100vh;\n  width: 100vw;\n  overflow-x: hidden;\n}\n\ncode {\n  display: block;\n  width: 100% !important;\n}\n\nhtml,\nbody {\n  height: 100vh;\n}\n\n#root {\n  position: absolute;\n  height: 100vh;\n}\n\n.toolbar-item {\n  display: none !important;\n}\n\n.tech-icon {\n  fill: rgba(255, 255, 255, 0.7);\n}\n\n/*# sourceMappingURL=main.css.map */", "",{"version":3,"sources":["webpack://./src/main.css"],"names":[],"mappings":"AAAA;EACE,SAAA;EACA,UAAA;EACA,gBAAA;EACA,8BAAA;EACQ,sBAAA;AACV;;AAEA;EACE,2BAAA;EACA,wCAAA;EACA,iCAAA;AACF;;AAEA;EACE,eAAA;AACF;;AAEA;EACE,sBAAA;EACA,2BAAA;EACA,gCAAA;EACA,4BAAA;AACF;;AAEA;EACE,aAAA;EACA,YAAA;EACA,kBAAA;AACF;;AAEA;EACE,cAAA;EACA,sBAAA;AACF;;AAEA;;EAEE,aAAA;AACF;;AAEA;EACE,kBAAA;EACA,aAAA;AACF;;AAEA;EACE,wBAAA;AACF;;AAEA;EACE,8BAAA;AACF;;AACA,mCAAA","sourcesContent":["* {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n.language-js {\n  font-size: 0.8vw !important;\n  background-color: transparent !important;\n  word-break: break-word !important;\n}\n\n.code-toolbar {\n  max-width: 100%;\n}\n\npre {\n  width: 100% !important;\n  text-align: left !important;\n  white-space: pre-wrap !important;\n  padding: 15px 30px 15px 15px;\n}\n\n.app-wrapper {\n  height: 100vh;\n  width: 100vw;\n  overflow-x: hidden;\n}\n\ncode {\n  display: block;\n  width: 100% !important;\n}\n\nhtml,\nbody {\n  height: 100vh;\n}\n\n#root {\n  position: absolute;\n  height: 100vh;\n}\n\n.toolbar-item {\n  display: none !important;\n}\n\n.tech-icon {\n  fill: rgba(255, 255, 255, 0.7);\n}\n/*# sourceMappingURL=main.css.map */"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/about/about.module.scss":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/about/about.module.scss ***!
  \**********************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fonts_circular_bold_woff2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../fonts/circular-bold.woff2 */ "./src/fonts/circular-bold.woff2");
/* harmony import */ var _fonts_VarelaRound_Regular_ttf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../fonts/VarelaRound-Regular.ttf */ "./src/fonts/VarelaRound-Regular.ttf");
// Imports





var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_circular_bold_woff2__WEBPACK_IMPORTED_MODULE_3__);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_VarelaRound_Regular_ttf__WEBPACK_IMPORTED_MODULE_4__);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"mainFont\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"woff2\");\n}\n@font-face {\n  font-family: \"secondary\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"truetype\");\n}\n.src-about-about-module__laptop--1CuGL {\n  position: relative;\n  margin: 0 auto;\n  padding-top: 50.25%;\n  background: #1a1e2c;\n  border: 15px solid #3f3f41;\n  border-top: 20px solid #3f3f41;\n  border-radius: 14px 14px 0 0;\n  box-shadow: 0 0 0 1px #d1d2d4;\n}\n.src-about-about-module__laptop--1CuGL:before {\n  content: \"\";\n  bottom: -35px;\n  background: #e6e8e7;\n  height: 20px;\n  width: 130%;\n  border-radius: 0 0 10px 10px;\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.src-about-about-module__laptop--1CuGL:after {\n  content: \"\";\n  top: -12px;\n  width: 3px;\n  height: 3px;\n  background: #e6e8e7;\n  border-radius: 50%;\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.src-about-about-module__base--1F0K8 {\n  bottom: -25px;\n  background: #d1d2d4;\n  height: 10px;\n  max-width: 130%;\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.src-about-about-module__base--1F0K8:before {\n  content: \"\";\n  border-radius: 0 0 10px 10px;\n  height: 10px;\n  max-width: 80px;\n  background: #bcbdc1;\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.src-about-about-module__base--1F0K8:after {\n  content: \"\";\n  position: absolute;\n  height: 20px;\n  max-width: 130%;\n  border-radius: 0 0 10px 10px;\n  box-shadow: 0px 10px 36px -2px rgba(0, 0, 0, 0.4);\n}\n\n.src-about-about-module__container--1nfrA {\n  background: linear-gradient(-13deg, #2c5e92, #552f6d);\n  padding: 20px 30px 20px 30px;\n  overflow-y: auto;\n  min-height: 100vh;\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n}\n.src-about-about-module__container--1nfrA .src-about-about-module__code-editor-container--37H9W {\n  position: relative;\n  height: 100%;\n  width: 70%;\n}\n.src-about-about-module__container--1nfrA .src-about-about-module__code-editor-container--37H9W .src-about-about-module__laptop-svg--3WREb {\n  width: 100%;\n  height: 100%;\n}\n.src-about-about-module__container--1nfrA .src-about-about-module__code-editor-container--37H9W .src-about-about-module__code-editor--2WFlH {\n  display: flex;\n  overflow-y: hidden;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  position: absolute;\n  font-family: monaco, Consolas, \"Lucida Console\", monospace;\n  border-radius: 8px;\n  background-color: #1a1e2c;\n}\n.src-about-about-module__container--1nfrA .src-about-about-module__code-editor-container--37H9W .src-about-about-module__code-editor--2WFlH .src-about-about-module__line-number-container--2BS7B {\n  display: flex;\n  height: 100%;\n  width: 100%;\n  color: #55718d;\n  gap: 3px;\n}\n.src-about-about-module__container--1nfrA .src-about-about-module__code-editor-container--37H9W .src-about-about-module__code-editor--2WFlH .src-about-about-module__line-number-container--2BS7B .src-about-about-module__line-container--2WsZy {\n  display: flex;\n}\n.src-about-about-module__container--1nfrA .src-about-about-module__code-editor-container--37H9W .src-about-about-module__code-editor--2WFlH .src-about-about-module__line-number-container--2BS7B .src-about-about-module__line-container--2WsZy .src-about-about-module__line-number--m4xIR {\n  margin-right: 10px;\n}\n.src-about-about-module__container--1nfrA .src-about-about-module__code-editor-container--37H9W .src-about-about-module__code-editor--2WFlH .src-about-about-module__line-number-container--2BS7B .src-about-about-module__line-container--2WsZy .src-about-about-module__code-line--31rN5 {\n  display: inline;\n  width: 100%;\n}\n.src-about-about-module__container--1nfrA .src-about-about-module__code-editor-container--37H9W .src-about-about-module__code-editor--2WFlH .src-about-about-module__client-editor--1EuTH {\n  width: 50%;\n  height: 100%;\n  border-right: 0.5px solid gray;\n}\n.src-about-about-module__container--1nfrA .src-about-about-module__code-editor-container--37H9W .src-about-about-module__code-editor--2WFlH .src-about-about-module__server-editor--1ooCq {\n  width: 50%;\n  height: 100%;\n}\n.src-about-about-module__container--1nfrA .src-about-about-module__main-content--2cOWH {\n  z-index: 3;\n  font-family: \"mainFont\";\n  display: flex;\n  font-size: 36px;\n  height: auto;\n  gap: 50px;\n  padding: 10px;\n  max-width: 1500px;\n  width: 100%;\n  justify-content: center;\n  align-items: center;\n}\n.src-about-about-module__container--1nfrA .src-about-about-module__main-content--2cOWH .src-about-about-module__text-content--juGBc {\n  color: white;\n  border-radius: 5px;\n  width: 30%;\n}\n@media (max-width: 920px) {\n  .src-about-about-module__container--1nfrA .src-about-about-module__main-content--2cOWH .src-about-about-module__text-content--juGBc {\n    width: 100%;\n  }\n}\n.src-about-about-module__container--1nfrA .src-about-about-module__main-content--2cOWH .src-about-about-module__text-content--juGBc .src-about-about-module__line-header--2--7M {\n  margin-bottom: 25px;\n}\n.src-about-about-module__container--1nfrA .src-about-about-module__main-content--2cOWH .src-about-about-module__text-content--juGBc .src-about-about-module__text-container--9ZqaE {\n  background: rgba(255, 255, 255, 0.03);\n  border-radius: 5px;\n  width: 100%;\n  padding: 30px 13px;\n  position: relative;\n}\n.src-about-about-module__container--1nfrA .src-about-about-module__main-content--2cOWH .src-about-about-module__text-content--juGBc .src-about-about-module__text-container--9ZqaE .src-about-about-module__main-header--Z9sdm {\n  margin-bottom: 15px;\n  background: #1e3264;\n  padding: 5px 80px 5px 13px;\n  margin-left: -30px;\n  font-size: 20px;\n  text-align: left;\n  white-space: nowrap;\n  width: fit-content;\n  line-height: 40px;\n}\n.src-about-about-module__container--1nfrA .src-about-about-module__main-content--2cOWH .src-about-about-module__text-content--juGBc .src-about-about-module__text-container--9ZqaE .src-about-about-module__react-header--d8kGo {\n  color: white;\n  z-index: 1;\n  height: fit-content;\n}\n.src-about-about-module__container--1nfrA .src-about-about-module__main-content--2cOWH .src-about-about-module__text-content--juGBc .src-about-about-module__description--2FAy5 {\n  font-family: secondary;\n  font-size: 12px;\n  right: 0;\n  padding: 10px;\n  background: rgba(255, 255, 255, 0.03);\n  line-height: 23px;\n  top: 0;\n  font-weight: 500;\n}\n@media (max-width: 920px) {\n  .src-about-about-module__container--1nfrA .src-about-about-module__main-content--2cOWH {\n    flex-direction: column-reverse;\n  }\n}\n\n@media (min-width: 576px) and (max-width: 767.98px) {\n  .src-about-about-module__main-content--2cOWH {\n    flex-direction: column-reverse;\n  }\n}", "",{"version":3,"sources":["webpack://./src/about/about.module.scss"],"names":[],"mappings":"AAAA;EACE,uBAAA;EACA,4DAAA;AACF;AACA;EACE,wBAAA;EACA,+DAAA;AACF;AAgBA;EACE,kBAAA;EACA,cAAA;EACA,mBAAA;EACA,mBAjBO;EAkBP,0BAAA;EACA,8BAAA;EACA,4BAAA;EACA,6BAAA;AAdF;AAeE;EACE,WAAA;EACA,aAAA;EACA,mBA1BG;EA2BH,YAAA;EACA,WAvBQ;EAwBR,4BAAA;EAtBF,kBAAA;EACA,SAAA;EACA,2BAAA;AAUF;AAaE;EACE,WAAA;EACA,UAAA;EACA,UAAA;EACA,WAAA;EACA,mBArCG;EAsCH,kBAAA;EA/BF,kBAAA;EACA,SAAA;EACA,2BAAA;AAqBF;;AAYA;EACE,aAAA;EACA,mBAxCM;EAyCN,YAAA;EACA,eAzCU;EAEV,kBAAA;EACA,SAAA;EACA,2BAAA;AA+BF;AAQE;EACE,WAAA;EACA,4BAAA;EACA,YAAA;EACA,eAAA;EACA,mBAlDG;EAIL,kBAAA;EACA,SAAA;EACA,2BAAA;AAyCF;AAME;EACE,WAAA;EACA,kBAAA;EACA,YAAA;EACA,eAvDQ;EAwDR,4BAAA;EACA,iDAAA;AAJJ;;AAOA;EACE,qDAAA;EACA,4BAAA;EACA,gBAAA;EACA,iBAAA;EAkDA,kBAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,gBAAA;AArDF;AAAE;EACE,kBAAA;EACA,YAAA;EACA,UAAA;AAEJ;AACI;EACE,WAAA;EACA,YAAA;AACN;AACI;EACE,aAAA;EACA,kBAAA;EACA,MAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;EACA,kBAAA;EACA,0DAAA;EACA,kBAAA;EACA,yBAAA;AACN;AAAM;EACE,aAAA;EACA,YAAA;EACA,WAAA;EACA,cAAA;EACA,QAAA;AAER;AADQ;EACE,aAAA;AAGV;AAFU;EACE,kBAAA;AAIZ;AAFU;EACE,eAAA;EACA,WAAA;AAIZ;AAAM;EACE,UAAA;EACA,YAAA;EACA,8BAAA;AAER;AAAM;EACE,UAAA;EACA,YAAA;AAER;AAOE;EACE,UAAA;EACA,uBAAA;EACA,aAAA;EACA,eAAA;EACA,YAAA;EACA,SAAA;EACA,aAAA;EACA,iBAAA;EACA,WAAA;EACA,uBAAA;EACA,mBAAA;AALJ;AAMI;EACE,YAAA;EACA,kBAAA;EAIA,UAAA;AAPN;AAIM;EAHF;IAII,WAAA;EADN;AACF;AAGM;EACE,mBAAA;AADR;AAGM;EACE,qCAAA;EACA,kBAAA;EACA,WAAA;EACA,kBAAA;EACA,kBAAA;AADR;AAEQ;EACE,mBAAA;EACA,mBAAA;EACA,0BAAA;EACA,kBAAA;EACA,eAAA;EACA,gBAAA;EACA,mBAAA;EACA,kBAAA;EACA,iBAAA;AAAV;AAEQ;EACE,YAAA;EACA,UAAA;EACA,mBAAA;AAAV;AAGM;EACE,sBAAA;EACA,eAAA;EACA,QAAA;EACA,aAAA;EACA,qCAAA;EACA,iBAAA;EACA,MAAA;EACA,gBAAA;AADR;AAII;EAxDF;IAyDI,8BAAA;EADJ;AACF;;AAMA;EACE;IACE,8BAAA;EAHF;AACF","sourcesContent":["@font-face {\r\n  font-family: \"mainFont\";\r\n  src: url(\"../fonts/circular-bold.woff2\") format(\"woff2\");\r\n}\r\n@font-face {\r\n  font-family: \"secondary\";\r\n  src: url(\"../fonts/VarelaRound-Regular.ttf\") format(\"truetype\");\r\n}\r\n$background: #2fac66;\r\n$base: #e6e8e7;\r\n$screen: #1a1e2c;\r\n$frame: #3f3f41;\r\n$open: #bcbdc1;\r\n$base2: #d1d2d4;\r\n$baseWidth: 130%;\r\n@mixin align-horizontal {\r\n  position: absolute;\r\n  left: 50%;\r\n  transform: translateX(-50%);\r\n}\r\n@media (max-width: 540px) {\r\n  $baseWidth: 130%;\r\n}\r\n.laptop {\r\n  position: relative;\r\n  margin: 0 auto;\r\n  padding-top: 50.25%;\r\n  background: $screen;\r\n  border: 15px solid $frame;\r\n  border-top: 20px solid $frame;\r\n  border-radius: 14px 14px 0 0;\r\n  box-shadow: 0 0 0 1px $base2;\r\n  &:before {\r\n    content: \"\";\r\n    bottom: -35px;\r\n    background: $base;\r\n    height: 20px;\r\n    width: $baseWidth;\r\n    border-radius: 0 0 10px 10px;\r\n    @include align-horizontal;\r\n  }\r\n  &:after {\r\n    content: \"\";\r\n    top: -12px;\r\n    width: 3px;\r\n    height: 3px;\r\n    background: $base;\r\n    border-radius: 50%;\r\n    @include align-horizontal;\r\n  }\r\n}\r\n.base {\r\n  bottom: -25px;\r\n  background: $base2;\r\n  height: 10px;\r\n  max-width: $baseWidth;\r\n  @include align-horizontal;\r\n  &:before {\r\n    content: \"\";\r\n    border-radius: 0 0 10px 10px;\r\n    height: 10px;\r\n    max-width: 80px;\r\n    background: $open;\r\n    @include align-horizontal;\r\n  }\r\n  &:after {\r\n    content: \"\";\r\n    position: absolute;\r\n    height: 20px;\r\n    max-width: $baseWidth;\r\n    border-radius: 0 0 10px 10px;\r\n    box-shadow: 0px 10px 36px -2px rgba(0, 0, 0, 0.4);\r\n  }\r\n}\r\n.container {\r\n  background: linear-gradient(-13deg, #2c5e92, #552f6d);\r\n  padding: 20px 30px 20px 30px;\r\n  overflow-y: auto;\r\n  min-height: 100vh;\r\n  .code-editor-container {\r\n    position: relative;\r\n    height: 100%;\r\n    width: 70%;\r\n    @media (max-width: 920px) {\r\n    }\r\n    .laptop-svg {\r\n      width: 100%;\r\n      height: 100%;\r\n    }\r\n    .code-editor {\r\n      display: flex;\r\n      overflow-y: hidden;\r\n      top: 0;\r\n      bottom: 0;\r\n      left: 0;\r\n      right: 0;\r\n      position: absolute;\r\n      font-family: monaco, Consolas, \"Lucida Console\", monospace;\r\n      border-radius: 8px;\r\n      background-color: #1a1e2c;\r\n      .line-number-container {\r\n        display: flex;\r\n        height: 100%;\r\n        width: 100%;\r\n        color: #55718d;\r\n        gap: 3px;\r\n        .line-container {\r\n          display: flex;\r\n          .line-number {\r\n            margin-right: 10px;\r\n          }\r\n          .code-line {\r\n            display: inline;\r\n            width: 100%;\r\n          }\r\n        }\r\n      }\r\n      .client-editor {\r\n        width: 50%;\r\n        height: 100%;\r\n        border-right: 0.5px solid gray;\r\n      }\r\n      .server-editor {\r\n        width: 50%;\r\n        height: 100%;\r\n      }\r\n    }\r\n  }\r\n  position: relative;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  overflow: hidden;\r\n  .main-content {\r\n    z-index: 3;\r\n    font-family: \"mainFont\";\r\n    display: flex;\r\n    font-size: 36px;\r\n    height: auto;\r\n    gap: 50px;\r\n    padding: 10px;\r\n    max-width: 1500px;\r\n    width: 100%;\r\n    justify-content: center;\r\n    align-items: center;\r\n    .text-content {\r\n      color: white;\r\n      border-radius: 5px;\r\n      @media (max-width: 920px) {\r\n        width: 100%;\r\n      }\r\n      width: 30%;\r\n      .line-header {\r\n        margin-bottom: 25px;\r\n      }\r\n      .text-container {\r\n        background: rgba(255, 255, 255, 0.03);\r\n        border-radius: 5px;\r\n        width: 100%;\r\n        padding: 30px 13px;\r\n        position: relative;\r\n        .main-header {\r\n          margin-bottom: 15px;\r\n          background: #1e3264;\r\n          padding: 5px 80px 5px 13px;\r\n          margin-left: -30px;\r\n          font-size: 20px;\r\n          text-align: left;\r\n          white-space: nowrap;\r\n          width: fit-content;\r\n          line-height: 40px;\r\n        }\r\n        .react-header {\r\n          color: white;\r\n          z-index: 1;\r\n          height: fit-content;\r\n        }\r\n      }\r\n      .description {\r\n        font-family: secondary;\r\n        font-size: 12px;\r\n        right: 0;\r\n        padding: 10px;\r\n        background: rgba(255, 255, 255, 0.03);\r\n        line-height: 23px;\r\n        top: 0;\r\n        font-weight: 500;\r\n      }\r\n    }\r\n    @media (max-width: 920px) {\r\n      flex-direction: column-reverse;\r\n    }\r\n  }\r\n}\r\n@media (max-width: 575.98px) {\r\n}\r\n@media (min-width: 576px) and (max-width: 767.98px) {\r\n  .main-content {\r\n    flex-direction: column-reverse;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"laptop": "src-about-about-module__laptop--1CuGL",
	"base": "src-about-about-module__base--1F0K8",
	"container": "src-about-about-module__container--1nfrA",
	"code-editor-container": "src-about-about-module__code-editor-container--37H9W",
	"laptop-svg": "src-about-about-module__laptop-svg--3WREb",
	"code-editor": "src-about-about-module__code-editor--2WFlH",
	"line-number-container": "src-about-about-module__line-number-container--2BS7B",
	"line-container": "src-about-about-module__line-container--2WsZy",
	"line-number": "src-about-about-module__line-number--m4xIR",
	"code-line": "src-about-about-module__code-line--31rN5",
	"client-editor": "src-about-about-module__client-editor--1EuTH",
	"server-editor": "src-about-about-module__server-editor--1ooCq",
	"main-content": "src-about-about-module__main-content--2cOWH",
	"text-content": "src-about-about-module__text-content--juGBc",
	"line-header": "src-about-about-module__line-header--2--7M",
	"text-container": "src-about-about-module__text-container--9ZqaE",
	"main-header": "src-about-about-module__main-header--Z9sdm",
	"react-header": "src-about-about-module__react-header--d8kGo",
	"description": "src-about-about-module__description--2FAy5"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/landing/landing.module.scss":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/landing/landing.module.scss ***!
  \**************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fonts_circular_bold_woff2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../fonts/circular-bold.woff2 */ "./src/fonts/circular-bold.woff2");
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_circular_bold_woff2__WEBPACK_IMPORTED_MODULE_3__);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"landingFont\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"woff2\");\n}\n* {\n  margin: 0;\n  list-style: none;\n  box-sizing: border-box;\n  padding: 0;\n}\n\n.src-landing-landing-module__wrapper--182Rm {\n  background: linear-gradient(#2c5e92, #552f6d);\n  overflow: auto;\n  min-height: 100vh;\n  display: flex;\n  padding: 30px;\n  align-items: center;\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG {\n  font-family: \"landingFont\";\n  max-width: 950px;\n  width: 100%;\n  margin-left: auto;\n  margin-right: auto;\n}\n@media (max-width: 950px) {\n  .src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG {\n    max-width: 750px;\n  }\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG {\n  display: flex;\n  gap: 10px;\n  justify-content: center;\n  display: flex;\n  justify-content: center;\n  width: 100% !important;\n  align-items: center;\n}\n@media (max-width: 795px) {\n  .src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG {\n    flex-direction: column;\n  }\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ {\n  z-index: 5;\n  padding: 15px;\n  color: black;\n  width: 33.33333333%;\n  height: fit-content;\n  padding-right: 15px;\n}\n@media (max-width: 795px) {\n  .src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ {\n    width: 100%;\n    padding: 0px;\n    text-align: center;\n  }\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ span {\n  z-index: 5;\n  padding: 13px;\n  border-radius: 3px;\n  color: white;\n  margin-left: 15px;\n  box-shadow: 0 2.8px 2.2px rgba(131, 96, 195, 0.4), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ .src-landing-landing-module__main-title--1lTwu {\n  text-align: left;\n  margin-bottom: 3rem;\n  font-size: 80px;\n  line-height: 1;\n}\n@media (max-width: 1094px) {\n  .src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ .src-landing-landing-module__main-title--1lTwu {\n    font-size: 60px;\n  }\n}\n@media (max-width: 795px) {\n  .src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ .src-landing-landing-module__main-title--1lTwu {\n    width: 100%;\n    text-align: center;\n  }\n}\n@media (max-width: 490px) {\n  .src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ .src-landing-landing-module__main-title--1lTwu {\n    font-size: 50px;\n  }\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ .src-landing-landing-module__description--2XxJD {\n  color: white;\n  margin-bottom: 20px;\n  font-size: 26px;\n  line-height: 1.2;\n  font-weight: 700;\n}\n@media (max-width: 1094px) {\n  .src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ .src-landing-landing-module__description--2XxJD {\n    font-size: 20px;\n  }\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__image-container--16PI7 {\n  display: flex;\n  width: 100%;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n@media (min-width: 950px) {\n  .src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__image-container--16PI7 {\n    width: 66.66666667%;\n  }\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__chat-project-container--1h4xc {\n  background-size: cover;\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B {\n  background-color: black;\n  cursor: pointer;\n  flex: 0 0 32.5%;\n  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);\n  border-radius: 5px;\n  float: left;\n  overflow: hidden;\n  position: relative;\n}\n@media (max-width: 540px) {\n  .src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B {\n    flex: 0 0 32.3%;\n  }\n}\n@media (max-width: 450px) {\n  .src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B {\n    flex: 0 0 31%;\n  }\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B .src-landing-landing-module__git-icon--1XfIT {\n  display: none;\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B:hover {\n  background-color: rgba(0, 0, 0, 0.9);\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B:hover .src-landing-landing-module__git-icon--1XfIT {\n  position: absolute;\n  fill: rgba(255, 255, 255, 0.4);\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  width: 55px;\n  height: 55px;\n  display: block;\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B:hover .src-landing-landing-module__project-image--32a8k {\n  opacity: 0.3;\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B .src-landing-landing-module__portfolio-image--2T82W {\n  opacity: 0.5 !important;\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B .src-landing-landing-module__project-image--32a8k {\n  display: block;\n  object-fit: cover;\n  opacity: 0.8;\n  width: 100%;\n  height: 100%;\n  background: white;\n}\n\n.src-landing-landing-module__tech-wrapper--1RRr1 {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  margin-top: 10px;\n  gap: 15px;\n}\n.src-landing-landing-module__tech-wrapper--1RRr1 .src-landing-landing-module__tech-container-title--1pA4N {\n  border-bottom: 0.3px solid rgba(255, 255, 255, 0.05);\n  font-size: 23px;\n  color: white;\n}\n@media (max-width: 795px) {\n  .src-landing-landing-module__tech-wrapper--1RRr1 .src-landing-landing-module__tech-container-title--1pA4N {\n    width: 100%;\n    text-align: center;\n  }\n}\n.src-landing-landing-module__tech-wrapper--1RRr1 .src-landing-landing-module__tech-icon-container--NPkGO {\n  display: flex;\n  box-shadow: 0 2.8px 2.2px rgba(131, 96, 195, 0.4), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);\n  background: rgba(255, 255, 255, 0.05);\n  padding: 5px;\n  align-items: flex-end;\n  gap: 20px;\n  width: 100%;\n  justify-content: space-evenly;\n}\n.src-landing-landing-module__tech-wrapper--1RRr1 .src-landing-landing-module__tech-icon-container--NPkGO .src-landing-landing-module__icon-container--y-shs {\n  display: flex;\n  transform: translateY(4px);\n  width: 5%;\n  flex-direction: column;\n  position: relative;\n  align-items: center;\n  justify-content: space-between;\n}\n@media (max-width: 490px) {\n  .src-landing-landing-module__tech-wrapper--1RRr1 .src-landing-landing-module__tech-icon-container--NPkGO .src-landing-landing-module__icon-container--y-shs {\n    width: 10%;\n    height: 100%;\n  }\n}\n.src-landing-landing-module__tech-wrapper--1RRr1 .src-landing-landing-module__tech-icon-container--NPkGO .src-landing-landing-module__icon-container--y-shs .src-landing-landing-module__icon-label--2iAsB {\n  text-align: center;\n  z-index: 5;\n  color: white;\n  white-space: nowrap;\n}\n.src-landing-landing-module__tech-wrapper--1RRr1 .src-landing-landing-module__tech-icon-container--NPkGO .src-landing-landing-module__icon-container--y-shs .src-landing-landing-module__tech-icon--18Hys {\n  fill: rgba(255, 255, 255, 0.7);\n}", "",{"version":3,"sources":["webpack://./src/landing/landing.module.scss"],"names":[],"mappings":"AAAA;EACE,0BAAA;EACA,4DAAA;AACF;AACA;EACE,SAAA;EACA,gBAAA;EACA,sBAAA;EACA,UAAA;AACF;;AACA;EACE,6CAAA;EACA,cAAA;EACA,iBAAA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;AAEF;AADE;EACE,0BAAA;EACA,gBAAA;EAIA,WAAA;EACA,iBAAA;EACA,kBAAA;AAAJ;AALI;EAHF;IAII,gBAAA;EAQJ;AACF;AAJI;EAIE,aAAA;EACA,SAAA;EACA,uBAAA;EACA,aAAA;EACA,uBAAA;EACA,sBAAA;EACA,mBAAA;AAGN;AAZM;EADF;IAEI,sBAAA;EAeN;AACF;AAPM;EACE,UAAA;EACA,aAAA;EACA,YAAA;EACA,mBAAA;EAMA,mBAAA;EACA,mBAAA;AAIR;AAVQ;EALF;IAMI,WAAA;IACA,YAAA;IACA,kBAAA;EAaR;AACF;AAVQ;EACE,UAAA;EACA,aAAA;EACA,kBAAA;EACA,YAAA;EACA,iBAAA;EACA,sOAAA;AAYV;AALQ;EACE,gBAAA;EACA,mBAAA;EACA,eAAA;EACA,cAAA;AAOV;AANU;EALF;IAMI,eAAA;EASV;AACF;AARU;EARF;IASI,WAAA;IACA,kBAAA;EAWV;AACF;AAVU;EAZF;IAaI,eAAA;EAaV;AACF;AAXQ;EACE,YAAA;EACA,mBAAA;EACA,eAAA;EAMA,gBAAA;EACA,gBAAA;AAQV;AAdU;EAJF;IAKI,eAAA;EAiBV;AACF;AAVM;EACE,aAAA;EACA,WAAA;EAIA,eAAA;EACA,QAAA;AASR;AAbQ;EAHF;IAII,mBAAA;EAgBR;AACF;AAbQ;EACE,sBAAA;AAeV;AAbQ;EAWE,uBAAA;EACA,eAAA;EACA,eAAA;EACA,mOAAA;EAMA,kBAAA;EACA,WAAA;EACA,gBAAA;EACA,kBAAA;AAAV;AAtBU;EADF;IAEI,eAAA;EAyBV;AACF;AAxBU;EAJF;IAKI,aAAA;EA2BV;AACF;AA1BU;EACE,aAAA;AA4BZ;AAZU;EACE,oCAAA;AAcZ;AAbY;EACE,kBAAA;EACA,8BAAA;EACA,MAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;EACA,YAAA;EACA,WAAA;EACA,YAAA;EACA,cAAA;AAed;AAbY;EACE,YAAA;AAed;AAZU;EACE,uBAAA;AAcZ;AAZU;EACE,cAAA;EACA,iBAAA;EACA,YAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;AAcZ;;AAPA;EACE,aAAA;EACA,uBAAA;EACA,sBAAA;EACA,gBAAA;EACA,SAAA;AAUF;AATE;EACE,oDAAA;EACA,eAAA;EACA,YAAA;AAWJ;AAVI;EAJF;IAKI,WAAA;IACA,kBAAA;EAaJ;AACF;AAXE;EACE,aAAA;EACA,sOAAA;EAIA,qCAAA;EACA,YAAA;EACA,qBAAA;EACA,SAAA;EACA,WAAA;EACA,6BAAA;AAUJ;AATI;EACE,aAAA;EACA,0BAAA;EACA,SAAA;EACA,sBAAA;EACA,kBAAA;EACA,mBAAA;EACA,8BAAA;AAWN;AAVM;EARF;IASI,UAAA;IACA,YAAA;EAaN;AACF;AAZM;EACE,kBAAA;EACA,UAAA;EACA,YAAA;EACA,mBAAA;AAcR;AAZM;EACE,8BAAA;AAcR","sourcesContent":["@font-face {\r\n  font-family: \"landingFont\";\r\n  src: url(\"../fonts/circular-bold.woff2\") format(\"woff2\");\r\n}\r\n* {\r\n  margin: 0;\r\n  list-style: none;\r\n  box-sizing: border-box;\r\n  padding: 0;\r\n}\r\n.wrapper {\r\n  background: linear-gradient(#2c5e92, #552f6d);\r\n  overflow: auto;\r\n  min-height: 100vh;\r\n  display: flex;\r\n  padding: 30px;\r\n  align-items: center;\r\n  .center-container {\r\n    font-family: \"landingFont\";\r\n    max-width: 950px;\r\n    @media (max-width: 950px) {\r\n      max-width: 750px;\r\n    }\r\n    width: 100%;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    .container {\r\n      @media (max-width: 795px) {\r\n        flex-direction: column;\r\n      }\r\n      display: flex;\r\n      gap: 10px;\r\n      justify-content: center;\r\n      display: flex;\r\n      justify-content: center;\r\n      width: 100% !important;\r\n      align-items: center;\r\n      .text-container {\r\n        z-index: 5;\r\n        padding: 15px;\r\n        color: black;\r\n        width: 33.33333333%;\r\n        @media (max-width: 795px) {\r\n          width: 100%;\r\n          padding: 0px;\r\n          text-align: center;\r\n        }\r\n        height: fit-content;\r\n        padding-right: 15px;\r\n        span {\r\n          z-index: 5;\r\n          padding: 13px;\r\n          border-radius: 3px;\r\n          color: white;\r\n          margin-left: 15px;\r\n          box-shadow: 0 2.8px 2.2px rgba(131, 96, 195, 0.4),\r\n            0 6.7px 5.3px rgba(0, 0, 0, 0.048),\r\n            0 12.5px 10px rgba(0, 0, 0, 0.06),\r\n            0 22.3px 17.9px rgba(0, 0, 0, 0.072),\r\n            0 41.8px 33.4px rgba(0, 0, 0, 0.086),\r\n            0 100px 80px rgba(0, 0, 0, 0.12);\r\n        }\r\n        .main-title {\r\n          text-align: left;\r\n          margin-bottom: 3rem;\r\n          font-size: 80px;\r\n          line-height: 1;\r\n          @media (max-width: 1094px) {\r\n            font-size: 60px;\r\n          }\r\n          @media (max-width: 795px) {\r\n            width: 100%;\r\n            text-align: center;\r\n          }\r\n          @media (max-width: 490px) {\r\n            font-size: 50px;\r\n          }\r\n        }\r\n        .description {\r\n          color: white;\r\n          margin-bottom: 20px;\r\n          font-size: 26px;\r\n          @media (max-width: 1094px) {\r\n            font-size: 20px;\r\n          }\r\n          @media (max-width: 490px) {\r\n          }\r\n          line-height: 1.2;\r\n          font-weight: 700;\r\n        }\r\n      }\r\n      .image-container {\r\n        display: flex;\r\n        width: 100%;\r\n        @media (min-width: 950px) {\r\n          width: 66.66666667%;\r\n        }\r\n        flex-wrap: wrap;\r\n        gap: 6px;\r\n        .chat-project-container {\r\n          background-size: cover;\r\n        }\r\n        .project-container {\r\n          @media (max-width: 540px) {\r\n            flex: 0 0 32.3%;\r\n          }\r\n          @media (max-width: 450px) {\r\n            flex: 0 0 31%;\r\n          }\r\n          .git-icon {\r\n            display: none;\r\n          }\r\n          // opacity: 0;\r\n          background-color: black;\r\n          cursor: pointer;\r\n          flex: 0 0 32.5%;\r\n          box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),\r\n            0 6.7px 5.3px rgba(0, 0, 0, 0.048),\r\n            0 12.5px 10px rgba(0, 0, 0, 0.06),\r\n            0 22.3px 17.9px rgba(0, 0, 0, 0.072),\r\n            0 41.8px 33.4px rgba(0, 0, 0, 0.086),\r\n            0 100px 80px rgba(0, 0, 0, 0.12);\r\n          border-radius: 5px;\r\n          float: left;\r\n          overflow: hidden;\r\n          position: relative;\r\n          &:hover {\r\n            background-color: rgba(0, 0, 0, 0.9);\r\n            .git-icon {\r\n              position: absolute;\r\n              fill: rgba(255, 255, 255, 0.4);\r\n              top: 0;\r\n              bottom: 0;\r\n              left: 0;\r\n              right: 0;\r\n              margin: auto;\r\n              width: 55px;\r\n              height: 55px;\r\n              display: block;\r\n            }\r\n            .project-image {\r\n              opacity: 0.3;\r\n            }\r\n          }\r\n          .portfolio-image {\r\n            opacity: 0.5 !important;\r\n          }\r\n          .project-image {\r\n            display: block;\r\n            object-fit: cover;\r\n            opacity: 0.8;\r\n            width: 100%;\r\n            height: 100%;\r\n            background: white;\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n.tech-wrapper {\r\n  display: flex;\r\n  justify-content: center;\r\n  flex-direction: column;\r\n  margin-top: 10px;\r\n  gap: 15px;\r\n  .tech-container-title {\r\n    border-bottom: 0.3px solid rgba(255, 255, 255, 0.05);\r\n    font-size: 23px;\r\n    color: white;\r\n    @media (max-width: 795px) {\r\n      width: 100%;\r\n      text-align: center;\r\n    }\r\n  }\r\n  .tech-icon-container {\r\n    display: flex;\r\n    box-shadow: 0 2.8px 2.2px rgba(131, 96, 195, 0.4),\r\n      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),\r\n      0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),\r\n      0 100px 80px rgba(0, 0, 0, 0.12);\r\n    background: rgba(255, 255, 255, 0.05);\r\n    padding: 5px;\r\n    align-items: flex-end;\r\n    gap: 20px;\r\n    width: 100%;\r\n    justify-content: space-evenly;\r\n    .icon-container {\r\n      display: flex;\r\n      transform: translateY(4px);\r\n      width: 5%;\r\n      flex-direction: column;\r\n      position: relative;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n      @media (max-width: 490px) {\r\n        width: 10%;\r\n        height: 100%;\r\n      }\r\n      .icon-label {\r\n        text-align: center;\r\n        z-index: 5;\r\n        color: white;\r\n        white-space: nowrap;\r\n      }\r\n      .tech-icon {\r\n        fill: rgba(255, 255, 255, 0.7);\r\n      }\r\n    }\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"wrapper": "src-landing-landing-module__wrapper--182Rm",
	"center-container": "src-landing-landing-module__center-container--2LFQG",
	"container": "src-landing-landing-module__container--2iwrG",
	"text-container": "src-landing-landing-module__text-container--21gR_",
	"main-title": "src-landing-landing-module__main-title--1lTwu",
	"description": "src-landing-landing-module__description--2XxJD",
	"image-container": "src-landing-landing-module__image-container--16PI7",
	"chat-project-container": "src-landing-landing-module__chat-project-container--1h4xc",
	"project-container": "src-landing-landing-module__project-container--2ah1B",
	"git-icon": "src-landing-landing-module__git-icon--1XfIT",
	"project-image": "src-landing-landing-module__project-image--32a8k",
	"portfolio-image": "src-landing-landing-module__portfolio-image--2T82W",
	"tech-wrapper": "src-landing-landing-module__tech-wrapper--1RRr1",
	"tech-container-title": "src-landing-landing-module__tech-container-title--1pA4N",
	"tech-icon-container": "src-landing-landing-module__tech-icon-container--NPkGO",
	"icon-container": "src-landing-landing-module__icon-container--y-shs",
	"icon-label": "src-landing-landing-module__icon-label--2iAsB",
	"tech-icon": "src-landing-landing-module__tech-icon--18Hys"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/navbar/navbar.module.scss":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/navbar/navbar.module.scss ***!
  \************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".src-navbar-navbar-module__container--1NruU {\n  position: fixed;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  z-index: 5;\n  padding: 20px;\n}\n@media (max-width: 1605px) {\n  .src-navbar-navbar-module__container--1NruU {\n    right: 20px;\n    top: 20px;\n    bottom: auto;\n    flex-direction: row;\n    left: auto;\n  }\n}\n.src-navbar-navbar-module__container--1NruU .src-navbar-navbar-module__contact-icon-container--1zRlU {\n  display: flex;\n  gap: 20px;\n  flex-direction: column;\n  position: relative;\n  height: fit-content;\n}\n@media (max-width: 1605px) {\n  .src-navbar-navbar-module__container--1NruU .src-navbar-navbar-module__contact-icon-container--1zRlU {\n    flex-direction: row;\n  }\n}\n.src-navbar-navbar-module__container--1NruU .src-navbar-navbar-module__contact-icon-container--1zRlU .src-navbar-navbar-module__contact-icon--lc3gS {\n  fill: rgba(255, 255, 255, 0.7);\n  width: 20px;\n  cursor: pointer;\n  height: 20px;\n}\n@media (max-width: 1630.98px) {\n  .src-navbar-navbar-module__container--1NruU .src-navbar-navbar-module__contact-icon-container--1zRlU .src-navbar-navbar-module__contact-icon--lc3gS {\n    fill: white;\n  }\n}\n.src-navbar-navbar-module__container--1NruU .src-navbar-navbar-module__contact-icon-container--1zRlU .src-navbar-navbar-module__contact-icon--lc3gS:hover {\n  fill: white;\n}\n.src-navbar-navbar-module__container--1NruU .src-navbar-navbar-module__divider-line--2epa_ {\n  height: 85%;\n  position: absolute;\n  background: rgba(255, 255, 255, 0.28);\n  top: 150px;\n  left: 0;\n  right: 0;\n  display: none;\n  margin: 0 auto;\n  width: 2px;\n}", "",{"version":3,"sources":["webpack://./src/navbar/navbar.module.scss"],"names":[],"mappings":"AAAA;EACE,eAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,MAAA;EACA,OAAA;EACA,SAAA;EACA,UAAA;EACA,aAAA;AACF;AAAE;EAVF;IAWI,WAAA;IACA,SAAA;IACA,YAAA;IACA,mBAAA;IACA,UAAA;EAGF;AACF;AAFE;EAIE,aAAA;EACA,SAAA;EACA,sBAAA;EACA,kBAAA;EACA,mBAAA;AACJ;AARI;EADF;IAEI,mBAAA;EAWJ;AACF;AALI;EACE,8BAAA;EACA,WAAA;EACA,eAAA;EACA,YAAA;AAON;AANM;EALF;IAMI,WAAA;EASN;AACF;AARM;EACE,WAAA;AAUR;AANE;EACE,WAAA;EACA,kBAAA;EACA,qCAAA;EACA,UAAA;EACA,OAAA;EACA,QAAA;EACA,aAAA;EACA,cAAA;EACA,UAAA;AAQJ","sourcesContent":[".container {\r\n  position: fixed;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  top: 0;\r\n  left: 0;\r\n  bottom: 0;\r\n  z-index: 5;\r\n  padding: 20px;\r\n  @media (max-width: 1605px) {\r\n    right: 20px;\r\n    top: 20px;\r\n    bottom: auto;\r\n    flex-direction: row;\r\n    left: auto;\r\n  }\r\n  .contact-icon-container {\r\n    @media (max-width: 1605px) {\r\n      flex-direction: row;\r\n    }\r\n    display: flex;\r\n    gap: 20px;\r\n    flex-direction: column;\r\n    position: relative;\r\n    height: fit-content;\r\n    .contact-icon {\r\n      fill: rgba(255, 255, 255, 0.7);\r\n      width: 20px;\r\n      cursor: pointer;\r\n      height: 20px;\r\n      @media (max-width: 1630.98px) {\r\n        fill: white;\r\n      }\r\n      &:hover {\r\n        fill: white;\r\n      }\r\n    }\r\n  }\r\n  .divider-line {\r\n    height: 85%;\r\n    position: absolute;\r\n    background: rgba(255, 255, 255, 0.28);\r\n    top: 150px;\r\n    left: 0;\r\n    right: 0;\r\n    display: none;\r\n    margin: 0 auto;\r\n    width: 2px;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"container": "src-navbar-navbar-module__container--1NruU",
	"contact-icon-container": "src-navbar-navbar-module__contact-icon-container--1zRlU",
	"contact-icon": "src-navbar-navbar-module__contact-icon--lc3gS",
	"divider-line": "src-navbar-navbar-module__divider-line--2epa_"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/prismjs/components/prism-clike.js":
/*!********************************************************!*\
  !*** ./node_modules/prismjs/components/prism-clike.js ***!
  \********************************************************/
/***/ (() => {

Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true,
			greedy: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}
	],
	'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
		lookbehind: true,
		inside: {
			'punctuation': /[.\\]/
		}
	},
	'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(?:true|false)\b/,
	'function': /\w+(?=\()/,
	'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
	'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
	'punctuation': /[{}[\];(),.:]/
};


/***/ }),

/***/ "./node_modules/prismjs/components/prism-core.js":
/*!*******************************************************!*\
  !*** ./node_modules/prismjs/components/prism-core.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/// <reference lib="WebWorker"/>

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
		? self // if in worker
		: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
var Prism = (function (_self){

// Private helper vars
var lang = /\blang(?:uage)?-([\w-]+)\b/i;
var uniqueId = 0;


var _ = {
	/**
	 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
	 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
	 * additional languages or plugins yourself.
	 *
	 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
	 *
	 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
	 * empty Prism object into the global scope before loading the Prism script like this:
	 *
	 * ```js
	 * window.Prism = window.Prism || {};
	 * Prism.manual = true;
	 * // add a new <script> to load Prism's script
	 * ```
	 *
	 * @default false
	 * @type {boolean}
	 * @memberof Prism
	 * @public
	 */
	manual: _self.Prism && _self.Prism.manual,
	disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

	/**
	 * A namespace for utility methods.
	 *
	 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
	 * change or disappear at any time.
	 *
	 * @namespace
	 * @memberof Prism
	 */
	util: {
		encode: function encode(tokens) {
			if (tokens instanceof Token) {
				return new Token(tokens.type, encode(tokens.content), tokens.alias);
			} else if (Array.isArray(tokens)) {
				return tokens.map(encode);
			} else {
				return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			}
		},

		/**
		 * Returns the name of the type of the given value.
		 *
		 * @param {any} o
		 * @returns {string}
		 * @example
		 * type(null)      === 'Null'
		 * type(undefined) === 'Undefined'
		 * type(123)       === 'Number'
		 * type('foo')     === 'String'
		 * type(true)      === 'Boolean'
		 * type([1, 2])    === 'Array'
		 * type({})        === 'Object'
		 * type(String)    === 'Function'
		 * type(/abc+/)    === 'RegExp'
		 */
		type: function (o) {
			return Object.prototype.toString.call(o).slice(8, -1);
		},

		/**
		 * Returns a unique number for the given object. Later calls will still return the same number.
		 *
		 * @param {Object} obj
		 * @returns {number}
		 */
		objId: function (obj) {
			if (!obj['__id']) {
				Object.defineProperty(obj, '__id', { value: ++uniqueId });
			}
			return obj['__id'];
		},

		/**
		 * Creates a deep clone of the given object.
		 *
		 * The main intended use of this function is to clone language definitions.
		 *
		 * @param {T} o
		 * @param {Record<number, any>} [visited]
		 * @returns {T}
		 * @template T
		 */
		clone: function deepClone(o, visited) {
			visited = visited || {};

			var clone, id;
			switch (_.util.type(o)) {
				case 'Object':
					id = _.util.objId(o);
					if (visited[id]) {
						return visited[id];
					}
					clone = /** @type {Record<string, any>} */ ({});
					visited[id] = clone;

					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							clone[key] = deepClone(o[key], visited);
						}
					}

					return /** @type {any} */ (clone);

				case 'Array':
					id = _.util.objId(o);
					if (visited[id]) {
						return visited[id];
					}
					clone = [];
					visited[id] = clone;

					(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
						clone[i] = deepClone(v, visited);
					});

					return /** @type {any} */ (clone);

				default:
					return o;
			}
		},

		/**
		 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
		 *
		 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
		 *
		 * @param {Element} element
		 * @returns {string}
		 */
		getLanguage: function (element) {
			while (element && !lang.test(element.className)) {
				element = element.parentElement;
			}
			if (element) {
				return (element.className.match(lang) || [, 'none'])[1].toLowerCase();
			}
			return 'none';
		},

		/**
		 * Returns the script element that is currently executing.
		 *
		 * This does __not__ work for line script element.
		 *
		 * @returns {HTMLScriptElement | null}
		 */
		currentScript: function () {
			if (typeof document === 'undefined') {
				return null;
			}
			if ('currentScript' in document && 1 < 2 /* hack to trip TS' flow analysis */) {
				return /** @type {any} */ (document.currentScript);
			}

			// IE11 workaround
			// we'll get the src of the current script by parsing IE11's error stack trace
			// this will not work for inline scripts

			try {
				throw new Error();
			} catch (err) {
				// Get file src url from stack. Specifically works with the format of stack traces in IE.
				// A stack will look like this:
				//
				// Error
				//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
				//    at Global code (http://localhost/components/prism-core.js:606:1)

				var src = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(err.stack) || [])[1];
				if (src) {
					var scripts = document.getElementsByTagName('script');
					for (var i in scripts) {
						if (scripts[i].src == src) {
							return scripts[i];
						}
					}
				}
				return null;
			}
		},

		/**
		 * Returns whether a given class is active for `element`.
		 *
		 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
		 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
		 * given class is just the given class with a `no-` prefix.
		 *
		 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
		 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
		 * ancestors have the given class or the negated version of it, then the default activation will be returned.
		 *
		 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
		 * version of it, the class is considered active.
		 *
		 * @param {Element} element
		 * @param {string} className
		 * @param {boolean} [defaultActivation=false]
		 * @returns {boolean}
		 */
		isActive: function (element, className, defaultActivation) {
			var no = 'no-' + className;

			while (element) {
				var classList = element.classList;
				if (classList.contains(className)) {
					return true;
				}
				if (classList.contains(no)) {
					return false;
				}
				element = element.parentElement;
			}
			return !!defaultActivation;
		}
	},

	/**
	 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
	 *
	 * @namespace
	 * @memberof Prism
	 * @public
	 */
	languages: {
		/**
		 * Creates a deep copy of the language with the given id and appends the given tokens.
		 *
		 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
		 * will be overwritten at its original position.
		 *
		 * ## Best practices
		 *
		 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
		 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
		 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
		 *
		 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
		 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
		 *
		 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
		 * @param {Grammar} redef The new tokens to append.
		 * @returns {Grammar} The new language created.
		 * @public
		 * @example
		 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
		 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
		 *     // at its original position
		 *     'comment': { ... },
		 *     // CSS doesn't have a 'color' token, so this token will be appended
		 *     'color': /\b(?:red|green|blue)\b/
		 * });
		 */
		extend: function (id, redef) {
			var lang = _.util.clone(_.languages[id]);

			for (var key in redef) {
				lang[key] = redef[key];
			}

			return lang;
		},

		/**
		 * Inserts tokens _before_ another token in a language definition or any other grammar.
		 *
		 * ## Usage
		 *
		 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
		 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
		 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
		 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
		 * this:
		 *
		 * ```js
		 * Prism.languages.markup.style = {
		 *     // token
		 * };
		 * ```
		 *
		 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
		 * before existing tokens. For the CSS example above, you would use it like this:
		 *
		 * ```js
		 * Prism.languages.insertBefore('markup', 'cdata', {
		 *     'style': {
		 *         // token
		 *     }
		 * });
		 * ```
		 *
		 * ## Special cases
		 *
		 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
		 * will be ignored.
		 *
		 * This behavior can be used to insert tokens after `before`:
		 *
		 * ```js
		 * Prism.languages.insertBefore('markup', 'comment', {
		 *     'comment': Prism.languages.markup.comment,
		 *     // tokens after 'comment'
		 * });
		 * ```
		 *
		 * ## Limitations
		 *
		 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
		 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
		 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
		 * deleting properties which is necessary to insert at arbitrary positions.
		 *
		 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
		 * Instead, it will create a new object and replace all references to the target object with the new one. This
		 * can be done without temporarily deleting properties, so the iteration order is well-defined.
		 *
		 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
		 * you hold the target object in a variable, then the value of the variable will not change.
		 *
		 * ```js
		 * var oldMarkup = Prism.languages.markup;
		 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
		 *
		 * assert(oldMarkup !== Prism.languages.markup);
		 * assert(newMarkup === Prism.languages.markup);
		 * ```
		 *
		 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
		 * object to be modified.
		 * @param {string} before The key to insert before.
		 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
		 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
		 * object to be modified.
		 *
		 * Defaults to `Prism.languages`.
		 * @returns {Grammar} The new grammar object.
		 * @public
		 */
		insertBefore: function (inside, before, insert, root) {
			root = root || /** @type {any} */ (_.languages);
			var grammar = root[inside];
			/** @type {Grammar} */
			var ret = {};

			for (var token in grammar) {
				if (grammar.hasOwnProperty(token)) {

					if (token == before) {
						for (var newToken in insert) {
							if (insert.hasOwnProperty(newToken)) {
								ret[newToken] = insert[newToken];
							}
						}
					}

					// Do not insert token which also occur in insert. See #1525
					if (!insert.hasOwnProperty(token)) {
						ret[token] = grammar[token];
					}
				}
			}

			var old = root[inside];
			root[inside] = ret;

			// Update references in other language definitions
			_.languages.DFS(_.languages, function(key, value) {
				if (value === old && key != inside) {
					this[key] = ret;
				}
			});

			return ret;
		},

		// Traverse a language definition with Depth First Search
		DFS: function DFS(o, callback, type, visited) {
			visited = visited || {};

			var objId = _.util.objId;

			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					callback.call(o, i, o[i], type || i);

					var property = o[i],
					    propertyType = _.util.type(property);

					if (propertyType === 'Object' && !visited[objId(property)]) {
						visited[objId(property)] = true;
						DFS(property, callback, null, visited);
					}
					else if (propertyType === 'Array' && !visited[objId(property)]) {
						visited[objId(property)] = true;
						DFS(property, callback, i, visited);
					}
				}
			}
		}
	},

	plugins: {},

	/**
	 * This is the most high-level function in Prism???s API.
	 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
	 * each one of them.
	 *
	 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
	 *
	 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
	 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
	 * @memberof Prism
	 * @public
	 */
	highlightAll: function(async, callback) {
		_.highlightAllUnder(document, async, callback);
	},

	/**
	 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
	 * {@link Prism.highlightElement} on each one of them.
	 *
	 * The following hooks will be run:
	 * 1. `before-highlightall`
	 * 2. `before-all-elements-highlight`
	 * 3. All hooks of {@link Prism.highlightElement} for each element.
	 *
	 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
	 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
	 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
	 * @memberof Prism
	 * @public
	 */
	highlightAllUnder: function(container, async, callback) {
		var env = {
			callback: callback,
			container: container,
			selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
		};

		_.hooks.run('before-highlightall', env);

		env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

		_.hooks.run('before-all-elements-highlight', env);

		for (var i = 0, element; element = env.elements[i++];) {
			_.highlightElement(element, async === true, env.callback);
		}
	},

	/**
	 * Highlights the code inside a single element.
	 *
	 * The following hooks will be run:
	 * 1. `before-sanity-check`
	 * 2. `before-highlight`
	 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
	 * 4. `before-insert`
	 * 5. `after-highlight`
	 * 6. `complete`
	 *
	 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
	 * the element's language.
	 *
	 * @param {Element} element The element containing the code.
	 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
	 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
	 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
	 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
	 *
	 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
	 * asynchronous highlighting to work. You can build your own bundle on the
	 * [Download page](https://prismjs.com/download.html).
	 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
	 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
	 * @memberof Prism
	 * @public
	 */
	highlightElement: function(element, async, callback) {
		// Find language
		var language = _.util.getLanguage(element);
		var grammar = _.languages[language];

		// Set language on the element, if not present
		element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

		// Set language on the parent, for styling
		var parent = element.parentElement;
		if (parent && parent.nodeName.toLowerCase() === 'pre') {
			parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
		}

		var code = element.textContent;

		var env = {
			element: element,
			language: language,
			grammar: grammar,
			code: code
		};

		function insertHighlightedCode(highlightedCode) {
			env.highlightedCode = highlightedCode;

			_.hooks.run('before-insert', env);

			env.element.innerHTML = env.highlightedCode;

			_.hooks.run('after-highlight', env);
			_.hooks.run('complete', env);
			callback && callback.call(env.element);
		}

		_.hooks.run('before-sanity-check', env);

		if (!env.code) {
			_.hooks.run('complete', env);
			callback && callback.call(env.element);
			return;
		}

		_.hooks.run('before-highlight', env);

		if (!env.grammar) {
			insertHighlightedCode(_.util.encode(env.code));
			return;
		}

		if (async && _self.Worker) {
			var worker = new Worker(_.filename);

			worker.onmessage = function(evt) {
				insertHighlightedCode(evt.data);
			};

			worker.postMessage(JSON.stringify({
				language: env.language,
				code: env.code,
				immediateClose: true
			}));
		}
		else {
			insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
		}
	},

	/**
	 * Low-level function, only use if you know what you???re doing. It accepts a string of text as input
	 * and the language definitions to use, and returns a string with the HTML produced.
	 *
	 * The following hooks will be run:
	 * 1. `before-tokenize`
	 * 2. `after-tokenize`
	 * 3. `wrap`: On each {@link Token}.
	 *
	 * @param {string} text A string with the code to be highlighted.
	 * @param {Grammar} grammar An object containing the tokens to use.
	 *
	 * Usually a language definition like `Prism.languages.markup`.
	 * @param {string} language The name of the language definition passed to `grammar`.
	 * @returns {string} The highlighted HTML.
	 * @memberof Prism
	 * @public
	 * @example
	 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
	 */
	highlight: function (text, grammar, language) {
		var env = {
			code: text,
			grammar: grammar,
			language: language
		};
		_.hooks.run('before-tokenize', env);
		env.tokens = _.tokenize(env.code, env.grammar);
		_.hooks.run('after-tokenize', env);
		return Token.stringify(_.util.encode(env.tokens), env.language);
	},

	/**
	 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
	 * and the language definitions to use, and returns an array with the tokenized code.
	 *
	 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
	 *
	 * This method could be useful in other contexts as well, as a very crude parser.
	 *
	 * @param {string} text A string with the code to be highlighted.
	 * @param {Grammar} grammar An object containing the tokens to use.
	 *
	 * Usually a language definition like `Prism.languages.markup`.
	 * @returns {TokenStream} An array of strings and tokens, a token stream.
	 * @memberof Prism
	 * @public
	 * @example
	 * let code = `var foo = 0;`;
	 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
	 * tokens.forEach(token => {
	 *     if (token instanceof Prism.Token && token.type === 'number') {
	 *         console.log(`Found numeric literal: ${token.content}`);
	 *     }
	 * });
	 */
	tokenize: function(text, grammar) {
		var rest = grammar.rest;
		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		var tokenList = new LinkedList();
		addAfter(tokenList, tokenList.head, text);

		matchGrammar(text, tokenList, grammar, tokenList.head, 0);

		return toArray(tokenList);
	},

	/**
	 * @namespace
	 * @memberof Prism
	 * @public
	 */
	hooks: {
		all: {},

		/**
		 * Adds the given callback to the list of callbacks for the given hook.
		 *
		 * The callback will be invoked when the hook it is registered for is run.
		 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
		 *
		 * One callback function can be registered to multiple hooks and the same hook multiple times.
		 *
		 * @param {string} name The name of the hook.
		 * @param {HookCallback} callback The callback function which is given environment variables.
		 * @public
		 */
		add: function (name, callback) {
			var hooks = _.hooks.all;

			hooks[name] = hooks[name] || [];

			hooks[name].push(callback);
		},

		/**
		 * Runs a hook invoking all registered callbacks with the given environment variables.
		 *
		 * Callbacks will be invoked synchronously and in the order in which they were registered.
		 *
		 * @param {string} name The name of the hook.
		 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
		 * @public
		 */
		run: function (name, env) {
			var callbacks = _.hooks.all[name];

			if (!callbacks || !callbacks.length) {
				return;
			}

			for (var i=0, callback; callback = callbacks[i++];) {
				callback(env);
			}
		}
	},

	Token: Token
};
_self.Prism = _;


// Typescript note:
// The following can be used to import the Token type in JSDoc:
//
//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

/**
 * Creates a new token.
 *
 * @param {string} type See {@link Token#type type}
 * @param {string | TokenStream} content See {@link Token#content content}
 * @param {string|string[]} [alias] The alias(es) of the token.
 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
 * @class
 * @global
 * @public
 */
function Token(type, content, alias, matchedStr) {
	/**
	 * The type of the token.
	 *
	 * This is usually the key of a pattern in a {@link Grammar}.
	 *
	 * @type {string}
	 * @see GrammarToken
	 * @public
	 */
	this.type = type;
	/**
	 * The strings or tokens contained by this token.
	 *
	 * This will be a token stream if the pattern matched also defined an `inside` grammar.
	 *
	 * @type {string | TokenStream}
	 * @public
	 */
	this.content = content;
	/**
	 * The alias(es) of the token.
	 *
	 * @type {string|string[]}
	 * @see GrammarToken
	 * @public
	 */
	this.alias = alias;
	// Copy of the full string this token was created from
	this.length = (matchedStr || '').length | 0;
}

/**
 * A token stream is an array of strings and {@link Token Token} objects.
 *
 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
 * them.
 *
 * 1. No adjacent strings.
 * 2. No empty strings.
 *
 *    The only exception here is the token stream that only contains the empty string and nothing else.
 *
 * @typedef {Array<string | Token>} TokenStream
 * @global
 * @public
 */

/**
 * Converts the given token or token stream to an HTML representation.
 *
 * The following hooks will be run:
 * 1. `wrap`: On each {@link Token}.
 *
 * @param {string | Token | TokenStream} o The token or token stream to be converted.
 * @param {string} language The name of current language.
 * @returns {string} The HTML representation of the token or token stream.
 * @memberof Token
 * @static
 */
Token.stringify = function stringify(o, language) {
	if (typeof o == 'string') {
		return o;
	}
	if (Array.isArray(o)) {
		var s = '';
		o.forEach(function (e) {
			s += stringify(e, language);
		});
		return s;
	}

	var env = {
		type: o.type,
		content: stringify(o.content, language),
		tag: 'span',
		classes: ['token', o.type],
		attributes: {},
		language: language
	};

	var aliases = o.alias;
	if (aliases) {
		if (Array.isArray(aliases)) {
			Array.prototype.push.apply(env.classes, aliases);
		} else {
			env.classes.push(aliases);
		}
	}

	_.hooks.run('wrap', env);

	var attributes = '';
	for (var name in env.attributes) {
		attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
	}

	return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
};

/**
 * @param {RegExp} pattern
 * @param {number} pos
 * @param {string} text
 * @param {boolean} lookbehind
 * @returns {RegExpExecArray | null}
 */
function matchPattern(pattern, pos, text, lookbehind) {
	pattern.lastIndex = pos;
	var match = pattern.exec(text);
	if (match && lookbehind && match[1]) {
		// change the match to remove the text matched by the Prism lookbehind group
		var lookbehindLength = match[1].length;
		match.index += lookbehindLength;
		match[0] = match[0].slice(lookbehindLength);
	}
	return match;
}

/**
 * @param {string} text
 * @param {LinkedList<string | Token>} tokenList
 * @param {any} grammar
 * @param {LinkedListNode<string | Token>} startNode
 * @param {number} startPos
 * @param {RematchOptions} [rematch]
 * @returns {void}
 * @private
 *
 * @typedef RematchOptions
 * @property {string} cause
 * @property {number} reach
 */
function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
	for (var token in grammar) {
		if (!grammar.hasOwnProperty(token) || !grammar[token]) {
			continue;
		}

		var patterns = grammar[token];
		patterns = Array.isArray(patterns) ? patterns : [patterns];

		for (var j = 0; j < patterns.length; ++j) {
			if (rematch && rematch.cause == token + ',' + j) {
				return;
			}

			var patternObj = patterns[j],
				inside = patternObj.inside,
				lookbehind = !!patternObj.lookbehind,
				greedy = !!patternObj.greedy,
				alias = patternObj.alias;

			if (greedy && !patternObj.pattern.global) {
				// Without the global flag, lastIndex won't work
				var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
				patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
			}

			/** @type {RegExp} */
			var pattern = patternObj.pattern || patternObj;

			for ( // iterate the token list and keep track of the current token/string position
				var currentNode = startNode.next, pos = startPos;
				currentNode !== tokenList.tail;
				pos += currentNode.value.length, currentNode = currentNode.next
			) {

				if (rematch && pos >= rematch.reach) {
					break;
				}

				var str = currentNode.value;

				if (tokenList.length > text.length) {
					// Something went terribly wrong, ABORT, ABORT!
					return;
				}

				if (str instanceof Token) {
					continue;
				}

				var removeCount = 1; // this is the to parameter of removeBetween
				var match;

				if (greedy) {
					match = matchPattern(pattern, pos, text, lookbehind);
					if (!match) {
						break;
					}

					var from = match.index;
					var to = match.index + match[0].length;
					var p = pos;

					// find the node that contains the match
					p += currentNode.value.length;
					while (from >= p) {
						currentNode = currentNode.next;
						p += currentNode.value.length;
					}
					// adjust pos (and p)
					p -= currentNode.value.length;
					pos = p;

					// the current node is a Token, then the match starts inside another Token, which is invalid
					if (currentNode.value instanceof Token) {
						continue;
					}

					// find the last node which is affected by this match
					for (
						var k = currentNode;
						k !== tokenList.tail && (p < to || typeof k.value === 'string');
						k = k.next
					) {
						removeCount++;
						p += k.value.length;
					}
					removeCount--;

					// replace with the new match
					str = text.slice(pos, p);
					match.index -= pos;
				} else {
					match = matchPattern(pattern, 0, str, lookbehind);
					if (!match) {
						continue;
					}
				}

				var from = match.index,
					matchStr = match[0],
					before = str.slice(0, from),
					after = str.slice(from + matchStr.length);

				var reach = pos + str.length;
				if (rematch && reach > rematch.reach) {
					rematch.reach = reach;
				}

				var removeFrom = currentNode.prev;

				if (before) {
					removeFrom = addAfter(tokenList, removeFrom, before);
					pos += before.length;
				}

				removeRange(tokenList, removeFrom, removeCount);

				var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
				currentNode = addAfter(tokenList, removeFrom, wrapped);

				if (after) {
					addAfter(tokenList, currentNode, after);
				}

				if (removeCount > 1) {
					// at least one Token object was removed, so we have to do some rematching
					// this can only happen if the current pattern is greedy
					matchGrammar(text, tokenList, grammar, currentNode.prev, pos, {
						cause: token + ',' + j,
						reach: reach
					});
				}
			}
		}
	}
}

/**
 * @typedef LinkedListNode
 * @property {T} value
 * @property {LinkedListNode<T> | null} prev The previous node.
 * @property {LinkedListNode<T> | null} next The next node.
 * @template T
 * @private
 */

/**
 * @template T
 * @private
 */
function LinkedList() {
	/** @type {LinkedListNode<T>} */
	var head = { value: null, prev: null, next: null };
	/** @type {LinkedListNode<T>} */
	var tail = { value: null, prev: head, next: null };
	head.next = tail;

	/** @type {LinkedListNode<T>} */
	this.head = head;
	/** @type {LinkedListNode<T>} */
	this.tail = tail;
	this.length = 0;
}

/**
 * Adds a new node with the given value to the list.
 * @param {LinkedList<T>} list
 * @param {LinkedListNode<T>} node
 * @param {T} value
 * @returns {LinkedListNode<T>} The added node.
 * @template T
 */
function addAfter(list, node, value) {
	// assumes that node != list.tail && values.length >= 0
	var next = node.next;

	var newNode = { value: value, prev: node, next: next };
	node.next = newNode;
	next.prev = newNode;
	list.length++;

	return newNode;
}
/**
 * Removes `count` nodes after the given node. The given node will not be removed.
 * @param {LinkedList<T>} list
 * @param {LinkedListNode<T>} node
 * @param {number} count
 * @template T
 */
function removeRange(list, node, count) {
	var next = node.next;
	for (var i = 0; i < count && next !== list.tail; i++) {
		next = next.next;
	}
	node.next = next;
	next.prev = node;
	list.length -= i;
}
/**
 * @param {LinkedList<T>} list
 * @returns {T[]}
 * @template T
 */
function toArray(list) {
	var array = [];
	var node = list.head.next;
	while (node !== list.tail) {
		array.push(node.value);
		node = node.next;
	}
	return array;
}


if (!_self.document) {
	if (!_self.addEventListener) {
		// in Node.js
		return _;
	}

	if (!_.disableWorkerMessageHandler) {
		// In worker
		_self.addEventListener('message', function (evt) {
			var message = JSON.parse(evt.data),
				lang = message.language,
				code = message.code,
				immediateClose = message.immediateClose;

			_self.postMessage(_.highlight(code, _.languages[lang], lang));
			if (immediateClose) {
				_self.close();
			}
		}, false);
	}

	return _;
}

// Get current script and highlight
var script = _.util.currentScript();

if (script) {
	_.filename = script.src;

	if (script.hasAttribute('data-manual')) {
		_.manual = true;
	}
}

function highlightAutomaticallyCallback() {
	if (!_.manual) {
		_.highlightAll();
	}
}

if (!_.manual) {
	// If the document state is "loading", then we'll use DOMContentLoaded.
	// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
	// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
	// might take longer one animation frame to execute which can create a race condition where only some plugins have
	// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
	// See https://github.com/PrismJS/prism/issues/2102
	var readyState = document.readyState;
	if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
		document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
	} else {
		if (window.requestAnimationFrame) {
			window.requestAnimationFrame(highlightAutomaticallyCallback);
		} else {
			window.setTimeout(highlightAutomaticallyCallback, 16);
		}
	}
}

return _;

})(_self);

if ( true && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof __webpack_require__.g !== 'undefined') {
	__webpack_require__.g.Prism = Prism;
}

// some additional documentation/types

/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
*/

/**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */

/**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
*/

/**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */


/***/ }),

/***/ "./node_modules/prismjs/components/prism-css.js":
/*!******************************************************!*\
  !*** ./node_modules/prismjs/components/prism-css.js ***!
  \******************************************************/
/***/ (() => {

(function (Prism) {

	var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;

	Prism.languages.css = {
		'comment': /\/\*[\s\S]*?\*\//,
		'atrule': {
			pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
			inside: {
				'rule': /^@[\w-]+/,
				'selector-function-argument': {
					pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
					lookbehind: true,
					alias: 'selector'
				},
				'keyword': {
					pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
					lookbehind: true
				}
				// See rest below
			}
		},
		'url': {
			// https://drafts.csswg.org/css-values-3/#urls
			pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
			greedy: true,
			inside: {
				'function': /^url/i,
				'punctuation': /^\(|\)$/,
				'string': {
					pattern: RegExp('^' + string.source + '$'),
					alias: 'url'
				}
			}
		},
		'selector': RegExp('[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
		'string': {
			pattern: string,
			greedy: true
		},
		'property': /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
		'important': /!important\b/i,
		'function': /[-a-z0-9]+(?=\()/i,
		'punctuation': /[(){};:,]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

	var markup = Prism.languages.markup;
	if (markup) {
		markup.tag.addInlined('style', 'css');

		Prism.languages.insertBefore('inside', 'attr-value', {
			'style-attr': {
				pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
				lookbehind: true,
				inside: {
					'attr-value': {
						pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
						inside: {
							'style': {
								pattern: /(["'])[\s\S]+(?=["']$)/,
								lookbehind: true,
								alias: 'language-css',
								inside: Prism.languages.css
							},
							'punctuation': [
								{
									pattern: /^=/,
									alias: 'attr-equals'
								},
								/"|'/
							]
						}
					},
					'attr-name': /^style/i
				}
			}
		}, markup.tag);
	}

}(Prism));


/***/ }),

/***/ "./node_modules/prismjs/components/prism-javascript.js":
/*!*************************************************************!*\
  !*** ./node_modules/prismjs/components/prism-javascript.js ***!
  \*************************************************************/
/***/ (() => {

Prism.languages.javascript = Prism.languages.extend('clike', {
	'class-name': [
		Prism.languages.clike['class-name'],
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
			lookbehind: true
		}
	],
	'keyword': [
		{
			pattern: /((?:^|})\s*)(?:catch|finally)\b/,
			lookbehind: true
		},
		{
			pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: true
		},
	],
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	'number': /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
	'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});

Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
		lookbehind: true,
		greedy: true,
		inside: {
			'regex-source': {
				pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
				lookbehind: true,
				alias: 'language-regex',
				inside: Prism.languages.regex
			},
			'regex-flags': /[a-z]+$/,
			'regex-delimiter': /^\/|\/$/
		}
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
		alias: 'function'
	},
	'parameter': [
		{
			pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		}
	],
	'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});

Prism.languages.insertBefore('javascript', 'string', {
	'template-string': {
		pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
		greedy: true,
		inside: {
			'template-punctuation': {
				pattern: /^`|`$/,
				alias: 'string'
			},
			'interpolation': {
				pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
				lookbehind: true,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\${|}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.markup.tag.addInlined('script', 'javascript');
}

Prism.languages.js = Prism.languages.javascript;


/***/ }),

/***/ "./node_modules/prismjs/components/prism-markup.js":
/*!*********************************************************!*\
  !*** ./node_modules/prismjs/components/prism-markup.js ***!
  \*********************************************************/
/***/ (() => {

Prism.languages.markup = {
	'comment': /<!--[\s\S]*?-->/,
	'prolog': /<\?[\s\S]+?\?>/,
	'doctype': {
		// https://www.w3.org/TR/xml/#NT-doctypedecl
		pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
		greedy: true,
		inside: {
			'internal-subset': {
				pattern: /(\[)[\s\S]+(?=\]>$)/,
				lookbehind: true,
				greedy: true,
				inside: null // see below
			},
			'string': {
				pattern: /"[^"]*"|'[^']*'/,
				greedy: true
			},
			'punctuation': /^<!|>$|[[\]]/,
			'doctype-tag': /^DOCTYPE/,
			'name': /[^\s<>'"]+/
		}
	},
	'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
		greedy: true,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
				inside: {
					'punctuation': [
						{
							pattern: /^=/,
							alias: 'attr-equals'
						},
						/"|'/
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': [
		{
			pattern: /&[\da-z]{1,8};/i,
			alias: 'named-entity'
		},
		/&#x?[\da-f]{1,8};/i
	]
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];
Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
	/**
	 * Adds an inlined language to markup.
	 *
	 * An example of an inlined language is CSS with `<style>` tags.
	 *
	 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addInlined('style', 'css');
	 */
	value: function addInlined(tagName, lang) {
		var includedCdataInside = {};
		includedCdataInside['language-' + lang] = {
			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
			lookbehind: true,
			inside: Prism.languages[lang]
		};
		includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

		var inside = {
			'included-cdata': {
				pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
				inside: includedCdataInside
			}
		};
		inside['language-' + lang] = {
			pattern: /[\s\S]+/,
			inside: Prism.languages[lang]
		};

		var def = {};
		def[tagName] = {
			pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
			lookbehind: true,
			greedy: true,
			inside: inside
		};

		Prism.languages.insertBefore('markup', 'cdata', def);
	}
});

Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;


/***/ }),

/***/ "./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js":
/*!*************************************************************************!*\
  !*** ./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js ***!
  \*************************************************************************/
/***/ (() => {

(function () {

	if (typeof self === 'undefined' || !self.Prism || !self.document) {
		return;
	}

	/**
	 * Plugin name which is used as a class name for <pre> which is activating the plugin
	 * @type {String}
	 */
	var PLUGIN_NAME = 'line-numbers';

	/**
	 * Regular expression used for determining line breaks
	 * @type {RegExp}
	 */
	var NEW_LINE_EXP = /\n(?!$)/g;


	/**
	 * Global exports
	 */
	var config = Prism.plugins.lineNumbers = {
		/**
		 * Get node for provided line number
		 * @param {Element} element pre element
		 * @param {Number} number line number
		 * @return {Element|undefined}
		 */
		getLine: function (element, number) {
			if (element.tagName !== 'PRE' || !element.classList.contains(PLUGIN_NAME)) {
				return;
			}

			var lineNumberRows = element.querySelector('.line-numbers-rows');
			if (!lineNumberRows) {
				return;
			}
			var lineNumberStart = parseInt(element.getAttribute('data-start'), 10) || 1;
			var lineNumberEnd = lineNumberStart + (lineNumberRows.children.length - 1);

			if (number < lineNumberStart) {
				number = lineNumberStart;
			}
			if (number > lineNumberEnd) {
				number = lineNumberEnd;
			}

			var lineIndex = number - lineNumberStart;

			return lineNumberRows.children[lineIndex];
		},

		/**
		 * Resizes the line numbers of the given element.
		 *
		 * This function will not add line numbers. It will only resize existing ones.
		 * @param {HTMLElement} element A `<pre>` element with line numbers.
		 * @returns {void}
		 */
		resize: function (element) {
			resizeElements([element]);
		},

		/**
		 * Whether the plugin can assume that the units font sizes and margins are not depended on the size of
		 * the current viewport.
		 *
		 * Setting this to `true` will allow the plugin to do certain optimizations for better performance.
		 *
		 * Set this to `false` if you use any of the following CSS units: `vh`, `vw`, `vmin`, `vmax`.
		 *
		 * @type {boolean}
		 */
		assumeViewportIndependence: true
	};

	/**
	 * Resizes the given elements.
	 *
	 * @param {HTMLElement[]} elements
	 */
	function resizeElements(elements) {
		elements = elements.filter(function (e) {
			var codeStyles = getStyles(e);
			var whiteSpace = codeStyles['white-space'];
			return whiteSpace === 'pre-wrap' || whiteSpace === 'pre-line';
		});

		if (elements.length == 0) {
			return;
		}

		var infos = elements.map(function (element) {
			var codeElement = element.querySelector('code');
			var lineNumbersWrapper = element.querySelector('.line-numbers-rows');
			if (!codeElement || !lineNumbersWrapper) {
				return undefined;
			}

			/** @type {HTMLElement} */
			var lineNumberSizer = element.querySelector('.line-numbers-sizer');
			var codeLines = codeElement.textContent.split(NEW_LINE_EXP);

			if (!lineNumberSizer) {
				lineNumberSizer = document.createElement('span');
				lineNumberSizer.className = 'line-numbers-sizer';

				codeElement.appendChild(lineNumberSizer);
			}

			lineNumberSizer.innerHTML = '0';
			lineNumberSizer.style.display = 'block';

			var oneLinerHeight = lineNumberSizer.getBoundingClientRect().height;
			lineNumberSizer.innerHTML = '';

			return {
				element: element,
				lines: codeLines,
				lineHeights: [],
				oneLinerHeight: oneLinerHeight,
				sizer: lineNumberSizer,
			};
		}).filter(Boolean);

		infos.forEach(function (info) {
			var lineNumberSizer = info.sizer;
			var lines = info.lines;
			var lineHeights = info.lineHeights;
			var oneLinerHeight = info.oneLinerHeight;

			lineHeights[lines.length - 1] = undefined;
			lines.forEach(function (line, index) {
				if (line && line.length > 1) {
					var e = lineNumberSizer.appendChild(document.createElement('span'));
					e.style.display = 'block';
					e.textContent = line;
				} else {
					lineHeights[index] = oneLinerHeight;
				}
			});
		});

		infos.forEach(function (info) {
			var lineNumberSizer = info.sizer;
			var lineHeights = info.lineHeights;

			var childIndex = 0;
			for (var i = 0; i < lineHeights.length; i++) {
				if (lineHeights[i] === undefined) {
					lineHeights[i] = lineNumberSizer.children[childIndex++].getBoundingClientRect().height;
				}
			}
		});

		infos.forEach(function (info) {
			var lineNumberSizer = info.sizer;
			var wrapper = info.element.querySelector('.line-numbers-rows');

			lineNumberSizer.style.display = 'none';
			lineNumberSizer.innerHTML = '';

			info.lineHeights.forEach(function (height, lineNumber) {
				wrapper.children[lineNumber].style.height = height + 'px';
			});
		});
	}

	/**
	 * Returns style declarations for the element
	 * @param {Element} element
	 */
	var getStyles = function (element) {
		if (!element) {
			return null;
		}

		return window.getComputedStyle ? getComputedStyle(element) : (element.currentStyle || null);
	};

	var lastWidth = undefined;
	window.addEventListener('resize', function () {
		if (config.assumeViewportIndependence && lastWidth === window.innerWidth) {
			return;
		}
		lastWidth = window.innerWidth;

		resizeElements(Array.prototype.slice.call(document.querySelectorAll('pre.' + PLUGIN_NAME)));
	});

	Prism.hooks.add('complete', function (env) {
		if (!env.code) {
			return;
		}

		var code = /** @type {Element} */ (env.element);
		var pre = /** @type {HTMLElement} */ (code.parentNode);

		// works only for <code> wrapped inside <pre> (not inline)
		if (!pre || !/pre/i.test(pre.nodeName)) {
			return;
		}

		// Abort if line numbers already exists
		if (code.querySelector('.line-numbers-rows')) {
			return;
		}

		// only add line numbers if <code> or one of its ancestors has the `line-numbers` class
		if (!Prism.util.isActive(code, PLUGIN_NAME)) {
			return;
		}

		// Remove the class 'line-numbers' from the <code>
		code.classList.remove(PLUGIN_NAME);
		// Add the class 'line-numbers' to the <pre>
		pre.classList.add(PLUGIN_NAME);

		var match = env.code.match(NEW_LINE_EXP);
		var linesNum = match ? match.length + 1 : 1;
		var lineNumbersWrapper;

		var lines = new Array(linesNum + 1).join('<span></span>');

		lineNumbersWrapper = document.createElement('span');
		lineNumbersWrapper.setAttribute('aria-hidden', 'true');
		lineNumbersWrapper.className = 'line-numbers-rows';
		lineNumbersWrapper.innerHTML = lines;

		if (pre.hasAttribute('data-start')) {
			pre.style.counterReset = 'linenumber ' + (parseInt(pre.getAttribute('data-start'), 10) - 1);
		}

		env.element.appendChild(lineNumbersWrapper);

		resizeElements([pre]);

		Prism.hooks.run('line-numbers', env);
	});

	Prism.hooks.add('line-numbers', function (env) {
		env.plugins = env.plugins || {};
		env.plugins.lineNumbers = true;
	});

}());


/***/ }),

/***/ "./cubes/cubes.css":
/*!*************************!*\
  !*** ./cubes/cubes.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_node_modules_sass_loader_dist_cjs_js_cubes_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../node_modules/sass-loader/dist/cjs.js!./cubes.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./node_modules/sass-loader/dist/cjs.js!./cubes/cubes.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_node_modules_sass_loader_dist_cjs_js_cubes_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_node_modules_sass_loader_dist_cjs_js_cubes_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css":
/*!**************************************************************************!*\
  !*** ./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_sass_loader_dist_cjs_js_prism_line_numbers_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../../../sass-loader/dist/cjs.js!./prism-line-numbers.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_sass_loader_dist_cjs_js_prism_line_numbers_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_sass_loader_dist_cjs_js_prism_line_numbers_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/prismjs/themes/prism-okaidia.css":
/*!*******************************************************!*\
  !*** ./node_modules/prismjs/themes/prism-okaidia.css ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_sass_loader_dist_cjs_js_prism_okaidia_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../../sass-loader/dist/cjs.js!./prism-okaidia.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/prismjs/themes/prism-okaidia.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_sass_loader_dist_cjs_js_prism_okaidia_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_sass_loader_dist_cjs_js_prism_okaidia_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./src/main.css":
/*!**********************!*\
  !*** ./src/main.css ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_node_modules_sass_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!../node_modules/sass-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/main.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_node_modules_sass_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_node_modules_sass_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./src/about/about.module.scss":
/*!*************************************!*\
  !*** ./src/about/about.module.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_about_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/sass-loader/dist/cjs.js!./about.module.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/about/about.module.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_about_module_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_about_module_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./src/landing/landing.module.scss":
/*!*****************************************!*\
  !*** ./src/landing/landing.module.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_landing_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/sass-loader/dist/cjs.js!./landing.module.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/landing/landing.module.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_landing_module_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_landing_module_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./src/navbar/navbar.module.scss":
/*!***************************************!*\
  !*** ./src/navbar/navbar.module.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_navbar_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../../node_modules/sass-loader/dist/cjs.js!./navbar.module.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/navbar/navbar.module.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_navbar_module_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_sass_loader_dist_cjs_js_navbar_module_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/fonts/VarelaRound-Regular.ttf":
/*!*******************************************!*\
  !*** ./src/fonts/VarelaRound-Regular.ttf ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "3b7ffe17ffd5b4e3c72f.ttf";

/***/ }),

/***/ "./src/fonts/circular-bold.woff2":
/*!***************************************!*\
  !*** ./src/fonts/circular-bold.woff2 ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "f9fedd6fb79e79a77dde.woff2";

/***/ }),

/***/ "./src/landing/projectphotos/chatapp.png":
/*!***********************************************!*\
  !*** ./src/landing/projectphotos/chatapp.png ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "5caf81fdab6842ffb6cc.png";

/***/ }),

/***/ "./src/landing/projectphotos/covidTracker.png":
/*!****************************************************!*\
  !*** ./src/landing/projectphotos/covidTracker.png ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "a36f905facb85321e968.png";

/***/ }),

/***/ "./src/landing/projectphotos/css3.svg":
/*!********************************************!*\
  !*** ./src/landing/projectphotos/css3.svg ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg class='tech-icon'  role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title>CSS3 icon</title><path d=\"M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z\"/></svg>";

/***/ }),

/***/ "./src/landing/projectphotos/html5.svg":
/*!*********************************************!*\
  !*** ./src/landing/projectphotos/html5.svg ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg class='tech-icon'  role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title>HTML5 icon</title><path d=\"M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z\"/></svg>";

/***/ }),

/***/ "./src/landing/projectphotos/javascript.svg":
/*!**************************************************!*\
  !*** ./src/landing/projectphotos/javascript.svg ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg class='tech-icon'  role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title>JavaScript icon</title><path d=\"M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z\"/></svg>";

/***/ }),

/***/ "./src/landing/projectphotos/node.svg":
/*!********************************************!*\
  !*** ./src/landing/projectphotos/node.svg ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg class='tech-icon' role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title>Node.js icon</title><path d=\"M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z\"/></svg>";

/***/ }),

/***/ "./src/landing/projectphotos/playlists.png":
/*!*************************************************!*\
  !*** ./src/landing/projectphotos/playlists.png ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "2a4a7109c8ecc0d446bd.png";

/***/ }),

/***/ "./src/landing/projectphotos/portfolio.png":
/*!*************************************************!*\
  !*** ./src/landing/projectphotos/portfolio.png ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "f601b300d8f7b6f40b55.png";

/***/ }),

/***/ "./src/landing/projectphotos/react.svg":
/*!*********************************************!*\
  !*** ./src/landing/projectphotos/react.svg ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg class='tech-icon'  role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title>React icon</title><path d=\"M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z\"/></svg>";

/***/ }),

/***/ "./src/landing/projectphotos/readdit.png":
/*!***********************************************!*\
  !*** ./src/landing/projectphotos/readdit.png ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "40606b8fede9cfc484a0.png";

/***/ }),

/***/ "./src/landing/projectphotos/tesla-clone.png":
/*!***************************************************!*\
  !*** ./src/landing/projectphotos/tesla-clone.png ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6fd4db151dc35ea7c62b.png";

/***/ }),

/***/ "./src/navbar/navlogos/github.svg":
/*!****************************************!*\
  !*** ./src/navbar/navlogos/github.svg ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title>GitHub icon</title><path d=\"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12\"/></svg>";

/***/ }),

/***/ "./src/navbar/navlogos/gmail.svg":
/*!***************************************!*\
  !*** ./src/navbar/navlogos/gmail.svg ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title>Gmail icon</title><path d=\"M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z\"/></svg>";

/***/ }),

/***/ "./src/navbar/navlogos/linkedin.svg":
/*!******************************************!*\
  !*** ./src/navbar/navlogos/linkedin.svg ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title>LinkedIn icon</title><path d=\"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z\"/></svg>";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.css */ "./src/main.css");
/* harmony import */ var _cubes_cubes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cubes/cubes */ "./cubes/cubes.js");
/* harmony import */ var _cubes_cubes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_cubes_cubes__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cubes_cubes_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cubes/cubes.css */ "./cubes/cubes.css");
/* harmony import */ var prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prismjs/components/prism-core */ "./node_modules/prismjs/components/prism-core.js");
/* harmony import */ var prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prismjs_components_prism_clike__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prismjs/components/prism-clike */ "./node_modules/prismjs/components/prism-clike.js");
/* harmony import */ var prismjs_components_prism_clike__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_clike__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prismjs_components_prism_markup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prismjs/components/prism-markup */ "./node_modules/prismjs/components/prism-markup.js");
/* harmony import */ var prismjs_components_prism_markup__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_markup__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prismjs_components_prism_javascript__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prismjs/components/prism-javascript */ "./node_modules/prismjs/components/prism-javascript.js");
/* harmony import */ var prismjs_components_prism_javascript__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_javascript__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prismjs_components_prism_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prismjs/components/prism-css */ "./node_modules/prismjs/components/prism-css.js");
/* harmony import */ var prismjs_components_prism_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prismjs_plugins_line_numbers_prism_line_numbers_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prismjs/plugins/line-numbers/prism-line-numbers.css */ "./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css");
/* harmony import */ var prismjs_plugins_line_numbers_prism_line_numbers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prismjs/plugins/line-numbers/prism-line-numbers */ "./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js");
/* harmony import */ var prismjs_plugins_line_numbers_prism_line_numbers__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prismjs_plugins_line_numbers_prism_line_numbers__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var prismjs_themes_prism_okaidia_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prismjs/themes/prism-okaidia.css */ "./node_modules/prismjs/themes/prism-okaidia.css");
/* harmony import */ var _navbar_navbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./navbar/navbar */ "./src/navbar/navbar.js");
/* harmony import */ var _landing_landing__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./landing/landing */ "./src/landing/landing.js");
/* harmony import */ var _about_about__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./about/about */ "./src/about/about.js");











prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_3___default().highlightAll();




var docFrag = new DocumentFragment();
var body = document.createElement("div");
body.setAttribute("id", "#root");
docFrag.appendChild(body);
(0,_navbar_navbar__WEBPACK_IMPORTED_MODULE_11__.renderNav)(docFrag);
(0,_landing_landing__WEBPACK_IMPORTED_MODULE_12__.renderLanding)(docFrag);
(0,_about_about__WEBPACK_IMPORTED_MODULE_13__.renderAbout)(docFrag); // pass in the target node, as well as the observer options

document.body.appendChild(docFrag);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL2N1YmVzL2N1YmVzLmpzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vc3JjL2Fib3V0L2Fib3V0LmpzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vc3JjL2xhbmRpbmcvbGFuZGluZy5qcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL3NyYy9uYXZiYXIvbmF2YmFyLmpzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vY3ViZXMvY3ViZXMuY3NzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvcGx1Z2lucy9saW5lLW51bWJlcnMvcHJpc20tbGluZS1udW1iZXJzLmNzcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL25vZGVfbW9kdWxlcy9wcmlzbWpzL3RoZW1lcy9wcmlzbS1va2FpZGlhLmNzcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL3NyYy9tYWluLmNzcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL3NyYy9hYm91dC9hYm91dC5tb2R1bGUuc2NzcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL3NyYy9sYW5kaW5nL2xhbmRpbmcubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9zcmMvbmF2YmFyL25hdmJhci5tb2R1bGUuc2NzcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9ub2RlX21vZHVsZXMvcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNsaWtlLmpzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jb3JlLmpzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jc3MuanMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9ub2RlX21vZHVsZXMvcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmFzY3JpcHQuanMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9ub2RlX21vZHVsZXMvcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLW1hcmt1cC5qcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL25vZGVfbW9kdWxlcy9wcmlzbWpzL3BsdWdpbnMvbGluZS1udW1iZXJzL3ByaXNtLWxpbmUtbnVtYmVycy5qcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL2N1YmVzL2N1YmVzLmNzcz9jY2NjIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvcGx1Z2lucy9saW5lLW51bWJlcnMvcHJpc20tbGluZS1udW1iZXJzLmNzcz81YzJmIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvdGhlbWVzL3ByaXNtLW9rYWlkaWEuY3NzP2ExOGUiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9zcmMvbWFpbi5jc3M/ZDgwNSIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL3NyYy9hYm91dC9hYm91dC5tb2R1bGUuc2Nzcz9hMWZiIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vc3JjL2xhbmRpbmcvbGFuZGluZy5tb2R1bGUuc2Nzcz9mZTM0Iiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vc3JjL25hdmJhci9uYXZiYXIubW9kdWxlLnNjc3M/Yjc5MyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BvcnRmb2xpb3YyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiU3RydXQiLCJyYW5kb20iLCJlIiwidCIsIk1hdGgiLCJhcnJheVJhbmRvbSIsImZsb29yIiwibGVuZ3RoIiwiaW50ZXJwb2xhdGUiLCJuIiwicmFuZ2VQb3NpdGlvbiIsImNsYW1wIiwibWF4IiwibWluIiwicXVlcnlBcnJheSIsImRvY3VtZW50IiwiYm9keSIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwicXVlcnlTZWxlY3RvckFsbCIsInJlYWR5IiwicmVhZHlTdGF0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZWR1Y2VNb3Rpb24iLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsInNldFN0YXRlIiwic3RhdGUiLCJzcGVlZCIsImRpcmVjdGlvbnMiLCJmb3JFYWNoIiwiYXhpcyIsImFicyIsImN1YmVJc0hpZGRlbiIsImxlZnQiLCJwYXJlbnRXaWR0aCIsImhlYWRlcklzSGlkZGVuIiwidGVtcGxhdGUiLCJnZXRFbGVtZW50QnlJZCIsInBhcmVudCIsImdldFBhcmVudFdpZHRoIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJ3aW5kb3ciLCJwYWxldHRlIiwid2hpdGUiLCJjb2xvciIsInNoYWRpbmciLCJvcmFuZ2UiLCJncmVlbiIsInNldEN1YmVTdHlsZXMiLCJjdWJlIiwic2l6ZSIsInRvcCIsIk9iamVjdCIsImFzc2lnbiIsInN0eWxlIiwiaGVpZ2h0IiwicXVlcnlTZWxlY3RvciIsImZpbHRlciIsInJvdW5kIiwib3BhY2l0eSIsImNyZWF0ZUN1YmUiLCJmcmFnbWVudCIsImltcG9ydE5vZGUiLCJjb250ZW50IiwieCIsInkiLCJyZWR1Y2UiLCJvYmplY3QiLCJzaXplcyIsIm0iLCJzaWRlcyIsInNpZGUiLCJjbGFzc05hbWUiLCJoaWRkZW4iLCJyb3RhdGUiLCJib3R0b20iLCJyaWdodCIsImJhY2siLCJ2YWx1ZXMiLCJ4cyIsInMiLCJsIiwieGwiLCJjdWJlcyIsInRpbnQiLCJtYXAiLCJnZXREaXN0YW5jZSIsImdldFJvdGF0aW9uIiwiZGlyZWN0aW9uIiwiZ2V0U2hhZGluZyIsImRpc3RhbmNlIiwiZGFya2VuIiwiZGVsdGEiLCJyYXRpbyIsImFscGhhIiwiYmxlbmQiLCJ2YWx1ZSIsImluZGV4IiwiciIsImciLCJiIiwic2hvdWxkSGlkZSIsInJvdGF0ZVgiLCJ1cGRhdGVTaWRlcyIsImFuaW1hdGUiLCJ0cmFuc2Zvcm0iLCJiYWNrZ3JvdW5kQ29sb3IiLCJ0aWNrIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicGFyYWxsYXhMaW1pdCIsInNjcm9sbCIsInNjcm9sbFkiLCJjb250YWluZXIiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJzdGFydCIsInJlcXVlc3RJZGxlQ2FsbGJhY2siLCJlbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwib25sb2FkIiwib3B0aW9ucyIsInRocmVzaG9sZCIsImxhcHRvcCIsInRyYWNrU3ZnIiwiZW50cmllcyIsImlzSW50ZXJzZWN0aW5nIiwic2VydmVyQW5pbWF0aW9uIiwiaSIsInR4dCIsInNlcnZlciIsImlubmVySFRNTCIsImNoYXJBdCIsInRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiY2xpZW50QW5pbWF0aW9uIiwiUHJpc20iLCJjbGllbnQiLCJvYnNlcnZlciIsImRpc2Nvbm5lY3QiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsIm9ic2VydmUiLCJyZW5kZXJBYm91dCIsInJvb3QiLCJ0ZWNoSW1hZ2VzIiwiaW1hZ2UiLCJSZWFjdEljb24iLCJuYW1lIiwiSnNJY29uIiwiTm9kZUljb24iLCJIdG1sSWNvbiIsIkNzc0ljb24iLCJyZW5kZXJMYW5kaW5nIiwiY2hhdGFwcCIsImNvdmlkVHJhY2tlciIsInJlYWRkaXQiLCJwbGF5bGlzdHMiLCJ0ZXNsYSIsInBvcnRmb2xpbyIsInRlY2hDb250YWluZXIiLCJpdGVtIiwiaWNvbiIsInJlbmRlck5hdiIsImRvY0ZyYWciLCJuYXZDb250YWluZXIiLCJHSGxvZ28iLCJHTUxvZ28iLCJMSWxvZ28iLCJEb2N1bWVudEZyYWdtZW50Iiwic2V0QXR0cmlidXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxLQUFLLEdBQUc7QUFDVkMsUUFBTSxFQUFFLGdCQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7QUFDdEIsV0FBT0MsSUFBSSxDQUFDSCxNQUFMLE1BQWlCRSxDQUFDLEdBQUdELENBQXJCLElBQTBCQSxDQUFqQztBQUNELEdBSFM7QUFJVkcsYUFBVyxFQUFFLHFCQUFVSCxDQUFWLEVBQWE7QUFDeEIsV0FBT0EsQ0FBQyxDQUFDRSxJQUFJLENBQUNFLEtBQUwsQ0FBV0YsSUFBSSxDQUFDSCxNQUFMLEtBQWdCQyxDQUFDLENBQUNLLE1BQTdCLENBQUQsQ0FBUjtBQUNELEdBTlM7QUFPVkMsYUFBVyxFQUFFLHFCQUFVTixDQUFWLEVBQWFDLENBQWIsRUFBZ0JNLENBQWhCLEVBQW1CO0FBQzlCLFdBQU9QLENBQUMsSUFB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VyxVQUFVLE1BQU0sS0FBSyxXQUFXLFVBQVUsV0FBVyxVQUFVLFVBQVUsV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLEtBQUssS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLEtBQUssVUFBVSxVQUFVLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxLQUFLLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLEtBQUssS0FBSyxLQUFLLFVBQVUsVUFBVSxXQUFXLEtBQUssS0FBSyxLQUFLLFVBQVUsVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLEtBQUssS0FBSyxXQUFXLFdBQVcsVUFBVSxVQUFVLEtBQUssS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLEtBQUssS0FBSyxVQUFVLFdBQVcsS0FBSyxLQUFLLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxLQUFLLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxLQUFLLEtBQUssS0FBSyxVQUFVLE1BQU0sS0FBSyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsS0FBSyxLQUFLLEtBQUssV0FBVyxNQUFNLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsS0FBSyxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLE1BQU0sVUFBVSxNQUFNLEtBQUssV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxLQUFLLFVBQVUsV0FBVyxXQUFXLFdBQVcsVUFBVSxLQUFLLEtBQUssV0FBVyxVQUFVLFVBQVUsS0FBSyxLQUFLLEtBQUssVUFBVSxXQUFXLEtBQUssS0FBSyxLQUFLLFVBQVUsV0FB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QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBLElBQU0yQixPQUFPLEdBQUcsSUFBSUssZ0JBQUosRUFBaEI7QUFDQSxJQUFNN0osSUFBSSxHQUFHRCxRQUFRLENBQUNzRyxhQUFULENBQXVCLEtBQXZCLENBQWI7QUFDQXJHLElBQUksQ0FBQzhKLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsT0FBeEI7QUFDQU4sT0FBTyxDQUFDbEQsV0FBUixDQUFvQnRHLElBQXBCO0FBRUF1SiwwREFBUyxDQUFDQyxPQUFELENBQVQ7QUFDQVgsZ0VBQWEsQ0FBQ1csT0FBRCxDQUFiO0FBQ0FyQiwwREFBVyxDQUFDcUIsT0FBRCxDQUFYLEMsQ0FFQTs7QUFDQXpKLFFBQVEsQ0FBQ0MsSUFBVCxDQUFjc0csV0FBZCxDQUEwQmtELE9BQTFCLEUiLCJmaWxlIjoibWFpbi40ZmFmMDE3MTA5OGIyNmYzZjYzYS5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBTdHJ1dCA9IHtcclxuICByYW5kb206IGZ1bmN0aW9uIChlLCB0KSB7XHJcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqICh0IC0gZSkgKyBlO1xyXG4gIH0sXHJcbiAgYXJyYXlSYW5kb206IGZ1bmN0aW9uIChlKSB7XHJcbiAgICByZXR1cm4gZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlLmxlbmd0aCldO1xyXG4gIH0sXHJcbiAgaW50ZXJwb2xhdGU6IGZ1bmN0aW9uIChlLCB0LCBuKSB7XHJcbiAgICByZXR1cm4gZSAqICgxIC0gbikgKyB0ICogbjtcclxuICB9LFxyXG4gIHJhbmdlUG9zaXRpb246IGZ1bmN0aW9uIChlLCB0LCBuKSB7XHJcbiAgICByZXR1cm4gKG4gLSBlKSAvICh0IC0gZSk7XHJcbiAgfSxcclxuICBjbGFtcDogZnVuY3Rpb24gKGUsIHQsIG4pIHtcclxuICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihlLCBuKSwgdCk7XHJcbiAgfSxcclxuICBxdWVyeUFycmF5OiBmdW5jdGlvbiAoZSwgdCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdCB8fCAodCA9IGRvY3VtZW50LmJvZHkpLFxyXG4gICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0LnF1ZXJ5U2VsZWN0b3JBbGwoZSkpXHJcbiAgICApO1xyXG4gIH0sXHJcbiAgcmVhZHk6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICBkb2N1bWVudC5yZWFkeVN0YXRlID09IFwiY29tcGxldGVcIlxyXG4gICAgICA/IGUoKVxyXG4gICAgICA6IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGUpO1xyXG4gIH0sXHJcbn07XHJcbmNvbnN0IHJlZHVjZU1vdGlvbiA9IG1hdGNoTWVkaWEoXCIocHJlZmVycy1yZWR1Y2VkLW1vdGlvbilcIikubWF0Y2hlcztcclxuXHJcbntcclxuICAvLyA9PT09PT09XHJcbiAgLy8gaGVscGVyc1xyXG4gIC8vID09PT09PT1cclxuXHJcbiAgY29uc3Qgc2V0U3RhdGUgPSAoc3RhdGUsIHNwZWVkKSA9PlxyXG4gICAgZGlyZWN0aW9ucy5mb3JFYWNoKChheGlzKSA9PiB7XHJcbiAgICAgIHN0YXRlW2F4aXNdICs9IHNwZWVkW2F4aXNdO1xyXG4gICAgICBpZiAoTWF0aC5hYnMoc3RhdGVbYXhpc10pIDwgMzYwKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KHN0YXRlW2F4aXNdLCAzNjApO1xyXG4gICAgICBjb25zdCBtaW4gPSBtYXggPT0gMzYwID8gTWF0aC5hYnMoc3RhdGVbYXhpc10pIDogMzYwO1xyXG4gICAgICBzdGF0ZVtheGlzXSA9IG1heCAtIG1pbjtcclxuICAgIH0pO1xyXG5cclxuICBjb25zdCBjdWJlSXNIaWRkZW4gPSAobGVmdCkgPT4gbGVmdCA+IHBhcmVudFdpZHRoICsgMzA7XHJcblxyXG4gIC8vID09PT09PT09PT09PT09PT09XHJcbiAgLy8gc2hhcmVkIHJlZmVyZW5jZXNcclxuICAvLyA9PT09PT09PT09PT09PT09PVxyXG5cclxuICBsZXQgaGVhZGVySXNIaWRkZW4gPSBmYWxzZTtcclxuXHJcbiAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1YmUtdGVtcGxhdGVcIik7XHJcblxyXG4gIGNvbnN0IHBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVhZGVyLWhlcm9cIik7XHJcbiAgY29uc3QgZ2V0UGFyZW50V2lkdGggPSAoKSA9PiBwYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XHJcbiAgbGV0IHBhcmVudFdpZHRoID0gZ2V0UGFyZW50V2lkdGgoKTtcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiAocGFyZW50V2lkdGggPSBnZXRQYXJlbnRXaWR0aCgpKSk7XHJcblxyXG4gIGNvbnN0IGRpcmVjdGlvbnMgPSBbXCJ4XCIsIFwieVwiXTtcclxuXHJcbiAgY29uc3QgcGFsZXR0ZSA9IHtcclxuICAgIHdoaXRlOiB7XHJcbiAgICAgIGNvbG9yOiBbMTMxLCA5NiwgMjU1XSxcclxuICAgICAgc2hhZGluZzogWzE2MCwgMTkwLCAyMThdLFxyXG4gICAgfSxcclxuICAgIG9yYW5nZToge1xyXG4gICAgICBjb2xvcjogWzI1NSwgMjUwLCAyMzBdLFxyXG4gICAgICBzaGFkaW5nOiBbMjU1LCAxMjAsIDUwXSxcclxuICAgIH0sXHJcbiAgICBncmVlbjoge1xyXG4gICAgICBjb2xvcjogWzQ2LCAyNTUsIDIwNF0sXHJcbiAgICAgIHNoYWRpbmc6IFswLCAyMTEsIDEzNl0sXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIC8vID09PT09PT09PT09PT09XHJcbiAgLy8gY3ViZSBpbnN0YW5jZXNcclxuICAvLyA9PT09PT09PT09PT09PVxyXG5cclxuICBjb25zdCBzZXRDdWJlU3R5bGVzID0gKHsgY3ViZSwgc2l6ZSwgbGVmdCwgdG9wIH0pID0+IHtcclxuICAgIE9iamVjdC5hc3NpZ24oY3ViZS5zdHlsZSwge1xyXG4gICAgICB3aWR0aDogYCR7c2l6ZX1weGAsXHJcbiAgICAgIGhlaWdodDogYCR7c2l6ZX1weGAsXHJcbiAgICAgIGxlZnQ6IGAke2xlZnR9cHhgLFxyXG4gICAgICB0b3A6IGAke3RvcH1weGAsXHJcbiAgICB9KTtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKGN1YmUucXVlcnlTZWxlY3RvcihcIi5zaGFkb3dcIikuc3R5bGUsIHtcclxuICAgICAgZmlsdGVyOiBgYmx1cigke01hdGgucm91bmQoc2l6ZSAqIDAuNil9cHgpYCxcclxuICAgICAgb3BhY2l0eTogTWF0aC5taW4oc2l6ZSAvIDEyMCwgMC40KSxcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGNyZWF0ZUN1YmUgPSAoc2l6ZSkgPT4ge1xyXG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlLmNvbnRlbnQsIHRydWUpO1xyXG4gICAgY29uc3QgY3ViZSA9IGZyYWdtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3ViZVwiKTtcclxuXHJcbiAgICBjb25zdCBzdGF0ZSA9IHtcclxuICAgICAgeDogMCxcclxuICAgICAgeTogMCxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgc3BlZWQgPSBkaXJlY3Rpb25zLnJlZHVjZSgob2JqZWN0LCBheGlzKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1heCA9IHNpemUgPiBzaXplcy5tID8gMC4zIDogMC42O1xyXG4gICAgICBvYmplY3RbYXhpc10gPSBTdHJ1dC5yYW5kb20oLW1heCwgbWF4KTtcclxuICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgIH0sIHt9KTtcclxuXHJcbiAgICBjb25zdCBzaWRlcyA9IFN0cnV0LnF1ZXJ5QXJyYXkoXCIuc2lkZXMgZGl2XCIsIGN1YmUpLnJlZHVjZShcclxuICAgICAgKG9iamVjdCwgc2lkZSkgPT4ge1xyXG4gICAgICAgIG9iamVjdFtzaWRlLmNsYXNzTmFtZV0gPSB7XHJcbiAgICAgICAgICBzaWRlLFxyXG4gICAgICAgICAgaGlkZGVuOiBmYWxzZSxcclxuICAgICAgICAgIHJvdGF0ZToge1xyXG4gICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgIH0sXHJcbiAgICAgIHt9XHJcbiAgICApO1xyXG5cclxuICAgIHNpZGVzLnRvcC5yb3RhdGUueCA9IDkwO1xyXG4gICAgc2lkZXMuYm90dG9tLnJvdGF0ZS54ID0gLTkwO1xyXG4gICAgc2lkZXMubGVmdC5yb3RhdGUueSA9IC05MDtcclxuICAgIHNpZGVzLnJpZ2h0LnJvdGF0ZS55ID0gOTA7XHJcbiAgICBzaWRlcy5iYWNrLnJvdGF0ZS55ID0gLTE4MDtcclxuXHJcbiAgICByZXR1cm4geyBmcmFnbWVudCwgY3ViZSwgc3RhdGUsIHNwZWVkLCBzaWRlczogT2JqZWN0LnZhbHVlcyhzaWRlcykgfTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzaXplcyA9IHtcclxuICAgIHhzOiAxNSxcclxuICAgIHM6IDI1LFxyXG4gICAgbTogNDAsXHJcbiAgICBsOiAxMDAsXHJcbiAgICB4bDogMTIwLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGN1YmVzID0gW1xyXG4gICAge1xyXG4gICAgICB0aW50OiBwYWxldHRlLmdyZWVuLFxyXG4gICAgICBzaXplOiBzaXplcy54bCxcclxuICAgICAgYm90dG9tOiAwLFxyXG4gICAgICByaWdodDogMCxcclxuICAgIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUuZ3JlZW4sXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLnhzLFxyXG4gICAgLy8gICBsZWZ0OiAzNSxcclxuICAgIC8vICAgdG9wOiA0NjUsXHJcbiAgICAvLyB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICB0aW50OiBwYWxldHRlLndoaXRlLFxyXG4gICAgLy8gICBzaXplOiBzaXplcy5zLFxyXG4gICAgLy8gICBsZWZ0OiA1NSxcclxuICAgIC8vICAgdG9wOiA0MTUsXHJcbiAgICAvLyB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICB0aW50OiBwYWxldHRlLndoaXRlLFxyXG4gICAgLy8gICBzaXplOiBzaXplcy54bCxcclxuICAgIC8vICAgbGVmdDogMTQwLFxyXG4gICAgLy8gICB0b3A6IDQwMCxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUud2hpdGUsXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLm0sXHJcbiAgICAvLyAgIGxlZnQ6IDQyMCxcclxuICAgIC8vICAgdG9wOiAxNTUsXHJcbiAgICAvLyB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICB0aW50OiBwYWxldHRlLmdyZWVuLFxyXG4gICAgLy8gICBzaXplOiBzaXplcy54cyxcclxuICAgIC8vICAgbGVmdDogNDQwLFxyXG4gICAgLy8gICB0b3A6IDI4MCxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUub3JhbmdlLFxyXG4gICAgLy8gICBzaXplOiBzaXplcy5zLFxyXG4gICAgLy8gICBsZWZ0OiA0ODAsXHJcbiAgICAvLyAgIHRvcDogMjI4LFxyXG4gICAgLy8gfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS53aGl0ZSxcclxuICAgIC8vICAgc2l6ZTogc2l6ZXMubCxcclxuICAgIC8vICAgbGVmdDogNTgwLFxyXG4gICAgLy8gICB0b3A6IDI1NSxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUuZ3JlZW4sXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLnMsXHJcbiAgICAvLyAgIGxlZnQ6IDc4MCxcclxuICAgIC8vICAgdG9wOiAzMjAsXHJcbiAgICAvLyB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICB0aW50OiBwYWxldHRlLndoaXRlLFxyXG4gICAgLy8gICBzaXplOiBzaXplcy54bCxcclxuICAgIC8vICAgbGVmdDogNzgwLFxyXG4gICAgLy8gICB0b3A6IDEyMCxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUub3JhbmdlLFxyXG4gICAgLy8gICBzaXplOiBzaXplcy5sLFxyXG4gICAgLy8gICBsZWZ0OiA5MDAsXHJcbiAgICAvLyAgIHRvcDogMzEwLFxyXG4gICAgLy8gfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS5ncmVlbixcclxuICAgIC8vICAgc2l6ZTogc2l6ZXMubSxcclxuICAgIC8vICAgbGVmdDogMTAzMCxcclxuICAgIC8vICAgdG9wOiAxMjAwLFxyXG4gICAgLy8gfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS5ncmVlbixcclxuICAgIC8vICAgc2l6ZTogc2l6ZXMubSxcclxuICAgIC8vICAgbGVmdDogMjAwMCxcclxuICAgIC8vICAgdG9wOiA2MDAsXHJcbiAgICAvLyB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICB0aW50OiBwYWxldHRlLmdyZWVuLFxyXG4gICAgLy8gICBzaXplOiBzaXplcy5tLFxyXG4gICAgLy8gICBsZWZ0OiAxOTAwLFxyXG4gICAgLy8gICB0b3A6IDIwMCxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUuZ3JlZW4sXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLm0sXHJcbiAgICAvLyAgIGxlZnQ6IDEwMCxcclxuICAgIC8vICAgdG9wOiAyMDAsXHJcbiAgICAvLyB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICB0aW50OiBwYWxldHRlLmdyZWVuLFxyXG4gICAgLy8gICBzaXplOiBzaXplcy5tLFxyXG4gICAgLy8gICBsZWZ0OiAxMDMwLFxyXG4gICAgLy8gICB0b3A6IDIwMCxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUuZ3JlZW4sXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLm0sXHJcbiAgICAvLyAgIGxlZnQ6IDE1MDAsXHJcbiAgICAvLyAgIHRvcDogMjAwLFxyXG4gICAgLy8gfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS5ncmVlbixcclxuICAgIC8vICAgc2l6ZTogc2l6ZXMubSxcclxuICAgIC8vICAgbGVmdDogMTAsXHJcbiAgICAvLyAgIHRvcDogMjAwLFxyXG4gICAgLy8gfSxcclxuICBdLm1hcCgob2JqZWN0KSA9PiBPYmplY3QuYXNzaWduKGNyZWF0ZUN1YmUob2JqZWN0LnNpemUpLCBvYmplY3QpKTtcclxuXHJcbiAgY3ViZXMuZm9yRWFjaChzZXRDdWJlU3R5bGVzKTtcclxuXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cclxuICAvLyBjdWJlIHJvdGF0aW5nIGFuaW1hdGlvblxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gIGNvbnN0IGdldERpc3RhbmNlID0gKHN0YXRlLCByb3RhdGUpID0+XHJcbiAgICBkaXJlY3Rpb25zLnJlZHVjZSgob2JqZWN0LCBheGlzKSA9PiB7XHJcbiAgICAgIG9iamVjdFtheGlzXSA9IE1hdGguYWJzKHN0YXRlW2F4aXNdICsgcm90YXRlW2F4aXNdKTtcclxuICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgIH0sIHt9KTtcclxuXHJcbiAgY29uc3QgZ2V0Um90YXRpb24gPSAoc3RhdGUsIHNpemUsIHJvdGF0ZSkgPT4ge1xyXG4gICAgY29uc3QgYXhpcyA9IHJvdGF0ZS54ID8gXCJaXCIgOiBcIllcIjtcclxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IHJvdGF0ZS54ID4gMCA/IC0xIDogMTtcclxuXHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgIHJvdGF0ZVgoJHtzdGF0ZS54ICsgcm90YXRlLnh9ZGVnKVxyXG4gICAgICAgIHJvdGF0ZSR7YXhpc30oJHtkaXJlY3Rpb24gKiAoc3RhdGUueSArIHJvdGF0ZS55KX1kZWcpXHJcbiAgICAgICAgdHJhbnNsYXRlWigke3NpemUgLyAyfXB4KVxyXG4gICAgICBgO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdldFNoYWRpbmcgPSAodGludCwgcm90YXRlLCBkaXN0YW5jZSkgPT4ge1xyXG4gICAgY29uc3QgZGFya2VuID0gZGlyZWN0aW9ucy5yZWR1Y2UoKG9iamVjdCwgYXhpcykgPT4ge1xyXG4gICAgICBjb25zdCBkZWx0YSA9IGRpc3RhbmNlW2F4aXNdO1xyXG4gICAgICBjb25zdCByYXRpbyA9IGRlbHRhIC8gMTgwO1xyXG4gICAgICBvYmplY3RbYXhpc10gPSBkZWx0YSA+IDE4MCA/IE1hdGguYWJzKDIgLSByYXRpbykgOiByYXRpbztcclxuICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgIH0sIHt9KTtcclxuXHJcbiAgICBpZiAocm90YXRlLngpIGRhcmtlbi55ID0gMDtcclxuICAgIGVsc2Uge1xyXG4gICAgICBjb25zdCB7IHggfSA9IGRpc3RhbmNlO1xyXG4gICAgICBpZiAoeCA+IDkwICYmIHggPCAyNzApXHJcbiAgICAgICAgZGlyZWN0aW9ucy5mb3JFYWNoKChheGlzKSA9PiAoZGFya2VuW2F4aXNdID0gMSAtIGRhcmtlbltheGlzXSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFscGhhID0gKGRhcmtlbi54ICsgZGFya2VuLnkpIC8gMjtcclxuICAgIGNvbnN0IGJsZW5kID0gKHZhbHVlLCBpbmRleCkgPT5cclxuICAgICAgTWF0aC5yb3VuZChTdHJ1dC5pbnRlcnBvbGF0ZSh2YWx1ZSwgdGludC5zaGFkaW5nW2luZGV4XSwgYWxwaGEpKTtcclxuICAgIGNvbnN0IFtyLCBnLCBiXSA9IHRpbnQuY29sb3IubWFwKGJsZW5kKTtcclxuXHJcbiAgICByZXR1cm4gYHJnYigke3J9LCAke2d9LCAke2J9KWA7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2hvdWxkSGlkZSA9IChyb3RhdGVYLCB4LCB5KSA9PiB7XHJcbiAgICBpZiAocm90YXRlWCkgcmV0dXJuIHggPiA5MCAmJiB4IDwgMjcwO1xyXG4gICAgaWYgKHggPCA5MCkgcmV0dXJuIHkgPiA5MCAmJiB5IDwgMjcwO1xyXG4gICAgaWYgKHggPCAyNzApIHJldHVybiB5IDwgOTA7XHJcbiAgICByZXR1cm4geSA+IDkwICYmIHkgPCAyNzA7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgdXBkYXRlU2lkZXMgPSAoeyBzdGF0ZSwgc3BlZWQsIHNpemUsIHRpbnQsIHNpZGVzLCBsZWZ0IH0pID0+IHtcclxuICAgIGlmIChoZWFkZXJJc0hpZGRlbiB8fCBjdWJlSXNIaWRkZW4obGVmdCkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBhbmltYXRlID0gKG9iamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCB7IHNpZGUsIHJvdGF0ZSwgaGlkZGVuIH0gPSBvYmplY3Q7XHJcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gZ2V0RGlzdGFuY2Uoc3RhdGUsIHJvdGF0ZSk7XHJcblxyXG4gICAgICAvLyBkb24ndCBhbmltYXRlIGhpZGRlbiBzaWRlc1xyXG4gICAgICBpZiAoc2hvdWxkSGlkZShyb3RhdGUueCwgZGlzdGFuY2UueCwgZGlzdGFuY2UueSkpIHtcclxuICAgICAgICBpZiAoIWhpZGRlbikge1xyXG4gICAgICAgICAgc2lkZS5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgb2JqZWN0LmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGhpZGRlbikge1xyXG4gICAgICAgIHNpZGUuaGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgb2JqZWN0LmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzaWRlLnN0eWxlLnRyYW5zZm9ybSA9IGdldFJvdGF0aW9uKHN0YXRlLCBzaXplLCByb3RhdGUpO1xyXG4gICAgICBzaWRlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGdldFNoYWRpbmcodGludCwgcm90YXRlLCBkaXN0YW5jZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNldFN0YXRlKHN0YXRlLCBzcGVlZCk7XHJcbiAgICBzaWRlcy5mb3JFYWNoKGFuaW1hdGUpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHRpY2sgPSAoKSA9PiB7XHJcbiAgICBjdWJlcy5mb3JFYWNoKHVwZGF0ZVNpZGVzKTtcclxuICAgIGlmIChyZWR1Y2VNb3Rpb24pIHJldHVybjtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcclxuICB9O1xyXG5cclxuICAvLyA9PT09PT09PT09PT09PT1cclxuICAvLyBwYXJhbGxheCBzY3JvbGxcclxuICAvLyA9PT09PT09PT09PT09PT1cclxuXHJcbiAgLy8gZ2l2ZSBpdCBzb21lIGV4dHJhIHNwYWNlIHRvIGFjY291bnQgZm9yIHRoZSBwYXJhbGxheCBhbmQgdGhlIHNoYWRvd3Mgb2YgdGhlIGN1YmVzXHJcbiAgY29uc3QgcGFyYWxsYXhMaW1pdCA9XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpbiA+IGhlYWRlclwiKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgKyA4MDtcclxuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xyXG4gICAgY29uc3Qgc2Nyb2xsID0gd2luZG93LnNjcm9sbFk7XHJcbiAgICBpZiAoc2Nyb2xsIDwgcGFyYWxsYXhMaW1pdCkge1xyXG4gICAgICBoZWFkZXJJc0hpZGRlbiA9IGZhbHNlO1xyXG4gICAgICBjdWJlcy5mb3JFYWNoKFxyXG4gICAgICAgICh7IGN1YmUsIHNwZWVkIH0pID0+XHJcbiAgICAgICAgICAoY3ViZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgke1xyXG4gICAgICAgICAgICBNYXRoLmFicyhzcGVlZC54ICogMC41KSAqIHNjcm9sbFxyXG4gICAgICAgICAgfXB4KWApXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGhlYWRlcklzSGlkZGVuID0gdHJ1ZTtcclxuICB9KTtcclxuXHJcbiAgLy8gPT09PT09PT09PVxyXG4gIC8vIGluaXRpYWxpemVcclxuICAvLyA9PT09PT09PT09XHJcblxyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiY3ViZXNcIjtcclxuICBjdWJlcy5mb3JFYWNoKCh7IGZyYWdtZW50IH0pID0+IGNvbnRhaW5lci5hcHBlbmRDaGlsZChmcmFnbWVudCkpO1xyXG5cclxuICBjb25zdCBzdGFydCA9ICgpID0+IHtcclxuICAgIHRpY2soKTtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gIH07XHJcblxyXG4gIFwicmVxdWVzdElkbGVDYWxsYmFja1wiIGluIHdpbmRvdyA/IHJlcXVlc3RJZGxlQ2FsbGJhY2soc3RhcnQpIDogc3RhcnQoKTtcclxufVxyXG4vL2NvZGUgZnJvbSBodHRwczovL2NvZGVwZW4uaW8vdG9tYXRvdWl1aS9wZW4vbUxtdm92IiwiaW1wb3J0IHN0eWxlIGZyb20gXCIuL2Fib3V0Lm1vZHVsZS5zY3NzXCI7XHJcbmltcG9ydCBQcmlzbSBmcm9tIFwicHJpc21qc1wiO1xyXG5cclxuY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc3R5bGVbXCJjb250YWluZXJcIl0pO1xyXG5cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICBsZXQgb3B0aW9ucyA9IHtcclxuICAgIHRocmVzaG9sZDogWzAuMl0sXHJcbiAgfTtcclxuICBjb25zdCBsYXB0b3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tbGFwdG9wLW9ic1wiKTtcclxuICBjb25zdCB0cmFja1N2ZyA9IChlbnRyaWVzKSA9PiB7XHJcbiAgICBpZiAoZW50cmllc1swXS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICB2YXIgaSA9IDA7XHJcbiAgICAgIHZhciB0eHQgPSBgY29uc3QgYXBwID0gZXhwcmVzcygpO1xcbmFwcC5nZXQoJ2FwaS9za2lsbHMnLCAocmVxLHJlcykgPT5cXG57IHJlcy5qc29uKFtcIlJlYWN0XCIsXCJKYXZhc2NyaXB0XCIsXFxuXCJub2RlSlNcIiwgXCJDU1NcIiwgXCJIVE1MXCJdKX0pYDtcclxuICAgICAgY29uc3Qgc2VydmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZXJ2ZXItdGV4dFwiKTtcclxuICAgICAgY29uc3QgY2xpZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbGllbnQtdGV4dFwiKTtcclxuICAgICAgdmFyIHNwZWVkID0gMTA7XHJcblxyXG4gICAgICBmdW5jdGlvbiBzZXJ2ZXJBbmltYXRpb24oKSB7XHJcbiAgICAgICAgaWYgKGkgPCB0eHQubGVuZ3RoKSB7XHJcbiAgICAgICAgICBzZXJ2ZXIuaW5uZXJIVE1MICs9IHR4dC5jaGFyQXQoaSk7XHJcbiAgICAgICAgICBpKys7XHJcbiAgICAgICAgICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dChzZXJ2ZXJBbmltYXRpb24sIHNwZWVkKTtcclxuICAgICAgICAgIGlmIChpID09PSB0eHQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgIGNsaWVudEFuaW1hdGlvbigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBQcmlzbS5oaWdobGlnaHRFbGVtZW50KHNlcnZlcik7XHJcbiAgICAgIH1cclxuICAgICAgZnVuY3Rpb24gY2xpZW50QW5pbWF0aW9uKCkge1xyXG4gICAgICAgIGxldCB0eHQgPSBgY29uc3QgbXlTa2lsbHMgPSBhd2FpdCBcXG4gYXhpb3MuZ2V0KCcvYXBpL3NraWxscycpXFxuIGNvbnNvbGUubG9nKG15U2tpbGxzLmRhdGEpYDtcclxuXHJcbiAgICAgICAgaWYgKGkgPCB0eHQubGVuZ3RoKSB7XHJcbiAgICAgICAgICBjbGllbnQuaW5uZXJIVE1MICs9IHR4dC5jaGFyQXQoaSk7XHJcblxyXG4gICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgc2V0VGltZW91dChjbGllbnRBbmltYXRpb24sIHNwZWVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUHJpc20uaGlnaGxpZ2h0RWxlbWVudChjbGllbnQpO1xyXG4gICAgICB9XHJcbiAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgc2VydmVyQW5pbWF0aW9uKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIodHJhY2tTdmcsIG9wdGlvbnMpO1xyXG5cclxuICBvYnNlcnZlci5vYnNlcnZlKGxhcHRvcCk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCByZW5kZXJBYm91dCA9IChmcmFnbWVudCkgPT4ge1xyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gLypodG1sKi8gYDxkaXYgY2xhc3M9JHtzdHlsZVtcImNvbnRhaW5lclwiXX0+XHJcbiAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcIm1haW4tY29udGVudFwiXX0+XHJcbiAgICAgICAgPGRpdiBjbGFzcz0ke3N0eWxlW1wiY29kZS1lZGl0b3ItY29udGFpbmVyXCJdfT5cclxuICAgICAgICAgIDxkaXYgaWQ9J21haW4tbGFwdG9wLW9icycgY2xhc3M9JHtzdHlsZVtcImxhcHRvcFwiXX0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcImNvZGUtZWRpdG9yXCJdfT5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSR7c3R5bGVbXCJjbGllbnQtZWRpdG9yXCJdfT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcImxpbmUtbnVtYmVyLWNvbnRhaW5lclwiXX0+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcImxpbmUtY29udGFpbmVyXCJdfT5cclxuICAgICAgICAgICAgICAgICAgICA8cHJlIGNsYXNzPSR7XCJsaW5lLW51bWJlcnNcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8Y29kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZD1cImNsaWVudC10ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9JHtgbGFuZ3VhZ2UtanNgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPjwvY29kZT5cclxuICAgICAgICAgICAgICAgICAgICA8L3ByZT5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSR7c3R5bGVbXCJzZXJ2ZXItZWRpdG9yXCJdfT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcImxpbmUtbnVtYmVyLWNvbnRhaW5lclwiXX0+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcImxpbmUtY29udGFpbmVyXCJdfT5cclxuICAgICAgICAgICAgICAgICAgICA8cHJlIGNsYXNzPSR7XCJsaW5lLW51bWJlcnNcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8Y29kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZD1cInNlcnZlci10ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9JHtgbGFuZ3VhZ2UtanNgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPjwvY29kZT5cclxuICAgICAgICAgICAgICAgICAgICA8L3ByZT5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcImJhc2VcIl19PjwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcInRleHQtY29udGVudFwiXX0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPSR7c3R5bGVbXCJ0ZXh0LWNvbnRhaW5lclwiXX0+XHJcbiAgICAgICAgICAgIDxoMyBjbGFzcz0ke3N0eWxlW1wibWFpbi1oZWFkZXJcIl19PkphdmFzY3JpcHQgZGV2ZWxvcGVyPC9oMz5cclxuICAgICAgICAgICAgPHAgY2xhc3M9JHtzdHlsZVtcImRlc2NyaXB0aW9uXCJdfT5cclxuICAgICAgICAgICAgICBIZWxsbywgSSdtIEF1c3RpbiwgYSB3ZWIgZGV2ZWxvcGVyIHdpdGggYSBwcmltYXJ5IGZvY3VzIGluIFJlYWN0XHJcbiAgICAgICAgICAgICAgZGV2ZWxvcG1lbnQuIEknbSBjb25maWRlbnQgaW4gd29ya2luZyB3aXRoIHRoZSB2YXJpb3VzIE1FUk4gc3RhY2tcclxuICAgICAgICAgICAgICB0ZWNobm9sb2dpZXMgYW5kIEknbSBvbiBhIHBlcnNpc3RlbnQgam91cm5leSBpbiBob25pbmcgbXkgY3JhZnQgaW5cclxuICAgICAgICAgICAgICB3ZWIgZGV2ZWxvcG1lbnQuXHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5gO1xyXG4gIGNvbnN0IHJvb3QgPSBmcmFnbWVudC5nZXRFbGVtZW50QnlJZChcIiNyb290XCIpO1xyXG4gIHJvb3QuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbn07XHJcbiIsImltcG9ydCBzdHlsZSBmcm9tIFwiLi9sYW5kaW5nLm1vZHVsZS5zY3NzXCI7XHJcbmltcG9ydCBjaGF0YXBwIGZyb20gXCIuL3Byb2plY3RwaG90b3MvY2hhdGFwcC5wbmdcIjtcclxuaW1wb3J0IGNvdmlkVHJhY2tlciBmcm9tIFwiLi9wcm9qZWN0cGhvdG9zL2NvdmlkVHJhY2tlci5wbmdcIjtcclxuaW1wb3J0IENzc0ljb24gZnJvbSBcIi4vcHJvamVjdHBob3Rvcy9jc3MzLnN2Z1wiO1xyXG5pbXBvcnQgSHRtbEljb24gZnJvbSBcIi4vcHJvamVjdHBob3Rvcy9odG1sNS5zdmdcIjtcclxuaW1wb3J0IEpzSWNvbiBmcm9tIFwiLi9wcm9qZWN0cGhvdG9zL2phdmFzY3JpcHQuc3ZnXCI7XHJcbmltcG9ydCBOb2RlSWNvbiBmcm9tIFwiLi9wcm9qZWN0cGhvdG9zL25vZGUuc3ZnXCI7XHJcbmltcG9ydCBwbGF5bGlzdHMgZnJvbSBcIi4vcHJvamVjdHBob3Rvcy9wbGF5bGlzdHMucG5nXCI7XHJcbmltcG9ydCBwb3J0Zm9saW8gZnJvbSBcIi4vcHJvamVjdHBob3Rvcy9wb3J0Zm9saW8ucG5nXCI7XHJcbmltcG9ydCBSZWFjdEljb24gZnJvbSBcIi4vcHJvamVjdHBob3Rvcy9yZWFjdC5zdmdcIjtcclxuaW1wb3J0IHJlYWRkaXQgZnJvbSBcIi4vcHJvamVjdHBob3Rvcy9yZWFkZGl0LnBuZ1wiO1xyXG5pbXBvcnQgdGVzbGEgZnJvbSBcIi4vcHJvamVjdHBob3Rvcy90ZXNsYS1jbG9uZS5wbmdcIjtcclxuXHJcbmNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuXHJcbmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzdHlsZVtcIndyYXBwZXJcIl0pO1xyXG5jb25zdCB0ZWNoSW1hZ2VzID0gW1xyXG4gIHtcclxuICAgIGltYWdlOiBSZWFjdEljb24sXHJcbiAgICBuYW1lOiBcIlJlYWN0XCIsXHJcbiAgfSxcclxuICB7IGltYWdlOiBKc0ljb24sIG5hbWU6IFwiSnMgRVM2XCIgfSxcclxuICB7XHJcbiAgICBpbWFnZTogTm9kZUljb24sXHJcbiAgICBuYW1lOiBcIk5vZGVcIixcclxuICB9LFxyXG4gIHtcclxuICAgIGltYWdlOiBIdG1sSWNvbixcclxuICAgIG5hbWU6IFwiSHRtbFwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaW1hZ2U6IENzc0ljb24sXHJcbiAgICBuYW1lOiBcIkNzc1wiLFxyXG4gIH0sXHJcbl07XHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyTGFuZGluZyA9IChmcmFnbWVudCkgPT4ge1xyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gLypodG1sKi8gYFxyXG48ZGl2IGNsYXNzPSR7c3R5bGVbXCJjZW50ZXItY29udGFpbmVyXCJdfT5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPSR7c3R5bGVbXCJjb250YWluZXJcIl19PlxyXG4gICAgICA8ZGl2IGNsYXNzPSR7c3R5bGVbXCJ0ZXh0LWNvbnRhaW5lclwiXX0+XHJcbiAgICAgICAgPGgxIGNsYXNzPSR7c3R5bGVbXCJtYWluLXRpdGxlXCJdfT5IaSwgSSdtIDxzcGFuPkF1c3Rpbjwvc3Bhbj48L2gxPlxyXG4gICAgICAgIDxoNCBjbGFzcz0ke3N0eWxlW1wiZGVzY3JpcHRpb25cIl19PlxyXG4gICAgICAgICAgSGVyZSBhcmUgc29tZSBvZiBteSBwcm9qZWN0cyBJJ3ZlIGJlZW4gd29ya2luZyBvbi5cclxuICAgICAgICA8L2g0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz0ke3N0eWxlW1wiaW1hZ2UtY29udGFpbmVyXCJdfT5cclxuICAgICAgICA8YVxyXG4gICAgICAgICAgcmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2FqbDAwMjMvY2hhdEFwcFwiXHJcbiAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxyXG4gICAgICAgICAgY2xhc3M9JHtzdHlsZVtcInByb2plY3QtY29udGFpbmVyXCJdfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxpbWcgc3JjPSR7Y2hhdGFwcH0gY2xhc3M9JHtzdHlsZVtcInByb2plY3QtaW1hZ2VcIl19IC8+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDxhXHJcbiAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2FqbDAwMjMvQ292aWQtdHJhY2tlclwiXHJcbiAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxyXG4gICAgICAgICAgY2xhc3M9JHtzdHlsZVtcInByb2plY3QtY29udGFpbmVyXCJdfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxpbWcgc3JjPSR7Y292aWRUcmFja2VyfSBjbGFzcz0ke3N0eWxlW1wicHJvamVjdC1pbWFnZVwiXX0gLz5cclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgPGFcclxuICAgICAgICAgIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYWpsMDAyMy9yZWFkaXRcIlxyXG4gICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcclxuICAgICAgICAgIGNsYXNzPSR7c3R5bGVbXCJwcm9qZWN0LWNvbnRhaW5lclwiXX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8aW1nIHNyYz0ke3JlYWRkaXR9IGNsYXNzPSR7c3R5bGVbXCJwcm9qZWN0LWltYWdlXCJdfSAvPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgICA8YVxyXG4gICAgICAgICAgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9hamwwMDIzL3Nwb3RpZnlQbGF5bGlzdHNcIlxyXG4gICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcclxuICAgICAgICAgIGNsYXNzPSR7c3R5bGVbXCJwcm9qZWN0LWNvbnRhaW5lclwiXX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8aW1nIHNyYz0ke3BsYXlsaXN0c30gY2xhc3M9JHtzdHlsZVtcInByb2plY3QtaW1hZ2VcIl19IC8+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDxhXHJcbiAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2FqbDAwMjMvdGVzbGEtY2xvbmVcIlxyXG4gICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcclxuICAgICAgICAgIGNsYXNzPSR7c3R5bGVbXCJwcm9qZWN0LWNvbnRhaW5lclwiXX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8aW1nIHNyYz0ke3Rlc2xhfSBjbGFzcz0ke3N0eWxlW1wicHJvamVjdC1pbWFnZVwiXX0gLz5cclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgPGFcclxuICAgICAgICAgIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYWpsMDAyMy9wb3J0Zm9saW92MlwiXHJcbiAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxyXG4gICAgICAgICAgY2xhc3M9JHtzdHlsZVtcInByb2plY3QtY29udGFpbmVyXCJdfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgc3JjPSR7cG9ydGZvbGlvfVxyXG4gICAgICAgICAgICBjbGFzcz0ke2Ake3N0eWxlW1wicHJvamVjdC1pbWFnZVwiXX0gJHtzdHlsZVtcInBvcnRmb2xpby1pbWFnZVwiXX1gfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICBcclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPSR7c3R5bGVbXCJ0ZWNoLXdyYXBwZXJcIl19PlxyXG4gICAgICAgICAgPHAgY2xhc3M9JHtzdHlsZVtcInRlY2gtY29udGFpbmVyLXRpdGxlXCJdfT5cclxuICAgICAgICAgICAgVGVjaG5vbG9naWVzIHVzZWQgaW4gdGhlc2UgcHJvamVjdHNcclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDxkaXYgaWQ9J3RlY2gtY29udGFpbmVyJyBjbGFzcz0ke3N0eWxlW1widGVjaC1pY29uLWNvbnRhaW5lclwiXX0+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5gO1xyXG4gIGNvbnN0IHJvb3QgPSBmcmFnbWVudC5nZXRFbGVtZW50QnlJZChcIiNyb290XCIpO1xyXG4gIHJvb3QuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgY29uc3QgdGVjaENvbnRhaW5lciA9IGZyYWdtZW50LmdldEVsZW1lbnRCeUlkKFwidGVjaC1jb250YWluZXJcIik7XHJcbiAgdGVjaEltYWdlcy5tYXAoKGl0ZW0pID0+IHtcclxuICAgIGxldCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGljb24uY2xhc3NMaXN0LmFkZChzdHlsZVtcImljb24tY29udGFpbmVyXCJdKTtcclxuICAgIGljb24uaW5uZXJIVE1MID0gLypodG1sKi8gYCR7aXRlbS5pbWFnZX0gPHAgY2xhc3M9JHtzdHlsZVtcImljb24tbGFiZWxcIl19PiR7aXRlbS5uYW1lfTwvcD5gO1xyXG4gICAgdGVjaENvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uKTtcclxuICB9KTtcclxufTtcclxuIiwiaW1wb3J0IHN0eWxlIGZyb20gXCIuL25hdmJhci5tb2R1bGUuc2Nzc1wiO1xyXG5pbXBvcnQgTElsb2dvIGZyb20gXCIuL25hdmxvZ29zL2xpbmtlZGluLnN2Z1wiO1xyXG5pbXBvcnQgR0hsb2dvIGZyb20gXCIuL25hdmxvZ29zL2dpdGh1Yi5zdmdcIjtcclxuaW1wb3J0IEdNTG9nbyBmcm9tIFwiLi9uYXZsb2dvcy9nbWFpbC5zdmdcIjtcclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJOYXYgPSAoZG9jRnJhZykgPT4ge1xyXG4gIGNvbnN0IHJvb3QgPSBkb2NGcmFnLmdldEVsZW1lbnRCeUlkKFwiI3Jvb3RcIik7XHJcblxyXG4gIGNvbnN0IG5hdkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJuYXZcIik7XHJcblxyXG4gIG5hdkNvbnRhaW5lci5pbm5lckhUTUwgPSAvKmh0bWwqLyBgPGRpdiBjbGFzcz0ke3N0eWxlW1wiY29udGFpbmVyXCJdfT5cclxuICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcImNvbnRhY3QtaWNvbi1jb250YWluZXJcIl19PlxyXG4gICAgJHtHSGxvZ299XHJcbiAgICAke0dNTG9nb31cclxuICAgJHtMSWxvZ299XHJcbiAgICA8ZGl2IGNsYXNzPSR7c3R5bGVbXCJkaXZpZGVyLWxpbmVcIl19PjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5gO1xyXG4gIHJvb3QuYXBwZW5kQ2hpbGQobmF2Q29udGFpbmVyKTtcclxufTtcclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIuc3F1YXJlLWNvbnRhaW5lciB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB3aWR0aDogNTAwcHg7XFxuICBoZWlnaHQ6IDUwMHB4O1xcbiAgei1pbmRleDogMTtcXG59XFxuXFxuLmN1YmVzIHtcXG4gIHotaW5kZXg6IDE7XFxufVxcblxcbi5jdWJlcyAuY3ViZSB7XFxuICB6LWluZGV4OiAxO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiAxMDBweDtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIG1hcmdpbjogMDtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBjdWJlLWZhZGUtaW4gMnMgY3ViaWMtYmV6aWVyKDAuMTY1LCAwLjg0LCAwLjQ0LCAxKTtcXG4gIGFuaW1hdGlvbjogY3ViZS1mYWRlLWluIDJzIGN1YmljLWJlemllcigwLjE2NSwgMC44NCwgMC40NCwgMSk7XFxuICB3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgY3ViZS1mYWRlLWluIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC41KTtcXG4gIH1cXG59XFxuQGtleWZyYW1lcyBjdWJlLWZhZGUtaW4ge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC41KTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xcbiAgfVxcbn1cXG4uY3ViZXMgLmN1YmUgKiB7XFxuICB6LWluZGV4OiAxO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcblxcbi5jdWJlcyAuY3ViZSAuc2hhZG93IHtcXG4gIGJhY2tncm91bmQ6ICM4MzYwYzM7XFxuICB0b3A6IDQwJTtcXG59XFxuXFxuLmN1YmVzIC5jdWJlIC5zaWRlcyB7XFxuICAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgLXdlYmtpdC1wZXJzcGVjdGl2ZTogNjAwcHg7XFxuICBwZXJzcGVjdGl2ZTogNjAwcHg7XFxufVxcblxcbi5jdWJlcyAuY3ViZSAuc2lkZXMgZGl2IHtcXG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcXG59XFxuXFxuLmN1YmVzIC5jdWJlIC5zaWRlcyAuZnJvbnQge1xcbiAgei1pbmRleDogMSAhaW1wb3J0YW50O1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoMGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXG4gIHRyYW5zZm9ybTogcm90YXRlWSgwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcbn1cXG5cXG4uY3ViZXMgLmN1YmUgLnNpZGVzIC5iYWNrIHtcXG4gIHotaW5kZXg6IDEgIWltcG9ydGFudDtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVZKC0xODBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZVkoLTE4MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXG59XFxuXFxuLmN1YmVzIC5jdWJlIC5zaWRlcyAubGVmdCB7XFxuICB6LWluZGV4OiAxICFpbXBvcnRhbnQ7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWSgtOTBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZVkoLTkwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcbn1cXG5cXG4uY3ViZXMgLmN1YmUgLnNpZGVzIC5yaWdodCB7XFxuICB6LWluZGV4OiAxICFpbXBvcnRhbnQ7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWSg5MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXG4gIHRyYW5zZm9ybTogcm90YXRlWSg5MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXG59XFxuXFxuLmN1YmVzIC5jdWJlIC5zaWRlcyAudG9wIHtcXG4gIHotaW5kZXg6IDEgIWltcG9ydGFudDtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVYKDkwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcbiAgdHJhbnNmb3JtOiByb3RhdGVYKDkwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcbn1cXG5cXG4uY3ViZXMgLmN1YmUgLnNpZGVzIC5ib3R0b20ge1xcbiAgei1pbmRleDogMSAhaW1wb3J0YW50O1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVgoLTkwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcbiAgdHJhbnNmb3JtOiByb3RhdGVYKC05MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXG59XFxuXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9Y3ViZXMuY3NzLm1hcCAqL1wiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL2N1YmVzL2N1YmVzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGVBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLFVBQUE7QUFDRjs7QUFHQTtFQUNFLFVBQUE7QUFBRjs7QUFHQTtFQUNFLFVBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsU0FBQTtFQUNBLHFFQUFBO0VBQ0EsNkRBQUE7RUFDQSxzQkFBQTtBQUFGOztBQUdBO0VBQ0U7SUFDRSxVQUFBO0lBQ0EsNkJBQUE7SUFDQSxxQkFBQTtFQUFGO0FBQ0Y7QUFHQTtFQUNFO0lBQ0UsVUFBQTtJQUNBLDZCQUFBO0lBQ0EscUJBQUE7RUFERjtBQUNGO0FBSUE7RUFDRSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQUZGOztBQUtBO0VBQ0UsbUJBQUE7RUFDQSxRQUFBO0FBRkY7O0FBS0E7RUFDRSxvQ0FBQTtFQUNBLDRCQUFBO0VBQ0EsMEJBQUE7RUFDQSxrQkFBQTtBQUZGOztBQUtBO0VBQ0UsbUNBQUE7RUFDQSwyQkFBQTtFQUNBLHNCQUFBO0FBRkY7O0FBS0E7RUFDRSxxQkFBQTtFQUNBLGlEQUFBO0VBQ0EseUNBQUE7QUFGRjs7QUFLQTtFQUNFLHFCQUFBO0VBQ0Esb0RBQUE7RUFDQSw0Q0FBQTtBQUZGOztBQUtBO0VBQ0UscUJBQUE7RUFDQSxtREFBQTtFQUNBLDJDQUFBO0FBRkY7O0FBS0E7RUFDRSxxQkFBQTtFQUNBLGtEQUFBO0VBQ0EsMENBQUE7QUFGRjs7QUFLQTtFQUNFLHFCQUFBO0VBQ0Esa0RBQUE7RUFDQSwwQ0FBQTtBQUZGOztBQUtBO0VBQ0UscUJBQUE7RUFDQSxtREFBQTtFQUNBLDJDQUFBO0FBRkY7O0FBSUEsb0NBQUFcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnNxdWFyZS1jb250YWluZXIge1xcclxcbiAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgd2lkdGg6IDUwMHB4O1xcclxcbiAgaGVpZ2h0OiA1MDBweDtcXHJcXG4gIHotaW5kZXg6IDE7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5jdWJlcyB7XFxyXFxuICB6LWluZGV4OiAxO1xcclxcbn1cXHJcXG5cXHJcXG4uY3ViZXMgLmN1YmUge1xcclxcbiAgei1pbmRleDogMTtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIGhlaWdodDogMTAwcHg7XFxyXFxuICB3aWR0aDogMTAwcHg7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICAtd2Via2l0LWFuaW1hdGlvbjogY3ViZS1mYWRlLWluIDJzIGN1YmljLWJlemllcigwLjE2NSwgMC44NCwgMC40NCwgMSk7XFxyXFxuICBhbmltYXRpb246IGN1YmUtZmFkZS1pbiAycyBjdWJpYy1iZXppZXIoMC4xNjUsIDAuODQsIDAuNDQsIDEpO1xcclxcbiAgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcXHJcXG59XFxyXFxuXFxyXFxuQC13ZWJraXQta2V5ZnJhbWVzIGN1YmUtZmFkZS1pbiB7XFxyXFxuICAwJSB7XFxyXFxuICAgIG9wYWNpdHk6IDA7XFxyXFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xcclxcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgY3ViZS1mYWRlLWluIHtcXHJcXG4gIDAlIHtcXHJcXG4gICAgb3BhY2l0eTogMDtcXHJcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxyXFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC41KTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLmN1YmVzIC5jdWJlICoge1xcclxcbiAgei1pbmRleDogMTtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4uY3ViZXMgLmN1YmUgLnNoYWRvdyB7XFxyXFxuICBiYWNrZ3JvdW5kOiAjODM2MGMzO1xcclxcbiAgdG9wOiA0MCU7XFxyXFxufVxcclxcblxcclxcbi5jdWJlcyAuY3ViZSAuc2lkZXMge1xcclxcbiAgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcclxcbiAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXHJcXG4gIC13ZWJraXQtcGVyc3BlY3RpdmU6IDYwMHB4O1xcclxcbiAgcGVyc3BlY3RpdmU6IDYwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY3ViZXMgLmN1YmUgLnNpZGVzIGRpdiB7XFxyXFxuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcXHJcXG4gIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcXHJcXG4gIHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm07XFxyXFxufVxcclxcblxcclxcbi5jdWJlcyAuY3ViZSAuc2lkZXMgLmZyb250IHtcXHJcXG4gIHotaW5kZXg6IDEgIWltcG9ydGFudDtcXHJcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVZKDBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxyXFxuICB0cmFuc2Zvcm06IHJvdGF0ZVkoMGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXHJcXG59XFxyXFxuXFxyXFxuLmN1YmVzIC5jdWJlIC5zaWRlcyAuYmFjayB7XFxyXFxuICB6LWluZGV4OiAxICFpbXBvcnRhbnQ7XFxyXFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWSgtMTgwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcclxcbiAgdHJhbnNmb3JtOiByb3RhdGVZKC0xODBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxyXFxufVxcclxcblxcclxcbi5jdWJlcyAuY3ViZSAuc2lkZXMgLmxlZnQge1xcclxcbiAgei1pbmRleDogMSAhaW1wb3J0YW50O1xcclxcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoLTkwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcclxcbiAgdHJhbnNmb3JtOiByb3RhdGVZKC05MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXHJcXG59XFxyXFxuXFxyXFxuLmN1YmVzIC5jdWJlIC5zaWRlcyAucmlnaHQge1xcclxcbiAgei1pbmRleDogMSAhaW1wb3J0YW50O1xcclxcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoOTBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxyXFxuICB0cmFuc2Zvcm06IHJvdGF0ZVkoOTBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxyXFxufVxcclxcblxcclxcbi5jdWJlcyAuY3ViZSAuc2lkZXMgLnRvcCB7XFxyXFxuICB6LWluZGV4OiAxICFpbXBvcnRhbnQ7XFxyXFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWCg5MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXHJcXG4gIHRyYW5zZm9ybTogcm90YXRlWCg5MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXHJcXG59XFxyXFxuXFxyXFxuLmN1YmVzIC5jdWJlIC5zaWRlcyAuYm90dG9tIHtcXHJcXG4gIHotaW5kZXg6IDEgIWltcG9ydGFudDtcXHJcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVYKC05MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXHJcXG4gIHRyYW5zZm9ybTogcm90YXRlWCgtOTBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxyXFxufVxcclxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWN1YmVzLmNzcy5tYXAgKi9cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwicHJlW2NsYXNzKj1sYW5ndWFnZS1dLmxpbmUtbnVtYmVycyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBwYWRkaW5nLWxlZnQ6IDMuOGVtO1xcbiAgY291bnRlci1yZXNldDogbGluZW51bWJlcjtcXG59XFxuXFxucHJlW2NsYXNzKj1sYW5ndWFnZS1dLmxpbmUtbnVtYmVycyA+IGNvZGUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2hpdGUtc3BhY2U6IGluaGVyaXQ7XFxufVxcblxcbi5saW5lLW51bWJlcnMgLmxpbmUtbnVtYmVycy1yb3dzIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgdG9wOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgbGVmdDogLTMuOGVtO1xcbiAgd2lkdGg6IDNlbTtcXG4gIC8qIHdvcmtzIGZvciBsaW5lLW51bWJlcnMgYmVsb3cgMTAwMCBsaW5lcyAqL1xcbiAgbGV0dGVyLXNwYWNpbmc6IC0xcHg7XFxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjOTk5O1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuXFxuLmxpbmUtbnVtYmVycy1yb3dzID4gc3BhbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGNvdW50ZXItaW5jcmVtZW50OiBsaW5lbnVtYmVyO1xcbn1cXG5cXG4ubGluZS1udW1iZXJzLXJvd3MgPiBzcGFuOmJlZm9yZSB7XFxuICBjb250ZW50OiBjb3VudGVyKGxpbmVudW1iZXIpO1xcbiAgY29sb3I6ICM5OTk7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBhZGRpbmctcmlnaHQ6IDAuOGVtO1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL25vZGVfbW9kdWxlcy9wcmlzbWpzL3BsdWdpbnMvbGluZS1udW1iZXJzL3ByaXNtLWxpbmUtbnVtYmVycy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDQyxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7QUFDRDs7QUFFQTtFQUNDLGtCQUFBO0VBQ0Esb0JBQUE7QUFDRDs7QUFFQTtFQUNDLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxNQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQVksNENBQUE7RUFDWixvQkFBQTtFQUNBLDRCQUFBO0VBRUEseUJBQUE7RUFDQSxzQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7QUFDRDs7QUFHQztFQUNDLGNBQUE7RUFDQSw2QkFBQTtBQUFGOztBQUdFO0VBQ0MsNEJBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7QUFBSFwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJwcmVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXS5saW5lLW51bWJlcnMge1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRwYWRkaW5nLWxlZnQ6IDMuOGVtO1xcblxcdGNvdW50ZXItcmVzZXQ6IGxpbmVudW1iZXI7XFxufVxcblxcbnByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdLmxpbmUtbnVtYmVycyA+IGNvZGUge1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHR3aGl0ZS1zcGFjZTogaW5oZXJpdDtcXG59XFxuXFxuLmxpbmUtbnVtYmVycyAubGluZS1udW1iZXJzLXJvd3Mge1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHRwb2ludGVyLWV2ZW50czogbm9uZTtcXG5cXHR0b3A6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGxlZnQ6IC0zLjhlbTtcXG5cXHR3aWR0aDogM2VtOyAvKiB3b3JrcyBmb3IgbGluZS1udW1iZXJzIGJlbG93IDEwMDAgbGluZXMgKi9cXG5cXHRsZXR0ZXItc3BhY2luZzogLTFweDtcXG5cXHRib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjOTk5O1xcblxcblxcdC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuXFx0LW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG5cXHQtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuXFx0dXNlci1zZWxlY3Q6IG5vbmU7XFxuXFxufVxcblxcblxcdC5saW5lLW51bWJlcnMtcm93cyA+IHNwYW4ge1xcblxcdFxcdGRpc3BsYXk6IGJsb2NrO1xcblxcdFxcdGNvdW50ZXItaW5jcmVtZW50OiBsaW5lbnVtYmVyO1xcblxcdH1cXG5cXG5cXHRcXHQubGluZS1udW1iZXJzLXJvd3MgPiBzcGFuOmJlZm9yZSB7XFxuXFx0XFx0XFx0Y29udGVudDogY291bnRlcihsaW5lbnVtYmVyKTtcXG5cXHRcXHRcXHRjb2xvcjogIzk5OTtcXG5cXHRcXHRcXHRkaXNwbGF5OiBibG9jaztcXG5cXHRcXHRcXHRwYWRkaW5nLXJpZ2h0OiAwLjhlbTtcXG5cXHRcXHRcXHR0ZXh0LWFsaWduOiByaWdodDtcXG5cXHRcXHR9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qKlxcbiAqIG9rYWlkaWEgdGhlbWUgZm9yIEphdmFTY3JpcHQsIENTUyBhbmQgSFRNTFxcbiAqIExvb3NlbHkgYmFzZWQgb24gTW9ub2thaSB0ZXh0bWF0ZSB0aGVtZSBieSBodHRwOi8vd3d3Lm1vbm9rYWkubmwvXFxuICogQGF1dGhvciBvY29kaWFcXG4gKi9cXG5jb2RlW2NsYXNzKj1sYW5ndWFnZS1dLFxcbnByZVtjbGFzcyo9bGFuZ3VhZ2UtXSB7XFxuICBjb2xvcjogI2Y4ZjhmMjtcXG4gIGJhY2tncm91bmQ6IG5vbmU7XFxuICB0ZXh0LXNoYWRvdzogMCAxcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgZm9udC1mYW1pbHk6IENvbnNvbGFzLCBNb25hY28sIFxcXCJBbmRhbGUgTW9ub1xcXCIsIFxcXCJVYnVudHUgTW9ub1xcXCIsIG1vbm9zcGFjZTtcXG4gIGZvbnQtc2l6ZTogMWVtO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHdoaXRlLXNwYWNlOiBwcmU7XFxuICB3b3JkLXNwYWNpbmc6IG5vcm1hbDtcXG4gIHdvcmQtYnJlYWs6IG5vcm1hbDtcXG4gIHdvcmQtd3JhcDogbm9ybWFsO1xcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG4gIC1tb3otdGFiLXNpemU6IDQ7XFxuICAtby10YWItc2l6ZTogNDtcXG4gIHRhYi1zaXplOiA0O1xcbiAgLXdlYmtpdC1oeXBoZW5zOiBub25lO1xcbiAgLW1vei1oeXBoZW5zOiBub25lO1xcbiAgLW1zLWh5cGhlbnM6IG5vbmU7XFxuICBoeXBoZW5zOiBub25lO1xcbn1cXG5cXG4vKiBDb2RlIGJsb2NrcyAqL1xcbnByZVtjbGFzcyo9bGFuZ3VhZ2UtXSB7XFxuICBwYWRkaW5nOiAxZW07XFxuICBtYXJnaW46IDAuNWVtIDA7XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIGJvcmRlci1yYWRpdXM6IDAuM2VtO1xcbn1cXG5cXG46bm90KHByZSkgPiBjb2RlW2NsYXNzKj1sYW5ndWFnZS1dLFxcbnByZVtjbGFzcyo9bGFuZ3VhZ2UtXSB7XFxuICBiYWNrZ3JvdW5kOiAjMjcyODIyO1xcbn1cXG5cXG4vKiBJbmxpbmUgY29kZSAqL1xcbjpub3QocHJlKSA+IGNvZGVbY2xhc3MqPWxhbmd1YWdlLV0ge1xcbiAgcGFkZGluZzogMC4xZW07XFxuICBib3JkZXItcmFkaXVzOiAwLjNlbTtcXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XFxufVxcblxcbi50b2tlbi5jb21tZW50LFxcbi50b2tlbi5wcm9sb2csXFxuLnRva2VuLmRvY3R5cGUsXFxuLnRva2VuLmNkYXRhIHtcXG4gIGNvbG9yOiAjODI5MmEyO1xcbn1cXG5cXG4udG9rZW4ucHVuY3R1YXRpb24ge1xcbiAgY29sb3I6ICNmOGY4ZjI7XFxufVxcblxcbi50b2tlbi5uYW1lc3BhY2Uge1xcbiAgb3BhY2l0eTogMC43O1xcbn1cXG5cXG4udG9rZW4ucHJvcGVydHksXFxuLnRva2VuLnRhZyxcXG4udG9rZW4uY29uc3RhbnQsXFxuLnRva2VuLnN5bWJvbCxcXG4udG9rZW4uZGVsZXRlZCB7XFxuICBjb2xvcjogI2Y5MjY3MjtcXG59XFxuXFxuLnRva2VuLmJvb2xlYW4sXFxuLnRva2VuLm51bWJlciB7XFxuICBjb2xvcjogI2FlODFmZjtcXG59XFxuXFxuLnRva2VuLnNlbGVjdG9yLFxcbi50b2tlbi5hdHRyLW5hbWUsXFxuLnRva2VuLnN0cmluZyxcXG4udG9rZW4uY2hhcixcXG4udG9rZW4uYnVpbHRpbixcXG4udG9rZW4uaW5zZXJ0ZWQge1xcbiAgY29sb3I6ICNhNmUyMmU7XFxufVxcblxcbi50b2tlbi5vcGVyYXRvcixcXG4udG9rZW4uZW50aXR5LFxcbi50b2tlbi51cmwsXFxuLmxhbmd1YWdlLWNzcyAudG9rZW4uc3RyaW5nLFxcbi5zdHlsZSAudG9rZW4uc3RyaW5nLFxcbi50b2tlbi52YXJpYWJsZSB7XFxuICBjb2xvcjogI2Y4ZjhmMjtcXG59XFxuXFxuLnRva2VuLmF0cnVsZSxcXG4udG9rZW4uYXR0ci12YWx1ZSxcXG4udG9rZW4uZnVuY3Rpb24sXFxuLnRva2VuLmNsYXNzLW5hbWUge1xcbiAgY29sb3I6ICNlNmRiNzQ7XFxufVxcblxcbi50b2tlbi5rZXl3b3JkIHtcXG4gIGNvbG9yOiAjNjZkOWVmO1xcbn1cXG5cXG4udG9rZW4ucmVnZXgsXFxuLnRva2VuLmltcG9ydGFudCB7XFxuICBjb2xvcjogI2ZkOTcxZjtcXG59XFxuXFxuLnRva2VuLmltcG9ydGFudCxcXG4udG9rZW4uYm9sZCB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLnRva2VuLml0YWxpYyB7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcblxcbi50b2tlbi5lbnRpdHkge1xcbiAgY3Vyc29yOiBoZWxwO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9ub2RlX21vZHVsZXMvcHJpc21qcy90aGVtZXMvcHJpc20tb2thaWRpYS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Ozs7RUFBQTtBQU1BOztFQUVDLGNBQUE7RUFDQSxnQkFBQTtFQUNBLHFDQUFBO0VBQ0Esc0VBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBRUEsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUVBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7QUFGRDs7QUFLQSxnQkFBQTtBQUNBO0VBQ0MsWUFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0Esb0JBQUE7QUFGRDs7QUFLQTs7RUFFQyxtQkFBQTtBQUZEOztBQUtBLGdCQUFBO0FBQ0E7RUFDQyxjQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtBQUZEOztBQUtBOzs7O0VBSUMsY0FBQTtBQUZEOztBQUtBO0VBQ0MsY0FBQTtBQUZEOztBQUtBO0VBQ0MsWUFBQTtBQUZEOztBQUtBOzs7OztFQUtDLGNBQUE7QUFGRDs7QUFLQTs7RUFFQyxjQUFBO0FBRkQ7O0FBS0E7Ozs7OztFQU1DLGNBQUE7QUFGRDs7QUFLQTs7Ozs7O0VBTUMsY0FBQTtBQUZEOztBQUtBOzs7O0VBSUMsY0FBQTtBQUZEOztBQUtBO0VBQ0MsY0FBQTtBQUZEOztBQUtBOztFQUVDLGNBQUE7QUFGRDs7QUFLQTs7RUFFQyxpQkFBQTtBQUZEOztBQUlBO0VBQ0Msa0JBQUE7QUFERDs7QUFJQTtFQUNDLFlBQUE7QUFERFwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKipcXG4gKiBva2FpZGlhIHRoZW1lIGZvciBKYXZhU2NyaXB0LCBDU1MgYW5kIEhUTUxcXG4gKiBMb29zZWx5IGJhc2VkIG9uIE1vbm9rYWkgdGV4dG1hdGUgdGhlbWUgYnkgaHR0cDovL3d3dy5tb25va2FpLm5sL1xcbiAqIEBhdXRob3Igb2NvZGlhXFxuICovXFxuXFxuY29kZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdLFxcbnByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdIHtcXG5cXHRjb2xvcjogI2Y4ZjhmMjtcXG5cXHRiYWNrZ3JvdW5kOiBub25lO1xcblxcdHRleHQtc2hhZG93OiAwIDFweCByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuXFx0Zm9udC1mYW1pbHk6IENvbnNvbGFzLCBNb25hY28sICdBbmRhbGUgTW9ubycsICdVYnVudHUgTW9ubycsIG1vbm9zcGFjZTtcXG5cXHRmb250LXNpemU6IDFlbTtcXG5cXHR0ZXh0LWFsaWduOiBsZWZ0O1xcblxcdHdoaXRlLXNwYWNlOiBwcmU7XFxuXFx0d29yZC1zcGFjaW5nOiBub3JtYWw7XFxuXFx0d29yZC1icmVhazogbm9ybWFsO1xcblxcdHdvcmQtd3JhcDogbm9ybWFsO1xcblxcdGxpbmUtaGVpZ2h0OiAxLjU7XFxuXFxuXFx0LW1vei10YWItc2l6ZTogNDtcXG5cXHQtby10YWItc2l6ZTogNDtcXG5cXHR0YWItc2l6ZTogNDtcXG5cXG5cXHQtd2Via2l0LWh5cGhlbnM6IG5vbmU7XFxuXFx0LW1vei1oeXBoZW5zOiBub25lO1xcblxcdC1tcy1oeXBoZW5zOiBub25lO1xcblxcdGh5cGhlbnM6IG5vbmU7XFxufVxcblxcbi8qIENvZGUgYmxvY2tzICovXFxucHJlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl0ge1xcblxcdHBhZGRpbmc6IDFlbTtcXG5cXHRtYXJnaW46IC41ZW0gMDtcXG5cXHRvdmVyZmxvdzogYXV0bztcXG5cXHRib3JkZXItcmFkaXVzOiAwLjNlbTtcXG59XFxuXFxuOm5vdChwcmUpID4gY29kZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdLFxcbnByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdIHtcXG5cXHRiYWNrZ3JvdW5kOiAjMjcyODIyO1xcbn1cXG5cXG4vKiBJbmxpbmUgY29kZSAqL1xcbjpub3QocHJlKSA+IGNvZGVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXSB7XFxuXFx0cGFkZGluZzogLjFlbTtcXG5cXHRib3JkZXItcmFkaXVzOiAuM2VtO1xcblxcdHdoaXRlLXNwYWNlOiBub3JtYWw7XFxufVxcblxcbi50b2tlbi5jb21tZW50LFxcbi50b2tlbi5wcm9sb2csXFxuLnRva2VuLmRvY3R5cGUsXFxuLnRva2VuLmNkYXRhIHtcXG5cXHRjb2xvcjogIzgyOTJhMjtcXG59XFxuXFxuLnRva2VuLnB1bmN0dWF0aW9uIHtcXG5cXHRjb2xvcjogI2Y4ZjhmMjtcXG59XFxuXFxuLnRva2VuLm5hbWVzcGFjZSB7XFxuXFx0b3BhY2l0eTogLjc7XFxufVxcblxcbi50b2tlbi5wcm9wZXJ0eSxcXG4udG9rZW4udGFnLFxcbi50b2tlbi5jb25zdGFudCxcXG4udG9rZW4uc3ltYm9sLFxcbi50b2tlbi5kZWxldGVkIHtcXG5cXHRjb2xvcjogI2Y5MjY3MjtcXG59XFxuXFxuLnRva2VuLmJvb2xlYW4sXFxuLnRva2VuLm51bWJlciB7XFxuXFx0Y29sb3I6ICNhZTgxZmY7XFxufVxcblxcbi50b2tlbi5zZWxlY3RvcixcXG4udG9rZW4uYXR0ci1uYW1lLFxcbi50b2tlbi5zdHJpbmcsXFxuLnRva2VuLmNoYXIsXFxuLnRva2VuLmJ1aWx0aW4sXFxuLnRva2VuLmluc2VydGVkIHtcXG5cXHRjb2xvcjogI2E2ZTIyZTtcXG59XFxuXFxuLnRva2VuLm9wZXJhdG9yLFxcbi50b2tlbi5lbnRpdHksXFxuLnRva2VuLnVybCxcXG4ubGFuZ3VhZ2UtY3NzIC50b2tlbi5zdHJpbmcsXFxuLnN0eWxlIC50b2tlbi5zdHJpbmcsXFxuLnRva2VuLnZhcmlhYmxlIHtcXG5cXHRjb2xvcjogI2Y4ZjhmMjtcXG59XFxuXFxuLnRva2VuLmF0cnVsZSxcXG4udG9rZW4uYXR0ci12YWx1ZSxcXG4udG9rZW4uZnVuY3Rpb24sXFxuLnRva2VuLmNsYXNzLW5hbWUge1xcblxcdGNvbG9yOiAjZTZkYjc0O1xcbn1cXG5cXG4udG9rZW4ua2V5d29yZCB7XFxuXFx0Y29sb3I6ICM2NmQ5ZWY7XFxufVxcblxcbi50b2tlbi5yZWdleCxcXG4udG9rZW4uaW1wb3J0YW50IHtcXG5cXHRjb2xvcjogI2ZkOTcxZjtcXG59XFxuXFxuLnRva2VuLmltcG9ydGFudCxcXG4udG9rZW4uYm9sZCB7XFxuXFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbi50b2tlbi5pdGFsaWMge1xcblxcdGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuLnRva2VuLmVudGl0eSB7XFxuXFx0Y3Vyc29yOiBoZWxwO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuLmxhbmd1YWdlLWpzIHtcXG4gIGZvbnQtc2l6ZTogMC44dncgIWltcG9ydGFudDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XFxuICB3b3JkLWJyZWFrOiBicmVhay13b3JkICFpbXBvcnRhbnQ7XFxufVxcblxcbi5jb2RlLXRvb2xiYXIge1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbn1cXG5cXG5wcmUge1xcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcXG4gIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcXG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcCAhaW1wb3J0YW50O1xcbiAgcGFkZGluZzogMTVweCAzMHB4IDE1cHggMTVweDtcXG59XFxuXFxuLmFwcC13cmFwcGVyIHtcXG4gIGhlaWdodDogMTAwdmg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBvdmVyZmxvdy14OiBoaWRkZW47XFxufVxcblxcbmNvZGUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcbn1cXG5cXG5odG1sLFxcbmJvZHkge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuI3Jvb3Qge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnRvb2xiYXItaXRlbSB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcblxcbi50ZWNoLWljb24ge1xcbiAgZmlsbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xcbn1cXG5cXG4vKiMgc291cmNlTWFwcGluZ1VSTD1tYWluLmNzcy5tYXAgKi9cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvbWFpbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxTQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsOEJBQUE7RUFDUSxzQkFBQTtBQUNWOztBQUVBO0VBQ0UsMkJBQUE7RUFDQSx3Q0FBQTtFQUNBLGlDQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxzQkFBQTtFQUNBLDJCQUFBO0VBQ0EsZ0NBQUE7RUFDQSw0QkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsY0FBQTtFQUNBLHNCQUFBO0FBQ0Y7O0FBRUE7O0VBRUUsYUFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSx3QkFBQTtBQUNGOztBQUVBO0VBQ0UsOEJBQUE7QUFDRjs7QUFDQSxtQ0FBQVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4ubGFuZ3VhZ2UtanMge1xcbiAgZm9udC1zaXplOiAwLjh2dyAhaW1wb3J0YW50O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcXG4gIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQgIWltcG9ydGFudDtcXG59XFxuXFxuLmNvZGUtdG9vbGJhciB7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxufVxcblxcbnByZSB7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcbiAgdGV4dC1hbGlnbjogbGVmdCAhaW1wb3J0YW50O1xcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwICFpbXBvcnRhbnQ7XFxuICBwYWRkaW5nOiAxNXB4IDMwcHggMTVweCAxNXB4O1xcbn1cXG5cXG4uYXBwLXdyYXBwZXIge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXG59XFxuXFxuY29kZSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XFxufVxcblxcbmh0bWwsXFxuYm9keSB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4jcm9vdCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4udG9vbGJhci1pdGVtIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuXFxuLnRlY2gtaWNvbiB7XFxuICBmaWxsOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyk7XFxufVxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPW1haW4uY3NzLm1hcCAqL1wiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gZnJvbSBcIi4uL2ZvbnRzL2NpcmN1bGFyLWJvbGQud29mZjJcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyBmcm9tIFwiLi4vZm9udHMvVmFyZWxhUm91bmQtUmVndWxhci50dGZcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIm1haW5Gb250XFxcIjtcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIik7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJzZWNvbmRhcnlcXFwiO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKTtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2xhcHRvcC0tMUN1R0wge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBwYWRkaW5nLXRvcDogNTAuMjUlO1xcbiAgYmFja2dyb3VuZDogIzFhMWUyYztcXG4gIGJvcmRlcjogMTVweCBzb2xpZCAjM2YzZjQxO1xcbiAgYm9yZGVyLXRvcDogMjBweCBzb2xpZCAjM2YzZjQxO1xcbiAgYm9yZGVyLXJhZGl1czogMTRweCAxNHB4IDAgMDtcXG4gIGJveC1zaGFkb3c6IDAgMCAwIDFweCAjZDFkMmQ0O1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGFwdG9wLS0xQ3VHTDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBib3R0b206IC0zNXB4O1xcbiAgYmFja2dyb3VuZDogI2U2ZThlNztcXG4gIGhlaWdodDogMjBweDtcXG4gIHdpZHRoOiAxMzAlO1xcbiAgYm9yZGVyLXJhZGl1czogMCAwIDEwcHggMTBweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2xhcHRvcC0tMUN1R0w6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICB0b3A6IC0xMnB4O1xcbiAgd2lkdGg6IDNweDtcXG4gIGhlaWdodDogM3B4O1xcbiAgYmFja2dyb3VuZDogI2U2ZThlNztcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG59XFxuXFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2Jhc2UtLTFGMEs4IHtcXG4gIGJvdHRvbTogLTI1cHg7XFxuICBiYWNrZ3JvdW5kOiAjZDFkMmQ0O1xcbiAgaGVpZ2h0OiAxMHB4O1xcbiAgbWF4LXdpZHRoOiAxMzAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fYmFzZS0tMUYwSzg6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgYm9yZGVyLXJhZGl1czogMCAwIDEwcHggMTBweDtcXG4gIGhlaWdodDogMTBweDtcXG4gIG1heC13aWR0aDogODBweDtcXG4gIGJhY2tncm91bmQ6ICNiY2JkYzE7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19iYXNlLS0xRjBLODphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGhlaWdodDogMjBweDtcXG4gIG1heC13aWR0aDogMTMwJTtcXG4gIGJvcmRlci1yYWRpdXM6IDAgMCAxMHB4IDEwcHg7XFxuICBib3gtc2hhZG93OiAwcHggMTBweCAzNnB4IC0ycHggcmdiYSgwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSB7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoLTEzZGVnLCAjMmM1ZTkyLCAjNTUyZjZkKTtcXG4gIHBhZGRpbmc6IDIwcHggMzBweCAyMHB4IDMwcHg7XFxuICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLWNvbnRhaW5lci0tMzdIOVcge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDcwJTtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLWNvbnRhaW5lci0tMzdIOVcgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2xhcHRvcC1zdmctLTNXUkViIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItY29udGFpbmVyLS0zN0g5VyAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItLTJXRmxIIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBvdmVyZmxvdy15OiBoaWRkZW47XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBmb250LWZhbWlseTogbW9uYWNvLCBDb25zb2xhcywgXFxcIkx1Y2lkYSBDb25zb2xlXFxcIiwgbW9ub3NwYWNlO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFhMWUyYztcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLWNvbnRhaW5lci0tMzdIOVcgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLS0yV0ZsSCAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGluZS1udW1iZXItY29udGFpbmVyLS0yQlM3QiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBjb2xvcjogIzU1NzE4ZDtcXG4gIGdhcDogM3B4O1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItY29udGFpbmVyLS0zN0g5VyAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItLTJXRmxIIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19saW5lLW51bWJlci1jb250YWluZXItLTJCUzdCIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19saW5lLWNvbnRhaW5lci0tMldzWnkge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLWNvbnRhaW5lci0tMzdIOVcgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLS0yV0ZsSCAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGluZS1udW1iZXItY29udGFpbmVyLS0yQlM3QiAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGluZS1jb250YWluZXItLTJXc1p5IC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19saW5lLW51bWJlci0tbTR4SVIge1xcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItY29udGFpbmVyLS0zN0g5VyAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItLTJXRmxIIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19saW5lLW51bWJlci1jb250YWluZXItLTJCUzdCIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19saW5lLWNvbnRhaW5lci0tMldzWnkgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtbGluZS0tMzFyTjUge1xcbiAgZGlzcGxheTogaW5saW5lO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci1jb250YWluZXItLTM3SDlXIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci0tMldGbEggLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NsaWVudC1lZGl0b3ItLTFFdVRIIHtcXG4gIHdpZHRoOiA1MCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBib3JkZXItcmlnaHQ6IDAuNXB4IHNvbGlkIGdyYXk7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci1jb250YWluZXItLTM3SDlXIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci0tMldGbEggLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX3NlcnZlci1lZGl0b3ItLTFvb0NxIHtcXG4gIHdpZHRoOiA1MCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19tYWluLWNvbnRlbnQtLTJjT1dIIHtcXG4gIHotaW5kZXg6IDM7XFxuICBmb250LWZhbWlseTogXFxcIm1haW5Gb250XFxcIjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmb250LXNpemU6IDM2cHg7XFxuICBoZWlnaHQ6IGF1dG87XFxuICBnYXA6IDUwcHg7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgbWF4LXdpZHRoOiAxNTAwcHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX21haW4tY29udGVudC0tMmNPV0ggLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX3RleHQtY29udGVudC0tanVHQmMge1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgd2lkdGg6IDMwJTtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDkyMHB4KSB7XFxuICAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbWFpbi1jb250ZW50LS0yY09XSCAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fdGV4dC1jb250ZW50LS1qdUdCYyB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbWFpbi1jb250ZW50LS0yY09XSCAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fdGV4dC1jb250ZW50LS1qdUdCYyAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGluZS1oZWFkZXItLTItLTdNIHtcXG4gIG1hcmdpbi1ib3R0b206IDI1cHg7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19tYWluLWNvbnRlbnQtLTJjT1dIIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX190ZXh0LWNvbnRlbnQtLWp1R0JjIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX190ZXh0LWNvbnRhaW5lci0tOVpxYUUge1xcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogMzBweCAxM3B4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbWFpbi1jb250ZW50LS0yY09XSCAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fdGV4dC1jb250ZW50LS1qdUdCYyAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fdGV4dC1jb250YWluZXItLTlacWFFIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19tYWluLWhlYWRlci0tWjlzZG0ge1xcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcXG4gIGJhY2tncm91bmQ6ICMxZTMyNjQ7XFxuICBwYWRkaW5nOiA1cHggODBweCA1cHggMTNweDtcXG4gIG1hcmdpbi1sZWZ0OiAtMzBweDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgbGluZS1oZWlnaHQ6IDQwcHg7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19tYWluLWNvbnRlbnQtLTJjT1dIIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX190ZXh0LWNvbnRlbnQtLWp1R0JjIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX190ZXh0LWNvbnRhaW5lci0tOVpxYUUgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX3JlYWN0LWhlYWRlci0tZDhrR28ge1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgei1pbmRleDogMTtcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19tYWluLWNvbnRlbnQtLTJjT1dIIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX190ZXh0LWNvbnRlbnQtLWp1R0JjIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19kZXNjcmlwdGlvbi0tMkZBeTUge1xcbiAgZm9udC1mYW1pbHk6IHNlY29uZGFyeTtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIHJpZ2h0OiAwO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XFxuICBsaW5lLWhlaWdodDogMjNweDtcXG4gIHRvcDogMDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA5MjBweCkge1xcbiAgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX21haW4tY29udGVudC0tMmNPV0gge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XFxuICB9XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA1NzZweCkgYW5kIChtYXgtd2lkdGg6IDc2Ny45OHB4KSB7XFxuICAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbWFpbi1jb250ZW50LS0yY09XSCB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcXG4gIH1cXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3Jj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dFwiOltcIkBmb250LWZhY2Uge1xcclxcbiAgZm9udC1mYW1pbHk6IFxcXCJtYWluRm9udFxcXCI7XFxyXFxuICBzcmM6IHVybChcXFwiLi4vZm9udHMvY2lyY3VsYXItYm9sZC53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKTtcXHJcXG59XFxyXFxuQGZvbnQtZmFjZSB7XFxyXFxuICBmb250LWZhbWlseTogXFxcInNlY29uZGFyeVxcXCI7XFxyXFxuICBzcmM6IHVybChcXFwiLi4vZm9udHMvVmFyZWxhUm91bmQtUmVndWxhci50dGZcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxyXFxufVxcclxcbiRiYWNrZ3JvdW5kOiAjMmZhYzY2O1xcclxcbiRiYXNlOiAjZTZlOGU3O1xcclxcbiRzY3JlZW46ICMxYTFlMmM7XFxyXFxuJGZyYW1lOiAjM2YzZjQxO1xcclxcbiRvcGVuOiAjYmNiZGMxO1xcclxcbiRiYXNlMjogI2QxZDJkNDtcXHJcXG4kYmFzZVdpZHRoOiAxMzAlO1xcclxcbkBtaXhpbiBhbGlnbi1ob3Jpem9udGFsIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIGxlZnQ6IDUwJTtcXHJcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXHJcXG59XFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDU0MHB4KSB7XFxyXFxuICAkYmFzZVdpZHRoOiAxMzAlO1xcclxcbn1cXHJcXG4ubGFwdG9wIHtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIG1hcmdpbjogMCBhdXRvO1xcclxcbiAgcGFkZGluZy10b3A6IDUwLjI1JTtcXHJcXG4gIGJhY2tncm91bmQ6ICRzY3JlZW47XFxyXFxuICBib3JkZXI6IDE1cHggc29saWQgJGZyYW1lO1xcclxcbiAgYm9yZGVyLXRvcDogMjBweCBzb2xpZCAkZnJhbWU7XFxyXFxuICBib3JkZXItcmFkaXVzOiAxNHB4IDE0cHggMCAwO1xcclxcbiAgYm94LXNoYWRvdzogMCAwIDAgMXB4ICRiYXNlMjtcXHJcXG4gICY6YmVmb3JlIHtcXHJcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxyXFxuICAgIGJvdHRvbTogLTM1cHg7XFxyXFxuICAgIGJhY2tncm91bmQ6ICRiYXNlO1xcclxcbiAgICBoZWlnaHQ6IDIwcHg7XFxyXFxuICAgIHdpZHRoOiAkYmFzZVdpZHRoO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xcclxcbiAgICBAaW5jbHVkZSBhbGlnbi1ob3Jpem9udGFsO1xcclxcbiAgfVxcclxcbiAgJjphZnRlciB7XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcclxcbiAgICB0b3A6IC0xMnB4O1xcclxcbiAgICB3aWR0aDogM3B4O1xcclxcbiAgICBoZWlnaHQ6IDNweDtcXHJcXG4gICAgYmFja2dyb3VuZDogJGJhc2U7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgQGluY2x1ZGUgYWxpZ24taG9yaXpvbnRhbDtcXHJcXG4gIH1cXHJcXG59XFxyXFxuLmJhc2Uge1xcclxcbiAgYm90dG9tOiAtMjVweDtcXHJcXG4gIGJhY2tncm91bmQ6ICRiYXNlMjtcXHJcXG4gIGhlaWdodDogMTBweDtcXHJcXG4gIG1heC13aWR0aDogJGJhc2VXaWR0aDtcXHJcXG4gIEBpbmNsdWRlIGFsaWduLWhvcml6b250YWw7XFxyXFxuICAmOmJlZm9yZSB7XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwcHg7XFxyXFxuICAgIG1heC13aWR0aDogODBweDtcXHJcXG4gICAgYmFja2dyb3VuZDogJG9wZW47XFxyXFxuICAgIEBpbmNsdWRlIGFsaWduLWhvcml6b250YWw7XFxyXFxuICB9XFxyXFxuICAmOmFmdGVyIHtcXHJcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgaGVpZ2h0OiAyMHB4O1xcclxcbiAgICBtYXgtd2lkdGg6ICRiYXNlV2lkdGg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDAgMCAxMHB4IDEwcHg7XFxyXFxuICAgIGJveC1zaGFkb3c6IDBweCAxMHB4IDM2cHggLTJweCByZ2JhKDAsIDAsIDAsIDAuNCk7XFxyXFxuICB9XFxyXFxufVxcclxcbi5jb250YWluZXIge1xcclxcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KC0xM2RlZywgIzJjNWU5MiwgIzU1MmY2ZCk7XFxyXFxuICBwYWRkaW5nOiAyMHB4IDMwcHggMjBweCAzMHB4O1xcclxcbiAgb3ZlcmZsb3cteTogYXV0bztcXHJcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcclxcbiAgLmNvZGUtZWRpdG9yLWNvbnRhaW5lciB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICB3aWR0aDogNzAlO1xcclxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogOTIwcHgpIHtcXHJcXG4gICAgfVxcclxcbiAgICAubGFwdG9wLXN2ZyB7XFxyXFxuICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICB9XFxyXFxuICAgIC5jb2RlLWVkaXRvciB7XFxyXFxuICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICBvdmVyZmxvdy15OiBoaWRkZW47XFxyXFxuICAgICAgdG9wOiAwO1xcclxcbiAgICAgIGJvdHRvbTogMDtcXHJcXG4gICAgICBsZWZ0OiAwO1xcclxcbiAgICAgIHJpZ2h0OiAwO1xcclxcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgICBmb250LWZhbWlseTogbW9uYWNvLCBDb25zb2xhcywgXFxcIkx1Y2lkYSBDb25zb2xlXFxcIiwgbW9ub3NwYWNlO1xcclxcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXHJcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWExZTJjO1xcclxcbiAgICAgIC5saW5lLW51bWJlci1jb250YWluZXIge1xcclxcbiAgICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgICAgY29sb3I6ICM1NTcxOGQ7XFxyXFxuICAgICAgICBnYXA6IDNweDtcXHJcXG4gICAgICAgIC5saW5lLWNvbnRhaW5lciB7XFxyXFxuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgICAgICAgIC5saW5lLW51bWJlciB7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcclxcbiAgICAgICAgICB9XFxyXFxuICAgICAgICAgIC5jb2RlLWxpbmUge1xcclxcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZTtcXHJcXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgICAgfVxcclxcbiAgICAgICAgfVxcclxcbiAgICAgIH1cXHJcXG4gICAgICAuY2xpZW50LWVkaXRvciB7XFxyXFxuICAgICAgICB3aWR0aDogNTAlO1xcclxcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAwLjVweCBzb2xpZCBncmF5O1xcclxcbiAgICAgIH1cXHJcXG4gICAgICAuc2VydmVyLWVkaXRvciB7XFxyXFxuICAgICAgICB3aWR0aDogNTAlO1xcclxcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxyXFxuICAubWFpbi1jb250ZW50IHtcXHJcXG4gICAgei1pbmRleDogMztcXHJcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJtYWluRm9udFxcXCI7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZvbnQtc2l6ZTogMzZweDtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgICBnYXA6IDUwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHg7XFxyXFxuICAgIG1heC13aWR0aDogMTUwMHB4O1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIC50ZXh0LWNvbnRlbnQge1xcclxcbiAgICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDkyMHB4KSB7XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgd2lkdGg6IDMwJTtcXHJcXG4gICAgICAubGluZS1oZWFkZXIge1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjVweDtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgLnRleHQtY29udGFpbmVyIHtcXHJcXG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XFxyXFxuICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgIHBhZGRpbmc6IDMwcHggMTNweDtcXHJcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgICAgIC5tYWluLWhlYWRlciB7XFxyXFxuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XFxyXFxuICAgICAgICAgIGJhY2tncm91bmQ6ICMxZTMyNjQ7XFxyXFxuICAgICAgICAgIHBhZGRpbmc6IDVweCA4MHB4IDVweCAxM3B4O1xcclxcbiAgICAgICAgICBtYXJnaW4tbGVmdDogLTMwcHg7XFxyXFxuICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcXHJcXG4gICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXHJcXG4gICAgICAgICAgd2lkdGg6IGZpdC1jb250ZW50O1xcclxcbiAgICAgICAgICBsaW5lLWhlaWdodDogNDBweDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgICAgIC5yZWFjdC1oZWFkZXIge1xcclxcbiAgICAgICAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgICAgICAgIHotaW5kZXg6IDE7XFxyXFxuICAgICAgICAgIGhlaWdodDogZml0LWNvbnRlbnQ7XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgfVxcclxcbiAgICAgIC5kZXNjcmlwdGlvbiB7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogc2Vjb25kYXJ5O1xcclxcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xcclxcbiAgICAgICAgcmlnaHQ6IDA7XFxyXFxuICAgICAgICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyM3B4O1xcclxcbiAgICAgICAgdG9wOiAwO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcXHJcXG4gICAgICB9XFxyXFxuICAgIH1cXHJcXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDkyMHB4KSB7XFxyXFxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbi1yZXZlcnNlO1xcclxcbiAgICB9XFxyXFxuICB9XFxyXFxufVxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA1NzUuOThweCkge1xcclxcbn1cXHJcXG5AbWVkaWEgKG1pbi13aWR0aDogNTc2cHgpIGFuZCAobWF4LXdpZHRoOiA3NjcuOThweCkge1xcclxcbiAgLm1haW4tY29udGVudCB7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5sb2NhbHMgPSB7XG5cdFwibGFwdG9wXCI6IFwic3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGFwdG9wLS0xQ3VHTFwiLFxuXHRcImJhc2VcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19iYXNlLS0xRjBLOFwiLFxuXHRcImNvbnRhaW5lclwiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckFcIixcblx0XCJjb2RlLWVkaXRvci1jb250YWluZXJcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci1jb250YWluZXItLTM3SDlXXCIsXG5cdFwibGFwdG9wLXN2Z1wiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2xhcHRvcC1zdmctLTNXUkViXCIsXG5cdFwiY29kZS1lZGl0b3JcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci0tMldGbEhcIixcblx0XCJsaW5lLW51bWJlci1jb250YWluZXJcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19saW5lLW51bWJlci1jb250YWluZXItLTJCUzdCXCIsXG5cdFwibGluZS1jb250YWluZXJcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19saW5lLWNvbnRhaW5lci0tMldzWnlcIixcblx0XCJsaW5lLW51bWJlclwiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2xpbmUtbnVtYmVyLS1tNHhJUlwiLFxuXHRcImNvZGUtbGluZVwiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtbGluZS0tMzFyTjVcIixcblx0XCJjbGllbnQtZWRpdG9yXCI6IFwic3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY2xpZW50LWVkaXRvci0tMUV1VEhcIixcblx0XCJzZXJ2ZXItZWRpdG9yXCI6IFwic3JjLWFib3V0LWFib3V0LW1vZHVsZV9fc2VydmVyLWVkaXRvci0tMW9vQ3FcIixcblx0XCJtYWluLWNvbnRlbnRcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19tYWluLWNvbnRlbnQtLTJjT1dIXCIsXG5cdFwidGV4dC1jb250ZW50XCI6IFwic3JjLWFib3V0LWFib3V0LW1vZHVsZV9fdGV4dC1jb250ZW50LS1qdUdCY1wiLFxuXHRcImxpbmUtaGVhZGVyXCI6IFwic3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGluZS1oZWFkZXItLTItLTdNXCIsXG5cdFwidGV4dC1jb250YWluZXJcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX190ZXh0LWNvbnRhaW5lci0tOVpxYUVcIixcblx0XCJtYWluLWhlYWRlclwiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX21haW4taGVhZGVyLS1aOXNkbVwiLFxuXHRcInJlYWN0LWhlYWRlclwiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX3JlYWN0LWhlYWRlci0tZDhrR29cIixcblx0XCJkZXNjcmlwdGlvblwiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2Rlc2NyaXB0aW9uLS0yRkF5NVwiXG59O1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gZnJvbSBcIi4uL2ZvbnRzL2NpcmN1bGFyLWJvbGQud29mZjJcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwibGFuZGluZ0ZvbnRcXFwiO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKTtcXG59XFxuKiB7XFxuICBtYXJnaW46IDA7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0ge1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCMyYzVlOTIsICM1NTJmNmQpO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBwYWRkaW5nOiAzMHB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwibGFuZGluZ0ZvbnRcXFwiO1xcbiAgbWF4LXdpZHRoOiA5NTBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA5NTBweCkge1xcbiAgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIHtcXG4gICAgbWF4LXdpZHRoOiA3NTBweDtcXG4gIH1cXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAxMHB4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDc5NXB4KSB7XFxuICAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIH1cXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RleHQtY29udGFpbmVyLS0yMWdSXyB7XFxuICB6LWluZGV4OiA1O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGNvbG9yOiBibGFjaztcXG4gIHdpZHRoOiAzMy4zMzMzMzMzMyU7XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgcGFkZGluZy1yaWdodDogMTVweDtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDc5NXB4KSB7XFxuICAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGV4dC1jb250YWluZXItLTIxZ1JfIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHBhZGRpbmc6IDBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgfVxcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGV4dC1jb250YWluZXItLTIxZ1JfIHNwYW4ge1xcbiAgei1pbmRleDogNTtcXG4gIHBhZGRpbmc6IDEzcHg7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBjb2xvcjogd2hpdGU7XFxuICBtYXJnaW4tbGVmdDogMTVweDtcXG4gIGJveC1zaGFkb3c6IDAgMi44cHggMi4ycHggcmdiYSgxMzEsIDk2LCAxOTUsIDAuNCksIDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksIDAgMTIuNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA2KSwgMCAyMi4zcHggMTcuOXB4IHJnYmEoMCwgMCwgMCwgMC4wNzIpLCAwIDQxLjhweCAzMy40cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksIDAgMTAwcHggODBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGV4dC1jb250YWluZXItLTIxZ1JfIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fbWFpbi10aXRsZS0tMWxUd3Uge1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIG1hcmdpbi1ib3R0b206IDNyZW07XFxuICBmb250LXNpemU6IDgwcHg7XFxuICBsaW5lLWhlaWdodDogMTtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDEwOTRweCkge1xcbiAgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RleHQtY29udGFpbmVyLS0yMWdSXyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX21haW4tdGl0bGUtLTFsVHd1IHtcXG4gICAgZm9udC1zaXplOiA2MHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNzk1cHgpIHtcXG4gIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NvbnRhaW5lci0tMml3ckcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZXh0LWNvbnRhaW5lci0tMjFnUl8gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19tYWluLXRpdGxlLS0xbFR3dSB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA0OTBweCkge1xcbiAgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RleHQtY29udGFpbmVyLS0yMWdSXyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX21haW4tdGl0bGUtLTFsVHd1IHtcXG4gICAgZm9udC1zaXplOiA1MHB4O1xcbiAgfVxcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGV4dC1jb250YWluZXItLTIxZ1JfIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fZGVzY3JpcHRpb24tLTJYeEpEIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBmb250LXNpemU6IDI2cHg7XFxuICBsaW5lLWhlaWdodDogMS4yO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDEwOTRweCkge1xcbiAgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RleHQtY29udGFpbmVyLS0yMWdSXyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2Rlc2NyaXB0aW9uLS0yWHhKRCB7XFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gIH1cXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ltYWdlLWNvbnRhaW5lci0tMTZQSTcge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgZ2FwOiA2cHg7XFxufVxcbkBtZWRpYSAobWluLXdpZHRoOiA5NTBweCkge1xcbiAgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ltYWdlLWNvbnRhaW5lci0tMTZQSTcge1xcbiAgICB3aWR0aDogNjYuNjY2NjY2NjclO1xcbiAgfVxcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faW1hZ2UtY29udGFpbmVyLS0xNlBJNyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NoYXQtcHJvamVjdC1jb250YWluZXItLTFoNHhjIHtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NvbnRhaW5lci0tMml3ckcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pbWFnZS1jb250YWluZXItLTE2UEk3IC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcHJvamVjdC1jb250YWluZXItLTJhaDFCIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZmxleDogMCAwIDMyLjUlO1xcbiAgYm94LXNoYWRvdzogMCAyLjhweCAyLjJweCByZ2JhKDAsIDAsIDAsIDAuMDM0KSwgMCA2LjdweCA1LjNweCByZ2JhKDAsIDAsIDAsIDAuMDQ4KSwgMCAxMi41cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMDYpLCAwIDIyLjNweCAxNy45cHggcmdiYSgwLCAwLCAwLCAwLjA3MiksIDAgNDEuOHB4IDMzLjRweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSwgMCAxMDBweCA4MHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBmbG9hdDogbGVmdDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA1NDBweCkge1xcbiAgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ltYWdlLWNvbnRhaW5lci0tMTZQSTcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19wcm9qZWN0LWNvbnRhaW5lci0tMmFoMUIge1xcbiAgICBmbGV4OiAwIDAgMzIuMyU7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA0NTBweCkge1xcbiAgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ltYWdlLWNvbnRhaW5lci0tMTZQSTcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19wcm9qZWN0LWNvbnRhaW5lci0tMmFoMUIge1xcbiAgICBmbGV4OiAwIDAgMzElO1xcbiAgfVxcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faW1hZ2UtY29udGFpbmVyLS0xNlBJNyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3Byb2plY3QtY29udGFpbmVyLS0yYWgxQiAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2dpdC1pY29uLS0xWGZJVCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faW1hZ2UtY29udGFpbmVyLS0xNlBJNyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3Byb2plY3QtY29udGFpbmVyLS0yYWgxQjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOSk7XFxufVxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NvbnRhaW5lci0tMml3ckcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pbWFnZS1jb250YWluZXItLTE2UEk3IC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcHJvamVjdC1jb250YWluZXItLTJhaDFCOmhvdmVyIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fZ2l0LWljb24tLTFYZklUIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGZpbGw6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KTtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIG1hcmdpbjogYXV0bztcXG4gIHdpZHRoOiA1NXB4O1xcbiAgaGVpZ2h0OiA1NXB4O1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NvbnRhaW5lci0tMml3ckcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pbWFnZS1jb250YWluZXItLTE2UEk3IC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcHJvamVjdC1jb250YWluZXItLTJhaDFCOmhvdmVyIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcHJvamVjdC1pbWFnZS0tMzJhOGsge1xcbiAgb3BhY2l0eTogMC4zO1xcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faW1hZ2UtY29udGFpbmVyLS0xNlBJNyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3Byb2plY3QtY29udGFpbmVyLS0yYWgxQiAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3BvcnRmb2xpby1pbWFnZS0tMlQ4Mlcge1xcbiAgb3BhY2l0eTogMC41ICFpbXBvcnRhbnQ7XFxufVxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NvbnRhaW5lci0tMml3ckcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pbWFnZS1jb250YWluZXItLTE2UEk3IC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcHJvamVjdC1jb250YWluZXItLTJhaDFCIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcHJvamVjdC1pbWFnZS0tMzJhOGsge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG4gIG9wYWNpdHk6IDAuODtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYmFja2dyb3VuZDogd2hpdGU7XFxufVxcblxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC13cmFwcGVyLS0xUlJyMSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIGdhcDogMTVweDtcXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLXdyYXBwZXItLTFSUnIxIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC1jb250YWluZXItdGl0bGUtLTFwQTROIHtcXG4gIGJvcmRlci1ib3R0b206IDAuM3B4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XFxuICBmb250LXNpemU6IDIzcHg7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3OTVweCkge1xcbiAgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLXdyYXBwZXItLTFSUnIxIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC1jb250YWluZXItdGl0bGUtLTFwQTROIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIH1cXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLXdyYXBwZXItLTFSUnIxIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC1pY29uLWNvbnRhaW5lci0tTlBrR08ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGJveC1zaGFkb3c6IDAgMi44cHggMi4ycHggcmdiYSgxMzEsIDk2LCAxOTUsIDAuNCksIDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksIDAgMTIuNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA2KSwgMCAyMi4zcHggMTcuOXB4IHJnYmEoMCwgMCwgMCwgMC4wNzIpLCAwIDQxLjhweCAzMy40cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksIDAgMTAwcHggODBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcXG4gIGdhcDogMjBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxufVxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC13cmFwcGVyLS0xUlJyMSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtaWNvbi1jb250YWluZXItLU5Qa0dPIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faWNvbi1jb250YWluZXItLXktc2hzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNHB4KTtcXG4gIHdpZHRoOiA1JTtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNDkwcHgpIHtcXG4gIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC13cmFwcGVyLS0xUlJyMSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtaWNvbi1jb250YWluZXItLU5Qa0dPIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faWNvbi1jb250YWluZXItLXktc2hzIHtcXG4gICAgd2lkdGg6IDEwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgfVxcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtd3JhcHBlci0tMVJScjEgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLWljb24tY29udGFpbmVyLS1OUGtHTyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ljb24tY29udGFpbmVyLS15LXNocyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ljb24tbGFiZWwtLTJpQXNCIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHotaW5kZXg6IDU7XFxuICBjb2xvcjogd2hpdGU7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtd3JhcHBlci0tMVJScjEgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLWljb24tY29udGFpbmVyLS1OUGtHTyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ljb24tY29udGFpbmVyLS15LXNocyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtaWNvbi0tMThIeXMge1xcbiAgZmlsbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvbGFuZGluZy9sYW5kaW5nLm1vZHVsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsMEJBQUE7RUFDQSw0REFBQTtBQUNGO0FBQ0E7RUFDRSxTQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLFVBQUE7QUFDRjs7QUFDQTtFQUNFLDZDQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtBQUVGO0FBREU7RUFDRSwwQkFBQTtFQUNBLGdCQUFBO0VBSUEsV0FBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFBSjtBQUxJO0VBSEY7SUFJSSxnQkFBQTtFQVFKO0FBQ0Y7QUFKSTtFQUlFLGFBQUE7RUFDQSxTQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0FBR047QUFaTTtFQURGO0lBRUksc0JBQUE7RUFlTjtBQUNGO0FBUE07RUFDRSxVQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQU1BLG1CQUFBO0VBQ0EsbUJBQUE7QUFJUjtBQVZRO0VBTEY7SUFNSSxXQUFBO0lBQ0EsWUFBQTtJQUNBLGtCQUFBO0VBYVI7QUFDRjtBQVZRO0VBQ0UsVUFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLHNPQUFBO0FBWVY7QUFMUTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBQU9WO0FBTlU7RUFMRjtJQU1JLGVBQUE7RUFTVjtBQUNGO0FBUlU7RUFSRjtJQVNJLFdBQUE7SUFDQSxrQkFBQTtFQVdWO0FBQ0Y7QUFWVTtFQVpGO0lBYUksZUFBQTtFQWFWO0FBQ0Y7QUFYUTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFNQSxnQkFBQTtFQUNBLGdCQUFBO0FBUVY7QUFkVTtFQUpGO0lBS0ksZUFBQTtFQWlCVjtBQUNGO0FBVk07RUFDRSxhQUFBO0VBQ0EsV0FBQTtFQUlBLGVBQUE7RUFDQSxRQUFBO0FBU1I7QUFiUTtFQUhGO0lBSUksbUJBQUE7RUFnQlI7QUFDRjtBQWJRO0VBQ0Usc0JBQUE7QUFlVjtBQWJRO0VBV0UsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLG1PQUFBO0VBTUEsa0JBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQUFWO0FBdEJVO0VBREY7SUFFSSxlQUFBO0VBeUJWO0FBQ0Y7QUF4QlU7RUFKRjtJQUtJLGFBQUE7RUEyQlY7QUFDRjtBQTFCVTtFQUNFLGFBQUE7QUE0Qlo7QUFaVTtFQUNFLG9DQUFBO0FBY1o7QUFiWTtFQUNFLGtCQUFBO0VBQ0EsOEJBQUE7RUFDQSxNQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQWVkO0FBYlk7RUFDRSxZQUFBO0FBZWQ7QUFaVTtFQUNFLHVCQUFBO0FBY1o7QUFaVTtFQUNFLGNBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FBY1o7O0FBUEE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EsU0FBQTtBQVVGO0FBVEU7RUFDRSxvREFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0FBV0o7QUFWSTtFQUpGO0lBS0ksV0FBQTtJQUNBLGtCQUFBO0VBYUo7QUFDRjtBQVhFO0VBQ0UsYUFBQTtFQUNBLHNPQUFBO0VBSUEscUNBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLDZCQUFBO0FBVUo7QUFUSTtFQUNFLGFBQUE7RUFDQSwwQkFBQTtFQUNBLFNBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtBQVdOO0FBVk07RUFSRjtJQVNJLFVBQUE7SUFDQSxZQUFBO0VBYU47QUFDRjtBQVpNO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FBY1I7QUFaTTtFQUNFLDhCQUFBO0FBY1JcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxyXFxuICBmb250LWZhbWlseTogXFxcImxhbmRpbmdGb250XFxcIjtcXHJcXG4gIHNyYzogdXJsKFxcXCIuLi9mb250cy9jaXJjdWxhci1ib2xkLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpO1xcclxcbn1cXHJcXG4qIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG59XFxyXFxuLndyYXBwZXIge1xcclxcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCMyYzVlOTIsICM1NTJmNmQpO1xcclxcbiAgb3ZlcmZsb3c6IGF1dG87XFxyXFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBwYWRkaW5nOiAzMHB4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIC5jZW50ZXItY29udGFpbmVyIHtcXHJcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJsYW5kaW5nRm9udFxcXCI7XFxyXFxuICAgIG1heC13aWR0aDogOTUwcHg7XFxyXFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA5NTBweCkge1xcclxcbiAgICAgIG1heC13aWR0aDogNzUwcHg7XFxyXFxuICAgIH1cXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxyXFxuICAgIC5jb250YWluZXIge1xcclxcbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3OTVweCkge1xcclxcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICBnYXA6IDEwcHg7XFxyXFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcclxcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgICAgLnRleHQtY29udGFpbmVyIHtcXHJcXG4gICAgICAgIHotaW5kZXg6IDU7XFxyXFxuICAgICAgICBwYWRkaW5nOiAxNXB4O1xcclxcbiAgICAgICAgY29sb3I6IGJsYWNrO1xcclxcbiAgICAgICAgd2lkdGg6IDMzLjMzMzMzMzMzJTtcXHJcXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3OTVweCkge1xcclxcbiAgICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgICAgcGFkZGluZzogMHB4O1xcclxcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcclxcbiAgICAgICAgcGFkZGluZy1yaWdodDogMTVweDtcXHJcXG4gICAgICAgIHNwYW4ge1xcclxcbiAgICAgICAgICB6LWluZGV4OiA1O1xcclxcbiAgICAgICAgICBwYWRkaW5nOiAxM3B4O1xcclxcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxyXFxuICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxyXFxuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMi44cHggMi4ycHggcmdiYSgxMzEsIDk2LCAxOTUsIDAuNCksXFxyXFxuICAgICAgICAgICAgMCA2LjdweCA1LjNweCByZ2JhKDAsIDAsIDAsIDAuMDQ4KSxcXHJcXG4gICAgICAgICAgICAwIDEyLjVweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4wNiksXFxyXFxuICAgICAgICAgICAgMCAyMi4zcHggMTcuOXB4IHJnYmEoMCwgMCwgMCwgMC4wNzIpLFxcclxcbiAgICAgICAgICAgIDAgNDEuOHB4IDMzLjRweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSxcXHJcXG4gICAgICAgICAgICAwIDEwMHB4IDgwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgICAgIC5tYWluLXRpdGxlIHtcXHJcXG4gICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogM3JlbTtcXHJcXG4gICAgICAgICAgZm9udC1zaXplOiA4MHB4O1xcclxcbiAgICAgICAgICBsaW5lLWhlaWdodDogMTtcXHJcXG4gICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDEwOTRweCkge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNjBweDtcXHJcXG4gICAgICAgICAgfVxcclxcbiAgICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNzk1cHgpIHtcXHJcXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgICAgIH1cXHJcXG4gICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ5MHB4KSB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiA1MHB4O1xcclxcbiAgICAgICAgICB9XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgICAuZGVzY3JpcHRpb24ge1xcclxcbiAgICAgICAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxyXFxuICAgICAgICAgIGZvbnQtc2l6ZTogMjZweDtcXHJcXG4gICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDEwOTRweCkge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcXHJcXG4gICAgICAgICAgfVxcclxcbiAgICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNDkwcHgpIHtcXHJcXG4gICAgICAgICAgfVxcclxcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS4yO1xcclxcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xcclxcbiAgICAgICAgfVxcclxcbiAgICAgIH1cXHJcXG4gICAgICAuaW1hZ2UtY29udGFpbmVyIHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA5NTBweCkge1xcclxcbiAgICAgICAgICB3aWR0aDogNjYuNjY2NjY2NjclO1xcclxcbiAgICAgICAgfVxcclxcbiAgICAgICAgZmxleC13cmFwOiB3cmFwO1xcclxcbiAgICAgICAgZ2FwOiA2cHg7XFxyXFxuICAgICAgICAuY2hhdC1wcm9qZWN0LWNvbnRhaW5lciB7XFxyXFxuICAgICAgICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgICAucHJvamVjdC1jb250YWluZXIge1xcclxcbiAgICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNTQwcHgpIHtcXHJcXG4gICAgICAgICAgICBmbGV4OiAwIDAgMzIuMyU7XFxyXFxuICAgICAgICAgIH1cXHJcXG4gICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ1MHB4KSB7XFxyXFxuICAgICAgICAgICAgZmxleDogMCAwIDMxJTtcXHJcXG4gICAgICAgICAgfVxcclxcbiAgICAgICAgICAuZ2l0LWljb24ge1xcclxcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgICAgICAgIH1cXHJcXG4gICAgICAgICAgLy8gb3BhY2l0eTogMDtcXHJcXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxyXFxuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgICAgZmxleDogMCAwIDMyLjUlO1xcclxcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDIuOHB4IDIuMnB4IHJnYmEoMCwgMCwgMCwgMC4wMzQpLFxcclxcbiAgICAgICAgICAgIDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksXFxyXFxuICAgICAgICAgICAgMCAxMi41cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMDYpLFxcclxcbiAgICAgICAgICAgIDAgMjIuM3B4IDE3LjlweCByZ2JhKDAsIDAsIDAsIDAuMDcyKSxcXHJcXG4gICAgICAgICAgICAwIDQxLjhweCAzMy40cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksXFxyXFxuICAgICAgICAgICAgMCAxMDBweCA4MHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XFxyXFxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgICAgICAgZmxvYXQ6IGxlZnQ7XFxyXFxuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgICAgICAgJjpob3ZlciB7XFxyXFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjkpO1xcclxcbiAgICAgICAgICAgIC5naXQtaWNvbiB7XFxyXFxuICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgICAgICAgICAgICBmaWxsOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XFxyXFxuICAgICAgICAgICAgICB0b3A6IDA7XFxyXFxuICAgICAgICAgICAgICBib3R0b206IDA7XFxyXFxuICAgICAgICAgICAgICBsZWZ0OiAwO1xcclxcbiAgICAgICAgICAgICAgcmlnaHQ6IDA7XFxyXFxuICAgICAgICAgICAgICBtYXJnaW46IGF1dG87XFxyXFxuICAgICAgICAgICAgICB3aWR0aDogNTVweDtcXHJcXG4gICAgICAgICAgICAgIGhlaWdodDogNTVweDtcXHJcXG4gICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICAgICAgICAgIH1cXHJcXG4gICAgICAgICAgICAucHJvamVjdC1pbWFnZSB7XFxyXFxuICAgICAgICAgICAgICBvcGFjaXR5OiAwLjM7XFxyXFxuICAgICAgICAgICAgfVxcclxcbiAgICAgICAgICB9XFxyXFxuICAgICAgICAgIC5wb3J0Zm9saW8taW1hZ2Uge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNSAhaW1wb3J0YW50O1xcclxcbiAgICAgICAgICB9XFxyXFxuICAgICAgICAgIC5wcm9qZWN0LWltYWdlIHtcXHJcXG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcXHJcXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjg7XFxyXFxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xcclxcbiAgICAgICAgICB9XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuICB9XFxyXFxufVxcclxcbi50ZWNoLXdyYXBwZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICBnYXA6IDE1cHg7XFxyXFxuICAudGVjaC1jb250YWluZXItdGl0bGUge1xcclxcbiAgICBib3JkZXItYm90dG9tOiAwLjNweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpO1xcclxcbiAgICBmb250LXNpemU6IDIzcHg7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDc5NXB4KSB7XFxyXFxuICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICB9XFxyXFxuICB9XFxyXFxuICAudGVjaC1pY29uLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGJveC1zaGFkb3c6IDAgMi44cHggMi4ycHggcmdiYSgxMzEsIDk2LCAxOTUsIDAuNCksXFxyXFxuICAgICAgMCA2LjdweCA1LjNweCByZ2JhKDAsIDAsIDAsIDAuMDQ4KSwgMCAxMi41cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMDYpLFxcclxcbiAgICAgIDAgMjIuM3B4IDE3LjlweCByZ2JhKDAsIDAsIDAsIDAuMDcyKSwgMCA0MS44cHggMzMuNHB4IHJnYmEoMCwgMCwgMCwgMC4wODYpLFxcclxcbiAgICAgIDAgMTAwcHggODBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcclxcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpO1xcclxcbiAgICBwYWRkaW5nOiA1cHg7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcXHJcXG4gICAgZ2FwOiAyMHB4O1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxyXFxuICAgIC5pY29uLWNvbnRhaW5lciB7XFxyXFxuICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNHB4KTtcXHJcXG4gICAgICB3aWR0aDogNSU7XFxyXFxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ5MHB4KSB7XFxyXFxuICAgICAgICB3aWR0aDogMTAlO1xcclxcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICAgIH1cXHJcXG4gICAgICAuaWNvbi1sYWJlbCB7XFxyXFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgICB6LWluZGV4OiA1O1xcclxcbiAgICAgICAgY29sb3I6IHdoaXRlO1xcclxcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgLnRlY2gtaWNvbiB7XFxyXFxuICAgICAgICBmaWxsOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyk7XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuICB9XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ubG9jYWxzID0ge1xuXHRcIndyYXBwZXJcIjogXCJzcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm1cIixcblx0XCJjZW50ZXItY29udGFpbmVyXCI6IFwic3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHXCIsXG5cdFwiY29udGFpbmVyXCI6IFwic3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NvbnRhaW5lci0tMml3ckdcIixcblx0XCJ0ZXh0LWNvbnRhaW5lclwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZXh0LWNvbnRhaW5lci0tMjFnUl9cIixcblx0XCJtYWluLXRpdGxlXCI6IFwic3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX21haW4tdGl0bGUtLTFsVHd1XCIsXG5cdFwiZGVzY3JpcHRpb25cIjogXCJzcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fZGVzY3JpcHRpb24tLTJYeEpEXCIsXG5cdFwiaW1hZ2UtY29udGFpbmVyXCI6IFwic3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ltYWdlLWNvbnRhaW5lci0tMTZQSTdcIixcblx0XCJjaGF0LXByb2plY3QtY29udGFpbmVyXCI6IFwic3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NoYXQtcHJvamVjdC1jb250YWluZXItLTFoNHhjXCIsXG5cdFwicHJvamVjdC1jb250YWluZXJcIjogXCJzcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcHJvamVjdC1jb250YWluZXItLTJhaDFCXCIsXG5cdFwiZ2l0LWljb25cIjogXCJzcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fZ2l0LWljb24tLTFYZklUXCIsXG5cdFwicHJvamVjdC1pbWFnZVwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19wcm9qZWN0LWltYWdlLS0zMmE4a1wiLFxuXHRcInBvcnRmb2xpby1pbWFnZVwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19wb3J0Zm9saW8taW1hZ2UtLTJUODJXXCIsXG5cdFwidGVjaC13cmFwcGVyXCI6IFwic3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtd3JhcHBlci0tMVJScjFcIixcblx0XCJ0ZWNoLWNvbnRhaW5lci10aXRsZVwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLWNvbnRhaW5lci10aXRsZS0tMXBBNE5cIixcblx0XCJ0ZWNoLWljb24tY29udGFpbmVyXCI6IFwic3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtaWNvbi1jb250YWluZXItLU5Qa0dPXCIsXG5cdFwiaWNvbi1jb250YWluZXJcIjogXCJzcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faWNvbi1jb250YWluZXItLXktc2hzXCIsXG5cdFwiaWNvbi1sYWJlbFwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pY29uLWxhYmVsLS0yaUFzQlwiLFxuXHRcInRlY2gtaWNvblwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLWljb24tLTE4SHlzXCJcbn07XG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFpbmVyLS0xTnJ1VSB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHotaW5kZXg6IDU7XFxuICBwYWRkaW5nOiAyMHB4O1xcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTYwNXB4KSB7XFxuICAuc3JjLW5hdmJhci1uYXZiYXItbW9kdWxlX19jb250YWluZXItLTFOcnVVIHtcXG4gICAgcmlnaHQ6IDIwcHg7XFxuICAgIHRvcDogMjBweDtcXG4gICAgYm90dG9tOiBhdXRvO1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBsZWZ0OiBhdXRvO1xcbiAgfVxcbn1cXG4uc3JjLW5hdmJhci1uYXZiYXItbW9kdWxlX19jb250YWluZXItLTFOcnVVIC5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhY3QtaWNvbi1jb250YWluZXItLTF6UmxVIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDIwcHg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDE2MDVweCkge1xcbiAgLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFpbmVyLS0xTnJ1VSAuc3JjLW5hdmJhci1uYXZiYXItbW9kdWxlX19jb250YWN0LWljb24tY29udGFpbmVyLS0xelJsVSB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICB9XFxufVxcbi5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhaW5lci0tMU5ydVUgLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFjdC1pY29uLWNvbnRhaW5lci0tMXpSbFUgLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFjdC1pY29uLS1sYzNnUyB7XFxuICBmaWxsOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyk7XFxuICB3aWR0aDogMjBweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGhlaWdodDogMjBweDtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDE2MzAuOThweCkge1xcbiAgLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFpbmVyLS0xTnJ1VSAuc3JjLW5hdmJhci1uYXZiYXItbW9kdWxlX19jb250YWN0LWljb24tY29udGFpbmVyLS0xelJsVSAuc3JjLW5hdmJhci1uYXZiYXItbW9kdWxlX19jb250YWN0LWljb24tLWxjM2dTIHtcXG4gICAgZmlsbDogd2hpdGU7XFxuICB9XFxufVxcbi5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhaW5lci0tMU5ydVUgLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFjdC1pY29uLWNvbnRhaW5lci0tMXpSbFUgLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFjdC1pY29uLS1sYzNnUzpob3ZlciB7XFxuICBmaWxsOiB3aGl0ZTtcXG59XFxuLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFpbmVyLS0xTnJ1VSAuc3JjLW5hdmJhci1uYXZiYXItbW9kdWxlX19kaXZpZGVyLWxpbmUtLTJlcGFfIHtcXG4gIGhlaWdodDogODUlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI4KTtcXG4gIHRvcDogMTUwcHg7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICB3aWR0aDogMnB4O1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvbmF2YmFyL25hdmJhci5tb2R1bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0FBQ0Y7QUFBRTtFQVZGO0lBV0ksV0FBQTtJQUNBLFNBQUE7SUFDQSxZQUFBO0lBQ0EsbUJBQUE7SUFDQSxVQUFBO0VBR0Y7QUFDRjtBQUZFO0VBSUUsYUFBQTtFQUNBLFNBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFDSjtBQVJJO0VBREY7SUFFSSxtQkFBQTtFQVdKO0FBQ0Y7QUFMSTtFQUNFLDhCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0FBT047QUFOTTtFQUxGO0lBTUksV0FBQTtFQVNOO0FBQ0Y7QUFSTTtFQUNFLFdBQUE7QUFVUjtBQU5FO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EscUNBQUE7RUFDQSxVQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxhQUFBO0VBQ0EsY0FBQTtFQUNBLFVBQUE7QUFRSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuY29udGFpbmVyIHtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICB0b3A6IDA7XFxyXFxuICBsZWZ0OiAwO1xcclxcbiAgYm90dG9tOiAwO1xcclxcbiAgei1pbmRleDogNTtcXHJcXG4gIHBhZGRpbmc6IDIwcHg7XFxyXFxuICBAbWVkaWEgKG1heC13aWR0aDogMTYwNXB4KSB7XFxyXFxuICAgIHJpZ2h0OiAyMHB4O1xcclxcbiAgICB0b3A6IDIwcHg7XFxyXFxuICAgIGJvdHRvbTogYXV0bztcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXHJcXG4gICAgbGVmdDogYXV0bztcXHJcXG4gIH1cXHJcXG4gIC5jb250YWN0LWljb24tY29udGFpbmVyIHtcXHJcXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDE2MDVweCkge1xcclxcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICAgIH1cXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZ2FwOiAyMHB4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGhlaWdodDogZml0LWNvbnRlbnQ7XFxyXFxuICAgIC5jb250YWN0LWljb24ge1xcclxcbiAgICAgIGZpbGw6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcXHJcXG4gICAgICB3aWR0aDogMjBweDtcXHJcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgaGVpZ2h0OiAyMHB4O1xcclxcbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiAxNjMwLjk4cHgpIHtcXHJcXG4gICAgICAgIGZpbGw6IHdoaXRlO1xcclxcbiAgICAgIH1cXHJcXG4gICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgIGZpbGw6IHdoaXRlO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbiAgLmRpdmlkZXItbGluZSB7XFxyXFxuICAgIGhlaWdodDogODUlO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yOCk7XFxyXFxuICAgIHRvcDogMTUwcHg7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHJpZ2h0OiAwO1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICBtYXJnaW46IDAgYXV0bztcXHJcXG4gICAgd2lkdGg6IDJweDtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5sb2NhbHMgPSB7XG5cdFwiY29udGFpbmVyXCI6IFwic3JjLW5hdmJhci1uYXZiYXItbW9kdWxlX19jb250YWluZXItLTFOcnVVXCIsXG5cdFwiY29udGFjdC1pY29uLWNvbnRhaW5lclwiOiBcInNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFjdC1pY29uLWNvbnRhaW5lci0tMXpSbFVcIixcblx0XCJjb250YWN0LWljb25cIjogXCJzcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhY3QtaWNvbi0tbGMzZ1NcIixcblx0XCJkaXZpZGVyLWxpbmVcIjogXCJzcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2RpdmlkZXItbGluZS0tMmVwYV9cIlxufTtcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSwgZGVkdXBlKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIlwiLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIiBhbmQgXCIpLmNvbmNhdChpdGVtWzJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pIHtcbiAgdmFyIF9pdGVtID0gX3NsaWNlZFRvQXJyYXkoaXRlbSwgNCksXG4gICAgICBjb250ZW50ID0gX2l0ZW1bMV0sXG4gICAgICBjc3NNYXBwaW5nID0gX2l0ZW1bM107XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICBvcHRpb25zID0ge307XG4gIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVyc2NvcmUtZGFuZ2xlLCBuby1wYXJhbS1yZWFzc2lnblxuXG5cbiAgdXJsID0gdXJsICYmIHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmw7XG5cbiAgaWYgKHR5cGVvZiB1cmwgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl0vLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlByaXNtLmxhbmd1YWdlcy5jbGlrZSA9IHtcblx0J2NvbW1lbnQnOiBbXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteXFxcXF0pXFwvXFwqW1xcc1xcU10qPyg/OlxcKlxcL3wkKS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0Z3JlZWR5OiB0cnVlXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W15cXFxcOl0pXFwvXFwvLiovLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGdyZWVkeTogdHJ1ZVxuXHRcdH1cblx0XSxcblx0J3N0cmluZyc6IHtcblx0XHRwYXR0ZXJuOiAvKFtcIiddKSg/OlxcXFwoPzpcXHJcXG58W1xcc1xcU10pfCg/IVxcMSlbXlxcXFxcXHJcXG5dKSpcXDEvLFxuXHRcdGdyZWVkeTogdHJ1ZVxuXHR9LFxuXHQnY2xhc3MtbmFtZSc6IHtcblx0XHRwYXR0ZXJuOiAvKFxcYig/OmNsYXNzfGludGVyZmFjZXxleHRlbmRzfGltcGxlbWVudHN8dHJhaXR8aW5zdGFuY2VvZnxuZXcpXFxzK3xcXGJjYXRjaFxccytcXCgpW1xcdy5cXFxcXSsvaSxcblx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3B1bmN0dWF0aW9uJzogL1suXFxcXF0vXG5cdFx0fVxuXHR9LFxuXHQna2V5d29yZCc6IC9cXGIoPzppZnxlbHNlfHdoaWxlfGRvfGZvcnxyZXR1cm58aW58aW5zdGFuY2VvZnxmdW5jdGlvbnxuZXd8dHJ5fHRocm93fGNhdGNofGZpbmFsbHl8bnVsbHxicmVha3xjb250aW51ZSlcXGIvLFxuXHQnYm9vbGVhbic6IC9cXGIoPzp0cnVlfGZhbHNlKVxcYi8sXG5cdCdmdW5jdGlvbic6IC9cXHcrKD89XFwoKS8sXG5cdCdudW1iZXInOiAvXFxiMHhbXFxkYS1mXStcXGJ8KD86XFxiXFxkKyg/OlxcLlxcZCopP3xcXEJcXC5cXGQrKSg/OmVbKy1dP1xcZCspPy9pLFxuXHQnb3BlcmF0b3InOiAvWzw+XT0/fFshPV09Pz0/fC0tP3xcXCtcXCs/fCYmP3xcXHxcXHw/fFs/Ki9+XiVdLyxcblx0J3B1bmN0dWF0aW9uJzogL1t7fVtcXF07KCksLjpdL1xufTtcbiIsIi8vLyA8cmVmZXJlbmNlIGxpYj1cIldlYldvcmtlclwiLz5cblxudmFyIF9zZWxmID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxuXHQ/IHdpbmRvdyAgIC8vIGlmIGluIGJyb3dzZXJcblx0OiAoXG5cdFx0KHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKVxuXHRcdD8gc2VsZiAvLyBpZiBpbiB3b3JrZXJcblx0XHQ6IHt9ICAgLy8gaWYgaW4gbm9kZSBqc1xuXHQpO1xuXG4vKipcbiAqIFByaXNtOiBMaWdodHdlaWdodCwgcm9idXN0LCBlbGVnYW50IHN5bnRheCBoaWdobGlnaHRpbmdcbiAqXG4gKiBAbGljZW5zZSBNSVQgPGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUPlxuICogQGF1dGhvciBMZWEgVmVyb3UgPGh0dHBzOi8vbGVhLnZlcm91Lm1lPlxuICogQG5hbWVzcGFjZVxuICogQHB1YmxpY1xuICovXG52YXIgUHJpc20gPSAoZnVuY3Rpb24gKF9zZWxmKXtcblxuLy8gUHJpdmF0ZSBoZWxwZXIgdmFyc1xudmFyIGxhbmcgPSAvXFxibGFuZyg/OnVhZ2UpPy0oW1xcdy1dKylcXGIvaTtcbnZhciB1bmlxdWVJZCA9IDA7XG5cblxudmFyIF8gPSB7XG5cdC8qKlxuXHQgKiBCeSBkZWZhdWx0LCBQcmlzbSB3aWxsIGF0dGVtcHQgdG8gaGlnaGxpZ2h0IGFsbCBjb2RlIGVsZW1lbnRzIChieSBjYWxsaW5nIHtAbGluayBQcmlzbS5oaWdobGlnaHRBbGx9KSBvbiB0aGVcblx0ICogY3VycmVudCBwYWdlIGFmdGVyIHRoZSBwYWdlIGZpbmlzaGVkIGxvYWRpbmcuIFRoaXMgbWlnaHQgYmUgYSBwcm9ibGVtIGlmIGUuZy4geW91IHdhbnRlZCB0byBhc3luY2hyb25vdXNseSBsb2FkXG5cdCAqIGFkZGl0aW9uYWwgbGFuZ3VhZ2VzIG9yIHBsdWdpbnMgeW91cnNlbGYuXG5cdCAqXG5cdCAqIEJ5IHNldHRpbmcgdGhpcyB2YWx1ZSB0byBgdHJ1ZWAsIFByaXNtIHdpbGwgbm90IGF1dG9tYXRpY2FsbHkgaGlnaGxpZ2h0IGFsbCBjb2RlIGVsZW1lbnRzIG9uIHRoZSBwYWdlLlxuXHQgKlxuXHQgKiBZb3Ugb2J2aW91c2x5IGhhdmUgdG8gY2hhbmdlIHRoaXMgdmFsdWUgYmVmb3JlIHRoZSBhdXRvbWF0aWMgaGlnaGxpZ2h0aW5nIHN0YXJ0ZWQuIFRvIGRvIHRoaXMsIHlvdSBjYW4gYWRkIGFuXG5cdCAqIGVtcHR5IFByaXNtIG9iamVjdCBpbnRvIHRoZSBnbG9iYWwgc2NvcGUgYmVmb3JlIGxvYWRpbmcgdGhlIFByaXNtIHNjcmlwdCBsaWtlIHRoaXM6XG5cdCAqXG5cdCAqIGBgYGpzXG5cdCAqIHdpbmRvdy5QcmlzbSA9IHdpbmRvdy5QcmlzbSB8fCB7fTtcblx0ICogUHJpc20ubWFudWFsID0gdHJ1ZTtcblx0ICogLy8gYWRkIGEgbmV3IDxzY3JpcHQ+IHRvIGxvYWQgUHJpc20ncyBzY3JpcHRcblx0ICogYGBgXG5cdCAqXG5cdCAqIEBkZWZhdWx0IGZhbHNlXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKiBAbWVtYmVyb2YgUHJpc21cblx0ICogQHB1YmxpY1xuXHQgKi9cblx0bWFudWFsOiBfc2VsZi5QcmlzbSAmJiBfc2VsZi5QcmlzbS5tYW51YWwsXG5cdGRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcjogX3NlbGYuUHJpc20gJiYgX3NlbGYuUHJpc20uZGlzYWJsZVdvcmtlck1lc3NhZ2VIYW5kbGVyLFxuXG5cdC8qKlxuXHQgKiBBIG5hbWVzcGFjZSBmb3IgdXRpbGl0eSBtZXRob2RzLlxuXHQgKlxuXHQgKiBBbGwgZnVuY3Rpb24gaW4gdGhpcyBuYW1lc3BhY2UgdGhhdCBhcmUgbm90IGV4cGxpY2l0bHkgbWFya2VkIGFzIF9wdWJsaWNfIGFyZSBmb3IgX19pbnRlcm5hbCB1c2Ugb25seV9fIGFuZCBtYXlcblx0ICogY2hhbmdlIG9yIGRpc2FwcGVhciBhdCBhbnkgdGltZS5cblx0ICpcblx0ICogQG5hbWVzcGFjZVxuXHQgKiBAbWVtYmVyb2YgUHJpc21cblx0ICovXG5cdHV0aWw6IHtcblx0XHRlbmNvZGU6IGZ1bmN0aW9uIGVuY29kZSh0b2tlbnMpIHtcblx0XHRcdGlmICh0b2tlbnMgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFRva2VuKHRva2Vucy50eXBlLCBlbmNvZGUodG9rZW5zLmNvbnRlbnQpLCB0b2tlbnMuYWxpYXMpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRva2VucykpIHtcblx0XHRcdFx0cmV0dXJuIHRva2Vucy5tYXAoZW5jb2RlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB0b2tlbnMucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvXFx1MDBhMC9nLCAnICcpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSB0eXBlIG9mIHRoZSBnaXZlbiB2YWx1ZS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7YW55fSBvXG5cdFx0ICogQHJldHVybnMge3N0cmluZ31cblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIHR5cGUobnVsbCkgICAgICA9PT0gJ051bGwnXG5cdFx0ICogdHlwZSh1bmRlZmluZWQpID09PSAnVW5kZWZpbmVkJ1xuXHRcdCAqIHR5cGUoMTIzKSAgICAgICA9PT0gJ051bWJlcidcblx0XHQgKiB0eXBlKCdmb28nKSAgICAgPT09ICdTdHJpbmcnXG5cdFx0ICogdHlwZSh0cnVlKSAgICAgID09PSAnQm9vbGVhbidcblx0XHQgKiB0eXBlKFsxLCAyXSkgICAgPT09ICdBcnJheSdcblx0XHQgKiB0eXBlKHt9KSAgICAgICAgPT09ICdPYmplY3QnXG5cdFx0ICogdHlwZShTdHJpbmcpICAgID09PSAnRnVuY3Rpb24nXG5cdFx0ICogdHlwZSgvYWJjKy8pICAgID09PSAnUmVnRXhwJ1xuXHRcdCAqL1xuXHRcdHR5cGU6IGZ1bmN0aW9uIChvKSB7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyBhIHVuaXF1ZSBudW1iZXIgZm9yIHRoZSBnaXZlbiBvYmplY3QuIExhdGVyIGNhbGxzIHdpbGwgc3RpbGwgcmV0dXJuIHRoZSBzYW1lIG51bWJlci5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcblx0XHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHRcdCAqL1xuXHRcdG9iaklkOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRpZiAoIW9ialsnX19pZCddKSB7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdfX2lkJywgeyB2YWx1ZTogKyt1bmlxdWVJZCB9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvYmpbJ19faWQnXTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQ3JlYXRlcyBhIGRlZXAgY2xvbmUgb2YgdGhlIGdpdmVuIG9iamVjdC5cblx0XHQgKlxuXHRcdCAqIFRoZSBtYWluIGludGVuZGVkIHVzZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGNsb25lIGxhbmd1YWdlIGRlZmluaXRpb25zLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtUfSBvXG5cdFx0ICogQHBhcmFtIHtSZWNvcmQ8bnVtYmVyLCBhbnk+fSBbdmlzaXRlZF1cblx0XHQgKiBAcmV0dXJucyB7VH1cblx0XHQgKiBAdGVtcGxhdGUgVFxuXHRcdCAqL1xuXHRcdGNsb25lOiBmdW5jdGlvbiBkZWVwQ2xvbmUobywgdmlzaXRlZCkge1xuXHRcdFx0dmlzaXRlZCA9IHZpc2l0ZWQgfHwge307XG5cblx0XHRcdHZhciBjbG9uZSwgaWQ7XG5cdFx0XHRzd2l0Y2ggKF8udXRpbC50eXBlKG8pKSB7XG5cdFx0XHRcdGNhc2UgJ09iamVjdCc6XG5cdFx0XHRcdFx0aWQgPSBfLnV0aWwub2JqSWQobyk7XG5cdFx0XHRcdFx0aWYgKHZpc2l0ZWRbaWRdKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdmlzaXRlZFtpZF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNsb25lID0gLyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSAqLyAoe30pO1xuXHRcdFx0XHRcdHZpc2l0ZWRbaWRdID0gY2xvbmU7XG5cblx0XHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gbykge1xuXHRcdFx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0XHRjbG9uZVtrZXldID0gZGVlcENsb25lKG9ba2V5XSwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIC8qKiBAdHlwZSB7YW55fSAqLyAoY2xvbmUpO1xuXG5cdFx0XHRcdGNhc2UgJ0FycmF5Jzpcblx0XHRcdFx0XHRpZCA9IF8udXRpbC5vYmpJZChvKTtcblx0XHRcdFx0XHRpZiAodmlzaXRlZFtpZF0pIHtcblx0XHRcdFx0XHRcdHJldHVybiB2aXNpdGVkW2lkXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2xvbmUgPSBbXTtcblx0XHRcdFx0XHR2aXNpdGVkW2lkXSA9IGNsb25lO1xuXG5cdFx0XHRcdFx0KC8qKiBAdHlwZSB7QXJyYXl9ICovKC8qKiBAdHlwZSB7YW55fSAqLyhvKSkpLmZvckVhY2goZnVuY3Rpb24gKHYsIGkpIHtcblx0XHRcdFx0XHRcdGNsb25lW2ldID0gZGVlcENsb25lKHYsIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0cmV0dXJuIC8qKiBAdHlwZSB7YW55fSAqLyAoY2xvbmUpO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIG87XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdGhlIFByaXNtIGxhbmd1YWdlIG9mIHRoZSBnaXZlbiBlbGVtZW50IHNldCBieSBhIGBsYW5ndWFnZS14eHh4YCBvciBgbGFuZy14eHh4YCBjbGFzcy5cblx0XHQgKlxuXHRcdCAqIElmIG5vIGxhbmd1YWdlIGlzIHNldCBmb3IgdGhlIGVsZW1lbnQgb3IgdGhlIGVsZW1lbnQgaXMgYG51bGxgIG9yIGB1bmRlZmluZWRgLCBgbm9uZWAgd2lsbCBiZSByZXR1cm5lZC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuXHRcdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0Z2V0TGFuZ3VhZ2U6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHR3aGlsZSAoZWxlbWVudCAmJiAhbGFuZy50ZXN0KGVsZW1lbnQuY2xhc3NOYW1lKSkge1xuXHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0fVxuXHRcdFx0aWYgKGVsZW1lbnQpIHtcblx0XHRcdFx0cmV0dXJuIChlbGVtZW50LmNsYXNzTmFtZS5tYXRjaChsYW5nKSB8fCBbLCAnbm9uZSddKVsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICdub25lJztcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0aGUgc2NyaXB0IGVsZW1lbnQgdGhhdCBpcyBjdXJyZW50bHkgZXhlY3V0aW5nLlxuXHRcdCAqXG5cdFx0ICogVGhpcyBkb2VzIF9fbm90X18gd29yayBmb3IgbGluZSBzY3JpcHQgZWxlbWVudC5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm5zIHtIVE1MU2NyaXB0RWxlbWVudCB8IG51bGx9XG5cdFx0ICovXG5cdFx0Y3VycmVudFNjcmlwdDogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0XHRpZiAoJ2N1cnJlbnRTY3JpcHQnIGluIGRvY3VtZW50ICYmIDEgPCAyIC8qIGhhY2sgdG8gdHJpcCBUUycgZmxvdyBhbmFseXNpcyAqLykge1xuXHRcdFx0XHRyZXR1cm4gLyoqIEB0eXBlIHthbnl9ICovIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSUUxMSB3b3JrYXJvdW5kXG5cdFx0XHQvLyB3ZSdsbCBnZXQgdGhlIHNyYyBvZiB0aGUgY3VycmVudCBzY3JpcHQgYnkgcGFyc2luZyBJRTExJ3MgZXJyb3Igc3RhY2sgdHJhY2Vcblx0XHRcdC8vIHRoaXMgd2lsbCBub3Qgd29yayBmb3IgaW5saW5lIHNjcmlwdHNcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCk7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0Ly8gR2V0IGZpbGUgc3JjIHVybCBmcm9tIHN0YWNrLiBTcGVjaWZpY2FsbHkgd29ya3Mgd2l0aCB0aGUgZm9ybWF0IG9mIHN0YWNrIHRyYWNlcyBpbiBJRS5cblx0XHRcdFx0Ly8gQSBzdGFjayB3aWxsIGxvb2sgbGlrZSB0aGlzOlxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBFcnJvclxuXHRcdFx0XHQvLyAgICBhdCBfLnV0aWwuY3VycmVudFNjcmlwdCAoaHR0cDovL2xvY2FsaG9zdC9jb21wb25lbnRzL3ByaXNtLWNvcmUuanM6MTE5OjUpXG5cdFx0XHRcdC8vICAgIGF0IEdsb2JhbCBjb2RlIChodHRwOi8vbG9jYWxob3N0L2NvbXBvbmVudHMvcHJpc20tY29yZS5qczo2MDY6MSlcblxuXHRcdFx0XHR2YXIgc3JjID0gKC9hdCBbXihcXHJcXG5dKlxcKCguKik6Lis6LitcXCkkL2kuZXhlYyhlcnIuc3RhY2spIHx8IFtdKVsxXTtcblx0XHRcdFx0aWYgKHNyYykge1xuXHRcdFx0XHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuXHRcdFx0XHRcdGZvciAodmFyIGkgaW4gc2NyaXB0cykge1xuXHRcdFx0XHRcdFx0aWYgKHNjcmlwdHNbaV0uc3JjID09IHNyYykge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc2NyaXB0c1tpXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgd2hldGhlciBhIGdpdmVuIGNsYXNzIGlzIGFjdGl2ZSBmb3IgYGVsZW1lbnRgLlxuXHRcdCAqXG5cdFx0ICogVGhlIGNsYXNzIGNhbiBiZSBhY3RpdmF0ZWQgaWYgYGVsZW1lbnRgIG9yIG9uZSBvZiBpdHMgYW5jZXN0b3JzIGhhcyB0aGUgZ2l2ZW4gY2xhc3MgYW5kIGl0IGNhbiBiZSBkZWFjdGl2YXRlZFxuXHRcdCAqIGlmIGBlbGVtZW50YCBvciBvbmUgb2YgaXRzIGFuY2VzdG9ycyBoYXMgdGhlIG5lZ2F0ZWQgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gY2xhc3MuIFRoZSBfbmVnYXRlZCB2ZXJzaW9uXyBvZiB0aGVcblx0XHQgKiBnaXZlbiBjbGFzcyBpcyBqdXN0IHRoZSBnaXZlbiBjbGFzcyB3aXRoIGEgYG5vLWAgcHJlZml4LlxuXHRcdCAqXG5cdFx0ICogV2hldGhlciB0aGUgY2xhc3MgaXMgYWN0aXZlIGlzIGRldGVybWluZWQgYnkgdGhlIGNsb3Nlc3QgYW5jZXN0b3Igb2YgYGVsZW1lbnRgICh3aGVyZSBgZWxlbWVudGAgaXRzZWxmIGlzXG5cdFx0ICogY2xvc2VzdCBhbmNlc3RvcikgdGhhdCBoYXMgdGhlIGdpdmVuIGNsYXNzIG9yIHRoZSBuZWdhdGVkIHZlcnNpb24gb2YgaXQuIElmIG5laXRoZXIgYGVsZW1lbnRgIG5vciBhbnkgb2YgaXRzXG5cdFx0ICogYW5jZXN0b3JzIGhhdmUgdGhlIGdpdmVuIGNsYXNzIG9yIHRoZSBuZWdhdGVkIHZlcnNpb24gb2YgaXQsIHRoZW4gdGhlIGRlZmF1bHQgYWN0aXZhdGlvbiB3aWxsIGJlIHJldHVybmVkLlxuXHRcdCAqXG5cdFx0ICogSW4gdGhlIHBhcmFkb3hpY2FsIHNpdHVhdGlvbiB3aGVyZSB0aGUgY2xvc2VzdCBhbmNlc3RvciBjb250YWlucyBfX2JvdGhfXyB0aGUgZ2l2ZW4gY2xhc3MgYW5kIHRoZSBuZWdhdGVkXG5cdFx0ICogdmVyc2lvbiBvZiBpdCwgdGhlIGNsYXNzIGlzIGNvbnNpZGVyZWQgYWN0aXZlLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlZmF1bHRBY3RpdmF0aW9uPWZhbHNlXVxuXHRcdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHRcdCAqL1xuXHRcdGlzQWN0aXZlOiBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lLCBkZWZhdWx0QWN0aXZhdGlvbikge1xuXHRcdFx0dmFyIG5vID0gJ25vLScgKyBjbGFzc05hbWU7XG5cblx0XHRcdHdoaWxlIChlbGVtZW50KSB7XG5cdFx0XHRcdHZhciBjbGFzc0xpc3QgPSBlbGVtZW50LmNsYXNzTGlzdDtcblx0XHRcdFx0aWYgKGNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGNsYXNzTGlzdC5jb250YWlucyhubykpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdH1cblx0XHRcdHJldHVybiAhIWRlZmF1bHRBY3RpdmF0aW9uO1xuXHRcdH1cblx0fSxcblxuXHQvKipcblx0ICogVGhpcyBuYW1lc3BhY2UgY29udGFpbnMgYWxsIGN1cnJlbnRseSBsb2FkZWQgbGFuZ3VhZ2VzIGFuZCB0aGUgc29tZSBoZWxwZXIgZnVuY3Rpb25zIHRvIGNyZWF0ZSBhbmQgbW9kaWZ5IGxhbmd1YWdlcy5cblx0ICpcblx0ICogQG5hbWVzcGFjZVxuXHQgKiBAbWVtYmVyb2YgUHJpc21cblx0ICogQHB1YmxpY1xuXHQgKi9cblx0bGFuZ3VhZ2VzOiB7XG5cdFx0LyoqXG5cdFx0ICogQ3JlYXRlcyBhIGRlZXAgY29weSBvZiB0aGUgbGFuZ3VhZ2Ugd2l0aCB0aGUgZ2l2ZW4gaWQgYW5kIGFwcGVuZHMgdGhlIGdpdmVuIHRva2Vucy5cblx0XHQgKlxuXHRcdCAqIElmIGEgdG9rZW4gaW4gYHJlZGVmYCBhbHNvIGFwcGVhcnMgaW4gdGhlIGNvcGllZCBsYW5ndWFnZSwgdGhlbiB0aGUgZXhpc3RpbmcgdG9rZW4gaW4gdGhlIGNvcGllZCBsYW5ndWFnZVxuXHRcdCAqIHdpbGwgYmUgb3ZlcndyaXR0ZW4gYXQgaXRzIG9yaWdpbmFsIHBvc2l0aW9uLlxuXHRcdCAqXG5cdFx0ICogIyMgQmVzdCBwcmFjdGljZXNcblx0XHQgKlxuXHRcdCAqIFNpbmNlIHRoZSBwb3NpdGlvbiBvZiBvdmVyd3JpdGluZyB0b2tlbnMgKHRva2VuIGluIGByZWRlZmAgdGhhdCBvdmVyd3JpdGUgdG9rZW5zIGluIHRoZSBjb3BpZWQgbGFuZ3VhZ2UpXG5cdFx0ICogZG9lc24ndCBtYXR0ZXIsIHRoZXkgY2FuIHRlY2huaWNhbGx5IGJlIGluIGFueSBvcmRlci4gSG93ZXZlciwgdGhpcyBjYW4gYmUgY29uZnVzaW5nIHRvIG90aGVycyB0aGF0IHRyeWluZyB0b1xuXHRcdCAqIHVuZGVyc3RhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb24gYmVjYXVzZSwgbm9ybWFsbHksIHRoZSBvcmRlciBvZiB0b2tlbnMgbWF0dGVycyBpbiBQcmlzbSBncmFtbWFycy5cblx0XHQgKlxuXHRcdCAqIFRoZXJlZm9yZSwgaXQgaXMgZW5jb3VyYWdlZCB0byBvcmRlciBvdmVyd3JpdGluZyB0b2tlbnMgYWNjb3JkaW5nIHRvIHRoZSBwb3NpdGlvbnMgb2YgdGhlIG92ZXJ3cml0dGVuIHRva2Vucy5cblx0XHQgKiBGdXJ0aGVybW9yZSwgYWxsIG5vbi1vdmVyd3JpdGluZyB0b2tlbnMgc2hvdWxkIGJlIHBsYWNlZCBhZnRlciB0aGUgb3ZlcndyaXRpbmcgb25lcy5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpZCBUaGUgaWQgb2YgdGhlIGxhbmd1YWdlIHRvIGV4dGVuZC4gVGhpcyBoYXMgdG8gYmUgYSBrZXkgaW4gYFByaXNtLmxhbmd1YWdlc2AuXG5cdFx0ICogQHBhcmFtIHtHcmFtbWFyfSByZWRlZiBUaGUgbmV3IHRva2VucyB0byBhcHBlbmQuXG5cdFx0ICogQHJldHVybnMge0dyYW1tYXJ9IFRoZSBuZXcgbGFuZ3VhZ2UgY3JlYXRlZC5cblx0XHQgKiBAcHVibGljXG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiBQcmlzbS5sYW5ndWFnZXNbJ2Nzcy13aXRoLWNvbG9ycyddID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnY3NzJywge1xuXHRcdCAqICAgICAvLyBQcmlzbS5sYW5ndWFnZXMuY3NzIGFscmVhZHkgaGFzIGEgJ2NvbW1lbnQnIHRva2VuLCBzbyB0aGlzIHRva2VuIHdpbGwgb3ZlcndyaXRlIENTUycgJ2NvbW1lbnQnIHRva2VuXG5cdFx0ICogICAgIC8vIGF0IGl0cyBvcmlnaW5hbCBwb3NpdGlvblxuXHRcdCAqICAgICAnY29tbWVudCc6IHsgLi4uIH0sXG5cdFx0ICogICAgIC8vIENTUyBkb2Vzbid0IGhhdmUgYSAnY29sb3InIHRva2VuLCBzbyB0aGlzIHRva2VuIHdpbGwgYmUgYXBwZW5kZWRcblx0XHQgKiAgICAgJ2NvbG9yJzogL1xcYig/OnJlZHxncmVlbnxibHVlKVxcYi9cblx0XHQgKiB9KTtcblx0XHQgKi9cblx0XHRleHRlbmQ6IGZ1bmN0aW9uIChpZCwgcmVkZWYpIHtcblx0XHRcdHZhciBsYW5nID0gXy51dGlsLmNsb25lKF8ubGFuZ3VhZ2VzW2lkXSk7XG5cblx0XHRcdGZvciAodmFyIGtleSBpbiByZWRlZikge1xuXHRcdFx0XHRsYW5nW2tleV0gPSByZWRlZltrZXldO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbGFuZztcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5zZXJ0cyB0b2tlbnMgX2JlZm9yZV8gYW5vdGhlciB0b2tlbiBpbiBhIGxhbmd1YWdlIGRlZmluaXRpb24gb3IgYW55IG90aGVyIGdyYW1tYXIuXG5cdFx0ICpcblx0XHQgKiAjIyBVc2FnZVxuXHRcdCAqXG5cdFx0ICogVGhpcyBoZWxwZXIgbWV0aG9kIG1ha2VzIGl0IGVhc3kgdG8gbW9kaWZ5IGV4aXN0aW5nIGxhbmd1YWdlcy4gRm9yIGV4YW1wbGUsIHRoZSBDU1MgbGFuZ3VhZ2UgZGVmaW5pdGlvblxuXHRcdCAqIG5vdCBvbmx5IGRlZmluZXMgQ1NTIGhpZ2hsaWdodGluZyBmb3IgQ1NTIGRvY3VtZW50cywgYnV0IGFsc28gbmVlZHMgdG8gZGVmaW5lIGhpZ2hsaWdodGluZyBmb3IgQ1NTIGVtYmVkZGVkXG5cdFx0ICogaW4gSFRNTCB0aHJvdWdoIGA8c3R5bGU+YCBlbGVtZW50cy4gVG8gZG8gdGhpcywgaXQgbmVlZHMgdG8gbW9kaWZ5IGBQcmlzbS5sYW5ndWFnZXMubWFya3VwYCBhbmQgYWRkIHRoZVxuXHRcdCAqIGFwcHJvcHJpYXRlIHRva2Vucy4gSG93ZXZlciwgYFByaXNtLmxhbmd1YWdlcy5tYXJrdXBgIGlzIGEgcmVndWxhciBKYXZhU2NyaXB0IG9iamVjdCBsaXRlcmFsLCBzbyBpZiB5b3UgZG9cblx0XHQgKiB0aGlzOlxuXHRcdCAqXG5cdFx0ICogYGBganNcblx0XHQgKiBQcmlzbS5sYW5ndWFnZXMubWFya3VwLnN0eWxlID0ge1xuXHRcdCAqICAgICAvLyB0b2tlblxuXHRcdCAqIH07XG5cdFx0ICogYGBgXG5cdFx0ICpcblx0XHQgKiB0aGVuIHRoZSBgc3R5bGVgIHRva2VuIHdpbGwgYmUgYWRkZWQgKGFuZCBwcm9jZXNzZWQpIGF0IHRoZSBlbmQuIGBpbnNlcnRCZWZvcmVgIGFsbG93cyB5b3UgdG8gaW5zZXJ0IHRva2Vuc1xuXHRcdCAqIGJlZm9yZSBleGlzdGluZyB0b2tlbnMuIEZvciB0aGUgQ1NTIGV4YW1wbGUgYWJvdmUsIHlvdSB3b3VsZCB1c2UgaXQgbGlrZSB0aGlzOlxuXHRcdCAqXG5cdFx0ICogYGBganNcblx0XHQgKiBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAnY2RhdGEnLCB7XG5cdFx0ICogICAgICdzdHlsZSc6IHtcblx0XHQgKiAgICAgICAgIC8vIHRva2VuXG5cdFx0ICogICAgIH1cblx0XHQgKiB9KTtcblx0XHQgKiBgYGBcblx0XHQgKlxuXHRcdCAqICMjIFNwZWNpYWwgY2FzZXNcblx0XHQgKlxuXHRcdCAqIElmIHRoZSBncmFtbWFycyBvZiBgaW5zaWRlYCBhbmQgYGluc2VydGAgaGF2ZSB0b2tlbnMgd2l0aCB0aGUgc2FtZSBuYW1lLCB0aGUgdG9rZW5zIGluIGBpbnNpZGVgJ3MgZ3JhbW1hclxuXHRcdCAqIHdpbGwgYmUgaWdub3JlZC5cblx0XHQgKlxuXHRcdCAqIFRoaXMgYmVoYXZpb3IgY2FuIGJlIHVzZWQgdG8gaW5zZXJ0IHRva2VucyBhZnRlciBgYmVmb3JlYDpcblx0XHQgKlxuXHRcdCAqIGBgYGpzXG5cdFx0ICogUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NvbW1lbnQnLCB7XG5cdFx0ICogICAgICdjb21tZW50JzogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC5jb21tZW50LFxuXHRcdCAqICAgICAvLyB0b2tlbnMgYWZ0ZXIgJ2NvbW1lbnQnXG5cdFx0ICogfSk7XG5cdFx0ICogYGBgXG5cdFx0ICpcblx0XHQgKiAjIyBMaW1pdGF0aW9uc1xuXHRcdCAqXG5cdFx0ICogVGhlIG1haW4gcHJvYmxlbSBgaW5zZXJ0QmVmb3JlYCBoYXMgdG8gc29sdmUgaXMgaXRlcmF0aW9uIG9yZGVyLiBTaW5jZSBFUzIwMTUsIHRoZSBpdGVyYXRpb24gb3JkZXIgZm9yIG9iamVjdFxuXHRcdCAqIHByb3BlcnRpZXMgaXMgZ3VhcmFudGVlZCB0byBiZSB0aGUgaW5zZXJ0aW9uIG9yZGVyIChleGNlcHQgZm9yIGludGVnZXIga2V5cykgYnV0IHNvbWUgYnJvd3NlcnMgYmVoYXZlXG5cdFx0ICogZGlmZmVyZW50bHkgd2hlbiBrZXlzIGFyZSBkZWxldGVkIGFuZCByZS1pbnNlcnRlZC4gU28gYGluc2VydEJlZm9yZWAgY2FuJ3QgYmUgaW1wbGVtZW50ZWQgYnkgdGVtcG9yYXJpbHlcblx0XHQgKiBkZWxldGluZyBwcm9wZXJ0aWVzIHdoaWNoIGlzIG5lY2Vzc2FyeSB0byBpbnNlcnQgYXQgYXJiaXRyYXJ5IHBvc2l0aW9ucy5cblx0XHQgKlxuXHRcdCAqIFRvIHNvbHZlIHRoaXMgcHJvYmxlbSwgYGluc2VydEJlZm9yZWAgZG9lc24ndCBhY3R1YWxseSBpbnNlcnQgdGhlIGdpdmVuIHRva2VucyBpbnRvIHRoZSB0YXJnZXQgb2JqZWN0LlxuXHRcdCAqIEluc3RlYWQsIGl0IHdpbGwgY3JlYXRlIGEgbmV3IG9iamVjdCBhbmQgcmVwbGFjZSBhbGwgcmVmZXJlbmNlcyB0byB0aGUgdGFyZ2V0IG9iamVjdCB3aXRoIHRoZSBuZXcgb25lLiBUaGlzXG5cdFx0ICogY2FuIGJlIGRvbmUgd2l0aG91dCB0ZW1wb3JhcmlseSBkZWxldGluZyBwcm9wZXJ0aWVzLCBzbyB0aGUgaXRlcmF0aW9uIG9yZGVyIGlzIHdlbGwtZGVmaW5lZC5cblx0XHQgKlxuXHRcdCAqIEhvd2V2ZXIsIG9ubHkgcmVmZXJlbmNlcyB0aGF0IGNhbiBiZSByZWFjaGVkIGZyb20gYFByaXNtLmxhbmd1YWdlc2Agb3IgYGluc2VydGAgd2lsbCBiZSByZXBsYWNlZC4gSS5lLiBpZlxuXHRcdCAqIHlvdSBob2xkIHRoZSB0YXJnZXQgb2JqZWN0IGluIGEgdmFyaWFibGUsIHRoZW4gdGhlIHZhbHVlIG9mIHRoZSB2YXJpYWJsZSB3aWxsIG5vdCBjaGFuZ2UuXG5cdFx0ICpcblx0XHQgKiBgYGBqc1xuXHRcdCAqIHZhciBvbGRNYXJrdXAgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuXHRcdCAqIHZhciBuZXdNYXJrdXAgPSBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAnY29tbWVudCcsIHsgLi4uIH0pO1xuXHRcdCAqXG5cdFx0ICogYXNzZXJ0KG9sZE1hcmt1cCAhPT0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCk7XG5cdFx0ICogYXNzZXJ0KG5ld01hcmt1cCA9PT0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCk7XG5cdFx0ICogYGBgXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaW5zaWRlIFRoZSBwcm9wZXJ0eSBvZiBgcm9vdGAgKGUuZy4gYSBsYW5ndWFnZSBpZCBpbiBgUHJpc20ubGFuZ3VhZ2VzYCkgdGhhdCBjb250YWlucyB0aGVcblx0XHQgKiBvYmplY3QgdG8gYmUgbW9kaWZpZWQuXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGJlZm9yZSBUaGUga2V5IHRvIGluc2VydCBiZWZvcmUuXG5cdFx0ICogQHBhcmFtIHtHcmFtbWFyfSBpbnNlcnQgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGtleS12YWx1ZSBwYWlycyB0byBiZSBpbnNlcnRlZC5cblx0XHQgKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IFtyb290XSBUaGUgb2JqZWN0IGNvbnRhaW5pbmcgYGluc2lkZWAsIGkuZS4gdGhlIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZVxuXHRcdCAqIG9iamVjdCB0byBiZSBtb2RpZmllZC5cblx0XHQgKlxuXHRcdCAqIERlZmF1bHRzIHRvIGBQcmlzbS5sYW5ndWFnZXNgLlxuXHRcdCAqIEByZXR1cm5zIHtHcmFtbWFyfSBUaGUgbmV3IGdyYW1tYXIgb2JqZWN0LlxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uIChpbnNpZGUsIGJlZm9yZSwgaW5zZXJ0LCByb290KSB7XG5cdFx0XHRyb290ID0gcm9vdCB8fCAvKiogQHR5cGUge2FueX0gKi8gKF8ubGFuZ3VhZ2VzKTtcblx0XHRcdHZhciBncmFtbWFyID0gcm9vdFtpbnNpZGVdO1xuXHRcdFx0LyoqIEB0eXBlIHtHcmFtbWFyfSAqL1xuXHRcdFx0dmFyIHJldCA9IHt9O1xuXG5cdFx0XHRmb3IgKHZhciB0b2tlbiBpbiBncmFtbWFyKSB7XG5cdFx0XHRcdGlmIChncmFtbWFyLmhhc093blByb3BlcnR5KHRva2VuKSkge1xuXG5cdFx0XHRcdFx0aWYgKHRva2VuID09IGJlZm9yZSkge1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgbmV3VG9rZW4gaW4gaW5zZXJ0KSB7XG5cdFx0XHRcdFx0XHRcdGlmIChpbnNlcnQuaGFzT3duUHJvcGVydHkobmV3VG9rZW4pKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0W25ld1Rva2VuXSA9IGluc2VydFtuZXdUb2tlbl07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBEbyBub3QgaW5zZXJ0IHRva2VuIHdoaWNoIGFsc28gb2NjdXIgaW4gaW5zZXJ0LiBTZWUgIzE1MjVcblx0XHRcdFx0XHRpZiAoIWluc2VydC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcblx0XHRcdFx0XHRcdHJldFt0b2tlbl0gPSBncmFtbWFyW3Rva2VuXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dmFyIG9sZCA9IHJvb3RbaW5zaWRlXTtcblx0XHRcdHJvb3RbaW5zaWRlXSA9IHJldDtcblxuXHRcdFx0Ly8gVXBkYXRlIHJlZmVyZW5jZXMgaW4gb3RoZXIgbGFuZ3VhZ2UgZGVmaW5pdGlvbnNcblx0XHRcdF8ubGFuZ3VhZ2VzLkRGUyhfLmxhbmd1YWdlcywgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRpZiAodmFsdWUgPT09IG9sZCAmJiBrZXkgIT0gaW5zaWRlKSB7XG5cdFx0XHRcdFx0dGhpc1trZXldID0gcmV0O1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9LFxuXG5cdFx0Ly8gVHJhdmVyc2UgYSBsYW5ndWFnZSBkZWZpbml0aW9uIHdpdGggRGVwdGggRmlyc3QgU2VhcmNoXG5cdFx0REZTOiBmdW5jdGlvbiBERlMobywgY2FsbGJhY2ssIHR5cGUsIHZpc2l0ZWQpIHtcblx0XHRcdHZpc2l0ZWQgPSB2aXNpdGVkIHx8IHt9O1xuXG5cdFx0XHR2YXIgb2JqSWQgPSBfLnV0aWwub2JqSWQ7XG5cblx0XHRcdGZvciAodmFyIGkgaW4gbykge1xuXHRcdFx0XHRpZiAoby5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwobywgaSwgb1tpXSwgdHlwZSB8fCBpKTtcblxuXHRcdFx0XHRcdHZhciBwcm9wZXJ0eSA9IG9baV0sXG5cdFx0XHRcdFx0ICAgIHByb3BlcnR5VHlwZSA9IF8udXRpbC50eXBlKHByb3BlcnR5KTtcblxuXHRcdFx0XHRcdGlmIChwcm9wZXJ0eVR5cGUgPT09ICdPYmplY3QnICYmICF2aXNpdGVkW29iaklkKHByb3BlcnR5KV0pIHtcblx0XHRcdFx0XHRcdHZpc2l0ZWRbb2JqSWQocHJvcGVydHkpXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRERlMocHJvcGVydHksIGNhbGxiYWNrLCBudWxsLCB2aXNpdGVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZiAocHJvcGVydHlUeXBlID09PSAnQXJyYXknICYmICF2aXNpdGVkW29iaklkKHByb3BlcnR5KV0pIHtcblx0XHRcdFx0XHRcdHZpc2l0ZWRbb2JqSWQocHJvcGVydHkpXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRERlMocHJvcGVydHksIGNhbGxiYWNrLCBpLCB2aXNpdGVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0cGx1Z2luczoge30sXG5cblx0LyoqXG5cdCAqIFRoaXMgaXMgdGhlIG1vc3QgaGlnaC1sZXZlbCBmdW5jdGlvbiBpbiBQcmlzbeKAmXMgQVBJLlxuXHQgKiBJdCBmZXRjaGVzIGFsbCB0aGUgZWxlbWVudHMgdGhhdCBoYXZlIGEgYC5sYW5ndWFnZS14eHh4YCBjbGFzcyBhbmQgdGhlbiBjYWxscyB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0RWxlbWVudH0gb25cblx0ICogZWFjaCBvbmUgb2YgdGhlbS5cblx0ICpcblx0ICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIGBQcmlzbS5oaWdobGlnaHRBbGxVbmRlcihkb2N1bWVudCwgYXN5bmMsIGNhbGxiYWNrKWAuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FzeW5jPWZhbHNlXSBTYW1lIGFzIGluIHtAbGluayBQcmlzbS5oaWdobGlnaHRBbGxVbmRlcn0uXG5cdCAqIEBwYXJhbSB7SGlnaGxpZ2h0Q2FsbGJhY2t9IFtjYWxsYmFja10gU2FtZSBhcyBpbiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0QWxsVW5kZXJ9LlxuXHQgKiBAbWVtYmVyb2YgUHJpc21cblx0ICogQHB1YmxpY1xuXHQgKi9cblx0aGlnaGxpZ2h0QWxsOiBmdW5jdGlvbihhc3luYywgY2FsbGJhY2spIHtcblx0XHRfLmhpZ2hsaWdodEFsbFVuZGVyKGRvY3VtZW50LCBhc3luYywgY2FsbGJhY2spO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBGZXRjaGVzIGFsbCB0aGUgZGVzY2VuZGFudHMgb2YgYGNvbnRhaW5lcmAgdGhhdCBoYXZlIGEgYC5sYW5ndWFnZS14eHh4YCBjbGFzcyBhbmQgdGhlbiBjYWxsc1xuXHQgKiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0RWxlbWVudH0gb24gZWFjaCBvbmUgb2YgdGhlbS5cblx0ICpcblx0ICogVGhlIGZvbGxvd2luZyBob29rcyB3aWxsIGJlIHJ1bjpcblx0ICogMS4gYGJlZm9yZS1oaWdobGlnaHRhbGxgXG5cdCAqIDIuIGBiZWZvcmUtYWxsLWVsZW1lbnRzLWhpZ2hsaWdodGBcblx0ICogMy4gQWxsIGhvb2tzIG9mIHtAbGluayBQcmlzbS5oaWdobGlnaHRFbGVtZW50fSBmb3IgZWFjaCBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge1BhcmVudE5vZGV9IGNvbnRhaW5lciBUaGUgcm9vdCBlbGVtZW50LCB3aG9zZSBkZXNjZW5kYW50cyB0aGF0IGhhdmUgYSBgLmxhbmd1YWdlLXh4eHhgIGNsYXNzIHdpbGwgYmUgaGlnaGxpZ2h0ZWQuXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FzeW5jPWZhbHNlXSBXaGV0aGVyIGVhY2ggZWxlbWVudCBpcyB0byBiZSBoaWdobGlnaHRlZCBhc3luY2hyb25vdXNseSB1c2luZyBXZWIgV29ya2Vycy5cblx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBBbiBvcHRpb25hbCBjYWxsYmFjayB0byBiZSBpbnZva2VkIG9uIGVhY2ggZWxlbWVudCBhZnRlciBpdHMgaGlnaGxpZ2h0aW5nIGlzIGRvbmUuXG5cdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHRoaWdobGlnaHRBbGxVbmRlcjogZnVuY3Rpb24oY29udGFpbmVyLCBhc3luYywgY2FsbGJhY2spIHtcblx0XHR2YXIgZW52ID0ge1xuXHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrLFxuXHRcdFx0Y29udGFpbmVyOiBjb250YWluZXIsXG5cdFx0XHRzZWxlY3RvcjogJ2NvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdLCBbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIGNvZGUsIGNvZGVbY2xhc3MqPVwibGFuZy1cIl0sIFtjbGFzcyo9XCJsYW5nLVwiXSBjb2RlJ1xuXHRcdH07XG5cblx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWhpZ2hsaWdodGFsbCcsIGVudik7XG5cblx0XHRlbnYuZWxlbWVudHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoZW52LmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGVudi5zZWxlY3RvcikpO1xuXG5cdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1hbGwtZWxlbWVudHMtaGlnaGxpZ2h0JywgZW52KTtcblxuXHRcdGZvciAodmFyIGkgPSAwLCBlbGVtZW50OyBlbGVtZW50ID0gZW52LmVsZW1lbnRzW2krK107KSB7XG5cdFx0XHRfLmhpZ2hsaWdodEVsZW1lbnQoZWxlbWVudCwgYXN5bmMgPT09IHRydWUsIGVudi5jYWxsYmFjayk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBIaWdobGlnaHRzIHRoZSBjb2RlIGluc2lkZSBhIHNpbmdsZSBlbGVtZW50LlxuXHQgKlxuXHQgKiBUaGUgZm9sbG93aW5nIGhvb2tzIHdpbGwgYmUgcnVuOlxuXHQgKiAxLiBgYmVmb3JlLXNhbml0eS1jaGVja2Bcblx0ICogMi4gYGJlZm9yZS1oaWdobGlnaHRgXG5cdCAqIDMuIEFsbCBob29rcyBvZiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0fS4gVGhlc2UgaG9va3Mgd2lsbCBiZSBydW4gYnkgYW4gYXN5bmNocm9ub3VzIHdvcmtlciBpZiBgYXN5bmNgIGlzIGB0cnVlYC5cblx0ICogNC4gYGJlZm9yZS1pbnNlcnRgXG5cdCAqIDUuIGBhZnRlci1oaWdobGlnaHRgXG5cdCAqIDYuIGBjb21wbGV0ZWBcblx0ICpcblx0ICogU29tZSB0aGUgYWJvdmUgaG9va3Mgd2lsbCBiZSBza2lwcGVkIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgY29udGFpbiBhbnkgdGV4dCBvciB0aGVyZSBpcyBubyBncmFtbWFyIGxvYWRlZCBmb3Jcblx0ICogdGhlIGVsZW1lbnQncyBsYW5ndWFnZS5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIGNvZGUuXG5cdCAqIEl0IG11c3QgaGF2ZSBhIGNsYXNzIG9mIGBsYW5ndWFnZS14eHh4YCB0byBiZSBwcm9jZXNzZWQsIHdoZXJlIGB4eHh4YCBpcyBhIHZhbGlkIGxhbmd1YWdlIGlkZW50aWZpZXIuXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FzeW5jPWZhbHNlXSBXaGV0aGVyIHRoZSBlbGVtZW50IGlzIHRvIGJlIGhpZ2hsaWdodGVkIGFzeW5jaHJvbm91c2x5IHVzaW5nIFdlYiBXb3JrZXJzXG5cdCAqIHRvIGltcHJvdmUgcGVyZm9ybWFuY2UgYW5kIGF2b2lkIGJsb2NraW5nIHRoZSBVSSB3aGVuIGhpZ2hsaWdodGluZyB2ZXJ5IGxhcmdlIGNodW5rcyBvZiBjb2RlLiBUaGlzIG9wdGlvbiBpc1xuXHQgKiBbZGlzYWJsZWQgYnkgZGVmYXVsdF0oaHR0cHM6Ly9wcmlzbWpzLmNvbS9mYXEuaHRtbCN3aHktaXMtYXN5bmNocm9ub3VzLWhpZ2hsaWdodGluZy1kaXNhYmxlZC1ieS1kZWZhdWx0KS5cblx0ICpcblx0ICogTm90ZTogQWxsIGxhbmd1YWdlIGRlZmluaXRpb25zIHJlcXVpcmVkIHRvIGhpZ2hsaWdodCB0aGUgY29kZSBtdXN0IGJlIGluY2x1ZGVkIGluIHRoZSBtYWluIGBwcmlzbS5qc2AgZmlsZSBmb3Jcblx0ICogYXN5bmNocm9ub3VzIGhpZ2hsaWdodGluZyB0byB3b3JrLiBZb3UgY2FuIGJ1aWxkIHlvdXIgb3duIGJ1bmRsZSBvbiB0aGVcblx0ICogW0Rvd25sb2FkIHBhZ2VdKGh0dHBzOi8vcHJpc21qcy5jb20vZG93bmxvYWQuaHRtbCkuXG5cdCAqIEBwYXJhbSB7SGlnaGxpZ2h0Q2FsbGJhY2t9IFtjYWxsYmFja10gQW4gb3B0aW9uYWwgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBhZnRlciB0aGUgaGlnaGxpZ2h0aW5nIGlzIGRvbmUuXG5cdCAqIE1vc3RseSB1c2VmdWwgd2hlbiBgYXN5bmNgIGlzIGB0cnVlYCwgc2luY2UgaW4gdGhhdCBjYXNlLCB0aGUgaGlnaGxpZ2h0aW5nIGlzIGRvbmUgYXN5bmNocm9ub3VzbHkuXG5cdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHRoaWdobGlnaHRFbGVtZW50OiBmdW5jdGlvbihlbGVtZW50LCBhc3luYywgY2FsbGJhY2spIHtcblx0XHQvLyBGaW5kIGxhbmd1YWdlXG5cdFx0dmFyIGxhbmd1YWdlID0gXy51dGlsLmdldExhbmd1YWdlKGVsZW1lbnQpO1xuXHRcdHZhciBncmFtbWFyID0gXy5sYW5ndWFnZXNbbGFuZ3VhZ2VdO1xuXG5cdFx0Ly8gU2V0IGxhbmd1YWdlIG9uIHRoZSBlbGVtZW50LCBpZiBub3QgcHJlc2VudFxuXHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShsYW5nLCAnJykucmVwbGFjZSgvXFxzKy9nLCAnICcpICsgJyBsYW5ndWFnZS0nICsgbGFuZ3VhZ2U7XG5cblx0XHQvLyBTZXQgbGFuZ3VhZ2Ugb24gdGhlIHBhcmVudCwgZm9yIHN0eWxpbmdcblx0XHR2YXIgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdGlmIChwYXJlbnQgJiYgcGFyZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdwcmUnKSB7XG5cdFx0XHRwYXJlbnQuY2xhc3NOYW1lID0gcGFyZW50LmNsYXNzTmFtZS5yZXBsYWNlKGxhbmcsICcnKS5yZXBsYWNlKC9cXHMrL2csICcgJykgKyAnIGxhbmd1YWdlLScgKyBsYW5ndWFnZTtcblx0XHR9XG5cblx0XHR2YXIgY29kZSA9IGVsZW1lbnQudGV4dENvbnRlbnQ7XG5cblx0XHR2YXIgZW52ID0ge1xuXHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZSxcblx0XHRcdGdyYW1tYXI6IGdyYW1tYXIsXG5cdFx0XHRjb2RlOiBjb2RlXG5cdFx0fTtcblxuXHRcdGZ1bmN0aW9uIGluc2VydEhpZ2hsaWdodGVkQ29kZShoaWdobGlnaHRlZENvZGUpIHtcblx0XHRcdGVudi5oaWdobGlnaHRlZENvZGUgPSBoaWdobGlnaHRlZENvZGU7XG5cblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaW5zZXJ0JywgZW52KTtcblxuXHRcdFx0ZW52LmVsZW1lbnQuaW5uZXJIVE1MID0gZW52LmhpZ2hsaWdodGVkQ29kZTtcblxuXHRcdFx0Xy5ob29rcy5ydW4oJ2FmdGVyLWhpZ2hsaWdodCcsIGVudik7XG5cdFx0XHRfLmhvb2tzLnJ1bignY29tcGxldGUnLCBlbnYpO1xuXHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbChlbnYuZWxlbWVudCk7XG5cdFx0fVxuXG5cdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1zYW5pdHktY2hlY2snLCBlbnYpO1xuXG5cdFx0aWYgKCFlbnYuY29kZSkge1xuXHRcdFx0Xy5ob29rcy5ydW4oJ2NvbXBsZXRlJywgZW52KTtcblx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoZW52LmVsZW1lbnQpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaGlnaGxpZ2h0JywgZW52KTtcblxuXHRcdGlmICghZW52LmdyYW1tYXIpIHtcblx0XHRcdGluc2VydEhpZ2hsaWdodGVkQ29kZShfLnV0aWwuZW5jb2RlKGVudi5jb2RlKSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKGFzeW5jICYmIF9zZWxmLldvcmtlcikge1xuXHRcdFx0dmFyIHdvcmtlciA9IG5ldyBXb3JrZXIoXy5maWxlbmFtZSk7XG5cblx0XHRcdHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0aW5zZXJ0SGlnaGxpZ2h0ZWRDb2RlKGV2dC5kYXRhKTtcblx0XHRcdH07XG5cblx0XHRcdHdvcmtlci5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdGxhbmd1YWdlOiBlbnYubGFuZ3VhZ2UsXG5cdFx0XHRcdGNvZGU6IGVudi5jb2RlLFxuXHRcdFx0XHRpbW1lZGlhdGVDbG9zZTogdHJ1ZVxuXHRcdFx0fSkpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGluc2VydEhpZ2hsaWdodGVkQ29kZShfLmhpZ2hsaWdodChlbnYuY29kZSwgZW52LmdyYW1tYXIsIGVudi5sYW5ndWFnZSkpO1xuXHRcdH1cblx0fSxcblxuXHQvKipcblx0ICogTG93LWxldmVsIGZ1bmN0aW9uLCBvbmx5IHVzZSBpZiB5b3Uga25vdyB3aGF0IHlvdeKAmXJlIGRvaW5nLiBJdCBhY2NlcHRzIGEgc3RyaW5nIG9mIHRleHQgYXMgaW5wdXRcblx0ICogYW5kIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9ucyB0byB1c2UsIGFuZCByZXR1cm5zIGEgc3RyaW5nIHdpdGggdGhlIEhUTUwgcHJvZHVjZWQuXG5cdCAqXG5cdCAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG5cdCAqIDEuIGBiZWZvcmUtdG9rZW5pemVgXG5cdCAqIDIuIGBhZnRlci10b2tlbml6ZWBcblx0ICogMy4gYHdyYXBgOiBPbiBlYWNoIHtAbGluayBUb2tlbn0uXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IEEgc3RyaW5nIHdpdGggdGhlIGNvZGUgdG8gYmUgaGlnaGxpZ2h0ZWQuXG5cdCAqIEBwYXJhbSB7R3JhbW1hcn0gZ3JhbW1hciBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgdG9rZW5zIHRvIHVzZS5cblx0ICpcblx0ICogVXN1YWxseSBhIGxhbmd1YWdlIGRlZmluaXRpb24gbGlrZSBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSBUaGUgbmFtZSBvZiB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBwYXNzZWQgdG8gYGdyYW1tYXJgLlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgaGlnaGxpZ2h0ZWQgSFRNTC5cblx0ICogQG1lbWJlcm9mIFByaXNtXG5cdCAqIEBwdWJsaWNcblx0ICogQGV4YW1wbGVcblx0ICogUHJpc20uaGlnaGxpZ2h0KCd2YXIgZm9vID0gdHJ1ZTsnLCBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdCwgJ2phdmFzY3JpcHQnKTtcblx0ICovXG5cdGhpZ2hsaWdodDogZnVuY3Rpb24gKHRleHQsIGdyYW1tYXIsIGxhbmd1YWdlKSB7XG5cdFx0dmFyIGVudiA9IHtcblx0XHRcdGNvZGU6IHRleHQsXG5cdFx0XHRncmFtbWFyOiBncmFtbWFyLFxuXHRcdFx0bGFuZ3VhZ2U6IGxhbmd1YWdlXG5cdFx0fTtcblx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLXRva2VuaXplJywgZW52KTtcblx0XHRlbnYudG9rZW5zID0gXy50b2tlbml6ZShlbnYuY29kZSwgZW52LmdyYW1tYXIpO1xuXHRcdF8uaG9va3MucnVuKCdhZnRlci10b2tlbml6ZScsIGVudik7XG5cdFx0cmV0dXJuIFRva2VuLnN0cmluZ2lmeShfLnV0aWwuZW5jb2RlKGVudi50b2tlbnMpLCBlbnYubGFuZ3VhZ2UpO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBUaGlzIGlzIHRoZSBoZWFydCBvZiBQcmlzbSwgYW5kIHRoZSBtb3N0IGxvdy1sZXZlbCBmdW5jdGlvbiB5b3UgY2FuIHVzZS4gSXQgYWNjZXB0cyBhIHN0cmluZyBvZiB0ZXh0IGFzIGlucHV0XG5cdCAqIGFuZCB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbnMgdG8gdXNlLCBhbmQgcmV0dXJucyBhbiBhcnJheSB3aXRoIHRoZSB0b2tlbml6ZWQgY29kZS5cblx0ICpcblx0ICogV2hlbiB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBpbmNsdWRlcyBuZXN0ZWQgdG9rZW5zLCB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIHJlY3Vyc2l2ZWx5IG9uIGVhY2ggb2YgdGhlc2UgdG9rZW5zLlxuXHQgKlxuXHQgKiBUaGlzIG1ldGhvZCBjb3VsZCBiZSB1c2VmdWwgaW4gb3RoZXIgY29udGV4dHMgYXMgd2VsbCwgYXMgYSB2ZXJ5IGNydWRlIHBhcnNlci5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQgQSBzdHJpbmcgd2l0aCB0aGUgY29kZSB0byBiZSBoaWdobGlnaHRlZC5cblx0ICogQHBhcmFtIHtHcmFtbWFyfSBncmFtbWFyIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSB0b2tlbnMgdG8gdXNlLlxuXHQgKlxuXHQgKiBVc3VhbGx5IGEgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBsaWtlIGBQcmlzbS5sYW5ndWFnZXMubWFya3VwYC5cblx0ICogQHJldHVybnMge1Rva2VuU3RyZWFtfSBBbiBhcnJheSBvZiBzdHJpbmdzIGFuZCB0b2tlbnMsIGEgdG9rZW4gc3RyZWFtLlxuXHQgKiBAbWVtYmVyb2YgUHJpc21cblx0ICogQHB1YmxpY1xuXHQgKiBAZXhhbXBsZVxuXHQgKiBsZXQgY29kZSA9IGB2YXIgZm9vID0gMDtgO1xuXHQgKiBsZXQgdG9rZW5zID0gUHJpc20udG9rZW5pemUoY29kZSwgUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQpO1xuXHQgKiB0b2tlbnMuZm9yRWFjaCh0b2tlbiA9PiB7XG5cdCAqICAgICBpZiAodG9rZW4gaW5zdGFuY2VvZiBQcmlzbS5Ub2tlbiAmJiB0b2tlbi50eXBlID09PSAnbnVtYmVyJykge1xuXHQgKiAgICAgICAgIGNvbnNvbGUubG9nKGBGb3VuZCBudW1lcmljIGxpdGVyYWw6ICR7dG9rZW4uY29udGVudH1gKTtcblx0ICogICAgIH1cblx0ICogfSk7XG5cdCAqL1xuXHR0b2tlbml6ZTogZnVuY3Rpb24odGV4dCwgZ3JhbW1hcikge1xuXHRcdHZhciByZXN0ID0gZ3JhbW1hci5yZXN0O1xuXHRcdGlmIChyZXN0KSB7XG5cdFx0XHRmb3IgKHZhciB0b2tlbiBpbiByZXN0KSB7XG5cdFx0XHRcdGdyYW1tYXJbdG9rZW5dID0gcmVzdFt0b2tlbl07XG5cdFx0XHR9XG5cblx0XHRcdGRlbGV0ZSBncmFtbWFyLnJlc3Q7XG5cdFx0fVxuXG5cdFx0dmFyIHRva2VuTGlzdCA9IG5ldyBMaW5rZWRMaXN0KCk7XG5cdFx0YWRkQWZ0ZXIodG9rZW5MaXN0LCB0b2tlbkxpc3QuaGVhZCwgdGV4dCk7XG5cblx0XHRtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCB0b2tlbkxpc3QuaGVhZCwgMCk7XG5cblx0XHRyZXR1cm4gdG9BcnJheSh0b2tlbkxpc3QpO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBAbmFtZXNwYWNlXG5cdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHRob29rczoge1xuXHRcdGFsbDoge30sXG5cblx0XHQvKipcblx0XHQgKiBBZGRzIHRoZSBnaXZlbiBjYWxsYmFjayB0byB0aGUgbGlzdCBvZiBjYWxsYmFja3MgZm9yIHRoZSBnaXZlbiBob29rLlxuXHRcdCAqXG5cdFx0ICogVGhlIGNhbGxiYWNrIHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBob29rIGl0IGlzIHJlZ2lzdGVyZWQgZm9yIGlzIHJ1bi5cblx0XHQgKiBIb29rcyBhcmUgdXN1YWxseSBkaXJlY3RseSBydW4gYnkgYSBoaWdobGlnaHQgZnVuY3Rpb24gYnV0IHlvdSBjYW4gYWxzbyBydW4gaG9va3MgeW91cnNlbGYuXG5cdFx0ICpcblx0XHQgKiBPbmUgY2FsbGJhY2sgZnVuY3Rpb24gY2FuIGJlIHJlZ2lzdGVyZWQgdG8gbXVsdGlwbGUgaG9va3MgYW5kIHRoZSBzYW1lIGhvb2sgbXVsdGlwbGUgdGltZXMuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgaG9vay5cblx0XHQgKiBAcGFyYW0ge0hvb2tDYWxsYmFja30gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIGlzIGdpdmVuIGVudmlyb25tZW50IHZhcmlhYmxlcy5cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0YWRkOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2spIHtcblx0XHRcdHZhciBob29rcyA9IF8uaG9va3MuYWxsO1xuXG5cdFx0XHRob29rc1tuYW1lXSA9IGhvb2tzW25hbWVdIHx8IFtdO1xuXG5cdFx0XHRob29rc1tuYW1lXS5wdXNoKGNhbGxiYWNrKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUnVucyBhIGhvb2sgaW52b2tpbmcgYWxsIHJlZ2lzdGVyZWQgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGVudmlyb25tZW50IHZhcmlhYmxlcy5cblx0XHQgKlxuXHRcdCAqIENhbGxiYWNrcyB3aWxsIGJlIGludm9rZWQgc3luY2hyb25vdXNseSBhbmQgaW4gdGhlIG9yZGVyIGluIHdoaWNoIHRoZXkgd2VyZSByZWdpc3RlcmVkLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGhvb2suXG5cdFx0ICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBlbnYgVGhlIGVudmlyb25tZW50IHZhcmlhYmxlcyBvZiB0aGUgaG9vayBwYXNzZWQgdG8gYWxsIGNhbGxiYWNrcyByZWdpc3RlcmVkLlxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRydW46IGZ1bmN0aW9uIChuYW1lLCBlbnYpIHtcblx0XHRcdHZhciBjYWxsYmFja3MgPSBfLmhvb2tzLmFsbFtuYW1lXTtcblxuXHRcdFx0aWYgKCFjYWxsYmFja3MgfHwgIWNhbGxiYWNrcy5sZW5ndGgpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKHZhciBpPTAsIGNhbGxiYWNrOyBjYWxsYmFjayA9IGNhbGxiYWNrc1tpKytdOykge1xuXHRcdFx0XHRjYWxsYmFjayhlbnYpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRUb2tlbjogVG9rZW5cbn07XG5fc2VsZi5QcmlzbSA9IF87XG5cblxuLy8gVHlwZXNjcmlwdCBub3RlOlxuLy8gVGhlIGZvbGxvd2luZyBjYW4gYmUgdXNlZCB0byBpbXBvcnQgdGhlIFRva2VuIHR5cGUgaW4gSlNEb2M6XG4vL1xuLy8gICBAdHlwZWRlZiB7SW5zdGFuY2VUeXBlPGltcG9ydChcIi4vcHJpc20tY29yZVwiKVtcIlRva2VuXCJdPn0gVG9rZW5cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHRva2VuLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFNlZSB7QGxpbmsgVG9rZW4jdHlwZSB0eXBlfVxuICogQHBhcmFtIHtzdHJpbmcgfCBUb2tlblN0cmVhbX0gY29udGVudCBTZWUge0BsaW5rIFRva2VuI2NvbnRlbnQgY29udGVudH1cbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBbYWxpYXNdIFRoZSBhbGlhcyhlcykgb2YgdGhlIHRva2VuLlxuICogQHBhcmFtIHtzdHJpbmd9IFttYXRjaGVkU3RyPVwiXCJdIEEgY29weSBvZiB0aGUgZnVsbCBzdHJpbmcgdGhpcyB0b2tlbiB3YXMgY3JlYXRlZCBmcm9tLlxuICogQGNsYXNzXG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIFRva2VuKHR5cGUsIGNvbnRlbnQsIGFsaWFzLCBtYXRjaGVkU3RyKSB7XG5cdC8qKlxuXHQgKiBUaGUgdHlwZSBvZiB0aGUgdG9rZW4uXG5cdCAqXG5cdCAqIFRoaXMgaXMgdXN1YWxseSB0aGUga2V5IG9mIGEgcGF0dGVybiBpbiBhIHtAbGluayBHcmFtbWFyfS5cblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICogQHNlZSBHcmFtbWFyVG9rZW5cblx0ICogQHB1YmxpY1xuXHQgKi9cblx0dGhpcy50eXBlID0gdHlwZTtcblx0LyoqXG5cdCAqIFRoZSBzdHJpbmdzIG9yIHRva2VucyBjb250YWluZWQgYnkgdGhpcyB0b2tlbi5cblx0ICpcblx0ICogVGhpcyB3aWxsIGJlIGEgdG9rZW4gc3RyZWFtIGlmIHRoZSBwYXR0ZXJuIG1hdGNoZWQgYWxzbyBkZWZpbmVkIGFuIGBpbnNpZGVgIGdyYW1tYXIuXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmcgfCBUb2tlblN0cmVhbX1cblx0ICogQHB1YmxpY1xuXHQgKi9cblx0dGhpcy5jb250ZW50ID0gY29udGVudDtcblx0LyoqXG5cdCAqIFRoZSBhbGlhcyhlcykgb2YgdGhlIHRva2VuLlxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfHN0cmluZ1tdfVxuXHQgKiBAc2VlIEdyYW1tYXJUb2tlblxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHR0aGlzLmFsaWFzID0gYWxpYXM7XG5cdC8vIENvcHkgb2YgdGhlIGZ1bGwgc3RyaW5nIHRoaXMgdG9rZW4gd2FzIGNyZWF0ZWQgZnJvbVxuXHR0aGlzLmxlbmd0aCA9IChtYXRjaGVkU3RyIHx8ICcnKS5sZW5ndGggfCAwO1xufVxuXG4vKipcbiAqIEEgdG9rZW4gc3RyZWFtIGlzIGFuIGFycmF5IG9mIHN0cmluZ3MgYW5kIHtAbGluayBUb2tlbiBUb2tlbn0gb2JqZWN0cy5cbiAqXG4gKiBUb2tlbiBzdHJlYW1zIGhhdmUgdG8gZnVsZmlsbCBhIGZldyBwcm9wZXJ0aWVzIHRoYXQgYXJlIGFzc3VtZWQgYnkgbW9zdCBmdW5jdGlvbnMgKG1vc3RseSBpbnRlcm5hbCBvbmVzKSB0aGF0IHByb2Nlc3NcbiAqIHRoZW0uXG4gKlxuICogMS4gTm8gYWRqYWNlbnQgc3RyaW5ncy5cbiAqIDIuIE5vIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogICAgVGhlIG9ubHkgZXhjZXB0aW9uIGhlcmUgaXMgdGhlIHRva2VuIHN0cmVhbSB0aGF0IG9ubHkgY29udGFpbnMgdGhlIGVtcHR5IHN0cmluZyBhbmQgbm90aGluZyBlbHNlLlxuICpcbiAqIEB0eXBlZGVmIHtBcnJheTxzdHJpbmcgfCBUb2tlbj59IFRva2VuU3RyZWFtXG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgZ2l2ZW4gdG9rZW4gb3IgdG9rZW4gc3RyZWFtIHRvIGFuIEhUTUwgcmVwcmVzZW50YXRpb24uXG4gKlxuICogVGhlIGZvbGxvd2luZyBob29rcyB3aWxsIGJlIHJ1bjpcbiAqIDEuIGB3cmFwYDogT24gZWFjaCB7QGxpbmsgVG9rZW59LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nIHwgVG9rZW4gfCBUb2tlblN0cmVhbX0gbyBUaGUgdG9rZW4gb3IgdG9rZW4gc3RyZWFtIHRvIGJlIGNvbnZlcnRlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSBUaGUgbmFtZSBvZiBjdXJyZW50IGxhbmd1YWdlLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIEhUTUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRva2VuIG9yIHRva2VuIHN0cmVhbS5cbiAqIEBtZW1iZXJvZiBUb2tlblxuICogQHN0YXRpY1xuICovXG5Ub2tlbi5zdHJpbmdpZnkgPSBmdW5jdGlvbiBzdHJpbmdpZnkobywgbGFuZ3VhZ2UpIHtcblx0aWYgKHR5cGVvZiBvID09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIG87XG5cdH1cblx0aWYgKEFycmF5LmlzQXJyYXkobykpIHtcblx0XHR2YXIgcyA9ICcnO1xuXHRcdG8uZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuXHRcdFx0cyArPSBzdHJpbmdpZnkoZSwgbGFuZ3VhZ2UpO1xuXHRcdH0pO1xuXHRcdHJldHVybiBzO1xuXHR9XG5cblx0dmFyIGVudiA9IHtcblx0XHR0eXBlOiBvLnR5cGUsXG5cdFx0Y29udGVudDogc3RyaW5naWZ5KG8uY29udGVudCwgbGFuZ3VhZ2UpLFxuXHRcdHRhZzogJ3NwYW4nLFxuXHRcdGNsYXNzZXM6IFsndG9rZW4nLCBvLnR5cGVdLFxuXHRcdGF0dHJpYnV0ZXM6IHt9LFxuXHRcdGxhbmd1YWdlOiBsYW5ndWFnZVxuXHR9O1xuXG5cdHZhciBhbGlhc2VzID0gby5hbGlhcztcblx0aWYgKGFsaWFzZXMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShhbGlhc2VzKSkge1xuXHRcdFx0QXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoZW52LmNsYXNzZXMsIGFsaWFzZXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbnYuY2xhc3Nlcy5wdXNoKGFsaWFzZXMpO1xuXHRcdH1cblx0fVxuXG5cdF8uaG9va3MucnVuKCd3cmFwJywgZW52KTtcblxuXHR2YXIgYXR0cmlidXRlcyA9ICcnO1xuXHRmb3IgKHZhciBuYW1lIGluIGVudi5hdHRyaWJ1dGVzKSB7XG5cdFx0YXR0cmlidXRlcyArPSAnICcgKyBuYW1lICsgJz1cIicgKyAoZW52LmF0dHJpYnV0ZXNbbmFtZV0gfHwgJycpLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKSArICdcIic7XG5cdH1cblxuXHRyZXR1cm4gJzwnICsgZW52LnRhZyArICcgY2xhc3M9XCInICsgZW52LmNsYXNzZXMuam9pbignICcpICsgJ1wiJyArIGF0dHJpYnV0ZXMgKyAnPicgKyBlbnYuY29udGVudCArICc8LycgKyBlbnYudGFnICsgJz4nO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge1JlZ0V4cH0gcGF0dGVyblxuICogQHBhcmFtIHtudW1iZXJ9IHBvc1xuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbG9va2JlaGluZFxuICogQHJldHVybnMge1JlZ0V4cEV4ZWNBcnJheSB8IG51bGx9XG4gKi9cbmZ1bmN0aW9uIG1hdGNoUGF0dGVybihwYXR0ZXJuLCBwb3MsIHRleHQsIGxvb2tiZWhpbmQpIHtcblx0cGF0dGVybi5sYXN0SW5kZXggPSBwb3M7XG5cdHZhciBtYXRjaCA9IHBhdHRlcm4uZXhlYyh0ZXh0KTtcblx0aWYgKG1hdGNoICYmIGxvb2tiZWhpbmQgJiYgbWF0Y2hbMV0pIHtcblx0XHQvLyBjaGFuZ2UgdGhlIG1hdGNoIHRvIHJlbW92ZSB0aGUgdGV4dCBtYXRjaGVkIGJ5IHRoZSBQcmlzbSBsb29rYmVoaW5kIGdyb3VwXG5cdFx0dmFyIGxvb2tiZWhpbmRMZW5ndGggPSBtYXRjaFsxXS5sZW5ndGg7XG5cdFx0bWF0Y2guaW5kZXggKz0gbG9va2JlaGluZExlbmd0aDtcblx0XHRtYXRjaFswXSA9IG1hdGNoWzBdLnNsaWNlKGxvb2tiZWhpbmRMZW5ndGgpO1xuXHR9XG5cdHJldHVybiBtYXRjaDtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICogQHBhcmFtIHtMaW5rZWRMaXN0PHN0cmluZyB8IFRva2VuPn0gdG9rZW5MaXN0XG4gKiBAcGFyYW0ge2FueX0gZ3JhbW1hclxuICogQHBhcmFtIHtMaW5rZWRMaXN0Tm9kZTxzdHJpbmcgfCBUb2tlbj59IHN0YXJ0Tm9kZVxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0UG9zXG4gKiBAcGFyYW0ge1JlbWF0Y2hPcHRpb25zfSBbcmVtYXRjaF1cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQHByaXZhdGVcbiAqXG4gKiBAdHlwZWRlZiBSZW1hdGNoT3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGNhdXNlXG4gKiBAcHJvcGVydHkge251bWJlcn0gcmVhY2hcbiAqL1xuZnVuY3Rpb24gbWF0Y2hHcmFtbWFyKHRleHQsIHRva2VuTGlzdCwgZ3JhbW1hciwgc3RhcnROb2RlLCBzdGFydFBvcywgcmVtYXRjaCkge1xuXHRmb3IgKHZhciB0b2tlbiBpbiBncmFtbWFyKSB7XG5cdFx0aWYgKCFncmFtbWFyLmhhc093blByb3BlcnR5KHRva2VuKSB8fCAhZ3JhbW1hclt0b2tlbl0pIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdHZhciBwYXR0ZXJucyA9IGdyYW1tYXJbdG9rZW5dO1xuXHRcdHBhdHRlcm5zID0gQXJyYXkuaXNBcnJheShwYXR0ZXJucykgPyBwYXR0ZXJucyA6IFtwYXR0ZXJuc107XG5cblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHBhdHRlcm5zLmxlbmd0aDsgKytqKSB7XG5cdFx0XHRpZiAocmVtYXRjaCAmJiByZW1hdGNoLmNhdXNlID09IHRva2VuICsgJywnICsgaikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHZhciBwYXR0ZXJuT2JqID0gcGF0dGVybnNbal0sXG5cdFx0XHRcdGluc2lkZSA9IHBhdHRlcm5PYmouaW5zaWRlLFxuXHRcdFx0XHRsb29rYmVoaW5kID0gISFwYXR0ZXJuT2JqLmxvb2tiZWhpbmQsXG5cdFx0XHRcdGdyZWVkeSA9ICEhcGF0dGVybk9iai5ncmVlZHksXG5cdFx0XHRcdGFsaWFzID0gcGF0dGVybk9iai5hbGlhcztcblxuXHRcdFx0aWYgKGdyZWVkeSAmJiAhcGF0dGVybk9iai5wYXR0ZXJuLmdsb2JhbCkge1xuXHRcdFx0XHQvLyBXaXRob3V0IHRoZSBnbG9iYWwgZmxhZywgbGFzdEluZGV4IHdvbid0IHdvcmtcblx0XHRcdFx0dmFyIGZsYWdzID0gcGF0dGVybk9iai5wYXR0ZXJuLnRvU3RyaW5nKCkubWF0Y2goL1tpbXN1eV0qJC8pWzBdO1xuXHRcdFx0XHRwYXR0ZXJuT2JqLnBhdHRlcm4gPSBSZWdFeHAocGF0dGVybk9iai5wYXR0ZXJuLnNvdXJjZSwgZmxhZ3MgKyAnZycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiogQHR5cGUge1JlZ0V4cH0gKi9cblx0XHRcdHZhciBwYXR0ZXJuID0gcGF0dGVybk9iai5wYXR0ZXJuIHx8IHBhdHRlcm5PYmo7XG5cblx0XHRcdGZvciAoIC8vIGl0ZXJhdGUgdGhlIHRva2VuIGxpc3QgYW5kIGtlZXAgdHJhY2sgb2YgdGhlIGN1cnJlbnQgdG9rZW4vc3RyaW5nIHBvc2l0aW9uXG5cdFx0XHRcdHZhciBjdXJyZW50Tm9kZSA9IHN0YXJ0Tm9kZS5uZXh0LCBwb3MgPSBzdGFydFBvcztcblx0XHRcdFx0Y3VycmVudE5vZGUgIT09IHRva2VuTGlzdC50YWlsO1xuXHRcdFx0XHRwb3MgKz0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoLCBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHRcblx0XHRcdCkge1xuXG5cdFx0XHRcdGlmIChyZW1hdGNoICYmIHBvcyA+PSByZW1hdGNoLnJlYWNoKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgc3RyID0gY3VycmVudE5vZGUudmFsdWU7XG5cblx0XHRcdFx0aWYgKHRva2VuTGlzdC5sZW5ndGggPiB0ZXh0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdC8vIFNvbWV0aGluZyB3ZW50IHRlcnJpYmx5IHdyb25nLCBBQk9SVCwgQUJPUlQhXG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHN0ciBpbnN0YW5jZW9mIFRva2VuKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgcmVtb3ZlQ291bnQgPSAxOyAvLyB0aGlzIGlzIHRoZSB0byBwYXJhbWV0ZXIgb2YgcmVtb3ZlQmV0d2VlblxuXHRcdFx0XHR2YXIgbWF0Y2g7XG5cblx0XHRcdFx0aWYgKGdyZWVkeSkge1xuXHRcdFx0XHRcdG1hdGNoID0gbWF0Y2hQYXR0ZXJuKHBhdHRlcm4sIHBvcywgdGV4dCwgbG9va2JlaGluZCk7XG5cdFx0XHRcdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIGZyb20gPSBtYXRjaC5pbmRleDtcblx0XHRcdFx0XHR2YXIgdG8gPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcblx0XHRcdFx0XHR2YXIgcCA9IHBvcztcblxuXHRcdFx0XHRcdC8vIGZpbmQgdGhlIG5vZGUgdGhhdCBjb250YWlucyB0aGUgbWF0Y2hcblx0XHRcdFx0XHRwICs9IGN1cnJlbnROb2RlLnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0XHR3aGlsZSAoZnJvbSA+PSBwKSB7XG5cdFx0XHRcdFx0XHRjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG5cdFx0XHRcdFx0XHRwICs9IGN1cnJlbnROb2RlLnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gYWRqdXN0IHBvcyAoYW5kIHApXG5cdFx0XHRcdFx0cCAtPSBjdXJyZW50Tm9kZS52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdFx0cG9zID0gcDtcblxuXHRcdFx0XHRcdC8vIHRoZSBjdXJyZW50IG5vZGUgaXMgYSBUb2tlbiwgdGhlbiB0aGUgbWF0Y2ggc3RhcnRzIGluc2lkZSBhbm90aGVyIFRva2VuLCB3aGljaCBpcyBpbnZhbGlkXG5cdFx0XHRcdFx0aWYgKGN1cnJlbnROb2RlLnZhbHVlIGluc3RhbmNlb2YgVG9rZW4pIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIGZpbmQgdGhlIGxhc3Qgbm9kZSB3aGljaCBpcyBhZmZlY3RlZCBieSB0aGlzIG1hdGNoXG5cdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdHZhciBrID0gY3VycmVudE5vZGU7XG5cdFx0XHRcdFx0XHRrICE9PSB0b2tlbkxpc3QudGFpbCAmJiAocCA8IHRvIHx8IHR5cGVvZiBrLnZhbHVlID09PSAnc3RyaW5nJyk7XG5cdFx0XHRcdFx0XHRrID0gay5uZXh0XG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRyZW1vdmVDb3VudCsrO1xuXHRcdFx0XHRcdFx0cCArPSBrLnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmVtb3ZlQ291bnQtLTtcblxuXHRcdFx0XHRcdC8vIHJlcGxhY2Ugd2l0aCB0aGUgbmV3IG1hdGNoXG5cdFx0XHRcdFx0c3RyID0gdGV4dC5zbGljZShwb3MsIHApO1xuXHRcdFx0XHRcdG1hdGNoLmluZGV4IC09IHBvcztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRtYXRjaCA9IG1hdGNoUGF0dGVybihwYXR0ZXJuLCAwLCBzdHIsIGxvb2tiZWhpbmQpO1xuXHRcdFx0XHRcdGlmICghbWF0Y2gpIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBmcm9tID0gbWF0Y2guaW5kZXgsXG5cdFx0XHRcdFx0bWF0Y2hTdHIgPSBtYXRjaFswXSxcblx0XHRcdFx0XHRiZWZvcmUgPSBzdHIuc2xpY2UoMCwgZnJvbSksXG5cdFx0XHRcdFx0YWZ0ZXIgPSBzdHIuc2xpY2UoZnJvbSArIG1hdGNoU3RyLmxlbmd0aCk7XG5cblx0XHRcdFx0dmFyIHJlYWNoID0gcG9zICsgc3RyLmxlbmd0aDtcblx0XHRcdFx0aWYgKHJlbWF0Y2ggJiYgcmVhY2ggPiByZW1hdGNoLnJlYWNoKSB7XG5cdFx0XHRcdFx0cmVtYXRjaC5yZWFjaCA9IHJlYWNoO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHJlbW92ZUZyb20gPSBjdXJyZW50Tm9kZS5wcmV2O1xuXG5cdFx0XHRcdGlmIChiZWZvcmUpIHtcblx0XHRcdFx0XHRyZW1vdmVGcm9tID0gYWRkQWZ0ZXIodG9rZW5MaXN0LCByZW1vdmVGcm9tLCBiZWZvcmUpO1xuXHRcdFx0XHRcdHBvcyArPSBiZWZvcmUubGVuZ3RoO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVtb3ZlUmFuZ2UodG9rZW5MaXN0LCByZW1vdmVGcm9tLCByZW1vdmVDb3VudCk7XG5cblx0XHRcdFx0dmFyIHdyYXBwZWQgPSBuZXcgVG9rZW4odG9rZW4sIGluc2lkZSA/IF8udG9rZW5pemUobWF0Y2hTdHIsIGluc2lkZSkgOiBtYXRjaFN0ciwgYWxpYXMsIG1hdGNoU3RyKTtcblx0XHRcdFx0Y3VycmVudE5vZGUgPSBhZGRBZnRlcih0b2tlbkxpc3QsIHJlbW92ZUZyb20sIHdyYXBwZWQpO1xuXG5cdFx0XHRcdGlmIChhZnRlcikge1xuXHRcdFx0XHRcdGFkZEFmdGVyKHRva2VuTGlzdCwgY3VycmVudE5vZGUsIGFmdGVyKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChyZW1vdmVDb3VudCA+IDEpIHtcblx0XHRcdFx0XHQvLyBhdCBsZWFzdCBvbmUgVG9rZW4gb2JqZWN0IHdhcyByZW1vdmVkLCBzbyB3ZSBoYXZlIHRvIGRvIHNvbWUgcmVtYXRjaGluZ1xuXHRcdFx0XHRcdC8vIHRoaXMgY2FuIG9ubHkgaGFwcGVuIGlmIHRoZSBjdXJyZW50IHBhdHRlcm4gaXMgZ3JlZWR5XG5cdFx0XHRcdFx0bWF0Y2hHcmFtbWFyKHRleHQsIHRva2VuTGlzdCwgZ3JhbW1hciwgY3VycmVudE5vZGUucHJldiwgcG9zLCB7XG5cdFx0XHRcdFx0XHRjYXVzZTogdG9rZW4gKyAnLCcgKyBqLFxuXHRcdFx0XHRcdFx0cmVhY2g6IHJlYWNoXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBAdHlwZWRlZiBMaW5rZWRMaXN0Tm9kZVxuICogQHByb3BlcnR5IHtUfSB2YWx1ZVxuICogQHByb3BlcnR5IHtMaW5rZWRMaXN0Tm9kZTxUPiB8IG51bGx9IHByZXYgVGhlIHByZXZpb3VzIG5vZGUuXG4gKiBAcHJvcGVydHkge0xpbmtlZExpc3ROb2RlPFQ+IHwgbnVsbH0gbmV4dCBUaGUgbmV4dCBub2RlLlxuICogQHRlbXBsYXRlIFRcbiAqIEBwcml2YXRlXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgVFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gTGlua2VkTGlzdCgpIHtcblx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0dmFyIGhlYWQgPSB7IHZhbHVlOiBudWxsLCBwcmV2OiBudWxsLCBuZXh0OiBudWxsIH07XG5cdC8qKiBAdHlwZSB7TGlua2VkTGlzdE5vZGU8VD59ICovXG5cdHZhciB0YWlsID0geyB2YWx1ZTogbnVsbCwgcHJldjogaGVhZCwgbmV4dDogbnVsbCB9O1xuXHRoZWFkLm5leHQgPSB0YWlsO1xuXG5cdC8qKiBAdHlwZSB7TGlua2VkTGlzdE5vZGU8VD59ICovXG5cdHRoaXMuaGVhZCA9IGhlYWQ7XG5cdC8qKiBAdHlwZSB7TGlua2VkTGlzdE5vZGU8VD59ICovXG5cdHRoaXMudGFpbCA9IHRhaWw7XG5cdHRoaXMubGVuZ3RoID0gMDtcbn1cblxuLyoqXG4gKiBBZGRzIGEgbmV3IG5vZGUgd2l0aCB0aGUgZ2l2ZW4gdmFsdWUgdG8gdGhlIGxpc3QuXG4gKiBAcGFyYW0ge0xpbmtlZExpc3Q8VD59IGxpc3RcbiAqIEBwYXJhbSB7TGlua2VkTGlzdE5vZGU8VD59IG5vZGVcbiAqIEBwYXJhbSB7VH0gdmFsdWVcbiAqIEByZXR1cm5zIHtMaW5rZWRMaXN0Tm9kZTxUPn0gVGhlIGFkZGVkIG5vZGUuXG4gKiBAdGVtcGxhdGUgVFxuICovXG5mdW5jdGlvbiBhZGRBZnRlcihsaXN0LCBub2RlLCB2YWx1ZSkge1xuXHQvLyBhc3N1bWVzIHRoYXQgbm9kZSAhPSBsaXN0LnRhaWwgJiYgdmFsdWVzLmxlbmd0aCA+PSAwXG5cdHZhciBuZXh0ID0gbm9kZS5uZXh0O1xuXG5cdHZhciBuZXdOb2RlID0geyB2YWx1ZTogdmFsdWUsIHByZXY6IG5vZGUsIG5leHQ6IG5leHQgfTtcblx0bm9kZS5uZXh0ID0gbmV3Tm9kZTtcblx0bmV4dC5wcmV2ID0gbmV3Tm9kZTtcblx0bGlzdC5sZW5ndGgrKztcblxuXHRyZXR1cm4gbmV3Tm9kZTtcbn1cbi8qKlxuICogUmVtb3ZlcyBgY291bnRgIG5vZGVzIGFmdGVyIHRoZSBnaXZlbiBub2RlLiBUaGUgZ2l2ZW4gbm9kZSB3aWxsIG5vdCBiZSByZW1vdmVkLlxuICogQHBhcmFtIHtMaW5rZWRMaXN0PFQ+fSBsaXN0XG4gKiBAcGFyYW0ge0xpbmtlZExpc3ROb2RlPFQ+fSBub2RlXG4gKiBAcGFyYW0ge251bWJlcn0gY291bnRcbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZVJhbmdlKGxpc3QsIG5vZGUsIGNvdW50KSB7XG5cdHZhciBuZXh0ID0gbm9kZS5uZXh0O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50ICYmIG5leHQgIT09IGxpc3QudGFpbDsgaSsrKSB7XG5cdFx0bmV4dCA9IG5leHQubmV4dDtcblx0fVxuXHRub2RlLm5leHQgPSBuZXh0O1xuXHRuZXh0LnByZXYgPSBub2RlO1xuXHRsaXN0Lmxlbmd0aCAtPSBpO1xufVxuLyoqXG4gKiBAcGFyYW0ge0xpbmtlZExpc3Q8VD59IGxpc3RcbiAqIEByZXR1cm5zIHtUW119XG4gKiBAdGVtcGxhdGUgVFxuICovXG5mdW5jdGlvbiB0b0FycmF5KGxpc3QpIHtcblx0dmFyIGFycmF5ID0gW107XG5cdHZhciBub2RlID0gbGlzdC5oZWFkLm5leHQ7XG5cdHdoaWxlIChub2RlICE9PSBsaXN0LnRhaWwpIHtcblx0XHRhcnJheS5wdXNoKG5vZGUudmFsdWUpO1xuXHRcdG5vZGUgPSBub2RlLm5leHQ7XG5cdH1cblx0cmV0dXJuIGFycmF5O1xufVxuXG5cbmlmICghX3NlbGYuZG9jdW1lbnQpIHtcblx0aWYgKCFfc2VsZi5hZGRFdmVudExpc3RlbmVyKSB7XG5cdFx0Ly8gaW4gTm9kZS5qc1xuXHRcdHJldHVybiBfO1xuXHR9XG5cblx0aWYgKCFfLmRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcikge1xuXHRcdC8vIEluIHdvcmtlclxuXHRcdF9zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0XHR2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZXZ0LmRhdGEpLFxuXHRcdFx0XHRsYW5nID0gbWVzc2FnZS5sYW5ndWFnZSxcblx0XHRcdFx0Y29kZSA9IG1lc3NhZ2UuY29kZSxcblx0XHRcdFx0aW1tZWRpYXRlQ2xvc2UgPSBtZXNzYWdlLmltbWVkaWF0ZUNsb3NlO1xuXG5cdFx0XHRfc2VsZi5wb3N0TWVzc2FnZShfLmhpZ2hsaWdodChjb2RlLCBfLmxhbmd1YWdlc1tsYW5nXSwgbGFuZykpO1xuXHRcdFx0aWYgKGltbWVkaWF0ZUNsb3NlKSB7XG5cdFx0XHRcdF9zZWxmLmNsb3NlKCk7XG5cdFx0XHR9XG5cdFx0fSwgZmFsc2UpO1xuXHR9XG5cblx0cmV0dXJuIF87XG59XG5cbi8vIEdldCBjdXJyZW50IHNjcmlwdCBhbmQgaGlnaGxpZ2h0XG52YXIgc2NyaXB0ID0gXy51dGlsLmN1cnJlbnRTY3JpcHQoKTtcblxuaWYgKHNjcmlwdCkge1xuXHRfLmZpbGVuYW1lID0gc2NyaXB0LnNyYztcblxuXHRpZiAoc2NyaXB0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1tYW51YWwnKSkge1xuXHRcdF8ubWFudWFsID0gdHJ1ZTtcblx0fVxufVxuXG5mdW5jdGlvbiBoaWdobGlnaHRBdXRvbWF0aWNhbGx5Q2FsbGJhY2soKSB7XG5cdGlmICghXy5tYW51YWwpIHtcblx0XHRfLmhpZ2hsaWdodEFsbCgpO1xuXHR9XG59XG5cbmlmICghXy5tYW51YWwpIHtcblx0Ly8gSWYgdGhlIGRvY3VtZW50IHN0YXRlIGlzIFwibG9hZGluZ1wiLCB0aGVuIHdlJ2xsIHVzZSBET01Db250ZW50TG9hZGVkLlxuXHQvLyBJZiB0aGUgZG9jdW1lbnQgc3RhdGUgaXMgXCJpbnRlcmFjdGl2ZVwiIGFuZCB0aGUgcHJpc20uanMgc2NyaXB0IGlzIGRlZmVycmVkLCB0aGVuIHdlJ2xsIGFsc28gdXNlIHRoZVxuXHQvLyBET01Db250ZW50TG9hZGVkIGV2ZW50IGJlY2F1c2UgdGhlcmUgbWlnaHQgYmUgc29tZSBwbHVnaW5zIG9yIGxhbmd1YWdlcyB3aGljaCBoYXZlIGFsc28gYmVlbiBkZWZlcnJlZCBhbmQgdGhleVxuXHQvLyBtaWdodCB0YWtlIGxvbmdlciBvbmUgYW5pbWF0aW9uIGZyYW1lIHRvIGV4ZWN1dGUgd2hpY2ggY2FuIGNyZWF0ZSBhIHJhY2UgY29uZGl0aW9uIHdoZXJlIG9ubHkgc29tZSBwbHVnaW5zIGhhdmVcblx0Ly8gYmVlbiBsb2FkZWQgd2hlbiBQcmlzbS5oaWdobGlnaHRBbGwoKSBpcyBleGVjdXRlZCwgZGVwZW5kaW5nIG9uIGhvdyBmYXN0IHJlc291cmNlcyBhcmUgbG9hZGVkLlxuXHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1ByaXNtSlMvcHJpc20vaXNzdWVzLzIxMDJcblx0dmFyIHJlYWR5U3RhdGUgPSBkb2N1bWVudC5yZWFkeVN0YXRlO1xuXHRpZiAocmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnIHx8IHJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScgJiYgc2NyaXB0ICYmIHNjcmlwdC5kZWZlcikge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBoaWdobGlnaHRBdXRvbWF0aWNhbGx5Q2FsbGJhY2spO1xuXHR9IGVsc2Uge1xuXHRcdGlmICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZ2hsaWdodEF1dG9tYXRpY2FsbHlDYWxsYmFjayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGhpZ2hsaWdodEF1dG9tYXRpY2FsbHlDYWxsYmFjaywgMTYpO1xuXHRcdH1cblx0fVxufVxuXG5yZXR1cm4gXztcblxufSkoX3NlbGYpO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBQcmlzbTtcbn1cblxuLy8gaGFjayBmb3IgY29tcG9uZW50cyB0byB3b3JrIGNvcnJlY3RseSBpbiBub2RlLmpzXG5pZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0Z2xvYmFsLlByaXNtID0gUHJpc207XG59XG5cbi8vIHNvbWUgYWRkaXRpb25hbCBkb2N1bWVudGF0aW9uL3R5cGVzXG5cbi8qKlxuICogVGhlIGV4cGFuc2lvbiBvZiBhIHNpbXBsZSBgUmVnRXhwYCBsaXRlcmFsIHRvIHN1cHBvcnQgYWRkaXRpb25hbCBwcm9wZXJ0aWVzLlxuICpcbiAqIEB0eXBlZGVmIEdyYW1tYXJUb2tlblxuICogQHByb3BlcnR5IHtSZWdFeHB9IHBhdHRlcm4gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiBvZiB0aGUgdG9rZW4uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtsb29rYmVoaW5kPWZhbHNlXSBJZiBgdHJ1ZWAsIHRoZW4gdGhlIGZpcnN0IGNhcHR1cmluZyBncm91cCBvZiBgcGF0dGVybmAgd2lsbCAoZWZmZWN0aXZlbHkpXG4gKiBiZWhhdmUgYXMgYSBsb29rYmVoaW5kIGdyb3VwIG1lYW5pbmcgdGhhdCB0aGUgY2FwdHVyZWQgdGV4dCB3aWxsIG5vdCBiZSBwYXJ0IG9mIHRoZSBtYXRjaGVkIHRleHQgb2YgdGhlIG5ldyB0b2tlbi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2dyZWVkeT1mYWxzZV0gV2hldGhlciB0aGUgdG9rZW4gaXMgZ3JlZWR5LlxuICogQHByb3BlcnR5IHtzdHJpbmd8c3RyaW5nW119IFthbGlhc10gQW4gb3B0aW9uYWwgYWxpYXMgb3IgbGlzdCBvZiBhbGlhc2VzLlxuICogQHByb3BlcnR5IHtHcmFtbWFyfSBbaW5zaWRlXSBUaGUgbmVzdGVkIGdyYW1tYXIgb2YgdGhpcyB0b2tlbi5cbiAqXG4gKiBUaGUgYGluc2lkZWAgZ3JhbW1hciB3aWxsIGJlIHVzZWQgdG8gdG9rZW5pemUgdGhlIHRleHQgdmFsdWUgb2YgZWFjaCB0b2tlbiBvZiB0aGlzIGtpbmQuXG4gKlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBtYWtlIG5lc3RlZCBhbmQgZXZlbiByZWN1cnNpdmUgbGFuZ3VhZ2UgZGVmaW5pdGlvbnMuXG4gKlxuICogTm90ZTogVGhpcyBjYW4gY2F1c2UgaW5maW5pdGUgcmVjdXJzaW9uLiBCZSBjYXJlZnVsIHdoZW4geW91IGVtYmVkIGRpZmZlcmVudCBsYW5ndWFnZXMgb3IgZXZlbiB0aGUgc2FtZSBsYW5ndWFnZSBpbnRvXG4gKiBlYWNoIGFub3RoZXIuXG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4qL1xuXG4vKipcbiAqIEB0eXBlZGVmIEdyYW1tYXJcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBSZWdFeHAgfCBHcmFtbWFyVG9rZW4gfCBBcnJheTxSZWdFeHAgfCBHcmFtbWFyVG9rZW4+Pn1cbiAqIEBwcm9wZXJ0eSB7R3JhbW1hcn0gW3Jlc3RdIEFuIG9wdGlvbmFsIGdyYW1tYXIgb2JqZWN0IHRoYXQgd2lsbCBiZSBhcHBlbmRlZCB0byB0aGlzIGdyYW1tYXIuXG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHdoaWNoIHdpbGwgaW52b2tlZCBhZnRlciBhbiBlbGVtZW50IHdhcyBzdWNjZXNzZnVsbHkgaGlnaGxpZ2h0ZWQuXG4gKlxuICogQGNhbGxiYWNrIEhpZ2hsaWdodENhbGxiYWNrXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgc3VjY2Vzc2Z1bGx5IGhpZ2hsaWdodGVkLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4qL1xuXG4vKipcbiAqIEBjYWxsYmFjayBIb29rQ2FsbGJhY2tcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gZW52IFRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMgb2YgdGhlIGhvb2suXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuIiwiKGZ1bmN0aW9uIChQcmlzbSkge1xuXG5cdHZhciBzdHJpbmcgPSAvKFwifCcpKD86XFxcXCg/OlxcclxcbnxbXFxzXFxTXSl8KD8hXFwxKVteXFxcXFxcclxcbl0pKlxcMS87XG5cblx0UHJpc20ubGFuZ3VhZ2VzLmNzcyA9IHtcblx0XHQnY29tbWVudCc6IC9cXC9cXCpbXFxzXFxTXSo/XFwqXFwvLyxcblx0XHQnYXRydWxlJzoge1xuXHRcdFx0cGF0dGVybjogL0BbXFx3LV0oPzpbXjt7XFxzXXxcXHMrKD8hW1xcc3tdKSkqKD86O3woPz1cXHMqXFx7KSkvLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCdydWxlJzogL15AW1xcdy1dKy8sXG5cdFx0XHRcdCdzZWxlY3Rvci1mdW5jdGlvbi1hcmd1bWVudCc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvKFxcYnNlbGVjdG9yXFxzKlxcKFxccyooPyFbXFxzKV0pKSg/OlteKClcXHNdfFxccysoPyFbXFxzKV0pfFxcKCg/OlteKCldfFxcKFteKCldKlxcKSkqXFwpKSsoPz1cXHMqXFwpKS8sXG5cdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0XHRhbGlhczogJ3NlbGVjdG9yJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQna2V5d29yZCc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvKF58W15cXHctXSkoPzphbmR8bm90fG9ubHl8b3IpKD8hW1xcdy1dKS8sXG5cdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIFNlZSByZXN0IGJlbG93XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQndXJsJzoge1xuXHRcdFx0Ly8gaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXHRcdFx0cGF0dGVybjogUmVnRXhwKCdcXFxcYnVybFxcXFwoKD86JyArIHN0cmluZy5zb3VyY2UgKyAnfCcgKyAvKD86W15cXFxcXFxyXFxuKClcIiddfFxcXFxbXFxzXFxTXSkqLy5zb3VyY2UgKyAnKVxcXFwpJywgJ2knKSxcblx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQnZnVuY3Rpb24nOiAvXnVybC9pLFxuXHRcdFx0XHQncHVuY3R1YXRpb24nOiAvXlxcKHxcXCkkLyxcblx0XHRcdFx0J3N0cmluZyc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiBSZWdFeHAoJ14nICsgc3RyaW5nLnNvdXJjZSArICckJyksXG5cdFx0XHRcdFx0YWxpYXM6ICd1cmwnXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdCdzZWxlY3Rvcic6IFJlZ0V4cCgnW157fVxcXFxzXSg/Oltee307XCJcXCdcXFxcc118XFxcXHMrKD8hW1xcXFxze10pfCcgKyBzdHJpbmcuc291cmNlICsgJykqKD89XFxcXHMqXFxcXHspJyksXG5cdFx0J3N0cmluZyc6IHtcblx0XHRcdHBhdHRlcm46IHN0cmluZyxcblx0XHRcdGdyZWVkeTogdHJ1ZVxuXHRcdH0sXG5cdFx0J3Byb3BlcnR5JzogLyg/IVxccylbLV9hLXpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbLVxcd1xceEEwLVxcdUZGRkZdKSooPz1cXHMqOikvaSxcblx0XHQnaW1wb3J0YW50JzogLyFpbXBvcnRhbnRcXGIvaSxcblx0XHQnZnVuY3Rpb24nOiAvWy1hLXowLTldKyg/PVxcKCkvaSxcblx0XHQncHVuY3R1YXRpb24nOiAvWygpe307OixdL1xuXHR9O1xuXG5cdFByaXNtLmxhbmd1YWdlcy5jc3NbJ2F0cnVsZSddLmluc2lkZS5yZXN0ID0gUHJpc20ubGFuZ3VhZ2VzLmNzcztcblxuXHR2YXIgbWFya3VwID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblx0aWYgKG1hcmt1cCkge1xuXHRcdG1hcmt1cC50YWcuYWRkSW5saW5lZCgnc3R5bGUnLCAnY3NzJyk7XG5cblx0XHRQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdpbnNpZGUnLCAnYXR0ci12YWx1ZScsIHtcblx0XHRcdCdzdHlsZS1hdHRyJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvKF58W1wiJ1xcc10pc3R5bGVcXHMqPVxccyooPzpcIlteXCJdKlwifCdbXiddKicpL2ksXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdhdHRyLXZhbHVlJzoge1xuXHRcdFx0XHRcdFx0cGF0dGVybjogLz1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiPj1dKykvLFxuXHRcdFx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0XHRcdCdzdHlsZSc6IHtcblx0XHRcdFx0XHRcdFx0XHRwYXR0ZXJuOiAvKFtcIiddKVtcXHNcXFNdKyg/PVtcIiddJCkvLFxuXHRcdFx0XHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0YWxpYXM6ICdsYW5ndWFnZS1jc3MnLFxuXHRcdFx0XHRcdFx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLmNzc1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiBbXG5cdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0cGF0dGVybjogL149Lyxcblx0XHRcdFx0XHRcdFx0XHRcdGFsaWFzOiAnYXR0ci1lcXVhbHMnXG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHQvXCJ8Jy9cblx0XHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0J2F0dHItbmFtZSc6IC9ec3R5bGUvaVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSwgbWFya3VwLnRhZyk7XG5cdH1cblxufShQcmlzbSkpO1xuIiwiUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjbGlrZScsIHtcblx0J2NsYXNzLW5hbWUnOiBbXG5cdFx0UHJpc20ubGFuZ3VhZ2VzLmNsaWtlWydjbGFzcy1uYW1lJ10sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteJFxcd1xceEEwLVxcdUZGRkZdKSg/IVxccylbXyRBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXC4oPzpwcm90b3R5cGV8Y29uc3RydWN0b3IpKS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fVxuXHRdLFxuXHQna2V5d29yZCc6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKCg/Ol58fSlcXHMqKSg/OmNhdGNofGZpbmFsbHkpXFxiLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXi5dfFxcLlxcLlxcLlxccyopXFxiKD86YXN8YXN5bmMoPz1cXHMqKD86ZnVuY3Rpb25cXGJ8XFwofFskXFx3XFx4QTAtXFx1RkZGRl18JCkpfGF3YWl0fGJyZWFrfGNhc2V8Y2xhc3N8Y29uc3R8Y29udGludWV8ZGVidWdnZXJ8ZGVmYXVsdHxkZWxldGV8ZG98ZWxzZXxlbnVtfGV4cG9ydHxleHRlbmRzfGZvcnxmcm9tfGZ1bmN0aW9ufCg/OmdldHxzZXQpKD89XFxzKltcXFskXFx3XFx4QTAtXFx1RkZGRl0pfGlmfGltcGxlbWVudHN8aW1wb3J0fGlufGluc3RhbmNlb2Z8aW50ZXJmYWNlfGxldHxuZXd8bnVsbHxvZnxwYWNrYWdlfHByaXZhdGV8cHJvdGVjdGVkfHB1YmxpY3xyZXR1cm58c3RhdGljfHN1cGVyfHN3aXRjaHx0aGlzfHRocm93fHRyeXx0eXBlb2Z8dW5kZWZpbmVkfHZhcnx2b2lkfHdoaWxlfHdpdGh8eWllbGQpXFxiLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRdLFxuXHQvLyBBbGxvdyBmb3IgYWxsIG5vbi1BU0NJSSBjaGFyYWN0ZXJzIChTZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjAwODQ0NClcblx0J2Z1bmN0aW9uJzogLyM/KD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxccyooPzpcXC5cXHMqKD86YXBwbHl8YmluZHxjYWxsKVxccyopP1xcKCkvLFxuXHQnbnVtYmVyJzogL1xcYig/Oig/OjBbeFhdKD86W1xcZEEtRmEtZl0oPzpfW1xcZEEtRmEtZl0pPykrfDBbYkJdKD86WzAxXSg/Ol9bMDFdKT8pK3wwW29PXSg/OlswLTddKD86X1swLTddKT8pKyluP3woPzpcXGQoPzpfXFxkKT8pK258TmFOfEluZmluaXR5KVxcYnwoPzpcXGIoPzpcXGQoPzpfXFxkKT8pK1xcLj8oPzpcXGQoPzpfXFxkKT8pKnxcXEJcXC4oPzpcXGQoPzpfXFxkKT8pKykoPzpbRWVdWystXT8oPzpcXGQoPzpfXFxkKT8pKyk/Lyxcblx0J29wZXJhdG9yJzogLy0tfFxcK1xcK3xcXCpcXCo9P3w9PnwmJj0/fFxcfFxcfD0/fFshPV09PXw8PD0/fD4+Pj89P3xbLSsqLyUmfF4hPTw+XT0/fFxcLnszfXxcXD9cXD89P3xcXD9cXC4/fFt+Ol0vXG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRbJ2NsYXNzLW5hbWUnXVswXS5wYXR0ZXJuID0gLyhcXGIoPzpjbGFzc3xpbnRlcmZhY2V8ZXh0ZW5kc3xpbXBsZW1lbnRzfGluc3RhbmNlb2Z8bmV3KVxccyspW1xcdy5cXFxcXSsvO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdqYXZhc2NyaXB0JywgJ2tleXdvcmQnLCB7XG5cdCdyZWdleCc6IHtcblx0XHRwYXR0ZXJuOiAvKCg/Ol58W14kXFx3XFx4QTAtXFx1RkZGRi5cIidcXF0pXFxzXXxcXGIoPzpyZXR1cm58eWllbGQpKVxccyopXFwvKD86XFxbKD86W15cXF1cXFxcXFxyXFxuXXxcXFxcLikqXXxcXFxcLnxbXi9cXFxcXFxbXFxyXFxuXSkrXFwvW2dpbXl1c117MCw2fSg/PSg/Olxcc3xcXC9cXCooPzpbXipdfFxcKig/IVxcLykpKlxcKlxcLykqKD86JHxbXFxyXFxuLC47On0pXFxdXXxcXC9cXC8pKS8sXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQncmVnZXgtc291cmNlJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXihcXC8pW1xcc1xcU10rKD89XFwvW2Etel0qJCkvLFxuXHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRhbGlhczogJ2xhbmd1YWdlLXJlZ2V4Jyxcblx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMucmVnZXhcblx0XHRcdH0sXG5cdFx0XHQncmVnZXgtZmxhZ3MnOiAvW2Etel0rJC8sXG5cdFx0XHQncmVnZXgtZGVsaW1pdGVyJzogL15cXC98XFwvJC9cblx0XHR9XG5cdH0sXG5cdC8vIFRoaXMgbXVzdCBiZSBkZWNsYXJlZCBiZWZvcmUga2V5d29yZCBiZWNhdXNlIHdlIHVzZSBcImZ1bmN0aW9uXCIgaW5zaWRlIHRoZSBsb29rLWZvcndhcmRcblx0J2Z1bmN0aW9uLXZhcmlhYmxlJzoge1xuXHRcdHBhdHRlcm46IC8jPyg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXHMqWz06XVxccyooPzphc3luY1xccyopPyg/OlxcYmZ1bmN0aW9uXFxifCg/OlxcKCg/OlteKCldfFxcKFteKCldKlxcKSkqXFwpfCg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSopXFxzKj0+KSkvLFxuXHRcdGFsaWFzOiAnZnVuY3Rpb24nXG5cdH0sXG5cdCdwYXJhbWV0ZXInOiBbXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhmdW5jdGlvbig/OlxccysoPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKT9cXHMqXFwoXFxzKikoPyFcXHMpKD86W14oKVxcc118XFxzKyg/IVtcXHMpXSl8XFwoW14oKV0qXFwpKSsoPz1cXHMqXFwpKS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXHMqPT4pL2ksXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKFxcKFxccyopKD8hXFxzKSg/OlteKClcXHNdfFxccysoPyFbXFxzKV0pfFxcKFteKCldKlxcKSkrKD89XFxzKlxcKVxccyo9PikvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHR9LFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oKD86XFxifFxcc3xeKSg/ISg/OmFzfGFzeW5jfGF3YWl0fGJyZWFrfGNhc2V8Y2F0Y2h8Y2xhc3N8Y29uc3R8Y29udGludWV8ZGVidWdnZXJ8ZGVmYXVsdHxkZWxldGV8ZG98ZWxzZXxlbnVtfGV4cG9ydHxleHRlbmRzfGZpbmFsbHl8Zm9yfGZyb218ZnVuY3Rpb258Z2V0fGlmfGltcGxlbWVudHN8aW1wb3J0fGlufGluc3RhbmNlb2Z8aW50ZXJmYWNlfGxldHxuZXd8bnVsbHxvZnxwYWNrYWdlfHByaXZhdGV8cHJvdGVjdGVkfHB1YmxpY3xyZXR1cm58c2V0fHN0YXRpY3xzdXBlcnxzd2l0Y2h8dGhpc3x0aHJvd3x0cnl8dHlwZW9mfHVuZGVmaW5lZHx2YXJ8dm9pZHx3aGlsZXx3aXRofHlpZWxkKSg/IVskXFx3XFx4QTAtXFx1RkZGRl0pKSg/Oig/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSpcXHMqKVxcKFxccyp8XFxdXFxzKlxcKFxccyopKD8hXFxzKSg/OlteKClcXHNdfFxccysoPyFbXFxzKV0pfFxcKFteKCldKlxcKSkrKD89XFxzKlxcKVxccypcXHspLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0fVxuXHRdLFxuXHQnY29uc3RhbnQnOiAvXFxiW0EtWl0oPzpbQS1aX118XFxkeD8pKlxcYi9cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdqYXZhc2NyaXB0JywgJ3N0cmluZycsIHtcblx0J3RlbXBsYXRlLXN0cmluZyc6IHtcblx0XHRwYXR0ZXJuOiAvYCg/OlxcXFxbXFxzXFxTXXxcXCR7KD86W157fV18eyg/Oltee31dfHtbXn1dKn0pKn0pK318KD8hXFwkeylbXlxcXFxgXSkqYC8sXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3RlbXBsYXRlLXB1bmN0dWF0aW9uJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXmB8YCQvLFxuXHRcdFx0XHRhbGlhczogJ3N0cmluZydcblx0XHRcdH0sXG5cdFx0XHQnaW50ZXJwb2xhdGlvbic6IHtcblx0XHRcdFx0cGF0dGVybjogLygoPzpefFteXFxcXF0pKD86XFxcXHsyfSkqKVxcJHsoPzpbXnt9XXx7KD86W157fV18e1tefV0qfSkqfSkrfS8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdpbnRlcnBvbGF0aW9uLXB1bmN0dWF0aW9uJzoge1xuXHRcdFx0XHRcdFx0cGF0dGVybjogL15cXCR7fH0kLyxcblx0XHRcdFx0XHRcdGFsaWFzOiAncHVuY3R1YXRpb24nXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRyZXN0OiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J3N0cmluZyc6IC9bXFxzXFxTXSsvXG5cdFx0fVxuXHR9XG59KTtcblxuaWYgKFByaXNtLmxhbmd1YWdlcy5tYXJrdXApIHtcblx0UHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcuYWRkSW5saW5lZCgnc2NyaXB0JywgJ2phdmFzY3JpcHQnKTtcbn1cblxuUHJpc20ubGFuZ3VhZ2VzLmpzID0gUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQ7XG4iLCJQcmlzbS5sYW5ndWFnZXMubWFya3VwID0ge1xuXHQnY29tbWVudCc6IC88IS0tW1xcc1xcU10qPy0tPi8sXG5cdCdwcm9sb2cnOiAvPFxcP1tcXHNcXFNdKz9cXD8+Lyxcblx0J2RvY3R5cGUnOiB7XG5cdFx0Ly8gaHR0cHM6Ly93d3cudzMub3JnL1RSL3htbC8jTlQtZG9jdHlwZWRlY2xcblx0XHRwYXR0ZXJuOiAvPCFET0NUWVBFKD86W14+XCInW1xcXV18XCJbXlwiXSpcInwnW14nXSonKSsoPzpcXFsoPzpbXjxcIidcXF1dfFwiW15cIl0qXCJ8J1teJ10qJ3w8KD8hIS0tKXw8IS0tKD86W14tXXwtKD8hLT4pKSotLT4pKlxcXVxccyopPz4vaSxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQnaW50ZXJuYWwtc3Vic2V0Jzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvKFxcWylbXFxzXFxTXSsoPz1cXF0+JCkvLFxuXHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRcdGluc2lkZTogbnVsbCAvLyBzZWUgYmVsb3dcblx0XHRcdH0sXG5cdFx0XHQnc3RyaW5nJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXCJbXlwiXSpcInwnW14nXSonLyxcblx0XHRcdFx0Z3JlZWR5OiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0J3B1bmN0dWF0aW9uJzogL148IXw+JHxbW1xcXV0vLFxuXHRcdFx0J2RvY3R5cGUtdGFnJzogL15ET0NUWVBFLyxcblx0XHRcdCduYW1lJzogL1teXFxzPD4nXCJdKy9cblx0XHR9XG5cdH0sXG5cdCdjZGF0YSc6IC88IVxcW0NEQVRBXFxbW1xcc1xcU10qP11dPi9pLFxuXHQndGFnJzoge1xuXHRcdHBhdHRlcm46IC88XFwvPyg/IVxcZClbXlxccz5cXC89JDwlXSsoPzpcXHMoPzpcXHMqW15cXHM+XFwvPV0rKD86XFxzKj1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiPj1dKyg/PVtcXHM+XSkpfCg/PVtcXHMvPl0pKSkrKT9cXHMqXFwvPz4vLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCd0YWcnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9ePFxcLz9bXlxccz5cXC9dKy8sXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9ePFxcLz8vLFxuXHRcdFx0XHRcdCduYW1lc3BhY2UnOiAvXlteXFxzPlxcLzpdKzovXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQnYXR0ci12YWx1ZSc6IHtcblx0XHRcdFx0cGF0dGVybjogLz1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiPj1dKykvLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHBhdHRlcm46IC9ePS8sXG5cdFx0XHRcdFx0XHRcdGFsaWFzOiAnYXR0ci1lcXVhbHMnXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0L1wifCcvXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J3B1bmN0dWF0aW9uJzogL1xcLz8+Lyxcblx0XHRcdCdhdHRyLW5hbWUnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9bXlxccz5cXC9dKy8sXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCduYW1lc3BhY2UnOiAvXlteXFxzPlxcLzpdKzovXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH1cblx0fSxcblx0J2VudGl0eSc6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvJltcXGRhLXpdezEsOH07L2ksXG5cdFx0XHRhbGlhczogJ25hbWVkLWVudGl0eSdcblx0XHR9LFxuXHRcdC8mI3g/W1xcZGEtZl17MSw4fTsvaVxuXHRdXG59O1xuXG5QcmlzbS5sYW5ndWFnZXMubWFya3VwWyd0YWcnXS5pbnNpZGVbJ2F0dHItdmFsdWUnXS5pbnNpZGVbJ2VudGl0eSddID1cblx0UHJpc20ubGFuZ3VhZ2VzLm1hcmt1cFsnZW50aXR5J107XG5QcmlzbS5sYW5ndWFnZXMubWFya3VwWydkb2N0eXBlJ10uaW5zaWRlWydpbnRlcm5hbC1zdWJzZXQnXS5pbnNpZGUgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuXG4vLyBQbHVnaW4gdG8gbWFrZSBlbnRpdHkgdGl0bGUgc2hvdyB0aGUgcmVhbCBlbnRpdHksIGlkZWEgYnkgUm9tYW4gS29tYXJvdlxuUHJpc20uaG9va3MuYWRkKCd3cmFwJywgZnVuY3Rpb24gKGVudikge1xuXG5cdGlmIChlbnYudHlwZSA9PT0gJ2VudGl0eScpIHtcblx0XHRlbnYuYXR0cmlidXRlc1sndGl0bGUnXSA9IGVudi5jb250ZW50LnJlcGxhY2UoLyZhbXA7LywgJyYnKTtcblx0fVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZywgJ2FkZElubGluZWQnLCB7XG5cdC8qKlxuXHQgKiBBZGRzIGFuIGlubGluZWQgbGFuZ3VhZ2UgdG8gbWFya3VwLlxuXHQgKlxuXHQgKiBBbiBleGFtcGxlIG9mIGFuIGlubGluZWQgbGFuZ3VhZ2UgaXMgQ1NTIHdpdGggYDxzdHlsZT5gIHRhZ3MuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0YWdOYW1lIFRoZSBuYW1lIG9mIHRoZSB0YWcgdGhhdCBjb250YWlucyB0aGUgaW5saW5lZCBsYW5ndWFnZS4gVGhpcyBuYW1lIHdpbGwgYmUgdHJlYXRlZCBhc1xuXHQgKiBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGFuZyBUaGUgbGFuZ3VhZ2Uga2V5LlxuXHQgKiBAZXhhbXBsZVxuXHQgKiBhZGRJbmxpbmVkKCdzdHlsZScsICdjc3MnKTtcblx0ICovXG5cdHZhbHVlOiBmdW5jdGlvbiBhZGRJbmxpbmVkKHRhZ05hbWUsIGxhbmcpIHtcblx0XHR2YXIgaW5jbHVkZWRDZGF0YUluc2lkZSA9IHt9O1xuXHRcdGluY2x1ZGVkQ2RhdGFJbnNpZGVbJ2xhbmd1YWdlLScgKyBsYW5nXSA9IHtcblx0XHRcdHBhdHRlcm46IC8oXjwhXFxbQ0RBVEFcXFspW1xcc1xcU10rPyg/PVxcXVxcXT4kKS9pLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzW2xhbmddXG5cdFx0fTtcblx0XHRpbmNsdWRlZENkYXRhSW5zaWRlWydjZGF0YSddID0gL148IVxcW0NEQVRBXFxbfFxcXVxcXT4kL2k7XG5cblx0XHR2YXIgaW5zaWRlID0ge1xuXHRcdFx0J2luY2x1ZGVkLWNkYXRhJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvPCFcXFtDREFUQVxcW1tcXHNcXFNdKj9cXF1cXF0+L2ksXG5cdFx0XHRcdGluc2lkZTogaW5jbHVkZWRDZGF0YUluc2lkZVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0aW5zaWRlWydsYW5ndWFnZS0nICsgbGFuZ10gPSB7XG5cdFx0XHRwYXR0ZXJuOiAvW1xcc1xcU10rLyxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzW2xhbmddXG5cdFx0fTtcblxuXHRcdHZhciBkZWYgPSB7fTtcblx0XHRkZWZbdGFnTmFtZV0gPSB7XG5cdFx0XHRwYXR0ZXJuOiBSZWdFeHAoLyg8X19bXj5dKj4pKD86PCFcXFtDREFUQVxcWyg/OlteXFxdXXxcXF0oPyFcXF0+KSkqXFxdXFxdPnwoPyE8IVxcW0NEQVRBXFxbKVtcXHNcXFNdKSo/KD89PFxcL19fPikvLnNvdXJjZS5yZXBsYWNlKC9fXy9nLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0YWdOYW1lOyB9KSwgJ2knKSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRpbnNpZGU6IGluc2lkZVxuXHRcdH07XG5cblx0XHRQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAnY2RhdGEnLCBkZWYpO1xuXHR9XG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmh0bWwgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuUHJpc20ubGFuZ3VhZ2VzLm1hdGhtbCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5QcmlzbS5sYW5ndWFnZXMuc3ZnID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblxuUHJpc20ubGFuZ3VhZ2VzLnhtbCA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ21hcmt1cCcsIHt9KTtcblByaXNtLmxhbmd1YWdlcy5zc21sID0gUHJpc20ubGFuZ3VhZ2VzLnhtbDtcblByaXNtLmxhbmd1YWdlcy5hdG9tID0gUHJpc20ubGFuZ3VhZ2VzLnhtbDtcblByaXNtLmxhbmd1YWdlcy5yc3MgPSBQcmlzbS5sYW5ndWFnZXMueG1sO1xuIiwiKGZ1bmN0aW9uICgpIHtcblxuXHRpZiAodHlwZW9mIHNlbGYgPT09ICd1bmRlZmluZWQnIHx8ICFzZWxmLlByaXNtIHx8ICFzZWxmLmRvY3VtZW50KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBsdWdpbiBuYW1lIHdoaWNoIGlzIHVzZWQgYXMgYSBjbGFzcyBuYW1lIGZvciA8cHJlPiB3aGljaCBpcyBhY3RpdmF0aW5nIHRoZSBwbHVnaW5cblx0ICogQHR5cGUge1N0cmluZ31cblx0ICovXG5cdHZhciBQTFVHSU5fTkFNRSA9ICdsaW5lLW51bWJlcnMnO1xuXG5cdC8qKlxuXHQgKiBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCBmb3IgZGV0ZXJtaW5pbmcgbGluZSBicmVha3Ncblx0ICogQHR5cGUge1JlZ0V4cH1cblx0ICovXG5cdHZhciBORVdfTElORV9FWFAgPSAvXFxuKD8hJCkvZztcblxuXG5cdC8qKlxuXHQgKiBHbG9iYWwgZXhwb3J0c1xuXHQgKi9cblx0dmFyIGNvbmZpZyA9IFByaXNtLnBsdWdpbnMubGluZU51bWJlcnMgPSB7XG5cdFx0LyoqXG5cdFx0ICogR2V0IG5vZGUgZm9yIHByb3ZpZGVkIGxpbmUgbnVtYmVyXG5cdFx0ICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IHByZSBlbGVtZW50XG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IG51bWJlciBsaW5lIG51bWJlclxuXHRcdCAqIEByZXR1cm4ge0VsZW1lbnR8dW5kZWZpbmVkfVxuXHRcdCAqL1xuXHRcdGdldExpbmU6IGZ1bmN0aW9uIChlbGVtZW50LCBudW1iZXIpIHtcblx0XHRcdGlmIChlbGVtZW50LnRhZ05hbWUgIT09ICdQUkUnIHx8ICFlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhQTFVHSU5fTkFNRSkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgbGluZU51bWJlclJvd3MgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lLW51bWJlcnMtcm93cycpO1xuXHRcdFx0aWYgKCFsaW5lTnVtYmVyUm93cykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgbGluZU51bWJlclN0YXJ0ID0gcGFyc2VJbnQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhcnQnKSwgMTApIHx8IDE7XG5cdFx0XHR2YXIgbGluZU51bWJlckVuZCA9IGxpbmVOdW1iZXJTdGFydCArIChsaW5lTnVtYmVyUm93cy5jaGlsZHJlbi5sZW5ndGggLSAxKTtcblxuXHRcdFx0aWYgKG51bWJlciA8IGxpbmVOdW1iZXJTdGFydCkge1xuXHRcdFx0XHRudW1iZXIgPSBsaW5lTnVtYmVyU3RhcnQ7XG5cdFx0XHR9XG5cdFx0XHRpZiAobnVtYmVyID4gbGluZU51bWJlckVuZCkge1xuXHRcdFx0XHRudW1iZXIgPSBsaW5lTnVtYmVyRW5kO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgbGluZUluZGV4ID0gbnVtYmVyIC0gbGluZU51bWJlclN0YXJ0O1xuXG5cdFx0XHRyZXR1cm4gbGluZU51bWJlclJvd3MuY2hpbGRyZW5bbGluZUluZGV4XTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmVzaXplcyB0aGUgbGluZSBudW1iZXJzIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogVGhpcyBmdW5jdGlvbiB3aWxsIG5vdCBhZGQgbGluZSBudW1iZXJzLiBJdCB3aWxsIG9ubHkgcmVzaXplIGV4aXN0aW5nIG9uZXMuXG5cdFx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBBIGA8cHJlPmAgZWxlbWVudCB3aXRoIGxpbmUgbnVtYmVycy5cblx0XHQgKiBAcmV0dXJucyB7dm9pZH1cblx0XHQgKi9cblx0XHRyZXNpemU6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRyZXNpemVFbGVtZW50cyhbZWxlbWVudF0pO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBXaGV0aGVyIHRoZSBwbHVnaW4gY2FuIGFzc3VtZSB0aGF0IHRoZSB1bml0cyBmb250IHNpemVzIGFuZCBtYXJnaW5zIGFyZSBub3QgZGVwZW5kZWQgb24gdGhlIHNpemUgb2Zcblx0XHQgKiB0aGUgY3VycmVudCB2aWV3cG9ydC5cblx0XHQgKlxuXHRcdCAqIFNldHRpbmcgdGhpcyB0byBgdHJ1ZWAgd2lsbCBhbGxvdyB0aGUgcGx1Z2luIHRvIGRvIGNlcnRhaW4gb3B0aW1pemF0aW9ucyBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlLlxuXHRcdCAqXG5cdFx0ICogU2V0IHRoaXMgdG8gYGZhbHNlYCBpZiB5b3UgdXNlIGFueSBvZiB0aGUgZm9sbG93aW5nIENTUyB1bml0czogYHZoYCwgYHZ3YCwgYHZtaW5gLCBgdm1heGAuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0XHQgKi9cblx0XHRhc3N1bWVWaWV3cG9ydEluZGVwZW5kZW5jZTogdHJ1ZVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBSZXNpemVzIHRoZSBnaXZlbiBlbGVtZW50cy5cblx0ICpcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfSBlbGVtZW50c1xuXHQgKi9cblx0ZnVuY3Rpb24gcmVzaXplRWxlbWVudHMoZWxlbWVudHMpIHtcblx0XHRlbGVtZW50cyA9IGVsZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAoZSkge1xuXHRcdFx0dmFyIGNvZGVTdHlsZXMgPSBnZXRTdHlsZXMoZSk7XG5cdFx0XHR2YXIgd2hpdGVTcGFjZSA9IGNvZGVTdHlsZXNbJ3doaXRlLXNwYWNlJ107XG5cdFx0XHRyZXR1cm4gd2hpdGVTcGFjZSA9PT0gJ3ByZS13cmFwJyB8fCB3aGl0ZVNwYWNlID09PSAncHJlLWxpbmUnO1xuXHRcdH0pO1xuXG5cdFx0aWYgKGVsZW1lbnRzLmxlbmd0aCA9PSAwKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIGluZm9zID0gZWxlbWVudHMubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHR2YXIgY29kZUVsZW1lbnQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NvZGUnKTtcblx0XHRcdHZhciBsaW5lTnVtYmVyc1dyYXBwZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lLW51bWJlcnMtcm93cycpO1xuXHRcdFx0aWYgKCFjb2RlRWxlbWVudCB8fCAhbGluZU51bWJlcnNXcmFwcGVyKSB7XG5cdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cblx0XHRcdC8qKiBAdHlwZSB7SFRNTEVsZW1lbnR9ICovXG5cdFx0XHR2YXIgbGluZU51bWJlclNpemVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubGluZS1udW1iZXJzLXNpemVyJyk7XG5cdFx0XHR2YXIgY29kZUxpbmVzID0gY29kZUVsZW1lbnQudGV4dENvbnRlbnQuc3BsaXQoTkVXX0xJTkVfRVhQKTtcblxuXHRcdFx0aWYgKCFsaW5lTnVtYmVyU2l6ZXIpIHtcblx0XHRcdFx0bGluZU51bWJlclNpemVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdFx0XHRsaW5lTnVtYmVyU2l6ZXIuY2xhc3NOYW1lID0gJ2xpbmUtbnVtYmVycy1zaXplcic7XG5cblx0XHRcdFx0Y29kZUVsZW1lbnQuYXBwZW5kQ2hpbGQobGluZU51bWJlclNpemVyKTtcblx0XHRcdH1cblxuXHRcdFx0bGluZU51bWJlclNpemVyLmlubmVySFRNTCA9ICcwJztcblx0XHRcdGxpbmVOdW1iZXJTaXplci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuXHRcdFx0dmFyIG9uZUxpbmVySGVpZ2h0ID0gbGluZU51bWJlclNpemVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHRcdGxpbmVOdW1iZXJTaXplci5pbm5lckhUTUwgPSAnJztcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdFx0bGluZXM6IGNvZGVMaW5lcyxcblx0XHRcdFx0bGluZUhlaWdodHM6IFtdLFxuXHRcdFx0XHRvbmVMaW5lckhlaWdodDogb25lTGluZXJIZWlnaHQsXG5cdFx0XHRcdHNpemVyOiBsaW5lTnVtYmVyU2l6ZXIsXG5cdFx0XHR9O1xuXHRcdH0pLmZpbHRlcihCb29sZWFuKTtcblxuXHRcdGluZm9zLmZvckVhY2goZnVuY3Rpb24gKGluZm8pIHtcblx0XHRcdHZhciBsaW5lTnVtYmVyU2l6ZXIgPSBpbmZvLnNpemVyO1xuXHRcdFx0dmFyIGxpbmVzID0gaW5mby5saW5lcztcblx0XHRcdHZhciBsaW5lSGVpZ2h0cyA9IGluZm8ubGluZUhlaWdodHM7XG5cdFx0XHR2YXIgb25lTGluZXJIZWlnaHQgPSBpbmZvLm9uZUxpbmVySGVpZ2h0O1xuXG5cdFx0XHRsaW5lSGVpZ2h0c1tsaW5lcy5sZW5ndGggLSAxXSA9IHVuZGVmaW5lZDtcblx0XHRcdGxpbmVzLmZvckVhY2goZnVuY3Rpb24gKGxpbmUsIGluZGV4KSB7XG5cdFx0XHRcdGlmIChsaW5lICYmIGxpbmUubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdHZhciBlID0gbGluZU51bWJlclNpemVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSk7XG5cdFx0XHRcdFx0ZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRcdFx0XHRlLnRleHRDb250ZW50ID0gbGluZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsaW5lSGVpZ2h0c1tpbmRleF0gPSBvbmVMaW5lckhlaWdodDtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRpbmZvcy5mb3JFYWNoKGZ1bmN0aW9uIChpbmZvKSB7XG5cdFx0XHR2YXIgbGluZU51bWJlclNpemVyID0gaW5mby5zaXplcjtcblx0XHRcdHZhciBsaW5lSGVpZ2h0cyA9IGluZm8ubGluZUhlaWdodHM7XG5cblx0XHRcdHZhciBjaGlsZEluZGV4ID0gMDtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGluZUhlaWdodHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGxpbmVIZWlnaHRzW2ldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRsaW5lSGVpZ2h0c1tpXSA9IGxpbmVOdW1iZXJTaXplci5jaGlsZHJlbltjaGlsZEluZGV4KytdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0aW5mb3MuZm9yRWFjaChmdW5jdGlvbiAoaW5mbykge1xuXHRcdFx0dmFyIGxpbmVOdW1iZXJTaXplciA9IGluZm8uc2l6ZXI7XG5cdFx0XHR2YXIgd3JhcHBlciA9IGluZm8uZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubGluZS1udW1iZXJzLXJvd3MnKTtcblxuXHRcdFx0bGluZU51bWJlclNpemVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRsaW5lTnVtYmVyU2l6ZXIuaW5uZXJIVE1MID0gJyc7XG5cblx0XHRcdGluZm8ubGluZUhlaWdodHMuZm9yRWFjaChmdW5jdGlvbiAoaGVpZ2h0LCBsaW5lTnVtYmVyKSB7XG5cdFx0XHRcdHdyYXBwZXIuY2hpbGRyZW5bbGluZU51bWJlcl0uc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4Jztcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgc3R5bGUgZGVjbGFyYXRpb25zIGZvciB0aGUgZWxlbWVudFxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcblx0ICovXG5cdHZhciBnZXRTdHlsZXMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdGlmICghZWxlbWVudCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlID8gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSA6IChlbGVtZW50LmN1cnJlbnRTdHlsZSB8fCBudWxsKTtcblx0fTtcblxuXHR2YXIgbGFzdFdpZHRoID0gdW5kZWZpbmVkO1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuXHRcdGlmIChjb25maWcuYXNzdW1lVmlld3BvcnRJbmRlcGVuZGVuY2UgJiYgbGFzdFdpZHRoID09PSB3aW5kb3cuaW5uZXJXaWR0aCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRsYXN0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuXHRcdHJlc2l6ZUVsZW1lbnRzKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3ByZS4nICsgUExVR0lOX05BTUUpKSk7XG5cdH0pO1xuXG5cdFByaXNtLmhvb2tzLmFkZCgnY29tcGxldGUnLCBmdW5jdGlvbiAoZW52KSB7XG5cdFx0aWYgKCFlbnYuY29kZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciBjb2RlID0gLyoqIEB0eXBlIHtFbGVtZW50fSAqLyAoZW52LmVsZW1lbnQpO1xuXHRcdHZhciBwcmUgPSAvKiogQHR5cGUge0hUTUxFbGVtZW50fSAqLyAoY29kZS5wYXJlbnROb2RlKTtcblxuXHRcdC8vIHdvcmtzIG9ubHkgZm9yIDxjb2RlPiB3cmFwcGVkIGluc2lkZSA8cHJlPiAobm90IGlubGluZSlcblx0XHRpZiAoIXByZSB8fCAhL3ByZS9pLnRlc3QocHJlLm5vZGVOYW1lKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIEFib3J0IGlmIGxpbmUgbnVtYmVycyBhbHJlYWR5IGV4aXN0c1xuXHRcdGlmIChjb2RlLnF1ZXJ5U2VsZWN0b3IoJy5saW5lLW51bWJlcnMtcm93cycpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gb25seSBhZGQgbGluZSBudW1iZXJzIGlmIDxjb2RlPiBvciBvbmUgb2YgaXRzIGFuY2VzdG9ycyBoYXMgdGhlIGBsaW5lLW51bWJlcnNgIGNsYXNzXG5cdFx0aWYgKCFQcmlzbS51dGlsLmlzQWN0aXZlKGNvZGUsIFBMVUdJTl9OQU1FKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFJlbW92ZSB0aGUgY2xhc3MgJ2xpbmUtbnVtYmVycycgZnJvbSB0aGUgPGNvZGU+XG5cdFx0Y29kZS5jbGFzc0xpc3QucmVtb3ZlKFBMVUdJTl9OQU1FKTtcblx0XHQvLyBBZGQgdGhlIGNsYXNzICdsaW5lLW51bWJlcnMnIHRvIHRoZSA8cHJlPlxuXHRcdHByZS5jbGFzc0xpc3QuYWRkKFBMVUdJTl9OQU1FKTtcblxuXHRcdHZhciBtYXRjaCA9IGVudi5jb2RlLm1hdGNoKE5FV19MSU5FX0VYUCk7XG5cdFx0dmFyIGxpbmVzTnVtID0gbWF0Y2ggPyBtYXRjaC5sZW5ndGggKyAxIDogMTtcblx0XHR2YXIgbGluZU51bWJlcnNXcmFwcGVyO1xuXG5cdFx0dmFyIGxpbmVzID0gbmV3IEFycmF5KGxpbmVzTnVtICsgMSkuam9pbignPHNwYW4+PC9zcGFuPicpO1xuXG5cdFx0bGluZU51bWJlcnNXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdGxpbmVOdW1iZXJzV3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblx0XHRsaW5lTnVtYmVyc1dyYXBwZXIuY2xhc3NOYW1lID0gJ2xpbmUtbnVtYmVycy1yb3dzJztcblx0XHRsaW5lTnVtYmVyc1dyYXBwZXIuaW5uZXJIVE1MID0gbGluZXM7XG5cblx0XHRpZiAocHJlLmhhc0F0dHJpYnV0ZSgnZGF0YS1zdGFydCcpKSB7XG5cdFx0XHRwcmUuc3R5bGUuY291bnRlclJlc2V0ID0gJ2xpbmVudW1iZXIgJyArIChwYXJzZUludChwcmUuZ2V0QXR0cmlidXRlKCdkYXRhLXN0YXJ0JyksIDEwKSAtIDEpO1xuXHRcdH1cblxuXHRcdGVudi5lbGVtZW50LmFwcGVuZENoaWxkKGxpbmVOdW1iZXJzV3JhcHBlcik7XG5cblx0XHRyZXNpemVFbGVtZW50cyhbcHJlXSk7XG5cblx0XHRQcmlzbS5ob29rcy5ydW4oJ2xpbmUtbnVtYmVycycsIGVudik7XG5cdH0pO1xuXG5cdFByaXNtLmhvb2tzLmFkZCgnbGluZS1udW1iZXJzJywgZnVuY3Rpb24gKGVudikge1xuXHRcdGVudi5wbHVnaW5zID0gZW52LnBsdWdpbnMgfHwge307XG5cdFx0ZW52LnBsdWdpbnMubGluZU51bWJlcnMgPSB0cnVlO1xuXHR9KTtcblxufSgpKTtcbiIsImltcG9ydCBhcGkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgICAgICAgIGltcG9ydCBjb250ZW50IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzBdLnVzZVsxXSEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9jdWJlcy5jc3NcIjtcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJpbXBvcnQgYXBpIGZyb20gXCIhLi4vLi4vLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgICAgICAgIGltcG9ydCBjb250ZW50IGZyb20gXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMF0udXNlWzFdIS4uLy4uLy4uL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcHJpc20tbGluZS1udW1iZXJzLmNzc1wiO1xuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsImltcG9ydCBhcGkgZnJvbSBcIiEuLi8uLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1swXS51c2VbMV0hLi4vLi4vc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wcmlzbS1va2FpZGlhLmNzc1wiO1xuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsImltcG9ydCBhcGkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgICAgICAgIGltcG9ydCBjb250ZW50IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzBdLnVzZVsxXSEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiO1xuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsImltcG9ydCBhcGkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgICAgICAgIGltcG9ydCBjb250ZW50IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzFdLnVzZVsxXSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hYm91dC5tb2R1bGUuc2Nzc1wiO1xuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsImltcG9ydCBhcGkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgICAgICAgIGltcG9ydCBjb250ZW50IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzFdLnVzZVsxXSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9sYW5kaW5nLm1vZHVsZS5zY3NzXCI7XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY29udGVudC5sb2NhbHMgfHwge307IiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMV0udXNlWzFdIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25hdmJhci5tb2R1bGUuc2Nzc1wiO1xuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNPbGRJRSA9IGZ1bmN0aW9uIGlzT2xkSUUoKSB7XG4gIHZhciBtZW1vO1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUoKSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3NcbiAgICAgIC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcbiAgICAgIC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcbiAgICAgIC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuICAgICAgLy8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG4gICAgICBtZW1vID0gQm9vbGVhbih3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG59KCk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiBnZXRUYXJnZXQoKSB7XG4gIHZhciBtZW1vID0ge307XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSh0YXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbiAgfTtcbn0oKTtcblxudmFyIHN0eWxlc0luRG9tID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5Eb20ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5Eb21baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzSW5Eb20ucHVzaCh7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IGFkZFN0eWxlKG9iaiwgb3B0aW9ucyksXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHZhciBhdHRyaWJ1dGVzID0gb3B0aW9ucy5hdHRyaWJ1dGVzIHx8IHt9O1xuXG4gIGlmICh0eXBlb2YgYXR0cmlidXRlcy5ub25jZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09ICd1bmRlZmluZWQnID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gICAgaWYgKG5vbmNlKSB7XG4gICAgICBhdHRyaWJ1dGVzLm5vbmNlID0gbm9uY2U7XG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgfSk7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9wdGlvbnMuaW5zZXJ0KHN0eWxlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KG9wdGlvbnMuaW5zZXJ0IHx8ICdoZWFkJyk7XG5cbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgICB9XG5cbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgcmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG52YXIgcmVwbGFjZVRleHQgPSBmdW5jdGlvbiByZXBsYWNlVGV4dCgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdO1xuICByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZShpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG4gIH07XG59KCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmoubWVkaWEgPyBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpLmNvbmNhdChvYmouY3NzLCBcIn1cIikgOiBvYmouY3NzOyAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH1cblxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGUsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzcztcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLnJlbW92ZUF0dHJpYnV0ZSgnbWVkaWEnKTtcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZS5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMDtcblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBzdHlsZTtcbiAgdmFyIHVwZGF0ZTtcbiAgdmFyIHJlbW92ZTtcblxuICBpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcbiAgICBzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cbiAgICByZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuICAgIH07XG4gIH1cblxuICB1cGRhdGUob2JqKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9OyAvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbiAgLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXG4gIGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSAnYm9vbGVhbicpIHtcbiAgICBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcbiAgfVxuXG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmV3TGlzdCkgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5Eb21bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRG9tW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRG9tLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgXCIuL21haW4uY3NzXCI7XHJcbmltcG9ydCBcIi4uL2N1YmVzL2N1YmVzXCI7XHJcbmltcG9ydCBcIi4uL2N1YmVzL2N1YmVzLmNzc1wiO1xyXG5pbXBvcnQgUHJpc20gZnJvbSBcInByaXNtanNcIjtcclxuUHJpc20uaGlnaGxpZ2h0QWxsKCk7XHJcblxyXG5pbXBvcnQgeyByZW5kZXJOYXYgfSBmcm9tIFwiLi9uYXZiYXIvbmF2YmFyXCI7XHJcblxyXG5pbXBvcnQgeyByZW5kZXJMYW5kaW5nIH0gZnJvbSBcIi4vbGFuZGluZy9sYW5kaW5nXCI7XHJcbmltcG9ydCB7IHJlbmRlckFib3V0IH0gZnJvbSBcIi4vYWJvdXQvYWJvdXRcIjtcclxuXHJcbmltcG9ydCBcIi4vYWJvdXQvYWJvdXRcIjtcclxuY29uc3QgZG9jRnJhZyA9IG5ldyBEb2N1bWVudEZyYWdtZW50KCk7XHJcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5ib2R5LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiI3Jvb3RcIik7XHJcbmRvY0ZyYWcuYXBwZW5kQ2hpbGQoYm9keSk7XHJcblxyXG5yZW5kZXJOYXYoZG9jRnJhZyk7XHJcbnJlbmRlckxhbmRpbmcoZG9jRnJhZyk7XHJcbnJlbmRlckFib3V0KGRvY0ZyYWcpO1xyXG5cclxuLy8gcGFzcyBpbiB0aGUgdGFyZ2V0IG5vZGUsIGFzIHdlbGwgYXMgdGhlIG9ic2VydmVyIG9wdGlvbnNcclxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb2NGcmFnKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==