import { Link } from "react-router-dom";
import $ from "jquery";
import "./nav.css";

const Nav = () => {
  return (
    <>
      <nav className="sitenav">
        <a href="#top">
          <img className="nav_logo" src="/images/logo_t.png" alt="ST_LOGO" />
        </a>
        <ul id="diff">
          <li>
            <a href="#top" className="sitenavlink">
              Home
            </a>
          </li>
          <li>
            <a href="#services" className="sitenavlink">
              Features
            </a>
          </li>
          {/* <li>
            <a href="#footer" className="sitenavlink">
              Contact Us
            </a>
          </li> */}
          <li>
            <Link to="/login" className="sitenavlink">
              Login/Signup
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

<script>
  $(document).ready(function()
  {$(window).scroll(function () {
    if ($(this).scrollTop() > 480) {
      $("nav").addClass("solid");
      $("sitenavlink").addClass("orange");

      $("nav img").attr("src", "/images/logo_w.png");
    } else {
      $("nav").removeClass("solid");
      $("sitenavlink").removeClass("orange");
    }
    if ($(this).scrollTop() < 480) {
      $("nav img").attr("src", "/images/logo_t.png");
    }
  })}
  );
</script>;

export default Nav;
