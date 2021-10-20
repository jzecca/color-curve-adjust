import evalSpline from './evalSpline';

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
