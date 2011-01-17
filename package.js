/*global require*/
var jslint = require('./fulljslint.js'),
    fs = require('fs'),
    packageDescription = {
        name: "jslint-core",
        author: 'Douglas Crockford <douglas@crockford.com>',
        maintainers: [{
            name: "Douglas Crockford",
            web: "http://www.crockford.com/"
        }],
        licenses: [{
            type: "MIT with \"Good not Evil\" clause.",
            url: "http://www.jslint.com/fulljslint.js"
        }],
        main: "./fulljslint",
        homepage: "http://jslint.com/",
        description: "The JavaScript Code Quality Tool",
        keywords: ["JavaScript", "lint", "jslint", "jslint-core", "fulljslint"]
    };

packageDescription.version = jslint.JSLINT.edition.replace(/\-/g, '.');

fs.writeFile('package.json', JSON.stringify(packageDescription), 'utf8');


