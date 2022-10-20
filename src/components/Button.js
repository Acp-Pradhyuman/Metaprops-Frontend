import styled from "styled-components";

const Button = ({ children, onClick, colorStyle='#4472C7', padding='15px 30px', bold, hover="#A8967C", fontSize='.85rem', margin='0px', textColor="white", disabled, borderStyle = '0px solid #e9e9e9', className }) => {
	const ButtonStyle = styled.button`
   background-color: ${colorStyle};
   padding: ${padding};
   font-weight: ${bold ? '600' : 'normal'};
   border: ${borderStyle};
   font-size: ${fontSize};
   margin: ${margin};
   transition: all .5s ease-in-out;
   outline: none;
   color: ${textColor};
   display: flex;
    align-items: center;
    justify-content: center;
   &:hover {
    background: ${hover}; // <Thing> when hovered
    color: white !important
  }
`;
	return <ButtonStyle className={className} onClick={onClick} disabled={disabled}>{children}</ButtonStyle>;
};

export default Button;
