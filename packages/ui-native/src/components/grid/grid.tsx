import React, {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  useState,
} from 'react';
import type { ViewStyle } from 'react-native';
import { View } from 'react-native';

type GridOwnProps = {
  as?: ElementType;
  /** Number of columns */
  columns?: number;
  /** Uniform gap between items (overridden by rowGap / columnGap) */
  gap?: number;
  /** Vertical gap between rows */
  rowGap?: number;
  /** Horizontal gap between columns */
  columnGap?: number;
  style?: ViewStyle;
  children?: ReactNode;
};

export type GridProps<C extends ElementType = typeof View> = GridOwnProps &
  Omit<ComponentPropsWithoutRef<C>, keyof GridOwnProps>;

export function Grid<C extends ElementType = typeof View>({
  as,
  columns = 2,
  gap = 0,
  rowGap,
  columnGap,
  style,
  children,
  ...rest
}: GridProps<C>) {
  const Component = as || View;
  const [containerWidth, setContainerWidth] = useState(0);

  const resolvedColumnGap = columnGap ?? gap;
  const resolvedRowGap = rowGap ?? gap;
  const itemWidth =
    containerWidth > 0 ? (containerWidth - resolvedColumnGap * (columns - 1)) / columns : undefined;

  return (
    <Component
      onLayout={(e: { nativeEvent: { layout: { width: number } } }) =>
        setContainerWidth(e.nativeEvent.layout.width)
      }
      style={[
        {
          flexDirection: 'row' as const,
          flexWrap: 'wrap' as const,
          columnGap: resolvedColumnGap,
          rowGap: resolvedRowGap,
          opacity: containerWidth > 0 ? 1 : 0,
        },
        style,
      ]}
      {...rest}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return <View style={{ width: itemWidth }}>{child}</View>;
      })}
    </Component>
  );
}
