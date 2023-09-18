const util = require("util");

function parse(value) {

    if (!value) {
        return {};
    }

    if (typeof value === "string" && value !== "") {

        value = JSON.parse(value);

    }

    return value || {};

}

function stringify(value) {

    if (!value) {
        return "";
    }

    if (typeof value !== "string") {

        try {

            value = JSON.stringify(value);


        } catch (error) {
            
            value = util.inspect(obj);

        }

    }

    return value;

}


function queryStringtoJSON(src) {

    return Object.fromEntries(new URLSearchParams(src));

}

function jsonToQueryString(json) {

    if (!json) {
        return "";
    }

    let searchObj = new URLSearchParams();

    for (const key in json) {

        searchObj.append(key, json[key]);
    }

    return searchObj.toString();

}



module.exports = {
    parse: parse,
    stringify: stringify,
    jsonToQueryString: jsonToQueryString,
    queryStringtoJSON: queryStringtoJSON
};
