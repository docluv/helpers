# Utility Helper Functions

A comprehensive collection of utility functions designed to simplify and streamline various tasks such as string manipulation, date handling, file operations, and more. This library provides a robust toolset that can be integrated into various applications.

This is really a collection of common functions that I have used in various projects over the years. I decided to consolidate them into a single library to make it easier to reuse them in future projects. I also wanted to make it easier to share them with others who may find them useful.

At this time I have no intentions of supporting pull requests, offer no support or will be heald liable for any issues your applications may have or cause. I am simply sharing this code in the hopes that it may be useful to others.

## Features

- **String Manipulation**: Functions to handle string operations such as generating random characters, converting strings, and more.
- **File Operations**: A set of utilities for handling files, including reading, writing, and MIME type detection.
- **JSON Utilities**: Convert JSON to query strings and vice versa, along with other JSON related utilities.
- **Date Utilities**: Functions to validate, convert, and manipulate dates.
- **Crypto**: Utilities to generate MD5 hashes.
- **Array and Object Manipulation**: Functions to clean, merge, and manipulate arrays and objects.
- **Miscellaneous Utilities**: From generating UUIDs to handling paths, this collection encompasses a wide range of general-purpose functions.

## Installation

To install the helpers utility library directly from GitHub, use the following command:

```bash

npm install github:docluv/helpers

```

After installation, you can then require and use the utility functions in your Node.js project:

```javascript

const utils = require('helpers');


```

## Usage

Here are some sample usages of the functions:

### String Manipulation

Generate a random character:

```javascript

const { randomChar } = require('helpers');
console.log(randomChar());

```

### File Operations

Read a JSON file:

```javascript

const { readJSON } = require('helpers');
const data = readJSON('path-to-json-file');

console.log(data);

```

More examples to be added later
