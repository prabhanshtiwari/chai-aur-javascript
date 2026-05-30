
# JavaScript Interview Notes: `var`, `let`, and `const`

> 🎯 These questions are typically asked **at the beginning of interviews** and decide how the interview will go forward. A weak answer here can drastically change the interviewer's evaluation of your JS knowledge.

---

## 1. Introduction & History

| Keyword | Introduced In | Purpose |
|--------|--------------|---------|
| `var`  | Since JS was created | Original way to declare variables |
| `let`  | ES6 (2015) | Introduced to overcome `var` limitations |
| `const`| ES6 (2015) | Introduced to overcome `var` limitations |

---

## 2. Scope

> **Scope** = A certain region of a program where a defined variable exists, can be recognized, and beyond that it cannot be recognized.

### Types of Scope

```javascript
// GLOBAL SCOPE — outside any block or function
var globalVar = "I'm global";

// FUNCTION SCOPE
function myFunc() {
  var funcVar = "I'm inside a function"; // function scope
}

// BLOCK SCOPE
{
  let blockVar = "I'm inside a block"; // block scope
}
```

### `var` → Function Scoped

`var` is accessible **outside the block** it was declared in (but not outside the function).

```javascript
{
  var a = 5;
}
console.log(a); // ✅ Output: 5 — var leaks out of the block
```

### `let` and `const` → Block Scoped

`let` and `const` are **NOT** accessible outside the block they were declared in.

```javascript
{
  let a = 5;
}
console.log(a); // ❌ ReferenceError: a is not defined
```

```javascript
{
  const a = 5;
}
console.log(a); // ❌ ReferenceError: a is not defined
```

```javascript
// Accessing them INSIDE the block works fine
{
  let a = 5;
  console.log(a); // ✅ Output: 5
}
```

---

## 3. Variable Shadowing

> **Variable Shadowing** = When a variable declared inside a block has the same name as a variable in an outer scope, it "shadows" (overlaps) the outer variable — but only inside that block.

```javascript
let a = "hello";

{
  let a = "hi";     // this 'a' shadows the outer 'a'
  console.log(a);   // ✅ Output: "hi"
}

console.log(a);     // ✅ Output: "hello" — outer 'a' is unchanged
```

### ⚠️ Illegal Shadowing

> You **CAN** shadow a `var` variable with `let`, but you **CANNOT** shadow a `let` variable with `var`. The latter is called **Illegal Shadowing**.

```javascript
// ✅ LEGAL — shadowing var with let
var b = "outer";
{
  let b = "inner"; // perfectly fine
}

// ❌ ILLEGAL — shadowing let with var
let b = "outer";
{
  var b = "inner"; // SyntaxError: Identifier 'b' has already been declared
}
```

**Why?** Because `var` does not respect block boundaries — it tries to hoist itself into the enclosing function/global scope, where `b` (as `let`) already exists. This creates a conflict.

---

## 4. Declaration (Re-declaration)

| Keyword | Can be Re-declared? |
|--------|---------------------|
| `var`  | ✅ Yes |
| `let`  | ❌ No |
| `const`| ❌ No |

```javascript
// ✅ var — re-declaration is fine
var a = 1;
var a = 2; // No error

// ❌ let — cannot re-declare
let a = 1;
let a = 2; // SyntaxError: Identifier 'a' has already been declared

// ❌ const — cannot re-declare
const a = 1;
const a = 2; // SyntaxError: Identifier 'a' has already been declared
```

> **Note:** Re-declaration in a **different block** (shadowing) is allowed for `let` and `const`.

```javascript
let a = "outer";
{
  let a = "inner"; // ✅ This is shadowing, not re-declaration — allowed
}
```

---

## 5. Declaration Without Initialization

| Keyword | Can be declared without a value? |
|--------|----------------------------------|
| `var`  | ✅ Yes (value is `undefined`) |
| `let`  | ✅ Yes (value is `undefined`) |
| `const`| ❌ No — **must be initialized at declaration** |

