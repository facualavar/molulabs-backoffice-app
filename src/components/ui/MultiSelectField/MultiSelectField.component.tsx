import { Box } from 'styled-system/jsx';

import { Text } from '../Text/Text.component';
import { toggleInList } from './multiSelect.helper';

export interface MultiSelectOption {
    label: string;
    value: string;
}

export const MultiSelectField = ({
    label,
    onChange,
    options,
    value
}: {
    label: string;
    onChange: (value: string[]) => void;
    options: MultiSelectOption[];
    value: string[];
}) => (
    <Box>
        <Text color="text.label" style={{ marginBottom: '6px' }} variant="label">
            {label}
        </Text>
        <Box display="flex" flexWrap="wrap" gap="2">
            {options.map((option) => {
                const isSelected = value.includes(option.value);

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
                        onClick={() => onChange(toggleInList(value, option.value))}
                        padding="2"
                    >
                        {option.label}
                    </Box>
                );
            })}
        </Box>
    </Box>
);
