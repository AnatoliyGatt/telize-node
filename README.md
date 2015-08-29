# Telize for Node.js

An asynchronous client library for Telize [API](http://telize.com/).

[![NPM Package Version][npm-package-version-badge]][npm-package-url]
[![NPM Package License][npm-package-license-badge]][npm-package-license-url]
[![NPM Package Downloads][npm-package-downloads-badge]][npm-package-url]
[![devDependencies Status][devDependencies-status-badge]][devDependencies-status-page-url]

[![Travis CI Build Status][travis-ci-build-status-badge]][travis-ci-build-status-page-url]

[![NPM Package Statistics][npm-package-statistics-badge]][npm-package-url]

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

[npm-package-url]: https://npmjs.org/package/telize-node

[npm-package-version-badge]: https://img.shields.io/npm/v/telize-node.svg?style=flat-square

[npm-package-license-badge]: https://img.shields.io/npm/l/telize-node.svg?style=flat-square
[npm-package-license-url]: http://opensource.org/licenses/MIT

[npm-package-downloads-badge]: https://img.shields.io/npm/dm/telize-node.svg?style=flat-square

[devDependencies-status-badge]: https://david-dm.org/AnatoliyGatt/telize-node/dev-status.svg?style=flat-square
[devDependencies-status-page-url]: https://david-dm.org/AnatoliyGatt/telize-node#info=devDependencies

[travis-ci-build-status-badge]: https://img.shields.io/travis/AnatoliyGatt/telize-node.svg?style=flat-square
[travis-ci-build-status-page-url]: https://travis-ci.org/AnatoliyGatt/telize-node

[npm-package-statistics-badge]: https://nodei.co/npm/telize-node.png?downloads=true&downloadRank=true&stars=true