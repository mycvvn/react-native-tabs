import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions, Animated, ViewPropTypes } from 'react-native';
import Button from 'react-native-button';
import Tab from './Tab';

const screenWidth = Dimensions.get('screen').width;
const defaultListener = () => {}

const DEFAULT_LINE_COLOR = '#355587';

class Tabs extends Component {
    static propTypes = {
        children: PropTypes.node,
        tabIndex: PropTypes.number,
        tabChangeDuration: PropTypes.number,
        activeTabTitleStyle: ViewPropTypes.style,
        tabContainerStyle: ViewPropTypes.style,
        tabBodyStyle: ViewPropTypes.style,
        activeTabContainerStyle: ViewPropTypes.style,
        onChangeTab: PropTypes.func,
        activeLineColor: PropTypes.string,
    }

    static defaultProps = {
        children: null,
        tabIndex: 0,
        tabChangeDuration: 100,
        activeTabTitleStyle: undefined,
        tabContainerStyle: undefined,
        tabBodyStyle: undefined,
        activeTabContainerStyle: undefined,
        onChangeTab: defaultListener,
        activeLineColor: DEFAULT_LINE_COLOR,
    }

    constructor(props) {
        super(props);

        this.state = {
            headings: this.headings,
            tabIndex: props.tabIndex || 0,
            tabLinePosition: new Animated.Value(this.activeLinePosition)
        }
    }

    get headings() {
        return React.Children.map(this.props.children, child => {
            if (child.type !== Tab) {
                throw new Error('<Tabs /> can only contain <Tab />');
            }
            return child.props.heading;
        });
    }

    get totalTabs() {
        return this.props.children.length || 0;
    }

    get activeTab() {
        if (this.props.children.length > 0) {
            return this.props.children[this.state.tabIndex] || null;
        }
        return null;
    }

    get tabWidth() {
        return Math.floor(screenWidth / this.totalTabs);
    }

    get activeLinePosition() {
        const tabIndex = (this.state ? this.state.tabIndex : 0) || this.props.tabIndex;
        return Math.floor(tabIndex * this.tabWidth);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.children.length !== nextProps.children.length) {
            this.setState({ headings: this.headings });
        }
    }

    handleChangeTabIndex(tabIndex) {
        this.setState({ tabIndex }, () => {
            Animated.timing(this.state.tabLinePosition, {
                toValue: this.activeLinePosition,
                duration: this.props.tabChangeDuration || 100,
            }).start();
        });
        this.props.onChangeTab(tabIndex);
    }

    renderHeadings() {
        const titleActiveStyles = index => [
            styles.heading,
            (this.state.tabIndex === index) && styles.headingActive,
            this.props.activeTabTitleStyle,
        ];
        const tabActiveStyles = index => [
            styles.headingTab,
            (this.state.tabIndex === index) && this.props.activeTabContainerStyle,
            this.props.tabContainerStyle,
        ];
        return(
            <View style={styles.headingWrapper}>
                {this.headings.map((heading, index) => (
                    <Button
                        key={heading}
                        onPress={this.handleChangeTabIndex.bind(this, index)}
                        containerStyle={styles.headingButton}
                    >
                        <View style={tabActiveStyles(index)}>
                            <Text style={titleActiveStyles(index)}>{heading}</Text>
                        </View>
                    </Button>
                ))}

                <Animated.View
                    style={[styles.tabActiveLine, {
                        width: this.tabWidth,
                        left: this.state.tabLinePosition,
                        backgroundColor: this.props.activeLineColor || DEFAULT_LINE_COLOR
                    }]}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderHeadings()}

                <View style={[styles.tabContent, this.props.tabBodyStyle]}>
                    {this.activeTab}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    headingWrapper: {
        flexDirection: 'row',
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
        color: '#666'
    },
    headingActive: {
        fontWeight: '600',
        color: '#000'
    },
    tabContent: {
        marginTop: 1,
        backgroundColor: '#fff',
        padding: 16,
    }
});

export default Tabs;