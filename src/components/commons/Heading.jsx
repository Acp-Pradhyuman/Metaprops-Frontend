import React from "react";
import styled from "styled-components";

const Heading = ({ title, description, dark }) => {
  const Title = styled.h2`
    font-size: 32px;
    margin-bottom: 12px;
    font-weight: 500;
    text-align: center;
    line-height: 1.2;
    color: ${(props) => (dark ? "white" : "black")};

  `;

  const Desc = styled.p`
    color: #152026;
    font-size: 15px;
    letter-spacing: 0.4px;
    font-weight: 500;
    text-align: center;
    color: ${(props) => (dark ? "white" : "#152026")};
    opacity: ${(props) => (dark ? "0.8" : "1")};
  `;


  return (
    <div className="pb-4">
      <Title>{title}</Title>
      <Desc>{description}</Desc>
    </div>
  );
};

export default Heading;
