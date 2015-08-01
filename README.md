# Telize for Node.js

An asynchronous client library for Telize [API](http://telize.com/).

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![License][license]][license-url]
[![Travis Build][travis-image]][travis-url]

[![NPM Statistics][npm-statistics-image]][npm-url]

## Installation

`npm install telize-node`

## Quick Start

The quickest way to get started is by executing following code:

```javascript
var telize = require("telize-node")();

telize.getIP(function(error, ip) {
    if(!error) {
        console.log(ip);
    } else {
        console.error(error);
    }
});
```

If everything went well, you'll see your current IP address in the console:

```javascript
46.19.37.108
```

## Documentation

### getIP

Requests current IP address.

#### Example

Requests current IP address.

```javascript
telize.getIP(function(error, ip) {
    if(!error) {
        console.log(ip);
    } else {
        console.error(error);
    }
});
```

#### Errors

When errors occur, you receive an error object with default properties as a first argument of the callback.

***

### getGeoIP

Requests Geo IP data.

#### Examples

Requests GeoIP data for current IP address.

```javascript
telize.getGeoIP(function(error, data) {
    if(!error) {
        console.log(data);
    } else {
        console.error(error);
    }
});
```

Requests GeoIP data for manually set IPv4 address.

```javascript
telize.getGeoIP("46.19.37.108", function(error, data) {
    if(!error) {
        console.log(data);
    } else {
        console.error(error);
    }
});
```

Requests GeoIP data for manually set IPv6 address.

```javascript
telize.getGeoIP("2a02:2770::21a:4aff:feb3:2ee", function(error, data) {
    if(!error) {
        console.log(data);
    } else {
        console.error(error);
    }
});
```

#### Errors

When errors occur, you receive an error object with default properties as a first argument of the callback.

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## License

Distributed under the [MIT License](LICENSE).

[npm-image]: https://img.shields.io/npm/v/telize-node.svg
[npm-url]: https://npmjs.org/package/telize-node
[downloads-image]: https://img.shields.io/npm/dm/telize-node.svg
[downloads-url]: https://npmjs.org/package/telize-node
[license]: https://img.shields.io/npm/l/telize-node.svg
[license-url]: https://github.com/AnatoliyGatt/telize-node/blob/master/LICENSE
[travis-image]: https://img.shields.io/travis/AnatoliyGatt/telize-node/master.svg
[travis-url]: https://travis-ci.org/AnatoliyGatt/telize-node
[npm-statistics-image]: https://nodei.co/npm/telize-node.png?downloads=true&downloadRank=true&stars=true