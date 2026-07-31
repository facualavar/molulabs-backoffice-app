import { useEffect, useRef, useState } from 'react';

import type { LucideIcon } from 'lucide-react';
import { MoreVertical } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router';
import { css, cx } from 'styled-system/css';

export interface RowAction {
    icon: LucideIcon;
    isDanger?: boolean;
    label: string;
    onClick?: () => void;
    to?: string;
}

interface PanelPosition {
    left: number;
    top: number;
}

interface RowActionsProps {
    actions: RowAction[];
    label: string;
}

const triggerClass = css({
    alignItems: 'center',
    background: 'none',
    border: 'none',
    borderRadius: 'md',
    color: 'text.muted',
    cursor: 'pointer',
    display: 'flex',
    padding: '1'
});
const panelClass = css({
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: 'border',
    borderRadius: 'md',
    boxShadow: 'lg',
    minWidth: '160px',
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    zIndex: 10
});
const itemClass = css({
    _hover: { backgroundColor: 'surface' },
    alignItems: 'center',
    color: 'text',
    cursor: 'pointer',
    display: 'flex',
    fontSize: 'sm',
    gap: '2',
    padding: '2',
    textDecoration: 'none',
    width: '100%'
});
const itemDangerClass = css({ color: 'danger' });

export const RowActions = ({ actions, label }: RowActionsProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<null | PanelPosition>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const close = () => setIsOpen(false);

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (!triggerRef.current?.contains(target) && !panelRef.current?.contains(target)) {
                close();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') close();
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('scroll', close, true);
        window.addEventListener('resize', close);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('scroll', close, true);
            window.removeEventListener('resize', close);
        };
    }, [isOpen]);

    const handleToggle = () => {
        if (!isOpen) {
            const rect = triggerRef.current?.getBoundingClientRect();

            if (rect) {
                setPosition({ left: rect.right, top: rect.bottom + 4 });
            }
        }

        setIsOpen((open) => !open);
    };

    const handleActionClick = (action: RowAction) => {
        setIsOpen(false);
        action.onClick?.();
    };

    return (
        <>
            <button
                aria-label={label}
                className={triggerClass}
                onClick={handleToggle}
                ref={triggerRef}
                type="button"
            >
                <MoreVertical size={16} />
            </button>
            {isOpen && position
                ? createPortal(
                      <div
                          ref={panelRef}
                          style={{ left: position.left, position: 'fixed', top: position.top }}
                      >
                          <div className={panelClass} role="menu">
                              {actions.map((action) => {
                                  const Icon = action.icon;
                                  const className = cx(
                                      itemClass,
                                      action.isDanger && itemDangerClass
                                  );

                                  return action.to ? (
                                      <Link
                                          className={className}
                                          key={action.label}
                                          onClick={() => setIsOpen(false)}
                                          role="menuitem"
                                          to={action.to}
                                      >
                                          <Icon size={16} />
                                          {action.label}
                                      </Link>
                                  ) : (
                                      <button
                                          className={className}
                                          key={action.label}
                                          onClick={() => handleActionClick(action)}
                                          role="menuitem"
                                          type="button"
                                      >
                                          <Icon size={16} />
                                          {action.label}
                                      </button>
                                  );
                              })}
                          </div>
                      </div>,
                      document.body
                  )
                : null}
        </>
    );
};
