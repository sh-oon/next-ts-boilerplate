import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Spinner } from './spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'muted', 'inherit'],
    },
    label: { control: 'text' },
  },
  args: {
    size: 'md',
    color: 'primary',
    label: 'Loading',
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      <Spinner color="primary" />
      <Spinner color="muted" />
    </View>
  ),
};
