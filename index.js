function renderProduct() {
    let rows = '';
    for (let p of products) {
        rows += `<div class="card border-0 col col-sm-12 col-lg-6 col-md-4 col-xs-12 p-2" style="width: 18rem;">
                    <img src="./image/${p.img}" class="card-img-top" alt="...">
                    <div class="card-body align-center">
                        <h5 class="text-center card-title">${p.name}</h5>
                        <p class="text-center card-text text-dark text-break ellipsis h-50 py-2 my-1">${p.describe}</p>
                        <h4 class="text-center">${p.price}</h4>
                        <button href="#" class="btn btn-outline-primary mx-auto d-flex justify-content-center my-1">add to cart</button>
                    </div>
                </div>`;
    }
    $('.product-render').html(rows);
}

var products = JSON.parse(localStorage.getItem("products")) || [];
renderProduct();

