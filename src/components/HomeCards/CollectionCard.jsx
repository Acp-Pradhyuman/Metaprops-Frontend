import React from "react";
import { Link } from "react-router-dom";
const CollectionCard = ({ title, image, id }) => {
  return (
    <div className="px-3">
      <div className="digital-architecture-box">
        <Link to={`/collection/${id}`}>
          <div className="digital-architecture-img browse-collections-img">
            <img src={image} />
          </div>
          <p>{title}</p>
        </Link>
      </div>
    </div>
  );
};

export default CollectionCard;
