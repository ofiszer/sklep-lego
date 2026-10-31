// KARUZELA PRODUKTÓW

const carousel = document.getElementById("product-carousel");

const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");

nextButton.addEventListener("click", function () {
  carousel.scrollBy({
    left: 270,
    behavior: "smooth",
  });
});

prevButton.addEventListener("click", function () {
  carousel.scrollBy({
    left: -270,
    behavior: "smooth",
  });
});

// KARUZELA KATEGORII

const categoryCarousel = document.getElementById("category-carousel");

const nextCategoryButton = document.getElementById("next-category-btn");
const prevCategoryButton = document.getElementById("prev-category-btn");

nextCategoryButton.addEventListener("click", function () {
  categoryCarousel.scrollBy({
    left: categoryCarousel.querySelector(".category-card").offsetWidth + 20,
    behavior: "smooth",
  });
});

prevCategoryButton.addEventListener("click", function () {
  categoryCarousel.scrollBy({
    left: -categoryCarousel.querySelector(".category-card").offsetWidth - 20,
    behavior: "smooth",
  });
});

// ======================================
// ELEMENTY KOSZYKA
// ======================================

const cartToggle = document.getElementById("cart-toggle");
const closeCart = document.getElementById("close-cart");

const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

// ======================================
// DANE KOSZYKA
// ======================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ======================================
// OTWIERANIE I ZAMYKANIE KOSZYKA
// ======================================

function openCart() {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
  document.body.classList.add("cart-open");
}

function hideCart() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
  document.body.classList.remove("cart-open");
}

cartToggle.addEventListener("click", openCart);

closeCart.addEventListener("click", hideCart);

cartOverlay.addEventListener("click", hideCart);

// ======================================
// DODAWANIE PRODUKTÓW
// ======================================

const addButtons = document.querySelectorAll(".add-to-cart");

addButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const productCard = button.closest(".product-card");

    const name = productCard.querySelector("h3").textContent;

    const priceText = productCard.querySelector(".price").textContent;

    const price = Number(priceText.replace("zł", "").replace(",", ".").trim());

    const image = productCard.querySelector("img").getAttribute("src");

    const existingProduct = cart.find(function (item) {
      return item.name === name;
    });

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({
        name: name,
        price: price,
        image: image,
        quantity: 1,
      });
    }

    updateCart();

    openCart();
  });
});

// ======================================
// ZMIANA ILOŚCI PRODUKTÓW
// ======================================

function changeQuantity(index, change) {
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}

// ======================================
// USUWANIE PRODUKTÓW
// ======================================

function removeProduct(index) {
  cart.splice(index, 1);

  updateCart();
}

// ======================================
// AKTUALIZACJA KOSZYKA
// ======================================

function updateCart() {
  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Twój koszyk jest pusty.</p>';
  }

  cart.forEach(function (item, index) {
    total += item.price * item.quantity;
    count += item.quantity;

    const product = document.createElement("div");

    product.classList.add("cart-item");

    product.innerHTML = `
            <img src="${item.image}" alt="">

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p class="cart-item-price">
                    ${(item.price * item.quantity).toFixed(2).replace(".", ",")} zł
                </p>

                <div class="quantity-controls">

                    <button data-action="decrease" data-index="${index}">−</button>

                    <span>${item.quantity}</span>

                    <button data-action="increase" data-index="${index}">+</button>

                </div>

                <button class="remove-item" data-action="remove" data-index="${index}">
                    Usuń produkt
                </button>

            </div>
        `;

    cartItems.appendChild(product);
  });

  cartCount.textContent = count;

  cartTotal.textContent = total.toFixed(2).replace(".", ",") + " zł";

  localStorage.setItem("cart", JSON.stringify(cart));
}

// ======================================
// OBSŁUGA PRZYCISKÓW W KOSZYKU
// ======================================

cartItems.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-action]");

  if (!button) return;

  const index = Number(button.dataset.index);
  const action = button.dataset.action;

  if (action === "increase") {
    changeQuantity(index, 1);
  }

  if (action === "decrease") {
    changeQuantity(index, -1);
  }

  if (action === "remove") {
    removeProduct(index);
  }
});

// ======================================
// WCZYTANIE KOSZYKA PO URUCHOMIENIU
// ======================================

updateCart();
