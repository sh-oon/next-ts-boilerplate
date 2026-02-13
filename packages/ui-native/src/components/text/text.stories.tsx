import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Text } from './text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    typography: {
      control: 'select',
      options: [
        'title-2xl-bold', 'title-xl-bold', 'title-lg-bold', 'title-md-bold',
        'title-sm-bold', 'title-xs-bold',
        'text-lg-regular', 'text-md-regular', 'text-sm-regular', 'text-xs-regular',
        'label-lg-medium', 'label-md-medium', 'label-sm-medium',
      ],
    },
    color: {
      control: 'select',
      options: ['foreground', 'muted', 'primary', 'inherit'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    lineLimit: { control: 'number' },
  },
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    typography: 'text-md-regular',
    color: 'foreground',
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const Titles: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Text typography="title-2xl-bold" color="foreground">Title 2XL Bold</Text>
      <Text typography="title-xl-bold" color="foreground">Title XL Bold</Text>
      <Text typography="title-lg-bold" color="foreground">Title LG Bold</Text>
      <Text typography="title-md-bold" color="foreground">Title MD Bold</Text>
      <Text typography="title-sm-bold" color="foreground">Title SM Bold</Text>
      <Text typography="title-xs-bold" color="foreground">Title XS Bold</Text>
    </View>
  ),
};

export const BodyText: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Text typography="text-lg-regular" color="foreground">Text LG Regular</Text>
      <Text typography="text-md-regular" color="foreground">Text MD Regular</Text>
      <Text typography="text-sm-regular" color="foreground">Text SM Regular</Text>
      <Text typography="text-xs-regular" color="foreground">Text XS Regular</Text>
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Text color="foreground">Foreground</Text>
      <Text color="muted">Muted</Text>
      <Text color="primary">Primary</Text>
    </View>
  ),
};

export const LineLimit: Story = {
  args: {
    lineLimit: 2,
    children:
      'This is a very long text that should be truncated after two lines. It keeps going and going to demonstrate the line limiting feature of the Text component.',
  },
  decorators: [
    (Story) => (
      <View style={{ width: 250 }}>
        <Story />
      </View>
    ),
  ],
};

export const Alignment: Story = {
  render: () => (
    <View style={{ gap: 8, width: 300 }}>
      <Text align="left">Left aligned</Text>
      <Text align="center">Center aligned</Text>
      <Text align="right">Right aligned</Text>
    </View>
  ),
};
