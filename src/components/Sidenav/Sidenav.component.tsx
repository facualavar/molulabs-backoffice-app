import { useEffect, useRef, useState } from 'react';

import { IconButton } from '@molulabs/ds';
import { useDispatch } from 'react-redux';
import { Link, matchPath, useLocation } from 'react-router';
import { css, cx } from 'styled-system/css';

import type { AppDispatch } from '@/app/store';

import { logoutThunk } from '@/store/thunks/auth.thunk';

import { useCurrentUser } from '@/hooks';

import { PRIVATE_ROUTES, ROLES_ROUTES } from '@/domain/constants/routes.constant';

import type { SidenavSection } from './Sidenav.config';
import { SIDENAV_STORAGE_KEY, sidenavSections } from './Sidenav.config';

const EXPANDED_WIDTH = '230px';
const COLLAPSED_WIDTH = '64px';

const asideClass = css({
    background: 'var(--chrome)',
    color: 'var(--chrome-ink)',
    display: 'flex',
    flex: 'none',
    flexDirection: 'column',
    gap: 'var(--space-9)',
    height: '100vh',
    overflow: 'hidden',
    padding: 'var(--space-9) var(--space-6)',
    position: 'sticky',
    top: 0,
    transition: 'width 0.15s ease'
});
const brandMarkClass = css({
    alignItems: 'center',
    background: 'var(--leather)',
    borderRadius: 'var(--r-sm)',
    color: '#fff',
    display: 'flex',
    flex: 'none',
    fontSize: '12.5px',
    fontWeight: 600,
    height: '28px',
    justifyContent: 'center',
    letterSpacing: '0.02em',
    width: '28px'
});
const brandNameClass = css({
    color: '#fff',
    flex: 1,
    fontSize: 'var(--ui-text-lg)',
    fontWeight: 600,
    letterSpacing: '-0.015em',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
});
const navRowClass = css({
    _hover: { background: 'var(--chrome-2)', color: '#fff' },
    alignItems: 'center',
    borderRadius: 'var(--r)',
    color: 'var(--chrome-ink)',
    display: 'flex',
    fontSize: 'var(--ui-text)',
    gap: '10px',
    padding: 'var(--pad-nav-item)',
    position: 'relative',
    textDecoration: 'none',
    transition: 'background var(--dur-fast), color var(--dur-fast)',
    whiteSpace: 'nowrap'
});
const navRowActiveClass = css({
    _before: {
        background: 'var(--leather-2)',
        borderRadius: '2px',
        bottom: '4px',
        content: '""',
        left: 0,
        position: 'absolute',
        top: '4px',
        width: '2px'
    },
    background: 'var(--chrome-2)',
    color: '#fff',
    fontWeight: 500
});
const footerClass = css({
    borderTop: '1px solid var(--chrome-line)',
    marginTop: 'auto',
    paddingTop: 'var(--space-6)',
    position: 'relative'
});
const menuClass = css({
    background: 'var(--card)',
    border: 'var(--border-hair)',
    borderRadius: 'var(--r)',
    bottom: '100%',
    boxShadow: 'var(--shadow-menu)',
    color: 'var(--ink)',
    display: 'flex',
    flexDirection: 'column',
    left: 0,
    marginBottom: '8px',
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    zIndex: 10
});
const menuItemClass = css({
    _hover: { background: 'var(--page)' },
    background: 'none',
    border: 0,
    color: 'var(--ink)',
    cursor: 'pointer',
    display: 'block',
    fontSize: 'var(--ui-text-sm)',
    padding: 'var(--pad-button-sm)',
    textAlign: 'left',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    width: '100%'
});

const readExpanded = (): boolean => {
    try {
        return localStorage.getItem(SIDENAV_STORAGE_KEY) !== 'false';
    } catch {
        return true;
    }
};

const storeExpanded = (expanded: boolean): void => {
    try {
        localStorage.setItem(SIDENAV_STORAGE_KEY, String(expanded));
    } catch {
        // localStorage puede no estar disponible (modo privado, storage lleno, etc.)
    }
};

