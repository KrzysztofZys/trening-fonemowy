export default function getRandomElementBreaking(elements, lastNum, index) {
    let newElement = {
        'value': 0,
        'sound': 0
    }

    let difNum = true;
    let rand = Math.floor(Math.random() * (elements.length+1));
    while (difNum) {
        rand = Math.floor(Math.random() * (elements.length+1));
        if (rand !== lastNum) difNum = false
    }

    newElement.sound = rand;
    if (index === 0) {
        if (rand < 10) newElement.value = 1;
        else if ( 10 <= rand && rand < 23 ) newElement.value = 2;
        else newElement.value = 3;
    } else {
        if (rand < 7) newElement.value = 2;
        else if ( 7 <= rand && rand < 18 ) newElement.value = 3;
        else newElement.value = 4;
    }

    return newElement;
}