import { renderListProductsDetail } from "./detailCart.js";
const dataProductInCart = localStorage.getItem("productInCart");
export const listProductInCart = JSON.parse(dataProductInCart)
  ? JSON.parse(dataProductInCart)
  : [];
// export const listProductInCart = [
// {
//   productId: 1,
//   title: "All Natural Italian-Style Chicken Meatballs",
//   image:
//     "https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62-346x310.jpg",
//   price: 7.25,
//   badgeDiscount: 0.23,
//   quantity: 1,
//   priceTotal: 7.25,
// }
// ];
export function putLocal(listProductInCart) {
  localStorage.removeItem("productInCart");
  const listProducts = JSON.stringify(listProductInCart);
  localStorage.setItem("productInCart", listProducts);
}
let reduce1 = 0;
let count1 = 0;
let reduce2 = 0;
let count2 = 0;
export function addToCart() {
  $(".btn-add-cart> div > a").click((e) => {
    e.stopPropagation();
    e.preventDefault();
    const id = e.target.closest("li").dataset.id;
    const test = listProductInCart.findIndex(
      (product) => product.productId == id
    );
    reduce1 = test;
    if (test > -1) {
      listProductInCart[test].quantity =
        Number(listProductInCart[test].quantity) + 1;
      listProductInCart[test].priceTotal =
        Number(listProductInCart[test].price) *
        listProductInCart[test].quantity;
    } else {
      const title = e.target.closest("li").querySelector("h2 a").textContent;
      const image = e.target
        .closest("li")
        .querySelector("img")
        .getAttribute("src");
      const price = e.target
        .closest("li")
        .querySelector(".product-price span")
        .textContent.slice(1);
      const badgeDiscount = e.target.closest("li").querySelector(".saleOff")
        ? Number(
            e.target
              .closest("li")
              .querySelector(".saleOff")
              .textContent.slice(0, -1)
          ) / 100
        : 0;
      const quantity = 1;
      const priceTotal = Number(price) * quantity;
      listProductInCart.push({
        productId: id,
        title: title,
        image: image,
        price: price,
        badgeDiscount: badgeDiscount,
        quantity: quantity,
        priceTotal: priceTotal,
      });
    }
    if (count1 == 1) {
      count1 = 0;
      listProductInCart[reduce1].quantity =
        Number(listProductInCart[reduce1].quantity) - 1;
      listProductInCart[reduce1].priceTotal =
        Number(listProductInCart[reduce1].price) *
        Number(listProductInCart[reduce1].quantity);
    } else {
      count1 = 1;
    }
    renderProductInCart();
    removeToCart();
    putLocal(listProductInCart);
  });
  $(".item .btn-add-cart a").click((e) => {
    e.stopPropagation();
    e.preventDefault();
    const id = e.target.closest(".item").dataset.id;
    const test = listProductInCart.findIndex(
      (product) => product.productId == id
    );
    reduce2 = test;
    if (test > -1) {
      listProductInCart[test].quantity =
        Number(listProductInCart[test].quantity) + 1;
      listProductInCart[test].priceTotal =
        Number(listProductInCart[test].price) *
        listProductInCart[test].quantity;
    } else {
      const title = e.target
        .closest(".item")
        .querySelector(".product-content-wrapper h2 a").textContent;
      const image = e.target
        .closest(".item")
        .querySelector("img")
        .getAttribute("src");
      const price = e.target
        .closest(".item")
        .querySelector(".product-price span")
        .textContent.slice(1);
      const badgeDiscount = e.target.closest(".item").querySelector(".saleOff")
        ? Number(
            e.target
              .closest(".item")
              .querySelector(".saleOff")
              .textContent.slice(0, -1)
          ) / 100
        : 0;
      const quantity = 1;
      const priceTotal = Number(price) * quantity;
      listProductInCart.push({
        productId: id,
        title: title,
        image: image,
        price: price,
        badgeDiscount: badgeDiscount,
        quantity: quantity,
        priceTotal: priceTotal,
      });
    }
    if (count2 == 1) {
      count2 = 0;
      listProductInCart[reduce2].quantity =
        Number(listProductInCart[reduce2].quantity) - 1;
      listProductInCart[reduce2].priceTotal =
        Number(listProductInCart[reduce2].price) *
        Number(listProductInCart[reduce2].quantity);
    } else {
      count2 = 1;
    }
    renderProductInCart();
    removeToCart();
    putLocal(listProductInCart);
  });
}

export function renderProductInCart() {
  if (listProductInCart.length == 0) {
    $(".cart-have").hide();
    $(".cart .cart-total").hide();
    $(".cart-wrapper .cart-empty").show().css("display", "flex");
    $(".cart .price span").text("$0.00");
    $(".cart .cart-icon span").text("0");
  } else {
    const quantityProductInCart = listProductInCart.reduce(
      (cur, val) => +cur + val.quantity,
      0
    );
    const priceTotal = listProductInCart
      .reduce((cur, val) => +cur + val.priceTotal, 0)
      .toFixed(2);
    $(".cart-have").show();
    $(".cart .cart-total").show();
    $(".cart-wrapper .cart-empty").hide().css("display", "none");
    $(".cart .cart-icon span").text(`${quantityProductInCart}`);
    $(".cart .price span").text(`$${priceTotal}`);
    $(".cart-total-sub .carttotal-sub--result").text(`$${priceTotal}`);
    const html = listProductInCart
      .map((product) => {
        return `
        <li>
            <a href="./productDetail.html" class="cart-have--img">
                <img src="${product.image}" alt="">
                <span data-id="${product.productId}"><i class="fa-solid fa-xmark"></i></span>
            </a>
            <div class="cart-have__content">
                <h3 class="cart-have__content--title">
                     <a href="./productDetail.html">${product.title}</a>
                </h3>
                <p class="cart-have__content--quantity-cost">
                    <span class="cart-have__content--quantity">${product.quantity}</span>
                    x
                    <span class="cart-have__content--cost">$${product.price}</span>
                </p>
             </div>
        </li>
        `;
      })
      .join("");
    $(".cart-have").html(html);
  }
}
export function removeToCart() {
  $(".cart-have--img span").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    const removeId = $(this).closest("li").find("a span").data("id");
    const index = listProductInCart.findIndex(
      (product) => product.productId == removeId
    );
    listProductInCart.splice(index, 1);
    $(this).closest("li").css("display", "none");
    const quantityProductInCart = listProductInCart.reduce(
      (cur, val) => +cur + val.quantity,
      0
    );
    const priceTotal = listProductInCart.reduce(
      (cur, val) => +cur + val.priceTotal,
      0
    );
    $(".cart .price span").text(`$${priceTotal}`);
    $(".cart .cart-icon span").text(`${quantityProductInCart}`);
    $(".cart-total-sub .carttotal-sub--result").text(`$${priceTotal}`);
    if (listProductInCart.length == 0) {
      $(".cart-have").hide();
      $(".cart .cart-total").hide();
      $(".cart-wrapper .cart-empty").show().css("display", "flex");
      $(".cart .price span").text("$0.00");
      $(".cart .cart-icon span").text("0");
    }
    putLocal(listProductInCart);
    renderListProductsDetail();
  });
}
function pageLoad() {
  window.location.assign("http://127.0.0.1:5500/cart.html");
}
function changeToCart() {
  $(".account-cart .cart").click((e) => {
    alert("Please, waiting 3s");
    setTimeout(pageLoad(), 3000);
  });
}
changeToCart();
