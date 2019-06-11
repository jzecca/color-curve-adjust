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

    test.todo('hex');
// test('curveAdjust', () => {
//     expect(curveAdjust('#5a2149', curve)).toBe('#9d6b8d');
//     expect(curveAdjust('#040700', curve)).toBe('#585955');
//     expect(curveAdjust('#ead184', curve)).toBe('#f5e9c2');
//     expect(curveAdjust('#9c6d02', curve)).toBe('#d2af56');
//     expect(curveAdjust('#6e921b', curve)).toBe('#b0cc67');
// });
});
