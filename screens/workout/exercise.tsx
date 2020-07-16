import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import Tile from '../../components/tile';

import { Exercise, ExerciseEntry, Set } from '../../models';
import Util from '../../util';

import SetComponent from './set';
import dayjs from 'dayjs';


interface IExerciseProps {
    exercise: Exercise;
    onExerciseEntryChanged: (date: string, entry: ExerciseEntry) => void;
}

export default class ExerciseComponent extends React.Component<IExerciseProps> {
    render() {
        const exercise = this.props.exercise;
        return <Tile style={style.container}>
            <View style={style.header}>
                <Text style={style.headerText}>{exercise.name}</Text>
            </View>

            <View style={style.setHeader}>
                <Text style={{ ...style.setHeaderLabel, ...style.repsLabel }}>Reps</Text>
                <Text style={{ ...style.setHeaderLabel, ...style.weightLabel }}>Weight</Text>
            </View>
            
            {this.renderSets()}

            <TouchableOpacity style={style.emptySetContainer} onPress={() => this.onAddSet()}>
                <Ionicons name='md-add' color='#777777' size={22} />
            </TouchableOpacity>
        </Tile>;
    }

    private renderSets() : JSX.Element[] {
        const today = this.props.exercise.entries[Util.today()] || { sets: [] },
            recent = this.getMostRecentEntry(this.props.exercise.entries);

        if (!today.sets.length && recent)
            return [<View key={0} style={style.set}>
                <SetComponent
                    index={0}
                    number={1}
                    repsPlaceholder={recent.sets[0].reps}
                    weightPlaceholder={recent.sets[0].weight}
                    onSetChanged={(reps: number, weight: number) => this.onSetChanged(0, reps, weight)}
                />
            </View>];

        return today.sets.map((set, index) => (
            <View key={index} style={style.set}>
                <SetComponent
                    index={index}
                    number={index+1}
                    reps={set.reps}
                    weight={set.weight}
                    repsPlaceholder={0}
                    weightPlaceholder={0}
                    onSetChanged={(reps: number, weight: number) => this.onSetChanged(index, reps, weight)}
                    onDelete={() => this.onDeleteSet(index)}
                />
            </View>
        ));
    }

    private getMostRecentEntry(entries: { [date: string] : ExerciseEntry }) : ExerciseEntry | null {
        const dates = Object.keys(entries)
            .map((date: string) => dayjs(date))
            .sort((first: dayjs.Dayjs, second: dayjs.Dayjs) => first.isBefore(second) ? -1 : 1);

        if (dates.length > 0) {
            const latest = dates[0];
            if (!latest.startOf('d').isSame(dayjs().startOf('d')))
                return entries[latest.format('MM/DD/YYYY')];
        }

        return null;
    }

    private onSetChanged(index: number, reps: number, weight: number) {
        let date = Util.today(),
            entry = this.props.exercise.entries[date];

        if (!entry)
            entry = new ExerciseEntry();
        if (!entry.sets[index])
            entry.sets[index] = new Set();

        entry.sets[index].reps = reps;
        entry.sets[index].weight = weight;

        this.props.onExerciseEntryChanged(date, entry);
    }

    private onAddSet() {
        let date = Util.today(),
            entry = this.props.exercise.entries[date];

        if (!entry)
            entry = new ExerciseEntry();

        entry.sets.push(new Set());

        this.props.onExerciseEntryChanged(date, entry);
    }

    private onDeleteSet(index: number) {
        let date = Util.today(),
            entry = this.props.exercise.entries[date];

        entry.sets.splice(index, 1);

        this.props.onExerciseEntryChanged(date, entry);
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'stretch',
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