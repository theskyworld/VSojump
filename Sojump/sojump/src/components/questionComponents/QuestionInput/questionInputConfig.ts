/**
 * @description 当前问卷中QuestionInput组件的配置，根据该配置动态生成该组件
 */
import QuestionInput, {defaultQuestionInputProps} from "./index";
import QuestionInputProp from "./QuestionInputProp";


export default {
    title: "输入框",
    type: "questionInput", // 与后端中定义的一致
    Component: QuestionInput, // 画布中的组件
    Prop : QuestionInputProp, // 画布中组件对应的右侧栏中的属性组件
    defaultProps : defaultQuestionInputProps,
}