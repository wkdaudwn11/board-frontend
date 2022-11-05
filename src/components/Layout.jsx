import styled from "@emotion/styled";

const LayoutBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Layout = ({ children }) => {
  return <LayoutBlock>{children}</LayoutBlock>;
};

export default Layout;
