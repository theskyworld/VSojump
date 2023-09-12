import { useSelector } from 'react-redux'
import type { State } from '../store'
import type { PageSettingReducerState } from '../store/PageSettingReducer'

function useGetPageSetting() {
  const pageSetting = useSelector<State>(state => state.pageSetting) as PageSettingReducerState
  return pageSetting
}

export default useGetPageSetting
