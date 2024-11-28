// ===========================
// Seletores Principais
// ===========================
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const closeModalBtn = document.getElementById("close-modal-btn");
const menu = document.querySelector(".menu");
const cartBtn = document.getElementById("cart-btn");
const cartCount = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const checkoutBtn = document.getElementById("checkout-btn");
const customerNameInput = document.getElementById("customer-name");
const paymentProofInput = document.getElementById("payment-proof");
const paymentInfo = document.getElementById("payment-info");
const pixInfo = document.getElementById("pix-info");
const copyPixBtn = document.getElementById("copy-pix-btn");
const pixKey = document.getElementById("pix-key");

// ===========================
// Estado do Carrinho
// ===========================
let cart = []; // Array que armazena os itens adicionados ao carrinho

// ===========================
// Exibição do Modal do Carrinho
// ===========================
cartBtn.addEventListener("click", () => {
  cartModal.classList.add("active");
  cartModal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  cartModal.classList.remove("active");
  cartModal.style.display = "none";
});

// ===========================
// Adicionar Item ao Carrinho
// ===========================
menu.addEventListener("click", (event) => {
  const parentButton = event.target.closest(".add-to-cart-btn");
  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));
    const imageSrc = parentButton.querySelector("img").getAttribute("src");
    addToCart(name, price, imageSrc);
  }
});

function addToCart(name, price, imageSrc) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1, imageSrc });
  }

  updateCartModal();
}

// =================================
// Atualização do Modal do Carrinho
// =================================
function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");

    cartItemElement.innerHTML = `
      <img src="${item.imageSrc}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <p><strong>Produto:</strong> ${item.name}</p>
        <p><strong>Quantidade:</strong> ${item.quantity}</p>
        <p><strong>Preço:</strong> R$ ${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <button class="remove-from-cart-btn" data-index="${index}">
        <i class="fas fa-trash-alt"></i> Remover
      </button>
    `;

    cartItemsContainer.appendChild(cartItemElement);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `R$ ${total.toFixed(2)}`;
  updateCartCount();
}

// ===========================
// Remover Item do Carrinho
// ===========================
cartItemsContainer.addEventListener("click", (event) => {
  if (event.target.closest(".remove-from-cart-btn")) {
    const index = parseInt(event.target.closest(".remove-from-cart-btn").getAttribute("data-index"));
    cart.splice(index, 1);
    updateCartModal();
  }
});

