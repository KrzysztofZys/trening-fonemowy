export default function getRandomElement(elements, lastNum) {
    let difNum = true;
    let rand = Math.floor(Math.random() * elements.length);

    while (difNum) {
        rand = Math.floor(Math.random() * elements.length);
        if (rand !== lastNum) difNum = false
    }

    return rand;
}