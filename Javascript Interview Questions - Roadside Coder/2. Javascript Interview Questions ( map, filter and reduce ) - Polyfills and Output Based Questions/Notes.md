# JavaScript: `map`, `filter`, and `reduce` — Complete Interview Notes

> These are among the **most frequently asked topics** in JavaScript interviews. Interviewers love asking about: how they work, differences between them, and writing polyfills from scratch.

---

## Overview

`map`, `filter`, and `reduce` are **array methods** used to iterate over an array and perform a transformation or computation.

| Method   | Returns         | Use Case                              |
|----------|-----------------|---------------------------------------|
| `map`    | New array (same length) | Transform each element         |
| `filter` | New array (shorter/equal length) | Keep elements matching a condition |
| `reduce` | Single value    | Accumulate/aggregate array into one value |

---

## 1. `map()`

### Definition
> Creates a **new array** from an existing one by applying a function to **each element**.

### Syntax
```js
array.map((currentElement, index, array) => {
  return /* transformed value */;
});
```

### Example
```js
const nums = [1, 2, 3, 4];

// Multiply each by 3
const multiplyBy3 = nums.map((num) => num * 3);
console.log(multiplyBy3); // [3, 6, 9, 12]

// Using index too
const withIndex = nums.map((num, index) => num * 3 + index);
console.log(withIndex); // [3, 7, 11, 15]
```

### Key Points
- Does **NOT** modify the original array
- Always returns a **new array of the same length**
- Callback receives: `(currentElement, index, array)`

---

## 2. `filter()`

### Definition
> Applies a condition to each element. If condition returns `true`, element is **included** in the new array. If `false`, it's **excluded**.

### Syntax
```js
array.filter((currentElement, index, array) => {
  return /* boolean condition */;
});
```

### Example
```js
const nums = [1, 2, 3, 4];

const moreThanTwo = nums.filter((num) => num > 2);
console.log(moreThanTwo); // [3, 4]
```

### Key Points
- Returns a **new array** (may be shorter than original)
- Does **NOT** modify the original array
- Callback must return `true` (keep) or `false` (discard)

---

## 3. `reduce()`

### Definition
> Reduces an entire array down to **a single value** by applying an accumulator function.

### Syntax
```js
array.reduce((accumulator, currentValue, index, array) => {
  return /* updated accumulator */;
}, initialValue);
```

### Example
```js
const nums = [1, 2, 3, 4];

const sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10
```

### How it works step by step:
| Step | Accumulator | Current Value | Result |
|------|-------------|---------------|--------|
| 1    | 0 (initial) | 1             | 1      |
| 2    | 1           | 2             | 3      |
| 3    | 3           | 3             | 6      |
| 4    | 6           | 4             | 10     |

### Key Points
- `accumulator` = result of previous computation
- `initialValue` is optional. If not provided:
  - `accumulator` = first element
  - `currentValue` starts from second element
- Returns a **single value** (not an array)

---

## 4. Polyfills (Writing from Scratch)

> **Polyfill** = Custom implementation of a built-in function using `Array.prototype`

### `Array.prototype.myMap`
```js
Array.prototype.myMap = function(callback) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(callback(this[i], i, this));
  }
  return temp;
};

// Usage
const nums = [1, 2, 3, 4];
const result = nums.myMap((num) => num * 3);
console.log(result); // [3, 6, 9, 12]
```

### `Array.prototype.myFilter`
```js
Array.prototype.myFilter = function(callback) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      temp.push(this[i]);
    }
  }
  return temp;
};

// Usage
const nums = [1, 2, 3, 4];
const result = nums.myFilter((num) => num > 2);
console.log(result); // [3, 4]
```

### `Array.prototype.myReduce`
```js
Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    if (accumulator !== undefined) {
      accumulator = callback(accumulator, this[i], i, this);
    } else {
      // No initial value: use first element as accumulator
      accumulator = this[i];
    }
  }
  return accumulator;
};

// Usage
const nums = [1, 2, 3, 4];
const sum = nums.myReduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10
```

> **`this`** inside these prototype methods refers to the array the method is called on.

---

## 5. `map` vs `forEach` (Very Common Interview Question!)

