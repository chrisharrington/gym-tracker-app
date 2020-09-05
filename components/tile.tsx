import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

interface ITileProps {
    style?: any;
    onLongPress?: () => void;
}

export default class Tile extends React.Component<ITileProps> {
    render() {
        return <TouchableOpacity
            style={{ ...style.container, ...(this.props.style || {}) }}
            activeOpacity={1}
            onLongPress={() => this.props.onLongPress && this.props.onLongPress()}
        >
            {this.props.children}
        </TouchableOpacity>;
    }
}

const style = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#333333',
        overflow: 'hidden',
        shadowColor: 'red',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 7
    }
});