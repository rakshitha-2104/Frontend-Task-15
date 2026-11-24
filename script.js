const products = [
    {
        id: 1,
        name: "Classic Cotton T-Shirt",
        category: "Fashion",
        price: 799,
        oldPrice: 999,
        rating: 4.8,
        badge: "Popular",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        id: 2,
        name: "Premium Wireless Headphones",
        category: "Electronics",
        price: 2499,
        oldPrice: 3299,
        rating: 4.7,
        badge: "Sale",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 3,
        name: "Sport Running Shoes",
        category: "Shoes",
        price: 1899,
        oldPrice: 2499,
        rating: 4.9,
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 4,
        name: "Smart Watch",
        category: "Electronics",
        price: 3499,
        oldPrice: 4499,
        rating: 4.6,
        badge: "New",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 5,
        name: "Elegant Handbag",
        category: "Accessories",
        price: 1599,
        oldPrice: 2199,
        rating: 4.5,
        badge: "Trending",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
    },
    {
        id: 6,
        name: "Smartphone",
        category: "Electronics",
        price: 14999,
        oldPrice: 17999,
        rating: 4.8,
        badge: "Popular",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    },
    {
        id: 7,
        name: "Casual Denim Jeans",
        category: "Fashion",
        price: 1299,
        oldPrice: 1699,
        rating: 4.6,
        badge: "Sale",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
    },
    {
        id: 8,
        name: "Minimalist Sunglasses",
        category: "Accessories",
        price: 899,
        oldPrice: 1199,
        rating: 4.4,
        badge: "New",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    },
    {
        id: 9,
        name: "Comfortable Backpack",
        category: "Accessories",
        price: 1199,
        oldPrice: 1599,
        rating: 4.7,
        badge: "Popular",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },
    {
        id: 10,
        name: "Modern Table Lamp",
        category: "Lifestyle",
        price: 999,
        oldPrice: 1399,
        rating: 4.5,
        badge: "Trending",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"
    },
     {
        id: 11,
        name: "Women's Stylish Jacket",
        category: "Fashion",
        price: 2299,
        oldPrice: 2999,
        rating: 4.8,
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=500"
    },
     {
        id: 12,
        name: "Classic White Sneakers",
        category: "Shoes",
        price: 2199,
        oldPrice: 2799,
        rating: 4.7,
        badge: "Popular",
        image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=500"
    }
];
const productsGrid = document.getElementById("productsGrid");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const subtotal = document.getElementById("subtotal");
const cartItemsText = document.getElementById("cartItemsText");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartEmpty = document.getElementById("cartEmpty");
const cartFooter = document.getElementById("cartFooter");
const searchInput = document.getElementById("searchInput");
const emptyProducts = document.getElementById("emptyProducts");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
let cart = JSON.parse(localStorage.getItem("novacart")) || [];
let wishlist = JSON.parse(localStorage.getItem("novacartWishlist")) || [];
let selectedCategory = "All";
function displayProducts(productList) {
    productsGrid.innerHTML = "";
    if (productList.length === 0) {
        emptyProducts.classList.remove("hidden");
        return;
    }
    emptyProducts.classList.add("hidden");
    productList.forEach(product => {
        const isLiked = wishlist.includes(product.id);
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-image-container">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                    loading="lazy"
                >

                <span class="product-badge">
                    ${product.badge}
                </span>

                <button
                    class="wishlist-button ${isLiked ? "liked" : ""}"
                    onclick="toggleWishlist(${product.id})"
                    aria-label="Add to wishlist"
                >
                    ${isLiked ? "♥" : "♡"}
                </button>

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <div class="product-rating">
                    ★★★★★
                    <span class="rating-number">
                        ${product.rating}
                    </span>
                </div>

                <div class="product-price">
                    ₹${product.price.toLocaleString("en-IN")}

                    <span class="old-price">
                        ₹${product.oldPrice.toLocaleString("en-IN")}
                    </span>
                </div>

                <button
                    class="add-cart-button"
                    onclick="addToCart(${product.id})"
                >
                    + Add to Cart
                </button>

            </div>
        `;
         productsGrid.appendChild(card);
     });
}
function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
            cart.push({
            ...product,
            quantity: 1
        });
    }
    saveCart();
    updateCart();
    showToast(`${product.name} added to cart!`);
}
function removeFromCart(productId) {
       cart = cart.filter(item => item.id !== productId);
       saveCart();
       updateCart();
       showToast("Product removed from cart");
}
function changeQuantity(productId, amount) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
     item.quantity += amount;
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    saveCart();
    updateCart();
}
function saveCart() {
     localStorage.setItem("novacart", JSON.stringify(cart));
}
function updateCart() {
cartItems.innerHTML = "";
    let totalItems = 0;
      let totalPrice = 0;
      cart.forEach(item => {
          totalItems += item.quantity;
          totalPrice += item.price * item.quantity;
          const cartItem = document.createElement("div");
          cartItem.className = "cart-item";
          cartItem.innerHTML = `
            <img
                src="${item.image}"
                alt="${item.name}"
            >
              <div class="cart-item-details">
                <h4>${item.name}</h4>
                  <p class="cart-item-price">
                    ₹${item.price.toLocaleString("en-IN")}
                </p>
                <div class="quantity-controls">
                  <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

                <button
                    class="remove-button"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>
        `;
            cartItems.appendChild(cartItem);
        });
    cartCount.textContent = totalItems;
    cartItemsText.textContent =
        `${totalItems} ${totalItems === 1 ? "item" : "items"}`;
        subtotal.textContent =
        `₹${totalPrice.toLocaleString("en-IN")}`;
        cartTotal.textContent =
        `₹${totalPrice.toLocaleString("en-IN")}`;
        if (cart.length === 0) {
        cartEmpty.classList.remove("hidden");
        cartFooter.classList.add("hidden");
     } else {
        cartEmpty.classList.add("hidden");
        cartFooter.classList.remove("hidden");
    }
}
function searchProducts() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const filteredProducts = products.filter(product => {
            const matchesSearch =
            product.name.toLowerCase().includes(searchValue) ||
            product.category.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;
            return matchesSearch && matchesCategory;
    });
    displayProducts(filteredProducts);
}
const categoryButtons = document.querySelectorAll(".category-btn");
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        selectedCategory = button.dataset.category;
        searchProducts();
    });
});
searchInput.addEventListener("input", searchProducts);
function toggleWishlist(productId) {

    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        showToast("Removed from wishlist");
    } else {
           wishlist.push(productId);
        showToast("Added to wishlist ❤️");
    }
    localStorage.setItem(
        "novacartWishlist",
        JSON.stringify(wishlist)
    );
    searchProducts();
}
document.getElementById("cartToggle").addEventListener("click", () => {
       cartSidebar.classList.add("open");
       cartOverlay.classList.add("open");
});
function closeCart() {
    cartSidebar.classList.remove("open");
    cartOverlay.classList.remove("open");
}
document.getElementById("closeCart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
document.getElementById("continueShopping").addEventListener("click", () => {
     closeCart();

});
let toastTimer;
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}
document.getElementById("checkoutButton").addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Your cart is empty!");
            return;
    }

    const total = cart.reduce((sum, item) => {

        return sum + item.price * item.quantity;

    }, 0);

    alert(
        `Thank you for shopping at NovaCart!\n\n` +
        `Total Amount: ₹${total.toLocaleString("en-IN")}\n\n` +
        `This is a demo checkout. No real payment was made.`
    );

});
displayProducts(products);
updateCart();