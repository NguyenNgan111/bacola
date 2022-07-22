export default function discountCodeHandler() {
  $.getJSON("http://localhost:3000/superDiscountCode", (code) => {
    const banner = code
      .map((item) => {
        const discountCode = item.code;
        return `
              <a href="">
              <p>Super discount for your <span>first purchase.</span></p>
              ${discountCode ? `<button>${discountCode}</button>` : ""}
              <span class="description">Use discount code in checkout!</span>
          </a>
            `;
      })
      .join("");
    $(".super-discount").html(banner);
  });
}
