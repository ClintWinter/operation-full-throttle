import * as numbers from './numbers.js'
import { to_boolean } from './helpers.js'

// original
Array.from(Array(100).keys()).map(v => v+1).map(n => {
    if (n % 15 === 0) {
        return 'FizzBuzz'
    } else if (n % 5 === 0) {
        return 'Buzz'
    } else if  (n % 3 === 0) {
        return 'Fizz'
    } else {
        return String(n);
    }
})

// booleans/conditionals
const TRUE = x => y => x
const FALSE = x => y => y
const IF = b => b

console.log(IF(TRUE)(true)(false)) // true
console.log(IF(FALSE)(true)(false)) // false

/*
Array.from(Array(100).keys()).map(v => v+1).map(n => {
    return (
        IF(n % 15 === 0)(
            'FizzBuzz'
        )(IF(n % 5 === 0)(
            'Buzz'
        )(IF(n % 3 === 0)(
            'Fizz'
        )(
            String(n)
        )))
    )
})
*/

const IS_ZERO = n => n(x => FALSE)(TRUE)

console.log(
    to_boolean(IS_ZERO(numbers.ZERO)), // true
    to_boolean(IS_ZERO(numbers.ONE)), // false
)

/*
Array.from(Array(100).keys()).map(v => v+1).map(n => {
    return (
        IF(IS_ZERO(n % 15))(
            'FizzBuzz'
        )(IF(IS_ZERO(n % 5))(
            'Buzz'
        )(IF(IS_ZERO(n % 3))(
            'Fizz'
        )(
            String(n)
        )))
    )
})
*/

// INCREMENT(ONE)(FN)(X) = TWO
// call the number like normal NUM(FN)(X), but wrap it in its own FN one more time.
const INCREMENT = n => f => x => f(n(f)(x))
console.log(INCREMENT(numbers.ONE)(x => x + 1)(0))

// DECREMENT(ONE)(FN)(X) = ZERO
const DECREMENT = n => f => x => n(g=>h=>h(g(f))) (y=>x) (y=>y)

// reductions
console.log(numbers.ONE(g=>h=>h(g(z=>z+1))) (y=>0) (y=>y)) // 0

// f => x => f(x)

x=>(g=>h=>h(g(z=>z+1)))(x)

console.log((x=>(g=>h=>h(g(z=>z+1)))(x)) (y=>0) (y=>y)) // =

console.log((x=>h=>h(x(z=>z+1))) (y=>0) (y=>y)) // right 0

console.log((h=>h((y=>0)(z=>z+1))) (y=>y)) // 0

console.log((y=>y)((y=>0)(z=>z+1))) // 0

console.log((y=>y)(0)) // 0




console.log(DECREMENT(numbers.ONE)(x => x + 1)(0))
