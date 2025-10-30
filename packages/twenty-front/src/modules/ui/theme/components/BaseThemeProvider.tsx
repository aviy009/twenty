import { ThemeProvider } from '@emotion/react';
import { createContext, useEffect } from 'react';
import { useLingui } from '@lingui/react/macro';

import { persistedColorSchemeState } from '@/ui/theme/states/persistedColorSchemeState';
import { useRecoilState } from 'recoil';
import { type ColorScheme } from 'twenty-ui/input';
import { THEME_DARK, THEME_LIGHT, ThemeContextProvider } from 'twenty-ui/theme';

type BaseThemeProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const ThemeSchemeContext = createContext<(theme: ColorScheme) => void>(
  () => {},
);

export const BaseThemeProvider = ({ children }: BaseThemeProviderProps) => {
  const [persistedColorScheme, setPersistedColorScheme] = useRecoilState(
    persistedColorSchemeState,
  );
  const { i18n } = useLingui();

  useEffect(() => {
    const locale = i18n.locale || 'en';
    const direction = locale.startsWith('he') ? 'rtl' : 'ltr';

    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', locale);
  }, [i18n.locale]);
  document.documentElement.className =
    persistedColorScheme === 'Dark' ? 'dark' : 'light';

  const theme = persistedColorScheme === 'Dark' ? THEME_DARK : THEME_LIGHT;

  return (
    <ThemeSchemeContext.Provider value={setPersistedColorScheme}>
      <ThemeProvider theme={theme}>
        <ThemeContextProvider theme={theme}>{children}</ThemeContextProvider>
      </ThemeProvider>
    </ThemeSchemeContext.Provider>
  );
};
