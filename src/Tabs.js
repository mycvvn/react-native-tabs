import React, {useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Animated,Easing, ViewPropTypes } from 'react-native';
import Button from 'react-native-button';
import Tab from './Tab';
import {
  SCREEN_WIDTH,
  DEFAULT_LINE_COLOR,
  DEFAULT_CHANGE_DURATION
} from './constants';
import { ScrollView } from 'react-native';

const defaultListener = () => { };





function Tabs(props) {

  const [tabs,setTabs ] = useState()
  const [tabIndexPosition, setTabIndexPosition] = useState(props.tabIndex || 0)

  const fadeAnim = new Animated.Value(0.1)
  const tabLinePosition = new Animated.Value(0.1)

  

   useEffect(() => {
  if (props.children) {
    setTabs(props.children);
    }
   }, [])
  
  useEffect(() => {
   
     Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: props.tabChangeDuration || DEFAULT_CHANGE_DURATION,
        // easing: Easing.inOut,
        // friction: 20,
        useNativeDriver: true 
      }
     ).start();
    Animated.spring(
      tabLinePosition, {
      toValue: 1,
      easing: Easing.inOut,
        friction: 20,
        useNativeDriver: true 
        // duration: props.tabChangeDuration || DEFAULT_CHANGE_DURATION
      }).start();
   
  })

  const animateToRIght = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0]
  })
  const animateTabHeading = tabLinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  })
//#region GET TAB HEADINGS
  function headingsList() {
    return React.Children.map(props.children, child => {
      if (child.type !== Tab) {
        throw new Error('<Tabs /> can only contain <Tab />');
      }
      return child.heading;
    });
  }
  // console.log("GET HEADING LIST:", headingsList)

//#endregion GET TAB HEADINGS

  //#region GET ACTIVE TAB

  function activeTab() {
    if (props.children.length > 0) {
      return props.children[tabIndexPosition].props.children || null;
    }
    return null;
  }

  //#endregion GET ACTIVE TAB

  //#region RENDER ACTIVE LINE
function _renderActiveLine() {
    return (
      <Animated.View
        useNativeDriver={true} 
        style={[
          styles.tabActiveLine,
          {
          width: "100%",
          transform: [{scaleX:animateTabHeading}],
          height: 3,
          backgroundColor: props.activeLineColor || DEFAULT_LINE_COLOR
          }
        ]}
      />
    );
}
  //#endregion RENDER ACTIVE LINE
  
  //#region RENDER TAB HEADING STYLES
  const titleActiveStyles = index => [
      styles.heading,
      props.tabTitleStyle,
      tabIndexPosition === index && styles.headingActive,
      tabIndexPosition === index && props.activeTabTitleStyle
    ];
    const tabActiveStyles = index => [
      styles.headingTab,
      tabIndexPosition=== index && props.activeTabContainerStyle,
      props.tabContainerStyle
    ];
  //#endregion RENDER TAB HEADING STYLES
  
  //#region RENDER TAB BUTTOMS
  const _renderTabsButtoms = tabs && tabs.map((tabHeading, index) => {

    function handleChangeTabIndex() {
      setTabIndexPosition(index);
     
    } 
    
    return (
      <View>
        <Button
           
            key={index}
            onPress={handleChangeTabIndex}
            containerStyle={styles.headingButton}
          >
            <View style={tabActiveStyles(index)} >
              <Text style={titleActiveStyles(index)}>{tabHeading.props.heading}</Text>
            </View>
      </Button>
      {index === tabIndexPosition ? _renderActiveLine() : null}
          </View>
        )
  }
        
  )
  //#endregion RENDER TAB BUTTOMS
  

    return (
      <View style={props.containerStyle}>
         <ScrollView style={styles.headingWrapper} horizontal={true} showsHorizontalScrollIndicator={false}>
          {_renderTabsButtoms}
          </ScrollView>
        <Animated.View style={[styles.tabContent, props.tabBodyStyle, {
          //translateX: animateToRIght
          opacity: fadeAnim
        }]}>
          {activeTab()}
        </Animated.View>
      </View>
    );
  
}
const styles = StyleSheet.create({
  headingWrapper: {
    marginHorizontal: -8,
    
  },
  headingButton: {
    flex: 1,
    
    marginHorizontal: 8
  },
  headingTab: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 12,
    position: 'relative'
  },
  tabActiveLine: {
    position: 'absolute',
    bottom: -1,
    height: 1
  },
  heading: {
    textAlign: 'center',
    fontSize: 15,
    color: '#666'
  },
  headingActive: {
    fontWeight: '600',
    color: '#000'
  },
  tabContent: {
    marginTop: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingBottom: 0,
    // opacity: fadeAnim
   
  }
});
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
    activeLineColor: PropTypes.string
  };

  Tabs.defaultProps = {
    children: null,
    tabIndex: 0,
    tabChangeDuration: DEFAULT_CHANGE_DURATION,
    tabTitleStyle: undefined,
    activeTabTitleStyle: undefined,
    tabContainerStyle: undefined,
    tabBodyStyle: undefined,
    containerStyle: undefined,
    activeTabContainerStyle: undefined,
    onChangeTab: defaultListener,
    activeLineColor: DEFAULT_LINE_COLOR
  };


  
