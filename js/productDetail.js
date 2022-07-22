import { listProductInCart } from "./cart.js";
import { renderProductInCart, removeToCart, putLocal } from "./cart.js";
import { renderSubProductDetail } from "./subProductDetail.js";
const dataProductViewed = localStorage.getItem("productViewed");
export const listProductViewed = JSON.parse(dataProductViewed)
  ? JSON.parse(dataProductViewed)
  : [];
export function productDetailHandler() {}

function increaseInputHandler() {
  $(
    ".product-detail-content .product-detail-wrapper .product-detail-main .product-content .btn-plus"
  ).click((e) => {
    e.preventDefault();
    const input = e.target.closest("form").querySelector("input");
    if (Number(e.target.closest("form").querySelector("input").value) < 19) {
      input.value = +e.target.closest("form").querySelector("input").value + 1;
    }
  });
}
function reducedInputHandler() {
  $(
    ".product-detail-content .product-detail-wrapper .product-detail-main .product-content .btn-subtract"
  ).click((e) => {
    e.preventDefault();
    const input = e.target.closest("form").querySelector("input");
    if (e.target.closest("form").querySelector("input").value != 1) {
      input.value = +e.target.closest("form").querySelector("input").value - 1;
    }
  });
}
increaseInputHandler();
reducedInputHandler();

