export default function getRandomElementSoundCheck(elements, lastNum) {
    let newElement = {
        'value': 'low',
        'sound': 0
    }

    let difNum = true;
    let rand = Math.floor(Math.random() * elements.length);
    while (difNum) {
        rand = Math.floor(Math.random() * elements.length);
        if (rand !== lastNum) difNum = false
    }

    newElement.sound = rand;
    if (rand % 2 === 0) newElement.value = 'high';
    else newElement.value = 'low';

    return newElement;
}