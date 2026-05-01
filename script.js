const input = document.getElementById("input-box");
const productscontainer = document.getElementById("products-container");
const category = document.getElementById("category-filter");
const cartContainer = document.getElementById("cart-container");

let url = "https://fakestoreapi.com/products";

let allProducts = [];
let cart = [];

async function getData(){
    
    productscontainer.innerHTML = "<p>Loading...</p>";

    const response = await fetch(url);
    const data = await response.json();
    allProducts = data
    console.log(data);
    
    if(!response.ok){
        alert("No data received")
        return
    }

    productsDisplayHandler(allProducts);
    categoryDisplayHandler();

}

getData();

const productsDisplayHandler = (allProducts)=>{

    productscontainer.innerHTML = "";

    allProducts.forEach((item)=>{
        console.log(item);

        const product = document.createElement("div");

        const image = document.createElement("img");
        image.src = item.image;

        const title = document.createElement("p");
        title.textContent = item.title.slice(0,25)

        const price = document.createElement("p");
        price.textContent = `Price: $${item.price}`;

        const button = document.createElement("button");
        button.textContent = "Add to cart";
        button.addEventListener("click", () => addToCart(item));       

        product.appendChild(image);
        product.appendChild(price);
        product.appendChild(title);
        product.appendChild(button);

        productscontainer.appendChild(product);
        
    })
};

const addToCart = (item) =>{
    cart.push(item)
    console.log(cart)
    renderCart()
}

const renderCart = () =>{
    cartContainer.innerHTML = "";

    if(!cart.length){
        cartContainer.innerHTML = "<p>No items added yet</p>"
    }else{
        cart.forEach((item)=>{
            const cartDiv = document.createElement("div");
            

            const img = document.createElement("img");
            img.src = item.image;

            const title = document.createElement("p")
            title.textContent = item.title.slice(0,25);

            const price = document.createElement("p");
            price.textContent = `Price: $${item.price}`;

            const button = document.createElement("button")
            button.textContent = "Remove item"

            
            cartDiv.appendChild(img);
            cartDiv.appendChild(title);
            cartDiv.appendChild(price);
            cartDiv.appendChild(button);

            button.addEventListener("click", ()=>removeitem(item));


            cartContainer.appendChild(cartDiv);
        })

        
    }
}




const categoryDisplayHandler = () => {
   const categories = ["all", ...new Set((allProducts.map(item => item.category)))]

   category.innerHTML = "";

   categories.forEach((cat)=>{
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase()+cat.slice(1);

        category.appendChild(option);
   })

}

const masterFilter = () =>{

    const searchTerm = input.value.toLowerCase().trim();
    const selectedCategory = category.value;

    const filterProduct = allProducts.filter((item)=>{
        console.log(item);
        
        const matchesSearch = item.title.toLowerCase().includes(searchTerm);

        const matchesCategory = (selectedCategory.toLowerCase() === "all") || (selectedCategory === item.category );

        return matchesSearch && matchesCategory
    })

    productsDisplayHandler(filterProduct);

}

input.addEventListener("keyup", masterFilter);
category.addEventListener("change", masterFilter);



