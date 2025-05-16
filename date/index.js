//this is a date module that provides functions to convert dates to different formats and other date-related utilities
// and to check if a date is valid
// and to convert a date to ticks, string, or date object


function formatDate(src, format) {
    if (!isValidDate(src)) {
        return null;
    }

    const date = new Date(src);
    const map = {
        "YYYY": date.getFullYear(),
        "MM": String(date.getMonth() + 1).padStart(2, '0'),
        "DD": String(date.getDate()).padStart(2, '0'),
        "HH": String(date.getHours()).padStart(2, '0'),
        "mm": String(date.getMinutes()).padStart(2, '0'),
        "ss": String(date.getSeconds()).padStart(2, '0')
    };

    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, matched => map[matched]);
}

function addDays(src, days) {
    if (!isValidDate(src)) {
        return null;
    }

    const date = new Date(src);
    date.setDate(date.getDate() + days);
    return date;
}

function differenceInDays(date1, date2) {
    if (!isValidDate(date1) || !isValidDate(date2)) {
        return null;
    }

    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function startOfDay(src) {
    if (!isValidDate(src)) {
        return null;
    }

    const date = new Date(src);
    date.setHours(0, 0, 0, 0);
    return date;
}

function endOfDay(src) {
    if (!isValidDate(src)) {
        return null;
    }

    const date = new Date(src);
    date.setHours(23, 59, 59, 999);
    return date;
}

function isValidDate(src) {

    if (typeof src === "number") {
        return true;
    }

    return !isNaN(Date.parse(src));
}

function dateToTicks(src) {

    if (isValidDate(src)) {
        return new Date(src).getTime();
    } else {
        return new Date().getTime();
    }
}


function dateToString(src) {

    if (isValidDate(src)) {
        return new Date(src).toISOString();
    } else {
        return new Date().toISOString();
    }
}

function dateToDate(src) {

    if (isValidDate(src)) {
        return new Date(src);
    } else {
        return new Date();
    }
}

module.exports = {
    formatDate,
    addDays,
    differenceInDays,
    startOfDay,
    endOfDay,
    isValidDate,
    dateToTicks,
    dateToString,
    dateToDate
};