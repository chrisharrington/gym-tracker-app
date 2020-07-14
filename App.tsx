import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View } from 'react-native';
import { useFonts, Oswald_400Regular } from '@expo-google-fonts/oswald';
import dayjs from 'dayjs'

import { Workout } from './models';

import WorkoutsApi from './data/workouts';

import WorkoutScreen from './screens/workout';

const Drawer = createDrawerNavigator();

interface IAppState {
    workouts: Workout[];
}

export default () => {
    const [fontsLoaded] = useFonts({
        'Oswald': Oswald_400Regular
    });

    return fontsLoaded ? <App /> : <AppLoading />;
}

class App extends React.Component<{}, IAppState> {
    state = {
        workouts: []
    }

    async componentDidMount() {
        this.setState({
            workouts: await WorkoutsApi.get()
        });
    }

    render() {
        return this.state.workouts.length ? <NavigationContainer>
            <StatusBar
                style='light'
            />

            <Drawer.Navigator
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
                        />}
                    </Drawer.Screen>
                })}
            </Drawer.Navigator>
        </NavigationContainer> : <View />;
    }
}

const styles = {
    drawer: {
        backgroundColor: '#333333'
    }
}