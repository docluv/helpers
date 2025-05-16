/**
 * Reverses the given string.
 *
 * @param {string} str - The string to be reversed.
 * @returns {string} The reversed string. Returns an empty string if the input is not a string.
 */
function reverseString(str) {
    if (typeof str === "string") {
        return str.split("").reverse().join("");
    }
    return "";
}

function isPalindrome(str) {
    if (typeof str === "string") {
        const cleaned = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        return cleaned === cleaned.split("").reverse().join("");
    }
    return false;
}

function truncateString(str, length, ending = "...") {
    if (typeof str === "string" && str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    }
    return str;
}

function countOccurrences(str, subStr) {
    if (typeof str === "string" && typeof subStr === "string") {
        return (str.match(new RegExp(subStr, "g")) || []).length;
    }
    return 0;
}

function removeWhitespace(str) {
    if (typeof str === "string") {
        return str.replace(/\s+/g, "");
    }
    return "";
}


function capitalizeFirstLetter (str) {

    if (typeof str === "string") {
        return str.replace(/^\w/, c => c.toUpperCase());
    } else {
        return "";
    }

}

/**
 * Converts a given string into a URL-friendly slug.
 *
 * This function replaces spaces with hyphens, removes apostrophes,
 * strips out non-alphanumeric characters (excluding hyphens and underscores),
 * collapses multiple hyphens into a single hyphen, and converts the string to lowercase.
 *
 * @param {string} src - The input string to be converted into a slug.
 * @returns {string} A URL-friendly slug. Returns an empty string if the input is not a string.
 */
function makeSlug (src) {

    if (typeof src === "string") {

        return src.replace(/ +/g, "-")
            .replace(/\'/g, "")
            .replace(/[^\w-]+/g, "")
            .replace(/-+/g, "-")
            .toLowerCase();

    }

    return "";

}

/**
 * Converts a given string to title case, where the first letter of each word is capitalized
 * and the remaining letters are in lowercase.
 *
 * @param {string} str - The input string to be converted to title case.
 * @returns {string} The title-cased version of the input string. Returns an empty string if the input is falsy.
 */
function titleCase (str) {

    if (str) {

        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );

    } else {

        return "";

    }
}

function pad (num, size) {

    var s = num + "";

    while (s.length < size) s = "0" + s;

    return s;
}

function getInitials (str) {
    return str.replace(" - ", " ").split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
}

module.exports = {
    reverseString,
    isPalindrome,
    truncateString,
    countOccurrences,
    removeWhitespace,
    capitalizeFirstLetter,
    makeSlug,
    titleCase,
    pad,
    getInitials
};