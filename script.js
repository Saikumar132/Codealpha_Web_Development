document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expenseForm');
  const expenseList = document.getElementById('expenseList');

  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  // Render expenses
  function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${expense.name}: $${expense.amount}</span>
        <button class="edit" data-index="${index}">Edit</button>
        <button class="delete" data-index="${index}">Delete</button>
      `;
      expenseList.appendChild(li);
    });
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  renderExpenses();

  // Add expense
  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('expenseName').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);

    if (name && amount) {
      expenses.push({ name, amount });
      renderExpenses();
      expenseForm.reset();
    }
  });

  // Delete or edit expense
  expenseList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      const index = e.target.dataset.index;
      expenses.splice(index, 1);
      renderExpenses();
    }
    if (e.target.classList.contains('edit')) {
      const index = e.target.dataset.index;
      const editedName = prompt('Enter edited name:', expenses[index].name);
      const editedAmount = parseFloat(prompt('Enter edited amount:', expenses[index].amount));
      if (editedName && !isNaN(editedAmount)) {
        expenses[index] = { name: editedName, amount: editedAmount };
        renderExpenses();
      }
    }
  });
});
