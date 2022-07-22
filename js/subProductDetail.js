import { listProductInCart } from "./cart.js";
import { renderProductInCart, removeToCart, putLocal } from "./cart.js";
export function renderSubProductDetail() {
  $("li .button-img>.btn-1").click((e) => {
    e.stopPropagation();
    e.preventDefault();
    $(".product-detail-overlay").css("visibility", "visible");
    const productId = e.target.closest("li").dataset.id;
    const title = e.target
      .closest("li")
      .querySelector(".product-content-wrapper h2 a").textContent;
    const discount = e.target
      .closest("li")
      .querySelector(".sale-recomment .saleOff")
      ? e.target
          .closest("li")
          .querySelector(".sale-recomment .saleOff")
          .textContent.slice(0, -1)
      : 0;
    const recommended = e.target
      .closest("li")
      .querySelector(".sale-recomment .recomment")
      ? e.target.closest("li").querySelector(".sale-recomment .recomment")
          .textContent
      : "";
    let image = e.target
      .closest("li")
      .querySelector("a img")
      .getAttribute("src");
    const oldPrice = e.target
      .closest("li")
      .querySelector(".product-price del")
      .textContent.slice(1);
    const newPrice = e.target
      .closest("li")
      .querySelector(".product-price span")
      .textContent.slice(1);
    // const discription = e.target.closest("");
    $(".product-detail-overlay .addCart").attr("data-id", productId);
    $(
      ".product-detail-overlay .product-detail-wrapper .product-detail-title"
    ).text(title);
    if (discount) {
      $(
        ".product-detail-overlay .product-detail-wrapper .product-detail-main .discount"
      ).css("display", "block");
      $(
        ".product-detail-overlay .product-detail-wrapper .product-detail-main .discount"
      ).text(`${discount}%`);
    } else {
      $(
        ".product-detail-overlay .product-detail-wrapper .product-detail-main .discount"
      ).css("display", "none");
    }
    if (recommended) {
      $(
        ".product-detail-overlay .product-detail-wrapper .product-detail-main .recomment"
      ).css("display", "block");
      $(
        ".product-detail-overlay .product-detail-wrapper .product-detail-main .recomment"
      ).text(recommended);
    } else {
      $(
        ".product-detail-overlay .product-detail-wrapper .product-detail-main .recomment"
      ).css("display", "none");
    }
    $(
      ".product-detail-overlay .product-detail-wrapper .detail-thumbnails .item img"
    ).attr("src", image);
    $(".product-detail-overlay .product-detail-wrapper .price del").text(
      `$${oldPrice}`
    );
    $(".product-detail-overlay .product-detail-wrapper .newPrice").text(
      `$${newPrice}`
    );
  });
  $(".item .button-img .btn-1").click((e) => {
    e.stopPropagation();
    e.preventDefault();
    $(".product-detail-overlay").css("visibility", "visible");
    const title = e.target
      .closest(".item")
      .querySelector(".product-content-wrapper h2 a").textContent;
    const discount = e.target
      .closest(".item")
      .querySelector(".sale-recomment .saleOff")
      ? e.target
          .closest(".item")
          .querySelector(".sale-recomment .saleOff")
          .textContent.slice(0, -1)
      : 0;
    const recommended = e.target
      .closest(".item")
      .querySelector(".sale-recomment .recomment")
      ? e.target.closest(".item").querySelector(".sale-recomment .recomment")
          .textContent
      : "";
    let image = e.target
      .closest(".item")
      .querySelector("a img")
      .getAttribute("src");
    const oldPrice = e.target
      .closest(".item")
      .querySelector(".product-price del")
      .textContent.slice(1);
    const newPrice = e.target
      .closest(".item")
      .querySelector(".product-price span")
      .textContent.slice(1);
    // const discription = e.target.closest("");
    $(
      ".product-detail-overlay .product-detail-wrapper .product-detail-title"
    ).text(title);
    if (discount) {
      $(
        ".product-detail-overlay .product-detail-wrapper .product-detail-main .discount"
      ).css("display", "block");
      $(
        ".product-detail-overlay .product-detail-wrapper .product-detail-main .discount"
      ).text(`${discount}%`);
    } else {
      $(
        ".product-detail-overlay .product-detail-wrapper .product-detail-main .discount"
      ).css("display", "none");
    }
    if (recommended) {
      $(
        ".product-detail-overlay .product-detail-wrapper .product-detail-main .recomment"
      ).css("display", "block");
      $(
        ".product-detail-overlay .product-detail-wrapper .product-detail-main .recomment"
      ).text(recommended);
    } else {
      $(
        ".product-detail-overlay .product-detail-wrapper .product-detail-main .recomment"
      ).css("display", "none");
    }
    $(
      ".product-detail-overlay .product-detail-wrapper .detail-thumbnails .item img"
    ).attr("src", image);
    $(".product-detail-overlay .product-detail-wrapper .price del").text(
      `$${oldPrice}`
    );
    $(".product-detail-overlay .product-detail-wrapper .newPrice").text(
      `$${newPrice}`
    );
  });
}
export function existSubProductDetail() {
  $(".product-detail-overlay").click((e) => {
    $(".product-detail-overlay").css("visibility", "hidden");
  });
  $(".product-detail-overlay .product-detail-wrapper").click((e) => {
    e.stopPropagation();
  });
  $(".product-detail-overlay .product-detail-wrapper .exit").click((e) => {
    $(".product-detail-overlay").css("visibility", "hidden");
  });
}

function addCart() {
  $(".product-detail-overlay .quantity-addcart .addCart").click((e) => {
    e.stopPropagation();
    e.preventDefault();
    const id = e.target.closest("form .addCart").dataset.id;
    const test = listProductInCart.findIndex(
      (product) => product.productId == id
    );
    const quantity = Number(
      e.target.closest("form").querySelector("input").value
    );
    if (test > -1) {
      listProductInCart[test].quantity =
        Number(listProductInCart[test].quantity) + Number(quantity);
      listProductInCart[test].priceTotal =
        Number(listProductInCart[test].price) *
        listProductInCart[test].quantity;
    } else {
      const title = e.target
        .closest(".product-detail-overlay")
        .querySelector("h2").textContent;
      const image = e.target
        .closest(".product-detail-overlay")
        .querySelector("img")
        .getAttribute("src");
      const price = e.target
        .closest(".product-detail-overlay")
        .querySelector(".product-content .newPrice")
        .textContent.slice(1);
      const badgeDiscount = e.target
        .closest(".product-detail-overlay")
        .querySelector(".discount")
        ? Number(
            e.target
              .closest(".product-detail-overlay")
              .querySelector(".discount")
              .textContent.slice(0, -1)
          ) / 100
        : 0;
      const priceTotal = Number(price) * Number(quantity);
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
    renderProductInCart();
    removeToCart();
    putLocal(listProductInCart);
  });
}
addCart();
function increaseInputHandler() {
  $(".product-detail-overlay .btn-plus").click((e) => {
    e.preventDefault();
    const input = e.target.closest("form").querySelector("input");
    if (Number(e.target.closest("form").querySelector("input").value) < 19) {
      input.value = +e.target.closest("form").querySelector("input").value + 1;
    }
  });
}
increaseInputHandler();
function reducedInputHandler() {
  $(".product-detail-overlay .btn-subtract").click((e) => {
    e.preventDefault();
    const input = e.target.closest("form").querySelector("input");
    if (e.target.closest("form").querySelector("input").value != 1) {
      input.value = +e.target.closest("form").querySelector("input").value - 1;
    }
  });
}
reducedInputHandler();
