import { FC, useContext } from "react"
import { ThemeContext } from ".";

const ThemeButton: FC = () => {
    // 在深层级的子组件中使用context
    const theme = useContext(ThemeContext);

    // 根据theme中的值设置button的样式
    // 实现主题的全局切换
    const style = { color: theme.fore, background: theme.background };
    return (
        <>
            <button style={style}>theme button</button>
        </>
    )
}


export default ThemeButton;