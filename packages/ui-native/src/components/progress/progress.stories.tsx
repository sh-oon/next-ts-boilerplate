import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error'],
    },
    showLabel: { control: 'boolean' },
  },
  args: {
    value: 60,
    size: 'md',
    color: 'primary',
    showLabel: false,
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16, width: 300 }}>
      <Progress value={60} size="sm" />
      <Progress value={60} size="md" />
      <Progress value={60} size="lg" />
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View style={{ gap: 16, width: 300 }}>
      <Progress value={60} color="primary" />
      <Progress value={60} color="success" />
      <Progress value={60} color="warning" />
      <Progress value={60} color="error" />
    </View>
  ),
};
