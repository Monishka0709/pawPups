new Swiper('.trending-card-wrapper', {
  direction: 'horizontal',
  loop: true,
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    425:{
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    
  }


})



window.addEventListener("load", () => {
  autoSlide();
})

function autoSlide() {
  setInterval(() => {
     slide(getItemActiveIndex() + 1);
  }, 3000); 
}

function slide(toIndex) {
  const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
  const itemActive = document.querySelector(".carousel_item__active");

  // check if toIndex exceeds the number of carousel items
  if (toIndex >= itemsArray.length) {
     toIndex = 0;
  }

  const newItemActive = itemsArray[toIndex];

  // start transition
  newItemActive.classList.add("carousel_item__pos_next");
  setTimeout(() => {
     newItemActive.classList.add("carousel_item__next");
     itemActive.classList.add("carousel_item__next");
  }, 20);

  // remove all transition class and switch active class
  newItemActive.addEventListener("transitionend", () => {
     itemActive.className = "carousel_item";
     newItemActive.className = "carousel_item carousel_item__active";
  }, {
     once: true
  });
}

function getItemActiveIndex() {
  const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
  const itemActive = document.querySelector(".carousel_item__active");
  const itemActiveIndex = itemsArray.indexOf(itemActive);
  return itemActiveIndex;
}


let p = fetch('data.json')
.then(res => res.json())
.then(data => {
  data.forEach(element => {
    let card = document.createElement('div');
    let url = element.img1;
    let newPrice = element.new_price;
    let dispayPrice = newPrice!="" ? newPrice : element.old_price;
    let imgsrc  = "https://lh3.googleusercontent.com/d/" + url;
    card.classList.add('trending-card-item');
    card.classList.add('swiper-slide');
    card.id = element.id;
  
    card.innerHTML = `
    <div class="trending-card-link" onclick="showOrder('${element.name}','${element.price}','${element.description}')">
    <div class="trending-card-imagecont">
    <img class="trending-card-image" src="${imgsrc}" alt="${element.name}">
    </div>
    <div class="trending-card-text">
    <div class="trending-card-price"> &#8377 ${dispayPrice}</div>
    <div class="trending-card-title">${element.name}</div>
   
    <button class="trending-card-button" onclick="addToCart('${element.name}', ${dispayPrice})">ADD TO CART</button>
  </div>
    `;
    document.querySelector('.trending-card-list').appendChild(card);
  });
  
})


const displayCategory = () =>{
   const menuBar = document.getElementById('category-menu');
   menuBar.style.display = "flex";

  // console.log("hI");
}


const hideCategory = () =>{
  const menuBar = document.getElementById('category-menu');
  menuBar.style.display = "none";

 // console.log("hI");
}




const showOrder = (name, price, desc) =>{
  console.log(name);
  console.log(price);
  console.log(desc);

}








const map = new Map();
let total = 0;

const addToCart = (name, price) => {
  
  const checkoutbtn = document.getElementById('checkout-btn');
  if (checkoutbtn) {
    checkoutbtn.style.display = 'block';
  }
  
  
  
  const refreshTotalPrice = () => {
    const totalValue = document.querySelector('.total-value');
    if (totalValue) {
      totalValue.innerHTML = '$' + total.toFixed(2); 
    }
  };

  
  const refreshTotalQuantity = (itemName) => {
    const itemQuantity = document.querySelector(`.cart-item[data-name="${itemName}"] .cart-item-quantity`);
    if (itemQuantity) {
      itemQuantity.innerHTML = map.get(itemName);
    }
  };

  
  const offset = document.getElementById('cart');
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
    offset.appendChild(totalTab);
  }

  
  total += price; 
  map.set(name, (map.get(name) || 0) + 1);

  refreshTotalPrice(); 


  
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

    const itemQuantity = document.createElement('div');
    itemQuantity.classList.add('cart-item-quantity');
    itemQuantity.innerHTML = map.get(name);

    const itemValue = document.createElement('div');
    itemValue.classList.add('cart-item-value');

    const itemPrice = document.createElement('div');
    itemPrice.classList.add('cart-item-price');
    itemPrice.innerHTML = '$' + price.toFixed(2); 

    const addBtn = document.createElement('button');
    addBtn.innerHTML = '+';
    addBtn.addEventListener('click', () => {
      total += price;
      map.set(name, (map.get(name) || 0) + 1);
      refreshTotalPrice();
      refreshTotalQuantity(name);
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
      }
      if (map.get(name) === 0) {
        const itemToRemove = document.querySelector(`.cart-item[data-name="${name}"]`);
        if (itemToRemove) {
          itemToRemove.remove();
          map.delete(name);
        }
      }
    });
    removeBtn.classList.add('removebtn');

    itemValue.appendChild(addBtn);
    itemValue.appendChild(itemPrice);
    itemValue.appendChild(removeBtn);
    item.appendChild(itemName);
    item.appendChild(itemQuantity);
    item.appendChild(itemValue);
    offset.appendChild(item);
  }
  console.log(map);

};
function headerOptionClick(e){
  e.preventDefault();
    const buttons = document.getElementsByClassName('header-menu-option');

    for (i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active-menu-option');
      }


    e.currentTarget.classList.add('active-menu-option');
}

function trendingButtonClick(e) {
    e.preventDefault();
    const buttons = document.getElementsByClassName('trending-link-button');

    for (i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
      }


    e.currentTarget.classList.add('active');
    

    const cards = document.getElementsByClassName('trending-card-item');

    // for (i = 0; i < cards.length; i++) {
    //     c
    // }
    

}



const observer = new IntersectionObserver(entries => {  
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    })
})


const observer2 = new IntersectionObserver(entries => {  
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('show-right');
      } else {
          entry.target.classList.remove('show-right');
      }
  })
})

const observer3 = new IntersectionObserver(entries => {  
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('show-up');
      } else {
          entry.target.classList.remove('show-up');
      }
  })
})

const observer4 = new IntersectionObserver(entries => {  
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('show-down');
      } else {
          entry.target.classList.remove('show-down');
      }
  })
})

const hiddenElement = document.querySelectorAll('.hidden');
const hiddenElement2 = document.querySelectorAll('.hidden-right');
const hiddenElement3 = document.querySelectorAll('.hidden-up');
const hiddenElement4 = document.querySelectorAll('.hidden-down');
hiddenElement.forEach(el => observer.observe(el));
hiddenElement2.forEach(el => observer2.observe(el));
hiddenElement3.forEach(el => observer3.observe(el));
hiddenElement4.forEach(el => observer4.observe(el));

