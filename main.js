new Swiper('.trending-card-wrapper', {
  direction: 'horizontal',
  
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

const mainSearch = document.getElementById('search')
const trendingProducts = document.querySelectorAll(".product");
mainSearch.addEventListener("input", () => {
  // const searchTerm = search.value.toLowerCase();
  // trendingProducts.forEach(product => {
  //     const title = product.querySelector("h4").innerText.toLowerCase();
  //     const desc = product.querySelector("p").innerText.toLowerCase();
  //     product.style.display = title.includes(searchTerm) || desc.includes(searchTerm) ? "block" : "none";
  // });
  console.log("clicked");
});

// window.addEventListener("load", () => {
//   autoSlide();
// })

// function autoSlide() {
//   setInterval(() => {
//      slide(getItemActiveIndex() + 1);
//   }, 3000); 
// }

// function slide(toIndex) {
//   const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
//   const itemActive = document.querySelector(".carousel_item__active");

//   // check if toIndex exceeds the number of carousel items
//   if (toIndex >= itemsArray.length) {
//      toIndex = 0;
//   }

//   const newItemActive = itemsArray[toIndex];

//   // start transition
//   newItemActive.classList.add("carousel_item__pos_next");
//   setTimeout(() => {
//      newItemActive.classList.add("carousel_item__next");
//      itemActive.classList.add("carousel_item__next");
//   }, 20);

//   // remove all transition class and switch active class
//   newItemActive.addEventListener("transitionend", () => {
//      itemActive.className = "carousel_item";
//      newItemActive.className = "carousel_item carousel_item__active";
//   }, {
//      once: true
//   });
// }

// function getItemActiveIndex() {
//   const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
//   const itemActive = document.querySelector(".carousel_item__active");
//   const itemActiveIndex = itemsArray.indexOf(itemActive);
//   return itemActiveIndex;
// }

let p = fetch('data.json')
    .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
    })
    .then(data => {
        if (!data || data.length === 0) {
            console.error("Error: No data found in 'data.json'");
            return;
        }

        let container = document.querySelector('.trending-card-list');
        if (!container) {
            console.error("Error: '.trending-card-list' container not found!");
            return;
        }

        data.forEach(element => {
            let card = document.createElement('div');
            let url = element.img1;
            let newPrice = element.new_price;
            let displayPrice = newPrice && newPrice !== "" ? newPrice : element.old_price;
            let imgsrc = "https://lh3.googleusercontent.com/d/" + url;

            card.classList.add('trending-card-item', 'swiper-slide');
            card.id = element.id;

            card.innerHTML = `
                <div class="trending-card-link" onclick="showOrder('${element.name}', '${displayPrice}', '${element.description}')">
                    <div class="trending-card-imagecont">
                        <img class="trending-card-image" src="${imgsrc}" alt="${element.name}" onclick="redirectToOrder('${element.id}')">
                    </div>
                    <div class="trending-card-text">
                        <div class="trending-card-title">${element.name}</div>
                        <div class="trending-card-price">MRP: <del>&#8377;${element.old_price}</del><b>&#8377;<span class="product-price" style="font-family: system-ui; font-weight: 500;">${displayPrice}</span></b> | <span class="product-discount" style="font-family: system-ui; font-weight: 500; background-color: lightgreen; color: #fff; padding: 5px;" >10% OFF</span></div>
                        
                        
                    </div>
                    <button class="trending-card-button" onclick="addToCart('${imgsrc}', '${element.name}', ${displayPrice})">ADD TO CART</button>
                </div>
            `;

            container.appendChild(card);
        });
    })
    .catch(error => console.error(`Fetch error: ${error.message}`));

    function redirectToOrder(productId) {
      window.location.href = `order.html?id=${productId}`;
  }

function subscribe() {
  let email = document.getElementById('email').value;
  if(email) {
      alert('Thank you for subscribing!');
      document.getElementById('email').value = '';
  } else {
      alert('Please enter a valid email address.');
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".like-btn").forEach(button => {
      button.addEventListener("click", function() {
          let count = this.querySelector("span");
          count.textContent = parseInt(count.textContent) + 1;
      });
  });
});








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






function headerOptionClick(e){
  e.preventDefault();
    const buttons = document.getElementsByClassName('header-menu-option');

    for (i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active-menu-option');
      }

      // switch()
      window.location.href=`shop.html`
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

