import React, {useEffect, useState} from "react";
import {Animated, Easing} from "react-native";

function useSlideAnimation(dependency) {
  const [defaulPosition, setDefaultPosition] = useState(0);
  const slideAnimation = new Animated.Value(0.1);
  const animateToRight = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [defaulPosition, 0],
  });

  useEffect(doAnimation);

  function doAnimation() {
    dependency === 0 ? setDefaultPosition(300) : 0;

    Animated.spring(slideAnimation, {
      toValue: 1,
      easing: Easing.inOut,
      friction: 20,
      useNativeDriver: true,
    }).start();
    return function cleanUp() {};
  }
  return animateToRight;
}

useSlideAnimation.propTypes = {};

export default useSlideAnimation;
