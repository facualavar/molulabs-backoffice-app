import { Outlet } from 'react-router';
import { css } from 'styled-system/css';

import bgImage from '@/assets/bg-01.jpg';
import logo from '@/assets/react.svg';

const currentYear = new Date().getFullYear();

export const PublicLayout = () => (
    <div
        className={css({
            display: 'flex',
            flexDirection: { base: 'column', md: 'row' },
            height: '100vh'
        })}
    >
        <div
            className={css({
                alignItems: 'center',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                display: { base: 'none', md: 'flex' },
                height: '100vh',
                justifyContent: 'center',
                position: 'relative',
                width: { lg: '50%', md: '40%' }
            })}
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div
                className={css({
                    alignItems: 'center',
                    aspectRatio: '3 / 5',
                    border: '14px solid #15bdf5',
                    borderRadius: '80px',
                    boxShadow: 'lg',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4',
                    justifyContent: 'center',
                    maxWidth: '460px',
                    padding: '5vh',
                    width: '80%'
                })}
            >
                <img alt="Backoffice" className={css({ width: '160px' })} src={logo} />
                <p className={css({ color: 'white', fontSize: 'sm', fontWeight: 'medium' })}>
                    Backoffice
                </p>
            </div>
        </div>

        <div
            className={css({
                alignItems: 'center',
                display: 'flex',
                flex: '1',
                height: '100vh',
                justifyContent: 'center',
                padding: { base: '10', md: '0' },
                position: 'relative',
                width: { base: '100%', lg: '50%', md: '60%' }
            })}
        >
            <Outlet />
            <p
                className={css({
                    bottom: '6',
                    color: 'gray.500',
                    fontSize: 'xs',
                    position: 'absolute',
                    right: '6'
                })}
            >
                © {currentYear}
            </p>
        </div>
    </div>
);
