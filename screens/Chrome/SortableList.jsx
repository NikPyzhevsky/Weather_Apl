import React, { ReactElement } from "react";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import Item from "./Item";
import { COL, Positions, SIZE } from "./Config";
import { Dimensions } from "react-native";

// interface ListProps {
//   children: ReactElement<{ id: string }>[];
//   editing: boolean;
//   onDragEnd: (diff: Positions) => void;
// }

const List = ({ children, editing, onDragEnd }) => {
  const scrollY = useSharedValue(0);
  const scrollView = useAnimatedRef();
  const positions = useSharedValue(
    Object.assign(
      {},
      ...children.map((child, index) => ({ [child.props.id]: index }))
    )
  );
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = y;
    },
  });

  return (
    <Animated.ScrollView
      onScroll={onScroll}
      ref={scrollView}
      contentContainerStyle={{
        // height: Math.ceil(children.length / COL) * SIZE,
        height: Dimensions.get('window').height*0.9,
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
    >
      {children.map((child) => {
        return (
          <Item
            key={child.props.id}
            positions={positions}
            id={child.props.id}
            editing={editing}
            onDragEnd={onDragEnd}
            scrollView={scrollView}
            scrollY={scrollY}
          >
            {child}
          </Item>
        );
      })}
    </Animated.ScrollView>
  );
};

export default List;
