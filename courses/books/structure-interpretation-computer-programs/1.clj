; Chapter 1 in Structure and Interpretation of Computer Programs

; ---------------------------------------
; Exercise 1.3:
; Define a procedure that takes three numbers as arguments and returns
; the sum of the squares of the two larger numbers.

(defn square [x] (* x x))

(square 3)

(defn big-sum [x y z]
	(map square (take 2 (sort > [x y z]))))

; alternate implementation
(defn big-sum [x y z]
	(->> [x y z]
		(sort >)
		(take 2)
		(map square)
		(apply +)))

(big-sum 3 3 1)

; ---------------------------------------
; Exercise 1.5:
; The following code tests the interpreter to determine whether it is
; using applicative-order evaluation or normal-order evaluation:

(defn p [] (p))

(defn test [x y] (if (= x 0) 0 y))

(test 0 (p))

; What behavior will be observed with the different interpreter types? Explain.
;
; My answer:
; Applicative-order (evalution first) - The `(p)` will attempt to be evaluated first.
; This will result in an infinite loop, fill up the stack, and cause a stack overflow.
; - CORRECT
;
; Normal-order (expansion) - The p evaluates to itself, resulting in ... hmmm ... perhaps
; a maximum heap exception? Does it keep storing itself and runs out of memory?
; - INCORRECT
;
; The expansion process expands

(test 0 (p))

; into

(if (= 0 0) 0 (p))

; which, because the if predicate is true, returns the consequent case:

0

; --------------------------------------- 
; Exercise 1.6:
; Person doesn't understand the need for special form "if". Claims can
; re-write it themselves using `cond`. Defines it like so:
(defn new-if [predicate consequent alternate]
	(cond (predicate consequent)
		  (alternate)))

; Demonstration
(new-if (= 2 3) 0 5) ; 5
(new-if (= 1 1) 0 5) ; 0

; Uses in this situation:

(defn improve [guess x]
	(average guess (/ x guess)))

(defn average [x y]
	(/ (+ x y) 2))

(defn good-enough? [guess x]
	(< (abs (- (square guess) x)) 0.0001))

(defn sqrt-iter [guess x]
	(new-if (good-enough? guess x)
			guess
			(sqrt-iter (improve guess x)
					   x)))

(sqrt-iter 1 4)

; What happens?
; My answer:
; I thought I knew, but now I'm unsure...
; Perhaps the "if" special form delays expansion or evaluation until reached, while a normal procedure gets
; expanded/evaluated first? Then maybe the recursive sqrt-iter procedure turns into a maximum heap or something.
; - CORRECT!
; That's actually exactly what happens, and what makes a special form true to its name.

(defn square [x] (* x x))

(defn improve [guess x]
	(average guess (/ x guess)))

(defn average [x y]
	(float (/ (+ x y) 2)))

(defn good-enough? [guess x]
	(< (abs (- (square guess) x)) 0.0001))

(defn sqrt-iter [guess x]
	(if (good-enough? guess x)
			guess
			(sqrt-iter (improve guess x)
					   x)))

(sqrt-iter 1 0.00005)
