

// const displayCategory = () => {
//     const menuBar = document.getElementById('category-menu');
//     menuBar.style.display = "flex";

//     // console.log("hI");
// }


// const hideCategory = () => {
//     const menuBar = document.getElementById('category-menu');
//     menuBar.style.display = "none";

//     // console.log("hI");
// }
document.addEventListener("DOMContentLoaded", () => {
    // const searchInput = document.querySelector(".search-sort input");
    const products = document.querySelectorAll(".product");
    const categoryFilters = document.querySelectorAll("input[name='category']");
    const priceRange = document.querySelector("input[type='range']");
    // const inStockOnly = document.querySelector("input[type='checkbox']");
    const clearFiltersButton = document.querySelector(".shop-sidebar button");
    document.getElementById("priceRange").addEventListener("input", function () {
        document.getElementById("priceValue").textContent = this.value;
    });
    // searchInput.addEventListener("input", () => {
    //     const searchTerm = searchInput.value.toLowerCase();
    //     products.forEach(product => {
    //         const title = product.querySelector("h4").innerText.toLowerCase();
    //         const desc = product.querySelector("p").innerText.toLowerCase();
    //         product.style.display = title.includes(searchTerm) || desc.includes(searchTerm) ? "block" : "none";
    //     });
    // });


    
        const selectElement = document.querySelector(".sort-select");
        const productList = document.querySelector(".products");
    
        selectElement.addEventListener("change", function () {

            console.log(this.value);
            let products = Array.from(productList.getElementsByClassName("product"));
            
            products.sort((a, b) => {
                if (this.value === "Most Popular") {
                    return parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity);
                } else if (this.value === "Price Low-High") {
                    return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                } else if (this.value === "Price High-Low") {
                    return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                }
            });
    
            productList.innerHTML = "";
            products.forEach(product => productList.appendChild(product));
        });
    

    priceRange.addEventListener("input", () => {
        const maxPrice = parseInt(priceRange.value);
        products.forEach(product => {
            const price = parseInt(product.querySelector(".product-price").innerText);
            product.style.display = price <= maxPrice ? "block" : "none";
        });
    });

    // inStockOnly.addEventListener("change", () => {
    //     products.forEach(product => {
    //         product.style.display = inStockOnly.checked ? "block" : "none";
    //     });
    // });

    categoryFilters.forEach(radio => {
        radio.addEventListener("change", function () {
            let selectedCategory = this.value ? this.value : "all";
            document.querySelectorAll(".product").forEach(product => {
                if (selectedCategory === "all" || product.dataset.category === selectedCategory) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            });
        });
    });



    clearFiltersButton.addEventListener("click", () => {
        searchInput.value = "";
        priceRange.value = 10000;
        inStockOnly.checked = false;
        categoryFilters[0].checked = true;
        products.forEach(product => product.style.display = "block");
    });
});

let q = fetch('data.json')
    .then(res => res.json())
    .then(data => {

        data.forEach(element => {
            let productCard = document.createElement('div');
            let url = element.img1;
            let newPrice = element.new_price;
            let displayPrice = newPrice !== "" ? newPrice : element.old_price;
            let imgsrc = "https://lh3.googleusercontent.com/d/" + url;

            productCard.classList.add('product');
            productCard.id = element.id;
            productCard.dataset.category = element.cat;
            productCard.dataset.price = displayPrice;
            productCard.dataset.popularity = element.popularity;
            productCard.setAttribute('data-name', element.name);
            productCard.setAttribute('data-id', element.id);

            productCard.innerHTML = `
                <div> 
                    <div class="product-image-container"><img src="${imgsrc}" data-id="${element.id}" class="product-image" alt="Cat and Dog"
                    onclick="redirectToOrder(${element.id})"></div>
                    <p>${element.brand}<p>
                    <h4 class="product-name">${element.name}</h4>
                    <p>&#9733;&#9733;&#9733;&#9733;&#9733; (214)</p>
                    <p class="price-container">MRP: <del>&#8377;${element.old_price}</del><b>&#8377;<span class="product-price" style="font-family: system-ui; font-weight: 500;">${displayPrice}</span></b> | <span class="product-discount" style="font-family: system-ui; font-weight: 500; background-color: lightgreen; color: #fff; padding: 5px;" >10% OFF</span></p>
                </div>
                <div class="product-btn-container">
                    <button onclick="addToCart('${imgsrc}','${element.name}', ${displayPrice})">Add to Cart</button>

                </div>
            `;

            document.querySelector('.products').appendChild(productCard);
        });
    });


    
function redirectToOrder(productId) {
    window.location.href = `order.html?id=${productId}`;
}
