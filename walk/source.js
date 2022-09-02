const a = 0, b = 1;
if (true) {
    const c = '123';
}
function fn1() {
    const d = 1
}
const e = 3

/**
 // =======output=======
 // a
 // b
 // c
 // fn1 => d
 // e
 // =====================
 */
