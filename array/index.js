/**
 * Flattens a nested array into a single-level array.
 * @param {Array} array - The array to flatten.
 * @returns {Array} - The flattened array.
 */
function flattenArray(array) {
    if (!Array.isArray(array)) {
        return [];
    }
    return array.reduce((acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val), []);
}

/**
 * Removes duplicate values from an array.
 * @param {Array} array - The array to deduplicate.
 * @returns {Array} - A new array with unique values.
 */
function removeDuplicates(array) {
    if (!Array.isArray(array)) {
        return [];
    }
    return [...new Set(array)];
}

/**
 * Groups elements of an array based on a callback function.
 * @param {Array} array - The array to group.
 * @param {Function} callback - The callback function to determine the group key.
 * @returns {Object} - An object where keys are group identifiers and values are arrays of grouped elements.
 */
function groupBy(array, callback) {
    if (!Array.isArray(array)) {
        return {};
    }
    return array.reduce((acc, item) => {
        const key = callback(item);
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});
}

/**
 * Finds the intersection of two arrays.
 * @param {Array} array1 - The first array.
 * @param {Array} array2 - The second array.
 * @returns {Array} - An array containing elements present in both arrays.
 */
function intersect(array1, array2) {
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        return [];
    }
    return array1.filter(item => array2.includes(item));
}

/**
 * Shuffles the elements of an array randomly.
 * @param {Array} array - The array to shuffle.
 * @returns {Array} - A new array with shuffled elements.
 */
function shuffleArray(array) {
    if (!Array.isArray(array)) {
        return [];
    }
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

function isArray(src) {

    return Array.isArray(src) && src.length > 0;

}

function removeEmptyItems(src) {

    if (!src || !Array.isArray(src)) {
        return [];
    }

    return src.filter(o => {
        return !!o;
    });

}

/**
 * 
 * @param {Array of promise/async methods to execute} funcs 
 * 
    executes a Promise.allSettled on an array of async functions.
    it then filters successful and rejected functions into a return object.


 */
async function allSettled(funcs) {

    let results = await Promise.allSettled(funcs);

    let rejected = [];

    results = results.map(o => {

        if (o.status === "fulfilled") {

            return o.value;

        } else {

            rejected.push(o.reason);

        }
    }).filter(o => {
        return !!o;
    });

    return {
        "results": results,
        "rejected": rejected
    };

}


function removeItemFromList(array, predicate) {

    const result = [];

    if (!(array !== null && array.length)) {
        return result;
    }

    let index = -1;
    const indexes = [];
    const {
        length
    } = array;

    while (++index < length) {

        const value = array[index];

        if (predicate(value, index, array)) {
            result.push(value);
            indexes.push(index);
        }
    }

    basePullAt(array, indexes);

    return result;
}


module.exports = {
    isArray,
    removeEmptyItems,
    removeItemFromList,
    allSettled,
    flattenArray,
    removeDuplicates,
    groupBy,
    intersect,
    shuffleArray
    
};