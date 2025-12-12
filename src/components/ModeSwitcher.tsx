'use client';
import { useState } from "react";
import { Moon, Sun, SunMoon } from "lucide-react";

import { Mode, getLocalStorageTheme, setLocalStorageTheme } from "@/lib/localStorage";
import styles from './ModeSwitcher.module.css'

export default function ModeSwitcher() {
    const [mode, setMode] = useState<Mode>(getLocalStorageTheme());

    function switchMode() {
        let newMode: Mode;
        switch (mode) {
            case 'auto':
                newMode = 'light'
                break;
            case 'light':
                newMode = 'dark';
                break;
            case 'dark':
                newMode = 'auto';
                break;
        }

        setMode(newMode);
        setLocalStorageTheme(newMode);
    }

    return (
        <button className={`${styles.modeSwitcher} ${mode == 'light' ? 'enlighten-me' : ''} ${mode == 'dark' ? 'darken-me' : ''}`} onClick={switchMode}>
            {mode == 'auto' && <SunMoon size={'32px'}/>}
            {mode == 'light' && <Sun size={'32px'}/>}
            {mode == 'dark' && <Moon size={'32px'}/>}
        </button>
    )
}
