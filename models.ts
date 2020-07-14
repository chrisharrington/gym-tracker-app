export class Id {
    _id: string;
}

export class Workout extends Id {
    day: number;
    name: string;
    exercises: Exercise[];
}

export class Exercise {
    name: string;
    order: number;
    entries: ExerciseEntry[];
}

export class ExerciseEntry {
    date: Date;
    sets: Set[];
}

export class Set {
    reps: number;
    weight: number;
}