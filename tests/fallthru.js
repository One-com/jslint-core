var assert = require('assert'),
    fs = require('fs'),
    Script = process.binding('evals').Script;

exports.testFallthroughWarning = function () {
    var test = 'var a = "a";\nswitch(a) {\ncase "a": a = 1;\ncase "b": a = 2;\n}';

    JSLINT(test, {});

    assert.equal(JSLINT.errors.length, 2, 'JSLint returns two errors for missing break.');
    assert.equal(JSLINT.errors[0].reason, 'Missing break after case.');
};

exports.testFallthroughOption = function () {
    var test = 'var a = "a";\nswitch(a) {\ncase "a": a = 1;\ncase "b": a = 2;\n}';

    JSLINT(test, {fallthru: true});

    assert.equal(JSLINT.errors.length, 0, 'JSLint returns zero errors.');
};

exports.testFallthroughLocal = function () {
    var test = '/*jslint fallthru:true */\nvar a = "a";\nswitch(a) {\ncase "a": a = 1;\ncase "b": a = 2;\n}';

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
