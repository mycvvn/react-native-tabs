import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {Animated, Easing} from "react-native";

function useScaleHeadingAnimation() {
  const headingAnimation = new Animated.Value(0.1);

  const animateTabHeading = headingAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(doAnimation);

  function doAnimation() {
    Animated.spring(headingAnimation, {
      toValue: 1,
      easing: Easing.inOut,
      friction: 20,
      useNativeDriver: true,
    }).start();

    return function cleanUp() {};
  }

  return animateTabHeading;
}

useScaleHeadingAnimation.propTypes = {};

export default useScaleHeadingAnimation;
