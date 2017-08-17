// eslint-disable-next-line no-unused-vars
function numberToCurrency(number, options) {
  'use strict';

  // Set defaults...
  if (typeof options == 'undefined') {
    options = {};
  }

  var precision = typeof(options.precision) == 'number' ?
    options.precision : 2;
  var unit = options.unit || '$';
  var separator = options.separator || '.';
  var delimiter = options.delimiter || ',';
  var format = options.format || '%u%n';
  var negativeFormat = options.negativeFormat || '-%u%n';

  // "clean up" number
  if (typeof number == 'string') {
    number = number.replace(/\$/g, '');
  } // strip dollar sign
  number = isNaN(number) || number === '' || number === null ?
    0.0 : number; // set to 0.0 if we can't tell what it is

  // determine which format to use
  if (number < 0) {
    format = negativeFormat;
    number = Math.abs(number); // "remove" the negative sign
  }

  // 'separate' the cents
  var numberStr = parseFloat(number).toFixed(precision).toString();
  var numberFormatted;

  if(precision > 0){
    // this returns the cents
    numberFormatted = new Array(numberStr.slice(-1*precision));
    // add the separator
    numberFormatted.unshift(separator);
    // this removes the decimal and cents
    numberStr = numberStr.substring(0, numberStr.length-(precision+1));
  }
  else{
    numberFormatted = [];
  }

  // 'delimit' the thousands
  while (numberStr.length > 3) {
    // this prepends the last three digits to `numberFormatted`
    numberFormatted.unshift(numberStr.slice(-3));
    // this prepends the delimiter to `numberFormatted`
    numberFormatted.unshift(delimiter);
     // this removes the last three digits
    numberStr = numberStr.substring(0, numberStr.length-3);
  }

  // there are less than three digits in numberStr, so prepend them
  numberFormatted.unshift(numberStr);

  // put it all together
  return format.replace(/%u/g, unit).replace(/%n/g, numberFormatted.join(''));
}
