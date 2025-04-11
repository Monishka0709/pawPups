document.addEventListener("DOMContentLoaded", function () {
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    


    if (productId) {
        fetch("data.json")
            .then(response => response.json())
            .then(data => { 
              
            
                const product = data.find(item => item.sr_no == productId);
                console.log(product);
                const productDetails = document.getElementById("product-details")
                productDetails.setAttribute("data-category", product.category);
                productDetails.setAttribute("series", product.Series);
                productDetails.setAttribute("data-id", product.sr_no);
                productDetails.setAttribute("data-parent-category", product.parent_category);
                productDetails.setAttribute("data-brand", product.Brand);
                productDetails.setAttribute("data-name", product.title);
                productDetails.setAttribute("data-subcategory", product.sub_category);


                  const quantityElement = document.querySelector(".order-item-quantity");
                  const incrementButton = document.querySelector(".quantity-button:last-of-type");
                  const decrementButton = document.querySelector(".quantity-button:first-of-type");
              
                  let quantity = parseInt(quantityElement.textContent, 10);
              
                  incrementButton.addEventListener("click", function () {
                      quantity++;
                      quantityElement.textContent = quantity;
                  });
              
                  decrementButton.addEventListener("click", function () {
                      if (quantity > 1) {
                          quantity--;
                          quantityElement.textContent = quantity;
                      }
                  });
              



                if (product) {

                    if (product.img1 && product.img1!="") {
                      document.getElementById("primary-order-img-container").innerHTML = `
                      <img id="primary-image" src="https://lh3.googleusercontent.com/d/${product.img1}" alt="">`

                    }
                    if (product.img2 && product.img2!="") {
                      const img2 = document.createElement('img');
                      img2.classList.add('secondary-img');
                      img2.src = `https://lh3.googleusercontent.com/d/${product.img2}`;
                      document.getElementById("secondary-order-img-container").appendChild(img2); 
                      

                    }
                    if (product.img3 && product.img3!="") {
                      const img3 = document.createElement('img');
                      img3.classList.add('secondary-img');
                      img3.src = `https://lh3.googleusercontent.com/d/${product.img3}`;
                      document.getElementById("secondary-order-img-container").appendChild(img3); 
                      

                    }
                    if (product.img4 && product.img4!="") {
                      const img4 = document.createElement('img');
                      img4.classList.add('secondary-img');
                      img4.src = `https://lh3.googleusercontent.com/d/${product.img4}`;
                      document.getElementById("secondary-order-img-container").appendChild(img4); 
                      

                    }
                    if (product.img5 && product.img5!="") {
                      const img5 = document.createElement('img');
                      img5.classList.add('secondary-img');
                      img5.src = `https://lh3.googleusercontent.com/d/${product.img5}`;
                      document.getElementById("secondary-order-img-container").appendChild(img5); 
                      

                    }
                    if (product.img6 && product.img6!="") {
                      const img6 = document.createElement('img');
                      img6.classList.add('secondary-img');
                      img6.src = `https://lh3.googleusercontent.com/d/${product.img6}`;
                      document.getElementById("secondary-order-img-container").appendChild(img6); 
                      
                    }
                    if (product.img7 && product.img7!="") {
                      const img7 = document.createElement('img');
                      img7.classList.add('secondary-img');
                      img7.src = `https://lh3.googleusercontent.com/d/${product.img7}`;
                      document.getElementById("secondary-order-img-container").appendChild(img7); 
                      
                      
                    }
                    if(product.final_title){
                      const title = product.final_title!= ""? product.final_title : product.title;

                      document.getElementById('order-heading').innerHTML = `${title}`
                    }
                    if(product.mrp && product.mrp!="") {
                      document.getElementById('order-mrp-container').innerHTML = `&#8377;${product.mrp}`;
                    }
                    if(product.remark) {
                      if(product.remark == "Active")
                      {
                        document.getElementById('order-button-container').innerHTML = `
                        <button class="order-button" onclick="addToCart('https://lh3.googleusercontent.com/d/${product.img1}','${product.title}',${product.mrp})">Add to Cart</button>
                        `;
                      }
                      else{
                        document.getElementById('order-button-container').innerHTML = `
                        <button class="order-button" style="background-color:grey;">Out Of Stock</button>
                        `;
                      }
                    }
                    if(product.old_gst) {
                      let gst = product.new_gst!= ""? product.new_gst : product.old_gst;
                      document.getElementById('order-gst-container').innerHTML = `<b>GST:</b>${gst}`

                    }
                    if(product.net_weight) {
                      let weight = product.net_weight!= ""? product.net_weight : product.gross_weight;
                      document.getElementById('order-net-weight').innerHTML = ` <b>Net Weight:</b> ${weight} g`

                    }
                    
                    //DETAILS SECTION

                    
                    if(product.material && product.material != "") {
                      let materialDiv = document.createElement('div');
                      materialDiv.innerHTML = `<b>Material:</b> ${product.material}`
                      document.getElementById('order-bottom-container').appendChild(materialDiv);
                    }
                    if(product.Features1 && product.Features1 != "") {
                      let li = document.createElement('li');
                      li.innerHTML = `${product.Features1}`
                      document.getElementById('features-list').appendChild(li)
                    }
                    if(product.Features2 && product.Features2 != "") {
                      let li = document.createElement('li');
                      li.innerHTML = `${product.Features2}`
                      document.getElementById('features-list').appendChild(li)
                    }
                    if(product.Features3 && product.Features3 != "") {
                      let li = document.createElement('li');
                      li.innerHTML = `${product.Features3}`
                      document.getElementById('features-list').appendChild(li)
                    }
                    if(product.Features4 && product.Features4 != "") {
                      let li = document.createElement('li');
                      li.innerHTML = `${product.Features4}`
                      document.getElementById('features-list').appendChild(li)
                    }
                    if(product.Features5 && product.Features5 != "") {
                      let li = document.createElement('li');
                      li.innerHTML = `${product.Features5}`
                      document.getElementById('features-list').appendChild(li)
                    }
                    if(product.Features6 && product.Features6 != "") {
                      let li = document.createElement('li');
                      li.innerHTML = `${product.Features6}`
                      document.getElementById('features-list').appendChild(li)
                    }
                    if(product.Features7 && product.Features7 != "") {
                      let li = document.createElement('li');
                      li.innerHTML = `${product.Features7}`
                      document.getElementById('features-list').appendChild(li)
                    }

                    

                    
                    
                    

                    document.querySelectorAll('.secondary-img').forEach(img => {
                     img.addEventListener('click', function() {
                     let primaryImg = document.getElementById('primary-image');
                     let tempSrc = primaryImg.src;
                     primaryImg.src = this.src;
                     this.src = tempSrc;
                    });
});
                } 
                else {
                    document.getElementById("product-details").innerHTML = "<p>Product not found.</p>";
                }
                
            })
            .catch(error => console.error("Error fetching product data:", error));
    } 
else {
        document.getElementById("product-details").innerHTML = "<p>Invalid product selection.</p>";
    }
});


