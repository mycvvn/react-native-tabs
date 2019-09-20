import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

class Tab extends Component {
    static propTypes = {
        children: PropTypes.node,
    }

    render() {
        return (
            <View>
                {this.props.children}
            </View>
        );
    }
}

export default Tab;