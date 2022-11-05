import styled from "@emotion/styled";

const ButtonStyle = styled.button`
  width: 100px;
  height: 30px;
  transition: 0.2s all;
  font-weight: 700;
  border: none;
  background-color: ${({ color }) => color};
  color: white;
  cursor: pointer;

  &:hover {
    border-radius: 12px;
  }
`;

const Button = ({ color, handleClick, children }) => {
  return (
    <ButtonStyle color={color} onClick={handleClick}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
