console.clear();

const balances = [
{ name: "Anmol", balance: 8218 },
{ name: "Heena", balance: -5756 },
{ name: "Himanshu", balance: 2344 },
{ name: "Sonu", balance: -4806 }
];

// People who should receive money
const creditors = balances
.filter(person => person.balance > 0)
.map(person => ({ ...person }));

// People who should pay money
const debtors = balances
.filter(person => person.balance < 0)
.map(person => ({
...person,
balance: Math.abs(person.balance)
}));

const settlements = [];

let i = 0; // debtor pointer
let j = 0; // creditor pointer

while (i < debtors.length && j < creditors.length) {

// Find minimum possible settlement amount
const amount = Math.min(
debtors[i].balance,
creditors[j].balance
);

// Store settlement
settlements.push({
from: debtors[i].name,
to: creditors[j].name,
amount: amount
});

// Reduce balances
debtors[i].balance -= amount;
creditors[j].balance -= amount;

// Move to next debtor if settled
if (debtors[i].balance === 0) {
i++;
}

// Move to next creditor if settled
if (creditors[j].balance === 0) {
j++;
}
}

console.log("===== Settlement Summary =====\n");

settlements.forEach(settlement => {
console.log(
`${settlement.from} pays ${settlement.to} ₹${settlement.amount}`
);
});
