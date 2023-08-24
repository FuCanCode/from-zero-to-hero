"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Account_instances, _Account_movements, _Account_pin, _Account_approveLoan;
class Account {
    constructor(owner, currency, pin) {
        _Account_instances.add(this);
        // public fields
        this.locale = navigator.language;
        // private fields
        _Account_movements.set(this, []);
        _Account_pin.set(this, void 0);
        this.owner = owner;
        this.currency = currency;
        __classPrivateFieldSet(this, _Account_pin, pin, "f");
        // this._movements = [];
        // this.locale = navigator.language;
        console.log(`Thanks for nothing, ${this.owner}.`);
    }
    // Public interface
    getMovements() {
        return __classPrivateFieldGet(this, _Account_movements, "f");
    }
    get movements() {
        return this.getMovements();
    }
    deposit(dep) {
        __classPrivateFieldGet(this, _Account_movements, "f").push(dep);
        return this;
    }
    withdraw(wdr) {
        this.deposit(-wdr); // Method inside method
        return this;
    }
    requestLoan(req) {
        let msg;
        if (__classPrivateFieldGet(this, _Account_instances, "m", _Account_approveLoan).call(this)) {
            this.deposit(req);
            msg = 'accepted';
        }
        else
            msg = 'denied';
        console.log(`Your request of ${req} was ${msg}`);
        return this;
    }
}
_Account_movements = new WeakMap(), _Account_pin = new WeakMap(), _Account_instances = new WeakSet(), _Account_approveLoan = function _Account_approveLoan() {
    const check = __classPrivateFieldGet(this, _Account_movements, "f").reduce((a, v) => a + v, 0) >= 1000;
    console.log(check);
    return check;
};
const acc2 = new Account('Arme Sau', 'BHT', 1234);
acc2.withdraw(200);
console.log(acc2);
console.log(acc2.getMovements());
console.log(acc2.movements);
// console.log(acc2.#movements); not working because private class field
//ANCHOR - 225. Chaining methods
acc2.deposit(300).deposit(2000).withdraw(50).requestLoan(150).deposit(750);
console.log(acc2.movements);
