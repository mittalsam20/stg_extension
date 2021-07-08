// import { Link } from "react-router-dom";
import $ from "jquery";
import "./nav.css";

const Nav = () => {
  return (
    <>
      <nav>
        <a href="#top">
          <img className="nav_logo" src="/images/logo_t.png" alt="ST_LOGO" />
        </a>
        <ul>
          <li>
            <a href="#top" className="navlink">
              Home
            </a>
          </li>
          <li>
            <a href="#services" className="navlink">
              Services
            </a>
          </li>
          <li>
            <a href="#footer" className="navlink">
              Contact Us
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

<script>
  $(document).ready(function()
  {$(window).scroll(function () {
    if ($(this).scrollTop() > 530) {
      $("nav").addClass("solid");
      $("nav img").attr("src", "/images/logo_w.png");
    } else {
      $("nav").removeClass("solid");
    }
    if ($(this).scrollTop() < 530) {
      $("nav img").attr("src", "/images/logo_t.png");
    }
  })}
  );
</script>;

export default Nav;
