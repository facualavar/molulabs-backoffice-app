export interface SerializableError {
    fields?: Record<string, string>;
    message: string;
    status?: number;
}

export class ErrorResponse extends Error {
    fields?: Record<string, string>;
    status?: number;

    constructor(message: string, status?: number, fields?: Record<string, string>) {
        super(message);
        this.name = 'ErrorResponse';
        this.status = status;
        this.fields = fields;
    }
}

export const toSerializableError = (error: unknown): SerializableError => {
    if (error instanceof ErrorResponse) {
        return { fields: error.fields, message: error.message, status: error.status };
    }

    return { message: error instanceof Error ? error.message : 'Ocurrió un error inesperado' };
};
