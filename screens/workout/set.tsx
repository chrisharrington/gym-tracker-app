import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import StepInput from '../../components/step-input';

interface ISetComponentProps {
    index: number;
    number: number;
    reps?: number;
    weight?: number;
    onSetChanged?: (reps: number, weight: number) => void;
    onDelete?: () => void;
}

export default class SetComponent extends React.Component<ISetComponentProps> {
    render() {
        return <View style={style.container}>
            <View style={style.count}>
                <StepInput
                    step={1}
                    longStep={10}
                    value={this.props.reps}
                    onChange={(reps: number) => this.props.onSetChanged && this.props.onSetChanged(reps, this.props.weight || 0)}
                    width={48}
                    min={0}
                    max={99}
                />
            </View>

            <View style={style.weight}>
                <StepInput
                    step={2.5}
                    longStep={50}
                    value={this.props.weight}
                    display={(value: any) => value.toFixed(1)}
                    onChange={(weight: number) => this.props.onSetChanged && this.props.onSetChanged(this.props.reps || 0, weight)}
                    width={80}
                    min={0}
                    max={999}
                />
            </View>
            
            <TouchableOpacity style={style.delete} onPress={() => this.props.onDelete && this.props.onDelete()}>
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