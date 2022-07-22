import { addToCart } from "./cart.js";
import { renderSubProductDetail } from "./subProductDetail.js";
import {
  renderDetailProduct,
  renderViewedProduct,
  renderProductDetail,
} from "./productDetail.js";
const sliderHandler = $.getJSON(
  "http://localhost:3000/bannerMain",
  (products) => {
    const list = products
      .map(
        (product) => `
        <div class="item">
        <a href="./productDetail.html">
            <img src="${product.image}" alt="">
            <div class="content-wrapper">
                <div class="content-header">
                    <span class="content-desciption">${
                      product.discription
                    }</span>
                    <sapn class="content-descount">-${
                      Number(product.discount) * 100
                    }% Off</span>
                </div>
                <div class="content-body">
                    <h2>${product.title}</h2>
                    <p>${product.text}</p>
                </div>
                <div class="content-footer">
                    <span class="price-text">from</span>
                    <span class="price">$${product.price}</span>
                </div>
                <button class="btn-shop-now">Shop Now<i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </a>
    </div>
        `
      )
      .join("");
    $(".main-slider-owl").html(list);
    $(".owl-carousel.main-slider-owl").owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      items: 1,
    });
  }
);
const bestSellerHandler = function () {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((products) => {
      $.getJSON("http://localhost:3000/newProducts", (listId) => {
        const list = products
          .filter((product) => listId.find((id) => id == product.id))
          .map((item) => {
            const badgeDiscount = Math.round(Number(item.badgeDiscount) * 100);
            const saleRecommended = `
              <div class="sale-recomment">
                ${
                  badgeDiscount
                    ? `<span class="saleOff">${badgeDiscount}%</span>`
                    : ""
                }
                ${
                  item.badgeTitle
                    ? `<span class="recomment">${item.badgeTitle}</span>`
                    : ""
                }
              </div>`;
            return `<div class="item" data-id="${item.id}">
                      <div>
                        <a href="./productDetail.html">
                          <img src="${item.image}" alt="">
                          ${saleRecommended}
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
                            <h2><a href="./productDetail.html">${item.title}</a></h2>
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
                              <del>$${item.oldPrice}</del>
                              <span>$${item.price}</span>
                            </div>
                        </div> 
                        <div class="overlay">
                            <div class="btn-add-cart" data-id="${item.id}">
                              <a href="#">Add to cart</a> 
                            </div>
                        </div>
                      </div>
                  </div>`;
          });
        $(".best-seller-products").html(list.join(""));
        addToCart();
        renderSubProductDetail();
        renderDetailProduct();
        renderViewedProduct();
        renderProductDetail();
        $(".owl-carousel.best-seller-products").owlCarousel({
          loop: true,
          margin: 0,
          nav: true,
          autoplay: false,
          autoplayTimeout: 5000,
          autoplayHoverPause: true,
          responsive: {
            0: {
              items: 1,
            },
            600: {
              items: 2,
            },
            1000: {
              items: 4,
            },
          },
        });
      });
    });
};
bestSellerHandler();

$(document).ready(function () {
  $(".owl-carousel.detail-thumbnails").owlCarousel({
    loop: true,
    nav: true,
    margin: 0,
    items: 1,
  });
});
