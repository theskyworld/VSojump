import React, { useEffect, useState } from "react";

const useMousePosition = () => {
    // 等价于在目标组件中创建了以下代码
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const mouseMoveHandler = (event: MouseEvent) => {
        setX(event.clientX);
        setY(event.clientY);
    }

    useEffect(() => {
        // 组件初次渲染是监听mousemove事件
        window.addEventListener("mousemove", mouseMoveHandler);

        return () => {
            // 解除监听
            window.removeEventListener("mousemove", mouseMoveHandler);
        }
    }, []);

    // 返回的x,y在目标组件中具备响应式
    return {x, y}
}

export default useMousePosition;