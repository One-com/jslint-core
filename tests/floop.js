var assert = require('assert'),
    fs = require('fs'),
    Script = process.binding('evals').Script;

exports.testFloopWarning = function () {
    var test = 'while(true) {\n[].forEach(function (a) {\na = a + 1;\n});\n}';

    JSLINT(test, {});

    assert.equal(JSLINT.errors.length, 1, 'JSLint returns one error for missing fallthrough.');
    assert.equal(JSLINT.errors[0].reason, "Don't make functions within a loop.");
};

exports.testFloopOption = function () {
    var test = 'while(true) {\n[].forEach(function (a) {\na = a + 1;\n});\n}';

    JSLINT(test, {floop: true});

    assert.equal(JSLINT.errors.length, 0, 'JSLint returns zero errors.');
};

exports.testFallthroughLocal = function () {
    var test = '/*jslint floop:true */\nwhile(true) {\n[].forEach(function (a) {\na = a + 1;\n});\n}';

    JSLINT(test, {});

    assert.equal(JSLINT.errors.length, 0, 'JSLint returns zero errors.');
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
