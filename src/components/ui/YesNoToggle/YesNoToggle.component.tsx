import { Field, SegmentedControl } from '@molulabs/ds';

interface YesNoToggleProps {
    'data-testid'?: string;
    label: string;
    name: string;
    onChange: (value: boolean) => void;
    value: boolean;
}

const YES_NO_OPTIONS = [
    { label: 'Sí', value: true },
    { label: 'No', value: false }
];

// A census yes/no question: both answers stay visible, as the design system asks for saved forms
export const YesNoToggle = ({
    'data-testid': testId,
    label,
    name,
    onChange,
    value
}: YesNoToggleProps) => (
    <div data-testid={testId}>
        <Field label={label}>
            <SegmentedControl
                name={name}
                onChange={(next: boolean) => onChange(next)}
                options={YES_NO_OPTIONS}
                value={value}
            />
        </Field>
    </div>
);
