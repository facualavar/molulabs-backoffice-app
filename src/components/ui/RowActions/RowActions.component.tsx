import type { RowAction as DsRowAction } from '@molulabs/ds';
import { RowActions as DsRowActions } from '@molulabs/ds';
import { useNavigate } from 'react-router';

export interface RowAction {
    /** Tabler icon class, e.g. "ti-pencil" */
    icon?: string;
    isDanger?: boolean;
    label: string;
    onClick?: () => void;
    to?: string;
}

interface RowActionsProps {
    actions: RowAction[];
    label: string;
}

// ⋮ menu of a table row. Destructive actions go last, after a divider.
export const RowActions = ({ actions, label }: RowActionsProps) => {
    const navigate = useNavigate();

    const dsActions = actions.flatMap((action, index): DsRowAction[] => {
        const item: DsRowAction = {
            icon: action.icon,
            label: action.label,
            onClick: action.to ? () => navigate(action.to as string) : action.onClick,
            tone: action.isDanger ? 'danger' : undefined
        };
        const isFirstDanger = action.isDanger && index > 0 && !actions[index - 1].isDanger;

        return isFirstDanger ? [{ divider: true }, item] : [item];
    });

    return <DsRowActions actions={dsActions} label={label} />;
};
