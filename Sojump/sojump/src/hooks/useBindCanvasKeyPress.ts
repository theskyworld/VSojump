/**
 * @description 绑定画布中的快捷键，执行对应的操作
 * @author tsw
 */

import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import { copyComponent, pasteCopiedComponent, removeSelectedComponent, selectNextComponent, selectPrevComponent } from "../store/componentsReducer";
import { ActionCreators as UndoActionCreators } from 'redux-undo'

// 判断光标当前所处的元素是否合法，是否为所要进行删除的画布中组件元素


export default function useBindCanvasKeyPress() {

    const dispatch = useDispatch();

    // 绑定backspace和delete按键，进行删除组件操作
    useKeyPress(["backspace", "delete"], () => {
         if (!isActiveElementValid()) return;
        dispatch(removeSelectedComponent());
    })

    // 复制
    useKeyPress(["ctrl.c", "meta.c"], () => {
        if (!isActiveElementValid()) return;
        dispatch(copyComponent());
    })
    // 粘贴
    useKeyPress(["ctrl.v", "meta.v"], () => {
        if (!isActiveElementValid()) return;
        dispatch(pasteCopiedComponent());
    })

    // 选中上一个组件
    useKeyPress(["uparrow"], () => {
        if (!isActiveElementValid()) return;
        dispatch(selectPrevComponent());
    })
    // 选中下一个组件
    useKeyPress(["downarrow"], () => {
        if (!isActiveElementValid()) return;
        dispatch(selectNextComponent());
    })

    // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.undo())
    },
    {
      exactMatch: true, // 严格匹配
    }
  )

  // 重做
  useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
    if (!isActiveElementValid()) return
    dispatch(UndoActionCreators.redo())
  })
}



function isActiveElementValid() {
    const activeElem = document.activeElement;

    // if (activeElem && activeElem === document.body) {
    //     return true;
    // }

    // 增加了 dnd-kit 以后
    // 解决按下快捷键例如Backspace时无法进行例如删除组件的快捷操作问题
    if (activeElem === document.body) return true
    if (activeElem?.matches('div[role="button"]')) return true
    
    // 当光标在例如输入框上时，返回false
    return false;
}