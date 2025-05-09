document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('.menu-card');
  const tabs = document.querySelectorAll('.menu-category h3');
  const orderList = [];
  const orderSummary = document.createElement('div');
  orderSummary.className = 'order-summary';
  document.body.appendChild(orderSummary);

  tabs.forEach(tab => {
    tab.style.cursor = 'pointer';
    tab.addEventListener('click', () => {
      document.querySelectorAll('.menu-category').forEach(section => section.style.display = 'none');
      tab.parentElement.style.display = 'block';
    });
  });

  menuItems.forEach(item => {
    const addButton = document.createElement('button');
    addButton.textContent = 'Add to Order';
    addButton.className = 'add-to-order';

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = 1;
    quantityInput.value = 1;
    quantityInput.className = 'quantity-input';

    item.appendChild(quantityInput);
    item.appendChild(addButton);

    addButton.addEventListener('click', () => {
      const name = item.querySelector('h4').textContent;
      const priceText = name.split('₱')[1];
      const price = parseFloat(priceText);
      const quantity = parseInt(quantityInput.value);

      orderList.push({ name, price, quantity });
      updateOrderSummary();
    });
  });

  function updateOrderSummary() {
    orderSummary.innerHTML = '<h3>Your Order</h3>';
    let total = 0;
    const ul = document.createElement('ul');

    orderList.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} x${item.quantity} = ₱${item.price * item.quantity}`;
      total += item.price * item.quantity;
      ul.appendChild(li);
    });

    orderSummary.appendChild(ul);
    const totalElement = document.createElement('p');
    totalElement.innerHTML = `<strong>Total: ₱${total.toFixed(2)}</strong>`;
    orderSummary.appendChild(totalElement);

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit Order';
    submitBtn.className = 'submit-btn';
    submitBtn.onclick = confirmOrder;
    orderSummary.appendChild(submitBtn);
  }

  function confirmOrder() {
    if (orderList.length === 0) {
      alert('Please add items to your order first.');
      return;
    }

    const name = prompt('Please enter your name to complete the order:');
    if (name) {
      alert(`Thank you, ${name}! Your order has been submitted.`);
      orderSummary.innerHTML = `<h3>Thank you, ${name}!</h3><p>Your order has been received.</p>`;
    }
  }

  const style = document.createElement('style');
  style.innerHTML = `
    .menu-category { margin-bottom: 2rem; }
    .menu-items { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
    .menu-card {
      flex: 0 0 250px;
      max-width: 250px;
      border: 1px solid #ccc;
      padding: 1rem;
      border-radius: 8px;
      background: #fff;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .menu-card:hover {
      transform: scale(1.03);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .quantity-input { width: 60px; margin-right: 0.5rem; }
    .add-to-order, .submit-btn {
      padding: 0.5rem 1rem;
      background-color: #8B5E3C;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .add-to-order:hover, .submit-btn:hover {
      background-color: #A47148;
    }
    .order-summary {
      background: #fef6ec;
      padding: 1rem;
      margin-top: 2rem;
      border-top: 2px solid #c69c6d;
    }

    @media (max-width: 768px) {
      .menu-card { flex: 1 1 90%; max-width: 90%; }
    }
  `;
  document.head.appendChild(style);
});