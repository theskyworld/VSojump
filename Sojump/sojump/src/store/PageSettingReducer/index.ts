import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'

export type PageSettingReducerState = {
  title: string // 问卷标题
  desc?: string // 问卷描述
  js?: string  // js代码
  css?: string  // css代码  
  isPublished?: boolean
}

const INIT_STATE: PageSettingReducerState = {
  title: '',
  desc: '',
  js: '',
  css: '',
}

const PageSettingSlice = createSlice({
  name: 'pageSetting',
  initialState: INIT_STATE,
  reducers: {
    initPageSetting: (state: PageSettingReducerState, action: PayloadAction<PageSettingReducerState>) => {
      return action.payload
    },

    // 修改标题
    changePageTitle: (state: PageSettingReducerState, action: PayloadAction<string>) => {
        return {
            ...state,
            title : action.payload,
        }
    }
  },
})

export const { initPageSetting, changePageTitle } = PageSettingSlice.actions

export default PageSettingSlice.reducer
