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

//ANCHOR - 222. Another Class Example
/* class Account {
  owner: string;
  currency: string;
  pin: number;
  movements: number[];
  locale: Navigator['language'];

  constructor(owner: string, currency: string, pin: number) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for nothing, ${this.owner}.`);
  }

  // Public interface
  deposit(dep: number) {
    this.movements.push(dep);
  }

  withdraw(wdr: number) {
    this.deposit(-wdr); // Method inside method
  }

  approveLoan() {
    const check: boolean = this.movements.reduce((a, v) => a + v, 0) >= 1000;
    console.log(check);
    return check;
  }

  requestLoan(req: number) {
    let msg: 'accepted' | 'denied';
    if (this.approveLoan()) {
      this.deposit(req);
      msg = 'accepted';
    } else msg = 'denied';
    console.log(`Your request of ${req} was ${msg}`);
  }
}

const acc1: Account = new Account('Arme Sau', 'BHT', 1234);
acc1.deposit(666);
acc1.withdraw(500);
acc1.requestLoan(580);
acc1.approveLoan();
acc1.deposit(10100);
acc1.approveLoan();
acc1.requestLoan(580);
console.log(acc1); */
