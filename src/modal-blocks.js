export const modalBlocks  = [
  {
    id: "row",
    html: `<div class="usi_row"><div class="usi_col">Placeholder</div></div>`
  }, {
    id: "col",
    html: `<div class="usi_col">Placeholder</div>`
  }, {
    id: "button",
    html: `
    <style>
      .usi_button {
        background: var(--primary-color);
        border: none;
        text-align: center;
        color: var(--primary-color-text);
        padding: 1em 2em;
      }
      .usi_button:hover {
        background: var(--primary-color-dark);
      }
      </style>
      <button class="usi_button" type="button" class="usi_submit">Redeem Now</button>`
  }, {
    id: "heading",
    html: `
      <style>
      </style>
      <div class="usi_heading">
            <h1>Sit. Stay. Shop.</h1>
            <p>Take 15% off your next purchase.</p>
        </div>`
  }, {
    id: "email",
    html: `
<style>
 .usi_email_container label {
    text-align: left;
    font-size: 0.8em;
    color: #666;
}
.usi_email_container input, .usi_email_container label {
    display: block;
    margin: 0.5em auto;
    padding: 0.5em;
    width: 100%;
    max-width: 420px;
}
.usi_email_container button {
    width: 100%;
    max-width: 420px;
}
  .usi_page {display:none;}
  .usi_active {display:inherit;}
</style>
      <div class="usi_page usi_p1 usi_active">
        <h1 class="usi_heading">Sit. Stay. Shop!</h1>
        <p>Enter your email and receive 15% off your next order.</p>
        <div class="usi_email_container">
          <label class="usi_label" for="usi_email">Email address</label>
          <input class="usi_input" id="usi_email" name="usi_email" type="email" autocomplete="email" placeholder="Enter your email">
          <button class="usi_button" type="button" onclick="debugger;usi_js.show('.usi_p2')">Redeem Now</button>
        </div>
      </div>
      <div class="usi_page usi_p2">
        <h1 class="usi_h">Thanks!</h1>
        <p>Your email will be delivered soon.</p>
        <button class="usi_button" type="button" onclick="alert('Continue')">Continue</button>
      </div>`
  }, {
    id: "Product List",
    html: `
<style>
  .usi_img {
    padding:1em;
  }
  .usi_name {
    font-weight: bold;
    padding-bottom: 0.5em;
  }
  .usi_price {
    font-size:0.8em;
    padding-bottom: 0.5em;
  }
</style>
<div class="usi_products">
  <div class="usi_product usi_row clearfix">
      <img class="usi_img usi_col usi_col3" src="https://www.placehold.it/200">
      <div class="usi_info usi_col usi_col9">
        <div class="usi_name">Product Name 1</div>
        <div class="usi_price">$99.99</div>
      </div>
  </div>
  <div class="usi_product usi_row clearfix">
      <img class="usi_img usi_col usi_col3" src="https://www.placehold.it/200">
      <div class="usi_info usi_col usi_col9">
        <div class="usi_name">Product Name 2</div>
        <div class="usi_price">$99.99</div>
      </div>
  </div>
  <div class="usi_product usi_row clearfix">
      <img class="usi_img usi_col usi_col3" src="https://www.placehold.it/200">
      <div class="usi_info usi_col usi_col9">
        <div class="usi_name">Product Name 3</div>
        <div class="usi_price">$99.99</div>
      </div>
  </div>
</div>`
  }, {
    id: "1 product",
    html: `
      <style>
      .usi_product {
      text-align: center;
      }
      </style>
      <div class="usi_product">
    <img src="https://www.placehold.it/200">
    <div class="usi_name">Product Name</div>
    <div class="usi_price">$99.99</div>
</div>`
  }/*, {
    id: "video",
    html: `<iframe width="560" height="315" src="https://www.youtube.com/embed/NpEaa2P7qZI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  }*/
];