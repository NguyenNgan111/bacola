export function locationHandler() {
  renderLocation();
  searchLocation();
}
function renderLocation() {
  $.getJSON("http://localhost:3000/location", (list) => {
    let firstItem = 1;
    const html = list
      .map((item) => {
        if (firstItem == 1) {
          firstItem = 0;
          return `  <li>
                <a href="#">
                    <span class="title">Seclect location</span>
                    <span class="price">Clear all</span>
                </a>
            </li>`;
        } else {
          return `
            <li>
                <a href="#">
                     <span class="title">${item.address}</span>
                    <span class="price">Min:$${item.minPrice}</span>
                </a>
            </li>
            `;
        }
      })
      .join("");
    $(".list-location").html(html);
    clickHandle();
  });
}
function searchLocation() {
  $.getJSON("http://localhost:3000/location", (list) => {
    $(".location-wrapper form input").keyup(() => {
      const value = $(".location-wrapper form input").val().toLowerCase();
      if (value) {
        const locations = list
          .filter((item) => item.address.toLowerCase().indexOf(value) > -1)
          .map((element) => {
            return `
                <li>
                   <a href="#">
                   <span class="title">${element.address}</span>
                   <span class ="price">Min:$${element.minPrice}</span>
                   </a>
               </li>
           `;
          })
          .join("");
        locations
          ? $(".list-location").html(locations)
          : $(".list-location").html(
              "<li style='opacity:0.3;' href=''>no results found</li>"
            );
      } else {
        renderLocation();
      }
    });
  });
}
function clickHandle() {
  $(".list-location li").click((e) => {
    e.preventDefault();
    const value = e.target.closest("li").querySelector("a .title").textContent;
    $(".select-location-name").text(value);
    $(".delivery-location-ovelay").fadeOut();
  });
}
export function showHideLocation() {
  $(".delivery-location-ovelay").fadeOut();
  $(".select-location a").click((e) => {
    e.preventDefault();
    $(".delivery-location-ovelay").fadeIn(500).css("visibility", "visible");
  });
  $(".delivery-location-ovelay").click(() => {
    $(".delivery-location-ovelay").fadeOut();
    $(".location-wrapper").click((e) => {
      e.stopPropagation();
      $(".location-wrapper .exist").click(() => {
        $(".delivery-location-ovelay").fadeOut();
      });
    });
  });
}
