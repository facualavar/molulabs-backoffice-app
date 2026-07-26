const VALID_TYPES = [
    'task',
    'upgrade',
    'fix',
    'refactor',
    'merge',
    'wip',
    'build',
    'docs',
    'perf',
    'test'
];
const TYPES_REQUIRING_SCOPE = ['task', 'upgrade'];

// Formato: `type: TICKET-123 | Subject` (task/upgrade requieren ticket; el resto no)
module.exports = {
    parserPreset: {
        parserOpts: {
            headerPattern: /^(\w+):\s*((?:[A-Za-z0-9]{2,12}-\d+)?\s*)(.*)$/,
            headerCorrespondence: ['type', 'scope', 'subject']
        }
    },
    plugins: [
        {
            rules: {
                'scope-required-for-type': (parsed) => {
                    const { scope, type } = parsed;
                    const requiresScope = TYPES_REQUIRING_SCOPE.includes(type);
                    const hasScope = Boolean(scope && scope.trim().length > 0);

                    if (requiresScope && !hasScope) {
                        return [
                            false,
                            `el tipo "${type}" requiere un ticket como scope (ej: BACKOFFICE-123)`
                        ];
                    }

                    return [true];
                }
            }
        }
    ],
    rules: {
        'type-enum': [2, 'always', VALID_TYPES],
        'type-case': [2, 'always', 'lower-case'],
        'subject-empty': [2, 'never'],
        'scope-required-for-type': [2, 'always']
    }
};
