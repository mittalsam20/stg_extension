import "./footer.css";
const Footer = () => {
  return (
    <>
      <div className="footer" id="footer">
        <div className="upper-footer">
          <div className="left-footer-container">
            <div className="left-footer">
              <a href="#top">
                <img src="/images/logo_w.png" alt="logo" />
              </a>
              <h3> Made With ❤ in INDIA. </h3> <h3> Follow Us On </h3>
            </div>
            <div class="social-buttons">
              <a href="https://www.facebook.com/edunomics2020" target="_blank">
                <i class="fab fa-facebook circle-icon"> </i>
              </a>
              <a
                href="https://www.linkedin.com/company/edunomics-tech-solutions/"
                target="_blank"
              >
                <i class="fab fa-linkedin-in circle-icon"> </i>
              </a>
              <a href="https://twitter.com/edunomics2020" target="_blank">
                <i class="fab fa-twitter circle-icon"> </i>
              </a>
            </div>
          </div>

          <div className="right-footer-container">
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
          </div>
        </div>
        <hr />
        <div className="copy">
          <p> Copyright © 2021 | Script To Growth </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
