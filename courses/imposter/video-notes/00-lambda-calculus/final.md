# Lambda Calculus for Beginners

The goal of this write-up is to explain lambda calculus as simply as I can. It took a lot of effort for me to get a handle on it. It also required a number of sources in order to put the pieces together. My goal is to take what I've acquired and put my own spin on it to make it easier for you.

## What is lambda calculus?

There are already plenty of well-written pieces about the history of it, so you should read those instead. Just know that it was developed by a guy named Alonzo Church who was trying to develop a way to capture computation before computers even existed (which I don't even understand how that's possible).

And that is exactly what it is--a contextless language for expressing computation. The language is entirely comprised of **functions**. Very similar to the functions you know and love from any programming language. They accept an argument and return a variable.

## The very basics

Let's look at the simplest of lambda functions (a.k.a.: **terms** or **expressions**):

```
λx.x
```

The syntax of the above statement can be understood as "a function (`λ`) accepts an argument `x` and returns a variable `x`". The `.` in the expression is the separator between the **head** of the function and the **body** of the function.

To relate this to something you already know, let's write the same function in JavaScript.

```
function (x) {
    return x;
}
```

Using arrow syntax, it would look like this:

```javascript
x => x
```

## The rules

There are rules for lambda calculus that you should be made aware of before we continue.
* First, all functions are *anonymous*. That means functions cannot by used by reference.
* Second, functions can only accept a single argument. A function with multiple arguments be **curried**. **Currying** is when a function with multiple arguments is refactored into nested functions with single arguments.

```javascript
// before currying
(x, y, z) => x(y)(z)

// after currying
x => y => z => x(y)(z)
```

Lambda calculus is all about building lambda terms and performing reductions on them. In other words, there are three structures to understand (I kinda stole this from wikipedia):

| Syntax | Name | Description |
| --- | --- | --- |
| `X` | a variable | A character or string representing a parameter or value. |
| `λx.y` | abstraction | A function definition. `f(x) = y` |
| `(x y)` | application | What you would think of as *invoking* or *calling* of a function. Calling the function `x` with the parameter `y`. `x(y)` is another syntax that would look more familiar. |

We can use these structures to create all kinds of lambda expressions.

## β-reduction

β-reduction (beta reduction) is all about the *application* of functions through *substitution*. You'll often see the terms reduction and substitution used in a way that makes them seem like different concepts. Technically, they are, but you can think of it like "Reduction is performed by applying substitution to the expression". Reduction is the conceptual definition, while substitution is the tangible action and application.

Let's look at some examples.

```
(λx.x y)
```

The parentheses are optional, but I like them to make the syntax clear. The term on the left side of the parentheses (`λx.x`) is the function, and the term on the right side of the parentheses (`y`) is the






Let's look at some more lambda expressions:

`λx.x` - This is known as the *identity function* or the *I Combinator*. The name comes from the fact that the output of this function is the same as its input. (e.g.: `(x => x)(1)` is 1)

`λx.y` - This is known as the *constant function* or the *KI Combinator*.
