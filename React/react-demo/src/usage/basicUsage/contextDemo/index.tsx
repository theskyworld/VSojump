import { createContext, FC, useState } from "react"
import Toolbar from "./Toolbar";

const themes = {
    // 亮色主题
    light: {
        fore: "#000",
        background: "#eee",
    },
    // 暗色主题
    dark: {
        fore: "#fff",
        background: "#222",
    }
}


// 定义context
// 默认为亮色主题
export const ThemeContext = createContext(themes.light);

const ContextDemo: FC = () => {
    const [theme, setTheme] = useState(themes.light);

    function setToDark() {
        setTheme(themes.dark);
    }

    return (
        <ThemeContext.Provider value={theme}>
            <div>
                <h3>ContextDemo</h3>
                <div>
                    <button onClick={setToDark}>dark</button>
                </div>
            </div>
            <div>
                <Toolbar></Toolbar>
            </div>
        </ThemeContext.Provider>
    )

}


export default ContextDemo;