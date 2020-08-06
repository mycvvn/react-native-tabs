import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ViewPropTypes,
  TouchableOpacity,
} from 'react-native';
import Tab from './Tab';
import {DEFAULT_LINE_COLOR, DEFAULT_CHANGE_DURATION} from './constants';
import {ScrollView} from 'react-native';
import useFadeAnimation from './hooks/useFadeAnimation';
import useSlideAnimation from './hooks/useSlideAnimation';
import useScaleHeadingAnimation from './hooks/useScaleHeadingAnimation';

const defaultListener = () => {};

function Tabs(props) {
  const [tabs, setTabs] = useState();
  const [tabIndexPosition, setTabIndexPosition] = useState(props.tabIndex || 0);

  // #region ANIMATIONS HOOKS
  const FADE_ANIMATION = useFadeAnimation(
    props.tabChangeDuration,
    tabIndexPosition,
  );
  const SLIDE_ANIMATION = useSlideAnimation(tabIndexPosition);
  const SCALE_HEADING_ANIMATION = useScaleHeadingAnimation();
  const OPACITY = {opacity: FADE_ANIMATION};
  const TRANSLATEX = {translateX: SLIDE_ANIMATION};
  // #endregion ANIMATIONS HOOKS

  // #region RENDER useEffects
  useEffect(() => {
    if (props.children) {
      setTabs(props.children);
    }
  }, []);
  useEffect(() => {
    props.onChangeTab();
  }, [tabIndexPosition]);
  // #endregion RENDER useEffects

  // #region GET TAB HEADINGS
  function _renderErrorOnNoTabComponent() {
    return React.Children.map(props.children, (child) => {
      if (child.type !== Tab) {
        throw new Error('<Tabs /> can only contain <Tab />');
      }
      return child.heading;
    });
  }
  // console.log("GET HEADING LIST:", _renderErrorOnNoTabComponent)

  // #endregion GET TAB HEADINGS

  // #region GET ACTIVE TAB

  function _renderActiveTab() {
    if (props.children.length > 0) {
      return props.children[tabIndexPosition].props.children || null;
    }
    return null;
  }

  // #endregion GET ACTIVE TAB

  // #region RENDER ACTIVE LINE
  function _renderActiveLine() {
    return (
      <Animated.View
        useNativeDriver={true}
        style={[
          styles.tabActiveLine,
          {
            width: '100%',
            transform: [{scaleX: SCALE_HEADING_ANIMATION}],
            height: 3,
            backgroundColor: props.activeLineColor || DEFAULT_LINE_COLOR,
          },
        ]}
      />
    );
  }
  // #endregion RENDER ACTIVE LINE

  // #region RENDER TAB HEADING STYLES
  const _renderTitleActiveStyles = (index) => [
    styles.heading,
    props.tabTitleStyle,
    tabIndexPosition === index && styles.headingActive,
    tabIndexPosition === index && props.activeTabTitleStyle,
  ];
  const _renderTabActiveStyles = (index) => [
    styles.headingTab,
    tabIndexPosition === index && props.activeTabContainerStyle,
    props.tabContainerStyle,
  ];
  // #endregion RENDER TAB HEADING STYLES

  // #region RENDER TAB BUTTOMS
  const _renderTabsButtoms =
    tabs &&
    tabs.map((tabHeading, index) => {
      function handleChangeTabIndex() {
        setTabIndexPosition(index);
      }

      return (
        <View key={index}>
          <TouchableOpacity
            key={index}
            onPress={handleChangeTabIndex}
            containerStyle={styles.headingButton}>
            <View style={_renderTabActiveStyles(index)}>
              <Text style={_renderTitleActiveStyles(index)}>
                {tabHeading.props.heading}
              </Text>
            </View>
          </TouchableOpacity>
          {index === tabIndexPosition && props.showBottomLine
            ? _renderActiveLine()
            : null}
        </View>
      );
    });
  // #endregion RENDER TAB BUTTOMS

  return (
    <View style={props.containerStyle}>
      <ScrollView
        style={styles.headingWrapper}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {_renderTabsButtoms}
      </ScrollView>
      <Animated.View
        style={[
          styles.tabContent,
          props.tabBodyStyle,
          props.animationType === 'slide' ? TRANSLATEX : OPACITY,
        ]}>
        {_renderErrorOnNoTabComponent()}
        {_renderActiveTab()}
      </Animated.View>
    </View>
  );
}

// #region STYLES
const styles = StyleSheet.create({
  headingWrapper: {
    marginHorizontal: -8,
  },
  headingButton: {
    flex: 1,
  },
  headingTab: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 12,
    position: 'relative',
  },
  tabActiveLine: {
    position: 'absolute',
    bottom: -1,
    height: 1,
  },
  heading: {
    textAlign: 'center',
    fontSize: 15,
    color: '#666',
  },
  headingActive: {
    fontWeight: '600',
    color: '#000',
  },
  tabContent: {
    marginTop: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingBottom: 0,
  },
});

// #endregion STYLES

export default Tabs;

Tabs.propTypes = {
  children: PropTypes.node,
  tabIndex: PropTypes.number,
  tabChangeDuration: PropTypes.number,
  tabTitleStyle: ViewPropTypes.style,
  activeTabTitleStyle: ViewPropTypes.style,
  tabContainerStyle: ViewPropTypes.style,
  tabBodyStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  activeTabContainerStyle: ViewPropTypes.style,
  onChangeTab: PropTypes.func,
  activeLineColor: PropTypes.string,
  showBottomLine: PropTypes.bool,
  animationType: PropTypes.oneOf(['slide', 'fade']),
};

Tabs.defaultProps = {
  children: null,
  tabIndex: null,
  tabChangeDuration: DEFAULT_CHANGE_DURATION,
  tabTitleStyle: undefined,
  activeTabTitleStyle: undefined,
  tabContainerStyle: {paddingHorizontal: 8},
  tabBodyStyle: {backgroundColor: 'transparent'},
  containerStyle: undefined,
  activeTabContainerStyle: undefined,
  onChangeTab: defaultListener,
  activeLineColor: DEFAULT_LINE_COLOR,
  showBottomLine: true,
  animationType: 'fade',
};
