import React, { createContext, useState, useContext, useEffect } from 'react';
import { ColorPropType, useColorScheme } from 'react-native';
import storage from '@app/libs/storage';
import AsyncStorage from '@react-native-community/async-storage';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { Platform } from 'react-native';
import { Fonts } from '@app/theme';

const ReaderContext = createContext();

export const ReaderProvider = ({ children }) => {

  // const [readingInterface, setReadingInterface] = useState(undefined);
  const [textStyle, setTextStyle] = useState({});
  const [backgroundStyle, setbackgroundStyle] = useState({});

  useEffect(() => {
    const loadStorage = async () => {
      const backgroundStyleStorage = await storage.get('backgroundStyle');
      const textStyleStorage = await storage.get('textStyle');
      if (backgroundStyleStorage) {
        setbackgroundStyle(backgroundStyleStorage)
      }
      if (textStyleStorage) {
        console.log('textStyleStorage', textStyleStorage)
        setTextStyle(textStyleStorage)
      } else {
        // mặc định font size 18, font 'Lora'
        const style = {
          ...Fonts.large,
          fontFamily: 'Lora'
        }
        storage.set('textStyle', style);
        setTextStyle(style)
      }
    }
    loadStorage();

  }, []);

  const applyFontFamily = (font) => {
    const style = {
      ...textStyle,
      fontFamily: font
    }
    setTextStyle(style)
    storage.set('textStyle', style);
  }
  const applyFontSize = (size) => {
    const style = {
      ...textStyle,
      lineHeight: size + size * 0.5,
      fontSize: size
    }
    setTextStyle(style)
    storage.set('textStyle', style);
  }
  const applyTextColor = (color) => {
    const style = {
      ...textStyle,
      color: color
    }
    setTextStyle(style)
    storage.set('textStyle', style);
  }
  const applyBackgroundColor = (color) => {
    const style = {
      ...backgroundStyle,
      backgroundColor: color
    }
    setbackgroundStyle(style)
    storage.set('backgroundStyle', style);
  }

  return (
    <ReaderContext.Provider value={{ textStyle, backgroundStyle, applyFontFamily, applyFontSize, applyTextColor, applyBackgroundColor }}>
      {children}
    </ReaderContext.Provider>
  );
};

export const useReader = () => useContext(ReaderContext);
