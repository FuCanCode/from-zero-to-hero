/* JavaScript Fundamentals – Part 1
Coding Challenge #1
Mark and John are trying to compare their BMI (Body Mass Index), which is
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg
and height in meter).
Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.
Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
m tall.
GOOD LUCK 😀 */

let weightMark = 78;
let heightMark = 1.69;
let bmiMark = weightMark / (heightMark ** 2)
let weightJohn = 92;
let heightJohn = 1.95;
let bmiJohn = weightJohn / (heightJohn * heightJohn)
let markHigherBMI = bmiMark > bmiJohn;

console.log("BMI Mark: " + bmiMark);
console.log("BMI Mark: " + bmiJohn);
console.log(markHigherBMI);

let mark = {
    weight: 95,
    height: 1.88
}
let john = {
    weight: 85,
    height: 1.76
}

function bmi(gewicht, groesse) {
    return gewicht / (groesse ** 2)
}
bmiMark = bmi(mark.weight, mark.height);
bmiJohn = bmi(john.weight, john.height);
console.log(bmiMark + " is Mark's BMI and " + bmiJohn + " is John's BMI.");
if (bmiMark > bmiJohn) {
    console.log("Mark's BMI ist groesser");
} else {
    console.log("John's BMI ist groesser");
}
