import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Metrics, Images, Colors as Themes } from "@app/theme";
import i18n from "@app/i18n/i18n";
import { useTheme } from "@app/modules/components/context/ThemeContext";
import createStyles from "./styles";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const SmoothSliderElement = ({ field, value, min, max, step, unit, handleOnValueChange, trackWidth, trackHeight, thumbSize }) => {

  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const { isDarkTheme } = useTheme();
  const styles = createStyles(isDarkTheme, dimensions.width, dimensions.height);
  const Colors = Themes[isDarkTheme ? 'darkMode' : 'lightMode'];
  const [currentValue, setCurrentValue] = useState(value);

  // độ dài bước
  const widthStep = useMemo(() => {
    if (step === 0) return 0;
    return trackWidth / ((max - min) / step);
  }, [trackWidth, max, min, step]);

  const translateX = useSharedValue(0);
  const [translateXCurrent, setTranslateXCurrent] = useState(0);

  useEffect(() => {
    if (widthStep) {
      console.log('widthStep: ', widthStep, ' --- value: ', value);
      translateX.value = widthStep * ((value - min) / step);
      setTranslateXCurrent(widthStep * ((value - min) / step));
      setCurrentValue(value);
    }
  }, [value, widthStep])

  const handleGesture = (event) => {
    const newTranslateX = Math.max(0, Math.min(trackWidth, translateXCurrent + event.translationX));
    setCurrentValue(Math.round(newTranslateX / widthStep) * step + min); // lấy value
    translateX.value = newTranslateX;
  };

  const handleGestureEnd = () => {
    const newTranslateXFormat = Math.round((translateX.value / widthStep)) * widthStep;
    translateX.value = newTranslateXFormat
    setTranslateXCurrent(newTranslateXFormat);
    handleOnValueChange(currentValue);
  }

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value - thumbSize / 2 - 1 }],
  }));


  const animatedTrackStyle = useAnimatedStyle(() => ({
    width: translateX.value <= 0 ? 0 : translateX.value,
  }));

  const thumbStyle = useMemo(() => ({
    width: thumbSize,
    height: thumbSize,
    borderRadius: thumbSize / 2,
  }), [thumbSize, trackHeight]);

  const trackStyle = useMemo(() => ({
    width: trackWidth,
    height: trackHeight,

  }), [trackWidth, trackHeight]);

  const thumbInnerStyle = useMemo(() => ({
    width: thumbSize / 2,
    height: thumbSize / 2,
    borderRadius: thumbSize
  }), [thumbSize]);

  return (
    <View style={styles.smoothSliderElement}>
      <View style={[
        styles.smoothSliderContainer
      ]}>
        <View style={[
          styles.trackContainer, trackStyle
        ]}>
          <Animated.View style={[styles.filledTrack, animatedTrackStyle]} />
          <PanGestureHandler

            onGestureEvent={(event) => handleGesture(event.nativeEvent)}
            onEnded={handleGestureEnd}
          >
            <Animated.View style={[
              styles.thumbView, animatedThumbStyle,
              { bottom: -thumbSize / 2 + trackHeight / 2 }
            ]}>
              <Text style={styles.sliderValueText}>{currentValue}</Text>
              <View style={[styles.thumb, thumbStyle]}>
                <View style={[styles.thumbInner, thumbInnerStyle]} />
              </View>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </View>
      {/* <View style={styles.limit}>
        <Text style={styles.limitText}>{min}</Text>
        <Text style={styles.limitText}>{max}</Text>
      </View> */}
    </View>
  )

}

export default React.memo(SmoothSliderElement);