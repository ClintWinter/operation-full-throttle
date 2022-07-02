const AsciiTable = require('ascii-table')

const truthTable = (op, fn) => {
    const tbl = new AsciiTable(`${op}`)

    tbl.setHeading('X', 'Y', 'Out')
        .addRow(0, 0, fn(0, 0))
        .addRow(0, 1, fn(0, 1))
        .addRow(1, 0, fn(1, 0))
        .addRow(1, 1, fn(1, 1))

    console.log(tbl.toString())
}

// primary operations
const and = (x, y) => x && y ? 1 : 0 // AND: true when both arguments are true
const or = (x, y) => x || y ? 1 : 0 // OR: true when one argument is true
const not = x => x ? 0 : 1 // NOT: the opposite of the argument

// secondary operations
const xor = (x, y) => x !== y ? 1 : 0 // XOR: true when x and y are not equal
const equiv = (x, y) => x === y ? 1 : 0 // Equivalence: true when x and y are equal
const imp = (x, y) => x === 1 ? y : 1 // Implication: If x is true, return y, else return true

// complementary (opposite) operations
// XNOR: true if x and y are equal: 1001 (opposite of XOR, same as EQUIV)
// NEQUIV: true if x and y are not equal: 0110 (opposite of EQUIV, same as XOR)
// NOR: false if either x or y are true: 1000
// NAND: false if both x and y are true: 1110

// The "Out" results make up the "Binary Signature"
truthTable('AND', and) // 0001
truthTable('OR', or) // 0111
truthTable('XOR', xor) // 0110
truthTable('EQUIV', equiv) // 1001
truthTable('IMP', imp) // 1101
