import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { MyTheme } from "../../Theme/Theme";
// import { WebView } from "react-native-webview";

import { MARGIN, SIZE } from "./Config";

const styles = StyleSheet.create({
  container: { width: SIZE, height: SIZE,borderRadius: SIZE/2, backgroundColor:MyTheme.colors.border},
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: SIZE/2,
    margin: MARGIN,
  },
});
// interface TileProps {
//   id: string;
//   uri: string;
//   onLongPress: () => void;
// }

const Tile = ({ uri }) => {
  return (
    <View style={styles.container} pointerEvents="none">
      <Image
        source={uri}
        style={styles.image}
      />
    </View>
  );
};

export default Tile;
