import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Chip } from './chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Chip',
    size: 'md',
    selected: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
    children: 'Selected',
  },
};

export const WithDismiss: Story = {
  args: {
    children: 'Dismissible',
    onDismiss: () => {},
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
    </View>
  ),
};

export const ChipGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>('react');
    const options = ['React', 'Vue', 'Angular', 'Svelte'];
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {options.map((opt) => (
          <Chip
            key={opt}
            selected={selected === opt.toLowerCase()}
            onSelect={() => setSelected(opt.toLowerCase())}
          >
            {opt}
          </Chip>
        ))}
      </View>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};
