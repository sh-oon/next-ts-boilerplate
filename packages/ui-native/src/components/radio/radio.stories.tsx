import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { RadioGroup, RadioItem } from './radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
    orientation: 'vertical',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="option1">
      <RadioItem value="option1" label="Option 1" />
      <RadioItem value="option2" label="Option 2" />
      <RadioItem value="option3" label="Option 3" />
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="free">
      <RadioItem value="free" label="Free" description="Basic features included" />
      <RadioItem value="pro" label="Pro" description="Advanced features and priority support" />
      <RadioItem value="enterprise" label="Enterprise" description="Custom solutions for teams" />
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup orientation="horizontal" defaultValue="a">
      <RadioItem value="a" label="A" />
      <RadioItem value="b" label="B" />
      <RadioItem value="c" label="C" />
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      <RadioGroup size="sm" defaultValue="a" style={{ marginBottom: 16 }}>
        <RadioItem value="a" label="Small A" />
        <RadioItem value="b" label="Small B" />
      </RadioGroup>
      <RadioGroup size="md" defaultValue="a" style={{ marginBottom: 16 }}>
        <RadioItem value="a" label="Medium A" />
        <RadioItem value="b" label="Medium B" />
      </RadioGroup>
      <RadioGroup size="lg" defaultValue="a">
        <RadioItem value="a" label="Large A" />
        <RadioItem value="b" label="Large B" />
      </RadioGroup>
    </>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('option1');
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
        <RadioItem value="option3" label="Option 3" />
      </RadioGroup>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup disabled defaultValue="option1">
      <RadioItem value="option1" label="Option 1" />
      <RadioItem value="option2" label="Option 2" />
    </RadioGroup>
  ),
};
