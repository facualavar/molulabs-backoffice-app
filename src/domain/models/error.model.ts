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
