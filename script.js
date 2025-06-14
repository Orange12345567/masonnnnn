// --- DATABASE SIMULATION ---
// In a real app, you'd use a server and database.
// For this simple case, we use localStorage.

// Initialize data if it doesn't exist
if (!localStorage.getItem('masonAirsoftData')) {
    const initialData = {
        points: 0,
        dates: [],
        shop: [],
        cart: []
    };
    localStorage.setItem('masonAirsoftData', JSON.stringify(initialData));
}

function getData() {
    return JSON.parse(localStorage.getItem('masonAirsoftData'));
}

function saveData(data) {
    localStorage.setItem('masonAirsoftData', JSON.stringify(data));
}

// --- LOGIN ---
function login() {
    const password = document.getElementById('password').value;
    if (password === 'Charcoal11!') {
        window.location.href = 'admin.html';
    } else {
        alert('Incorrect password.');
    }
}

// --- POINTS ---
function displayPoints() {
    const data = getData();
    document.getElementById('points').innerText = data.points;
}

function displayAdminPoints() {
    const data = getData();
    document.getElementById('admin-points').innerText = data.points;
}

function addPoints() {
    let data = getData();
    data.points += 10;
    saveData(data);
    displayAdminPoints();
}

// --- CALENDAR ---
function proposeDate() {
    const dateInput = document.getElementById('date-proposal');
    const newDate = dateInput.value;
    if (!newDate) {
        alert('Please select a date.');
        return;
    }

    let data = getData();
    data.dates.push({ date: newDate, status: 'Proposed' });
    saveData(data);
    dateInput.value = '';
    displayCalendar();
}

function handleDateAction(index, action) {
    let data = getData();
    data.dates[index].status = action;
    saveData(data);
    displayCalendar();
    displayAdminCalendar();
}

function displayCalendar() {
    const calendarDiv = document.getElementById('calendar');
    if (!calendarDiv) return;
    calendarDiv.innerHTML = '';
    const data = getData();

    data.dates.forEach((d, index) => {
        const entry = document.createElement('div');
        entry.className = 'date-entry';
        entry.innerHTML = `
            <span>${d.date} - ${d.status}</span>
            <div class="date-actions">
                <button class="accept" onclick="handleDateAction(${index}, 'Accepted')">Accept</button>
                <button class="deny" onclick="handleDateAction(${index}, 'Denied')">Deny</button>
            </div>
        `;
        calendarDiv.appendChild(entry);
    });
}

function displayAdminCalendar() {
    const calendarDiv = document.getElementById('admin-calendar');
     if (!calendarDiv) return;
    calendarDiv.innerHTML = '';
    const data = getData();

    data.dates.forEach((d, index) => {
        const entry = document.createElement('div');
        entry.className = 'date-entry';
        entry.innerHTML = `
            <span>${d.date} - ${d.status}</span>
            <div class="date-actions">
                <button class="accept" onclick="handleDateAction(${index}, 'Accepted')">Accept</button>
                <button class="deny" onclick="handleDateAction(${index}, 'Denied')">Deny</button>
            </div>
        `;
        calendarDiv.appendChild(entry);
    });
}


// --- SHOP ---
function addProduct() {
    const nameInput = document.getElementById('product-name');
    const imageInput = document.getElementById('product-image');

    let data = getData();
    data.shop.push({ name: nameInput.value, image: imageInput.value });
    saveData(data);
    nameInput.value = '';
    imageInput.value = '';
    alert('Product added!');
}

function displayShop() {
    const shopDiv = document.getElementById('shop');
     if (!shopDiv) return;
    shopDiv.innerHTML = '';
    const data = getData();

    data.shop.forEach((p, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <p>${p.name}</p>
            <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        shopDiv.appendChild(productDiv);
    });
}

// --- CART ---
function addToCart(productIndex) {
    let data = getData();
    const product = data.shop[productIndex];
    data.cart.push(product);
    saveData(data);
    displayCart();
}

function displayCart() {
    const cartItemsUl = document.getElementById('cart-items');
    if (!cartItemsUl) return;
    cartItemsUl.innerHTML = '';
    const data = getData();

    data.cart.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item.name;
        cartItemsUl.appendChild(li);
    });
}