// ===========================
// Finalizar Compra
// ===========================
checkoutBtn.addEventListener("click", () => {
  const name = customerNameInput.value.trim();
  const address = addressInput.value.trim();
  const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
  const total = cartTotal.textContent;

  if (!name || !address || !paymentMethod) {
    alert("Por favor, preencha todas as informações.");
    return;
  }

  const cartItems = cart
    .map(
      (item) =>
        `${item.name} - Quantidade: ${item.quantity} - Preço: R$ ${(item.price * item.quantity).toFixed(2)}`
    )
    .join("\n");

  let message = `Olá, segue o pedido:\n\n` +
    `Nome: ${name}\n` +
    `Endereço: ${address}\n` +
    `Forma de Pagamento: ${paymentMethod}\n` +
    `Total: ${total}\n\n` +
    `Produtos:\n${cartItems}\n`;

  if (paymentMethod === "PIX") {
    alert("Você selecionou PIX como forma de pagamento. Por favor, envie o comprovante manualmente na conversa do WhatsApp após abrir o link.");
    message += "\nPor favor, envie o comprovante de pagamento nesta conversa.";
  }

  const whatsappLink = `https://wa.me/67996123728?text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, "_blank");

  cart = [];
  addressInput.value = "";
  customerNameInput.value = "";
  updateCartModal();
});

// ===========================
// Atualizar Contador do Carrinho
// ===========================
function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = count;
}

// ===========================
// Forma de Pagamento - PIX
// ===========================
copyPixBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(pixKey.textContent).then(() => {
    alert("Chave Pix copiada para a área de transferência!");
  }).catch(() => {
    alert("Falha ao copiar a chave Pix. Por favor, copie manualmente.");
  });
});

document.querySelectorAll('input[name="payment"]').forEach((radio) => {
  radio.addEventListener("change", handlePaymentMethodChange);
});

function handlePaymentMethodChange() {
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

  if (paymentMethod === "pix") {
    pixInfo.classList.remove("hidden");
  } else {
    pixInfo.classList.add("hidden");
  }
}














// ===========================
// <!-- CARROSSEL -->
// ===========================


document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const carouselImages = document.querySelector(".carousel-images");
  const images = document.querySelectorAll(".carousel-image");

  let currentIndex = 0;

  const updateCarousel = () => {
      const offset = -currentIndex * 100; // Move para a próxima imagem (100% por imagem)
      carouselImages.style.transform = `translateX(${offset}%)`;
  };

  prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length; // Vai para a imagem anterior
      updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length; // Vai para a próxima imagem
      updateCarousel();
  });

  // Inicializa o carrossel
  updateCarousel();
});

















// ======================================================
// <!-- Selecionar pizzas de acordo com o tamanho  -->
// ======================================================

// Inicialização global do tamanho e multiplicador padrão
let selectedPizzaSize = "Média"; // Valor inicial
let selectedSizeMultiplier = 1.25; // Multiplicador inicial

// Função para selecionar o tamanho da pizza
function selectPizza(fatias, sabores) {
  const sizeMap = {
    4: { name: "Pequena", multiplier: 1.0 },
    6: { name: "Média", multiplier: 1.25 },
    8: { name: "Grande", multiplier: 1.5 },
    12: { name: "Família", multiplier: 2.0 },
  };

  // Verifica se o tamanho existe no mapeamento
  if (sizeMap[fatias]) {
    const selectedSize = sizeMap[fatias];
    selectedPizzaSize = selectedSize.name;
    selectedSizeMultiplier = selectedSize.multiplier;

    // Atualizar os preços no menu
    const menuPrices = document.querySelectorAll(".menu-price");
    menuPrices.forEach((priceElement) => {
      const basePrice = parseFloat(priceElement.dataset.basePrice) || 0;
      const newPrice = (basePrice * selectedSizeMultiplier).toFixed(2);
      priceElement.textContent = `R$ ${newPrice}`;
      priceElement.dataset.price = newPrice; // Atualiza o preço no botão
    });

    alert(`Você selecionou uma pizza ${selectedPizzaSize} (${fatias} fatias, até ${sabores} sabores).`);
  } else {
    console.error("Tamanho de pizza inválido selecionado.");
  }
}

// Função para adicionar ao carrinho
function addToCart(name, basePrice, imageSrc) {
  // Certifique-se de que o basePrice seja numérico
  const price = (parseFloat(basePrice) * selectedSizeMultiplier).toFixed(2);

  const existingItem = cart.find(
    (item) => item.name === name && item.size === selectedPizzaSize
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      size: selectedPizzaSize,
      price: parseFloat(price),
      quantity: 1,
      imageSrc,
    });
  }

  updateCartModal();
}

// Atualização do modal do carrinho
function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");

    cartItemElement.innerHTML = `
      <img src="${item.imageSrc}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <p><strong>Produto:</strong> ${item.name} (${item.size})</p>
        <p><strong>Quantidade:</strong> ${item.quantity}</p>
        <p><strong>Preço:</strong> R$ ${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <button class="remove-from-cart-btn" data-index="${index}">
        <i class="fas fa-trash-alt"></i> Remover
      </button>
    `;

    cartItemsContainer.appendChild(cartItemElement);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `R$ ${total.toFixed(2)}`;
  updateCartCount();
}




// Inicialize os preços padrão ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  selectPizza(6, 2); // Por padrão, "Média" com 6 fatias e 2 sabores
});









// ===========================
// Função para Notificar Usuário
// ===========================
function notifyPendingCart() {
  if (cart.length > 0) {
    alert("Você tem itens no carrinho! Não esqueça de finalizar sua compra.");
  }
}

// ===========================
// Iniciar Notificação Repetitiva
// ===========================
function startCartNotification() {
  setInterval(() => {
    if (cart.length > 0 && !document.body.classList.contains("checkout-in-progress")) {
      notifyPendingCart();
    }
  }, 60000); // 60.000 ms = 1 segundos
}

// ===========================
// Marcar Checkout em Progresso
// ===========================
checkoutBtn.addEventListener("click", () => {
  document.body.classList.add("checkout-in-progress");
  setTimeout(() => document.body.classList.remove("checkout-in-progress"), 300000); // Remove após 5 minutos
});

// ===========================
// Inicializar ao Carregar Página
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  startCartNotification(); // Ativa a notificação ao carregar a página
});







// ===========================
// Adicionar Sugestões no Checkout
// ===========================
checkoutBtn.addEventListener("click", () => {
  // Mostrar modal de sugestões se for a primeira vez clicando
  if (!document.body.classList.contains("suggestions-shown")) {
    showSuggestionsModal();
    document.body.classList.add("suggestions-shown");
    return;
  }

  // Prosseguir com a finalização do pedido
  finalizeOrder();
});

function showSuggestionsModal() {
  const suggestionsModal = document.createElement("div");
  suggestionsModal.classList.add("modal", "suggestions-modal");

  suggestionsModal.innerHTML = `
    <div class="modal-content">
      <h2>Gostaria de adicionar algo mais ao seu pedido?</h2>
      <div class="suggestions-options">
        <label>
          <input type="checkbox" id="stuffed-crust" data-price="5.00">
          Borda Recheada (+ R$ 5,00)
        </label>
        <label>
          <input type="checkbox" id="extra-cheese" data-price="3.00">
          Queijo Ralado (+ R$ 3,00)
        </label>
        <label>
          <input type="checkbox" id="drink" data-price="7.00">
          Bebida (+ R$ 7,00)
        </label>
      </div>
      <div class="modal-actions">
        <button id="close-suggestions-btn">Fechar</button>
        <button id="confirm-suggestions-btn">Confirmar e Finalizar</button>
      </div>
    </div>
  `;

  document.body.appendChild(suggestionsModal);

  // Fechar modal de sugestões
  document.getElementById("close-suggestions-btn").addEventListener("click", () => {
    suggestionsModal.remove();
  });

  // Confirmar sugestões e prosseguir com o pedido
  document.getElementById("confirm-suggestions-btn").addEventListener("click", () => {
    applySuggestions();
    suggestionsModal.remove();
    finalizeOrder();
  });
}

function applySuggestions() {
  const stuffedCrust = document.getElementById("stuffed-crust");
  const extraCheese = document.getElementById("extra-cheese");
  const drink = document.getElementById("drink");

  let additionalTotal = 0;

  if (stuffedCrust.checked) {
    additionalTotal += parseFloat(stuffedCrust.dataset.price);
  }
  if (extraCheese.checked) {
    additionalTotal += parseFloat(extraCheese.dataset.price);
  }
  if (drink.checked) {
    additionalTotal += parseFloat(drink.dataset.price);
  }

  if (additionalTotal > 0) {
    const currentTotal = parseFloat(cartTotal.textContent.replace("R$", "").replace(",", "."));
    const newTotal = currentTotal + additionalTotal;
    cartTotal.textContent = `R$ ${newTotal.toFixed(2)}`;
  }
}

function finalizeOrder() {
  const name = customerNameInput.value.trim();
  const address = addressInput.value.trim();
  const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
  const total = cartTotal.textContent;

  if (!name || !address || !paymentMethod) {
    alert("Por favor, preencha todas as informações.");
    return;
  }

  const cartItems = cart
    .map(
      (item) =>
        `${item.name} (${item.size}) - Quantidade: ${item.quantity} - Preço: R$ ${(item.price * item.quantity).toFixed(2)}`
    )
    .join("\n");

  let message = `Olá, segue o pedido:\n\n` +
    `Nome: ${name}\n` +
    `Endereço: ${address}\n` +
    `Forma de Pagamento: ${paymentMethod}\n` +
    `Total: ${total}\n\n` +
    `Produtos:\n${cartItems}\n`;

  if (paymentMethod === "PIX") {
    alert("Você selecionou PIX como forma de pagamento. Por favor, envie o comprovante manualmente na conversa do WhatsApp após abrir o link.");
    message += "\nPor favor, envie o comprovante de pagamento nesta conversa.";
  }

  const whatsappLink = `https://wa.me/67996123728?text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, "_blank");

  // Resetar carrinho e formulário
  cart = [];
  addressInput.value = "";
  customerNameInput.value = "";
  updateCartModal();
}








document.getElementById('checkout-btn').addEventListener('click', () => {
  const suggestions = document.getElementById('suggestions');
  suggestions.style.display = 'block';
});

function addSuggestion(item, price) {
  const cartItems = document.getElementById('cart-items');
  const newItem = document.createElement('p');
  newItem.textContent = `${item} - R$ ${price.toFixed(2)}`;
  cartItems.appendChild(newItem);

  const total = parseFloat(document.getElementById('cart-total').textContent.replace('R$', '').trim());
  document.getElementById('cart-total').textContent = `R$ ${(total + price).toFixed(2)}`;
}

document.getElementById('close-modal-btn').addEventListener('click', () => {
  const suggestions = document.getElementById('suggestions');
  suggestions.style.display = 'none';
});
