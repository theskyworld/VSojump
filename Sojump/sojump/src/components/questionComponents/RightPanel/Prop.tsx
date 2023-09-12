// 右侧栏中属性一栏的组件

import { FC } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { ComponentInfoProps, getComponentConfigByType } from "../componentsConfig";
import { useDispatch } from "react-redux";
import { changeComponentProps } from "../../../store/componentsReducer";

const NoProp : FC = () => {
    return <div style={{textAlign : "center"}}>未在画布中选中任何组件</div>
}

const Prop: FC = () => {
    const { selectedComponent } = useGetComponentInfo();
    const dispatch = useDispatch();
    if (!selectedComponent) return <NoProp />
    
    const { type, props, isLocked, isHidden } = selectedComponent;
    const componentConfig = getComponentConfigByType(type);
    if (!componentConfig) return <NoProp />
    
    const { Prop } = componentConfig;
    

    // 统一对其下面所有属性组件中的值得变化进行处理，将变化后的值同步到画布中对应得组件上
    function changeProps(newProps: ComponentInfoProps) {
        // 对当前正选中得组件进行修改同步
        if (!selectedComponent) return;

        const { fe_id } = selectedComponent;
        dispatch(changeComponentProps({ fe_id, newProps }));
    }   
    // disabled={isLocked} ： 根据画布中isLocked的值来决定其对应的右侧属性组件中的表单是否被禁用
    return <Prop {...props} onChange={changeProps} disabled={isLocked || isHidden}/>
}

export default Prop;