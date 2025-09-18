let cart=[];
// async function to fetch products
async function fetchProducts() {
    try{
        let res=await fetch("https://fakestoreapi.com/products?limit=12");
        // https://dummyjson.com/products
        
        let products=await res.json();
        displayProducts(products);


    } catch(err){
        console.error("error fetching products:",err);
    }
    
}
// display products in grid
function displayProducts(products){
    const grid=document.getElementById("productGrid");
    grid.innerHTML="";

    products.forEach((p)=> {
        const card=document.createElement("div");

        card.className="product-card";
        // Product main content
        card.innerHTML=`
        <img src="${p.image}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p><strong>Category:</strong>${p.category}</p>
        <p class="price">$${p.price}</p>
        
        `;
        // Add to cart button
        const addBtn=document.createElement("button");
        addBtn.className="addBtn";
        addBtn.textContent="Add to Cart";
        addBtn.addEventListener("click",()=>addToCart(p));
        card.appendChild(addBtn);
        // Detail box(hover popup)

        const detailBox=document.createElement("div");
        detailBox.className="detail-box";
        detailBox.innerHTML=`
        <img src="${p.image}" alt="${p.title}">
        <h3> ${p.title}</h3>
        <p>${p.description}</p>
        <p class="price">Price:$${p.price}</p>`;
        card.appendChild(detailBox);
        grid.appendChild(card);
    });
        }
        // Add to cart function
        function addToCart(product){
          cart.push(product);
          updateCart();
        }
    // Update cart display
    function updateCart(){
      const countEI=document.getElementById("cartCount");
      const totalEI=document.getElementById("cartTotal");
      countEI.textContent=cart.length;
      let total=cart.reduce((sum,item)=>sum+item.price,0);
      totalEI.textContent=total.toFixed(2);

      // load products on page load
      
    }
    fetchProducts();