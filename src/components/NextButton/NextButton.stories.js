import NextButton from 'components/NextButton/NextButton';

export default {
  title: 'components/NextButton',
  component: NextButton,
};

const Template = (args) => <NextButton {...args} />;

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  children: '다음',
};

export const Activated = Template.bind({});
Activated.args = {
  disabled: false,
  children: '다음',
  color: '#737373',
};
