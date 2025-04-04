document.addEventListener("DOMContentLoaded", function () {

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');


    if (productId) {
        fetch("./data.json")
            .then(response => response.json())
            .then(data => {
                const product = data.find(item => item.id == productId);
                const productDetails = document.getElementById("product-details")
                productDetails.setAttribute("data-cat", product.cat);
                // productDetails.setAttribute("data-subcat", product.sub-cat);
                if (product) {
                    document.getElementById("product-details").innerHTML = `
                        <div class="left-order-container" >
                            <div class="order-img-container">
                                <div class="primary-img-container">
                                    <img id="primary-image" src="https://lh3.googleusercontent.com/d/${product.img1}" alt="">
                                </div>
                                <div class="secondary-img-container" style="display: flex;">
                                    <img class="secondary-img" src="https://lh3.googleusercontent.com/d/${product.img2}" alt="">
                                    <img class="secondary-img" src="https://lh3.googleusercontent.com/d/${product.img3}" alt="">
                                    <img class="secondary-img" src="https://lh3.googleusercontent.com/d/${product.img4}" alt="">
                                    <img class="secondary-img" src="https://lh3.googleusercontent.com/d/${product.img5}" alt="">
                                    <img class="secondary-img" src="https://lh3.googleusercontent.com/d/${product.img6}" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="right-order-container">
                            <h2 class="order-heading">${product.name}</h2>
                            <p class="order-materials">${product.materials}</p>
                            <p>Price: <b>&#8377;${product.old_price}</b></p>
                            <button class="order-button" onclick="addToCart('https://lh3.googleusercontent.com/d/${product.img1}','${product.name}',${product.old_price})">Add to Cart</button>
                            <div class="tax">INCLUSIVE OF ALL TAXES</div>
                            <div class="order-rating">5star</div>
                            <div class="color"><b>Color:</b> ${product.color}</div>
                            <div class="gst">${product.gst}</div>
                            <div class="netwt"> <b>Net Weight:</b> ${product.net_weight} g</div>
                            <div class="dimensions"><b>Dimensions:</b> ${product.dimension} <br/> LxWxH: ${product.l}x${product.b}x${product.h}</div>
                            
                        </div>
                        <div style="width: 100%; height: 1px; background-color: #ccc; margin: 2rem 0 7rem 0; "></div>
                        <div class="bottom-container" style="display: flex; flex-direction: column; width: 100%;">
                            <h3 style="margin-bottom: 1rem; color: #fd663f;">Details</h3>
                            <p class="order-description">${product.description}</p>
                            <div class="case_pack"><b>Case Pack:</b> ${product.case_pack}</div>
                            
                            <div class="storage"><b>Storage:<b> ${product.storage}</div>
                            <div class="chew"><b>Chewing Style:</b> ${product.chwing_tyle}</div>
                            <div class="age"><b> Age Group:</b> ${product.age_group}</div>
                            <div class="weight"><b> Weight:</b> ${product.weight}</div>
                            <div class="size"><b>Pet Size:</b> ${product.pet_size}</div>
                            <div class="uv"> <b>UV Protection:</b> ${product.uv_protection}</div>
                            <div class="washing"> <b>Washing:</b> ${product.washing}</div>
                            

                        </div>

                       
                    `;

                    document.querySelectorAll('.secondary-img').forEach(img => {
img.addEventListener('click', function() {
let primaryImg = document.getElementById('primary-image');
let tempSrc = primaryImg.src;
primaryImg.src = this.src;
this.src = tempSrc;
});
});
                } else {
                    document.getElementById("product-details").innerHTML = "<p>Product not found.</p>";
                }
            })
            .catch(error => console.error("Error fetching product data:", error));
    } else {
        document.getElementById("product-details").innerHTML = "<p>Invalid product selection.</p>";
    }
});


const map = new Map();
let total = 0;

// Load cart from localStorage when the page loads
const loadCart = () => {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

  total = 0; // Reset total before recalculating

  savedCart.forEach(item => {
    map.set(item.name, item.quantity);
    total += item.price * item.quantity; // Correctly calculate total from saved items
    addToCartUI(item.img, item.name, item.price, item.quantity, false); // Prevent double saving
  });

  refreshTotalPrice();
};

// Function to save the cart to localStorage
const saveCart = () => {
  const cartArray = [];
  map.forEach((quantity, name) => {
    const itemElement = document.querySelector(`.cart-item[data-name="${name}"]`);
    if (itemElement) {
      const img = itemElement.querySelector("img")?.src || "";
      const price = parseFloat(itemElement.querySelector(".cart-item-price")?.innerText.replace("$", "")) || 0;

      cartArray.push({ img, name, price, quantity });
    }
  });

  localStorage.setItem("cart", JSON.stringify(cartArray));
};

