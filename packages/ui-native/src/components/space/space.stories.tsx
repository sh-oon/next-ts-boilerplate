import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Text } from '../text';
import { Space } from './space';

const meta: Meta<typeof Space> = {
  title: 'Components/Space',
  component: Space,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    size: 'md',
    direction: 'vertical',
  },
};

export default meta;
type Story = StoryObj<typeof Space>;

export const Vertical: Story = {
  render: (args) => (
    <View>
      <View style={{ backgroundColor: '#e4e4e7', padding: 8 }}>
        <Text
          typography="text-sm-regular"
          color="foreground"
        >
          Above
        </Text>
      </View>
      <Space {...args} />
      <View style={{ backgroundColor: '#e4e4e7', padding: 8 }}>
        <Text
          typography="text-sm-regular"
          color="foreground"
        >
          Below
        </Text>
      </View>
    </View>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ backgroundColor: '#e4e4e7', padding: 8 }}>
        <Text
          typography="text-sm-regular"
          color="foreground"
        >
          Left
        </Text>
      </View>
      <Space
        direction="horizontal"
        size="lg"
      />
      <View style={{ backgroundColor: '#e4e4e7', padding: 8 }}>
        <Text
          typography="text-sm-regular"
          color="foreground"
        >
          Right
        </Text>
      </View>
    </View>
  ),
};

export const Presets: Story = {
  render: () => (
    <View>
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((s) => (
        <View key={s}>
          <Text
            typography="text-xs-medium"
            color="muted"
          >
            {s}
          </Text>
          <Space size={s} />
          <View style={{ height: 2, backgroundColor: '#e4e4e7' }} />
        </View>
      ))}
    </View>
  ),
};
