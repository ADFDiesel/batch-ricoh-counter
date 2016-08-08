#!/usr/bin/env node

const fs = require('fs');
const Promise = require('bluebird');
const getCounters = require('ricoh-counter');
const program = require('commander');
// const packageVersion = require('../package.json').version;
const packageVersion = '0.0.6';

program
    .version(packageVersion)
    .option('-c, --config <path>', 'Config path')
    .parse(process.argv);

try {
    var configFile = fs.readFileSync(program.config);
    var config = JSON.parse(configFile);
} catch (e) {
    console.error('Cannot load config file.');
    process.exit();
}

function outputData(counterData, separator) {

    var header = ['Serial','Model','Host','Total Black','Total Color','Copy black','copy color','print black','print color','fax black'];
    console.log(header.join(separator));

    counterData.forEach(printer => {

        var row;

        if (printer.hasCounterConfig) {
            row = [
                printer.serial,
                printer.modelName,
                printer.host,
                printer.blackTotal,
                printer.colorTotal,
                printer.copy.black,
                printer.copy.color,
                printer.print.black,
                printer.print.color,
                printer.fax.black
            ];
        }
        else {
            row = [printer.serial, printer.modelName, printer.host, 'NO CONFIG', 'NO CONFIG'];
        }

        console.log(row.join(separator));

    });

}

var counterData = [];
var getPromises = config.map(printer => { return getCounters(printer); });

Promise
    .map(getPromises, result => {
        counterData.push(result);
    })
    .then(() => {
        outputData(counterData, ',');
        process.exit();
    });
