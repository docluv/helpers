
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class FileNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "FileNotFoundError";

    }
}


class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthenticationError";
    }
}

class AuthorizationError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthorizationError";
    }
}

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
    }
}

class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConflictError";
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}

class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.name = "InternalServerError";
    }
}

class ServiceUnavailableError extends Error {
    constructor(message) {
        super(message);
        this.name = "ServiceUnavailableError";
    }
}

module.exports = {
    ValidationError,
    FileNotFoundError,
    AuthenticationError,
    AuthorizationError,
    BadRequestError,
    ConflictError,
    NotFoundError,
    InternalServerError,
    ServiceUnavailableError
};