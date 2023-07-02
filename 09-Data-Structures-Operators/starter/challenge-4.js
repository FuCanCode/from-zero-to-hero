'use strict';

/* Coding Challenge #4

Write a program that receives a list of variable names written in underscore_case
and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below to
insert the elements), and conversion will happen when the button is pressed.

Test data (pasted to textarea, including spaces):
underscore_case
first_name
Some_Variable
calculate_AGE
delayed_departure

Should produce this output (5 separate console.log outputs):
underscoreCase ✅
firstName ✅✅
someVariable ✅✅✅
calculateAge ✅✅✅✅
delayedDeparture ✅✅✅✅✅

Hints:
§ Remember which character defines a new line in the textarea 😉
§ The solution only needs to work for a variable made out of 2 words, like a_b
§ Start without worrying about the ✅. Tackle that only after you have the variable
name conversion working 😉
§ This challenge is difficult on purpose, so start watching the solution in case
you're stuck. Then pause and continue!
Afterwards, test with your own test data!
GOOD LUCK 😀 */
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

// Get Text element and insert data for testing (don't want to paste every test)
const textareaEl = document.querySelector('textarea');
textareaEl.value =
  'underscore_case\n  first_name\nSome_Variable\n  calculate_AGE\ndelayed_departure';

// Button action
document.querySelector('button').addEventListener('click', function () {
  const inputText = textareaEl.value;
  const txtArr = inputText.replaceAll(' ', '').replaceAll('\n', ' ').split(' ');
  let result = '';
  for (let [index, e] of txtArr.entries()) {
    e = e.toLowerCase();
    let [word1, word2] = e.split('_');
    word2 = word2.replace(word2[0], word2[0].toUpperCase());
    result += (word1 + word2).padEnd(17, ' ') + '✅'.repeat(index + 1) + '\n';
  }
  textareaEl.value = result;
  console.log(result);
});
