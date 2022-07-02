/**
 * This file is dedicated to experimenting with Lambda Calculus functions in JavaScript.
 * Sometimes examples are the best way to figure something out.
 */

// Let's start with something simple:

// TRUE (creates constant function)
// λx.λy.x
const fnTrue = x => y => x
// console.log(fnTrue(1)(0)) // 1

// FALSE
// λx.λy.y
const fnFalse = x => y => y
// console.log(fnFalse(1)(0)) // 0

// λf.λx.x
const fnZero = f => x => x // ZERO (calls f zero times)
// λf.λx.f x
const fnOne = f => x => f(x) // ONE (calls f once)
// λf.λx.f (f x)
const fnTwo = f => x => f(f(x)) // TWO (calls f twice)
const fnThree = f => x => f(f(f(x))) // TWO (calls f twice)

const add = x => ++x // the one I came up with

// console.log(fnOne(add)(0))
// console.log(fnTwo(add)(0))

const calculate = f => f(x => x + 1)(0) // this one seemed stupid, but mine had to have the 0 passed in every time, while this one handles it itself

const calc = f => f(add)(0)

// console.log(
//     calc(fnZero),
//     calc(fnOne),
//     calc(fnTwo),
//     calc(fnThree),
// )

// const If = b => x => y => b(x)(y)
const If = b => b // Still works?!?

// console.log(
//     If(fnTrue)(true)(false),
//     If(fnFalse)(true)(false),
// )

// so `If = b => b` still works because now instead of invoking inside of `If`, we do it outside.

// I guess the question becomes, "What is the functional difference between the two `If` functions?" "Why even have the `If` function at all instead of using the true/false functions?"
