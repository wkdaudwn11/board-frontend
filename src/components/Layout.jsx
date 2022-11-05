import styled from "@emotion/styled";

const LayoutBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 800px;
  height: 100vh;
  min-height: 500px;
  background-color: #efefef;
`;

const Layout = ({ children }) => {
  return <LayoutBlock>{children}</LayoutBlock>;
};

export default Layout;
