import "./footer.css";
const Footer = () => {
  return (
    <>
      <div className="footer" id="footer">
        <div className="left-footer">
          <a href="#top">
            <img src="/images/logo_w.png" alt="logo" />
          </a>
          <h3> Made With ❤ in INDIA. </h3> <h3> FOLLOW US ON </h3>
        </div>
        <div class="social-buttons">
          <a href="facebook.com">
            <i class="fab fa-facebook circle-icon"> </i>
          </a>
          <a href="linkedin.com">
            <i class="fab fa-linkedin-in circle-icon"> </i>
          </a>
          <a href="twitter.com">
            <i class="fab fa-twitter circle-icon"> </i>
          </a>
        </div>
        <div className="links-footer">
          <ul>
            <li>
              <h3> Links </h3>
            </li>
            <a href="#services">
              <li> Services </li>
            </a>
            <a href="#pricing">
              <li> Pricing </li>
            </a>
            <a href="#top">
              <li> Top </li>
            </a>
          </ul>
        </div>
        <div className="down-footer">
          <ul>
            <li>
              <h3> Downlods </h3>
            </li>
            <li> Google Meet Extension </li>
          </ul>
        </div>
        <p> Copyright© 2021 | Script To Growth </p> <hr />
      </div>
    </>
  );
};

export default Footer;
