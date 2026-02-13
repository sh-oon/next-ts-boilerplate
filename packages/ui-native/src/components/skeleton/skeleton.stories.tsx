import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
    },
    width: { control: 'number' },
    height: { control: 'number' },
  },
  args: {
    variant: 'text',
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  render: () => (
    <View style={{ width: 300 }}>
      <Skeleton variant="text" />
    </View>
  ),
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 48,
    height: 48,
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 300,
    height: 120,
  },
};

export const CardPlaceholder: Story = {
  render: () => (
    <View style={{ gap: 12, width: 300 }}>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Skeleton variant="circular" width={40} height={40} />
        <View style={{ flex: 1, gap: 6 }}>
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={80} height={12} />
        </View>
      </View>
      <Skeleton variant="rectangular" height={160} />
      <Skeleton variant="text" />
      <Skeleton variant="text" width={200} />
    </View>
  ),
};
