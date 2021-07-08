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
/* harmony import */ var _projectphotos_mysql_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./projectphotos/mysql.svg */ "./src/landing/projectphotos/mysql.svg");
/* harmony import */ var _projectphotos_node_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./projectphotos/node.svg */ "./src/landing/projectphotos/node.svg");
/* harmony import */ var _projectphotos_playlists_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./projectphotos/playlists.png */ "./src/landing/projectphotos/playlists.png");
/* harmony import */ var _projectphotos_tftapp_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./projectphotos/tftapp.png */ "./src/landing/projectphotos/tftapp.png");
/* harmony import */ var _projectphotos_react_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./projectphotos/react.svg */ "./src/landing/projectphotos/react.svg");
/* harmony import */ var _projectphotos_readdit_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./projectphotos/readdit.png */ "./src/landing/projectphotos/readdit.png");
/* harmony import */ var _projectphotos_tesla_clone_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./projectphotos/tesla-clone.png */ "./src/landing/projectphotos/tesla-clone.png");













var element = document.createElement("section");
element.classList.add(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default.wrapper);
var techImages = [{
  image: _projectphotos_react_svg__WEBPACK_IMPORTED_MODULE_10__,
  name: "React"
}, {
  image: _projectphotos_javascript_svg__WEBPACK_IMPORTED_MODULE_5__,
  name: "Js ES6"
}, {
  image: _projectphotos_node_svg__WEBPACK_IMPORTED_MODULE_7__,
  name: "Node"
}, {
  image: _projectphotos_html5_svg__WEBPACK_IMPORTED_MODULE_4__,
  name: "Html"
}, {
  image: _projectphotos_css3_svg__WEBPACK_IMPORTED_MODULE_3__,
  name: "Css"
}, {
  image: _projectphotos_mysql_svg__WEBPACK_IMPORTED_MODULE_6__,
  name: "MySQL"
}];
var renderLanding = function renderLanding(fragment) {
  element.innerHTML =
  /*html*/
  "\n<div class=".concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["center-container"], ">\n\n  <div class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default.container, ">\n    <div class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["text-container"], ">\n      <h1 class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["main-title"], ">Hi, I'm <span>Austin</span></h1>\n      <h4 class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default.description, ">\n        Here are some of my projects I've been working on.\n      </h4>\n    </div> \n    <div class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["image-container"], ">\n \n      \n       <button class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], "> <a href=\"https://github.com/ajl0023/chatApp\" >\n          <img src=").concat(_projectphotos_chatapp_png__WEBPACK_IMPORTED_MODULE_1__, " class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " />\n        </a></button>\n       \n    \n  \n\n      <button class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], ">\n        <a href=\"https://github.com/ajl0023/Covid-tracker\" target=\"_blank\" class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], ">\n          <img src=").concat(_projectphotos_covidTracker_png__WEBPACK_IMPORTED_MODULE_2__, " class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " />\n        </a>\n      </button>\n      <button class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], ">\n        <a href=\"https://github.com/ajl0023/redditSqlMaster\" target=\"_blank\" class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], ">\n          <img src=").concat(_projectphotos_readdit_png__WEBPACK_IMPORTED_MODULE_11__, " class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " />\n        </a>\n      </button>\n      <button class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], ">\n        <a href=\"https://github.com/ajl0023/betterPlaylist\" target=\"_blank\" class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], ">\n          <img src=").concat(_projectphotos_playlists_png__WEBPACK_IMPORTED_MODULE_8__, " class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " />\n        </a>\n      </button>\n      <button class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], "><a href=\"https://github.com/ajl0023/teslaClone\" target=\"_blank\" class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], ">\n          <img src=").concat(_projectphotos_tesla_clone_png__WEBPACK_IMPORTED_MODULE_12__, " class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " />\n        </a></button>\n\n      <button class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], "><a href=\"https://github.com/ajl0023/tftapp2\" target=\"_blank\" class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-container"], ">\n          <img src=").concat(_projectphotos_tftapp_png__WEBPACK_IMPORTED_MODULE_9__, " class=", "".concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["project-image"], " ").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["portfolio-image"]), " />\n        </a>\n      </button>\n    </div>\n\n  </div>\n  <div class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["tech-wrapper"], ">\n    <p class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["tech-container-title"], ">\n      Technologies used in these projects\n    </p>\n    <div id='tech-container' class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["tech-icon-container"], ">\n\n    </div>\n  </div>\n</div>");
  var root = fragment.getElementById("#root");
  root.appendChild(element);
  var techContainer = fragment.getElementById("tech-container");
  techImages.map(function (item) {
    var icon = document.createElement("div");
    icon.classList.add(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["icon-container"]);
    icon.innerHTML =
    /*html*/
    "\n    ".concat(item.image, " <p class=").concat(_landing_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["icon-label"], ">").concat(item.name, "</p>");
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
/* harmony import */ var _navlogos_resume_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navlogos/resume.svg */ "./src/navbar/navlogos/resume.svg");





var renderNav = function renderNav(docFrag) {
  var root = docFrag.getElementById("#root");
  var navContainer = document.createElement("nav");
  navContainer.innerHTML =
  /* HTML */
  " <div class=".concat(_navbar_module_scss__WEBPACK_IMPORTED_MODULE_0__.default.container, ">\n    <div class=").concat(_navbar_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["contact-icon-container"], ">\n      <a href=\"https://github.com/ajl0023\" class=").concat(_navbar_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["contact-icon"], ">\n        ").concat(_navlogos_github_svg__WEBPACK_IMPORTED_MODULE_2__, "</a\n      >\n      <a href=\"mailto:austinjlee.0@gmail.com\" class=").concat(_navbar_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["contact-icon"], ">\n        ").concat(_navlogos_gmail_svg__WEBPACK_IMPORTED_MODULE_3__, "</a\n      >\n      <a\n        href=\"https://www.linkedin.com/in/austin-lee-91a341215/\"\n        class=").concat(_navbar_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["contact-icon"], "\n        >").concat(_navlogos_linkedin_svg__WEBPACK_IMPORTED_MODULE_1__, "</a\n      >\n      <a\n        href=\"./Resume.pdf\"\n        download=\"Resume.pdf\"\n        class=").concat(_navbar_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["contact-icon"], "\n        >").concat(_navlogos_resume_svg__WEBPACK_IMPORTED_MODULE_4__, "</a\n      >\n      <div class=").concat(_navbar_module_scss__WEBPACK_IMPORTED_MODULE_0__.default["divider-line"], "></div>\n    </div>\n  </div>");
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
___CSS_LOADER_EXPORT___.push([module.id, ".cubes {\n  z-index: 1;\n}\n\n.cubes .cube {\n  z-index: 1;\n  position: absolute;\n  height: 100px;\n  width: 100px;\n  margin: 0;\n  -webkit-animation: cube-fade-in 2s cubic-bezier(0.165, 0.84, 0.44, 1);\n  animation: cube-fade-in 2s cubic-bezier(0.165, 0.84, 0.44, 1);\n  will-change: transform;\n}\n\n@-webkit-keyframes cube-fade-in {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale(0.5);\n    transform: scale(0.5);\n  }\n}\n@keyframes cube-fade-in {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale(0.5);\n    transform: scale(0.5);\n  }\n}\n.cubes .cube * {\n  z-index: 1;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n}\n\n.cubes .cube .shadow {\n  background: #8360c3;\n  top: 40%;\n}\n\n.cubes .cube .sides {\n  -webkit-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  -webkit-perspective: 600px;\n  perspective: 600px;\n}\n\n.cubes .cube .sides div {\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  will-change: transform;\n}\n\n.cubes .cube .sides .front {\n  z-index: 1 !important;\n  -webkit-transform: rotateY(0deg) translateZ(50px);\n  transform: rotateY(0deg) translateZ(50px);\n}\n\n.cubes .cube .sides .back {\n  z-index: 1 !important;\n  -webkit-transform: rotateY(-180deg) translateZ(50px);\n  transform: rotateY(-180deg) translateZ(50px);\n}\n\n.cubes .cube .sides .left {\n  z-index: 1 !important;\n  -webkit-transform: rotateY(-90deg) translateZ(50px);\n  transform: rotateY(-90deg) translateZ(50px);\n}\n\n.cubes .cube .sides .right {\n  z-index: 1 !important;\n  -webkit-transform: rotateY(90deg) translateZ(50px);\n  transform: rotateY(90deg) translateZ(50px);\n}\n\n.cubes .cube .sides .top {\n  z-index: 1 !important;\n  -webkit-transform: rotateX(90deg) translateZ(50px);\n  transform: rotateX(90deg) translateZ(50px);\n}\n\n.cubes .cube .sides .bottom {\n  z-index: 1 !important;\n  -webkit-transform: rotateX(-90deg) translateZ(50px);\n  transform: rotateX(-90deg) translateZ(50px);\n}\n\n/*# sourceMappingURL=cubes.css.map */", "",{"version":3,"sources":["webpack://./cubes/cubes.css"],"names":[],"mappings":"AAAA;EACE,UAAA;AACF;;AAEA;EACE,UAAA;EACA,kBAAA;EACA,aAAA;EACA,YAAA;EACA,SAAA;EACA,qEAAA;EACA,6DAAA;EACA,sBAAA;AACF;;AAEA;EACE;IACE,UAAA;IACA,6BAAA;IACA,qBAAA;EACF;AACF;AAEA;EACE;IACE,UAAA;IACA,6BAAA;IACA,qBAAA;EAAF;AACF;AAGA;EACE,UAAA;EACA,kBAAA;EACA,YAAA;EACA,WAAA;AADF;;AAIA;EACE,mBAAA;EACA,QAAA;AADF;;AAIA;EACE,oCAAA;EACA,4BAAA;EACA,0BAAA;EACA,kBAAA;AADF;;AAIA;EACE,mCAAA;EACA,2BAAA;EACA,sBAAA;AADF;;AAIA;EACE,qBAAA;EACA,iDAAA;EACA,yCAAA;AADF;;AAIA;EACE,qBAAA;EACA,oDAAA;EACA,4CAAA;AADF;;AAIA;EACE,qBAAA;EACA,mDAAA;EACA,2CAAA;AADF;;AAIA;EACE,qBAAA;EACA,kDAAA;EACA,0CAAA;AADF;;AAIA;EACE,qBAAA;EACA,kDAAA;EACA,0CAAA;AADF;;AAIA;EACE,qBAAA;EACA,mDAAA;EACA,2CAAA;AADF;;AAGA,oCAAA","sourcesContent":[".cubes {\r\n  z-index: 1;\r\n}\r\n\r\n.cubes .cube {\r\n  z-index: 1;\r\n  position: absolute;\r\n  height: 100px;\r\n  width: 100px;\r\n  margin: 0;\r\n  -webkit-animation: cube-fade-in 2s cubic-bezier(0.165, 0.84, 0.44, 1);\r\n  animation: cube-fade-in 2s cubic-bezier(0.165, 0.84, 0.44, 1);\r\n  will-change: transform;\r\n}\r\n\r\n@-webkit-keyframes cube-fade-in {\r\n  0% {\r\n    opacity: 0;\r\n    -webkit-transform: scale(0.5);\r\n    transform: scale(0.5);\r\n  }\r\n}\r\n\r\n@keyframes cube-fade-in {\r\n  0% {\r\n    opacity: 0;\r\n    -webkit-transform: scale(0.5);\r\n    transform: scale(0.5);\r\n  }\r\n}\r\n\r\n.cubes .cube * {\r\n  z-index: 1;\r\n  position: absolute;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n.cubes .cube .shadow {\r\n  background: #8360c3;\r\n  top: 40%;\r\n}\r\n\r\n.cubes .cube .sides {\r\n  -webkit-transform-style: preserve-3d;\r\n  transform-style: preserve-3d;\r\n  -webkit-perspective: 600px;\r\n  perspective: 600px;\r\n}\r\n\r\n.cubes .cube .sides div {\r\n  -webkit-backface-visibility: hidden;\r\n  backface-visibility: hidden;\r\n  will-change: transform;\r\n}\r\n\r\n.cubes .cube .sides .front {\r\n  z-index: 1 !important;\r\n  -webkit-transform: rotateY(0deg) translateZ(50px);\r\n  transform: rotateY(0deg) translateZ(50px);\r\n}\r\n\r\n.cubes .cube .sides .back {\r\n  z-index: 1 !important;\r\n  -webkit-transform: rotateY(-180deg) translateZ(50px);\r\n  transform: rotateY(-180deg) translateZ(50px);\r\n}\r\n\r\n.cubes .cube .sides .left {\r\n  z-index: 1 !important;\r\n  -webkit-transform: rotateY(-90deg) translateZ(50px);\r\n  transform: rotateY(-90deg) translateZ(50px);\r\n}\r\n\r\n.cubes .cube .sides .right {\r\n  z-index: 1 !important;\r\n  -webkit-transform: rotateY(90deg) translateZ(50px);\r\n  transform: rotateY(90deg) translateZ(50px);\r\n}\r\n\r\n.cubes .cube .sides .top {\r\n  z-index: 1 !important;\r\n  -webkit-transform: rotateX(90deg) translateZ(50px);\r\n  transform: rotateX(90deg) translateZ(50px);\r\n}\r\n\r\n.cubes .cube .sides .bottom {\r\n  z-index: 1 !important;\r\n  -webkit-transform: rotateX(-90deg) translateZ(50px);\r\n  transform: rotateX(-90deg) translateZ(50px);\r\n}\r\n/*# sourceMappingURL=cubes.css.map */\r\n"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"landingFont\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"woff2\");\n}\n* {\n  margin: 0;\n  list-style: none;\n  box-sizing: border-box;\n  padding: 0;\n}\n\n.src-landing-landing-module__wrapper--182Rm {\n  background: linear-gradient(#2c5e92, #552f6d);\n  overflow: auto;\n  min-height: 100vh;\n  display: flex;\n  padding: 30px;\n  align-items: center;\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG {\n  font-family: \"landingFont\";\n  max-width: 950px;\n  width: 100%;\n  margin-left: auto;\n  margin-right: auto;\n}\n@media (max-width: 950px) {\n  .src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG {\n    max-width: 750px;\n  }\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG {\n  display: flex;\n  gap: 10px;\n  justify-content: center;\n  display: flex;\n  justify-content: center;\n  width: 100% !important;\n  align-items: center;\n}\n@media (max-width: 795px) {\n  .src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG {\n    flex-direction: column;\n  }\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ {\n  z-index: 5;\n  padding: 15px;\n  color: black;\n  width: 33.33333333%;\n  height: fit-content;\n  padding-right: 15px;\n}\n@media (max-width: 795px) {\n  .src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ {\n    width: 100%;\n    padding: 0px;\n    text-align: center;\n  }\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ span {\n  z-index: 5;\n  padding: 13px;\n  border-radius: 3px;\n  color: white;\n  margin-left: 15px;\n  box-shadow: 0 2.8px 2.2px rgba(131, 96, 195, 0.4), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ .src-landing-landing-module__main-title--1lTwu {\n  text-align: left;\n  margin-bottom: 3rem;\n  font-size: 80px;\n  line-height: 1;\n}\n@media (max-width: 1094px) {\n  .src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ .src-landing-landing-module__main-title--1lTwu {\n    font-size: 60px;\n  }\n}\n@media (max-width: 795px) {\n  .src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ .src-landing-landing-module__main-title--1lTwu {\n    width: 100%;\n    text-align: center;\n  }\n}\n@media (max-width: 490px) {\n  .src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ .src-landing-landing-module__main-title--1lTwu {\n    font-size: 50px;\n  }\n}\n.src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ .src-landing-landing-module__description--2XxJD {\n  color: white;\n  margin-bottom: 20px;\n  font-size: 26px;\n  line-height: 1.2;\n  font-weight: 700;\n}\n@media (max-width: 1094px) {\n  .src-landing-landing-module__wrapper--182Rm .src-landing-landing-module__center-container--2LFQG .src-landing-landing-module__container--2iwrG .src-landing-landing-module__text-container--21gR_ .src-landing-landing-module__description--2XxJD {\n    font-size: 20px;\n  }\n}\n.src-landing-landing-module__image-container--16PI7 {\n  display: flex;\n  width: 100%;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n@media (min-width: 950px) {\n  .src-landing-landing-module__image-container--16PI7 {\n    width: 66.66666667%;\n  }\n}\n.src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B {\n  background-color: black;\n  cursor: pointer;\n  flex: 0 0 32.5%;\n  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);\n  border-radius: 5px;\n  overflow: hidden;\n  position: relative;\n  outline: none;\n  border: transparent;\n}\n@media (max-width: 540px) {\n  .src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B {\n    flex: 0 0 32.3%;\n  }\n}\n@media (max-width: 450px) {\n  .src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B {\n    flex: 0 0 31%;\n  }\n}\n.src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B .src-landing-landing-module__git-icon--1XfIT {\n  display: none;\n}\n.src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B:hover {\n  background-color: rgba(0, 0, 0, 0.9);\n}\n.src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B:hover .src-landing-landing-module__git-icon--1XfIT {\n  position: absolute;\n  fill: rgba(255, 255, 255, 0.4);\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  width: 55px;\n  height: 55px;\n  display: block;\n}\n.src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B:hover .src-landing-landing-module__project-image--32a8k {\n  opacity: 0.3;\n}\n.src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B .src-landing-landing-module__portfolio-image--2T82W {\n  opacity: 0.5 !important;\n}\n.src-landing-landing-module__image-container--16PI7 .src-landing-landing-module__project-container--2ah1B .src-landing-landing-module__project-image--32a8k {\n  display: block;\n  object-fit: cover;\n  opacity: 0.8;\n  width: 100%;\n  height: 100%;\n  background: white;\n}\n\n.src-landing-landing-module__tech-wrapper--1RRr1 {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  margin-top: 10px;\n  gap: 15px;\n}\n.src-landing-landing-module__tech-wrapper--1RRr1 .src-landing-landing-module__tech-container-title--1pA4N {\n  border-bottom: 0.3px solid rgba(255, 255, 255, 0.05);\n  font-size: 23px;\n  color: white;\n}\n@media (max-width: 795px) {\n  .src-landing-landing-module__tech-wrapper--1RRr1 .src-landing-landing-module__tech-container-title--1pA4N {\n    width: 100%;\n    text-align: center;\n  }\n}\n.src-landing-landing-module__tech-wrapper--1RRr1 .src-landing-landing-module__tech-icon-container--NPkGO {\n  display: flex;\n  box-shadow: 0 2.8px 2.2px rgba(131, 96, 195, 0.4), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);\n  background: rgba(255, 255, 255, 0.05);\n  padding: 5px;\n  align-items: flex-end;\n  gap: 20px;\n  width: 100%;\n  justify-content: space-evenly;\n}\n.src-landing-landing-module__tech-wrapper--1RRr1 .src-landing-landing-module__tech-icon-container--NPkGO .src-landing-landing-module__icon-container--y-shs {\n  display: flex;\n  transform: translateY(4px);\n  width: 5%;\n  flex-direction: column;\n  position: relative;\n  align-items: center;\n  justify-content: space-between;\n}\n@media (max-width: 490px) {\n  .src-landing-landing-module__tech-wrapper--1RRr1 .src-landing-landing-module__tech-icon-container--NPkGO .src-landing-landing-module__icon-container--y-shs {\n    width: 10%;\n    height: 100%;\n  }\n}\n.src-landing-landing-module__tech-wrapper--1RRr1 .src-landing-landing-module__tech-icon-container--NPkGO .src-landing-landing-module__icon-container--y-shs .src-landing-landing-module__icon-label--2iAsB {\n  text-align: center;\n  z-index: 5;\n  color: white;\n  white-space: nowrap;\n}\n@media (max-width: 490px) {\n  .src-landing-landing-module__tech-wrapper--1RRr1 .src-landing-landing-module__tech-icon-container--NPkGO .src-landing-landing-module__icon-container--y-shs .src-landing-landing-module__icon-label--2iAsB {\n    font-size: 0.5rem;\n  }\n}\n.src-landing-landing-module__tech-wrapper--1RRr1 .src-landing-landing-module__tech-icon-container--NPkGO .src-landing-landing-module__icon-container--y-shs .src-landing-landing-module__tech-icon--18Hys {\n  fill: rgba(255, 255, 255, 0.7);\n}", "",{"version":3,"sources":["webpack://./src/landing/landing.module.scss"],"names":[],"mappings":"AAAA;EACE,0BAAA;EACA,4DAAA;AACF;AACA;EACE,SAAA;EACA,gBAAA;EACA,sBAAA;EACA,UAAA;AACF;;AACA;EACE,6CAAA;EACA,cAAA;EACA,iBAAA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;AAEF;AADE;EACE,0BAAA;EACA,gBAAA;EAIA,WAAA;EACA,iBAAA;EACA,kBAAA;AAAJ;AALI;EAHF;IAII,gBAAA;EAQJ;AACF;AAJI;EAIE,aAAA;EACA,SAAA;EACA,uBAAA;EACA,aAAA;EACA,uBAAA;EACA,sBAAA;EACA,mBAAA;AAGN;AAZM;EADF;IAEI,sBAAA;EAeN;AACF;AAPM;EACE,UAAA;EACA,aAAA;EACA,YAAA;EACA,mBAAA;EAMA,mBAAA;EACA,mBAAA;AAIR;AAVQ;EALF;IAMI,WAAA;IACA,YAAA;IACA,kBAAA;EAaR;AACF;AAVQ;EACE,UAAA;EACA,aAAA;EACA,kBAAA;EACA,YAAA;EACA,iBAAA;EACA,sOAAA;AAYV;AALQ;EACE,gBAAA;EACA,mBAAA;EACA,eAAA;EACA,cAAA;AAOV;AANU;EALF;IAMI,eAAA;EASV;AACF;AARU;EARF;IASI,WAAA;IACA,kBAAA;EAWV;AACF;AAVU;EAZF;IAaI,eAAA;EAaV;AACF;AAXQ;EACE,YAAA;EACA,mBAAA;EACA,eAAA;EAMA,gBAAA;EACA,gBAAA;AAQV;AAdU;EAJF;IAKI,eAAA;EAiBV;AACF;AAPA;EACE,aAAA;EACA,WAAA;EACA,eAAA;EACA,QAAA;AASF;AARE;EALF;IAMI,mBAAA;EAWF;AACF;AATE;EAWE,uBAAA;EACA,eAAA;EACA,eAAA;EACA,mOAAA;EAIA,kBAAA;EAEA,gBAAA;EACA,kBAAA;EACA,aAAA;EACA,mBAAA;AAHJ;AAnBI;EADF;IAEI,eAAA;EAsBJ;AACF;AArBI;EAJF;IAKI,aAAA;EAwBJ;AACF;AAvBI;EACE,aAAA;AAyBN;AATI;EACE,oCAAA;AAWN;AAVM;EACE,kBAAA;EACA,8BAAA;EACA,MAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;EACA,YAAA;EACA,WAAA;EACA,YAAA;EACA,cAAA;AAYR;AAVM;EACE,YAAA;AAYR;AATI;EACE,uBAAA;AAWN;AATI;EACE,cAAA;EACA,iBAAA;EACA,YAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;AAWN;;AANA;EACE,aAAA;EACA,uBAAA;EACA,sBAAA;EACA,gBAAA;EACA,SAAA;AASF;AARE;EACE,oDAAA;EACA,eAAA;EACA,YAAA;AAUJ;AATI;EAJF;IAKI,WAAA;IACA,kBAAA;EAYJ;AACF;AAVE;EACE,aAAA;EACA,sOAAA;EAIA,qCAAA;EACA,YAAA;EACA,qBAAA;EACA,SAAA;EACA,WAAA;EACA,6BAAA;AASJ;AARI;EACE,aAAA;EACA,0BAAA;EACA,SAAA;EACA,sBAAA;EACA,kBAAA;EACA,mBAAA;EACA,8BAAA;AAUN;AATM;EARF;IASI,UAAA;IACA,YAAA;EAYN;AACF;AAXM;EACE,kBAAA;EACA,UAAA;EAEA,YAAA;EAEA,mBAAA;AAWR;AAVQ;EAPF;IAQI,iBAAA;EAaR;AACF;AAXM;EACE,8BAAA;AAaR","sourcesContent":["@font-face {\r\n  font-family: \"landingFont\";\r\n  src: url(\"../fonts/circular-bold.woff2\") format(\"woff2\");\r\n}\r\n* {\r\n  margin: 0;\r\n  list-style: none;\r\n  box-sizing: border-box;\r\n  padding: 0;\r\n}\r\n.wrapper {\r\n  background: linear-gradient(#2c5e92, #552f6d);\r\n  overflow: auto;\r\n  min-height: 100vh;\r\n  display: flex;\r\n  padding: 30px;\r\n  align-items: center;\r\n  .center-container {\r\n    font-family: \"landingFont\";\r\n    max-width: 950px;\r\n    @media (max-width: 950px) {\r\n      max-width: 750px;\r\n    }\r\n    width: 100%;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    .container {\r\n      @media (max-width: 795px) {\r\n        flex-direction: column;\r\n      }\r\n      display: flex;\r\n      gap: 10px;\r\n      justify-content: center;\r\n      display: flex;\r\n      justify-content: center;\r\n      width: 100% !important;\r\n      align-items: center;\r\n      .text-container {\r\n        z-index: 5;\r\n        padding: 15px;\r\n        color: black;\r\n        width: 33.33333333%;\r\n        @media (max-width: 795px) {\r\n          width: 100%;\r\n          padding: 0px;\r\n          text-align: center;\r\n        }\r\n        height: fit-content;\r\n        padding-right: 15px;\r\n        span {\r\n          z-index: 5;\r\n          padding: 13px;\r\n          border-radius: 3px;\r\n          color: white;\r\n          margin-left: 15px;\r\n          box-shadow: 0 2.8px 2.2px rgba(131, 96, 195, 0.4),\r\n            0 6.7px 5.3px rgba(0, 0, 0, 0.048),\r\n            0 12.5px 10px rgba(0, 0, 0, 0.06),\r\n            0 22.3px 17.9px rgba(0, 0, 0, 0.072),\r\n            0 41.8px 33.4px rgba(0, 0, 0, 0.086),\r\n            0 100px 80px rgba(0, 0, 0, 0.12);\r\n        }\r\n        .main-title {\r\n          text-align: left;\r\n          margin-bottom: 3rem;\r\n          font-size: 80px;\r\n          line-height: 1;\r\n          @media (max-width: 1094px) {\r\n            font-size: 60px;\r\n          }\r\n          @media (max-width: 795px) {\r\n            width: 100%;\r\n            text-align: center;\r\n          }\r\n          @media (max-width: 490px) {\r\n            font-size: 50px;\r\n          }\r\n        }\r\n        .description {\r\n          color: white;\r\n          margin-bottom: 20px;\r\n          font-size: 26px;\r\n          @media (max-width: 1094px) {\r\n            font-size: 20px;\r\n          }\r\n          @media (max-width: 490px) {\r\n          }\r\n          line-height: 1.2;\r\n          font-weight: 700;\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n.image-container {\r\n  display: flex;\r\n  width: 100%;\r\n  flex-wrap: wrap;\r\n  gap: 6px;\r\n  @media (min-width: 950px) {\r\n    width: 66.66666667%;\r\n  }\r\n\r\n  .project-container {\r\n    @media (max-width: 540px) {\r\n      flex: 0 0 32.3%;\r\n    }\r\n    @media (max-width: 450px) {\r\n      flex: 0 0 31%;\r\n    }\r\n    .git-icon {\r\n      display: none;\r\n    }\r\n    // opacity: 0;\r\n    background-color: black;\r\n    cursor: pointer;\r\n    flex: 0 0 32.5%;\r\n    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),\r\n      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),\r\n      0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),\r\n      0 100px 80px rgba(0, 0, 0, 0.12);\r\n    border-radius: 5px;\r\n\r\n    overflow: hidden;\r\n    position: relative;\r\n    outline: none;\r\n    border: transparent;\r\n    &:hover {\r\n      background-color: rgba(0, 0, 0, 0.9);\r\n      .git-icon {\r\n        position: absolute;\r\n        fill: rgba(255, 255, 255, 0.4);\r\n        top: 0;\r\n        bottom: 0;\r\n        left: 0;\r\n        right: 0;\r\n        margin: auto;\r\n        width: 55px;\r\n        height: 55px;\r\n        display: block;\r\n      }\r\n      .project-image {\r\n        opacity: 0.3;\r\n      }\r\n    }\r\n    .portfolio-image {\r\n      opacity: 0.5 !important;\r\n    }\r\n    .project-image {\r\n      display: block;\r\n      object-fit: cover;\r\n      opacity: 0.8;\r\n      width: 100%;\r\n      height: 100%;\r\n      background: white;\r\n    }\r\n  }\r\n}\r\n\r\n.tech-wrapper {\r\n  display: flex;\r\n  justify-content: center;\r\n  flex-direction: column;\r\n  margin-top: 10px;\r\n  gap: 15px;\r\n  .tech-container-title {\r\n    border-bottom: 0.3px solid rgba(255, 255, 255, 0.05);\r\n    font-size: 23px;\r\n    color: white;\r\n    @media (max-width: 795px) {\r\n      width: 100%;\r\n      text-align: center;\r\n    }\r\n  }\r\n  .tech-icon-container {\r\n    display: flex;\r\n    box-shadow: 0 2.8px 2.2px rgba(131, 96, 195, 0.4),\r\n      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),\r\n      0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),\r\n      0 100px 80px rgba(0, 0, 0, 0.12);\r\n    background: rgba(255, 255, 255, 0.05);\r\n    padding: 5px;\r\n    align-items: flex-end;\r\n    gap: 20px;\r\n    width: 100%;\r\n    justify-content: space-evenly;\r\n    .icon-container {\r\n      display: flex;\r\n      transform: translateY(4px);\r\n      width: 5%;\r\n      flex-direction: column;\r\n      position: relative;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n      @media (max-width: 490px) {\r\n        width: 10%;\r\n        height: 100%;\r\n      }\r\n      .icon-label {\r\n        text-align: center;\r\n        z-index: 5;\r\n\r\n        color: white;\r\n\r\n        white-space: nowrap;\r\n        @media (max-width: 490px) {\r\n          font-size: 0.5rem;\r\n        }\r\n      }\r\n      .tech-icon {\r\n        fill: rgba(255, 255, 255, 0.7);\r\n      }\r\n    }\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"wrapper": "src-landing-landing-module__wrapper--182Rm",
	"center-container": "src-landing-landing-module__center-container--2LFQG",
	"container": "src-landing-landing-module__container--2iwrG",
	"text-container": "src-landing-landing-module__text-container--21gR_",
	"main-title": "src-landing-landing-module__main-title--1lTwu",
	"description": "src-landing-landing-module__description--2XxJD",
	"image-container": "src-landing-landing-module__image-container--16PI7",
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
___CSS_LOADER_EXPORT___.push([module.id, ".src-navbar-navbar-module__container--1NruU {\n  position: fixed;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  z-index: 20;\n  padding: 20px;\n}\n@media (max-width: 1605px) {\n  .src-navbar-navbar-module__container--1NruU {\n    right: 20px;\n    top: 20px;\n    bottom: auto;\n    flex-direction: row;\n    left: auto;\n  }\n}\n.src-navbar-navbar-module__container--1NruU .src-navbar-navbar-module__contact-icon-container--1zRlU {\n  display: flex;\n  gap: 20px;\n  flex-direction: column;\n  position: relative;\n  height: fit-content;\n}\n@media (max-width: 1605px) {\n  .src-navbar-navbar-module__container--1NruU .src-navbar-navbar-module__contact-icon-container--1zRlU {\n    flex-direction: row;\n  }\n}\n.src-navbar-navbar-module__container--1NruU .src-navbar-navbar-module__contact-icon-container--1zRlU .src-navbar-navbar-module__contact-icon--lc3gS {\n  fill: rgba(255, 255, 255, 0.7);\n  width: 20px;\n  cursor: pointer;\n  height: 20px;\n}\n@media (max-width: 1630.98px) {\n  .src-navbar-navbar-module__container--1NruU .src-navbar-navbar-module__contact-icon-container--1zRlU .src-navbar-navbar-module__contact-icon--lc3gS {\n    fill: white;\n  }\n}\n.src-navbar-navbar-module__container--1NruU .src-navbar-navbar-module__contact-icon-container--1zRlU .src-navbar-navbar-module__contact-icon--lc3gS:hover {\n  fill: white;\n}\n.src-navbar-navbar-module__container--1NruU .src-navbar-navbar-module__divider-line--2epa_ {\n  height: 85%;\n  position: absolute;\n  background: rgba(255, 255, 255, 0.28);\n  top: 150px;\n  left: 0;\n  right: 0;\n  display: none;\n  margin: 0 auto;\n  width: 2px;\n}", "",{"version":3,"sources":["webpack://./src/navbar/navbar.module.scss"],"names":[],"mappings":"AAAA;EACE,eAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,MAAA;EACA,OAAA;EACA,SAAA;EACA,WAAA;EACA,aAAA;AACF;AAAE;EAVF;IAWI,WAAA;IACA,SAAA;IACA,YAAA;IACA,mBAAA;IACA,UAAA;EAGF;AACF;AAFE;EAIE,aAAA;EACA,SAAA;EACA,sBAAA;EACA,kBAAA;EACA,mBAAA;AACJ;AARI;EADF;IAEI,mBAAA;EAWJ;AACF;AALI;EACE,8BAAA;EACA,WAAA;EACA,eAAA;EACA,YAAA;AAON;AANM;EALF;IAMI,WAAA;EASN;AACF;AARM;EACE,WAAA;AAUR;AANE;EACE,WAAA;EACA,kBAAA;EACA,qCAAA;EACA,UAAA;EACA,OAAA;EACA,QAAA;EACA,aAAA;EACA,cAAA;EACA,UAAA;AAQJ","sourcesContent":[".container {\r\n  position: fixed;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  top: 0;\r\n  left: 0;\r\n  bottom: 0;\r\n  z-index: 20;\r\n  padding: 20px;\r\n  @media (max-width: 1605px) {\r\n    right: 20px;\r\n    top: 20px;\r\n    bottom: auto;\r\n    flex-direction: row;\r\n    left: auto;\r\n  }\r\n  .contact-icon-container {\r\n    @media (max-width: 1605px) {\r\n      flex-direction: row;\r\n    }\r\n    display: flex;\r\n    gap: 20px;\r\n    flex-direction: column;\r\n    position: relative;\r\n    height: fit-content;\r\n    .contact-icon {\r\n      fill: rgba(255, 255, 255, 0.7);\r\n      width: 20px;\r\n      cursor: pointer;\r\n      height: 20px;\r\n      @media (max-width: 1630.98px) {\r\n        fill: white;\r\n      }\r\n      &:hover {\r\n        fill: white;\r\n      }\r\n    }\r\n  }\r\n  .divider-line {\r\n    height: 85%;\r\n    position: absolute;\r\n    background: rgba(255, 255, 255, 0.28);\r\n    top: 150px;\r\n    left: 0;\r\n    right: 0;\r\n    display: none;\r\n    margin: 0 auto;\r\n    width: 2px;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
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

/***/ "./src/landing/projectphotos/mysql.svg":
/*!*********************************************!*\
  !*** ./src/landing/projectphotos/mysql.svg ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg class='tech-icon'   role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title>MySQL</title><path d=\"M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z\"/></svg>";

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

/***/ "./src/landing/projectphotos/tftapp.png":
/*!**********************************************!*\
  !*** ./src/landing/projectphotos/tftapp.png ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "8cb78e43f0fb296bd9d7.png";

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

/***/ }),

/***/ "./src/navbar/navlogos/resume.svg":
/*!****************************************!*\
  !*** ./src/navbar/navlogos/resume.svg ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 24 24\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\" ><rect fill=\"none\" height=\"24\" width=\"24\"/><path d=\"M13.17,4L18,8.83V20H6V4H13.17 M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2L14,2z M12,14 c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C10,13.1,10.9,14,12,14z M16,17.43c0-0.81-0.48-1.53-1.22-1.85 C13.93,15.21,12.99,15,12,15c-0.99,0-1.93,0.21-2.78,0.58C8.48,15.9,8,16.62,8,17.43V18h8V17.43z\"/></svg>";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL2N1YmVzL2N1YmVzLmpzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vc3JjL2Fib3V0L2Fib3V0LmpzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vc3JjL2xhbmRpbmcvbGFuZGluZy5qcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL3NyYy9uYXZiYXIvbmF2YmFyLmpzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vY3ViZXMvY3ViZXMuY3NzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvcGx1Z2lucy9saW5lLW51bWJlcnMvcHJpc20tbGluZS1udW1iZXJzLmNzcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL25vZGVfbW9kdWxlcy9wcmlzbWpzL3RoZW1lcy9wcmlzbS1va2FpZGlhLmNzcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL3NyYy9tYWluLmNzcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL3NyYy9hYm91dC9hYm91dC5tb2R1bGUuc2NzcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL3NyYy9sYW5kaW5nL2xhbmRpbmcubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9zcmMvbmF2YmFyL25hdmJhci5tb2R1bGUuc2NzcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9ub2RlX21vZHVsZXMvcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNsaWtlLmpzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jb3JlLmpzIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jc3MuanMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9ub2RlX21vZHVsZXMvcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmFzY3JpcHQuanMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9ub2RlX21vZHVsZXMvcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLW1hcmt1cC5qcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL25vZGVfbW9kdWxlcy9wcmlzbWpzL3BsdWdpbnMvbGluZS1udW1iZXJzL3ByaXNtLWxpbmUtbnVtYmVycy5qcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL2N1YmVzL2N1YmVzLmNzcz9jY2NjIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvcGx1Z2lucy9saW5lLW51bWJlcnMvcHJpc20tbGluZS1udW1iZXJzLmNzcz81YzJmIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vbm9kZV9tb2R1bGVzL3ByaXNtanMvdGhlbWVzL3ByaXNtLW9rYWlkaWEuY3NzP2ExOGUiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9zcmMvbWFpbi5jc3M/ZDgwNSIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL3NyYy9hYm91dC9hYm91dC5tb2R1bGUuc2Nzcz9hMWZiIiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vc3JjL2xhbmRpbmcvbGFuZGluZy5tb2R1bGUuc2Nzcz9mZTM0Iiwid2VicGFjazovL3BvcnRmb2xpb3YyLy4vc3JjL25hdmJhci9uYXZiYXIubW9kdWxlLnNjc3M/Yjc5MyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9wb3J0Zm9saW92Mi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BvcnRmb2xpb3YyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vcG9ydGZvbGlvdjIvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiU3RydXQiLCJyYW5kb20iLCJlIiwidCIsIk1hdGgiLCJhcnJheVJhbmRvbSIsImZsb29yIiwibGVuZ3RoIiwiaW50ZXJwb2xhdGUiLCJuIiwicmFuZ2VQb3NpdGlvbiIsImNsYW1wIiwibWF4IiwibWluIiwicXVlcnlBcnJheSIsImRvY3VtZW50IiwiYm9keSIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwicXVlcnlTZWxlY3RvckFsbCIsInJlYWR5IiwicmVhZHlTdGF0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZWR1Y2VNb3Rpb24iLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsInNldFN0YXRlIiwic3RhdGUiLCJzcGVlZCIsImRpcmVjdGlvbnMiLCJmb3JFYWNoIiwiYXhpcyIsImFicyIsImN1YmVJc0hpZGRlbiIsImxlZnQiLCJwYXJlbnRXaWR0aCIsImhlYWRlcklzSGlkZGVuIiwidGVtcGxhdGUiLCJnZXRFbGVtZW50QnlJZCIsInBhcmVudCIsImdldFBhcmVudFdpZHRoIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJ3aW5kb3ciLCJwYWxldHRlIiwid2hpdGUiLCJjb2xvciIsInNoYWRpbmciLCJvcmFuZ2UiLCJncmVlbiIsInNldEN1YmVTdHlsZXMiLCJjdWJlIiwic2l6ZSIsInRvcCIsIk9iamVjdCIsImFzc2lnbiIsInN0eWxlIiwiaGVpZ2h0IiwicXVlcnlTZWxlY3RvciIsImZpbHRlciIsInJvdW5kIiwib3BhY2l0eSIsImNyZWF0ZUN1YmUiLCJmcmFnbWVudCIsImltcG9ydE5vZGUiLCJjb250ZW50IiwieCIsInkiLCJyZWR1Y2UiLCJvYmplY3QiLCJzaXplcyIsIm0iLCJzaWRlcyIsInNpZGUiLCJjbGFzc05hbWUiLCJoaWRkZW4iLCJyb3RhdGUiLCJib3R0b20iLCJyaWdodCIsImJhY2siLCJ2YWx1ZXMiLCJ4cyIsInMiLCJsIiwieGwiLCJjdWJlcyIsInRpbnQiLCJtYXAiLCJnZXREaXN0YW5jZSIsImdldFJvdGF0aW9uIiwiZGlyZWN0aW9uIiwiZ2V0U2hhZGluZyIsImRpc3RhbmNlIiwiZGFya2VuIiwiZGVsdGEiLCJyYXRpbyIsImFscGhhIiwiYmxlbmQiLCJ2YWx1ZSIsImluZGV4IiwiciIsImciLCJiIiwic2hvdWxkSGlkZSIsInJvdGF0ZVgiLCJ1cGRhdGVTaWRlcyIsImFuaW1hdGUiLCJ0cmFuc2Zvcm0iLCJiYWNrZ3JvdW5kQ29sb3IiLCJ0aWNrIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicGFyYWxsYXhMaW1pdCIsInNjcm9sbCIsInNjcm9sbFkiLCJjb250YWluZXIiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJzdGFydCIsInJlcXVlc3RJZGxlQ2FsbGJhY2siLCJlbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwib25sb2FkIiwib3B0aW9ucyIsInRocmVzaG9sZCIsImxhcHRvcCIsInRyYWNrU3ZnIiwiZW50cmllcyIsImlzSW50ZXJzZWN0aW5nIiwic2VydmVyQW5pbWF0aW9uIiwiaSIsInR4dCIsInNlcnZlciIsImlubmVySFRNTCIsImNoYXJBdCIsInRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiY2xpZW50QW5pbWF0aW9uIiwiUHJpc20iLCJjbGllbnQiLCJvYnNlcnZlciIsImRpc2Nvbm5lY3QiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsIm9ic2VydmUiLCJyZW5kZXJBYm91dCIsInJvb3QiLCJ0ZWNoSW1hZ2VzIiwiaW1hZ2UiLCJSZWFjdEljb24iLCJuYW1lIiwiSnNJY29uIiwiTm9kZUljb24iLCJIdG1sSWNvbiIsIkNzc0ljb24iLCJzcWxJY29uIiwicmVuZGVyTGFuZGluZyIsImNoYXRhcHAiLCJjb3ZpZFRyYWNrZXIiLCJyZWFkZGl0IiwicGxheWxpc3RzIiwidGVzbGEiLCJ0ZnRhcHAiLCJ0ZWNoQ29udGFpbmVyIiwiaXRlbSIsImljb24iLCJyZW5kZXJOYXYiLCJkb2NGcmFnIiwibmF2Q29udGFpbmVyIiwiR0hsb2dvIiwiR01Mb2dvIiwiTElsb2dvIiwiUmVsb2dvIiwiRG9jdW1lbnRGcmFnbWVudCIsInNldEF0dHJpYnV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsS0FBSyxHQUFHO0FBQ1ZDLFFBQU0sRUFBRSxnQkFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQ3RCLFdBQU9DLElBQUksQ0FBQ0gsTUFBTCxNQUFpQkUsQ0FBQyxHQUFHRCxDQUFyQixJQUEwQkEsQ0FBakM7QUFDRCxHQUhTO0FBSVZHLGFBQVcsRUFBRSxxQkFBVUgsQ0FBVixFQUFhO0FBQ3hCLFdBQU9BLENBQUMsQ0FBQ0UsSUFBSSxDQUFDRSxLQUFMLENBQVdGLElBQUksQ0FBQ0gsTUFBTCxLQUFnQkMsQ0FBQyxDQUFDSyxNQUE3QixDQUFELENBQVI7QUFDRCxHQU5TO0FBT1ZDLGFBQVcsRUFBRSxxQkFBVU4sQ0FBVixFQUFhQyxDQUFiLEVBQWdCTSxDQUFoQixFQUFtQjtBQUM5QixXQUFPUCxDQUFDLElBQUksSUFBSU8sQ0FBUixDQUFELEdBQWNOLENBQUMsR0FBR00sQ0FBekI7QUFDRCxHQVRTO0FBVVZDLGVBQWEsRUFBRSx1QkFBVVIsQ0FBVixFQUFhQyxDQUFiLEVBQWdCTSxDQUFoQixFQUFtQjtBQUNoQyxXQUFPLENBQUNBLENBQUMsR0FBR1AsQ0FBTCxLQUFXQyxDQUFDLEdBQUdELENBQWYsQ0FBUDtBQUNELEdBWlM7QUFhVlMsT0FBSyxFQUFFLGVBQVVULENBQVYsRUFBYUMsQ0FBYixFQUFnQk0sQ0FBaEIsRUFBbUI7QUFDeEIsV0FBT0wsSUFBSSxDQUFDUSxHQUFMLENBQVNSLElBQUksQ0FBQ1MsR0FBTCxDQUFTWCxDQUFULEVBQVlPLENBQVosQ0FBVCxFQUF5Qk4sQ0FBekIsQ0FBUDtBQUNELEdBZlM7QUFnQlZXLFlBQVUsRUFBRSxvQkFBVVosQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQzFCLFdBQ0VBLENBQUMsS0FBS0EsQ0FBQyxHQUFHWSxRQUFRLENBQUNDLElBQWxCLENBQUQsRUFDQUMsS0FBSyxDQUFDQyxTQUFOLENBQWdCQyxLQUFoQixDQUFzQkMsSUFBdEIsQ0FBMkJqQixDQUFDLENBQUNrQixnQkFBRixDQUFtQm5CLENBQW5CLENBQTNCLENBRkY7QUFJRCxHQXJCUztBQXNCVm9CLE9BQUssRUFBRSxlQUFVcEIsQ0FBVixFQUFhO0FBQ2xCYSxZQUFRLENBQUNRLFVBQVQsSUFBdUIsVUFBdkIsR0FDSXJCLENBQUMsRUFETCxHQUVJYSxRQUFRLENBQUNTLGdCQUFULENBQTBCLGtCQUExQixFQUE4Q3RCLENBQTlDLENBRko7QUFHRDtBQTFCUyxDQUFaO0FBNEJBLElBQU11QixZQUFZLEdBQUdDLFVBQVUsQ0FBQywwQkFBRCxDQUFWLENBQXVDQyxPQUE1RDtBQUVBO0FBQ0U7QUFDQTtBQUNBO0FBRUEsTUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0MsS0FBRCxFQUFRQyxLQUFSO0FBQUEsV0FDZkMsVUFBVSxDQUFDQyxPQUFYLENBQW1CLFVBQUNDLElBQUQsRUFBVTtBQUMzQkosV0FBSyxDQUFDSSxJQUFELENBQUwsSUFBZUgsS0FBSyxDQUFDRyxJQUFELENBQXBCO0FBQ0EsVUFBSTdCLElBQUksQ0FBQzhCLEdBQUwsQ0FBU0wsS0FBSyxDQUFDSSxJQUFELENBQWQsSUFBd0IsR0FBNUIsRUFBaUM7QUFDakMsVUFBTXJCLEdBQUcsR0FBR1IsSUFBSSxDQUFDUSxHQUFMLENBQVNpQixLQUFLLENBQUNJLElBQUQsQ0FBZCxFQUFzQixHQUF0QixDQUFaO0FBQ0EsVUFBTXBCLEdBQUcsR0FBR0QsR0FBRyxJQUFJLEdBQVAsR0FBYVIsSUFBSSxDQUFDOEIsR0FBTCxDQUFTTCxLQUFLLENBQUNJLElBQUQsQ0FBZCxDQUFiLEdBQXFDLEdBQWpEO0FBQ0FKLFdBQUssQ0FBQ0ksSUFBRCxDQUFMLEdBQWNyQixHQUFHLEdBQUdDLEdBQXBCO0FBQ0QsS0FORCxDQURlO0FBQUEsR0FBakI7O0FBU0EsTUFBTXNCLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUNDLElBQUQ7QUFBQSxXQUFVQSxJQUFJLEdBQUdDLFdBQVcsR0FBRyxFQUEvQjtBQUFBLEdBQXJCLENBZEYsQ0FnQkU7QUFDQTtBQUNBOzs7QUFFQSxNQUFJQyxjQUFjLEdBQUcsS0FBckI7QUFFQSxNQUFNQyxRQUFRLEdBQUd4QixRQUFRLENBQUN5QixjQUFULENBQXdCLGVBQXhCLENBQWpCO0FBRUEsTUFBTUMsTUFBTSxHQUFHMUIsUUFBUSxDQUFDeUIsY0FBVCxDQUF3QixhQUF4QixDQUFmOztBQUNBLE1BQU1FLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUI7QUFBQSxXQUFNRCxNQUFNLENBQUNFLHFCQUFQLEdBQStCQyxLQUFyQztBQUFBLEdBQXZCOztBQUNBLE1BQUlQLFdBQVcsR0FBR0ssY0FBYyxFQUFoQztBQUNBRyxRQUFNLENBQUNyQixnQkFBUCxDQUF3QixRQUF4QixFQUFrQztBQUFBLFdBQU9hLFdBQVcsR0FBR0ssY0FBYyxFQUFuQztBQUFBLEdBQWxDO0FBRUEsTUFBTVgsVUFBVSxHQUFHLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBbkI7QUFFQSxNQUFNZSxPQUFPLEdBQUc7QUFDZEMsU0FBSyxFQUFFO0FBQ0xDLFdBQUssRUFBRSxDQUFDLEdBQUQsRUFBTSxFQUFOLEVBQVUsR0FBVixDQURGO0FBRUxDLGFBQU8sRUFBRSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWDtBQUZKLEtBRE87QUFLZEMsVUFBTSxFQUFFO0FBQ05GLFdBQUssRUFBRSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxDQUREO0FBRU5DLGFBQU8sRUFBRSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsRUFBWDtBQUZILEtBTE07QUFTZEUsU0FBSyxFQUFFO0FBQ0xILFdBQUssRUFBRSxDQUFDLEVBQUQsRUFBSyxHQUFMLEVBQVUsR0FBVixDQURGO0FBRUxDLGFBQU8sRUFBRSxDQUFDLENBQUQsRUFBSSxHQUFKLEVBQVMsR0FBVDtBQUZKO0FBVE8sR0FBaEIsQ0EvQkYsQ0E4Q0U7QUFDQTtBQUNBOztBQUVBLE1BQU1HLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsT0FBK0I7QUFBQSxRQUE1QkMsSUFBNEIsUUFBNUJBLElBQTRCO0FBQUEsUUFBdEJDLElBQXNCLFFBQXRCQSxJQUFzQjtBQUFBLFFBQWhCbEIsSUFBZ0IsUUFBaEJBLElBQWdCO0FBQUEsUUFBVm1CLEdBQVUsUUFBVkEsR0FBVTtBQUNuREMsVUFBTSxDQUFDQyxNQUFQLENBQWNKLElBQUksQ0FBQ0ssS0FBbkIsRUFBMEI7QUFDeEJkLFdBQUssWUFBS1UsSUFBTCxPQURtQjtBQUV4QkssWUFBTSxZQUFLTCxJQUFMLE9BRmtCO0FBR3hCbEIsVUFBSSxZQUFLQSxJQUFMLE9BSG9CO0FBSXhCbUIsU0FBRyxZQUFLQSxHQUFMO0FBSnFCLEtBQTFCO0FBT0FDLFVBQU0sQ0FBQ0MsTUFBUCxDQUFjSixJQUFJLENBQUNPLGFBQUwsQ0FBbUIsU0FBbkIsRUFBOEJGLEtBQTVDLEVBQW1EO0FBQ2pERyxZQUFNLGlCQUFVekQsSUFBSSxDQUFDMEQsS0FBTCxDQUFXUixJQUFJLEdBQUcsR0FBbEIsQ0FBVixRQUQyQztBQUVqRFMsYUFBTyxFQUFFM0QsSUFBSSxDQUFDUyxHQUFMLENBQVN5QyxJQUFJLEdBQUcsR0FBaEIsRUFBcUIsR0FBckI7QUFGd0MsS0FBbkQ7QUFJRCxHQVpEOztBQWNBLE1BQU1VLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNWLElBQUQsRUFBVTtBQUMzQixRQUFNVyxRQUFRLEdBQUdsRCxRQUFRLENBQUNtRCxVQUFULENBQW9CM0IsUUFBUSxDQUFDNEIsT0FBN0IsRUFBc0MsSUFBdEMsQ0FBakI7QUFDQSxRQUFNZCxJQUFJLEdBQUdZLFFBQVEsQ0FBQ0wsYUFBVCxDQUF1QixPQUF2QixDQUFiO0FBRUEsUUFBTS9CLEtBQUssR0FBRztBQUNadUMsT0FBQyxFQUFFLENBRFM7QUFFWkMsT0FBQyxFQUFFO0FBRlMsS0FBZDtBQUtBLFFBQU12QyxLQUFLLEdBQUdDLFVBQVUsQ0FBQ3VDLE1BQVgsQ0FBa0IsVUFBQ0MsTUFBRCxFQUFTdEMsSUFBVCxFQUFrQjtBQUNoRCxVQUFNckIsR0FBRyxHQUFHMEMsSUFBSSxHQUFHa0IsS0FBSyxDQUFDQyxDQUFiLEdBQWlCLEdBQWpCLEdBQXVCLEdBQW5DO0FBQ0FGLFlBQU0sQ0FBQ3RDLElBQUQsQ0FBTixHQUFlakMsS0FBSyxDQUFDQyxNQUFOLENBQWEsQ0FBQ1csR0FBZCxFQUFtQkEsR0FBbkIsQ0FBZjtBQUNBLGFBQU8yRCxNQUFQO0FBQ0QsS0FKYSxFQUlYLEVBSlcsQ0FBZDtBQU1BLFFBQU1HLEtBQUssR0FBRzFFLEtBQUssQ0FBQ2MsVUFBTixDQUFpQixZQUFqQixFQUErQnVDLElBQS9CLEVBQXFDaUIsTUFBckMsQ0FDWixVQUFDQyxNQUFELEVBQVNJLElBQVQsRUFBa0I7QUFDaEJKLFlBQU0sQ0FBQ0ksSUFBSSxDQUFDQyxTQUFOLENBQU4sR0FBeUI7QUFDdkJELFlBQUksRUFBSkEsSUFEdUI7QUFFdkJFLGNBQU0sRUFBRSxLQUZlO0FBR3ZCQyxjQUFNLEVBQUU7QUFDTlYsV0FBQyxFQUFFLENBREc7QUFFTkMsV0FBQyxFQUFFO0FBRkc7QUFIZSxPQUF6QjtBQVFBLGFBQU9FLE1BQVA7QUFDRCxLQVhXLEVBWVosRUFaWSxDQUFkO0FBZUFHLFNBQUssQ0FBQ25CLEdBQU4sQ0FBVXVCLE1BQVYsQ0FBaUJWLENBQWpCLEdBQXFCLEVBQXJCO0FBQ0FNLFNBQUssQ0FBQ0ssTUFBTixDQUFhRCxNQUFiLENBQW9CVixDQUFwQixHQUF3QixDQUFDLEVBQXpCO0FBQ0FNLFNBQUssQ0FBQ3RDLElBQU4sQ0FBVzBDLE1BQVgsQ0FBa0JULENBQWxCLEdBQXNCLENBQUMsRUFBdkI7QUFDQUssU0FBSyxDQUFDTSxLQUFOLENBQVlGLE1BQVosQ0FBbUJULENBQW5CLEdBQXVCLEVBQXZCO0FBQ0FLLFNBQUssQ0FBQ08sSUFBTixDQUFXSCxNQUFYLENBQWtCVCxDQUFsQixHQUFzQixDQUFDLEdBQXZCO0FBRUEsV0FBTztBQUFFSixjQUFRLEVBQVJBLFFBQUY7QUFBWVosVUFBSSxFQUFKQSxJQUFaO0FBQWtCeEIsV0FBSyxFQUFMQSxLQUFsQjtBQUF5QkMsV0FBSyxFQUFMQSxLQUF6QjtBQUFnQzRDLFdBQUssRUFBRWxCLE1BQU0sQ0FBQzBCLE1BQVAsQ0FBY1IsS0FBZDtBQUF2QyxLQUFQO0FBQ0QsR0FyQ0Q7O0FBdUNBLE1BQU1GLEtBQUssR0FBRztBQUNaVyxNQUFFLEVBQUUsRUFEUTtBQUVaQyxLQUFDLEVBQUUsRUFGUztBQUdaWCxLQUFDLEVBQUUsRUFIUztBQUlaWSxLQUFDLEVBQUUsR0FKUztBQUtaQyxNQUFFLEVBQUU7QUFMUSxHQUFkO0FBUUEsTUFBTUMsS0FBSyxHQUFHLENBQ1o7QUFDRUMsUUFBSSxFQUFFMUMsT0FBTyxDQUFDSyxLQURoQjtBQUVFRyxRQUFJLEVBQUVrQixLQUFLLENBQUNjLEVBRmQ7QUFHRVAsVUFBTSxFQUFFLENBSFY7QUFJRUMsU0FBSyxFQUFFO0FBSlQsR0FEWSxDQU9aO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTVHWSxJQTZHWlMsR0E3R1ksQ0E2R1IsVUFBQ2xCLE1BQUQ7QUFBQSxXQUFZZixNQUFNLENBQUNDLE1BQVAsQ0FBY08sVUFBVSxDQUFDTyxNQUFNLENBQUNqQixJQUFSLENBQXhCLEVBQXVDaUIsTUFBdkMsQ0FBWjtBQUFBLEdBN0dRLENBQWQ7QUErR0FnQixPQUFLLENBQUN2RCxPQUFOLENBQWNvQixhQUFkLEVBOU5GLENBZ09FO0FBQ0E7QUFDQTs7QUFFQSxNQUFNc0MsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQzdELEtBQUQsRUFBUWlELE1BQVI7QUFBQSxXQUNsQi9DLFVBQVUsQ0FBQ3VDLE1BQVgsQ0FBa0IsVUFBQ0MsTUFBRCxFQUFTdEMsSUFBVCxFQUFrQjtBQUNsQ3NDLFlBQU0sQ0FBQ3RDLElBQUQsQ0FBTixHQUFlN0IsSUFBSSxDQUFDOEIsR0FBTCxDQUFTTCxLQUFLLENBQUNJLElBQUQsQ0FBTCxHQUFjNkMsTUFBTSxDQUFDN0MsSUFBRCxDQUE3QixDQUFmO0FBQ0EsYUFBT3NDLE1BQVA7QUFDRCxLQUhELEVBR0csRUFISCxDQURrQjtBQUFBLEdBQXBCOztBQU1BLE1BQU1vQixXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDOUQsS0FBRCxFQUFReUIsSUFBUixFQUFjd0IsTUFBZCxFQUF5QjtBQUMzQyxRQUFNN0MsSUFBSSxHQUFHNkMsTUFBTSxDQUFDVixDQUFQLEdBQVcsR0FBWCxHQUFpQixHQUE5QjtBQUNBLFFBQU13QixTQUFTLEdBQUdkLE1BQU0sQ0FBQ1YsQ0FBUCxHQUFXLENBQVgsR0FBZSxDQUFDLENBQWhCLEdBQW9CLENBQXRDO0FBRUEsdUNBQ2N2QyxLQUFLLENBQUN1QyxDQUFOLEdBQVVVLE1BQU0sQ0FBQ1YsQ0FEL0IsaUNBRVluQyxJQUZaLGNBRW9CMkQsU0FBUyxJQUFJL0QsS0FBSyxDQUFDd0MsQ0FBTixHQUFVUyxNQUFNLENBQUNULENBQXJCLENBRjdCLHNDQUdpQmYsSUFBSSxHQUFHLENBSHhCO0FBS0QsR0FURDs7QUFXQSxNQUFNdUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ0wsSUFBRCxFQUFPVixNQUFQLEVBQWVnQixRQUFmLEVBQTRCO0FBQzdDLFFBQU1DLE1BQU0sR0FBR2hFLFVBQVUsQ0FBQ3VDLE1BQVgsQ0FBa0IsVUFBQ0MsTUFBRCxFQUFTdEMsSUFBVCxFQUFrQjtBQUNqRCxVQUFNK0QsS0FBSyxHQUFHRixRQUFRLENBQUM3RCxJQUFELENBQXRCO0FBQ0EsVUFBTWdFLEtBQUssR0FBR0QsS0FBSyxHQUFHLEdBQXRCO0FBQ0F6QixZQUFNLENBQUN0QyxJQUFELENBQU4sR0FBZStELEtBQUssR0FBRyxHQUFSLEdBQWM1RixJQUFJLENBQUM4QixHQUFMLENBQVMsSUFBSStELEtBQWIsQ0FBZCxHQUFvQ0EsS0FBbkQ7QUFDQSxhQUFPMUIsTUFBUDtBQUNELEtBTGMsRUFLWixFQUxZLENBQWY7QUFPQSxRQUFJTyxNQUFNLENBQUNWLENBQVgsRUFBYzJCLE1BQU0sQ0FBQzFCLENBQVAsR0FBVyxDQUFYLENBQWQsS0FDSztBQUFBLFVBQ0tELENBREwsR0FDVzBCLFFBRFgsQ0FDSzFCLENBREw7QUFFSCxVQUFJQSxDQUFDLEdBQUcsRUFBSixJQUFVQSxDQUFDLEdBQUcsR0FBbEIsRUFDRXJDLFVBQVUsQ0FBQ0MsT0FBWCxDQUFtQixVQUFDQyxJQUFEO0FBQUEsZUFBVzhELE1BQU0sQ0FBQzlELElBQUQsQ0FBTixHQUFlLElBQUk4RCxNQUFNLENBQUM5RCxJQUFELENBQXBDO0FBQUEsT0FBbkI7QUFDSDtBQUVELFFBQU1pRSxLQUFLLEdBQUcsQ0FBQ0gsTUFBTSxDQUFDM0IsQ0FBUCxHQUFXMkIsTUFBTSxDQUFDMUIsQ0FBbkIsSUFBd0IsQ0FBdEM7O0FBQ0EsUUFBTThCLEtBQUssR0FBRyxTQUFSQSxLQUFRLENBQUNDLEtBQUQsRUFBUUMsS0FBUjtBQUFBLGFBQ1pqRyxJQUFJLENBQUMwRCxLQUFMLENBQVc5RCxLQUFLLENBQUNRLFdBQU4sQ0FBa0I0RixLQUFsQixFQUF5QlosSUFBSSxDQUFDdkMsT0FBTCxDQUFhb0QsS0FBYixDQUF6QixFQUE4Q0gsS0FBOUMsQ0FBWCxDQURZO0FBQUEsS0FBZDs7QUFoQjZDLDBCQWtCM0JWLElBQUksQ0FBQ3hDLEtBQUwsQ0FBV3lDLEdBQVgsQ0FBZVUsS0FBZixDQWxCMkI7QUFBQTtBQUFBLFFBa0J0Q0csQ0FsQnNDO0FBQUEsUUFrQm5DQyxDQWxCbUM7QUFBQSxRQWtCaENDLENBbEJnQzs7QUFvQjdDLHlCQUFjRixDQUFkLGVBQW9CQyxDQUFwQixlQUEwQkMsQ0FBMUI7QUFDRCxHQXJCRDs7QUF1QkEsTUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ0MsT0FBRCxFQUFVdEMsQ0FBVixFQUFhQyxDQUFiLEVBQW1CO0FBQ3BDLFFBQUlxQyxPQUFKLEVBQWEsT0FBT3RDLENBQUMsR0FBRyxFQUFKLElBQVVBLENBQUMsR0FBRyxHQUFyQjtBQUNiLFFBQUlBLENBQUMsR0FBRyxFQUFSLEVBQVksT0FBT0MsQ0FBQyxHQUFHLEVBQUosSUFBVUEsQ0FBQyxHQUFHLEdBQXJCO0FBQ1osUUFBSUQsQ0FBQyxHQUFHLEdBQVIsRUFBYSxPQUFPQyxDQUFDLEdBQUcsRUFBWDtBQUNiLFdBQU9BLENBQUMsR0FBRyxFQUFKLElBQVVBLENBQUMsR0FBRyxHQUFyQjtBQUNELEdBTEQ7O0FBT0EsTUFBTXNDLFdBQVcsR0FBRyxTQUFkQSxXQUFjLFFBQStDO0FBQUEsUUFBNUM5RSxLQUE0QyxTQUE1Q0EsS0FBNEM7QUFBQSxRQUFyQ0MsS0FBcUMsU0FBckNBLEtBQXFDO0FBQUEsUUFBOUJ3QixJQUE4QixTQUE5QkEsSUFBOEI7QUFBQSxRQUF4QmtDLElBQXdCLFNBQXhCQSxJQUF3QjtBQUFBLFFBQWxCZCxLQUFrQixTQUFsQkEsS0FBa0I7QUFBQSxRQUFYdEMsSUFBVyxTQUFYQSxJQUFXO0FBQ2pFLFFBQUlFLGNBQWMsSUFBSUgsWUFBWSxDQUFDQyxJQUFELENBQWxDLEVBQTBDOztBQUUxQyxRQUFNd0UsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQ3JDLE1BQUQsRUFBWTtBQUFBLFVBQ2xCSSxJQURrQixHQUNPSixNQURQLENBQ2xCSSxJQURrQjtBQUFBLFVBQ1pHLE1BRFksR0FDT1AsTUFEUCxDQUNaTyxNQURZO0FBQUEsVUFDSkQsTUFESSxHQUNPTixNQURQLENBQ0pNLE1BREk7QUFFMUIsVUFBTWlCLFFBQVEsR0FBR0osV0FBVyxDQUFDN0QsS0FBRCxFQUFRaUQsTUFBUixDQUE1QixDQUYwQixDQUkxQjs7QUFDQSxVQUFJMkIsVUFBVSxDQUFDM0IsTUFBTSxDQUFDVixDQUFSLEVBQVcwQixRQUFRLENBQUMxQixDQUFwQixFQUF1QjBCLFFBQVEsQ0FBQ3pCLENBQWhDLENBQWQsRUFBa0Q7QUFDaEQsWUFBSSxDQUFDUSxNQUFMLEVBQWE7QUFDWEYsY0FBSSxDQUFDRSxNQUFMLEdBQWMsSUFBZDtBQUNBTixnQkFBTSxDQUFDTSxNQUFQLEdBQWdCLElBQWhCO0FBQ0Q7O0FBQ0Q7QUFDRDs7QUFFRCxVQUFJQSxNQUFKLEVBQVk7QUFDVkYsWUFBSSxDQUFDRSxNQUFMLEdBQWMsS0FBZDtBQUNBTixjQUFNLENBQUNNLE1BQVAsR0FBZ0IsS0FBaEI7QUFDRDs7QUFFREYsVUFBSSxDQUFDakIsS0FBTCxDQUFXbUQsU0FBWCxHQUF1QmxCLFdBQVcsQ0FBQzlELEtBQUQsRUFBUXlCLElBQVIsRUFBY3dCLE1BQWQsQ0FBbEM7QUFDQUgsVUFBSSxDQUFDakIsS0FBTCxDQUFXb0QsZUFBWCxHQUE2QmpCLFVBQVUsQ0FBQ0wsSUFBRCxFQUFPVixNQUFQLEVBQWVnQixRQUFmLENBQXZDO0FBQ0QsS0FwQkQ7O0FBc0JBbEUsWUFBUSxDQUFDQyxLQUFELEVBQVFDLEtBQVIsQ0FBUjtBQUNBNEMsU0FBSyxDQUFDMUMsT0FBTixDQUFjNEUsT0FBZDtBQUNELEdBM0JEOztBQTZCQSxNQUFNRyxJQUFJLEdBQUcsU0FBUEEsSUFBTyxHQUFNO0FBQ2pCeEIsU0FBSyxDQUFDdkQsT0FBTixDQUFjMkUsV0FBZDtBQUNBLFFBQUlsRixZQUFKLEVBQWtCO0FBQ2xCdUYseUJBQXFCLENBQUNELElBQUQsQ0FBckI7QUFDRCxHQUpELENBaFRGLENBc1RFO0FBQ0E7QUFDQTtBQUVBOzs7QUFDQSxNQUFNRSxhQUFhLEdBQ2pCbEcsUUFBUSxDQUFDNkMsYUFBVCxDQUF1QixlQUF2QixFQUF3Q2pCLHFCQUF4QyxHQUFnRWdCLE1BQWhFLEdBQXlFLEVBRDNFO0FBR0FkLFFBQU0sQ0FBQ3JCLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFlBQU07QUFDdEMsUUFBTTBGLE1BQU0sR0FBR3JFLE1BQU0sQ0FBQ3NFLE9BQXRCOztBQUNBLFFBQUlELE1BQU0sR0FBR0QsYUFBYixFQUE0QjtBQUMxQjNFLG9CQUFjLEdBQUcsS0FBakI7QUFDQWlELFdBQUssQ0FBQ3ZELE9BQU4sQ0FDRTtBQUFBLFlBQUdxQixJQUFILFNBQUdBLElBQUg7QUFBQSxZQUFTdkIsS0FBVCxTQUFTQSxLQUFUO0FBQUEsZUFDR3VCLElBQUksQ0FBQ0ssS0FBTCxDQUFXbUQsU0FBWCx3QkFDQ3pHLElBQUksQ0FBQzhCLEdBQUwsQ0FBU0osS0FBSyxDQUFDc0MsQ0FBTixHQUFVLEdBQW5CLElBQTBCOEMsTUFEM0IsUUFESDtBQUFBLE9BREY7QUFNQTtBQUNEOztBQUNENUUsa0JBQWMsR0FBRyxJQUFqQjtBQUNELEdBYkQsRUE5VEYsQ0E2VUU7QUFDQTtBQUNBOztBQUVBLE1BQU04RSxTQUFTLEdBQUdyRyxRQUFRLENBQUNzRyxhQUFULENBQXVCLEtBQXZCLENBQWxCO0FBQ0FELFdBQVMsQ0FBQ3hDLFNBQVYsR0FBc0IsT0FBdEI7QUFDQVcsT0FBSyxDQUFDdkQsT0FBTixDQUFjO0FBQUEsUUFBR2lDLFFBQUgsU0FBR0EsUUFBSDtBQUFBLFdBQWtCbUQsU0FBUyxDQUFDRSxXQUFWLENBQXNCckQsUUFBdEIsQ0FBbEI7QUFBQSxHQUFkOztBQUVBLE1BQU1zRCxLQUFLLEdBQUcsU0FBUkEsS0FBUSxHQUFNO0FBQ2xCUixRQUFJO0FBQ0p0RSxVQUFNLENBQUM2RSxXQUFQLENBQW1CRixTQUFuQjtBQUNELEdBSEQ7O0FBS0EsMkJBQXlCdkUsTUFBekIsR0FBa0MyRSxtQkFBbUIsQ0FBQ0QsS0FBRCxDQUFyRCxHQUErREEsS0FBSyxFQUFwRTtBQUNELEMsQ0FDRCxvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMVhBOzs7Ozs7Ozs7QUFHQSxJQUFNRSxPQUFPLEdBQUcxRyxRQUFRLENBQUNzRyxhQUFULENBQXVCLFNBQXZCLENBQWhCO0FBQ0FJLE9BQU8sQ0FBQ0MsU0FBUixDQUFrQkMsR0FBbEIsQ0FBc0JqRSxpRUFBdEI7O0FBRUFiLE1BQU0sQ0FBQytFLE1BQVAsR0FBZ0IsWUFBTTtBQUNwQixNQUFJQyxPQUFPLEdBQUc7QUFDWkMsYUFBUyxFQUFFLENBQUMsR0FBRDtBQURDLEdBQWQ7QUFHQSxNQUFNQyxNQUFNLEdBQUdoSCxRQUFRLENBQUN5QixjQUFULENBQXdCLGlCQUF4QixDQUFmOztBQUNBLE1BQU13RixRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFDQyxPQUFELEVBQWE7QUFDNUIsUUFBSUEsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXQyxjQUFmLEVBQStCO0FBQUEsVUFPcEJDLGVBUG9CLEdBTzdCLFNBQVNBLGVBQVQsR0FBMkI7QUFDekIsWUFBSUMsQ0FBQyxHQUFHQyxHQUFHLENBQUM5SCxNQUFaLEVBQW9CO0FBQ2xCK0gsZ0JBQU0sQ0FBQ0MsU0FBUCxJQUFvQkYsR0FBRyxDQUFDRyxNQUFKLENBQVdKLENBQVgsQ0FBcEI7QUFDQUEsV0FBQztBQUNELGNBQU1LLE9BQU8sR0FBR0MsVUFBVSxDQUFDUCxlQUFELEVBQWtCckcsS0FBbEIsQ0FBMUI7O0FBQ0EsY0FBSXNHLENBQUMsS0FBS0MsR0FBRyxDQUFDOUgsTUFBZCxFQUFzQjtBQUNwQm9JLHdCQUFZLENBQUNGLE9BQUQsQ0FBWjtBQUNBTCxhQUFDLEdBQUcsQ0FBSjtBQUNBUSwyQkFBZTtBQUNoQjtBQUNGOztBQUNEQyw2RkFBQSxDQUF1QlAsTUFBdkI7QUFDRCxPQW5CNEI7O0FBQUEsVUFvQnBCTSxlQXBCb0IsR0FvQjdCLFNBQVNBLGVBQVQsR0FBMkI7QUFDekIsWUFBSVAsR0FBRyxvRkFBUDs7QUFFQSxZQUFJRCxDQUFDLEdBQUdDLEdBQUcsQ0FBQzlILE1BQVosRUFBb0I7QUFDbEJ1SSxnQkFBTSxDQUFDUCxTQUFQLElBQW9CRixHQUFHLENBQUNHLE1BQUosQ0FBV0osQ0FBWCxDQUFwQjtBQUVBQSxXQUFDO0FBQ0RNLG9CQUFVLENBQUNFLGVBQUQsRUFBa0I5RyxLQUFsQixDQUFWO0FBQ0Q7O0FBQ0QrRyw2RkFBQSxDQUF1QkMsTUFBdkI7QUFDRCxPQTlCNEI7O0FBQzdCLFVBQUlWLENBQUMsR0FBRyxDQUFSO0FBQ0EsVUFBSUMsR0FBRyx5SUFBUDtBQUNBLFVBQU1DLE1BQU0sR0FBR3ZILFFBQVEsQ0FBQ3lCLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBZjtBQUNBLFVBQU1zRyxNQUFNLEdBQUcvSCxRQUFRLENBQUN5QixjQUFULENBQXdCLGFBQXhCLENBQWY7QUFDQSxVQUFJVixLQUFLLEdBQUcsRUFBWjtBQTBCQWlILGNBQVEsQ0FBQ0MsVUFBVDtBQUNBYixxQkFBZTtBQUNoQjtBQUNGLEdBbkNEOztBQW9DQSxNQUFJWSxRQUFRLEdBQUcsSUFBSUUsb0JBQUosQ0FBeUJqQixRQUF6QixFQUFtQ0gsT0FBbkMsQ0FBZjtBQUVBa0IsVUFBUSxDQUFDRyxPQUFULENBQWlCbkIsTUFBakI7QUFDRCxDQTVDRDs7QUE2Q08sSUFBTW9CLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNsRixRQUFELEVBQWM7QUFDdkN3RCxTQUFPLENBQUNjLFNBQVI7QUFBb0I7QUFBcEIsdUJBQTJDN0UsaUVBQTNDLGlDQUNpQkEsdUVBRGpCLG1DQUVtQkEsZ0ZBRm5CLDBEQUcwQ0EsOERBSDFDLHVDQUl1QkEsc0VBSnZCLHlDQUt5QkEsd0VBTHpCLDJDQU0yQkEsZ0ZBTjNCLDZDQU82QkEseUVBUDdCLHdDQVErQixjQVIvQix5U0FpQnlCQSx3RUFqQnpCLDJDQWtCMkJBLGdGQWxCM0IsNkNBbUI2QkEseUVBbkI3Qix3Q0FvQitCLGNBcEIvQiwyVEE4QnVCQSw0REE5QnZCLDZFQWtDbUJBLHVFQWxDbkIscUNBbUNxQkEseUVBbkNyQixzQ0FvQ3NCQSxzRUFwQ3RCLDhEQXFDcUJBLG1FQXJDckI7QUFnREEsTUFBTTBGLElBQUksR0FBR25GLFFBQVEsQ0FBQ3pCLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBYjtBQUNBNEcsTUFBSSxDQUFDOUIsV0FBTCxDQUFpQkcsT0FBakI7QUFDRCxDQW5ETSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkRQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsT0FBTyxHQUFHMUcsUUFBUSxDQUFDc0csYUFBVCxDQUF1QixTQUF2QixDQUFoQjtBQUVBSSxPQUFPLENBQUNDLFNBQVIsQ0FBa0JDLEdBQWxCLENBQXNCakUsaUVBQXRCO0FBQ0EsSUFBTTJGLFVBQVUsR0FBRyxDQUNqQjtBQUNFQyxPQUFLLEVBQUVDLHNEQURUO0FBRUVDLE1BQUksRUFBRTtBQUZSLENBRGlCLEVBS2pCO0FBQUVGLE9BQUssRUFBRUcsMERBQVQ7QUFBaUJELE1BQUksRUFBRTtBQUF2QixDQUxpQixFQU1qQjtBQUNFRixPQUFLLEVBQUVJLG9EQURUO0FBRUVGLE1BQUksRUFBRTtBQUZSLENBTmlCLEVBVWpCO0FBQ0VGLE9BQUssRUFBRUsscURBRFQ7QUFFRUgsTUFBSSxFQUFFO0FBRlIsQ0FWaUIsRUFjakI7QUFDRUYsT0FBSyxFQUFFTSxvREFEVDtBQUVFSixNQUFJLEVBQUU7QUFGUixDQWRpQixFQWtCakI7QUFDRUYsT0FBSyxFQUFFTyxxREFEVDtBQUVFTCxNQUFJLEVBQUU7QUFGUixDQWxCaUIsQ0FBbkI7QUF3Qk8sSUFBTU0sYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDN0YsUUFBRCxFQUFjO0FBQ3pDd0QsU0FBTyxDQUFDYyxTQUFSO0FBQW9CO0FBQXBCLHlCQUNXN0UsNkVBRFgsK0JBR2FBLG1FQUhiLCtCQUllQSwyRUFKZixnQ0FLZ0JBLHVFQUxoQixnRUFNZ0JBLHFFQU5oQixxSEFVZUEsNEVBVmYsZ0RBY09BLDhFQWRQLG9GQWdCbUJxRyx1REFoQm5CLG9CQWdCb0NyRywwRUFoQnBDLGtGQXNCb0JBLDhFQXRCcEIscUdBd0JRQSw4RUF4QlIsbUNBMEJtQnNHLDREQTFCbkIsb0JBMEJ5Q3RHLDBFQTFCekMscUVBNkJvQkEsOEVBN0JwQix1R0ErQlFBLDhFQS9CUixtQ0FpQ21CdUcsd0RBakNuQixvQkFpQ29DdkcsMEVBakNwQyxxRUFvQ29CQSw4RUFwQ3BCLHNHQXNDUUEsOEVBdENSLG1DQXdDbUJ3Ryx5REF4Q25CLG9CQXdDc0N4RywwRUF4Q3RDLHFFQTRDTUEsOEVBNUNOLHdGQThDRUEsOEVBOUNGLG1DQWdEbUJ5Ryw0REFoRG5CLG9CQWdEa0N6RywwRUFoRGxDLCtEQW9ETUEsOEVBcEROLHFGQXNERUEsOEVBdERGLG1DQXdEbUIwRyxzREF4RG5CLHVCQXdEc0MxRywwRUF4RHRDLGNBd0RnRUEsNEVBeERoRSx1RkE4RGFBLHlFQTlEYiw2QkErRGFBLGlGQS9EYix3R0FrRW1DQSxnRkFsRW5DO0FBdUVBLE1BQU0wRixJQUFJLEdBQUduRixRQUFRLENBQUN6QixjQUFULENBQXdCLE9BQXhCLENBQWI7QUFDQTRHLE1BQUksQ0FBQzlCLFdBQUwsQ0FBaUJHLE9BQWpCO0FBQ0EsTUFBTTRDLGFBQWEsR0FBR3BHLFFBQVEsQ0FBQ3pCLGNBQVQsQ0FBd0IsZ0JBQXhCLENBQXRCO0FBQ0E2RyxZQUFVLENBQUM1RCxHQUFYLENBQWUsVUFBQzZFLElBQUQsRUFBVTtBQUN2QixRQUFJQyxJQUFJLEdBQUd4SixRQUFRLENBQUNzRyxhQUFULENBQXVCLEtBQXZCLENBQVg7QUFDQWtELFFBQUksQ0FBQzdDLFNBQUwsQ0FBZUMsR0FBZixDQUFtQmpFLDJFQUFuQjtBQUNBNkcsUUFBSSxDQUFDaEMsU0FBTDtBQUFpQjtBQUFqQixvQkFDRStCLElBQUksQ0FBQ2hCLEtBRFAsdUJBQ3lCNUYsdUVBRHpCLGNBQ2dENEcsSUFBSSxDQUFDZCxJQURyRDtBQUVBYSxpQkFBYSxDQUFDL0MsV0FBZCxDQUEwQmlELElBQTFCO0FBQ0QsR0FORDtBQU9ELENBbEZNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFTyxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDQyxPQUFELEVBQWE7QUFDcEMsTUFBTXJCLElBQUksR0FBR3FCLE9BQU8sQ0FBQ2pJLGNBQVIsQ0FBdUIsT0FBdkIsQ0FBYjtBQUVBLE1BQU1rSSxZQUFZLEdBQUczSixRQUFRLENBQUNzRyxhQUFULENBQXVCLEtBQXZCLENBQXJCO0FBRUFxRCxjQUFZLENBQUNuQyxTQUFiO0FBQXlCO0FBQXpCLHdCQUFtRDdFLGtFQUFuRCwrQkFDZUEsa0ZBRGYsbUVBRWlEQSx3RUFGakQsd0JBR1FpSCxpREFIUixpRkFLb0RqSCx3RUFMcEQsd0JBTVFrSCxnREFOUix1SEFVY2xILHdFQVZkLHdCQVdTbUgsbURBWFQsbUhBZ0Jjbkgsd0VBaEJkLHdCQWlCU29ILGlEQWpCVCw0Q0FtQmlCcEgsd0VBbkJqQjtBQXNCQTBGLE1BQUksQ0FBQzlCLFdBQUwsQ0FBaUJvRCxZQUFqQjtBQUNELENBNUJNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOUDtBQUNzSDtBQUM3QjtBQUN6Riw4QkFBOEIsbUZBQTJCLENBQUMsd0dBQXFDO0FBQy9GO0FBQ0Esa0RBQWtELGVBQWUsR0FBRyxrQkFBa0IsZUFBZSx1QkFBdUIsa0JBQWtCLGlCQUFpQixjQUFjLDBFQUEwRSxrRUFBa0UsMkJBQTJCLEdBQUcscUNBQXFDLFFBQVEsaUJBQWlCLG9DQUFvQyw0QkFBNEIsS0FBSyxHQUFHLDJCQUEyQixRQUFRLGlCQUFpQixvQ0FBb0MsNEJBQTRCLEtBQUssR0FBRyxrQkFBa0IsZUFBZSx1QkFBdUIsaUJBQWlCLGdCQUFnQixHQUFHLDBCQUEwQix3QkFBd0IsYUFBYSxHQUFHLHlCQUF5Qix5Q0FBeUMsaUNBQWlDLCtCQUErQix1QkFBdUIsR0FBRyw2QkFBNkIsd0NBQXdDLGdDQUFnQywyQkFBMkIsR0FBRyxnQ0FBZ0MsMEJBQTBCLHNEQUFzRCw4Q0FBOEMsR0FBRywrQkFBK0IsMEJBQTBCLHlEQUF5RCxpREFBaUQsR0FBRywrQkFBK0IsMEJBQTBCLHdEQUF3RCxnREFBZ0QsR0FBRyxnQ0FBZ0MsMEJBQTBCLHVEQUF1RCwrQ0FBK0MsR0FBRyw4QkFBOEIsMEJBQTBCLHVEQUF1RCwrQ0FBK0MsR0FBRyxpQ0FBaUMsMEJBQTBCLHdEQUF3RCxnREFBZ0QsR0FBRyxnREFBZ0Qsa0ZBQWtGLFVBQVUsTUFBTSxLQUFLLFVBQVUsV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxNQUFNLEtBQUssS0FBSyxVQUFVLFdBQVcsV0FBVyxLQUFLLEtBQUssS0FBSyxLQUFLLFVBQVUsV0FBVyxXQUFXLEtBQUssS0FBSyxLQUFLLFVBQVUsV0FBVyxVQUFVLFVBQVUsTUFBTSxLQUFLLFdBQVcsVUFBVSxNQUFNLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxNQUFNLEtBQUssV0FBVyxXQUFXLFdBQVcsTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxNQUFNLEtBQUssV0FBVyxXQUFXLFdBQVcsTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxNQUFNLEtBQUssV0FBVyxXQUFXLFdBQVcsTUFBTSx1Q0FBdUMsaUJBQWlCLEtBQUssc0JBQXNCLGlCQUFpQix5QkFBeUIsb0JBQW9CLG1CQUFtQixnQkFBZ0IsNEVBQTRFLG9FQUFvRSw2QkFBNkIsS0FBSyx5Q0FBeUMsVUFBVSxtQkFBbUIsc0NBQXNDLDhCQUE4QixPQUFPLEtBQUssaUNBQWlDLFVBQVUsbUJBQW1CLHNDQUFzQyw4QkFBOEIsT0FBTyxLQUFLLHdCQUF3QixpQkFBaUIseUJBQXlCLG1CQUFtQixrQkFBa0IsS0FBSyw4QkFBOEIsMEJBQTBCLGVBQWUsS0FBSyw2QkFBNkIsMkNBQTJDLG1DQUFtQyxpQ0FBaUMseUJBQXlCLEtBQUssaUNBQWlDLDBDQUEwQyxrQ0FBa0MsNkJBQTZCLEtBQUssb0NBQW9DLDRCQUE0Qix3REFBd0QsZ0RBQWdELEtBQUssbUNBQW1DLDRCQUE0QiwyREFBMkQsbURBQW1ELEtBQUssbUNBQW1DLDRCQUE0QiwwREFBMEQsa0RBQWtELEtBQUssb0NBQW9DLDRCQUE0Qix5REFBeUQsaURBQWlELEtBQUssa0NBQWtDLDRCQUE0Qix5REFBeUQsaURBQWlELEtBQUsscUNBQXFDLDRCQUE0QiwwREFBMEQsa0RBQWtELEtBQUssZ0VBQWdFO0FBQzM5SjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1B2QztBQUMrRztBQUM3QjtBQUNsRiw4QkFBOEIsc0VBQTJCLENBQUMsMkZBQXFDO0FBQy9GO0FBQ0EsOEVBQThFLHVCQUF1Qix3QkFBd0IsOEJBQThCLEdBQUcsK0NBQStDLHVCQUF1Qix5QkFBeUIsR0FBRyxzQ0FBc0MsdUJBQXVCLHlCQUF5QixXQUFXLG9CQUFvQixpQkFBaUIsZUFBZSwwRUFBMEUsaUNBQWlDLDhCQUE4QiwyQkFBMkIsMEJBQTBCLHNCQUFzQixHQUFHLCtCQUErQixtQkFBbUIsa0NBQWtDLEdBQUcsc0NBQXNDLGlDQUFpQyxnQkFBZ0IsbUJBQW1CLHlCQUF5QixzQkFBc0IsR0FBRyxPQUFPLG1JQUFtSSxXQUFXLFdBQVcsV0FBVyxNQUFNLEtBQUssV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sS0FBSyxVQUFVLFdBQVcsTUFBTSxLQUFLLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxpRUFBaUUsdUJBQXVCLHdCQUF3Qiw4QkFBOEIsR0FBRyxtREFBbUQsdUJBQXVCLHlCQUF5QixHQUFHLHNDQUFzQyx1QkFBdUIseUJBQXlCLFdBQVcsb0JBQW9CLGlCQUFpQixlQUFlLHVFQUF1RSxpQ0FBaUMsZ0NBQWdDLDJCQUEyQiwwQkFBMEIsc0JBQXNCLEtBQUssaUNBQWlDLHFCQUFxQixvQ0FBb0MsS0FBSywwQ0FBMEMscUNBQXFDLG9CQUFvQix1QkFBdUIsNkJBQTZCLDBCQUEwQixPQUFPLHFCQUFxQjtBQUNqckU7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQdkM7QUFDNEc7QUFDN0I7QUFDL0UsOEJBQThCLHNFQUEyQixDQUFDLDJGQUFxQztBQUMvRjtBQUNBLDRPQUE0TyxtQkFBbUIscUJBQXFCLDBDQUEwQywrRUFBK0UsbUJBQW1CLHFCQUFxQixxQkFBcUIseUJBQXlCLHVCQUF1QixzQkFBc0IscUJBQXFCLHFCQUFxQixtQkFBbUIsZ0JBQWdCLDBCQUEwQix1QkFBdUIsc0JBQXNCLGtCQUFrQixHQUFHLDhDQUE4QyxpQkFBaUIsb0JBQW9CLG1CQUFtQix5QkFBeUIsR0FBRyxnRUFBZ0Usd0JBQXdCLEdBQUcsMkRBQTJELG1CQUFtQix5QkFBeUIsd0JBQXdCLEdBQUcsb0VBQW9FLG1CQUFtQixHQUFHLHdCQUF3QixtQkFBbUIsR0FBRyxzQkFBc0IsaUJBQWlCLEdBQUcscUZBQXFGLG1CQUFtQixHQUFHLG9DQUFvQyxtQkFBbUIsR0FBRyx5R0FBeUcsbUJBQW1CLEdBQUcseUhBQXlILG1CQUFtQixHQUFHLDZFQUE2RSxtQkFBbUIsR0FBRyxvQkFBb0IsbUJBQW1CLEdBQUcscUNBQXFDLG1CQUFtQixHQUFHLG9DQUFvQyxzQkFBc0IsR0FBRyxtQkFBbUIsdUJBQXVCLEdBQUcsbUJBQW1CLGlCQUFpQixHQUFHLE9BQU8sbUhBQW1ILEtBQUssTUFBTSxVQUFVLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsVUFBVSxNQUFNLFdBQVcsS0FBSyxVQUFVLFVBQVUsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sV0FBVyxLQUFLLFVBQVUsV0FBVyxXQUFXLE1BQU0sUUFBUSxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sU0FBUyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sVUFBVSxVQUFVLE1BQU0sVUFBVSxVQUFVLE1BQU0sUUFBUSxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxXQUFXLE1BQU0sS0FBSyxXQUFXLE1BQU0sS0FBSyxVQUFVLHFPQUFxTyxtQkFBbUIscUJBQXFCLDBDQUEwQywyRUFBMkUsbUJBQW1CLHFCQUFxQixxQkFBcUIseUJBQXlCLHVCQUF1QixzQkFBc0IscUJBQXFCLHVCQUF1QixtQkFBbUIsZ0JBQWdCLDRCQUE0Qix1QkFBdUIsc0JBQXNCLGtCQUFrQixHQUFHLGtEQUFrRCxpQkFBaUIsbUJBQW1CLG1CQUFtQix5QkFBeUIsR0FBRyx3RUFBd0Usd0JBQXdCLEdBQUcsK0RBQStELGtCQUFrQix3QkFBd0Isd0JBQXdCLEdBQUcsb0VBQW9FLG1CQUFtQixHQUFHLHdCQUF3QixtQkFBbUIsR0FBRyxzQkFBc0IsZ0JBQWdCLEdBQUcscUZBQXFGLG1CQUFtQixHQUFHLG9DQUFvQyxtQkFBbUIsR0FBRyx5R0FBeUcsbUJBQW1CLEdBQUcseUhBQXlILG1CQUFtQixHQUFHLDZFQUE2RSxtQkFBbUIsR0FBRyxvQkFBb0IsbUJBQW1CLEdBQUcscUNBQXFDLG1CQUFtQixHQUFHLG9DQUFvQyxzQkFBc0IsR0FBRyxpQkFBaUIsdUJBQXVCLEdBQUcsbUJBQW1CLGlCQUFpQixHQUFHLHFCQUFxQjtBQUNoc0o7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQdkM7QUFDc0g7QUFDN0I7QUFDekYsOEJBQThCLG1GQUEyQixDQUFDLHdHQUFxQztBQUMvRjtBQUNBLDZDQUE2QyxjQUFjLGVBQWUscUJBQXFCLG1DQUFtQywyQkFBMkIsR0FBRyxrQkFBa0IsZ0NBQWdDLDZDQUE2QyxzQ0FBc0MsR0FBRyxtQkFBbUIsb0JBQW9CLEdBQUcsU0FBUywyQkFBMkIsZ0NBQWdDLHFDQUFxQyxpQ0FBaUMsR0FBRyxrQkFBa0Isa0JBQWtCLGlCQUFpQix1QkFBdUIsR0FBRyxVQUFVLG1CQUFtQiwyQkFBMkIsR0FBRyxpQkFBaUIsa0JBQWtCLEdBQUcsV0FBVyx1QkFBdUIsa0JBQWtCLEdBQUcsbUJBQW1CLDZCQUE2QixHQUFHLGdCQUFnQixtQ0FBbUMsR0FBRywrQ0FBK0MsK0VBQStFLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxNQUFNLEtBQUssV0FBVyxXQUFXLFdBQVcsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxXQUFXLE1BQU0sS0FBSyxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxLQUFLLFdBQVcsVUFBVSxNQUFNLEtBQUssV0FBVyxNQUFNLEtBQUssV0FBVyxNQUFNLGtDQUFrQyxjQUFjLGVBQWUscUJBQXFCLG1DQUFtQyxtQ0FBbUMsR0FBRyxrQkFBa0IsZ0NBQWdDLDZDQUE2QyxzQ0FBc0MsR0FBRyxtQkFBbUIsb0JBQW9CLEdBQUcsU0FBUywyQkFBMkIsZ0NBQWdDLHFDQUFxQyxpQ0FBaUMsR0FBRyxrQkFBa0Isa0JBQWtCLGlCQUFpQix1QkFBdUIsR0FBRyxVQUFVLG1CQUFtQiwyQkFBMkIsR0FBRyxpQkFBaUIsa0JBQWtCLEdBQUcsV0FBVyx1QkFBdUIsa0JBQWtCLEdBQUcsbUJBQW1CLDZCQUE2QixHQUFHLGdCQUFnQixtQ0FBbUMsR0FBRyx5REFBeUQ7QUFDam5FO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1B2QztBQUN5SDtBQUM3QjtBQUNPO0FBQzFCO0FBQ0k7QUFDN0UsOEJBQThCLG1GQUEyQixDQUFDLHdHQUFxQztBQUMvRix5Q0FBeUMsc0ZBQStCLENBQUMsdURBQTZCO0FBQ3RHLHlDQUF5QyxzRkFBK0IsQ0FBQywyREFBNkI7QUFDdEc7QUFDQSxzREFBc0QsOEJBQThCLDJFQUEyRSxHQUFHLGNBQWMsK0JBQStCLDhFQUE4RSxHQUFHLDBDQUEwQyx1QkFBdUIsbUJBQW1CLHdCQUF3Qix3QkFBd0IsK0JBQStCLG1DQUFtQyxpQ0FBaUMsa0NBQWtDLEdBQUcsaURBQWlELGtCQUFrQixrQkFBa0Isd0JBQXdCLGlCQUFpQixnQkFBZ0IsaUNBQWlDLHVCQUF1QixjQUFjLGdDQUFnQyxHQUFHLGdEQUFnRCxrQkFBa0IsZUFBZSxlQUFlLGdCQUFnQix3QkFBd0IsdUJBQXVCLHVCQUF1QixjQUFjLGdDQUFnQyxHQUFHLDBDQUEwQyxrQkFBa0Isd0JBQXdCLGlCQUFpQixvQkFBb0IsdUJBQXVCLGNBQWMsZ0NBQWdDLEdBQUcsK0NBQStDLGtCQUFrQixpQ0FBaUMsaUJBQWlCLG9CQUFvQix3QkFBd0IsdUJBQXVCLGNBQWMsZ0NBQWdDLEdBQUcsOENBQThDLGtCQUFrQix1QkFBdUIsaUJBQWlCLG9CQUFvQixpQ0FBaUMsc0RBQXNELEdBQUcsK0NBQStDLDBEQUEwRCxpQ0FBaUMscUJBQXFCLHNCQUFzQix1QkFBdUIsa0JBQWtCLDRCQUE0Qix3QkFBd0IscUJBQXFCLEdBQUcsbUdBQW1HLHVCQUF1QixpQkFBaUIsZUFBZSxHQUFHLDhJQUE4SSxnQkFBZ0IsaUJBQWlCLEdBQUcsK0lBQStJLGtCQUFrQix1QkFBdUIsV0FBVyxjQUFjLFlBQVksYUFBYSx1QkFBdUIsaUVBQWlFLHVCQUF1Qiw4QkFBOEIsR0FBRyxxTUFBcU0sa0JBQWtCLGlCQUFpQixnQkFBZ0IsbUJBQW1CLGFBQWEsR0FBRyxvUEFBb1Asa0JBQWtCLEdBQUcsZ1NBQWdTLHVCQUF1QixHQUFHLDhSQUE4UixvQkFBb0IsZ0JBQWdCLEdBQUcsNkxBQTZMLGVBQWUsaUJBQWlCLG1DQUFtQyxHQUFHLDZMQUE2TCxlQUFlLGlCQUFpQixHQUFHLDBGQUEwRixlQUFlLDhCQUE4QixrQkFBa0Isb0JBQW9CLGlCQUFpQixjQUFjLGtCQUFrQixzQkFBc0IsZ0JBQWdCLDRCQUE0Qix3QkFBd0IsR0FBRyx1SUFBdUksaUJBQWlCLHVCQUF1QixlQUFlLEdBQUcsNkJBQTZCLHlJQUF5SSxrQkFBa0IsS0FBSyxHQUFHLG1MQUFtTCx3QkFBd0IsR0FBRyxzTEFBc0wsMENBQTBDLHVCQUF1QixnQkFBZ0IsdUJBQXVCLHVCQUF1QixHQUFHLGtPQUFrTyx3QkFBd0Isd0JBQXdCLCtCQUErQix1QkFBdUIsb0JBQW9CLHFCQUFxQix3QkFBd0IsdUJBQXVCLHNCQUFzQixHQUFHLG1PQUFtTyxpQkFBaUIsZUFBZSx3QkFBd0IsR0FBRyxtTEFBbUwsMkJBQTJCLG9CQUFvQixhQUFhLGtCQUFrQiwwQ0FBMEMsc0JBQXNCLFdBQVcscUJBQXFCLEdBQUcsNkJBQTZCLDRGQUE0RixxQ0FBcUMsS0FBSyxHQUFHLHlEQUF5RCxrREFBa0QscUNBQXFDLEtBQUssR0FBRyxPQUFPLDhGQUE4RixXQUFXLFdBQVcsS0FBSyxLQUFLLFdBQVcsV0FBVyxLQUFLLE1BQU0sV0FBVyxVQUFVLFdBQVcsWUFBWSxZQUFZLFdBQVcsV0FBVyxXQUFXLEtBQUssS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFdBQVcsWUFBWSxZQUFZLFVBQVUsV0FBVyxLQUFLLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLFlBQVksWUFBWSxVQUFVLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFdBQVcsV0FBVyxVQUFVLFdBQVcsTUFBTSxLQUFLLFVBQVUsV0FBVyxVQUFVLFVBQVUsWUFBWSxXQUFXLFVBQVUsV0FBVyxNQUFNLEtBQUssVUFBVSxXQUFXLFVBQVUsV0FBVyxZQUFZLFdBQVcsTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFdBQVcsWUFBWSxVQUFVLFdBQVcsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLEtBQUssS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLFdBQVcsS0FBSyxLQUFLLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLEtBQUssS0FBSyxVQUFVLFdBQVcsVUFBVSxLQUFLLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsS0FBSyxLQUFLLFVBQVUsVUFBVSxXQUFXLEtBQUssS0FBSyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsS0FBSyxLQUFLLE1BQU0sWUFBWSxLQUFLLE1BQU0sS0FBSyxLQUFLLFdBQVcsS0FBSyxxQ0FBcUMsZ0NBQWdDLG1FQUFtRSxLQUFLLGdCQUFnQixpQ0FBaUMsMEVBQTBFLEtBQUsseUJBQXlCLG1CQUFtQixxQkFBcUIsb0JBQW9CLG1CQUFtQixvQkFBb0IscUJBQXFCLDZCQUE2Qix5QkFBeUIsZ0JBQWdCLGtDQUFrQyxLQUFLLCtCQUErQix1QkFBdUIsS0FBSyxhQUFhLHlCQUF5QixxQkFBcUIsMEJBQTBCLDBCQUEwQixnQ0FBZ0Msb0NBQW9DLG1DQUFtQyxtQ0FBbUMsZ0JBQWdCLHNCQUFzQixzQkFBc0IsMEJBQTBCLHFCQUFxQiwwQkFBMEIscUNBQXFDLGtDQUFrQyxPQUFPLGVBQWUsc0JBQXNCLG1CQUFtQixtQkFBbUIsb0JBQW9CLDBCQUEwQiwyQkFBMkIsa0NBQWtDLE9BQU8sS0FBSyxXQUFXLG9CQUFvQix5QkFBeUIsbUJBQW1CLDRCQUE0QixnQ0FBZ0MsZ0JBQWdCLHNCQUFzQixxQ0FBcUMscUJBQXFCLHdCQUF3QiwwQkFBMEIsa0NBQWtDLE9BQU8sZUFBZSxzQkFBc0IsMkJBQTJCLHFCQUFxQiw4QkFBOEIscUNBQXFDLDBEQUEwRCxPQUFPLEtBQUssZ0JBQWdCLDREQUE0RCxtQ0FBbUMsdUJBQXVCLHdCQUF3Qiw4QkFBOEIsMkJBQTJCLHFCQUFxQixtQkFBbUIsbUNBQW1DLFNBQVMscUJBQXFCLHNCQUFzQix1QkFBdUIsU0FBUyxzQkFBc0Isd0JBQXdCLDZCQUE2QixpQkFBaUIsb0JBQW9CLGtCQUFrQixtQkFBbUIsNkJBQTZCLHVFQUF1RSw2QkFBNkIsb0NBQW9DLGtDQUFrQywwQkFBMEIseUJBQXlCLHdCQUF3QiwyQkFBMkIscUJBQXFCLDZCQUE2Qiw0QkFBNEIsNEJBQTRCLG1DQUFtQyxlQUFlLDBCQUEwQixnQ0FBZ0MsNEJBQTRCLGVBQWUsYUFBYSxXQUFXLDBCQUEwQix1QkFBdUIseUJBQXlCLDJDQUEyQyxXQUFXLDBCQUEwQix1QkFBdUIseUJBQXlCLFdBQVcsU0FBUyxPQUFPLHlCQUF5QixvQkFBb0IsOEJBQThCLDBCQUEwQix1QkFBdUIscUJBQXFCLG1CQUFtQixrQ0FBa0Msc0JBQXNCLHdCQUF3QixxQkFBcUIsa0JBQWtCLHNCQUFzQiwwQkFBMEIsb0JBQW9CLGdDQUFnQyw0QkFBNEIsdUJBQXVCLHVCQUF1Qiw2QkFBNkIscUNBQXFDLHdCQUF3QixXQUFXLHFCQUFxQix3QkFBd0IsZ0NBQWdDLFdBQVcsMkJBQTJCLGtEQUFrRCwrQkFBK0Isd0JBQXdCLCtCQUErQiwrQkFBK0IsMEJBQTBCLGtDQUFrQyxrQ0FBa0MseUNBQXlDLGlDQUFpQyw4QkFBOEIsK0JBQStCLGtDQUFrQyxpQ0FBaUMsZ0NBQWdDLGFBQWEsMkJBQTJCLDJCQUEyQix5QkFBeUIsa0NBQWtDLGFBQWEsV0FBVyx3QkFBd0IsbUNBQW1DLDRCQUE0QixxQkFBcUIsMEJBQTBCLGtEQUFrRCw4QkFBOEIsbUJBQW1CLDZCQUE2QixXQUFXLFNBQVMsbUNBQW1DLHlDQUF5QyxTQUFTLE9BQU8sS0FBSyxrQ0FBa0MsS0FBSyx5REFBeUQscUJBQXFCLHVDQUF1QyxPQUFPLEtBQUssdUJBQXVCO0FBQ2grYTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDdkM7QUFDeUg7QUFDN0I7QUFDTztBQUMxQjtBQUN6RSw4QkFBOEIsbUZBQTJCLENBQUMsd0dBQXFDO0FBQy9GLHlDQUF5QyxzRkFBK0IsQ0FBQyx1REFBNkI7QUFDdEc7QUFDQSxzREFBc0QsaUNBQWlDLDJFQUEyRSxHQUFHLEtBQUssY0FBYyxxQkFBcUIsMkJBQTJCLGVBQWUsR0FBRyxpREFBaUQsa0RBQWtELG1CQUFtQixzQkFBc0Isa0JBQWtCLGtCQUFrQix3QkFBd0IsR0FBRyxvR0FBb0csaUNBQWlDLHFCQUFxQixnQkFBZ0Isc0JBQXNCLHVCQUF1QixHQUFHLDZCQUE2QixzR0FBc0csdUJBQXVCLEtBQUssR0FBRyxrSkFBa0osa0JBQWtCLGNBQWMsNEJBQTRCLGtCQUFrQiw0QkFBNEIsMkJBQTJCLHdCQUF3QixHQUFHLDZCQUE2QixvSkFBb0osNkJBQTZCLEtBQUssR0FBRyxxTUFBcU0sZUFBZSxrQkFBa0IsaUJBQWlCLHdCQUF3Qix3QkFBd0Isd0JBQXdCLEdBQUcsNkJBQTZCLHVNQUF1TSxrQkFBa0IsbUJBQW1CLHlCQUF5QixLQUFLLEdBQUcsME1BQTBNLGVBQWUsa0JBQWtCLHVCQUF1QixpQkFBaUIsc0JBQXNCLDJPQUEyTyxHQUFHLG9QQUFvUCxxQkFBcUIsd0JBQXdCLG9CQUFvQixtQkFBbUIsR0FBRyw4QkFBOEIsc1BBQXNQLHNCQUFzQixLQUFLLEdBQUcsNkJBQTZCLHNQQUFzUCxrQkFBa0IseUJBQXlCLEtBQUssR0FBRyw2QkFBNkIsc1BBQXNQLHNCQUFzQixLQUFLLEdBQUcscVBBQXFQLGlCQUFpQix3QkFBd0Isb0JBQW9CLHFCQUFxQixxQkFBcUIsR0FBRyw4QkFBOEIsdVBBQXVQLHNCQUFzQixLQUFLLEdBQUcsdURBQXVELGtCQUFrQixnQkFBZ0Isb0JBQW9CLGFBQWEsR0FBRyw2QkFBNkIseURBQXlELDBCQUEwQixLQUFLLEdBQUcsNkdBQTZHLDRCQUE0QixvQkFBb0Isb0JBQW9CLHdPQUF3Tyx1QkFBdUIscUJBQXFCLHVCQUF1QixrQkFBa0Isd0JBQXdCLEdBQUcsNkJBQTZCLCtHQUErRyxzQkFBc0IsS0FBSyxHQUFHLDZCQUE2QiwrR0FBK0csb0JBQW9CLEtBQUssR0FBRywwSkFBMEosa0JBQWtCLEdBQUcsbUhBQW1ILHlDQUF5QyxHQUFHLGdLQUFnSyx1QkFBdUIsbUNBQW1DLFdBQVcsY0FBYyxZQUFZLGFBQWEsaUJBQWlCLGdCQUFnQixpQkFBaUIsbUJBQW1CLEdBQUcscUtBQXFLLGlCQUFpQixHQUFHLGlLQUFpSyw0QkFBNEIsR0FBRywrSkFBK0osbUJBQW1CLHNCQUFzQixpQkFBaUIsZ0JBQWdCLGlCQUFpQixzQkFBc0IsR0FBRyxzREFBc0Qsa0JBQWtCLDRCQUE0QiwyQkFBMkIscUJBQXFCLGNBQWMsR0FBRyw2R0FBNkcseURBQXlELG9CQUFvQixpQkFBaUIsR0FBRyw2QkFBNkIsK0dBQStHLGtCQUFrQix5QkFBeUIsS0FBSyxHQUFHLDRHQUE0RyxrQkFBa0IsMk9BQTJPLDBDQUEwQyxpQkFBaUIsMEJBQTBCLGNBQWMsZ0JBQWdCLGtDQUFrQyxHQUFHLCtKQUErSixrQkFBa0IsK0JBQStCLGNBQWMsMkJBQTJCLHVCQUF1Qix3QkFBd0IsbUNBQW1DLEdBQUcsNkJBQTZCLGlLQUFpSyxpQkFBaUIsbUJBQW1CLEtBQUssR0FBRyw4TUFBOE0sdUJBQXVCLGVBQWUsaUJBQWlCLHdCQUF3QixHQUFHLDZCQUE2QixnTkFBZ04sd0JBQXdCLEtBQUssR0FBRyw2TUFBNk0sbUNBQW1DLEdBQUcsT0FBTyxrR0FBa0csV0FBVyxXQUFXLEtBQUssS0FBSyxVQUFVLFdBQVcsV0FBVyxVQUFVLE1BQU0sS0FBSyxXQUFXLFVBQVUsV0FBVyxVQUFVLFVBQVUsV0FBVyxLQUFLLEtBQUssV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLEtBQUssS0FBSyxLQUFLLFdBQVcsS0FBSyxLQUFLLEtBQUssVUFBVSxVQUFVLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxLQUFLLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxLQUFLLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLEtBQUssS0FBSyxLQUFLLFVBQVUsVUFBVSxXQUFXLEtBQUssS0FBSyxLQUFLLFVBQVUsVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLEtBQUssS0FBSyxXQUFXLFdBQVcsVUFBVSxVQUFVLEtBQUssS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLEtBQUssS0FBSyxVQUFVLFdBQVcsS0FBSyxLQUFLLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxLQUFLLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxLQUFLLEtBQUssS0FBSyxVQUFVLE1BQU0sS0FBSyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsS0FBSyxLQUFLLEtBQUssV0FBVyxLQUFLLEtBQUssS0FBSyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxLQUFLLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssTUFBTSxVQUFVLE1BQU0sS0FBSyxXQUFXLEtBQUssS0FBSyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxV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RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FBRUE3QixpRkFBQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0EsSUFBTTRCLE9BQU8sR0FBRyxJQUFJTSxnQkFBSixFQUFoQjtBQUNBLElBQU0vSixJQUFJLEdBQUdELFFBQVEsQ0FBQ3NHLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNBckcsSUFBSSxDQUFDZ0ssWUFBTCxDQUFrQixJQUFsQixFQUF3QixPQUF4QjtBQUNBUCxPQUFPLENBQUNuRCxXQUFSLENBQW9CdEcsSUFBcEI7QUFFQXdKLDBEQUFTLENBQUNDLE9BQUQsQ0FBVDtBQUNBWCxnRUFBYSxDQUFDVyxPQUFELENBQWI7QUFDQXRCLDBEQUFXLENBQUNzQixPQUFELENBQVgsQyxDQUVBOztBQUNBMUosUUFBUSxDQUFDQyxJQUFULENBQWNzRyxXQUFkLENBQTBCbUQsT0FBMUIsRSIsImZpbGUiOiJtYWluLmUzYzFmYzE0ZDIzYTY0OGE1YzA1LmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IFN0cnV0ID0ge1xyXG4gIHJhbmRvbTogZnVuY3Rpb24gKGUsIHQpIHtcclxuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogKHQgLSBlKSArIGU7XHJcbiAgfSxcclxuICBhcnJheVJhbmRvbTogZnVuY3Rpb24gKGUpIHtcclxuICAgIHJldHVybiBlW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGUubGVuZ3RoKV07XHJcbiAgfSxcclxuICBpbnRlcnBvbGF0ZTogZnVuY3Rpb24gKGUsIHQsIG4pIHtcclxuICAgIHJldHVybiBlICogKDEgLSBuKSArIHQgKiBuO1xyXG4gIH0sXHJcbiAgcmFuZ2VQb3NpdGlvbjogZnVuY3Rpb24gKGUsIHQsIG4pIHtcclxuICAgIHJldHVybiAobiAtIGUpIC8gKHQgLSBlKTtcclxuICB9LFxyXG4gIGNsYW1wOiBmdW5jdGlvbiAoZSwgdCwgbikge1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKGUsIG4pLCB0KTtcclxuICB9LFxyXG4gIHF1ZXJ5QXJyYXk6IGZ1bmN0aW9uIChlLCB0KSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0IHx8ICh0ID0gZG9jdW1lbnQuYm9keSksXHJcbiAgICAgIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHQucXVlcnlTZWxlY3RvckFsbChlKSlcclxuICAgICk7XHJcbiAgfSxcclxuICByZWFkeTogZnVuY3Rpb24gKGUpIHtcclxuICAgIGRvY3VtZW50LnJlYWR5U3RhdGUgPT0gXCJjb21wbGV0ZVwiXHJcbiAgICAgID8gZSgpXHJcbiAgICAgIDogZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZSk7XHJcbiAgfSxcclxufTtcclxuY29uc3QgcmVkdWNlTW90aW9uID0gbWF0Y2hNZWRpYShcIihwcmVmZXJzLXJlZHVjZWQtbW90aW9uKVwiKS5tYXRjaGVzO1xyXG5cclxue1xyXG4gIC8vID09PT09PT1cclxuICAvLyBoZWxwZXJzXHJcbiAgLy8gPT09PT09PVxyXG5cclxuICBjb25zdCBzZXRTdGF0ZSA9IChzdGF0ZSwgc3BlZWQpID0+XHJcbiAgICBkaXJlY3Rpb25zLmZvckVhY2goKGF4aXMpID0+IHtcclxuICAgICAgc3RhdGVbYXhpc10gKz0gc3BlZWRbYXhpc107XHJcbiAgICAgIGlmIChNYXRoLmFicyhzdGF0ZVtheGlzXSkgPCAzNjApIHJldHVybjtcclxuICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoc3RhdGVbYXhpc10sIDM2MCk7XHJcbiAgICAgIGNvbnN0IG1pbiA9IG1heCA9PSAzNjAgPyBNYXRoLmFicyhzdGF0ZVtheGlzXSkgOiAzNjA7XHJcbiAgICAgIHN0YXRlW2F4aXNdID0gbWF4IC0gbWluO1xyXG4gICAgfSk7XHJcblxyXG4gIGNvbnN0IGN1YmVJc0hpZGRlbiA9IChsZWZ0KSA9PiBsZWZ0ID4gcGFyZW50V2lkdGggKyAzMDtcclxuXHJcbiAgLy8gPT09PT09PT09PT09PT09PT1cclxuICAvLyBzaGFyZWQgcmVmZXJlbmNlc1xyXG4gIC8vID09PT09PT09PT09PT09PT09XHJcblxyXG4gIGxldCBoZWFkZXJJc0hpZGRlbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3ViZS10ZW1wbGF0ZVwiKTtcclxuXHJcbiAgY29uc3QgcGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZWFkZXItaGVyb1wiKTtcclxuICBjb25zdCBnZXRQYXJlbnRXaWR0aCA9ICgpID0+IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcclxuICBsZXQgcGFyZW50V2lkdGggPSBnZXRQYXJlbnRXaWR0aCgpO1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IChwYXJlbnRXaWR0aCA9IGdldFBhcmVudFdpZHRoKCkpKTtcclxuXHJcbiAgY29uc3QgZGlyZWN0aW9ucyA9IFtcInhcIiwgXCJ5XCJdO1xyXG5cclxuICBjb25zdCBwYWxldHRlID0ge1xyXG4gICAgd2hpdGU6IHtcclxuICAgICAgY29sb3I6IFsxMzEsIDk2LCAyNTVdLFxyXG4gICAgICBzaGFkaW5nOiBbMTYwLCAxOTAsIDIxOF0sXHJcbiAgICB9LFxyXG4gICAgb3JhbmdlOiB7XHJcbiAgICAgIGNvbG9yOiBbMjU1LCAyNTAsIDIzMF0sXHJcbiAgICAgIHNoYWRpbmc6IFsyNTUsIDEyMCwgNTBdLFxyXG4gICAgfSxcclxuICAgIGdyZWVuOiB7XHJcbiAgICAgIGNvbG9yOiBbNDYsIDI1NSwgMjA0XSxcclxuICAgICAgc2hhZGluZzogWzAsIDIxMSwgMTM2XSxcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgLy8gPT09PT09PT09PT09PT1cclxuICAvLyBjdWJlIGluc3RhbmNlc1xyXG4gIC8vID09PT09PT09PT09PT09XHJcblxyXG4gIGNvbnN0IHNldEN1YmVTdHlsZXMgPSAoeyBjdWJlLCBzaXplLCBsZWZ0LCB0b3AgfSkgPT4ge1xyXG4gICAgT2JqZWN0LmFzc2lnbihjdWJlLnN0eWxlLCB7XHJcbiAgICAgIHdpZHRoOiBgJHtzaXplfXB4YCxcclxuICAgICAgaGVpZ2h0OiBgJHtzaXplfXB4YCxcclxuICAgICAgbGVmdDogYCR7bGVmdH1weGAsXHJcbiAgICAgIHRvcDogYCR7dG9wfXB4YCxcclxuICAgIH0pO1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24oY3ViZS5xdWVyeVNlbGVjdG9yKFwiLnNoYWRvd1wiKS5zdHlsZSwge1xyXG4gICAgICBmaWx0ZXI6IGBibHVyKCR7TWF0aC5yb3VuZChzaXplICogMC42KX1weClgLFxyXG4gICAgICBvcGFjaXR5OiBNYXRoLm1pbihzaXplIC8gMTIwLCAwLjQpLFxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY3JlYXRlQ3ViZSA9IChzaXplKSA9PiB7XHJcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUuY29udGVudCwgdHJ1ZSk7XHJcbiAgICBjb25zdCBjdWJlID0gZnJhZ21lbnQucXVlcnlTZWxlY3RvcihcIi5jdWJlXCIpO1xyXG5cclxuICAgIGNvbnN0IHN0YXRlID0ge1xyXG4gICAgICB4OiAwLFxyXG4gICAgICB5OiAwLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzcGVlZCA9IGRpcmVjdGlvbnMucmVkdWNlKChvYmplY3QsIGF4aXMpID0+IHtcclxuICAgICAgY29uc3QgbWF4ID0gc2l6ZSA+IHNpemVzLm0gPyAwLjMgOiAwLjY7XHJcbiAgICAgIG9iamVjdFtheGlzXSA9IFN0cnV0LnJhbmRvbSgtbWF4LCBtYXgpO1xyXG4gICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgfSwge30pO1xyXG5cclxuICAgIGNvbnN0IHNpZGVzID0gU3RydXQucXVlcnlBcnJheShcIi5zaWRlcyBkaXZcIiwgY3ViZSkucmVkdWNlKFxyXG4gICAgICAob2JqZWN0LCBzaWRlKSA9PiB7XHJcbiAgICAgICAgb2JqZWN0W3NpZGUuY2xhc3NOYW1lXSA9IHtcclxuICAgICAgICAgIHNpZGUsXHJcbiAgICAgICAgICBoaWRkZW46IGZhbHNlLFxyXG4gICAgICAgICAgcm90YXRlOiB7XHJcbiAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcclxuICAgICAgfSxcclxuICAgICAge31cclxuICAgICk7XHJcblxyXG4gICAgc2lkZXMudG9wLnJvdGF0ZS54ID0gOTA7XHJcbiAgICBzaWRlcy5ib3R0b20ucm90YXRlLnggPSAtOTA7XHJcbiAgICBzaWRlcy5sZWZ0LnJvdGF0ZS55ID0gLTkwO1xyXG4gICAgc2lkZXMucmlnaHQucm90YXRlLnkgPSA5MDtcclxuICAgIHNpZGVzLmJhY2sucm90YXRlLnkgPSAtMTgwO1xyXG5cclxuICAgIHJldHVybiB7IGZyYWdtZW50LCBjdWJlLCBzdGF0ZSwgc3BlZWQsIHNpZGVzOiBPYmplY3QudmFsdWVzKHNpZGVzKSB9O1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNpemVzID0ge1xyXG4gICAgeHM6IDE1LFxyXG4gICAgczogMjUsXHJcbiAgICBtOiA0MCxcclxuICAgIGw6IDEwMCxcclxuICAgIHhsOiAxMjAsXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY3ViZXMgPSBbXHJcbiAgICB7XHJcbiAgICAgIHRpbnQ6IHBhbGV0dGUuZ3JlZW4sXHJcbiAgICAgIHNpemU6IHNpemVzLnhsLFxyXG4gICAgICBib3R0b206IDAsXHJcbiAgICAgIHJpZ2h0OiAwLFxyXG4gICAgfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS5ncmVlbixcclxuICAgIC8vICAgc2l6ZTogc2l6ZXMueHMsXHJcbiAgICAvLyAgIGxlZnQ6IDM1LFxyXG4gICAgLy8gICB0b3A6IDQ2NSxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUud2hpdGUsXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLnMsXHJcbiAgICAvLyAgIGxlZnQ6IDU1LFxyXG4gICAgLy8gICB0b3A6IDQxNSxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUud2hpdGUsXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLnhsLFxyXG4gICAgLy8gICBsZWZ0OiAxNDAsXHJcbiAgICAvLyAgIHRvcDogNDAwLFxyXG4gICAgLy8gfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS53aGl0ZSxcclxuICAgIC8vICAgc2l6ZTogc2l6ZXMubSxcclxuICAgIC8vICAgbGVmdDogNDIwLFxyXG4gICAgLy8gICB0b3A6IDE1NSxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUuZ3JlZW4sXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLnhzLFxyXG4gICAgLy8gICBsZWZ0OiA0NDAsXHJcbiAgICAvLyAgIHRvcDogMjgwLFxyXG4gICAgLy8gfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS5vcmFuZ2UsXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLnMsXHJcbiAgICAvLyAgIGxlZnQ6IDQ4MCxcclxuICAgIC8vICAgdG9wOiAyMjgsXHJcbiAgICAvLyB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICB0aW50OiBwYWxldHRlLndoaXRlLFxyXG4gICAgLy8gICBzaXplOiBzaXplcy5sLFxyXG4gICAgLy8gICBsZWZ0OiA1ODAsXHJcbiAgICAvLyAgIHRvcDogMjU1LFxyXG4gICAgLy8gfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS5ncmVlbixcclxuICAgIC8vICAgc2l6ZTogc2l6ZXMucyxcclxuICAgIC8vICAgbGVmdDogNzgwLFxyXG4gICAgLy8gICB0b3A6IDMyMCxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUud2hpdGUsXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLnhsLFxyXG4gICAgLy8gICBsZWZ0OiA3ODAsXHJcbiAgICAvLyAgIHRvcDogMTIwLFxyXG4gICAgLy8gfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS5vcmFuZ2UsXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLmwsXHJcbiAgICAvLyAgIGxlZnQ6IDkwMCxcclxuICAgIC8vICAgdG9wOiAzMTAsXHJcbiAgICAvLyB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICB0aW50OiBwYWxldHRlLmdyZWVuLFxyXG4gICAgLy8gICBzaXplOiBzaXplcy5tLFxyXG4gICAgLy8gICBsZWZ0OiAxMDMwLFxyXG4gICAgLy8gICB0b3A6IDEyMDAsXHJcbiAgICAvLyB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICB0aW50OiBwYWxldHRlLmdyZWVuLFxyXG4gICAgLy8gICBzaXplOiBzaXplcy5tLFxyXG4gICAgLy8gICBsZWZ0OiAyMDAwLFxyXG4gICAgLy8gICB0b3A6IDYwMCxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUuZ3JlZW4sXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLm0sXHJcbiAgICAvLyAgIGxlZnQ6IDE5MDAsXHJcbiAgICAvLyAgIHRvcDogMjAwLFxyXG4gICAgLy8gfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS5ncmVlbixcclxuICAgIC8vICAgc2l6ZTogc2l6ZXMubSxcclxuICAgIC8vICAgbGVmdDogMTAwLFxyXG4gICAgLy8gICB0b3A6IDIwMCxcclxuICAgIC8vIH0sXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgIHRpbnQ6IHBhbGV0dGUuZ3JlZW4sXHJcbiAgICAvLyAgIHNpemU6IHNpemVzLm0sXHJcbiAgICAvLyAgIGxlZnQ6IDEwMzAsXHJcbiAgICAvLyAgIHRvcDogMjAwLFxyXG4gICAgLy8gfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgdGludDogcGFsZXR0ZS5ncmVlbixcclxuICAgIC8vICAgc2l6ZTogc2l6ZXMubSxcclxuICAgIC8vICAgbGVmdDogMTUwMCxcclxuICAgIC8vICAgdG9wOiAyMDAsXHJcbiAgICAvLyB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICB0aW50OiBwYWxldHRlLmdyZWVuLFxyXG4gICAgLy8gICBzaXplOiBzaXplcy5tLFxyXG4gICAgLy8gICBsZWZ0OiAxMCxcclxuICAgIC8vICAgdG9wOiAyMDAsXHJcbiAgICAvLyB9LFxyXG4gIF0ubWFwKChvYmplY3QpID0+IE9iamVjdC5hc3NpZ24oY3JlYXRlQ3ViZShvYmplY3Quc2l6ZSksIG9iamVjdCkpO1xyXG5cclxuICBjdWJlcy5mb3JFYWNoKHNldEN1YmVTdHlsZXMpO1xyXG5cclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIC8vIGN1YmUgcm90YXRpbmcgYW5pbWF0aW9uXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgY29uc3QgZ2V0RGlzdGFuY2UgPSAoc3RhdGUsIHJvdGF0ZSkgPT5cclxuICAgIGRpcmVjdGlvbnMucmVkdWNlKChvYmplY3QsIGF4aXMpID0+IHtcclxuICAgICAgb2JqZWN0W2F4aXNdID0gTWF0aC5hYnMoc3RhdGVbYXhpc10gKyByb3RhdGVbYXhpc10pO1xyXG4gICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgfSwge30pO1xyXG5cclxuICBjb25zdCBnZXRSb3RhdGlvbiA9IChzdGF0ZSwgc2l6ZSwgcm90YXRlKSA9PiB7XHJcbiAgICBjb25zdCBheGlzID0gcm90YXRlLnggPyBcIlpcIiA6IFwiWVwiO1xyXG4gICAgY29uc3QgZGlyZWN0aW9uID0gcm90YXRlLnggPiAwID8gLTEgOiAxO1xyXG5cclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgcm90YXRlWCgke3N0YXRlLnggKyByb3RhdGUueH1kZWcpXHJcbiAgICAgICAgcm90YXRlJHtheGlzfSgke2RpcmVjdGlvbiAqIChzdGF0ZS55ICsgcm90YXRlLnkpfWRlZylcclxuICAgICAgICB0cmFuc2xhdGVaKCR7c2l6ZSAvIDJ9cHgpXHJcbiAgICAgIGA7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZ2V0U2hhZGluZyA9ICh0aW50LCByb3RhdGUsIGRpc3RhbmNlKSA9PiB7XHJcbiAgICBjb25zdCBkYXJrZW4gPSBkaXJlY3Rpb25zLnJlZHVjZSgob2JqZWN0LCBheGlzKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRlbHRhID0gZGlzdGFuY2VbYXhpc107XHJcbiAgICAgIGNvbnN0IHJhdGlvID0gZGVsdGEgLyAxODA7XHJcbiAgICAgIG9iamVjdFtheGlzXSA9IGRlbHRhID4gMTgwID8gTWF0aC5hYnMoMiAtIHJhdGlvKSA6IHJhdGlvO1xyXG4gICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgfSwge30pO1xyXG5cclxuICAgIGlmIChyb3RhdGUueCkgZGFya2VuLnkgPSAwO1xyXG4gICAgZWxzZSB7XHJcbiAgICAgIGNvbnN0IHsgeCB9ID0gZGlzdGFuY2U7XHJcbiAgICAgIGlmICh4ID4gOTAgJiYgeCA8IDI3MClcclxuICAgICAgICBkaXJlY3Rpb25zLmZvckVhY2goKGF4aXMpID0+IChkYXJrZW5bYXhpc10gPSAxIC0gZGFya2VuW2F4aXNdKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWxwaGEgPSAoZGFya2VuLnggKyBkYXJrZW4ueSkgLyAyO1xyXG4gICAgY29uc3QgYmxlbmQgPSAodmFsdWUsIGluZGV4KSA9PlxyXG4gICAgICBNYXRoLnJvdW5kKFN0cnV0LmludGVycG9sYXRlKHZhbHVlLCB0aW50LnNoYWRpbmdbaW5kZXhdLCBhbHBoYSkpO1xyXG4gICAgY29uc3QgW3IsIGcsIGJdID0gdGludC5jb2xvci5tYXAoYmxlbmQpO1xyXG5cclxuICAgIHJldHVybiBgcmdiKCR7cn0sICR7Z30sICR7Yn0pYDtcclxuICB9O1xyXG5cclxuICBjb25zdCBzaG91bGRIaWRlID0gKHJvdGF0ZVgsIHgsIHkpID0+IHtcclxuICAgIGlmIChyb3RhdGVYKSByZXR1cm4geCA+IDkwICYmIHggPCAyNzA7XHJcbiAgICBpZiAoeCA8IDkwKSByZXR1cm4geSA+IDkwICYmIHkgPCAyNzA7XHJcbiAgICBpZiAoeCA8IDI3MCkgcmV0dXJuIHkgPCA5MDtcclxuICAgIHJldHVybiB5ID4gOTAgJiYgeSA8IDI3MDtcclxuICB9O1xyXG5cclxuICBjb25zdCB1cGRhdGVTaWRlcyA9ICh7IHN0YXRlLCBzcGVlZCwgc2l6ZSwgdGludCwgc2lkZXMsIGxlZnQgfSkgPT4ge1xyXG4gICAgaWYgKGhlYWRlcklzSGlkZGVuIHx8IGN1YmVJc0hpZGRlbihsZWZ0KSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGFuaW1hdGUgPSAob2JqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgc2lkZSwgcm90YXRlLCBoaWRkZW4gfSA9IG9iamVjdDtcclxuICAgICAgY29uc3QgZGlzdGFuY2UgPSBnZXREaXN0YW5jZShzdGF0ZSwgcm90YXRlKTtcclxuXHJcbiAgICAgIC8vIGRvbid0IGFuaW1hdGUgaGlkZGVuIHNpZGVzXHJcbiAgICAgIGlmIChzaG91bGRIaWRlKHJvdGF0ZS54LCBkaXN0YW5jZS54LCBkaXN0YW5jZS55KSkge1xyXG4gICAgICAgIGlmICghaGlkZGVuKSB7XHJcbiAgICAgICAgICBzaWRlLmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgICBvYmplY3QuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaGlkZGVuKSB7XHJcbiAgICAgICAgc2lkZS5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgICBvYmplY3QuaGlkZGVuID0gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNpZGUuc3R5bGUudHJhbnNmb3JtID0gZ2V0Um90YXRpb24oc3RhdGUsIHNpemUsIHJvdGF0ZSk7XHJcbiAgICAgIHNpZGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gZ2V0U2hhZGluZyh0aW50LCByb3RhdGUsIGRpc3RhbmNlKTtcclxuICAgIH07XHJcblxyXG4gICAgc2V0U3RhdGUoc3RhdGUsIHNwZWVkKTtcclxuICAgIHNpZGVzLmZvckVhY2goYW5pbWF0ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgdGljayA9ICgpID0+IHtcclxuICAgIGN1YmVzLmZvckVhY2godXBkYXRlU2lkZXMpO1xyXG4gICAgaWYgKHJlZHVjZU1vdGlvbikgcmV0dXJuO1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xyXG4gIH07XHJcblxyXG4gIC8vID09PT09PT09PT09PT09PVxyXG4gIC8vIHBhcmFsbGF4IHNjcm9sbFxyXG4gIC8vID09PT09PT09PT09PT09PVxyXG5cclxuICAvLyBnaXZlIGl0IHNvbWUgZXh0cmEgc3BhY2UgdG8gYWNjb3VudCBmb3IgdGhlIHBhcmFsbGF4IGFuZCB0aGUgc2hhZG93cyBvZiB0aGUgY3ViZXNcclxuICBjb25zdCBwYXJhbGxheExpbWl0ID1cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluID4gaGVhZGVyXCIpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCArIDgwO1xyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBzY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWTtcclxuICAgIGlmIChzY3JvbGwgPCBwYXJhbGxheExpbWl0KSB7XHJcbiAgICAgIGhlYWRlcklzSGlkZGVuID0gZmFsc2U7XHJcbiAgICAgIGN1YmVzLmZvckVhY2goXHJcbiAgICAgICAgKHsgY3ViZSwgc3BlZWQgfSkgPT5cclxuICAgICAgICAgIChjdWJlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7XHJcbiAgICAgICAgICAgIE1hdGguYWJzKHNwZWVkLnggKiAwLjUpICogc2Nyb2xsXHJcbiAgICAgICAgICB9cHgpYClcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaGVhZGVySXNIaWRkZW4gPSB0cnVlO1xyXG4gIH0pO1xyXG5cclxuICAvLyA9PT09PT09PT09XHJcbiAgLy8gaW5pdGlhbGl6ZVxyXG4gIC8vID09PT09PT09PT1cclxuXHJcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJjdWJlc1wiO1xyXG4gIGN1YmVzLmZvckVhY2goKHsgZnJhZ21lbnQgfSkgPT4gY29udGFpbmVyLmFwcGVuZENoaWxkKGZyYWdtZW50KSk7XHJcblxyXG4gIGNvbnN0IHN0YXJ0ID0gKCkgPT4ge1xyXG4gICAgdGljaygpO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgfTtcclxuXHJcbiAgXCJyZXF1ZXN0SWRsZUNhbGxiYWNrXCIgaW4gd2luZG93ID8gcmVxdWVzdElkbGVDYWxsYmFjayhzdGFydCkgOiBzdGFydCgpO1xyXG59XHJcbi8vY29kZSBmcm9tIGh0dHBzOi8vY29kZXBlbi5pby90b21hdG91aXVpL3Blbi9tTG12b3ZcclxuIiwiaW1wb3J0IHN0eWxlIGZyb20gXCIuL2Fib3V0Lm1vZHVsZS5zY3NzXCI7XHJcbmltcG9ydCBQcmlzbSBmcm9tIFwicHJpc21qc1wiO1xyXG5cclxuY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xyXG5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc3R5bGVbXCJjb250YWluZXJcIl0pO1xyXG5cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICBsZXQgb3B0aW9ucyA9IHtcclxuICAgIHRocmVzaG9sZDogWzAuMl0sXHJcbiAgfTtcclxuICBjb25zdCBsYXB0b3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tbGFwdG9wLW9ic1wiKTtcclxuICBjb25zdCB0cmFja1N2ZyA9IChlbnRyaWVzKSA9PiB7XHJcbiAgICBpZiAoZW50cmllc1swXS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICB2YXIgaSA9IDA7XHJcbiAgICAgIHZhciB0eHQgPSBgY29uc3QgYXBwID0gZXhwcmVzcygpO1xcbmFwcC5nZXQoJ2FwaS9za2lsbHMnLCAocmVxLHJlcykgPT5cXG57IHJlcy5qc29uKFtcIlJlYWN0XCIsXCJKYXZhc2NyaXB0XCIsXFxuXCJub2RlSlNcIiwgXCJDU1NcIiwgXCJIVE1MXCJdKX0pYDtcclxuICAgICAgY29uc3Qgc2VydmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZXJ2ZXItdGV4dFwiKTtcclxuICAgICAgY29uc3QgY2xpZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbGllbnQtdGV4dFwiKTtcclxuICAgICAgdmFyIHNwZWVkID0gMTA7XHJcblxyXG4gICAgICBmdW5jdGlvbiBzZXJ2ZXJBbmltYXRpb24oKSB7XHJcbiAgICAgICAgaWYgKGkgPCB0eHQubGVuZ3RoKSB7XHJcbiAgICAgICAgICBzZXJ2ZXIuaW5uZXJIVE1MICs9IHR4dC5jaGFyQXQoaSk7XHJcbiAgICAgICAgICBpKys7XHJcbiAgICAgICAgICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dChzZXJ2ZXJBbmltYXRpb24sIHNwZWVkKTtcclxuICAgICAgICAgIGlmIChpID09PSB0eHQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgIGNsaWVudEFuaW1hdGlvbigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBQcmlzbS5oaWdobGlnaHRFbGVtZW50KHNlcnZlcik7XHJcbiAgICAgIH1cclxuICAgICAgZnVuY3Rpb24gY2xpZW50QW5pbWF0aW9uKCkge1xyXG4gICAgICAgIGxldCB0eHQgPSBgY29uc3QgbXlTa2lsbHMgPSBhd2FpdCBcXG4gYXhpb3MuZ2V0KCcvYXBpL3NraWxscycpXFxuIGNvbnNvbGUubG9nKG15U2tpbGxzLmRhdGEpYDtcclxuXHJcbiAgICAgICAgaWYgKGkgPCB0eHQubGVuZ3RoKSB7XHJcbiAgICAgICAgICBjbGllbnQuaW5uZXJIVE1MICs9IHR4dC5jaGFyQXQoaSk7XHJcblxyXG4gICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgc2V0VGltZW91dChjbGllbnRBbmltYXRpb24sIHNwZWVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUHJpc20uaGlnaGxpZ2h0RWxlbWVudChjbGllbnQpO1xyXG4gICAgICB9XHJcbiAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgc2VydmVyQW5pbWF0aW9uKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIodHJhY2tTdmcsIG9wdGlvbnMpO1xyXG5cclxuICBvYnNlcnZlci5vYnNlcnZlKGxhcHRvcCk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCByZW5kZXJBYm91dCA9IChmcmFnbWVudCkgPT4ge1xyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gLypodG1sKi8gYDxkaXYgY2xhc3M9JHtzdHlsZVtcImNvbnRhaW5lclwiXX0+XHJcbiAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcIm1haW4tY29udGVudFwiXX0+XHJcbiAgICAgICAgPGRpdiBjbGFzcz0ke3N0eWxlW1wiY29kZS1lZGl0b3ItY29udGFpbmVyXCJdfT5cclxuICAgICAgICAgIDxkaXYgaWQ9J21haW4tbGFwdG9wLW9icycgY2xhc3M9JHtzdHlsZVtcImxhcHRvcFwiXX0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcImNvZGUtZWRpdG9yXCJdfT5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSR7c3R5bGVbXCJjbGllbnQtZWRpdG9yXCJdfT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcImxpbmUtbnVtYmVyLWNvbnRhaW5lclwiXX0+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcImxpbmUtY29udGFpbmVyXCJdfT5cclxuICAgICAgICAgICAgICAgICAgICA8cHJlIGNsYXNzPSR7XCJsaW5lLW51bWJlcnNcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8Y29kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZD1cImNsaWVudC10ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9JHtgbGFuZ3VhZ2UtanNgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPjwvY29kZT5cclxuICAgICAgICAgICAgICAgICAgICA8L3ByZT5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSR7c3R5bGVbXCJzZXJ2ZXItZWRpdG9yXCJdfT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcImxpbmUtbnVtYmVyLWNvbnRhaW5lclwiXX0+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcImxpbmUtY29udGFpbmVyXCJdfT5cclxuICAgICAgICAgICAgICAgICAgICA8cHJlIGNsYXNzPSR7XCJsaW5lLW51bWJlcnNcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8Y29kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZD1cInNlcnZlci10ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9JHtgbGFuZ3VhZ2UtanNgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPjwvY29kZT5cclxuICAgICAgICAgICAgICAgICAgICA8L3ByZT5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcImJhc2VcIl19PjwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcInRleHQtY29udGVudFwiXX0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPSR7c3R5bGVbXCJ0ZXh0LWNvbnRhaW5lclwiXX0+XHJcbiAgICAgICAgICAgIDxoMyBjbGFzcz0ke3N0eWxlW1wibWFpbi1oZWFkZXJcIl19PkphdmFzY3JpcHQgZGV2ZWxvcGVyPC9oMz5cclxuICAgICAgICAgICAgPHAgY2xhc3M9JHtzdHlsZVtcImRlc2NyaXB0aW9uXCJdfT5cclxuICAgICAgICAgICAgICBIZWxsbywgSSdtIEF1c3RpbiwgYSB3ZWIgZGV2ZWxvcGVyIHdpdGggYSBwcmltYXJ5IGZvY3VzIGluIFJlYWN0XHJcbiAgICAgICAgICAgICAgZGV2ZWxvcG1lbnQuIEknbSBjb25maWRlbnQgaW4gd29ya2luZyB3aXRoIHRoZSB2YXJpb3VzIE1FUk4gc3RhY2tcclxuICAgICAgICAgICAgICB0ZWNobm9sb2dpZXMgYW5kIEknbSBvbiBhIHBlcnNpc3RlbnQgam91cm5leSBpbiBob25pbmcgbXkgY3JhZnQgaW5cclxuICAgICAgICAgICAgICB3ZWIgZGV2ZWxvcG1lbnQuXHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5gO1xyXG4gIGNvbnN0IHJvb3QgPSBmcmFnbWVudC5nZXRFbGVtZW50QnlJZChcIiNyb290XCIpO1xyXG4gIHJvb3QuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbn07XHJcbiIsImltcG9ydCBzdHlsZSBmcm9tIFwiLi9sYW5kaW5nLm1vZHVsZS5zY3NzXCI7XHJcbmltcG9ydCBjaGF0YXBwIGZyb20gXCIuL3Byb2plY3RwaG90b3MvY2hhdGFwcC5wbmdcIjtcclxuaW1wb3J0IGNvdmlkVHJhY2tlciBmcm9tIFwiLi9wcm9qZWN0cGhvdG9zL2NvdmlkVHJhY2tlci5wbmdcIjtcclxuaW1wb3J0IENzc0ljb24gZnJvbSBcIi4vcHJvamVjdHBob3Rvcy9jc3MzLnN2Z1wiO1xyXG5pbXBvcnQgSHRtbEljb24gZnJvbSBcIi4vcHJvamVjdHBob3Rvcy9odG1sNS5zdmdcIjtcclxuaW1wb3J0IEpzSWNvbiBmcm9tIFwiLi9wcm9qZWN0cGhvdG9zL2phdmFzY3JpcHQuc3ZnXCI7XHJcbmltcG9ydCBzcWxJY29uIGZyb20gXCIuL3Byb2plY3RwaG90b3MvbXlzcWwuc3ZnXCI7XHJcbmltcG9ydCBOb2RlSWNvbiBmcm9tIFwiLi9wcm9qZWN0cGhvdG9zL25vZGUuc3ZnXCI7XHJcbmltcG9ydCBwbGF5bGlzdHMgZnJvbSBcIi4vcHJvamVjdHBob3Rvcy9wbGF5bGlzdHMucG5nXCI7XHJcbmltcG9ydCB0ZnRhcHAgZnJvbSBcIi4vcHJvamVjdHBob3Rvcy90ZnRhcHAucG5nXCI7XHJcbmltcG9ydCBSZWFjdEljb24gZnJvbSBcIi4vcHJvamVjdHBob3Rvcy9yZWFjdC5zdmdcIjtcclxuaW1wb3J0IHJlYWRkaXQgZnJvbSBcIi4vcHJvamVjdHBob3Rvcy9yZWFkZGl0LnBuZ1wiO1xyXG5pbXBvcnQgdGVzbGEgZnJvbSBcIi4vcHJvamVjdHBob3Rvcy90ZXNsYS1jbG9uZS5wbmdcIjtcclxuXHJcbmNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcclxuXHJcbmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzdHlsZVtcIndyYXBwZXJcIl0pO1xyXG5jb25zdCB0ZWNoSW1hZ2VzID0gW1xyXG4gIHtcclxuICAgIGltYWdlOiBSZWFjdEljb24sXHJcbiAgICBuYW1lOiBcIlJlYWN0XCIsXHJcbiAgfSxcclxuICB7IGltYWdlOiBKc0ljb24sIG5hbWU6IFwiSnMgRVM2XCIgfSxcclxuICB7XHJcbiAgICBpbWFnZTogTm9kZUljb24sXHJcbiAgICBuYW1lOiBcIk5vZGVcIixcclxuICB9LFxyXG4gIHtcclxuICAgIGltYWdlOiBIdG1sSWNvbixcclxuICAgIG5hbWU6IFwiSHRtbFwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaW1hZ2U6IENzc0ljb24sXHJcbiAgICBuYW1lOiBcIkNzc1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaW1hZ2U6IHNxbEljb24sXHJcbiAgICBuYW1lOiBcIk15U1FMXCIsXHJcbiAgfSxcclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJMYW5kaW5nID0gKGZyYWdtZW50KSA9PiB7XHJcbiAgZWxlbWVudC5pbm5lckhUTUwgPSAvKmh0bWwqLyBgXHJcbjxkaXYgY2xhc3M9JHtzdHlsZVtcImNlbnRlci1jb250YWluZXJcIl19PlxyXG5cclxuICA8ZGl2IGNsYXNzPSR7c3R5bGVbXCJjb250YWluZXJcIl19PlxyXG4gICAgPGRpdiBjbGFzcz0ke3N0eWxlW1widGV4dC1jb250YWluZXJcIl19PlxyXG4gICAgICA8aDEgY2xhc3M9JHtzdHlsZVtcIm1haW4tdGl0bGVcIl19PkhpLCBJJ20gPHNwYW4+QXVzdGluPC9zcGFuPjwvaDE+XHJcbiAgICAgIDxoNCBjbGFzcz0ke3N0eWxlW1wiZGVzY3JpcHRpb25cIl19PlxyXG4gICAgICAgIEhlcmUgYXJlIHNvbWUgb2YgbXkgcHJvamVjdHMgSSd2ZSBiZWVuIHdvcmtpbmcgb24uXHJcbiAgICAgIDwvaDQ+XHJcbiAgICA8L2Rpdj4gXHJcbiAgICA8ZGl2IGNsYXNzPSR7c3R5bGVbXCJpbWFnZS1jb250YWluZXJcIl19PlxyXG4gXHJcbiAgICAgIFxyXG4gICAgICAgPGJ1dHRvbiBjbGFzcz0ke1xyXG4gICAgICAgICBzdHlsZVtcInByb2plY3QtY29udGFpbmVyXCJdXHJcbiAgICAgICB9PiA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2FqbDAwMjMvY2hhdEFwcFwiID5cclxuICAgICAgICAgIDxpbWcgc3JjPSR7Y2hhdGFwcH0gY2xhc3M9JHtzdHlsZVtcInByb2plY3QtaW1hZ2VcIl19IC8+XHJcbiAgICAgICAgPC9hPjwvYnV0dG9uPlxyXG4gICAgICAgXHJcbiAgICBcclxuICBcclxuXHJcbiAgICAgIDxidXR0b24gY2xhc3M9JHtzdHlsZVtcInByb2plY3QtY29udGFpbmVyXCJdfT5cclxuICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2FqbDAwMjMvQ292aWQtdHJhY2tlclwiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPSR7XHJcbiAgICAgICAgICBzdHlsZVtcInByb2plY3QtY29udGFpbmVyXCJdXHJcbiAgICAgICAgfT5cclxuICAgICAgICAgIDxpbWcgc3JjPSR7Y292aWRUcmFja2VyfSBjbGFzcz0ke3N0eWxlW1wicHJvamVjdC1pbWFnZVwiXX0gLz5cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPSR7c3R5bGVbXCJwcm9qZWN0LWNvbnRhaW5lclwiXX0+XHJcbiAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9hamwwMDIzL3JlZGRpdFNxbE1hc3RlclwiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPSR7XHJcbiAgICAgICAgICBzdHlsZVtcInByb2plY3QtY29udGFpbmVyXCJdXHJcbiAgICAgICAgfT5cclxuICAgICAgICAgIDxpbWcgc3JjPSR7cmVhZGRpdH0gY2xhc3M9JHtzdHlsZVtcInByb2plY3QtaW1hZ2VcIl19IC8+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz0ke3N0eWxlW1wicHJvamVjdC1jb250YWluZXJcIl19PlxyXG4gICAgICAgIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYWpsMDAyMy9iZXR0ZXJQbGF5bGlzdFwiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPSR7XHJcbiAgICAgICAgICBzdHlsZVtcInByb2plY3QtY29udGFpbmVyXCJdXHJcbiAgICAgICAgfT5cclxuICAgICAgICAgIDxpbWcgc3JjPSR7cGxheWxpc3RzfSBjbGFzcz0ke3N0eWxlW1wicHJvamVjdC1pbWFnZVwiXX0gLz5cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPSR7XHJcbiAgICAgICAgc3R5bGVbXCJwcm9qZWN0LWNvbnRhaW5lclwiXVxyXG4gICAgICB9PjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYWpsMDAyMy90ZXNsYUNsb25lXCIgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9JHtcclxuICAgIHN0eWxlW1wicHJvamVjdC1jb250YWluZXJcIl1cclxuICB9PlxyXG4gICAgICAgICAgPGltZyBzcmM9JHt0ZXNsYX0gY2xhc3M9JHtzdHlsZVtcInByb2plY3QtaW1hZ2VcIl19IC8+XHJcbiAgICAgICAgPC9hPjwvYnV0dG9uPlxyXG5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz0ke1xyXG4gICAgICAgIHN0eWxlW1wicHJvamVjdC1jb250YWluZXJcIl1cclxuICAgICAgfT48YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2FqbDAwMjMvdGZ0YXBwMlwiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPSR7XHJcbiAgICBzdHlsZVtcInByb2plY3QtY29udGFpbmVyXCJdXHJcbiAgfT5cclxuICAgICAgICAgIDxpbWcgc3JjPSR7dGZ0YXBwfSBjbGFzcz0ke2Ake3N0eWxlW1wicHJvamVjdC1pbWFnZVwiXX0gJHtzdHlsZVtcInBvcnRmb2xpby1pbWFnZVwiXX1gfSAvPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz0ke3N0eWxlW1widGVjaC13cmFwcGVyXCJdfT5cclxuICAgIDxwIGNsYXNzPSR7c3R5bGVbXCJ0ZWNoLWNvbnRhaW5lci10aXRsZVwiXX0+XHJcbiAgICAgIFRlY2hub2xvZ2llcyB1c2VkIGluIHRoZXNlIHByb2plY3RzXHJcbiAgICA8L3A+XHJcbiAgICA8ZGl2IGlkPSd0ZWNoLWNvbnRhaW5lcicgY2xhc3M9JHtzdHlsZVtcInRlY2gtaWNvbi1jb250YWluZXJcIl19PlxyXG5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5gO1xyXG4gIGNvbnN0IHJvb3QgPSBmcmFnbWVudC5nZXRFbGVtZW50QnlJZChcIiNyb290XCIpO1xyXG4gIHJvb3QuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgY29uc3QgdGVjaENvbnRhaW5lciA9IGZyYWdtZW50LmdldEVsZW1lbnRCeUlkKFwidGVjaC1jb250YWluZXJcIik7XHJcbiAgdGVjaEltYWdlcy5tYXAoKGl0ZW0pID0+IHtcclxuICAgIGxldCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGljb24uY2xhc3NMaXN0LmFkZChzdHlsZVtcImljb24tY29udGFpbmVyXCJdKTtcclxuICAgIGljb24uaW5uZXJIVE1MID0gLypodG1sKi8gYFxyXG4gICAgJHtpdGVtLmltYWdlfSA8cCBjbGFzcz0ke3N0eWxlW1wiaWNvbi1sYWJlbFwiXX0+JHtpdGVtLm5hbWV9PC9wPmA7XHJcbiAgICB0ZWNoQ29udGFpbmVyLmFwcGVuZENoaWxkKGljb24pO1xyXG4gIH0pO1xyXG59O1xyXG4iLCJpbXBvcnQgc3R5bGUgZnJvbSBcIi4vbmF2YmFyLm1vZHVsZS5zY3NzXCI7XHJcbmltcG9ydCBMSWxvZ28gZnJvbSBcIi4vbmF2bG9nb3MvbGlua2VkaW4uc3ZnXCI7XHJcbmltcG9ydCBHSGxvZ28gZnJvbSBcIi4vbmF2bG9nb3MvZ2l0aHViLnN2Z1wiO1xyXG5pbXBvcnQgR01Mb2dvIGZyb20gXCIuL25hdmxvZ29zL2dtYWlsLnN2Z1wiO1xyXG5pbXBvcnQgUmVsb2dvIGZyb20gXCIuL25hdmxvZ29zL3Jlc3VtZS5zdmdcIjtcclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJOYXYgPSAoZG9jRnJhZykgPT4ge1xyXG4gIGNvbnN0IHJvb3QgPSBkb2NGcmFnLmdldEVsZW1lbnRCeUlkKFwiI3Jvb3RcIik7XHJcblxyXG4gIGNvbnN0IG5hdkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJuYXZcIik7XHJcblxyXG4gIG5hdkNvbnRhaW5lci5pbm5lckhUTUwgPSAvKiBIVE1MICovIGAgPGRpdiBjbGFzcz0ke3N0eWxlW1wiY29udGFpbmVyXCJdfT5cclxuICAgIDxkaXYgY2xhc3M9JHtzdHlsZVtcImNvbnRhY3QtaWNvbi1jb250YWluZXJcIl19PlxyXG4gICAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2FqbDAwMjNcIiBjbGFzcz0ke3N0eWxlW1wiY29udGFjdC1pY29uXCJdfT5cclxuICAgICAgICAke0dIbG9nb308L2FcclxuICAgICAgPlxyXG4gICAgICA8YSBocmVmPVwibWFpbHRvOmF1c3RpbmpsZWUuMEBnbWFpbC5jb21cIiBjbGFzcz0ke3N0eWxlW1wiY29udGFjdC1pY29uXCJdfT5cclxuICAgICAgICAke0dNTG9nb308L2FcclxuICAgICAgPlxyXG4gICAgICA8YVxyXG4gICAgICAgIGhyZWY9XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vYXVzdGluLWxlZS05MWEzNDEyMTUvXCJcclxuICAgICAgICBjbGFzcz0ke3N0eWxlW1wiY29udGFjdC1pY29uXCJdfVxyXG4gICAgICAgID4ke0xJbG9nb308L2FcclxuICAgICAgPlxyXG4gICAgICA8YVxyXG4gICAgICAgIGhyZWY9XCIuL1Jlc3VtZS5wZGZcIlxyXG4gICAgICAgIGRvd25sb2FkPVwiUmVzdW1lLnBkZlwiXHJcbiAgICAgICAgY2xhc3M9JHtzdHlsZVtcImNvbnRhY3QtaWNvblwiXX1cclxuICAgICAgICA+JHtSZWxvZ299PC9hXHJcbiAgICAgID5cclxuICAgICAgPGRpdiBjbGFzcz0ke3N0eWxlW1wiZGl2aWRlci1saW5lXCJdfT48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PmA7XHJcbiAgcm9vdC5hcHBlbmRDaGlsZChuYXZDb250YWluZXIpO1xyXG59O1xyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5jdWJlcyB7XFxuICB6LWluZGV4OiAxO1xcbn1cXG5cXG4uY3ViZXMgLmN1YmUge1xcbiAgei1pbmRleDogMTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGhlaWdodDogMTAwcHg7XFxuICB3aWR0aDogMTAwcHg7XFxuICBtYXJnaW46IDA7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogY3ViZS1mYWRlLWluIDJzIGN1YmljLWJlemllcigwLjE2NSwgMC44NCwgMC40NCwgMSk7XFxuICBhbmltYXRpb246IGN1YmUtZmFkZS1pbiAycyBjdWJpYy1iZXppZXIoMC4xNjUsIDAuODQsIDAuNDQsIDEpO1xcbiAgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGN1YmUtZmFkZS1pbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgY3ViZS1mYWRlLWluIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC41KTtcXG4gIH1cXG59XFxuLmN1YmVzIC5jdWJlICoge1xcbiAgei1pbmRleDogMTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4uY3ViZXMgLmN1YmUgLnNoYWRvdyB7XFxuICBiYWNrZ3JvdW5kOiAjODM2MGMzO1xcbiAgdG9wOiA0MCU7XFxufVxcblxcbi5jdWJlcyAuY3ViZSAuc2lkZXMge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gIC13ZWJraXQtcGVyc3BlY3RpdmU6IDYwMHB4O1xcbiAgcGVyc3BlY3RpdmU6IDYwMHB4O1xcbn1cXG5cXG4uY3ViZXMgLmN1YmUgLnNpZGVzIGRpdiB7XFxuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm07XFxufVxcblxcbi5jdWJlcyAuY3ViZSAuc2lkZXMgLmZyb250IHtcXG4gIHotaW5kZXg6IDEgIWltcG9ydGFudDtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVZKDBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZVkoMGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXG59XFxuXFxuLmN1YmVzIC5jdWJlIC5zaWRlcyAuYmFjayB7XFxuICB6LWluZGV4OiAxICFpbXBvcnRhbnQ7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWSgtMTgwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcbiAgdHJhbnNmb3JtOiByb3RhdGVZKC0xODBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxufVxcblxcbi5jdWJlcyAuY3ViZSAuc2lkZXMgLmxlZnQge1xcbiAgei1pbmRleDogMSAhaW1wb3J0YW50O1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoLTkwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcbiAgdHJhbnNmb3JtOiByb3RhdGVZKC05MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXG59XFxuXFxuLmN1YmVzIC5jdWJlIC5zaWRlcyAucmlnaHQge1xcbiAgei1pbmRleDogMSAhaW1wb3J0YW50O1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoOTBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZVkoOTBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxufVxcblxcbi5jdWJlcyAuY3ViZSAuc2lkZXMgLnRvcCB7XFxuICB6LWluZGV4OiAxICFpbXBvcnRhbnQ7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWCg5MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXG4gIHRyYW5zZm9ybTogcm90YXRlWCg5MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXG59XFxuXFxuLmN1YmVzIC5jdWJlIC5zaWRlcyAuYm90dG9tIHtcXG4gIHotaW5kZXg6IDEgIWltcG9ydGFudDtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVYKC05MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXG4gIHRyYW5zZm9ybTogcm90YXRlWCgtOTBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxufVxcblxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWN1YmVzLmNzcy5tYXAgKi9cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9jdWJlcy9jdWJlcy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxVQUFBO0FBQ0Y7O0FBRUE7RUFDRSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLFNBQUE7RUFDQSxxRUFBQTtFQUNBLDZEQUFBO0VBQ0Esc0JBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsVUFBQTtJQUNBLDZCQUFBO0lBQ0EscUJBQUE7RUFDRjtBQUNGO0FBRUE7RUFDRTtJQUNFLFVBQUE7SUFDQSw2QkFBQTtJQUNBLHFCQUFBO0VBQUY7QUFDRjtBQUdBO0VBQ0UsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUFERjs7QUFJQTtFQUNFLG1CQUFBO0VBQ0EsUUFBQTtBQURGOztBQUlBO0VBQ0Usb0NBQUE7RUFDQSw0QkFBQTtFQUNBLDBCQUFBO0VBQ0Esa0JBQUE7QUFERjs7QUFJQTtFQUNFLG1DQUFBO0VBQ0EsMkJBQUE7RUFDQSxzQkFBQTtBQURGOztBQUlBO0VBQ0UscUJBQUE7RUFDQSxpREFBQTtFQUNBLHlDQUFBO0FBREY7O0FBSUE7RUFDRSxxQkFBQTtFQUNBLG9EQUFBO0VBQ0EsNENBQUE7QUFERjs7QUFJQTtFQUNFLHFCQUFBO0VBQ0EsbURBQUE7RUFDQSwyQ0FBQTtBQURGOztBQUlBO0VBQ0UscUJBQUE7RUFDQSxrREFBQTtFQUNBLDBDQUFBO0FBREY7O0FBSUE7RUFDRSxxQkFBQTtFQUNBLGtEQUFBO0VBQ0EsMENBQUE7QUFERjs7QUFJQTtFQUNFLHFCQUFBO0VBQ0EsbURBQUE7RUFDQSwyQ0FBQTtBQURGOztBQUdBLG9DQUFBXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5jdWJlcyB7XFxyXFxuICB6LWluZGV4OiAxO1xcclxcbn1cXHJcXG5cXHJcXG4uY3ViZXMgLmN1YmUge1xcclxcbiAgei1pbmRleDogMTtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIGhlaWdodDogMTAwcHg7XFxyXFxuICB3aWR0aDogMTAwcHg7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICAtd2Via2l0LWFuaW1hdGlvbjogY3ViZS1mYWRlLWluIDJzIGN1YmljLWJlemllcigwLjE2NSwgMC44NCwgMC40NCwgMSk7XFxyXFxuICBhbmltYXRpb246IGN1YmUtZmFkZS1pbiAycyBjdWJpYy1iZXppZXIoMC4xNjUsIDAuODQsIDAuNDQsIDEpO1xcclxcbiAgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcXHJcXG59XFxyXFxuXFxyXFxuQC13ZWJraXQta2V5ZnJhbWVzIGN1YmUtZmFkZS1pbiB7XFxyXFxuICAwJSB7XFxyXFxuICAgIG9wYWNpdHk6IDA7XFxyXFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xcclxcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgY3ViZS1mYWRlLWluIHtcXHJcXG4gIDAlIHtcXHJcXG4gICAgb3BhY2l0eTogMDtcXHJcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxyXFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC41KTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLmN1YmVzIC5jdWJlICoge1xcclxcbiAgei1pbmRleDogMTtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4uY3ViZXMgLmN1YmUgLnNoYWRvdyB7XFxyXFxuICBiYWNrZ3JvdW5kOiAjODM2MGMzO1xcclxcbiAgdG9wOiA0MCU7XFxyXFxufVxcclxcblxcclxcbi5jdWJlcyAuY3ViZSAuc2lkZXMge1xcclxcbiAgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcclxcbiAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXHJcXG4gIC13ZWJraXQtcGVyc3BlY3RpdmU6IDYwMHB4O1xcclxcbiAgcGVyc3BlY3RpdmU6IDYwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY3ViZXMgLmN1YmUgLnNpZGVzIGRpdiB7XFxyXFxuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcXHJcXG4gIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcXHJcXG4gIHdpbGwtY2hhbmdlOiB0cmFuc2Zvcm07XFxyXFxufVxcclxcblxcclxcbi5jdWJlcyAuY3ViZSAuc2lkZXMgLmZyb250IHtcXHJcXG4gIHotaW5kZXg6IDEgIWltcG9ydGFudDtcXHJcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVZKDBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxyXFxuICB0cmFuc2Zvcm06IHJvdGF0ZVkoMGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXHJcXG59XFxyXFxuXFxyXFxuLmN1YmVzIC5jdWJlIC5zaWRlcyAuYmFjayB7XFxyXFxuICB6LWluZGV4OiAxICFpbXBvcnRhbnQ7XFxyXFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWSgtMTgwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcclxcbiAgdHJhbnNmb3JtOiByb3RhdGVZKC0xODBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxyXFxufVxcclxcblxcclxcbi5jdWJlcyAuY3ViZSAuc2lkZXMgLmxlZnQge1xcclxcbiAgei1pbmRleDogMSAhaW1wb3J0YW50O1xcclxcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoLTkwZGVnKSB0cmFuc2xhdGVaKDUwcHgpO1xcclxcbiAgdHJhbnNmb3JtOiByb3RhdGVZKC05MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXHJcXG59XFxyXFxuXFxyXFxuLmN1YmVzIC5jdWJlIC5zaWRlcyAucmlnaHQge1xcclxcbiAgei1pbmRleDogMSAhaW1wb3J0YW50O1xcclxcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoOTBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxyXFxuICB0cmFuc2Zvcm06IHJvdGF0ZVkoOTBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxyXFxufVxcclxcblxcclxcbi5jdWJlcyAuY3ViZSAuc2lkZXMgLnRvcCB7XFxyXFxuICB6LWluZGV4OiAxICFpbXBvcnRhbnQ7XFxyXFxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWCg5MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXHJcXG4gIHRyYW5zZm9ybTogcm90YXRlWCg5MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXHJcXG59XFxyXFxuXFxyXFxuLmN1YmVzIC5jdWJlIC5zaWRlcyAuYm90dG9tIHtcXHJcXG4gIHotaW5kZXg6IDEgIWltcG9ydGFudDtcXHJcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVYKC05MGRlZykgdHJhbnNsYXRlWig1MHB4KTtcXHJcXG4gIHRyYW5zZm9ybTogcm90YXRlWCgtOTBkZWcpIHRyYW5zbGF0ZVooNTBweCk7XFxyXFxufVxcclxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWN1YmVzLmNzcy5tYXAgKi9cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwicHJlW2NsYXNzKj1sYW5ndWFnZS1dLmxpbmUtbnVtYmVycyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBwYWRkaW5nLWxlZnQ6IDMuOGVtO1xcbiAgY291bnRlci1yZXNldDogbGluZW51bWJlcjtcXG59XFxuXFxucHJlW2NsYXNzKj1sYW5ndWFnZS1dLmxpbmUtbnVtYmVycyA+IGNvZGUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2hpdGUtc3BhY2U6IGluaGVyaXQ7XFxufVxcblxcbi5saW5lLW51bWJlcnMgLmxpbmUtbnVtYmVycy1yb3dzIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgdG9wOiAwO1xcbiAgZm9udC1zaXplOiAxMDAlO1xcbiAgbGVmdDogLTMuOGVtO1xcbiAgd2lkdGg6IDNlbTtcXG4gIC8qIHdvcmtzIGZvciBsaW5lLW51bWJlcnMgYmVsb3cgMTAwMCBsaW5lcyAqL1xcbiAgbGV0dGVyLXNwYWNpbmc6IC0xcHg7XFxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjOTk5O1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuXFxuLmxpbmUtbnVtYmVycy1yb3dzID4gc3BhbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGNvdW50ZXItaW5jcmVtZW50OiBsaW5lbnVtYmVyO1xcbn1cXG5cXG4ubGluZS1udW1iZXJzLXJvd3MgPiBzcGFuOmJlZm9yZSB7XFxuICBjb250ZW50OiBjb3VudGVyKGxpbmVudW1iZXIpO1xcbiAgY29sb3I6ICM5OTk7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBhZGRpbmctcmlnaHQ6IDAuOGVtO1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL25vZGVfbW9kdWxlcy9wcmlzbWpzL3BsdWdpbnMvbGluZS1udW1iZXJzL3ByaXNtLWxpbmUtbnVtYmVycy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDQyxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7QUFDRDs7QUFFQTtFQUNDLGtCQUFBO0VBQ0Esb0JBQUE7QUFDRDs7QUFFQTtFQUNDLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxNQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQVksNENBQUE7RUFDWixvQkFBQTtFQUNBLDRCQUFBO0VBRUEseUJBQUE7RUFDQSxzQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7QUFDRDs7QUFHQztFQUNDLGNBQUE7RUFDQSw2QkFBQTtBQUFGOztBQUdFO0VBQ0MsNEJBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7QUFBSFwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJwcmVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXS5saW5lLW51bWJlcnMge1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRwYWRkaW5nLWxlZnQ6IDMuOGVtO1xcblxcdGNvdW50ZXItcmVzZXQ6IGxpbmVudW1iZXI7XFxufVxcblxcbnByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdLmxpbmUtbnVtYmVycyA+IGNvZGUge1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHR3aGl0ZS1zcGFjZTogaW5oZXJpdDtcXG59XFxuXFxuLmxpbmUtbnVtYmVycyAubGluZS1udW1iZXJzLXJvd3Mge1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHRwb2ludGVyLWV2ZW50czogbm9uZTtcXG5cXHR0b3A6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGxlZnQ6IC0zLjhlbTtcXG5cXHR3aWR0aDogM2VtOyAvKiB3b3JrcyBmb3IgbGluZS1udW1iZXJzIGJlbG93IDEwMDAgbGluZXMgKi9cXG5cXHRsZXR0ZXItc3BhY2luZzogLTFweDtcXG5cXHRib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjOTk5O1xcblxcblxcdC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuXFx0LW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG5cXHQtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuXFx0dXNlci1zZWxlY3Q6IG5vbmU7XFxuXFxufVxcblxcblxcdC5saW5lLW51bWJlcnMtcm93cyA+IHNwYW4ge1xcblxcdFxcdGRpc3BsYXk6IGJsb2NrO1xcblxcdFxcdGNvdW50ZXItaW5jcmVtZW50OiBsaW5lbnVtYmVyO1xcblxcdH1cXG5cXG5cXHRcXHQubGluZS1udW1iZXJzLXJvd3MgPiBzcGFuOmJlZm9yZSB7XFxuXFx0XFx0XFx0Y29udGVudDogY291bnRlcihsaW5lbnVtYmVyKTtcXG5cXHRcXHRcXHRjb2xvcjogIzk5OTtcXG5cXHRcXHRcXHRkaXNwbGF5OiBibG9jaztcXG5cXHRcXHRcXHRwYWRkaW5nLXJpZ2h0OiAwLjhlbTtcXG5cXHRcXHRcXHR0ZXh0LWFsaWduOiByaWdodDtcXG5cXHRcXHR9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qKlxcbiAqIG9rYWlkaWEgdGhlbWUgZm9yIEphdmFTY3JpcHQsIENTUyBhbmQgSFRNTFxcbiAqIExvb3NlbHkgYmFzZWQgb24gTW9ub2thaSB0ZXh0bWF0ZSB0aGVtZSBieSBodHRwOi8vd3d3Lm1vbm9rYWkubmwvXFxuICogQGF1dGhvciBvY29kaWFcXG4gKi9cXG5jb2RlW2NsYXNzKj1sYW5ndWFnZS1dLFxcbnByZVtjbGFzcyo9bGFuZ3VhZ2UtXSB7XFxuICBjb2xvcjogI2Y4ZjhmMjtcXG4gIGJhY2tncm91bmQ6IG5vbmU7XFxuICB0ZXh0LXNoYWRvdzogMCAxcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgZm9udC1mYW1pbHk6IENvbnNvbGFzLCBNb25hY28sIFxcXCJBbmRhbGUgTW9ub1xcXCIsIFxcXCJVYnVudHUgTW9ub1xcXCIsIG1vbm9zcGFjZTtcXG4gIGZvbnQtc2l6ZTogMWVtO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHdoaXRlLXNwYWNlOiBwcmU7XFxuICB3b3JkLXNwYWNpbmc6IG5vcm1hbDtcXG4gIHdvcmQtYnJlYWs6IG5vcm1hbDtcXG4gIHdvcmQtd3JhcDogbm9ybWFsO1xcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG4gIC1tb3otdGFiLXNpemU6IDQ7XFxuICAtby10YWItc2l6ZTogNDtcXG4gIHRhYi1zaXplOiA0O1xcbiAgLXdlYmtpdC1oeXBoZW5zOiBub25lO1xcbiAgLW1vei1oeXBoZW5zOiBub25lO1xcbiAgLW1zLWh5cGhlbnM6IG5vbmU7XFxuICBoeXBoZW5zOiBub25lO1xcbn1cXG5cXG4vKiBDb2RlIGJsb2NrcyAqL1xcbnByZVtjbGFzcyo9bGFuZ3VhZ2UtXSB7XFxuICBwYWRkaW5nOiAxZW07XFxuICBtYXJnaW46IDAuNWVtIDA7XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIGJvcmRlci1yYWRpdXM6IDAuM2VtO1xcbn1cXG5cXG46bm90KHByZSkgPiBjb2RlW2NsYXNzKj1sYW5ndWFnZS1dLFxcbnByZVtjbGFzcyo9bGFuZ3VhZ2UtXSB7XFxuICBiYWNrZ3JvdW5kOiAjMjcyODIyO1xcbn1cXG5cXG4vKiBJbmxpbmUgY29kZSAqL1xcbjpub3QocHJlKSA+IGNvZGVbY2xhc3MqPWxhbmd1YWdlLV0ge1xcbiAgcGFkZGluZzogMC4xZW07XFxuICBib3JkZXItcmFkaXVzOiAwLjNlbTtcXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XFxufVxcblxcbi50b2tlbi5jb21tZW50LFxcbi50b2tlbi5wcm9sb2csXFxuLnRva2VuLmRvY3R5cGUsXFxuLnRva2VuLmNkYXRhIHtcXG4gIGNvbG9yOiAjODI5MmEyO1xcbn1cXG5cXG4udG9rZW4ucHVuY3R1YXRpb24ge1xcbiAgY29sb3I6ICNmOGY4ZjI7XFxufVxcblxcbi50b2tlbi5uYW1lc3BhY2Uge1xcbiAgb3BhY2l0eTogMC43O1xcbn1cXG5cXG4udG9rZW4ucHJvcGVydHksXFxuLnRva2VuLnRhZyxcXG4udG9rZW4uY29uc3RhbnQsXFxuLnRva2VuLnN5bWJvbCxcXG4udG9rZW4uZGVsZXRlZCB7XFxuICBjb2xvcjogI2Y5MjY3MjtcXG59XFxuXFxuLnRva2VuLmJvb2xlYW4sXFxuLnRva2VuLm51bWJlciB7XFxuICBjb2xvcjogI2FlODFmZjtcXG59XFxuXFxuLnRva2VuLnNlbGVjdG9yLFxcbi50b2tlbi5hdHRyLW5hbWUsXFxuLnRva2VuLnN0cmluZyxcXG4udG9rZW4uY2hhcixcXG4udG9rZW4uYnVpbHRpbixcXG4udG9rZW4uaW5zZXJ0ZWQge1xcbiAgY29sb3I6ICNhNmUyMmU7XFxufVxcblxcbi50b2tlbi5vcGVyYXRvcixcXG4udG9rZW4uZW50aXR5LFxcbi50b2tlbi51cmwsXFxuLmxhbmd1YWdlLWNzcyAudG9rZW4uc3RyaW5nLFxcbi5zdHlsZSAudG9rZW4uc3RyaW5nLFxcbi50b2tlbi52YXJpYWJsZSB7XFxuICBjb2xvcjogI2Y4ZjhmMjtcXG59XFxuXFxuLnRva2VuLmF0cnVsZSxcXG4udG9rZW4uYXR0ci12YWx1ZSxcXG4udG9rZW4uZnVuY3Rpb24sXFxuLnRva2VuLmNsYXNzLW5hbWUge1xcbiAgY29sb3I6ICNlNmRiNzQ7XFxufVxcblxcbi50b2tlbi5rZXl3b3JkIHtcXG4gIGNvbG9yOiAjNjZkOWVmO1xcbn1cXG5cXG4udG9rZW4ucmVnZXgsXFxuLnRva2VuLmltcG9ydGFudCB7XFxuICBjb2xvcjogI2ZkOTcxZjtcXG59XFxuXFxuLnRva2VuLmltcG9ydGFudCxcXG4udG9rZW4uYm9sZCB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLnRva2VuLml0YWxpYyB7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcblxcbi50b2tlbi5lbnRpdHkge1xcbiAgY3Vyc29yOiBoZWxwO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9ub2RlX21vZHVsZXMvcHJpc21qcy90aGVtZXMvcHJpc20tb2thaWRpYS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Ozs7RUFBQTtBQU1BOztFQUVDLGNBQUE7RUFDQSxnQkFBQTtFQUNBLHFDQUFBO0VBQ0Esc0VBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBRUEsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUVBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7QUFGRDs7QUFLQSxnQkFBQTtBQUNBO0VBQ0MsWUFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0Esb0JBQUE7QUFGRDs7QUFLQTs7RUFFQyxtQkFBQTtBQUZEOztBQUtBLGdCQUFBO0FBQ0E7RUFDQyxjQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtBQUZEOztBQUtBOzs7O0VBSUMsY0FBQTtBQUZEOztBQUtBO0VBQ0MsY0FBQTtBQUZEOztBQUtBO0VBQ0MsWUFBQTtBQUZEOztBQUtBOzs7OztFQUtDLGNBQUE7QUFGRDs7QUFLQTs7RUFFQyxjQUFBO0FBRkQ7O0FBS0E7Ozs7OztFQU1DLGNBQUE7QUFGRDs7QUFLQTs7Ozs7O0VBTUMsY0FBQTtBQUZEOztBQUtBOzs7O0VBSUMsY0FBQTtBQUZEOztBQUtBO0VBQ0MsY0FBQTtBQUZEOztBQUtBOztFQUVDLGNBQUE7QUFGRDs7QUFLQTs7RUFFQyxpQkFBQTtBQUZEOztBQUlBO0VBQ0Msa0JBQUE7QUFERDs7QUFJQTtFQUNDLFlBQUE7QUFERFwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKipcXG4gKiBva2FpZGlhIHRoZW1lIGZvciBKYXZhU2NyaXB0LCBDU1MgYW5kIEhUTUxcXG4gKiBMb29zZWx5IGJhc2VkIG9uIE1vbm9rYWkgdGV4dG1hdGUgdGhlbWUgYnkgaHR0cDovL3d3dy5tb25va2FpLm5sL1xcbiAqIEBhdXRob3Igb2NvZGlhXFxuICovXFxuXFxuY29kZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdLFxcbnByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdIHtcXG5cXHRjb2xvcjogI2Y4ZjhmMjtcXG5cXHRiYWNrZ3JvdW5kOiBub25lO1xcblxcdHRleHQtc2hhZG93OiAwIDFweCByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuXFx0Zm9udC1mYW1pbHk6IENvbnNvbGFzLCBNb25hY28sICdBbmRhbGUgTW9ubycsICdVYnVudHUgTW9ubycsIG1vbm9zcGFjZTtcXG5cXHRmb250LXNpemU6IDFlbTtcXG5cXHR0ZXh0LWFsaWduOiBsZWZ0O1xcblxcdHdoaXRlLXNwYWNlOiBwcmU7XFxuXFx0d29yZC1zcGFjaW5nOiBub3JtYWw7XFxuXFx0d29yZC1icmVhazogbm9ybWFsO1xcblxcdHdvcmQtd3JhcDogbm9ybWFsO1xcblxcdGxpbmUtaGVpZ2h0OiAxLjU7XFxuXFxuXFx0LW1vei10YWItc2l6ZTogNDtcXG5cXHQtby10YWItc2l6ZTogNDtcXG5cXHR0YWItc2l6ZTogNDtcXG5cXG5cXHQtd2Via2l0LWh5cGhlbnM6IG5vbmU7XFxuXFx0LW1vei1oeXBoZW5zOiBub25lO1xcblxcdC1tcy1oeXBoZW5zOiBub25lO1xcblxcdGh5cGhlbnM6IG5vbmU7XFxufVxcblxcbi8qIENvZGUgYmxvY2tzICovXFxucHJlW2NsYXNzKj1cXFwibGFuZ3VhZ2UtXFxcIl0ge1xcblxcdHBhZGRpbmc6IDFlbTtcXG5cXHRtYXJnaW46IC41ZW0gMDtcXG5cXHRvdmVyZmxvdzogYXV0bztcXG5cXHRib3JkZXItcmFkaXVzOiAwLjNlbTtcXG59XFxuXFxuOm5vdChwcmUpID4gY29kZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdLFxcbnByZVtjbGFzcyo9XFxcImxhbmd1YWdlLVxcXCJdIHtcXG5cXHRiYWNrZ3JvdW5kOiAjMjcyODIyO1xcbn1cXG5cXG4vKiBJbmxpbmUgY29kZSAqL1xcbjpub3QocHJlKSA+IGNvZGVbY2xhc3MqPVxcXCJsYW5ndWFnZS1cXFwiXSB7XFxuXFx0cGFkZGluZzogLjFlbTtcXG5cXHRib3JkZXItcmFkaXVzOiAuM2VtO1xcblxcdHdoaXRlLXNwYWNlOiBub3JtYWw7XFxufVxcblxcbi50b2tlbi5jb21tZW50LFxcbi50b2tlbi5wcm9sb2csXFxuLnRva2VuLmRvY3R5cGUsXFxuLnRva2VuLmNkYXRhIHtcXG5cXHRjb2xvcjogIzgyOTJhMjtcXG59XFxuXFxuLnRva2VuLnB1bmN0dWF0aW9uIHtcXG5cXHRjb2xvcjogI2Y4ZjhmMjtcXG59XFxuXFxuLnRva2VuLm5hbWVzcGFjZSB7XFxuXFx0b3BhY2l0eTogLjc7XFxufVxcblxcbi50b2tlbi5wcm9wZXJ0eSxcXG4udG9rZW4udGFnLFxcbi50b2tlbi5jb25zdGFudCxcXG4udG9rZW4uc3ltYm9sLFxcbi50b2tlbi5kZWxldGVkIHtcXG5cXHRjb2xvcjogI2Y5MjY3MjtcXG59XFxuXFxuLnRva2VuLmJvb2xlYW4sXFxuLnRva2VuLm51bWJlciB7XFxuXFx0Y29sb3I6ICNhZTgxZmY7XFxufVxcblxcbi50b2tlbi5zZWxlY3RvcixcXG4udG9rZW4uYXR0ci1uYW1lLFxcbi50b2tlbi5zdHJpbmcsXFxuLnRva2VuLmNoYXIsXFxuLnRva2VuLmJ1aWx0aW4sXFxuLnRva2VuLmluc2VydGVkIHtcXG5cXHRjb2xvcjogI2E2ZTIyZTtcXG59XFxuXFxuLnRva2VuLm9wZXJhdG9yLFxcbi50b2tlbi5lbnRpdHksXFxuLnRva2VuLnVybCxcXG4ubGFuZ3VhZ2UtY3NzIC50b2tlbi5zdHJpbmcsXFxuLnN0eWxlIC50b2tlbi5zdHJpbmcsXFxuLnRva2VuLnZhcmlhYmxlIHtcXG5cXHRjb2xvcjogI2Y4ZjhmMjtcXG59XFxuXFxuLnRva2VuLmF0cnVsZSxcXG4udG9rZW4uYXR0ci12YWx1ZSxcXG4udG9rZW4uZnVuY3Rpb24sXFxuLnRva2VuLmNsYXNzLW5hbWUge1xcblxcdGNvbG9yOiAjZTZkYjc0O1xcbn1cXG5cXG4udG9rZW4ua2V5d29yZCB7XFxuXFx0Y29sb3I6ICM2NmQ5ZWY7XFxufVxcblxcbi50b2tlbi5yZWdleCxcXG4udG9rZW4uaW1wb3J0YW50IHtcXG5cXHRjb2xvcjogI2ZkOTcxZjtcXG59XFxuXFxuLnRva2VuLmltcG9ydGFudCxcXG4udG9rZW4uYm9sZCB7XFxuXFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbi50b2tlbi5pdGFsaWMge1xcblxcdGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuLnRva2VuLmVudGl0eSB7XFxuXFx0Y3Vyc29yOiBoZWxwO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuLmxhbmd1YWdlLWpzIHtcXG4gIGZvbnQtc2l6ZTogMC44dncgIWltcG9ydGFudDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XFxuICB3b3JkLWJyZWFrOiBicmVhay13b3JkICFpbXBvcnRhbnQ7XFxufVxcblxcbi5jb2RlLXRvb2xiYXIge1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbn1cXG5cXG5wcmUge1xcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcXG4gIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcXG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcCAhaW1wb3J0YW50O1xcbiAgcGFkZGluZzogMTVweCAzMHB4IDE1cHggMTVweDtcXG59XFxuXFxuLmFwcC13cmFwcGVyIHtcXG4gIGhlaWdodDogMTAwdmg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBvdmVyZmxvdy14OiBoaWRkZW47XFxufVxcblxcbmNvZGUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcbn1cXG5cXG5odG1sLFxcbmJvZHkge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuI3Jvb3Qge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLnRvb2xiYXItaXRlbSB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcblxcbi50ZWNoLWljb24ge1xcbiAgZmlsbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xcbn1cXG5cXG4vKiMgc291cmNlTWFwcGluZ1VSTD1tYWluLmNzcy5tYXAgKi9cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvbWFpbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxTQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsOEJBQUE7RUFDUSxzQkFBQTtBQUNWOztBQUVBO0VBQ0UsMkJBQUE7RUFDQSx3Q0FBQTtFQUNBLGlDQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxzQkFBQTtFQUNBLDJCQUFBO0VBQ0EsZ0NBQUE7RUFDQSw0QkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsY0FBQTtFQUNBLHNCQUFBO0FBQ0Y7O0FBRUE7O0VBRUUsYUFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSx3QkFBQTtBQUNGOztBQUVBO0VBQ0UsOEJBQUE7QUFDRjs7QUFDQSxtQ0FBQVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4ubGFuZ3VhZ2UtanMge1xcbiAgZm9udC1zaXplOiAwLjh2dyAhaW1wb3J0YW50O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcXG4gIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQgIWltcG9ydGFudDtcXG59XFxuXFxuLmNvZGUtdG9vbGJhciB7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxufVxcblxcbnByZSB7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcbiAgdGV4dC1hbGlnbjogbGVmdCAhaW1wb3J0YW50O1xcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwICFpbXBvcnRhbnQ7XFxuICBwYWRkaW5nOiAxNXB4IDMwcHggMTVweCAxNXB4O1xcbn1cXG5cXG4uYXBwLXdyYXBwZXIge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXG59XFxuXFxuY29kZSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XFxufVxcblxcbmh0bWwsXFxuYm9keSB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4jcm9vdCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4udG9vbGJhci1pdGVtIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuXFxuLnRlY2gtaWNvbiB7XFxuICBmaWxsOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyk7XFxufVxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPW1haW4uY3NzLm1hcCAqL1wiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gZnJvbSBcIi4uL2ZvbnRzL2NpcmN1bGFyLWJvbGQud29mZjJcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyBmcm9tIFwiLi4vZm9udHMvVmFyZWxhUm91bmQtUmVndWxhci50dGZcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIm1haW5Gb250XFxcIjtcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIik7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJzZWNvbmRhcnlcXFwiO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKTtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2xhcHRvcC0tMUN1R0wge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBwYWRkaW5nLXRvcDogNTAuMjUlO1xcbiAgYmFja2dyb3VuZDogIzFhMWUyYztcXG4gIGJvcmRlcjogMTVweCBzb2xpZCAjM2YzZjQxO1xcbiAgYm9yZGVyLXRvcDogMjBweCBzb2xpZCAjM2YzZjQxO1xcbiAgYm9yZGVyLXJhZGl1czogMTRweCAxNHB4IDAgMDtcXG4gIGJveC1zaGFkb3c6IDAgMCAwIDFweCAjZDFkMmQ0O1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGFwdG9wLS0xQ3VHTDpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBib3R0b206IC0zNXB4O1xcbiAgYmFja2dyb3VuZDogI2U2ZThlNztcXG4gIGhlaWdodDogMjBweDtcXG4gIHdpZHRoOiAxMzAlO1xcbiAgYm9yZGVyLXJhZGl1czogMCAwIDEwcHggMTBweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2xhcHRvcC0tMUN1R0w6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICB0b3A6IC0xMnB4O1xcbiAgd2lkdGg6IDNweDtcXG4gIGhlaWdodDogM3B4O1xcbiAgYmFja2dyb3VuZDogI2U2ZThlNztcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG59XFxuXFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2Jhc2UtLTFGMEs4IHtcXG4gIGJvdHRvbTogLTI1cHg7XFxuICBiYWNrZ3JvdW5kOiAjZDFkMmQ0O1xcbiAgaGVpZ2h0OiAxMHB4O1xcbiAgbWF4LXdpZHRoOiAxMzAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fYmFzZS0tMUYwSzg6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgYm9yZGVyLXJhZGl1czogMCAwIDEwcHggMTBweDtcXG4gIGhlaWdodDogMTBweDtcXG4gIG1heC13aWR0aDogODBweDtcXG4gIGJhY2tncm91bmQ6ICNiY2JkYzE7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19iYXNlLS0xRjBLODphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGhlaWdodDogMjBweDtcXG4gIG1heC13aWR0aDogMTMwJTtcXG4gIGJvcmRlci1yYWRpdXM6IDAgMCAxMHB4IDEwcHg7XFxuICBib3gtc2hhZG93OiAwcHggMTBweCAzNnB4IC0ycHggcmdiYSgwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSB7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoLTEzZGVnLCAjMmM1ZTkyLCAjNTUyZjZkKTtcXG4gIHBhZGRpbmc6IDIwcHggMzBweCAyMHB4IDMwcHg7XFxuICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLWNvbnRhaW5lci0tMzdIOVcge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDcwJTtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLWNvbnRhaW5lci0tMzdIOVcgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2xhcHRvcC1zdmctLTNXUkViIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItY29udGFpbmVyLS0zN0g5VyAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItLTJXRmxIIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBvdmVyZmxvdy15OiBoaWRkZW47XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBmb250LWZhbWlseTogbW9uYWNvLCBDb25zb2xhcywgXFxcIkx1Y2lkYSBDb25zb2xlXFxcIiwgbW9ub3NwYWNlO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFhMWUyYztcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLWNvbnRhaW5lci0tMzdIOVcgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLS0yV0ZsSCAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGluZS1udW1iZXItY29udGFpbmVyLS0yQlM3QiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBjb2xvcjogIzU1NzE4ZDtcXG4gIGdhcDogM3B4O1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItY29udGFpbmVyLS0zN0g5VyAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItLTJXRmxIIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19saW5lLW51bWJlci1jb250YWluZXItLTJCUzdCIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19saW5lLWNvbnRhaW5lci0tMldzWnkge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLWNvbnRhaW5lci0tMzdIOVcgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtZWRpdG9yLS0yV0ZsSCAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGluZS1udW1iZXItY29udGFpbmVyLS0yQlM3QiAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGluZS1jb250YWluZXItLTJXc1p5IC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19saW5lLW51bWJlci0tbTR4SVIge1xcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItY29udGFpbmVyLS0zN0g5VyAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29kZS1lZGl0b3ItLTJXRmxIIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19saW5lLW51bWJlci1jb250YWluZXItLTJCUzdCIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19saW5lLWNvbnRhaW5lci0tMldzWnkgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtbGluZS0tMzFyTjUge1xcbiAgZGlzcGxheTogaW5saW5lO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci1jb250YWluZXItLTM3SDlXIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci0tMldGbEggLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NsaWVudC1lZGl0b3ItLTFFdVRIIHtcXG4gIHdpZHRoOiA1MCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBib3JkZXItcmlnaHQ6IDAuNXB4IHNvbGlkIGdyYXk7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci1jb250YWluZXItLTM3SDlXIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci0tMldGbEggLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX3NlcnZlci1lZGl0b3ItLTFvb0NxIHtcXG4gIHdpZHRoOiA1MCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19tYWluLWNvbnRlbnQtLTJjT1dIIHtcXG4gIHotaW5kZXg6IDM7XFxuICBmb250LWZhbWlseTogXFxcIm1haW5Gb250XFxcIjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmb250LXNpemU6IDM2cHg7XFxuICBoZWlnaHQ6IGF1dG87XFxuICBnYXA6IDUwcHg7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgbWF4LXdpZHRoOiAxNTAwcHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX21haW4tY29udGVudC0tMmNPV0ggLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX3RleHQtY29udGVudC0tanVHQmMge1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgd2lkdGg6IDMwJTtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDkyMHB4KSB7XFxuICAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbWFpbi1jb250ZW50LS0yY09XSCAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fdGV4dC1jb250ZW50LS1qdUdCYyB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbWFpbi1jb250ZW50LS0yY09XSCAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fdGV4dC1jb250ZW50LS1qdUdCYyAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGluZS1oZWFkZXItLTItLTdNIHtcXG4gIG1hcmdpbi1ib3R0b206IDI1cHg7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19tYWluLWNvbnRlbnQtLTJjT1dIIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX190ZXh0LWNvbnRlbnQtLWp1R0JjIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX190ZXh0LWNvbnRhaW5lci0tOVpxYUUge1xcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogMzBweCAxM3B4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY29udGFpbmVyLS0xbmZyQSAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbWFpbi1jb250ZW50LS0yY09XSCAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fdGV4dC1jb250ZW50LS1qdUdCYyAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fdGV4dC1jb250YWluZXItLTlacWFFIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19tYWluLWhlYWRlci0tWjlzZG0ge1xcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcXG4gIGJhY2tncm91bmQ6ICMxZTMyNjQ7XFxuICBwYWRkaW5nOiA1cHggODBweCA1cHggMTNweDtcXG4gIG1hcmdpbi1sZWZ0OiAtMzBweDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgbGluZS1oZWlnaHQ6IDQwcHg7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19tYWluLWNvbnRlbnQtLTJjT1dIIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX190ZXh0LWNvbnRlbnQtLWp1R0JjIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX190ZXh0LWNvbnRhaW5lci0tOVpxYUUgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX3JlYWN0LWhlYWRlci0tZDhrR28ge1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgei1pbmRleDogMTtcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxufVxcbi5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb250YWluZXItLTFuZnJBIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19tYWluLWNvbnRlbnQtLTJjT1dIIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX190ZXh0LWNvbnRlbnQtLWp1R0JjIC5zcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19kZXNjcmlwdGlvbi0tMkZBeTUge1xcbiAgZm9udC1mYW1pbHk6IHNlY29uZGFyeTtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIHJpZ2h0OiAwO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XFxuICBsaW5lLWhlaWdodDogMjNweDtcXG4gIHRvcDogMDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA5MjBweCkge1xcbiAgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckEgLnNyYy1hYm91dC1hYm91dC1tb2R1bGVfX21haW4tY29udGVudC0tMmNPV0gge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XFxuICB9XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA1NzZweCkgYW5kIChtYXgtd2lkdGg6IDc2Ny45OHB4KSB7XFxuICAuc3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbWFpbi1jb250ZW50LS0yY09XSCB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcXG4gIH1cXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2Fib3V0L2Fib3V0Lm1vZHVsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsdUJBQUE7RUFDQSw0REFBQTtBQUNGO0FBQ0E7RUFDRSx3QkFBQTtFQUNBLCtEQUFBO0FBQ0Y7QUFnQkE7RUFDRSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQWpCTztFQWtCUCwwQkFBQTtFQUNBLDhCQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtBQWRGO0FBZUU7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQTFCRztFQTJCSCxZQUFBO0VBQ0EsV0F2QlE7RUF3QlIsNEJBQUE7RUF0QkYsa0JBQUE7RUFDQSxTQUFBO0VBQ0EsMkJBQUE7QUFVRjtBQWFFO0VBQ0UsV0FBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQXJDRztFQXNDSCxrQkFBQTtFQS9CRixrQkFBQTtFQUNBLFNBQUE7RUFDQSwyQkFBQTtBQXFCRjs7QUFZQTtFQUNFLGFBQUE7RUFDQSxtQkF4Q007RUF5Q04sWUFBQTtFQUNBLGVBekNVO0VBRVYsa0JBQUE7RUFDQSxTQUFBO0VBQ0EsMkJBQUE7QUErQkY7QUFRRTtFQUNFLFdBQUE7RUFDQSw0QkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBbERHO0VBSUwsa0JBQUE7RUFDQSxTQUFBO0VBQ0EsMkJBQUE7QUF5Q0Y7QUFNRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxlQXZEUTtFQXdEUiw0QkFBQTtFQUNBLGlEQUFBO0FBSko7O0FBT0E7RUFDRSxxREFBQTtFQUNBLDRCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQWtEQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUFyREY7QUFBRTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7QUFFSjtBQUNJO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFDTjtBQUNJO0VBQ0UsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLGtCQUFBO0VBQ0EsMERBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0FBQ047QUFBTTtFQUNFLGFBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxRQUFBO0FBRVI7QUFEUTtFQUNFLGFBQUE7QUFHVjtBQUZVO0VBQ0Usa0JBQUE7QUFJWjtBQUZVO0VBQ0UsZUFBQTtFQUNBLFdBQUE7QUFJWjtBQUFNO0VBQ0UsVUFBQTtFQUNBLFlBQUE7RUFDQSw4QkFBQTtBQUVSO0FBQU07RUFDRSxVQUFBO0VBQ0EsWUFBQTtBQUVSO0FBT0U7RUFDRSxVQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFMSjtBQU1JO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0VBSUEsVUFBQTtBQVBOO0FBSU07RUFIRjtJQUlJLFdBQUE7RUFETjtBQUNGO0FBR007RUFDRSxtQkFBQTtBQURSO0FBR007RUFDRSxxQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7QUFEUjtBQUVRO0VBQ0UsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFBVjtBQUVRO0VBQ0UsWUFBQTtFQUNBLFVBQUE7RUFDQSxtQkFBQTtBQUFWO0FBR007RUFDRSxzQkFBQTtFQUNBLGVBQUE7RUFDQSxRQUFBO0VBQ0EsYUFBQTtFQUNBLHFDQUFBO0VBQ0EsaUJBQUE7RUFDQSxNQUFBO0VBQ0EsZ0JBQUE7QUFEUjtBQUlJO0VBeERGO0lBeURJLDhCQUFBO0VBREo7QUFDRjs7QUFNQTtFQUNFO0lBQ0UsOEJBQUE7RUFIRjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcclxcbiAgZm9udC1mYW1pbHk6IFxcXCJtYWluRm9udFxcXCI7XFxyXFxuICBzcmM6IHVybChcXFwiLi4vZm9udHMvY2lyY3VsYXItYm9sZC53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKTtcXHJcXG59XFxyXFxuQGZvbnQtZmFjZSB7XFxyXFxuICBmb250LWZhbWlseTogXFxcInNlY29uZGFyeVxcXCI7XFxyXFxuICBzcmM6IHVybChcXFwiLi4vZm9udHMvVmFyZWxhUm91bmQtUmVndWxhci50dGZcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxyXFxufVxcclxcbiRiYWNrZ3JvdW5kOiAjMmZhYzY2O1xcclxcbiRiYXNlOiAjZTZlOGU3O1xcclxcbiRzY3JlZW46ICMxYTFlMmM7XFxyXFxuJGZyYW1lOiAjM2YzZjQxO1xcclxcbiRvcGVuOiAjYmNiZGMxO1xcclxcbiRiYXNlMjogI2QxZDJkNDtcXHJcXG4kYmFzZVdpZHRoOiAxMzAlO1xcclxcbkBtaXhpbiBhbGlnbi1ob3Jpem9udGFsIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIGxlZnQ6IDUwJTtcXHJcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXHJcXG59XFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDU0MHB4KSB7XFxyXFxuICAkYmFzZVdpZHRoOiAxMzAlO1xcclxcbn1cXHJcXG4ubGFwdG9wIHtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIG1hcmdpbjogMCBhdXRvO1xcclxcbiAgcGFkZGluZy10b3A6IDUwLjI1JTtcXHJcXG4gIGJhY2tncm91bmQ6ICRzY3JlZW47XFxyXFxuICBib3JkZXI6IDE1cHggc29saWQgJGZyYW1lO1xcclxcbiAgYm9yZGVyLXRvcDogMjBweCBzb2xpZCAkZnJhbWU7XFxyXFxuICBib3JkZXItcmFkaXVzOiAxNHB4IDE0cHggMCAwO1xcclxcbiAgYm94LXNoYWRvdzogMCAwIDAgMXB4ICRiYXNlMjtcXHJcXG4gICY6YmVmb3JlIHtcXHJcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxyXFxuICAgIGJvdHRvbTogLTM1cHg7XFxyXFxuICAgIGJhY2tncm91bmQ6ICRiYXNlO1xcclxcbiAgICBoZWlnaHQ6IDIwcHg7XFxyXFxuICAgIHdpZHRoOiAkYmFzZVdpZHRoO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xcclxcbiAgICBAaW5jbHVkZSBhbGlnbi1ob3Jpem9udGFsO1xcclxcbiAgfVxcclxcbiAgJjphZnRlciB7XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcclxcbiAgICB0b3A6IC0xMnB4O1xcclxcbiAgICB3aWR0aDogM3B4O1xcclxcbiAgICBoZWlnaHQ6IDNweDtcXHJcXG4gICAgYmFja2dyb3VuZDogJGJhc2U7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgQGluY2x1ZGUgYWxpZ24taG9yaXpvbnRhbDtcXHJcXG4gIH1cXHJcXG59XFxyXFxuLmJhc2Uge1xcclxcbiAgYm90dG9tOiAtMjVweDtcXHJcXG4gIGJhY2tncm91bmQ6ICRiYXNlMjtcXHJcXG4gIGhlaWdodDogMTBweDtcXHJcXG4gIG1heC13aWR0aDogJGJhc2VXaWR0aDtcXHJcXG4gIEBpbmNsdWRlIGFsaWduLWhvcml6b250YWw7XFxyXFxuICAmOmJlZm9yZSB7XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwcHg7XFxyXFxuICAgIG1heC13aWR0aDogODBweDtcXHJcXG4gICAgYmFja2dyb3VuZDogJG9wZW47XFxyXFxuICAgIEBpbmNsdWRlIGFsaWduLWhvcml6b250YWw7XFxyXFxuICB9XFxyXFxuICAmOmFmdGVyIHtcXHJcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgaGVpZ2h0OiAyMHB4O1xcclxcbiAgICBtYXgtd2lkdGg6ICRiYXNlV2lkdGg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDAgMCAxMHB4IDEwcHg7XFxyXFxuICAgIGJveC1zaGFkb3c6IDBweCAxMHB4IDM2cHggLTJweCByZ2JhKDAsIDAsIDAsIDAuNCk7XFxyXFxuICB9XFxyXFxufVxcclxcbi5jb250YWluZXIge1xcclxcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KC0xM2RlZywgIzJjNWU5MiwgIzU1MmY2ZCk7XFxyXFxuICBwYWRkaW5nOiAyMHB4IDMwcHggMjBweCAzMHB4O1xcclxcbiAgb3ZlcmZsb3cteTogYXV0bztcXHJcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcclxcbiAgLmNvZGUtZWRpdG9yLWNvbnRhaW5lciB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICB3aWR0aDogNzAlO1xcclxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogOTIwcHgpIHtcXHJcXG4gICAgfVxcclxcbiAgICAubGFwdG9wLXN2ZyB7XFxyXFxuICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICB9XFxyXFxuICAgIC5jb2RlLWVkaXRvciB7XFxyXFxuICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICBvdmVyZmxvdy15OiBoaWRkZW47XFxyXFxuICAgICAgdG9wOiAwO1xcclxcbiAgICAgIGJvdHRvbTogMDtcXHJcXG4gICAgICBsZWZ0OiAwO1xcclxcbiAgICAgIHJpZ2h0OiAwO1xcclxcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgICBmb250LWZhbWlseTogbW9uYWNvLCBDb25zb2xhcywgXFxcIkx1Y2lkYSBDb25zb2xlXFxcIiwgbW9ub3NwYWNlO1xcclxcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXHJcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWExZTJjO1xcclxcbiAgICAgIC5saW5lLW51bWJlci1jb250YWluZXIge1xcclxcbiAgICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgICAgY29sb3I6ICM1NTcxOGQ7XFxyXFxuICAgICAgICBnYXA6IDNweDtcXHJcXG4gICAgICAgIC5saW5lLWNvbnRhaW5lciB7XFxyXFxuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgICAgICAgIC5saW5lLW51bWJlciB7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcclxcbiAgICAgICAgICB9XFxyXFxuICAgICAgICAgIC5jb2RlLWxpbmUge1xcclxcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZTtcXHJcXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgICAgfVxcclxcbiAgICAgICAgfVxcclxcbiAgICAgIH1cXHJcXG4gICAgICAuY2xpZW50LWVkaXRvciB7XFxyXFxuICAgICAgICB3aWR0aDogNTAlO1xcclxcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAwLjVweCBzb2xpZCBncmF5O1xcclxcbiAgICAgIH1cXHJcXG4gICAgICAuc2VydmVyLWVkaXRvciB7XFxyXFxuICAgICAgICB3aWR0aDogNTAlO1xcclxcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxyXFxuICAubWFpbi1jb250ZW50IHtcXHJcXG4gICAgei1pbmRleDogMztcXHJcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJtYWluRm9udFxcXCI7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZvbnQtc2l6ZTogMzZweDtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbiAgICBnYXA6IDUwcHg7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHg7XFxyXFxuICAgIG1heC13aWR0aDogMTUwMHB4O1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIC50ZXh0LWNvbnRlbnQge1xcclxcbiAgICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDkyMHB4KSB7XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgd2lkdGg6IDMwJTtcXHJcXG4gICAgICAubGluZS1oZWFkZXIge1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjVweDtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgLnRleHQtY29udGFpbmVyIHtcXHJcXG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XFxyXFxuICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgIHBhZGRpbmc6IDMwcHggMTNweDtcXHJcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgICAgIC5tYWluLWhlYWRlciB7XFxyXFxuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XFxyXFxuICAgICAgICAgIGJhY2tncm91bmQ6ICMxZTMyNjQ7XFxyXFxuICAgICAgICAgIHBhZGRpbmc6IDVweCA4MHB4IDVweCAxM3B4O1xcclxcbiAgICAgICAgICBtYXJnaW4tbGVmdDogLTMwcHg7XFxyXFxuICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcXHJcXG4gICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXHJcXG4gICAgICAgICAgd2lkdGg6IGZpdC1jb250ZW50O1xcclxcbiAgICAgICAgICBsaW5lLWhlaWdodDogNDBweDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgICAgIC5yZWFjdC1oZWFkZXIge1xcclxcbiAgICAgICAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgICAgICAgIHotaW5kZXg6IDE7XFxyXFxuICAgICAgICAgIGhlaWdodDogZml0LWNvbnRlbnQ7XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgfVxcclxcbiAgICAgIC5kZXNjcmlwdGlvbiB7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogc2Vjb25kYXJ5O1xcclxcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xcclxcbiAgICAgICAgcmlnaHQ6IDA7XFxyXFxuICAgICAgICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyM3B4O1xcclxcbiAgICAgICAgdG9wOiAwO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcXHJcXG4gICAgICB9XFxyXFxuICAgIH1cXHJcXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDkyMHB4KSB7XFxyXFxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbi1yZXZlcnNlO1xcclxcbiAgICB9XFxyXFxuICB9XFxyXFxufVxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA1NzUuOThweCkge1xcclxcbn1cXHJcXG5AbWVkaWEgKG1pbi13aWR0aDogNTc2cHgpIGFuZCAobWF4LXdpZHRoOiA3NjcuOThweCkge1xcclxcbiAgLm1haW4tY29udGVudCB7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5sb2NhbHMgPSB7XG5cdFwibGFwdG9wXCI6IFwic3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGFwdG9wLS0xQ3VHTFwiLFxuXHRcImJhc2VcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19iYXNlLS0xRjBLOFwiLFxuXHRcImNvbnRhaW5lclwiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvbnRhaW5lci0tMW5mckFcIixcblx0XCJjb2RlLWVkaXRvci1jb250YWluZXJcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci1jb250YWluZXItLTM3SDlXXCIsXG5cdFwibGFwdG9wLXN2Z1wiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2xhcHRvcC1zdmctLTNXUkViXCIsXG5cdFwiY29kZS1lZGl0b3JcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19jb2RlLWVkaXRvci0tMldGbEhcIixcblx0XCJsaW5lLW51bWJlci1jb250YWluZXJcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19saW5lLW51bWJlci1jb250YWluZXItLTJCUzdCXCIsXG5cdFwibGluZS1jb250YWluZXJcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19saW5lLWNvbnRhaW5lci0tMldzWnlcIixcblx0XCJsaW5lLW51bWJlclwiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2xpbmUtbnVtYmVyLS1tNHhJUlwiLFxuXHRcImNvZGUtbGluZVwiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2NvZGUtbGluZS0tMzFyTjVcIixcblx0XCJjbGllbnQtZWRpdG9yXCI6IFwic3JjLWFib3V0LWFib3V0LW1vZHVsZV9fY2xpZW50LWVkaXRvci0tMUV1VEhcIixcblx0XCJzZXJ2ZXItZWRpdG9yXCI6IFwic3JjLWFib3V0LWFib3V0LW1vZHVsZV9fc2VydmVyLWVkaXRvci0tMW9vQ3FcIixcblx0XCJtYWluLWNvbnRlbnRcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX19tYWluLWNvbnRlbnQtLTJjT1dIXCIsXG5cdFwidGV4dC1jb250ZW50XCI6IFwic3JjLWFib3V0LWFib3V0LW1vZHVsZV9fdGV4dC1jb250ZW50LS1qdUdCY1wiLFxuXHRcImxpbmUtaGVhZGVyXCI6IFwic3JjLWFib3V0LWFib3V0LW1vZHVsZV9fbGluZS1oZWFkZXItLTItLTdNXCIsXG5cdFwidGV4dC1jb250YWluZXJcIjogXCJzcmMtYWJvdXQtYWJvdXQtbW9kdWxlX190ZXh0LWNvbnRhaW5lci0tOVpxYUVcIixcblx0XCJtYWluLWhlYWRlclwiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX21haW4taGVhZGVyLS1aOXNkbVwiLFxuXHRcInJlYWN0LWhlYWRlclwiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX3JlYWN0LWhlYWRlci0tZDhrR29cIixcblx0XCJkZXNjcmlwdGlvblwiOiBcInNyYy1hYm91dC1hYm91dC1tb2R1bGVfX2Rlc2NyaXB0aW9uLS0yRkF5NVwiXG59O1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gZnJvbSBcIi4uL2ZvbnRzL2NpcmN1bGFyLWJvbGQud29mZjJcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwibGFuZGluZ0ZvbnRcXFwiO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKTtcXG59XFxuKiB7XFxuICBtYXJnaW46IDA7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0ge1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCMyYzVlOTIsICM1NTJmNmQpO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBwYWRkaW5nOiAzMHB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwibGFuZGluZ0ZvbnRcXFwiO1xcbiAgbWF4LXdpZHRoOiA5NTBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA5NTBweCkge1xcbiAgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIHtcXG4gICAgbWF4LXdpZHRoOiA3NTBweDtcXG4gIH1cXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAxMHB4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDc5NXB4KSB7XFxuICAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIH1cXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RleHQtY29udGFpbmVyLS0yMWdSXyB7XFxuICB6LWluZGV4OiA1O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGNvbG9yOiBibGFjaztcXG4gIHdpZHRoOiAzMy4zMzMzMzMzMyU7XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgcGFkZGluZy1yaWdodDogMTVweDtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDc5NXB4KSB7XFxuICAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGV4dC1jb250YWluZXItLTIxZ1JfIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHBhZGRpbmc6IDBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgfVxcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGV4dC1jb250YWluZXItLTIxZ1JfIHNwYW4ge1xcbiAgei1pbmRleDogNTtcXG4gIHBhZGRpbmc6IDEzcHg7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBjb2xvcjogd2hpdGU7XFxuICBtYXJnaW4tbGVmdDogMTVweDtcXG4gIGJveC1zaGFkb3c6IDAgMi44cHggMi4ycHggcmdiYSgxMzEsIDk2LCAxOTUsIDAuNCksIDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksIDAgMTIuNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA2KSwgMCAyMi4zcHggMTcuOXB4IHJnYmEoMCwgMCwgMCwgMC4wNzIpLCAwIDQxLjhweCAzMy40cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksIDAgMTAwcHggODBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGV4dC1jb250YWluZXItLTIxZ1JfIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fbWFpbi10aXRsZS0tMWxUd3Uge1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIG1hcmdpbi1ib3R0b206IDNyZW07XFxuICBmb250LXNpemU6IDgwcHg7XFxuICBsaW5lLWhlaWdodDogMTtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDEwOTRweCkge1xcbiAgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RleHQtY29udGFpbmVyLS0yMWdSXyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX21haW4tdGl0bGUtLTFsVHd1IHtcXG4gICAgZm9udC1zaXplOiA2MHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNzk1cHgpIHtcXG4gIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fd3JhcHBlci0tMTgyUm0gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NvbnRhaW5lci0tMml3ckcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZXh0LWNvbnRhaW5lci0tMjFnUl8gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19tYWluLXRpdGxlLS0xbFR3dSB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA0OTBweCkge1xcbiAgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RleHQtY29udGFpbmVyLS0yMWdSXyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX21haW4tdGl0bGUtLTFsVHd1IHtcXG4gICAgZm9udC1zaXplOiA1MHB4O1xcbiAgfVxcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY2VudGVyLWNvbnRhaW5lci0tMkxGUUcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGV4dC1jb250YWluZXItLTIxZ1JfIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fZGVzY3JpcHRpb24tLTJYeEpEIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBmb250LXNpemU6IDI2cHg7XFxuICBsaW5lLWhlaWdodDogMS4yO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDEwOTRweCkge1xcbiAgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX193cmFwcGVyLS0xODJSbSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2NlbnRlci1jb250YWluZXItLTJMRlFHIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fY29udGFpbmVyLS0yaXdyRyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RleHQtY29udGFpbmVyLS0yMWdSXyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2Rlc2NyaXB0aW9uLS0yWHhKRCB7XFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gIH1cXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pbWFnZS1jb250YWluZXItLTE2UEk3IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGdhcDogNnB4O1xcbn1cXG5AbWVkaWEgKG1pbi13aWR0aDogOTUwcHgpIHtcXG4gIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faW1hZ2UtY29udGFpbmVyLS0xNlBJNyB7XFxuICAgIHdpZHRoOiA2Ni42NjY2NjY2NyU7XFxuICB9XFxufVxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faW1hZ2UtY29udGFpbmVyLS0xNlBJNyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3Byb2plY3QtY29udGFpbmVyLS0yYWgxQiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGZsZXg6IDAgMCAzMi41JTtcXG4gIGJveC1zaGFkb3c6IDAgMi44cHggMi4ycHggcmdiYSgwLCAwLCAwLCAwLjAzNCksIDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksIDAgMTIuNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA2KSwgMCAyMi4zcHggMTcuOXB4IHJnYmEoMCwgMCwgMCwgMC4wNzIpLCAwIDQxLjhweCAzMy40cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksIDAgMTAwcHggODBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3JkZXI6IHRyYW5zcGFyZW50O1xcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNTQwcHgpIHtcXG4gIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faW1hZ2UtY29udGFpbmVyLS0xNlBJNyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3Byb2plY3QtY29udGFpbmVyLS0yYWgxQiB7XFxuICAgIGZsZXg6IDAgMCAzMi4zJTtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDQ1MHB4KSB7XFxuICAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ltYWdlLWNvbnRhaW5lci0tMTZQSTcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19wcm9qZWN0LWNvbnRhaW5lci0tMmFoMUIge1xcbiAgICBmbGV4OiAwIDAgMzElO1xcbiAgfVxcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ltYWdlLWNvbnRhaW5lci0tMTZQSTcgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19wcm9qZWN0LWNvbnRhaW5lci0tMmFoMUIgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19naXQtaWNvbi0tMVhmSVQge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pbWFnZS1jb250YWluZXItLTE2UEk3IC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcHJvamVjdC1jb250YWluZXItLTJhaDFCOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC45KTtcXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pbWFnZS1jb250YWluZXItLTE2UEk3IC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcHJvamVjdC1jb250YWluZXItLTJhaDFCOmhvdmVyIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fZ2l0LWljb24tLTFYZklUIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGZpbGw6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KTtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIG1hcmdpbjogYXV0bztcXG4gIHdpZHRoOiA1NXB4O1xcbiAgaGVpZ2h0OiA1NXB4O1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faW1hZ2UtY29udGFpbmVyLS0xNlBJNyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3Byb2plY3QtY29udGFpbmVyLS0yYWgxQjpob3ZlciAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3Byb2plY3QtaW1hZ2UtLTMyYThrIHtcXG4gIG9wYWNpdHk6IDAuMztcXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pbWFnZS1jb250YWluZXItLTE2UEk3IC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcHJvamVjdC1jb250YWluZXItLTJhaDFCIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcG9ydGZvbGlvLWltYWdlLS0yVDgyVyB7XFxuICBvcGFjaXR5OiAwLjUgIWltcG9ydGFudDtcXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pbWFnZS1jb250YWluZXItLTE2UEk3IC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcHJvamVjdC1jb250YWluZXItLTJhaDFCIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcHJvamVjdC1pbWFnZS0tMzJhOGsge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG4gIG9wYWNpdHk6IDAuODtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYmFja2dyb3VuZDogd2hpdGU7XFxufVxcblxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC13cmFwcGVyLS0xUlJyMSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIGdhcDogMTVweDtcXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLXdyYXBwZXItLTFSUnIxIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC1jb250YWluZXItdGl0bGUtLTFwQTROIHtcXG4gIGJvcmRlci1ib3R0b206IDAuM3B4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XFxuICBmb250LXNpemU6IDIzcHg7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3OTVweCkge1xcbiAgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLXdyYXBwZXItLTFSUnIxIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC1jb250YWluZXItdGl0bGUtLTFwQTROIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIH1cXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLXdyYXBwZXItLTFSUnIxIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC1pY29uLWNvbnRhaW5lci0tTlBrR08ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGJveC1zaGFkb3c6IDAgMi44cHggMi4ycHggcmdiYSgxMzEsIDk2LCAxOTUsIDAuNCksIDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksIDAgMTIuNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA2KSwgMCAyMi4zcHggMTcuOXB4IHJnYmEoMCwgMCwgMCwgMC4wNzIpLCAwIDQxLjhweCAzMy40cHggcmdiYSgwLCAwLCAwLCAwLjA4NiksIDAgMTAwcHggODBweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcXG4gIGdhcDogMjBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxufVxcbi5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC13cmFwcGVyLS0xUlJyMSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtaWNvbi1jb250YWluZXItLU5Qa0dPIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faWNvbi1jb250YWluZXItLXktc2hzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNHB4KTtcXG4gIHdpZHRoOiA1JTtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNDkwcHgpIHtcXG4gIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC13cmFwcGVyLS0xUlJyMSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtaWNvbi1jb250YWluZXItLU5Qa0dPIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faWNvbi1jb250YWluZXItLXktc2hzIHtcXG4gICAgd2lkdGg6IDEwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgfVxcbn1cXG4uc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtd3JhcHBlci0tMVJScjEgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLWljb24tY29udGFpbmVyLS1OUGtHTyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ljb24tY29udGFpbmVyLS15LXNocyAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2ljb24tbGFiZWwtLTJpQXNCIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHotaW5kZXg6IDU7XFxuICBjb2xvcjogd2hpdGU7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNDkwcHgpIHtcXG4gIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC13cmFwcGVyLS0xUlJyMSAuc3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtaWNvbi1jb250YWluZXItLU5Qa0dPIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faWNvbi1jb250YWluZXItLXktc2hzIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faWNvbi1sYWJlbC0tMmlBc0Ige1xcbiAgICBmb250LXNpemU6IDAuNXJlbTtcXG4gIH1cXG59XFxuLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLXdyYXBwZXItLTFSUnIxIC5zcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGVjaC1pY29uLWNvbnRhaW5lci0tTlBrR08gLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pY29uLWNvbnRhaW5lci0teS1zaHMgLnNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLWljb24tLTE4SHlzIHtcXG4gIGZpbGw6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2xhbmRpbmcvbGFuZGluZy5tb2R1bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLDBCQUFBO0VBQ0EsNERBQUE7QUFDRjtBQUNBO0VBQ0UsU0FBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxVQUFBO0FBQ0Y7O0FBQ0E7RUFDRSw2Q0FBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUFFRjtBQURFO0VBQ0UsMEJBQUE7RUFDQSxnQkFBQTtFQUlBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBQUo7QUFMSTtFQUhGO0lBSUksZ0JBQUE7RUFRSjtBQUNGO0FBSkk7RUFJRSxhQUFBO0VBQ0EsU0FBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtBQUdOO0FBWk07RUFERjtJQUVJLHNCQUFBO0VBZU47QUFDRjtBQVBNO0VBQ0UsVUFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFNQSxtQkFBQTtFQUNBLG1CQUFBO0FBSVI7QUFWUTtFQUxGO0lBTUksV0FBQTtJQUNBLFlBQUE7SUFDQSxrQkFBQTtFQWFSO0FBQ0Y7QUFWUTtFQUNFLFVBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxzT0FBQTtBQVlWO0FBTFE7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7QUFPVjtBQU5VO0VBTEY7SUFNSSxlQUFBO0VBU1Y7QUFDRjtBQVJVO0VBUkY7SUFTSSxXQUFBO0lBQ0Esa0JBQUE7RUFXVjtBQUNGO0FBVlU7RUFaRjtJQWFJLGVBQUE7RUFhVjtBQUNGO0FBWFE7RUFDRSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBTUEsZ0JBQUE7RUFDQSxnQkFBQTtBQVFWO0FBZFU7RUFKRjtJQUtJLGVBQUE7RUFpQlY7QUFDRjtBQVBBO0VBQ0UsYUFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EsUUFBQTtBQVNGO0FBUkU7RUFMRjtJQU1JLG1CQUFBO0VBV0Y7QUFDRjtBQVRFO0VBV0UsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLG1PQUFBO0VBSUEsa0JBQUE7RUFFQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0FBSEo7QUFuQkk7RUFERjtJQUVJLGVBQUE7RUFzQko7QUFDRjtBQXJCSTtFQUpGO0lBS0ksYUFBQTtFQXdCSjtBQUNGO0FBdkJJO0VBQ0UsYUFBQTtBQXlCTjtBQVRJO0VBQ0Usb0NBQUE7QUFXTjtBQVZNO0VBQ0Usa0JBQUE7RUFDQSw4QkFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0FBWVI7QUFWTTtFQUNFLFlBQUE7QUFZUjtBQVRJO0VBQ0UsdUJBQUE7QUFXTjtBQVRJO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUFXTjs7QUFOQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxTQUFBO0FBU0Y7QUFSRTtFQUNFLG9EQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUFVSjtBQVRJO0VBSkY7SUFLSSxXQUFBO0lBQ0Esa0JBQUE7RUFZSjtBQUNGO0FBVkU7RUFDRSxhQUFBO0VBQ0Esc09BQUE7RUFJQSxxQ0FBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0VBQ0EsNkJBQUE7QUFTSjtBQVJJO0VBQ0UsYUFBQTtFQUNBLDBCQUFBO0VBQ0EsU0FBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0FBVU47QUFUTTtFQVJGO0lBU0ksVUFBQTtJQUNBLFlBQUE7RUFZTjtBQUNGO0FBWE07RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFFQSxZQUFBO0VBRUEsbUJBQUE7QUFXUjtBQVZRO0VBUEY7SUFRSSxpQkFBQTtFQWFSO0FBQ0Y7QUFYTTtFQUNFLDhCQUFBO0FBYVJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxyXFxuICBmb250LWZhbWlseTogXFxcImxhbmRpbmdGb250XFxcIjtcXHJcXG4gIHNyYzogdXJsKFxcXCIuLi9mb250cy9jaXJjdWxhci1ib2xkLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpO1xcclxcbn1cXHJcXG4qIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG59XFxyXFxuLndyYXBwZXIge1xcclxcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCMyYzVlOTIsICM1NTJmNmQpO1xcclxcbiAgb3ZlcmZsb3c6IGF1dG87XFxyXFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBwYWRkaW5nOiAzMHB4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIC5jZW50ZXItY29udGFpbmVyIHtcXHJcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJsYW5kaW5nRm9udFxcXCI7XFxyXFxuICAgIG1heC13aWR0aDogOTUwcHg7XFxyXFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA5NTBweCkge1xcclxcbiAgICAgIG1heC13aWR0aDogNzUwcHg7XFxyXFxuICAgIH1cXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxyXFxuICAgIC5jb250YWluZXIge1xcclxcbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3OTVweCkge1xcclxcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICBnYXA6IDEwcHg7XFxyXFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcclxcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgICAgLnRleHQtY29udGFpbmVyIHtcXHJcXG4gICAgICAgIHotaW5kZXg6IDU7XFxyXFxuICAgICAgICBwYWRkaW5nOiAxNXB4O1xcclxcbiAgICAgICAgY29sb3I6IGJsYWNrO1xcclxcbiAgICAgICAgd2lkdGg6IDMzLjMzMzMzMzMzJTtcXHJcXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3OTVweCkge1xcclxcbiAgICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgICAgcGFkZGluZzogMHB4O1xcclxcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcclxcbiAgICAgICAgcGFkZGluZy1yaWdodDogMTVweDtcXHJcXG4gICAgICAgIHNwYW4ge1xcclxcbiAgICAgICAgICB6LWluZGV4OiA1O1xcclxcbiAgICAgICAgICBwYWRkaW5nOiAxM3B4O1xcclxcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxyXFxuICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxyXFxuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMi44cHggMi4ycHggcmdiYSgxMzEsIDk2LCAxOTUsIDAuNCksXFxyXFxuICAgICAgICAgICAgMCA2LjdweCA1LjNweCByZ2JhKDAsIDAsIDAsIDAuMDQ4KSxcXHJcXG4gICAgICAgICAgICAwIDEyLjVweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4wNiksXFxyXFxuICAgICAgICAgICAgMCAyMi4zcHggMTcuOXB4IHJnYmEoMCwgMCwgMCwgMC4wNzIpLFxcclxcbiAgICAgICAgICAgIDAgNDEuOHB4IDMzLjRweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSxcXHJcXG4gICAgICAgICAgICAwIDEwMHB4IDgwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgICAgIC5tYWluLXRpdGxlIHtcXHJcXG4gICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogM3JlbTtcXHJcXG4gICAgICAgICAgZm9udC1zaXplOiA4MHB4O1xcclxcbiAgICAgICAgICBsaW5lLWhlaWdodDogMTtcXHJcXG4gICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDEwOTRweCkge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNjBweDtcXHJcXG4gICAgICAgICAgfVxcclxcbiAgICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNzk1cHgpIHtcXHJcXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgICAgIH1cXHJcXG4gICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ5MHB4KSB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiA1MHB4O1xcclxcbiAgICAgICAgICB9XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgICAuZGVzY3JpcHRpb24ge1xcclxcbiAgICAgICAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxyXFxuICAgICAgICAgIGZvbnQtc2l6ZTogMjZweDtcXHJcXG4gICAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDEwOTRweCkge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcXHJcXG4gICAgICAgICAgfVxcclxcbiAgICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNDkwcHgpIHtcXHJcXG4gICAgICAgICAgfVxcclxcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS4yO1xcclxcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xcclxcbiAgICAgICAgfVxcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbn1cXHJcXG4uaW1hZ2UtY29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gIGdhcDogNnB4O1xcclxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDk1MHB4KSB7XFxyXFxuICAgIHdpZHRoOiA2Ni42NjY2NjY2NyU7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAucHJvamVjdC1jb250YWluZXIge1xcclxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNTQwcHgpIHtcXHJcXG4gICAgICBmbGV4OiAwIDAgMzIuMyU7XFxyXFxuICAgIH1cXHJcXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ1MHB4KSB7XFxyXFxuICAgICAgZmxleDogMCAwIDMxJTtcXHJcXG4gICAgfVxcclxcbiAgICAuZ2l0LWljb24ge1xcclxcbiAgICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIH1cXHJcXG4gICAgLy8gb3BhY2l0eTogMDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgZmxleDogMCAwIDMyLjUlO1xcclxcbiAgICBib3gtc2hhZG93OiAwIDIuOHB4IDIuMnB4IHJnYmEoMCwgMCwgMCwgMC4wMzQpLFxcclxcbiAgICAgIDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksIDAgMTIuNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA2KSxcXHJcXG4gICAgICAwIDIyLjNweCAxNy45cHggcmdiYSgwLCAwLCAwLCAwLjA3MiksIDAgNDEuOHB4IDMzLjRweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSxcXHJcXG4gICAgICAwIDEwMHB4IDgwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcblxcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIG91dGxpbmU6IG5vbmU7XFxyXFxuICAgIGJvcmRlcjogdHJhbnNwYXJlbnQ7XFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC45KTtcXHJcXG4gICAgICAuZ2l0LWljb24ge1xcclxcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICAgICAgZmlsbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQpO1xcclxcbiAgICAgICAgdG9wOiAwO1xcclxcbiAgICAgICAgYm90dG9tOiAwO1xcclxcbiAgICAgICAgbGVmdDogMDtcXHJcXG4gICAgICAgIHJpZ2h0OiAwO1xcclxcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xcclxcbiAgICAgICAgd2lkdGg6IDU1cHg7XFxyXFxuICAgICAgICBoZWlnaHQ6IDU1cHg7XFxyXFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgICB9XFxyXFxuICAgICAgLnByb2plY3QtaW1hZ2Uge1xcclxcbiAgICAgICAgb3BhY2l0eTogMC4zO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcbiAgICAucG9ydGZvbGlvLWltYWdlIHtcXHJcXG4gICAgICBvcGFjaXR5OiAwLjUgIWltcG9ydGFudDtcXHJcXG4gICAgfVxcclxcbiAgICAucHJvamVjdC1pbWFnZSB7XFxyXFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgICAgb2JqZWN0LWZpdDogY292ZXI7XFxyXFxuICAgICAgb3BhY2l0eTogMC44O1xcclxcbiAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG4udGVjaC13cmFwcGVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgZ2FwOiAxNXB4O1xcclxcbiAgLnRlY2gtY29udGFpbmVyLXRpdGxlIHtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogMC4zcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcXHJcXG4gICAgZm9udC1zaXplOiAyM3B4O1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3OTVweCkge1xcclxcbiAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbiAgLnRlY2gtaWNvbi1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBib3gtc2hhZG93OiAwIDIuOHB4IDIuMnB4IHJnYmEoMTMxLCA5NiwgMTk1LCAwLjQpLFxcclxcbiAgICAgIDAgNi43cHggNS4zcHggcmdiYSgwLCAwLCAwLCAwLjA0OCksIDAgMTIuNXB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA2KSxcXHJcXG4gICAgICAwIDIyLjNweCAxNy45cHggcmdiYSgwLCAwLCAwLCAwLjA3MiksIDAgNDEuOHB4IDMzLjRweCByZ2JhKDAsIDAsIDAsIDAuMDg2KSxcXHJcXG4gICAgICAwIDEwMHB4IDgwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXHJcXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcXHJcXG4gICAgcGFkZGluZzogNXB4O1xcclxcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XFxyXFxuICAgIGdhcDogMjBweDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcclxcbiAgICAuaWNvbi1jb250YWluZXIge1xcclxcbiAgICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDRweCk7XFxyXFxuICAgICAgd2lkdGg6IDUlO1xcclxcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OTBweCkge1xcclxcbiAgICAgICAgd2lkdGg6IDEwJTtcXHJcXG4gICAgICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgLmljb24tbGFiZWwge1xcclxcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAgICAgei1pbmRleDogNTtcXHJcXG5cXHJcXG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG5cXHJcXG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxyXFxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNDkwcHgpIHtcXHJcXG4gICAgICAgICAgZm9udC1zaXplOiAwLjVyZW07XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgfVxcclxcbiAgICAgIC50ZWNoLWljb24ge1xcclxcbiAgICAgICAgZmlsbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLmxvY2FscyA9IHtcblx0XCJ3cmFwcGVyXCI6IFwic3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3dyYXBwZXItLTE4MlJtXCIsXG5cdFwiY2VudGVyLWNvbnRhaW5lclwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jZW50ZXItY29udGFpbmVyLS0yTEZRR1wiLFxuXHRcImNvbnRhaW5lclwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19jb250YWluZXItLTJpd3JHXCIsXG5cdFwidGV4dC1jb250YWluZXJcIjogXCJzcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fdGV4dC1jb250YWluZXItLTIxZ1JfXCIsXG5cdFwibWFpbi10aXRsZVwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19tYWluLXRpdGxlLS0xbFR3dVwiLFxuXHRcImRlc2NyaXB0aW9uXCI6IFwic3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX2Rlc2NyaXB0aW9uLS0yWHhKRFwiLFxuXHRcImltYWdlLWNvbnRhaW5lclwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pbWFnZS1jb250YWluZXItLTE2UEk3XCIsXG5cdFwicHJvamVjdC1jb250YWluZXJcIjogXCJzcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fcHJvamVjdC1jb250YWluZXItLTJhaDFCXCIsXG5cdFwiZ2l0LWljb25cIjogXCJzcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9fZ2l0LWljb24tLTFYZklUXCIsXG5cdFwicHJvamVjdC1pbWFnZVwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19wcm9qZWN0LWltYWdlLS0zMmE4a1wiLFxuXHRcInBvcnRmb2xpby1pbWFnZVwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19wb3J0Zm9saW8taW1hZ2UtLTJUODJXXCIsXG5cdFwidGVjaC13cmFwcGVyXCI6IFwic3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtd3JhcHBlci0tMVJScjFcIixcblx0XCJ0ZWNoLWNvbnRhaW5lci10aXRsZVwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLWNvbnRhaW5lci10aXRsZS0tMXBBNE5cIixcblx0XCJ0ZWNoLWljb24tY29udGFpbmVyXCI6IFwic3JjLWxhbmRpbmctbGFuZGluZy1tb2R1bGVfX3RlY2gtaWNvbi1jb250YWluZXItLU5Qa0dPXCIsXG5cdFwiaWNvbi1jb250YWluZXJcIjogXCJzcmMtbGFuZGluZy1sYW5kaW5nLW1vZHVsZV9faWNvbi1jb250YWluZXItLXktc2hzXCIsXG5cdFwiaWNvbi1sYWJlbFwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX19pY29uLWxhYmVsLS0yaUFzQlwiLFxuXHRcInRlY2gtaWNvblwiOiBcInNyYy1sYW5kaW5nLWxhbmRpbmctbW9kdWxlX190ZWNoLWljb24tLTE4SHlzXCJcbn07XG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFpbmVyLS0xTnJ1VSB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHotaW5kZXg6IDIwO1xcbiAgcGFkZGluZzogMjBweDtcXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDE2MDVweCkge1xcbiAgLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFpbmVyLS0xTnJ1VSB7XFxuICAgIHJpZ2h0OiAyMHB4O1xcbiAgICB0b3A6IDIwcHg7XFxuICAgIGJvdHRvbTogYXV0bztcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgbGVmdDogYXV0bztcXG4gIH1cXG59XFxuLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFpbmVyLS0xTnJ1VSAuc3JjLW5hdmJhci1uYXZiYXItbW9kdWxlX19jb250YWN0LWljb24tY29udGFpbmVyLS0xelJsVSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAyMHB4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNjA1cHgpIHtcXG4gIC5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhaW5lci0tMU5ydVUgLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFjdC1pY29uLWNvbnRhaW5lci0tMXpSbFUge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgfVxcbn1cXG4uc3JjLW5hdmJhci1uYXZiYXItbW9kdWxlX19jb250YWluZXItLTFOcnVVIC5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhY3QtaWNvbi1jb250YWluZXItLTF6UmxVIC5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhY3QtaWNvbi0tbGMzZ1Mge1xcbiAgZmlsbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xcbiAgd2lkdGg6IDIwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBoZWlnaHQ6IDIwcHg7XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNjMwLjk4cHgpIHtcXG4gIC5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhaW5lci0tMU5ydVUgLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFjdC1pY29uLWNvbnRhaW5lci0tMXpSbFUgLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFjdC1pY29uLS1sYzNnUyB7XFxuICAgIGZpbGw6IHdoaXRlO1xcbiAgfVxcbn1cXG4uc3JjLW5hdmJhci1uYXZiYXItbW9kdWxlX19jb250YWluZXItLTFOcnVVIC5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhY3QtaWNvbi1jb250YWluZXItLTF6UmxVIC5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhY3QtaWNvbi0tbGMzZ1M6aG92ZXIge1xcbiAgZmlsbDogd2hpdGU7XFxufVxcbi5zcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhaW5lci0tMU5ydVUgLnNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fZGl2aWRlci1saW5lLS0yZXBhXyB7XFxuICBoZWlnaHQ6IDg1JTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yOCk7XFxuICB0b3A6IDE1MHB4O1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgd2lkdGg6IDJweDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL25hdmJhci9uYXZiYXIubW9kdWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxlQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtBQUNGO0FBQUU7RUFWRjtJQVdJLFdBQUE7SUFDQSxTQUFBO0lBQ0EsWUFBQTtJQUNBLG1CQUFBO0lBQ0EsVUFBQTtFQUdGO0FBQ0Y7QUFGRTtFQUlFLGFBQUE7RUFDQSxTQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBQ0o7QUFSSTtFQURGO0lBRUksbUJBQUE7RUFXSjtBQUNGO0FBTEk7RUFDRSw4QkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtBQU9OO0FBTk07RUFMRjtJQU1JLFdBQUE7RUFTTjtBQUNGO0FBUk07RUFDRSxXQUFBO0FBVVI7QUFORTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLHFDQUFBO0VBQ0EsVUFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7RUFDQSxVQUFBO0FBUUpcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmNvbnRhaW5lciB7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgdG9wOiAwO1xcclxcbiAgbGVmdDogMDtcXHJcXG4gIGJvdHRvbTogMDtcXHJcXG4gIHotaW5kZXg6IDIwO1xcclxcbiAgcGFkZGluZzogMjBweDtcXHJcXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAxNjA1cHgpIHtcXHJcXG4gICAgcmlnaHQ6IDIwcHg7XFxyXFxuICAgIHRvcDogMjBweDtcXHJcXG4gICAgYm90dG9tOiBhdXRvO1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcclxcbiAgICBsZWZ0OiBhdXRvO1xcclxcbiAgfVxcclxcbiAgLmNvbnRhY3QtaWNvbi1jb250YWluZXIge1xcclxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogMTYwNXB4KSB7XFxyXFxuICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXHJcXG4gICAgfVxcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBnYXA6IDIwcHg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgaGVpZ2h0OiBmaXQtY29udGVudDtcXHJcXG4gICAgLmNvbnRhY3QtaWNvbiB7XFxyXFxuICAgICAgZmlsbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xcclxcbiAgICAgIHdpZHRoOiAyMHB4O1xcclxcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICBoZWlnaHQ6IDIwcHg7XFxyXFxuICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDE2MzAuOThweCkge1xcclxcbiAgICAgICAgZmlsbDogd2hpdGU7XFxyXFxuICAgICAgfVxcclxcbiAgICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgZmlsbDogd2hpdGU7XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuICB9XFxyXFxuICAuZGl2aWRlci1saW5lIHtcXHJcXG4gICAgaGVpZ2h0OiA4NSU7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI4KTtcXHJcXG4gICAgdG9wOiAxNTBweDtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgcmlnaHQ6IDA7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIG1hcmdpbjogMCBhdXRvO1xcclxcbiAgICB3aWR0aDogMnB4O1xcclxcbiAgfVxcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLmxvY2FscyA9IHtcblx0XCJjb250YWluZXJcIjogXCJzcmMtbmF2YmFyLW5hdmJhci1tb2R1bGVfX2NvbnRhaW5lci0tMU5ydVVcIixcblx0XCJjb250YWN0LWljb24tY29udGFpbmVyXCI6IFwic3JjLW5hdmJhci1uYXZiYXItbW9kdWxlX19jb250YWN0LWljb24tY29udGFpbmVyLS0xelJsVVwiLFxuXHRcImNvbnRhY3QtaWNvblwiOiBcInNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fY29udGFjdC1pY29uLS1sYzNnU1wiLFxuXHRcImRpdmlkZXItbGluZVwiOiBcInNyYy1uYXZiYXItbmF2YmFyLW1vZHVsZV9fZGl2aWRlci1saW5lLS0yZXBhX1wiXG59O1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5LCBkZWR1cGUpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2ldKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiXCIuY29uY2F0KG1lZGlhUXVlcnksIFwiIGFuZCBcIikuY29uY2F0KGl0ZW1bMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSkge1xuICB2YXIgX2l0ZW0gPSBfc2xpY2VkVG9BcnJheShpdGVtLCA0KSxcbiAgICAgIGNvbnRlbnQgPSBfaXRlbVsxXSxcbiAgICAgIGNzc01hcHBpbmcgPSBfaXRlbVszXTtcblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIG9wdGlvbnMgPSB7fTtcbiAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZXJzY29yZS1kYW5nbGUsIG5vLXBhcmFtLXJlYXNzaWduXG5cblxuICB1cmwgPSB1cmwgJiYgdXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybDtcblxuICBpZiAodHlwZW9mIHVybCAhPT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiB1cmw7XG4gIH0gLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiUHJpc20ubGFuZ3VhZ2VzLmNsaWtlID0ge1xuXHQnY29tbWVudCc6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W15cXFxcXSlcXC9cXCpbXFxzXFxTXSo/KD86XFwqXFwvfCQpLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRncmVlZHk6IHRydWVcblx0XHR9LFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXlxcXFw6XSlcXC9cXC8uKi8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0Z3JlZWR5OiB0cnVlXG5cdFx0fVxuXHRdLFxuXHQnc3RyaW5nJzoge1xuXHRcdHBhdHRlcm46IC8oW1wiJ10pKD86XFxcXCg/OlxcclxcbnxbXFxzXFxTXSl8KD8hXFwxKVteXFxcXFxcclxcbl0pKlxcMS8sXG5cdFx0Z3JlZWR5OiB0cnVlXG5cdH0sXG5cdCdjbGFzcy1uYW1lJzoge1xuXHRcdHBhdHRlcm46IC8oXFxiKD86Y2xhc3N8aW50ZXJmYWNlfGV4dGVuZHN8aW1wbGVtZW50c3x0cmFpdHxpbnN0YW5jZW9mfG5ldylcXHMrfFxcYmNhdGNoXFxzK1xcKClbXFx3LlxcXFxdKy9pLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQncHVuY3R1YXRpb24nOiAvWy5cXFxcXS9cblx0XHR9XG5cdH0sXG5cdCdrZXl3b3JkJzogL1xcYig/OmlmfGVsc2V8d2hpbGV8ZG98Zm9yfHJldHVybnxpbnxpbnN0YW5jZW9mfGZ1bmN0aW9ufG5ld3x0cnl8dGhyb3d8Y2F0Y2h8ZmluYWxseXxudWxsfGJyZWFrfGNvbnRpbnVlKVxcYi8sXG5cdCdib29sZWFuJzogL1xcYig/OnRydWV8ZmFsc2UpXFxiLyxcblx0J2Z1bmN0aW9uJzogL1xcdysoPz1cXCgpLyxcblx0J251bWJlcic6IC9cXGIweFtcXGRhLWZdK1xcYnwoPzpcXGJcXGQrKD86XFwuXFxkKik/fFxcQlxcLlxcZCspKD86ZVsrLV0/XFxkKyk/L2ksXG5cdCdvcGVyYXRvcic6IC9bPD5dPT98WyE9XT0/PT98LS0/fFxcK1xcKz98JiY/fFxcfFxcfD98Wz8qL35eJV0vLFxuXHQncHVuY3R1YXRpb24nOiAvW3t9W1xcXTsoKSwuOl0vXG59O1xuIiwiLy8vIDxyZWZlcmVuY2UgbGliPVwiV2ViV29ya2VyXCIvPlxuXG52YXIgX3NlbGYgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpXG5cdD8gd2luZG93ICAgLy8gaWYgaW4gYnJvd3NlclxuXHQ6IChcblx0XHQodHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUpXG5cdFx0PyBzZWxmIC8vIGlmIGluIHdvcmtlclxuXHRcdDoge30gICAvLyBpZiBpbiBub2RlIGpzXG5cdCk7XG5cbi8qKlxuICogUHJpc206IExpZ2h0d2VpZ2h0LCByb2J1c3QsIGVsZWdhbnQgc3ludGF4IGhpZ2hsaWdodGluZ1xuICpcbiAqIEBsaWNlbnNlIE1JVCA8aHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQ+XG4gKiBAYXV0aG9yIExlYSBWZXJvdSA8aHR0cHM6Ly9sZWEudmVyb3UubWU+XG4gKiBAbmFtZXNwYWNlXG4gKiBAcHVibGljXG4gKi9cbnZhciBQcmlzbSA9IChmdW5jdGlvbiAoX3NlbGYpe1xuXG4vLyBQcml2YXRlIGhlbHBlciB2YXJzXG52YXIgbGFuZyA9IC9cXGJsYW5nKD86dWFnZSk/LShbXFx3LV0rKVxcYi9pO1xudmFyIHVuaXF1ZUlkID0gMDtcblxuXG52YXIgXyA9IHtcblx0LyoqXG5cdCAqIEJ5IGRlZmF1bHQsIFByaXNtIHdpbGwgYXR0ZW1wdCB0byBoaWdobGlnaHQgYWxsIGNvZGUgZWxlbWVudHMgKGJ5IGNhbGxpbmcge0BsaW5rIFByaXNtLmhpZ2hsaWdodEFsbH0pIG9uIHRoZVxuXHQgKiBjdXJyZW50IHBhZ2UgYWZ0ZXIgdGhlIHBhZ2UgZmluaXNoZWQgbG9hZGluZy4gVGhpcyBtaWdodCBiZSBhIHByb2JsZW0gaWYgZS5nLiB5b3Ugd2FudGVkIHRvIGFzeW5jaHJvbm91c2x5IGxvYWRcblx0ICogYWRkaXRpb25hbCBsYW5ndWFnZXMgb3IgcGx1Z2lucyB5b3Vyc2VsZi5cblx0ICpcblx0ICogQnkgc2V0dGluZyB0aGlzIHZhbHVlIHRvIGB0cnVlYCwgUHJpc20gd2lsbCBub3QgYXV0b21hdGljYWxseSBoaWdobGlnaHQgYWxsIGNvZGUgZWxlbWVudHMgb24gdGhlIHBhZ2UuXG5cdCAqXG5cdCAqIFlvdSBvYnZpb3VzbHkgaGF2ZSB0byBjaGFuZ2UgdGhpcyB2YWx1ZSBiZWZvcmUgdGhlIGF1dG9tYXRpYyBoaWdobGlnaHRpbmcgc3RhcnRlZC4gVG8gZG8gdGhpcywgeW91IGNhbiBhZGQgYW5cblx0ICogZW1wdHkgUHJpc20gb2JqZWN0IGludG8gdGhlIGdsb2JhbCBzY29wZSBiZWZvcmUgbG9hZGluZyB0aGUgUHJpc20gc2NyaXB0IGxpa2UgdGhpczpcblx0ICpcblx0ICogYGBganNcblx0ICogd2luZG93LlByaXNtID0gd2luZG93LlByaXNtIHx8IHt9O1xuXHQgKiBQcmlzbS5tYW51YWwgPSB0cnVlO1xuXHQgKiAvLyBhZGQgYSBuZXcgPHNjcmlwdD4gdG8gbG9hZCBQcmlzbSdzIHNjcmlwdFxuXHQgKiBgYGBcblx0ICpcblx0ICogQGRlZmF1bHQgZmFsc2Vcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHRtYW51YWw6IF9zZWxmLlByaXNtICYmIF9zZWxmLlByaXNtLm1hbnVhbCxcblx0ZGlzYWJsZVdvcmtlck1lc3NhZ2VIYW5kbGVyOiBfc2VsZi5QcmlzbSAmJiBfc2VsZi5QcmlzbS5kaXNhYmxlV29ya2VyTWVzc2FnZUhhbmRsZXIsXG5cblx0LyoqXG5cdCAqIEEgbmFtZXNwYWNlIGZvciB1dGlsaXR5IG1ldGhvZHMuXG5cdCAqXG5cdCAqIEFsbCBmdW5jdGlvbiBpbiB0aGlzIG5hbWVzcGFjZSB0aGF0IGFyZSBub3QgZXhwbGljaXRseSBtYXJrZWQgYXMgX3B1YmxpY18gYXJlIGZvciBfX2ludGVybmFsIHVzZSBvbmx5X18gYW5kIG1heVxuXHQgKiBjaGFuZ2Ugb3IgZGlzYXBwZWFyIGF0IGFueSB0aW1lLlxuXHQgKlxuXHQgKiBAbmFtZXNwYWNlXG5cdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHQgKi9cblx0dXRpbDoge1xuXHRcdGVuY29kZTogZnVuY3Rpb24gZW5jb2RlKHRva2Vucykge1xuXHRcdFx0aWYgKHRva2VucyBpbnN0YW5jZW9mIFRva2VuKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgVG9rZW4odG9rZW5zLnR5cGUsIGVuY29kZSh0b2tlbnMuY29udGVudCksIHRva2Vucy5hbGlhcyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodG9rZW5zKSkge1xuXHRcdFx0XHRyZXR1cm4gdG9rZW5zLm1hcChlbmNvZGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRva2Vucy5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC9cXHUwMGEwL2csICcgJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIHR5cGUgb2YgdGhlIGdpdmVuIHZhbHVlLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHthbnl9IG9cblx0XHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogdHlwZShudWxsKSAgICAgID09PSAnTnVsbCdcblx0XHQgKiB0eXBlKHVuZGVmaW5lZCkgPT09ICdVbmRlZmluZWQnXG5cdFx0ICogdHlwZSgxMjMpICAgICAgID09PSAnTnVtYmVyJ1xuXHRcdCAqIHR5cGUoJ2ZvbycpICAgICA9PT0gJ1N0cmluZydcblx0XHQgKiB0eXBlKHRydWUpICAgICAgPT09ICdCb29sZWFuJ1xuXHRcdCAqIHR5cGUoWzEsIDJdKSAgICA9PT0gJ0FycmF5J1xuXHRcdCAqIHR5cGUoe30pICAgICAgICA9PT0gJ09iamVjdCdcblx0XHQgKiB0eXBlKFN0cmluZykgICAgPT09ICdGdW5jdGlvbidcblx0XHQgKiB0eXBlKC9hYmMrLykgICAgPT09ICdSZWdFeHAnXG5cdFx0ICovXG5cdFx0dHlwZTogZnVuY3Rpb24gKG8pIHtcblx0XHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIGEgdW5pcXVlIG51bWJlciBmb3IgdGhlIGdpdmVuIG9iamVjdC4gTGF0ZXIgY2FsbHMgd2lsbCBzdGlsbCByZXR1cm4gdGhlIHNhbWUgbnVtYmVyLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IG9ialxuXHRcdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdFx0ICovXG5cdFx0b2JqSWQ6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdGlmICghb2JqWydfX2lkJ10pIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ19faWQnLCB7IHZhbHVlOiArK3VuaXF1ZUlkIH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9ialsnX19pZCddO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBDcmVhdGVzIGEgZGVlcCBjbG9uZSBvZiB0aGUgZ2l2ZW4gb2JqZWN0LlxuXHRcdCAqXG5cdFx0ICogVGhlIG1haW4gaW50ZW5kZWQgdXNlIG9mIHRoaXMgZnVuY3Rpb24gaXMgdG8gY2xvbmUgbGFuZ3VhZ2UgZGVmaW5pdGlvbnMuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge1R9IG9cblx0XHQgKiBAcGFyYW0ge1JlY29yZDxudW1iZXIsIGFueT59IFt2aXNpdGVkXVxuXHRcdCAqIEByZXR1cm5zIHtUfVxuXHRcdCAqIEB0ZW1wbGF0ZSBUXG5cdFx0ICovXG5cdFx0Y2xvbmU6IGZ1bmN0aW9uIGRlZXBDbG9uZShvLCB2aXNpdGVkKSB7XG5cdFx0XHR2aXNpdGVkID0gdmlzaXRlZCB8fCB7fTtcblxuXHRcdFx0dmFyIGNsb25lLCBpZDtcblx0XHRcdHN3aXRjaCAoXy51dGlsLnR5cGUobykpIHtcblx0XHRcdFx0Y2FzZSAnT2JqZWN0Jzpcblx0XHRcdFx0XHRpZCA9IF8udXRpbC5vYmpJZChvKTtcblx0XHRcdFx0XHRpZiAodmlzaXRlZFtpZF0pIHtcblx0XHRcdFx0XHRcdHJldHVybiB2aXNpdGVkW2lkXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2xvbmUgPSAvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsIGFueT59ICovICh7fSk7XG5cdFx0XHRcdFx0dmlzaXRlZFtpZF0gPSBjbG9uZTtcblxuXHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBvKSB7XG5cdFx0XHRcdFx0XHRpZiAoby5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lW2tleV0gPSBkZWVwQ2xvbmUob1trZXldLCB2aXNpdGVkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gLyoqIEB0eXBlIHthbnl9ICovIChjbG9uZSk7XG5cblx0XHRcdFx0Y2FzZSAnQXJyYXknOlxuXHRcdFx0XHRcdGlkID0gXy51dGlsLm9iaklkKG8pO1xuXHRcdFx0XHRcdGlmICh2aXNpdGVkW2lkXSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHZpc2l0ZWRbaWRdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjbG9uZSA9IFtdO1xuXHRcdFx0XHRcdHZpc2l0ZWRbaWRdID0gY2xvbmU7XG5cblx0XHRcdFx0XHQoLyoqIEB0eXBlIHtBcnJheX0gKi8oLyoqIEB0eXBlIHthbnl9ICovKG8pKSkuZm9yRWFjaChmdW5jdGlvbiAodiwgaSkge1xuXHRcdFx0XHRcdFx0Y2xvbmVbaV0gPSBkZWVwQ2xvbmUodiwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gLyoqIEB0eXBlIHthbnl9ICovIChjbG9uZSk7XG5cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRyZXR1cm4gbztcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0aGUgUHJpc20gbGFuZ3VhZ2Ugb2YgdGhlIGdpdmVuIGVsZW1lbnQgc2V0IGJ5IGEgYGxhbmd1YWdlLXh4eHhgIG9yIGBsYW5nLXh4eHhgIGNsYXNzLlxuXHRcdCAqXG5cdFx0ICogSWYgbm8gbGFuZ3VhZ2UgaXMgc2V0IGZvciB0aGUgZWxlbWVudCBvciB0aGUgZWxlbWVudCBpcyBgbnVsbGAgb3IgYHVuZGVmaW5lZGAsIGBub25lYCB3aWxsIGJlIHJldHVybmVkLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG5cdFx0ICogQHJldHVybnMge3N0cmluZ31cblx0XHQgKi9cblx0XHRnZXRMYW5ndWFnZTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRcdHdoaWxlIChlbGVtZW50ICYmICFsYW5nLnRlc3QoZWxlbWVudC5jbGFzc05hbWUpKSB7XG5cdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZWxlbWVudCkge1xuXHRcdFx0XHRyZXR1cm4gKGVsZW1lbnQuY2xhc3NOYW1lLm1hdGNoKGxhbmcpIHx8IFssICdub25lJ10pWzFdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gJ25vbmUnO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRoZSBzY3JpcHQgZWxlbWVudCB0aGF0IGlzIGN1cnJlbnRseSBleGVjdXRpbmcuXG5cdFx0ICpcblx0XHQgKiBUaGlzIGRvZXMgX19ub3RfXyB3b3JrIGZvciBsaW5lIHNjcmlwdCBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybnMge0hUTUxTY3JpcHRFbGVtZW50IHwgbnVsbH1cblx0XHQgKi9cblx0XHRjdXJyZW50U2NyaXB0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblx0XHRcdGlmICgnY3VycmVudFNjcmlwdCcgaW4gZG9jdW1lbnQgJiYgMSA8IDIgLyogaGFjayB0byB0cmlwIFRTJyBmbG93IGFuYWx5c2lzICovKSB7XG5cdFx0XHRcdHJldHVybiAvKiogQHR5cGUge2FueX0gKi8gKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJRTExIHdvcmthcm91bmRcblx0XHRcdC8vIHdlJ2xsIGdldCB0aGUgc3JjIG9mIHRoZSBjdXJyZW50IHNjcmlwdCBieSBwYXJzaW5nIElFMTEncyBlcnJvciBzdGFjayB0cmFjZVxuXHRcdFx0Ly8gdGhpcyB3aWxsIG5vdCB3b3JrIGZvciBpbmxpbmUgc2NyaXB0c1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoKTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHQvLyBHZXQgZmlsZSBzcmMgdXJsIGZyb20gc3RhY2suIFNwZWNpZmljYWxseSB3b3JrcyB3aXRoIHRoZSBmb3JtYXQgb2Ygc3RhY2sgdHJhY2VzIGluIElFLlxuXHRcdFx0XHQvLyBBIHN0YWNrIHdpbGwgbG9vayBsaWtlIHRoaXM6XG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIEVycm9yXG5cdFx0XHRcdC8vICAgIGF0IF8udXRpbC5jdXJyZW50U2NyaXB0IChodHRwOi8vbG9jYWxob3N0L2NvbXBvbmVudHMvcHJpc20tY29yZS5qczoxMTk6NSlcblx0XHRcdFx0Ly8gICAgYXQgR2xvYmFsIGNvZGUgKGh0dHA6Ly9sb2NhbGhvc3QvY29tcG9uZW50cy9wcmlzbS1jb3JlLmpzOjYwNjoxKVxuXG5cdFx0XHRcdHZhciBzcmMgPSAoL2F0IFteKFxcclxcbl0qXFwoKC4qKTouKzouK1xcKSQvaS5leGVjKGVyci5zdGFjaykgfHwgW10pWzFdO1xuXHRcdFx0XHRpZiAoc3JjKSB7XG5cdFx0XHRcdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSBpbiBzY3JpcHRzKSB7XG5cdFx0XHRcdFx0XHRpZiAoc2NyaXB0c1tpXS5zcmMgPT0gc3JjKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBzY3JpcHRzW2ldO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB3aGV0aGVyIGEgZ2l2ZW4gY2xhc3MgaXMgYWN0aXZlIGZvciBgZWxlbWVudGAuXG5cdFx0ICpcblx0XHQgKiBUaGUgY2xhc3MgY2FuIGJlIGFjdGl2YXRlZCBpZiBgZWxlbWVudGAgb3Igb25lIG9mIGl0cyBhbmNlc3RvcnMgaGFzIHRoZSBnaXZlbiBjbGFzcyBhbmQgaXQgY2FuIGJlIGRlYWN0aXZhdGVkXG5cdFx0ICogaWYgYGVsZW1lbnRgIG9yIG9uZSBvZiBpdHMgYW5jZXN0b3JzIGhhcyB0aGUgbmVnYXRlZCB2ZXJzaW9uIG9mIHRoZSBnaXZlbiBjbGFzcy4gVGhlIF9uZWdhdGVkIHZlcnNpb25fIG9mIHRoZVxuXHRcdCAqIGdpdmVuIGNsYXNzIGlzIGp1c3QgdGhlIGdpdmVuIGNsYXNzIHdpdGggYSBgbm8tYCBwcmVmaXguXG5cdFx0ICpcblx0XHQgKiBXaGV0aGVyIHRoZSBjbGFzcyBpcyBhY3RpdmUgaXMgZGV0ZXJtaW5lZCBieSB0aGUgY2xvc2VzdCBhbmNlc3RvciBvZiBgZWxlbWVudGAgKHdoZXJlIGBlbGVtZW50YCBpdHNlbGYgaXNcblx0XHQgKiBjbG9zZXN0IGFuY2VzdG9yKSB0aGF0IGhhcyB0aGUgZ2l2ZW4gY2xhc3Mgb3IgdGhlIG5lZ2F0ZWQgdmVyc2lvbiBvZiBpdC4gSWYgbmVpdGhlciBgZWxlbWVudGAgbm9yIGFueSBvZiBpdHNcblx0XHQgKiBhbmNlc3RvcnMgaGF2ZSB0aGUgZ2l2ZW4gY2xhc3Mgb3IgdGhlIG5lZ2F0ZWQgdmVyc2lvbiBvZiBpdCwgdGhlbiB0aGUgZGVmYXVsdCBhY3RpdmF0aW9uIHdpbGwgYmUgcmV0dXJuZWQuXG5cdFx0ICpcblx0XHQgKiBJbiB0aGUgcGFyYWRveGljYWwgc2l0dWF0aW9uIHdoZXJlIHRoZSBjbG9zZXN0IGFuY2VzdG9yIGNvbnRhaW5zIF9fYm90aF9fIHRoZSBnaXZlbiBjbGFzcyBhbmQgdGhlIG5lZ2F0ZWRcblx0XHQgKiB2ZXJzaW9uIG9mIGl0LCB0aGUgY2xhc3MgaXMgY29uc2lkZXJlZCBhY3RpdmUuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbZGVmYXVsdEFjdGl2YXRpb249ZmFsc2VdXG5cdFx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdFx0ICovXG5cdFx0aXNBY3RpdmU6IGZ1bmN0aW9uIChlbGVtZW50LCBjbGFzc05hbWUsIGRlZmF1bHRBY3RpdmF0aW9uKSB7XG5cdFx0XHR2YXIgbm8gPSAnbm8tJyArIGNsYXNzTmFtZTtcblxuXHRcdFx0d2hpbGUgKGVsZW1lbnQpIHtcblx0XHRcdFx0dmFyIGNsYXNzTGlzdCA9IGVsZW1lbnQuY2xhc3NMaXN0O1xuXHRcdFx0XHRpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKG5vKSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICEhZGVmYXVsdEFjdGl2YXRpb247XG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBUaGlzIG5hbWVzcGFjZSBjb250YWlucyBhbGwgY3VycmVudGx5IGxvYWRlZCBsYW5ndWFnZXMgYW5kIHRoZSBzb21lIGhlbHBlciBmdW5jdGlvbnMgdG8gY3JlYXRlIGFuZCBtb2RpZnkgbGFuZ3VhZ2VzLlxuXHQgKlxuXHQgKiBAbmFtZXNwYWNlXG5cdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHRsYW5ndWFnZXM6IHtcblx0XHQvKipcblx0XHQgKiBDcmVhdGVzIGEgZGVlcCBjb3B5IG9mIHRoZSBsYW5ndWFnZSB3aXRoIHRoZSBnaXZlbiBpZCBhbmQgYXBwZW5kcyB0aGUgZ2l2ZW4gdG9rZW5zLlxuXHRcdCAqXG5cdFx0ICogSWYgYSB0b2tlbiBpbiBgcmVkZWZgIGFsc28gYXBwZWFycyBpbiB0aGUgY29waWVkIGxhbmd1YWdlLCB0aGVuIHRoZSBleGlzdGluZyB0b2tlbiBpbiB0aGUgY29waWVkIGxhbmd1YWdlXG5cdFx0ICogd2lsbCBiZSBvdmVyd3JpdHRlbiBhdCBpdHMgb3JpZ2luYWwgcG9zaXRpb24uXG5cdFx0ICpcblx0XHQgKiAjIyBCZXN0IHByYWN0aWNlc1xuXHRcdCAqXG5cdFx0ICogU2luY2UgdGhlIHBvc2l0aW9uIG9mIG92ZXJ3cml0aW5nIHRva2VucyAodG9rZW4gaW4gYHJlZGVmYCB0aGF0IG92ZXJ3cml0ZSB0b2tlbnMgaW4gdGhlIGNvcGllZCBsYW5ndWFnZSlcblx0XHQgKiBkb2Vzbid0IG1hdHRlciwgdGhleSBjYW4gdGVjaG5pY2FsbHkgYmUgaW4gYW55IG9yZGVyLiBIb3dldmVyLCB0aGlzIGNhbiBiZSBjb25mdXNpbmcgdG8gb3RoZXJzIHRoYXQgdHJ5aW5nIHRvXG5cdFx0ICogdW5kZXJzdGFuZCB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBiZWNhdXNlLCBub3JtYWxseSwgdGhlIG9yZGVyIG9mIHRva2VucyBtYXR0ZXJzIGluIFByaXNtIGdyYW1tYXJzLlxuXHRcdCAqXG5cdFx0ICogVGhlcmVmb3JlLCBpdCBpcyBlbmNvdXJhZ2VkIHRvIG9yZGVyIG92ZXJ3cml0aW5nIHRva2VucyBhY2NvcmRpbmcgdG8gdGhlIHBvc2l0aW9ucyBvZiB0aGUgb3ZlcndyaXR0ZW4gdG9rZW5zLlxuXHRcdCAqIEZ1cnRoZXJtb3JlLCBhbGwgbm9uLW92ZXJ3cml0aW5nIHRva2VucyBzaG91bGQgYmUgcGxhY2VkIGFmdGVyIHRoZSBvdmVyd3JpdGluZyBvbmVzLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSBpZCBvZiB0aGUgbGFuZ3VhZ2UgdG8gZXh0ZW5kLiBUaGlzIGhhcyB0byBiZSBhIGtleSBpbiBgUHJpc20ubGFuZ3VhZ2VzYC5cblx0XHQgKiBAcGFyYW0ge0dyYW1tYXJ9IHJlZGVmIFRoZSBuZXcgdG9rZW5zIHRvIGFwcGVuZC5cblx0XHQgKiBAcmV0dXJucyB7R3JhbW1hcn0gVGhlIG5ldyBsYW5ndWFnZSBjcmVhdGVkLlxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIFByaXNtLmxhbmd1YWdlc1snY3NzLXdpdGgtY29sb3JzJ10gPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjc3MnLCB7XG5cdFx0ICogICAgIC8vIFByaXNtLmxhbmd1YWdlcy5jc3MgYWxyZWFkeSBoYXMgYSAnY29tbWVudCcgdG9rZW4sIHNvIHRoaXMgdG9rZW4gd2lsbCBvdmVyd3JpdGUgQ1NTJyAnY29tbWVudCcgdG9rZW5cblx0XHQgKiAgICAgLy8gYXQgaXRzIG9yaWdpbmFsIHBvc2l0aW9uXG5cdFx0ICogICAgICdjb21tZW50JzogeyAuLi4gfSxcblx0XHQgKiAgICAgLy8gQ1NTIGRvZXNuJ3QgaGF2ZSBhICdjb2xvcicgdG9rZW4sIHNvIHRoaXMgdG9rZW4gd2lsbCBiZSBhcHBlbmRlZFxuXHRcdCAqICAgICAnY29sb3InOiAvXFxiKD86cmVkfGdyZWVufGJsdWUpXFxiL1xuXHRcdCAqIH0pO1xuXHRcdCAqL1xuXHRcdGV4dGVuZDogZnVuY3Rpb24gKGlkLCByZWRlZikge1xuXHRcdFx0dmFyIGxhbmcgPSBfLnV0aWwuY2xvbmUoXy5sYW5ndWFnZXNbaWRdKTtcblxuXHRcdFx0Zm9yICh2YXIga2V5IGluIHJlZGVmKSB7XG5cdFx0XHRcdGxhbmdba2V5XSA9IHJlZGVmW2tleV07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBsYW5nO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbnNlcnRzIHRva2VucyBfYmVmb3JlXyBhbm90aGVyIHRva2VuIGluIGEgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBvciBhbnkgb3RoZXIgZ3JhbW1hci5cblx0XHQgKlxuXHRcdCAqICMjIFVzYWdlXG5cdFx0ICpcblx0XHQgKiBUaGlzIGhlbHBlciBtZXRob2QgbWFrZXMgaXQgZWFzeSB0byBtb2RpZnkgZXhpc3RpbmcgbGFuZ3VhZ2VzLiBGb3IgZXhhbXBsZSwgdGhlIENTUyBsYW5ndWFnZSBkZWZpbml0aW9uXG5cdFx0ICogbm90IG9ubHkgZGVmaW5lcyBDU1MgaGlnaGxpZ2h0aW5nIGZvciBDU1MgZG9jdW1lbnRzLCBidXQgYWxzbyBuZWVkcyB0byBkZWZpbmUgaGlnaGxpZ2h0aW5nIGZvciBDU1MgZW1iZWRkZWRcblx0XHQgKiBpbiBIVE1MIHRocm91Z2ggYDxzdHlsZT5gIGVsZW1lbnRzLiBUbyBkbyB0aGlzLCBpdCBuZWVkcyB0byBtb2RpZnkgYFByaXNtLmxhbmd1YWdlcy5tYXJrdXBgIGFuZCBhZGQgdGhlXG5cdFx0ICogYXBwcm9wcmlhdGUgdG9rZW5zLiBIb3dldmVyLCBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAgaXMgYSByZWd1bGFyIEphdmFTY3JpcHQgb2JqZWN0IGxpdGVyYWwsIHNvIGlmIHlvdSBkb1xuXHRcdCAqIHRoaXM6XG5cdFx0ICpcblx0XHQgKiBgYGBqc1xuXHRcdCAqIFByaXNtLmxhbmd1YWdlcy5tYXJrdXAuc3R5bGUgPSB7XG5cdFx0ICogICAgIC8vIHRva2VuXG5cdFx0ICogfTtcblx0XHQgKiBgYGBcblx0XHQgKlxuXHRcdCAqIHRoZW4gdGhlIGBzdHlsZWAgdG9rZW4gd2lsbCBiZSBhZGRlZCAoYW5kIHByb2Nlc3NlZCkgYXQgdGhlIGVuZC4gYGluc2VydEJlZm9yZWAgYWxsb3dzIHlvdSB0byBpbnNlcnQgdG9rZW5zXG5cdFx0ICogYmVmb3JlIGV4aXN0aW5nIHRva2Vucy4gRm9yIHRoZSBDU1MgZXhhbXBsZSBhYm92ZSwgeW91IHdvdWxkIHVzZSBpdCBsaWtlIHRoaXM6XG5cdFx0ICpcblx0XHQgKiBgYGBqc1xuXHRcdCAqIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjZGF0YScsIHtcblx0XHQgKiAgICAgJ3N0eWxlJzoge1xuXHRcdCAqICAgICAgICAgLy8gdG9rZW5cblx0XHQgKiAgICAgfVxuXHRcdCAqIH0pO1xuXHRcdCAqIGBgYFxuXHRcdCAqXG5cdFx0ICogIyMgU3BlY2lhbCBjYXNlc1xuXHRcdCAqXG5cdFx0ICogSWYgdGhlIGdyYW1tYXJzIG9mIGBpbnNpZGVgIGFuZCBgaW5zZXJ0YCBoYXZlIHRva2VucyB3aXRoIHRoZSBzYW1lIG5hbWUsIHRoZSB0b2tlbnMgaW4gYGluc2lkZWAncyBncmFtbWFyXG5cdFx0ICogd2lsbCBiZSBpZ25vcmVkLlxuXHRcdCAqXG5cdFx0ICogVGhpcyBiZWhhdmlvciBjYW4gYmUgdXNlZCB0byBpbnNlcnQgdG9rZW5zIGFmdGVyIGBiZWZvcmVgOlxuXHRcdCAqXG5cdFx0ICogYGBganNcblx0XHQgKiBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAnY29tbWVudCcsIHtcblx0XHQgKiAgICAgJ2NvbW1lbnQnOiBQcmlzbS5sYW5ndWFnZXMubWFya3VwLmNvbW1lbnQsXG5cdFx0ICogICAgIC8vIHRva2VucyBhZnRlciAnY29tbWVudCdcblx0XHQgKiB9KTtcblx0XHQgKiBgYGBcblx0XHQgKlxuXHRcdCAqICMjIExpbWl0YXRpb25zXG5cdFx0ICpcblx0XHQgKiBUaGUgbWFpbiBwcm9ibGVtIGBpbnNlcnRCZWZvcmVgIGhhcyB0byBzb2x2ZSBpcyBpdGVyYXRpb24gb3JkZXIuIFNpbmNlIEVTMjAxNSwgdGhlIGl0ZXJhdGlvbiBvcmRlciBmb3Igb2JqZWN0XG5cdFx0ICogcHJvcGVydGllcyBpcyBndWFyYW50ZWVkIHRvIGJlIHRoZSBpbnNlcnRpb24gb3JkZXIgKGV4Y2VwdCBmb3IgaW50ZWdlciBrZXlzKSBidXQgc29tZSBicm93c2VycyBiZWhhdmVcblx0XHQgKiBkaWZmZXJlbnRseSB3aGVuIGtleXMgYXJlIGRlbGV0ZWQgYW5kIHJlLWluc2VydGVkLiBTbyBgaW5zZXJ0QmVmb3JlYCBjYW4ndCBiZSBpbXBsZW1lbnRlZCBieSB0ZW1wb3JhcmlseVxuXHRcdCAqIGRlbGV0aW5nIHByb3BlcnRpZXMgd2hpY2ggaXMgbmVjZXNzYXJ5IHRvIGluc2VydCBhdCBhcmJpdHJhcnkgcG9zaXRpb25zLlxuXHRcdCAqXG5cdFx0ICogVG8gc29sdmUgdGhpcyBwcm9ibGVtLCBgaW5zZXJ0QmVmb3JlYCBkb2Vzbid0IGFjdHVhbGx5IGluc2VydCB0aGUgZ2l2ZW4gdG9rZW5zIGludG8gdGhlIHRhcmdldCBvYmplY3QuXG5cdFx0ICogSW5zdGVhZCwgaXQgd2lsbCBjcmVhdGUgYSBuZXcgb2JqZWN0IGFuZCByZXBsYWNlIGFsbCByZWZlcmVuY2VzIHRvIHRoZSB0YXJnZXQgb2JqZWN0IHdpdGggdGhlIG5ldyBvbmUuIFRoaXNcblx0XHQgKiBjYW4gYmUgZG9uZSB3aXRob3V0IHRlbXBvcmFyaWx5IGRlbGV0aW5nIHByb3BlcnRpZXMsIHNvIHRoZSBpdGVyYXRpb24gb3JkZXIgaXMgd2VsbC1kZWZpbmVkLlxuXHRcdCAqXG5cdFx0ICogSG93ZXZlciwgb25seSByZWZlcmVuY2VzIHRoYXQgY2FuIGJlIHJlYWNoZWQgZnJvbSBgUHJpc20ubGFuZ3VhZ2VzYCBvciBgaW5zZXJ0YCB3aWxsIGJlIHJlcGxhY2VkLiBJLmUuIGlmXG5cdFx0ICogeW91IGhvbGQgdGhlIHRhcmdldCBvYmplY3QgaW4gYSB2YXJpYWJsZSwgdGhlbiB0aGUgdmFsdWUgb2YgdGhlIHZhcmlhYmxlIHdpbGwgbm90IGNoYW5nZS5cblx0XHQgKlxuXHRcdCAqIGBgYGpzXG5cdFx0ICogdmFyIG9sZE1hcmt1cCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cdFx0ICogdmFyIG5ld01hcmt1cCA9IFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjb21tZW50JywgeyAuLi4gfSk7XG5cdFx0ICpcblx0XHQgKiBhc3NlcnQob2xkTWFya3VwICE9PSBQcmlzbS5sYW5ndWFnZXMubWFya3VwKTtcblx0XHQgKiBhc3NlcnQobmV3TWFya3VwID09PSBQcmlzbS5sYW5ndWFnZXMubWFya3VwKTtcblx0XHQgKiBgYGBcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpbnNpZGUgVGhlIHByb3BlcnR5IG9mIGByb290YCAoZS5nLiBhIGxhbmd1YWdlIGlkIGluIGBQcmlzbS5sYW5ndWFnZXNgKSB0aGF0IGNvbnRhaW5zIHRoZVxuXHRcdCAqIG9iamVjdCB0byBiZSBtb2RpZmllZC5cblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gYmVmb3JlIFRoZSBrZXkgdG8gaW5zZXJ0IGJlZm9yZS5cblx0XHQgKiBAcGFyYW0ge0dyYW1tYXJ9IGluc2VydCBBbiBvYmplY3QgY29udGFpbmluZyB0aGUga2V5LXZhbHVlIHBhaXJzIHRvIGJlIGluc2VydGVkLlxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gW3Jvb3RdIFRoZSBvYmplY3QgY29udGFpbmluZyBgaW5zaWRlYCwgaS5lLiB0aGUgb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlXG5cdFx0ICogb2JqZWN0IHRvIGJlIG1vZGlmaWVkLlxuXHRcdCAqXG5cdFx0ICogRGVmYXVsdHMgdG8gYFByaXNtLmxhbmd1YWdlc2AuXG5cdFx0ICogQHJldHVybnMge0dyYW1tYXJ9IFRoZSBuZXcgZ3JhbW1hciBvYmplY3QuXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGluc2VydEJlZm9yZTogZnVuY3Rpb24gKGluc2lkZSwgYmVmb3JlLCBpbnNlcnQsIHJvb3QpIHtcblx0XHRcdHJvb3QgPSByb290IHx8IC8qKiBAdHlwZSB7YW55fSAqLyAoXy5sYW5ndWFnZXMpO1xuXHRcdFx0dmFyIGdyYW1tYXIgPSByb290W2luc2lkZV07XG5cdFx0XHQvKiogQHR5cGUge0dyYW1tYXJ9ICovXG5cdFx0XHR2YXIgcmV0ID0ge307XG5cblx0XHRcdGZvciAodmFyIHRva2VuIGluIGdyYW1tYXIpIHtcblx0XHRcdFx0aWYgKGdyYW1tYXIuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG5cblx0XHRcdFx0XHRpZiAodG9rZW4gPT0gYmVmb3JlKSB7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBuZXdUb2tlbiBpbiBpbnNlcnQpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGluc2VydC5oYXNPd25Qcm9wZXJ0eShuZXdUb2tlbikpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXRbbmV3VG9rZW5dID0gaW5zZXJ0W25ld1Rva2VuXTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIERvIG5vdCBpbnNlcnQgdG9rZW4gd2hpY2ggYWxzbyBvY2N1ciBpbiBpbnNlcnQuIFNlZSAjMTUyNVxuXHRcdFx0XHRcdGlmICghaW5zZXJ0Lmhhc093blByb3BlcnR5KHRva2VuKSkge1xuXHRcdFx0XHRcdFx0cmV0W3Rva2VuXSA9IGdyYW1tYXJbdG9rZW5dO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgb2xkID0gcm9vdFtpbnNpZGVdO1xuXHRcdFx0cm9vdFtpbnNpZGVdID0gcmV0O1xuXG5cdFx0XHQvLyBVcGRhdGUgcmVmZXJlbmNlcyBpbiBvdGhlciBsYW5ndWFnZSBkZWZpbml0aW9uc1xuXHRcdFx0Xy5sYW5ndWFnZXMuREZTKF8ubGFuZ3VhZ2VzLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gb2xkICYmIGtleSAhPSBpbnNpZGUpIHtcblx0XHRcdFx0XHR0aGlzW2tleV0gPSByZXQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH0sXG5cblx0XHQvLyBUcmF2ZXJzZSBhIGxhbmd1YWdlIGRlZmluaXRpb24gd2l0aCBEZXB0aCBGaXJzdCBTZWFyY2hcblx0XHRERlM6IGZ1bmN0aW9uIERGUyhvLCBjYWxsYmFjaywgdHlwZSwgdmlzaXRlZCkge1xuXHRcdFx0dmlzaXRlZCA9IHZpc2l0ZWQgfHwge307XG5cblx0XHRcdHZhciBvYmpJZCA9IF8udXRpbC5vYmpJZDtcblxuXHRcdFx0Zm9yICh2YXIgaSBpbiBvKSB7XG5cdFx0XHRcdGlmIChvLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2suY2FsbChvLCBpLCBvW2ldLCB0eXBlIHx8IGkpO1xuXG5cdFx0XHRcdFx0dmFyIHByb3BlcnR5ID0gb1tpXSxcblx0XHRcdFx0XHQgICAgcHJvcGVydHlUeXBlID0gXy51dGlsLnR5cGUocHJvcGVydHkpO1xuXG5cdFx0XHRcdFx0aWYgKHByb3BlcnR5VHlwZSA9PT0gJ09iamVjdCcgJiYgIXZpc2l0ZWRbb2JqSWQocHJvcGVydHkpXSkge1xuXHRcdFx0XHRcdFx0dmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldID0gdHJ1ZTtcblx0XHRcdFx0XHRcdERGUyhwcm9wZXJ0eSwgY2FsbGJhY2ssIG51bGwsIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmIChwcm9wZXJ0eVR5cGUgPT09ICdBcnJheScgJiYgIXZpc2l0ZWRbb2JqSWQocHJvcGVydHkpXSkge1xuXHRcdFx0XHRcdFx0dmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldID0gdHJ1ZTtcblx0XHRcdFx0XHRcdERGUyhwcm9wZXJ0eSwgY2FsbGJhY2ssIGksIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRwbHVnaW5zOiB7fSxcblxuXHQvKipcblx0ICogVGhpcyBpcyB0aGUgbW9zdCBoaWdoLWxldmVsIGZ1bmN0aW9uIGluIFByaXNt4oCZcyBBUEkuXG5cdCAqIEl0IGZldGNoZXMgYWxsIHRoZSBlbGVtZW50cyB0aGF0IGhhdmUgYSBgLmxhbmd1YWdlLXh4eHhgIGNsYXNzIGFuZCB0aGVuIGNhbGxzIHtAbGluayBQcmlzbS5oaWdobGlnaHRFbGVtZW50fSBvblxuXHQgKiBlYWNoIG9uZSBvZiB0aGVtLlxuXHQgKlxuXHQgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gYFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyKGRvY3VtZW50LCBhc3luYywgY2FsbGJhY2spYC5cblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBbYXN5bmM9ZmFsc2VdIFNhbWUgYXMgaW4ge0BsaW5rIFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyfS5cblx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBTYW1lIGFzIGluIHtAbGluayBQcmlzbS5oaWdobGlnaHRBbGxVbmRlcn0uXG5cdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHRoaWdobGlnaHRBbGw6IGZ1bmN0aW9uKGFzeW5jLCBjYWxsYmFjaykge1xuXHRcdF8uaGlnaGxpZ2h0QWxsVW5kZXIoZG9jdW1lbnQsIGFzeW5jLCBjYWxsYmFjayk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEZldGNoZXMgYWxsIHRoZSBkZXNjZW5kYW50cyBvZiBgY29udGFpbmVyYCB0aGF0IGhhdmUgYSBgLmxhbmd1YWdlLXh4eHhgIGNsYXNzIGFuZCB0aGVuIGNhbGxzXG5cdCAqIHtAbGluayBQcmlzbS5oaWdobGlnaHRFbGVtZW50fSBvbiBlYWNoIG9uZSBvZiB0aGVtLlxuXHQgKlxuXHQgKiBUaGUgZm9sbG93aW5nIGhvb2tzIHdpbGwgYmUgcnVuOlxuXHQgKiAxLiBgYmVmb3JlLWhpZ2hsaWdodGFsbGBcblx0ICogMi4gYGJlZm9yZS1hbGwtZWxlbWVudHMtaGlnaGxpZ2h0YFxuXHQgKiAzLiBBbGwgaG9va3Mgb2Yge0BsaW5rIFByaXNtLmhpZ2hsaWdodEVsZW1lbnR9IGZvciBlYWNoIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7UGFyZW50Tm9kZX0gY29udGFpbmVyIFRoZSByb290IGVsZW1lbnQsIHdob3NlIGRlc2NlbmRhbnRzIHRoYXQgaGF2ZSBhIGAubGFuZ3VhZ2UteHh4eGAgY2xhc3Mgd2lsbCBiZSBoaWdobGlnaHRlZC5cblx0ICogQHBhcmFtIHtib29sZWFufSBbYXN5bmM9ZmFsc2VdIFdoZXRoZXIgZWFjaCBlbGVtZW50IGlzIHRvIGJlIGhpZ2hsaWdodGVkIGFzeW5jaHJvbm91c2x5IHVzaW5nIFdlYiBXb3JrZXJzLlxuXHQgKiBAcGFyYW0ge0hpZ2hsaWdodENhbGxiYWNrfSBbY2FsbGJhY2tdIEFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgb24gZWFjaCBlbGVtZW50IGFmdGVyIGl0cyBoaWdobGlnaHRpbmcgaXMgZG9uZS5cblx0ICogQG1lbWJlcm9mIFByaXNtXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdGhpZ2hsaWdodEFsbFVuZGVyOiBmdW5jdGlvbihjb250YWluZXIsIGFzeW5jLCBjYWxsYmFjaykge1xuXHRcdHZhciBlbnYgPSB7XG5cdFx0XHRjYWxsYmFjazogY2FsbGJhY2ssXG5cdFx0XHRjb250YWluZXI6IGNvbnRhaW5lcixcblx0XHRcdHNlbGVjdG9yOiAnY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0sIFtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gY29kZSwgY29kZVtjbGFzcyo9XCJsYW5nLVwiXSwgW2NsYXNzKj1cImxhbmctXCJdIGNvZGUnXG5cdFx0fTtcblxuXHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaGlnaGxpZ2h0YWxsJywgZW52KTtcblxuXHRcdGVudi5lbGVtZW50cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShlbnYuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoZW52LnNlbGVjdG9yKSk7XG5cblx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWFsbC1lbGVtZW50cy1oaWdobGlnaHQnLCBlbnYpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGVsZW1lbnQ7IGVsZW1lbnQgPSBlbnYuZWxlbWVudHNbaSsrXTspIHtcblx0XHRcdF8uaGlnaGxpZ2h0RWxlbWVudChlbGVtZW50LCBhc3luYyA9PT0gdHJ1ZSwgZW52LmNhbGxiYWNrKTtcblx0XHR9XG5cdH0sXG5cblx0LyoqXG5cdCAqIEhpZ2hsaWdodHMgdGhlIGNvZGUgaW5zaWRlIGEgc2luZ2xlIGVsZW1lbnQuXG5cdCAqXG5cdCAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG5cdCAqIDEuIGBiZWZvcmUtc2FuaXR5LWNoZWNrYFxuXHQgKiAyLiBgYmVmb3JlLWhpZ2hsaWdodGBcblx0ICogMy4gQWxsIGhvb2tzIG9mIHtAbGluayBQcmlzbS5oaWdobGlnaHR9LiBUaGVzZSBob29rcyB3aWxsIGJlIHJ1biBieSBhbiBhc3luY2hyb25vdXMgd29ya2VyIGlmIGBhc3luY2AgaXMgYHRydWVgLlxuXHQgKiA0LiBgYmVmb3JlLWluc2VydGBcblx0ICogNS4gYGFmdGVyLWhpZ2hsaWdodGBcblx0ICogNi4gYGNvbXBsZXRlYFxuXHQgKlxuXHQgKiBTb21lIHRoZSBhYm92ZSBob29rcyB3aWxsIGJlIHNraXBwZWQgaWYgdGhlIGVsZW1lbnQgZG9lc24ndCBjb250YWluIGFueSB0ZXh0IG9yIHRoZXJlIGlzIG5vIGdyYW1tYXIgbG9hZGVkIGZvclxuXHQgKiB0aGUgZWxlbWVudCdzIGxhbmd1YWdlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgY29udGFpbmluZyB0aGUgY29kZS5cblx0ICogSXQgbXVzdCBoYXZlIGEgY2xhc3Mgb2YgYGxhbmd1YWdlLXh4eHhgIHRvIGJlIHByb2Nlc3NlZCwgd2hlcmUgYHh4eHhgIGlzIGEgdmFsaWQgbGFuZ3VhZ2UgaWRlbnRpZmllci5cblx0ICogQHBhcmFtIHtib29sZWFufSBbYXN5bmM9ZmFsc2VdIFdoZXRoZXIgdGhlIGVsZW1lbnQgaXMgdG8gYmUgaGlnaGxpZ2h0ZWQgYXN5bmNocm9ub3VzbHkgdXNpbmcgV2ViIFdvcmtlcnNcblx0ICogdG8gaW1wcm92ZSBwZXJmb3JtYW5jZSBhbmQgYXZvaWQgYmxvY2tpbmcgdGhlIFVJIHdoZW4gaGlnaGxpZ2h0aW5nIHZlcnkgbGFyZ2UgY2h1bmtzIG9mIGNvZGUuIFRoaXMgb3B0aW9uIGlzXG5cdCAqIFtkaXNhYmxlZCBieSBkZWZhdWx0XShodHRwczovL3ByaXNtanMuY29tL2ZhcS5odG1sI3doeS1pcy1hc3luY2hyb25vdXMtaGlnaGxpZ2h0aW5nLWRpc2FibGVkLWJ5LWRlZmF1bHQpLlxuXHQgKlxuXHQgKiBOb3RlOiBBbGwgbGFuZ3VhZ2UgZGVmaW5pdGlvbnMgcmVxdWlyZWQgdG8gaGlnaGxpZ2h0IHRoZSBjb2RlIG11c3QgYmUgaW5jbHVkZWQgaW4gdGhlIG1haW4gYHByaXNtLmpzYCBmaWxlIGZvclxuXHQgKiBhc3luY2hyb25vdXMgaGlnaGxpZ2h0aW5nIHRvIHdvcmsuIFlvdSBjYW4gYnVpbGQgeW91ciBvd24gYnVuZGxlIG9uIHRoZVxuXHQgKiBbRG93bmxvYWQgcGFnZV0oaHR0cHM6Ly9wcmlzbWpzLmNvbS9kb3dubG9hZC5odG1sKS5cblx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBBbiBvcHRpb25hbCBjYWxsYmFjayB0byBiZSBpbnZva2VkIGFmdGVyIHRoZSBoaWdobGlnaHRpbmcgaXMgZG9uZS5cblx0ICogTW9zdGx5IHVzZWZ1bCB3aGVuIGBhc3luY2AgaXMgYHRydWVgLCBzaW5jZSBpbiB0aGF0IGNhc2UsIHRoZSBoaWdobGlnaHRpbmcgaXMgZG9uZSBhc3luY2hyb25vdXNseS5cblx0ICogQG1lbWJlcm9mIFByaXNtXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdGhpZ2hsaWdodEVsZW1lbnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIGFzeW5jLCBjYWxsYmFjaykge1xuXHRcdC8vIEZpbmQgbGFuZ3VhZ2Vcblx0XHR2YXIgbGFuZ3VhZ2UgPSBfLnV0aWwuZ2V0TGFuZ3VhZ2UoZWxlbWVudCk7XG5cdFx0dmFyIGdyYW1tYXIgPSBfLmxhbmd1YWdlc1tsYW5ndWFnZV07XG5cblx0XHQvLyBTZXQgbGFuZ3VhZ2Ugb24gdGhlIGVsZW1lbnQsIGlmIG5vdCBwcmVzZW50XG5cdFx0ZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKGxhbmcsICcnKS5yZXBsYWNlKC9cXHMrL2csICcgJykgKyAnIGxhbmd1YWdlLScgKyBsYW5ndWFnZTtcblxuXHRcdC8vIFNldCBsYW5ndWFnZSBvbiB0aGUgcGFyZW50LCBmb3Igc3R5bGluZ1xuXHRcdHZhciBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0aWYgKHBhcmVudCAmJiBwYXJlbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3ByZScpIHtcblx0XHRcdHBhcmVudC5jbGFzc05hbWUgPSBwYXJlbnQuY2xhc3NOYW1lLnJlcGxhY2UobGFuZywgJycpLnJlcGxhY2UoL1xccysvZywgJyAnKSArICcgbGFuZ3VhZ2UtJyArIGxhbmd1YWdlO1xuXHRcdH1cblxuXHRcdHZhciBjb2RlID0gZWxlbWVudC50ZXh0Q29udGVudDtcblxuXHRcdHZhciBlbnYgPSB7XG5cdFx0XHRlbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0bGFuZ3VhZ2U6IGxhbmd1YWdlLFxuXHRcdFx0Z3JhbW1hcjogZ3JhbW1hcixcblx0XHRcdGNvZGU6IGNvZGVcblx0XHR9O1xuXG5cdFx0ZnVuY3Rpb24gaW5zZXJ0SGlnaGxpZ2h0ZWRDb2RlKGhpZ2hsaWdodGVkQ29kZSkge1xuXHRcdFx0ZW52LmhpZ2hsaWdodGVkQ29kZSA9IGhpZ2hsaWdodGVkQ29kZTtcblxuXHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1pbnNlcnQnLCBlbnYpO1xuXG5cdFx0XHRlbnYuZWxlbWVudC5pbm5lckhUTUwgPSBlbnYuaGlnaGxpZ2h0ZWRDb2RlO1xuXG5cdFx0XHRfLmhvb2tzLnJ1bignYWZ0ZXItaGlnaGxpZ2h0JywgZW52KTtcblx0XHRcdF8uaG9va3MucnVuKCdjb21wbGV0ZScsIGVudik7XG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKGVudi5lbGVtZW50KTtcblx0XHR9XG5cblx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLXNhbml0eS1jaGVjaycsIGVudik7XG5cblx0XHRpZiAoIWVudi5jb2RlKSB7XG5cdFx0XHRfLmhvb2tzLnJ1bignY29tcGxldGUnLCBlbnYpO1xuXHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbChlbnYuZWxlbWVudCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1oaWdobGlnaHQnLCBlbnYpO1xuXG5cdFx0aWYgKCFlbnYuZ3JhbW1hcikge1xuXHRcdFx0aW5zZXJ0SGlnaGxpZ2h0ZWRDb2RlKF8udXRpbC5lbmNvZGUoZW52LmNvZGUpKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoYXN5bmMgJiYgX3NlbGYuV29ya2VyKSB7XG5cdFx0XHR2YXIgd29ya2VyID0gbmV3IFdvcmtlcihfLmZpbGVuYW1lKTtcblxuXHRcdFx0d29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRpbnNlcnRIaWdobGlnaHRlZENvZGUoZXZ0LmRhdGEpO1xuXHRcdFx0fTtcblxuXHRcdFx0d29ya2VyLnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0bGFuZ3VhZ2U6IGVudi5sYW5ndWFnZSxcblx0XHRcdFx0Y29kZTogZW52LmNvZGUsXG5cdFx0XHRcdGltbWVkaWF0ZUNsb3NlOiB0cnVlXG5cdFx0XHR9KSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aW5zZXJ0SGlnaGxpZ2h0ZWRDb2RlKF8uaGlnaGxpZ2h0KGVudi5jb2RlLCBlbnYuZ3JhbW1hciwgZW52Lmxhbmd1YWdlKSk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBMb3ctbGV2ZWwgZnVuY3Rpb24sIG9ubHkgdXNlIGlmIHlvdSBrbm93IHdoYXQgeW914oCZcmUgZG9pbmcuIEl0IGFjY2VwdHMgYSBzdHJpbmcgb2YgdGV4dCBhcyBpbnB1dFxuXHQgKiBhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb25zIHRvIHVzZSwgYW5kIHJldHVybnMgYSBzdHJpbmcgd2l0aCB0aGUgSFRNTCBwcm9kdWNlZC5cblx0ICpcblx0ICogVGhlIGZvbGxvd2luZyBob29rcyB3aWxsIGJlIHJ1bjpcblx0ICogMS4gYGJlZm9yZS10b2tlbml6ZWBcblx0ICogMi4gYGFmdGVyLXRva2VuaXplYFxuXHQgKiAzLiBgd3JhcGA6IE9uIGVhY2gge0BsaW5rIFRva2VufS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQgQSBzdHJpbmcgd2l0aCB0aGUgY29kZSB0byBiZSBoaWdobGlnaHRlZC5cblx0ICogQHBhcmFtIHtHcmFtbWFyfSBncmFtbWFyIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSB0b2tlbnMgdG8gdXNlLlxuXHQgKlxuXHQgKiBVc3VhbGx5IGEgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBsaWtlIGBQcmlzbS5sYW5ndWFnZXMubWFya3VwYC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIFRoZSBuYW1lIG9mIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9uIHBhc3NlZCB0byBgZ3JhbW1hcmAuXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBoaWdobGlnaHRlZCBIVE1MLlxuXHQgKiBAbWVtYmVyb2YgUHJpc21cblx0ICogQHB1YmxpY1xuXHQgKiBAZXhhbXBsZVxuXHQgKiBQcmlzbS5oaWdobGlnaHQoJ3ZhciBmb28gPSB0cnVlOycsIFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0LCAnamF2YXNjcmlwdCcpO1xuXHQgKi9cblx0aGlnaGxpZ2h0OiBmdW5jdGlvbiAodGV4dCwgZ3JhbW1hciwgbGFuZ3VhZ2UpIHtcblx0XHR2YXIgZW52ID0ge1xuXHRcdFx0Y29kZTogdGV4dCxcblx0XHRcdGdyYW1tYXI6IGdyYW1tYXIsXG5cdFx0XHRsYW5ndWFnZTogbGFuZ3VhZ2Vcblx0XHR9O1xuXHRcdF8uaG9va3MucnVuKCdiZWZvcmUtdG9rZW5pemUnLCBlbnYpO1xuXHRcdGVudi50b2tlbnMgPSBfLnRva2VuaXplKGVudi5jb2RlLCBlbnYuZ3JhbW1hcik7XG5cdFx0Xy5ob29rcy5ydW4oJ2FmdGVyLXRva2VuaXplJywgZW52KTtcblx0XHRyZXR1cm4gVG9rZW4uc3RyaW5naWZ5KF8udXRpbC5lbmNvZGUoZW52LnRva2VucyksIGVudi5sYW5ndWFnZSk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIFRoaXMgaXMgdGhlIGhlYXJ0IG9mIFByaXNtLCBhbmQgdGhlIG1vc3QgbG93LWxldmVsIGZ1bmN0aW9uIHlvdSBjYW4gdXNlLiBJdCBhY2NlcHRzIGEgc3RyaW5nIG9mIHRleHQgYXMgaW5wdXRcblx0ICogYW5kIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9ucyB0byB1c2UsIGFuZCByZXR1cm5zIGFuIGFycmF5IHdpdGggdGhlIHRva2VuaXplZCBjb2RlLlxuXHQgKlxuXHQgKiBXaGVuIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9uIGluY2x1ZGVzIG5lc3RlZCB0b2tlbnMsIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgcmVjdXJzaXZlbHkgb24gZWFjaCBvZiB0aGVzZSB0b2tlbnMuXG5cdCAqXG5cdCAqIFRoaXMgbWV0aG9kIGNvdWxkIGJlIHVzZWZ1bCBpbiBvdGhlciBjb250ZXh0cyBhcyB3ZWxsLCBhcyBhIHZlcnkgY3J1ZGUgcGFyc2VyLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBBIHN0cmluZyB3aXRoIHRoZSBjb2RlIHRvIGJlIGhpZ2hsaWdodGVkLlxuXHQgKiBAcGFyYW0ge0dyYW1tYXJ9IGdyYW1tYXIgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHRva2VucyB0byB1c2UuXG5cdCAqXG5cdCAqIFVzdWFsbHkgYSBsYW5ndWFnZSBkZWZpbml0aW9uIGxpa2UgYFByaXNtLmxhbmd1YWdlcy5tYXJrdXBgLlxuXHQgKiBAcmV0dXJucyB7VG9rZW5TdHJlYW19IEFuIGFycmF5IG9mIHN0cmluZ3MgYW5kIHRva2VucywgYSB0b2tlbiBzdHJlYW0uXG5cdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHQgKiBAcHVibGljXG5cdCAqIEBleGFtcGxlXG5cdCAqIGxldCBjb2RlID0gYHZhciBmb28gPSAwO2A7XG5cdCAqIGxldCB0b2tlbnMgPSBQcmlzbS50b2tlbml6ZShjb2RlLCBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdCk7XG5cdCAqIHRva2Vucy5mb3JFYWNoKHRva2VuID0+IHtcblx0ICogICAgIGlmICh0b2tlbiBpbnN0YW5jZW9mIFByaXNtLlRva2VuICYmIHRva2VuLnR5cGUgPT09ICdudW1iZXInKSB7XG5cdCAqICAgICAgICAgY29uc29sZS5sb2coYEZvdW5kIG51bWVyaWMgbGl0ZXJhbDogJHt0b2tlbi5jb250ZW50fWApO1xuXHQgKiAgICAgfVxuXHQgKiB9KTtcblx0ICovXG5cdHRva2VuaXplOiBmdW5jdGlvbih0ZXh0LCBncmFtbWFyKSB7XG5cdFx0dmFyIHJlc3QgPSBncmFtbWFyLnJlc3Q7XG5cdFx0aWYgKHJlc3QpIHtcblx0XHRcdGZvciAodmFyIHRva2VuIGluIHJlc3QpIHtcblx0XHRcdFx0Z3JhbW1hclt0b2tlbl0gPSByZXN0W3Rva2VuXTtcblx0XHRcdH1cblxuXHRcdFx0ZGVsZXRlIGdyYW1tYXIucmVzdDtcblx0XHR9XG5cblx0XHR2YXIgdG9rZW5MaXN0ID0gbmV3IExpbmtlZExpc3QoKTtcblx0XHRhZGRBZnRlcih0b2tlbkxpc3QsIHRva2VuTGlzdC5oZWFkLCB0ZXh0KTtcblxuXHRcdG1hdGNoR3JhbW1hcih0ZXh0LCB0b2tlbkxpc3QsIGdyYW1tYXIsIHRva2VuTGlzdC5oZWFkLCAwKTtcblxuXHRcdHJldHVybiB0b0FycmF5KHRva2VuTGlzdCk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEBuYW1lc3BhY2Vcblx0ICogQG1lbWJlcm9mIFByaXNtXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdGhvb2tzOiB7XG5cdFx0YWxsOiB7fSxcblxuXHRcdC8qKlxuXHRcdCAqIEFkZHMgdGhlIGdpdmVuIGNhbGxiYWNrIHRvIHRoZSBsaXN0IG9mIGNhbGxiYWNrcyBmb3IgdGhlIGdpdmVuIGhvb2suXG5cdFx0ICpcblx0XHQgKiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGhvb2sgaXQgaXMgcmVnaXN0ZXJlZCBmb3IgaXMgcnVuLlxuXHRcdCAqIEhvb2tzIGFyZSB1c3VhbGx5IGRpcmVjdGx5IHJ1biBieSBhIGhpZ2hsaWdodCBmdW5jdGlvbiBidXQgeW91IGNhbiBhbHNvIHJ1biBob29rcyB5b3Vyc2VsZi5cblx0XHQgKlxuXHRcdCAqIE9uZSBjYWxsYmFjayBmdW5jdGlvbiBjYW4gYmUgcmVnaXN0ZXJlZCB0byBtdWx0aXBsZSBob29rcyBhbmQgdGhlIHNhbWUgaG9vayBtdWx0aXBsZSB0aW1lcy5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBob29rLlxuXHRcdCAqIEBwYXJhbSB7SG9va0NhbGxiYWNrfSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgZ2l2ZW4gZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRhZGQ6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIGhvb2tzID0gXy5ob29rcy5hbGw7XG5cblx0XHRcdGhvb2tzW25hbWVdID0gaG9va3NbbmFtZV0gfHwgW107XG5cblx0XHRcdGhvb2tzW25hbWVdLnB1c2goY2FsbGJhY2spO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSdW5zIGEgaG9vayBpbnZva2luZyBhbGwgcmVnaXN0ZXJlZCBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuXHRcdCAqXG5cdFx0ICogQ2FsbGJhY2tzIHdpbGwgYmUgaW52b2tlZCBzeW5jaHJvbm91c2x5IGFuZCBpbiB0aGUgb3JkZXIgaW4gd2hpY2ggdGhleSB3ZXJlIHJlZ2lzdGVyZWQuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgaG9vay5cblx0XHQgKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IGVudiBUaGUgZW52aXJvbm1lbnQgdmFyaWFibGVzIG9mIHRoZSBob29rIHBhc3NlZCB0byBhbGwgY2FsbGJhY2tzIHJlZ2lzdGVyZWQuXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdHJ1bjogZnVuY3Rpb24gKG5hbWUsIGVudikge1xuXHRcdFx0dmFyIGNhbGxiYWNrcyA9IF8uaG9va3MuYWxsW25hbWVdO1xuXG5cdFx0XHRpZiAoIWNhbGxiYWNrcyB8fCAhY2FsbGJhY2tzLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGZvciAodmFyIGk9MCwgY2FsbGJhY2s7IGNhbGxiYWNrID0gY2FsbGJhY2tzW2krK107KSB7XG5cdFx0XHRcdGNhbGxiYWNrKGVudik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdFRva2VuOiBUb2tlblxufTtcbl9zZWxmLlByaXNtID0gXztcblxuXG4vLyBUeXBlc2NyaXB0IG5vdGU6XG4vLyBUaGUgZm9sbG93aW5nIGNhbiBiZSB1c2VkIHRvIGltcG9ydCB0aGUgVG9rZW4gdHlwZSBpbiBKU0RvYzpcbi8vXG4vLyAgIEB0eXBlZGVmIHtJbnN0YW5jZVR5cGU8aW1wb3J0KFwiLi9wcmlzbS1jb3JlXCIpW1wiVG9rZW5cIl0+fSBUb2tlblxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdG9rZW4uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgU2VlIHtAbGluayBUb2tlbiN0eXBlIHR5cGV9XG4gKiBAcGFyYW0ge3N0cmluZyB8IFRva2VuU3RyZWFtfSBjb250ZW50IFNlZSB7QGxpbmsgVG9rZW4jY29udGVudCBjb250ZW50fVxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IFthbGlhc10gVGhlIGFsaWFzKGVzKSBvZiB0aGUgdG9rZW4uXG4gKiBAcGFyYW0ge3N0cmluZ30gW21hdGNoZWRTdHI9XCJcIl0gQSBjb3B5IG9mIHRoZSBmdWxsIHN0cmluZyB0aGlzIHRva2VuIHdhcyBjcmVhdGVkIGZyb20uXG4gKiBAY2xhc3NcbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gVG9rZW4odHlwZSwgY29udGVudCwgYWxpYXMsIG1hdGNoZWRTdHIpIHtcblx0LyoqXG5cdCAqIFRoZSB0eXBlIG9mIHRoZSB0b2tlbi5cblx0ICpcblx0ICogVGhpcyBpcyB1c3VhbGx5IHRoZSBrZXkgb2YgYSBwYXR0ZXJuIGluIGEge0BsaW5rIEdyYW1tYXJ9LlxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKiBAc2VlIEdyYW1tYXJUb2tlblxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHR0aGlzLnR5cGUgPSB0eXBlO1xuXHQvKipcblx0ICogVGhlIHN0cmluZ3Mgb3IgdG9rZW5zIGNvbnRhaW5lZCBieSB0aGlzIHRva2VuLlxuXHQgKlxuXHQgKiBUaGlzIHdpbGwgYmUgYSB0b2tlbiBzdHJlYW0gaWYgdGhlIHBhdHRlcm4gbWF0Y2hlZCBhbHNvIGRlZmluZWQgYW4gYGluc2lkZWAgZ3JhbW1hci5cblx0ICpcblx0ICogQHR5cGUge3N0cmluZyB8IFRva2VuU3RyZWFtfVxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuXHQvKipcblx0ICogVGhlIGFsaWFzKGVzKSBvZiB0aGUgdG9rZW4uXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd8c3RyaW5nW119XG5cdCAqIEBzZWUgR3JhbW1hclRva2VuXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdHRoaXMuYWxpYXMgPSBhbGlhcztcblx0Ly8gQ29weSBvZiB0aGUgZnVsbCBzdHJpbmcgdGhpcyB0b2tlbiB3YXMgY3JlYXRlZCBmcm9tXG5cdHRoaXMubGVuZ3RoID0gKG1hdGNoZWRTdHIgfHwgJycpLmxlbmd0aCB8IDA7XG59XG5cbi8qKlxuICogQSB0b2tlbiBzdHJlYW0gaXMgYW4gYXJyYXkgb2Ygc3RyaW5ncyBhbmQge0BsaW5rIFRva2VuIFRva2VufSBvYmplY3RzLlxuICpcbiAqIFRva2VuIHN0cmVhbXMgaGF2ZSB0byBmdWxmaWxsIGEgZmV3IHByb3BlcnRpZXMgdGhhdCBhcmUgYXNzdW1lZCBieSBtb3N0IGZ1bmN0aW9ucyAobW9zdGx5IGludGVybmFsIG9uZXMpIHRoYXQgcHJvY2Vzc1xuICogdGhlbS5cbiAqXG4gKiAxLiBObyBhZGphY2VudCBzdHJpbmdzLlxuICogMi4gTm8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiAgICBUaGUgb25seSBleGNlcHRpb24gaGVyZSBpcyB0aGUgdG9rZW4gc3RyZWFtIHRoYXQgb25seSBjb250YWlucyB0aGUgZW1wdHkgc3RyaW5nIGFuZCBub3RoaW5nIGVsc2UuXG4gKlxuICogQHR5cGVkZWYge0FycmF5PHN0cmluZyB8IFRva2VuPn0gVG9rZW5TdHJlYW1cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBnaXZlbiB0b2tlbiBvciB0b2tlbiBzdHJlYW0gdG8gYW4gSFRNTCByZXByZXNlbnRhdGlvbi5cbiAqXG4gKiBUaGUgZm9sbG93aW5nIGhvb2tzIHdpbGwgYmUgcnVuOlxuICogMS4gYHdyYXBgOiBPbiBlYWNoIHtAbGluayBUb2tlbn0uXG4gKlxuICogQHBhcmFtIHtzdHJpbmcgfCBUb2tlbiB8IFRva2VuU3RyZWFtfSBvIFRoZSB0b2tlbiBvciB0b2tlbiBzdHJlYW0gdG8gYmUgY29udmVydGVkLlxuICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIFRoZSBuYW1lIG9mIGN1cnJlbnQgbGFuZ3VhZ2UuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgSFRNTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdG9rZW4gb3IgdG9rZW4gc3RyZWFtLlxuICogQG1lbWJlcm9mIFRva2VuXG4gKiBAc3RhdGljXG4gKi9cblRva2VuLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeShvLCBsYW5ndWFnZSkge1xuXHRpZiAodHlwZW9mIG8gPT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gbztcblx0fVxuXHRpZiAoQXJyYXkuaXNBcnJheShvKSkge1xuXHRcdHZhciBzID0gJyc7XG5cdFx0by5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRzICs9IHN0cmluZ2lmeShlLCBsYW5ndWFnZSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHM7XG5cdH1cblxuXHR2YXIgZW52ID0ge1xuXHRcdHR5cGU6IG8udHlwZSxcblx0XHRjb250ZW50OiBzdHJpbmdpZnkoby5jb250ZW50LCBsYW5ndWFnZSksXG5cdFx0dGFnOiAnc3BhbicsXG5cdFx0Y2xhc3NlczogWyd0b2tlbicsIG8udHlwZV0sXG5cdFx0YXR0cmlidXRlczoge30sXG5cdFx0bGFuZ3VhZ2U6IGxhbmd1YWdlXG5cdH07XG5cblx0dmFyIGFsaWFzZXMgPSBvLmFsaWFzO1xuXHRpZiAoYWxpYXNlcykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGFsaWFzZXMpKSB7XG5cdFx0XHRBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShlbnYuY2xhc3NlcywgYWxpYXNlcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVudi5jbGFzc2VzLnB1c2goYWxpYXNlcyk7XG5cdFx0fVxuXHR9XG5cblx0Xy5ob29rcy5ydW4oJ3dyYXAnLCBlbnYpO1xuXG5cdHZhciBhdHRyaWJ1dGVzID0gJyc7XG5cdGZvciAodmFyIG5hbWUgaW4gZW52LmF0dHJpYnV0ZXMpIHtcblx0XHRhdHRyaWJ1dGVzICs9ICcgJyArIG5hbWUgKyAnPVwiJyArIChlbnYuYXR0cmlidXRlc1tuYW1lXSB8fCAnJykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpICsgJ1wiJztcblx0fVxuXG5cdHJldHVybiAnPCcgKyBlbnYudGFnICsgJyBjbGFzcz1cIicgKyBlbnYuY2xhc3Nlcy5qb2luKCcgJykgKyAnXCInICsgYXR0cmlidXRlcyArICc+JyArIGVudi5jb250ZW50ICsgJzwvJyArIGVudi50YWcgKyAnPic7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7UmVnRXhwfSBwYXR0ZXJuXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICogQHBhcmFtIHtib29sZWFufSBsb29rYmVoaW5kXG4gKiBAcmV0dXJucyB7UmVnRXhwRXhlY0FycmF5IHwgbnVsbH1cbiAqL1xuZnVuY3Rpb24gbWF0Y2hQYXR0ZXJuKHBhdHRlcm4sIHBvcywgdGV4dCwgbG9va2JlaGluZCkge1xuXHRwYXR0ZXJuLmxhc3RJbmRleCA9IHBvcztcblx0dmFyIG1hdGNoID0gcGF0dGVybi5leGVjKHRleHQpO1xuXHRpZiAobWF0Y2ggJiYgbG9va2JlaGluZCAmJiBtYXRjaFsxXSkge1xuXHRcdC8vIGNoYW5nZSB0aGUgbWF0Y2ggdG8gcmVtb3ZlIHRoZSB0ZXh0IG1hdGNoZWQgYnkgdGhlIFByaXNtIGxvb2tiZWhpbmQgZ3JvdXBcblx0XHR2YXIgbG9va2JlaGluZExlbmd0aCA9IG1hdGNoWzFdLmxlbmd0aDtcblx0XHRtYXRjaC5pbmRleCArPSBsb29rYmVoaW5kTGVuZ3RoO1xuXHRcdG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UobG9va2JlaGluZExlbmd0aCk7XG5cdH1cblx0cmV0dXJuIG1hdGNoO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKiBAcGFyYW0ge0xpbmtlZExpc3Q8c3RyaW5nIHwgVG9rZW4+fSB0b2tlbkxpc3RcbiAqIEBwYXJhbSB7YW55fSBncmFtbWFyXG4gKiBAcGFyYW0ge0xpbmtlZExpc3ROb2RlPHN0cmluZyB8IFRva2VuPn0gc3RhcnROb2RlXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnRQb3NcbiAqIEBwYXJhbSB7UmVtYXRjaE9wdGlvbnN9IFtyZW1hdGNoXVxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAcHJpdmF0ZVxuICpcbiAqIEB0eXBlZGVmIFJlbWF0Y2hPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY2F1c2VcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSByZWFjaFxuICovXG5mdW5jdGlvbiBtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCBzdGFydE5vZGUsIHN0YXJ0UG9zLCByZW1hdGNoKSB7XG5cdGZvciAodmFyIHRva2VuIGluIGdyYW1tYXIpIHtcblx0XHRpZiAoIWdyYW1tYXIuaGFzT3duUHJvcGVydHkodG9rZW4pIHx8ICFncmFtbWFyW3Rva2VuXSkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dmFyIHBhdHRlcm5zID0gZ3JhbW1hclt0b2tlbl07XG5cdFx0cGF0dGVybnMgPSBBcnJheS5pc0FycmF5KHBhdHRlcm5zKSA/IHBhdHRlcm5zIDogW3BhdHRlcm5zXTtcblxuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgcGF0dGVybnMubGVuZ3RoOyArK2opIHtcblx0XHRcdGlmIChyZW1hdGNoICYmIHJlbWF0Y2guY2F1c2UgPT0gdG9rZW4gKyAnLCcgKyBqKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHBhdHRlcm5PYmogPSBwYXR0ZXJuc1tqXSxcblx0XHRcdFx0aW5zaWRlID0gcGF0dGVybk9iai5pbnNpZGUsXG5cdFx0XHRcdGxvb2tiZWhpbmQgPSAhIXBhdHRlcm5PYmoubG9va2JlaGluZCxcblx0XHRcdFx0Z3JlZWR5ID0gISFwYXR0ZXJuT2JqLmdyZWVkeSxcblx0XHRcdFx0YWxpYXMgPSBwYXR0ZXJuT2JqLmFsaWFzO1xuXG5cdFx0XHRpZiAoZ3JlZWR5ICYmICFwYXR0ZXJuT2JqLnBhdHRlcm4uZ2xvYmFsKSB7XG5cdFx0XHRcdC8vIFdpdGhvdXQgdGhlIGdsb2JhbCBmbGFnLCBsYXN0SW5kZXggd29uJ3Qgd29ya1xuXHRcdFx0XHR2YXIgZmxhZ3MgPSBwYXR0ZXJuT2JqLnBhdHRlcm4udG9TdHJpbmcoKS5tYXRjaCgvW2ltc3V5XSokLylbMF07XG5cdFx0XHRcdHBhdHRlcm5PYmoucGF0dGVybiA9IFJlZ0V4cChwYXR0ZXJuT2JqLnBhdHRlcm4uc291cmNlLCBmbGFncyArICdnJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8qKiBAdHlwZSB7UmVnRXhwfSAqL1xuXHRcdFx0dmFyIHBhdHRlcm4gPSBwYXR0ZXJuT2JqLnBhdHRlcm4gfHwgcGF0dGVybk9iajtcblxuXHRcdFx0Zm9yICggLy8gaXRlcmF0ZSB0aGUgdG9rZW4gbGlzdCBhbmQga2VlcCB0cmFjayBvZiB0aGUgY3VycmVudCB0b2tlbi9zdHJpbmcgcG9zaXRpb25cblx0XHRcdFx0dmFyIGN1cnJlbnROb2RlID0gc3RhcnROb2RlLm5leHQsIHBvcyA9IHN0YXJ0UG9zO1xuXHRcdFx0XHRjdXJyZW50Tm9kZSAhPT0gdG9rZW5MaXN0LnRhaWw7XG5cdFx0XHRcdHBvcyArPSBjdXJyZW50Tm9kZS52YWx1ZS5sZW5ndGgsIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dFxuXHRcdFx0KSB7XG5cblx0XHRcdFx0aWYgKHJlbWF0Y2ggJiYgcG9zID49IHJlbWF0Y2gucmVhY2gpIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBzdHIgPSBjdXJyZW50Tm9kZS52YWx1ZTtcblxuXHRcdFx0XHRpZiAodG9rZW5MaXN0Lmxlbmd0aCA+IHRleHQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0Ly8gU29tZXRoaW5nIHdlbnQgdGVycmlibHkgd3JvbmcsIEFCT1JULCBBQk9SVCFcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoc3RyIGluc3RhbmNlb2YgVG9rZW4pIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciByZW1vdmVDb3VudCA9IDE7IC8vIHRoaXMgaXMgdGhlIHRvIHBhcmFtZXRlciBvZiByZW1vdmVCZXR3ZWVuXG5cdFx0XHRcdHZhciBtYXRjaDtcblxuXHRcdFx0XHRpZiAoZ3JlZWR5KSB7XG5cdFx0XHRcdFx0bWF0Y2ggPSBtYXRjaFBhdHRlcm4ocGF0dGVybiwgcG9zLCB0ZXh0LCBsb29rYmVoaW5kKTtcblx0XHRcdFx0XHRpZiAoIW1hdGNoKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgZnJvbSA9IG1hdGNoLmluZGV4O1xuXHRcdFx0XHRcdHZhciB0byA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXHRcdFx0XHRcdHZhciBwID0gcG9zO1xuXG5cdFx0XHRcdFx0Ly8gZmluZCB0aGUgbm9kZSB0aGF0IGNvbnRhaW5zIHRoZSBtYXRjaFxuXHRcdFx0XHRcdHAgKz0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlIChmcm9tID49IHApIHtcblx0XHRcdFx0XHRcdGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcblx0XHRcdFx0XHRcdHAgKz0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBhZGp1c3QgcG9zIChhbmQgcClcblx0XHRcdFx0XHRwIC09IGN1cnJlbnROb2RlLnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0XHRwb3MgPSBwO1xuXG5cdFx0XHRcdFx0Ly8gdGhlIGN1cnJlbnQgbm9kZSBpcyBhIFRva2VuLCB0aGVuIHRoZSBtYXRjaCBzdGFydHMgaW5zaWRlIGFub3RoZXIgVG9rZW4sIHdoaWNoIGlzIGludmFsaWRcblx0XHRcdFx0XHRpZiAoY3VycmVudE5vZGUudmFsdWUgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gZmluZCB0aGUgbGFzdCBub2RlIHdoaWNoIGlzIGFmZmVjdGVkIGJ5IHRoaXMgbWF0Y2hcblx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0dmFyIGsgPSBjdXJyZW50Tm9kZTtcblx0XHRcdFx0XHRcdGsgIT09IHRva2VuTGlzdC50YWlsICYmIChwIDwgdG8gfHwgdHlwZW9mIGsudmFsdWUgPT09ICdzdHJpbmcnKTtcblx0XHRcdFx0XHRcdGsgPSBrLm5leHRcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHJlbW92ZUNvdW50Kys7XG5cdFx0XHRcdFx0XHRwICs9IGsudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZW1vdmVDb3VudC0tO1xuXG5cdFx0XHRcdFx0Ly8gcmVwbGFjZSB3aXRoIHRoZSBuZXcgbWF0Y2hcblx0XHRcdFx0XHRzdHIgPSB0ZXh0LnNsaWNlKHBvcywgcCk7XG5cdFx0XHRcdFx0bWF0Y2guaW5kZXggLT0gcG9zO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG1hdGNoID0gbWF0Y2hQYXR0ZXJuKHBhdHRlcm4sIDAsIHN0ciwgbG9va2JlaGluZCk7XG5cdFx0XHRcdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGZyb20gPSBtYXRjaC5pbmRleCxcblx0XHRcdFx0XHRtYXRjaFN0ciA9IG1hdGNoWzBdLFxuXHRcdFx0XHRcdGJlZm9yZSA9IHN0ci5zbGljZSgwLCBmcm9tKSxcblx0XHRcdFx0XHRhZnRlciA9IHN0ci5zbGljZShmcm9tICsgbWF0Y2hTdHIubGVuZ3RoKTtcblxuXHRcdFx0XHR2YXIgcmVhY2ggPSBwb3MgKyBzdHIubGVuZ3RoO1xuXHRcdFx0XHRpZiAocmVtYXRjaCAmJiByZWFjaCA+IHJlbWF0Y2gucmVhY2gpIHtcblx0XHRcdFx0XHRyZW1hdGNoLnJlYWNoID0gcmVhY2g7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgcmVtb3ZlRnJvbSA9IGN1cnJlbnROb2RlLnByZXY7XG5cblx0XHRcdFx0aWYgKGJlZm9yZSkge1xuXHRcdFx0XHRcdHJlbW92ZUZyb20gPSBhZGRBZnRlcih0b2tlbkxpc3QsIHJlbW92ZUZyb20sIGJlZm9yZSk7XG5cdFx0XHRcdFx0cG9zICs9IGJlZm9yZS5sZW5ndGg7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZW1vdmVSYW5nZSh0b2tlbkxpc3QsIHJlbW92ZUZyb20sIHJlbW92ZUNvdW50KTtcblxuXHRcdFx0XHR2YXIgd3JhcHBlZCA9IG5ldyBUb2tlbih0b2tlbiwgaW5zaWRlID8gXy50b2tlbml6ZShtYXRjaFN0ciwgaW5zaWRlKSA6IG1hdGNoU3RyLCBhbGlhcywgbWF0Y2hTdHIpO1xuXHRcdFx0XHRjdXJyZW50Tm9kZSA9IGFkZEFmdGVyKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgd3JhcHBlZCk7XG5cblx0XHRcdFx0aWYgKGFmdGVyKSB7XG5cdFx0XHRcdFx0YWRkQWZ0ZXIodG9rZW5MaXN0LCBjdXJyZW50Tm9kZSwgYWZ0ZXIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHJlbW92ZUNvdW50ID4gMSkge1xuXHRcdFx0XHRcdC8vIGF0IGxlYXN0IG9uZSBUb2tlbiBvYmplY3Qgd2FzIHJlbW92ZWQsIHNvIHdlIGhhdmUgdG8gZG8gc29tZSByZW1hdGNoaW5nXG5cdFx0XHRcdFx0Ly8gdGhpcyBjYW4gb25seSBoYXBwZW4gaWYgdGhlIGN1cnJlbnQgcGF0dGVybiBpcyBncmVlZHlcblx0XHRcdFx0XHRtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCBjdXJyZW50Tm9kZS5wcmV2LCBwb3MsIHtcblx0XHRcdFx0XHRcdGNhdXNlOiB0b2tlbiArICcsJyArIGosXG5cdFx0XHRcdFx0XHRyZWFjaDogcmVhY2hcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEB0eXBlZGVmIExpbmtlZExpc3ROb2RlXG4gKiBAcHJvcGVydHkge1R9IHZhbHVlXG4gKiBAcHJvcGVydHkge0xpbmtlZExpc3ROb2RlPFQ+IHwgbnVsbH0gcHJldiBUaGUgcHJldmlvdXMgbm9kZS5cbiAqIEBwcm9wZXJ0eSB7TGlua2VkTGlzdE5vZGU8VD4gfCBudWxsfSBuZXh0IFRoZSBuZXh0IG5vZGUuXG4gKiBAdGVtcGxhdGUgVFxuICogQHByaXZhdGVcbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBMaW5rZWRMaXN0KCkge1xuXHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHR2YXIgaGVhZCA9IHsgdmFsdWU6IG51bGwsIHByZXY6IG51bGwsIG5leHQ6IG51bGwgfTtcblx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0dmFyIHRhaWwgPSB7IHZhbHVlOiBudWxsLCBwcmV2OiBoZWFkLCBuZXh0OiBudWxsIH07XG5cdGhlYWQubmV4dCA9IHRhaWw7XG5cblx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0dGhpcy5oZWFkID0gaGVhZDtcblx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0dGhpcy50YWlsID0gdGFpbDtcblx0dGhpcy5sZW5ndGggPSAwO1xufVxuXG4vKipcbiAqIEFkZHMgYSBuZXcgbm9kZSB3aXRoIHRoZSBnaXZlbiB2YWx1ZSB0byB0aGUgbGlzdC5cbiAqIEBwYXJhbSB7TGlua2VkTGlzdDxUPn0gbGlzdFxuICogQHBhcmFtIHtMaW5rZWRMaXN0Tm9kZTxUPn0gbm9kZVxuICogQHBhcmFtIHtUfSB2YWx1ZVxuICogQHJldHVybnMge0xpbmtlZExpc3ROb2RlPFQ+fSBUaGUgYWRkZWQgbm9kZS5cbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmZ1bmN0aW9uIGFkZEFmdGVyKGxpc3QsIG5vZGUsIHZhbHVlKSB7XG5cdC8vIGFzc3VtZXMgdGhhdCBub2RlICE9IGxpc3QudGFpbCAmJiB2YWx1ZXMubGVuZ3RoID49IDBcblx0dmFyIG5leHQgPSBub2RlLm5leHQ7XG5cblx0dmFyIG5ld05vZGUgPSB7IHZhbHVlOiB2YWx1ZSwgcHJldjogbm9kZSwgbmV4dDogbmV4dCB9O1xuXHRub2RlLm5leHQgPSBuZXdOb2RlO1xuXHRuZXh0LnByZXYgPSBuZXdOb2RlO1xuXHRsaXN0Lmxlbmd0aCsrO1xuXG5cdHJldHVybiBuZXdOb2RlO1xufVxuLyoqXG4gKiBSZW1vdmVzIGBjb3VudGAgbm9kZXMgYWZ0ZXIgdGhlIGdpdmVuIG5vZGUuIFRoZSBnaXZlbiBub2RlIHdpbGwgbm90IGJlIHJlbW92ZWQuXG4gKiBAcGFyYW0ge0xpbmtlZExpc3Q8VD59IGxpc3RcbiAqIEBwYXJhbSB7TGlua2VkTGlzdE5vZGU8VD59IG5vZGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudFxuICogQHRlbXBsYXRlIFRcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlUmFuZ2UobGlzdCwgbm9kZSwgY291bnQpIHtcblx0dmFyIG5leHQgPSBub2RlLm5leHQ7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQgJiYgbmV4dCAhPT0gbGlzdC50YWlsOyBpKyspIHtcblx0XHRuZXh0ID0gbmV4dC5uZXh0O1xuXHR9XG5cdG5vZGUubmV4dCA9IG5leHQ7XG5cdG5leHQucHJldiA9IG5vZGU7XG5cdGxpc3QubGVuZ3RoIC09IGk7XG59XG4vKipcbiAqIEBwYXJhbSB7TGlua2VkTGlzdDxUPn0gbGlzdFxuICogQHJldHVybnMge1RbXX1cbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkobGlzdCkge1xuXHR2YXIgYXJyYXkgPSBbXTtcblx0dmFyIG5vZGUgPSBsaXN0LmhlYWQubmV4dDtcblx0d2hpbGUgKG5vZGUgIT09IGxpc3QudGFpbCkge1xuXHRcdGFycmF5LnB1c2gobm9kZS52YWx1ZSk7XG5cdFx0bm9kZSA9IG5vZGUubmV4dDtcblx0fVxuXHRyZXR1cm4gYXJyYXk7XG59XG5cblxuaWYgKCFfc2VsZi5kb2N1bWVudCkge1xuXHRpZiAoIV9zZWxmLmFkZEV2ZW50TGlzdGVuZXIpIHtcblx0XHQvLyBpbiBOb2RlLmpzXG5cdFx0cmV0dXJuIF87XG5cdH1cblxuXHRpZiAoIV8uZGlzYWJsZVdvcmtlck1lc3NhZ2VIYW5kbGVyKSB7XG5cdFx0Ly8gSW4gd29ya2VyXG5cdFx0X3NlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldnQpIHtcblx0XHRcdHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZShldnQuZGF0YSksXG5cdFx0XHRcdGxhbmcgPSBtZXNzYWdlLmxhbmd1YWdlLFxuXHRcdFx0XHRjb2RlID0gbWVzc2FnZS5jb2RlLFxuXHRcdFx0XHRpbW1lZGlhdGVDbG9zZSA9IG1lc3NhZ2UuaW1tZWRpYXRlQ2xvc2U7XG5cblx0XHRcdF9zZWxmLnBvc3RNZXNzYWdlKF8uaGlnaGxpZ2h0KGNvZGUsIF8ubGFuZ3VhZ2VzW2xhbmddLCBsYW5nKSk7XG5cdFx0XHRpZiAoaW1tZWRpYXRlQ2xvc2UpIHtcblx0XHRcdFx0X3NlbGYuY2xvc2UoKTtcblx0XHRcdH1cblx0XHR9LCBmYWxzZSk7XG5cdH1cblxuXHRyZXR1cm4gXztcbn1cblxuLy8gR2V0IGN1cnJlbnQgc2NyaXB0IGFuZCBoaWdobGlnaHRcbnZhciBzY3JpcHQgPSBfLnV0aWwuY3VycmVudFNjcmlwdCgpO1xuXG5pZiAoc2NyaXB0KSB7XG5cdF8uZmlsZW5hbWUgPSBzY3JpcHQuc3JjO1xuXG5cdGlmIChzY3JpcHQuaGFzQXR0cmlidXRlKCdkYXRhLW1hbnVhbCcpKSB7XG5cdFx0Xy5tYW51YWwgPSB0cnVlO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodEF1dG9tYXRpY2FsbHlDYWxsYmFjaygpIHtcblx0aWYgKCFfLm1hbnVhbCkge1xuXHRcdF8uaGlnaGxpZ2h0QWxsKCk7XG5cdH1cbn1cblxuaWYgKCFfLm1hbnVhbCkge1xuXHQvLyBJZiB0aGUgZG9jdW1lbnQgc3RhdGUgaXMgXCJsb2FkaW5nXCIsIHRoZW4gd2UnbGwgdXNlIERPTUNvbnRlbnRMb2FkZWQuXG5cdC8vIElmIHRoZSBkb2N1bWVudCBzdGF0ZSBpcyBcImludGVyYWN0aXZlXCIgYW5kIHRoZSBwcmlzbS5qcyBzY3JpcHQgaXMgZGVmZXJyZWQsIHRoZW4gd2UnbGwgYWxzbyB1c2UgdGhlXG5cdC8vIERPTUNvbnRlbnRMb2FkZWQgZXZlbnQgYmVjYXVzZSB0aGVyZSBtaWdodCBiZSBzb21lIHBsdWdpbnMgb3IgbGFuZ3VhZ2VzIHdoaWNoIGhhdmUgYWxzbyBiZWVuIGRlZmVycmVkIGFuZCB0aGV5XG5cdC8vIG1pZ2h0IHRha2UgbG9uZ2VyIG9uZSBhbmltYXRpb24gZnJhbWUgdG8gZXhlY3V0ZSB3aGljaCBjYW4gY3JlYXRlIGEgcmFjZSBjb25kaXRpb24gd2hlcmUgb25seSBzb21lIHBsdWdpbnMgaGF2ZVxuXHQvLyBiZWVuIGxvYWRlZCB3aGVuIFByaXNtLmhpZ2hsaWdodEFsbCgpIGlzIGV4ZWN1dGVkLCBkZXBlbmRpbmcgb24gaG93IGZhc3QgcmVzb3VyY2VzIGFyZSBsb2FkZWQuXG5cdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vUHJpc21KUy9wcmlzbS9pc3N1ZXMvMjEwMlxuXHR2YXIgcmVhZHlTdGF0ZSA9IGRvY3VtZW50LnJlYWR5U3RhdGU7XG5cdGlmIChyZWFkeVN0YXRlID09PSAnbG9hZGluZycgfHwgcmVhZHlTdGF0ZSA9PT0gJ2ludGVyYWN0aXZlJyAmJiBzY3JpcHQgJiYgc2NyaXB0LmRlZmVyKSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGhpZ2hsaWdodEF1dG9tYXRpY2FsbHlDYWxsYmFjayk7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0d2luZG93LnNldFRpbWVvdXQoaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrLCAxNik7XG5cdFx0fVxuXHR9XG59XG5cbnJldHVybiBfO1xuXG59KShfc2VsZik7XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IFByaXNtO1xufVxuXG4vLyBoYWNrIGZvciBjb21wb25lbnRzIHRvIHdvcmsgY29ycmVjdGx5IGluIG5vZGUuanNcbmlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuXHRnbG9iYWwuUHJpc20gPSBQcmlzbTtcbn1cblxuLy8gc29tZSBhZGRpdGlvbmFsIGRvY3VtZW50YXRpb24vdHlwZXNcblxuLyoqXG4gKiBUaGUgZXhwYW5zaW9uIG9mIGEgc2ltcGxlIGBSZWdFeHBgIGxpdGVyYWwgdG8gc3VwcG9ydCBhZGRpdGlvbmFsIHByb3BlcnRpZXMuXG4gKlxuICogQHR5cGVkZWYgR3JhbW1hclRva2VuXG4gKiBAcHJvcGVydHkge1JlZ0V4cH0gcGF0dGVybiBUaGUgcmVndWxhciBleHByZXNzaW9uIG9mIHRoZSB0b2tlbi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2xvb2tiZWhpbmQ9ZmFsc2VdIElmIGB0cnVlYCwgdGhlbiB0aGUgZmlyc3QgY2FwdHVyaW5nIGdyb3VwIG9mIGBwYXR0ZXJuYCB3aWxsIChlZmZlY3RpdmVseSlcbiAqIGJlaGF2ZSBhcyBhIGxvb2tiZWhpbmQgZ3JvdXAgbWVhbmluZyB0aGF0IHRoZSBjYXB0dXJlZCB0ZXh0IHdpbGwgbm90IGJlIHBhcnQgb2YgdGhlIG1hdGNoZWQgdGV4dCBvZiB0aGUgbmV3IHRva2VuLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbZ3JlZWR5PWZhbHNlXSBXaGV0aGVyIHRoZSB0b2tlbiBpcyBncmVlZHkuXG4gKiBAcHJvcGVydHkge3N0cmluZ3xzdHJpbmdbXX0gW2FsaWFzXSBBbiBvcHRpb25hbCBhbGlhcyBvciBsaXN0IG9mIGFsaWFzZXMuXG4gKiBAcHJvcGVydHkge0dyYW1tYXJ9IFtpbnNpZGVdIFRoZSBuZXN0ZWQgZ3JhbW1hciBvZiB0aGlzIHRva2VuLlxuICpcbiAqIFRoZSBgaW5zaWRlYCBncmFtbWFyIHdpbGwgYmUgdXNlZCB0byB0b2tlbml6ZSB0aGUgdGV4dCB2YWx1ZSBvZiBlYWNoIHRva2VuIG9mIHRoaXMga2luZC5cbiAqXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIG1ha2UgbmVzdGVkIGFuZCBldmVuIHJlY3Vyc2l2ZSBsYW5ndWFnZSBkZWZpbml0aW9ucy5cbiAqXG4gKiBOb3RlOiBUaGlzIGNhbiBjYXVzZSBpbmZpbml0ZSByZWN1cnNpb24uIEJlIGNhcmVmdWwgd2hlbiB5b3UgZW1iZWQgZGlmZmVyZW50IGxhbmd1YWdlcyBvciBldmVuIHRoZSBzYW1lIGxhbmd1YWdlIGludG9cbiAqIGVhY2ggYW5vdGhlci5cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiovXG5cbi8qKlxuICogQHR5cGVkZWYgR3JhbW1hclxuICogQHR5cGUge09iamVjdDxzdHJpbmcsIFJlZ0V4cCB8IEdyYW1tYXJUb2tlbiB8IEFycmF5PFJlZ0V4cCB8IEdyYW1tYXJUb2tlbj4+fVxuICogQHByb3BlcnR5IHtHcmFtbWFyfSBbcmVzdF0gQW4gb3B0aW9uYWwgZ3JhbW1hciBvYmplY3QgdGhhdCB3aWxsIGJlIGFwcGVuZGVkIHRvIHRoaXMgZ3JhbW1hci5cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gd2hpY2ggd2lsbCBpbnZva2VkIGFmdGVyIGFuIGVsZW1lbnQgd2FzIHN1Y2Nlc3NmdWxseSBoaWdobGlnaHRlZC5cbiAqXG4gKiBAY2FsbGJhY2sgSGlnaGxpZ2h0Q2FsbGJhY2tcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCBzdWNjZXNzZnVsbHkgaGlnaGxpZ2h0ZWQuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiovXG5cbi8qKlxuICogQGNhbGxiYWNrIEhvb2tDYWxsYmFja1xuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBlbnYgVGhlIGVudmlyb25tZW50IHZhcmlhYmxlcyBvZiB0aGUgaG9vay5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGdsb2JhbFxuICogQHB1YmxpY1xuICovXG4iLCIoZnVuY3Rpb24gKFByaXNtKSB7XG5cblx0dmFyIHN0cmluZyA9IC8oXCJ8JykoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXwoPyFcXDEpW15cXFxcXFxyXFxuXSkqXFwxLztcblxuXHRQcmlzbS5sYW5ndWFnZXMuY3NzID0ge1xuXHRcdCdjb21tZW50JzogL1xcL1xcKltcXHNcXFNdKj9cXCpcXC8vLFxuXHRcdCdhdHJ1bGUnOiB7XG5cdFx0XHRwYXR0ZXJuOiAvQFtcXHctXSg/OlteO3tcXHNdfFxccysoPyFbXFxze10pKSooPzo7fCg/PVxccypcXHspKS8sXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J3J1bGUnOiAvXkBbXFx3LV0rLyxcblx0XHRcdFx0J3NlbGVjdG9yLWZ1bmN0aW9uLWFyZ3VtZW50Jzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC8oXFxic2VsZWN0b3JcXHMqXFwoXFxzKig/IVtcXHMpXSkpKD86W14oKVxcc118XFxzKyg/IVtcXHMpXSl8XFwoKD86W14oKV18XFwoW14oKV0qXFwpKSpcXCkpKyg/PVxccypcXCkpLyxcblx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRcdGFsaWFzOiAnc2VsZWN0b3InXG5cdFx0XHRcdH0sXG5cdFx0XHRcdCdrZXl3b3JkJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC8oXnxbXlxcdy1dKSg/OmFuZHxub3R8b25seXxvcikoPyFbXFx3LV0pLyxcblx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gU2VlIHJlc3QgYmVsb3dcblx0XHRcdH1cblx0XHR9LFxuXHRcdCd1cmwnOiB7XG5cdFx0XHQvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cdFx0XHRwYXR0ZXJuOiBSZWdFeHAoJ1xcXFxidXJsXFxcXCgoPzonICsgc3RyaW5nLnNvdXJjZSArICd8JyArIC8oPzpbXlxcXFxcXHJcXG4oKVwiJ118XFxcXFtcXHNcXFNdKSovLnNvdXJjZSArICcpXFxcXCknLCAnaScpLFxuXHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCdmdW5jdGlvbic6IC9edXJsL2ksXG5cdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9eXFwofFxcKSQvLFxuXHRcdFx0XHQnc3RyaW5nJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IFJlZ0V4cCgnXicgKyBzdHJpbmcuc291cmNlICsgJyQnKSxcblx0XHRcdFx0XHRhbGlhczogJ3VybCdcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0J3NlbGVjdG9yJzogUmVnRXhwKCdbXnt9XFxcXHNdKD86W157fTtcIlxcJ1xcXFxzXXxcXFxccysoPyFbXFxcXHN7XSl8JyArIHN0cmluZy5zb3VyY2UgKyAnKSooPz1cXFxccypcXFxceyknKSxcblx0XHQnc3RyaW5nJzoge1xuXHRcdFx0cGF0dGVybjogc3RyaW5nLFxuXHRcdFx0Z3JlZWR5OiB0cnVlXG5cdFx0fSxcblx0XHQncHJvcGVydHknOiAvKD8hXFxzKVstX2EtelxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVstXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxccyo6KS9pLFxuXHRcdCdpbXBvcnRhbnQnOiAvIWltcG9ydGFudFxcYi9pLFxuXHRcdCdmdW5jdGlvbic6IC9bLWEtejAtOV0rKD89XFwoKS9pLFxuXHRcdCdwdW5jdHVhdGlvbic6IC9bKCl7fTs6LF0vXG5cdH07XG5cblx0UHJpc20ubGFuZ3VhZ2VzLmNzc1snYXRydWxlJ10uaW5zaWRlLnJlc3QgPSBQcmlzbS5sYW5ndWFnZXMuY3NzO1xuXG5cdHZhciBtYXJrdXAgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuXHRpZiAobWFya3VwKSB7XG5cdFx0bWFya3VwLnRhZy5hZGRJbmxpbmVkKCdzdHlsZScsICdjc3MnKTtcblxuXHRcdFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2luc2lkZScsICdhdHRyLXZhbHVlJywge1xuXHRcdFx0J3N0eWxlLWF0dHInOiB7XG5cdFx0XHRcdHBhdHRlcm46IC8oXnxbXCInXFxzXSlzdHlsZVxccyo9XFxzKig/OlwiW15cIl0qXCJ8J1teJ10qJykvaSxcblx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J2F0dHItdmFsdWUnOiB7XG5cdFx0XHRcdFx0XHRwYXR0ZXJuOiAvPVxccyooPzpcIlteXCJdKlwifCdbXiddKid8W15cXHMnXCI+PV0rKS8sXG5cdFx0XHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHRcdFx0J3N0eWxlJzoge1xuXHRcdFx0XHRcdFx0XHRcdHBhdHRlcm46IC8oW1wiJ10pW1xcc1xcU10rKD89W1wiJ10kKS8sXG5cdFx0XHRcdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRhbGlhczogJ2xhbmd1YWdlLWNzcycsXG5cdFx0XHRcdFx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuY3NzXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IFtcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRwYXR0ZXJuOiAvXj0vLFxuXHRcdFx0XHRcdFx0XHRcdFx0YWxpYXM6ICdhdHRyLWVxdWFscydcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdC9cInwnL1xuXHRcdFx0XHRcdFx0XHRdXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQnYXR0ci1uYW1lJzogL15zdHlsZS9pXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LCBtYXJrdXAudGFnKTtcblx0fVxuXG59KFByaXNtKSk7XG4iLCJQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdCA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NsaWtlJywge1xuXHQnY2xhc3MtbmFtZSc6IFtcblx0XHRQcmlzbS5sYW5ndWFnZXMuY2xpa2VbJ2NsYXNzLW5hbWUnXSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W14kXFx3XFx4QTAtXFx1RkZGRl0pKD8hXFxzKVtfJEEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxcLig/OnByb3RvdHlwZXxjb25zdHJ1Y3RvcikpLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9XG5cdF0sXG5cdCdrZXl3b3JkJzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oKD86Xnx9KVxccyopKD86Y2F0Y2h8ZmluYWxseSlcXGIvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteLl18XFwuXFwuXFwuXFxzKilcXGIoPzphc3xhc3luYyg/PVxccyooPzpmdW5jdGlvblxcYnxcXCh8WyRcXHdcXHhBMC1cXHVGRkZGXXwkKSl8YXdhaXR8YnJlYWt8Y2FzZXxjbGFzc3xjb25zdHxjb250aW51ZXxkZWJ1Z2dlcnxkZWZhdWx0fGRlbGV0ZXxkb3xlbHNlfGVudW18ZXhwb3J0fGV4dGVuZHN8Zm9yfGZyb218ZnVuY3Rpb258KD86Z2V0fHNldCkoPz1cXHMqW1xcWyRcXHdcXHhBMC1cXHVGRkZGXSl8aWZ8aW1wbGVtZW50c3xpbXBvcnR8aW58aW5zdGFuY2VvZnxpbnRlcmZhY2V8bGV0fG5ld3xudWxsfG9mfHBhY2thZ2V8cHJpdmF0ZXxwcm90ZWN0ZWR8cHVibGljfHJldHVybnxzdGF0aWN8c3VwZXJ8c3dpdGNofHRoaXN8dGhyb3d8dHJ5fHR5cGVvZnx1bmRlZmluZWR8dmFyfHZvaWR8d2hpbGV8d2l0aHx5aWVsZClcXGIvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdF0sXG5cdC8vIEFsbG93IGZvciBhbGwgbm9uLUFTQ0lJIGNoYXJhY3RlcnMgKFNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMDA4NDQ0KVxuXHQnZnVuY3Rpb24nOiAvIz8oPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKD89XFxzKig/OlxcLlxccyooPzphcHBseXxiaW5kfGNhbGwpXFxzKik/XFwoKS8sXG5cdCdudW1iZXInOiAvXFxiKD86KD86MFt4WF0oPzpbXFxkQS1GYS1mXSg/Ol9bXFxkQS1GYS1mXSk/KSt8MFtiQl0oPzpbMDFdKD86X1swMV0pPykrfDBbb09dKD86WzAtN10oPzpfWzAtN10pPykrKW4/fCg/OlxcZCg/Ol9cXGQpPykrbnxOYU58SW5maW5pdHkpXFxifCg/OlxcYig/OlxcZCg/Ol9cXGQpPykrXFwuPyg/OlxcZCg/Ol9cXGQpPykqfFxcQlxcLig/OlxcZCg/Ol9cXGQpPykrKSg/OltFZV1bKy1dPyg/OlxcZCg/Ol9cXGQpPykrKT8vLFxuXHQnb3BlcmF0b3InOiAvLS18XFwrXFwrfFxcKlxcKj0/fD0+fCYmPT98XFx8XFx8PT98WyE9XT09fDw8PT98Pj4+Pz0/fFstKyovJSZ8XiE9PD5dPT98XFwuezN9fFxcP1xcPz0/fFxcP1xcLj98W346XS9cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFsnY2xhc3MtbmFtZSddWzBdLnBhdHRlcm4gPSAvKFxcYig/OmNsYXNzfGludGVyZmFjZXxleHRlbmRzfGltcGxlbWVudHN8aW5zdGFuY2VvZnxuZXcpXFxzKylbXFx3LlxcXFxdKy87XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2phdmFzY3JpcHQnLCAna2V5d29yZCcsIHtcblx0J3JlZ2V4Jzoge1xuXHRcdHBhdHRlcm46IC8oKD86XnxbXiRcXHdcXHhBMC1cXHVGRkZGLlwiJ1xcXSlcXHNdfFxcYig/OnJldHVybnx5aWVsZCkpXFxzKilcXC8oPzpcXFsoPzpbXlxcXVxcXFxcXHJcXG5dfFxcXFwuKSpdfFxcXFwufFteL1xcXFxcXFtcXHJcXG5dKStcXC9bZ2lteXVzXXswLDZ9KD89KD86XFxzfFxcL1xcKig/OlteKl18XFwqKD8hXFwvKSkqXFwqXFwvKSooPzokfFtcXHJcXG4sLjs6fSlcXF1dfFxcL1xcLykpLyxcblx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdyZWdleC1zb3VyY2UnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9eKFxcLylbXFxzXFxTXSsoPz1cXC9bYS16XSokKS8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGFsaWFzOiAnbGFuZ3VhZ2UtcmVnZXgnLFxuXHRcdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5yZWdleFxuXHRcdFx0fSxcblx0XHRcdCdyZWdleC1mbGFncyc6IC9bYS16XSskLyxcblx0XHRcdCdyZWdleC1kZWxpbWl0ZXInOiAvXlxcL3xcXC8kL1xuXHRcdH1cblx0fSxcblx0Ly8gVGhpcyBtdXN0IGJlIGRlY2xhcmVkIGJlZm9yZSBrZXl3b3JkIGJlY2F1c2Ugd2UgdXNlIFwiZnVuY3Rpb25cIiBpbnNpZGUgdGhlIGxvb2stZm9yd2FyZFxuXHQnZnVuY3Rpb24tdmFyaWFibGUnOiB7XG5cdFx0cGF0dGVybjogLyM/KD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxccypbPTpdXFxzKig/OmFzeW5jXFxzKik/KD86XFxiZnVuY3Rpb25cXGJ8KD86XFwoKD86W14oKV18XFwoW14oKV0qXFwpKSpcXCl8KD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKilcXHMqPT4pKS8sXG5cdFx0YWxpYXM6ICdmdW5jdGlvbidcblx0fSxcblx0J3BhcmFtZXRlcic6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKGZ1bmN0aW9uKD86XFxzKyg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSopP1xccypcXChcXHMqKSg/IVxccykoPzpbXigpXFxzXXxcXHMrKD8hW1xccyldKXxcXChbXigpXSpcXCkpKyg/PVxccypcXCkpLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxccyo9PikvaSxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHR9LFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXFwoXFxzKikoPyFcXHMpKD86W14oKVxcc118XFxzKyg/IVtcXHMpXSl8XFwoW14oKV0qXFwpKSsoPz1cXHMqXFwpXFxzKj0+KS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLygoPzpcXGJ8XFxzfF4pKD8hKD86YXN8YXN5bmN8YXdhaXR8YnJlYWt8Y2FzZXxjYXRjaHxjbGFzc3xjb25zdHxjb250aW51ZXxkZWJ1Z2dlcnxkZWZhdWx0fGRlbGV0ZXxkb3xlbHNlfGVudW18ZXhwb3J0fGV4dGVuZHN8ZmluYWxseXxmb3J8ZnJvbXxmdW5jdGlvbnxnZXR8aWZ8aW1wbGVtZW50c3xpbXBvcnR8aW58aW5zdGFuY2VvZnxpbnRlcmZhY2V8bGV0fG5ld3xudWxsfG9mfHBhY2thZ2V8cHJpdmF0ZXxwcm90ZWN0ZWR8cHVibGljfHJldHVybnxzZXR8c3RhdGljfHN1cGVyfHN3aXRjaHx0aGlzfHRocm93fHRyeXx0eXBlb2Z8dW5kZWZpbmVkfHZhcnx2b2lkfHdoaWxlfHdpdGh8eWllbGQpKD8hWyRcXHdcXHhBMC1cXHVGRkZGXSkpKD86KD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKlxccyopXFwoXFxzKnxcXF1cXHMqXFwoXFxzKikoPyFcXHMpKD86W14oKVxcc118XFxzKyg/IVtcXHMpXSl8XFwoW14oKV0qXFwpKSsoPz1cXHMqXFwpXFxzKlxceykvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHR9XG5cdF0sXG5cdCdjb25zdGFudCc6IC9cXGJbQS1aXSg/OltBLVpfXXxcXGR4PykqXFxiL1xufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2phdmFzY3JpcHQnLCAnc3RyaW5nJywge1xuXHQndGVtcGxhdGUtc3RyaW5nJzoge1xuXHRcdHBhdHRlcm46IC9gKD86XFxcXFtcXHNcXFNdfFxcJHsoPzpbXnt9XXx7KD86W157fV18e1tefV0qfSkqfSkrfXwoPyFcXCR7KVteXFxcXGBdKSpgLyxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQndGVtcGxhdGUtcHVuY3R1YXRpb24nOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9eYHxgJC8sXG5cdFx0XHRcdGFsaWFzOiAnc3RyaW5nJ1xuXHRcdFx0fSxcblx0XHRcdCdpbnRlcnBvbGF0aW9uJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvKCg/Ol58W15cXFxcXSkoPzpcXFxcezJ9KSopXFwkeyg/Oltee31dfHsoPzpbXnt9XXx7W159XSp9KSp9KSt9Lyxcblx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J2ludGVycG9sYXRpb24tcHVuY3R1YXRpb24nOiB7XG5cdFx0XHRcdFx0XHRwYXR0ZXJuOiAvXlxcJHt8fSQvLFxuXHRcdFx0XHRcdFx0YWxpYXM6ICdwdW5jdHVhdGlvbidcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHJlc3Q6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQnc3RyaW5nJzogL1tcXHNcXFNdKy9cblx0XHR9XG5cdH1cbn0pO1xuXG5pZiAoUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCkge1xuXHRQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZy5hZGRJbmxpbmVkKCdzY3JpcHQnLCAnamF2YXNjcmlwdCcpO1xufVxuXG5QcmlzbS5sYW5ndWFnZXMuanMgPSBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdDtcbiIsIlByaXNtLmxhbmd1YWdlcy5tYXJrdXAgPSB7XG5cdCdjb21tZW50JzogLzwhLS1bXFxzXFxTXSo/LS0+Lyxcblx0J3Byb2xvZyc6IC88XFw/W1xcc1xcU10rP1xcPz4vLFxuXHQnZG9jdHlwZSc6IHtcblx0XHQvLyBodHRwczovL3d3dy53My5vcmcvVFIveG1sLyNOVC1kb2N0eXBlZGVjbFxuXHRcdHBhdHRlcm46IC88IURPQ1RZUEUoPzpbXj5cIidbXFxdXXxcIlteXCJdKlwifCdbXiddKicpKyg/OlxcWyg/OltePFwiJ1xcXV18XCJbXlwiXSpcInwnW14nXSonfDwoPyEhLS0pfDwhLS0oPzpbXi1dfC0oPyEtPikpKi0tPikqXFxdXFxzKik/Pi9pLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdpbnRlcm5hbC1zdWJzZXQnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC8oXFxbKVtcXHNcXFNdKyg/PVxcXT4kKS8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdFx0aW5zaWRlOiBudWxsIC8vIHNlZSBiZWxvd1xuXHRcdFx0fSxcblx0XHRcdCdzdHJpbmcnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9cIlteXCJdKlwifCdbXiddKicvLFxuXHRcdFx0XHRncmVlZHk6IHRydWVcblx0XHRcdH0sXG5cdFx0XHQncHVuY3R1YXRpb24nOiAvXjwhfD4kfFtbXFxdXS8sXG5cdFx0XHQnZG9jdHlwZS10YWcnOiAvXkRPQ1RZUEUvLFxuXHRcdFx0J25hbWUnOiAvW15cXHM8PidcIl0rL1xuXHRcdH1cblx0fSxcblx0J2NkYXRhJzogLzwhXFxbQ0RBVEFcXFtbXFxzXFxTXSo/XV0+L2ksXG5cdCd0YWcnOiB7XG5cdFx0cGF0dGVybjogLzxcXC8/KD8hXFxkKVteXFxzPlxcLz0kPCVdKyg/Olxccyg/OlxccypbXlxccz5cXC89XSsoPzpcXHMqPVxccyooPzpcIlteXCJdKlwifCdbXiddKid8W15cXHMnXCI+PV0rKD89W1xccz5dKSl8KD89W1xccy8+XSkpKSspP1xccypcXC8/Pi8sXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3RhZyc6IHtcblx0XHRcdFx0cGF0dGVybjogL148XFwvP1teXFxzPlxcL10rLyxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL148XFwvPy8sXG5cdFx0XHRcdFx0J25hbWVzcGFjZSc6IC9eW15cXHM+XFwvOl0rOi9cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdhdHRyLXZhbHVlJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvPVxccyooPzpcIlteXCJdKlwifCdbXiddKid8W15cXHMnXCI+PV0rKS8sXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0cGF0dGVybjogL149Lyxcblx0XHRcdFx0XHRcdFx0YWxpYXM6ICdhdHRyLWVxdWFscydcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHQvXCJ8Jy9cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQncHVuY3R1YXRpb24nOiAvXFwvPz4vLFxuXHRcdFx0J2F0dHItbmFtZSc6IHtcblx0XHRcdFx0cGF0dGVybjogL1teXFxzPlxcL10rLyxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J25hbWVzcGFjZSc6IC9eW15cXHM+XFwvOl0rOi9cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fVxuXHR9LFxuXHQnZW50aXR5JzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8mW1xcZGEtel17MSw4fTsvaSxcblx0XHRcdGFsaWFzOiAnbmFtZWQtZW50aXR5J1xuXHRcdH0sXG5cdFx0LyYjeD9bXFxkYS1mXXsxLDh9Oy9pXG5cdF1cbn07XG5cblByaXNtLmxhbmd1YWdlcy5tYXJrdXBbJ3RhZyddLmluc2lkZVsnYXR0ci12YWx1ZSddLmluc2lkZVsnZW50aXR5J10gPVxuXHRQcmlzbS5sYW5ndWFnZXMubWFya3VwWydlbnRpdHknXTtcblByaXNtLmxhbmd1YWdlcy5tYXJrdXBbJ2RvY3R5cGUnXS5pbnNpZGVbJ2ludGVybmFsLXN1YnNldCddLmluc2lkZSA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cbi8vIFBsdWdpbiB0byBtYWtlIGVudGl0eSB0aXRsZSBzaG93IHRoZSByZWFsIGVudGl0eSwgaWRlYSBieSBSb21hbiBLb21hcm92XG5QcmlzbS5ob29rcy5hZGQoJ3dyYXAnLCBmdW5jdGlvbiAoZW52KSB7XG5cblx0aWYgKGVudi50eXBlID09PSAnZW50aXR5Jykge1xuXHRcdGVudi5hdHRyaWJ1dGVzWyd0aXRsZSddID0gZW52LmNvbnRlbnQucmVwbGFjZSgvJmFtcDsvLCAnJicpO1xuXHR9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLCAnYWRkSW5saW5lZCcsIHtcblx0LyoqXG5cdCAqIEFkZHMgYW4gaW5saW5lZCBsYW5ndWFnZSB0byBtYXJrdXAuXG5cdCAqXG5cdCAqIEFuIGV4YW1wbGUgb2YgYW4gaW5saW5lZCBsYW5ndWFnZSBpcyBDU1Mgd2l0aCBgPHN0eWxlPmAgdGFncy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRhZ05hbWUgVGhlIG5hbWUgb2YgdGhlIHRhZyB0aGF0IGNvbnRhaW5zIHRoZSBpbmxpbmVkIGxhbmd1YWdlLiBUaGlzIG5hbWUgd2lsbCBiZSB0cmVhdGVkIGFzXG5cdCAqIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nIFRoZSBsYW5ndWFnZSBrZXkuXG5cdCAqIEBleGFtcGxlXG5cdCAqIGFkZElubGluZWQoJ3N0eWxlJywgJ2NzcycpO1xuXHQgKi9cblx0dmFsdWU6IGZ1bmN0aW9uIGFkZElubGluZWQodGFnTmFtZSwgbGFuZykge1xuXHRcdHZhciBpbmNsdWRlZENkYXRhSW5zaWRlID0ge307XG5cdFx0aW5jbHVkZWRDZGF0YUluc2lkZVsnbGFuZ3VhZ2UtJyArIGxhbmddID0ge1xuXHRcdFx0cGF0dGVybjogLyhePCFcXFtDREFUQVxcWylbXFxzXFxTXSs/KD89XFxdXFxdPiQpL2ksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXNbbGFuZ11cblx0XHR9O1xuXHRcdGluY2x1ZGVkQ2RhdGFJbnNpZGVbJ2NkYXRhJ10gPSAvXjwhXFxbQ0RBVEFcXFt8XFxdXFxdPiQvaTtcblxuXHRcdHZhciBpbnNpZGUgPSB7XG5cdFx0XHQnaW5jbHVkZWQtY2RhdGEnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC88IVxcW0NEQVRBXFxbW1xcc1xcU10qP1xcXVxcXT4vaSxcblx0XHRcdFx0aW5zaWRlOiBpbmNsdWRlZENkYXRhSW5zaWRlXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRpbnNpZGVbJ2xhbmd1YWdlLScgKyBsYW5nXSA9IHtcblx0XHRcdHBhdHRlcm46IC9bXFxzXFxTXSsvLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXNbbGFuZ11cblx0XHR9O1xuXG5cdFx0dmFyIGRlZiA9IHt9O1xuXHRcdGRlZlt0YWdOYW1lXSA9IHtcblx0XHRcdHBhdHRlcm46IFJlZ0V4cCgvKDxfX1tePl0qPikoPzo8IVxcW0NEQVRBXFxbKD86W15cXF1dfFxcXSg/IVxcXT4pKSpcXF1cXF0+fCg/ITwhXFxbQ0RBVEFcXFspW1xcc1xcU10pKj8oPz08XFwvX18+KS8uc291cmNlLnJlcGxhY2UoL19fL2csIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRhZ05hbWU7IH0pLCAnaScpLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdGluc2lkZTogaW5zaWRlXG5cdFx0fTtcblxuXHRcdFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjZGF0YScsIGRlZik7XG5cdH1cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaHRtbCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5QcmlzbS5sYW5ndWFnZXMubWF0aG1sID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblByaXNtLmxhbmd1YWdlcy5zdmcgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuXG5QcmlzbS5sYW5ndWFnZXMueG1sID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnbWFya3VwJywge30pO1xuUHJpc20ubGFuZ3VhZ2VzLnNzbWwgPSBQcmlzbS5sYW5ndWFnZXMueG1sO1xuUHJpc20ubGFuZ3VhZ2VzLmF0b20gPSBQcmlzbS5sYW5ndWFnZXMueG1sO1xuUHJpc20ubGFuZ3VhZ2VzLnJzcyA9IFByaXNtLmxhbmd1YWdlcy54bWw7XG4iLCIoZnVuY3Rpb24gKCkge1xuXG5cdGlmICh0eXBlb2Ygc2VsZiA9PT0gJ3VuZGVmaW5lZCcgfHwgIXNlbGYuUHJpc20gfHwgIXNlbGYuZG9jdW1lbnQpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvKipcblx0ICogUGx1Z2luIG5hbWUgd2hpY2ggaXMgdXNlZCBhcyBhIGNsYXNzIG5hbWUgZm9yIDxwcmU+IHdoaWNoIGlzIGFjdGl2YXRpbmcgdGhlIHBsdWdpblxuXHQgKiBAdHlwZSB7U3RyaW5nfVxuXHQgKi9cblx0dmFyIFBMVUdJTl9OQU1FID0gJ2xpbmUtbnVtYmVycyc7XG5cblx0LyoqXG5cdCAqIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIGZvciBkZXRlcm1pbmluZyBsaW5lIGJyZWFrc1xuXHQgKiBAdHlwZSB7UmVnRXhwfVxuXHQgKi9cblx0dmFyIE5FV19MSU5FX0VYUCA9IC9cXG4oPyEkKS9nO1xuXG5cblx0LyoqXG5cdCAqIEdsb2JhbCBleHBvcnRzXG5cdCAqL1xuXHR2YXIgY29uZmlnID0gUHJpc20ucGx1Z2lucy5saW5lTnVtYmVycyA9IHtcblx0XHQvKipcblx0XHQgKiBHZXQgbm9kZSBmb3IgcHJvdmlkZWQgbGluZSBudW1iZXJcblx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgcHJlIGVsZW1lbnRcblx0XHQgKiBAcGFyYW0ge051bWJlcn0gbnVtYmVyIGxpbmUgbnVtYmVyXG5cdFx0ICogQHJldHVybiB7RWxlbWVudHx1bmRlZmluZWR9XG5cdFx0ICovXG5cdFx0Z2V0TGluZTogZnVuY3Rpb24gKGVsZW1lbnQsIG51bWJlcikge1xuXHRcdFx0aWYgKGVsZW1lbnQudGFnTmFtZSAhPT0gJ1BSRScgfHwgIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFBMVUdJTl9OQU1FKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHZhciBsaW5lTnVtYmVyUm93cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmUtbnVtYmVycy1yb3dzJyk7XG5cdFx0XHRpZiAoIWxpbmVOdW1iZXJSb3dzKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHZhciBsaW5lTnVtYmVyU3RhcnQgPSBwYXJzZUludChlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zdGFydCcpLCAxMCkgfHwgMTtcblx0XHRcdHZhciBsaW5lTnVtYmVyRW5kID0gbGluZU51bWJlclN0YXJ0ICsgKGxpbmVOdW1iZXJSb3dzLmNoaWxkcmVuLmxlbmd0aCAtIDEpO1xuXG5cdFx0XHRpZiAobnVtYmVyIDwgbGluZU51bWJlclN0YXJ0KSB7XG5cdFx0XHRcdG51bWJlciA9IGxpbmVOdW1iZXJTdGFydDtcblx0XHRcdH1cblx0XHRcdGlmIChudW1iZXIgPiBsaW5lTnVtYmVyRW5kKSB7XG5cdFx0XHRcdG51bWJlciA9IGxpbmVOdW1iZXJFbmQ7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBsaW5lSW5kZXggPSBudW1iZXIgLSBsaW5lTnVtYmVyU3RhcnQ7XG5cblx0XHRcdHJldHVybiBsaW5lTnVtYmVyUm93cy5jaGlsZHJlbltsaW5lSW5kZXhdO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXNpemVzIHRoZSBsaW5lIG51bWJlcnMgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG5cdFx0ICpcblx0XHQgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgbm90IGFkZCBsaW5lIG51bWJlcnMuIEl0IHdpbGwgb25seSByZXNpemUgZXhpc3Rpbmcgb25lcy5cblx0XHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IEEgYDxwcmU+YCBlbGVtZW50IHdpdGggbGluZSBudW1iZXJzLlxuXHRcdCAqIEByZXR1cm5zIHt2b2lkfVxuXHRcdCAqL1xuXHRcdHJlc2l6ZTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRcdHJlc2l6ZUVsZW1lbnRzKFtlbGVtZW50XSk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFdoZXRoZXIgdGhlIHBsdWdpbiBjYW4gYXNzdW1lIHRoYXQgdGhlIHVuaXRzIGZvbnQgc2l6ZXMgYW5kIG1hcmdpbnMgYXJlIG5vdCBkZXBlbmRlZCBvbiB0aGUgc2l6ZSBvZlxuXHRcdCAqIHRoZSBjdXJyZW50IHZpZXdwb3J0LlxuXHRcdCAqXG5cdFx0ICogU2V0dGluZyB0aGlzIHRvIGB0cnVlYCB3aWxsIGFsbG93IHRoZSBwbHVnaW4gdG8gZG8gY2VydGFpbiBvcHRpbWl6YXRpb25zIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2UuXG5cdFx0ICpcblx0XHQgKiBTZXQgdGhpcyB0byBgZmFsc2VgIGlmIHlvdSB1c2UgYW55IG9mIHRoZSBmb2xsb3dpbmcgQ1NTIHVuaXRzOiBgdmhgLCBgdndgLCBgdm1pbmAsIGB2bWF4YC5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIHtib29sZWFufVxuXHRcdCAqL1xuXHRcdGFzc3VtZVZpZXdwb3J0SW5kZXBlbmRlbmNlOiB0cnVlXG5cdH07XG5cblx0LyoqXG5cdCAqIFJlc2l6ZXMgdGhlIGdpdmVuIGVsZW1lbnRzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IGVsZW1lbnRzXG5cdCAqL1xuXHRmdW5jdGlvbiByZXNpemVFbGVtZW50cyhlbGVtZW50cykge1xuXHRcdGVsZW1lbnRzID0gZWxlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHR2YXIgY29kZVN0eWxlcyA9IGdldFN0eWxlcyhlKTtcblx0XHRcdHZhciB3aGl0ZVNwYWNlID0gY29kZVN0eWxlc1snd2hpdGUtc3BhY2UnXTtcblx0XHRcdHJldHVybiB3aGl0ZVNwYWNlID09PSAncHJlLXdyYXAnIHx8IHdoaXRlU3BhY2UgPT09ICdwcmUtbGluZSc7XG5cdFx0fSk7XG5cblx0XHRpZiAoZWxlbWVudHMubGVuZ3RoID09IDApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgaW5mb3MgPSBlbGVtZW50cy5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRcdHZhciBjb2RlRWxlbWVudCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignY29kZScpO1xuXHRcdFx0dmFyIGxpbmVOdW1iZXJzV3JhcHBlciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmUtbnVtYmVycy1yb3dzJyk7XG5cdFx0XHRpZiAoIWNvZGVFbGVtZW50IHx8ICFsaW5lTnVtYmVyc1dyYXBwZXIpIHtcblx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHRcdH1cblxuXHRcdFx0LyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi9cblx0XHRcdHZhciBsaW5lTnVtYmVyU2l6ZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lLW51bWJlcnMtc2l6ZXInKTtcblx0XHRcdHZhciBjb2RlTGluZXMgPSBjb2RlRWxlbWVudC50ZXh0Q29udGVudC5zcGxpdChORVdfTElORV9FWFApO1xuXG5cdFx0XHRpZiAoIWxpbmVOdW1iZXJTaXplcikge1xuXHRcdFx0XHRsaW5lTnVtYmVyU2l6ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0XHRcdGxpbmVOdW1iZXJTaXplci5jbGFzc05hbWUgPSAnbGluZS1udW1iZXJzLXNpemVyJztcblxuXHRcdFx0XHRjb2RlRWxlbWVudC5hcHBlbmRDaGlsZChsaW5lTnVtYmVyU2l6ZXIpO1xuXHRcdFx0fVxuXG5cdFx0XHRsaW5lTnVtYmVyU2l6ZXIuaW5uZXJIVE1MID0gJzAnO1xuXHRcdFx0bGluZU51bWJlclNpemVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG5cdFx0XHR2YXIgb25lTGluZXJIZWlnaHQgPSBsaW5lTnVtYmVyU2l6ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXHRcdFx0bGluZU51bWJlclNpemVyLmlubmVySFRNTCA9ICcnO1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRlbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0XHRsaW5lczogY29kZUxpbmVzLFxuXHRcdFx0XHRsaW5lSGVpZ2h0czogW10sXG5cdFx0XHRcdG9uZUxpbmVySGVpZ2h0OiBvbmVMaW5lckhlaWdodCxcblx0XHRcdFx0c2l6ZXI6IGxpbmVOdW1iZXJTaXplcixcblx0XHRcdH07XG5cdFx0fSkuZmlsdGVyKEJvb2xlYW4pO1xuXG5cdFx0aW5mb3MuZm9yRWFjaChmdW5jdGlvbiAoaW5mbykge1xuXHRcdFx0dmFyIGxpbmVOdW1iZXJTaXplciA9IGluZm8uc2l6ZXI7XG5cdFx0XHR2YXIgbGluZXMgPSBpbmZvLmxpbmVzO1xuXHRcdFx0dmFyIGxpbmVIZWlnaHRzID0gaW5mby5saW5lSGVpZ2h0cztcblx0XHRcdHZhciBvbmVMaW5lckhlaWdodCA9IGluZm8ub25lTGluZXJIZWlnaHQ7XG5cblx0XHRcdGxpbmVIZWlnaHRzW2xpbmVzLmxlbmd0aCAtIDFdID0gdW5kZWZpbmVkO1xuXHRcdFx0bGluZXMuZm9yRWFjaChmdW5jdGlvbiAobGluZSwgaW5kZXgpIHtcblx0XHRcdFx0aWYgKGxpbmUgJiYgbGluZS5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0dmFyIGUgPSBsaW5lTnVtYmVyU2l6ZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKTtcblx0XHRcdFx0XHRlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdFx0XHRcdGUudGV4dENvbnRlbnQgPSBsaW5lO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGxpbmVIZWlnaHRzW2luZGV4XSA9IG9uZUxpbmVySGVpZ2h0O1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdGluZm9zLmZvckVhY2goZnVuY3Rpb24gKGluZm8pIHtcblx0XHRcdHZhciBsaW5lTnVtYmVyU2l6ZXIgPSBpbmZvLnNpemVyO1xuXHRcdFx0dmFyIGxpbmVIZWlnaHRzID0gaW5mby5saW5lSGVpZ2h0cztcblxuXHRcdFx0dmFyIGNoaWxkSW5kZXggPSAwO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lSGVpZ2h0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAobGluZUhlaWdodHNbaV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGxpbmVIZWlnaHRzW2ldID0gbGluZU51bWJlclNpemVyLmNoaWxkcmVuW2NoaWxkSW5kZXgrK10uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpbmZvcy5mb3JFYWNoKGZ1bmN0aW9uIChpbmZvKSB7XG5cdFx0XHR2YXIgbGluZU51bWJlclNpemVyID0gaW5mby5zaXplcjtcblx0XHRcdHZhciB3cmFwcGVyID0gaW5mby5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lLW51bWJlcnMtcm93cycpO1xuXG5cdFx0XHRsaW5lTnVtYmVyU2l6ZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdGxpbmVOdW1iZXJTaXplci5pbm5lckhUTUwgPSAnJztcblxuXHRcdFx0aW5mby5saW5lSGVpZ2h0cy5mb3JFYWNoKGZ1bmN0aW9uIChoZWlnaHQsIGxpbmVOdW1iZXIpIHtcblx0XHRcdFx0d3JhcHBlci5jaGlsZHJlbltsaW5lTnVtYmVyXS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBzdHlsZSBkZWNsYXJhdGlvbnMgZm9yIHRoZSBlbGVtZW50XG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuXHQgKi9cblx0dmFyIGdldFN0eWxlcyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0aWYgKCFlbGVtZW50KSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUgPyBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIDogKGVsZW1lbnQuY3VycmVudFN0eWxlIHx8IG51bGwpO1xuXHR9O1xuXG5cdHZhciBsYXN0V2lkdGggPSB1bmRlZmluZWQ7XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKGNvbmZpZy5hc3N1bWVWaWV3cG9ydEluZGVwZW5kZW5jZSAmJiBsYXN0V2lkdGggPT09IHdpbmRvdy5pbm5lcldpZHRoKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGxhc3RXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG5cdFx0cmVzaXplRWxlbWVudHMoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgncHJlLicgKyBQTFVHSU5fTkFNRSkpKTtcblx0fSk7XG5cblx0UHJpc20uaG9va3MuYWRkKCdjb21wbGV0ZScsIGZ1bmN0aW9uIChlbnYpIHtcblx0XHRpZiAoIWVudi5jb2RlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIGNvZGUgPSAvKiogQHR5cGUge0VsZW1lbnR9ICovIChlbnYuZWxlbWVudCk7XG5cdFx0dmFyIHByZSA9IC8qKiBAdHlwZSB7SFRNTEVsZW1lbnR9ICovIChjb2RlLnBhcmVudE5vZGUpO1xuXG5cdFx0Ly8gd29ya3Mgb25seSBmb3IgPGNvZGU+IHdyYXBwZWQgaW5zaWRlIDxwcmU+IChub3QgaW5saW5lKVxuXHRcdGlmICghcHJlIHx8ICEvcHJlL2kudGVzdChwcmUubm9kZU5hbWUpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gQWJvcnQgaWYgbGluZSBudW1iZXJzIGFscmVhZHkgZXhpc3RzXG5cdFx0aWYgKGNvZGUucXVlcnlTZWxlY3RvcignLmxpbmUtbnVtYmVycy1yb3dzJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBvbmx5IGFkZCBsaW5lIG51bWJlcnMgaWYgPGNvZGU+IG9yIG9uZSBvZiBpdHMgYW5jZXN0b3JzIGhhcyB0aGUgYGxpbmUtbnVtYmVyc2AgY2xhc3Ncblx0XHRpZiAoIVByaXNtLnV0aWwuaXNBY3RpdmUoY29kZSwgUExVR0lOX05BTUUpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIHRoZSBjbGFzcyAnbGluZS1udW1iZXJzJyBmcm9tIHRoZSA8Y29kZT5cblx0XHRjb2RlLmNsYXNzTGlzdC5yZW1vdmUoUExVR0lOX05BTUUpO1xuXHRcdC8vIEFkZCB0aGUgY2xhc3MgJ2xpbmUtbnVtYmVycycgdG8gdGhlIDxwcmU+XG5cdFx0cHJlLmNsYXNzTGlzdC5hZGQoUExVR0lOX05BTUUpO1xuXG5cdFx0dmFyIG1hdGNoID0gZW52LmNvZGUubWF0Y2goTkVXX0xJTkVfRVhQKTtcblx0XHR2YXIgbGluZXNOdW0gPSBtYXRjaCA/IG1hdGNoLmxlbmd0aCArIDEgOiAxO1xuXHRcdHZhciBsaW5lTnVtYmVyc1dyYXBwZXI7XG5cblx0XHR2YXIgbGluZXMgPSBuZXcgQXJyYXkobGluZXNOdW0gKyAxKS5qb2luKCc8c3Bhbj48L3NwYW4+Jyk7XG5cblx0XHRsaW5lTnVtYmVyc1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0bGluZU51bWJlcnNXcmFwcGVyLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXHRcdGxpbmVOdW1iZXJzV3JhcHBlci5jbGFzc05hbWUgPSAnbGluZS1udW1iZXJzLXJvd3MnO1xuXHRcdGxpbmVOdW1iZXJzV3JhcHBlci5pbm5lckhUTUwgPSBsaW5lcztcblxuXHRcdGlmIChwcmUuaGFzQXR0cmlidXRlKCdkYXRhLXN0YXJ0JykpIHtcblx0XHRcdHByZS5zdHlsZS5jb3VudGVyUmVzZXQgPSAnbGluZW51bWJlciAnICsgKHBhcnNlSW50KHByZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhcnQnKSwgMTApIC0gMSk7XG5cdFx0fVxuXG5cdFx0ZW52LmVsZW1lbnQuYXBwZW5kQ2hpbGQobGluZU51bWJlcnNXcmFwcGVyKTtcblxuXHRcdHJlc2l6ZUVsZW1lbnRzKFtwcmVdKTtcblxuXHRcdFByaXNtLmhvb2tzLnJ1bignbGluZS1udW1iZXJzJywgZW52KTtcblx0fSk7XG5cblx0UHJpc20uaG9va3MuYWRkKCdsaW5lLW51bWJlcnMnLCBmdW5jdGlvbiAoZW52KSB7XG5cdFx0ZW52LnBsdWdpbnMgPSBlbnYucGx1Z2lucyB8fCB7fTtcblx0XHRlbnYucGx1Z2lucy5saW5lTnVtYmVycyA9IHRydWU7XG5cdH0pO1xuXG59KCkpO1xuIiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMF0udXNlWzFdIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2N1YmVzLmNzc1wiO1xuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsImltcG9ydCBhcGkgZnJvbSBcIiEuLi8uLi8uLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1swXS51c2VbMV0hLi4vLi4vLi4vc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9wcmlzbS1saW5lLW51bWJlcnMuY3NzXCI7XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY29udGVudC5sb2NhbHMgfHwge307IiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uLy4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICAgICAgICBpbXBvcnQgY29udGVudCBmcm9tIFwiISEuLi8uLi9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzBdLnVzZVsxXSEuLi8uLi9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3ByaXNtLW9rYWlkaWEuY3NzXCI7XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY29udGVudC5sb2NhbHMgfHwge307IiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMF0udXNlWzFdIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY29udGVudC5sb2NhbHMgfHwge307IiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMV0udXNlWzFdIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2Fib3V0Lm1vZHVsZS5zY3NzXCI7XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY29udGVudC5sb2NhbHMgfHwge307IiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMV0udXNlWzFdIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2xhbmRpbmcubW9kdWxlLnNjc3NcIjtcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJpbXBvcnQgYXBpIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICAgICAgICBpbXBvcnQgY29udGVudCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1sxXS51c2VbMV0hLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbmF2YmFyLm1vZHVsZS5zY3NzXCI7XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY29udGVudC5sb2NhbHMgfHwge307IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc09sZElFID0gZnVuY3Rpb24gaXNPbGRJRSgpIHtcbiAgdmFyIG1lbW87XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSgpIHtcbiAgICBpZiAodHlwZW9mIG1lbW8gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuICAgICAgLy8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuICAgICAgLy8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuICAgICAgLy8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG4gICAgICAvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcbiAgICAgIG1lbW8gPSBCb29sZWFuKHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcbn0oKTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uIGdldFRhcmdldCgpIHtcbiAgdmFyIG1lbW8gPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKHRhcmdldCkge1xuICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtb1t0YXJnZXRdO1xuICB9O1xufSgpO1xuXG52YXIgc3R5bGVzSW5Eb20gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRvbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRvbVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdXG4gICAgfTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXNJbkRvbS5wdXNoKHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogYWRkU3R5bGUob2JqLCBvcHRpb25zKSxcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgdmFyIGF0dHJpYnV0ZXMgPSBvcHRpb25zLmF0dHJpYnV0ZXMgfHwge307XG5cbiAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLm5vbmNlID09PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gJ3VuZGVmaW5lZCcgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgICBpZiAobm9uY2UpIHtcbiAgICAgIGF0dHJpYnV0ZXMubm9uY2UgPSBub25jZTtcbiAgICB9XG4gIH1cblxuICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICB9KTtcblxuICBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb3B0aW9ucy5pbnNlcnQoc3R5bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQob3B0aW9ucy5pbnNlcnQgfHwgJ2hlYWQnKTtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICAgIH1cblxuICAgIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIH1cblxuICByZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbnZhciByZXBsYWNlVGV4dCA9IGZ1bmN0aW9uIHJlcGxhY2VUZXh0KCkge1xuICB2YXIgdGV4dFN0b3JlID0gW107XG4gIHJldHVybiBmdW5jdGlvbiByZXBsYWNlKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcbiAgfTtcbn0oKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5tZWRpYSA/IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIikuY29uY2F0KG9iai5jc3MsIFwifVwiKSA6IG9iai5jc3M7IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZSwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzO1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUucmVtb3ZlQXR0cmlidXRlKCdtZWRpYScpO1xuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlO1xuICB2YXIgdXBkYXRlO1xuICB2YXIgcmVtb3ZlO1xuXG4gIGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuICAgIHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUgPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZShvYmopO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307IC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuICAvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cbiAgaWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09ICdib29sZWFuJykge1xuICAgIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuICB9XG5cbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuZXdMaXN0KSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRvbVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5Eb21bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5Eb20uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCBcIi4vbWFpbi5jc3NcIjtcclxuaW1wb3J0IFwiLi4vY3ViZXMvY3ViZXNcIjtcclxuaW1wb3J0IFwiLi4vY3ViZXMvY3ViZXMuY3NzXCI7XHJcbmltcG9ydCBQcmlzbSBmcm9tIFwicHJpc21qc1wiO1xyXG5QcmlzbS5oaWdobGlnaHRBbGwoKTtcclxuXHJcbmltcG9ydCB7IHJlbmRlck5hdiB9IGZyb20gXCIuL25hdmJhci9uYXZiYXJcIjtcclxuXHJcbmltcG9ydCB7IHJlbmRlckxhbmRpbmcgfSBmcm9tIFwiLi9sYW5kaW5nL2xhbmRpbmdcIjtcclxuaW1wb3J0IHsgcmVuZGVyQWJvdXQgfSBmcm9tIFwiLi9hYm91dC9hYm91dFwiO1xyXG5cclxuaW1wb3J0IFwiLi9hYm91dC9hYm91dFwiO1xyXG5jb25zdCBkb2NGcmFnID0gbmV3IERvY3VtZW50RnJhZ21lbnQoKTtcclxuY29uc3QgYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbmJvZHkuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCIjcm9vdFwiKTtcclxuZG9jRnJhZy5hcHBlbmRDaGlsZChib2R5KTtcclxuXHJcbnJlbmRlck5hdihkb2NGcmFnKTtcclxucmVuZGVyTGFuZGluZyhkb2NGcmFnKTtcclxucmVuZGVyQWJvdXQoZG9jRnJhZyk7XHJcblxyXG4vLyBwYXNzIGluIHRoZSB0YXJnZXQgbm9kZSwgYXMgd2VsbCBhcyB0aGUgb2JzZXJ2ZXIgb3B0aW9uc1xyXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9