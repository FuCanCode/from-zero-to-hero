"use strict";
//ANCHOR - Inheritance between "classes": Object.create
const PersonProto = {
    firstName: '',
    birthYear: 0,
    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
    calcAge() {
        console.log(2037 - this.birthYear);
    },
};
const steven = Object.create(PersonProto);
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
};
StudentProto.introduce = function () {
    console.log(`I'm ${this.firstName} and I study ${this.course}.`);
};
const waldemar = Object.create(StudentProto);
waldemar.init('Waldemar', true, 'Muellmann');
console.log(waldemar);
waldemar.introduce();
