import { createContext, useContext, useState } from 'react';
import { cn } from '../core/utils';
import { NavLink } from 'react-router-dom';

const Context = createContext({});

export const Tab = ({ children, defaultValue = 0, name = 'tab' }) => {
    const [indexActive, setIndexActive] = useState(defaultValue);

    return <Context.Provider value={{ indexActive, setIndexActive }}>{children}</Context.Provider>;
};

const useTab = () => useContext(Context);

Tab.Title = ({ children, index, href }) => {
    const { indexActive, setIndexActive } = useTab();

    const onClick = (e) => {
        // e.preventDefault();
        setIndexActive(index);
    };
    return (
        <NavLink
            onClick={onClick}
            className={cn('nav-link', { active: indexActive === index })}
            style={{ cursor: 'pointer' }}
            to={href}
        >
            {children}
        </NavLink>
    );
};
Tab.Content = ({ children, index }) => {
    const { indexActive } = useTab();
    return (
        <div
            className={cn('tab-pane', {
                'fade show active': index === indexActive,
            })}
        >
            {children}
        </div>
    );
};
