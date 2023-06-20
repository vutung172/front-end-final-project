
var products = JSON.parse(localStorage.getItem("products")) || [];

class Product {
    constructor(id, name, img, category, describe, quantity, price, discount,) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.category = category;
        this.describe = describe;
        this.quantity = quantity;
        this.price = price;
        this.discount = discount;
    }
}

// admin-product.html
function insertProduct (product = new Product()) {
    // validation
    if (products.find(x =>x.id === product.id)) {
        alert("Product ID existed");
        return
    }
    if (products.find(x =>x.name === product.name)) {
        alert("Product Name existed");
        return
    }
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
}

function getData() {
    let id = $('#productID').val();
    let name = $('#productName').val();
    let img = $('#productImg').prop('files')[0].name;
    let category = $('#productCategory').val();
    let describe= $('#productDescribe').val();
    let quantity = $('#productQuantity').val();
    let price = $('#productPrice').val();
    let discount = $('#productDiscount').val();
    
    return new Product(id, name, img, category, describe, quantity, price, discount);
}

function updateData() {
    let id = $('#productID').val();
    let name = $('#productName').val();
    let img = $('.img-name').html();
    let category = $('#productCategory').val();
    let describe= $('#productDescribe').val();
    let quantity = $('#productQuantity').val();
    let price = $('#productPrice').val();
    let discount = $('#productDiscount').val();
    
    return new Product(id, name, img, category, describe, quantity, price, discount);
}

function renderProduct() {
    let rows = '';
    for (let p of products) {
        rows += `<tr class="text-center align-middle">
                    <td class="col-1">${p.id}</td>
                    <td class="col-2">${p.name}</td>
                    <td class="col-1"><img class="img-thumbnail image-fluid" src="../image/${p.img}" alt="${p.img}" width="100px" ></td>
                    <td class="col-1">${p.category}</td>
                    <td class="col-1">${p.quantity}</td>
                    <td class="col-1">${p.price}</td>
                    <td class="col-1">${p.discount}</td>
                    <td class="col-2 text-break text-start">${p.describe}</td>
                    <td class="col-1">
                        <button type="button" class="btn btn-info rounded-3 m-1"
                            id="btn-update" onclick="initProducts('${p.id}')">Sửa</button>
                        <button type="button" class="btn btn-danger rounded-3 m-1"
                            id="btn-delete" onclick="deleteProduct('${p.id}')">Xóa</button>
                    </td>
                </tr>`;
    }
    $('.list-products').html(rows);
}
renderProduct();

function initProducts(id) {
    // tìm product dựa vào ID
    let _p = products.find(x => x.id === id);
    sessionStorage.setItem("_p", JSON.stringify(_p));
    $('#productID').val(_p.id);
    $('#productName').val(_p.name);
    $('.img-name').html(_p.img);
    $('#productCategory').val(_p.category);
    $('#productDescribe').val(_p.describe);
    $('#productQuantity').val(_p.quantity);
    $('#productPrice').val(_p.price);
    $('#productDiscount').val(_p.discount);
}

function deleteProduct(id) {
    if (confirm("Do you want to delete")) {
        let index = products.findIndex(x => x.id == id);
        products.splice(index, 1);
        renderProduct();
        localStorage.setItem("products", JSON.stringify(products));
    }
};

var cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
function renderCart() {
    let cartRows = "";
    for (let item of cartItems) {
      cartRows += `<tr class="text-center align-middle">
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td><img class="img-thumbnail image-fluid" src="../image/${item.img}" alt="${item.img}" width="100px" ></td>
                        <td>${item.category}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price}</td>
                    </tr>`;
    }
    // Update the cart items in the HTML
    $('.list-carts').html(cartRows);
  };
  renderCart();

// Khởi tạo card
function initCart(id) {
    // Tìm prodct dựa trên ID
    let carts = products.find((x) => x.id === id);
  
    // CKiểm tra item trong cart
    let cartItem = cartItems.find(x => x.id === carts.id);
  
    if (cartItem) {
      // Nếu có thì tăng só lượng
      cartItem.quantity++;
    } else {
      // Nếu không thì tạo cart mới
      cartItem = {
        id: carts.id,
        name: carts.name,
        img: carts.img,
        category: carts.category,
        price: carts.price,
        quantity: 1,
      };
      cartItems.push(cartItem);
    }
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  // Hiện số items trong cart
  $('.cart-alert').html(cartItems.length);
  
  

// Index.html
function showProduct() {
    let rows = '';
    for (let p of products) {
        rows += `<div class="card border-0 col col-sm-12 col-lg-6 col-md-4 col-xs-12 p-2" style="width: 18rem;">
                    <img src="./image/${p.img}" class="card-img-top" alt="...">
                    <div class="card-body align-center">
                        <h5 class="text-center card-title">${p.name}</h5>
                        <p class="text-center card-text text-dark text-break ellipsis h-50 py-2 my-1">${p.describe}</p>
                        <h4 class="text-center">${p.price}</h4>
                        <button href="#" id="addToCart" onclick="initCart('${p.id}')" class="btn btn-outline-primary mx-auto d-flex justify-content-center my-1">add to cart</button>
                    </div>
                </div>`;
    }
    $('.product-render').html(rows);
}
showProduct();



// xxử lý sự kiện

// 1. indext.html Các nút bấm
$('#btn-add').click(function() {
    let product =getData();
    insertProduct(product);
    renderProduct();
    $("#productForm")[0].reset();
})

$('#btn-save').click(function() {
    let product = getData();
    console.log(product);
    let p_update = products.find(x => x.id === product.id);
    p_update.id = product.id;   
    p_update.name = product.name;
    p_update.category = product.category;
    p_update.describe = product.describe;
    p_update.quantity = product.quantity; 
    p_update.price = product.price;
    p_update.discount = product.discount;
    renderProduct();
    localStorage.setItem("products", JSON.stringify(p_update));
    $("#productForm")[0].reset();
})


// CSS
//chuyển trạng thái menu
$(document).ready(function() {
    $(".menu li>a").hover(
      function() {
        $(this).addClass("active");
        $(this).addClass("link-body-emphasis");    
      },
      function() {
        if (!$(this).hasClass("clicked")) {
          $(this).removeClass("active");
        }
      }
    );

    $(".menu li>a").click(function() {
      if ($(this).hasClass("clicked")) {
        $(this).removeClass("clicked");
      }
    });
  });