export function putLocalViewd(listProductViewed) {
  localStorage.removeItem("productViewed");
  const listProducts = JSON.stringify(listProductViewed);
  localStorage.setItem("productViewed", listProducts);
}
export function renderViewedProduct() {
  const html = listProductViewed
    .map(
      (product) =>
        `<li class="col-lg-3">
    <div>
        <a href="#">
            <img src="${product.image}" alt="">
            <div class="sale-recomment">
                <span class="saleOff">${
                  Number(product.badgeDiscount) * 100
                }%</span>
                <span class="recomment">${product.badgeRecommenned}</span>
            </div>
            <div class="button-img">
                <button class="btn-1">
                        <i class="fa-solid fa-arrows-up-down-left-right"></i>
                </button>
                <button class="btn-2">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </div>
        </a>
        <div class="product-content-wrapper">
            <h2><a href="#">${product.title}</a></h2>
            <span class="meta">In Stock</span>
            <div class="star-rating">
                <i class="fa-solid fa-star nice-rating"></i>
                <i class="fa-solid fa-star nice-rating"></i>       
                <i class="fa-solid fa-star nice-rating"></i>
                <i class="fa-solid fa-star nice-rating"></i>
                <i class="fa-solid fa-star"></i>
                <span class="rating-quantity">1</span>                              
            </div>
            <div class="product-price">
                <del>$${product.oldPrice}</del>
                <span>$${product.price}</span>
            </div>
        </div>
        <div class="overlay">
            <div class="btn-add-cart">
                <a href="">Add to cart</a> 
            </div>
        </div>
    </div>
    <div class="border-wrapper"></div>
</li>`
    )
    .join("");
  $(".product-viewed-wrapper .container ul").html(html);
}
export function renderDetailProduct() {
  $(".products .best-sellers .item a").click((e) => {
    // {
    //   productId: 1,
    //   title: "All Natural Italian-Style Chicken Meatballs",
    //   image:
    //     "https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62-346x310.jpg",
    //   price: 7.25,
    //   oldPrice: 9.35
    //   badgeDiscount: 0.23,
    //   quantity: 1,
    //   priceTotal: 7.25,
    //   badgeRecommenned
    // }
    const productId = e.target.closest(".item").dataset.id;
    console.log(productId);
    const title = e.target
      .closest(".item")
      .querySelector(".product-content-wrapper h2 a").textContent;
    const image = e.target
      .closest(".item")
      .querySelector("a img")
      .getAttribute("src");
    const oldPrice = e.target
      .closest(".item")
      .querySelector(".product-price del")
      .textContent.slice(1);
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
    const badgeRecommenned = e.target
      .closest(".item")
      .querySelector(".recomment")
      ? e.target.closest(".item").querySelector(".recomment").textContent
      : "";
    const quantity = 1;
    const priceTotal = Number(price) * quantity;
    listProductViewed.unshift({
      productId: productId,
      title: title,
      image: image,
      oldPrice: oldPrice,
      price: price,
      badgeDiscount: badgeDiscount,
      badgeRecommenned: badgeRecommenned,
      quantity: quantity,
      priceTotal: priceTotal,
    });
    putLocalViewd(listProductViewed);
    renderViewedProduct(listProductViewed);
    renderProductDetail();
  });
  $(".products .new-product a").click((e) => {
    // {
    //   productId: 1,
    //   title: "All Natural Italian-Style Chicken Meatballs",
    //   image:
    //     "https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62-346x310.jpg",
    //   price: 7.25,
    //   oldPrice: 9.35
    //   badgeDiscount: 0.23,
    //   quantity: 1,
    //   priceTotal: 7.25,
    //   badgeRecommenned
    // }
    const productId = e.target.closest("li").dataset.id;
    console.log(productId);
    const title = e.target
      .closest("li")
      .querySelector(".product-content-wrapper h2 a").textContent;
    const image = e.target
      .closest("li")
      .querySelector("a img")
      .getAttribute("src");
    const oldPrice = e.target
      .closest("li")
      .querySelector(".product-price del")
      .textContent.slice(1);
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
    const badgeRecommenned = e.target.closest("li").querySelector(".recomment")
      ? e.target.closest("li").querySelector(".recomment").textContent
      : "";
    const quantity = 1;
    const priceTotal = Number(price) * quantity;
    listProductViewed.unshift({
      productId: productId,
      title: title,
      image: image,
      oldPrice: oldPrice,
      price: price,
      badgeDiscount: badgeDiscount,
      badgeRecommenned: badgeRecommenned,
      quantity: quantity,
      priceTotal: priceTotal,
    });
    putLocalViewd(listProductViewed);
    renderViewedProduct(listProductViewed);
    renderProductDetail();
  });
}
renderDetailProduct();
renderViewedProduct(listProductViewed);
export function renderProductDetail() {
  $(".product-detail-content .addCart").attr(
    "data-id",
    listProductViewed[0].productId
  );
  $(".product-detail-content .product-detail-wrapper h2").html(
    listProductViewed[0].title
  );
  $(
    ".product-detail-content .product-detail-wrapper .product-detail-main .product-thumbnails .discount"
  ).css("display", "block");
  $(
    ".product-detail-content .product-detail-wrapper .product-detail-main .product-thumbnails .recomment"
  ).css("display", "block");
  if (listProductViewed[0].badgeDiscount) {
    $(
      ".product-detail-content .product-detail-wrapper .product-detail-main .product-thumbnails .discount"
    ).html(`${Number(listProductViewed[0].badgeDiscount) * 100}%`);
  } else {
    $(
      ".product-detail-content .product-detail-wrapper .product-detail-main .product-thumbnails .discount"
    ).css("display", "none");
  }
  if (listProductViewed[0].badgeRecommenned) {
    $(
      ".product-detail-content .product-detail-wrapper .product-detail-main .product-thumbnails .recomment"
    ).html(`${listProductViewed[0].badgeRecommenned}`);
  } else {
    $(
      ".product-detail-content .product-detail-wrapper .product-detail-main .product-thumbnails .recomment"
    ).css("display", "none");
  }
  $(
    ".product-detail-content .product-detail-wrapper .detail-thumbnails img"
  ).attr("src", listProductViewed[0].image);
  $(
    ".product-detail-content .product-detail-wrapper .product-content .price del"
  ).html(`$${listProductViewed[0].oldPrice}`);
  $(
    ".product-detail-content .product-detail-wrapper .product-content .price .newPrice"
  ).html(`$${listProductViewed[0].price}`);
}
function addCart() {
  $(
    ".product-detail-content .product-detail-wrapper .product-detail-main .product-content .addCart"
  ).click((e) => {
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
        .closest(".product-detail-wrapper")
        .querySelector("h2").textContent;
      const image = e.target
        .closest(".product-detail-wrapper")
        .querySelector("img")
        .getAttribute("src");
      const price = e.target
        .closest(".product-detail-wrapper")
        .querySelector(".product-content .price .newPrice")
        .textContent.slice(1);
      const badgeDiscount = e.target
        .closest(".product-detail-wrapper")
        .querySelector(".discount")
        ? Number(
            e.target
              .closest(".product-detail-wrapper")
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
