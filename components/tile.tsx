import * as React from 'react';
import { View, StyleSheet } from 'react-native';

interface ITileProps {
    style?: any;
}

export default class Tile extends React.Component<ITileProps> {
    render() {
        return <View style={{...(this.props.style || {}), ...style.container}}>
            {this.props.children}
        </View>;
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