const isActive = (section: SidenavSection, pathname: string): boolean => {
    const isRoot = section.basePath === '/';

    return Boolean(
        matchPath(
            { end: isRoot, path: isRoot ? section.basePath : `${section.basePath}/*` },
            pathname
        )
    );
};

export const Sidenav = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { pathname } = useLocation();
    const { data: currentUser } = useCurrentUser();
    const [isPinned, setIsPinned] = useState(readExpanded);
    const [isHovering, setIsHovering] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const footerRef = useRef<HTMLDivElement>(null);

    const isExpanded = isPinned || isHovering;

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (!footerRef.current?.contains(event.target as Node)) setIsMenuOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    const togglePinned = () => {
        setIsPinned((current) => {
            storeExpanded(!current);

            return !current;
        });
        setIsHovering(false);
    };

    const visibleSections = sidenavSections.filter((section) => {
        const roles = ROLES_ROUTES[section.basePath];

        return !roles || Boolean(currentUser && roles.includes(currentUser.role));
    });

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <aside
            className={asideClass}
            onMouseEnter={() => !isPinned && setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false);
                closeMenu();
            }}
            style={{ width: isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH }}
        >
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    gap: 'var(--space-4)',
                    minHeight: '32px'
                }}
            >
                <div className={brandMarkClass}>MP</div>
                {isExpanded ? (
                    <>
                        <div className={brandNameClass}>Ministerio de Producción</div>
                        <IconButton
                            icon={isPinned ? 'ti-arrow-left' : 'ti-layout-sidebar'}
                            label="Fijar/colapsar menú"
                            on="chrome"
                            onClick={togglePinned}
                            size={28}
                            style={{ color: 'var(--chrome-mut)' }}
                        />
                    </>
                ) : null}
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {visibleSections.map((section) => (
                    <Link
                        className={cx(
                            navRowClass,
                            isActive(section, pathname) && navRowActiveClass
                        )}
                        key={section.id}
                        title={section.title}
                        to={section.basePath}
                    >
                        {isExpanded ? (
                            section.title
                        ) : (
                            <i
                                className={`ti ${section.icon}`}
                                style={{ flex: 'none', fontSize: '20px' }}
                            />
                        )}
                    </Link>
                ))}
            </nav>

            <div className={footerClass} ref={footerRef}>
                <div style={{ alignItems: 'center', display: 'flex', gap: 'var(--space-2)' }}>
                    {isExpanded && currentUser ? (
                        <span
                            style={{
                                flex: 1,
                                fontSize: 'var(--ui-text)',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {currentUser.firstname} {currentUser.lastname}
                        </span>
                    ) : null}
                    <IconButton
                        icon="ti-dots"
                        label="Más opciones"
                        on="chrome"
                        onClick={() => setIsMenuOpen((open) => !open)}
                        size={28}
                        style={{ color: 'var(--chrome-mut)' }}
                    />
                </div>
                {isMenuOpen ? (
                    <div className={menuClass} role="menu">
                        <button
                            className={menuItemClass}
                            onClick={() => {
                                closeMenu();
                                dispatch(logoutThunk());
                            }}
                            role="menuitem"
                            style={{ color: 'var(--alert)' }}
                            type="button"
                        >
                            Cerrar sesión
                        </button>
                        <Link
                            className={menuItemClass}
                            onClick={closeMenu}
                            role="menuitem"
                            to={PRIVATE_ROUTES.PROFILE}
                        >
                            Configurar mi usuario
                        </Link>
                        <Link
                            className={menuItemClass}
                            onClick={closeMenu}
                            role="menuitem"
                            to={PRIVATE_ROUTES.PROFILE_PASSWORD}
                        >
                            Cambiar mi contraseña
                        </Link>
                    </div>
                ) : null}
            </div>
        </aside>
    );
};
