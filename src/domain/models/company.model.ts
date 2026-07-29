export const DOCUMENT_TYPE = {
    CUIL: 'CUIL',
    CUIT: 'CUIT',
    DNI: 'DNI',
    PASSPORT: 'PASAPORTE'
} as const;

export type DocumentType = (typeof DOCUMENT_TYPE)[keyof typeof DOCUMENT_TYPE];

export const DOCUMENT_TYPE_LABEL: Record<string, string> = {
    CUIL: 'CUIL',
    CUIT: 'CUIT',
    DNI: 'DNI',
    PASAPORTE: 'Pasaporte'
};

export interface Company {
    createdAt: string;
    documentNumber: string;
    documentType: string;
    email: string;
    id: number;
    name: string;
    phone: string;
}
