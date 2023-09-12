/**
 * @description 当前问卷中QuestionInfo组件的配置，根据该配置动态生成该组件
 */
import QuestionInfo, {defaultQuestionInfoProps} from "./index";
import QuestionInfoProp from "./QuestionInfoProp";


export default {
    title: "问卷信息",
    type: "questionInfo", // 与后端中定义的一致
    Component: QuestionInfo, // 画布中的组件
    Prop : QuestionInfoProp, // 画布中组件对应的右侧栏中的属性组件
    defaultProps : defaultQuestionInfoProps,
}