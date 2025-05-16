/* global Buffer, escape, module, require */

"use strict";

const file = require("./files"),
    { jsonToQueryString,
        queryStringtoJSON
    } = require("./json"),
    {
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
    } = require("./strings"),
    crypto = require("crypto"),
    template = require("mustache"),
    utils = require("./utils"),
    {
        isArray,
        removeEmptyItems,
        removeItemFromList,
        allSettled,
        flattenArray,
        removeDuplicates,
        groupBy,
        intersect,
        shuffleArray
    } = require("./array"),
    cryptoUtils = require("./crypto"),
    httpUtils = require("./http"),
    {
        formatDate,
        addDays,
        differenceInDays,
        startOfDay,
        endOfDay,
        isValidDate,
        dateToTicks,
        dateToString,
        dateToDate
    } = require("./date"),
    {
        ValidationError,
        FileNotFoundError,
        ValidationError,
        FileNotFoundError,
        AuthenticationError,
        AuthorizationError,
        BadRequestError,
        ConflictError,
        NotFoundError,
        InternalServerError,
        ServiceUnavailableError
    } = require("./errors"),
    /** Used as references for various `Number` constants. */
    MAX_SAFE_INTEGER = 9007199254740991,
    /** Used to detect unsigned integer values. */
    reIsUint = /^(?:0|[1-9]\d*)$/;


module.exports.arrayHelpers = arrayHelpers;
const randomChar = () => {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
};

const randomId = () => {
    return randomChar() + Date.now() + randomChar();
};

const RESP_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Allow": "GET, OPTIONS, POST, DELETE",
    "Access-Control-Allow-Methods": "GET, OPTIONS, POST, DELETE",
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
};

let type = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    number: '0123456789',
    special: '~!@#$%^&()_+-={}[];\',.'
};

type.all = type.lower + type.upper + type.number + type.special;


function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function atob(str) {

    return Buffer.from(str, "base64").toString();

}

function base64URLDecode(base64UrlEncodedValue) {

    let result,
        newValue = base64UrlEncodedValue
            .replace("-", "+")
            .replace("_", "/");

    try {

        result = decodeURIComponent(escape(atob(newValue)));

    } catch (e) {
        throw "Base64URL decode of JWT segment failed";
    }

    return parse(result);

}

function cleanEmptyObjectProperties(obj) {

    let ex = obj;

    for (let key in ex) {

        if (ex.hasOwnProperty(key)) {

            if (ex[key] === "") {
                delete ex[key];
            } else if (typeof ex[key] === "object") {

                ex[key] = cleanEmptyObjectProperties(ex[key]);

            }

        }

    }

    return ex;

}

function cleanObject(obj) {

    var key;

    for (key in obj) {

        if (obj.hasOwnProperty(key)) {

            if (typeof obj[key] === "string" && obj[key] === "") {

                delete obj[key];

            }

        }

    }

    return obj;
}

const assign = Object.assign || ((a, b) => (b && Object.keys(b).forEach(k => (a[k] = b[k])), a))

const run = (isArr, copy, patch) => {
    const type = typeof patch;

    if (patch && type === 'object') {
        if (Array.isArray(patch)) {
            for (const p of patch) {
                copy = run(isArr, copy, p);
            }
        } else {
            for (const k of Object.keys(patch)) {
                const val = patch[k];
                if (typeof val === 'function') {
                    copy[k] = val(copy[k], merge);
                } else if (val === undefined) {
                    if (isArr && !isNaN(k)) {
                        copy.splice(k, 1);
                    } else {
                        delete copy[k];
                    }
                } else if (val === null || typeof val !== 'object' || Array.isArray(val)) {
                    copy[k] = val;
                } else if (typeof copy[k] === 'object') {
                    copy[k] = val === copy[k] ? val : merge(copy[k], val);
                } else {
                    copy[k] = run(false, {}, val);
                }
            }
        }
    } else if (type === 'function') {
        copy = patch(copy, merge);
    }

    return copy;
};

const merge = (source, ...patches) => {
    const isArr = Array.isArray(source)
    return run(isArr, isArr ? source.slice() : assign({}, source), patches)
}

