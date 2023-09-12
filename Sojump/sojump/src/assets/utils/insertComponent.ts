import { PayloadAction } from "@reduxjs/toolkit";
import { ComponentInfo, ComponentsReducerState } from "../../store/componentsReducer";

export default function insertComponent(state: ComponentsReducerState, component : ComponentInfo) {
    const { selectedId, components } = state;
    // 找到当前选中的组件的id
    const index = components.findIndex(component => component.fe_id === selectedId);
    // 如果当前未选中任何组件，直接将新的组件添加到最后
    if (index === -1) {
        return {
            ...state,
            // 添加之后，将当前新添加的组件设置为选中的组件
            selectedId: component.fe_id,
            components: [...state.components, component],
        }
    } else {
        // 否则添加到选中的组件的后面
        return {
            ...state,
            selectedId: component.fe_id,
            components: [
                ...state.components.slice(0, index + 1),
                component,
                ...state.components.slice(index + 1, state.components.length),
            ],
        }
    }
}