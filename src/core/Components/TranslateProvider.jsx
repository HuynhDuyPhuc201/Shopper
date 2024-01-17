import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Context = createContext({});

export const TranslateProvider = ({ children, translate, locales = 'en' }) => {
    const [_translate, setStranlate] = useState(translate);
    const [lang, setLang] = useLocalStorage('lang', locales);

    const t = (name) => {
        return _translate?.[lang]?.[name] || name;
    };

    const selectLocale = (locale) => {
        setLang(locale);
    };
    return <Context.Provider value={{ t, locale: lang, selectLocale }}>{children}</Context.Provider>;
};

export const useTranslate = () => useContext(Context);
