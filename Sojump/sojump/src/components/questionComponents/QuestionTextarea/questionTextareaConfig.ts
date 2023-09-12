/**
 * @description 当前问卷中QuestionTextarea组件的配置，根据该配置动态生成该组件
 */
import QuestionTextarea, {defaultQuestionTextareaProps} from "./index";
import QuestionTextareaProp from "./QuestionTextareaProp";


export default {
    title: "输入框",
    type: "questionTextarea", // 与后端中定义的一致
    Component: QuestionTextarea, // 画布中的组件
    Prop : QuestionTextareaProp, // 画布中组件对应的右侧栏中的属性组件
    defaultProps : defaultQuestionTextareaProps,
}