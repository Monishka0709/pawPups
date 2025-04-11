document.addEventListener("DOMContentLoaded", () => {
    const categoryFilters = document.querySelectorAll("input[name='category']");
    console.log(categoryFilters[0].value)
    const priceRange = document.querySelector("input[type='range']");
    const clearFiltersButton = document.querySelector(".shop-sidebar button");
    const productList = document.querySelector(".products");
    const priceDisplay = document.getElementById("priceValue");
    const selectElement = document.querySelector("select");

    let allProducts = [];

    // Update price range value display
    priceRange.addEventListener("input", function () {
        priceDisplay.textContent = this.value;
        applyFilters();
    });

    // Sorting
    selectElement.addEventListener("change", function () {
        sortProducts(this.value);
    });

    // Category Filters
    categoryFilters.forEach(filter => {
        filter.addEventListener("change", applyFilters);
    });

    // Clear Filters
    // clearFiltersButton.addEventListener("click", () => {
    //     document.querySelector("input[type='text']")?.value = "";
    //     priceRange.value = 10000;
    //     priceDisplay.textContent = "10000";
    //     categoryFilters[0].checked = true;
    //     applyFilters();
    // });

    // Fetch and render products
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            allProducts = data.filter(p => p.remark !== 'Discontinued');
            renderProducts(allProducts);
        });

    function renderProducts(products) {
        productList.innerHTML = "";
        products.forEach(element => {
            if (element.remark === 'Active') {
                const productCard = document.createElement('div');
                const imgsrc = `https://lh3.googleusercontent.com/d/${element.img1}`;
                const displayPrice = element.mrp;

                productCard.classList.add('product');
                productCard.id = element.sr_no;
                productCard.dataset.price = displayPrice;
                productCard.dataset.category = element.parent_category;
                productCard.dataset.popularity = element.Category1;
                productCard.setAttribute('data-name', element.title);
                productCard.setAttribute('data-id', element.sr_no);

                productCard.innerHTML = `
                    <div> 
                        <div class="product-image-container"><img src="${imgsrc}" data-id="${element.sr_no}" class="product-image" alt="Cat and Dog" onclick="redirectToOrder(${element.sr_no})"></div>
                        <p>${element.Brand}</p>
                        <p>${element.title}</p>
                        <p>&#9733;&#9733;&#9733;&#9733;&#9733; (214)</p>
                        <p class="price-container">MRP: <del>&#8377;${element.mrp}</del><b>&#8377;<span class="product-price">${displayPrice}</span></b> | <span class="product-discount">10% OFF</span></p>
                    </div>
                    <div class="product-btn-container">
                        <button onclick="addToCart('${element.sr_no}','${imgsrc}','${element.title}', ${displayPrice})">Add to Cart</button>
                    </div>
                `;

                productList.appendChild(productCard);
            }
        });
        sortProducts(selectElement.value);
    }

    function applyFilters() {
        const selectedCategories = Array.from(categoryFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
    
        const maxPrice = parseInt(priceRange.value);
    
        const filtered = allProducts.filter(product => {
            const inCategory = selectedCategories.includes("all") || selectedCategories.includes(product.parent_category);
            const price = parseInt(product.mrp.toString().replace(/[^\d]/g, ""));
            const underPrice = price <= maxPrice;
            return inCategory && underPrice;
        });
    
        renderProducts(filtered);
    }
    

    function sortProducts(criteria) {
        const products = Array.from(productList.getElementsByClassName("product"));

        products.sort((a, b) => {
            if (criteria === "Most Popular") {
                return parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity);
            } else if (criteria === "Price Low-High") {
                return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
            } else if (criteria === "Price High-Low") {
                return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
            }
        });

        productList.innerHTML = "";
        products.forEach(product => productList.appendChild(product));
    }
});

function redirectToOrder(productId) {
    window.location.href = `order.html?id=${productId}`;
}
