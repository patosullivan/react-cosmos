/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = React;

/***/ }),

/***/ "react-plugin":
/*!******************************!*\
  !*** external "ReactPlugin" ***!
  \******************************/
/***/ ((module) => {

module.exports = ReactPlugin;

/***/ }),

/***/ "./packages/react-cosmos-plugin-boolean-input/dist/BooleanInput.js":
/*!*************************************************************************!*\
  !*** ./packages/react-cosmos-plugin-boolean-input/dist/BooleanInput.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BooleanInput: () => (/* binding */ BooleanInput)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

function BooleanInput({ indentLevel, name, checked, onChange }) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: {
            display: 'flex',
            height: 28,
            marginLeft: indentLevel * 12 + 20,
            flexDirection: 'row',
            alignItems: 'center',
            color: 'rgb(224, 224, 224)',
            userSelect: 'none',
            lineHeight: '28px',
        } },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: { marginRight: 8 }, type: "checkbox", checked: checked, onChange: e => onChange(e.target.checked) }),
        name));
}


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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
/*!******************************************************************!*\
  !*** ./packages/react-cosmos-plugin-boolean-input/dist/index.js ***!
  \******************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-plugin */ "react-plugin");
/* harmony import */ var _BooleanInput_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BooleanInput.js */ "./packages/react-cosmos-plugin-boolean-input/dist/BooleanInput.js");



const { plug, register } = (0,react_plugin__WEBPACK_IMPORTED_MODULE_1__.createPlugin)({
    name: 'booleanInputPlugin',
});
plug('valueInput', ({ slotProps, children }) => {
    const { name, value, indentLevel, onChange } = slotProps;
    if (value.type === 'primitive' && typeof value.data === 'boolean')
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BooleanInput_js__WEBPACK_IMPORTED_MODULE_2__.BooleanInput, { name: name, checked: value.data, indentLevel: indentLevel, onChange: onChange }));
    // Fall back to default inputs
    return children;
});
register();

/******/ })()
;