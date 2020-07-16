import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IStepInputProps {
    step: number;
    value: any;
    onChange: (value: number) => void;
    width: number;
    min?: number;
    max?: number;
}

export default class StepInput extends React.Component<IStepInputProps> {
    render() {
        return <View style={style.container}>
        
            <TouchableOpacity style={{ ...style.wrapper, ...style.wrapperLeft }} onPress={() => this.onDecrease(this.props.step)} onLongPress={() => this.onDecrease(this.props.step * 4)}>
                <Ionicons name='md-arrow-dropdown' color='#cccccc' size={16} />
            </TouchableOpacity>
        
            <View style={{ ...style.wrapper, ...{ width: this.props.width }}}>
                <Text style={{ ...style.text, ...style.weight }}>{this.props.value.toString()}</Text>
            </View>

            <TouchableOpacity style={{ ...style.wrapper, ...style.wrapperRight }} onPress={() => this.onIncrease(this.props.step)} onLongPress={() => this.onIncrease(this.props.step * 4)}>
                <Ionicons name='md-arrow-dropup' color='#cccccc' size={16} />
            </TouchableOpacity>
        </View>;
    }

    private onDecrease(step: number) {
        const value = parseFloat(this.props.value) - step,
            min = this.props.min;

        if (!(min !== undefined && value < min))
            this.props.onChange(value);
    }

    private onIncrease(step: number) {
        const value = parseFloat(this.props.value) + step,
            max = this.props.max;

        if (!(max !== undefined && value > max))
            this.props.onChange(value);
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },

    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#444444',
        height: 40,
        lineHeight: 40,
        paddingLeft: 10,
        paddingRight: 10
    },

    wrapperLeft: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderRightColor: '#333333',
        borderRightWidth: 3,
        width: 40
    },

    wrapperRight: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderLeftColor: '#333333',
        borderLeftWidth: 3,
        width: 40
    },

    text: {
        color: '#cccccc',
        fontSize: 22,
        textAlign: 'center'
    },

    weight: {
        color: '#ffffff',
        fontWeight: 'bold'
    }
});