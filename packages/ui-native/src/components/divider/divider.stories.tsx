import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Text } from '../text';
import { Divider } from './divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: () => (
    <View style={{ gap: 12, width: 300 }}>
      <Text
        typography="text-sm-regular"
        color="foreground"
      >
        Above
      </Text>
      <Divider />
      <Text
        typography="text-sm-regular"
        color="foreground"
      >
        Below
      </Text>
    </View>
  ),
};

export const Vertical: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, height: 40 }}>
      <Text
        typography="text-sm-regular"
        color="foreground"
      >
        Left
      </Text>
      <Divider orientation="vertical" />
      <Text
        typography="text-sm-regular"
        color="foreground"
      >
        Right
      </Text>
    </View>
  ),
};
