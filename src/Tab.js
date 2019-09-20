import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';

class Tab extends Component {
    static propTypes = {
        children: PropTypes.node,
        heading: PropTypes.string.isRequired,
        containerStyle: ViewPropTypes.style,
    }

    render() {
        return (
            <View style={this.props.containerStyle}>
                {this.props.children}
            </View>
        );
    }
}

export default Tab;