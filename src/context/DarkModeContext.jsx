import {createContext, useContext, useEffect} from "react";
import {useLocalStorageState} from "../hooks/useLocalStorageState.js";


const DarkModeCotext=createContext();

function DarkModeProvider({children}){
    const [isDarkMode,setIsDarkMode]=useLocalStorageState(window.matchMedia('(prefers-color-scheme: dark)').matches
        ,'isDarkMode');

    useEffect(() => {
        if (isDarkMode){
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode')
        }else {
            document.documentElement.classList.add('light-mode')
            document.documentElement.classList.remove('dark-mode')
        }


    }, [isDarkMode]);

    function toggleDarkMode(){
        setIsDarkMode(isDark=>!isDark)
    }

    return <DarkModeCotext.Provider value={{isDarkMode,toggleDarkMode}}>{children}</DarkModeCotext.Provider>
}

function useDarkMode(){

    const context = useContext(DarkModeCotext);
    if (context === undefined) throw new Error('DarkModeContext was used outside of DarkModeProvider')
    return context;
}

export {DarkModeProvider , useDarkMode}