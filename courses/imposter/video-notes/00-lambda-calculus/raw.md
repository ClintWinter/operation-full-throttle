> λ = lambda

 This is a symbol that means "function". Same as in a programming language.

 ```
 λx.x
 ```

 This is a lambda "term", "function", or "expression".

 As stated above, `λ` means function.

 The first `x` is the function argument.

 The `.` is the separator between the argument and the body.

 The second `x` is the function body.

 ```
λ        x .       x
function x returns x
 ```

 Or written in JavaScript:

 ```javascript
(x => x)
 ```

 We can apply a value to this function like this:

 ```
 λx.x (y)
 ```

 This is called **function application**, and it means "substitute all occurences of x in body x with y.

 This is the same as doing this in JavaScript:

 ```javascript
 (x => x)(y) // invoking the anonymous function with the y argument
 ```

 `λx.x` is known as the **identity function** in Lambda Calculus. Because it returns what is passed in (A.K.A: I Combinator).

 ```javascript
 (x => x)(3) // 3
 ```

 There are *no numbers* is lambda calculus, just representations of numbers.

 ```
 λx.y
 ```

 It doesn't matter what is passed to this function, it always returns `y`. This is called the **constant function**.

 There are two types of designations for variables:
 * "Bound" variables (`x` above).
 * "Free" variables (`y` above).

 The variable, `x`, is in the function head as an argument, and, thus, is *bound* to this expression.

 The variable, `y`, is not bound to any function, and, thus, is *free*.

 You can change **bound** variables, but *if and only if* you substitute every occurence of the bound variable. For instance, we can change `x` to `z`. *This would not change the meaning of the function.*

 However, if we wanted to change `y`, we would run into trouble. You cannot change *free* variables.

 ## Substitution and Reduction

When you apply a value to a function, you substitute that value in the function itself. Substitution is **left-applicative**, which means you start from the left and move towards the right as required.

```javascript
let y = 3
let fn = (x => y)(1) // 3
```

You can create lambda functions that handle multiple values as well. You would be tempted to write them like `λxy.t`, but that would be incorrect. Lambda functions have an *arity* of 1, meaning they can only have a *single parameter* per function.

To write this function properly, we would need to apply a concept called **currying**. **Currying** is when we break up a function with multiple parameters into a chain of functions with an arity of 1.

```
λxy.t --> λx.λy.t
```

or

```javascript
((x, y) => x + y) // ❌
(x => y => x + y) // ✅
```

in JavaScript.

> Internal question: Why does `t` mean `x + y` and not `t`? Shouldn't it just be `(x => y => t)`?

My guess: `t` is not some external variable. It's just a representation of a *new* value resulting from whatever operation is performed by the function. One example of that could be the addition of `x` and `y`. (e.g.: `x is 2` and `y is 3`, and when performing the function `x + y` you get `5` which we call `t`)

```
λx.λy.y x
```

I'm totally lost every time they start talking about substitutions and reductions.....

```
λx.λy.y x
λy.y[x:=x]
λy.y
```

Like what does that even mean? There's no explanation on what that syntax means. I need to find a different source.

Here's something that actually helps when thinking about these chained functions. When looking at something like `λx.λy.y` it can help to think about this as a *single* function taking two arguments instead (like reverse currying). So this takes an `x` and a `y` and just returns `y`.

I've got it...

```
1| λx.λy.y x
2| λy.y[x:=x]
3|  λy.y
```

Line 1: This is our original function with x being used for the substitution.

Line 2: When we substitute, we can basically discard the function head of the outer function and make the replacement of the body (similar to algebra). So in the body of the function `λx.λy.y`, which is `λy.y` we replace all `x` variables with `x`: `λy.y[x:=x]`.

Line 3: The result of that substitution is just `λy.y` because nothing actually gets replaced.

Let's look at reduction now:

```
TRUE        ONE         ZERO
((λx.λy.x) (λf.λx.f x)) (λf.λx.x)
```

Reduction is similar to substitution (again very similar to algebra where you replace a variable with another formula in order to solve it).

In the "TRUE" function we have `λx.λy.x`, a 2 argument function that returns the first argument. We are passing it in the lambda function for "ONE". We can replace the body of the "TRUE" function with the "ONE" function where `x` is found.

```
(λy.(λf.λx.f x)) (λf.λx.x)
```