```javascript
var a;   // ✅ fine, a = undefined
let b;   // ✅ fine, b = undefined

const c; // ❌ SyntaxError: Missing initializer in const declaration
const c = 10; // ✅ must give a value right away
```

---

## 6. Re-initialization (Updating Values)

| Keyword | Can be updated/re-assigned? |
|--------|----------------------------|
| `var`  | ✅ Yes |
| `let`  | ✅ Yes |
| `const`| ❌ No |

```javascript
var a = 5;
a = 6; // ✅ fine

let b = 5;
b = 6; // ✅ fine

const c = 5;
c = 6; // ❌ TypeError: Assignment to constant variable
```

---

## 7. Hoisting (Very Important — 95% of JS Interviews!)

### How JavaScript Execution Context Works

Before understanding hoisting, you must understand the **two phases** of JS execution:

#### Phase 1: Creation Phase
Three things happen:
1. A **global/window object** is created
2. A **memory heap** is set up — all variables and function declarations are stored in the window object
3. Variables are initialized with `undefined`; complete function declarations are stored as-is

#### Phase 2: Execution Phase
- JS engine executes code **line by line**
- Assigns actual values to variables
- Executes function calls
- A new execution context is created for every function call

---

### What is Hoisting?

> During the **creation phase**, JavaScript moves variable and function **declarations** to the top of the code. This is called **Hoisting**.

### `var` Hoisting

```javascript
console.log(count); // ✅ Output: undefined (no error!)
var count = 5;
```

JavaScript internally sees this as:

```javascript
var count;           // declaration hoisted to top
console.log(count);  // undefined
count = 5;           // assignment stays in place
```

### `let` and `const` Hoisting — Temporal Dead Zone (TDZ)

```javascript
console.log(count); // ❌ ReferenceError: Cannot access 'count' before initialization
let count = 5;
```

> **Are `let` and `const` hoisted?** YES — but they are hoisted into the **Temporal Dead Zone (TDZ)**, not initialized to `undefined` like `var`.

---

### Temporal Dead Zone (TDZ)

> **TDZ** = The time between the **hoisting** (start of scope) and the actual **declaration/initialization** of a `let` or `const` variable.

During TDZ, the variable exists in memory (you can see it in browser DevTools under the `Script` scope), but it **cannot be accessed**. Trying to access it gives:

```
ReferenceError: Cannot access 'x' before initialization
```

```javascript
// TDZ starts here for 'b' and 'c'

console.log(b); // ❌ ReferenceError — b is in TDZ
console.log(c); // ❌ ReferenceError — c is in TDZ

let b = 10;    // TDZ ends for b
const c = 20;  // TDZ ends for c
```

In browser DevTools (Sources → Breakpoint), you'll see:
- `var` variables appear in the **Global** scope as `undefined`
- `let`/`const` variables appear under the **Script** scope, marked as being in the **Temporal Dead Zone**

---

### Classic Interview Hoisting Question

**Question 1:**

```javascript
function abc() {
  console.log(a); // What is the output?
  var a = 10;
}
abc();
```

**Answer:** `undefined`

Because `var a` is hoisted to the top of the function, but its value (`10`) hasn't been assigned yet.

---

**Question 2 (Extended):**

```javascript
function abc() {
  console.log(a); // ?
  console.log(b); // ?
  console.log(c); // ?

  var a = 10;
  let b = 20;
  const c = 30;
}
abc();
```

**Answer:**
- `a` → `undefined` (var is hoisted and initialized to `undefined`)
- `b` → ❌ `ReferenceError: Cannot access 'b' before initialization` (let is in TDZ)
- `c` → ❌ `ReferenceError: Cannot access 'c' before initialization` (const is in TDZ)

> The code **stops at `b`** because it throws a ReferenceError. `c` is never reached.

---

