//super discount
import discountCodeHandler from "./discountCode.js";
discountCodeHandler();
//new products
import {
  newProductHandler,
  hotProductThisWeekHandler,
  trendingProductHandler,
  categoriesHandler,
  superDiscountWeekendHandler,
  subBannerHandler,
} from "./product.js";
newProductHandler();
hotProductThisWeekHandler();
trendingProductHandler();
categoriesHandler();
superDiscountWeekendHandler();
subBannerHandler();
//location
import { locationHandler, showHideLocation } from "./location.js";
locationHandler();
showHideLocation();
//cart
import { renderProductInCart, removeToCart } from "./cart.js";
renderProductInCart();
removeToCart();
//product detail
import {
  renderSubProductDetail,
  existSubProductDetail,
} from "./subProductDetail.js";
renderSubProductDetail();
existSubProductDetail();
//login
import { loginHandler } from "./login.js";
loginHandler();
//cart detail
import { renderListProductsDetail } from "./detailCart.js";
renderListProductsDetail();
//product detail
import { productDetailHandler } from "./productDetail.js";
productDetailHandler();
//test local
// const test = JSON.stringify([
//   { name: "ngan", age: 20 },
//   { name: "tu", age: 20 },
// ]);
// console.log(test);
// const json = JSON.parse(test);
// json.forEach((element) => {
//   console.log(element.name);
// });
