const productsEl = document.getElementById('products');
const cartBtnEl = document.getElementById('cartBtn');

let cartArr;
let products = {};

// loads previous cart arr
function getCartArr(){
    const temp = localStorage.getItem('cartArr');
    const temp2 = JSON.parse(temp);
    if (temp2 === null || temp2 === undefined) {
        cartArr = [];
        localStorage.setItem('cartArr', JSON.stringify(cartArr));
    } else {
        cartArr = temp2;
    }
}

// loads product data 
/*const loadProducts = () => {
    const baseUrl = "https://erp.devinternal.tech";
    const mykey = "6576bdc25137e3a";
    const mySecret = "27af98efde5d432";
    $.ajax({
        url: `${baseUrl}/api/method/version`,
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': 'https://erp.devinternal.tech',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Authorization,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type',
            "6576bdc25137e3a" :  "27af98efde5d432",
            'Accept': 'application/json'
        },
        body: {
            'usr': 'Administrator',
            'pwd': 'admin'
        },
        success(res){
            productsArr = res.data;
            console.log(res.data);
            //displayProductsDOM(res.data);
        },
        error(err){
            alert('Could not fetch products !!');
        }
    });
};*/
const loadProducts = () => {
    console.log("Hello world");
    const baseUrl = "http://139.59.45.1";
    const mykey = "c79d887d504e1ad";
    const mySecret = "c63cc266dc654aa";
    $.ajax({
        //url: `${baseUrl}/api/method/version`,
        url: `${baseUrl}/api/resource/Item/Parle%20G`,
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'token 8313d207b9a2665:a2f70d33a081c9c'
            //'Accept':'*/*'
        },
        success(res){
            productsArr = res.data;
            console.log(res.data);
            displayProductsDOM(res.data);
        },
        error(err){
            alert('Could not fetch products !!');
        }
    });
};

//load items from erpnext
/*const loadProducts = async ()=> {
    const response = await fetch('https://erp.devinternal.tech/api/resource/Item', {

        body: {
            usr: 'Administrator',
            pwd: 'admin'
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    });
    const myJson = await response.json();
    console.log(myJson);
}*/

function displayProductsDOM(products){
    document.getElementById('products').innerHTML = '<div class="product"><div class="product-info"><img src="D:/E-commerce/E-Commerce-Website/images'+products.image+'" alt="product-image"><h4>'+products.name+'</h4><h5>Price: $ '+products.standard_rate+'</h5><h5>Rating: '+products.valuation_method+'</h5><button class="addBtn">add to cart</button></div></div>';
    $(".addBtn").on('click', addToCart);
}

// renders products list on DOM
/*function displayProductsDOM(products){
    productsEl.innerHTML = products.map(product=>`
        <div class="product">
            <div class="product-info">
                <img src="${product.product_image_md}" alt="product-image">
                <h4>${product.name}</h4>
                <h5>Price: $ ${product.standard_rate}</h5>
                <h5>Rating: ${product.valuation_method}</h5>
                <button id="${product._id}" class="addBtn">add to cart</button>
            </div>
        </div>
    `)
    .join('');

    // add to cart button clicked
    $(".addBtn").on('click', addToCart);
}*/

// checks if item is already present in the cart
function isItemInCart(currId){
    for (const product of cartArr){
        if (currId === product._id){
            product['qty'] += 1;
            return true;
        }
    }
    return false;
}

// add to cart function
function addToCart(){
    //cartArr.push(this.id);
    console.log("Added to cart");
    const currId = this.id;
    let item = {};

    // check if item is already in cart
    //if(!isItemInCart(currId)){
        /*for(const product of productsArr){
            if (product._id === currId){*/
                // console.log(cartArr);
                item['name'] = products.name;
                item['price'] = products.standard_rate;
                item['img'] = 'D:/E-commerce/E-Commerce-Website/images'+products.image;
                //item['_id'] = product._id;
                item['qty'] = 1;
                cartArr.push(item);
            /*}
        }*/
    //}
    alert('Item Added to cart');
}

// display cart
function displayCart(){
    // console.log(cartArr);
    saveCartToLocal();
    window.location.href = "./cart.html";
}

// save user cart to local storage
function saveCartToLocal(){
    localStorage.setItem('cartArr', JSON.stringify(cartArr));
}

cartBtnEl.addEventListener('click', displayCart);

loadProducts();
getCartArr();
