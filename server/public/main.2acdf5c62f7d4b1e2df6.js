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
}

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

var newObserver = function newObserver() {};

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
/* harmony import */ var _projectphotos_playlists_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projectphotos/playlists.png */ "./src/landing/projectphotos/playlists.png");
/* harmony import */ var _projectphotos_portfolio_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projectphotos/portfolio.png */ "./src/landing/projectphotos/portfolio.png");
/* harmony import */ var _projectphotos_readdit_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./projectphotos/readdit.png */ "./src/landing/projectphotos/readdit.png");
/* harmony import */ var _projectphotos_tesla_clone_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./projectphotos/tesla-clone.png */ "./src/landing/projectphotos/tesla-clone.png");
/* harmony import */ var _projectphotos_css3_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./projectphotos/css3.svg */ "./src/landing/projectphotos/css3.svg");
/* harmony import */ var _projectphotos_github_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./projectphotos/github.svg */ "./src/landing/projectphotos/github.svg");
/* harmony import */ var _projectphotos_html5_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./projectphotos/html5.svg */ "./src/landing/projectphotos/html5.svg");
/* harmony import */ var _projectphotos_javascript_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./projectphotos/javascript.svg */ "./src/landing/projectphotos/javascript.svg");
/* harmony import */ var _projectphotos_node_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./projectphotos/node.svg */ "./src/landing/projectphotos/node.svg");
/* harmony import */ var _projectphotos_react_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./projectphotos/react.svg */ "./src/landing/projectphotos/react.svg");













var element = document.createElement("section");
element.classList.add(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default.wrapper);
var techImages = [{
  image: _projectphotos_react_svg__WEBPACK_IMPORTED_MODULE_12__,
  name: "React"
}, {
  image: _projectphotos_javascript_svg__WEBPACK_IMPORTED_MODULE_10__,
  name: "Js ES6"
}, {
  image: _projectphotos_node_svg__WEBPACK_IMPORTED_MODULE_11__,
  name: "Node"
}, {
  image: _projectphotos_html5_svg__WEBPACK_IMPORTED_MODULE_9__,
  name: "Html"
}, {
  image: _projectphotos_css3_svg__WEBPACK_IMPORTED_MODULE_7__,
  name: "Css"
}];
var renderLanding = function renderLanding(fragment) {
  element.innerHTML =
  /*html*/
  "\n<div class=".concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["center-container"], ">\n\n    <div class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default.container, ">\n      <div class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["text-container"], ">\n        <h1 class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["main-title"], ">Hi, I'm <span>Austin</span></h1>\n        <h4 class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default.description, ">\n          Here are some of my projects I've been working on.\n        </h4>\n      </div>\n      <div class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["image-container"], ">\n        <a\n          ref=\"https://github.com/ajl0023/chatApp\"\n          target=\"_blank\"\n          class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], "\n        >\n          <img src=").concat(_projectphotos_chatapp_png__WEBPACK_IMPORTED_MODULE_1__, " class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " />\n        </a>\n        <a\n          href=\"https://github.com/ajl0023/Covid-tracker\"\n          target=\"_blank\"\n          class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], "\n        >\n          <img src=").concat(_projectphotos_covidTracker_png__WEBPACK_IMPORTED_MODULE_2__, " class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " />\n        </a>\n        <a\n          href=\"https://github.com/ajl0023/readit\"\n          target=\"_blank\"\n          class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], "\n        >\n          <img src=").concat(_projectphotos_readdit_png__WEBPACK_IMPORTED_MODULE_5__, " class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " />\n        </a>\n        <a\n          href=\"https://github.com/ajl0023/spotifyPlaylists\"\n          target=\"_blank\"\n          class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], "\n        >\n          <img src=").concat(_projectphotos_playlists_png__WEBPACK_IMPORTED_MODULE_3__, " class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " />\n        </a>\n        <a\n          href=\"https://github.com/ajl0023/tesla-clone\"\n          target=\"_blank\"\n          class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], "\n        >\n          <img src=").concat(_projectphotos_tesla_clone_png__WEBPACK_IMPORTED_MODULE_6__, " class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " />\n        </a>\n        <a\n          href=\"https://github.com/ajl0023/portfolio\"\n          target=\"_blank\"\n          class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], "\n        >\n          <img\n            src=").concat(_projectphotos_portfolio_png__WEBPACK_IMPORTED_MODULE_4__, "\n            class=", "".concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " ").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["portfolio-image"]), "\n          />\n        </a>\n      </div>\n      \n  </div>\n  <div class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["tech-wrapper"], ">\n          <p class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["tech-container-title"], ">\n            Technologies used in these projects\n          </p>\n          <div id='tech-container' class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["tech-icon-container"], ">\n            \n          </div>\n        </div>\n    </div>");
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
	 * This is the most high-level function in Prism’s API.
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
	 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
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

