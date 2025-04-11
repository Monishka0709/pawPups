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
            let newPrice = element.mrp;
            let displayPrice = newPrice && newPrice !== "" ? newPrice : element.old_price;
            let imgsrc = "https://lh3.googleusercontent.com/d/" + url;

            card.classList.add('trending-card-item', 'swiper-slide');
            card.id = element.id;

            card.innerHTML = `
                <div class="trending-card-link" onclick="redirectToOrder(${element.sr_no})">
                    <div class="trending-card-imagecont">
                        <img class="trending-card-image" src="${imgsrc}" alt="${element.name}" onclick="redirectToOrder('${element.id}')">
                    </div>
                    <div class="trending-card-text">
                        <div class="trending-card-title">${element.title}</div>
                        <div class="trending-card-price">MRP: <del>&#8377;${element.mrp}</del><b>&#8377;<span class="product-price" style="font-family: system-ui; font-weight: 500;">${displayPrice}</span></b> | <span class="product-discount" style="font-family: system-ui; font-weight: 500; background-color: lightgreen; color: #fff; padding: 5px;" >10% OFF</span></div>
                        
                        
                    </div>
                    <button class="trending-card-button" onclick="addToCart('${element.sr_no}','${imgsrc}', '${element.title}', ${displayPrice})">ADD TO CART</button>
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

function redirectToOrder(productId) {
  window.location.href = `./order.html?id=${productId}`
}







const displayCategory = () =>{
   const menuBar = document.getElementById('category-menu');
   menuBar.style.display = "flex";

}


const hideCategory = () =>{
  const menuBar = document.getElementById('category-menu');
  menuBar.style.display = "none";
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

