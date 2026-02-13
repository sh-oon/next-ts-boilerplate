import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import type { FlexAlignType, ViewStyle } from 'react-native';
import { View } from 'react-native';

export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

type FlexOwnProps = {
  as?: ElementType;
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: FlexWrap;
  gap?: number;
  style?: ViewStyle;
  children?: ReactNode;
};

export type FlexProps<C extends ElementType = typeof View> = FlexOwnProps &
  Omit<ComponentPropsWithoutRef<C>, keyof FlexOwnProps>;

const alignMap: Record<FlexAlign, FlexAlignType> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const justifyMap: Record<FlexJustify, ViewStyle['justifyContent']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

export function Flex<C extends ElementType = typeof View>({
  as,
  direction = 'row',
  align,
  justify,
  wrap,
  gap,
  style,
  children,
  ...rest
}: FlexProps<C>) {
  const Component = as || View;

  return (
    <Component
      style={[
        {
          flexDirection: direction,
          alignItems: align ? alignMap[align] : undefined,
          justifyContent: justify ? justifyMap[justify] : undefined,
          flexWrap: wrap,
          gap,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Component>
  );
}
