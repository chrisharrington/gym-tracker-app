import { Workout } from '../models';
import Config from '../config';

export default class WorkoutsApi {
    static async get() : Promise<Workout[]> {
        const response = await fetch(`${Config.ApiUrl}/workouts`);
        if (response.status !== 200)
            throw new Error(`Error while retreiving workouts. ${response.status}`);

        return await response.json();
    }
}