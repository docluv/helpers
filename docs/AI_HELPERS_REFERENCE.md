# AI Helpers Reference

This project uses a private npm-installed helper module. Do not assume the helper source files are copied into the current project.

Use the installed package directly:

```js
const helpers = require("helpers");
```

If the actual package name is different in `package.json`, use that package name. The important rule is: import the installed helper module, not a project-relative helper path.

## Core AI/Codex Rule

Before writing new utility functions, check the exposed `helpers` methods below.

Do not recreate generic functions for:

- JSON parsing/stringifying
- JSON file reading/writing
- file creation
- folder creation
- recursive file walking
- path normalization
- slug generation
- object merging
- Mustache rendering
- hashing
- UUID/random ID generation
- array cleanup
- basic date/time formatting

Use the existing helper module unless a new function is truly domain-specific to the current feature.

## Common Import Pattern

```js
const helpers = require("helpers");
```

Use helper methods directly:

```js
const config = helpers.readJSON(configPath) || {};
const slug = helpers.makeSlug(siteName);
const updated = helpers.merge(config, patch);
helpers.writeJSON(configPath, updated, true);
```

## File and Folder Helpers

### `helpers.MakeDirectory(target)`

Creates a directory if it does not already exist. Uses recursive directory creation.

Use for:

- site workspace folders
- output folders
- media folders
- logs folders

Example:

```js
helpers.MakeDirectory(outputDirectory);
```

### `helpers.ensureFilePath(target)`

Ensures the folder path for a target file exists.

Use before writing a file when the parent directory may not exist.

### `helpers.readFile(src, decrypt, algorithm, key, iv, encoding)`

Reads a file from disk and returns its text content.

Defaults are suitable for normal UTF-8 text files.

Use for:

- templates
- generated HTML source
- text config files

### `helpers.readJSON(src)`

Reads a JSON file and returns the parsed object.

Returns `undefined` if the file does not exist.

Example:

```js
const site = helpers.readJSON(sitePath) || {};
```

### `helpers.writeJSON(target, body, overwrite)`

Writes an object as JSON to disk.

Pass `true` for `overwrite` when updating existing config files.

Example:

```js
helpers.writeJSON(mediaJsonPath, mediaConfig, true);
```

Recommended project convention: builder site config files should be pretty-printed JSON for hand editing. If `writeJSON()` does not pretty-print in the installed helper version, either update the helper package or create a builder-specific wrapper that calls `helpers.createFile()` with `JSON.stringify(data, null, 2)`.

### `helpers.createFile(options)`

Creates a file from a string or buffer.

Options:

```js
{
  target,
  body,
  encoding,
  override,
  encrypt,
  algorithm,
  key,
  iv
}
```

Use for:

- generated HTML
- reports
- generated config files
- rendered assets that are text-based

Example:

```js
helpers.createFile({
  target: outputPath,
  body: html,
  encoding: "utf8",
  override: true
});
```

### `helpers.createImageFile(target, imageData, override)`

Writes image data to disk.

Use when working with binary image data.

### `helpers.readImage(src)`

Reads an image file from disk and returns the image buffer.

Returns `undefined` if the file does not exist.

### `helpers.loadFile(src)`

Loads a text or image file based on MIME type.

### `helpers.copyFileSync(srcFile, destFile, override)`

Copies a file.

Use when copying template assets, static assets, or starter files.

### `helpers.renameFile(srcPath, newPath)`

Renames or moves a file. Creates the destination folder if needed.

### `helpers.walkSync(dir, filelist)`

Recursively walks a directory and returns a list of files.

Use for media import scripts instead of writing a new recursive walker.

Example:

```js
const files = helpers.walkSync(sourceDirectory);
```

### `helpers.getFolders(dir)`

Recursively returns folders under a directory.

### `helpers.unixifyPath(filepath)`

Converts Windows backslashes to forward slashes when needed.

Use when storing paths in JSON config files or reports.

Example:

```js
const jsonPath = helpers.unixifyPath(localPath);
```

### `helpers.getMimeType(name)`

Returns the MIME type for a file name. Text-like MIME types include UTF-8 charset handling.

Use during media import or output generation.

## JSON and Query String Helpers

### `helpers.parse(value)`

Parses JSON when `value` is a JSON string.

Returns `{}` for empty input.

Use instead of ad hoc JSON parse wrappers.

### `helpers.stringify(value)`

Stringifies non-string values.

Returns an empty string for empty input.

### `helpers.jsonToQueryString(obj)`

Converts a flat object into a query string.

### `helpers.queryStringtoJSON(src)`

Converts a query string into an object.

## Object Helpers

### `helpers.merge(source, ...patches)`

Merges one or more patch objects into a source object and returns the merged copy.

Use instead of writing one-off deep merge helpers.

Example:

```js
const updated = helpers.merge(currentConfig, {
  builderProfile: {
    name: "Acme Custom Homes"
  }
});
```

### `helpers.cleanObject(obj)`

Removes empty string properties from the top level of an object.

### `helpers.cleanEmptyObjectProperties(obj)`

Recursively removes properties whose value is an empty string.

Useful before saving hand-edited or form-generated JSON.

