import ButtonIcon from "./ButtonIcon.jsx";
import {HiOutlineMoon, HiOutlineSun} from "react-icons/hi";
import {useDarkMode} from "../context/DarkModeContext.jsx";


function DarkModeToggle(){

    const {isDarkMode,toggleDarkMode}=useDarkMode();


    return(
        <ButtonIcon onClick={toggleDarkMode}>
            {!isDarkMode ? <HiOutlineMoon/> : <HiOutlineSun/>}
        </ButtonIcon>
    )

}



export default DarkModeToggle;