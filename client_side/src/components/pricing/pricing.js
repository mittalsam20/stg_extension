import "./pricing.css";
import EmailForm from "../email_form/email_form";
import { useState } from "react";
const Pricing = () => {
  const [flag, setFlag] = useState(false);

  return (
    <>
      <section className="pricing pt-5 mt-5 mb-5 " id="pricing">
        <div className="container">
          <div className="pricing-head text-center mb-3">
            <h1>Plans & Pricing</h1>
          </div>
          <div>
            <div className="package-container">
              <div className="packages">
                <div className="pricing-title">FREE</div>
                <h2 className="text1">₹ 0/Month</h2>
                <ul className="list text-center">
                  <li>
                    Video Recording <i className="fas fa-check"></i>
                  </li>

                  <li>
                    Audio Recording <i className="fas fa-check"></i>
                  </li>
                  <li>
                    Audio Transcribing <i className="fas fa-check"></i>
                  </li>
                  <li>
                    100 MB Cloud Storage <i className="fas fa-check"></i>
                  </li>
                  <li>
                    Presentation Of the Meeting <i class="fas fa-times"></i>
                  </li>
                </ul>
                <button
                  className=" pricing-button"
                  onClick={() => {
                    setFlag(true);
                    window.scrollTo({
                      top: 2900,
                      behavior: "smooth",
                    });
                  }}
                >
                  Start Now
                </button>
              </div>
              <div className="packages">
                <div className="pricing-title">BASIC</div>
                <h2 className="text1">₹ 299/Month/User</h2>
                <ul className="list">
                  <li>
                    Video Recording <i className="fas fa-check"></i>
                  </li>
                  <li>
                    Audio Recording <i className="fas fa-check"></i>
                  </li>
                  <li>
                    Audio Transcribing <i className="fas fa-check"></i>
                  </li>
                  <li>
                    1 GB Cloud Storage <i className="fas fa-check"></i>
                  </li>
                  <li>
                    Presentation Of the Meeting <i className="fas fa-check"></i>
                  </li>
                </ul>
                <button className="button pricing-button cursorNill">
                  Coming Soon..!!
                </button>
              </div>
              <div className="packages">
                <div className="pricing-title">ENTERPRISE</div>
                <h2 className="text1">₹ 999/Month for 5 user</h2>
                <ul className="list">
                  <li>
                    Video Recording <i className="fas fa-check"></i>
                  </li>
                  <li>
                    Audio Recording <i className="fas fa-check"></i>
                  </li>
                  <li>
                    Audio Transcribing <i className="fas fa-check"></i>
                  </li>
                  <li>
                    5 GB Cloud Storage <i className="fas fa-check"></i>
                  </li>
                  <li>
                    Presentation Of the Meeting <i className="fas fa-check"></i>
                  </li>
                </ul>
                <button className="button pricing-button cursorNill">
                  Coming Soon..!!
                </button>
              </div>
            </div>
            {flag && <EmailForm />}
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
