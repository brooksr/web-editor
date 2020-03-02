export let modal = `
<style>
  #usi_container {
    height:100%;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    font-size: 18px;
  }
  .usi_display {
    margin: auto;
    text-align:center;
    overflow: auto;
    position:absolute;
    max-width: 100%;
    max-height: 100vh;
    padding: 2em;
    right: 0;
    left: 0;
    top: 10%;
    width:35em;
    box-shadow: 0 0 20px 0 var(--overlay-color);
    font-family: var(--text-font);
    font-size: 1em;
    color: var(--main-font-color);
    background-color: var(--main-bg-color);
    background-image: url(https://image-us.samsung.com/SamsungUS/home/hp/unpacked/HP_KV_S20_Ultra5G_021120_D.jpg?$cm-g-fb-full-bleed-img-jpg$);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .usi_display * {
    font-family: inherit;
    font-size: inherit;
    margin: 0;
    padding: 0;
  }
  .usi_display img {
    max-width: 100%;
  }
  .usi_display button {
    cursor: pointer;
  }
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
  #usi_close {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    width: 1em;
    height: 1em;
    line-height: 1;
    font-size: 2em;
    color: var(--text-font);
    opacity: 0.5;
    padding: 0;
  }
  #usi_close:after {
    content: "\\\u00D7";
  }
  .usi_display h1 {
    font-family: var(--display-font);
    font-size: 2em;
    margin: 0;
  }
  .usi_display p {
    padding: 1em 0;
  }
  .usi_page {display:none;}
  .usi_active {display:inherit;}

  #usi_shadow {
    background-color: var(--overlay-color);
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
  }

  .usi_email_container label {
    text-align: left;
    font-size: 0.8em;
    color: var(--main-font-color);
    display: block;
    margin: 0.5em auto;
    padding: 0 5%;
    width: 100%;
    max-width: 420px;
  }
  .usi_email_container input {
    display: block;
    margin: 0.5em auto;
    padding: 5%;
    width: 100%;
    border-radius: 5px;
    border: 2px solid #eee;
    max-width: 420px;
  }
  .usi_email_container input:focus {
    border: 2px solid var(--primary-color);
  }
  .usi_email_container button {
    width: 100%;
    max-width: 420px;
    border-radius: 25px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .usi_logo {
    max-width: 10em;
    display: block;
    margin: 0 auto 1em;
    fill: #1428a0;
  }

  .usi_img {
    padding:1em;
    width: 10em;
  }
  .usi_name {
    font-weight: bold;
    padding-bottom: 0.5em;
  }
  .usi_price {
    font-size:0.8em;
    padding-bottom: 0.5em;
  }


  .usi_row {
    display: block;
  }
  .usi_col {
    float: left;
    padding: 0 1em;
  }
  .usi_col1 { width: 8.333333333333333%; }
  .usi_col2 { width: 16.666666666666666%; }
  .usi_col3 { width: 25%; }
  .usi_col4 { width: 33.33333333333333%; }
  .usi_col5 { width: 41.66666666666667%; }
  .usi_col6 { width: 50%; }
  .usi_col7 { width: 58.33333333333333%; }
  .usi_col8 { width: 66.66666666666667%; }
  .usi_col9 { width: 75%; }
  .usi_col10 { width: 83.33333333333333%; }
  .usi_col11 { width: 91.66666666666666%; }
  .usi_col12 { width: 100%; }
  @media screen and (max-width: 770px) {
    .usi_hide_tablet { display: none; }
    .usi_col_tbl1 { width: 8.333333333333333%; }
    .usi_col_tbl2 { width: 16.666666666666666%; }
    .usi_col_tbl3 { width: 25%; }
    .usi_col_tbl4 { width: 33.33333333333333%; }
    .usi_col_tbl5 { width: 41.66666666666667%; }
    .usi_col_tbl6 { width: 50%; }
    .usi_col_tbl7 { width: 58.33333333333333%; }
    .usi_col_tbl8 { width: 66.66666666666667%; }
    .usi_col_tbl9 { width: 75%; }
    .usi_col_tbl10 { width: 83.33333333333333%; }
    .usi_col_tbl11 { width: 91.66666666666666%; }
    .usi_col_tbl12 { width: 100%; }
    
    .usi_display {
      /*font-size: 2.5vw;*/
      top: auto;
      height: auto;
      bottom: 0;
    }
  }
  @media screen and (max-width: 480px) {
    .usi_hide_mobile { display: none; }
    .usi_col_mbl1 { width: 8.333333333333333%; }
    .usi_col_mbl2 { width: 16.666666666666666%; }
    .usi_col_mbl3 { width: 25%; }
    .usi_col_mbl4 { width: 33.33333333333333%; }
    .usi_col_mbl5 { width: 41.66666666666667%; }
    .usi_col_mbl6 { width: 50%; }
    .usi_col_mbl7 { width: 58.33333333333333%; }
    .usi_col_mbl8 { width: 66.66666666666667%; }
    .usi_col_mbl9 { width: 75%; }
    .usi_col_mbl10 { width: 83.33333333333333%; }
    .usi_col_mbl11 { width: 91.66666666666666%; }
    .usi_col_mbl12 { width: 100%; }
    .usi_display {
      font-size: 3.5vw;
    }
  }
</style>
<script type="text/javascript">
	window.usi_js = {
    	show: function(name){
          var usi_name = document.querySelector(name);
          var usi_active = document.querySelector(".usi_active");
          usi_active.classList.remove("usi_active");
          usi_name.classList.add("usi_active");
        }
    }
</script>
<div id="usi_shadow" class="usi_hide_mobile"></div>
<div id="usi_container">
  <div class="usi_display">
    <div class="usi_content">
      <button id="usi_close" class="usi_button" type="button" aria-label="Close"></button>
      <div class="usi_row">
        <div class="usi_col usi_col5 usi_hide_mobile">
          <div class="usi_header">You Viewed</div>
          <div class="usi_product">
            <img class="usi_img" src="https://www.placehold.it/200">
            <div class="usi_name">Product Name</div>
            <div class="usi_price">$99.99</div>
          </div>
        </div>
        <div class="usi_col usi_col7 usi_col_mbl12">

          <div class="usi_logo">
            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.95 26.79" role="presentation" aria-hidden="true" tabindex="-1" disabled="disabled" clickable="false"><path d="M638.8,443.72a3.11,3.11,0,0,1,0-1.31,2.06,2.06,0,0,1,2.29-1.69,2.14,2.14,0,0,1,2.32,2.27v1.55h6.24v-1.76c0-5.44-4.91-6.31-8.44-6.31-4.44,0-8.07,1.47-8.74,5.56a8.64,8.64,0,0,0,0,3.37c1.08,5.11,10,6.59,11.26,9.83a3.23,3.23,0,0,1,0,1.85,2.16,2.16,0,0,1-2.44,1.69,2.23,2.23,0,0,1-2.5-2.28v-2.41h-6.71V456c0,5.59,4.39,7.27,9.09,7.27,4.52,0,8.23-1.54,8.83-5.73a12.43,12.43,0,0,0,0-4.09C649,448.2,639.51,446.65,638.8,443.72Zm81.34.06a3.35,3.35,0,0,1,0-1.29,2.05,2.05,0,0,1,2.27-1.67,2.11,2.11,0,0,1,2.29,2.25v1.53h6.17v-1.74c0-5.39-4.83-6.24-8.33-6.24-4.41,0-8,1.45-8.66,5.51a8.35,8.35,0,0,0,.06,3.33c1.07,5.06,9.87,6.52,11.15,9.72a3.38,3.38,0,0,1,0,1.83c-.19.83-.75,1.67-2.41,1.67a2.21,2.21,0,0,1-2.49-2.24V454h-6.64v1.91c0,5.53,4.33,7.2,9,7.2,4.47,0,8.16-1.53,8.75-5.66a12.19,12.19,0,0,0,0-4.05C730.23,448.24,720.85,446.68,720.14,443.78Zm56.79,13.63L771,437.27h-9.28V462h6.14l-.36-20.78L773.86,462h8.9V437.27h-6.18Zm-118-20.14-4.63,25h6.76l3.49-23.15,3.41,23.15h6.71l-4.61-25Zm37.78,0-3.16,19.55-3.15-19.55h-10.2l-.54,25h6.25l.17-23.15,4.3,23.15h6.34l4.3-23.15.17,23.15h6.27l-.56-25Zm58.12,0H748.5v18.5a4.4,4.4,0,0,1-.06,1,2.49,2.49,0,0,1-4.79,0,4,4,0,0,1-.06-1v-18.5h-6.32V455.2c0,.46,0,1.41.06,1.65.44,4.67,4.12,6.19,8.72,6.19s8.29-1.52,8.73-6.19a13,13,0,0,0,.05-1.65Zm43.43,11v3.65h2.56v3.62a4.57,4.57,0,0,1-.07,1,2.7,2.7,0,0,1-5.11,0,6.21,6.21,0,0,1-.07-1V444.08a5.11,5.11,0,0,1,.11-1.18,2.62,2.62,0,0,1,5,0,6.59,6.59,0,0,1,.08,1v1.39H807v-.82a15,15,0,0,0,0-1.66c-.47-4.69-4.34-6.18-8.77-6.18s-8.23,1.5-8.78,6.18c0,.43-.13,1.2-.13,1.66v10.51a14.25,14.25,0,0,0,.1,1.65c.41,4.56,4.37,6.18,8.79,6.18s8.38-1.62,8.79-6.18c.07-.84.08-1.19.09-1.65v-6.7Z" transform="translate(-632.15 -436.48)"></path><rect class="btn" fill="transparent" width="100%" height="100%"></rect></svg>
          </div>

          <div class="usi_p1 usi_page usi_active">
            <h1 class="usi_heading">Galaxy S20 5G</h1>
            <p>Pre-order today & get more of what you want.</p>
            <div class="usi_email_container">
              <label class="usi_label" for="usi_email">Email address</label>
              <input class="usi_input" id="usi_email" name="usi_email" type="email" autocomplete="email" placeholder="Enter your email">
              <button class="usi_button" type="button" onclick="usi_js.show('.usi_p2')">Redeem Now</button>
            </div>
          </div>
          <div class="usi_p2 usi_page">
            <h1 class="usi_h">Thanks!</h1>
            <p>Your email will be delivered soon.</p>
            <button class="usi_button" type="button" onclick="alert('Continue')">Continue</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
`;
