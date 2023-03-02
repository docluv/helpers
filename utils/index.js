


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

        value = JSON.stringify(value);

    }

    return value;

}


module.exports = {
    parse,
    stringify
};