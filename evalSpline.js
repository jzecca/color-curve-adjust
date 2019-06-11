/**
 * Creates a matrix filled with zeroes.
 *
 * @param {number} r  Rows
 * @param {number} c  Columns
 * @returns {number[][]}
 */
const zeroesMatrix = (r, c) => Array(r).fill(0).map(() => Array(c).fill(0));

/**
 * Solves linear equation by Gauss-Jordan elimination.
 * https://en.wikipedia.org/wiki/Gaussian_elimination
 *
 * @param {number[][]} A
 * @returns {number[]}
 */
const gaussJordanSolve = A => {
    const m = A.length;

    for (let k = 0; k < m; k++) {  // columns
        // Pivot for column
        let i_max = 0;
        let vali = Number.NEGATIVE_INFINITY;

        for (let i = k; i < m; i++) {
            if (Math.abs(A[i][k]) > vali) {
                i_max = i;
                vali = Math.abs(A[i][k]);
            }
        }

        // Swap rows k & i_max
        [A[k], A[i_max]] = [A[i_max], A[k]];

        // For all rows below pivot
        for (let i = k + 1; i < m; i++) {
            const cf = (A[i][k] / A[k][k]);

            for (let j = k; j < m + 1; j++) {
                A[i][j] -= A[k][j] * cf;
            }
        }
    }

    const x = [];
    for (let i = m - 1; i >= 0; i--) {  // rows = columns
        const v = A[i][m] / A[i][i];
        x[i] = v;

        for (let j = i - 1; j >= 0; j--) {  // rows
            A[j][m] -= A[j][i] * v;
            A[j][i] = 0;
        }
    }

    return x;
};

/**
 * Generates spline derivatives.
 *
 * @param {number[]} xs  Array of X values
 * @param {number[]} ys  Array of Y values
 * @returns {number[]}
 */
const getNaturalKs = (xs, ys) => {
    const n = xs.length - 1;
    const A = zeroesMatrix(n + 1, n + 2);

    for (let i = 1; i < n; i++) {  // rows
        A[i][i - 1] = 1 / (xs[i] - xs[i - 1]);
        A[i][i]     = 2 * (1 / (xs[i] - xs[i - 1]) + 1 / (xs[i + 1] - xs[i]));
        A[i][i + 1] = 1 / (xs[i + 1] - xs[i]);
        A[i][n + 1] = 3 * ((ys[i] - ys[i - 1]) / ((xs[i] - xs[i - 1]) * (xs[i] - xs[i - 1])) + (ys[i + 1] - ys[i]) / ((xs[i + 1] - xs[i]) * (xs[i + 1] - xs[i])));
    }

    A[0][0]     = 2 / (xs[1] - xs[0]);
    A[0][1]     = 1 / (xs[1] - xs[0]);
    A[0][n + 1] = 3 * (ys[1] - ys[0]) / ((xs[1] - xs[0]) * (xs[1] - xs[0]));

    A[n][n - 1] = 1 / (xs[n] - xs[n - 1]);
    A[n][n]     = 2 / (xs[n] - xs[n - 1]);
    A[n][n + 1] = 3 * (ys[n] - ys[n - 1]) / ((xs[n] - xs[n - 1]) * (xs[n] - xs[n - 1]));

    return gaussJordanSolve(A);
};

/**
 * Interpolates between discrete values using a cubic spline.
 *
 * @param {number}   x   Point to evaluate
 * @param {number[]} xs  Array of X values
 * @param {number[]} ys  Array of Y values
 * @returns {number}
 */
const evalSpline = (x, xs, ys) => {
    let i = 1;
    while (xs[i] < x) {
        i++;
    }

    const ks = getNaturalKs(xs, ys);

    const t = (x - xs[i - 1]) / (xs[i] - xs[i - 1]);
    const a =  ks[i - 1] * (xs[i] - xs[i - 1]) - (ys[i] - ys[i - 1]);
    const b = -ks[i]     * (xs[i] - xs[i - 1]) + (ys[i] - ys[i - 1]);

    return (1 - t) * ys[i - 1] + t * ys[i] + t * (1 - t) * (a * (1 - t) + b * t);
};

module.exports = evalSpline;
