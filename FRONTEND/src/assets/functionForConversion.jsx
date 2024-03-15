function addMinutesToTime(time, minutesToAdd) {
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr);
    let minutes = parseInt(minutesStr);

    minutes += minutesToAdd;

    if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes %= 60;
    }
    const newHours = String(hours).padStart(2, '0');
    const newMinutes = String(minutes).padStart(2, '0');

    return `${newHours}:${newMinutes}`;
}

export default addMinutesToTime;