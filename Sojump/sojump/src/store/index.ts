import { configureStore } from "@reduxjs/toolkit";
import componentsReducer, { ComponentsReducerState } from "./componentsReducer";
import PageSettingReducer, { PageSettingReducerState } from "./PageSettingReducer";
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import UserReducer, { UserReducerState } from "./UserReducer";


export interface State {
    // components: ComponentsReducerState,
    components: StateWithHistory<ComponentsReducerState>
    pageSetting: PageSettingReducerState,
    user : UserReducerState,
}

export default configureStore({
    reducer: {
        // components: componentsReducer,
        // 对componentsReducer增加撤销重做功能

        user : UserReducer,
        components: undoable(componentsReducer, {
            limit: 20, // 限制 undo 20 步
            filter: excludeAction([ // 不希望被添加到撤销重做中的内容
                'components/initComponents',
                'components/changeSelectedId',
                'components/selectPrevComponent',
                'components/selectNextComponent',
            ]),
        }),
        pageSetting: PageSettingReducer,
    }
})