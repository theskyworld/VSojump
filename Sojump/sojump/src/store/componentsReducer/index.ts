import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentInfoProps } from "../../components/questionComponents/componentsConfig";
import cloneDeep from "lodash.clonedeep";
import insertComponent from '../../assets/utils/insertComponent';
import getRandomId from '../../assets/utils/getRandomId';
import { arrayMove } from '@dnd-kit/sortable';


export interface ComponentInfo {
    fe_id: string; //对应后端数据中components中的fe_id
    type: string;
    title: string;
    isHidden: boolean;
    isLocked: boolean;
    props: ComponentInfoProps;
}

export interface ComponentsReducerState {
    selectedId: string; // 在画布中选中的问卷的组件id，以便进行左中右三栏中内容的联动
    components: ComponentInfo[];
    copiedComponent: ComponentInfo | null; // 存储已被复制的组件，用于组件的复制粘贴等
}

const INIT_STATE: ComponentsReducerState = {
    selectedId: "",
    components: [],
    copiedComponent: null,
};

const componentsReducer = createSlice({
    name: "components",
    initialState: INIT_STATE,
    // 定义以下actions对画布中的组件进行操作
    reducers: {
        // 初始化/重置所有组件
        initComponents: (state: ComponentsReducerState, action: PayloadAction<ComponentsReducerState>) => {
            return action.payload;
        },
        // 根据在画布中鼠标点击的行为切换当前鼠标选中的组件的id
        changeSelectedId: (state: ComponentsReducerState, action: PayloadAction<string>) => {
            return {
                ...state,
                selectedId: action.payload,
            }
        },
        // 新增组件到画布中
        addComponent: (state: ComponentsReducerState, action: PayloadAction<ComponentInfo>) => {
            return insertComponent(state, action.payload);
        },

        // 修改组件属性
        changeComponentProps: (state: ComponentsReducerState, action: PayloadAction<{ fe_id: string, newProps: ComponentInfoProps }>) => {
            const { fe_id, newProps } = action.payload;

            // 要修改的当前组件
            const currentComponent = state.components.find(component => component.fe_id === fe_id);
            if (currentComponent) {
                currentComponent.props = {
                    ...currentComponent.props,
                    ...newProps,
                };
            }
        },

        // 删除当前选中的组件
        removeSelectedComponent(state: ComponentsReducerState) {
            const { components = [], selectedId = '' } = state;
            const index = components.findIndex(component => component.fe_id === selectedId);
            const filterComponents = components.filter(component => component.fe_id !== selectedId);
            return {
                ...state,
                // 更新selectedId
                // 如果被删除的组件为第一个组件，下次选中的组件就是剩下的组件中的第一个组件
                // 否则，下次选中的组件都为被删除组件的前一个组件
                selectedId: index === 0 ? filterComponents[0]?.fe_id || "" : filterComponents.at(-1)?.fe_id || '',
                components: filterComponents,
            }
        },

        // 隐藏/显示组件
        toggleisHidden(state: ComponentsReducerState) {
            const { components = [], selectedId = '' } = state;
            const index = components.findIndex(component => component.fe_id === selectedId);

            // 只显示不隐藏的组件
            const filterComponents = components.filter(component => {
                // 对于当前选中的组件，进行隐藏操作，返回false
                if (component.fe_id === selectedId) return false;
                return !component.isHidden
            });
            return {
                ...state,
                selectedId: index === 0 ? filterComponents[0]?.fe_id || "" : filterComponents.at(-1)?.fe_id || '',
                components: filterComponents,
            }
        },

        // 锁定/解锁组件
        toggleIsLocked(state: ComponentsReducerState) {
            const { selectedId, components } = state;
            const index = components.findIndex(component => component.fe_id === selectedId);

            return {
                ...state,
                components: [
                    ...components.slice(0, index),
                    {
                        ...components[index],
                        isLocked: !components[index].isLocked,
                    },
                    ...components.slice(index + 1, components.length),
                ]
            }
        },
        // 复制当前选中的组件
        copyComponent(state: ComponentsReducerState) {
            const { components, selectedId } = state;
            const currentComponent = state.components.find(component => component.fe_id === selectedId);
            if (!currentComponent) {
                return {
                    ...state,
                    components,
                    copiedComponent: null,

                }
            } else {
                return {
                    ...state,
                    components,
                    copiedComponent: cloneDeep(currentComponent), //对当前组件进行深拷贝
                }
            }
        },
        //粘贴已复制的组件
        pasteCopiedComponent(state: ComponentsReducerState) {
            const { copiedComponent } = state;
            if (!copiedComponent) return state;
            // 将复制的组件插入到画布中
            // 插入前修改组件的fe_id为新的fe_id
            return insertComponent(state, {
                ...copiedComponent,
                fe_id: getRandomId(5),
            });
        },
        // 选中上一个组件
        selectPrevComponent(state: ComponentsReducerState) {
            const { selectedId, components } = state;
            const index = components.findIndex(component => component.fe_id === selectedId);
            if (index <= 0) return state; // 当前未选中任何组件或者当前选中的为第一个组件
            return {
                ...state,
                selectedId: components[index - 1].fe_id,
            }
        },
        // 选中下一个组件
        selectNextComponent(state: ComponentsReducerState) {
            const { selectedId, components } = state;
            const index = components.findIndex(component => component.fe_id === selectedId);
            if (index >= components.length - 1) return state; // 当前未选中任何组件或者当前选中的为最后一个组件
            return {
                ...state,
                selectedId: components[index + 1].fe_id,
            }
        },
        // 修改组件title
        changeComponentTitle(state: ComponentsReducerState, action: PayloadAction<{ fe_id: string, title: string }>) {
            const { fe_id, title } = action.payload;
            const newComponents = state.components.map((c) => {
                if (c.fe_id === fe_id) {
                    return {
                        ...c,
                        title,
                    }
                }
                return c;
            })
            return {
                ...state,
                components: newComponents,
            };
        },

        // 移动组件
        moveComponent: (
            state: ComponentsReducerState,
            action: PayloadAction<{ oldIndex: number; newIndex: number }>
        ) => {
            const { components: curComponents } = state
            const { oldIndex, newIndex } = action.payload

            const newComponents = arrayMove(curComponents, oldIndex, newIndex)
            return {
                ...state,
                components : newComponents,
            }
        }
    }
})

export const { initComponents, changeSelectedId, addComponent, changeComponentProps, removeSelectedComponent, toggleisHidden, toggleIsLocked, copyComponent, pasteCopiedComponent, selectPrevComponent, selectNextComponent, changeComponentTitle, moveComponent } = componentsReducer.actions;

export default componentsReducer.reducer;