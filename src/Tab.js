import React from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes} from 'react-native';

function Tab({children, containerStyle}) {
  return <View style={containerStyle}>{children}</View>;
}
Tab.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string.isRequired,
  containerStyle: ViewPropTypes.style,
};

export default Tab;
