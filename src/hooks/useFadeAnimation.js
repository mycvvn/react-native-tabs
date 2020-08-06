import React, {useEffect} from "react";
import {Animated} from "react-native";

function useFadeAnimation(tabChangeDuration) {
  const tabContentAnimation = new Animated.Value(0.1);

  useEffect(doAnimation);
  function doAnimation() {
    Animated.timing(tabContentAnimation, {
      toValue: 1,
      duration: tabChangeDuration,
      useNativeDriver: true,
    }).start();
    return function cleanUp() {};
  }
  return tabContentAnimation;
}

useFadeAnimation.propTypes = {};
export default useFadeAnimation;
