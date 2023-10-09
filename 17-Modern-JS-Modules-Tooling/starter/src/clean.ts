interface Budget {
  value: number;
  description: string;
  user: string;
  flag?: string;
}

const budget: Budget[] = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const spendingLimits: Record<string, number> = {
  jonas: 1500,
  matilda: 100,
};

const getLimit = (user: string) => spendingLimits?.[user] ?? 0;

const addExpense = (
  value: number,
  description: string,
  user: string = 'jonas'
) => {
  user = user.toLowerCase();

  if (value <= getLimit(user)) {
    budget.push({ value: -value, description, user });
  } else
    console.log(
      `User ${user}'s expense (${value} for "${description}") was rejected because the spending limit was exceeded!`
    );
};
addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');
console.log(budget);

const checkBudget = () => {
  budget.forEach(entry => {
    if (entry.value < -getLimit(entry.user)) entry.flag = 'limit';
  });
};
checkBudget();

console.log(budget);

const showBigExpenses = function (limit: number) {
  let output = '';
  for (const entry of budget) {
    entry.value <= -limit
      ? (output += entry.description.slice(-2) + ' / ')
      : output; // Emojis are 2 chars
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};
showBigExpenses(100);
