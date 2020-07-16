import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';

import { Workout, Exercise, ExerciseEntry } from '../../models';

import ExerciseComponent from './exercise';

interface IWorkoutScreenProps {
    workout: Workout;
    navigation: any;
    onWorkoutChanged: (workout: Workout) => void;
}

export default class WorkoutScreen extends React.Component<IWorkoutScreenProps> {
    render() {
        const workout = this.props.workout,
            date = dayjs().day(workout.day);

        return <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIcon} onPress={() => this.props.navigation.openDrawer()}>
                    <Ionicons name='md-menu' color='#ffffff' size={32} />
                </TouchableOpacity>
                <View style={styles.innerHeader}>
                    <Text style={styles.innerHeaderText}>{workout.name}</Text>
                    <Text style={styles.innerHeaderSubText}>{date.format('dddd')}</Text>
                </View>
            </View>

            <ScrollView style={styles.exerciseContainer}>
                {workout.exercises.map((exercise: Exercise, index: number) => <ExerciseComponent
                    key={exercise.name}
                    exercise={exercise}
                    onExerciseEntryChanged={(date: string, entry: ExerciseEntry) => this.onExerciseEntryChanged(date, index, entry)}
                />)}
            </ScrollView>
        </View>;
    }

    private onExerciseEntryChanged(date: string, exerciseIndex: number, entry: ExerciseEntry) {
        const workout = this.props.workout;
        workout.exercises[exerciseIndex].entries[date] = entry;
        this.props.onWorkoutChanged(workout);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222222'
    },

    header: {
        backgroundColor: '#333333',
        position: 'absolute',
        top: StatusBar.currentHeight,
        width: '100%',
        height: 60,
        flexDirection: 'row'
    },

    headerIcon: {
        height: 60,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },

    innerHeader: {
        height: 60,
        justifyContent: 'center',
        marginLeft: 10
    },

    innerHeaderText: {
        color: '#ffffff',
        fontSize: 20
    },

    innerHeaderSubText: {
        color: '#eeeeee',
        fontSize: 12
    },

    exerciseContainer: {
        flex: 1,
        alignSelf: 'stretch',
        marginTop: (StatusBar.currentHeight || 0) + 60
    }
});