// the following functions were pulled from LoDash and modified a little

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {

    const type = typeof value;

    length = length === null ? MAX_SAFE_INTEGER : length;

    return !!length &&
        (type === 'number' ||
            (type !== 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);

}

function basePullAt(array, indexes) {

    let length = array ? indexes.length : 0;
    const lastIndex = length - 1;

    while (length--) {

        let previous;
        const index = indexes[length];

        if (length === lastIndex || index !== previous) {

            previous = index

            if (isIndex(index)) {
                array.splice(index, 1);
            }

        }
    }

    return array;

}


function generatePassword(pattern, length, options) {

    if (typeof pattern === 'undefined') {
        throw new Error('randomatic expects a string or number.');
    }

    if (arguments.length === 1) {

        if (typeof pattern === 'string') {
            length = pattern.length;
        } else if (isNumeric(pattern)) {
            options = {};
            length = pattern;
            pattern = '*';
        }

    }

    if (typeof length === 'object' && length.hasOwnProperty('chars')) {
        options = length;
        pattern = options.chars;
        length = pattern.length;
    }

    let opts = options || {};
    let chars = {
        lower: 'abcdefghijklmnopqrstuvwxyz',
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        number: '0123456789',
        special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let requiredChars = [];
    if (pattern.includes('a')) requiredChars.push(chars.lower);
    if (pattern.includes('A')) requiredChars.push(chars.upper);
    if (pattern.includes('0')) requiredChars.push(chars.number);
    if (pattern.includes('!')) requiredChars.push(chars.special);

    let mask = requiredChars.join('');
    let res = '';

    // Ensure at least one character from each category
    requiredChars.forEach(category => {
        res += category.charAt(parseInt(Math.random() * category.length, 10));
    });

    // Fill the rest of the password length
    while (res.length < length) {
        res += mask.charAt(parseInt(Math.random() * mask.length, 10));
    }

    // Shuffle the result to ensure randomness
    res = res.split('').sort(() => 0.5 - Math.random()).join('');

    return res;

}

function ensureEndingSlash(src) {

    if (!src.endsWith("/")) {

        return src + "/";

    }

    return src;

}

function formatHoursTo12(hours) {
    return hours % 12 || 12;
}

function padNumberWithLeadingZero(number, padding) {

    padding = padding || 2;

    return String(number).padStart(padding, '0') || "00"

}

function AMPM(hours) {

    return (hours >= 12) ? "PM" : "AM";

}

module.exports = {

    merge: merge,

    formatDate,
    addDays,
    differenceInDays,
    startOfDay,
    endOfDay,
    isValidDate,
    dateToTicks,
    dateToString,
    dateToDate,

    jsonToQueryString,
    queryStringtoJSON,

    generatePassword: generatePassword,

    formatHoursTo12: formatHoursTo12,
    padNumberWithLeadingZero: padNumberWithLeadingZero,
    AMPM: AMPM,

    getMimeType: file.getMimeType,

    getHash: function (data) {

        if (typeof data === "object") {
            data = json.stringify(data);
        }

        let md5 = crypto.createHash('md5');

        md5.update(data);

        return md5.digest('hex');
    },

    unixifyPath: file.unixifyPath,
    renameFile: file.renameFile,
    MakeDirectory: file.MakeDirectory,
    walkSync: file.walkSync,
    getFolders: file.getFolders,
    copyFileSync: file.copyFileSync,
    stripBom: file.stripBom,
    readFile: file.readFile,
    readJSON: file.readJSON,
    writeJSON: file.writeJSON,
    ensureFilePath: file.ensureFilePath,
    createFile: file.createFile,
    createImageFile: file.createImageFile,
    generateFile: file.generateFile,
    loadFile: file.loadFile,
    readImage: file.readImage,

    reverseString,
    isPalindrome,
    truncateString,
    countOccurrences,
    removeWhitespace,
    capitalizeFirstLetter,
    makeSlug,
    titleCase,
    pad,
    getInitials,

    render: function (src, data) {
        return template.render(src, data);
    },

    sortObjectsByDate: (objs, field) => {

        return objs.sort(function (a, b) {

            let dateA = new Date(a[field]),
                dateB = new Date(b[field]);

            if (dateA > dateB) {
                return -1;
            }

            if (dateA < dateB) {
                return 1;
            }

            // names must be equal
            return 0;

        });

    },

    "ensureEndingSlash": ensureEndingSlash,

    getNextModule: function (page, current) {

        let index = page.modules.indexOf(current);

        if (index !== page.modules.length) {

            return page.modules[index + 1];

        }

    },



    convertOnOfftoBool: function (value) {

        if (value === "on") {
            return true;
        }

        if (value === "off") {
            return true;
        }

        return value;

    },

    getNextAction: function (page, currentAction) {

        let index = page.actions.findIndex(action => {

            return action === currentAction;

        });

        if (index > -1) {

            return page.actions[index];

        }

        return null;

    },

    parseChildObjects: function (page) {

        page.modules = this.parse(page.modules);
        page.preloads = this.parse(page.preloads);
        page.css = this.parse(page.css);
        page.images = this.parse(page.images);
        page.image = this.parse(page.image);
        page.scripts = this.parse(page.scripts);
        page.tags = this.parse(page.tags);
        page.related = this.parse(page.related);

        return page;

    },

    generateUUID: function () { // Public Domain/MIT

        const hexValues = "0123456789abcdef";
        let uuid = "";

        for (let i = 0; i < 36; i++) {

            if (i === 8 || i === 13 || i === 18 || i === 23) {
                uuid += "-";
            } else if (i === 14) {
                uuid += "4";
            } else {
                uuid += hexValues[Math.floor(Math.random() * 16)];
            }

        }

        return uuid;

    },


    cleanObject: cleanObject,

    utf8: file.utf8,
    randomChar: randomChar,
    randomId: randomId,
    parse: json.parse,
    stringify: json.stringify,
    base64URLDecode: base64URLDecode,
    cleanEmptyObjectProperties: cleanEmptyObjectProperties,
    
    isArray,
    removeEmptyItems,
    removeItemFromList,
    allSettled,
    flattenArray,
    removeDuplicates,
    groupBy,
    intersect,
    shuffleArray,
    
    ValidationError,
    FileNotFoundError, ValidationError,
    FileNotFoundError,
    AuthenticationError,
    AuthorizationError,
    BadRequestError,
    ConflictError,
    NotFoundError,
    InternalServerError,
    ServiceUnavailableError
};