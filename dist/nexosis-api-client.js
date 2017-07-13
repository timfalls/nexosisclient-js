var Nexosis API Client =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ApiConnection = __webpack_require__(1);

var _ApiConnection2 = _interopRequireDefault(_ApiConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiClientBase = function ApiClientBase(apiConnection) {
    _classCallCheck(this, ApiClientBase);

    if (apiConnection instanceof _ApiConnection2.default) {
        this._apiConnection = apiConnection;
    } else {
        this._apiConnection = new _ApiConnection2.default(apiConnection);
    }
};

exports.default = ApiClientBase;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApiConnectionOptions = __webpack_require__(7);

var _ApiConnectionOptions2 = _interopRequireDefault(_ApiConnectionOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiConnection = function () {
    function ApiConnection(_ref) {
        var endpoint = _ref.endpoint,
            key = _ref.key;

        _classCallCheck(this, ApiConnection);

        this._endpoint = endpoint;
        this._key = key;
    }

    _createClass(ApiConnection, [{
        key: 'buildRequest',
        value: function buildRequest(httpMethod, path) {
            var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var payload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            var reqHeaders = new Headers();
            reqHeaders.append('Content-Type', 'application/json');
            reqHeaders.append('Access-Control-Allow-Origin', '*');
            reqHeaders.append('api-key', this._key);
            reqHeaders.append('User-Agent', _ApiConnectionOptions2.default.CLIENT_VERSION);

            var queryString = '';
            if (Object.keys(parameters).length > 0) {
                var urlParams = new URLSearchParams();
                Object.keys(parameters).forEach(function (p) {
                    return urlParams.append(p, parameters[p]);
                });
                queryString = '?' + urlParams.toString();
            }

            var options = {
                method: httpMethod,
                headers: reqHeaders,
                mode: 'cors'
            };

            if (Object.keys(payload).length > 0) {
                Object.defineProperty(options, 'body', {
                    value: JSON.stringify(payload)
                });
            }

            return new Request(this._endpoint + '/' + path + queryString, options);
        }
    }, {
        key: 'get',
        value: function get(path, transformFunction) {
            var _this = this;

            var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            return new Promise(function (resolve, reject) {
                var req = _this.buildRequest('GET', path, parameters);
                fetch(req).then(function (httpResp) {
                    return httpResp.json();
                }).then(function (data) {
                    if (undefined === transformFunction) return resolve(data);
                    return resolve(transformFunction(data));
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }, {
        key: 'head',
        value: function head(path, transformFunction) {
            var _this2 = this;

            var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            return new Promise(function (resolve, reject) {
                var req = _this2.buildRequest('HEAD', path, parameters);
                fetch(req).then(function (httpResp) {
                    if (undefined === transformFunction) return resolve(httpResp.headers);
                    return resolve(transformFunction(httpResp.headers));
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }, {
        key: 'post',
        value: function post(path, payload, transformFunction) {
            var _this3 = this;

            var parameters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            return new Promise(function (resolve, reject) {
                var req = _this3.buildRequest('POST', path, parameters, payload);
                fetch(req).then(function (httpResp) {
                    return httpResp.json();
                }).then(function (data) {
                    if (undefined === transformFunction) return resolve(data);
                    return resolve(transformFunction(data));
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }, {
        key: 'put',
        value: function put(path, payload, transformFunction) {
            var _this4 = this;

            var parameters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            return new Promise(function (resolve, reject) {
                var req = _this4.buildRequest('PUT', path, parameters, payload);
                fetch(req).then(function (httpResp) {
                    return httpResp.json();
                }).then(function (data) {
                    if (undefined === transformFunction) return resolve(data);
                    return resolve(transformFunction(data));
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }, {
        key: 'delete',
        value: function _delete(path, transformFunc) {
            var _this5 = this;

            var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            return new Promise(function (resolve, reject) {
                var req = _this5.buildRequest('DELETE', path);
                fetch(req).then(function (httpResp) {
                    if (undefined === transformFunction) return resolve(httpResp);
                    return resolve(transformFunction(httpResp));
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }]);

    return ApiConnection;
}();

exports.default = ApiConnection;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(5);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(4);
module.exports = self.fetch.bind(self);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (self) {
  'use strict';

  if (self.fetch) {
    return;
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

    var isDataView = function isDataView(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj);
    };

    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function next() {
        var value = items.shift();
        return { done: value === undefined, value: value };
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function (header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ',' + value : value;
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };

  Headers.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };

  Headers.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('');
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type');
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }

    this.text = function () {
      var rejected = consumed(this);
      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);
  }

  Request.prototype.clone = function () {
    return new Request(this, { body: this._bodyInit });
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    rawHeaders.split(/\r?\n/).forEach(function (line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = 'status' in options ? options.status : 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function () {
    var response = new Response(null, { status: 0, statusText: '' });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, { status: status, headers: { location: url } });
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function (input, init) {
    return new Promise(function (resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };
  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : undefined);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var NexosisClient = __webpack_require__(6);

exports.NexosisClient = NexosisClient;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApiClientBase2 = __webpack_require__(0);

var _ApiClientBase3 = _interopRequireDefault(_ApiClientBase2);

var _DataSetClient = __webpack_require__(8);

var _DataSetClient2 = _interopRequireDefault(_DataSetClient);

var _SessionClient = __webpack_require__(9);

var _SessionClient2 = _interopRequireDefault(_SessionClient);

var _ImportClient = __webpack_require__(10);

var _ImportClient2 = _interopRequireDefault(_ImportClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NexosisClient = function (_ApiClientBase) {
    _inherits(NexosisClient, _ApiClientBase);

    function NexosisClient() {
        _classCallCheck(this, NexosisClient);

        return _possibleConstructorReturn(this, (NexosisClient.__proto__ || Object.getPrototypeOf(NexosisClient)).apply(this, arguments));
    }

    _createClass(NexosisClient, [{
        key: 'getAccountbalance',
        value: function getAccountbalance(transformFunc) {
            return this._apiConnection.get('data', transformFunc);
        }
    }, {
        key: 'DataSets',
        get: function get() {
            return new _DataSetClient2.default(this._apiConnection);
        }
    }, {
        key: 'Sessions',
        get: function get() {
            return new _SessionClient2.default(this._apiConnection);
        }
    }, {
        key: 'Imports',
        get: function get() {
            return new _ImportClient2.default(this._apiConnection);
        }
    }]);

    return NexosisClient;
}(_ApiClientBase3.default);

exports.default = NexosisClient;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiConnectionOptions = function () {
    function ApiConnectionOptions() {
        _classCallCheck(this, ApiConnectionOptions);
    }

    _createClass(ApiConnectionOptions, null, [{
        key: 'CLIENT_VERSION',
        get: function get() {
            return 'Nexosis-JS-API-Client/1.0';
        }
    }, {
        key: 'BASE_URL',
        get: function get() {
            return 'https://ml.nexoisis.com/api';
        }
    }]);

    return ApiConnectionOptions;
}();

exports.default = ApiConnectionOptions;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApiConnection = __webpack_require__(1);

var _ApiConnection2 = _interopRequireDefault(_ApiConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DATASET_MAX_PAGE_SIZE = 10;

var DataSetClient = function () {
    function DataSetClient(apiConnection) {
        var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DATASET_MAX_PAGE_SIZE;

        _classCallCheck(this, DataSetClient);

        if (apiConnection instanceof _ApiConnection2.default) {
            this._apiConnection = apiConnection;
        } else {
            this._apiConnection = new _ApiConnection2.default(apiConnection);
        }

        this._maxPageSize = pageSize;
    }

    _createClass(DataSetClient, [{
        key: 'get',
        value: function get(dataSetName, transformFunc) {

            return this._apiConnection.get('data/' + dataSetName, transformFunc);
        }
    }, {
        key: 'create',
        value: function create(dataSetName, dataSetDetail, transformFunc) {
            return this._apiConnection.put('data/' + dataSetName, dataSetDetail, transformFunc);
        }
    }, {
        key: 'list',
        value: function list(dataSetPartialName, transformFunc) {
            return this._apiConnection.get('data', transformFunc, { "partialName": dataSetPartialName });
        }
    }, {
        key: 'remove',
        value: function remove(dataSetName, transformFunc) {
            return this._apiConnection.delete('data/' + dataSetName, transformFunc);
        }
    }]);

    return DataSetClient;
}();

exports.default = DataSetClient;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApiClientBase2 = __webpack_require__(0);

var _ApiClientBase3 = _interopRequireDefault(_ApiClientBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SessionClient = function (_ApiClientBase) {
    _inherits(SessionClient, _ApiClientBase);

    function SessionClient() {
        _classCallCheck(this, SessionClient);

        return _possibleConstructorReturn(this, (SessionClient.__proto__ || Object.getPrototypeOf(SessionClient)).apply(this, arguments));
    }

    _createClass(SessionClient, [{
        key: 'analyzeImpact',
        value: function analyzeImpact(data, targetColumn, startDate, endDate, resultInterval, isEstimate, transformFunc) {
            var eventName = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : '';
            var statusCallbackUrl = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : '';


            var parameters = {
                targetColumn: targetColumn,
                startDate: startDate,
                endDate: endDate,
                isEstimate: isEstimate,
                resultInterval: resultInterval
            };

            if (eventName.length > 0) {
                Object.defineProperty(parameters, 'eventName', {
                    value: eventName,
                    enumerable: true
                });
            }

            if (statusCallbackUrl.length > 0) {
                Object.defineProperty(parameters, 'callbackUrl', {
                    value: statusCallbackUrl,
                    enumerable: true
                });
            }

            return this._apiConnection.post('sessions/impact', data, transformFunc, parameters);
        }
    }, {
        key: 'createForecast',
        value: function createForecast(dataSetName, targetColumn, startDate, endDate, resultInterval, statusCallbackUrl, transformFunc) {
            var parameters = {
                dataSetName: dataSetName,
                targetColumn: targetColumn,
                startDate: startDate,
                endDate: endDate,
                resultInterval: resultInterval
            };

            if (statusCallbackUrl.length > 0) {
                Object.defineProperty(parameters, 'callbackUrl', {
                    value: statusCallbackUrl,
                    enumerable: true
                });
            }

            return this._apiConnection.post('sessions/forecast', {}, transformFunc, parameters);
        }
    }, {
        key: 'estimateForecast',
        value: function estimateForecast(dataSetName, targetColumn, startDate, endDate, resultInterval, statusCallbackUrl, transformFunc) {
            var parameters = {
                dataSetName: dataSetName,
                targetColumn: targetColumn,
                startDate: startDate,
                endDate: endDate,
                resultInterval: resultInterval
            };

            if (statusCallbackUrl.length > 0) {
                Object.defineProperty(parameters, 'callbackUrl', {
                    value: statusCallbackUrl,
                    enumerable: true
                });
            }

            return this._apiConnection.post('sessions/forecast', {}, transformFunc, parameters);
        }
    }, {
        key: 'estimateImpact',
        value: function estimateImpact(data, eventName, targetColumn, startDate, endDate, resultInterval, statusCallbackUrl, transformFunc) {
            var parameters = {
                eventName: eventName,
                targetColumn: targetColumn,
                startDate: startDate,
                endDate: endDate,
                resultInterval: resultInterval
            };

            if (statusCallbackUrl.length > 0) {
                Object.defineProperty(parameters, 'callbackUrl', {
                    value: statusCallbackUrl,
                    enumerable: true
                });
            }

            return this._apiConnection.post('sessions/impact', data, transformFunc, parameters);
        }
    }, {
        key: 'get',
        value: function get(id, transformFunc) {
            return this._apiConnection.get('sessions/' + id, transformFunc);
        }
    }, {
        key: 'getStatus',
        value: function getStatus(id, transformFunc) {
            return this._apiConnection.head('sessions/' + id, transformFunc);
        }
    }, {
        key: 'remove',
        value: function remove(id, transformFunc) {
            return this._apiConnection.delete('sessions/' + id, transformFunc);
        }
    }, {
        key: 'getResults',
        value: function getResults(id, transformFunc) {
            return this._apiConnection.get('sessions/' + id + '/results', transformFunc);
        }
    }, {
        key: 'list',
        value: function list(dataSetName, eventName, requestedAfterDate, requestedBeforeDate, transformFunc) {
            var parameters = {
                dataSetName: dataSetName,
                eventName: eventName,
                requestedAfterDate: requestedAfterDate,
                requestedBeforeDate: requestedBeforeDate
            };

            this._apiConnection.get('sessions', transformFunc, parameters);
        }
    }]);

    return SessionClient;
}(_ApiClientBase3.default);

exports.default = SessionClient;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApiClientBase2 = __webpack_require__(0);

var _ApiClientBase3 = _interopRequireDefault(_ApiClientBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImportClient = function (_ApiClientBase) {
    _inherits(ImportClient, _ApiClientBase);

    function ImportClient() {
        _classCallCheck(this, ImportClient);

        return _possibleConstructorReturn(this, (ImportClient.__proto__ || Object.getPrototypeOf(ImportClient)).apply(this, arguments));
    }

    _createClass(ImportClient, [{
        key: 'get',
        value: function get(id, transformFunc) {
            return this._apiConnection.get('imports/' + id, transformFunc);
        }
    }, {
        key: 'importFromS3',
        value: function importFromS3(dataSetName, bucket, path, region, columns, transformFunc) {
            var payload = {
                DataSetName: dataSetName,
                Bucket: bucket,
                Path: path,
                Region: region,
                Columns: Columns, columns: columns
            };

            return this._apiConnection.post('imports/s3', payload, transformFunc);
        }
    }, {
        key: 'list',
        value: function list(dataSetName, requestedAfterDate, requestedBeforeDate, transformFunc) {
            var parameters = {
                dataSetName: dataSetName,
                requestedAfterDate: requestedAfterDate,
                requestedBeforeDate: requestedBeforeDate
            };

            return this._apiConnection.get('imports', transformFunc, parameters);
        }
    }]);

    return ImportClient;
}(_ApiClientBase3.default);

exports.default = ImportClient;

/***/ })
/******/ ]);
//# sourceMappingURL=nexosis-api-client.js.map