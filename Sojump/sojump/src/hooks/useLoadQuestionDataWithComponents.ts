import { useDispatch } from 'react-redux';
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../service/question";
import { useEffect } from 'react';
import { initComponents } from '../store/componentsReducer';
import { initPageSetting } from '../store/PageSettingReducer';

function useLoadQuestionDataWithComponents() {
    const { id = '' } = useParams();
    const dispatch = useDispatch();

    // 获取问卷信息，包含当前问卷中所包含的组件属性
    const { data, loading, error, run } = useRequest(
        async (id: string) => {
            if (!id) throw new Error("没有问卷id");
            const data = await getQuestionService(id);
            return data;
        }, {
            manual: true,
        }
    );

    useEffect(() => {
        if (!data) return;
        const { title = "",desc = "", js = "", css = "", isPublished = false, components = [] } = data;

        // 默认选中第一个组件
        let selectedId = "";
        if (components && components.length > 0) {
            selectedId = components[0].fe_id;
        }
        // 将获取到的components存储到redux中，初始化画布中的components
        dispatch(initComponents({ components, selectedId, copiedComponent: null }));
        
        // 将获取到的pageSetting存储到redux中，初始化右侧栏中的页面设置
        dispatch(initPageSetting({title, js, css, isPublished}))
    }, [data]);

    useEffect(() => {
        run(id);
    }, [id]);

    return { loading, error };
    
}
export default useLoadQuestionDataWithComponents