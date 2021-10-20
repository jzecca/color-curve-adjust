import hexRgb from 'hex-rgb';
import rgbHex from 'rgb-hex';
import evalSpline from './evalSpline';

export type Curve = {
    x: number;
    y: number;
}[];

export type Channels =
    | 'r'
    | 'g'
    | 'b'
    | 'rg'
    | 'gb'
    | 'rb'
    | 'rgb'
;

export default function curveAdjust(color: string, curve: Curve, channels: Channels = 'rgb'): string {
    const xs = curve.map(knot => knot.x);
    const ys = curve.map(knot => knot.y);

    let [r, g, b] = hexRgb(color, { format: 'array' });

    r = channels.includes('r') ? Math.round(evalSpline(r, xs, ys)) : r;
    g = channels.includes('g') ? Math.round(evalSpline(g, xs, ys)) : g;
    b = channels.includes('b') ? Math.round(evalSpline(b, xs, ys)) : b;

    return '#' + rgbHex(r, g, b);
}
