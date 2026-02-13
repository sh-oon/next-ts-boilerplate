import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    placeholder: { control: 'text' },
    floatingLabel: { control: 'text' },
  },
  args: {
    placeholder: 'Enter text...',
    variant: 'default',
    inputSize: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const FloatingLabel: Story = {
  args: {
    floatingLabel: 'Email',
    placeholder: undefined,
  },
};

export const ErrorState: Story = {
  args: {
    variant: 'error',
    placeholder: 'Invalid input',
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 12, width: 300 }}>
      <Input inputSize="sm" placeholder="Small" />
      <Input inputSize="md" placeholder="Medium" />
      <Input inputSize="lg" placeholder="Large" />
    </View>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <View style={{ width: 300 }}>
        <Input
          value={value}
          onChangeText={setValue}
          floatingLabel="Username"
        />
      </View>
    );
  },
};
