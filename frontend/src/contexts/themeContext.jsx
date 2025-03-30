import { createContext, useEffect, useState } from "react"

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const initialTheme = localStorage.getItem('theme') || 'light'
    const [theme, setTheme] = useState(initialTheme)

    const rawSetTheme = (newTheme) => {
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    useEffect(() => {
        rawSetTheme(theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}