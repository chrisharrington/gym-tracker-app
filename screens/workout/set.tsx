import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import StepInput from '../../components/step-input';

interface ISetComponentProps {
    index: number;
    number: number;
    reps: number;
    weight: number;
    onRepsChanged: (reps: number) => void;
    onWeightChanged: (weight: number) => void;
    onDelete: () => void;
}

export default class SetComponent extends React.Component<ISetComponentProps> {
    render() {
        return <View style={style.container}>
            <View style={style.count}>
                <StepInput
                    step={1}
                    value={this.props.reps}
                    onChange={(reps: number) => this.props.onRepsChanged(reps)}
                    width={48}
                    min={0}
                    max={99}
                />
            </View>

            <View style={style.weight}>
                <StepInput
                    step={2.5}
                    value={this.props.weight.toFixed(1)}
                    onChange={(weight: number) => this.props.onWeightChanged(weight)}
                    width={80}
                    min={0}
                    max={999}
                />
            </View>
            
            <TouchableOpacity style={style.delete} onPress={() => this.props.onDelete()}>
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