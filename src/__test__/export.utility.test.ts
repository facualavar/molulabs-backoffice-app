import { getExportFilename } from '@/shared/utilities/export.utility';

// Built from local time so the expected day does not depend on the time zone of the machine
const createdAt = new Date(2026, 9, 5, 10, 30).toISOString();

describe('getExportFilename', () => {
    it('nombra el archivo de usuarios con la fecha de creación', () => {
        expect(getExportFilename({ createdAt, type: 'users' })).toBe('usuarios_2026-10-05.xlsx');
    });

    it('nombra el archivo de empresas con la fecha de creación', () => {
        expect(getExportFilename({ createdAt, type: 'companies' })).toBe(
            'empresas_2026-10-05.xlsx'
        );
    });

    it('usa el tipo tal cual cuando no tiene un nombre conocido', () => {
        expect(getExportFilename({ createdAt, type: 'invoices' })).toBe('invoices_2026-10-05.xlsx');
    });
});