const map = new Map();
let total = 0;
let count = 0;


// Load cart from localStorage when the page loads
const loadCart = () => {

  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(savedCart);
  
  // count = parseInt(localStorage.getItem("cardCount")) || 0;
  count = savedCart.length || 0;

  total = 0; // Reset total before recalculating

  savedCart.forEach(item => {
    map.set(item.name, item.quantity);
    total += item.price * item.quantity;
    addToCartUI(item.id, item.img, item.name, item.price, item.quantity, false); // use ID
  });

  updateDynamicContent(count);
  refreshTotalPrice();
};

// Function to save the cart to localStorage
const saveCart = () => {

  const cartArray = [];

  map.forEach((quantity, name) => {
    const itemElement = document.querySelector(`.cart-item[data-name="${name}"]`);
    if (itemElement) {
      const id = itemElement.id || ""; // <-- get the id
      const img = itemElement.querySelector("img")?.src || "";
      const price = parseFloat(itemElement.querySelector(".cart-item-price")?.innerHTML.replace("₹", "")) || 0;
      const total = price*quantity;
      const discount = parseFloat(itemElement.querySelector(".cart-item-discount")?.innerHTML.replace("₹", "")) || 0;;
      cartArray.push({ id, img, name, price, quantity, discount, total });
    }
  });

  localStorage.setItem("cart", JSON.stringify(cartArray));
  localStorage.setItem("cardCount", count);
};

