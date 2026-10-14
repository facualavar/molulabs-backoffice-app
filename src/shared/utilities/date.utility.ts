// A calendar date as the api sends it, e.g. 2026-10-07: no time and no time zone
const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * dd/mm/yyyy. A calendar date (YYYY-MM-DD) is read as written: new Date() would take it as midnight
 * UTC, which in Argentina is still the day before. A timestamp is shown in the local day.
 */
export const formatDate = (isoDate: string): string => {
    const dateOnly = DATE_ONLY_PATTERN.exec(isoDate);

    if (dateOnly) {
        const [, year, month, day] = dateOnly;

        return `${day}/${month}/${year}`;
    }

    return new Date(isoDate).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
