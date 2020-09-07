import * as React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
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
    onRename: (exercise: Exercise, name: string) => void;
    onLongPress?: () => void;
    style?: any;
    highlight?: boolean;
}

interface IExerciseState {
    name: string;
}

export default class ExerciseComponent extends React.Component<IExerciseProps, IExerciseState> {
    state = {
        name: ''
    }

    componentDidMount() {
        this.setState({
            name: this.props.exercise.name
        });
    }

    render() {
        return <Tile
            style={{ ...style.container, ...this.props.style || {}, ...(this.props.highlight ? style.highlight : {}) }}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={style.header}
                onLongPress={() => this.props.onLongPress && this.props.onLongPress()}
            >
                <TextInput
                    style={style.headerText}
                    onChangeText={(text) => this.onRename(text)}
                    onBlur={() => this.props.onRename(this.props.exercise, this.state.name)}
                    value={this.state.name}
                    autoCapitalize='characters'
                />
            </TouchableOpacity>

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
        const today = this.props.exercise.entries[Util.today()] || { sets: [] };
        return today.sets.map((set, index) => (
            <View key={index} style={style.set}>
                <SetComponent
                    index={index}
                    number={index+1}
                    reps={set.reps}
                    weight={set.weight}
                    onSetChanged={(reps: number, weight: number) => this.onSetChanged(index, reps, weight)}
                    onDelete={() => this.onDeleteSet(index)}
                />
            </View>
        ));
    }

    private onRename(name: string) {
        this.setState({ name });
    }

    private getMostRecentEntry(entries: { [date: string] : ExerciseEntry }) : ExerciseEntry | null {
        const dates = Object.keys(entries)
            .map((date: string) => dayjs(date))
            .sort((first: dayjs.Dayjs, second: dayjs.Dayjs) => first.isBefore(second) ? 1 : -1);

        console.log(dates);

        for (var i = 0; i < dates.length; i++) {
            const latest = dates[i];
            if (!latest.startOf('d').isSame(dayjs().startOf('d'))) {
                const entry = entries[latest.format('MM/DD/YYYY')];
                if (entry.sets.length)
                    return entry;
            }
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
            entry = this.props.exercise.entries[date],
            recent = this.getMostRecentEntry(this.props.exercise.entries);

        if (!entry)
            entry = new ExerciseEntry();

        const set = new Set(),
            latest = entry.sets[entry.sets.length-1];

        if (latest) {
            set.reps = latest.reps;
            set.weight = latest.weight;
        } else if (recent) {
            const s = recent.sets[0];
            if (s) {
                set.reps = s.reps;
                set.weight = s.weight;
            }
        }

        entry.sets.push(set);

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
        paddingTop: 8
    },

    highlight: {
        backgroundColor: '#404040'
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
        color: '#3d91e6',
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: 'bold'
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