## Slug, Title, and Text Helpers

### `helpers.makeSlug(src)`

Creates a lowercase slug from a string.

Use this instead of creating new slug helpers.

Example:

```js
const siteSlug = helpers.makeSlug("Acme Custom Homes");
```

### `helpers.titleCase(str)`

Converts a string to title case.

Useful for generating starter media titles from file names or folder names.

### `helpers.capitalizeFirstLetter(str)`

Capitalizes the first letter of a string.

### `helpers.getInitials(str)`

Returns up to two initials from a string.

## Template Rendering

### `helpers.render(src, data)`

Renders a Mustache template string with data.

Use this instead of importing Mustache directly in scripts unless there is a specific reason.

Example:

```js
const html = helpers.render(templateHtml, viewModel);
```

## IDs, Hashing, and Random Values

### `helpers.generateUUID()`

Generates a UUID-style string.

### `helpers.randomId()`

Generates a short random/date-based ID.

### `helpers.randomChar()`

Generates a random uppercase character.

### `helpers.getHash(data)`

Returns an MD5 hash of a string or object.

Useful for detecting content changes, cache keys, or generated file identity.

## Date and Time Helpers

### `helpers.isValidDate(src)`

Checks whether a value can be treated as a valid date.

### `helpers.dateToTicks(src)`

Converts a valid date value to ticks/milliseconds. Falls back to the current time for invalid values.

### `helpers.formatHoursTo12(hours)`

Converts 24-hour values to 12-hour display values.

### `helpers.padNumberWithLeadingZero(number, padding)`

Pads a number with leading zeroes.

### `helpers.AMPM(hours)`

Returns `AM` or `PM` for an hour value.

### `helpers.pad(num, size)`

Pads a number/string to a target size with leading zeroes.

## Array Helpers

### `helpers.isArray(src)`

Returns true only when `src` is an array with at least one item.

Note: this is not the same as `Array.isArray()`. Empty arrays return false.

### `helpers.removeEmptyItems(src)`

Returns an array with falsy items removed.

### `helpers.removeItemFromList(array, predicate)`

Removes items from an array when the predicate returns true and returns the removed items.

### `helpers.allSettled(funcs)`

Runs `Promise.allSettled()` and returns:

```js
{
  results,
  rejected
}
```

Use for batch processing where failures should be reported without stopping the whole script.

## Password and Encoding Helpers

### `helpers.generatePassword(pattern, length, options)`

Generates a password using a pattern.

### `helpers.base64URLDecode(base64UrlEncodedValue)`

Decodes a base64url-encoded JSON value.

## Builder Script Guidance

Builder site generation is currently script-first.

Primary scripts should be small and task-focused:

```text
scripts/builder/create-builder-site-workspace.js
scripts/builder/import-builder-media.js
scripts/builder/import-builder-brand-assets.js
scripts/builder/render-builder-site.js
scripts/builder/validate-builder-site.js
```

The builder site source of truth is JSON configuration files:

```text
site.json
pages.json
communities.json
floor-plans.json
homes.json
galleries.json
testimonials.json
faqs.json
media.json
```

The scripts should use the installed helper module:

```js
const helpers = require("helpers");
```

Do not use project-relative helper imports unless the current project intentionally has local helper code.

## Builder Media Import Expectations

The builder media import script should:

1. Scan a target source folder.
2. Pass supported images through the existing Mosaic/media pipeline.
3. Generate optimized responsive variants.
4. Save normalized media records to `media.json`.
5. Add imported media to a general/top-level gallery album by default.
6. Create placeholder title, alt text, caption, category, and tags.
7. Preserve existing hand-edited metadata when re-run unless `overwrite=true` is explicitly passed.

Default builder gallery albums should include:

```text
Kitchens
Bathrooms
Primary Bedrooms
Secondary Bedrooms
Living Rooms
Dining Rooms
Home Offices
Mudrooms
Laundry Rooms
Exteriors
Elevations
Outdoor Living
Backyards
Details
Uncategorized
```

Media records can later be manually assigned to:

- homes
- floor plans
- communities
- rooms
- galleries
- page sections
- social share assets
- video reel inputs

## AI/Codex Implementation Rules

When writing Foundry builder scripts:

- Use `const helpers = require("helpers");`.
- Do not recreate helper methods exposed by the helper module.
- Do not build Admin UI unless explicitly requested.
- Do not add frontend framework code.
- Do not persist builder content to Mongo for the script-first workflow unless explicitly requested.
- Keep scripts idempotent.
- Keep scripts callable from the CLI.
- Prefer explicit CLI arguments over hidden behavior.
- Print a summary report at the end of every script.
- Preserve hand-edited JSON when re-running scripts unless overwrite is explicitly requested.

## Functions AI Should Not Recreate

Do not recreate local versions of these unless there is a very specific reason:

```text
readJSON
writeJSON
readFile
createFile
createImageFile
MakeDirectory
ensureFilePath
walkSync
getFolders
copyFileSync
renameFile
unixifyPath
getMimeType
parse
stringify
makeSlug
titleCase
merge
render
removeEmptyItems
allSettled
generateUUID
getHash
```

Use the installed helper module instead.
