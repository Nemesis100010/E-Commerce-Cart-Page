document.addEventListener("DOMContentLoaded", ()=>{
    const cart = JSON.parse(localStorage.getItem("cart"))||[];
    const productList = document.getElementById('product-list')
    const cartItems = document.getElementById('cart-items')
    const emptyCartMessage = document.getElementById('empty-cart')
    const cartTotalMessage = document.getElementById('cart-total')
    const totalPriceDisplay = document.getElementById('total-price')
    const checkOutBtn = document.getElementById('checkout-btn')
    
    const products = [
        {id:1, name:"Product 1", price: 39.99},
        {id:2, name:"Product 2", price: 29.99},
        {id:3, name:"Product 3", price: 79.99},
    ];

    products.forEach( (product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to Cart</button>
        `
        productList.appendChild(productDiv);
    });
    
    productList.addEventListener('click', (e)=>{
        if (e.target.tagName==="BUTTON"){
        const productID = parseInt(e.target.getAttribute("data-id"));
        const product = products.find(p => p.id === productID)
        addToCart(product);
        }
    });

    function addToCart(product){
        cart.push(product);
        saveCartItems();
        renderCart();
    }
    function renderCart(){
        cartItems.innerHTML = "";
        let totalPrice = 0;
        if (cart.length > 0){
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");
            cart.forEach((item, index) => {
                const cartItem = document.createElement("div");
                cartItem.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button data-index="${index}">Remove</button>
                `
                cartItems.appendChild(cartItem);
                totalPrice += item.price;    
                totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`; 
            });           
        } else {
            emptyCartMessage.classList.remove("hidden");
            totalPriceDisplay.textContent = `$0.00`
        }
        cart.forEach((item, index) => {
            const removeBtn = cartItems.querySelector(`[data-index="${index}"]`);
            removeBtn.addEventListener('click', ()=>{
                cart.splice(index, 1);
                renderCart();
                saveCartItems();
            })
        });
    }
    checkOutBtn.addEventListener('click', ()=>{
        cart.length = 0;
        alert(`Your items checked out successfully !`);
        renderCart();
        saveCartItems();
    })

    renderCart();

    function saveCartItems(){
        localStorage.setItem("cart",JSON.stringify(cart))
    }
})