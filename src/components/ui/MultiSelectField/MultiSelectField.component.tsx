import { Box } from 'styled-system/jsx';

import { Text } from '../Text/Text.component';

export interface MultiSelectOption {
    label: string;
    value: string;
}

export const MultiSelectField = ({
    label,
    onToggle,
    options,
    selected
}: {
    label: string;
    onToggle: (value: string) => void;
    options: MultiSelectOption[];
    selected: string[];
}) => (
    <Box>
        <Text color="text.label" style={{ marginBottom: '6px' }} variant="label">
            {label}
        </Text>
        <Box display="flex" flexWrap="wrap" gap="2">
            {options.map((option) => {
                const isSelected = selected.includes(option.value);

                return (
                    <Box
                        as="button"
                        backgroundColor={isSelected ? 'primary' : 'transparent'}
                        borderColor="border"
                        borderRadius="md"
                        borderStyle="solid"
                        borderWidth="1px"
                        color={isSelected ? 'onPrimary' : 'text'}
                        cursor="pointer"
                        fontSize="xs"
                        key={option.value}
                        onClick={() => onToggle(option.value)}
                        padding="2"
                    >
                        {option.label}
                    </Box>
                );
            })}
        </Box>
    </Box>
);
