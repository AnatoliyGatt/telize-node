/**
 * @module telize
 * @description Client for Telize API.
 * @version 1.0.4
 * @author Anatoliy Gatt [anatoliy.gatt@aol.com]
 * @copyright Copyright (c) 2015 Anatoliy Gatt
 * @license MIT
 */

"use strict";

/**
 * @private
 * @description Module dependencies.
 */

var http = require("http");
var freeze = require("deep-freeze-node");

/**
 * @private
 * @constant {String}
 * @description Module version.
 */

var VERSION = require('../package.json').version;

/**
 * @public
 * @constructor
 * @description Initialize instance of Telize with default request options.
 * @property {Object} defaultRequestOptions - Default request options.
 * @property {String} defaultRequestOptions.hostname - Default request hostname.
 * @property {Number} defaultRequestOptions.port - Default request port.
 * @property {String} defaultRequestOptions.basePath - Default request base path.
 */

function Telize() {
    this.defaultRequestOptions = {
        hostname: "www.telize.com",
        port: 80,
        basePath: ""
    };
}

/**
 * @public
 * @function getIP
 * @description Request current IP address.
 * @param {getIP~callback} callback - Callback when response comes in.
 */

Telize.prototype.getIP = function(callback) {
    if((typeof callback !== "function") || !(callback instanceof Function)) {
        throw new Error("getIP(): callback is undefined or contains non-function value");
    }

    request(this.defaultRequestOptions, "/jsonip", function(error, rawResponse) {
        if(!error) {
            try {
                var parsedResponse = JSON.parse(rawResponse);
            } catch(error) {
                callback(error);
            }
            callback(null, parsedResponse.ip);
        } else {
            callback(error);
        }
    });
};

/**
 * @callback getIP~callback
 * @description Use as callback in getIP function.
 * @param {Object} error - Generic error object.
 * @param {String} ip - IP address.
 */

/**
 * @public
 * @function getGeoIP
 * @description Request Geo IP data.
 * @param {String} [ip] - IP address.
 * @param {getGeoIP~callback} callback - Callback when response comes in.
 */

Telize.prototype.getGeoIP = function(ip, callback) {
    if((typeof ip === "function") || (ip instanceof Function)) {
        callback = ip;
        ip = undefined;
    } else if(!(typeof callback === "function") || !(callback instanceof Function)) {
        throw new Error("getGeoIP(): callback is undefined or contains non-function value");
    }

    request(this.defaultRequestOptions, "/geoip" + (ip ? "/" + ip : ""), function(error, rawResponse) {
        if(!error) {
            try {
                var parsedResponse = JSON.parse(rawResponse);
            } catch(error) {
                callback(error);
            }
            if(parsedResponse.code && parsedResponse.message) {
                callback(new Error(parsedResponse.message, parsedResponse.code));
            } else {
                callback(null, parsedResponse);
            }
        } else {
            callback(error);
        }
    });
};

/**
 * @callback getGeoIP~callback
 * @description Use as callback in getGeoIP function.
 * @param {Object} error - Generic error object.
 * @param {Object} data - Geo IP data object.
 */

/**
 * @private
 * @function request
 * @description Perform HTTP GET request.
 * @param options - Request options.
 * @param path - Request path.
 * @param {request~callback} callback - Callback when response comes in.
 */

function request(options, path, callback) {
    if(!(typeof options === "object") || !(options instanceof Object)) {
        throw new Error("request(): options is undefined or contains non-object value");
    }
    if(!(typeof path === "string")) {
        throw new Error("request(): path is undefined or contains non-string value");
    }
    if(!(typeof callback === "function") || !(callback instanceof Function)) {
        throw new Error("request(): callback is undefined or contains non-function value");
    }

    var request = http.get({
        hostname: options.hostname,
        port: options.port,
        path: options.basePath + path,
        headers: {
            "Accept": "application/json",
            "Accept-Charset": "utf-8",
            "Accept-Encoding": "*",
            "Accept-Language": "en",
            "Accept-Datetime": new Date().toUTCString(),
            "Cache-Control": "no-cache",
            "Connection": "close",
            "Date": new Date().toUTCString(),
            "Host": options.hostname,
            "Max-Forwards": 1,
            "Pragma": "no-cache",
            "TE": "trailers, deflate",
            "User-Agent": "telize-node/" + VERSION
        },
        agent: false,
        keepAlive: false
    }, function(response) {
        var rawResponse = "";
        response.on("data", function(data) {
            rawResponse += data;
        });
        response.on("end", function() {
            callback(null, rawResponse);
        });
        response.on("error", function(error) {
            callback(error);
        });
    });
    request.on("error", function(error) {
        callback(error);
    });
}

/**
 * @callback request~callback
 * @description Use as callback in request function.
 * @param {Object} error - Generic error object.
 * @param {String} rawResponse - Raw response string.
 */

/**
 * @public
 * @description Expose unchangeable instance of Telize.
 * @returns {Object} - Unchangeable instance of Telize.
 */

module.exports = function() {
    return freeze(new Telize());
};