import { FC } from "react";
import ThemeButton from "./ThemeButton";


const Toolbar: FC = () => {
    return (
        <>
            <p>Toolbar</p>
            <div>
                <ThemeButton></ThemeButton>
            </div>
        </>
    )
}
export default Toolbar;