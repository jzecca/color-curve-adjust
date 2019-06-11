const hexRgb = require('hex-rgb');
const rgbHex = require('rgb-hex');
const evalSpline = require('./evalSpline');

/**
 * Performs a Photoshop/GIMP curve adjustment on a RGB color.
 *
 * @param {string}                  color
 * @param {{x: number, y:number}[]} curve
 */
function curveAdjust(color, curve) {
    const xs = curve.map(knot => knot.x);
    const ys = curve.map(knot => knot.y);

    const [r, g, b] = hexRgb(color, { format: 'array' })
        .map(value => Math.round(evalSpline(value, xs, ys)));

    return '#' + rgbHex(r, g, b);
}

module.exports = curveAdjust;
