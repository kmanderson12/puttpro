import Link from 'next/link';
import styled from 'styled-components';

const Header = () => (
  <StyledHeader>
    <Link href="/">
      <a>
        <Logo>
          <h1>PuttPro</h1>
        </Logo>
      </a>
    </Link>
  </StyledHeader>
);

export default Header;

const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  h1 {
    font-size: 3rem;
    font-weight: 700;
    position: relative;
    padding: 0.5rem;
    color: ${(props) => props.theme.colors.gray700};
    text-decoration: none;
    .light {
      font-weight: 300;
    }
    .medium {
      font-weight: 600;
    }
  }
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  img {
    height: 40px;
    &:hover {
      cursor: pointer;
    }
  }
`;
