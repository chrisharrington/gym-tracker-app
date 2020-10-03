import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View } from 'react-native';
import { useFonts, Oswald_400Regular } from '@expo-google-fonts/oswald';
import * as Font from 'expo-font';
import dayjs from 'dayjs'

import { Workout } from './models';

import WorkoutsApi from './data/workouts';

import WorkoutScreen from './screens/workout';

const Drawer = createDrawerNavigator();

interface IAppState {
    ready: boolean;
    workouts: Workout[];
}

export default class App extends React.Component<{}, IAppState> {
    private updateTimeout: any;

    state = {
        ready: false,
        workouts: []
    }

    async componentDidMount() {
        const [workouts] = await Promise.all([
            WorkoutsApi.get(),
            Font.loadAsync({
                'Oswald': Oswald_400Regular
            })
        ]);

        this.setState({
            workouts,
            ready: true
        });
    }

    render() {
        return this.state.ready ? <NavigationContainer>
            <StatusBar
                style='light'
            />

            <Drawer.Navigator
                initialRouteName={dayjs().format('dddd')}
                drawerStyle={styles.drawer}
                drawerContentOptions={{
                    activeTintColor: '#0398fc',
                    inactiveTintColor: '#ffffff'
                }}
            >
                {this.state.workouts.map((workout: Workout) => {
                    const date = dayjs().day(workout.day);
                    return <Drawer.Screen
                        key={workout.day}
                        name={date.format('dddd')}
                    >
                        {props => <WorkoutScreen
                            workout={workout}
                            navigation={props.navigation}
                            onWorkoutChanged={(workout: Workout) => this.onWorkoutChanged(workout)}
                        />}
                    </Drawer.Screen>
                })}
            </Drawer.Navigator>
        </NavigationContainer> : <AppLoading />;
    }

    private onWorkoutChanged(workout: Workout) {
        const workouts: Workout[] = this.state.workouts;
        workouts.forEach((w: Workout, index: number) => {
            if (w._id === workout._id)
                workouts[index] = workout;
        });
        this.setState({ workouts });

        if (this.updateTimeout)
            clearTimeout(this.updateTimeout);

        this.updateTimeout = setTimeout(async () => {
            await WorkoutsApi.update(workout);
        }, 1000);
    }
}

const styles = {
    drawer: {
        backgroundColor: '#333333'
    }
}