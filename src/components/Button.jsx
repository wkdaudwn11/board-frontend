import styled from "@emotion/styled";

const ButtonStyle = styled.button`
  width: ${({ width }) => width || "100px"};
  height: ${({ height }) => height || "30px"};
  transition: 0.2s all;
  font-weight: 700;
  font-size: 12px;
  border: none;
  background-color: ${({ color }) => color};
  color: white;
  cursor: pointer;

  &:hover {
    border-radius: 12px;
  }
`;

const Button = ({ width, height, color, handleClick, children }) => {
  return (
    <ButtonStyle
      width={width}
      height={height}
      color={color}
      onClick={handleClick}
    >
      {children}
    </ButtonStyle>
  );
};

export default Button;
