const evalSpline = require('./evalSpline');
const curveAdjust = require('./');

describe('evalSpline', () => {
    const xs = [0, 50, 140, 190, 255];
    const ys = [85, 120, 200, 225, 255];

    test('curve knots', () => {
        expect(evalSpline(0, xs, ys)).toBe(85);
        expect(evalSpline(50, xs, ys)).toBe(120);
        expect(evalSpline(140, xs, ys)).toBe(200);
        expect(evalSpline(190, xs, ys)).toBe(225);
        expect(evalSpline(255, xs, ys)).toBe(255);
    });

    test('interpolations', () => {
        expect(evalSpline(33, xs, ys)).toBeCloseTo(106.921);
        expect(evalSpline(90, xs, ys)).toBeCloseTo(156.926);
        expect(evalSpline(156, xs, ys)).toBeCloseTo(209.512);
        expect(evalSpline(234, xs, ys)).toBeCloseTo(245.023);
    });
});

describe('curveAdjust', () => {
    const curve = [
        { x: 0, y: 85 },
        { x: 50, y: 120 },
        { x: 140, y: 200 },
        { x: 190, y: 225 },
        { x: 255, y: 255 },
    ];

    test('rgb', () => {
        expect(curveAdjust.rgb('#5a2149', curve)).toBe('#9d6b8d');
        expect(curveAdjust.rgb('#040700', curve)).toBe('#585955');
        expect(curveAdjust.rgb('#ead184', curve)).toBe('#f5e9c2');
        expect(curveAdjust.rgb('#9c6d02', curve)).toBe('#d2af56');
        expect(curveAdjust.rgb('#6e921b', curve)).toBe('#b0cc67');
    });

    test('red', () => {
        expect(curveAdjust.red('#5a2149', curve)).toBe('#9d2149');
        expect(curveAdjust.red('#040700', curve)).toBe('#580700');
        expect(curveAdjust.red('#ead184', curve)).toBe('#f5d184');
        expect(curveAdjust.red('#9c6d02', curve)).toBe('#d26d02');
        expect(curveAdjust.red('#6e921b', curve)).toBe('#b0921b');
    });

    test('green', () => {
        expect(curveAdjust.green('#5a2149', curve)).toBe('#5a6b49');
        expect(curveAdjust.green('#040700', curve)).toBe('#045900');
        expect(curveAdjust.green('#ead184', curve)).toBe('#eae984');
        expect(curveAdjust.green('#9c6d02', curve)).toBe('#9caf02');
        expect(curveAdjust.green('#6e921b', curve)).toBe('#6ecc1b');
    });

    test('blue', () => {
        expect(curveAdjust.blue('#5a2149', curve)).toBe('#5a218d');
        expect(curveAdjust.blue('#040700', curve)).toBe('#040755');
        expect(curveAdjust.blue('#ead184', curve)).toBe('#ead1c2');
        expect(curveAdjust.blue('#9c6d02', curve)).toBe('#9c6d56');
        expect(curveAdjust.blue('#6e921b', curve)).toBe('#6e9267');
    });
});
