function safeTraverse<T, K1 extends keyof T>(obj: T | null, paths: [K1]): T[K1];
function safeTraverse<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  obj: T,
  paths: [K1, K2]
): T[K1][K2];
function safeTraverse<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
  obj: T,
  paths: [K1, K2, K3]
): T[K1][K2][K3];
function safeTraverse<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3]
>(obj: T, paths: [K1, K2, K3, K4]): T[K1][K2][K3][K4];
function safeTraverse<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4]
>(obj: T, paths: [K1, K2, K3, K4, K5]): T[K1][K2][K3][K4][K5];
function safeTraverse<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5]
>(obj: T, paths: [K1, K2, K3, K4, K5, K6]): T[K1][K2][K3][K4][K5][K6];
function safeTraverse<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5],
  K7 extends keyof T[K1][K2][K3][K4][K5][K6]
>(obj: T, paths: [K1, K2, K3, K4, K5, K6, K7]): T[K1][K2][K3][K4][K5][K6][K7];
function safeTraverse<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5],
  K7 extends keyof T[K1][K2][K3][K4][K5][K6],
  K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7]
>(obj: T, paths: [K1, K2, K3, K4, K5, K6, K7, K8]): T[K1][K2][K3][K4][K5][K6][K7][K8];
function safeTraverse<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5],
  K7 extends keyof T[K1][K2][K3][K4][K5][K6],
  K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7],
  K9 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8]
>(obj: T, paths: [K1, K2, K3, K4, K5, K6, K7, K8, K9]): T[K1][K2][K3][K4][K5][K6][K7][K8][K9];
function safeTraverse<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5],
  K7 extends keyof T[K1][K2][K3][K4][K5][K6],
  K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7],
  K9 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8],
  K10 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9]
>(
  obj: T,
  paths: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10]
): T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10];
function safeTraverse<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5],
  K7 extends keyof T[K1][K2][K3][K4][K5][K6],
  K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7],
  K9 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8],
  K10 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9],
  K11 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]
>(
  obj: T,
  paths: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11]
): T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11];
function safeTraverse<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5],
  K7 extends keyof T[K1][K2][K3][K4][K5][K6],
  K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7],
  K9 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8],
  K10 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9],
  K11 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10],
  K12 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11]
>(
  obj: T,
  paths: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12]
): T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12];
function safeTraverse<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5],
  K7 extends keyof T[K1][K2][K3][K4][K5][K6],
  K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7],
  K9 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8],
  K10 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9],
  K11 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10],
  K12 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11],
  K13 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12]
>(
  obj: T,
  paths: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12, K13]
): T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13];
function safeTraverse<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5],
  K7 extends keyof T[K1][K2][K3][K4][K5][K6],
  K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7],
  K9 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8],
  K10 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9],
  K11 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10],
  K12 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11],
  K13 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12],
  K14 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13]
>(
  obj: T,
  paths: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12, K13, K14]
): T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14];
function safeTraverse<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5],
  K7 extends keyof T[K1][K2][K3][K4][K5][K6],
  K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7],
  K9 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8],
  K10 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9],
  K11 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10],
  K12 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11],
  K13 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12],
  K14 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13],
  K15 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14]
>(
  obj: T,
  paths: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12, K13, K14, K15]
): T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15];
function safeTraverse<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5],
  K7 extends keyof T[K1][K2][K3][K4][K5][K6],
  K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7],
  K9 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8],
  K10 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9],
  K11 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10],
  K12 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11],
  K13 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12],
  K14 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13],
  K15 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14],
  K16 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15]
>(
  obj: T,
  paths: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12, K13, K14, K15, K16]
): T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15][K16];
function safeTraverse<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5],
  K7 extends keyof T[K1][K2][K3][K4][K5][K6],
  K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7],
  K9 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8],
  K10 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9],
  K11 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10],
  K12 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11],
  K13 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12],
  K14 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13],
  K15 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14],
  K16 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15],
  K17 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15][K16]
>(
  obj: T,
  paths: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12, K13, K14, K15, K16, K17]
): T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15][K16][K17];
function safeTraverse<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5],
  K7 extends keyof T[K1][K2][K3][K4][K5][K6],
  K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7],
  K9 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8],
  K10 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9],
  K11 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10],
  K12 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11],
  K13 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12],
  K14 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13],
  K15 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14],
  K16 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15],
  K17 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15][K16],
  K18 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15][K16][K17]
>(
  obj: T,
  paths: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12, K13, K14, K15, K16, K17, K18]
): T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15][K16][K17][K18];
function safeTraverse<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5],
  K7 extends keyof T[K1][K2][K3][K4][K5][K6],
  K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7],
  K9 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8],
  K10 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9],
  K11 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10],
  K12 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11],
  K13 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12],
  K14 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13],
  K15 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14],
  K16 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15],
  K17 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15][K16],
  K18 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15][K16][K17],
  K19 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15][K16][K17][K18]
>(
  obj: T,
  paths: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12, K13, K14, K15, K16, K17, K18, K19]
): T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15][K16][K17][K18][K19];
function safeTraverse<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5],
  K7 extends keyof T[K1][K2][K3][K4][K5][K6],
  K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7],
  K9 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8],
  K10 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9],
  K11 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10],
  K12 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11],
  K13 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12],
  K14 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13],
  K15 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14],
  K16 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15],
  K17 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15][K16],
  K18 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15][K16][K17],
  K19 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15][K16][K17][K18],
  K20 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15][K16][K17][K18][K19]
>(
  obj: T,
  paths: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12, K13, K14, K15, K16, K17, K18, K19, K20]
): T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10][K11][K12][K13][K14][K15][K16][K17][K18][K19][K20];

function safeTraverse(obj: any, paths: any[] = []): any {
  let val = obj;
  let idx = 0;

  while (idx < paths.length) {
    if (!val) {
      return null;
    }
    val = val[paths[idx]];
    idx++;
  }
  return val;
}

export default safeTraverse;
