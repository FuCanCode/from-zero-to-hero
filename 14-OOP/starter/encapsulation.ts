class Account {
  owner: string;
  currency: string;

  // public fields
  locale: Navigator['language'] = navigator.language;

  // private fields
  #movements: number[] = [];
  #pin: number;

  constructor(owner: string, currency: string, pin: number) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for nothing, ${this.owner}.`);
  }

  // Public interface
  getMovements() {
    return this.#movements;
  }

  get movements() {
    return this.getMovements();
  }

  deposit(dep: number) {
    this.#movements.push(dep);
  }

  withdraw(wdr: number) {
    this.deposit(-wdr); // Method inside method
  }

  // private method
  #approveLoan() {
    const check: boolean = this.#movements.reduce((a, v) => a + v, 0) >= 1000;
    console.log(check);
    return check;
  }

  requestLoan(req: number) {
    let msg: 'accepted' | 'denied';
    if (this.#approveLoan()) {
      this.deposit(req);
      msg = 'accepted';
    } else msg = 'denied';
    console.log(`Your request of ${req} was ${msg}`);
  }
}

const acc2: Account = new Account('Arme Sau', 'BHT', 1234);

acc2.withdraw(200);
console.log(acc2);
console.log(acc2.getMovements());
console.log(acc2.movements);
// console.log(acc2.#movements); not working because private class field
