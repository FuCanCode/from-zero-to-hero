//ANCHOR - Inheritance between "classes": Object.create

interface Person {
  firstName: string;
  birthYear: number;
  init(firstName: string, birthYear: number): void;
  calcAge(): void;
}

const PersonProto: Person = {
  firstName: '',
  birthYear: 0,
  init(firstName: string, birthYear: number): void {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },

  calcAge() {
    console.log(2037 - this.birthYear);
  },
};

const steven = Object.create(PersonProto);

interface Student extends Person {
  course: string;
}

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (
  firstName: string,
  birthYear: number,
  course: string
) {
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