/***/ "./src/landing/projectphotos/github.svg":
/*!**********************************************!*\
  !*** ./src/landing/projectphotos/github.svg ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg  role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title>GitHub icon</title><path d=\"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12\"/></svg>";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL2N1YmVzL2N1YmVzLmpzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vc3JjL2Fib3V0L2Fib3V0LmpzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vc3JjL2xhbmRpbmcvbGFuZGluZy5qcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL3NyYy9uYXZiYXIvbmF2YmFyLmpzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vY3ViZXMvY3ViZXMuY3NzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvcGx1Z2lucy9saW5lLW51bWJlcnMvcHJpc20tbGluZS1udW1iZXJzLmNzcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL25vZGVfbW9kdWxlcy9wcmlzbWpzL3RoZW1lcy9wcmlzbS1va2FpZGlhLmNzcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL3NyYy9tYWluLmNzcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL3NyYy9hYm91dC9hYm91dC5tb2R1bGUuc2NzcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL3NyYy9sYW5kaW5nL2xhbmRpbmcubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9zcmMvbmF2YmFyL25hdmJhci5tb2R1bGUuc2NzcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9ub2RlX21vZHVsZXMvcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNsaWtlLmpzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jb3JlLmpzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jc3MuanMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9ub2RlX21vZHVsZXMvcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmFzY3JpcHQuanMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9ub2RlX21vZHVsZXMvcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLW1hcmt1cC5qcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL25vZGVfbW9kdWxlcy9wcmlzbWpzL3BsdWdpbnMvbGluZS1udW1iZXJzL3ByaXNtLWxpbmUtbnVtYmVycy5qcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL2N1YmVzL2N1YmVzLmNzcz9jY2NjIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvcGx1Z2lucy9saW5lLW51bWJlcnMvcHJpc20tbGluZS1udW1iZXJzLmNzcz81YzJmIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvdGhlbWVzL3ByaXNtLW9rYWlkaWEuY3NzP2ExOGUiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9zcmMvbWFpbi5jc3M/ZDgwNSIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL3NyYy9hYm91dC9hYm91dC5tb2R1bGUuc2Nzcz9hMWZiIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vc3JjL2xhbmRpbmcvbGFuZGluZy5tb2R1bGUuc2Nzcz9mZTM0Iiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vc3JjL25hdmJhci9uYXZiYXIubW9kdWxlLnNjc3M/Yjc5MyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BvcnRmb2xpb3YyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiU3RydXQiLCJyYW5kb20iLCJlIiwidCIsIk1hdGgiLCJhcnJheVJhbmRvbSIsImZsb29yIiwibGVuZ3RoIiwiaW50ZXJwb2xhdGUiLCJuIiwicmFuZ2VQb3NpdGlvbiIsImNsYW1wIiwibWF4IiwibWluIiwicXVlcnlBcnJheSIsImRvY3VtZW50IiwiYm9keSIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwicXVlcnlTZWxlY3RvckFsbCIsInJlYWR5IiwicmVhZHlTdGF0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZWR1Y2VNb3Rpb24iLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsInNldFN0YXRlIiwic3RhdGUiLCJzcGVlZCIsImRpcmVjdGlvbnMiLCJmb3JFYWNoIiwiYXhpcyIsImFicyIsImN1YmVJc0hpZGRlbiIsImxlZnQiLCJwYXJlbnRXaWR0aCIsImhlYWRlcklzSGlkZGVuIiwidGVtcGxhdGUiLCJnZXRFbGVtZW50QnlJZCIsInBhcmVudCIsImdldFBhcmVudFdpZHRoIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJ3aW5kb3ciLCJwYWxldHRlIiwid2hpdGUiLCJjb2xvciIsInNoYWRpbmciLCJvcmFuZ2UiLCJncmVlbiIsInNldEN1YmVTdHlsZXMiLCJjdWJlIiwic2l6ZSIsInRvcCIsIk9iamVjdCIsImFzc2lnbiIsInN0eWxlIiwiaGVpZ2h0IiwicXVlcnlTZWxlY3RvciIsImZpbHRlciIsInJvdW5kIiwib3BhY2l0eSIsImNyZWF0ZUN1YmUiLCJmcmFnbWVudCIsImltcG9ydE5vZGUiLCJjb250ZW50IiwieCIsInkiLCJyZWR1Y2UiLCJvYmplY3QiLCJzaXplcyIsIm0iLCJzaWRlcyIsInNpZGUiLCJjbGFzc05hbWUiLCJoaWRkZW4iLCJyb3RhdGUiLCJib3R0b20iLCJyaWdodCIsImJhY2siLCJ2YWx1ZXMiLCJ4cyIsInMiLCJsIiwieGwiLCJjdWJlcyIsInRpbnQiLCJtYXAiLCJnZXREaXN0YW5jZSIsImdldFJvdGF0aW9uIiwiZGlyZWN0aW9uIiwiZ2V0U2hhZGluZyIsImRpc3RhbmNlIiwiZGFya2VuIiwiZGVsdGEiLCJyYXRpbyIsImFscGhhIiwiYmxlbmQiLCJ2YWx1ZSIsImluZGV4IiwiciIsImciLCJiIiwic2hvdWxkSGlkZSIsInJvdGF0ZVgiLCJ1cGRhdGVTaWRlcyIsImFuaW1hdGUiLCJ0cmFuc2Zvcm0iLCJiYWNrZ3JvdW5kQ29sb3IiLCJ0aWNrIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicGFyYWxsYXhMaW1pdCIsInNjcm9sbCIsInNjcm9sbFkiLCJjb250YWluZXIiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJzdGFydCIsInJlcXVlc3RJZGxlQ2FsbGJhY2siLCJlbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwibmV3T2JzZXJ2ZXIiLCJvbmxvYWQiLCJvcHRpb25zIiwidGhyZXNob2xkIiwibGFwdG9wIiwidHJhY2tTdmciLCJlbnRyaWVzIiwiaXNJbnRlcnNlY3RpbmciLCJzZXJ2ZXJBbmltYXRpb24iLCJpIiwidHh0Iiwic2VydmVyIiwiaW5uZXJIVE1MIiwiY2hhckF0IiwidGltZW91dCIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJjbGllbnRBbmltYXRpb24iLCJQcmlzbSIsImNsaWVudCIsIm9ic2VydmVyIiwiZGlzY29ubmVjdCIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSIsInJlbmRlckFib3V0Iiwicm9vdCIsInRlY2hJbWFnZXMiLCJpbWFnZSIsIlJlYWN0SWNvbiIsIm5hbWUiLCJKc0ljb24iLCJOb2RlSWNvbiIsIkh0bWxJY29uIiwiQ3NzSWNvbiIsInJlbmRlckxhbmRpbmciLCJjaGF0YXBwIiwiY292aWRUcmFja2VyIiwicmVhZGRpdCIsInBsYXlsaXN0cyIsInRlc2xhIiwicG9ydGZvbGlvIiwidGVjaENvbnRhaW5lciIsIml0ZW0iLCJpY29uIiwicmVuZGVyTmF2IiwiZG9jRnJhZyIsIm5hdkNvbnRhaW5lciIsIkdIbG9nbyIsIkdNTG9nbyIsIkxJbG9nbyIsIkRvY3VtZW50RnJhZ21lbnQiLCJzZXRBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLEtBQUssR0FBRztBQUNWQyxRQUFNLEVBQUUsZ0JBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQjtBQUN0QixXQUFPQyxJQUFJLENBQUNILE1BQUwsTUFBaUJFLENBQUMsR0FBR0QsQ0FBckIsSUFBMEJBLENBQWpDO0FBQ0QsR0FIUztBQUlWRyxhQUFXLEVBQUUscUJBQVVILENBQVYsRUFBYTtBQUN4QixXQUFPQSxDQUFDLENBQUNFLElBQUksQ0FBQ0UsS0FBTCxDQUFXRixJQUFJLENBQUNILE1BQUwsS0FBZ0JDLENBQUMsQ0FBQ0ssTUFBN0IsQ0FBRCxDQUFSO0FBQ0QsR0FOUztBQU9WQyxhQUFXLEVBQUUscUJBQVVOLENBQVYsRUFBYUMsQ0FBYixFQUFnQk0sQ0FBaEIsRUFBbUI7QUFDOUIs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TUFBNk0sbUNBQW1DLEdBQUcsT0FBTyxrR0FBa0csV0FBVyxXQUFXLEtBQUssS0FBSyxVQUFVLFdBQVcsV0FBVyxVQUFVLE1BQU0sS0FBSyxXQUFXLFVBQVUsV0FBVyxVQUFVLFVBQVUsV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLEtBQUssS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLEtBQUssVUFBVSxVQUFVLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxLQUFLLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLEtBQUssS0FBSyxLQUFLLFVBQVUsVUFBVSxXQUFXLEtBQUssS0FBSyxLQUFLLFVBQVUsVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLEtBQUssS0FBSyxXQUFXLFdBQVcsVUFBVSxVQUFVLEtBQUssS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLEtBQUssS0FBSyxVQUFVLFdBQVcsS0FBSyxLQUFLLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxLQUFLLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxLQUFLLEtBQUssS0FBSyxVQUFVLE1BQU0sS0FBSyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsS0FBSyxLQUFLLEtBQUssV0FBVyxNQUFNLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsS0FBSyxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLE1BQU0sVUFBVSxNQUFNLEtBQUssV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxLQUFLLFVBQVUsV0FBVyxXQUFXLFdBQVcsVUFBVSxLQUFLLEtBQUssV0FBVyxVQUFVLFVBQVUsS0FBSyxLQUFLLEtBQUssVUFBVSxXQUFXLEtBQUssS0FBSyxLQUFLLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxVQUFVLFVBQVUsV0FBVyxLQUFLLEtBQUssVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssS0FBSyxVQUFVLFVBQVUsS0FBSyxLQUFLLEtBQUssV0FBVyxVQUFVLFVBQVUsV0FBVyxLQUFLLEtBQUssV0FBVyxxQ0FBcUMsbUNBQW1DLG1FQUFtRSxLQUFLLE9BQU8sZ0JBQWdCLHVCQUF1Qiw2QkFBNkIsaUJBQWlCLEtBQUssY0FBYyxvREFBb0QscUJBQXFCLHdCQUF3QixvQkFBb0Isb0JBQW9CLDBCQUEwQix5QkFBeUIscUNBQXFDLHlCQUF5QixtQ0FBbUMsMkJBQTJCLFNBQVMsb0JBQW9CLDBCQUEwQiwyQkFBMkIsb0JBQW9CLHFDQUFxQyxtQ0FBbUMsV0FBVyx3QkFBd0Isb0JBQW9CLGtDQUFrQyx3QkFBd0Isa0NBQWtDLGlDQUFpQyw4QkFBOEIsMkJBQTJCLHVCQUF1QiwwQkFBMEIseUJBQXlCLGdDQUFnQyx1Q0FBdUMsMEJBQTBCLDJCQUEyQixpQ0FBaUMsYUFBYSxnQ0FBZ0MsZ0NBQWdDLGtCQUFrQix5QkFBeUIsNEJBQTRCLGlDQUFpQywyQkFBMkIsZ0NBQWdDLGdVQUFnVSxhQUFhLHlCQUF5QiwrQkFBK0Isa0NBQWtDLDhCQUE4Qiw2QkFBNkIsMENBQTBDLGdDQUFnQyxlQUFlLHlDQUF5Qyw0QkFBNEIsbUNBQW1DLGVBQWUseUNBQXlDLGdDQUFnQyxlQUFlLGFBQWEsMEJBQTBCLDJCQUEyQixrQ0FBa0MsOEJBQThCLDBDQUEwQyxnQ0FBZ0MsZUFBZSx5Q0FBeUMsZUFBZSwrQkFBK0IsK0JBQStCLGFBQWEsV0FBVyw0QkFBNEIsMEJBQTBCLHdCQUF3Qix1Q0FBdUMsa0NBQWtDLGFBQWEsNEJBQTRCLHFCQUFxQixxQ0FBcUMscUNBQXFDLGFBQWEsZ0NBQWdDLHlDQUF5QyxnQ0FBZ0MsZUFBZSx5Q0FBeUMsOEJBQThCLGVBQWUseUJBQXlCLDhCQUE4QixlQUFlLDRCQUE0QixzQ0FBc0MsOEJBQThCLDhCQUE4Qiw2VEFBNlQsaUNBQWlDLDBCQUEwQiwrQkFBK0IsaUNBQWlDLHVCQUF1QixxREFBcUQsMkJBQTJCLHFDQUFxQyxpREFBaUQseUJBQXlCLDRCQUE0QiwwQkFBMEIsMkJBQTJCLCtCQUErQiw4QkFBOEIsK0JBQStCLGlDQUFpQyxpQkFBaUIsZ0NBQWdDLCtCQUErQixpQkFBaUIsZUFBZSxnQ0FBZ0Msd0NBQXdDLGVBQWUsOEJBQThCLCtCQUErQixrQ0FBa0MsNkJBQTZCLDRCQUE0Qiw2QkFBNkIsa0NBQWtDLGVBQWUsYUFBYSxXQUFXLFNBQVMsT0FBTyxLQUFLLG1CQUFtQixvQkFBb0IsOEJBQThCLDZCQUE2Qix1QkFBdUIsZ0JBQWdCLDZCQUE2Qiw2REFBNkQsd0JBQXdCLHFCQUFxQixtQ0FBbUMsc0JBQXNCLDZCQUE2QixTQUFTLE9BQU8sNEJBQTRCLHNCQUFzQiwwUUFBMFEsOENBQThDLHFCQUFxQiw4QkFBOEIsa0JBQWtCLG9CQUFvQixzQ0FBc0MseUJBQXlCLHdCQUF3QixxQ0FBcUMsb0JBQW9CLGlDQUFpQyw2QkFBNkIsOEJBQThCLHlDQUF5QyxxQ0FBcUMsdUJBQXVCLHlCQUF5QixXQUFXLHVCQUF1QiwrQkFBK0IsdUJBQXVCLHlCQUF5QixnQ0FBZ0MsV0FBVyxzQkFBc0IsMkNBQTJDLFdBQVcsU0FBUyxPQUFPLEtBQUssdUJBQXVCO0FBQ2w1a0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJ2QztBQUN5SDtBQUM3QjtBQUM1Riw4QkFBOEIsbUZBQTJCLENBQUMsd0dBQXFDO0FBQy9GO0FBQ0EsdUZBQXVGLG9CQUFvQixrQkFBa0Isd0JBQXdCLDRCQUE0QixXQUFXLFlBQVksY0FBYyxlQUFlLGtCQUFrQixHQUFHLDhCQUE4QixpREFBaUQsa0JBQWtCLGdCQUFnQixtQkFBbUIsMEJBQTBCLGlCQUFpQixLQUFLLEdBQUcsd0dBQXdHLGtCQUFrQixjQUFjLDJCQUEyQix1QkFBdUIsd0JBQXdCLEdBQUcsOEJBQThCLDBHQUEwRywwQkFBMEIsS0FBSyxHQUFHLHVKQUF1SixtQ0FBbUMsZ0JBQWdCLG9CQUFvQixpQkFBaUIsR0FBRyxpQ0FBaUMseUpBQXlKLGtCQUFrQixLQUFLLEdBQUcsNkpBQTZKLGdCQUFnQixHQUFHLDhGQUE4RixnQkFBZ0IsdUJBQXVCLDBDQUEwQyxlQUFlLFlBQVksYUFBYSxrQkFBa0IsbUJBQW1CLGVBQWUsR0FBRyxPQUFPLGdHQUFnRyxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxLQUFLLEtBQUssS0FBSyxVQUFVLFVBQVUsVUFBVSxXQUFXLFVBQVUsS0FBSyxLQUFLLEtBQUssVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLEtBQUssS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLEtBQUssV0FBVyxVQUFVLFVBQVUsVUFBVSxLQUFLLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLHFDQUFxQyxzQkFBc0Isb0JBQW9CLDBCQUEwQiw4QkFBOEIsYUFBYSxjQUFjLGdCQUFnQixpQkFBaUIsb0JBQW9CLGtDQUFrQyxvQkFBb0Isa0JBQWtCLHFCQUFxQiw0QkFBNEIsbUJBQW1CLE9BQU8sK0JBQStCLG9DQUFvQyw4QkFBOEIsU0FBUyxzQkFBc0Isa0JBQWtCLCtCQUErQiwyQkFBMkIsNEJBQTRCLHVCQUF1Qix5Q0FBeUMsc0JBQXNCLDBCQUEwQix1QkFBdUIseUNBQXlDLHdCQUF3QixXQUFXLG1CQUFtQix3QkFBd0IsV0FBVyxTQUFTLE9BQU8scUJBQXFCLG9CQUFvQiwyQkFBMkIsOENBQThDLG1CQUFtQixnQkFBZ0IsaUJBQWlCLHNCQUFzQix1QkFBdUIsbUJBQW1CLE9BQU8sS0FBSyx1QkFBdUI7QUFDMzFHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7OztBQ2IxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDLHFCQUFxQjtBQUNqRTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxxQkFBcUIsaUJBQWlCO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IscUJBQXFCO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNqRWE7O0FBRWIsaUNBQWlDLDJIQUEySDs7QUFFNUosNkJBQTZCLGtLQUFrSzs7QUFFL0wsaURBQWlELGdCQUFnQixnRUFBZ0Usd0RBQXdELDZEQUE2RCxzREFBc0Qsa0hBQWtIOztBQUU5WixzQ0FBc0MsdURBQXVELHVDQUF1QyxTQUFTLE9BQU8sa0JBQWtCLEVBQUUsYUFBYTs7QUFFckwsd0NBQXdDLGdGQUFnRixlQUFlLGVBQWUsZ0JBQWdCLG9CQUFvQixNQUFNLDBDQUEwQywrQkFBK0IsYUFBYSxxQkFBcUIsbUNBQW1DLEVBQUUsRUFBRSxjQUFjLFdBQVcsVUFBVSxFQUFFLFVBQVUsTUFBTSxpREFBaUQsRUFBRSxVQUFVLGtCQUFrQixFQUFFLEVBQUUsYUFBYTs7QUFFdmUsK0JBQStCLG9DQUFvQzs7QUFFbkU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxFOzs7Ozs7Ozs7OztBQy9CYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIOztBQUVBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7Ozs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixJQUFJO0FBQ3hCOzs7Ozs7Ozs7OztBQzlCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSwrRUFBK0UseUJBQXlCO0FBQ3hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKLHNDQUFzQyxzQkFBc0I7QUFDNUQ7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGFBQWEsSUFBSTtBQUNqQixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0Msb0JBQW9CO0FBQzVEO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEVBQUU7QUFDZixhQUFhLG9CQUFvQjtBQUNqQyxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isb0JBQW9CLE9BQU87QUFDbkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsSUFBSTs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLE1BQU0sZUFBZSxJQUFJO0FBQzFDO0FBQ0EsTUFBTTs7QUFFTix1QkFBdUIsSUFBSTs7QUFFM0I7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLElBQUk7QUFDMUI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQixlQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsTUFBTTtBQUMzQjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RSxNQUFNO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsb0JBQW9CO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsSUFBSTtBQUNqQztBQUNBLGNBQWMsUUFBUTtBQUN0Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUYsWUFBWTs7QUFFWjtBQUNBO0FBQ0EsbUZBQW1GLDZCQUE2QjtBQUNoSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUSwyQkFBMkIsOEJBQThCO0FBQzdFLFlBQVksa0JBQWtCLHdCQUF3Qiw4QkFBOEI7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEtBQUssNkJBQTZCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDZCQUE2QjtBQUNsRDtBQUNBLFlBQVksV0FBVztBQUN2QixZQUFZLFFBQVE7QUFDcEIsWUFBWSxrQkFBa0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLDBCQUEwQiw2QkFBNkI7QUFDdkQ7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHNCQUFzQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGtCQUFrQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixZQUFZO0FBQ3BDO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBLGNBQWMsWUFBWTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELGNBQWM7QUFDaEU7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsb0JBQW9CO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEIsMkJBQTJCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDhDQUE4Qzs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPLFdBQVc7QUFDN0IsV0FBVyxxQkFBcUIsY0FBYztBQUM5QyxXQUFXLGdCQUFnQjtBQUMzQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxjQUFjO0FBQzdEO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEMsa0JBQWtCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsc0JBQXNCO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixZQUFZO0FBQ25DO0FBQ0EsV0FBVyw2QkFBNkI7QUFDeEMsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esc0ZBQXNGO0FBQ3RGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFFBQVE7QUFDbkIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLDJCQUEyQjtBQUN0QyxXQUFXLElBQUk7QUFDZixXQUFXLCtCQUErQjtBQUMxQyxXQUFXLE9BQU87QUFDbEIsV0FBVyxlQUFlO0FBQzFCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckIsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixxQkFBcUI7QUFDdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLE9BQU87QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdCQUF3QjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWMsRUFBRTtBQUNoQixjQUFjLHlCQUF5QjtBQUN2QyxjQUFjLHlCQUF5QjtBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksa0JBQWtCO0FBQzlCLGFBQWE7QUFDYixZQUFZLGtCQUFrQjtBQUM5QixhQUFhO0FBQ2I7O0FBRUEsWUFBWSxrQkFBa0I7QUFDOUI7QUFDQSxZQUFZLGtCQUFrQjtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLGtCQUFrQjtBQUM3QixXQUFXLEVBQUU7QUFDYixhQUFhLGtCQUFrQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxrQkFBa0I7QUFDN0IsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlDQUFpQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRCxJQUFJLEtBQTZCO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLHFCQUFNO0FBQ2pCLENBQUMscUJBQU07QUFDUDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQixjQUFjLFFBQVE7QUFDdEI7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxnQkFBZ0I7QUFDOUIsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLG9CQUFvQjtBQUMvQixhQUFhO0FBQ2I7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzFxQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGNBQWMsUUFBUSxTQUFTO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILDBCQUEwQixZQUFZLG9CQUFvQixvQ0FBb0M7QUFDOUY7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxDQUFDOzs7Ozs7Ozs7OztBQ2pGRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRkFBbUYsRUFBRTtBQUNyRixDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSw2SEFBNkgsSUFBSSxrREFBa0QsRUFBRTtBQUNyTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHVmQUF1ZjtBQUN2ZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsNEJBQTRCLE9BQU8sR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxPQUFPO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxnQ0FBZ0MsRUFBRSxNQUFNLE9BQU8sR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztBQUN4RTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsRUFBRTtBQUN0QjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ3BHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLHNCQUFzQixLQUFLO0FBQzNCO0FBQ0EsR0FBRztBQUNILGVBQWUsS0FBSztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOElBQThJLGdCQUFnQixFQUFFO0FBQ2hLO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2pJQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsT0FBTztBQUNwQixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsWUFBWTtBQUN6QixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGNBQWM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsWUFBWTtBQUMxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLFFBQVE7QUFDaEMsdUJBQXVCLFlBQVk7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUYsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RQd0Y7QUFDekYsWUFBMko7O0FBRTNKOztBQUVBO0FBQ0E7O0FBRUEsYUFBYSwwR0FBRyxDQUFDLGdKQUFPOzs7O0FBSXhCLGlFQUFlLHVKQUFjLE1BQU0sRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWitDO0FBQ2xGLFlBQTBKOztBQUUxSjs7QUFFQTtBQUNBOztBQUVBLGFBQWEsNkZBQUcsQ0FBQyxtSUFBTzs7OztBQUl4QixpRUFBZSwwSUFBYyxNQUFNLEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1o0QztBQUMvRSxZQUErSTs7QUFFL0k7O0FBRUE7QUFDQTs7QUFFQSxhQUFhLDZGQUFHLENBQUMsOEhBQU87Ozs7QUFJeEIsaUVBQWUscUlBQWMsTUFBTSxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNac0Q7QUFDekYsWUFBMEo7O0FBRTFKOztBQUVBO0FBQ0E7O0FBRUEsYUFBYSwwR0FBRyxDQUFDLCtJQUFPOzs7O0FBSXhCLGlFQUFlLHNKQUFjLE1BQU0sRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWnlEO0FBQzVGLFlBQXlLOztBQUV6Szs7QUFFQTtBQUNBOztBQUVBLGFBQWEsMEdBQUcsQ0FBQyx3SkFBTzs7OztBQUl4QixpRUFBZSwrSkFBYyxNQUFNLEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1p5RDtBQUM1RixZQUEySzs7QUFFM0s7O0FBRUE7QUFDQTs7QUFFQSxhQUFhLDBHQUFHLENBQUMsMEpBQU87Ozs7QUFJeEIsaUVBQWUsaUtBQWMsTUFBTSxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaeUQ7QUFDNUYsWUFBMEs7O0FBRTFLOztBQUVBO0FBQ0E7O0FBRUEsYUFBYSwwR0FBRyxDQUFDLHlKQUFPOzs7O0FBSXhCLGlFQUFlLGdLQUFjLE1BQU0sRTs7Ozs7Ozs7Ozs7QUNadEI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RDs7QUFFdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLHdCQUF3QjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7O0FBRW5GO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLHFFQUFxRSxxQkFBcUIsYUFBYTs7QUFFdkc7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxHQUFHOztBQUVIOzs7QUFHQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLDRCQUE0QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQkFBb0IsNkJBQTZCO0FBQ2pEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDNVFBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxnQ0FBZ0MsWUFBWTtXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7V0FDQSxDQUFDLEk7Ozs7O1dDUEQsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FBRUE1QixpRkFBQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0EsSUFBTTJCLE9BQU8sR0FBRyxJQUFJSyxnQkFBSixFQUFoQjtBQUNBLElBQU05SixJQUFJLEdBQUdELFFBQVEsQ0FBQ3NHLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNBckcsSUFBSSxDQUFDK0osWUFBTCxDQUFrQixJQUFsQixFQUF3QixPQUF4QjtBQUNBTixPQUFPLENBQUNuRCxXQUFSLENBQW9CdEcsSUFBcEI7QUFFQXdKLDBEQUFTLENBQUNDLE9BQUQsQ0FBVDtBQUNBWCxnRUFBYSxDQUFDVyxPQUFELENBQWI7QUFDQXJCLDBEQUFXLENBQUNxQixPQUFELENBQVgsQyxDQUVBOztBQUNBMUosUUFBUSxDQUFDQyxJQUFULENBQWNzRyxXQUFkLENBQTBCbUQsT0FBMUIsRSIsImZpbGUiOiJtYWluLjJhY2RmNWM2MmY3ZDRiMWUyZGY2LmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IFN0cnV0ID0ge1xyXG4gIHJhbmRvbTogZnVuY3Rpb24gKGUsIHQpIHtcclxuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogKHQgLSBlKSArIGU7XHJcbiAgfSxcclxuICBhcnJheVJhbmRvbTogZnVuY3Rpb24gKGUpIHtcclxuICAgIHJldHVybiBlW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGUubGVuZ3RoKV07XHJcbiAgfSxcclxuICBpbnRlcnBvbGF0ZTogZnVuY3Rpb24gKGUsIHQsIG4pIHtcclxuICAgIHJldHVybiBlICogKDEgLSBuKSArIHQgKiBuO1xyXG4gIH0sXHJcbiAgcmFuZ2VQb3NpdGlvbjogZnVuY3Rpb24gKGUsIHQsIG4pIHtcclxuICAgIHJldHVybiAobiAtIGUpIC8gKHQgLSBlKTtcclxuICB9LFxyXG4gIGNsYW1wOiBmdW5jdGlvbiAoZSwgdCwgbikge1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKGUsIG4pLCB0KTtcclxuICB9LFxyXG4gIHF1ZXJ5QXJyYXk6IGZ1bmN0aW9uIChlLCB0KSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0IHx8ICh0ID0gZG9jdW1lbnQuYm9keSksXHJcbiAgICAgIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHQucXVlcnlTZWxlY3RvckFsbChlKSlcclxuICAgICk7XHJcbiAgfSxcclxuICByZWFkeTogZnVuY3Rpb24gKGUpIHtcclxuICAgIGRvY3VtZW50LnJlYWR5U3RhdGUgPT0gXCJjb21wbGV0ZVwiXHJcbiAgICAgID8gZSgpXHJcbiAgICAgIDogZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZSk7XHJcbiAgfSxcclxufTtcclxuY29uc3QgcmVkdWNlTW90aW9uID0gbWF0Y2hNZWRpYShcIihwcmVmZXJzLXJlZHVjZWQtbW90aW9uKVwiKS5tYXRjaGVzO1xyXG5cclxue1xyXG4gIC8vID09PT09PT1cclxuICAvLyBoZWxwZXJzXHJcbiAgLy8gPT09PT09PVxyXG5cclxuICBjb25zdCBzZXRTdGF0ZSA9IChzdGF0ZSwgc3BlZWQpID0+XHJcbiAgICBkaXJlY3Rpb25zLmZvckVhY2goKGF4aXMpID0+IHtcclxuICAgICAgc3RhdGVbYXhpc10gKz0gc3BlZWRbYXhpc107XHJcbiAgICAgIGlmIChNYXRoLmFicyhzdGF0ZVtheGlzXSkgPCAzNjApIHJldHVybjtcclxuICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoc3RhdGVbYXhpc10sIDM2MCk7XHJcbiAgICAgIGNvbnN0IG1pbiA9IG1heCA9PSAzNjAgPyBNYXRoLmFicyhzdGF0ZVtheGlzXSkgOiAzNjA7XHJcbiAgICAgIHN0YXRlW2F4aXNdID0gbWF4IC0gbWluO1xyXG4gICAgfSk7XHJcblxyXG4gIGNvbnN0IGN1YmVJc0hpZGRlbiA9IChsZWZ0KSA9PiBsZWZ0ID4gcGFyZW50V2lkdGggKyAzMDtcclxuXHJcbiAgLy8gPT09PT09PT09PT09PT09PT1cclxuICAvLyBzaGFyZWQgcmVmZXJlbmNlc1xyXG4gIC8vID09PT09PT09PT09PT09PT09XHJcblxyXG4gIGxldCBoZWFkZXJJc0hpZGRlbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3ViZS10ZW1wbGF0ZVwiKTtcclxuXHJcbiAgY29uc3QgcGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZWFkZXItaGVyb1wiKTtcclxuICBjb25zdCBnZXRQYXJlbnRXaWR0aCA9ICgpID0+IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcclxuICBsZXQgcGFyZW50V2lkdGggPSBnZXRQYXJlbnRXaWR0aCgpO1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IChwYXJlbnRXaWR0aCA9IGdldFBhcmVudFdpZHRoKCkpKTtcclxuXHJcbiAgY29uc3QgZGlyZWN0aW9ucyA9IFtcInhcIiwgXCJ5XCJdO1xyXG5cclxuICBjb25zdCBwYWxldHRlID0ge1xyXG4gICAgd2hpdGU6IHtcclxuICAgICAgY29sb3I6IFsxMzEsIDk2LCAyNTVdLFxyXG4gICAgICBzaGFkaW5nOiBbMTYwLCAxOTAsIDIxOF0sXHJcbiAgICB9LFxyXG4gICAgb3JhbmdlOiB7XHJcbiAgICAgIGNvbG9yOiBbMjU1LCAyNTAsIDIzMF0sXHJcbiAgICAgIHNoYWRpbmc6IFsyNTUsIDEyMCwgNTBdLFxyXG4gICAgfSxcclxuICAgIGdyZWVuOiB7XHJcbiAgICAgIGNvbG9yOiBbNDYsIDI1NSwgMjA0XSxcclxuICAgICAgc2hhZGluZzogWzAsIDIxMSwgMTM2XSxcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgLy8gPT09PT09PT09PT09PT1cclxuICAvLyBjdWJlIGluc3RhbmNlc1xyXG4gIC8vID09PT09PT09PT09PT09XHJcblxyXG4gIGNvbnN0IHNldEN1YmVTdHlsZXMgPSAoeyBjdWJlLCBzaXplLCBsZWZ0LCB0b3AgfSkgPT4ge1xyXG4gICAgT2JqZWN0LmFzc2lnbihjdWJlLnN0eWxlLCB7XHJcbiAgICAgIHdpZHRoOiBgJHtzaXplfXB4YCxcclxuICAgICAgaGVpZ2h0OiBgJHtzaXplfXB4YCxcclxuICAgICAgbGVmdDogYCR7bGVmdH1weGAsXHJcbiAgICAgIHRvcDogYCR7dG9wfXB4YCxcclxuICAgIH0pO1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24oY3ViZS5xdWVyeVNlbGVjdG9yKFwiLnNoYWRvd1wiKS5zdHlsZSwge1xyXG4gICAgICBmaWx0ZXI6IGBibHVyKCR7TWF0aC5yb3VuZChzaXplICogMC42KX1weClgLFxyXG4gICAgICBvcGFjaXR5OiBNYXRoLm1pbihzaXplIC8gMTIwLCAwLjQpLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY3JlYXRlQ3ViZSA9IChzaXplKSA9PiB7XHJcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUuY29udGVudCwgdHJ1ZSk7XHJcbiAgICBjb25zdCBjdWJlID0gZnJhZ21lbnQucXVlcnlTZWxlY3RvcihcIi5jdWJlXCIpO1xyXG5cclxuICAgIGNvbnN0IHN0YXRlID0ge1xyXG4gICAgICB4OiAwLFxyXG4gICAgICB5OiAwLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzcGVlZCA9IGRpcmVjdGlvbnMucmVkdWNlKChvYmplY3QsIGF4aXMpID0+IHtcclxuICAgICAgY29uc3QgbWF4ID0gc2l6ZSA+IHNpemVzLm0gPyAwLjMgOiAwLjY7XHJcbiAgICAgIG9iamVjdFtheGlzXSA9IFN0cnV0LnJhbmRvbSgtbWF4LCBtYXgpO1xyXG4gICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgfSwge30pO1xyXG5cclxuICAgIGNvbnN0IHNpZGVzID0gU3RydXQucXVlcnlBcnJheShcIi5zaWRlcyBkaXZcIiwgY3ViZSkucmVkdWNlKFxyXG4gICAgICAob2JqZWN0LCBzaWRlKSA9PiB7XHJcbiAgICAgICAgb2JqZWN0W3NpZGUuY2xhc3NOYW1lXSA9IHtcclxuICAgICAgICAgIHNpZGUsXHJcbiAgICAgICAgICBoaWRkZW46IGZhbHNlLFxyXG4gICAgICAgICAgcm90YXRlOiB7XHJcbiAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgICAgfSxcclxuICAgICAge31cclxuICAgICk7XHJcblxyXG4gICAgc2lkZXMudG9wLnJvdGF0ZS54ID0gOTA7XHJcbiAgICBzaWRlcy5ib3R0b20ucm90YXRlLnggPSAtOTA7XHJcbiAgICBzaWRlcy5sZWZ0LnJvdGF0ZS55ID0gLTkwO1xyXG4gICAgc2lkZXMucmlnaHQucm90YXRlLnkgPSA5MDtcclxuICAgIHNpZGVzLmJhY2sucm90YXRlLnkgPSAtMTgwO1xyXG5cclxuICAgIHJldHVybiB7IGZyYWdtZW50LCBjdWJlLCBzdGF0ZSwgc3BlZWQsIHNpZGVzOiBPYmplY3QudmFsdWVzKHNpZGVzKSB9O1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNpemVzID0ge1xyXG4gICAgeHM6IDE1LFxyXG4gICAgczogMjUsXHJcbiAgICBtOiA0MCxcclxuICAgIGw6IDEwMCxcclxuICAgIHhsOiAxMjAsXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY3ViZXMgPSBbXHJcbiAgICB7XHJcbiAgICAgIHRpbnQ6IHBhbGV0dGUuZ3JlZW4sXHJcbiAgICAgIHNpemU6IHNpemVzLnhsLFxyXG4gICAgICBib3R0b206IDAsXHJcbiAgICAgIHJpZ2h0OiAwLFxyXG4gICAgfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS5ncmVlbixcclxuICAgIC8vICAgc2l6ZTogc2l6ZXMueHMsXHJcbiAgICAvLyAgIGxlZnQ6IDM1LFxyXG4gICAgLy8gICB0b3A6IDQ2NSxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUud2hpdGUsXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLnMsXHJcbiAgICAvLyAgIGxlZnQ6IDU1LFxyXG4gICAgLy8gICB0b3A6IDQxNSxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUud2hpdGUsXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLnhsLFxyXG4gICAgLy8gICBsZWZ0OiAxNDAsXHJcbiAgICAvLyAgIHRvcDogNDAwLFxyXG4gICAgLy8gfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS53aGl0ZSxcclxuICAgIC8vICAgc2l6ZTogc2l6ZXMubSxcclxuICAgIC8vICAgbGVmdDogNDIwLFxyXG4gICAgLy8gICB0b3A6IDE1NSxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUuZ3JlZW4sXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLnhzLFxyXG4gICAgLy8gICBsZWZ0OiA0NDAsXHJcbiAgICAvLyAgIHRvcDogMjgwLFxyXG4gICAgLy8gfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS5vcmFuZ2UsXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLnMsXHJcbiAgICAvLyAgIGxlZnQ6IDQ4MCxcclxuICAgIC8vICAgdG9wOiAyMjgsXHJcbiAgICAvLyB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICB0aW50OiBwYWxldHRlLndoaXRlLFxyXG4gICAgLy8gICBzaXplOiBzaXplcy5sLFxyXG4gICAgLy8gICBsZWZ0OiA1ODAsXHJcbiAgICAvLyAgIHRvcDogMjU1LFxyXG4gICAgLy8gfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS5ncmVlbixcclxuICAgIC8vICAgc2l6ZTogc2l6ZXMucyxcclxuICAgIC8vICAgbGVmdDogNzgwLFxyXG4gICAgLy8gICB0b3A6IDMyMCxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUud2hpdGUsXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLnhsLFxyXG4gICAgLy8gICBsZWZ0OiA3ODAsXHJcbiAgICAvLyAgIHRvcDogMTIwLFxyXG4gICAgLy8gfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS5vcmFuZ2UsXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLmwsXHJcbiAgICAvLyAgIGxlZnQ6IDkwMCxcclxuICAgIC8vICAgdG9wOiAzMTAsXHJcbiAgICAvLyB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICB0aW50OiBwYWxldHRlLmdyZWVuLFxyXG4gICAgLy8gICBzaXplOiBzaXplcy5tLFxyXG4gICAgLy8gICBsZWZ0OiAxMDMwLFxyXG4gICAgLy8gICB0b3A6IDEyMDAsXHJcbiAgICAvLyB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICB0aW50OiBwYWxldHRlLmdyZWVuLFxyXG4gICAgLy8gICBzaXplOiBzaXplcy5tLFxyXG4gICAgLy8gICBsZWZ0OiAyMDAwLFxyXG4gICAgLy8gICB0b3A6IDYwMCxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUuZ3JlZW4sXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLm0sXHJcbiAgICAvLyAgIGxlZnQ6IDE5MDAsXHJcbiAgICAvLyAgIHRvcDogMjAwLFxyXG4gICAgLy8gfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS5ncmVlbixcclxuICAgIC8vICAgc2l6ZTogc2l6ZXMubSxcclxuICAgIC8vICAgbGVmdDogMTAwLFxyXG4gICAgLy8gICB0b3A6IDIwMCxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUuZ3JlZW4sXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLm0sXHJcbiAgICAvLyAgIGxlZnQ6IDEwMzAsXHJcbiAgICAvLyAgIHRvcDogMjAwLFxyXG4gICAgLy8gfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS5ncmVlbixcclxuICAgIC8vICAgc2l6ZTogc2l6ZXMubSxcclxuICAgIC8vICAgbGVmdDogMTUwMCxcclxuICAgIC8vICAgdG9wOiAyMDAsXHJcbiAgICAvLyB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICB0aW50OiBwYWxldHRlLmdyZWVuLFxyXG4gICAgLy8gICBzaXplOiBzaXplcy5tLFxyXG4gICAgLy8gICBsZWZ0OiAxMCxcclxuICAgIC8vICAgdG9wOiAyMDAsXHJcbiAgICAvLyB9LFxyXG4gIF0ubWFwKChvYmplY3QpID0+IE9iamVjdC5hc3NpZ24oY3JlYXRlQ3ViZShvYmplY3Quc2l6ZSksIG9iamVjdCkpO1xyXG5cclxuICBjdWJlcy5mb3JFYWNoKHNldEN1YmVTdHlsZXMpO1xyXG5cclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIC8vIGN1YmUgcm90YXRpbmcgYW5pbWF0aW9uXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgY29uc3QgZ2V0RGlzdGFuY2UgPSAoc3RhdGUsIHJvdGF0ZSkgPT5cclxuICAgIGRpcmVjdGlvbnMucmVkdWNlKChvYmplY3QsIGF4aXMpID0+IHtcclxuICAgICAgb2JqZWN0W2F4aXNdID0gTWF0aC5hYnMoc3RhdGVbYXhpc10gKyByb3RhdGVbYXhpc10pO1xyXG4gICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgfSwge30pO1xyXG5cclxuICBjb25zdCBnZXRSb3RhdGlvbiA9IChzdGF0ZSwgc2l6ZSwgcm90YXRlKSA9PiB7XHJcbiAgICBjb25zdCBheGlzID0gcm90YXRlLnggPyBcIlpcIiA6IFwiWVwiO1xyXG4gICAgY29uc3QgZGlyZWN0aW9uID0gcm90YXRlLnggPiAwID8gLTEgOiAxO1xyXG5cclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgcm90YXRlWCgke3N0YXRlLnggKyByb3RhdGUueH1kZWcpXHJcbiAgICAgICAgcm90YXRlJHtheGlzfSgke2RpcmVjdGlvbiAqIChzdGF0ZS55ICsgcm90YXRlLnkpfWRlZylcclxuICAgICAgICB0cmFuc2xhdGVaKCR7c2l6ZSAvIDJ9cHgpXHJcbiAgICAgIGA7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZ2V0U2hhZGluZyA9ICh0aW50LCByb3RhdGUsIGRpc3RhbmNlKSA9PiB7XHJcbiAgICBjb25zdCBkYXJrZW4gPSBkaXJlY3Rpb25zLnJlZHVjZSgob2JqZWN0LCBheGlzKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRlbHRhID0gZGlzdGFuY2VbYXhpc107XHJcbiAgICAgIGNvbnN0IHJhdGlvID0gZGVsdGEgLyAxODA7XHJcbiAgICAgIG9iamVjdFtheGlzXSA9IGRlbHRhID4gMTgwID8gTWF0aC5hYnMoMiAtIHJhdGlvKSA6IHJhdGlvO1xyXG4gICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgfSwge30pO1xyXG5cclxuICAgIGlmIChyb3RhdGUueCkgZGFya2VuLnkgPSAwO1xyXG4gICAgZWxzZSB7XHJcbiAgICAgIGNvbnN0IHsgeCB9ID0gZGlzdGFuY2U7XHJcbiAgICAgIGlmICh4ID4gOTAgJiYgeCA8IDI3MClcclxuICAgICAgICBkaXJlY3Rpb25zLmZvckVhY2goKGF4aXMpID0+IChkYXJrZW5bYXhpc10gPSAxIC0gZGFya2VuW2F4aXNdKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWxwaGEgPSAoZGFya2VuLnggKyBkYXJrZW4ueSkgLyAyO1xyXG4gICAgY29uc3QgYmxlbmQgPSAodmFsdWUsIGluZGV4KSA9PlxyXG4gICAgICBNYXRoLnJvdW5kKFN0cnV0LmludGVycG9sYXRlKHZhbHVlLCB0aW50LnNoYWRpbmdbaW5kZXhdLCBhbHBoYSkpO1xyXG4gICAgY29uc3QgW3IsIGcsIGJdID0gdGludC5jb2xvci5tYXAoYmxlbmQpO1xyXG5cclxuICAgIHJldHVybiBgcmdiKCR7cn0sICR7Z30sICR7Yn0pYDtcclxuICB9O1xyXG5cclxuICBjb25zdCBzaG91bGRIaWRlID0gKHJvdGF0ZVgsIHgsIHkpID0+IHtcclxuICAgIGlmIChyb3RhdGVYKSByZXR1cm4geCA+IDkwICYmIHggPCAyNzA7XHJcbiAgICBpZiAoeCA8IDkwKSByZXR1cm4geSA+IDkwICYmIHkgPCAyNzA7XHJcbiAgICBpZiAoeCA8IDI3MCkgcmV0dXJuIHkgPCA5MDtcclxuICAgIHJldHVybiB5ID4gOTAgJiYgeSA8IDI3MDtcclxuICB9O1xyXG5cclxuICBjb25zdCB1cGRhdGVTaWRlcyA9ICh7IHN0YXRlLCBzcGVlZCwgc2l6ZSwgdGludCwgc2lkZXMsIGxlZnQgfSkgPT4ge1xyXG4gICAgaWYgKGhlYWRlcklzSGlkZGVuIHx8IGN1YmVJc0hpZGRlbihsZWZ0KSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGFuaW1hdGUgPSAob2JqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgc2lkZSwgcm90YXRlLCBoaWRkZW4gfSA9IG9iamVjdDtcclxuICAgICAgY29uc3QgZGlzdGFuY2UgPSBnZXREaXN0YW5jZShzdGF0ZSwgcm90YXRlKTtcclxuXHJcbiAgICAgIC8vIGRvbid0IGFuaW1hdGUgaGlkZGVuIHNpZGVzXHJcbiAgICAgIGlmIChzaG91bGRIaWRlKHJvdGF0ZS54LCBkaXN0YW5jZS54LCBkaXN0YW5jZS55KSkge1xyXG4gICAgICAgIGlmICghaGlkZGVuKSB7XHJcbiAgICAgICAgICBzaWRlLmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgICBvYmplY3QuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaGlkZGVuKSB7XHJcbiAgICAgICAgc2lkZS5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgICBvYmplY3QuaGlkZGVuID0gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNpZGUuc3R5bGUudHJhbnNmb3JtID0gZ2V0Um90YXRpb24oc3RhdGUsIHNpemUsIHJvdGF0ZSk7XHJcbiAgICAgIHNpZGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gZ2V0U2hhZGluZyh0aW50LCByb3RhdGUsIGRpc3RhbmNlKTtcclxuICAgIH07XHJcblxyXG4gICAgc2V0U3RhdGUoc3RhdGUsIHNwZWVkKTtcclxuICAgIHNpZGVzLmZvckVhY2goYW5pbWF0ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgdGljayA9ICgpID0+IHtcclxuICAgIGN1YmVzLmZvckVhY2godXBkYXRlU2lkZXMpO1xyXG4gICAgaWYgKHJlZHVjZU1vdGlvbikgcmV0dXJuO1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xyXG4gIH07XHJcblxyXG4gIC8vID09PT09PT09PT09PT09PVxyXG4gIC8vIHBhcmFsbGF4IHNjcm9sbFxyXG4gIC8vID09PT09PT09PT09PT09PVxyXG5cclxuICAvLyBnaXZlIGl0IHNvbWUgZXh0cmEgc3BhY2UgdG8gYWNjb3VudCBmb3IgdGhlIHBhcmFsbGF4IGFuZCB0aGUgc2hhZG93cyBvZiB0aGUgY3ViZXNcclxuICBjb25zdCBwYXJhbGxheExpbWl0ID1cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluID4gaGVhZGVyXCIpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCArIDgwO1xyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBzY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcclxuICAgIGlmIChzY3JvbGwgPCBwYXJhbGxheExpbWl0KSB7XHJcbiAgICAgIGhlYWRlcklzSGlkZGVuID0gZmFsc2U7XHJcbiAgICAgIGN1YmVzLmZvckVhY2goXHJcbiAgICAgICAgKHsgY3ViZSwgc3BlZWQgfSkgPT5cclxuICAgICAgICAgIChjdWJlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7XHJcbiAgICAgICAgICAgIE1hdGguYWJzKHNwZWVkLnggKiAwLjUpICogc2Nyb2xsXHJcbiAgICAgICAgICB9cHgpYClcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaGVhZGVySXNIaWRkZW4gPSB0cnVlO1xyXG4gIH0pO1xyXG5cclxuICAvLyA9PT09PT09PT09XHJcbiAgLy8gaW5pdGlhbGl6ZVxyXG4gIC8vID09PT09PT09PT1cclxuXHJcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJjdWJlc1wiO1xyXG4gIGN1YmVzLmZvckVhY2goKHsgZnJhZ21lbnQgfSkgPT4gY29udGFpbmVyLmFwcGVuZENoaWxkKGZyYWdtZW50KSk7XHJcblxyXG4gIGNvbnN0IHN0YXJ0ID0gKCkgPT4ge1xyXG4gICAgdGljaygpO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgfTtcclxuXHJcbiAgXCJyZXF1ZXN0SWRsZUNhbGxiYWNrXCIgaW4gd2luZG93ID8gcmVxdWVzdElkbGVDYWxsYmFjayhzdGFydCkgOiBzdGFydCgpO1xyXG59XHJcbiIsImltcG9ydCBzdHlsZSBmcm9tIFwiLi9hYm91dC5tb2R1bGUuc2Nzc1wiO1xyXG5pbXBvcnQgUHJpc20gZnJvbSBcInByaXNtanNcIjtcclxuXHJcbmNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHN0eWxlW1wiY29udGFpbmVyXCJdKTtcclxuXHJcbmNvbnN0IG5ld09ic2VydmVyID0gKCkgPT4ge307XHJcblxyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gIGxldCBvcHRpb25zID0ge1xyXG4gICAgdGhyZXNob2xkOiBbMC4yXSxcclxuICB9O1xyXG4gIGNvbnN0IGxhcHRvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbi1sYXB0b3Atb2JzXCIpO1xyXG4gIGNvbnN0IHRyYWNrU3ZnID0gKGVudHJpZXMpID0+IHtcclxuICAgIGlmIChlbnRyaWVzWzBdLmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgIHZhciBpID0gMDtcclxuICAgICAgdmFyIHR4dCA9IGBjb25zdCBhcHAgPSBleHByZXNzKCk7XFxuYXBwLmdldCgnYXBpL3NraWxscycsIChyZXEscmVzKSA9PlxcbnsgcmVzLmpzb24oW1wiUmVhY3RcIixcIkphdmFzY3JpcHRcIixcXG5cIm5vZGVKU1wiLCBcIkNTU1wiLCBcIkhUTUxcIl0pfSlgO1xyXG4gICAgICBjb25zdCBzZXJ2ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlcnZlci10ZXh0XCIpO1xyXG4gICAgICBjb25zdCBjbGllbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsaWVudC10ZXh0XCIpO1xyXG4gICAgICB2YXIgc3BlZWQgPSAxMDtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIHNlcnZlckFuaW1hdGlvbigpIHtcclxuICAgICAgICBpZiAoaSA8IHR4dC5sZW5ndGgpIHtcclxuICAgICAgICAgIHNlcnZlci5pbm5lckhUTUwgKz0gdHh0LmNoYXJBdChpKTtcclxuICAgICAgICAgIGkrKztcclxuICAgICAgICAgIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KHNlcnZlckFuaW1hdGlvbiwgc3BlZWQpO1xyXG4gICAgICAgICAgaWYgKGkgPT09IHR4dC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG4gICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgY2xpZW50QW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFByaXNtLmhpZ2hsaWdodEVsZW1lbnQoc2VydmVyKTtcclxuICAgICAgfVxyXG4gICAgICBmdW5jdGlvbiBjbGllbnRBbmltYXRpb24oKSB7XHJcbiAgICAgICAgbGV0IHR4dCA9IGBjb25zdCBteVNraWxscyA9IGF3YWl0IFxcbiBheGlvcy5nZXQoJy9hcGkvc2tpbGxzJylcXG4gY29uc29sZS5sb2cobXlTa2lsbHMuZGF0YSlgO1xyXG5cclxuICAgICAgICBpZiAoaSA8IHR4dC5sZW5ndGgpIHtcclxuICAgICAgICAgIGNsaWVudC5pbm5lckhUTUwgKz0gdHh0LmNoYXJBdChpKTtcclxuXHJcbiAgICAgICAgICBpKys7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGNsaWVudEFuaW1hdGlvbiwgc3BlZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBQcmlzbS5oaWdobGlnaHRFbGVtZW50KGNsaWVudCk7XHJcbiAgICAgIH1cclxuICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICBzZXJ2ZXJBbmltYXRpb24oKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcih0cmFja1N2Zywgb3B0aW9ucyk7XHJcblxyXG4gIG9ic2VydmVyLm9ic2VydmUobGFwdG9wKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHJlbmRlckFib3V0ID0gKGZyYWdtZW50KSA9PiB7XHJcbiAgZWxlbWVudC5pbm5lckhUTUwgPSAvKmh0bWwqLyBgPGRpdiBjbGFzcz0ke3N0eWxlW1wiY29udGFpbmVyXCJdfT5cclxuICAgICAgPGRpdiBjbGFzcz0ke3N0eWxlW1wibWFpbi1jb250ZW50XCJdfT5cclxuICAgICAgICA8ZGl2IGNsYXNzPSR7c3R5bGVbXCJjb2RlLWVkaXRvci1jb250YWluZXJcIl19PlxyXG4gICAgICAgICAgPGRpdiBpZD0nbWFpbi1sYXB0b3Atb2JzJyBjbGFzcz0ke3N0eWxlW1wibGFwdG9wXCJdfT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz0ke3N0eWxlW1wiY29kZS1lZGl0b3JcIl19PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcImNsaWVudC1lZGl0b3JcIl19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ke3N0eWxlW1wibGluZS1udW1iZXItY29udGFpbmVyXCJdfT5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ke3N0eWxlW1wibGluZS1jb250YWluZXJcIl19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwcmUgY2xhc3M9JHtcImxpbmUtbnVtYmVyc1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxjb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiY2xpZW50LXRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz0ke2BsYW5ndWFnZS1qc2B9XHJcbiAgICAgICAgICAgICAgICAgICAgICA+PC9jb2RlPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvcHJlPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcInNlcnZlci1lZGl0b3JcIl19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ke3N0eWxlW1wibGluZS1udW1iZXItY29udGFpbmVyXCJdfT5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ke3N0eWxlW1wibGluZS1jb250YWluZXJcIl19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwcmUgY2xhc3M9JHtcImxpbmUtbnVtYmVyc1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxjb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwic2VydmVyLXRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz0ke2BsYW5ndWFnZS1qc2B9XHJcbiAgICAgICAgICAgICAgICAgICAgICA+PC9jb2RlPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvcHJlPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz0ke3N0eWxlW1wiYmFzZVwiXX0+PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz0ke3N0eWxlW1widGV4dC1jb250ZW50XCJdfT5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcInRleHQtY29udGFpbmVyXCJdfT5cclxuICAgICAgICAgICAgPGgzIGNsYXNzPSR7c3R5bGVbXCJtYWluLWhlYWRlclwiXX0+SmF2YXNjcmlwdCBkZXZlbG9wZXI8L2gzPlxyXG4gICAgICAgICAgICA8cCBjbGFzcz0ke3N0eWxlW1wiZGVzY3JpcHRpb25cIl19PlxyXG4gICAgICAgICAgICAgIEhlbGxvLCBJJ20gQXVzdGluLCBhIHdlYiBkZXZlbG9wZXIgd2l0aCBhIHByaW1hcnkgZm9jdXMgaW4gUmVhY3RcclxuICAgICAgICAgICAgICBkZXZlbG9wbWVudC4gSSdtIGNvbmZpZGVudCBpbiB3b3JraW5nIHdpdGggdGhlIHZhcmlvdXMgTUVSTiBzdGFja1xyXG4gICAgICAgICAgICAgIHRlY2hub2xvZ2llcyBhbmQgSSdtIG9uIGEgcGVyc2lzdGVudCBqb3VybmV5IGluIGhvbmluZyBteSBjcmFmdCBpblxyXG4gICAgICAgICAgICAgIHdlYiBkZXZlbG9wbWVudC5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbmA7XHJcbiAgY29uc3Qgcm9vdCA9IGZyYWdtZW50LmdldEVsZW1lbnRCeUlkKFwiI3Jvb3RcIik7XHJcbiAgcm9vdC5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxufTtcclxuIiwiaW1wb3J0IHN0eWxlIGZyb20gXCIuL2xhbmRpbmcubW9kdWxlLnNjc3NcIjtcclxuaW1wb3J0IGNoYXRhcHAgZnJvbSBcIi4vcHJvamVjdHBob3Rvcy9jaGF0YXBwLnBuZ1wiO1xyXG5pbXBvcnQgY292aWRUcmFja2VyIGZyb20gXCIuL3Byb2plY3RwaG90b3MvY292aWRUcmFja2VyLnBuZ1wiO1xyXG5pbXBvcnQgcGxheWxpc3RzIGZyb20gXCIuL3Byb2plY3RwaG90b3MvcGxheWxpc3RzLnBuZ1wiO1xyXG5pbXBvcnQgcG9ydGZvbGlvIGZyb20gXCIuL3Byb2plY3RwaG90b3MvcG9ydGZvbGlvLnBuZ1wiO1xyXG5pbXBvcnQgcmVhZGRpdCBmcm9tIFwiLi9wcm9qZWN0cGhvdG9zL3JlYWRkaXQucG5nXCI7XHJcbmltcG9ydCB0ZXNsYSBmcm9tIFwiLi9wcm9qZWN0cGhvdG9zL3Rlc2xhLWNsb25lLnBuZ1wiO1xyXG5pbXBvcnQgQ3NzSWNvbiBmcm9tIFwiLi9wcm9qZWN0cGhvdG9zL2NzczMuc3ZnXCI7XHJcbmltcG9ydCBHaXRJY29uIGZyb20gXCIuL3Byb2plY3RwaG90b3MvZ2l0aHViLnN2Z1wiO1xyXG5pbXBvcnQgSHRtbEljb24gZnJvbSBcIi4vcHJvamVjdHBob3Rvcy9odG1sNS5zdmdcIjtcclxuaW1wb3J0IEpzSWNvbiBmcm9tIFwiLi9wcm9qZWN0cGhvdG9zL2phdmFzY3JpcHQuc3ZnXCI7XHJcbmltcG9ydCBOb2RlSWNvbiBmcm9tIFwiLi9wcm9qZWN0cGhvdG9zL25vZGUuc3ZnXCI7XHJcbmltcG9ydCBSZWFjdEljb24gZnJvbSBcIi4vcHJvamVjdHBob3Rvcy9yZWFjdC5zdmdcIjtcclxuXHJcbmNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuXHJcbmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzdHlsZVtcIndyYXBwZXJcIl0pO1xyXG5jb25zdCB0ZWNoSW1hZ2VzID0gW1xyXG4gIHtcclxuICAgIGltYWdlOiBSZWFjdEljb24sXHJcbiAgICBuYW1lOiBcIlJlYWN0XCIsXHJcbiAgfSxcclxuICB7IGltYWdlOiBKc0ljb24sIG5hbWU6IFwiSnMgRVM2XCIgfSxcclxuICB7XHJcbiAgICBpbWFnZTogTm9kZUljb24sXHJcbiAgICBuYW1lOiBcIk5vZGVcIixcclxuICB9LFxyXG4gIHtcclxuICAgIGltYWdlOiBIdG1sSWNvbixcclxuICAgIG5hbWU6IFwiSHRtbFwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaW1hZ2U6IENzc0ljb24sXHJcbiAgICBuYW1lOiBcIkNzc1wiLFxyXG4gIH0sXHJcbl07XHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyTGFuZGluZyA9IChmcmFnbWVudCkgPT4ge1xyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gLypodG1sKi8gYFxyXG48ZGl2IGNsYXNzPSR7c3R5bGVbXCJjZW50ZXItY29udGFpbmVyXCJdfT5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPSR7c3R5bGVbXCJjb250YWluZXJcIl19PlxyXG4gICAgICA8ZGl2IGNsYXNzPSR7c3R5bGVbXCJ0ZXh0LWNvbnRhaW5lclwiXX0+XHJcbiAgICAgICAgPGgxIGNsYXNzPSR7c3R5bGVbXCJtYWluLXRpdGxlXCJdfT5IaSwgSSdtIDxzcGFuPkF1c3Rpbjwvc3Bhbj48L2gxPlxyXG4gICAgICAgIDxoNCBjbGFzcz0ke3N0eWxlW1wiZGVzY3JpcHRpb25cIl19PlxyXG4gICAgICAgICAgSGVyZSBhcmUgc29tZSBvZiBteSBwcm9qZWN0cyBJJ3ZlIGJlZW4gd29ya2luZyBvbi5cclxuICAgICAgICA8L2g0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz0ke3N0eWxlW1wiaW1hZ2UtY29udGFpbmVyXCJdfT5cclxuICAgICAgICA8YVxyXG4gICAgICAgICAgcmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2FqbDAwMjMvY2hhdEFwcFwiXHJcbiAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxyXG4gICAgICAgICAgY2xhc3M9JHtzdHlsZVtcInByb2plY3QtY29udGFpbmVyXCJdfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxpbWcgc3JjPSR7Y2hhdGFwcH0gY2xhc3M9JHtzdHlsZVtcInByb2plY3QtaW1hZ2VcIl19IC8+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDxhXHJcbiAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2FqbDAwMjMvQ292aWQtdHJhY2tlclwiXHJcbiAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxyXG4gICAgICAgICAgY2xhc3M9JHtzdHlsZVtcInByb2plY3QtY29udGFpbmVyXCJdfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxpbWcgc3JjPSR7Y292aWRUcmFja2VyfSBjbGFzcz0ke3N0eWxlW1wicHJvamVjdC1pbWFnZVwiXX0gLz5cclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgPGFcclxuICAgICAgICAgIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYWpsMDAyMy9yZWFkaXRcIlxyXG4gICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcclxuICAgICAgICAgIGNsYXNzPSR7c3R5bGVbXCJwcm9qZWN0LWNvbnRhaW5lclwiXX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8aW1nIHNyYz0ke3JlYWRkaXR9IGNsYXNzPSR7c3R5bGVbXCJwcm9qZWN0LWltYWdlXCJdfSAvPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgICA8YVxyXG4gICAgICAgICAgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9hamwwMDIzL3Nwb3RpZnlQbGF5bGlzdHNcIlxyXG4gICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcclxuICAgICAgICAgIGNsYXNzPSR7c3R5bGVbXCJwcm9qZWN0LWNvbnRhaW5lclwiXX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8aW1nIHNyYz0ke3BsYXlsaXN0c30gY2xhc3M9JHtzdHlsZVtcInByb2plY3QtaW1hZ2VcIl19IC8+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDxhXHJcbiAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2FqbDAwMjMvdGVzbGEtY2xvbmVcIlxyXG4gICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcclxuICAgICAgICAgIGNsYXNzPSR7c3R5bGVbXCJwcm9qZWN0LWNvbnRhaW5lclwiXX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8aW1nIHNyYz0ke3Rlc2xhfSBjbGFzcz0ke3N0eWxlW1wicHJvamVjdC1pbWFnZVwiXX0gLz5cclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgPGFcclxuICAgICAgICAgIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYWpsMDAyMy9wb3J0Zm9saW9cIlxyXG4gICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcclxuICAgICAgICAgIGNsYXNzPSR7c3R5bGVbXCJwcm9qZWN0LWNvbnRhaW5lclwiXX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgIHNyYz0ke3BvcnRmb2xpb31cclxuICAgICAgICAgICAgY2xhc3M9JHtgJHtzdHlsZVtcInByb2plY3QtaW1hZ2VcIl19ICR7c3R5bGVbXCJwb3J0Zm9saW8taW1hZ2VcIl19YH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgXHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz0ke3N0eWxlW1widGVjaC13cmFwcGVyXCJdfT5cclxuICAgICAgICAgIDxwIGNsYXNzPSR7c3R5bGVbXCJ0ZWNoLWNvbnRhaW5lci10aXRsZVwiXX0+XHJcbiAgICAgICAgICAgIFRlY2hub2xvZ2llcyB1c2VkIGluIHRoZXNlIHByb2plY3RzXHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8ZGl2IGlkPSd0ZWNoLWNvbnRhaW5lcicgY2xhc3M9JHtzdHlsZVtcInRlY2gtaWNvbi1jb250YWluZXJcIl19PlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+YDtcclxuICBjb25zdCByb290ID0gZnJhZ21lbnQuZ2V0RWxlbWVudEJ5SWQoXCIjcm9vdFwiKTtcclxuICByb290LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gIGNvbnN0IHRlY2hDb250YWluZXIgPSBmcmFnbWVudC5nZXRFbGVtZW50QnlJZChcInRlY2gtY29udGFpbmVyXCIpO1xyXG4gIHRlY2hJbWFnZXMubWFwKChpdGVtKSA9PiB7XHJcbiAgICBsZXQgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBpY29uLmNsYXNzTGlzdC5hZGQoc3R5bGVbXCJpY29uLWNvbnRhaW5lclwiXSk7XHJcbiAgICBpY29uLmlubmVySFRNTCA9IC8qaHRtbCovIGAke2l0ZW0uaW1hZ2V9IDxwIGNsYXNzPSR7c3R5bGVbXCJpY29uLWxhYmVsXCJdfT4ke2l0ZW0ubmFtZX08L3A+YDtcclxuICAgIHRlY2hDb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbik7XHJcbiAgfSk7XHJcbn07XHJcbiIsImltcG9ydCBzdHlsZSBmcm9tIFwiLi9uYXZiYXIubW9kdWxlLnNjc3NcIjtcclxuaW1wb3J0IExJbG9nbyBmcm9tIFwiLi9uYXZsb2dvcy9saW5rZWRpbi5zdmdcIjtcclxuaW1wb3J0IEdIbG9nbyBmcm9tIFwiLi9uYXZsb2dvcy9naXRodWIuc3ZnXCI7XHJcbmltcG9ydCBHTUxvZ28gZnJvbSBcIi4vbmF2bG9nb3MvZ21haWwuc3ZnXCI7XHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyTmF2ID0gKGRvY0ZyYWcpID0+IHtcclxuICBjb25zdCByb290ID0gZG9jRnJhZy5nZXRFbGVtZW50QnlJZChcIiNyb290XCIpO1xyXG5cclxuICBjb25zdCBuYXZDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibmF2XCIpO1xyXG5cclxuICBuYXZDb250YWluZXIuaW5uZXJIVE1MID0gLypodG1sKi8gYDxkaXYgY2xhc3M9JHtzdHlsZVtcImNvbnRhaW5lclwiXX0+XHJcbiAgICA8ZGl2IGNsYXNzPSR7c3R5bGVbXCJjb250YWN0LWljb24tY29udGFpbmVyXCJdfT5cclxuICAgICR7R0hsb2dvfVxyXG4gICAgJHtHTUxvZ299XHJcbiAgICR7TElsb2dvfVxyXG4gICAgPGRpdiBjbGFzcz0ke3N0eWxlW1wiZGl2aWRlci1saW5lXCJdfT48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+YDtcclxuICByb290LmFwcGVuZENoaWxkKG5hdkNvbnRhaW5lcik7XHJcbn07XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLnNxdWFyZS1jb250YWluZXIge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgd2lkdGg6IDUwMHB4O1xcbiAgaGVpZ2h0OiA1MDBweDtcXG4gIHotaW5kZXg6IDE7XFxufVxcblxcbi5jdWJlcyB7XFxuICB6LWluZGV4OiAxO1xcbn1cXG5cXG4uY3ViZXMgLmN1YmUge1xcbiAgei1pbmRleDogMTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGhlaWdodDogMTAwcHg7XFxuICB3aWR0aDogMTAwcHg7XFxuICBtYXJnaW46IDA7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogY3ViZS1mYWRlLWluIDJzIGN1YmljLWJlemllcigwLjE2NSwgMC44NCwgMC40NCwgMSk7XFxuICBhbmltYXRpb246IGN1YmUtZmFkZS1pbiAycyBjdWJpYy1iZXppZXIoMC4xNjUsIDAuODQsIDAuNDQsIDEpO1xcbiAgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGN1YmUtZmFkZS1pbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgY3ViZS1mYWRlLWluIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC41KTtcXG4gIH1cXG59XFxuLmN1YmVzIC5jdWJlICoge1xcbiAgei1pbmRleDogMTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4uY3ViZXMgLmN1YmUgLnNoYWRvdyB7XFxuICBiYWNrZ3JvdW5kOiAjODM2MGMzO1xcbiAgdG9wOiA0MCU7XFxufVxcblxcbi5jdWJlcyAuY3ViZSAuc2lkZXMge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gIC13ZWJraXQtcGVyc3BlY3RpdmU6IDYwMHB4O1xcbiAgcGVyc3BlY3RpdmU6IDYwMHB4O1xcbn1cXG5cXG4uY3ViZXMgLmN1YmUgLnNpZGVzIGRpdiB7XFxuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm07XFxufVxcblxcbi5jdWJlcyAuY3ViZSAuc2lkZXMgLmZyb250IHtcXG4gIHotaW5kZXg6IDEgIWltcG9ydGFudDtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVZKDBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZVkoMGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXG59XFxuXFxuLmN1YmVzIC5jdWJlIC5zaWRlcyAuYmFjayB7XFxuICB6LWluZGV4OiAxICFpbXBvcnRhbnQ7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWSgtMTgwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcbiAgdHJhbnNmb3JtOiByb3RhdGVZKC0xODBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxufVxcblxcbi5jdWJlcyAuY3ViZSAuc2lkZXMgLmxlZnQge1xcbiAgei1pbmRleDogMSAhaW1wb3J0YW50O1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoLTkwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcbiAgdHJhbnNmb3JtOiByb3RhdGVZKC05MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXG59XFxuXFxuLmN1YmVzIC5jdWJlIC5zaWRlcyAucmlnaHQge1xcbiAgei1pbmRleDogMSAhaW1wb3J0YW50O1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoOTBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZVkoOTBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxufVxcblxcbi5jdWJlcyAuY3ViZSAuc2lkZXMgLnRvcCB7XFxuICB6LWluZGV4OiAxICFpbXBvcnRhbnQ7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWCg5MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXG4gIHRyYW5zZm9ybTogcm90YXRlWCg5MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXG59XFxuXFxuLmN1YmVzIC5jdWJlIC5zaWRlcyAuYm90dG9tIHtcXG4gIHotaW5kZXg6IDEgIWltcG9ydGFudDtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVYKC05MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXG4gIHRyYW5zZm9ybTogcm90YXRlWCgtOTBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxufVxcblxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWN1YmVzLmNzcy5tYXAgKi9cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9jdWJlcy9jdWJlcy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0FBQ0Y7O0FBR0E7RUFDRSxVQUFBO0FBQUY7O0FBR0E7RUFDRSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLFNBQUE7RUFDQSxxRUFBQTtFQUNBLDZEQUFBO0VBQ0Esc0JBQUE7QUFBRjs7QUFHQTtFQUNFO0lBQ0UsVUFBQTtJQUNBLDZCQUFBO0lBQ0EscUJBQUE7RUFBRjtBQUNGO0FBR0E7RUFDRTtJQUNFLFVBQUE7SUFDQSw2QkFBQTtJQUNBLHFCQUFBO0VBREY7QUFDRjtBQUlBO0VBQ0UsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUFGRjs7QUFLQTtFQUNFLG1CQUFBO0VBQ0EsUUFBQTtBQUZGOztBQUtBO0VBQ0Usb0NBQUE7RUFDQSw0QkFBQTtFQUNBLDBCQUFBO0VBQ0Esa0JBQUE7QUFGRjs7QUFLQTtFQUNFLG1DQUFBO0VBQ0EsMkJBQUE7RUFDQSxzQkFBQTtBQUZGOztBQUtBO0VBQ0UscUJBQUE7RUFDQSxpREFBQTtFQUNBLHlDQUFBO0FBRkY7O0FBS0E7RUFDRSxxQkFBQTtFQUNBLG9EQUFBO0VBQ0EsNENBQUE7QUFGRjs7QUFLQTtFQUNFLHFCQUFBO0VBQ0EsbURBQUE7RUFDQSwyQ0FBQTtBQUZGOztBQUtBO0VBQ0UscUJBQUE7RUFDQSxrREFBQTtFQUNBLDBDQUFBO0FBRkY7O0FBS0E7RUFDRSxxQkFBQTtFQUNBLGtEQUFBO0VBQ0EsMENBQUE7QUFGRjs7QUFLQTtFQUNFLHFCQUFBO0VBQ0EsbURBQUE7RUFDQSwyQ0FBQTtBQUZGOztBQUlBLG9DQUFBXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5zcXVhcmUtY29udGFpbmVyIHtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIHdpZHRoOiA1MDBweDtcXHJcXG4gIGhlaWdodDogNTAwcHg7XFxyXFxuICB6LWluZGV4OiAxO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4uY3ViZXMge1xcclxcbiAgei1pbmRleDogMTtcXHJcXG59XFxyXFxuXFxyXFxuLmN1YmVzIC5jdWJlIHtcXHJcXG4gIHotaW5kZXg6IDE7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICBoZWlnaHQ6IDEwMHB4O1xcclxcbiAgd2lkdGg6IDEwMHB4O1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgLXdlYmtpdC1hbmltYXRpb246IGN1YmUtZmFkZS1pbiAycyBjdWJpYy1iZXppZXIoMC4xNjUsIDAuODQsIDAuNDQsIDEpO1xcclxcbiAgYW5pbWF0aW9uOiBjdWJlLWZhZGUtaW4gMnMgY3ViaWMtYmV6aWVyKDAuMTY1LCAwLjg0LCAwLjQ0LCAxKTtcXHJcXG4gIHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm07XFxyXFxufVxcclxcblxcclxcbkAtd2Via2l0LWtleWZyYW1lcyBjdWJlLWZhZGUtaW4ge1xcclxcbiAgMCUge1xcclxcbiAgICBvcGFjaXR5OiAwO1xcclxcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC41KTtcXHJcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIGN1YmUtZmFkZS1pbiB7XFxyXFxuICAwJSB7XFxyXFxuICAgIG9wYWNpdHk6IDA7XFxyXFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xcclxcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi5jdWJlcyAuY3ViZSAqIHtcXHJcXG4gIHotaW5kZXg6IDE7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmN1YmVzIC5jdWJlIC5zaGFkb3cge1xcclxcbiAgYmFja2dyb3VuZDogIzgzNjBjMztcXHJcXG4gIHRvcDogNDAlO1xcclxcbn1cXHJcXG5cXHJcXG4uY3ViZXMgLmN1YmUgLnNpZGVzIHtcXHJcXG4gIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXHJcXG4gIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxyXFxuICAtd2Via2l0LXBlcnNwZWN0aXZlOiA2MDBweDtcXHJcXG4gIHBlcnNwZWN0aXZlOiA2MDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmN1YmVzIC5jdWJlIC5zaWRlcyBkaXYge1xcclxcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxuICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxuICB3aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xcclxcbn1cXHJcXG5cXHJcXG4uY3ViZXMgLmN1YmUgLnNpZGVzIC5mcm9udCB7XFxyXFxuICB6LWluZGV4OiAxICFpbXBvcnRhbnQ7XFxyXFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWSgwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcclxcbiAgdHJhbnNmb3JtOiByb3RhdGVZKDBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxyXFxufVxcclxcblxcclxcbi5jdWJlcyAuY3ViZSAuc2lkZXMgLmJhY2sge1xcclxcbiAgei1pbmRleDogMSAhaW1wb3J0YW50O1xcclxcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoLTE4MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXHJcXG4gIHRyYW5zZm9ybTogcm90YXRlWSgtMTgwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcclxcbn1cXHJcXG5cXHJcXG4uY3ViZXMgLmN1YmUgLnNpZGVzIC5sZWZ0IHtcXHJcXG4gIHotaW5kZXg6IDEgIWltcG9ydGFudDtcXHJcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVZKC05MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXHJcXG4gIHRyYW5zZm9ybTogcm90YXRlWSgtOTBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxyXFxufVxcclxcblxcclxcbi5jdWJlcyAuY3ViZSAuc2lkZXMgLnJpZ2h0IHtcXHJcXG4gIHotaW5kZXg6IDEgIWltcG9ydGFudDtcXHJcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVZKDkwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcclxcbiAgdHJhbnNmb3JtOiByb3RhdGVZKDkwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcclxcbn1cXHJcXG5cXHJcXG4uY3ViZXMgLmN1YmUgLnNpZGVzIC50b3Age1xcclxcbiAgei1pbmRleDogMSAhaW1wb3J0YW50O1xcclxcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVgoOTBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxyXFxuICB0cmFuc2Zvcm06IHJvdGF0ZVgoOTBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxyXFxufVxcclxcblxcclxcbi5jdWJlcyAuY3ViZSAuc2lkZXMgLmJvdHRvbSB7XFxyXFxuICB6LWluZGV4OiAxICFpbXBvcnRhbnQ7XFxyXFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWCgtOTBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxyXFxuICB0cmFuc2Zvcm06IHJvdGF0ZVgoLTkwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcclxcbn1cXHJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1jdWJlcy5jc3MubWFwICovXFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcInByZVtjbGFzcyo9bGFuZ3VhZ2UtXS5saW5lLW51bWJlcnMge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcGFkZGluZy1sZWZ0OiAzLjhlbTtcXG4gIGNvdW50ZXItcmVzZXQ6IGxpbmVudW1iZXI7XFxufVxcblxcbnByZVtjbGFzcyo9bGFuZ3VhZ2UtXS5saW5lLW51bWJlcnMgPiBjb2RlIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdoaXRlLXNwYWNlOiBpbmhlcml0O1xcbn1cXG5cXG4ubGluZS1udW1iZXJzIC5saW5lLW51bWJlcnMtcm93cyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIHRvcDogMDtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGxlZnQ6IC0zLjhlbTtcXG4gIHdpZHRoOiAzZW07XFxuICAvKiB3b3JrcyBmb3IgbGluZS1udW1iZXJzIGJlbG93IDEwMDAgbGluZXMgKi9cXG4gIGxldHRlci1zcGFjaW5nOiAtMXB4O1xcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzk5OTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcblxcbi5saW5lLW51bWJlcnMtcm93cyA+IHNwYW4ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBjb3VudGVyLWluY3JlbWVudDogbGluZW51bWJlcjtcXG59XFxuXFxuLmxpbmUtbnVtYmVycy1yb3dzID4gc3BhbjpiZWZvcmUge1xcbiAgY29udGVudDogY291bnRlcihsaW5lbnVtYmVyKTtcXG4gIGNvbG9yOiAjOTk5O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nLXJpZ2h0OiAwLjhlbTtcXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9ub2RlX21vZHVsZXMvcHJpc21qcy9wbHVnaW5zL2xpbmUtbnVtYmVycy9wcmlzbS1saW5lLW51bWJlcnMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Msa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0FBQ0Q7O0FBRUE7RUFDQyxrQkFBQTtFQUNBLG9CQUFBO0FBQ0Q7O0FBRUE7RUFDQyxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EsTUFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUFZLDRDQUFBO0VBQ1osb0JBQUE7RUFDQSw0QkFBQTtFQUVBLHlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0FBQ0Q7O0FBR0M7RUFDQyxjQUFBO0VBQ0EsNkJBQUE7QUFBRjs7QUFHRTtFQUNDLDRCQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxvQkFBQTtFQUNBLGlCQUFBO0FBQUhcIixcInNvdXJjZXNDb250ZW50XCI6W1wicHJlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl0ubGluZS1udW1iZXJzIHtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0cGFkZGluZy1sZWZ0OiAzLjhlbTtcXG5cXHRjb3VudGVyLXJlc2V0OiBsaW5lbnVtYmVyO1xcbn1cXG5cXG5wcmVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXS5saW5lLW51bWJlcnMgPiBjb2RlIHtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0d2hpdGUtc3BhY2U6IGluaGVyaXQ7XFxufVxcblxcbi5saW5lLW51bWJlcnMgLmxpbmUtbnVtYmVycy1yb3dzIHtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0cG9pbnRlci1ldmVudHM6IG5vbmU7XFxuXFx0dG9wOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRsZWZ0OiAtMy44ZW07XFxuXFx0d2lkdGg6IDNlbTsgLyogd29ya3MgZm9yIGxpbmUtbnVtYmVycyBiZWxvdyAxMDAwIGxpbmVzICovXFxuXFx0bGV0dGVyLXNwYWNpbmc6IC0xcHg7XFxuXFx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzk5OTtcXG5cXG5cXHQtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcblxcdC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuXFx0LW1zLXVzZXItc2VsZWN0OiBub25lO1xcblxcdHVzZXItc2VsZWN0OiBub25lO1xcblxcbn1cXG5cXG5cXHQubGluZS1udW1iZXJzLXJvd3MgPiBzcGFuIHtcXG5cXHRcXHRkaXNwbGF5OiBibG9jaztcXG5cXHRcXHRjb3VudGVyLWluY3JlbWVudDogbGluZW51bWJlcjtcXG5cXHR9XFxuXFxuXFx0XFx0LmxpbmUtbnVtYmVycy1yb3dzID4gc3BhbjpiZWZvcmUge1xcblxcdFxcdFxcdGNvbnRlbnQ6IGNvdW50ZXIobGluZW51bWJlcik7XFxuXFx0XFx0XFx0Y29sb3I6ICM5OTk7XFxuXFx0XFx0XFx0ZGlzcGxheTogYmxvY2s7XFxuXFx0XFx0XFx0cGFkZGluZy1yaWdodDogMC44ZW07XFxuXFx0XFx0XFx0dGV4dC1hbGlnbjogcmlnaHQ7XFxuXFx0XFx0fVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKipcXG4gKiBva2FpZGlhIHRoZW1lIGZvciBKYXZhU2NyaXB0LCBDU1MgYW5kIEhUTUxcXG4gKiBMb29zZWx5IGJhc2VkIG9uIE1vbm9rYWkgdGV4dG1hdGUgdGhlbWUgYnkgaHR0cDovL3d3dy5tb25va2FpLm5sL1xcbiAqIEBhdXRob3Igb2NvZGlhXFxuICovXFxuY29kZVtjbGFzcyo9bGFuZ3VhZ2UtXSxcXG5wcmVbY2xhc3MqPWxhbmd1YWdlLV0ge1xcbiAgY29sb3I6ICNmOGY4ZjI7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgdGV4dC1zaGFkb3c6IDAgMXB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gIGZvbnQtZmFtaWx5OiBDb25zb2xhcywgTW9uYWNvLCBcXFwiQW5kYWxlIE1vbm9cXFwiLCBcXFwiVWJ1bnR1IE1vbm9cXFwiLCBtb25vc3BhY2U7XFxuICBmb250LXNpemU6IDFlbTtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICB3aGl0ZS1zcGFjZTogcHJlO1xcbiAgd29yZC1zcGFjaW5nOiBub3JtYWw7XFxuICB3b3JkLWJyZWFrOiBub3JtYWw7XFxuICB3b3JkLXdyYXA6IG5vcm1hbDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICAtbW96LXRhYi1zaXplOiA0O1xcbiAgLW8tdGFiLXNpemU6IDQ7XFxuICB0YWItc2l6ZTogNDtcXG4gIC13ZWJraXQtaHlwaGVuczogbm9uZTtcXG4gIC1tb3otaHlwaGVuczogbm9uZTtcXG4gIC1tcy1oeXBoZW5zOiBub25lO1xcbiAgaHlwaGVuczogbm9uZTtcXG59XFxuXFxuLyogQ29kZSBibG9ja3MgKi9cXG5wcmVbY2xhc3MqPWxhbmd1YWdlLV0ge1xcbiAgcGFkZGluZzogMWVtO1xcbiAgbWFyZ2luOiAwLjVlbSAwO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBib3JkZXItcmFkaXVzOiAwLjNlbTtcXG59XFxuXFxuOm5vdChwcmUpID4gY29kZVtjbGFzcyo9bGFuZ3VhZ2UtXSxcXG5wcmVbY2xhc3MqPWxhbmd1YWdlLV0ge1xcbiAgYmFja2dyb3VuZDogIzI3MjgyMjtcXG59XFxuXFxuLyogSW5saW5lIGNvZGUgKi9cXG46bm90KHByZSkgPiBjb2RlW2NsYXNzKj1sYW5ndWFnZS1dIHtcXG4gIHBhZGRpbmc6IDAuMWVtO1xcbiAgYm9yZGVyLXJhZGl1czogMC4zZW07XFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xcbn1cXG5cXG4udG9rZW4uY29tbWVudCxcXG4udG9rZW4ucHJvbG9nLFxcbi50b2tlbi5kb2N0eXBlLFxcbi50b2tlbi5jZGF0YSB7XFxuICBjb2xvcjogIzgyOTJhMjtcXG59XFxuXFxuLnRva2VuLnB1bmN0dWF0aW9uIHtcXG4gIGNvbG9yOiAjZjhmOGYyO1xcbn1cXG5cXG4udG9rZW4ubmFtZXNwYWNlIHtcXG4gIG9wYWNpdHk6IDAuNztcXG59XFxuXFxuLnRva2VuLnByb3BlcnR5LFxcbi50b2tlbi50YWcsXFxuLnRva2VuLmNvbnN0YW50LFxcbi50b2tlbi5zeW1ib2wsXFxuLnRva2VuLmRlbGV0ZWQge1xcbiAgY29sb3I6ICNmOTI2NzI7XFxufVxcblxcbi50b2tlbi5ib29sZWFuLFxcbi50b2tlbi5udW1iZXIge1xcbiAgY29sb3I6ICNhZTgxZmY7XFxufVxcblxcbi50b2tlbi5zZWxlY3RvcixcXG4udG9rZW4uYXR0ci1uYW1lLFxcbi50b2tlbi5zdHJpbmcsXFxuLnRva2VuLmNoYXIsXFxuLnRva2VuLmJ1aWx0aW4sXFxuLnRva2VuLmluc2VydGVkIHtcXG4gIGNvbG9yOiAjYTZlMjJlO1xcbn1cXG5cXG4udG9rZW4ub3BlcmF0b3IsXFxuLnRva2VuLmVudGl0eSxcXG4udG9rZW4udXJsLFxcbi5sYW5ndWFnZS1jc3MgLnRva2VuLnN0cmluZyxcXG4uc3R5bGUgLnRva2VuLnN0cmluZyxcXG4udG9rZW4udmFyaWFibGUge1xcbiAgY29sb3I6ICNmOGY4ZjI7XFxufVxcblxcbi50b2tlbi5hdHJ1bGUsXFxuLnRva2VuLmF0dHItdmFsdWUsXFxuLnRva2VuLmZ1bmN0aW9uLFxcbi50b2tlbi5jbGFzcy1uYW1lIHtcXG4gIGNvbG9yOiAjZTZkYjc0O1xcbn1cXG5cXG4udG9rZW4ua2V5d29yZCB7XFxuICBjb2xvcjogIzY2ZDllZjtcXG59XFxuXFxuLnRva2VuLnJlZ2V4LFxcbi50b2tlbi5pbXBvcnRhbnQge1xcbiAgY29sb3I6ICNmZDk3MWY7XFxufVxcblxcbi50b2tlbi5pbXBvcnRhbnQsXFxuLnRva2VuLmJvbGQge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi50b2tlbi5pdGFsaWMge1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5cXG4udG9rZW4uZW50aXR5IHtcXG4gIGN1cnNvcjogaGVscDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvdGhlbWVzL3ByaXNtLW9rYWlkaWEuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7O0VBQUE7QUFNQTs7RUFFQyxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQ0FBQTtFQUNBLHNFQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUVBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFFQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFBO0FBRkQ7O0FBS0EsZ0JBQUE7QUFDQTtFQUNDLFlBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLG9CQUFBO0FBRkQ7O0FBS0E7O0VBRUMsbUJBQUE7QUFGRDs7QUFLQSxnQkFBQTtBQUNBO0VBQ0MsY0FBQTtFQUNBLG9CQUFBO0VBQ0EsbUJBQUE7QUFGRDs7QUFLQTs7OztFQUlDLGNBQUE7QUFGRDs7QUFLQTtFQUNDLGNBQUE7QUFGRDs7QUFLQTtFQUNDLFlBQUE7QUFGRDs7QUFLQTs7Ozs7RUFLQyxjQUFBO0FBRkQ7O0FBS0E7O0VBRUMsY0FBQTtBQUZEOztBQUtBOzs7Ozs7RUFNQyxjQUFBO0FBRkQ7O0FBS0E7Ozs7OztFQU1DLGNBQUE7QUFGRDs7QUFLQTs7OztFQUlDLGNBQUE7QUFGRDs7QUFLQTtFQUNDLGNBQUE7QUFGRDs7QUFLQTs7RUFFQyxjQUFBO0FBRkQ7O0FBS0E7O0VBRUMsaUJBQUE7QUFGRDs7QUFJQTtFQUNDLGtCQUFBO0FBREQ7O0FBSUE7RUFDQyxZQUFBO0FBRERcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqXFxuICogb2thaWRpYSB0aGVtZSBmb3IgSmF2YVNjcmlwdCwgQ1NTIGFuZCBIVE1MXFxuICogTG9vc2VseSBiYXNlZCBvbiBNb25va2FpIHRleHRtYXRlIHRoZW1lIGJ5IGh0dHA6Ly93d3cubW9ub2thaS5ubC9cXG4gKiBAYXV0aG9yIG9jb2RpYVxcbiAqL1xcblxcbmNvZGVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXSxcXG5wcmVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXSB7XFxuXFx0Y29sb3I6ICNmOGY4ZjI7XFxuXFx0YmFja2dyb3VuZDogbm9uZTtcXG5cXHR0ZXh0LXNoYWRvdzogMCAxcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcblxcdGZvbnQtZmFtaWx5OiBDb25zb2xhcywgTW9uYWNvLCAnQW5kYWxlIE1vbm8nLCAnVWJ1bnR1IE1vbm8nLCBtb25vc3BhY2U7XFxuXFx0Zm9udC1zaXplOiAxZW07XFxuXFx0dGV4dC1hbGlnbjogbGVmdDtcXG5cXHR3aGl0ZS1zcGFjZTogcHJlO1xcblxcdHdvcmQtc3BhY2luZzogbm9ybWFsO1xcblxcdHdvcmQtYnJlYWs6IG5vcm1hbDtcXG5cXHR3b3JkLXdyYXA6IG5vcm1hbDtcXG5cXHRsaW5lLWhlaWdodDogMS41O1xcblxcblxcdC1tb3otdGFiLXNpemU6IDQ7XFxuXFx0LW8tdGFiLXNpemU6IDQ7XFxuXFx0dGFiLXNpemU6IDQ7XFxuXFxuXFx0LXdlYmtpdC1oeXBoZW5zOiBub25lO1xcblxcdC1tb3otaHlwaGVuczogbm9uZTtcXG5cXHQtbXMtaHlwaGVuczogbm9uZTtcXG5cXHRoeXBoZW5zOiBub25lO1xcbn1cXG5cXG4vKiBDb2RlIGJsb2NrcyAqL1xcbnByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdIHtcXG5cXHRwYWRkaW5nOiAxZW07XFxuXFx0bWFyZ2luOiAuNWVtIDA7XFxuXFx0b3ZlcmZsb3c6IGF1dG87XFxuXFx0Ym9yZGVyLXJhZGl1czogMC4zZW07XFxufVxcblxcbjpub3QocHJlKSA+IGNvZGVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXSxcXG5wcmVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXSB7XFxuXFx0YmFja2dyb3VuZDogIzI3MjgyMjtcXG59XFxuXFxuLyogSW5saW5lIGNvZGUgKi9cXG46bm90KHByZSkgPiBjb2RlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl0ge1xcblxcdHBhZGRpbmc6IC4xZW07XFxuXFx0Ym9yZGVyLXJhZGl1czogLjNlbTtcXG5cXHR3aGl0ZS1zcGFjZTogbm9ybWFsO1xcbn1cXG5cXG4udG9rZW4uY29tbWVudCxcXG4udG9rZW4ucHJvbG9nLFxcbi50b2tlbi5kb2N0eXBlLFxcbi50b2tlbi5jZGF0YSB7XFxuXFx0Y29sb3I6ICM4MjkyYTI7XFxufVxcblxcbi50b2tlbi5wdW5jdHVhdGlvbiB7XFxuXFx0Y29sb3I6ICNmOGY4ZjI7XFxufVxcblxcbi50b2tlbi5uYW1lc3BhY2Uge1xcblxcdG9wYWNpdHk6IC43O1xcbn1cXG5cXG4udG9rZW4ucHJvcGVydHksXFxuLnRva2VuLnRhZyxcXG4udG9rZW4uY29uc3RhbnQsXFxuLnRva2VuLnN5bWJvbCxcXG4udG9rZW4uZGVsZXRlZCB7XFxuXFx0Y29sb3I6ICNmOTI2NzI7XFxufVxcblxcbi50b2tlbi5ib29sZWFuLFxcbi50b2tlbi5udW1iZXIge1xcblxcdGNvbG9yOiAjYWU4MWZmO1xcbn1cXG5cXG4udG9rZW4uc2VsZWN0b3IsXFxuLnRva2VuLmF0dHItbmFtZSxcXG4udG9rZW4uc3RyaW5nLFxcbi50b2tlbi5jaGFyLFxcbi50b2tlbi5idWlsdGluLFxcbi50b2tlbi5pbnNlcnRlZCB7XFxuXFx0Y29sb3I6ICNhNmUyMmU7XFxufVxcblxcbi50b2tlbi5vcGVyYXRvcixcXG4udG9rZW4uZW50aXR5LFxcbi50b2tlbi51cmwsXFxuLmxhbmd1YWdlLWNzcyAudG9rZW4uc3RyaW5nLFxcbi5zdHlsZSAudG9rZW4uc3RyaW5nLFxcbi50b2tlbi52YXJpYWJsZSB7XFxuXFx0Y29sb3I6ICNmOGY4ZjI7XFxufVxcblxcbi50b2tlbi5hdHJ1bGUsXFxuLnRva2VuLmF0dHItdmFsdWUsXFxuLnRva2VuLmZ1bmN0aW9uLFxcbi50b2tlbi5jbGFzcy1uYW1lIHtcXG5cXHRjb2xvcjogI2U2ZGI3NDtcXG59XFxuXFxuLnRva2VuLmtleXdvcmQge1xcblxcdGNvbG9yOiAjNjZkOWVmO1xcbn1cXG5cXG4udG9rZW4ucmVnZXgsXFxuLnRva2VuLmltcG9ydGFudCB7XFxuXFx0Y29sb3I6ICNmZDk3MWY7XFxufVxcblxcbi50b2tlbi5pbXBvcnRhbnQsXFxuLnRva2VuLmJvbGQge1xcblxcdGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG4udG9rZW4uaXRhbGljIHtcXG5cXHRmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcblxcbi50b2tlbi5lbnRpdHkge1xcblxcdGN1cnNvcjogaGVscDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbi5sYW5ndWFnZS1qcyB7XFxuICBmb250LXNpemU6IDAuOHZ3ICFpbXBvcnRhbnQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xcbiAgd29yZC1icmVhazogYnJlYWstd29yZCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uY29kZS10b29sYmFyIHtcXG4gIG1heC13aWR0aDogMTAwJTtcXG59XFxuXFxucHJlIHtcXG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XFxuICB0ZXh0LWFsaWduOiBsZWZ0ICFpbXBvcnRhbnQ7XFxuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXAgIWltcG9ydGFudDtcXG4gIHBhZGRpbmc6IDE1cHggMzBweCAxNXB4IDE1cHg7XFxufVxcblxcbi5hcHAtd3JhcHBlciB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xcbn1cXG5cXG5jb2RlIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcXG59XFxuXFxuaHRtbCxcXG5ib2R5IHtcXG4gIGhlaWdodDogMTAwdmg7XFxufVxcblxcbiNyb290IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGhlaWdodDogMTAwdmg7XFxufVxcblxcbi50b29sYmFyLWl0ZW0ge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG5cXG4udGVjaC1pY29uIHtcXG4gIGZpbGw6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcXG59XFxuXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9bWFpbi5jc3MubWFwICovXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL21haW4uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsU0FBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtFQUNBLDhCQUFBO0VBQ1Esc0JBQUE7QUFDVjs7QUFFQTtFQUNFLDJCQUFBO0VBQ0Esd0NBQUE7RUFDQSxpQ0FBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtBQUNGOztBQUVBO0VBQ0Usc0JBQUE7RUFDQSwyQkFBQTtFQUNBLGdDQUFBO0VBQ0EsNEJBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7RUFDQSxzQkFBQTtBQUNGOztBQUVBOztFQUVFLGFBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtBQUNGOztBQUVBO0VBQ0Usd0JBQUE7QUFDRjs7QUFFQTtFQUNFLDhCQUFBO0FBQ0Y7O0FBQ0EsbUNBQUFcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuLmxhbmd1YWdlLWpzIHtcXG4gIGZvbnQtc2l6ZTogMC44dncgIWltcG9ydGFudDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XFxuICB3b3JkLWJyZWFrOiBicmVhay13b3JkICFpbXBvcnRhbnQ7XFxufVxcblxcbi5jb2RlLXRvb2xiYXIge1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbn1cXG5cXG5wcmUge1xcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcXG4gIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcXG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcCAhaW1wb3J0YW50O1xcbiAgcGFkZGluZzogMTVweCAzMHB4IDE1cHggMTVweDtcXG59XFxuXFxuLmFwcC13cmFwcGVyIHtcXG4gIGhlaWdodDogMTAwdmg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBvdmVyZmxvdy14OiBoaWRkZW47XFxufVxcblxcbmNvZGUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcbn1cXG5cXG5odG1sLFxcbmJvZHkge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuI3Jvb3Qge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnRvb2xiYXItaXRlbSB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcblxcbi50ZWNoLWljb24ge1xcbiAgZmlsbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xcbn1cXG4vKiMgc291cmNlTWFwcGluZ1VSTD1tYWluLmNzcy5tYXAgKi9cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fIGZyb20gXCIuLi9mb250cy9jaXJjdWxhci1ib2xkLndvZmYyXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gZnJvbSBcIi4uL2ZvbnRzL1ZhcmVsYVJvdW5kLVJlZ3VsYXIudHRmXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJtYWluRm9udFxcXCI7XFxuICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpO1xcbn1cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwic2Vjb25kYXJ5XFxcIjtcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19sYXB0b3AtLTFDdUdMIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgcGFkZGluZy10b3A6IDUwLjI1JTtcXG4gIGJhY2tncm91bmQ6ICMxYTFlMmM7XFxuICBib3JkZXI6IDE1cHggc29saWQgIzNmM2Y0MTtcXG4gIGJvcmRlci10b3A6IDIwcHggc29saWQgIzNmM2Y0MTtcXG4gIGJvcmRlci1yYWRpdXM6IDE0cHggMTRweCAwIDA7XFxuICBib3gtc2hhZG93OiAwIDAgMCAxcHggI2QxZDJkNDtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2xhcHRvcC0tMUN1R0w6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgYm90dG9tOiAtMzVweDtcXG4gIGJhY2tncm91bmQ6ICNlNmU4ZTc7XFxuICBoZWlnaHQ6IDIwcHg7XFxuICB3aWR0aDogMTMwJTtcXG4gIGJvcmRlci1yYWRpdXM6IDAgMCAxMHB4IDEwcHg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19sYXB0b3AtLTFDdUdMOmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgdG9wOiAtMTJweDtcXG4gIHdpZHRoOiAzcHg7XFxuICBoZWlnaHQ6IDNweDtcXG4gIGJhY2tncm91bmQ6ICNlNmU4ZTc7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XFxufVxcblxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19iYXNlLS0xRjBLOCB7XFxuICBib3R0b206IC0yNXB4O1xcbiAgYmFja2dyb3VuZDogI2QxZDJkNDtcXG4gIGhlaWdodDogMTBweDtcXG4gIG1heC13aWR0aDogMTMwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2Jhc2UtLTFGMEs4OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJvcmRlci1yYWRpdXM6IDAgMCAxMHB4IDEwcHg7XFxuICBoZWlnaHQ6IDEwcHg7XFxuICBtYXgtd2lkdGg6IDgwcHg7XFxuICBiYWNrZ3JvdW5kOiAjYmNiZGMxO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fYmFzZS0tMUYwSzg6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBoZWlnaHQ6IDIwcHg7XFxuICBtYXgtd2lkdGg6IDEzMCU7XFxuICBib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDEwcHggMzZweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC40KTtcXG59XFxuXFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEge1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KC0xM2RlZywgIzJjNWU5MiwgIzU1MmY2ZCk7XFxuICBwYWRkaW5nOiAyMHB4IDMwcHggMjBweCAzMHB4O1xcbiAgb3ZlcmZsb3cteTogYXV0bztcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci1jb250YWluZXItLTM3SDlXIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiA3MCU7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci1jb250YWluZXItLTM3SDlXIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19sYXB0b3Atc3ZnLS0zV1JFYiB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLWNvbnRhaW5lci0tMzdIOVcgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLS0yV0ZsSCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xcbiAgdG9wOiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZm9udC1mYW1pbHk6IG1vbmFjbywgQ29uc29sYXMsIFxcXCJMdWNpZGEgQ29uc29sZVxcXCIsIG1vbm9zcGFjZTtcXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxYTFlMmM7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci1jb250YWluZXItLTM3SDlXIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci0tMldGbEggLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2xpbmUtbnVtYmVyLWNvbnRhaW5lci0tMkJTN0Ige1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgY29sb3I6ICM1NTcxOGQ7XFxuICBnYXA6IDNweDtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLWNvbnRhaW5lci0tMzdIOVcgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLS0yV0ZsSCAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGluZS1udW1iZXItY29udGFpbmVyLS0yQlM3QiAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGluZS1jb250YWluZXItLTJXc1p5IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci1jb250YWluZXItLTM3SDlXIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci0tMldGbEggLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2xpbmUtbnVtYmVyLWNvbnRhaW5lci0tMkJTN0IgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2xpbmUtY29udGFpbmVyLS0yV3NaeSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGluZS1udW1iZXItLW00eElSIHtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLWNvbnRhaW5lci0tMzdIOVcgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLS0yV0ZsSCAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGluZS1udW1iZXItY29udGFpbmVyLS0yQlM3QiAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGluZS1jb250YWluZXItLTJXc1p5IC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWxpbmUtLTMxck41IHtcXG4gIGRpc3BsYXk6IGlubGluZTtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItY29udGFpbmVyLS0zN0g5VyAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItLTJXRmxIIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jbGllbnQtZWRpdG9yLS0xRXVUSCB7XFxuICB3aWR0aDogNTAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYm9yZGVyLXJpZ2h0OiAwLjVweCBzb2xpZCBncmF5O1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItY29udGFpbmVyLS0zN0g5VyAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItLTJXRmxIIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19zZXJ2ZXItZWRpdG9yLS0xb29DcSB7XFxuICB3aWR0aDogNTAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbWFpbi1jb250ZW50LS0yY09XSCB7XFxuICB6LWluZGV4OiAzO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJtYWluRm9udFxcXCI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZm9udC1zaXplOiAzNnB4O1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgZ2FwOiA1MHB4O1xcbiAgcGFkZGluZzogMTBweDtcXG4gIG1heC13aWR0aDogMTUwMHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19tYWluLWNvbnRlbnQtLTJjT1dIIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX190ZXh0LWNvbnRlbnQtLWp1R0JjIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIHdpZHRoOiAzMCU7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA5MjBweCkge1xcbiAgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX21haW4tY29udGVudC0tMmNPV0ggLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX3RleHQtY29udGVudC0tanVHQmMge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX21haW4tY29udGVudC0tMmNPV0ggLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX3RleHQtY29udGVudC0tanVHQmMgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2xpbmUtaGVhZGVyLS0yLS03TSB7XFxuICBtYXJnaW4tYm90dG9tOiAyNXB4O1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbWFpbi1jb250ZW50LS0yY09XSCAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fdGV4dC1jb250ZW50LS1qdUdCYyAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fdGV4dC1jb250YWluZXItLTlacWFFIHtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDMwcHggMTNweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX21haW4tY29udGVudC0tMmNPV0ggLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX3RleHQtY29udGVudC0tanVHQmMgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX3RleHQtY29udGFpbmVyLS05WnFhRSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbWFpbi1oZWFkZXItLVo5c2RtIHtcXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XFxuICBiYWNrZ3JvdW5kOiAjMWUzMjY0O1xcbiAgcGFkZGluZzogNXB4IDgwcHggNXB4IDEzcHg7XFxuICBtYXJnaW4tbGVmdDogLTMwcHg7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIGxpbmUtaGVpZ2h0OiA0MHB4O1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbWFpbi1jb250ZW50LS0yY09XSCAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fdGV4dC1jb250ZW50LS1qdUdCYyAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fdGV4dC1jb250YWluZXItLTlacWFFIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19yZWFjdC1oZWFkZXItLWQ4a0dvIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHotaW5kZXg6IDE7XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbWFpbi1jb250ZW50LS0yY09XSCAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fdGV4dC1jb250ZW50LS1qdUdCYyAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fZGVzY3JpcHRpb24tLTJGQXk1IHtcXG4gIGZvbnQtZmFtaWx5OiBzZWNvbmRhcnk7XFxuICBmb250LXNpemU6IDEycHg7XFxuICByaWdodDogMDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xcbiAgbGluZS1oZWlnaHQ6IDIzcHg7XFxuICB0b3A6IDA7XFxuICBmb250LXdlaWdodDogNTAwO1xcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogOTIwcHgpIHtcXG4gIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19tYWluLWNvbnRlbnQtLTJjT1dIIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbi1yZXZlcnNlO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogNTc2cHgpIGFuZCAobWF4LXdpZHRoOiA3NjcuOThweCkge1xcbiAgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX21haW4tY29udGVudC0tMmNPV0gge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XFxuICB9XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9hYm91dC9hYm91dC5tb2R1bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHVCQUFBO0VBQ0EsNERBQUE7QUFDRjtBQUNBO0VBQ0Usd0JBQUE7RUFDQSwrREFBQTtBQUNGO0FBZ0JBO0VBQ0Usa0JBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFqQk87RUFrQlAsMEJBQUE7RUFDQSw4QkFBQTtFQUNBLDRCQUFBO0VBQ0EsNkJBQUE7QUFkRjtBQWVFO0VBQ0UsV0FBQTtFQUNBLGFBQUE7RUFDQSxtQkExQkc7RUEyQkgsWUFBQTtFQUNBLFdBdkJRO0VBd0JSLDRCQUFBO0VBdEJGLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLDJCQUFBO0FBVUY7QUFhRTtFQUNFLFdBQUE7RUFDQSxVQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxtQkFyQ0c7RUFzQ0gsa0JBQUE7RUEvQkYsa0JBQUE7RUFDQSxTQUFBO0VBQ0EsMkJBQUE7QUFxQkY7O0FBWUE7RUFDRSxhQUFBO0VBQ0EsbUJBeENNO0VBeUNOLFlBQUE7RUFDQSxlQXpDVTtFQUVWLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLDJCQUFBO0FBK0JGO0FBUUU7RUFDRSxXQUFBO0VBQ0EsNEJBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQWxERztFQUlMLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLDJCQUFBO0FBeUNGO0FBTUU7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsZUF2RFE7RUF3RFIsNEJBQUE7RUFDQSxpREFBQTtBQUpKOztBQU9BO0VBQ0UscURBQUE7RUFDQSw0QkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFrREEsa0JBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FBckRGO0FBQUU7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0FBRUo7QUFDSTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FBQ047QUFDSTtFQUNFLGFBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxrQkFBQTtFQUNBLDBEQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtBQUNOO0FBQU07RUFDRSxhQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0EsUUFBQTtBQUVSO0FBRFE7RUFDRSxhQUFBO0FBR1Y7QUFGVTtFQUNFLGtCQUFBO0FBSVo7QUFGVTtFQUNFLGVBQUE7RUFDQSxXQUFBO0FBSVo7QUFBTTtFQUNFLFVBQUE7RUFDQSxZQUFBO0VBQ0EsOEJBQUE7QUFFUjtBQUFNO0VBQ0UsVUFBQTtFQUNBLFlBQUE7QUFFUjtBQU9FO0VBQ0UsVUFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsU0FBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtFQUNBLFdBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBTEo7QUFNSTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtFQUlBLFVBQUE7QUFQTjtBQUlNO0VBSEY7SUFJSSxXQUFBO0VBRE47QUFDRjtBQUdNO0VBQ0UsbUJBQUE7QUFEUjtBQUdNO0VBQ0UscUNBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0FBRFI7QUFFUTtFQUNFLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FBQVY7QUFFUTtFQUNFLFlBQUE7RUFDQSxVQUFBO0VBQ0EsbUJBQUE7QUFBVjtBQUdNO0VBQ0Usc0JBQUE7RUFDQSxlQUFBO0VBQ0EsUUFBQTtFQUNBLGFBQUE7RUFDQSxxQ0FBQTtFQUNBLGlCQUFBO0VBQ0EsTUFBQTtFQUNBLGdCQUFBO0FBRFI7QUFJSTtFQXhERjtJQXlESSw4QkFBQTtFQURKO0FBQ0Y7O0FBTUE7RUFDRTtJQUNFLDhCQUFBO0VBSEY7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiBcXFwibWFpbkZvbnRcXFwiO1xcclxcbiAgc3JjOiB1cmwoXFxcIi4uL2ZvbnRzL2NpcmN1bGFyLWJvbGQud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIik7XFxyXFxufVxcclxcbkBmb250LWZhY2Uge1xcclxcbiAgZm9udC1mYW1pbHk6IFxcXCJzZWNvbmRhcnlcXFwiO1xcclxcbiAgc3JjOiB1cmwoXFxcIi4uL2ZvbnRzL1ZhcmVsYVJvdW5kLVJlZ3VsYXIudHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcclxcbn1cXHJcXG4kYmFja2dyb3VuZDogIzJmYWM2NjtcXHJcXG4kYmFzZTogI2U2ZThlNztcXHJcXG4kc2NyZWVuOiAjMWExZTJjO1xcclxcbiRmcmFtZTogIzNmM2Y0MTtcXHJcXG4kb3BlbjogI2JjYmRjMTtcXHJcXG4kYmFzZTI6ICNkMWQyZDQ7XFxyXFxuJGJhc2VXaWR0aDogMTMwJTtcXHJcXG5AbWl4aW4gYWxpZ24taG9yaXpvbnRhbCB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICBsZWZ0OiA1MCU7XFxyXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XFxyXFxufVxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA1NDBweCkge1xcclxcbiAgJGJhc2VXaWR0aDogMTMwJTtcXHJcXG59XFxyXFxuLmxhcHRvcCB7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBtYXJnaW46IDAgYXV0bztcXHJcXG4gIHBhZGRpbmctdG9wOiA1MC4yNSU7XFxyXFxuICBiYWNrZ3JvdW5kOiAkc2NyZWVuO1xcclxcbiAgYm9yZGVyOiAxNXB4IHNvbGlkICRmcmFtZTtcXHJcXG4gIGJvcmRlci10b3A6IDIwcHggc29saWQgJGZyYW1lO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMTRweCAxNHB4IDAgMDtcXHJcXG4gIGJveC1zaGFkb3c6IDAgMCAwIDFweCAkYmFzZTI7XFxyXFxuICAmOmJlZm9yZSB7XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcclxcbiAgICBib3R0b206IC0zNXB4O1xcclxcbiAgICBiYWNrZ3JvdW5kOiAkYmFzZTtcXHJcXG4gICAgaGVpZ2h0OiAyMHB4O1xcclxcbiAgICB3aWR0aDogJGJhc2VXaWR0aDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMCAwIDEwcHggMTBweDtcXHJcXG4gICAgQGluY2x1ZGUgYWxpZ24taG9yaXpvbnRhbDtcXHJcXG4gIH1cXHJcXG4gICY6YWZ0ZXIge1xcclxcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXHJcXG4gICAgdG9wOiAtMTJweDtcXHJcXG4gICAgd2lkdGg6IDNweDtcXHJcXG4gICAgaGVpZ2h0OiAzcHg7XFxyXFxuICAgIGJhY2tncm91bmQ6ICRiYXNlO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxuICAgIEBpbmNsdWRlIGFsaWduLWhvcml6b250YWw7XFxyXFxuICB9XFxyXFxufVxcclxcbi5iYXNlIHtcXHJcXG4gIGJvdHRvbTogLTI1cHg7XFxyXFxuICBiYWNrZ3JvdW5kOiAkYmFzZTI7XFxyXFxuICBoZWlnaHQ6IDEwcHg7XFxyXFxuICBtYXgtd2lkdGg6ICRiYXNlV2lkdGg7XFxyXFxuICBAaW5jbHVkZSBhbGlnbi1ob3Jpem9udGFsO1xcclxcbiAgJjpiZWZvcmUge1xcclxcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMCAwIDEwcHggMTBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMHB4O1xcclxcbiAgICBtYXgtd2lkdGg6IDgwcHg7XFxyXFxuICAgIGJhY2tncm91bmQ6ICRvcGVuO1xcclxcbiAgICBAaW5jbHVkZSBhbGlnbi1ob3Jpem9udGFsO1xcclxcbiAgfVxcclxcbiAgJjphZnRlciB7XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgbWF4LXdpZHRoOiAkYmFzZVdpZHRoO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xcclxcbiAgICBib3gtc2hhZG93OiAwcHggMTBweCAzNnB4IC0ycHggcmdiYSgwLCAwLCAwLCAwLjQpO1xcclxcbiAgfVxcclxcbn1cXHJcXG4uY29udGFpbmVyIHtcXHJcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgtMTNkZWcsICMyYzVlOTIsICM1NTJmNmQpO1xcclxcbiAgcGFkZGluZzogMjBweCAzMHB4IDIwcHggMzBweDtcXHJcXG4gIG92ZXJmbG93LXk6IGF1dG87XFxyXFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXHJcXG4gIC5jb2RlLWVkaXRvci1jb250YWluZXIge1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgd2lkdGg6IDcwJTtcXHJcXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDkyMHB4KSB7XFxyXFxuICAgIH1cXHJcXG4gICAgLmxhcHRvcC1zdmcge1xcclxcbiAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgfVxcclxcbiAgICAuY29kZS1lZGl0b3Ige1xcclxcbiAgICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgICAgb3ZlcmZsb3cteTogaGlkZGVuO1xcclxcbiAgICAgIHRvcDogMDtcXHJcXG4gICAgICBib3R0b206IDA7XFxyXFxuICAgICAgbGVmdDogMDtcXHJcXG4gICAgICByaWdodDogMDtcXHJcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgICAgZm9udC1mYW1pbHk6IG1vbmFjbywgQ29uc29sYXMsIFxcXCJMdWNpZGEgQ29uc29sZVxcXCIsIG1vbm9zcGFjZTtcXHJcXG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxyXFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzFhMWUyYztcXHJcXG4gICAgICAubGluZS1udW1iZXItY29udGFpbmVyIHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgICAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgIGNvbG9yOiAjNTU3MThkO1xcclxcbiAgICAgICAgZ2FwOiAzcHg7XFxyXFxuICAgICAgICAubGluZS1jb250YWluZXIge1xcclxcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICAgICAgICAubGluZS1udW1iZXIge1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcXHJcXG4gICAgICAgICAgfVxcclxcbiAgICAgICAgICAuY29kZS1saW5lIHtcXHJcXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmU7XFxyXFxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgICAgIH1cXHJcXG4gICAgICAgIH1cXHJcXG4gICAgICB9XFxyXFxuICAgICAgLmNsaWVudC1lZGl0b3Ige1xcclxcbiAgICAgICAgd2lkdGg6IDUwJTtcXHJcXG4gICAgICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgICAgIGJvcmRlci1yaWdodDogMC41cHggc29saWQgZ3JheTtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgLnNlcnZlci1lZGl0b3Ige1xcclxcbiAgICAgICAgd2lkdGg6IDUwJTtcXHJcXG4gICAgICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgICB9XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgLm1haW4tY29udGVudCB7XFxyXFxuICAgIHotaW5kZXg6IDM7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBcXFwibWFpbkZvbnRcXFwiO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmb250LXNpemU6IDM2cHg7XFxyXFxuICAgIGhlaWdodDogYXV0bztcXHJcXG4gICAgZ2FwOiA1MHB4O1xcclxcbiAgICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgICBtYXgtd2lkdGg6IDE1MDBweDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICAudGV4dC1jb250ZW50IHtcXHJcXG4gICAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA5MjBweCkge1xcclxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgfVxcclxcbiAgICAgIHdpZHRoOiAzMCU7XFxyXFxuICAgICAgLmxpbmUtaGVhZGVyIHtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDI1cHg7XFxyXFxuICAgICAgfVxcclxcbiAgICAgIC50ZXh0LWNvbnRhaW5lciB7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgICBwYWRkaW5nOiAzMHB4IDEzcHg7XFxyXFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgICAgICAubWFpbi1oZWFkZXIge1xcclxcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xcclxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjMWUzMjY0O1xcclxcbiAgICAgICAgICBwYWRkaW5nOiA1cHggODBweCA1cHggMTNweDtcXHJcXG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IC0zMHB4O1xcclxcbiAgICAgICAgICBmb250LXNpemU6IDIwcHg7XFxyXFxuICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XFxyXFxuICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxyXFxuICAgICAgICAgIHdpZHRoOiBmaXQtY29udGVudDtcXHJcXG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDQwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgICAucmVhY3QtaGVhZGVyIHtcXHJcXG4gICAgICAgICAgY29sb3I6IHdoaXRlO1xcclxcbiAgICAgICAgICB6LWluZGV4OiAxO1xcclxcbiAgICAgICAgICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcclxcbiAgICAgICAgfVxcclxcbiAgICAgIH1cXHJcXG4gICAgICAuZGVzY3JpcHRpb24ge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6IHNlY29uZGFyeTtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcXHJcXG4gICAgICAgIHJpZ2h0OiAwO1xcclxcbiAgICAgICAgcGFkZGluZzogMTBweDtcXHJcXG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XFxyXFxuICAgICAgICBsaW5lLWhlaWdodDogMjNweDtcXHJcXG4gICAgICAgIHRvcDogMDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA5MjBweCkge1xcclxcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbn1cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogNTc1Ljk4cHgpIHtcXHJcXG59XFxyXFxuQG1lZGlhIChtaW4td2lkdGg6IDU3NnB4KSBhbmQgKG1heC13aWR0aDogNzY3Ljk4cHgpIHtcXHJcXG4gIC5tYWluLWNvbnRlbnQge1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XFxyXFxuICB9XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ubG9jYWxzID0ge1xuXHRcImxhcHRvcFwiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2xhcHRvcC0tMUN1R0xcIixcblx0XCJiYXNlXCI6IFwic3JjLWFib3V0LWFib3V0LW1vZHVsZV9fYmFzZS0tMUYwSzhcIixcblx0XCJjb250YWluZXJcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBXCIsXG5cdFwiY29kZS1lZGl0b3ItY29udGFpbmVyXCI6IFwic3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItY29udGFpbmVyLS0zN0g5V1wiLFxuXHRcImxhcHRvcC1zdmdcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19sYXB0b3Atc3ZnLS0zV1JFYlwiLFxuXHRcImNvZGUtZWRpdG9yXCI6IFwic3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItLTJXRmxIXCIsXG5cdFwibGluZS1udW1iZXItY29udGFpbmVyXCI6IFwic3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGluZS1udW1iZXItY29udGFpbmVyLS0yQlM3QlwiLFxuXHRcImxpbmUtY29udGFpbmVyXCI6IFwic3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGluZS1jb250YWluZXItLTJXc1p5XCIsXG5cdFwibGluZS1udW1iZXJcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19saW5lLW51bWJlci0tbTR4SVJcIixcblx0XCJjb2RlLWxpbmVcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWxpbmUtLTMxck41XCIsXG5cdFwiY2xpZW50LWVkaXRvclwiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NsaWVudC1lZGl0b3ItLTFFdVRIXCIsXG5cdFwic2VydmVyLWVkaXRvclwiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX3NlcnZlci1lZGl0b3ItLTFvb0NxXCIsXG5cdFwibWFpbi1jb250ZW50XCI6IFwic3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbWFpbi1jb250ZW50LS0yY09XSFwiLFxuXHRcInRleHQtY29udGVudFwiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX3RleHQtY29udGVudC0tanVHQmNcIixcblx0XCJsaW5lLWhlYWRlclwiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2xpbmUtaGVhZGVyLS0yLS03TVwiLFxuXHRcInRleHQtY29udGFpbmVyXCI6IFwic3JjLWFib3V0LWFib3V0LW1vZHVsZV9fdGV4dC1jb250YWluZXItLTlacWFFXCIsXG5cdFwibWFpbi1oZWFkZXJcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19tYWluLWhlYWRlci0tWjlzZG1cIixcblx0XCJyZWFjdC1oZWFkZXJcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19yZWFjdC1oZWFkZXItLWQ4a0dvXCIsXG5cdFwiZGVzY3JpcHRpb25cIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19kZXNjcmlwdGlvbi0tMkZBeTVcIlxufTtcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fIGZyb20gXCIuLi9mb250cy9jaXJjdWxhci1ib2xkLndvZmYyXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcImxhbmRpbmdGb250XFxcIjtcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIik7XFxufVxcbioge1xcbiAgbWFyZ2luOiAwO1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIHtcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgjMmM1ZTkyLCAjNTUyZjZkKTtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgcGFkZGluZzogMzBweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRRyB7XFxuICBmb250LWZhbWlseTogXFxcImxhbmRpbmdGb250XFxcIjtcXG4gIG1heC13aWR0aDogOTUwcHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogOTUwcHgpIHtcXG4gIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRRyB7XFxuICAgIG1heC13aWR0aDogNzUwcHg7XFxuICB9XFxufVxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NvbnRhaW5lci0tMml3ckcge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMTBweDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3OTVweCkge1xcbiAgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB9XFxufVxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NvbnRhaW5lci0tMml3ckcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZXh0LWNvbnRhaW5lci0tMjFnUl8ge1xcbiAgei1pbmRleDogNTtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBjb2xvcjogYmxhY2s7XFxuICB3aWR0aDogMzMuMzMzMzMzMzMlO1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3OTVweCkge1xcbiAgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RleHQtY29udGFpbmVyLS0yMWdSXyB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBwYWRkaW5nOiAwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIH1cXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RleHQtY29udGFpbmVyLS0yMWdSXyBzcGFuIHtcXG4gIHotaW5kZXg6IDU7XFxuICBwYWRkaW5nOiAxM3B4O1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxuICBib3gtc2hhZG93OiAwIDIuOHB4IDIuMnB4IHJnYmEoMTMxLCA5NiwgMTk1LCAwLjQpLCAwIDYuN3B4IDUuM3B4IHJnYmEoMCwgMCwgMCwgMC4wNDgpLCAwIDEyLjVweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4wNiksIDAgMjIuM3B4IDE3LjlweCByZ2JhKDAsIDAsIDAsIDAuMDcyKSwgMCA0MS44cHggMzMuNHB4IHJnYmEoMCwgMCwgMCwgMC4wODYpLCAwIDEwMHB4IDgwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RleHQtY29udGFpbmVyLS0yMWdSXyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX21haW4tdGl0bGUtLTFsVHd1IHtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBtYXJnaW4tYm90dG9tOiAzcmVtO1xcbiAgZm9udC1zaXplOiA4MHB4O1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMDk0cHgpIHtcXG4gIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NvbnRhaW5lci0tMml3ckcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZXh0LWNvbnRhaW5lci0tMjFnUl8gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19tYWluLXRpdGxlLS0xbFR3dSB7XFxuICAgIGZvbnQtc2l6ZTogNjBweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDc5NXB4KSB7XFxuICAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGV4dC1jb250YWluZXItLTIxZ1JfIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fbWFpbi10aXRsZS0tMWxUd3Uge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNDkwcHgpIHtcXG4gIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NvbnRhaW5lci0tMml3ckcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZXh0LWNvbnRhaW5lci0tMjFnUl8gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19tYWluLXRpdGxlLS0xbFR3dSB7XFxuICAgIGZvbnQtc2l6ZTogNTBweDtcXG4gIH1cXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RleHQtY29udGFpbmVyLS0yMWdSXyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2Rlc2NyaXB0aW9uLS0yWHhKRCB7XFxuICBjb2xvcjogd2hpdGU7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgZm9udC1zaXplOiAyNnB4O1xcbiAgbGluZS1oZWlnaHQ6IDEuMjtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMDk0cHgpIHtcXG4gIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NvbnRhaW5lci0tMml3ckcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZXh0LWNvbnRhaW5lci0tMjFnUl8gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19kZXNjcmlwdGlvbi0tMlh4SkQge1xcbiAgICBmb250LXNpemU6IDIwcHg7XFxuICB9XFxufVxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NvbnRhaW5lci0tMml3ckcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pbWFnZS1jb250YWluZXItLTE2UEk3IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGdhcDogNnB4O1xcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogOTUwcHgpIHtcXG4gIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NvbnRhaW5lci0tMml3ckcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pbWFnZS1jb250YWluZXItLTE2UEk3IHtcXG4gICAgd2lkdGg6IDY2LjY2NjY2NjY3JTtcXG4gIH1cXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ltYWdlLWNvbnRhaW5lci0tMTZQSTcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jaGF0LXByb2plY3QtY29udGFpbmVyLS0xaDR4YyB7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faW1hZ2UtY29udGFpbmVyLS0xNlBJNyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3Byb2plY3QtY29udGFpbmVyLS0yYWgxQiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGZsZXg6IDAgMCAzMi41JTtcXG4gIGJveC1zaGFkb3c6IDAgMi44cHggMi4ycHggcmdiYSgwLCAwLCAwLCAwLjAzNCksIDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksIDAgMTIuNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA2KSwgMCAyMi4zcHggMTcuOXB4IHJnYmEoMCwgMCwgMCwgMC4wNzIpLCAwIDQxLjhweCAzMy40cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksIDAgMTAwcHggODBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNTQwcHgpIHtcXG4gIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NvbnRhaW5lci0tMml3ckcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pbWFnZS1jb250YWluZXItLTE2UEk3IC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcHJvamVjdC1jb250YWluZXItLTJhaDFCIHtcXG4gICAgZmxleDogMCAwIDMyLjMlO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNDUwcHgpIHtcXG4gIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NvbnRhaW5lci0tMml3ckcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pbWFnZS1jb250YWluZXItLTE2UEk3IC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcHJvamVjdC1jb250YWluZXItLTJhaDFCIHtcXG4gICAgZmxleDogMCAwIDMxJTtcXG4gIH1cXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ltYWdlLWNvbnRhaW5lci0tMTZQSTcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19wcm9qZWN0LWNvbnRhaW5lci0tMmFoMUIgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19naXQtaWNvbi0tMVhmSVQge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ltYWdlLWNvbnRhaW5lci0tMTZQSTcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19wcm9qZWN0LWNvbnRhaW5lci0tMmFoMUI6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjkpO1xcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faW1hZ2UtY29udGFpbmVyLS0xNlBJNyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3Byb2plY3QtY29udGFpbmVyLS0yYWgxQjpob3ZlciAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2dpdC1pY29uLS0xWGZJVCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBmaWxsOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBtYXJnaW46IGF1dG87XFxuICB3aWR0aDogNTVweDtcXG4gIGhlaWdodDogNTVweDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faW1hZ2UtY29udGFpbmVyLS0xNlBJNyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3Byb2plY3QtY29udGFpbmVyLS0yYWgxQjpob3ZlciAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3Byb2plY3QtaW1hZ2UtLTMyYThrIHtcXG4gIG9wYWNpdHk6IDAuMztcXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ltYWdlLWNvbnRhaW5lci0tMTZQSTcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19wcm9qZWN0LWNvbnRhaW5lci0tMmFoMUIgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19wb3J0Zm9saW8taW1hZ2UtLTJUODJXIHtcXG4gIG9wYWNpdHk6IDAuNSAhaW1wb3J0YW50O1xcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faW1hZ2UtY29udGFpbmVyLS0xNlBJNyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3Byb2plY3QtY29udGFpbmVyLS0yYWgxQiAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3Byb2plY3QtaW1hZ2UtLTMyYThrIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxuICBvcGFjaXR5OiAwLjg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbn1cXG5cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtd3JhcHBlci0tMVJScjEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxuICBnYXA6IDE1cHg7XFxufVxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC13cmFwcGVyLS0xUlJyMSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtY29udGFpbmVyLXRpdGxlLS0xcEE0TiB7XFxuICBib3JkZXItYm90dG9tOiAwLjNweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpO1xcbiAgZm9udC1zaXplOiAyM3B4O1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNzk1cHgpIHtcXG4gIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC13cmFwcGVyLS0xUlJyMSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtY29udGFpbmVyLXRpdGxlLS0xcEE0TiB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxufVxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC13cmFwcGVyLS0xUlJyMSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtaWNvbi1jb250YWluZXItLU5Qa0dPIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBib3gtc2hhZG93OiAwIDIuOHB4IDIuMnB4IHJnYmEoMTMxLCA5NiwgMTk1LCAwLjQpLCAwIDYuN3B4IDUuM3B4IHJnYmEoMCwgMCwgMCwgMC4wNDgpLCAwIDEyLjVweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4wNiksIDAgMjIuM3B4IDE3LjlweCByZ2JhKDAsIDAsIDAsIDAuMDcyKSwgMCA0MS44cHggMzMuNHB4IHJnYmEoMCwgMCwgMCwgMC4wODYpLCAwIDEwMHB4IDgwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XFxuICBnYXA6IDIwcHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtd3JhcHBlci0tMVJScjEgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLWljb24tY29udGFpbmVyLS1OUGtHTyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ljb24tY29udGFpbmVyLS15LXNocyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDRweCk7XFxuICB3aWR0aDogNSU7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDQ5MHB4KSB7XFxuICAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtd3JhcHBlci0tMVJScjEgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLWljb24tY29udGFpbmVyLS1OUGtHTyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ljb24tY29udGFpbmVyLS15LXNocyB7XFxuICAgIHdpZHRoOiAxMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gIH1cXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLXdyYXBwZXItLTFSUnIxIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC1pY29uLWNvbnRhaW5lci0tTlBrR08gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pY29uLWNvbnRhaW5lci0teS1zaHMgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pY29uLWxhYmVsLS0yaUFzQiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB6LWluZGV4OiA1O1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLXdyYXBwZXItLTFSUnIxIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC1pY29uLWNvbnRhaW5lci0tTlBrR08gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pY29uLWNvbnRhaW5lci0teS1zaHMgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLWljb24tLTE4SHlzIHtcXG4gIGZpbGw6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2xhbmRpbmcvbGFuZGluZy5tb2R1bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLDBCQUFBO0VBQ0EsNERBQUE7QUFDRjtBQUNBO0VBQ0UsU0FBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxVQUFBO0FBQ0Y7O0FBQ0E7RUFDRSw2Q0FBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUFFRjtBQURFO0VBQ0UsMEJBQUE7RUFDQSxnQkFBQTtFQUlBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBQUo7QUFMSTtFQUhGO0lBSUksZ0JBQUE7RUFRSjtBQUNGO0FBSkk7RUFJRSxhQUFBO0VBQ0EsU0FBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtBQUdOO0FBWk07RUFERjtJQUVJLHNCQUFBO0VBZU47QUFDRjtBQVBNO0VBQ0UsVUFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFNQSxtQkFBQTtFQUNBLG1CQUFBO0FBSVI7QUFWUTtFQUxGO0lBTUksV0FBQTtJQUNBLFlBQUE7SUFDQSxrQkFBQTtFQWFSO0FBQ0Y7QUFWUTtFQUNFLFVBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxzT0FBQTtBQVlWO0FBTFE7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7QUFPVjtBQU5VO0VBTEY7SUFNSSxlQUFBO0VBU1Y7QUFDRjtBQVJVO0VBUkY7SUFTSSxXQUFBO0lBQ0Esa0JBQUE7RUFXVjtBQUNGO0FBVlU7RUFaRjtJQWFJLGVBQUE7RUFhVjtBQUNGO0FBWFE7RUFDRSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBTUEsZ0JBQUE7RUFDQSxnQkFBQTtBQVFWO0FBZFU7RUFKRjtJQUtJLGVBQUE7RUFpQlY7QUFDRjtBQVZNO0VBQ0UsYUFBQTtFQUNBLFdBQUE7RUFJQSxlQUFBO0VBQ0EsUUFBQTtBQVNSO0FBYlE7RUFIRjtJQUlJLG1CQUFBO0VBZ0JSO0FBQ0Y7QUFiUTtFQUNFLHNCQUFBO0FBZVY7QUFiUTtFQVdFLHVCQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSxtT0FBQTtFQU1BLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFBVjtBQXRCVTtFQURGO0lBRUksZUFBQTtFQXlCVjtBQUNGO0FBeEJVO0VBSkY7SUFLSSxhQUFBO0VBMkJWO0FBQ0Y7QUExQlU7RUFDRSxhQUFBO0FBNEJaO0FBWlU7RUFDRSxvQ0FBQTtBQWNaO0FBYlk7RUFDRSxrQkFBQTtFQUNBLDhCQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QUFlZDtBQWJZO0VBQ0UsWUFBQTtBQWVkO0FBWlU7RUFDRSx1QkFBQTtBQWNaO0FBWlU7RUFDRSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQWNaOztBQVBBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtFQUNBLFNBQUE7QUFVRjtBQVRFO0VBQ0Usb0RBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtBQVdKO0FBVkk7RUFKRjtJQUtJLFdBQUE7SUFDQSxrQkFBQTtFQWFKO0FBQ0Y7QUFYRTtFQUNFLGFBQUE7RUFDQSxzT0FBQTtFQUlBLHFDQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSw2QkFBQTtBQVVKO0FBVEk7RUFDRSxhQUFBO0VBQ0EsMEJBQUE7RUFDQSxTQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7QUFXTjtBQVZNO0VBUkY7SUFTSSxVQUFBO0lBQ0EsWUFBQTtFQWFOO0FBQ0Y7QUFaTTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtBQWNSO0FBWk07RUFDRSw4QkFBQTtBQWNSXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcclxcbiAgZm9udC1mYW1pbHk6IFxcXCJsYW5kaW5nRm9udFxcXCI7XFxyXFxuICBzcmM6IHVybChcXFwiLi4vZm9udHMvY2lyY3VsYXItYm9sZC53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKTtcXHJcXG59XFxyXFxuKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBsaXN0LXN0eWxlOiBub25lO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxufVxcclxcbi53cmFwcGVyIHtcXHJcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgjMmM1ZTkyLCAjNTUyZjZkKTtcXHJcXG4gIG92ZXJmbG93OiBhdXRvO1xcclxcbiAgbWluLWhlaWdodDogMTAwdmg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgcGFkZGluZzogMzBweDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAuY2VudGVyLWNvbnRhaW5lciB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBcXFwibGFuZGluZ0ZvbnRcXFwiO1xcclxcbiAgICBtYXgtd2lkdGg6IDk1MHB4O1xcclxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogOTUwcHgpIHtcXHJcXG4gICAgICBtYXgtd2lkdGg6IDc1MHB4O1xcclxcbiAgICB9XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcclxcbiAgICAuY29udGFpbmVyIHtcXHJcXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogNzk1cHgpIHtcXHJcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgICAgfVxcclxcbiAgICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgICAgZ2FwOiAxMHB4O1xcclxcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcXHJcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICAgIC50ZXh0LWNvbnRhaW5lciB7XFxyXFxuICAgICAgICB6LWluZGV4OiA1O1xcclxcbiAgICAgICAgcGFkZGluZzogMTVweDtcXHJcXG4gICAgICAgIGNvbG9yOiBibGFjaztcXHJcXG4gICAgICAgIHdpZHRoOiAzMy4zMzMzMzMzMyU7XFxyXFxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNzk1cHgpIHtcXHJcXG4gICAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgICAgIHBhZGRpbmc6IDBweDtcXHJcXG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAgICAgfVxcclxcbiAgICAgICAgaGVpZ2h0OiBmaXQtY29udGVudDtcXHJcXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDE1cHg7XFxyXFxuICAgICAgICBzcGFuIHtcXHJcXG4gICAgICAgICAgei1pbmRleDogNTtcXHJcXG4gICAgICAgICAgcGFkZGluZzogMTNweDtcXHJcXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xcclxcbiAgICAgICAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxNXB4O1xcclxcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDIuOHB4IDIuMnB4IHJnYmEoMTMxLCA5NiwgMTk1LCAwLjQpLFxcclxcbiAgICAgICAgICAgIDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksXFxyXFxuICAgICAgICAgICAgMCAxMi41cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMDYpLFxcclxcbiAgICAgICAgICAgIDAgMjIuM3B4IDE3LjlweCByZ2JhKDAsIDAsIDAsIDAuMDcyKSxcXHJcXG4gICAgICAgICAgICAwIDQxLjhweCAzMy40cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksXFxyXFxuICAgICAgICAgICAgMCAxMDBweCA4MHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgICAubWFpbi10aXRsZSB7XFxyXFxuICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XFxyXFxuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDNyZW07XFxyXFxuICAgICAgICAgIGZvbnQtc2l6ZTogODBweDtcXHJcXG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDE7XFxyXFxuICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiAxMDk0cHgpIHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IDYwcHg7XFxyXFxuICAgICAgICAgIH1cXHJcXG4gICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc5NXB4KSB7XFxyXFxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAgICAgICB9XFxyXFxuICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OTBweCkge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNTBweDtcXHJcXG4gICAgICAgICAgfVxcclxcbiAgICAgICAgfVxcclxcbiAgICAgICAgLmRlc2NyaXB0aW9uIHtcXHJcXG4gICAgICAgICAgY29sb3I6IHdoaXRlO1xcclxcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcclxcbiAgICAgICAgICBmb250LXNpemU6IDI2cHg7XFxyXFxuICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiAxMDk0cHgpIHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IDIwcHg7XFxyXFxuICAgICAgICAgIH1cXHJcXG4gICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ5MHB4KSB7XFxyXFxuICAgICAgICAgIH1cXHJcXG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuMjtcXHJcXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgICB9XFxyXFxuICAgICAgLmltYWdlLWNvbnRhaW5lciB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogOTUwcHgpIHtcXHJcXG4gICAgICAgICAgd2lkdGg6IDY2LjY2NjY2NjY3JTtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgICAgIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gICAgICAgIGdhcDogNnB4O1xcclxcbiAgICAgICAgLmNoYXQtcHJvamVjdC1jb250YWluZXIge1xcclxcbiAgICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcclxcbiAgICAgICAgfVxcclxcbiAgICAgICAgLnByb2plY3QtY29udGFpbmVyIHtcXHJcXG4gICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDU0MHB4KSB7XFxyXFxuICAgICAgICAgICAgZmxleDogMCAwIDMyLjMlO1xcclxcbiAgICAgICAgICB9XFxyXFxuICAgICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0NTBweCkge1xcclxcbiAgICAgICAgICAgIGZsZXg6IDAgMCAzMSU7XFxyXFxuICAgICAgICAgIH1cXHJcXG4gICAgICAgICAgLmdpdC1pY29uIHtcXHJcXG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICAgICAgICB9XFxyXFxuICAgICAgICAgIC8vIG9wYWNpdHk6IDA7XFxyXFxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcclxcbiAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgICAgIGZsZXg6IDAgMCAzMi41JTtcXHJcXG4gICAgICAgICAgYm94LXNoYWRvdzogMCAyLjhweCAyLjJweCByZ2JhKDAsIDAsIDAsIDAuMDM0KSxcXHJcXG4gICAgICAgICAgICAwIDYuN3B4IDUuM3B4IHJnYmEoMCwgMCwgMCwgMC4wNDgpLFxcclxcbiAgICAgICAgICAgIDAgMTIuNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA2KSxcXHJcXG4gICAgICAgICAgICAwIDIyLjNweCAxNy45cHggcmdiYSgwLCAwLCAwLCAwLjA3MiksXFxyXFxuICAgICAgICAgICAgMCA0MS44cHggMzMuNHB4IHJnYmEoMCwgMCwgMCwgMC4wODYpLFxcclxcbiAgICAgICAgICAgIDAgMTAwcHggODBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcclxcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgICAgICAgIGZsb2F0OiBsZWZ0O1xcclxcbiAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgICAgICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC45KTtcXHJcXG4gICAgICAgICAgICAuZ2l0LWljb24ge1xcclxcbiAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICAgICAgICAgICAgZmlsbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQpO1xcclxcbiAgICAgICAgICAgICAgdG9wOiAwO1xcclxcbiAgICAgICAgICAgICAgYm90dG9tOiAwO1xcclxcbiAgICAgICAgICAgICAgbGVmdDogMDtcXHJcXG4gICAgICAgICAgICAgIHJpZ2h0OiAwO1xcclxcbiAgICAgICAgICAgICAgbWFyZ2luOiBhdXRvO1xcclxcbiAgICAgICAgICAgICAgd2lkdGg6IDU1cHg7XFxyXFxuICAgICAgICAgICAgICBoZWlnaHQ6IDU1cHg7XFxyXFxuICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgICAgICAgICB9XFxyXFxuICAgICAgICAgICAgLnByb2plY3QtaW1hZ2Uge1xcclxcbiAgICAgICAgICAgICAgb3BhY2l0eTogMC4zO1xcclxcbiAgICAgICAgICAgIH1cXHJcXG4gICAgICAgICAgfVxcclxcbiAgICAgICAgICAucG9ydGZvbGlvLWltYWdlIHtcXHJcXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjUgIWltcG9ydGFudDtcXHJcXG4gICAgICAgICAgfVxcclxcbiAgICAgICAgICAucHJvamVjdC1pbWFnZSB7XFxyXFxuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgICAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XFxyXFxuICAgICAgICAgICAgb3BhY2l0eTogMC44O1xcclxcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXHJcXG4gICAgICAgICAgfVxcclxcbiAgICAgICAgfVxcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbn1cXHJcXG4udGVjaC13cmFwcGVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgZ2FwOiAxNXB4O1xcclxcbiAgLnRlY2gtY29udGFpbmVyLXRpdGxlIHtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogMC4zcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcXHJcXG4gICAgZm9udC1zaXplOiAyM3B4O1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3OTVweCkge1xcclxcbiAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbiAgLnRlY2gtaWNvbi1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBib3gtc2hhZG93OiAwIDIuOHB4IDIuMnB4IHJnYmEoMTMxLCA5NiwgMTk1LCAwLjQpLFxcclxcbiAgICAgIDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksIDAgMTIuNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA2KSxcXHJcXG4gICAgICAwIDIyLjNweCAxNy45cHggcmdiYSgwLCAwLCAwLCAwLjA3MiksIDAgNDEuOHB4IDMzLjRweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSxcXHJcXG4gICAgICAwIDEwMHB4IDgwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXHJcXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcXHJcXG4gICAgcGFkZGluZzogNXB4O1xcclxcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XFxyXFxuICAgIGdhcDogMjBweDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcclxcbiAgICAuaWNvbi1jb250YWluZXIge1xcclxcbiAgICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDRweCk7XFxyXFxuICAgICAgd2lkdGg6IDUlO1xcclxcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OTBweCkge1xcclxcbiAgICAgICAgd2lkdGg6IDEwJTtcXHJcXG4gICAgICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgLmljb24tbGFiZWwge1xcclxcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAgICAgei1pbmRleDogNTtcXHJcXG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxyXFxuICAgICAgfVxcclxcbiAgICAgIC50ZWNoLWljb24ge1xcclxcbiAgICAgICAgZmlsbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLmxvY2FscyA9IHtcblx0XCJ3cmFwcGVyXCI6IFwic3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtXCIsXG5cdFwiY2VudGVyLWNvbnRhaW5lclwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRR1wiLFxuXHRcImNvbnRhaW5lclwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHXCIsXG5cdFwidGV4dC1jb250YWluZXJcIjogXCJzcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGV4dC1jb250YWluZXItLTIxZ1JfXCIsXG5cdFwibWFpbi10aXRsZVwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19tYWluLXRpdGxlLS0xbFR3dVwiLFxuXHRcImRlc2NyaXB0aW9uXCI6IFwic3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2Rlc2NyaXB0aW9uLS0yWHhKRFwiLFxuXHRcImltYWdlLWNvbnRhaW5lclwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pbWFnZS1jb250YWluZXItLTE2UEk3XCIsXG5cdFwiY2hhdC1wcm9qZWN0LWNvbnRhaW5lclwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jaGF0LXByb2plY3QtY29udGFpbmVyLS0xaDR4Y1wiLFxuXHRcInByb2plY3QtY29udGFpbmVyXCI6IFwic3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3Byb2plY3QtY29udGFpbmVyLS0yYWgxQlwiLFxuXHRcImdpdC1pY29uXCI6IFwic3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2dpdC1pY29uLS0xWGZJVFwiLFxuXHRcInByb2plY3QtaW1hZ2VcIjogXCJzcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcHJvamVjdC1pbWFnZS0tMzJhOGtcIixcblx0XCJwb3J0Zm9saW8taW1hZ2VcIjogXCJzcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcG9ydGZvbGlvLWltYWdlLS0yVDgyV1wiLFxuXHRcInRlY2gtd3JhcHBlclwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLXdyYXBwZXItLTFSUnIxXCIsXG5cdFwidGVjaC1jb250YWluZXItdGl0bGVcIjogXCJzcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC1jb250YWluZXItdGl0bGUtLTFwQTROXCIsXG5cdFwidGVjaC1pY29uLWNvbnRhaW5lclwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLWljb24tY29udGFpbmVyLS1OUGtHT1wiLFxuXHRcImljb24tY29udGFpbmVyXCI6IFwic3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ljb24tY29udGFpbmVyLS15LXNoc1wiLFxuXHRcImljb24tbGFiZWxcIjogXCJzcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faWNvbi1sYWJlbC0tMmlBc0JcIixcblx0XCJ0ZWNoLWljb25cIjogXCJzcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC1pY29uLS0xOEh5c1wiXG59O1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhaW5lci0tMU5ydVUge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBib3R0b206IDA7XFxuICB6LWluZGV4OiA1O1xcbiAgcGFkZGluZzogMjBweDtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDE2MDVweCkge1xcbiAgLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFpbmVyLS0xTnJ1VSB7XFxuICAgIHJpZ2h0OiAyMHB4O1xcbiAgICB0b3A6IDIwcHg7XFxuICAgIGJvdHRvbTogYXV0bztcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgbGVmdDogYXV0bztcXG4gIH1cXG59XFxuLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFpbmVyLS0xTnJ1VSAuc3JjLW5hdmJhci1uYXZiYXItbW9kdWxlX19jb250YWN0LWljb24tY29udGFpbmVyLS0xelJsVSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAyMHB4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNjA1cHgpIHtcXG4gIC5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhaW5lci0tMU5ydVUgLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFjdC1pY29uLWNvbnRhaW5lci0tMXpSbFUge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgfVxcbn1cXG4uc3JjLW5hdmJhci1uYXZiYXItbW9kdWxlX19jb250YWluZXItLTFOcnVVIC5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhY3QtaWNvbi1jb250YWluZXItLTF6UmxVIC5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhY3QtaWNvbi0tbGMzZ1Mge1xcbiAgZmlsbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xcbiAgd2lkdGg6IDIwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBoZWlnaHQ6IDIwcHg7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNjMwLjk4cHgpIHtcXG4gIC5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhaW5lci0tMU5ydVUgLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFjdC1pY29uLWNvbnRhaW5lci0tMXpSbFUgLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFjdC1pY29uLS1sYzNnUyB7XFxuICAgIGZpbGw6IHdoaXRlO1xcbiAgfVxcbn1cXG4uc3JjLW5hdmJhci1uYXZiYXItbW9kdWxlX19jb250YWluZXItLTFOcnVVIC5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhY3QtaWNvbi1jb250YWluZXItLTF6UmxVIC5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhY3QtaWNvbi0tbGMzZ1M6aG92ZXIge1xcbiAgZmlsbDogd2hpdGU7XFxufVxcbi5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhaW5lci0tMU5ydVUgLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fZGl2aWRlci1saW5lLS0yZXBhXyB7XFxuICBoZWlnaHQ6IDg1JTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yOCk7XFxuICB0b3A6IDE1MHB4O1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgd2lkdGg6IDJweDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL25hdmJhci9uYXZiYXIubW9kdWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxlQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtBQUNGO0FBQUU7RUFWRjtJQVdJLFdBQUE7SUFDQSxTQUFBO0lBQ0EsWUFBQTtJQUNBLG1CQUFBO0lBQ0EsVUFBQTtFQUdGO0FBQ0Y7QUFGRTtFQUlFLGFBQUE7RUFDQSxTQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBQ0o7QUFSSTtFQURGO0lBRUksbUJBQUE7RUFXSjtBQUNGO0FBTEk7RUFDRSw4QkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtBQU9OO0FBTk07RUFMRjtJQU1JLFdBQUE7RUFTTjtBQUNGO0FBUk07RUFDRSxXQUFBO0FBVVI7QUFORTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLHFDQUFBO0VBQ0EsVUFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7RUFDQSxVQUFBO0FBUUpcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmNvbnRhaW5lciB7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgdG9wOiAwO1xcclxcbiAgbGVmdDogMDtcXHJcXG4gIGJvdHRvbTogMDtcXHJcXG4gIHotaW5kZXg6IDU7XFxyXFxuICBwYWRkaW5nOiAyMHB4O1xcclxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDE2MDVweCkge1xcclxcbiAgICByaWdodDogMjBweDtcXHJcXG4gICAgdG9wOiAyMHB4O1xcclxcbiAgICBib3R0b206IGF1dG87XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICAgIGxlZnQ6IGF1dG87XFxyXFxuICB9XFxyXFxuICAuY29udGFjdC1pY29uLWNvbnRhaW5lciB7XFxyXFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiAxNjA1cHgpIHtcXHJcXG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcclxcbiAgICB9XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGdhcDogMjBweDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcclxcbiAgICAuY29udGFjdC1pY29uIHtcXHJcXG4gICAgICBmaWxsOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyk7XFxyXFxuICAgICAgd2lkdGg6IDIwcHg7XFxyXFxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogMTYzMC45OHB4KSB7XFxyXFxuICAgICAgICBmaWxsOiB3aGl0ZTtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgJjpob3ZlciB7XFxyXFxuICAgICAgICBmaWxsOiB3aGl0ZTtcXHJcXG4gICAgICB9XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG4gIC5kaXZpZGVyLWxpbmUge1xcclxcbiAgICBoZWlnaHQ6IDg1JTtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjgpO1xcclxcbiAgICB0b3A6IDE1MHB4O1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICByaWdodDogMDtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxyXFxuICAgIHdpZHRoOiAycHg7XFxyXFxuICB9XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ubG9jYWxzID0ge1xuXHRcImNvbnRhaW5lclwiOiBcInNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFpbmVyLS0xTnJ1VVwiLFxuXHRcImNvbnRhY3QtaWNvbi1jb250YWluZXJcIjogXCJzcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhY3QtaWNvbi1jb250YWluZXItLTF6UmxVXCIsXG5cdFwiY29udGFjdC1pY29uXCI6IFwic3JjLW5hdmJhci1uYXZiYXItbW9kdWxlX19jb250YWN0LWljb24tLWxjM2dTXCIsXG5cdFwiZGl2aWRlci1saW5lXCI6IFwic3JjLW5hdmJhci1uYXZiYXItbW9kdWxlX19kaXZpZGVyLWxpbmUtLTJlcGFfXCJcbn07XG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnksIGRlZHVwZSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfaV0pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCJcIi5jb25jYXQobWVkaWFRdWVyeSwgXCIgYW5kIFwiKS5jb25jYXQoaXRlbVsyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKSB7XG4gIHZhciBfaXRlbSA9IF9zbGljZWRUb0FycmF5KGl0ZW0sIDQpLFxuICAgICAgY29udGVudCA9IF9pdGVtWzFdLFxuICAgICAgY3NzTWFwcGluZyA9IF9pdGVtWzNdO1xuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgb3B0aW9ucyA9IHt9O1xuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZSwgbm8tcGFyYW0tcmVhc3NpZ25cblxuXG4gIHVybCA9IHVybCAmJiB1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsO1xuXG4gIGlmICh0eXBlb2YgdXJsICE9PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfSAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJQcmlzbS5sYW5ndWFnZXMuY2xpa2UgPSB7XG5cdCdjb21tZW50JzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXlxcXFxdKVxcL1xcKltcXHNcXFNdKj8oPzpcXCpcXC98JCkvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGdyZWVkeTogdHJ1ZVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteXFxcXDpdKVxcL1xcLy4qLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRncmVlZHk6IHRydWVcblx0XHR9XG5cdF0sXG5cdCdzdHJpbmcnOiB7XG5cdFx0cGF0dGVybjogLyhbXCInXSkoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXwoPyFcXDEpW15cXFxcXFxyXFxuXSkqXFwxLyxcblx0XHRncmVlZHk6IHRydWVcblx0fSxcblx0J2NsYXNzLW5hbWUnOiB7XG5cdFx0cGF0dGVybjogLyhcXGIoPzpjbGFzc3xpbnRlcmZhY2V8ZXh0ZW5kc3xpbXBsZW1lbnRzfHRyYWl0fGluc3RhbmNlb2Z8bmV3KVxccyt8XFxiY2F0Y2hcXHMrXFwoKVtcXHcuXFxcXF0rL2ksXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdwdW5jdHVhdGlvbic6IC9bLlxcXFxdL1xuXHRcdH1cblx0fSxcblx0J2tleXdvcmQnOiAvXFxiKD86aWZ8ZWxzZXx3aGlsZXxkb3xmb3J8cmV0dXJufGlufGluc3RhbmNlb2Z8ZnVuY3Rpb258bmV3fHRyeXx0aHJvd3xjYXRjaHxmaW5hbGx5fG51bGx8YnJlYWt8Y29udGludWUpXFxiLyxcblx0J2Jvb2xlYW4nOiAvXFxiKD86dHJ1ZXxmYWxzZSlcXGIvLFxuXHQnZnVuY3Rpb24nOiAvXFx3Kyg/PVxcKCkvLFxuXHQnbnVtYmVyJzogL1xcYjB4W1xcZGEtZl0rXFxifCg/OlxcYlxcZCsoPzpcXC5cXGQqKT98XFxCXFwuXFxkKykoPzplWystXT9cXGQrKT8vaSxcblx0J29wZXJhdG9yJzogL1s8Pl09P3xbIT1dPT89P3wtLT98XFwrXFwrP3wmJj98XFx8XFx8P3xbPyovfl4lXS8sXG5cdCdwdW5jdHVhdGlvbic6IC9be31bXFxdOygpLC46XS9cbn07XG4iLCIvLy8gPHJlZmVyZW5jZSBsaWI9XCJXZWJXb3JrZXJcIi8+XG5cbnZhciBfc2VsZiA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJylcblx0PyB3aW5kb3cgICAvLyBpZiBpbiBicm93c2VyXG5cdDogKFxuXHRcdCh0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnICYmIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSlcblx0XHQ/IHNlbGYgLy8gaWYgaW4gd29ya2VyXG5cdFx0OiB7fSAgIC8vIGlmIGluIG5vZGUganNcblx0KTtcblxuLyoqXG4gKiBQcmlzbTogTGlnaHR3ZWlnaHQsIHJvYnVzdCwgZWxlZ2FudCBzeW50YXggaGlnaGxpZ2h0aW5nXG4gKlxuICogQGxpY2Vuc2UgTUlUIDxodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVD5cbiAqIEBhdXRob3IgTGVhIFZlcm91IDxodHRwczovL2xlYS52ZXJvdS5tZT5cbiAqIEBuYW1lc3BhY2VcbiAqIEBwdWJsaWNcbiAqL1xudmFyIFByaXNtID0gKGZ1bmN0aW9uIChfc2VsZil7XG5cbi8vIFByaXZhdGUgaGVscGVyIHZhcnNcbnZhciBsYW5nID0gL1xcYmxhbmcoPzp1YWdlKT8tKFtcXHctXSspXFxiL2k7XG52YXIgdW5pcXVlSWQgPSAwO1xuXG5cbnZhciBfID0ge1xuXHQvKipcblx0ICogQnkgZGVmYXVsdCwgUHJpc20gd2lsbCBhdHRlbXB0IHRvIGhpZ2hsaWdodCBhbGwgY29kZSBlbGVtZW50cyAoYnkgY2FsbGluZyB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0QWxsfSkgb24gdGhlXG5cdCAqIGN1cnJlbnQgcGFnZSBhZnRlciB0aGUgcGFnZSBmaW5pc2hlZCBsb2FkaW5nLiBUaGlzIG1pZ2h0IGJlIGEgcHJvYmxlbSBpZiBlLmcuIHlvdSB3YW50ZWQgdG8gYXN5bmNocm9ub3VzbHkgbG9hZFxuXHQgKiBhZGRpdGlvbmFsIGxhbmd1YWdlcyBvciBwbHVnaW5zIHlvdXJzZWxmLlxuXHQgKlxuXHQgKiBCeSBzZXR0aW5nIHRoaXMgdmFsdWUgdG8gYHRydWVgLCBQcmlzbSB3aWxsIG5vdCBhdXRvbWF0aWNhbGx5IGhpZ2hsaWdodCBhbGwgY29kZSBlbGVtZW50cyBvbiB0aGUgcGFnZS5cblx0ICpcblx0ICogWW91IG9idmlvdXNseSBoYXZlIHRvIGNoYW5nZSB0aGlzIHZhbHVlIGJlZm9yZSB0aGUgYXV0b21hdGljIGhpZ2hsaWdodGluZyBzdGFydGVkLiBUbyBkbyB0aGlzLCB5b3UgY2FuIGFkZCBhblxuXHQgKiBlbXB0eSBQcmlzbSBvYmplY3QgaW50byB0aGUgZ2xvYmFsIHNjb3BlIGJlZm9yZSBsb2FkaW5nIHRoZSBQcmlzbSBzY3JpcHQgbGlrZSB0aGlzOlxuXHQgKlxuXHQgKiBgYGBqc1xuXHQgKiB3aW5kb3cuUHJpc20gPSB3aW5kb3cuUHJpc20gfHwge307XG5cdCAqIFByaXNtLm1hbnVhbCA9IHRydWU7XG5cdCAqIC8vIGFkZCBhIG5ldyA8c2NyaXB0PiB0byBsb2FkIFByaXNtJ3Mgc2NyaXB0XG5cdCAqIGBgYFxuXHQgKlxuXHQgKiBAZGVmYXVsdCBmYWxzZVxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICogQG1lbWJlcm9mIFByaXNtXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdG1hbnVhbDogX3NlbGYuUHJpc20gJiYgX3NlbGYuUHJpc20ubWFudWFsLFxuXHRkaXNhYmxlV29ya2VyTWVzc2FnZUhhbmRsZXI6IF9zZWxmLlByaXNtICYmIF9zZWxmLlByaXNtLmRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcixcblxuXHQvKipcblx0ICogQSBuYW1lc3BhY2UgZm9yIHV0aWxpdHkgbWV0aG9kcy5cblx0ICpcblx0ICogQWxsIGZ1bmN0aW9uIGluIHRoaXMgbmFtZXNwYWNlIHRoYXQgYXJlIG5vdCBleHBsaWNpdGx5IG1hcmtlZCBhcyBfcHVibGljXyBhcmUgZm9yIF9faW50ZXJuYWwgdXNlIG9ubHlfXyBhbmQgbWF5XG5cdCAqIGNoYW5nZSBvciBkaXNhcHBlYXIgYXQgYW55IHRpbWUuXG5cdCAqXG5cdCAqIEBuYW1lc3BhY2Vcblx0ICogQG1lbWJlcm9mIFByaXNtXG5cdCAqL1xuXHR1dGlsOiB7XG5cdFx0ZW5jb2RlOiBmdW5jdGlvbiBlbmNvZGUodG9rZW5zKSB7XG5cdFx0XHRpZiAodG9rZW5zIGluc3RhbmNlb2YgVG9rZW4pIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBUb2tlbih0b2tlbnMudHlwZSwgZW5jb2RlKHRva2Vucy5jb250ZW50KSwgdG9rZW5zLmFsaWFzKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0b2tlbnMpKSB7XG5cdFx0XHRcdHJldHVybiB0b2tlbnMubWFwKGVuY29kZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdG9rZW5zLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoL1xcdTAwYTAvZywgJyAnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgdHlwZSBvZiB0aGUgZ2l2ZW4gdmFsdWUuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge2FueX0gb1xuXHRcdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKiB0eXBlKG51bGwpICAgICAgPT09ICdOdWxsJ1xuXHRcdCAqIHR5cGUodW5kZWZpbmVkKSA9PT0gJ1VuZGVmaW5lZCdcblx0XHQgKiB0eXBlKDEyMykgICAgICAgPT09ICdOdW1iZXInXG5cdFx0ICogdHlwZSgnZm9vJykgICAgID09PSAnU3RyaW5nJ1xuXHRcdCAqIHR5cGUodHJ1ZSkgICAgICA9PT0gJ0Jvb2xlYW4nXG5cdFx0ICogdHlwZShbMSwgMl0pICAgID09PSAnQXJyYXknXG5cdFx0ICogdHlwZSh7fSkgICAgICAgID09PSAnT2JqZWN0J1xuXHRcdCAqIHR5cGUoU3RyaW5nKSAgICA9PT0gJ0Z1bmN0aW9uJ1xuXHRcdCAqIHR5cGUoL2FiYysvKSAgICA9PT0gJ1JlZ0V4cCdcblx0XHQgKi9cblx0XHR0eXBlOiBmdW5jdGlvbiAobykge1xuXHRcdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgYSB1bmlxdWUgbnVtYmVyIGZvciB0aGUgZ2l2ZW4gb2JqZWN0LiBMYXRlciBjYWxscyB3aWxsIHN0aWxsIHJldHVybiB0aGUgc2FtZSBudW1iZXIuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gb2JqXG5cdFx0ICogQHJldHVybnMge251bWJlcn1cblx0XHQgKi9cblx0XHRvYmpJZDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0aWYgKCFvYmpbJ19faWQnXSkge1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnX19pZCcsIHsgdmFsdWU6ICsrdW5pcXVlSWQgfSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqWydfX2lkJ107XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIENyZWF0ZXMgYSBkZWVwIGNsb25lIG9mIHRoZSBnaXZlbiBvYmplY3QuXG5cdFx0ICpcblx0XHQgKiBUaGUgbWFpbiBpbnRlbmRlZCB1c2Ugb2YgdGhpcyBmdW5jdGlvbiBpcyB0byBjbG9uZSBsYW5ndWFnZSBkZWZpbml0aW9ucy5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7VH0gb1xuXHRcdCAqIEBwYXJhbSB7UmVjb3JkPG51bWJlciwgYW55Pn0gW3Zpc2l0ZWRdXG5cdFx0ICogQHJldHVybnMge1R9XG5cdFx0ICogQHRlbXBsYXRlIFRcblx0XHQgKi9cblx0XHRjbG9uZTogZnVuY3Rpb24gZGVlcENsb25lKG8sIHZpc2l0ZWQpIHtcblx0XHRcdHZpc2l0ZWQgPSB2aXNpdGVkIHx8IHt9O1xuXG5cdFx0XHR2YXIgY2xvbmUsIGlkO1xuXHRcdFx0c3dpdGNoIChfLnV0aWwudHlwZShvKSkge1xuXHRcdFx0XHRjYXNlICdPYmplY3QnOlxuXHRcdFx0XHRcdGlkID0gXy51dGlsLm9iaklkKG8pO1xuXHRcdFx0XHRcdGlmICh2aXNpdGVkW2lkXSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHZpc2l0ZWRbaWRdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjbG9uZSA9IC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgYW55Pn0gKi8gKHt9KTtcblx0XHRcdFx0XHR2aXNpdGVkW2lkXSA9IGNsb25lO1xuXG5cdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG8pIHtcblx0XHRcdFx0XHRcdGlmIChvLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdFx0Y2xvbmVba2V5XSA9IGRlZXBDbG9uZShvW2tleV0sIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiAvKiogQHR5cGUge2FueX0gKi8gKGNsb25lKTtcblxuXHRcdFx0XHRjYXNlICdBcnJheSc6XG5cdFx0XHRcdFx0aWQgPSBfLnV0aWwub2JqSWQobyk7XG5cdFx0XHRcdFx0aWYgKHZpc2l0ZWRbaWRdKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdmlzaXRlZFtpZF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNsb25lID0gW107XG5cdFx0XHRcdFx0dmlzaXRlZFtpZF0gPSBjbG9uZTtcblxuXHRcdFx0XHRcdCgvKiogQHR5cGUge0FycmF5fSAqLygvKiogQHR5cGUge2FueX0gKi8obykpKS5mb3JFYWNoKGZ1bmN0aW9uICh2LCBpKSB7XG5cdFx0XHRcdFx0XHRjbG9uZVtpXSA9IGRlZXBDbG9uZSh2LCB2aXNpdGVkKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHJldHVybiAvKiogQHR5cGUge2FueX0gKi8gKGNsb25lKTtcblxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiBvO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRoZSBQcmlzbSBsYW5ndWFnZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudCBzZXQgYnkgYSBgbGFuZ3VhZ2UteHh4eGAgb3IgYGxhbmcteHh4eGAgY2xhc3MuXG5cdFx0ICpcblx0XHQgKiBJZiBubyBsYW5ndWFnZSBpcyBzZXQgZm9yIHRoZSBlbGVtZW50IG9yIHRoZSBlbGVtZW50IGlzIGBudWxsYCBvciBgdW5kZWZpbmVkYCwgYG5vbmVgIHdpbGwgYmUgcmV0dXJuZWQuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcblx0XHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdGdldExhbmd1YWdlOiBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0d2hpbGUgKGVsZW1lbnQgJiYgIWxhbmcudGVzdChlbGVtZW50LmNsYXNzTmFtZSkpIHtcblx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdH1cblx0XHRcdGlmIChlbGVtZW50KSB7XG5cdFx0XHRcdHJldHVybiAoZWxlbWVudC5jbGFzc05hbWUubWF0Y2gobGFuZykgfHwgWywgJ25vbmUnXSlbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiAnbm9uZSc7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdGhlIHNjcmlwdCBlbGVtZW50IHRoYXQgaXMgY3VycmVudGx5IGV4ZWN1dGluZy5cblx0XHQgKlxuXHRcdCAqIFRoaXMgZG9lcyBfX25vdF9fIHdvcmsgZm9yIGxpbmUgc2NyaXB0IGVsZW1lbnQuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJucyB7SFRNTFNjcmlwdEVsZW1lbnQgfCBudWxsfVxuXHRcdCAqL1xuXHRcdGN1cnJlbnRTY3JpcHQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCdjdXJyZW50U2NyaXB0JyBpbiBkb2N1bWVudCAmJiAxIDwgMiAvKiBoYWNrIHRvIHRyaXAgVFMnIGZsb3cgYW5hbHlzaXMgKi8pIHtcblx0XHRcdFx0cmV0dXJuIC8qKiBAdHlwZSB7YW55fSAqLyAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElFMTEgd29ya2Fyb3VuZFxuXHRcdFx0Ly8gd2UnbGwgZ2V0IHRoZSBzcmMgb2YgdGhlIGN1cnJlbnQgc2NyaXB0IGJ5IHBhcnNpbmcgSUUxMSdzIGVycm9yIHN0YWNrIHRyYWNlXG5cdFx0XHQvLyB0aGlzIHdpbGwgbm90IHdvcmsgZm9yIGlubGluZSBzY3JpcHRzXG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcigpO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdC8vIEdldCBmaWxlIHNyYyB1cmwgZnJvbSBzdGFjay4gU3BlY2lmaWNhbGx5IHdvcmtzIHdpdGggdGhlIGZvcm1hdCBvZiBzdGFjayB0cmFjZXMgaW4gSUUuXG5cdFx0XHRcdC8vIEEgc3RhY2sgd2lsbCBsb29rIGxpa2UgdGhpczpcblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gRXJyb3Jcblx0XHRcdFx0Ly8gICAgYXQgXy51dGlsLmN1cnJlbnRTY3JpcHQgKGh0dHA6Ly9sb2NhbGhvc3QvY29tcG9uZW50cy9wcmlzbS1jb3JlLmpzOjExOTo1KVxuXHRcdFx0XHQvLyAgICBhdCBHbG9iYWwgY29kZSAoaHR0cDovL2xvY2FsaG9zdC9jb21wb25lbnRzL3ByaXNtLWNvcmUuanM6NjA2OjEpXG5cblx0XHRcdFx0dmFyIHNyYyA9ICgvYXQgW14oXFxyXFxuXSpcXCgoLiopOi4rOi4rXFwpJC9pLmV4ZWMoZXJyLnN0YWNrKSB8fCBbXSlbMV07XG5cdFx0XHRcdGlmIChzcmMpIHtcblx0XHRcdFx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcblx0XHRcdFx0XHRmb3IgKHZhciBpIGluIHNjcmlwdHMpIHtcblx0XHRcdFx0XHRcdGlmIChzY3JpcHRzW2ldLnNyYyA9PSBzcmMpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHNjcmlwdHNbaV07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHdoZXRoZXIgYSBnaXZlbiBjbGFzcyBpcyBhY3RpdmUgZm9yIGBlbGVtZW50YC5cblx0XHQgKlxuXHRcdCAqIFRoZSBjbGFzcyBjYW4gYmUgYWN0aXZhdGVkIGlmIGBlbGVtZW50YCBvciBvbmUgb2YgaXRzIGFuY2VzdG9ycyBoYXMgdGhlIGdpdmVuIGNsYXNzIGFuZCBpdCBjYW4gYmUgZGVhY3RpdmF0ZWRcblx0XHQgKiBpZiBgZWxlbWVudGAgb3Igb25lIG9mIGl0cyBhbmNlc3RvcnMgaGFzIHRoZSBuZWdhdGVkIHZlcnNpb24gb2YgdGhlIGdpdmVuIGNsYXNzLiBUaGUgX25lZ2F0ZWQgdmVyc2lvbl8gb2YgdGhlXG5cdFx0ICogZ2l2ZW4gY2xhc3MgaXMganVzdCB0aGUgZ2l2ZW4gY2xhc3Mgd2l0aCBhIGBuby1gIHByZWZpeC5cblx0XHQgKlxuXHRcdCAqIFdoZXRoZXIgdGhlIGNsYXNzIGlzIGFjdGl2ZSBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBjbG9zZXN0IGFuY2VzdG9yIG9mIGBlbGVtZW50YCAod2hlcmUgYGVsZW1lbnRgIGl0c2VsZiBpc1xuXHRcdCAqIGNsb3Nlc3QgYW5jZXN0b3IpIHRoYXQgaGFzIHRoZSBnaXZlbiBjbGFzcyBvciB0aGUgbmVnYXRlZCB2ZXJzaW9uIG9mIGl0LiBJZiBuZWl0aGVyIGBlbGVtZW50YCBub3IgYW55IG9mIGl0c1xuXHRcdCAqIGFuY2VzdG9ycyBoYXZlIHRoZSBnaXZlbiBjbGFzcyBvciB0aGUgbmVnYXRlZCB2ZXJzaW9uIG9mIGl0LCB0aGVuIHRoZSBkZWZhdWx0IGFjdGl2YXRpb24gd2lsbCBiZSByZXR1cm5lZC5cblx0XHQgKlxuXHRcdCAqIEluIHRoZSBwYXJhZG94aWNhbCBzaXR1YXRpb24gd2hlcmUgdGhlIGNsb3Nlc3QgYW5jZXN0b3IgY29udGFpbnMgX19ib3RoX18gdGhlIGdpdmVuIGNsYXNzIGFuZCB0aGUgbmVnYXRlZFxuXHRcdCAqIHZlcnNpb24gb2YgaXQsIHRoZSBjbGFzcyBpcyBjb25zaWRlcmVkIGFjdGl2ZS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtkZWZhdWx0QWN0aXZhdGlvbj1mYWxzZV1cblx0XHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0XHQgKi9cblx0XHRpc0FjdGl2ZTogZnVuY3Rpb24gKGVsZW1lbnQsIGNsYXNzTmFtZSwgZGVmYXVsdEFjdGl2YXRpb24pIHtcblx0XHRcdHZhciBubyA9ICduby0nICsgY2xhc3NOYW1lO1xuXG5cdFx0XHR3aGlsZSAoZWxlbWVudCkge1xuXHRcdFx0XHR2YXIgY2xhc3NMaXN0ID0gZWxlbWVudC5jbGFzc0xpc3Q7XG5cdFx0XHRcdGlmIChjbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChjbGFzc0xpc3QuY29udGFpbnMobm8pKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gISFkZWZhdWx0QWN0aXZhdGlvbjtcblx0XHR9XG5cdH0sXG5cblx0LyoqXG5cdCAqIFRoaXMgbmFtZXNwYWNlIGNvbnRhaW5zIGFsbCBjdXJyZW50bHkgbG9hZGVkIGxhbmd1YWdlcyBhbmQgdGhlIHNvbWUgaGVscGVyIGZ1bmN0aW9ucyB0byBjcmVhdGUgYW5kIG1vZGlmeSBsYW5ndWFnZXMuXG5cdCAqXG5cdCAqIEBuYW1lc3BhY2Vcblx0ICogQG1lbWJlcm9mIFByaXNtXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdGxhbmd1YWdlczoge1xuXHRcdC8qKlxuXHRcdCAqIENyZWF0ZXMgYSBkZWVwIGNvcHkgb2YgdGhlIGxhbmd1YWdlIHdpdGggdGhlIGdpdmVuIGlkIGFuZCBhcHBlbmRzIHRoZSBnaXZlbiB0b2tlbnMuXG5cdFx0ICpcblx0XHQgKiBJZiBhIHRva2VuIGluIGByZWRlZmAgYWxzbyBhcHBlYXJzIGluIHRoZSBjb3BpZWQgbGFuZ3VhZ2UsIHRoZW4gdGhlIGV4aXN0aW5nIHRva2VuIGluIHRoZSBjb3BpZWQgbGFuZ3VhZ2Vcblx0XHQgKiB3aWxsIGJlIG92ZXJ3cml0dGVuIGF0IGl0cyBvcmlnaW5hbCBwb3NpdGlvbi5cblx0XHQgKlxuXHRcdCAqICMjIEJlc3QgcHJhY3RpY2VzXG5cdFx0ICpcblx0XHQgKiBTaW5jZSB0aGUgcG9zaXRpb24gb2Ygb3ZlcndyaXRpbmcgdG9rZW5zICh0b2tlbiBpbiBgcmVkZWZgIHRoYXQgb3ZlcndyaXRlIHRva2VucyBpbiB0aGUgY29waWVkIGxhbmd1YWdlKVxuXHRcdCAqIGRvZXNuJ3QgbWF0dGVyLCB0aGV5IGNhbiB0ZWNobmljYWxseSBiZSBpbiBhbnkgb3JkZXIuIEhvd2V2ZXIsIHRoaXMgY2FuIGJlIGNvbmZ1c2luZyB0byBvdGhlcnMgdGhhdCB0cnlpbmcgdG9cblx0XHQgKiB1bmRlcnN0YW5kIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9uIGJlY2F1c2UsIG5vcm1hbGx5LCB0aGUgb3JkZXIgb2YgdG9rZW5zIG1hdHRlcnMgaW4gUHJpc20gZ3JhbW1hcnMuXG5cdFx0ICpcblx0XHQgKiBUaGVyZWZvcmUsIGl0IGlzIGVuY291cmFnZWQgdG8gb3JkZXIgb3ZlcndyaXRpbmcgdG9rZW5zIGFjY29yZGluZyB0byB0aGUgcG9zaXRpb25zIG9mIHRoZSBvdmVyd3JpdHRlbiB0b2tlbnMuXG5cdFx0ICogRnVydGhlcm1vcmUsIGFsbCBub24tb3ZlcndyaXRpbmcgdG9rZW5zIHNob3VsZCBiZSBwbGFjZWQgYWZ0ZXIgdGhlIG92ZXJ3cml0aW5nIG9uZXMuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIGlkIG9mIHRoZSBsYW5ndWFnZSB0byBleHRlbmQuIFRoaXMgaGFzIHRvIGJlIGEga2V5IGluIGBQcmlzbS5sYW5ndWFnZXNgLlxuXHRcdCAqIEBwYXJhbSB7R3JhbW1hcn0gcmVkZWYgVGhlIG5ldyB0b2tlbnMgdG8gYXBwZW5kLlxuXHRcdCAqIEByZXR1cm5zIHtHcmFtbWFyfSBUaGUgbmV3IGxhbmd1YWdlIGNyZWF0ZWQuXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogUHJpc20ubGFuZ3VhZ2VzWydjc3Mtd2l0aC1jb2xvcnMnXSA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NzcycsIHtcblx0XHQgKiAgICAgLy8gUHJpc20ubGFuZ3VhZ2VzLmNzcyBhbHJlYWR5IGhhcyBhICdjb21tZW50JyB0b2tlbiwgc28gdGhpcyB0b2tlbiB3aWxsIG92ZXJ3cml0ZSBDU1MnICdjb21tZW50JyB0b2tlblxuXHRcdCAqICAgICAvLyBhdCBpdHMgb3JpZ2luYWwgcG9zaXRpb25cblx0XHQgKiAgICAgJ2NvbW1lbnQnOiB7IC4uLiB9LFxuXHRcdCAqICAgICAvLyBDU1MgZG9lc24ndCBoYXZlIGEgJ2NvbG9yJyB0b2tlbiwgc28gdGhpcyB0b2tlbiB3aWxsIGJlIGFwcGVuZGVkXG5cdFx0ICogICAgICdjb2xvcic6IC9cXGIoPzpyZWR8Z3JlZW58Ymx1ZSlcXGIvXG5cdFx0ICogfSk7XG5cdFx0ICovXG5cdFx0ZXh0ZW5kOiBmdW5jdGlvbiAoaWQsIHJlZGVmKSB7XG5cdFx0XHR2YXIgbGFuZyA9IF8udXRpbC5jbG9uZShfLmxhbmd1YWdlc1tpZF0pO1xuXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gcmVkZWYpIHtcblx0XHRcdFx0bGFuZ1trZXldID0gcmVkZWZba2V5XTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGxhbmc7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEluc2VydHMgdG9rZW5zIF9iZWZvcmVfIGFub3RoZXIgdG9rZW4gaW4gYSBsYW5ndWFnZSBkZWZpbml0aW9uIG9yIGFueSBvdGhlciBncmFtbWFyLlxuXHRcdCAqXG5cdFx0ICogIyMgVXNhZ2Vcblx0XHQgKlxuXHRcdCAqIFRoaXMgaGVscGVyIG1ldGhvZCBtYWtlcyBpdCBlYXN5IHRvIG1vZGlmeSBleGlzdGluZyBsYW5ndWFnZXMuIEZvciBleGFtcGxlLCB0aGUgQ1NTIGxhbmd1YWdlIGRlZmluaXRpb25cblx0XHQgKiBub3Qgb25seSBkZWZpbmVzIENTUyBoaWdobGlnaHRpbmcgZm9yIENTUyBkb2N1bWVudHMsIGJ1dCBhbHNvIG5lZWRzIHRvIGRlZmluZSBoaWdobGlnaHRpbmcgZm9yIENTUyBlbWJlZGRlZFxuXHRcdCAqIGluIEhUTUwgdGhyb3VnaCBgPHN0eWxlPmAgZWxlbWVudHMuIFRvIGRvIHRoaXMsIGl0IG5lZWRzIHRvIG1vZGlmeSBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAgYW5kIGFkZCB0aGVcblx0XHQgKiBhcHByb3ByaWF0ZSB0b2tlbnMuIEhvd2V2ZXIsIGBQcmlzbS5sYW5ndWFnZXMubWFya3VwYCBpcyBhIHJlZ3VsYXIgSmF2YVNjcmlwdCBvYmplY3QgbGl0ZXJhbCwgc28gaWYgeW91IGRvXG5cdFx0ICogdGhpczpcblx0XHQgKlxuXHRcdCAqIGBgYGpzXG5cdFx0ICogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC5zdHlsZSA9IHtcblx0XHQgKiAgICAgLy8gdG9rZW5cblx0XHQgKiB9O1xuXHRcdCAqIGBgYFxuXHRcdCAqXG5cdFx0ICogdGhlbiB0aGUgYHN0eWxlYCB0b2tlbiB3aWxsIGJlIGFkZGVkIChhbmQgcHJvY2Vzc2VkKSBhdCB0aGUgZW5kLiBgaW5zZXJ0QmVmb3JlYCBhbGxvd3MgeW91IHRvIGluc2VydCB0b2tlbnNcblx0XHQgKiBiZWZvcmUgZXhpc3RpbmcgdG9rZW5zLiBGb3IgdGhlIENTUyBleGFtcGxlIGFib3ZlLCB5b3Ugd291bGQgdXNlIGl0IGxpa2UgdGhpczpcblx0XHQgKlxuXHRcdCAqIGBgYGpzXG5cdFx0ICogUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NkYXRhJywge1xuXHRcdCAqICAgICAnc3R5bGUnOiB7XG5cdFx0ICogICAgICAgICAvLyB0b2tlblxuXHRcdCAqICAgICB9XG5cdFx0ICogfSk7XG5cdFx0ICogYGBgXG5cdFx0ICpcblx0XHQgKiAjIyBTcGVjaWFsIGNhc2VzXG5cdFx0ICpcblx0XHQgKiBJZiB0aGUgZ3JhbW1hcnMgb2YgYGluc2lkZWAgYW5kIGBpbnNlcnRgIGhhdmUgdG9rZW5zIHdpdGggdGhlIHNhbWUgbmFtZSwgdGhlIHRva2VucyBpbiBgaW5zaWRlYCdzIGdyYW1tYXJcblx0XHQgKiB3aWxsIGJlIGlnbm9yZWQuXG5cdFx0ICpcblx0XHQgKiBUaGlzIGJlaGF2aW9yIGNhbiBiZSB1c2VkIHRvIGluc2VydCB0b2tlbnMgYWZ0ZXIgYGJlZm9yZWA6XG5cdFx0ICpcblx0XHQgKiBgYGBqc1xuXHRcdCAqIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjb21tZW50Jywge1xuXHRcdCAqICAgICAnY29tbWVudCc6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAuY29tbWVudCxcblx0XHQgKiAgICAgLy8gdG9rZW5zIGFmdGVyICdjb21tZW50J1xuXHRcdCAqIH0pO1xuXHRcdCAqIGBgYFxuXHRcdCAqXG5cdFx0ICogIyMgTGltaXRhdGlvbnNcblx0XHQgKlxuXHRcdCAqIFRoZSBtYWluIHByb2JsZW0gYGluc2VydEJlZm9yZWAgaGFzIHRvIHNvbHZlIGlzIGl0ZXJhdGlvbiBvcmRlci4gU2luY2UgRVMyMDE1LCB0aGUgaXRlcmF0aW9uIG9yZGVyIGZvciBvYmplY3Rcblx0XHQgKiBwcm9wZXJ0aWVzIGlzIGd1YXJhbnRlZWQgdG8gYmUgdGhlIGluc2VydGlvbiBvcmRlciAoZXhjZXB0IGZvciBpbnRlZ2VyIGtleXMpIGJ1dCBzb21lIGJyb3dzZXJzIGJlaGF2ZVxuXHRcdCAqIGRpZmZlcmVudGx5IHdoZW4ga2V5cyBhcmUgZGVsZXRlZCBhbmQgcmUtaW5zZXJ0ZWQuIFNvIGBpbnNlcnRCZWZvcmVgIGNhbid0IGJlIGltcGxlbWVudGVkIGJ5IHRlbXBvcmFyaWx5XG5cdFx0ICogZGVsZXRpbmcgcHJvcGVydGllcyB3aGljaCBpcyBuZWNlc3NhcnkgdG8gaW5zZXJ0IGF0IGFyYml0cmFyeSBwb3NpdGlvbnMuXG5cdFx0ICpcblx0XHQgKiBUbyBzb2x2ZSB0aGlzIHByb2JsZW0sIGBpbnNlcnRCZWZvcmVgIGRvZXNuJ3QgYWN0dWFsbHkgaW5zZXJ0IHRoZSBnaXZlbiB0b2tlbnMgaW50byB0aGUgdGFyZ2V0IG9iamVjdC5cblx0XHQgKiBJbnN0ZWFkLCBpdCB3aWxsIGNyZWF0ZSBhIG5ldyBvYmplY3QgYW5kIHJlcGxhY2UgYWxsIHJlZmVyZW5jZXMgdG8gdGhlIHRhcmdldCBvYmplY3Qgd2l0aCB0aGUgbmV3IG9uZS4gVGhpc1xuXHRcdCAqIGNhbiBiZSBkb25lIHdpdGhvdXQgdGVtcG9yYXJpbHkgZGVsZXRpbmcgcHJvcGVydGllcywgc28gdGhlIGl0ZXJhdGlvbiBvcmRlciBpcyB3ZWxsLWRlZmluZWQuXG5cdFx0ICpcblx0XHQgKiBIb3dldmVyLCBvbmx5IHJlZmVyZW5jZXMgdGhhdCBjYW4gYmUgcmVhY2hlZCBmcm9tIGBQcmlzbS5sYW5ndWFnZXNgIG9yIGBpbnNlcnRgIHdpbGwgYmUgcmVwbGFjZWQuIEkuZS4gaWZcblx0XHQgKiB5b3UgaG9sZCB0aGUgdGFyZ2V0IG9iamVjdCBpbiBhIHZhcmlhYmxlLCB0aGVuIHRoZSB2YWx1ZSBvZiB0aGUgdmFyaWFibGUgd2lsbCBub3QgY2hhbmdlLlxuXHRcdCAqXG5cdFx0ICogYGBganNcblx0XHQgKiB2YXIgb2xkTWFya3VwID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblx0XHQgKiB2YXIgbmV3TWFya3VwID0gUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NvbW1lbnQnLCB7IC4uLiB9KTtcblx0XHQgKlxuXHRcdCAqIGFzc2VydChvbGRNYXJrdXAgIT09IFByaXNtLmxhbmd1YWdlcy5tYXJrdXApO1xuXHRcdCAqIGFzc2VydChuZXdNYXJrdXAgPT09IFByaXNtLmxhbmd1YWdlcy5tYXJrdXApO1xuXHRcdCAqIGBgYFxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGluc2lkZSBUaGUgcHJvcGVydHkgb2YgYHJvb3RgIChlLmcuIGEgbGFuZ3VhZ2UgaWQgaW4gYFByaXNtLmxhbmd1YWdlc2ApIHRoYXQgY29udGFpbnMgdGhlXG5cdFx0ICogb2JqZWN0IHRvIGJlIG1vZGlmaWVkLlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBiZWZvcmUgVGhlIGtleSB0byBpbnNlcnQgYmVmb3JlLlxuXHRcdCAqIEBwYXJhbSB7R3JhbW1hcn0gaW5zZXJ0IEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBrZXktdmFsdWUgcGFpcnMgdG8gYmUgaW5zZXJ0ZWQuXG5cdFx0ICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBbcm9vdF0gVGhlIG9iamVjdCBjb250YWluaW5nIGBpbnNpZGVgLCBpLmUuIHRoZSBvYmplY3QgdGhhdCBjb250YWlucyB0aGVcblx0XHQgKiBvYmplY3QgdG8gYmUgbW9kaWZpZWQuXG5cdFx0ICpcblx0XHQgKiBEZWZhdWx0cyB0byBgUHJpc20ubGFuZ3VhZ2VzYC5cblx0XHQgKiBAcmV0dXJucyB7R3JhbW1hcn0gVGhlIG5ldyBncmFtbWFyIG9iamVjdC5cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0aW5zZXJ0QmVmb3JlOiBmdW5jdGlvbiAoaW5zaWRlLCBiZWZvcmUsIGluc2VydCwgcm9vdCkge1xuXHRcdFx0cm9vdCA9IHJvb3QgfHwgLyoqIEB0eXBlIHthbnl9ICovIChfLmxhbmd1YWdlcyk7XG5cdFx0XHR2YXIgZ3JhbW1hciA9IHJvb3RbaW5zaWRlXTtcblx0XHRcdC8qKiBAdHlwZSB7R3JhbW1hcn0gKi9cblx0XHRcdHZhciByZXQgPSB7fTtcblxuXHRcdFx0Zm9yICh2YXIgdG9rZW4gaW4gZ3JhbW1hcikge1xuXHRcdFx0XHRpZiAoZ3JhbW1hci5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcblxuXHRcdFx0XHRcdGlmICh0b2tlbiA9PSBiZWZvcmUpIHtcblx0XHRcdFx0XHRcdGZvciAodmFyIG5ld1Rva2VuIGluIGluc2VydCkge1xuXHRcdFx0XHRcdFx0XHRpZiAoaW5zZXJ0Lmhhc093blByb3BlcnR5KG5ld1Rva2VuKSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldFtuZXdUb2tlbl0gPSBpbnNlcnRbbmV3VG9rZW5dO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRG8gbm90IGluc2VydCB0b2tlbiB3aGljaCBhbHNvIG9jY3VyIGluIGluc2VydC4gU2VlICMxNTI1XG5cdFx0XHRcdFx0aWYgKCFpbnNlcnQuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG5cdFx0XHRcdFx0XHRyZXRbdG9rZW5dID0gZ3JhbW1hclt0b2tlbl07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciBvbGQgPSByb290W2luc2lkZV07XG5cdFx0XHRyb290W2luc2lkZV0gPSByZXQ7XG5cblx0XHRcdC8vIFVwZGF0ZSByZWZlcmVuY2VzIGluIG90aGVyIGxhbmd1YWdlIGRlZmluaXRpb25zXG5cdFx0XHRfLmxhbmd1YWdlcy5ERlMoXy5sYW5ndWFnZXMsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0aWYgKHZhbHVlID09PSBvbGQgJiYga2V5ICE9IGluc2lkZSkge1xuXHRcdFx0XHRcdHRoaXNba2V5XSA9IHJldDtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fSxcblxuXHRcdC8vIFRyYXZlcnNlIGEgbGFuZ3VhZ2UgZGVmaW5pdGlvbiB3aXRoIERlcHRoIEZpcnN0IFNlYXJjaFxuXHRcdERGUzogZnVuY3Rpb24gREZTKG8sIGNhbGxiYWNrLCB0eXBlLCB2aXNpdGVkKSB7XG5cdFx0XHR2aXNpdGVkID0gdmlzaXRlZCB8fCB7fTtcblxuXHRcdFx0dmFyIG9iaklkID0gXy51dGlsLm9iaklkO1xuXG5cdFx0XHRmb3IgKHZhciBpIGluIG8pIHtcblx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKG8sIGksIG9baV0sIHR5cGUgfHwgaSk7XG5cblx0XHRcdFx0XHR2YXIgcHJvcGVydHkgPSBvW2ldLFxuXHRcdFx0XHRcdCAgICBwcm9wZXJ0eVR5cGUgPSBfLnV0aWwudHlwZShwcm9wZXJ0eSk7XG5cblx0XHRcdFx0XHRpZiAocHJvcGVydHlUeXBlID09PSAnT2JqZWN0JyAmJiAhdmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldKSB7XG5cdFx0XHRcdFx0XHR2aXNpdGVkW29iaklkKHByb3BlcnR5KV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0REZTKHByb3BlcnR5LCBjYWxsYmFjaywgbnVsbCwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYgKHByb3BlcnR5VHlwZSA9PT0gJ0FycmF5JyAmJiAhdmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldKSB7XG5cdFx0XHRcdFx0XHR2aXNpdGVkW29iaklkKHByb3BlcnR5KV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0REZTKHByb3BlcnR5LCBjYWxsYmFjaywgaSwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHBsdWdpbnM6IHt9LFxuXG5cdC8qKlxuXHQgKiBUaGlzIGlzIHRoZSBtb3N0IGhpZ2gtbGV2ZWwgZnVuY3Rpb24gaW4gUHJpc23igJlzIEFQSS5cblx0ICogSXQgZmV0Y2hlcyBhbGwgdGhlIGVsZW1lbnRzIHRoYXQgaGF2ZSBhIGAubGFuZ3VhZ2UteHh4eGAgY2xhc3MgYW5kIHRoZW4gY2FsbHMge0BsaW5rIFByaXNtLmhpZ2hsaWdodEVsZW1lbnR9IG9uXG5cdCAqIGVhY2ggb25lIG9mIHRoZW0uXG5cdCAqXG5cdCAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byBgUHJpc20uaGlnaGxpZ2h0QWxsVW5kZXIoZG9jdW1lbnQsIGFzeW5jLCBjYWxsYmFjaylgLlxuXHQgKlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFthc3luYz1mYWxzZV0gU2FtZSBhcyBpbiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0QWxsVW5kZXJ9LlxuXHQgKiBAcGFyYW0ge0hpZ2hsaWdodENhbGxiYWNrfSBbY2FsbGJhY2tdIFNhbWUgYXMgaW4ge0BsaW5rIFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyfS5cblx0ICogQG1lbWJlcm9mIFByaXNtXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdGhpZ2hsaWdodEFsbDogZnVuY3Rpb24oYXN5bmMsIGNhbGxiYWNrKSB7XG5cdFx0Xy5oaWdobGlnaHRBbGxVbmRlcihkb2N1bWVudCwgYXN5bmMsIGNhbGxiYWNrKTtcblx0fSxcblxuXHQvKipcblx0ICogRmV0Y2hlcyBhbGwgdGhlIGRlc2NlbmRhbnRzIG9mIGBjb250YWluZXJgIHRoYXQgaGF2ZSBhIGAubGFuZ3VhZ2UteHh4eGAgY2xhc3MgYW5kIHRoZW4gY2FsbHNcblx0ICoge0BsaW5rIFByaXNtLmhpZ2hsaWdodEVsZW1lbnR9IG9uIGVhY2ggb25lIG9mIHRoZW0uXG5cdCAqXG5cdCAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG5cdCAqIDEuIGBiZWZvcmUtaGlnaGxpZ2h0YWxsYFxuXHQgKiAyLiBgYmVmb3JlLWFsbC1lbGVtZW50cy1oaWdobGlnaHRgXG5cdCAqIDMuIEFsbCBob29rcyBvZiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0RWxlbWVudH0gZm9yIGVhY2ggZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtQYXJlbnROb2RlfSBjb250YWluZXIgVGhlIHJvb3QgZWxlbWVudCwgd2hvc2UgZGVzY2VuZGFudHMgdGhhdCBoYXZlIGEgYC5sYW5ndWFnZS14eHh4YCBjbGFzcyB3aWxsIGJlIGhpZ2hsaWdodGVkLlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFthc3luYz1mYWxzZV0gV2hldGhlciBlYWNoIGVsZW1lbnQgaXMgdG8gYmUgaGlnaGxpZ2h0ZWQgYXN5bmNocm9ub3VzbHkgdXNpbmcgV2ViIFdvcmtlcnMuXG5cdCAqIEBwYXJhbSB7SGlnaGxpZ2h0Q2FsbGJhY2t9IFtjYWxsYmFja10gQW4gb3B0aW9uYWwgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBvbiBlYWNoIGVsZW1lbnQgYWZ0ZXIgaXRzIGhpZ2hsaWdodGluZyBpcyBkb25lLlxuXHQgKiBAbWVtYmVyb2YgUHJpc21cblx0ICogQHB1YmxpY1xuXHQgKi9cblx0aGlnaGxpZ2h0QWxsVW5kZXI6IGZ1bmN0aW9uKGNvbnRhaW5lciwgYXN5bmMsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIGVudiA9IHtcblx0XHRcdGNhbGxiYWNrOiBjYWxsYmFjayxcblx0XHRcdGNvbnRhaW5lcjogY29udGFpbmVyLFxuXHRcdFx0c2VsZWN0b3I6ICdjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSwgW2NsYXNzKj1cImxhbmd1YWdlLVwiXSBjb2RlLCBjb2RlW2NsYXNzKj1cImxhbmctXCJdLCBbY2xhc3MqPVwibGFuZy1cIl0gY29kZSdcblx0XHR9O1xuXG5cdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1oaWdobGlnaHRhbGwnLCBlbnYpO1xuXG5cdFx0ZW52LmVsZW1lbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGVudi5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChlbnYuc2VsZWN0b3IpKTtcblxuXHRcdF8uaG9va3MucnVuKCdiZWZvcmUtYWxsLWVsZW1lbnRzLWhpZ2hsaWdodCcsIGVudik7XG5cblx0XHRmb3IgKHZhciBpID0gMCwgZWxlbWVudDsgZWxlbWVudCA9IGVudi5lbGVtZW50c1tpKytdOykge1xuXHRcdFx0Xy5oaWdobGlnaHRFbGVtZW50KGVsZW1lbnQsIGFzeW5jID09PSB0cnVlLCBlbnYuY2FsbGJhY2spO1xuXHRcdH1cblx0fSxcblxuXHQvKipcblx0ICogSGlnaGxpZ2h0cyB0aGUgY29kZSBpbnNpZGUgYSBzaW5nbGUgZWxlbWVudC5cblx0ICpcblx0ICogVGhlIGZvbGxvd2luZyBob29rcyB3aWxsIGJlIHJ1bjpcblx0ICogMS4gYGJlZm9yZS1zYW5pdHktY2hlY2tgXG5cdCAqIDIuIGBiZWZvcmUtaGlnaGxpZ2h0YFxuXHQgKiAzLiBBbGwgaG9va3Mgb2Yge0BsaW5rIFByaXNtLmhpZ2hsaWdodH0uIFRoZXNlIGhvb2tzIHdpbGwgYmUgcnVuIGJ5IGFuIGFzeW5jaHJvbm91cyB3b3JrZXIgaWYgYGFzeW5jYCBpcyBgdHJ1ZWAuXG5cdCAqIDQuIGBiZWZvcmUtaW5zZXJ0YFxuXHQgKiA1LiBgYWZ0ZXItaGlnaGxpZ2h0YFxuXHQgKiA2LiBgY29tcGxldGVgXG5cdCAqXG5cdCAqIFNvbWUgdGhlIGFib3ZlIGhvb2tzIHdpbGwgYmUgc2tpcHBlZCBpZiB0aGUgZWxlbWVudCBkb2Vzbid0IGNvbnRhaW4gYW55IHRleHQgb3IgdGhlcmUgaXMgbm8gZ3JhbW1hciBsb2FkZWQgZm9yXG5cdCAqIHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCBjb250YWluaW5nIHRoZSBjb2RlLlxuXHQgKiBJdCBtdXN0IGhhdmUgYSBjbGFzcyBvZiBgbGFuZ3VhZ2UteHh4eGAgdG8gYmUgcHJvY2Vzc2VkLCB3aGVyZSBgeHh4eGAgaXMgYSB2YWxpZCBsYW5ndWFnZSBpZGVudGlmaWVyLlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFthc3luYz1mYWxzZV0gV2hldGhlciB0aGUgZWxlbWVudCBpcyB0byBiZSBoaWdobGlnaHRlZCBhc3luY2hyb25vdXNseSB1c2luZyBXZWIgV29ya2Vyc1xuXHQgKiB0byBpbXByb3ZlIHBlcmZvcm1hbmNlIGFuZCBhdm9pZCBibG9ja2luZyB0aGUgVUkgd2hlbiBoaWdobGlnaHRpbmcgdmVyeSBsYXJnZSBjaHVua3Mgb2YgY29kZS4gVGhpcyBvcHRpb24gaXNcblx0ICogW2Rpc2FibGVkIGJ5IGRlZmF1bHRdKGh0dHBzOi8vcHJpc21qcy5jb20vZmFxLmh0bWwjd2h5LWlzLWFzeW5jaHJvbm91cy1oaWdobGlnaHRpbmctZGlzYWJsZWQtYnktZGVmYXVsdCkuXG5cdCAqXG5cdCAqIE5vdGU6IEFsbCBsYW5ndWFnZSBkZWZpbml0aW9ucyByZXF1aXJlZCB0byBoaWdobGlnaHQgdGhlIGNvZGUgbXVzdCBiZSBpbmNsdWRlZCBpbiB0aGUgbWFpbiBgcHJpc20uanNgIGZpbGUgZm9yXG5cdCAqIGFzeW5jaHJvbm91cyBoaWdobGlnaHRpbmcgdG8gd29yay4gWW91IGNhbiBidWlsZCB5b3VyIG93biBidW5kbGUgb24gdGhlXG5cdCAqIFtEb3dubG9hZCBwYWdlXShodHRwczovL3ByaXNtanMuY29tL2Rvd25sb2FkLmh0bWwpLlxuXHQgKiBAcGFyYW0ge0hpZ2hsaWdodENhbGxiYWNrfSBbY2FsbGJhY2tdIEFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgYWZ0ZXIgdGhlIGhpZ2hsaWdodGluZyBpcyBkb25lLlxuXHQgKiBNb3N0bHkgdXNlZnVsIHdoZW4gYGFzeW5jYCBpcyBgdHJ1ZWAsIHNpbmNlIGluIHRoYXQgY2FzZSwgdGhlIGhpZ2hsaWdodGluZyBpcyBkb25lIGFzeW5jaHJvbm91c2x5LlxuXHQgKiBAbWVtYmVyb2YgUHJpc21cblx0ICogQHB1YmxpY1xuXHQgKi9cblx0aGlnaGxpZ2h0RWxlbWVudDogZnVuY3Rpb24oZWxlbWVudCwgYXN5bmMsIGNhbGxiYWNrKSB7XG5cdFx0Ly8gRmluZCBsYW5ndWFnZVxuXHRcdHZhciBsYW5ndWFnZSA9IF8udXRpbC5nZXRMYW5ndWFnZShlbGVtZW50KTtcblx0XHR2YXIgZ3JhbW1hciA9IF8ubGFuZ3VhZ2VzW2xhbmd1YWdlXTtcblxuXHRcdC8vIFNldCBsYW5ndWFnZSBvbiB0aGUgZWxlbWVudCwgaWYgbm90IHByZXNlbnRcblx0XHRlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobGFuZywgJycpLnJlcGxhY2UoL1xccysvZywgJyAnKSArICcgbGFuZ3VhZ2UtJyArIGxhbmd1YWdlO1xuXG5cdFx0Ly8gU2V0IGxhbmd1YWdlIG9uIHRoZSBwYXJlbnQsIGZvciBzdHlsaW5nXG5cdFx0dmFyIHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRpZiAocGFyZW50ICYmIHBhcmVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAncHJlJykge1xuXHRcdFx0cGFyZW50LmNsYXNzTmFtZSA9IHBhcmVudC5jbGFzc05hbWUucmVwbGFjZShsYW5nLCAnJykucmVwbGFjZSgvXFxzKy9nLCAnICcpICsgJyBsYW5ndWFnZS0nICsgbGFuZ3VhZ2U7XG5cdFx0fVxuXG5cdFx0dmFyIGNvZGUgPSBlbGVtZW50LnRleHRDb250ZW50O1xuXG5cdFx0dmFyIGVudiA9IHtcblx0XHRcdGVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRsYW5ndWFnZTogbGFuZ3VhZ2UsXG5cdFx0XHRncmFtbWFyOiBncmFtbWFyLFxuXHRcdFx0Y29kZTogY29kZVxuXHRcdH07XG5cblx0XHRmdW5jdGlvbiBpbnNlcnRIaWdobGlnaHRlZENvZGUoaGlnaGxpZ2h0ZWRDb2RlKSB7XG5cdFx0XHRlbnYuaGlnaGxpZ2h0ZWRDb2RlID0gaGlnaGxpZ2h0ZWRDb2RlO1xuXG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWluc2VydCcsIGVudik7XG5cblx0XHRcdGVudi5lbGVtZW50LmlubmVySFRNTCA9IGVudi5oaWdobGlnaHRlZENvZGU7XG5cblx0XHRcdF8uaG9va3MucnVuKCdhZnRlci1oaWdobGlnaHQnLCBlbnYpO1xuXHRcdFx0Xy5ob29rcy5ydW4oJ2NvbXBsZXRlJywgZW52KTtcblx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoZW52LmVsZW1lbnQpO1xuXHRcdH1cblxuXHRcdF8uaG9va3MucnVuKCdiZWZvcmUtc2FuaXR5LWNoZWNrJywgZW52KTtcblxuXHRcdGlmICghZW52LmNvZGUpIHtcblx0XHRcdF8uaG9va3MucnVuKCdjb21wbGV0ZScsIGVudik7XG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKGVudi5lbGVtZW50KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWhpZ2hsaWdodCcsIGVudik7XG5cblx0XHRpZiAoIWVudi5ncmFtbWFyKSB7XG5cdFx0XHRpbnNlcnRIaWdobGlnaHRlZENvZGUoXy51dGlsLmVuY29kZShlbnYuY29kZSkpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChhc3luYyAmJiBfc2VsZi5Xb3JrZXIpIHtcblx0XHRcdHZhciB3b3JrZXIgPSBuZXcgV29ya2VyKF8uZmlsZW5hbWUpO1xuXG5cdFx0XHR3b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdGluc2VydEhpZ2hsaWdodGVkQ29kZShldnQuZGF0YSk7XG5cdFx0XHR9O1xuXG5cdFx0XHR3b3JrZXIucG9zdE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRsYW5ndWFnZTogZW52Lmxhbmd1YWdlLFxuXHRcdFx0XHRjb2RlOiBlbnYuY29kZSxcblx0XHRcdFx0aW1tZWRpYXRlQ2xvc2U6IHRydWVcblx0XHRcdH0pKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpbnNlcnRIaWdobGlnaHRlZENvZGUoXy5oaWdobGlnaHQoZW52LmNvZGUsIGVudi5ncmFtbWFyLCBlbnYubGFuZ3VhZ2UpKTtcblx0XHR9XG5cdH0sXG5cblx0LyoqXG5cdCAqIExvdy1sZXZlbCBmdW5jdGlvbiwgb25seSB1c2UgaWYgeW91IGtub3cgd2hhdCB5b3XigJlyZSBkb2luZy4gSXQgYWNjZXB0cyBhIHN0cmluZyBvZiB0ZXh0IGFzIGlucHV0XG5cdCAqIGFuZCB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbnMgdG8gdXNlLCBhbmQgcmV0dXJucyBhIHN0cmluZyB3aXRoIHRoZSBIVE1MIHByb2R1Y2VkLlxuXHQgKlxuXHQgKiBUaGUgZm9sbG93aW5nIGhvb2tzIHdpbGwgYmUgcnVuOlxuXHQgKiAxLiBgYmVmb3JlLXRva2VuaXplYFxuXHQgKiAyLiBgYWZ0ZXItdG9rZW5pemVgXG5cdCAqIDMuIGB3cmFwYDogT24gZWFjaCB7QGxpbmsgVG9rZW59LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBBIHN0cmluZyB3aXRoIHRoZSBjb2RlIHRvIGJlIGhpZ2hsaWdodGVkLlxuXHQgKiBAcGFyYW0ge0dyYW1tYXJ9IGdyYW1tYXIgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHRva2VucyB0byB1c2UuXG5cdCAqXG5cdCAqIFVzdWFsbHkgYSBsYW5ndWFnZSBkZWZpbml0aW9uIGxpa2UgYFByaXNtLmxhbmd1YWdlcy5tYXJrdXBgLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgVGhlIG5hbWUgb2YgdGhlIGxhbmd1YWdlIGRlZmluaXRpb24gcGFzc2VkIHRvIGBncmFtbWFyYC5cblx0ICogQHJldHVybnMge3N0cmluZ30gVGhlIGhpZ2hsaWdodGVkIEhUTUwuXG5cdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHQgKiBAcHVibGljXG5cdCAqIEBleGFtcGxlXG5cdCAqIFByaXNtLmhpZ2hsaWdodCgndmFyIGZvbyA9IHRydWU7JywgUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQsICdqYXZhc2NyaXB0Jyk7XG5cdCAqL1xuXHRoaWdobGlnaHQ6IGZ1bmN0aW9uICh0ZXh0LCBncmFtbWFyLCBsYW5ndWFnZSkge1xuXHRcdHZhciBlbnYgPSB7XG5cdFx0XHRjb2RlOiB0ZXh0LFxuXHRcdFx0Z3JhbW1hcjogZ3JhbW1hcixcblx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZVxuXHRcdH07XG5cdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS10b2tlbml6ZScsIGVudik7XG5cdFx0ZW52LnRva2VucyA9IF8udG9rZW5pemUoZW52LmNvZGUsIGVudi5ncmFtbWFyKTtcblx0XHRfLmhvb2tzLnJ1bignYWZ0ZXItdG9rZW5pemUnLCBlbnYpO1xuXHRcdHJldHVybiBUb2tlbi5zdHJpbmdpZnkoXy51dGlsLmVuY29kZShlbnYudG9rZW5zKSwgZW52Lmxhbmd1YWdlKTtcblx0fSxcblxuXHQvKipcblx0ICogVGhpcyBpcyB0aGUgaGVhcnQgb2YgUHJpc20sIGFuZCB0aGUgbW9zdCBsb3ctbGV2ZWwgZnVuY3Rpb24geW91IGNhbiB1c2UuIEl0IGFjY2VwdHMgYSBzdHJpbmcgb2YgdGV4dCBhcyBpbnB1dFxuXHQgKiBhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb25zIHRvIHVzZSwgYW5kIHJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgdG9rZW5pemVkIGNvZGUuXG5cdCAqXG5cdCAqIFdoZW4gdGhlIGxhbmd1YWdlIGRlZmluaXRpb24gaW5jbHVkZXMgbmVzdGVkIHRva2VucywgdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCByZWN1cnNpdmVseSBvbiBlYWNoIG9mIHRoZXNlIHRva2Vucy5cblx0ICpcblx0ICogVGhpcyBtZXRob2QgY291bGQgYmUgdXNlZnVsIGluIG90aGVyIGNvbnRleHRzIGFzIHdlbGwsIGFzIGEgdmVyeSBjcnVkZSBwYXJzZXIuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IEEgc3RyaW5nIHdpdGggdGhlIGNvZGUgdG8gYmUgaGlnaGxpZ2h0ZWQuXG5cdCAqIEBwYXJhbSB7R3JhbW1hcn0gZ3JhbW1hciBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgdG9rZW5zIHRvIHVzZS5cblx0ICpcblx0ICogVXN1YWxseSBhIGxhbmd1YWdlIGRlZmluaXRpb24gbGlrZSBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAuXG5cdCAqIEByZXR1cm5zIHtUb2tlblN0cmVhbX0gQW4gYXJyYXkgb2Ygc3RyaW5ncyBhbmQgdG9rZW5zLCBhIHRva2VuIHN0cmVhbS5cblx0ICogQG1lbWJlcm9mIFByaXNtXG5cdCAqIEBwdWJsaWNcblx0ICogQGV4YW1wbGVcblx0ICogbGV0IGNvZGUgPSBgdmFyIGZvbyA9IDA7YDtcblx0ICogbGV0IHRva2VucyA9IFByaXNtLnRva2VuaXplKGNvZGUsIFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0KTtcblx0ICogdG9rZW5zLmZvckVhY2godG9rZW4gPT4ge1xuXHQgKiAgICAgaWYgKHRva2VuIGluc3RhbmNlb2YgUHJpc20uVG9rZW4gJiYgdG9rZW4udHlwZSA9PT0gJ251bWJlcicpIHtcblx0ICogICAgICAgICBjb25zb2xlLmxvZyhgRm91bmQgbnVtZXJpYyBsaXRlcmFsOiAke3Rva2VuLmNvbnRlbnR9YCk7XG5cdCAqICAgICB9XG5cdCAqIH0pO1xuXHQgKi9cblx0dG9rZW5pemU6IGZ1bmN0aW9uKHRleHQsIGdyYW1tYXIpIHtcblx0XHR2YXIgcmVzdCA9IGdyYW1tYXIucmVzdDtcblx0XHRpZiAocmVzdCkge1xuXHRcdFx0Zm9yICh2YXIgdG9rZW4gaW4gcmVzdCkge1xuXHRcdFx0XHRncmFtbWFyW3Rva2VuXSA9IHJlc3RbdG9rZW5dO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWxldGUgZ3JhbW1hci5yZXN0O1xuXHRcdH1cblxuXHRcdHZhciB0b2tlbkxpc3QgPSBuZXcgTGlua2VkTGlzdCgpO1xuXHRcdGFkZEFmdGVyKHRva2VuTGlzdCwgdG9rZW5MaXN0LmhlYWQsIHRleHQpO1xuXG5cdFx0bWF0Y2hHcmFtbWFyKHRleHQsIHRva2VuTGlzdCwgZ3JhbW1hciwgdG9rZW5MaXN0LmhlYWQsIDApO1xuXG5cdFx0cmV0dXJuIHRvQXJyYXkodG9rZW5MaXN0KTtcblx0fSxcblxuXHQvKipcblx0ICogQG5hbWVzcGFjZVxuXHQgKiBAbWVtYmVyb2YgUHJpc21cblx0ICogQHB1YmxpY1xuXHQgKi9cblx0aG9va3M6IHtcblx0XHRhbGw6IHt9LFxuXG5cdFx0LyoqXG5cdFx0ICogQWRkcyB0aGUgZ2l2ZW4gY2FsbGJhY2sgdG8gdGhlIGxpc3Qgb2YgY2FsbGJhY2tzIGZvciB0aGUgZ2l2ZW4gaG9vay5cblx0XHQgKlxuXHRcdCAqIFRoZSBjYWxsYmFjayB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgaG9vayBpdCBpcyByZWdpc3RlcmVkIGZvciBpcyBydW4uXG5cdFx0ICogSG9va3MgYXJlIHVzdWFsbHkgZGlyZWN0bHkgcnVuIGJ5IGEgaGlnaGxpZ2h0IGZ1bmN0aW9uIGJ1dCB5b3UgY2FuIGFsc28gcnVuIGhvb2tzIHlvdXJzZWxmLlxuXHRcdCAqXG5cdFx0ICogT25lIGNhbGxiYWNrIGZ1bmN0aW9uIGNhbiBiZSByZWdpc3RlcmVkIHRvIG11bHRpcGxlIGhvb2tzIGFuZCB0aGUgc2FtZSBob29rIG11bHRpcGxlIHRpbWVzLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGhvb2suXG5cdFx0ICogQHBhcmFtIHtIb29rQ2FsbGJhY2t9IGNhbGxiYWNrIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB3aGljaCBpcyBnaXZlbiBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGFkZDogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgaG9va3MgPSBfLmhvb2tzLmFsbDtcblxuXHRcdFx0aG9va3NbbmFtZV0gPSBob29rc1tuYW1lXSB8fCBbXTtcblxuXHRcdFx0aG9va3NbbmFtZV0ucHVzaChjYWxsYmFjayk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJ1bnMgYSBob29rIGludm9raW5nIGFsbCByZWdpc3RlcmVkIGNhbGxiYWNrcyB3aXRoIHRoZSBnaXZlbiBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG5cdFx0ICpcblx0XHQgKiBDYWxsYmFja3Mgd2lsbCBiZSBpbnZva2VkIHN5bmNocm9ub3VzbHkgYW5kIGluIHRoZSBvcmRlciBpbiB3aGljaCB0aGV5IHdlcmUgcmVnaXN0ZXJlZC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBob29rLlxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gZW52IFRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMgb2YgdGhlIGhvb2sgcGFzc2VkIHRvIGFsbCBjYWxsYmFja3MgcmVnaXN0ZXJlZC5cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0cnVuOiBmdW5jdGlvbiAobmFtZSwgZW52KSB7XG5cdFx0XHR2YXIgY2FsbGJhY2tzID0gXy5ob29rcy5hbGxbbmFtZV07XG5cblx0XHRcdGlmICghY2FsbGJhY2tzIHx8ICFjYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Zm9yICh2YXIgaT0wLCBjYWxsYmFjazsgY2FsbGJhY2sgPSBjYWxsYmFja3NbaSsrXTspIHtcblx0XHRcdFx0Y2FsbGJhY2soZW52KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0VG9rZW46IFRva2VuXG59O1xuX3NlbGYuUHJpc20gPSBfO1xuXG5cbi8vIFR5cGVzY3JpcHQgbm90ZTpcbi8vIFRoZSBmb2xsb3dpbmcgY2FuIGJlIHVzZWQgdG8gaW1wb3J0IHRoZSBUb2tlbiB0eXBlIGluIEpTRG9jOlxuLy9cbi8vICAgQHR5cGVkZWYge0luc3RhbmNlVHlwZTxpbXBvcnQoXCIuL3ByaXNtLWNvcmVcIilbXCJUb2tlblwiXT59IFRva2VuXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB0b2tlbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBTZWUge0BsaW5rIFRva2VuI3R5cGUgdHlwZX1cbiAqIEBwYXJhbSB7c3RyaW5nIHwgVG9rZW5TdHJlYW19IGNvbnRlbnQgU2VlIHtAbGluayBUb2tlbiNjb250ZW50IGNvbnRlbnR9XG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gW2FsaWFzXSBUaGUgYWxpYXMoZXMpIG9mIHRoZSB0b2tlbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbbWF0Y2hlZFN0cj1cIlwiXSBBIGNvcHkgb2YgdGhlIGZ1bGwgc3RyaW5nIHRoaXMgdG9rZW4gd2FzIGNyZWF0ZWQgZnJvbS5cbiAqIEBjbGFzc1xuICogQGdsb2JhbFxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBUb2tlbih0eXBlLCBjb250ZW50LCBhbGlhcywgbWF0Y2hlZFN0cikge1xuXHQvKipcblx0ICogVGhlIHR5cGUgb2YgdGhlIHRva2VuLlxuXHQgKlxuXHQgKiBUaGlzIGlzIHVzdWFsbHkgdGhlIGtleSBvZiBhIHBhdHRlcm4gaW4gYSB7QGxpbmsgR3JhbW1hcn0uXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqIEBzZWUgR3JhbW1hclRva2VuXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdHRoaXMudHlwZSA9IHR5cGU7XG5cdC8qKlxuXHQgKiBUaGUgc3RyaW5ncyBvciB0b2tlbnMgY29udGFpbmVkIGJ5IHRoaXMgdG9rZW4uXG5cdCAqXG5cdCAqIFRoaXMgd2lsbCBiZSBhIHRva2VuIHN0cmVhbSBpZiB0aGUgcGF0dGVybiBtYXRjaGVkIGFsc28gZGVmaW5lZCBhbiBgaW5zaWRlYCBncmFtbWFyLlxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nIHwgVG9rZW5TdHJlYW19XG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG5cdC8qKlxuXHQgKiBUaGUgYWxpYXMoZXMpIG9mIHRoZSB0b2tlbi5cblx0ICpcblx0ICogQHR5cGUge3N0cmluZ3xzdHJpbmdbXX1cblx0ICogQHNlZSBHcmFtbWFyVG9rZW5cblx0ICogQHB1YmxpY1xuXHQgKi9cblx0dGhpcy5hbGlhcyA9IGFsaWFzO1xuXHQvLyBDb3B5IG9mIHRoZSBmdWxsIHN0cmluZyB0aGlzIHRva2VuIHdhcyBjcmVhdGVkIGZyb21cblx0dGhpcy5sZW5ndGggPSAobWF0Y2hlZFN0ciB8fCAnJykubGVuZ3RoIHwgMDtcbn1cblxuLyoqXG4gKiBBIHRva2VuIHN0cmVhbSBpcyBhbiBhcnJheSBvZiBzdHJpbmdzIGFuZCB7QGxpbmsgVG9rZW4gVG9rZW59IG9iamVjdHMuXG4gKlxuICogVG9rZW4gc3RyZWFtcyBoYXZlIHRvIGZ1bGZpbGwgYSBmZXcgcHJvcGVydGllcyB0aGF0IGFyZSBhc3N1bWVkIGJ5IG1vc3QgZnVuY3Rpb25zIChtb3N0bHkgaW50ZXJuYWwgb25lcykgdGhhdCBwcm9jZXNzXG4gKiB0aGVtLlxuICpcbiAqIDEuIE5vIGFkamFjZW50IHN0cmluZ3MuXG4gKiAyLiBObyBlbXB0eSBzdHJpbmdzLlxuICpcbiAqICAgIFRoZSBvbmx5IGV4Y2VwdGlvbiBoZXJlIGlzIHRoZSB0b2tlbiBzdHJlYW0gdGhhdCBvbmx5IGNvbnRhaW5zIHRoZSBlbXB0eSBzdHJpbmcgYW5kIG5vdGhpbmcgZWxzZS5cbiAqXG4gKiBAdHlwZWRlZiB7QXJyYXk8c3RyaW5nIHwgVG9rZW4+fSBUb2tlblN0cmVhbVxuICogQGdsb2JhbFxuICogQHB1YmxpY1xuICovXG5cbi8qKlxuICogQ29udmVydHMgdGhlIGdpdmVuIHRva2VuIG9yIHRva2VuIHN0cmVhbSB0byBhbiBIVE1MIHJlcHJlc2VudGF0aW9uLlxuICpcbiAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG4gKiAxLiBgd3JhcGA6IE9uIGVhY2gge0BsaW5rIFRva2VufS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZyB8IFRva2VuIHwgVG9rZW5TdHJlYW19IG8gVGhlIHRva2VuIG9yIHRva2VuIHN0cmVhbSB0byBiZSBjb252ZXJ0ZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgVGhlIG5hbWUgb2YgY3VycmVudCBsYW5ndWFnZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBIVE1MIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0b2tlbiBvciB0b2tlbiBzdHJlYW0uXG4gKiBAbWVtYmVyb2YgVG9rZW5cbiAqIEBzdGF0aWNcbiAqL1xuVG9rZW4uc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KG8sIGxhbmd1YWdlKSB7XG5cdGlmICh0eXBlb2YgbyA9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBvO1xuXHR9XG5cdGlmIChBcnJheS5pc0FycmF5KG8pKSB7XG5cdFx0dmFyIHMgPSAnJztcblx0XHRvLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcblx0XHRcdHMgKz0gc3RyaW5naWZ5KGUsIGxhbmd1YWdlKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gcztcblx0fVxuXG5cdHZhciBlbnYgPSB7XG5cdFx0dHlwZTogby50eXBlLFxuXHRcdGNvbnRlbnQ6IHN0cmluZ2lmeShvLmNvbnRlbnQsIGxhbmd1YWdlKSxcblx0XHR0YWc6ICdzcGFuJyxcblx0XHRjbGFzc2VzOiBbJ3Rva2VuJywgby50eXBlXSxcblx0XHRhdHRyaWJ1dGVzOiB7fSxcblx0XHRsYW5ndWFnZTogbGFuZ3VhZ2Vcblx0fTtcblxuXHR2YXIgYWxpYXNlcyA9IG8uYWxpYXM7XG5cdGlmIChhbGlhc2VzKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoYWxpYXNlcykpIHtcblx0XHRcdEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGVudi5jbGFzc2VzLCBhbGlhc2VzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZW52LmNsYXNzZXMucHVzaChhbGlhc2VzKTtcblx0XHR9XG5cdH1cblxuXHRfLmhvb2tzLnJ1bignd3JhcCcsIGVudik7XG5cblx0dmFyIGF0dHJpYnV0ZXMgPSAnJztcblx0Zm9yICh2YXIgbmFtZSBpbiBlbnYuYXR0cmlidXRlcykge1xuXHRcdGF0dHJpYnV0ZXMgKz0gJyAnICsgbmFtZSArICc9XCInICsgKGVudi5hdHRyaWJ1dGVzW25hbWVdIHx8ICcnKS5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JykgKyAnXCInO1xuXHR9XG5cblx0cmV0dXJuICc8JyArIGVudi50YWcgKyAnIGNsYXNzPVwiJyArIGVudi5jbGFzc2VzLmpvaW4oJyAnKSArICdcIicgKyBhdHRyaWJ1dGVzICsgJz4nICsgZW52LmNvbnRlbnQgKyAnPC8nICsgZW52LnRhZyArICc+Jztcbn07XG5cbi8qKlxuICogQHBhcmFtIHtSZWdFeHB9IHBhdHRlcm5cbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3NcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGxvb2tiZWhpbmRcbiAqIEByZXR1cm5zIHtSZWdFeHBFeGVjQXJyYXkgfCBudWxsfVxuICovXG5mdW5jdGlvbiBtYXRjaFBhdHRlcm4ocGF0dGVybiwgcG9zLCB0ZXh0LCBsb29rYmVoaW5kKSB7XG5cdHBhdHRlcm4ubGFzdEluZGV4ID0gcG9zO1xuXHR2YXIgbWF0Y2ggPSBwYXR0ZXJuLmV4ZWModGV4dCk7XG5cdGlmIChtYXRjaCAmJiBsb29rYmVoaW5kICYmIG1hdGNoWzFdKSB7XG5cdFx0Ly8gY2hhbmdlIHRoZSBtYXRjaCB0byByZW1vdmUgdGhlIHRleHQgbWF0Y2hlZCBieSB0aGUgUHJpc20gbG9va2JlaGluZCBncm91cFxuXHRcdHZhciBsb29rYmVoaW5kTGVuZ3RoID0gbWF0Y2hbMV0ubGVuZ3RoO1xuXHRcdG1hdGNoLmluZGV4ICs9IGxvb2tiZWhpbmRMZW5ndGg7XG5cdFx0bWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZShsb29rYmVoaW5kTGVuZ3RoKTtcblx0fVxuXHRyZXR1cm4gbWF0Y2g7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqIEBwYXJhbSB7TGlua2VkTGlzdDxzdHJpbmcgfCBUb2tlbj59IHRva2VuTGlzdFxuICogQHBhcmFtIHthbnl9IGdyYW1tYXJcbiAqIEBwYXJhbSB7TGlua2VkTGlzdE5vZGU8c3RyaW5nIHwgVG9rZW4+fSBzdGFydE5vZGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydFBvc1xuICogQHBhcmFtIHtSZW1hdGNoT3B0aW9uc30gW3JlbWF0Y2hdXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBwcml2YXRlXG4gKlxuICogQHR5cGVkZWYgUmVtYXRjaE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjYXVzZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IHJlYWNoXG4gKi9cbmZ1bmN0aW9uIG1hdGNoR3JhbW1hcih0ZXh0LCB0b2tlbkxpc3QsIGdyYW1tYXIsIHN0YXJ0Tm9kZSwgc3RhcnRQb3MsIHJlbWF0Y2gpIHtcblx0Zm9yICh2YXIgdG9rZW4gaW4gZ3JhbW1hcikge1xuXHRcdGlmICghZ3JhbW1hci5oYXNPd25Qcm9wZXJ0eSh0b2tlbikgfHwgIWdyYW1tYXJbdG9rZW5dKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHR2YXIgcGF0dGVybnMgPSBncmFtbWFyW3Rva2VuXTtcblx0XHRwYXR0ZXJucyA9IEFycmF5LmlzQXJyYXkocGF0dGVybnMpID8gcGF0dGVybnMgOiBbcGF0dGVybnNdO1xuXG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBwYXR0ZXJucy5sZW5ndGg7ICsraikge1xuXHRcdFx0aWYgKHJlbWF0Y2ggJiYgcmVtYXRjaC5jYXVzZSA9PSB0b2tlbiArICcsJyArIGopIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgcGF0dGVybk9iaiA9IHBhdHRlcm5zW2pdLFxuXHRcdFx0XHRpbnNpZGUgPSBwYXR0ZXJuT2JqLmluc2lkZSxcblx0XHRcdFx0bG9va2JlaGluZCA9ICEhcGF0dGVybk9iai5sb29rYmVoaW5kLFxuXHRcdFx0XHRncmVlZHkgPSAhIXBhdHRlcm5PYmouZ3JlZWR5LFxuXHRcdFx0XHRhbGlhcyA9IHBhdHRlcm5PYmouYWxpYXM7XG5cblx0XHRcdGlmIChncmVlZHkgJiYgIXBhdHRlcm5PYmoucGF0dGVybi5nbG9iYWwpIHtcblx0XHRcdFx0Ly8gV2l0aG91dCB0aGUgZ2xvYmFsIGZsYWcsIGxhc3RJbmRleCB3b24ndCB3b3JrXG5cdFx0XHRcdHZhciBmbGFncyA9IHBhdHRlcm5PYmoucGF0dGVybi50b1N0cmluZygpLm1hdGNoKC9baW1zdXldKiQvKVswXTtcblx0XHRcdFx0cGF0dGVybk9iai5wYXR0ZXJuID0gUmVnRXhwKHBhdHRlcm5PYmoucGF0dGVybi5zb3VyY2UsIGZsYWdzICsgJ2cnKTtcblx0XHRcdH1cblxuXHRcdFx0LyoqIEB0eXBlIHtSZWdFeHB9ICovXG5cdFx0XHR2YXIgcGF0dGVybiA9IHBhdHRlcm5PYmoucGF0dGVybiB8fCBwYXR0ZXJuT2JqO1xuXG5cdFx0XHRmb3IgKCAvLyBpdGVyYXRlIHRoZSB0b2tlbiBsaXN0IGFuZCBrZWVwIHRyYWNrIG9mIHRoZSBjdXJyZW50IHRva2VuL3N0cmluZyBwb3NpdGlvblxuXHRcdFx0XHR2YXIgY3VycmVudE5vZGUgPSBzdGFydE5vZGUubmV4dCwgcG9zID0gc3RhcnRQb3M7XG5cdFx0XHRcdGN1cnJlbnROb2RlICE9PSB0b2tlbkxpc3QudGFpbDtcblx0XHRcdFx0cG9zICs9IGN1cnJlbnROb2RlLnZhbHVlLmxlbmd0aCwgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0XG5cdFx0XHQpIHtcblxuXHRcdFx0XHRpZiAocmVtYXRjaCAmJiBwb3MgPj0gcmVtYXRjaC5yZWFjaCkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHN0ciA9IGN1cnJlbnROb2RlLnZhbHVlO1xuXG5cdFx0XHRcdGlmICh0b2tlbkxpc3QubGVuZ3RoID4gdGV4dC5sZW5ndGgpIHtcblx0XHRcdFx0XHQvLyBTb21ldGhpbmcgd2VudCB0ZXJyaWJseSB3cm9uZywgQUJPUlQsIEFCT1JUIVxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChzdHIgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHJlbW92ZUNvdW50ID0gMTsgLy8gdGhpcyBpcyB0aGUgdG8gcGFyYW1ldGVyIG9mIHJlbW92ZUJldHdlZW5cblx0XHRcdFx0dmFyIG1hdGNoO1xuXG5cdFx0XHRcdGlmIChncmVlZHkpIHtcblx0XHRcdFx0XHRtYXRjaCA9IG1hdGNoUGF0dGVybihwYXR0ZXJuLCBwb3MsIHRleHQsIGxvb2tiZWhpbmQpO1xuXHRcdFx0XHRcdGlmICghbWF0Y2gpIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBmcm9tID0gbWF0Y2guaW5kZXg7XG5cdFx0XHRcdFx0dmFyIHRvID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cdFx0XHRcdFx0dmFyIHAgPSBwb3M7XG5cblx0XHRcdFx0XHQvLyBmaW5kIHRoZSBub2RlIHRoYXQgY29udGFpbnMgdGhlIG1hdGNoXG5cdFx0XHRcdFx0cCArPSBjdXJyZW50Tm9kZS52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKGZyb20gPj0gcCkge1xuXHRcdFx0XHRcdFx0Y3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuXHRcdFx0XHRcdFx0cCArPSBjdXJyZW50Tm9kZS52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIGFkanVzdCBwb3MgKGFuZCBwKVxuXHRcdFx0XHRcdHAgLT0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdHBvcyA9IHA7XG5cblx0XHRcdFx0XHQvLyB0aGUgY3VycmVudCBub2RlIGlzIGEgVG9rZW4sIHRoZW4gdGhlIG1hdGNoIHN0YXJ0cyBpbnNpZGUgYW5vdGhlciBUb2tlbiwgd2hpY2ggaXMgaW52YWxpZFxuXHRcdFx0XHRcdGlmIChjdXJyZW50Tm9kZS52YWx1ZSBpbnN0YW5jZW9mIFRva2VuKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBmaW5kIHRoZSBsYXN0IG5vZGUgd2hpY2ggaXMgYWZmZWN0ZWQgYnkgdGhpcyBtYXRjaFxuXHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHR2YXIgayA9IGN1cnJlbnROb2RlO1xuXHRcdFx0XHRcdFx0ayAhPT0gdG9rZW5MaXN0LnRhaWwgJiYgKHAgPCB0byB8fCB0eXBlb2Ygay52YWx1ZSA9PT0gJ3N0cmluZycpO1xuXHRcdFx0XHRcdFx0ayA9IGsubmV4dFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0cmVtb3ZlQ291bnQrKztcblx0XHRcdFx0XHRcdHAgKz0gay52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJlbW92ZUNvdW50LS07XG5cblx0XHRcdFx0XHQvLyByZXBsYWNlIHdpdGggdGhlIG5ldyBtYXRjaFxuXHRcdFx0XHRcdHN0ciA9IHRleHQuc2xpY2UocG9zLCBwKTtcblx0XHRcdFx0XHRtYXRjaC5pbmRleCAtPSBwb3M7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bWF0Y2ggPSBtYXRjaFBhdHRlcm4ocGF0dGVybiwgMCwgc3RyLCBsb29rYmVoaW5kKTtcblx0XHRcdFx0XHRpZiAoIW1hdGNoKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZnJvbSA9IG1hdGNoLmluZGV4LFxuXHRcdFx0XHRcdG1hdGNoU3RyID0gbWF0Y2hbMF0sXG5cdFx0XHRcdFx0YmVmb3JlID0gc3RyLnNsaWNlKDAsIGZyb20pLFxuXHRcdFx0XHRcdGFmdGVyID0gc3RyLnNsaWNlKGZyb20gKyBtYXRjaFN0ci5sZW5ndGgpO1xuXG5cdFx0XHRcdHZhciByZWFjaCA9IHBvcyArIHN0ci5sZW5ndGg7XG5cdFx0XHRcdGlmIChyZW1hdGNoICYmIHJlYWNoID4gcmVtYXRjaC5yZWFjaCkge1xuXHRcdFx0XHRcdHJlbWF0Y2gucmVhY2ggPSByZWFjaDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciByZW1vdmVGcm9tID0gY3VycmVudE5vZGUucHJldjtcblxuXHRcdFx0XHRpZiAoYmVmb3JlKSB7XG5cdFx0XHRcdFx0cmVtb3ZlRnJvbSA9IGFkZEFmdGVyKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgYmVmb3JlKTtcblx0XHRcdFx0XHRwb3MgKz0gYmVmb3JlLmxlbmd0aDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlbW92ZVJhbmdlKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgcmVtb3ZlQ291bnQpO1xuXG5cdFx0XHRcdHZhciB3cmFwcGVkID0gbmV3IFRva2VuKHRva2VuLCBpbnNpZGUgPyBfLnRva2VuaXplKG1hdGNoU3RyLCBpbnNpZGUpIDogbWF0Y2hTdHIsIGFsaWFzLCBtYXRjaFN0cik7XG5cdFx0XHRcdGN1cnJlbnROb2RlID0gYWRkQWZ0ZXIodG9rZW5MaXN0LCByZW1vdmVGcm9tLCB3cmFwcGVkKTtcblxuXHRcdFx0XHRpZiAoYWZ0ZXIpIHtcblx0XHRcdFx0XHRhZGRBZnRlcih0b2tlbkxpc3QsIGN1cnJlbnROb2RlLCBhZnRlcik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAocmVtb3ZlQ291bnQgPiAxKSB7XG5cdFx0XHRcdFx0Ly8gYXQgbGVhc3Qgb25lIFRva2VuIG9iamVjdCB3YXMgcmVtb3ZlZCwgc28gd2UgaGF2ZSB0byBkbyBzb21lIHJlbWF0Y2hpbmdcblx0XHRcdFx0XHQvLyB0aGlzIGNhbiBvbmx5IGhhcHBlbiBpZiB0aGUgY3VycmVudCBwYXR0ZXJuIGlzIGdyZWVkeVxuXHRcdFx0XHRcdG1hdGNoR3JhbW1hcih0ZXh0LCB0b2tlbkxpc3QsIGdyYW1tYXIsIGN1cnJlbnROb2RlLnByZXYsIHBvcywge1xuXHRcdFx0XHRcdFx0Y2F1c2U6IHRva2VuICsgJywnICsgaixcblx0XHRcdFx0XHRcdHJlYWNoOiByZWFjaFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogQHR5cGVkZWYgTGlua2VkTGlzdE5vZGVcbiAqIEBwcm9wZXJ0eSB7VH0gdmFsdWVcbiAqIEBwcm9wZXJ0eSB7TGlua2VkTGlzdE5vZGU8VD4gfCBudWxsfSBwcmV2IFRoZSBwcmV2aW91cyBub2RlLlxuICogQHByb3BlcnR5IHtMaW5rZWRMaXN0Tm9kZTxUPiB8IG51bGx9IG5leHQgVGhlIG5leHQgbm9kZS5cbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAcHJpdmF0ZVxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIFRcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIExpbmtlZExpc3QoKSB7XG5cdC8qKiBAdHlwZSB7TGlua2VkTGlzdE5vZGU8VD59ICovXG5cdHZhciBoZWFkID0geyB2YWx1ZTogbnVsbCwgcHJldjogbnVsbCwgbmV4dDogbnVsbCB9O1xuXHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHR2YXIgdGFpbCA9IHsgdmFsdWU6IG51bGwsIHByZXY6IGhlYWQsIG5leHQ6IG51bGwgfTtcblx0aGVhZC5uZXh0ID0gdGFpbDtcblxuXHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHR0aGlzLmhlYWQgPSBoZWFkO1xuXHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHR0aGlzLnRhaWwgPSB0YWlsO1xuXHR0aGlzLmxlbmd0aCA9IDA7XG59XG5cbi8qKlxuICogQWRkcyBhIG5ldyBub2RlIHdpdGggdGhlIGdpdmVuIHZhbHVlIHRvIHRoZSBsaXN0LlxuICogQHBhcmFtIHtMaW5rZWRMaXN0PFQ+fSBsaXN0XG4gKiBAcGFyYW0ge0xpbmtlZExpc3ROb2RlPFQ+fSBub2RlXG4gKiBAcGFyYW0ge1R9IHZhbHVlXG4gKiBAcmV0dXJucyB7TGlua2VkTGlzdE5vZGU8VD59IFRoZSBhZGRlZCBub2RlLlxuICogQHRlbXBsYXRlIFRcbiAqL1xuZnVuY3Rpb24gYWRkQWZ0ZXIobGlzdCwgbm9kZSwgdmFsdWUpIHtcblx0Ly8gYXNzdW1lcyB0aGF0IG5vZGUgIT0gbGlzdC50YWlsICYmIHZhbHVlcy5sZW5ndGggPj0gMFxuXHR2YXIgbmV4dCA9IG5vZGUubmV4dDtcblxuXHR2YXIgbmV3Tm9kZSA9IHsgdmFsdWU6IHZhbHVlLCBwcmV2OiBub2RlLCBuZXh0OiBuZXh0IH07XG5cdG5vZGUubmV4dCA9IG5ld05vZGU7XG5cdG5leHQucHJldiA9IG5ld05vZGU7XG5cdGxpc3QubGVuZ3RoKys7XG5cblx0cmV0dXJuIG5ld05vZGU7XG59XG4vKipcbiAqIFJlbW92ZXMgYGNvdW50YCBub2RlcyBhZnRlciB0aGUgZ2l2ZW4gbm9kZS4gVGhlIGdpdmVuIG5vZGUgd2lsbCBub3QgYmUgcmVtb3ZlZC5cbiAqIEBwYXJhbSB7TGlua2VkTGlzdDxUPn0gbGlzdFxuICogQHBhcmFtIHtMaW5rZWRMaXN0Tm9kZTxUPn0gbm9kZVxuICogQHBhcmFtIHtudW1iZXJ9IGNvdW50XG4gKiBAdGVtcGxhdGUgVFxuICovXG5mdW5jdGlvbiByZW1vdmVSYW5nZShsaXN0LCBub2RlLCBjb3VudCkge1xuXHR2YXIgbmV4dCA9IG5vZGUubmV4dDtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudCAmJiBuZXh0ICE9PSBsaXN0LnRhaWw7IGkrKykge1xuXHRcdG5leHQgPSBuZXh0Lm5leHQ7XG5cdH1cblx0bm9kZS5uZXh0ID0gbmV4dDtcblx0bmV4dC5wcmV2ID0gbm9kZTtcblx0bGlzdC5sZW5ndGggLT0gaTtcbn1cbi8qKlxuICogQHBhcmFtIHtMaW5rZWRMaXN0PFQ+fSBsaXN0XG4gKiBAcmV0dXJucyB7VFtdfVxuICogQHRlbXBsYXRlIFRcbiAqL1xuZnVuY3Rpb24gdG9BcnJheShsaXN0KSB7XG5cdHZhciBhcnJheSA9IFtdO1xuXHR2YXIgbm9kZSA9IGxpc3QuaGVhZC5uZXh0O1xuXHR3aGlsZSAobm9kZSAhPT0gbGlzdC50YWlsKSB7XG5cdFx0YXJyYXkucHVzaChub2RlLnZhbHVlKTtcblx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHR9XG5cdHJldHVybiBhcnJheTtcbn1cblxuXG5pZiAoIV9zZWxmLmRvY3VtZW50KSB7XG5cdGlmICghX3NlbGYuYWRkRXZlbnRMaXN0ZW5lcikge1xuXHRcdC8vIGluIE5vZGUuanNcblx0XHRyZXR1cm4gXztcblx0fVxuXG5cdGlmICghXy5kaXNhYmxlV29ya2VyTWVzc2FnZUhhbmRsZXIpIHtcblx0XHQvLyBJbiB3b3JrZXJcblx0XHRfc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2dCkge1xuXHRcdFx0dmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKGV2dC5kYXRhKSxcblx0XHRcdFx0bGFuZyA9IG1lc3NhZ2UubGFuZ3VhZ2UsXG5cdFx0XHRcdGNvZGUgPSBtZXNzYWdlLmNvZGUsXG5cdFx0XHRcdGltbWVkaWF0ZUNsb3NlID0gbWVzc2FnZS5pbW1lZGlhdGVDbG9zZTtcblxuXHRcdFx0X3NlbGYucG9zdE1lc3NhZ2UoXy5oaWdobGlnaHQoY29kZSwgXy5sYW5ndWFnZXNbbGFuZ10sIGxhbmcpKTtcblx0XHRcdGlmIChpbW1lZGlhdGVDbG9zZSkge1xuXHRcdFx0XHRfc2VsZi5jbG9zZSgpO1xuXHRcdFx0fVxuXHRcdH0sIGZhbHNlKTtcblx0fVxuXG5cdHJldHVybiBfO1xufVxuXG4vLyBHZXQgY3VycmVudCBzY3JpcHQgYW5kIGhpZ2hsaWdodFxudmFyIHNjcmlwdCA9IF8udXRpbC5jdXJyZW50U2NyaXB0KCk7XG5cbmlmIChzY3JpcHQpIHtcblx0Xy5maWxlbmFtZSA9IHNjcmlwdC5zcmM7XG5cblx0aWYgKHNjcmlwdC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbWFudWFsJykpIHtcblx0XHRfLm1hbnVhbCA9IHRydWU7XG5cdH1cbn1cblxuZnVuY3Rpb24gaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrKCkge1xuXHRpZiAoIV8ubWFudWFsKSB7XG5cdFx0Xy5oaWdobGlnaHRBbGwoKTtcblx0fVxufVxuXG5pZiAoIV8ubWFudWFsKSB7XG5cdC8vIElmIHRoZSBkb2N1bWVudCBzdGF0ZSBpcyBcImxvYWRpbmdcIiwgdGhlbiB3ZSdsbCB1c2UgRE9NQ29udGVudExvYWRlZC5cblx0Ly8gSWYgdGhlIGRvY3VtZW50IHN0YXRlIGlzIFwiaW50ZXJhY3RpdmVcIiBhbmQgdGhlIHByaXNtLmpzIHNjcmlwdCBpcyBkZWZlcnJlZCwgdGhlbiB3ZSdsbCBhbHNvIHVzZSB0aGVcblx0Ly8gRE9NQ29udGVudExvYWRlZCBldmVudCBiZWNhdXNlIHRoZXJlIG1pZ2h0IGJlIHNvbWUgcGx1Z2lucyBvciBsYW5ndWFnZXMgd2hpY2ggaGF2ZSBhbHNvIGJlZW4gZGVmZXJyZWQgYW5kIHRoZXlcblx0Ly8gbWlnaHQgdGFrZSBsb25nZXIgb25lIGFuaW1hdGlvbiBmcmFtZSB0byBleGVjdXRlIHdoaWNoIGNhbiBjcmVhdGUgYSByYWNlIGNvbmRpdGlvbiB3aGVyZSBvbmx5IHNvbWUgcGx1Z2lucyBoYXZlXG5cdC8vIGJlZW4gbG9hZGVkIHdoZW4gUHJpc20uaGlnaGxpZ2h0QWxsKCkgaXMgZXhlY3V0ZWQsIGRlcGVuZGluZyBvbiBob3cgZmFzdCByZXNvdXJjZXMgYXJlIGxvYWRlZC5cblx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9QcmlzbUpTL3ByaXNtL2lzc3Vlcy8yMTAyXG5cdHZhciByZWFkeVN0YXRlID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcblx0aWYgKHJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJyB8fCByZWFkeVN0YXRlID09PSAnaW50ZXJhY3RpdmUnICYmIHNjcmlwdCAmJiBzY3JpcHQuZGVmZXIpIHtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrKTtcblx0fSBlbHNlIHtcblx0XHRpZiAod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShoaWdobGlnaHRBdXRvbWF0aWNhbGx5Q2FsbGJhY2spO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR3aW5kb3cuc2V0VGltZW91dChoaWdobGlnaHRBdXRvbWF0aWNhbGx5Q2FsbGJhY2ssIDE2KTtcblx0XHR9XG5cdH1cbn1cblxucmV0dXJuIF87XG5cbn0pKF9zZWxmKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gUHJpc207XG59XG5cbi8vIGhhY2sgZm9yIGNvbXBvbmVudHMgdG8gd29yayBjb3JyZWN0bHkgaW4gbm9kZS5qc1xuaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG5cdGdsb2JhbC5QcmlzbSA9IFByaXNtO1xufVxuXG4vLyBzb21lIGFkZGl0aW9uYWwgZG9jdW1lbnRhdGlvbi90eXBlc1xuXG4vKipcbiAqIFRoZSBleHBhbnNpb24gb2YgYSBzaW1wbGUgYFJlZ0V4cGAgbGl0ZXJhbCB0byBzdXBwb3J0IGFkZGl0aW9uYWwgcHJvcGVydGllcy5cbiAqXG4gKiBAdHlwZWRlZiBHcmFtbWFyVG9rZW5cbiAqIEBwcm9wZXJ0eSB7UmVnRXhwfSBwYXR0ZXJuIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gb2YgdGhlIHRva2VuLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbbG9va2JlaGluZD1mYWxzZV0gSWYgYHRydWVgLCB0aGVuIHRoZSBmaXJzdCBjYXB0dXJpbmcgZ3JvdXAgb2YgYHBhdHRlcm5gIHdpbGwgKGVmZmVjdGl2ZWx5KVxuICogYmVoYXZlIGFzIGEgbG9va2JlaGluZCBncm91cCBtZWFuaW5nIHRoYXQgdGhlIGNhcHR1cmVkIHRleHQgd2lsbCBub3QgYmUgcGFydCBvZiB0aGUgbWF0Y2hlZCB0ZXh0IG9mIHRoZSBuZXcgdG9rZW4uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtncmVlZHk9ZmFsc2VdIFdoZXRoZXIgdGhlIHRva2VuIGlzIGdyZWVkeS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfHN0cmluZ1tdfSBbYWxpYXNdIEFuIG9wdGlvbmFsIGFsaWFzIG9yIGxpc3Qgb2YgYWxpYXNlcy5cbiAqIEBwcm9wZXJ0eSB7R3JhbW1hcn0gW2luc2lkZV0gVGhlIG5lc3RlZCBncmFtbWFyIG9mIHRoaXMgdG9rZW4uXG4gKlxuICogVGhlIGBpbnNpZGVgIGdyYW1tYXIgd2lsbCBiZSB1c2VkIHRvIHRva2VuaXplIHRoZSB0ZXh0IHZhbHVlIG9mIGVhY2ggdG9rZW4gb2YgdGhpcyBraW5kLlxuICpcbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbWFrZSBuZXN0ZWQgYW5kIGV2ZW4gcmVjdXJzaXZlIGxhbmd1YWdlIGRlZmluaXRpb25zLlxuICpcbiAqIE5vdGU6IFRoaXMgY2FuIGNhdXNlIGluZmluaXRlIHJlY3Vyc2lvbi4gQmUgY2FyZWZ1bCB3aGVuIHlvdSBlbWJlZCBkaWZmZXJlbnQgbGFuZ3VhZ2VzIG9yIGV2ZW4gdGhlIHNhbWUgbGFuZ3VhZ2UgaW50b1xuICogZWFjaCBhbm90aGVyLlxuICogQGdsb2JhbFxuICogQHB1YmxpY1xuKi9cblxuLyoqXG4gKiBAdHlwZWRlZiBHcmFtbWFyXG4gKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgUmVnRXhwIHwgR3JhbW1hclRva2VuIHwgQXJyYXk8UmVnRXhwIHwgR3JhbW1hclRva2VuPj59XG4gKiBAcHJvcGVydHkge0dyYW1tYXJ9IFtyZXN0XSBBbiBvcHRpb25hbCBncmFtbWFyIG9iamVjdCB0aGF0IHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhpcyBncmFtbWFyLlxuICogQGdsb2JhbFxuICogQHB1YmxpY1xuICovXG5cbi8qKlxuICogQSBmdW5jdGlvbiB3aGljaCB3aWxsIGludm9rZWQgYWZ0ZXIgYW4gZWxlbWVudCB3YXMgc3VjY2Vzc2Z1bGx5IGhpZ2hsaWdodGVkLlxuICpcbiAqIEBjYWxsYmFjayBIaWdobGlnaHRDYWxsYmFja1xuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHN1Y2Nlc3NmdWxseSBoaWdobGlnaHRlZC5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGdsb2JhbFxuICogQHB1YmxpY1xuKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgSG9va0NhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IGVudiBUaGUgZW52aXJvbm1lbnQgdmFyaWFibGVzIG9mIHRoZSBob29rLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cbiIsIihmdW5jdGlvbiAoUHJpc20pIHtcblxuXHR2YXIgc3RyaW5nID0gLyhcInwnKSg/OlxcXFwoPzpcXHJcXG58W1xcc1xcU10pfCg/IVxcMSlbXlxcXFxcXHJcXG5dKSpcXDEvO1xuXG5cdFByaXNtLmxhbmd1YWdlcy5jc3MgPSB7XG5cdFx0J2NvbW1lbnQnOiAvXFwvXFwqW1xcc1xcU10qP1xcKlxcLy8sXG5cdFx0J2F0cnVsZSc6IHtcblx0XHRcdHBhdHRlcm46IC9AW1xcdy1dKD86W147e1xcc118XFxzKyg/IVtcXHN7XSkpKig/Ojt8KD89XFxzKlxceykpLyxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQncnVsZSc6IC9eQFtcXHctXSsvLFxuXHRcdFx0XHQnc2VsZWN0b3ItZnVuY3Rpb24tYXJndW1lbnQnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogLyhcXGJzZWxlY3RvclxccypcXChcXHMqKD8hW1xccyldKSkoPzpbXigpXFxzXXxcXHMrKD8hW1xccyldKXxcXCgoPzpbXigpXXxcXChbXigpXSpcXCkpKlxcKSkrKD89XFxzKlxcKSkvLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdFx0YWxpYXM6ICdzZWxlY3Rvcidcblx0XHRcdFx0fSxcblx0XHRcdFx0J2tleXdvcmQnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogLyhefFteXFx3LV0pKD86YW5kfG5vdHxvbmx5fG9yKSg/IVtcXHctXSkvLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBTZWUgcmVzdCBiZWxvd1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0J3VybCc6IHtcblx0XHRcdC8vIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblx0XHRcdHBhdHRlcm46IFJlZ0V4cCgnXFxcXGJ1cmxcXFxcKCg/OicgKyBzdHJpbmcuc291cmNlICsgJ3wnICsgLyg/OlteXFxcXFxcclxcbigpXCInXXxcXFxcW1xcc1xcU10pKi8uc291cmNlICsgJylcXFxcKScsICdpJyksXG5cdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J2Z1bmN0aW9uJzogL151cmwvaSxcblx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL15cXCh8XFwpJC8sXG5cdFx0XHRcdCdzdHJpbmcnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogUmVnRXhwKCdeJyArIHN0cmluZy5zb3VyY2UgKyAnJCcpLFxuXHRcdFx0XHRcdGFsaWFzOiAndXJsJ1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQnc2VsZWN0b3InOiBSZWdFeHAoJ1tee31cXFxcc10oPzpbXnt9O1wiXFwnXFxcXHNdfFxcXFxzKyg/IVtcXFxcc3tdKXwnICsgc3RyaW5nLnNvdXJjZSArICcpKig/PVxcXFxzKlxcXFx7KScpLFxuXHRcdCdzdHJpbmcnOiB7XG5cdFx0XHRwYXR0ZXJuOiBzdHJpbmcsXG5cdFx0XHRncmVlZHk6IHRydWVcblx0XHR9LFxuXHRcdCdwcm9wZXJ0eSc6IC8oPyFcXHMpWy1fYS16XFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWy1cXHdcXHhBMC1cXHVGRkZGXSkqKD89XFxzKjopL2ksXG5cdFx0J2ltcG9ydGFudCc6IC8haW1wb3J0YW50XFxiL2ksXG5cdFx0J2Z1bmN0aW9uJzogL1stYS16MC05XSsoPz1cXCgpL2ksXG5cdFx0J3B1bmN0dWF0aW9uJzogL1soKXt9OzosXS9cblx0fTtcblxuXHRQcmlzbS5sYW5ndWFnZXMuY3NzWydhdHJ1bGUnXS5pbnNpZGUucmVzdCA9IFByaXNtLmxhbmd1YWdlcy5jc3M7XG5cblx0dmFyIG1hcmt1cCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cdGlmIChtYXJrdXApIHtcblx0XHRtYXJrdXAudGFnLmFkZElubGluZWQoJ3N0eWxlJywgJ2NzcycpO1xuXG5cdFx0UHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnaW5zaWRlJywgJ2F0dHItdmFsdWUnLCB7XG5cdFx0XHQnc3R5bGUtYXR0cic6IHtcblx0XHRcdFx0cGF0dGVybjogLyhefFtcIidcXHNdKXN0eWxlXFxzKj1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonKS9pLFxuXHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQnYXR0ci12YWx1ZSc6IHtcblx0XHRcdFx0XHRcdHBhdHRlcm46IC89XFxzKig/OlwiW15cIl0qXCJ8J1teJ10qJ3xbXlxccydcIj49XSspLyxcblx0XHRcdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdFx0XHQnc3R5bGUnOiB7XG5cdFx0XHRcdFx0XHRcdFx0cGF0dGVybjogLyhbXCInXSlbXFxzXFxTXSsoPz1bXCInXSQpLyxcblx0XHRcdFx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdGFsaWFzOiAnbGFuZ3VhZ2UtY3NzJyxcblx0XHRcdFx0XHRcdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5jc3Ncblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogW1xuXHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdHBhdHRlcm46IC9ePS8sXG5cdFx0XHRcdFx0XHRcdFx0XHRhbGlhczogJ2F0dHItZXF1YWxzJ1xuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0L1wifCcvXG5cdFx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdCdhdHRyLW5hbWUnOiAvXnN0eWxlL2lcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sIG1hcmt1cC50YWcpO1xuXHR9XG5cbn0oUHJpc20pKTtcbiIsIlByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0ID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnY2xpa2UnLCB7XG5cdCdjbGFzcy1uYW1lJzogW1xuXHRcdFByaXNtLmxhbmd1YWdlcy5jbGlrZVsnY2xhc3MtbmFtZSddLFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXiRcXHdcXHhBMC1cXHVGRkZGXSkoPyFcXHMpW18kQS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKD89XFwuKD86cHJvdG90eXBlfGNvbnN0cnVjdG9yKSkvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH1cblx0XSxcblx0J2tleXdvcmQnOiBbXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLygoPzpefH0pXFxzKikoPzpjYXRjaHxmaW5hbGx5KVxcYi8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W14uXXxcXC5cXC5cXC5cXHMqKVxcYig/OmFzfGFzeW5jKD89XFxzKig/OmZ1bmN0aW9uXFxifFxcKHxbJFxcd1xceEEwLVxcdUZGRkZdfCQpKXxhd2FpdHxicmVha3xjYXNlfGNsYXNzfGNvbnN0fGNvbnRpbnVlfGRlYnVnZ2VyfGRlZmF1bHR8ZGVsZXRlfGRvfGVsc2V8ZW51bXxleHBvcnR8ZXh0ZW5kc3xmb3J8ZnJvbXxmdW5jdGlvbnwoPzpnZXR8c2V0KSg/PVxccypbXFxbJFxcd1xceEEwLVxcdUZGRkZdKXxpZnxpbXBsZW1lbnRzfGltcG9ydHxpbnxpbnN0YW5jZW9mfGludGVyZmFjZXxsZXR8bmV3fG51bGx8b2Z8cGFja2FnZXxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8cmV0dXJufHN0YXRpY3xzdXBlcnxzd2l0Y2h8dGhpc3x0aHJvd3x0cnl8dHlwZW9mfHVuZGVmaW5lZHx2YXJ8dm9pZHx3aGlsZXx3aXRofHlpZWxkKVxcYi8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XSxcblx0Ly8gQWxsb3cgZm9yIGFsbCBub24tQVNDSUkgY2hhcmFjdGVycyAoU2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIwMDg0NDQpXG5cdCdmdW5jdGlvbic6IC8jPyg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXHMqKD86XFwuXFxzKig/OmFwcGx5fGJpbmR8Y2FsbClcXHMqKT9cXCgpLyxcblx0J251bWJlcic6IC9cXGIoPzooPzowW3hYXSg/OltcXGRBLUZhLWZdKD86X1tcXGRBLUZhLWZdKT8pK3wwW2JCXSg/OlswMV0oPzpfWzAxXSk/KSt8MFtvT10oPzpbMC03XSg/Ol9bMC03XSk/KSspbj98KD86XFxkKD86X1xcZCk/KStufE5hTnxJbmZpbml0eSlcXGJ8KD86XFxiKD86XFxkKD86X1xcZCk/KStcXC4/KD86XFxkKD86X1xcZCk/KSp8XFxCXFwuKD86XFxkKD86X1xcZCk/KSspKD86W0VlXVsrLV0/KD86XFxkKD86X1xcZCk/KSspPy8sXG5cdCdvcGVyYXRvcic6IC8tLXxcXCtcXCt8XFwqXFwqPT98PT58JiY9P3xcXHxcXHw9P3xbIT1dPT18PDw9P3w+Pj4/PT98Wy0rKi8lJnxeIT08Pl09P3xcXC57M318XFw/XFw/PT98XFw/XFwuP3xbfjpdL1xufSk7XG5cblByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0WydjbGFzcy1uYW1lJ11bMF0ucGF0dGVybiA9IC8oXFxiKD86Y2xhc3N8aW50ZXJmYWNlfGV4dGVuZHN8aW1wbGVtZW50c3xpbnN0YW5jZW9mfG5ldylcXHMrKVtcXHcuXFxcXF0rLztcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdrZXl3b3JkJywge1xuXHQncmVnZXgnOiB7XG5cdFx0cGF0dGVybjogLygoPzpefFteJFxcd1xceEEwLVxcdUZGRkYuXCInXFxdKVxcc118XFxiKD86cmV0dXJufHlpZWxkKSlcXHMqKVxcLyg/OlxcWyg/OlteXFxdXFxcXFxcclxcbl18XFxcXC4pKl18XFxcXC58W14vXFxcXFxcW1xcclxcbl0pK1xcL1tnaW15dXNdezAsNn0oPz0oPzpcXHN8XFwvXFwqKD86W14qXXxcXCooPyFcXC8pKSpcXCpcXC8pKig/OiR8W1xcclxcbiwuOzp9KVxcXV18XFwvXFwvKSkvLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3JlZ2V4LXNvdXJjZSc6IHtcblx0XHRcdFx0cGF0dGVybjogL14oXFwvKVtcXHNcXFNdKyg/PVxcL1thLXpdKiQpLyxcblx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0YWxpYXM6ICdsYW5ndWFnZS1yZWdleCcsXG5cdFx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLnJlZ2V4XG5cdFx0XHR9LFxuXHRcdFx0J3JlZ2V4LWZsYWdzJzogL1thLXpdKyQvLFxuXHRcdFx0J3JlZ2V4LWRlbGltaXRlcic6IC9eXFwvfFxcLyQvXG5cdFx0fVxuXHR9LFxuXHQvLyBUaGlzIG11c3QgYmUgZGVjbGFyZWQgYmVmb3JlIGtleXdvcmQgYmVjYXVzZSB3ZSB1c2UgXCJmdW5jdGlvblwiIGluc2lkZSB0aGUgbG9vay1mb3J3YXJkXG5cdCdmdW5jdGlvbi12YXJpYWJsZSc6IHtcblx0XHRwYXR0ZXJuOiAvIz8oPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKD89XFxzKls9Ol1cXHMqKD86YXN5bmNcXHMqKT8oPzpcXGJmdW5jdGlvblxcYnwoPzpcXCgoPzpbXigpXXxcXChbXigpXSpcXCkpKlxcKXwoPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKVxccyo9PikpLyxcblx0XHRhbGlhczogJ2Z1bmN0aW9uJ1xuXHR9LFxuXHQncGFyYW1ldGVyJzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oZnVuY3Rpb24oPzpcXHMrKD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKik/XFxzKlxcKFxccyopKD8hXFxzKSg/OlteKClcXHNdfFxccysoPyFbXFxzKV0pfFxcKFteKCldKlxcKSkrKD89XFxzKlxcKSkvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHR9LFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKD89XFxzKj0+KS9pLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhcXChcXHMqKSg/IVxccykoPzpbXigpXFxzXXxcXHMrKD8hW1xccyldKXxcXChbXigpXSpcXCkpKyg/PVxccypcXClcXHMqPT4pLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKCg/OlxcYnxcXHN8XikoPyEoPzphc3xhc3luY3xhd2FpdHxicmVha3xjYXNlfGNhdGNofGNsYXNzfGNvbnN0fGNvbnRpbnVlfGRlYnVnZ2VyfGRlZmF1bHR8ZGVsZXRlfGRvfGVsc2V8ZW51bXxleHBvcnR8ZXh0ZW5kc3xmaW5hbGx5fGZvcnxmcm9tfGZ1bmN0aW9ufGdldHxpZnxpbXBsZW1lbnRzfGltcG9ydHxpbnxpbnN0YW5jZW9mfGludGVyZmFjZXxsZXR8bmV3fG51bGx8b2Z8cGFja2FnZXxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8cmV0dXJufHNldHxzdGF0aWN8c3VwZXJ8c3dpdGNofHRoaXN8dGhyb3d8dHJ5fHR5cGVvZnx1bmRlZmluZWR8dmFyfHZvaWR8d2hpbGV8d2l0aHx5aWVsZCkoPyFbJFxcd1xceEEwLVxcdUZGRkZdKSkoPzooPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqXFxzKilcXChcXHMqfFxcXVxccypcXChcXHMqKSg/IVxccykoPzpbXigpXFxzXXxcXHMrKD8hW1xccyldKXxcXChbXigpXSpcXCkpKyg/PVxccypcXClcXHMqXFx7KS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdH1cblx0XSxcblx0J2NvbnN0YW50JzogL1xcYltBLVpdKD86W0EtWl9dfFxcZHg/KSpcXGIvXG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdzdHJpbmcnLCB7XG5cdCd0ZW1wbGF0ZS1zdHJpbmcnOiB7XG5cdFx0cGF0dGVybjogL2AoPzpcXFxcW1xcc1xcU118XFwkeyg/Oltee31dfHsoPzpbXnt9XXx7W159XSp9KSp9KSt9fCg/IVxcJHspW15cXFxcYF0pKmAvLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCd0ZW1wbGF0ZS1wdW5jdHVhdGlvbic6IHtcblx0XHRcdFx0cGF0dGVybjogL15gfGAkLyxcblx0XHRcdFx0YWxpYXM6ICdzdHJpbmcnXG5cdFx0XHR9LFxuXHRcdFx0J2ludGVycG9sYXRpb24nOiB7XG5cdFx0XHRcdHBhdHRlcm46IC8oKD86XnxbXlxcXFxdKSg/OlxcXFx7Mn0pKilcXCR7KD86W157fV18eyg/Oltee31dfHtbXn1dKn0pKn0pK30vLFxuXHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQnaW50ZXJwb2xhdGlvbi1wdW5jdHVhdGlvbic6IHtcblx0XHRcdFx0XHRcdHBhdHRlcm46IC9eXFwke3x9JC8sXG5cdFx0XHRcdFx0XHRhbGlhczogJ3B1bmN0dWF0aW9uJ1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cmVzdDogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdzdHJpbmcnOiAvW1xcc1xcU10rL1xuXHRcdH1cblx0fVxufSk7XG5cbmlmIChQcmlzbS5sYW5ndWFnZXMubWFya3VwKSB7XG5cdFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLmFkZElubGluZWQoJ3NjcmlwdCcsICdqYXZhc2NyaXB0Jyk7XG59XG5cblByaXNtLmxhbmd1YWdlcy5qcyA9IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0O1xuIiwiUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCA9IHtcblx0J2NvbW1lbnQnOiAvPCEtLVtcXHNcXFNdKj8tLT4vLFxuXHQncHJvbG9nJzogLzxcXD9bXFxzXFxTXSs/XFw/Pi8sXG5cdCdkb2N0eXBlJzoge1xuXHRcdC8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi94bWwvI05ULWRvY3R5cGVkZWNsXG5cdFx0cGF0dGVybjogLzwhRE9DVFlQRSg/OltePlwiJ1tcXF1dfFwiW15cIl0qXCJ8J1teJ10qJykrKD86XFxbKD86W148XCInXFxdXXxcIlteXCJdKlwifCdbXiddKid8PCg/ISEtLSl8PCEtLSg/OlteLV18LSg/IS0+KSkqLS0+KSpcXF1cXHMqKT8+L2ksXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J2ludGVybmFsLXN1YnNldCc6IHtcblx0XHRcdFx0cGF0dGVybjogLyhcXFspW1xcc1xcU10rKD89XFxdPiQpLyxcblx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0XHRpbnNpZGU6IG51bGwgLy8gc2VlIGJlbG93XG5cdFx0XHR9LFxuXHRcdFx0J3N0cmluZyc6IHtcblx0XHRcdFx0cGF0dGVybjogL1wiW15cIl0qXCJ8J1teJ10qJy8sXG5cdFx0XHRcdGdyZWVkeTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdCdwdW5jdHVhdGlvbic6IC9ePCF8PiR8W1tcXF1dLyxcblx0XHRcdCdkb2N0eXBlLXRhZyc6IC9eRE9DVFlQRS8sXG5cdFx0XHQnbmFtZSc6IC9bXlxcczw+J1wiXSsvXG5cdFx0fVxuXHR9LFxuXHQnY2RhdGEnOiAvPCFcXFtDREFUQVxcW1tcXHNcXFNdKj9dXT4vaSxcblx0J3RhZyc6IHtcblx0XHRwYXR0ZXJuOiAvPFxcLz8oPyFcXGQpW15cXHM+XFwvPSQ8JV0rKD86XFxzKD86XFxzKlteXFxzPlxcLz1dKyg/Olxccyo9XFxzKig/OlwiW15cIl0qXCJ8J1teJ10qJ3xbXlxccydcIj49XSsoPz1bXFxzPl0pKXwoPz1bXFxzLz5dKSkpKyk/XFxzKlxcLz8+Lyxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQndGFnJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXjxcXC8/W15cXHM+XFwvXSsvLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiAvXjxcXC8/Lyxcblx0XHRcdFx0XHQnbmFtZXNwYWNlJzogL15bXlxccz5cXC86XSs6L1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J2F0dHItdmFsdWUnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC89XFxzKig/OlwiW15cIl0qXCJ8J1teJ10qJ3xbXlxccydcIj49XSspLyxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRwYXR0ZXJuOiAvXj0vLFxuXHRcdFx0XHRcdFx0XHRhbGlhczogJ2F0dHItZXF1YWxzJ1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdC9cInwnL1xuXHRcdFx0XHRcdF1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdwdW5jdHVhdGlvbic6IC9cXC8/Pi8sXG5cdFx0XHQnYXR0ci1uYW1lJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvW15cXHM+XFwvXSsvLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQnbmFtZXNwYWNlJzogL15bXlxccz5cXC86XSs6L1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9XG5cdH0sXG5cdCdlbnRpdHknOiBbXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyZbXFxkYS16XXsxLDh9Oy9pLFxuXHRcdFx0YWxpYXM6ICduYW1lZC1lbnRpdHknXG5cdFx0fSxcblx0XHQvJiN4P1tcXGRhLWZdezEsOH07L2lcblx0XVxufTtcblxuUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cFsndGFnJ10uaW5zaWRlWydhdHRyLXZhbHVlJ10uaW5zaWRlWydlbnRpdHknXSA9XG5cdFByaXNtLmxhbmd1YWdlcy5tYXJrdXBbJ2VudGl0eSddO1xuUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cFsnZG9jdHlwZSddLmluc2lkZVsnaW50ZXJuYWwtc3Vic2V0J10uaW5zaWRlID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblxuLy8gUGx1Z2luIHRvIG1ha2UgZW50aXR5IHRpdGxlIHNob3cgdGhlIHJlYWwgZW50aXR5LCBpZGVhIGJ5IFJvbWFuIEtvbWFyb3ZcblByaXNtLmhvb2tzLmFkZCgnd3JhcCcsIGZ1bmN0aW9uIChlbnYpIHtcblxuXHRpZiAoZW52LnR5cGUgPT09ICdlbnRpdHknKSB7XG5cdFx0ZW52LmF0dHJpYnV0ZXNbJ3RpdGxlJ10gPSBlbnYuY29udGVudC5yZXBsYWNlKC8mYW1wOy8sICcmJyk7XG5cdH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcsICdhZGRJbmxpbmVkJywge1xuXHQvKipcblx0ICogQWRkcyBhbiBpbmxpbmVkIGxhbmd1YWdlIHRvIG1hcmt1cC5cblx0ICpcblx0ICogQW4gZXhhbXBsZSBvZiBhbiBpbmxpbmVkIGxhbmd1YWdlIGlzIENTUyB3aXRoIGA8c3R5bGU+YCB0YWdzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGFnTmFtZSBUaGUgbmFtZSBvZiB0aGUgdGFnIHRoYXQgY29udGFpbnMgdGhlIGlubGluZWQgbGFuZ3VhZ2UuIFRoaXMgbmFtZSB3aWxsIGJlIHRyZWF0ZWQgYXNcblx0ICogY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxhbmcgVGhlIGxhbmd1YWdlIGtleS5cblx0ICogQGV4YW1wbGVcblx0ICogYWRkSW5saW5lZCgnc3R5bGUnLCAnY3NzJyk7XG5cdCAqL1xuXHR2YWx1ZTogZnVuY3Rpb24gYWRkSW5saW5lZCh0YWdOYW1lLCBsYW5nKSB7XG5cdFx0dmFyIGluY2x1ZGVkQ2RhdGFJbnNpZGUgPSB7fTtcblx0XHRpbmNsdWRlZENkYXRhSW5zaWRlWydsYW5ndWFnZS0nICsgbGFuZ10gPSB7XG5cdFx0XHRwYXR0ZXJuOiAvKF48IVxcW0NEQVRBXFxbKVtcXHNcXFNdKz8oPz1cXF1cXF0+JCkvaSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlc1tsYW5nXVxuXHRcdH07XG5cdFx0aW5jbHVkZWRDZGF0YUluc2lkZVsnY2RhdGEnXSA9IC9ePCFcXFtDREFUQVxcW3xcXF1cXF0+JC9pO1xuXG5cdFx0dmFyIGluc2lkZSA9IHtcblx0XHRcdCdpbmNsdWRlZC1jZGF0YSc6IHtcblx0XHRcdFx0cGF0dGVybjogLzwhXFxbQ0RBVEFcXFtbXFxzXFxTXSo/XFxdXFxdPi9pLFxuXHRcdFx0XHRpbnNpZGU6IGluY2x1ZGVkQ2RhdGFJbnNpZGVcblx0XHRcdH1cblx0XHR9O1xuXHRcdGluc2lkZVsnbGFuZ3VhZ2UtJyArIGxhbmddID0ge1xuXHRcdFx0cGF0dGVybjogL1tcXHNcXFNdKy8sXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlc1tsYW5nXVxuXHRcdH07XG5cblx0XHR2YXIgZGVmID0ge307XG5cdFx0ZGVmW3RhZ05hbWVdID0ge1xuXHRcdFx0cGF0dGVybjogUmVnRXhwKC8oPF9fW14+XSo+KSg/OjwhXFxbQ0RBVEFcXFsoPzpbXlxcXV18XFxdKD8hXFxdPikpKlxcXVxcXT58KD8hPCFcXFtDREFUQVxcWylbXFxzXFxTXSkqPyg/PTxcXC9fXz4pLy5zb3VyY2UucmVwbGFjZSgvX18vZywgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGFnTmFtZTsgfSksICdpJyksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBpbnNpZGVcblx0XHR9O1xuXG5cdFx0UHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NkYXRhJywgZGVmKTtcblx0fVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5odG1sID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblByaXNtLmxhbmd1YWdlcy5tYXRobWwgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuUHJpc20ubGFuZ3VhZ2VzLnN2ZyA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cblByaXNtLmxhbmd1YWdlcy54bWwgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdtYXJrdXAnLCB7fSk7XG5QcmlzbS5sYW5ndWFnZXMuc3NtbCA9IFByaXNtLmxhbmd1YWdlcy54bWw7XG5QcmlzbS5sYW5ndWFnZXMuYXRvbSA9IFByaXNtLmxhbmd1YWdlcy54bWw7XG5QcmlzbS5sYW5ndWFnZXMucnNzID0gUHJpc20ubGFuZ3VhZ2VzLnhtbDtcbiIsIihmdW5jdGlvbiAoKSB7XG5cblx0aWYgKHR5cGVvZiBzZWxmID09PSAndW5kZWZpbmVkJyB8fCAhc2VsZi5QcmlzbSB8fCAhc2VsZi5kb2N1bWVudCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8qKlxuXHQgKiBQbHVnaW4gbmFtZSB3aGljaCBpcyB1c2VkIGFzIGEgY2xhc3MgbmFtZSBmb3IgPHByZT4gd2hpY2ggaXMgYWN0aXZhdGluZyB0aGUgcGx1Z2luXG5cdCAqIEB0eXBlIHtTdHJpbmd9XG5cdCAqL1xuXHR2YXIgUExVR0lOX05BTUUgPSAnbGluZS1udW1iZXJzJztcblxuXHQvKipcblx0ICogUmVndWxhciBleHByZXNzaW9uIHVzZWQgZm9yIGRldGVybWluaW5nIGxpbmUgYnJlYWtzXG5cdCAqIEB0eXBlIHtSZWdFeHB9XG5cdCAqL1xuXHR2YXIgTkVXX0xJTkVfRVhQID0gL1xcbig/ISQpL2c7XG5cblxuXHQvKipcblx0ICogR2xvYmFsIGV4cG9ydHNcblx0ICovXG5cdHZhciBjb25maWcgPSBQcmlzbS5wbHVnaW5zLmxpbmVOdW1iZXJzID0ge1xuXHRcdC8qKlxuXHRcdCAqIEdldCBub2RlIGZvciBwcm92aWRlZCBsaW5lIG51bWJlclxuXHRcdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBwcmUgZWxlbWVudFxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBudW1iZXIgbGluZSBudW1iZXJcblx0XHQgKiBAcmV0dXJuIHtFbGVtZW50fHVuZGVmaW5lZH1cblx0XHQgKi9cblx0XHRnZXRMaW5lOiBmdW5jdGlvbiAoZWxlbWVudCwgbnVtYmVyKSB7XG5cdFx0XHRpZiAoZWxlbWVudC50YWdOYW1lICE9PSAnUFJFJyB8fCAhZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoUExVR0lOX05BTUUpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGxpbmVOdW1iZXJSb3dzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubGluZS1udW1iZXJzLXJvd3MnKTtcblx0XHRcdGlmICghbGluZU51bWJlclJvd3MpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGxpbmVOdW1iZXJTdGFydCA9IHBhcnNlSW50KGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXN0YXJ0JyksIDEwKSB8fCAxO1xuXHRcdFx0dmFyIGxpbmVOdW1iZXJFbmQgPSBsaW5lTnVtYmVyU3RhcnQgKyAobGluZU51bWJlclJvd3MuY2hpbGRyZW4ubGVuZ3RoIC0gMSk7XG5cblx0XHRcdGlmIChudW1iZXIgPCBsaW5lTnVtYmVyU3RhcnQpIHtcblx0XHRcdFx0bnVtYmVyID0gbGluZU51bWJlclN0YXJ0O1xuXHRcdFx0fVxuXHRcdFx0aWYgKG51bWJlciA+IGxpbmVOdW1iZXJFbmQpIHtcblx0XHRcdFx0bnVtYmVyID0gbGluZU51bWJlckVuZDtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGxpbmVJbmRleCA9IG51bWJlciAtIGxpbmVOdW1iZXJTdGFydDtcblxuXHRcdFx0cmV0dXJuIGxpbmVOdW1iZXJSb3dzLmNoaWxkcmVuW2xpbmVJbmRleF07XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJlc2l6ZXMgdGhlIGxpbmUgbnVtYmVycyBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cblx0XHQgKlxuXHRcdCAqIFRoaXMgZnVuY3Rpb24gd2lsbCBub3QgYWRkIGxpbmUgbnVtYmVycy4gSXQgd2lsbCBvbmx5IHJlc2l6ZSBleGlzdGluZyBvbmVzLlxuXHRcdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgQSBgPHByZT5gIGVsZW1lbnQgd2l0aCBsaW5lIG51bWJlcnMuXG5cdFx0ICogQHJldHVybnMge3ZvaWR9XG5cdFx0ICovXG5cdFx0cmVzaXplOiBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0cmVzaXplRWxlbWVudHMoW2VsZW1lbnRdKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogV2hldGhlciB0aGUgcGx1Z2luIGNhbiBhc3N1bWUgdGhhdCB0aGUgdW5pdHMgZm9udCBzaXplcyBhbmQgbWFyZ2lucyBhcmUgbm90IGRlcGVuZGVkIG9uIHRoZSBzaXplIG9mXG5cdFx0ICogdGhlIGN1cnJlbnQgdmlld3BvcnQuXG5cdFx0ICpcblx0XHQgKiBTZXR0aW5nIHRoaXMgdG8gYHRydWVgIHdpbGwgYWxsb3cgdGhlIHBsdWdpbiB0byBkbyBjZXJ0YWluIG9wdGltaXphdGlvbnMgZm9yIGJldHRlciBwZXJmb3JtYW5jZS5cblx0XHQgKlxuXHRcdCAqIFNldCB0aGlzIHRvIGBmYWxzZWAgaWYgeW91IHVzZSBhbnkgb2YgdGhlIGZvbGxvd2luZyBDU1MgdW5pdHM6IGB2aGAsIGB2d2AsIGB2bWluYCwgYHZtYXhgLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUge2Jvb2xlYW59XG5cdFx0ICovXG5cdFx0YXNzdW1lVmlld3BvcnRJbmRlcGVuZGVuY2U6IHRydWVcblx0fTtcblxuXHQvKipcblx0ICogUmVzaXplcyB0aGUgZ2l2ZW4gZWxlbWVudHMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gZWxlbWVudHNcblx0ICovXG5cdGZ1bmN0aW9uIHJlc2l6ZUVsZW1lbnRzKGVsZW1lbnRzKSB7XG5cdFx0ZWxlbWVudHMgPSBlbGVtZW50cy5maWx0ZXIoZnVuY3Rpb24gKGUpIHtcblx0XHRcdHZhciBjb2RlU3R5bGVzID0gZ2V0U3R5bGVzKGUpO1xuXHRcdFx0dmFyIHdoaXRlU3BhY2UgPSBjb2RlU3R5bGVzWyd3aGl0ZS1zcGFjZSddO1xuXHRcdFx0cmV0dXJuIHdoaXRlU3BhY2UgPT09ICdwcmUtd3JhcCcgfHwgd2hpdGVTcGFjZSA9PT0gJ3ByZS1saW5lJztcblx0XHR9KTtcblxuXHRcdGlmIChlbGVtZW50cy5sZW5ndGggPT0gMCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciBpbmZvcyA9IGVsZW1lbnRzLm1hcChmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0dmFyIGNvZGVFbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdjb2RlJyk7XG5cdFx0XHR2YXIgbGluZU51bWJlcnNXcmFwcGVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubGluZS1udW1iZXJzLXJvd3MnKTtcblx0XHRcdGlmICghY29kZUVsZW1lbnQgfHwgIWxpbmVOdW1iZXJzV3JhcHBlcikge1xuXHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiogQHR5cGUge0hUTUxFbGVtZW50fSAqL1xuXHRcdFx0dmFyIGxpbmVOdW1iZXJTaXplciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmUtbnVtYmVycy1zaXplcicpO1xuXHRcdFx0dmFyIGNvZGVMaW5lcyA9IGNvZGVFbGVtZW50LnRleHRDb250ZW50LnNwbGl0KE5FV19MSU5FX0VYUCk7XG5cblx0XHRcdGlmICghbGluZU51bWJlclNpemVyKSB7XG5cdFx0XHRcdGxpbmVOdW1iZXJTaXplciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRcdFx0bGluZU51bWJlclNpemVyLmNsYXNzTmFtZSA9ICdsaW5lLW51bWJlcnMtc2l6ZXInO1xuXG5cdFx0XHRcdGNvZGVFbGVtZW50LmFwcGVuZENoaWxkKGxpbmVOdW1iZXJTaXplcik7XG5cdFx0XHR9XG5cblx0XHRcdGxpbmVOdW1iZXJTaXplci5pbm5lckhUTUwgPSAnMCc7XG5cdFx0XHRsaW5lTnVtYmVyU2l6ZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cblx0XHRcdHZhciBvbmVMaW5lckhlaWdodCA9IGxpbmVOdW1iZXJTaXplci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cdFx0XHRsaW5lTnVtYmVyU2l6ZXIuaW5uZXJIVE1MID0gJyc7XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRcdGxpbmVzOiBjb2RlTGluZXMsXG5cdFx0XHRcdGxpbmVIZWlnaHRzOiBbXSxcblx0XHRcdFx0b25lTGluZXJIZWlnaHQ6IG9uZUxpbmVySGVpZ2h0LFxuXHRcdFx0XHRzaXplcjogbGluZU51bWJlclNpemVyLFxuXHRcdFx0fTtcblx0XHR9KS5maWx0ZXIoQm9vbGVhbik7XG5cblx0XHRpbmZvcy5mb3JFYWNoKGZ1bmN0aW9uIChpbmZvKSB7XG5cdFx0XHR2YXIgbGluZU51bWJlclNpemVyID0gaW5mby5zaXplcjtcblx0XHRcdHZhciBsaW5lcyA9IGluZm8ubGluZXM7XG5cdFx0XHR2YXIgbGluZUhlaWdodHMgPSBpbmZvLmxpbmVIZWlnaHRzO1xuXHRcdFx0dmFyIG9uZUxpbmVySGVpZ2h0ID0gaW5mby5vbmVMaW5lckhlaWdodDtcblxuXHRcdFx0bGluZUhlaWdodHNbbGluZXMubGVuZ3RoIC0gMV0gPSB1bmRlZmluZWQ7XG5cdFx0XHRsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5lLCBpbmRleCkge1xuXHRcdFx0XHRpZiAobGluZSAmJiBsaW5lLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHR2YXIgZSA9IGxpbmVOdW1iZXJTaXplci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJykpO1xuXHRcdFx0XHRcdGUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0XHRcdFx0ZS50ZXh0Q29udGVudCA9IGxpbmU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bGluZUhlaWdodHNbaW5kZXhdID0gb25lTGluZXJIZWlnaHQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0aW5mb3MuZm9yRWFjaChmdW5jdGlvbiAoaW5mbykge1xuXHRcdFx0dmFyIGxpbmVOdW1iZXJTaXplciA9IGluZm8uc2l6ZXI7XG5cdFx0XHR2YXIgbGluZUhlaWdodHMgPSBpbmZvLmxpbmVIZWlnaHRzO1xuXG5cdFx0XHR2YXIgY2hpbGRJbmRleCA9IDA7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVIZWlnaHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChsaW5lSGVpZ2h0c1tpXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0bGluZUhlaWdodHNbaV0gPSBsaW5lTnVtYmVyU2l6ZXIuY2hpbGRyZW5bY2hpbGRJbmRleCsrXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGluZm9zLmZvckVhY2goZnVuY3Rpb24gKGluZm8pIHtcblx0XHRcdHZhciBsaW5lTnVtYmVyU2l6ZXIgPSBpbmZvLnNpemVyO1xuXHRcdFx0dmFyIHdyYXBwZXIgPSBpbmZvLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmUtbnVtYmVycy1yb3dzJyk7XG5cblx0XHRcdGxpbmVOdW1iZXJTaXplci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0bGluZU51bWJlclNpemVyLmlubmVySFRNTCA9ICcnO1xuXG5cdFx0XHRpbmZvLmxpbmVIZWlnaHRzLmZvckVhY2goZnVuY3Rpb24gKGhlaWdodCwgbGluZU51bWJlcikge1xuXHRcdFx0XHR3cmFwcGVyLmNoaWxkcmVuW2xpbmVOdW1iZXJdLnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHN0eWxlIGRlY2xhcmF0aW9ucyBmb3IgdGhlIGVsZW1lbnRcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG5cdCAqL1xuXHR2YXIgZ2V0U3R5bGVzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRpZiAoIWVsZW1lbnQpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSA/IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkgOiAoZWxlbWVudC5jdXJyZW50U3R5bGUgfHwgbnVsbCk7XG5cdH07XG5cblx0dmFyIGxhc3RXaWR0aCA9IHVuZGVmaW5lZDtcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoY29uZmlnLmFzc3VtZVZpZXdwb3J0SW5kZXBlbmRlbmNlICYmIGxhc3RXaWR0aCA9PT0gd2luZG93LmlubmVyV2lkdGgpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGFzdFdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cblx0XHRyZXNpemVFbGVtZW50cyhBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdwcmUuJyArIFBMVUdJTl9OQU1FKSkpO1xuXHR9KTtcblxuXHRQcmlzbS5ob29rcy5hZGQoJ2NvbXBsZXRlJywgZnVuY3Rpb24gKGVudikge1xuXHRcdGlmICghZW52LmNvZGUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgY29kZSA9IC8qKiBAdHlwZSB7RWxlbWVudH0gKi8gKGVudi5lbGVtZW50KTtcblx0XHR2YXIgcHJlID0gLyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi8gKGNvZGUucGFyZW50Tm9kZSk7XG5cblx0XHQvLyB3b3JrcyBvbmx5IGZvciA8Y29kZT4gd3JhcHBlZCBpbnNpZGUgPHByZT4gKG5vdCBpbmxpbmUpXG5cdFx0aWYgKCFwcmUgfHwgIS9wcmUvaS50ZXN0KHByZS5ub2RlTmFtZSkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBBYm9ydCBpZiBsaW5lIG51bWJlcnMgYWxyZWFkeSBleGlzdHNcblx0XHRpZiAoY29kZS5xdWVyeVNlbGVjdG9yKCcubGluZS1udW1iZXJzLXJvd3MnKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIG9ubHkgYWRkIGxpbmUgbnVtYmVycyBpZiA8Y29kZT4gb3Igb25lIG9mIGl0cyBhbmNlc3RvcnMgaGFzIHRoZSBgbGluZS1udW1iZXJzYCBjbGFzc1xuXHRcdGlmICghUHJpc20udXRpbC5pc0FjdGl2ZShjb2RlLCBQTFVHSU5fTkFNRSkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBSZW1vdmUgdGhlIGNsYXNzICdsaW5lLW51bWJlcnMnIGZyb20gdGhlIDxjb2RlPlxuXHRcdGNvZGUuY2xhc3NMaXN0LnJlbW92ZShQTFVHSU5fTkFNRSk7XG5cdFx0Ly8gQWRkIHRoZSBjbGFzcyAnbGluZS1udW1iZXJzJyB0byB0aGUgPHByZT5cblx0XHRwcmUuY2xhc3NMaXN0LmFkZChQTFVHSU5fTkFNRSk7XG5cblx0XHR2YXIgbWF0Y2ggPSBlbnYuY29kZS5tYXRjaChORVdfTElORV9FWFApO1xuXHRcdHZhciBsaW5lc051bSA9IG1hdGNoID8gbWF0Y2gubGVuZ3RoICsgMSA6IDE7XG5cdFx0dmFyIGxpbmVOdW1iZXJzV3JhcHBlcjtcblxuXHRcdHZhciBsaW5lcyA9IG5ldyBBcnJheShsaW5lc051bSArIDEpLmpvaW4oJzxzcGFuPjwvc3Bhbj4nKTtcblxuXHRcdGxpbmVOdW1iZXJzV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRsaW5lTnVtYmVyc1dyYXBwZXIuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cdFx0bGluZU51bWJlcnNXcmFwcGVyLmNsYXNzTmFtZSA9ICdsaW5lLW51bWJlcnMtcm93cyc7XG5cdFx0bGluZU51bWJlcnNXcmFwcGVyLmlubmVySFRNTCA9IGxpbmVzO1xuXG5cdFx0aWYgKHByZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtc3RhcnQnKSkge1xuXHRcdFx0cHJlLnN0eWxlLmNvdW50ZXJSZXNldCA9ICdsaW5lbnVtYmVyICcgKyAocGFyc2VJbnQocHJlLmdldEF0dHJpYnV0ZSgnZGF0YS1zdGFydCcpLCAxMCkgLSAxKTtcblx0XHR9XG5cblx0XHRlbnYuZWxlbWVudC5hcHBlbmRDaGlsZChsaW5lTnVtYmVyc1dyYXBwZXIpO1xuXG5cdFx0cmVzaXplRWxlbWVudHMoW3ByZV0pO1xuXG5cdFx0UHJpc20uaG9va3MucnVuKCdsaW5lLW51bWJlcnMnLCBlbnYpO1xuXHR9KTtcblxuXHRQcmlzbS5ob29rcy5hZGQoJ2xpbmUtbnVtYmVycycsIGZ1bmN0aW9uIChlbnYpIHtcblx0XHRlbnYucGx1Z2lucyA9IGVudi5wbHVnaW5zIHx8IHt9O1xuXHRcdGVudi5wbHVnaW5zLmxpbmVOdW1iZXJzID0gdHJ1ZTtcblx0fSk7XG5cbn0oKSk7XG4iLCJpbXBvcnQgYXBpIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICAgICAgICBpbXBvcnQgY29udGVudCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1swXS51c2VbMV0hLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vY3ViZXMuY3NzXCI7XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY29udGVudC5sb2NhbHMgfHwge307IiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uLy4uLy4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICAgICAgICBpbXBvcnQgY29udGVudCBmcm9tIFwiISEuLi8uLi8uLi9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzBdLnVzZVsxXSEuLi8uLi8uLi9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3ByaXNtLWxpbmUtbnVtYmVycy5jc3NcIjtcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJpbXBvcnQgYXBpIGZyb20gXCIhLi4vLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgICAgICAgIGltcG9ydCBjb250ZW50IGZyb20gXCIhIS4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMF0udXNlWzFdIS4uLy4uL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcHJpc20tb2thaWRpYS5jc3NcIjtcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJpbXBvcnQgYXBpIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICAgICAgICBpbXBvcnQgY29udGVudCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1swXS51c2VbMV0hLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIjtcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJpbXBvcnQgYXBpIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICAgICAgICBpbXBvcnQgY29udGVudCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1sxXS51c2VbMV0hLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vYWJvdXQubW9kdWxlLnNjc3NcIjtcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJpbXBvcnQgYXBpIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICAgICAgICBpbXBvcnQgY29udGVudCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1sxXS51c2VbMV0hLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbGFuZGluZy5tb2R1bGUuc2Nzc1wiO1xuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsImltcG9ydCBhcGkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgICAgICAgIGltcG9ydCBjb250ZW50IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzFdLnVzZVsxXSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9uYXZiYXIubW9kdWxlLnNjc3NcIjtcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzT2xkSUUgPSBmdW5jdGlvbiBpc09sZElFKCkge1xuICB2YXIgbWVtbztcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKCkge1xuICAgIGlmICh0eXBlb2YgbWVtbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG4gICAgICAvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG4gICAgICAvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG4gICAgICAvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcbiAgICAgIC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuICAgICAgbWVtbyA9IEJvb2xlYW4od2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2IpO1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vO1xuICB9O1xufSgpO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gZ2V0VGFyZ2V0KCkge1xuICB2YXIgbWVtbyA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUodGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vW3RhcmdldF07XG4gIH07XG59KCk7XG5cbnZhciBzdHlsZXNJbkRvbSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRG9tLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRG9tW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM11cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlc0luRG9tLnB1c2goe1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiBhZGRTdHlsZShvYmosIG9wdGlvbnMpLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICB2YXIgYXR0cmlidXRlcyA9IG9wdGlvbnMuYXR0cmlidXRlcyB8fCB7fTtcblxuICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMubm9uY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSAndW5kZWZpbmVkJyA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICAgIGlmIChub25jZSkge1xuICAgICAgYXR0cmlidXRlcy5ub25jZSA9IG5vbmNlO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gIH0pO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zLmluc2VydChzdHlsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhcmdldCA9IGdldFRhcmdldChvcHRpb25zLmluc2VydCB8fCAnaGVhZCcpO1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gICAgfVxuXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxudmFyIHJlcGxhY2VUZXh0ID0gZnVuY3Rpb24gcmVwbGFjZVRleHQoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2UoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuICB9O1xufSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLm1lZGlhID8gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKS5jb25jYXQob2JqLmNzcywgXCJ9XCIpIDogb2JqLmNzczsgLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlLCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3M7XG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYTtcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUoJ21lZGlhJyk7XG4gIH1cblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGUuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXIgc2luZ2xldG9uQ291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgc3R5bGU7XG4gIHZhciB1cGRhdGU7XG4gIHZhciByZW1vdmU7XG5cbiAgaWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG4gICAgc3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZSA9IGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXG4gICAgcmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcbiAgICB9O1xuICB9XG5cbiAgdXBkYXRlKG9iaik7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTsgLy8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG4gIC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcblxuICBpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG4gIH1cblxuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5ld0xpc3QpICE9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRG9tW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRvbVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRvbS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IFwiLi9tYWluLmNzc1wiO1xyXG5pbXBvcnQgXCIuLi9jdWJlcy9jdWJlc1wiO1xyXG5pbXBvcnQgXCIuLi9jdWJlcy9jdWJlcy5jc3NcIjtcclxuaW1wb3J0IFByaXNtIGZyb20gXCJwcmlzbWpzXCI7XHJcblByaXNtLmhpZ2hsaWdodEFsbCgpO1xyXG5cclxuaW1wb3J0IHsgcmVuZGVyTmF2IH0gZnJvbSBcIi4vbmF2YmFyL25hdmJhclwiO1xyXG5cclxuaW1wb3J0IHsgcmVuZGVyTGFuZGluZyB9IGZyb20gXCIuL2xhbmRpbmcvbGFuZGluZ1wiO1xyXG5pbXBvcnQgeyByZW5kZXJBYm91dCB9IGZyb20gXCIuL2Fib3V0L2Fib3V0XCI7XHJcblxyXG5pbXBvcnQgXCIuL2Fib3V0L2Fib3V0XCI7XHJcbmNvbnN0IGRvY0ZyYWcgPSBuZXcgRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5jb25zdCBib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuYm9keS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIiNyb290XCIpO1xyXG5kb2NGcmFnLmFwcGVuZENoaWxkKGJvZHkpO1xyXG5cclxucmVuZGVyTmF2KGRvY0ZyYWcpO1xyXG5yZW5kZXJMYW5kaW5nKGRvY0ZyYWcpO1xyXG5yZW5kZXJBYm91dChkb2NGcmFnKTtcclxuXHJcbi8vIHBhc3MgaW4gdGhlIHRhcmdldCBub2RlLCBhcyB3ZWxsIGFzIHRoZSBvYnNlcnZlciBvcHRpb25zXHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9jRnJhZyk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=