## 8. Quick Summary Table

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| Scope | Function | Block | Block |
| Re-declaration | ✅ Yes | ❌ No | ❌ No |
| Declare without init | ✅ Yes | ✅ Yes | ❌ No |
| Re-assignment | ✅ Yes | ✅ Yes | ❌ No |
| Hoisting | ✅ Yes (→ `undefined`) | ✅ Yes (→ TDZ) | ✅ Yes (→ TDZ) |
| Attached to `window` | ✅ Yes | ❌ No | ❌ No |

---

## 9. Common Interview Questions & Answers

**Q: What is the Temporal Dead Zone?**
> TDZ is the term to describe the state where `let`/`const` variables are in scope but have not yet been declared/initialized. Accessing them during this period throws a `ReferenceError`.

**Q: Are `let` and `const` hoisted?**
> Yes, they are hoisted but placed in the Temporal Dead Zone, unlike `var` which is hoisted and initialized to `undefined`.

**Q: What is illegal shadowing?**
> Trying to shadow a `let` variable using `var` inside a block is illegal shadowing. It throws a `SyntaxError: Identifier has already been declared`, because `var` ignores block scope and conflicts with the outer `let`.

**Q: Why use `let`/`const` over `var`?**
> `let` and `const` are block-scoped (safer, less error-prone), cannot be re-declared (avoids accidental overwrites), and give a `ReferenceError` instead of silently returning `undefined` when accessed before declaration — making bugs easier to catch.

**Q: What's the difference between `let` and `const`?**
> Both are block-scoped and go into TDZ when hoisted. The key difference: `const` **must** be initialized at declaration and **cannot** be re-assigned afterwards. `let` can be declared without a value and can be updated.


