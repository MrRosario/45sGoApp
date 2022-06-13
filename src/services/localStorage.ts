import AsyncStorage from '@react-native-async-storage/async-storage';
import { fortyFiveSgo } from '../resources/constants';

interface IValues {
    min?: string;
    sec?: string;
    rounds?: string
}
type storageType = {
    key: string;
    values?: IValues;
}
const status: any = {
    success: 'success',
    fail: 'fail'
}

const setDefaultData = async () => {
    const preparePair = [fortyFiveSgo.prepare, JSON.stringify({ min: '00', sec: '05', type: 'prepare', title: 'Preparar' })];
    const exercisePair = [fortyFiveSgo.exercise, JSON.stringify({ min: '00', sec: '45', type: 'exercise', title: 'Exercitar' })];
    const restPair = [fortyFiveSgo.rest, JSON.stringify({ min: '00', sec: '30', type: 'rest', title: 'Descansar' })];
    const roundPair = [fortyFiveSgo.rounds, JSON.stringify({ rounds: '1', type: 'rounds', title: 'Rodadas' })];

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
        fortyFiveSgo.prepare,
        fortyFiveSgo.exercise,
        fortyFiveSgo.rest,
        fortyFiveSgo.rounds,
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
export const storeData = async ({ key, values }: storageType): Promise<any> => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(values));
    }
    catch (err) {
        return status.fail;
    }
    return status.success;
}

