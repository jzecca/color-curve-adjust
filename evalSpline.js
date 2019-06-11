/**
 * Forked from https://github.com/kuckir/CSPL.js
 * http://blog.ivank.net/interpolation-with-cubic-splines.html
 */

_gaussJ = {};

_gaussJ.solve = (A, x) => {  // in Matrix, out solutions
    const m = A.length;
    for(let k=0; k<m; k++)  // column
    {
        // pivot for column
        let i_max = 0;
        let vali = Number.NEGATIVE_INFINITY;

        for(let i=k; i<m; i++) {
            if(Math.abs(A[i][k])>vali) {
                i_max = i;
                vali = Math.abs(A[i][k]);
            }
        }
        _gaussJ.swapRows(A, k, i_max);

        // for all rows below pivot
        for(let i=k+1; i<m; i++) {
            const cf = (A[i][k] / A[k][k]);
            for(let j=k; j<m+1; j++) {
                A[i][j] -= A[k][j] * cf;
            }
        }
    }

    for(let i=m-1; i>=0; i--)  // rows = columns
    {
        const v = A[i][m] / A[i][i];
        x[i] = v;

        for(let j=i-1; j>=0; j--) {  // rows
            A[j][m] -= A[j][i] * v;
            A[j][i] = 0;
        }
    }
};

_gaussJ.zerosMat = (r,c) => {
    const A = [];
    for(let i=0; i<r; i++) {
        A.push([]);
        for(let j=0; j<c; j++) {
            A[i].push(0);
        }
    }

    return A;
};

_gaussJ.swapRows = (m, k, l) => {
    const p = m[k];
    m[k] = m[l];
    m[l] = p;
};


const getNaturalKs = (xs, ys, ks) => {	// in x values, in y values, out k values
    const n = xs.length-1;
    const A = _gaussJ.zerosMat(n+1, n+2);

    for(let i=1; i<n; i++)	// rows
    {
        A[i][i-1] = 1/(xs[i] - xs[i-1]);

        A[i][i  ] = 2 * (1/(xs[i] - xs[i-1]) + 1/(xs[i+1] - xs[i])) ;

        A[i][i+1] = 1/(xs[i+1] - xs[i]);

        A[i][n+1] = 3*( (ys[i]-ys[i-1])/((xs[i] - xs[i-1])*(xs[i] - xs[i-1]))  +  (ys[i+1]-ys[i])/ ((xs[i+1] - xs[i])*(xs[i+1] - xs[i])) );
    }

    A[0][0  ] = 2/(xs[1] - xs[0]);
    A[0][1  ] = 1/(xs[1] - xs[0]);
    A[0][n+1] = 3 * (ys[1] - ys[0]) / ((xs[1]-xs[0])*(xs[1]-xs[0]));

    A[n][n-1] = 1/(xs[n] - xs[n-1]);
    A[n][n  ] = 2/(xs[n] - xs[n-1]);
    A[n][n+1] = 3 * (ys[n] - ys[n-1]) / ((xs[n]-xs[n-1])*(xs[n]-xs[n-1]));

    _gaussJ.solve(A, ks);
};

module.exports = evalSpline = (x, xs, ys) => {
    let ks = [];
    getNaturalKs(xs, ys, ks);

    let i = 1;
    while(xs[i] < x) {
        i++;
    }

    const t = (x - xs[i-1]) / (xs[i] - xs[i-1]);

    const a =  ks[i-1]*(xs[i]-xs[i-1]) - (ys[i]-ys[i-1]);
    const b = -ks[i  ]*(xs[i]-xs[i-1]) + (ys[i]-ys[i-1]);

    return (1-t)*ys[i-1] + t*ys[i] + t*(1-t)*(a*(1-t)+b*t);
};
