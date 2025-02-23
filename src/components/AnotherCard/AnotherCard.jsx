import styled from 'styled-components';
import FlexColumnBox from 'components/FlexColumnBox/FlexColumnBox';
import CardBox from 'common/CardBox/CardBox';
import HoverBox from 'common/Hover/HoverBox';

export default function AnotherCard() {
  return (
    <HoverBox>
      <FlexColumnBox>
        <CardBox isSmall={true} color={'#e5e5e5'}>
          <Styled.Sign>{'+'}</Styled.Sign>
        </CardBox>
      </FlexColumnBox>
    </HoverBox>
  );
}

const Styled = {
  Sign: styled.span`
    font-size: 40px;
    font-weight: 800;
    color: #525252;
  `,
};
