import AsyncStorage from '@react-native-async-storage/async-storage';
import { mildVital } from '../resources/constants';

interface IValue {
    min: string;
    seg: string;
}
type storageType = {
    key: string;
    value?: IValue;
}
const status: any = {
    success: 'success',
    fail: 'fail'
}

const setDefaultData = async () => {
    const preparePair = [mildVital.prepare, JSON.stringify({ min: '05', seg: '00', type: 'prepare', title: 'Preparar' })];
    const exercisePair = [mildVital.exercise, JSON.stringify({ min: '45', seg: '00', type: 'exercise', title: 'Exercitar' })];
    const restPair = [mildVital.rest, JSON.stringify({ min: '30', seg: '00', type: 'rest', title: 'Descansar' })];
    const roundPair = [mildVital.rounds, JSON.stringify({ rounds: '1', type: 'rounds', title: 'Rodadas' })];

    try {
        await AsyncStorage.multiSet([preparePair, exercisePair, restPair, roundPair]);
    }
    catch (err) {
        return status.fail;
    }
    return status.success;
}
export const getData = async () => {
    let values;
    const keys: string[] = [
        mildVital.prepare,
        mildVital.exercise,
        mildVital.rest,
        mildVital.rounds,
    ];
    try {
        values = await AsyncStorage.multiGet(keys);
        return values;
    } catch (err) {
        console.error(err);
    }
}
export const useStorage = async () => {
    try {
        const data = await getData();

        const isLocalStorageEmpty = data![0].includes(null);

        if (!isLocalStorageEmpty) return data;

        setDefaultData();

    } catch (err) {
        return status.fail;
    }
}
export const storeData = async ({ key, value }: storageType) => {
    try {
        await AsyncStorage.setItem('@mildVital_' + key, JSON.stringify(value));
    }
    catch (err) {
        return status.fail;
    }
    return status.success;
}

