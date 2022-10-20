import React, { useState } from "react";
import { Link } from "react-router-dom";
import { handleApiCall } from "../../../api";
import { endpoints } from "../../../utils/endpoints";
import { PopUp, validateEmail } from "../../../utils/utility";

//Static
const LOGO = require("../../../assets/img/logo.png");
const HOME = require("../../../assets/img/home/33.png");

function Footer() {
  const [newsletter, setNewsletter] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState();
  const [newsletterError, setNewsletterError] = useState("");

  setTimeout(() => {
    setNewsletterError("");
  }, 10000);

  const handleNewsletterSubmit = async (evt) => {
    evt.preventDefault();
    if (!newsletter) {
      setNewsletterError("Please enter a email!");
      return;
    }
    if (!validateEmail(newsletter)) {
      setNewsletterError("Please enter correct email!");
      return;
    }
    if (newsletter) {
      const response = await handleApiCall(
        "post",
        `${endpoints.setNewsletter}`,
        {
          email: newsletter,
        }
      );
      if (response?.data?.success) {
        setNewsletterSuccess(newsletter);
      } else {
        PopUp("Something Went Wrong", response?.data?.message, "error");
      }
    }
  };

  return (
    <div>
      <section class="bg-black py-4 footer-sec-wrap">
        <div class="border-style"></div>
        <div class="container container1">
          <div class="row pb-4 footer-first-row">
            <div class="col">
              <h3>Stay Connected</h3>
              <p>
                Register your email to enroll for our marketing campaigns, and to
                find out more about our latest releases and updates.
              </p>
              <div class="footer-email-box mt-4">
                <div class="form-group">
                  <>
                    <form action="" method="GET" style={{ display: "flex" }}>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        class="form-control"
                        value={newsletter}
                        onChange={(e) => setNewsletter(e.target.value)}
                        required
                      />

                      <button
                        class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                        type="submit"
                        onClick={handleNewsletterSubmit}
                      >
                        Sign up
                      </button>
                    </form>{" "}
                    <br></br>
                  </>
                </div>
                <div style={{color: "white", textAlign: "center"}}>{newsletterSuccess ? "Thanks for submitting!" : ""}</div>
                <p
                  className="mb-5"
                  style={{ color: "red", opacity: "1", marginTop: "-10px" }}
                >
                  {newsletterError}
                </p>
              </div>
            </div>
            <div class="col blank-column"></div>
            <div class="col ml-auto">
              <div class="join-community-wrap ml-auto d-table">
                <h3>Join the Community:</h3>
                <ul class="footer-social-icon">
                  <li>
                    <a href="https://twitter.com/MetaProps" target="_blank">
                      <i class="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/metaprops.io"
                      target="_blank"
                    >
                      <i class="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/metaprops" target="_blank">
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/metaprops.io/"
                      target="_blank"
                    >
                      <i class="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/channel/UCAssqSpL_8Py7qbTc-V2yxw"
                      target="_blank"
                    >
                      <i class="fab fa-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://discord.gg/VVvWRcAMEJ" target="_blank">
                    <i class="fab fa-discord"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://t.me/metaprops" target="_blank">
                      <i class="fab fa-telegram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://medium.com/@MetaProps" target="_blank">
					<i class="fa-brands fa-medium"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-lg-4 col-md-6">
              <div class="footer-logo-wrap mb-4">
                <a href="/">
                  
                    <img src={LOGO} height="70" />
                  
                </a>
                <div class="footer-meta-list">
                  <h3>MetaProps</h3>
                  <span >
                    Email: 
                    <a style={{marginLeft:"2px"}} href="mailto:support@metaprops.com" >
                      support@metaprops.io
                    </a>
                  </span>
                </div>
              </div>
              <p style={{ color: "#fff", opacity: "0.5", fontSize: "14px" }}>
                The World’s Leading Dedicated Digital Architecture Non-Fungible
                Token (NFT) Marketplace
              </p>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-6 col-6">
              <div class="footer-menu-list">
                <h3>General</h3>
                <ul class="footer-menu-item">
                  <li>
                    <Link to="/marketplace">Marketplace</Link>
                  </li>
                  <li>
                    <Link to="/collection">Collections</Link>
                  </li>
                  <li>
                    <Link to="/creators">Creators</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-6 col-6">
              <div class="footer-menu-list">
                <h3>Resources</h3>
                <ul class="footer-menu-item">
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="/faq">FAQs</Link>
                  </li>
                  <li>
                    <Link to="/help">Help & Guidance</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="create-mint-wrap">
                <h3>Create.MINT.SELL</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="bg-brown-color py-3">
        <div class="container">
          <div class="row copyright-row">
            <div class="col-md-12 text-center d-flex justify-content-center copyright-col">
              <span>Copyright © 2022 Metaprops. All rights reserved.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
