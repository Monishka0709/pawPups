

const displayCategory = () => {
    const menuBar = document.getElementById('category-menu');
    menuBar.style.display = "flex";

    // console.log("hI");
}


const hideCategory = () => {
    const menuBar = document.getElementById('category-menu');
    menuBar.style.display = "none";

    // console.log("hI");
}
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-sort input");
    const products = document.querySelectorAll(".product");
    const categoryFilters = document.querySelectorAll("input[name='category']");
    const priceRange = document.querySelector("input[type='range']");
    // const inStockOnly = document.querySelector("input[type='checkbox']");
    const clearFiltersButton = document.querySelector(".shop-sidebar button");
    document.getElementById("priceRange").addEventListener("input", function () {
        document.getElementById("priceValue").textContent = this.value;
    });
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        products.forEach(product => {
            const title = product.querySelector("h4").innerText.toLowerCase();
            const desc = product.querySelector("p").innerText.toLowerCase();
            product.style.display = title.includes(searchTerm) || desc.includes(searchTerm) ? "block" : "none";
        });
    });

    priceRange.addEventListener("input", () => {
        const maxPrice = parseInt(priceRange.value);
        products.forEach(product => {
            const price = parseInt(product.querySelector("b").innerText.replace("₹", ""));
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
            productCard.setAttribute('data-id', element.id);

            productCard.innerHTML = `
                <div> 
                    <img src="${imgsrc}" data-id="${element.id}" class="product-image" alt="Cat and Dog"
                    onclick="redirectToOrder(${element.id})">
                    <h4>${element.name}</h4>
                    <p>${element.description}</p>
                    <p>&#9733;&#9733;&#9733;&#9733;&#9733; (214)</p>
                    <p class="price-container"><b>&#8377;${element.old_price}</b></p>
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
