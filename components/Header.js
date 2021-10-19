import Link from 'next/link';
import styled from 'styled-components';
import { RepeatBlock } from '../components/icons';

const Header = () => (
  <StyledHeader>
    <Link href="/">
      <a>
        <Logo>
          <h1>
            due<span className="light">on</span>
            <span className="medium">repeat</span>
          </h1>
          <RepeatBlock />
        </Logo>
      </a>
    </Link>
  </StyledHeader>
);

export default Header;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  h1 {
    font-size: 3rem;
    font-weight: 400;
    position: relative;
    padding: 0.5rem;
    color: ${props => props.theme.colors.green100};
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
  justify-content: center;
  align-items: center;
  padding: 2rem;
  img {
    height: 40px;
    &:hover {
      cursor: pointer;
    }
  }
`;
