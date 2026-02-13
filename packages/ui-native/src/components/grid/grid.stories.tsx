import type { Meta, StoryObj } from '@storybook/react';
import { ScrollView, View } from 'react-native';
import { Text } from '../text';
import { Grid } from './grid';

const Cell = ({ label, height = 80 }: { label: string; height?: number }) => (
  <View
    style={{
      height,
      backgroundColor: '#e4e4e7',
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text typography="label-md-medium">{label}</Text>
  </View>
);

const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
  argTypes: {
    columns: { control: 'number' },
    gap: { control: 'number' },
    rowGap: { control: 'number' },
    columnGap: { control: 'number' },
  },
  args: {
    columns: 2,
    gap: 12,
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const TwoColumns: Story = {
  render: (args) => (
    <Grid {...args}>
      <Cell label="1" />
      <Cell label="2" />
      <Cell label="3" />
      <Cell label="4" />
    </Grid>
  ),
};

export const ThreeColumns: Story = {
  args: { columns: 3, gap: 8 },
  render: (args) => (
    <Grid {...args}>
      <Cell label="1" />
      <Cell label="2" />
      <Cell label="3" />
      <Cell label="4" />
      <Cell label="5" />
      <Cell label="6" />
    </Grid>
  ),
};

export const FourColumns: Story = {
  args: { columns: 4, gap: 8 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 8 }, (_, i) => (
        <Cell key={i} label={`${i + 1}`} />
      ))}
    </Grid>
  ),
};

export const DifferentGaps: Story = {
  args: { columns: 2, rowGap: 24, columnGap: 8 },
  render: (args) => (
    <Grid {...args}>
      <Cell label="1" />
      <Cell label="2" />
      <Cell label="3" />
      <Cell label="4" />
    </Grid>
  ),
};

export const AsScrollView: Story = {
  args: { columns: 2, gap: 12 },
  render: (args) => (
    <View style={{ height: 200 }}>
      <Grid as={ScrollView} {...args}>
        {Array.from({ length: 10 }, (_, i) => (
          <Cell key={i} label={`${i + 1}`} height={100} />
        ))}
      </Grid>
    </View>
  ),
};
