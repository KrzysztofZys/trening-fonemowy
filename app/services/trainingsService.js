import { setData } from '../store/actions/trainingsActions';
import * as rythmOrderData from '../assets/excersises/rythm_order.json';
import * as soundLevelData from '../assets/excersises/sound_level.json';
import * as paronyms from '../assets/excersises/paronyms.json';
import * as differention from '../assets/excersises/differention.json';
import * as breaking from '../assets/excersises/breaking.json';
import * as where from '../assets/excersises/where.json';
import { excersises } from '../constants/excersisesConstants';

export const trainingsService = {
    fetchExcersise
}

function fetchExcersise(name) {
    if (name === undefined) {
        let data = [];
        data = [...data, rythmOrderData];
        data = [...data, soundLevelData];
        data = [...data, paronyms];
        data = [...data, differention];
        data = [...data, breaking];
        data = [...data, where];
        return setData(data);
    }

    switch (name) {
        case excersises.rythmOrderData:
            return setData(rythmOrderData);
        case excersises.soundLevelData:
            return setData(soundLevelData);
        case excersises.paronyms:
            return setData(paronyms);
        case excersises.differention:
            return setData(differention);
        case excersises.breaking:
            return setData(breaking);
        case excersises.where:
            return setData(where);
        default:
            return setData(rythmOrderData);
    }
}