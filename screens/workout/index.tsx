import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Vibration } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
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

            <View style={styles.exerciseWrapper}>
                <DraggableFlatList
                    style={styles.exerciseContainer}
                    data={workout.exercises}
                    renderItem={(params: RenderItemParams<Exercise>) => <ExerciseComponent
                        key={params.item.name}
                        highlight={params.isActive}
                        style={{ marginTop: params.index === 0 ? 15 : 0 }}
                        exercise={params.item}
                        onRename={(exercise: Exercise, name: string) => this.onExerciseRenamed(exercise, name)}
                        onExerciseEntryChanged={(date: string, entry: ExerciseEntry) => this.onExerciseEntryChanged(date, params.index as number, entry)}
                        onLongPress={() => params.drag()}
                    />}
                    keyExtractor={(item, index) => `draggable-item-${item.name}-${index}`}
                    onDragBegin={() => Vibration.vibrate(10)}
                    onDragEnd={({ data: exercises }) => this.onExercisesReordered(exercises)}
                />
            </View>
        </View>;
    }

    private onExerciseEntryChanged(date: string, exerciseIndex: number, entry: ExerciseEntry) {
        const workout = this.props.workout;
        workout.exercises[exerciseIndex].entries[date] = entry;
        this.props.onWorkoutChanged(workout);
    }

    private onExercisesReordered(exercises: Exercise[]) {
        exercises.forEach((exercise: Exercise, index: number) => {
            exercise.order = index;
        });

        const workout = this.props.workout;
        workout.exercises = exercises;
        this.props.onWorkoutChanged(workout);
    }

    private onExerciseRenamed(exercise: Exercise, name: string) {
        const found = this.props.workout.exercises.find((e: Exercise) => e.name === exercise.name);
        if (found) {
            found.name = name;
            this.props.onWorkoutChanged(this.props.workout);
        }
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
        color: '#3d91e6',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },

    exerciseWrapper: {
        flex: 1,
        marginTop: (StatusBar.currentHeight || 0) + 60
    },

    exerciseContainer: {
        flex: 1,
        alignSelf: 'stretch'
    }
});