Then we do one more reduction by substituting the "ZERO" function into the body of the `λy...` function. As we can see, there are no `y` variables in the body, so it basically just disappears and we are left with "ONE":

```
(λf.λx.f x)
```

Which makes perfect sense because if you look at the original again, you realize "TRUE" is a function that takes two arguments and always returns the first argument:

```
TRUE        ONE         ZERO
((λx.λy.x) (λf.λx.f x)) (λf.λx.x)
```

Well "TRUE" here is taking two arguments ("ONE" and "ZERO") and "ONE" is the first, so that makes sense that it is the result of the reduction! I'm starting to get this!

```
TRUE: λx.λy.x
```

is the same as (in JavaScript)

```javascript
(x => y => x)
// or
((x, y) => x) // which is way simpler to parse as a human
```

If we used "FALSE"("ONE")("ZERO") instead of "TRUE", the reduction would reduce to "ZERO" instead.

When I first watched [this video](https://www.youtube.com/watch?v=FITJMJjASUs), I was completely lost by the time they got to ~9 minutes in with the TRUE/ONE/ZERO dicussion. Now I understand it. This is amazing. I have not had this feeling in a long time. Like since I first started learning web dev when I wanted to quit. Now here I am forcing myself through this and it is paying off!

### Order of Operations

```
λx.(λy.y x)
```

The parentheses above scope the subtitution to the body of the `λx` function (the `λy` function).

```
λx.(y[y:=x]) // I think the λx in the beginning was the λy?
λx.x // and the λy.y from the first line becomes λx.x?
```

No wait, the substitution is within the parentheses, we keep the outer `λx`, not discard it.

So we have the original `λx`.

Then in `(λy.y x)` we discard the `λy` and replace `y` with `x`, leaving `λx.x`. That's why this line `λx.(y[y:=x])` in the parentheses only has a `y` to the left of the open bracket. The head of the function was discarded. I got it.

Let's run through it again:

```
λx.(λy.y x) // substitute the y with the x in the inner lambda y function
// "λx." stays the same on the left, haven't gotten there yet
λx.(y[y:=x]) // "(y[y:=x])" means "for the body, 'y', replace y with x"
λx.x // the result of replacing y with x
```

Now without the parentheses?

```
λx.λy.y x // substitute the body of λx with x
λy.y[x:=x] // no x's in the body to be replaced
λy.y // the result is just the λx function's original body
```

Watching the video to confirm... boom! exactly right!

## Church Encoding

Symbolic representations of values and operations. Again, no numbers, strings, types, etc. Just functions.

Church encoding is a way to create constructs from functions that represent things we take for granted as programmers today: booleans, branches, conditions, etc.

Let's start with a simple conditional construct (e.g.: `if true then x else y`).

How would you write this using only symbolic functions?

We know what `true` means in Lambda calculus: `λx.λy.x`

True returns the first variable, while false (`λx.λy.y`) returns the second variable.

```javascript
const True = (x => y => x)
const False = (x => y => y)
console.log(True(true)(false)) // true
console.log(False(true)(false)) // false
```

To setup a conditional we need to evaluate three things. Returning the first if true, the second if false.

```
λz.λx.λy.z (x)(y)
```

In JavaScript:

```javascript
const If = (z => x => y => z(x)(y))
console.log(If(True)(true)(false)) // true
console.log(If(False)(true)(false)) // false
```

### Numbers

`λf.λx.x` is zero. `f` is never called and has no value.
`λf.λx.f x` is one. `f` is called once.

First let's set up a calculate function to figure out how many times a function is called:

```javascript
const calculate = f => f(x => x + 1)(0)
```

Let's use Beta Reduction to try and understand zero:

```
λf.λx.x // replace body of λf with substitution
λf.λx.x y
λx.x[x:=y]
λy.y // is identity
```

```javascript
const zero = f => x => x
zero(anyFunc)(0) // = zero; same as false!
```

```
λf.λx.f x // this is one
// is x being passed into λf?
λx.f[f:=x]
λx.x // doesn't seem correct.
```

Okay... So... a space between two variables means *application* of a function.
`(f x)` is the application of the variable `f` to the argument `x` (`f(x)` in javascript).

So looking at the above block, `λf.λx.f x` is a single invocation of `(f x)` in the body of `λx`. So I guess there isn't really a reduction to be done here? I think it can also be written like `λf.λx.(f x)` to be more clear. And two is `λf.λx.f (f x)`, which invokes `f` twice.
