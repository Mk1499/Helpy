import { Animated } from 'react-native';
import React, { useEffect } from 'react';

export default function BouncedWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const bounceAnimatedValue = new Animated.Value(10);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnimatedValue, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnimatedValue, {
          toValue: 10,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: bounceAnimatedValue,
          },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
}
