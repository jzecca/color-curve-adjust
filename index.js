const hexRgb = require('hex-rgb');
const rgbHex = require('rgb-hex');

const evalSpline = require('./evalSpline');

/**
 * Performs a Photoshop/GIMP curve adjustment on a hexadecimal RGB color.
 *
 * @param {string}                  color
 * @param {{x: number, y:number}[]} curve
 * @param {string}                  [channels=rgb]
 */
function curveAdjust(color, curve, channels = 'rgb') {
    const xs = curve.map(knot => knot.x);
    const ys = curve.map(knot => knot.y);

    let [r, g, b] = hexRgb(color, { format: 'array' });

    r = channels.includes('r') ? Math.round(evalSpline(r, xs, ys)) : r;
    g = channels.includes('g') ? Math.round(evalSpline(g, xs, ys)) : g;
    b = channels.includes('b') ? Math.round(evalSpline(b, xs, ys)) : b;

    return '#' + rgbHex(r, g, b);
}

module.exports = {
    rgb: (color, curve) => curveAdjust(color, curve),
    red: (color, curve) => curveAdjust(color, curve, 'r'),
    green: (color, curve) => curveAdjust(color, curve, 'g'),
    blue: (color, curve) => curveAdjust(color, curve, 'b'),
};
