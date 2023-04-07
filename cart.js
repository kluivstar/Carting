/////The code defines variables that select specific elements from the HTML document using the querySelector method. These variables are used to manipulate the elements in the document.

let openCart = document.querySelector('.cart');
let closeCart = document.querySelector('.closeCart');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let card = document.querySelector('.card');

///// Open And Close Cart By Utilizing The ".active" Class

openCart.addEventListener('click', ()=>{
    body.classList.add('active');
});
closeCart.addEventListener('click', ()=>{
    body.classList.remove('active');
});


///// Products Array

let menu = [
        {
            id: 1,
            name: 'Full Bired',
            image: 'fried-rice.png',
            price: 3233
        },
        {
            id: 2,
            name: 'Egusi and Fufu',
            image: 'egusi.png',
            price: 2234
        },
        {
            id: 3,
            name: 'Pizza',
            image: 'pizzaa.png',
            price: 6434
        },
        {
            id: 4,
            name: 'Chicken Sharwarma Wrap',
            image: 'shawa.png',
            price: 4234
        }
];

///// The InitApp function iterates the product array elements and creates a new div(using forEach method) with a class of "item" then alter the inner html of the product using a Template then append To ".list" Class

let listCards  = [];
function initApp(){
    menu.forEach((value, key)=>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="images/${value.image}"/>
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add to cart</button>`;
            /////"list already styled with css"
        list.appendChild(newDiv);
    })
}
initApp();

///// addToCart function adds the corresponding product to cart using "Key" parameter (This checks if the product is already in the cart by checking if "listCards" obj  has a property with same name as the "key" parameter in the products object and add quantity of 1 to the listCards). The products object is used to get the details of the product, such as its name and price.

      /////Call the reloadCard function to update the cart display.

function addToCard(key){
   if(listCards[key] == null){
        listCards[key] = menu[key];
        listCards[key].quantity = 1;
   }
   reloadCard();
}

///// The reloadCard function clears a list of items, calculates the total price and quantity of items, and then creates a new list of items with buttons to increase or decrease the quantity of each item. 

    /////The reloadCard function starts by clearing the listCard element of any previous items. It then initializes two variables, count and totalPrice, to zero. The function then loops through each item in the listCards object, which contains information about each item in the list. 

     /////For each item, the function adds the price of the item to the totalPrice variable and the quantity of the item to the count variable.
     
     /////If the item is not null, the function creates a new li element and sets its inner HTML to a string that includes an image of the item, the name of the item, its price, and buttons to increase or decrease the quantity of the item.
     
     /////The newDiv element is then appended to the listCard element.

function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
            <div><img src="images/${value.image}"/></div>
            <div>${value.name}</div>
            <div>${value.price.toLocaleString()}</div>
            <div>
                <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                <div class="count">${value.quantity}</div>
                <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;

}

/////The changeQuantity function updates the quantity and price of an item in the list when the user clicks the increase or decrease button.

function changeQuantity(key, quantity){
    console.log(key, quantity);
    if(quantity == 0){
        delete listcards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * menu[key].price;
    }
    reloadCard();
}
