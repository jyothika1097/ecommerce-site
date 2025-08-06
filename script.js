const cart = [];

document.querySelectorAll(".view-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const product = btn.closest(".product");

    const productData = {
      item_id: product.dataset.id,
      item_name: product.dataset.name,
      price: parseFloat(product.dataset.price),
      item_url: product.dataset.url,
      image_url: product.dataset.image
    };

    // DataLayer push for view_item
    window.dataLayer.push({
      event: "view_item",
      ecommerce: {
        items: [productData]
      }
    });

    alert(`Viewing: ${productData.item_name}`);
  });
});

document.querySelectorAll(".add-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const product = btn.closest(".product");

    const productData = {
      item_id: product.dataset.id,
      item_name: product.dataset.name,
      price: parseFloat(product.dataset.price),
      item_url: product.dataset.url,
      image_url: product.dataset.image
    };

    cart.push(productData);
    updateCartUI();

    // DataLayer push for add_to_cart
    window.dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        items: [productData]
      }
    });
  });
});

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const items = [...cart];
  const totalItems = items.length;
  const totalValue = items.reduce((sum, item) => sum + item.price, 0);

  // DataLayer push for begin_checkout
  window.dataLayer.push({
    event: "begin_checkout",
    ecommerce: {
      total_items: totalItems,
      total_value: totalValue,
      items: items
    }
  });

  alert(`Proceeding to checkout...\nTotal Items: ${totalItems}\nTotal Value: ₹${totalValue}`);
});

function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.item_name} - ₹${item.price}`;
    cartItems.appendChild(li);
  });
}