<!-- Transcript:
```
where let and const three ways we can
declare variables in javascript and
there can be a ton of questions that can
be made on this topic when it comes to
interview so where existed in javascript
pretty much ever since it was created
and lit and const were introduced in es6
version of javascript to overcome some
of the limitations of wear so when i was
preparing for this video i had a
conversation with few interviewers and
they all told me that these type of
questions are generally asked at the
beginning of the interview and they
decide how the interview will go forward
so let's say if the candidate failed to
answer this question this can change the
flow of interview drastically the
interviewer can evaluate your javascript
knowledge based on these questions so in
this video i'll try to cover most types
of questions that can be made on this
topic so the first type of question that
can be asked is on scope so i've opened
html css and javascript files over here
and when i run this
yep
so let's get back to our javascript file
so first of all what is this thing
called scope so a scope is a certain
region of a program where a defined
variable exists and can be recognized
and beyond that it cannot be recognized
so there can be multiple types of scopes
for example global scope block scope
functional scope so for example we are
over here without any blocks or
functions so this is our global scope if
i create a function over here
this is our function scope
and if we create any other block over
here this will be our block scope so
when we talk about where so if i write
where
a
equals five
so this is in its global scope so it can
be accessed anywhere over here so if i
say console log a
if we go to browser yup you see five
output over here so where is functional
scope but let and const are block scoped
so let's see what that means so if we
create a block over here
and write where inside of it
you're going to see that this is still
accessible outside of this block
but when we change it to let
we're going to see reference error a is
not defined so this is only accessible
inside of this block so if i move this
inside of it
yup you're gonna see we are able to
access it and same is with const
it's accessible inside of it but when we
take it outside
nope a is not defined now there is
another concept that can be taken out of
this scoping which is called shadowing
so in javascript the introduction of lit
and const in es6 along with block
scoping allows variable shadowing so
what is variable shadowing if i write
this code you're going to see we have a
variable over here called hello and if
we print this over here it's going to
print hello yeah that's fine but if we
have a block scope over here inside of
this we say let a equals high let's say
what do you think is going to happen
this
a is going to shadow this a this will
overlap the value of this a but still
it's just going to be only accessible
inside of this block outside of this
block the a will still be hello so if i
run this
you're gonna see first we get high from
over here
and then hello from over here so this is
called variable shadowing now while
shadowing a variable it should not cross
the boundary of scope that is we can
shadow where variable by using let but
cannot do the opposite so if we try to
shadow let variable by where variable it
is known as illegal shadowing and it
gives us the error that variable is
already defined so let's check this out
now you're gonna see we if we try to
shadow where variable by using let it's
gonna work absolutely fine but when we
try to shadow let variable by using
where it's going to give us the error so
let's check this out if i run this
you're gonna see
b has been already declared so this is
called illegal shadowing and sometimes
all of these questions can be asked
together by the interviewer as an
extension to the scoping question now
the next type of question can be on
declaration how these three can be
declared so if we try to say where a
and then again say where a
then this is absolutely fine it's not
going to give us error we can redeclare
it as many times as we want
but when we say
let a
and
let a again
you're going to see that gives us the
error a has already been declared so we
cannot redeclare a variable by using let
and when we use const
it's again going to give us the same
error but it's giving us another error
missing initializer in const declaration
which we are going to discuss in our
next question so let in cons cannot be
redeclared in the same scope but where
can be redeclared in the same scope but
if we have something like this
and we say let over here
and we save this then this is completely
fine which we already discussed that
this comes under shadowing now the next
type of question can be declaration
without initialization so if i write
where a and we declare it just like this
then this is absolutely fine no problem
we can declare it without providing it
any value
okay so but if we try to do it with lit
then also this is completely fine but if
we do it with const
then this will give us error that
missing initializer in const declaration
we need to provide cons some value while
declaring it so it cannot be declared
without initializing it with any value
all right pause if you're not yet
following me on twitter go to
twitter.com push underscore eon or click
the link in the description down below
and hit that follow button right now
i'm waiting for you
i'm still waiting
okay fine let's continue with the video
now just like declaration there can be
questions on initializations as well so
can we re-initialize these variables
let's see so if we say where a equals
five
and we again try to say a equals six
yep that's fine we can do that
but what about lit
yup we can do that with let as well
but can we do that with const
no we cannot do that with cons
assignment to a constant variable we get
this error over here so where and lit
can be updated but const can never be
updated if done this will give us this
assignment to constant variable error
now the next type of question that can
be asked is on hosting and this is a
really really important topic 95 of
javascript interviews definitely have a
question on hosting but before
understanding hosting let's understand
how javascript execution context works
so what happens is when we try to
execute a js code there are two phases
one is a creation phase and the other is
execution phase so in creation phase
three things happen first it creates a
global or a window object so
i'm going to create a
window object representation over here
oh man i'm so bad at drawing the second
step is it setups a memory heap for
storing variables and function
references that means it takes all of
the variables and functions and stores
it inside of this window object and the
third step is that it initializes those
functions and variable declarations with
undefined so let's say we have first
variable as a so we're going to store a
second is our function which is multiply
so we stored multiply over here and the
third thing is our variable b
now the third step is that it
initializes them with undefined and for
the function declarations it takes the
whole complete function from here and
stores it inside of our window object
and this is the exact reason why hosting
occurs i'm going to talk about hosting
in just a minute but let's understand
what happens in the execution phase so
during the execution phase the
javascript engine executes the code line
by line assigning the values to
variables and executes the function
calls also for every new function
created javascript engine creates a new
execution context altogether we're gonna
talk about how function work with
execution context in another video of
this series for this video i'm gonna
focus on where let enconst so during the
execution phase javascript first assigns
the value of a which is 10 then it moves
on to variable b because the function
multiplier has not been executed yet so
it's not going to touch this function
then it takes b and assigns it with this
function execution so it's going to
execute the function with multiply x so
it's going to pass 10 to this and it's
going to multiply to provide it value
100 and then it's going to run this
console log b which is going to be the
output of 100. now javascript also uses
something called call stack which is a
mechanism to keep track of all of the
function calls which we will discuss in
our upcoming videos so now you know how
javascript execution context works let's
move forward to hosting so during the
creation phase javascript engine moves
your variables and function declarations
to the top of your code and this is
known as hosting if i declare a variable
called count and if i try to console log
it before it was declared
you're gonna see that we get undefined
we didn't get any error it should have
given us error right that the variable
is not declared yet but since we know
how the javascript execution context
works it declares all of these variables
and functions at the top of the code
during the creation phase and then when
the execution happens it checks if this
variable already exists during the
creation phase or not so obviously it
existed so it gives us undefined so how
javascript looks at this code is it
looks at like this
that yep where was already declared and
then we are console logging this and
then later we are initializing it okay
so this was the case of where right but
what happens in let
let's change this to let
are let variables hosted as well
well if you console log this you're
gonna see this error and you're gonna
say no they are not hosted but you're
wrong they are hosted they are hosted in
temporal dead zone we're going to talk
about that temporal dead zone in just a
minute but let's see what do we get over
here so we get cannot access count
before initialization so this basically
helps us overcome the limitations of
where so where didn't warn us about the
declaration but since we are using let
it says that we cannot access the count
before the initialization
now if we go
over here in the
sources
and put a breakpoint over here and when
then we try to run this
you're going to see
that inside of the script we have this
count as undefined whereas if we let's
try to declare another variable with var
count
two
two value
and if you go back and refresh this
you're gonna see in the global we have
this count two over here so this is
inside of our scope and this is
undefined so that's fine but you're
going to see we have a separate script
over here which has this count variable
which is inside of the temporal dead
zone so temporal dead zone is the time
between the declaration and the
initialization of let and const
variables so let's understand hosting by
understanding this question which was
asked to me in one of my previous
interviews so i've already made a video
on this so i'm going to play that clip
right over here so interviewer gave me
this function right here function abc
and he asked what is going to be the
console log of a so i want you to think
about this first before moving forward
because we are using where over here to
declare this variable so what's going to
happen is when this function is
initialized in our execution context
it's going to host this variable a and
the console log will be undefined so let
me show you real quick
if i say abc
and run this
you're gonna see that we get undefined
in the console so
yep you see we get this undefined now
why is that so if you go to sources
and right over here in the script.js i'm
going to put a breakpoint over here in
the console log a so now if i refresh
the page
you're going to see when the code
reaches over here a is undefined because
it has initialized this function but it
has not initialized this variable yet so
this variable a is undefined at this
moment but if the console log was after
this variable a then obviously it would
have printed the value of a which which
is going to be 10.
so now if i
put another breakpoint over here and say
move forward
now you're gonna see a is 10 right over
here when this function ends the value
of a will be 10 but since at this time
the value of a was undefined it's going
to print undefined
now then interviewer added few more
variables inside of this function
now then he asked me what is going to be
the console log for all of these three
values so obviously we know for a it's
going to be undefined but for b and c
what is it going to be because const and
led behave a little differently than
where are these two variables going to
be hosted as well
yes they are going to be hosted but they
are going to be hosted in temporal dead
zone so if i go back
and you're going to see we get this
error cannot access b before the
initialization so our constant let
variables are not hosted like where but
they are hosted in the temporal dead
zone so if i go
to sources so now if i put a debugger
over here and let's see here as well and
refresh this
you're gonna see that we still get b and
c undefined in our local scope but these
doesn't work like exactly like where
does these both will be initialized in
the temporal dead zone so what is
temporal dead zone you ask so temporal
dead zone is the term to describe the
state where variables are in the scope
but they are not yet declared
just like over here they are in the
scope but they have not been declared
yet so that's why b and c are going to
be in the temporal dead
zone so these were some of the major
types of questions that can be asked to
us during these javascript interviews
now obviously there can be more types of
questions that can be framed by using
lit wear and const do mention them in
the comments down below so that others
can know and i can make a video on them
in future so if you like this first
video of our javascript interview series
give this video a huge fat thumbs up and
subscribe to the channel for more such
awesome videos and let me know in the
comments down below which topic would
you like for me to cover next
```

make  detailed notes in md format using transcript above:
use my notes if given
use code if given
add examples to understandd things easily
make notes as i will use it for my interviews
never miss any point from the transcript
add everything in notes in detailed manner -->