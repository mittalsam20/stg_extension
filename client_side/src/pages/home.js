import Header from "../components/header/header";
import Services from "../components/ourservice/services";
import Journey from "../components/journey/journey";
import Backchum from "../components/whyus/backchum";
import Pricing from "../components/pricing/pricing";
const home = () => {
  return (
    <>
      <Header />
      <Services />
      <Journey />
      <Backchum />
      <Pricing />
    </>
  );
};

export default home;
