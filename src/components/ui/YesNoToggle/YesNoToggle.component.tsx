import { css, cx } from 'styled-system/css';

interface YesNoToggleProps {
    'data-testid'?: string;
    label: string;
    name: string;
    onChange: (value: boolean) => void;
    value: boolean;
}

const fieldClass = css({ display: 'flex', flexDirection: 'column', gap: '1' });
const labelClass = css({ color: 'text.label', fontSize: 'xs', fontWeight: 'regular' });
const segClass = css({
    alignSelf: 'flex-start',
    borderColor: 'border',
    borderRadius: 'md',
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'inline-flex',
    overflow: 'hidden'
});
const segOptClass = css({
    alignItems: 'center',
    cursor: 'pointer',
    display: 'inline-flex',
    fontSize: 'sm',
    gap: '1',
    paddingX: '3',
    paddingY: '2'
});
const segOptDividerClass = css({
    borderLeftColor: 'border',
    borderLeftStyle: 'solid',
    borderLeftWidth: '1px'
});
const segOptSelectedClass = css({ backgroundColor: 'primary', color: 'onPrimary' });

export const YesNoToggle = ({ label, name, onChange, value, ...rest }: YesNoToggleProps) => (
    <div className={fieldClass} {...rest}>
        <span className={labelClass}>{label}</span>
        <div className={segClass}>
            <label className={cx(segOptClass, value === true && segOptSelectedClass)}>
                <input
                    checked={value === true}
                    name={name}
                    onChange={() => onChange(true)}
                    type="radio"
                />
                Sí
            </label>
            <label
                className={cx(
                    segOptClass,
                    segOptDividerClass,
                    value === false && segOptSelectedClass
                )}
            >
                <input
                    checked={value === false}
                    name={name}
                    onChange={() => onChange(false)}
                    type="radio"
                />
                No
            </label>
        </div>
    </div>
);
