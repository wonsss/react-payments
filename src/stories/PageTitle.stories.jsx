import React from 'react';
import PageTitle from 'components/PageTitle';

export default {
  title: 'CardAddition/PageTitle',
  component: PageTitle,
};

const Template = (args) => <PageTitle {...args} />;

export const CardAddition = Template.bind({});
CardAddition.args = {
  hasPrevButton: true,
  title: '카드추가',
};

export const CardList = Template.bind({});
CardList.args = {
  hasPrevButton: false,
  title: '카드목록',
};
