/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


// const msg: string = "Hello!";
// alert(msg);
var styles = [{
  name: "Domyslny",
  path: "css/style1.css"
}, {
  name: "Responsywny",
  path: "css/style1.css"
}, {
  name: "Design",
  path: "css/style2.css"
}, {
  name: "Dodatkowy",
  path: "css/style3.css"
}];
document.addEventListener("DOMContentLoaded", function () {
  var styleDiv = document.getElementById("style-div");
  function changeStylesheet(styleSheetPath) {
    var styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.type = "text/css";
    styleLink.href = styleSheetPath;
    styleLink.id = "dynamic-styles";
    var existingLink = document.getElementById("dynamic-styles");
    if (existingLink) {
      document.head.removeChild(existingLink);
    }
    document.head.appendChild(styleLink);
  }
  var defaultStylePath = styles[0].path;
  changeStylesheet(defaultStylePath);
  styles.forEach(function (style) {
    var link = document.createElement("a");
    link.href = "#";
    link.innerText = style.name;
    link.addEventListener("click", function (event) {
      event.preventDefault();
      changeStylesheet(style.path);
    });
    if (styleDiv) {
      styleDiv.appendChild(link);
    } else {
      console.error("Element with ID 'style-div' not found.");
    }
  });
});
/******/ })()
;