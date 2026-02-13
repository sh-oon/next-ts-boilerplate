import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Flex } from './flex';

const Box = ({ color = '#e4e4e7' }: { color?: string }) => (
  <View style={{ width: 48, height: 48, backgroundColor: color, borderRadius: 8 }} />
);

const meta: Meta<typeof Flex> = {
  title: 'Components/Flex',
  component: Flex,
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
    gap: { control: 'number' },
  },
  args: {
    direction: 'row',
    gap: 8,
  },
};

export default meta;
type Story = StoryObj<typeof Flex>;

export const Row: Story = {
  render: (args) => (
    <Flex {...args}>
      <Box />
      <Box color="#d4d4d9" />
      <Box color="#a1a1a8" />
    </Flex>
  ),
};

export const Column: Story = {
  args: { direction: 'column', gap: 8 },
  render: (args) => (
    <Flex {...args}>
      <Box />
      <Box color="#d4d4d9" />
      <Box color="#a1a1a8" />
    </Flex>
  ),
};

export const SpaceBetween: Story = {
  render: () => (
    <Flex justify="between" style={{ width: 300 }}>
      <Box />
      <Box color="#d4d4d9" />
      <Box color="#a1a1a8" />
    </Flex>
  ),
};

export const Centered: Story = {
  render: () => (
    <Flex align="center" justify="center" gap={12} style={{ height: 120 }}>
      <Box />
      <Box color="#d4d4d9" />
      <Box color="#a1a1a8" />
    </Flex>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Flex wrap="wrap" gap={8} style={{ width: 160 }}>
      <Box />
      <Box color="#d4d4d9" />
      <Box color="#a1a1a8" />
      <Box />
      <Box color="#d4d4d9" />
    </Flex>
  ),
};
