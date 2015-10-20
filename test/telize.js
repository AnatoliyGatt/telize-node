var assert = require('assert');
var telize = require('../lib/telize')();

describe('telize', function() {
    describe('init', function() {
        var defaultRequestOptions = {};

        before(function() {
            defaultRequestOptions = {
                hostname: 'www.telize.com',
                port: 80,
                basePath: ''
            }
        });

        it('should have correct default request options', function() {
            assert.deepEqual(telize.defaultRequestOptions, defaultRequestOptions, 'default request options should have correct initial property values');
        });

        it('should not override default request options', function() {
            telize.defaultRequestOptions = {
                hostname: 'www.telize.co',
                port: 3000,
                basePath: ''
            };

            assert.deepEqual(telize.defaultRequestOptions, defaultRequestOptions, 'default request options should not be overridden');
        });
    });

    describe('functions', function() {
        describe('#getIP()', function() {
            it('should respond with IP address', function(done) {
                telize.getIP(function(error, ip) {
                    if (!error) {
                        assert.notEqual(ip, undefined, 'ip should not be undefined');
                    } else {
                        assert.throws(function() {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it('should fail when called without arguments', function() {
                assert.throws(function() {
                    telize.getIP();
                }, Error);
            });

            it('should not be overridden', function() {
                telize.getIP = function() {
                    return '#getIP()';
                };

                assert.throws(function() {
                    assert.notEqual(telize.getIP(), '#getIP()', '#getIP() should not be overridden');
                }, Error);
            });
        });

        describe('#getGeoIP()', function() {
            function validateGeoIPData(data) {
                assert.notEqual(data, undefined, 'data should not be undefined');
                assert.notEqual(data.longitude, undefined, 'data.longitude should not be undefined');
                assert.notEqual(data.latitude, undefined, 'data.latitude should not be undefined');
                assert.notEqual(data.asn, undefined, 'data.asn should not be undefined');
                assert.notEqual(data.offset, undefined, 'data.offset should not be undefined');
                assert.notEqual(data.ip, undefined, 'data.ip should not be undefined');
                assert.notEqual(data.area_code, undefined, 'data.area_code should not be undefined');
                assert.notEqual(data.continent_code, undefined, 'data.continent_code should not be undefined');
                assert.notEqual(data.dma_code, undefined, 'data.dma_code should not be undefined');
                assert.notEqual(data.timezone, undefined, 'data.timezone should not be undefined');
                assert.notEqual(data.country_code, undefined, 'data.country_code should not be undefined');
                assert.notEqual(data.isp, undefined, 'data.isp should not be undefined');
                assert.notEqual(data.country, undefined, 'data.country should not be undefined');
                assert.notEqual(data.country_code3, undefined, 'data.country_code3 should not be undefined');
            }

            it('should respond with GeoIP data object for current IP address', function(done) {
                telize.getGeoIP(function(error, data) {
                    if (!error) {
                        validateGeoIPData(data);
                    } else {
                        assert.throws(function() {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it('should respond with GeoIP data object for manually set IP address', function(done) {
                telize.getGeoIP('46.19.37.108', function(error, data) {
                    if (!error) {
                        validateGeoIPData(data);
                    } else {
                        assert.throws(function() {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it('should respond with error when called with invalid IP address', function(done) {
                telize.getGeoIP('46.19.37', function(error, data) {
                    if (!error) {
                        validateGeoIPData(data);
                    } else {
                        assert.throws(function() {
                            throw error;
                        }, Error);
                    }
                    done();
                });
            });

            it('should fail when called without arguments', function() {
                assert.throws(function() {
                    telize.getGeoIP();
                }, Error);
            });

            it('should fail when called with IP address only', function() {
                assert.throws(function() {
                    telize.getGeoIP('46.19.37.108');
                }, Error);
            });

            it('should not be overridden', function() {
                telize.getGeoIP = function() {
                    return '#getGeoIP()';
                };

                assert.throws(function() {
                    assert.notEqual(telize.getGeoIP(), '#getGeoIP()', '#getGeoIP() should not be overridden');
                }, Error);
            });
        });
    });
});