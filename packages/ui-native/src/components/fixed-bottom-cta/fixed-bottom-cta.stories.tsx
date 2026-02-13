import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Button } from '../button';
import { Text } from '../text';
import { FixedBottomCTA } from './fixed-bottom-cta';

const meta: Meta<typeof FixedBottomCTA> = {
  title: 'Components/FixedBottomCTA',
  component: FixedBottomCTA,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'outline', 'ghost'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    safeAreaBottom: { control: 'number' },
  },
  args: {
    children: '다음',
    variant: 'primary',
    disabled: false,
    loading: false,
    safeAreaBottom: 0,
  },
  decorators: [
    (Story) => (
      <View style={{ height: 400, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FixedBottomCTA>;

export const Default: Story = {};

export const WithContent: Story = {
  render: (args) => (
    <View style={{ height: 400, backgroundColor: '#f5f5f5' }}>
      <View style={{ flex: 1, padding: 16, gap: 12 }}>
        <Text typography="title-lg-bold">약관에 동의해주세요</Text>
        <Text
          typography="text-md-regular"
          color="mutedForeground"
        >
          서비스 이용을 위해 아래 약관에 동의해주세요.
        </Text>
      </View>
      <FixedBottomCTA {...args}>동의하고 계속하기</FixedBottomCTA>
    </View>
  ),
  decorators: [],
};

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 80, paddingBottom: 80 }}>
      <View style={{ height: 80 }}>
        <FixedBottomCTA variant="primary">확인</FixedBottomCTA>
      </View>
      <View style={{ height: 80 }}>
        <FixedBottomCTA variant="secondary">취소</FixedBottomCTA>
      </View>
      <View style={{ height: 80 }}>
        <FixedBottomCTA variant="destructive">삭제하기</FixedBottomCTA>
      </View>
    </View>
  ),
  decorators: [],
};

export const KeyboardVisible: Story = {
  render: () => (
    <View style={{ height: 400, backgroundColor: '#f5f5f5' }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text
          typography="text-sm-regular"
          color="mutedForeground"
        >
          키보드가 올라오면 좌우 여백 없이 풀폭 버튼으로 전환됩니다.
        </Text>
      </View>
      <View>
        <Button
          size="lg"
          rounded="none"
          variant="primary"
        >
          다음
        </Button>
      </View>
    </View>
  ),
  decorators: [],
};

export const WithSafeArea: Story = {
  args: {
    children: '완료',
    safeAreaBottom: 34,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: '처리 중',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '다음',
  },
};
