const fs = require("fs"),
    path = require("path"),
    util = require("./index");


function unixifyPath(filepath) {

    if (isWindows) {

        return filepath.replace(/\\/g, '/');

    } else {

        return filepath;

    }

}


function copyFileSync(srcFile, destFile, override) {

    override = override || true;

    if (!fs.existsSync(srcFile) || override) {

        createFile(destFile, fs.readFileSync(srcFile, utf8), override);

    }

}


async function renameFile(srcPath, newPath) {

    if (fs.existsSync(srcPath)) {

        if (!fs.existsSync(path.dirname(newPath))) {
            fs.mkdirSync(path.dirname(newPath), {
                recursive: true
            });
        }

        return await fs.promises.rename(srcPath, newPath);

    }

}


function MakeDirectory(target) {

    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }

}


function stripBom(string) {

    if (typeof string !== 'string') {
        throw new TypeError(`Expected a string, got ${typeof string}`);
    }

    // Catches EFBBBF (UTF-8 BOM) because the buffer-to-string
    // conversion translates it to FEFF (UTF-16 BOM).
    if (string.charCodeAt(0) === 0xFEFF) {
        return string.slice(1);
    }

    return string;
}


function readFile(src) {

    if (fs.existsSync(src)) {

        return stripBom(fs.readFileSync(src, utf8));

    } else {
        return undefined;
    }

}

function readJSON(src) {

    let content = readFile(src);

    if (content) {

        return util.parse(content);

    }

}

function writeJSON(target, body, overwrite) {

    return createFile(target, util.stringify(body), overwrite);

}

function ensureFilePath(target) {

    var folder = path.dirname(target),
        folders = folder.toLowerCase().replace(/c:\\/g, "").split("\\"),
        targetFolder = "c:\\";

    for (var i = 0; i < folders.length; i++) {

        if (targetFolder === "c:\\") {

            targetFolder += folders[i];

        } else {

            targetFolder += "\\" + folders[i];

        }

        if (!fs.existsSync(targetFolder)) {

            fs.mkdirSync(targetFolder);

        }

    }

}


function createFile(target, body, override) {

    override = override || false;

    if (!fs.existsSync(target) || override) {

        if (!fs.existsSync(path.dirname(target))) {

            fs.mkdirSync(path.dirname(target), {
                recursive: true
            });

        }

        fs.writeFileSync(target, body, utf8);
    }

}

function generateFile(src, dest, data, override) {

    override = override || false;

    if (!fs.existsSync(dest) || override) {

        var content = fs.readFileSync(src, utf8);

        createFile(dest, template.render(content, data), override);

    }

}


function walkSync(dir, filelist) {

    let files = fs.readdirSync(dir);

    filelist = filelist || [];

    files.forEach(function (file) {

        if (fs.statSync(dir + file).isDirectory()) {

            filelist = walkSync(dir + file + '/', filelist);

        } else {

            filelist.push(dir + file);
        }

    });

    return filelist;

}


function getFolders(dir) {

    let folders = [];

    fs.readdirSync(dir).forEach((file) => {

        const filePath = path.join(dir, file);
        const fileStat = fs.lstatSync(filePath);

        if (fileStat.isDirectory()) {

            folders.push(filePath);

            folders = folders.concat(getFolders(filePath));

        }

    });

    return folders;

};


module.exports = {
    unixifyPath: unixifyPath,
    copyFileSync: copyFileSync,
    renameFile: renameFile,
    MakeDirectory: MakeDirectory,
    stripBom: stripBom,
    readFile: readFile,
    readJSON: readJSON,
    writeJSON: writeJSON,
    ensureFilePath: ensureFilePath,
    createFile: createFile,
    generateFile: generateFile,
    walkSync: walkSync,
    getFolders: getFolders
};