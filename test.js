const curveAdjust = require('./');

test('adjust', () => {
    const curve = [
        { x: 0, y: 85 },
        { x: 50, y: 120 },
        { x: 140, y: 200 },
        { x: 190, y: 225 },
        { x: 255, y: 255 },
    ];

    expect(curveAdjust('#5a2149', curve)).toBe('#9d6b8d');
    expect(curveAdjust('#040700', curve)).toBe('#585955');
    expect(curveAdjust('#ead184', curve)).toBe('#f5e9c2');
    expect(curveAdjust('#9c6d02', curve)).toBe('#d2af56');
    expect(curveAdjust('#6e921b', curve)).toBe('#b0cc67');
});
