"use client"

import React, { useEffect, useState } from 'react'


function ThemeChanger() {

    const [theme, setTheme] = useState("")

    useEffect(() => {
        const statusTheme = localStorage.getItem("theme")
        if (statusTheme) {
            setTheme(statusTheme)
        } else {
            setTheme("light")
            localStorage.setItem("theme", "light")
        }
    }, [])

    useEffect(() => {
        if (theme === "light") {
            document.documentElement.style.setProperty("--backgroundColorTheme_1", "white")
            document.documentElement.style.setProperty("--backgroundColorTheme_2", "#e6eeff")
            document.documentElement.style.setProperty("--textColorTheme", "#111")
            document.documentElement.style.setProperty("--textParag", " #294e7ba6")
            localStorage.setItem("theme", theme)
        } else if (theme === "dark") {
            document.documentElement.style.setProperty("--backgroundColorTheme_1", "#26253c")
            document.documentElement.style.setProperty("--backgroundColorTheme_2", "#010022")
            document.documentElement.style.setProperty("--textColorTheme", "white")
            document.documentElement.style.setProperty("--textParag", "white")
            localStorage.setItem("theme", theme)
        }
    }, [theme])
    return (<></>)
}

export default ThemeChanger