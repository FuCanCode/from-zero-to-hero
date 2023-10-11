interface Budget {
  value: number;
  description: string;
  user: string;
  flag?: string;
}

const budget: readonly Budget[] = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits: Record<string, number> = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = (limits: Record<string, number>, user: string) =>
  limits?.[user] ?? 0;

// Pure function
const addExpense = (
  state: readonly Budget[],
  limits: Record<string, number>,
  value: number,
  description: string,
  user: string = 'jonas'
) => {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
console.log(newBudget1);

const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(newBudget3);

const checkBudget = (
  state: readonly Budget[],
  limits: Record<string, number>
): Budget[] =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );
const checkedBudget: Budget[] = checkBudget(newBudget3, spendingLimits);
console.log('Checked: ', checkedBudget);

console.log(budget);

const showBigExpenses = function (state: Budget[], limit: number) {
  const bigExpenses = state.filter(e => e.value <= -limit);
  return bigExpenses
    .reduce((icons, entry) => {
      return (icons += `${entry.description.slice(-2)} / `);
    }, '')
    .slice(0, -2);
};
const bigExpensesSymbols = showBigExpenses(checkedBudget, 100);
console.log(bigExpensesSymbols);
