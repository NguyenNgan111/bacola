import {
  listProductInCart,
  putLocal,
  renderProductInCart,
  removeToCart,
} from "./cart.js";

export function renderListProductsDetail() {
  const html = listProductInCart
    .map(
      (product) =>
        `<tr data-id="${product.productId}">
    <td class="product-thumbnail">
        <a href="./productDetail.html"><img src="${product.image}" alt=""></a>
    </td>
    <td class="product-name">
        <h4><a href="./productDetail.html">${product.title}</a></h4>
    </td>
    <td class="product-price"><span>$${product.price}</span></td>
    <td class="product-quantity">
        <div class="quantity">
            <button class="subtract">-</button>
            <input type="text" value="${product.quantity}">
            <button class="plus">+</button>
        </div>
    </td>
    <td class="product-subtotal"><span>$${product.priceTotal}</span></td>
    <td class="product-remove">x</td>
</tr>`
    )
    .join("");
  $(".cart-detail table tbody").html(html);
  increaseInputHandler();
  reducedInputHandler();
  removeProductToCart();
  cartTotalHandler();
}
function cartTotalHandler() {
  const price = listProductInCart.reduce(
    (cur, value) => +cur + value.priceTotal,
    0
  );
  let shipIndex = localStorage.getItem("shipIndex")
    ? localStorage.getItem("shipIndex")
    : 1;
  const shipCostList = $(
    ".cart-total .cart-total-wrapper .shipping form input"
  );
  // for (const key in shipCostList) {
  //   if (shipCostList[key].checked == true) {
  //     shipCost = shipCostList[key].value;
  //   }
  // }
  shipCostList[Number(shipIndex) - 1].checked = true;
  const shipCost = shipCostList[Number(shipIndex) - 1].value
    ? shipCostList[Number(shipIndex) - 1].value
    : 0;
  $(".cart-total .cart-total-wrapper .total .price").text(
    `$${Number(price) + Number(shipCost)}`
  );
  $(".cart-total .cart-total-wrapper .subtotals .price").text(`$${price}`);
  cartTotalFiniteHandler(price);
}
function cartTotalFiniteHandler(price) {
  $(".cart-total .cart-total-wrapper .shipping form input").click((e) => {
    const shipCost = e.target.closest("div").querySelector("label span")
      ? e.target.closest("div").querySelector("label span").textContent.slice(1)
      : 0;
    $(".cart-total .cart-total-wrapper .total .price").text(
      `$${Number(price) + Number(shipCost)}`
    );
    const shipIndex = e.target
      .closest("div")
      .querySelector("input")
      .getAttribute("id")
      .slice(-1);
    localStorage.removeItem("shipIndex");
    localStorage.setItem("shipIndex", shipIndex);
    cartTotalHandler();
  });
}
function removeProductToCart() {
  $(".cart-detail table tbody .product-remove").click((e) => {
    e.preventDefault();
    const productId = e.target.closest("tr").dataset.id;
    const productIndex = listProductInCart.findIndex(
      (product) => product.productId == productId
    );
    listProductInCart.splice(productIndex, 1);
    putLocal(listProductInCart);
    updateCart();
    renderProductInCart();
    renderListProductsDetail();
    removeToCart();
    cartTotalHandler();
  });
}
function increaseInputHandler() {
  $(".cart-detail table tbody .plus").click((e) => {
    e.preventDefault();
    const input = e.target.closest(".quantity").querySelector("input");
    if (
      Number(e.target.closest(".quantity").querySelector("input").value) < 19
    ) {
      input.value =
        +e.target.closest(".quantity").querySelector("input").value + 1;
      const productId = e.target.closest("tr").dataset.id;
      const productIndex = listProductInCart.findIndex(
        (product) => product.productId == productId
      );
      listProductInCart[productIndex].quantity =
        Number(listProductInCart[productIndex].quantity) + 1;
      listProductInCart[productIndex].priceTotal =
        Number(listProductInCart[productIndex].price) *
        listProductInCart[productIndex].quantity;
      putLocal(listProductInCart);
      updateCart();
      renderProductInCart();
      renderListProductsDetail();
      removeToCart();
      cartTotalHandler();
    }
  });
}
function reducedInputHandler() {
  $(".cart-detail table tbody .subtract").click((e) => {
    e.preventDefault();
    const input = e.target.closest(".quantity").querySelector("input");
    if (e.target.closest(".quantity").querySelector("input").value != 1) {
      input.value =
        +e.target.closest(".quantity").querySelector("input").value - 1;
      const productId = e.target.closest("tr").dataset.id;
      const productIndex = listProductInCart.findIndex(
        (product) => product.productId == productId
      );
      listProductInCart[productIndex].quantity =
        Number(listProductInCart[productIndex].quantity) - 1;
      listProductInCart[productIndex].priceTotal =
        Number(listProductInCart[productIndex].price) *
        listProductInCart[productIndex].quantity;
      putLocal(listProductInCart);
      updateCart();
      renderProductInCart();
      renderListProductsDetail();
      removeToCart();
      cartTotalHandler();
    }
  });
}
function updateCart() {
  $(".action-wrapper .update").css({
    backgroundColor: "#2bbef9",
    color: "#fff",
  });
  $(".notify-cart-updated").css("display", "block");
  setTimeout(() => {
    $(".action-wrapper .update").css({
      backgroundColor: "#f3f4f7",
      color: "#c2c2d3",
    });
    $(".notify-cart-updated").css("display", "none");
  }, 3000);
}
// export function removeToCart() {
//   $(".product-remove").click(function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     const removeId = $(this).closest("li").find("a span").data("id");
//     const index = listProductInCart.findIndex(
//       (product) => product.productId == removeId
//     );
//     listProductInCart.splice(index, 1);
//     $(this).closest("li").css("display", "none");
//     const quantityProductInCart = listProductInCart.reduce(
//       (cur, val) => +cur + val.quantity,
//       0
//     );
//     const priceTotal = listProductInCart.reduce(
//       (cur, val) => +cur + val.priceTotal,
//       0
//     );
//     $(".cart .price span").text(`$${priceTotal}`);
//     $(".cart .cart-icon span").text(`${quantityProductInCart}`);
//     $(".cart-total-sub .carttotal-sub--result").text(`$${priceTotal}`);
//     if (listProductInCart.length == 0) {
//       $(".cart-have").hide();
//       $(".cart .cart-total").hide();
//       $(".cart-wrapper .cart-empty").show().css("display", "flex");
//       $(".cart .price span").text("$0.00");
//       $(".cart .cart-icon span").text("0");
//     }
//     putLocal(listProductInCart);
//   });
// }
