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
    entries: { [date: string] : ExerciseEntry }
}

export class ExerciseEntry {
    date: Date;
    sets: Set[];

    constructor() {
        this.sets = [];
    }
}

export class Set {
    reps: number;
    weight: number;
    placeholderReps: number;
    placeholderWeight: number;

    constructor(reps?: number, weight?: number, placeholderReps?: number, placeholderWeight?: number) {
        this.reps = reps || 0;
        this.weight = weight || 0;
        this.placeholderReps = placeholderReps || 0;
        this.placeholderWeight = placeholderWeight || 0;
    }
}