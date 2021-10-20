import curveAdjust from './index';

describe('curveAdjust', () => {
    const curve = [
        { x: 0, y: 85 },
        { x: 50, y: 120 },
        { x: 140, y: 200 },
        { x: 190, y: 225 },
        { x: 255, y: 255 },
    ];

    test('red', () => {
        expect(curveAdjust('#5a2149', curve, 'r')).toBe('#9d2149');
        expect(curveAdjust('#040700', curve, 'r')).toBe('#580700');
        expect(curveAdjust('#ead184', curve, 'r')).toBe('#f5d184');
        expect(curveAdjust('#9c6d02', curve, 'r')).toBe('#d26d02');
        expect(curveAdjust('#6e921b', curve, 'r')).toBe('#b0921b');
    });

    test('green', () => {
        expect(curveAdjust('#5a2149', curve, 'g')).toBe('#5a6b49');
        expect(curveAdjust('#040700', curve, 'g')).toBe('#045900');
        expect(curveAdjust('#ead184', curve, 'g')).toBe('#eae984');
        expect(curveAdjust('#9c6d02', curve, 'g')).toBe('#9caf02');
        expect(curveAdjust('#6e921b', curve, 'g')).toBe('#6ecc1b');
    });

    test('blue', () => {
        expect(curveAdjust('#5a2149', curve, 'b')).toBe('#5a218d');
        expect(curveAdjust('#040700', curve, 'b')).toBe('#040755');
        expect(curveAdjust('#ead184', curve, 'b')).toBe('#ead1c2');
        expect(curveAdjust('#9c6d02', curve, 'b')).toBe('#9c6d56');
        expect(curveAdjust('#6e921b', curve, 'b')).toBe('#6e9267');
    });

    test('red + green', () => {
        expect(curveAdjust('#5a2149', curve, 'rg')).toBe('#9d6b49');
        expect(curveAdjust('#040700', curve, 'rg')).toBe('#585900');
        expect(curveAdjust('#ead184', curve, 'rg')).toBe('#f5e984');
        expect(curveAdjust('#9c6d02', curve, 'rg')).toBe('#d2af02');
        expect(curveAdjust('#6e921b', curve, 'rg')).toBe('#b0cc1b');
    });

    test('green + blue', () => {
        expect(curveAdjust('#5a2149', curve, 'gb')).toBe('#5a6b8d');
        expect(curveAdjust('#040700', curve, 'gb')).toBe('#045955');
        expect(curveAdjust('#ead184', curve, 'gb')).toBe('#eae9c2');
        expect(curveAdjust('#9c6d02', curve, 'gb')).toBe('#9caf56');
        expect(curveAdjust('#6e921b', curve, 'gb')).toBe('#6ecc67');
    });

    test('red + blue', () => {
        expect(curveAdjust('#5a2149', curve, 'rb')).toBe('#9d218d');
        expect(curveAdjust('#040700', curve, 'rb')).toBe('#580755');
        expect(curveAdjust('#ead184', curve, 'rb')).toBe('#f5d1c2');
        expect(curveAdjust('#9c6d02', curve, 'rb')).toBe('#d26d56');
        expect(curveAdjust('#6e921b', curve, 'rb')).toBe('#b09267');
    });

    test('red + blue + green', () => {
        expect(curveAdjust('#5a2149', curve, 'rgb')).toBe('#9d6b8d');
        expect(curveAdjust('#040700', curve, 'rgb')).toBe('#585955');
        expect(curveAdjust('#ead184', curve, 'rgb')).toBe('#f5e9c2');
        expect(curveAdjust('#9c6d02', curve, 'rgb')).toBe('#d2af56');
        expect(curveAdjust('#6e921b', curve, 'rgb')).toBe('#b0cc67');
    });

    test('red + blue + green (default)', () => {
        expect(curveAdjust('#5a2149', curve)).toBe('#9d6b8d');
        expect(curveAdjust('#040700', curve)).toBe('#585955');
        expect(curveAdjust('#ead184', curve)).toBe('#f5e9c2');
        expect(curveAdjust('#9c6d02', curve)).toBe('#d2af56');
        expect(curveAdjust('#6e921b', curve)).toBe('#b0cc67');
    });
});
