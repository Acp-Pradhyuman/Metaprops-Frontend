import React from "react";
import FeatureSlider from "../../Sliders/FeatureSlider";

//Static

const BACKGROUND_IMAGE = require("../../../assets/img/home/feature-bg.png");
const FILE_IMAGE = require("../../../assets/img/home/file-type-img.png");
const DUMMY_IMAGE = require("../../../assets/img/home/feature1.png");
const DIGITAL_IMAGE = require("../../../assets/img/section-image/slide-1.png");
const BLUE_TICK = require("../../../assets/img/home/blue-check.png");

function FeaturedCreator() {
  return (
    <div>
      <section
        style={{
          background: `url(${BACKGROUND_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="top-heading-are text-center top-heading-are1">
                <h2>Featured Creators</h2>
                <p>
                  The world’s best creators & design professionals are listed on
                  the platform delivering the highest quality digital
                  architecture content.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid mt-4 pt-3">
          <div class="slick-white-dotted mb-5">
            <FeatureSlider />
          </div>
        </div>
      </section>
    </div>
  );
}

export default FeaturedCreator;
