import { createContext, useState } from "react";

export const ThemeContext = createContext({});

export default function ThemeContextProvider(props) {
  const [theme, setTheme] = useState("light");

  /**
   * `value` propertysini set etmek için iki yöntem vardır. Birinci yöntem aşağıdaki
   * gibi property'yi doğrudan JSON objesi olarak set etme yöntemidir. İkinci yöntem
   * ise auth-context-provider'daki gibi farklı bir değişkene alıp o değişkeni
   * buraya set etme yöntemidir.
   */
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}