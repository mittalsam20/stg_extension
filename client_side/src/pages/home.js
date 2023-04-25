import Header from "../components/header/header";
import Services from "../components/ourservice/services";
import Journey from "../components/journey/journey";
import Backchum from "../components/whyus/backchum";
import Pricing from "../components/pricing/pricing";
import "./home.css";
import Nav from "../components/navbarhp/nav";
import Footer from "../components/footer/footer";
const Home = () => {
  return (
    <>
      <Nav />
      <Header />
      <Services />
      <Journey />
      <Backchum />
      <Pricing />
      <Footer />
    </>
  );
};

export default Home;
