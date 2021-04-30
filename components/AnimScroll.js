// import Animated, {
//   useSharedValue,
//   useAnimatedScrollHandler,
// } from 'react-native-reanimated';

// function SomeComponent({ children }) {
//   const scrollOffset = useSharedValue(0);

//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       scrollOffset.value = event.contentOffset.y;
//     },
//   });

//   return (
//     <Animated.ScrollView onScroll={scrollHandler}>
//       {children}
//     </Animated.ScrollView>
//   );
// // }