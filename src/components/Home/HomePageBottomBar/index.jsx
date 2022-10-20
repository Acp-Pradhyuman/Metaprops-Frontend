import React from "react";
import { useNavigate } from "react-router-dom";
function BottomBar() {
  const navigate = useNavigate();
  return (
    <div>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-md-12 text-center content-wrap">
              <p>
                Browse the full MetaProps marketplace to be exposed to the
                largest collection of high quality digital NFT architecture
                content available in the&nbsp;World.
              </p>
              <a
                class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn mt-4"
                onClick={() => navigate("/marketplace")}
              >
                Explore Marketplace
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BottomBar;
