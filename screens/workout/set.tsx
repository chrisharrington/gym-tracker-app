import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import StepInput from '../../components/step-input';

interface ISetProps {
    index: number;
    number: number;
    reps: number;
    weight: number;
    onRepsChanged: (reps: number) => void;
    onWeightChanged: (weight: number) => void;
}

export default class Set extends React.Component<ISetProps> {
    render() {
        return <View style={style.container}>
            <View style={style.count}>
                <StepInput
                    step={1}
                    value={this.props.reps}
                    onChange={(reps: number) => this.props.onRepsChanged(reps)}
                    width={48}
                />
            </View>

            <View style={style.weight}>
                <StepInput
                    step={2.5}
                    value={this.props.weight.toFixed(1)}
                    onChange={(weight: number) => this.props.onWeightChanged(weight)}
                    width={80}
                />
            </View>
            
            <TouchableOpacity style={style.delete}>
                <Text style={style.deleteText}>╳</Text>
            </TouchableOpacity>
        </View>;
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    },

    count: {
        paddingRight: 15
    },

    weight: {
        paddingRight: 15
    },

    delete: {
        
    },

    deleteText: {
        color: '#777777',
        fontSize: 18,
        padding: 8
    }
});