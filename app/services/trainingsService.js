import { setData } from '../store/actions/trainingsActions';
import * as rythmOrderData from '../assets/excersises/rythm_order.json';
import * as soundLevelData from '../assets/excersises/sound_level.json';
import { excersises } from '../constants/excersisesConstants';

export const trainingsService = {
    fetchExcersise
}

function fetchExcersise(name) {
    if (name === undefined) {
        let data = [];
        data = [...data, rythmOrderData];
        data = [...data, soundLevelData];
        return setData(data);
    }

    switch (name) {
        case excersises.rythmOrderData:
            return setData(rythmOrderData);
        case excersises.soundLevelData:
            return setData(soundLevelData);
        default:
            return setData(rythmOrderData);
    }
}



// function fetchExcersise(name) {
//     return dispatch => {
//         // requestExcersise(name)
//         //     .then(data => {
//         //         if (data !== undefined) {
//         //             dispatch(trainingsActions.set(data));
//         //         }
//         //     });
//     }
// }