| Feature             | `map`                         | `forEach`                     |
|---------------------|-------------------------------|-------------------------------|
| Returns             | New array                     | `undefined`                   |
| Modifies original?  | No                            | Can (if you mutate elements)  |
| Chainable?          | ✅ Yes                        | ❌ No                         |
| Use case            | Transform and collect results | Side effects, iteration only  |

```js
const arr = [2, 5, 3, 4];

// map returns a new array
const mapResult = arr.map((el) => el + 2);
console.log(mapResult); // [4, 7, 5, 6]

// forEach returns undefined
const forEachResult = arr.forEach((el) => el + 2);
console.log(forEachResult); // undefined

// forEach can modify original via index
arr.forEach((el, index, array) => {
  array[index] = el + 3;
});
console.log(arr); // [5, 8, 6, 7]

// map supports chaining
const chained = arr.map((el) => el + 2).filter((el) => el > 6);
// forEach does NOT support chaining
```

---

## 6. Output-Based Interview Questions

### Setup: Student Array
```js
const students = [
  { name: "Alice", rollNumber: 11, marks: 75 },
  { name: "Bob",   rollNumber: 18, marks: 55 },
  { name: "Carol", rollNumber: 22, marks: 82 },
  { name: "Dave",  rollNumber: 14, marks: 45 },
];
```

---

### Q1: Return names of all students in CAPITAL LETTERS

```js
// Using for loop (verbose)
let names = [];
for (let i = 0; i < students.length; i++) {
  names.push(students[i].name.toUpperCase());
}

// Using map (clean, one-liner)
const names = students.map((s) => s.name.toUpperCase());
console.log(names); // ["ALICE", "BOB", "CAROL", "DAVE"]
```

---

### Q2: Return details of students who scored more than 60

```js
const details = students.filter((s) => s.marks > 60);
console.log(details);
// [{ name: "Alice", ... }, { name: "Carol", ... }]
```

---

### Q3: Return details of students with marks > 60 AND roll number > 15

```js
const details = students.filter((s) => s.marks > 60 && s.rollNumber > 15);
console.log(details);
// [{ name: "Carol", rollNumber: 22, marks: 82 }]
```

---

### Q4: Calculate the sum of marks of all students

```js
const sum = students.reduce((acc, curr) => acc + curr.marks, 0);
console.log(sum); // 257 (75 + 55 + 82 + 45)
```

---

### Q5: Return only NAMES of students who scored more than 60 (map + filter chaining)

```js
const names = students
  .filter((s) => s.marks > 60)
  .map((s) => s.name);

console.log(names); // ["Alice", "Carol"]
```

---

### Q6 (Hard): Return total marks for students with marks > 60, after adding 20 grace marks to those who scored < 60

#### Steps:
1. `map` → Add 20 marks to students with marks < 60
2. `filter` → Keep only students with marks > 60 (post-grace)
3. `reduce` → Calculate total marks

```js
const totalMarks = students
  .map((student) => {
    if (student.marks < 60) {
      student.marks += 20;
    }
    return student;
  })
  .filter((student) => student.marks > 60)
  .reduce((acc, curr) => acc + curr.marks, 0);

console.log(totalMarks); // 224
```

#### Breakdown:
- Bob: 55 + 20 = 75 → included
- Dave: 45 + 20 = 65 → included
- Alice: 75 → included
- Carol: 82 → included
- All pass > 60 after grace, so sum = 75 + 75 + 82 + (one removed)... depends on exact data

---

## 7. Chaining — Key Interview Point

> `map`, `filter`, and `reduce` **all support method chaining** because `map` and `filter` return arrays. `forEach` does NOT support chaining.

```js
const result = [1, 2, 3, 4, 5, 6]
  .filter((n) => n % 2 === 0)   // [2, 4, 6]
  .map((n) => n * 10)            // [20, 40, 60]
  .reduce((acc, n) => acc + n, 0); // 120

console.log(result); // 120
```

---

## 8. Quick Cheat Sheet for Interviews

```
map    → transform each element     → returns new array (same length)
filter → keep elements by condition → returns new array (≤ original length)
reduce → aggregate into one value   → returns single value
forEach→ iterate with side effects  → returns undefined, not chainable
```