// Function to update UI when adding an item
const addToCartUI = (id, img, name, price, quantity = 1, shouldSave = true) => {
  const checkoutbtn = document.getElementById('checkout-btn');
  if (checkoutbtn) checkoutbtn.style.display = 'block';

  const refreshTotalQuantity = (itemName) => {
    const itemQuantity = document.querySelector(`.cart-item[data-name="${itemName}"] .cart-item-quantity`);
    if (itemQuantity) itemQuantity.innerHTML = map.get(itemName);
  };

  const offset = document.getElementById('cart');
  const checkcon = document.getElementById('checkout-container');
  let totalTab = document.querySelector('.total-tab');

  if (!totalTab) {
    totalTab = document.createElement('div');
    const totalText = document.createElement('div');
    const totalValue = document.createElement('div');

    totalTab.classList.add('total-tab');
    totalText.classList.add('total-text');
    totalValue.classList.add('total-value');

    totalText.innerHTML = 'Total';
    totalValue.innerHTML = '₹' + total.toFixed(2);

    totalTab.appendChild(totalText);
    totalTab.appendChild(totalValue);
    totalTab.style.display = 'flex';
    checkcon.appendChild(totalTab);
  }

  const existingItem = document.querySelector(`.cart-item[data-name="${name}"]`);
  if (existingItem) {
    const itemQuantity = existingItem.querySelector('.cart-item-quantity');
    itemQuantity.innerHTML = map.get(name);
  } else {
    const item = document.createElement('div');
    item.classList.add('cart-item');
    item.setAttribute('data-name', name);

    const itemName = document.createElement('div');
    itemName.classList.add('cart-item-name');
    itemName.innerHTML = name;

    const itemImg = document.createElement('div');
    itemImg.classList.add('cart-item-img');
    itemImg.innerHTML = `<img src="${img}" alt="${name}">`;

    const itemQuantity = document.createElement('div');
    itemQuantity.classList.add('cart-item-quantity');
    itemQuantity.innerHTML = quantity;

    const itemDiscount = document.createElement('div');
    itemDiscount.classList.add('cart-item-discount');

    const itemValue = document.createElement('div');
    itemValue.classList.add('cart-item-value');

    const itemBox = document.createElement('div');
    itemBox.classList.add('cart-item-box');

    const itemNameBox = document.createElement('div');
    itemNameBox.classList.add('cart-name-box');

    const itemPrice = document.createElement('div');
    itemPrice.classList.add('cart-item-price');
    itemPrice.innerHTML = '₹' +`${price.toFixed(2)}`; // Ensure price is always displayed correctly

    const addBtn = document.createElement('button');
    addBtn.innerHTML = '+';
    addBtn.addEventListener('click', () => {
      total += price;
      ++count;
      updateDynamicContent(count);
      map.set(name, (map.get(name) || 0) + 1);
      refreshTotalPrice();
      refreshTotalQuantity(name);
      saveCart();
    });
    addBtn.classList.add('addbtn');

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '-';
    removeBtn.addEventListener('click', () => {
      if (map.get(name) > 0) {
        total -= price;
        --count;
        updateDynamicContent(count);
        map.set(name, map.get(name) - 1);
        if (total < 0) total = 0;
        refreshTotalPrice();
        refreshTotalQuantity(name);
        saveCart();
      }
      if (map.get(name) === 0) {
        const itemToRemove = document.querySelector(`.cart-item[data-name="${name}"]`);
        if (itemToRemove) {
          itemToRemove.remove();
          map.delete(name);
          saveCart();
        }
      }
    });
    removeBtn.classList.add('removebtn');

    itemValue.appendChild(addBtn);
    itemValue.appendChild(itemQuantity);
    itemValue.appendChild(removeBtn);
    itemNameBox.appendChild(itemName);
    itemNameBox.appendChild(itemPrice);
    itemBox.appendChild(itemNameBox);
    itemBox.appendChild(itemValue);

    item.id = id;
    item.appendChild(itemImg);
    item.appendChild(itemBox);

    offset.appendChild(item);
  }

  if (shouldSave) {
    saveCart();
  }
};

// Main function to add items to the cart
const addToCart = (id, img, name, price, quantity = 1) => {
  const currentQuantity = map.get(name) || 0; // Get existing quantity
  const newQuantity = currentQuantity + quantity; // Increment quantity properly
  
  total += price * quantity;
  ++count;
  
  map.set(name, newQuantity); // Update with the incremented quantity
  updateDynamicContent(count);
  addToCartUI(id, img, name, price, newQuantity); // Pass the correct quantity
  refreshTotalPrice();
  
  saveCart();
};

// Function to refresh total price
const refreshTotalPrice = () => {
  const totalValue = document.querySelector('.total-value');
  if (totalValue) totalValue.innerHTML = '$' + total.toFixed(2);
};

// Load cart when the page loads
document.addEventListener("DOMContentLoaded", loadCart);

const cartItemValue = document.querySelector('.cart-i-element');

function updateDynamicContent(newContent) {
  cartItemValue.style.setProperty('--dynamic-content', `"${newContent}"`); // Note the double quotes
}



