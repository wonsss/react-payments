import styled from 'styled-components';

export default function Dimmer({ onClick, show }) {
  return <Styled.Dimmer onClick={onClick} show={show}></Styled.Dimmer>;
}

const Styled = {
  Dimmer: styled.div`
    display: ${({ show }) => (show ? 'block' : 'none')};
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    background: rgba(0, 0, 0, 0.5);
  `,
};
