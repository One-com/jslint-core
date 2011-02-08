var assert = require('assert'),
    jslint = require('../fulljslint.js');

exports.testExistence = function () {
    assert.equal(typeof jslint.JSLINT, 'function');
    assert.equal(typeof jslint.JSLINT.edition, 'string');
};

if (module === require.main) {
    require('test').run(exports);
}