// Function to update UI when adding an item
const addToCartUI = (img, name, price, quantity = 1, shouldSave = true) => {
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
    totalValue.innerHTML = '$' + total.toFixed(2);

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

    const itemValue = document.createElement('div');
    itemValue.classList.add('cart-item-value');

    const itemBox = document.createElement('div');
    itemBox.classList.add('cart-item-box');

    const itemNameBox = document.createElement('div');
    itemNameBox.classList.add('cart-name-box');

    const itemPrice = document.createElement('div');
    itemPrice.classList.add('cart-item-price');
    itemPrice.innerHTML = `$${price.toFixed(2)}`; // Ensure price is always displayed correctly

    const addBtn = document.createElement('button');
    addBtn.innerHTML = '+';
    addBtn.addEventListener('click', () => {
      total += price;
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

    item.appendChild(itemImg);
    item.appendChild(itemBox);

    offset.appendChild(item);
  }

  if (shouldSave) {
    saveCart();
  }
};

// Main function to add items to the cart
const addToCart = (img, name, price) => {
  console.log(name);
  total += price;
  map.set(name, (map.get(name) || 0) + 1);
  addToCartUI(img, name, price);
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



// const map = new Map();
// let total = 0;

// const addToCart = (img, name, price) => {
//   console.log(name);
//   const checkoutbtn = document.getElementById('checkout-btn');
//   if (checkoutbtn) {
//     checkoutbtn.style.display = 'block';
//   }
  
  
  
//   const refreshTotalPrice = () => {
//     const totalValue = document.querySelector('.total-value');
//     if (totalValue) {
//       totalValue.innerHTML = '$' + total.toFixed(2); 
//     }
//   };

  
//   const refreshTotalQuantity = (itemName) => {
//     const itemQuantity = document.querySelector(`.cart-item[data-name="${itemName}"] .cart-item-quantity`);
//     if (itemQuantity) {
//       itemQuantity.innerHTML = map.get(itemName);
//     }
//   };

  
//   const offset = document.getElementById('cart');
//   const checkcon = document.getElementById('checkout-container')
//   let totalTab = document.querySelector('.total-tab');
//   if (!totalTab) {
//     totalTab = document.createElement('div');
//     const totalText = document.createElement('div');
//     const totalValue = document.createElement('div');

//     totalTab.classList.add('total-tab');
//     totalText.classList.add('total-text');
//     totalValue.classList.add('total-value');

//     totalText.innerHTML = 'Total';
//     totalValue.innerHTML = '$' + total.toFixed(2); 

//     totalTab.appendChild(totalText);
//     totalTab.appendChild(totalValue);
//     totalTab.style.display = 'flex';
//     checkcon.appendChild(totalTab);
//   }

  
//   total += price; 
//   map.set(name, (map.get(name) || 0) + 1);

//   refreshTotalPrice(); 


  
//   const existingItem = document.querySelector(`.cart-item[data-name="${name}"]`);
//   if (existingItem) {
//     const itemQuantity = existingItem.querySelector('.cart-item-quantity');
//     itemQuantity.innerHTML = map.get(name);
//   } else {
    
//     const item = document.createElement('div');
//     item.classList.add('cart-item');
//     item.setAttribute('data-name', name);

//     const itemName = document.createElement('div');
//     itemName.classList.add('cart-item-name');
//     itemName.innerHTML = name;

//     const itemImg = document.createElement('div');
//     itemImg.classList.add('cart-item-img')
//     itemImg.innerHTML=`<img src="${img}" alt="${name}">`

//     const itemQuantity = document.createElement('div');
//     itemQuantity.classList.add('cart-item-quantity');
//     itemQuantity.innerHTML = map.get(name);

//     const itemValue = document.createElement('div');
//     itemValue.classList.add('cart-item-value');

//     const itemBox = document.createElement('div');
//     itemBox.classList.add('cart-item-box')


//     const itemNameBox = document.createElement('div');
//     itemNameBox.classList.add('cart-name-box')

    
//     const itemPrice = document.createElement('div');
//     itemPrice.classList.add('cart-item-price');
//     itemPrice.innerHTML = '$' + price.toFixed(2); 

//     const addBtn = document.createElement('button');
//     addBtn.innerHTML = '+';
//     addBtn.addEventListener('click', () => {
//       total += price;
//       map.set(name, (map.get(name) || 0) + 1);
//       refreshTotalPrice();
//       refreshTotalQuantity(name);
//     });
//     addBtn.classList.add('addbtn');

//     const removeBtn = document.createElement('button');
//     removeBtn.innerHTML = '-';
//     removeBtn.addEventListener('click', () => {
//       if (map.get(name) > 0) {
//         total -= price;
//         map.set(name, map.get(name) - 1);
//         if (total < 0) total = 0; 
//         refreshTotalPrice();
//         refreshTotalQuantity(name);
//       }
//       if (map.get(name) === 0) {
//         const itemToRemove = document.querySelector(`.cart-item[data-name="${name}"]`);
//         if (itemToRemove) {
//           itemToRemove.remove();
//           map.delete(name);
//         }
//       }
//     });
//     removeBtn.classList.add('removebtn');

//     itemValue.appendChild(addBtn);
//     itemValue.appendChild(itemQuantity);
//     itemValue.appendChild(removeBtn);
//     itemNameBox.appendChild(itemName);
//     itemNameBox.appendChild(itemPrice);
//     itemBox.appendChild(itemNameBox);
//     itemBox.appendChild(itemValue);
    
    
//     item.appendChild(itemImg);
//     item.appendChild(itemBox);

    
//     offset.appendChild(item);
//   }
//   console.log(map);

// };