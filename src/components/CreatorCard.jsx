import React from "react";

const CreatorCard = ({ title, image, price, percentage }) => {
  return (
    <>
      <div className="hover:shadow-lg p-2">
        <div className="flex items-center">
          <div
            className="creator-icon"
            style={{
              background: "url(./img/home/file-type-img.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img src={image} className="w-8" />
          </div>

          <div className="ml-2 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-gray-500">{percentage}</p>
            </div>
            <div className="flex items-center">
              <img src="/img/section-image/etherim.png" />
              <span>{price}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorCard;
