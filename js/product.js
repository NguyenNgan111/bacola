import { addToCart } from "./cart.js";
import { renderSubProductDetail } from "./subProductDetail.js";
import {
  renderDetailProduct,
  renderViewedProduct,
  renderProductDetail,
} from "./productDetail.js";
export function newProductHandler() {
  $.getJSON("http://localhost:3000/products", (products) => {
    $.getJSON("http://localhost:3000/newProducts", (listId) => {
      const newProducts = products
        .filter((product) => listId.find((id) => id == product.id))
        .map((item) => {
          const badgeDiscount = Math.round(Number(item.badgeDiscount) * 100);
          const badgeTitle = item.badgeTitle;
          return ` <li class="col-lg-3" data-id="${item.id}">
                      <a href="./productDetail.html"><img src="${
                        item.image
                      }" alt=""></a>
                      <div class="product-content-wrapper">
                        <h2><a href="./productDetail.html">${
                          item.title
                        }</a></h2>
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
                      <div class="sale-recomment">
                      ${
                        badgeDiscount
                          ? `<span class="saleOff">${badgeDiscount}%</span>`
                          : ""
                      }
                      ${
                        badgeTitle
                          ? `<span class="recomment">${badgeTitle}</span>`
                          : ""
                      }
                      </div>
                      <div class="button-img">
                        <button class="btn-1"><a href="#"><i class="fa-solid fa-arrows-up-down-left-right"></i></a></button>
                        <button class="btn-2"><i class="fa-solid fa-heart"></i></button>
                      </div>
                      <div class="overlay">
                        <div class="btn-add-cart" data-id="${item.id}">
                        <div class="btn-add-cart--wrapper"><a href="#">Add to cart</a></div>
                      </div>
                    </div>
                  </li>`;
        })
        .join("");
      $(".new-product .container .row").html(newProducts);
      addToCart();
      renderSubProductDetail();
      renderDetailProduct();
      renderViewedProduct();
      renderProductDetail();
    });
  });
}
export function hotProductThisWeekHandler() {
  $.getJSON("http://localhost:3000/products", (products) => {
    $.getJSON("http://localhost:3000/hotProductForThisWeek", (hotProduct) => {
      const hotItem = products
        .filter((product) =>
          hotProduct.find((id) => id.productId == product.id)
        )
        .map((item) => {
          return `
                <a href="">
                <div class="product-img">
                        <img src="${item.image}" alt="">
                        <span>${Math.round(
                          Number(item.badgeDiscount) * 100
                        )}%</span>
                </div>
                <div class="product-content">
                    <span class="price"><del>$${item.oldPrice}</del>$${
            item.price
          }</span>
                    <h3>${item.title}</h3>
                    <div class="product-meta">
                        <span class="product-unit">1kg</span>
                        <span class="product-instock">Instock</span>
                    </div>
                    <div class="product-percent">
                        <div class="percent"></div>
                    </div>
                    <div class="product-expired">
                        <div class="countdown" data-date="${
                          hotProduct[0].timeExpired
                        }">
                            ${countDownTimer(
                              hotProduct[0].timeExpired,
                              hotProduct[0].timeStart
                            )}
                        </div>
                        <div class="expired-text"><span>Remains until the end of the offer</span></div>
                    </div>
                </div>
            </a>
            `;
        })
        .join("");
      $(".hot-product .product-wrapper").html(hotItem);
    });
  });
}
function countDownTimer(time, timeStart) {
  const start = new Date(timeStart).getTime();
  const x = setInterval(() => {
    const timeNow = new Date().getTime();
    const deadline = new Date(time).getTime() - timeNow;
    const percent = Math.floor(
      ((timeNow - start) * 100) / (new Date(time).getTime() - start)
    );
    const days = `0${Math.floor(deadline / (24 * 3600 * 1000))}`.slice(-2);
    const hours = `0${Math.floor(
      (deadline % (24 * 3600 * 1000)) / (3600 * 1000)
    )}`.slice(-2);
    const minutes = `0${Math.floor(
      (deadline % (1000 * 3600)) / (1000 * 60)
    )}`.slice(-2);
    const seconds = `0${Math.floor((deadline % (1000 * 60)) / 1000)}`.slice(-2);
    const html = ` <div class="count-item days">${days}</div>
               <span>:</span>
               <div class="count-item hours">${hours}</div>
               <span>:</span>
               <div class="count-item minutes">${minutes}</div>
               <span>:</span>
               <div class="count-item second">${seconds}</div>`;
    $(".countdown").html(html);
    $(".product-percent .percent").css("width", `${percent}%`);
  }, 1000);
}
export function trendingProductHandler() {
  $.getJSON("http://localhost:3000/products", (products) => {
    $.getJSON("http://localhost:3000/trendingProducts", (trendingProducts) => {
      const trendProducts = products
        .filter((product) => trendingProducts.find((id) => id == product.id))
        .map((item) => {
          return ` <li>
            <div class="trending--products-img">
                <a href="./productDetail.html"><img src="${item.image}" alt=""></a>
            </div>
            <div class="trending--products-content">
              <h6><a href="./productDetail.html">${item.title}</a></h6>
              <span class="trending--products-price"><del>$${item.oldPrice}</del>$${item.price}</span>
            </div>
            </li>`;
        })
        .join("");
      $(".banner-trending--products ul").html(trendProducts);
    });
  });
}
export function categoriesHandler() {
  $.getJSON("http://localhost:3000/categories", (data) => {
    const firstItem = data.shift();
    const html1 = ` <a href="">
    <img src="${firstItem.image}" alt="">
    <h4>${firstItem.title}</h4>
    </a>
    <span>${firstItem.items} Items</span>`;
    const htmlList = data
      .map((item) => {
        return `<li class="col-lg-3">
        <a href=""><img src="${item.image}" alt=""></a>
        <div>
            <h4><a href="">${item.title}</a></h4>
            <span>${item.items} Items</span>
        </div>
    </li>`;
      })
      .join("");
    $(".container-3__products--main").html(html1);
    $(".container-3__products--list .container .row").html(htmlList);
  });
}
export function superDiscountWeekendHandler() {
  $.getJSON("http://localhost:3000/products", (products) => {
    $.getJSON("http://localhost:3000/superDiscountWeekend", (list) => {
      let i = 0;
      const html = products
        .filter((product) => list.find((item) => item.productId == product.id))
        .forEach((element) => {
          $(".banner-weekend-discount .row").append(`
            <div class="col" data-id="${element.id}">
                <a href="">
                    <div class="banner-content">
                        <h6 class="content-header">${list[i].text}</h4>
                    <div class="content-main">
                        <h3>${element.title}</h3>
                        <p>${list[i++].discription}</p>
                    </div>
                        <button>Shop Now</button>
                    </div>
                </a>
            </div>
          `);
          setBackgroundImage(element.image, element.id);
        });
    });
  });
}
function setBackgroundImage(url, id) {
  $(`.banner-weekend-discount .row .col[data-id=${id}]`).css(
    "backgroundImage",
    `url("${url}")`
  );
}
export function subBannerHandler() {
  $.getJSON("http://localhost:3000/subBanner", (data) => {
    let i = 1;
    const btn = `<span class="banner-content--btn">Shop Now</span> `;
    const html = data
      .map((banner) => {
        return `
      <a href="./productDetail.html" class="banner-${i++}">
        <div class="banner-content">
            <h6 class="banner-content--header">${banner.subText}</h6>
            <div class="banner-content--main">
                <h4>${banner.text}</h4>
                <h3>${banner.title}</h3>
            </div>
            <div class="banner-content--footer">
                <span>Only from</span>
                <span class="banner-price">$${banner.price}</span>
            </div>
            ${i == 3 ? btn : ""}
        </div>
    </a>
        `;
      })
      .join("");
    $(".banner .banner-wrapper").html(html);
  });
}
