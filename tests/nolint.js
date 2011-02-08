var assert = require('assert'),
    fs = require('fs'),
    Script = process.binding('evals').Script;

exports.testLint= function () {
    var test = 'var p {';

    JSLINT(test, {});

    assert.equal(JSLINT.errors.length !== 0, true, 'JSLint returns error.');
};

exports.testLintOption = function () {
    var test = 'var p {';

    JSLINT(test, {nolint: true});

    assert.equal(JSLINT.errors.length, 0, 'JSLint returns no errors.');
};

exports.testLintLocal = function () {
    var test = '/*jslint nolint:true */\nvar p {';

    JSLINT(test, {});

    assert.equal(JSLINT.errors.length, 0, 'JSLint returns no errors.');
};

exports.testLintInline = function () {
    // This should normally report undefined z variable.
    var test = 'var a = {};\n/*jslint nolint:true*/\nz++;\n/*jslint nolint:false*/\na[0] = true;';
    JSLINT(test, {});

    assert.equal(JSLINT.errors.length, 0, 'JSLint returns no errors.');
};

if (module === require.main) {
    fs.readFile('fulljslint.js', function (err, code) {
        if (err) {
            throw err;
        }
        var fulljslint = new Script(code, 'fulljslint.js');

        fulljslint.runInThisContext();
        require('test').run(exports);
    });
}
