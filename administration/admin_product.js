
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
                    <td class="col-1"></td>
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
};
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

// My cart________________________________________________________________________________________________________
var cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
function renderCart() {
    let cartRows = "";
    for (let i of cartItems) {
      cartRows += `<tr class="text-center align-middle">
                        <td>${i.item.id}</td>
                        <td>${i.item.name}</td>
                        <td><img class="img-thumbnail image-fluid" src="../image/${i.item.img}" alt="${i.item.img}" width="100px" ></td>
                        <td>${i.item.category}</td>
                        <td><input min="1" type="number" onchange="updateCartItems(${i.item.id}, event)" class="Item-quantity border-0" value="${i.quantity}"></td>
                        <td>${i.price}</td>
                        <td>${i.price*i.quantity}</td>
                        <td>
                          <button type="button" class="btn btn-danger rounded-3 m-1"
                          id="btn-delete" onclick="deleteCart('${i.item.id}')">Xóa</button>    
                        </td>
                    </tr>`;
    }
    // Update the cart items in the HTML
    $('.list-carts').html(cartRows);
  };
  renderCart();

// Khởi tạo cart
function initCart(id) {
    // Tìm prodct dựa trên ID
    let carts = products.find((x) => x.id === id);
    // CKiểm tra item trong cart
    let cartItem = cartItems.find(x => x.item.id === carts.id);
    if (cartItem) {
      // Nếu có thì tăng só lượng
      cartItem.quantity+=1;
    } else {
      // Nếu không thì tạo cart mới
      cartItems.push({
        item: carts,
        price: carts.price-carts.price*carts.discount/100,
        quantity: 1,
      });
    };
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

// Xóa item trong cart
function deleteCart(id) {
  let index = cartItems.findIndex(x => x.item.id === id);
  cartItems.splice(index, 1);
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCart();
}

  // Hiện số items trong cart
  function cartAlert() {
    let totalAlert = 0;
    for (let i = 0;i < cartItems.length;i++) {
      totalAlert += 1;
      }
      return totalAlert  
  };
  $('#addToCart').click(cartAlert())
  $('.cart-alert').html(cartAlert());
  
//   update số lượng
  function updateCartItems(id,event){
    // tìm đối tượng
    let cartItem = cartItems.find(x => x.item.id === id);
    cartItem.quantity = event.target.value;
    // luu storage
    sessionStorage.setItem("cartItems", JSON.stringify(cartItem));
  }

// Tính tổng tiền
function calcTotalPrice() {
  let totalPrice = 0;
  for (var i = 0; i < cartItems.length; i++) {
    let item = cartItems[i];
    totalPrice += item.price * item.quantity;
  }
  return totalPrice;
}
$('.total-price').html(calcTotalPrice());


// Index.html
function showProduct() {
    let rows = '';
    for (let p of products) {
        rows += `<div class="card border-0 col col-sm-12 col-lg-6 col-md-4 col-xs-12 p-2" style="width: 18rem;">
                    <img src="./image/${p.img}" class="card-img-top" alt="...">
                    <div class="card-body align-center">
                        <h5 class="text-center card-title">${p.name}</h5>
                        <p class="text-center card-text text-dark text-break ellipsis py-1 my-1">${p.describe}</p>
                        <h4 class="text-center"><span class="text-dark">$</span>${p.price - p.price*p.discount/100}</h4>
                        <button href="#" id="addToCart" onclick="initCart('${p.id}')" class="btn btn-outline-primary mx-auto d-flex justify-content-center my-1">add to cart</button>
                    </div>
                </div>`;
    }
    $('.product-render').html(rows);
}
showProduct();



// xxử lý sự kiện_________________________________________________________________________________________________

// 1. indext.html Các nút bấm
$('#btn-add').click(function() {
    let product =getData();
    insertProduct(product);
    renderProduct();
    $("#productForm")[0].reset();
})

$('#btn-save').click(function() {
    let product = updateData()
    console.log(product);
    let p_update = products.find(x => x.id === product.id);
    p_update.id = product.id;   
    p_update.name = product.name;
    p_update.img = product.img;
    p_update.category = product.category;
    p_update.describe = product.describe;
    p_update.quantity = product.quantity; 
    p_update.price = product.price;
    p_update.discount = product.discount; 
    let index = products.findIndex(function(x) {
      return x.id === p_update.id;
    });
    if (index !== -1) {
      // Thay giá trị mới
      products[index] = p_update;
      localStorage.setItem("products", JSON.stringify(products))
      renderProduct() 
      $("#productForm")[0].reset();
    };
  });


// CSS_______________________________________________________________________________________________________________
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
