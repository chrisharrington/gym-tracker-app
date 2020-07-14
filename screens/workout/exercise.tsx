import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Style from '../../style';

import Tile from '../../components/tile';

import { Exercise } from '../../models';

import Set from './set';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';

interface IExerciseProps {
    exercise: Exercise;
}

export default class ExerciseComponent extends React.Component<IExerciseProps> {
    render() {
        const exercise = this.props.exercise,
            index = 0;
            
        return <Tile style={style.container}>
            <View style={style.header}>
                <Text style={style.headerText}>{exercise.name}</Text>
            </View>

            <View style={style.setHeader}>
                <Text style={{ ...style.setHeaderLabel, ...style.repsLabel }}>Reps</Text>
                <Text style={{ ...style.setHeaderLabel, ...style.weightLabel }}>Weight</Text>
            </View>
            
            {/* {new Array(exercise.sets).map((_, index: number) => ( */}
                <View key={index} style={style.set}>
                    <Set
                        index={index}
                        number={index+1}
                        reps={5}
                        weight={125}
                        onRepsChanged={() => {}}
                        onWeightChanged={() => {}}
                    />
                </View>
            {/* ))} */}

            <TouchableOpacity style={style.emptySetContainer}>
                <Ionicons name='md-add' color='#777777' size={22} />
            </TouchableOpacity>
        </Tile>;
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'stretch',
        borderLeftWidth: 3,
        borderLeftColor: Style.darkBaseColour,
        margin: 15,
        marginBottom: 0
    },

    header: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'stretch'
    },

    headerText: {
        color: '#ffffff',
        fontSize: 24,
        alignSelf: 'stretch',
        fontFamily: 'Oswald',
        textTransform: 'uppercase'
    },

    setHeader: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 5
    },

    setHeaderLabel: {
        color: '#aaaaaa',
        textTransform: 'uppercase',
        fontSize: 12
    },

    repsLabel: {
        paddingRight: 30,
        width: 143
    },

    weightLabel: {
        
    },

    set: {
        flex: 1
    },

    emptySetContainer: {
        flex: 1,
        marginTop: 10,
        height: 40,
        lineHeight: 40,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#777777',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
});