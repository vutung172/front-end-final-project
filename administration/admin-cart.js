var cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
function renderCart() {
    let cartRows = "";
    for (let item of cartItems) {
      cartRows += `<tr class="text-center align-middle">
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td><img class="img-thumbnail image-fluid" src="../image/${item.img}" alt="${item.img}" width="100px" ></td>
                        <td>${item.category}</td>
                        <td><input min="1" type="number" onchange="updateCartItems(${item.id}, event)" class="Item-quantity border-0" value="${item.quantity}"></td>
                        <td>${item.price}</td>
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
    }
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    location.reload();
  };

  // Hiện số items trong cart
  $('.cart-alert').html(cartItems.length);
//   update số lượng
  function updateCartItems(id,event){
    // tìm đối tượng
    let cartItem = cartItems.find(x => x.item.id === id);
    cartItem.quantity = event.target.value;
    // luu storage
    sessionStorage.setItem("cartItems", JSON.stringify(cartItem));
  }