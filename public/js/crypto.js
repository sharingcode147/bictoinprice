/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/crypto.js":
/*!********************************!*\
  !*** ./resources/js/crypto.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(window).on('load', function () {
  var request = function request() {
    jQuery.ajax({
      type: 'GET',
      url: "https://rest.coinapi.io/v1/exchangerate/BTC/USD?apikey=13D92790-289D-4A37-90FD-2BF6851C1F6A",
      success: function success(data) {
        postValueInDatabase(data);
      }
    });
  };

  function postValueInDatabase(dataFromFirstAjax) {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    jQuery.ajax({
      type: 'POST',
      url: "/Bitcoin/bitcoinprice/public/home",
      data: {
        price: parseFloat(dataFromFirstAjax.rate),
        name: dataFromFirstAjax.asset_id_base,
        symbol: dataFromFirstAjax.asset_id_base,
        money: dataFromFirstAjax.asset_id_quote
      },
      success: function success(data) {
        getVariationPorcentage(dataFromFirstAjax.rate);
      }
    });
  }

  ;

  function getVariationPorcentage(currenvalue) {
    jQuery.ajax({
      type: 'GET',
      url: '/Bitcoin/bitcoinprice/public/cryptovar',
      dataType: 'json',
      success: function success(data) {
        if (data === undefined) {
          var variation = 0;
        } else {
          var old_price = data.cryptovar.price;
          var variation = (currenvalue - old_price) / old_price;
        }

        if (variation < 0) {
          $('#crypto').text(currenvalue);
          $('#cryptovar').text('¡El precio ha bajado!');
          $('#cryptovar').append('<i class="bi bi-arrow-down"></i>').css({
            color: "green"
          });
          $('#cryptovarporcentage').text(variation + '%');
        } else if (variation == 0) {
          $('#crypto').text(currenvalue);
          $('#cryptovar').text('¡Precio sin variación!').css({
            color: "black"
          });
          $('#cryptovarporcentage').text('');
        } else {
          $('#crypto').text(currenvalue);
          $('#cryptovar').text('¡El precio ha subido!');
          $('#cryptovar').append('<i class="bi bi-arrow-up"></i>').css({
            color: "red"
          });
          $('#cryptovarporcentage').text(variation + '%');
        }
      },
      error: function error(data) {
        var errors = data.responseJSON;
        console.log(errors);
      }
    });
  }

  ;
  request();
  setInterval(request, 10000);
});

/***/ }),

/***/ 1:
/*!**************************************!*\
  !*** multi ./resources/js/crypto.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\Bitcoin\bitcoinprice\resources\js\crypto.js */"./resources/js/crypto.js");


/***/ })

/******/ });