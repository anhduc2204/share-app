import { StyleSheet, Dimensions } from "react-native";
import { Metrics } from "@app/theme";

const styles = StyleSheet.create({
  hidden: {
    position: 'absolute',
    height: 0,
    width: 0
  },
  loading: {
    position: 'absolute',
    top: -Metrics.small,
    left: -Metrics.small,
    right: -Metrics.small,
    bottom: -Metrics.small,
    elevation: Metrics.small,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default styles;