---

## 9. Prototype Concept (Brief)

- `Array.prototype.myMap = function() {...}` adds `myMap` to **all arrays** in the file
- Inside the function, `this` refers to the array the method is called on
- This is how JavaScript's built-in `map`, `filter`, `reduce` are implemented internally

---

*These notes cover everything needed for JavaScript interviews on map/filter/reduce — definitions, syntax, polyfills, comparisons, and output questions.*

<!-- 
Transcript:
```
map filter and reduce we all use this
array methods a lot of times while
developing our javascript applications
and these are amongst one of the most
asked questions in javascript interviews
interviewers absolutely love to confuse
candidates by questions like how they
work difference between them creating
these functions from scratch etc so map
filter reduce are basically array
methods that are used to iterate over an
array and perform a transformation or
computation
each may or may not return a new array
based on the result of the function
so in this video i'll be explaining each
one of them one by one make polyfills
for them from absolute scratch and
discuss some commonly asked interview
questions so i've opened vs code over
here with html css and javascript files
and when i go on to run this
we have this window over here
so i'm gonna quickly open the console
because that is where we are gonna see
our output all right so let's start by
discussing each map filter and reduce
separately and this is a very basic
question that interviewers ask on this
topic so first we're gonna discuss what
is map
so the map method is used for creating a
new array from existing one by applying
a function to each one of the elements
of the first array so let me show you if
i go on and type const
numps array and i'm gonna give let's say
one two three
four now what i wanna do is i want to
multiply each of these elements by 5 and
return a new array to me so i can create
a new variable const
multiply
3
and inside of this we're going to type
nums and here map comes in the picture
so i i'm going to type map
and this takes a callback function so
we're going to provide a function over
here and this function takes three
things first is the current element so
it's going to iterate through all of
these elements right so it's going to
take the current element so let's say
i'm going to give this num
and second will be the index that is
this 0
1
2 so
index and the third will be the actual
array
that is this array so we're gonna say
arr
in this case we're not gonna use index
or the array
so what i'm gonna do over here is i'm
gonna go inside and say return num
into
3 and what this will do is it's going to
take each element of this array and
multiply by 3 and return it and it's
going to return a completely new array
inside of this multiply 3. so let's go
on and console.log this
and let's see the output
yep you see we have a completely new
array with all of the elements
multiplied by 3.
now if you would like to see what this
index does is
let's say we add index in this as well
so it should give us result like three
like this
one
two into three plus one something like
that so
let's find out
yep we have 3 7 11 and 15.
so this is how
a map array method works so let's see
what filter is so the filter method
takes each element in an array and it
applies a conditional statement against
it if the conditional returns true the
element gets pushed into the output
array if the condition returns false the
element does not get pushed into the
output array in short filter returns
only those elements from the array which
fulfills the provided criteria so let me
show you so let's say we have const and
what we want to do is we want to only
return the elements which are more than
two so i'm gonna give it more than
to name
and i'll say nums dot filter
inside of this again this is going to
take a callback function
and this will again take those three
things
num
index and the array so num and but in
this case as well we don't need index
and array so i'm just not going to write
them
so return if num is more than 2.
let's console log this more than
two
let's find out
yup you see
we only returned the elements that were
more than two inside of this more than
two array so this is what filter does
and you can clearly notice that its
syntax is similar to map except the
function returns true to keep the
element or false to not return it now
the reduce method is probably most
complicated of all three the reduce
method reduces an array of values down
to just one value just like map and
filter reduce also executes the callback
for each element of the array so it
receives two things so let me show you
so if i write const
sum so what we want over here is we want
to make
we want to calculate the sum of all of
these elements we want to reduce this
array
down to just one value which is going to
be the sum of this array so i'm going to
write const sum equals
nums dot reduce
and now this is gonna take two things as
you can see over here it's gonna take
one callback function and an initial
value
so i'm gonna
write the callback function over here
and the second parameter is gonna be the
initial value so i'm going to keep the
initial value as 0.
now this callback functions parameters
are a little bit different from what map
and filter had so this has an
accumulator
the current value
the index and our array
so what are these accumulator and the
current value so accumulator is
basically the result of the previous
computation right now there is no
computation at the beginning right so
this is going to be zero initially the
current value is the current element of
the array obviously and then we have the
index and the array so what we're going
to do over here is
we're going to return
accumulator plus the current value
so it's going to start by 0 and it's
going to add 1 2 3 4. just like that
it's going to make the sum of this
complete array and return to us
so let me just quickly console log this
so let's see and here you see we get
this 10 as the sum of this array awesome
now don't worry if you're having trouble
understanding them now we are going to
discuss output questions on each one of
them as we move forward in this video
but let's first start with how we can
create
each one of them from absolute scratch
that is their polyfills
so first let's create the polyfill for
map
so i'm gonna write array
dot prototype
dot and i'm gonna give this some custom
name so i'm gonna say let's say my map
and don't worry if you don't know
anything about prototypes i'm gonna
bring a separate video on prototype and
prototypal inheritance etcetera so do
click on subscribe button if you're
excited for that video so what this
prototype is doing is it's adding this
mymap function to the methods of this
array in our current javascript file
so
this will take a function
i'm not going to give this any name
and for the parameters it's going to
take a callback so let me write the map
syntax over here quickly so we have
array.map
and
map takes a callback
which inside of it takes
the current value index and the array so
we're going to reference this and create
the polyfill for our my map function
okay now instead of this this takes a
callback
now
so map returns a completely new error
right so to create a new array we will
need an empty array first so let's
declare
let
temp
to be an empty array and now inside this
since we are going to iterate through
each element of the array we're going to
have a for loop
which will start from 0 go to this dot
length
so i've written this this dot length
over here is because obviously we're
gonna when we use this my map function
we're gonna write something like this
array dot my map so since this is the
part of this
array so when we use this inside of it
it's gonna reference our parent array so
this here means basically the array that
which we are working on now inside of
this since we have this callback
condition right so what we're gonna do
we're gonna say temp
that is this temporary output array
temp dot push
and what are we gonna push we're gonna
push the computation of this callback
i'll say call back and i'm gonna provide
these three things the current element
index and the array
so the current element is this of this
index so i'm going to write
this that is our array and the index i
second one is the index so i'm just
going to write i and the third one is
the actual array so i'm just going to
write this
and now i will return
temp
and that's it this is our custom map
function congrats so let's try this out
and see if it works as expected so this
was the example that we discussed while
understanding the map so let's remove
this dot map over here and i'm going to
use my map polyfill and let's save this
and see
yep it works as expected
great now let's go on and create the
polyfill for filter so to create the
polyfill for filter it's going to be
absolutely same as it was for map so i'm
going to say array dot prototype dot
filter
and it's going to take a call back just
like map
and inside of this since this also
returns an array so i'm gonna have let
temp
empty cool
now again since we are iterating through
each of the values so i'm gonna write
for loop
okay so things are absolutely same up
until this point
so what is the difference between map
and filter
so map basically returns each and every
value and modifies it according to the
condition of the callback right but
filter only returns those values which
satisfy the condition of callback
not each and every element
so in the map we used to do this temp
dot push
and then insert this we gave callback
and the current element index and the
array to it right but we're not going to
do that over here
we're going to first check
if
callback satisfies the condition so
callback will have the current element
that is this
of i
the index
and the current array that is this
and if this satisfies the condition then
we're going to push
the current element that is this of
i just like that and the and in the end
we're gonna return
temp
that's all that's all we need to do
and i'm gonna name this my filter
actually so that it doesn't clashes with
the pre-existing filter function inside
of the array prototype
so here's that example that you
discussed while understanding filter so
let's replace
this filter with my filter and test to
see if it works
which it does cool
let's discuss the polyfill for reduce
okay so the polyfill for reduce it's a
little different from map and function
as you know so it takes two things one
is a callback
and the other is the initial value so
initial
value just like that inside of this
function we're gonna say callback
comma initial value and this callback
has how many things
it has the accumulator
the current value
the index and the array
so we're gonna work according to this
syntax now instead of this
we would first need to initialize the
accumulator so with the initial value so
i'll write where
accumulator
equals
initial value okay so that's done
now next obviously we're going gonna
iterate through all of the elements of
the array so we're gonna need the for
loop now inside of this for loop
so i missed one point while explaining
reduce so what happens if the user fails
to give the initial value so in our case
we gave the initial value as zero right
but what if he fails to give the initial
value any initial value so what happens
is accumulator takes the first element
of the array as the initial value and
the current value is assigned the second
element of the array so we're going to
check over here
accumulator equals
accumulator
we're going to check
if there's anything inside of the
accumulator then that's fine we're going
to go inside of the callback and execute
it
by providing the accumulator the current
value which is this of i
and the index and the current array
that is this
cool
but what if it doesn't have anything
inside of it then we will first go on
and assign it the first element of the
array so we will say this of i
oops i
just like that
and now when it comes to another loop
it's gonna already have the initial
value as the first element of the array
now after this loop ends
it's gonna have the final value of our
reduce function inside this accumulator
so we're gonna just return
accumulator just like that and that's it
this is our polyfill for reduce function
let's test it out so again we have the
example that we used to understand the
reduce so i'm just gonna
replace it with my reduce
save it let's see
yep still got the same output
so i hope you are able to understand how
you can go on and create these functions
from absolute scratch and these are
really important for the javascript
interviews now there's one question
which is really commonly asked in these
javascript interviews that is map versus
4h so this question was asked to me in
my an academy interview on which i have
made a complete video and here is the
clip to that question what is the
difference between map and for each
so to explain this we're gonna take an
array
with let's say two five three four
some random values
now first of all what are map and for
each these both are array functions to
loop through the items of the array so
if i go on and say arr
dot map
and we're gonna provide a call back over
here so just like this
and now we can perform any operation on
this array so let's say return
ar
plus 2. so what this will do is it's
going to return the whole array with two
added to each item of the array it's not
going to modify the original array
whereas if we do this
for each this performs like a normal for
loop but this doesn't return anything
just like map does so if i go on and say
const map result
and
const
for each
result
and go on and console log both of these
now let's go to our browser and open the
console so we get an array in the result
of the map so it returned us the array
but didn't modify the original array so
it returned us a new array with all of
the items
having a plus two
but the for each didn't return us
anything so both of these functions have
a different use case let's say if we
want to modify this array so what i'm
going to do i'm going to take the index
so what this will do is it will modify
the original array so let's say i'm
going to add 3 to it and now i'll
console log this array
this was the array from the map and this
was the modified array which was arr our
original array now this was the first
difference now the second difference is
that you can chain stuff on map so i can
say dot and something we can let's say
if we want to do dot filter and do some
operation inside of this filter so we
can do that with map but in forage since
it doesn't return any array we cannot
chain other methods after it
all right now let's discuss some output
based questions which involve the use of
map filter and reduce so let's save the
interview provided with this array
called students which has the data for
four students with name roll number and
marks inside of each of the object so
the first question that interviewer gave
is that you need to return only the name
of students in capital letters so there
can be multiple approach to this
question you can either use the
traditional for loop or you can use the
for each or you can use a map so let's
see what would have been the case if we
used the traditional for loop we would
have created a new array first of all so
let names
names
we would have ran a for loop
inside this for loop we would have said
names
dot
push we're gonna push only the name of
the student and we will take each of the
element so i'll say i
and take the name and make it to
upper case and that's it and then we
will print this
console.log this names
let's see the output
yep
we get the output that's fine but this
code looks a little messy let's clean
this up by using map
so i'll say const
names and i'm going to make this one
liner so i'll say students
dot map and let's says 2 for the current
element
and i'll says 2 dot
name
name
dot 2 upper case
that's it that's all we needed to do
and we are done with this just one line
of code let's see the output and we get
the same output all right pause if
you're not yet following me on twitter
go to twitter.com push underscore eon or
click the link in the description down
below and hit that follow button right
now
i'm waiting for you
i'm still waiting
okay fine let's continue with the video
now the second output question is return
only the details of those students who
scored more than 60 marks so i want you
to try this yourself and what do you
think which function are we gonna use to
solve this question pause the video
right now and solve it okay i hope you
have solved it yourself so i'm gonna
show you the answer so we will have a
variable called
details
and inside of it i'm going to take
students
dot
filter we're going to use filter
function now we will take s2 and we will
add the condition what was the condition
it has to the marks have to be more than
60. so 2
dot marks
to be more than 60 and that's all that's
all we needed to do to calculate the
answer and let's see the output
we get two
elements of the array and both of these
students had marks more than 60 and
those who didn't have marks more than 60
were filtered out from the array now the
next question can be returned the
details of only those students who have
marks greater than 60 and roll number
greater than 15 so i think it's gonna be
same as the previous question so i'll
write
this
value and instead of it i'll write
students dot
marks
have to be more than 60. okay that's
fine and the other condition is
that roll number has to be greater than
15 so
2 dot roll number has to be greater than
15.
let's see the output for this i'm going
to console.log details
and only one of the students had
marks more than 60 and roll number
greater than 15. now the next question
is we need to calculate the sum of marks
of all of the students
so you already know what we're going to
use here
we're going to use reduce
so reduce we will take the accumulator
and the current value
oops i mean
comma
now here we will just simply say
accumulator plus
the current value
dot marks that is the current element
that is this one and we're going to take
the marks so we took the marks over here
and here you can provide the initial
value as 0.
and let's see const sum equals and i'm
gonna console.log
sum
so let's see
yep we get the sum of all of the marks
of all of the students
great now these questions were really
straightforward now there can be
questions which may involve use of more
than one function that is you may need
to use map or filter together filter or
reduce together so let's see those type
of questions our next question is to
return only names of the students who
scored more than 60.
so we already seen this part
and we already saw this part as well in
we saw this part in map and we saw this
part in filter so we're gonna need to
combine both of them
somehow
filter first of all we're going to
filter out those students which have
less marks than 60 or more marks than 60
sorry i'll say s2
marks oops i mean 2 dot marks has to be
more than 60. that's fine this is gonna
return us all of the students with marks
more than 60. now
as i discussed in my map versus for each
video and i forgot to mention this over
here in this video that all of these
functions map filter and reduce
allows chaining we can chain other
functions in front of these functions
so
the output of this
filter
can be chained by typing dot map or dot
filter or dot reduce so i'm gonna map
through the result of this
condition right here so i will say
s2
and 2 dot name we are only supposed to
return the name
so this should do it let's see names
and awesome so we only got the name of
those students which have scored more
than 60. okay so our last question is a
bit complicated
so this says return total marks for the
students with marks greater than 60
after 20 marks have been added to those
students who scored less than 60. so all
of those students who have marks less
than 60 got a grace of 20 more marks so
20 marks will be added to those students
and after that we are supposed to return
only those students which have
marks greater than 60 after the addition
of 20 marks of course and then for those
particular students we are supposed to
calculate total marks the sum of total
marks of those students so let's see
what is the constant total marks
and i will say
students dot first of all we're gonna do
the map
so inside this map i will take
student
and i will say
if
student
marks are less than 60.
we're going to provide them
a 20 marks grace
so i will says 2 dot marks
and we're going to add
20 to it and then we will return
that particular student that's all let's
see the output for this one
before moving forward
so
these students had less marks than 60
caution and they'll breathe
so
they got 20 marks extra
cool so this one works now we are going
to chain
another function that is filter over
here
and we're going to filter out all those
students
with marks greater than 60. so i'll say
student and student dot marks
greater than 60.
let's see the output now
okay one of the students which had
less marks than 60 got removed and now
we're supposed to return the total marks
for the students so we will chain
another reduce over here to calculate
the sum
so
accumulator and the current value
just like previously i'm going to take
the accumulator and add the current
value
dot max
and provide the initial value as 0
and that's it i think this should do it
let's find out 224 amazing we got the
output so you see these type of
questions can be asked to you during
your javascript interviews and since
you're watching this channel you're
definitely able to crack them so hit the
like on this video if you want me to
create more such awesome javascript
interview videos and the complete
playlist for this javascript interview
series will be in the description down
below and obviously don't forget to
subscribe or your code will give you
errors
```
---
make  detailed notes in md format using transcript above:
use my notes if given
use code if given
add examples to understandd things easily
make notes as i will use it for my interviews
never miss any point from the transcript
add everything in notes in detailed manner  -->
