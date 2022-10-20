import React from "react";

const HomeCard = ({ title, creator, price }) => {
  return (
    <>
      <section className="mt-12 mx-3 border border-gray-600 bg-gray-100 p-3 hover:shadow-xl">
        <img src="/img/section-image/slide-1.png" alt="" />
        <div className="text-white flex items-center justify-between bg-gray-400 px-2 py-1 mb-4">
          <span>
            <i className="fa fa-eye mr-1" />
            25k
          </span>
          <span>
            <i className="fa fa-heart mr-1" />
            652
          </span>
        </div>

        <h3 className="text-left font-bold text-sm mb-4">{title}</h3>
        <div className="flex items-center">
          <p className="text-xs">Creator</p>
          <div className="flex items-center ml-6">
            <p className="text-xs mr-1 hover:underline text-blue-800 font-bold">
              {creator}
            </p>
            <img className="w-4 h-full" src="/img/home/blue-check.png" alt="" />
          </div>
        </div>
        <div className="flex mt-4">
          <p className="text-xs">Price</p>
          <div className="center">
            <div className="flex items-start ml-8">
              <div>
                <h4 className="font-bold flex items-center">
                  <img
                    className="w-4 h-full"
                    src="/img/section-image/etherim.png"
                    alt=""
                  />
                  {price}
                </h4>
                <span style={{ fontSize: "11px", fontWeight: "bold" }}>
                  (USD $ 20.000)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeCard;
