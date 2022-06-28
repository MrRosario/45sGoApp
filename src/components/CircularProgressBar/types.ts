export type Props = {
    minutes: any,
    seconds: any;
    mode: any;
}

export enum PogressBarMode {
    prepare = 'prepare',
    exercise = 'exercise',
    rest = 'rest',
}