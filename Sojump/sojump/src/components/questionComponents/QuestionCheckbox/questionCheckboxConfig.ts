/**
 * @description 当前问卷中QuestionCheckbox组件的配置，根据该配置动态生成该组件
 */
import QuestionCheckbox, {defaultQuestionCheckboxProp} from "./index";
import QuestionCheckboxProp from "./QuestionCheckboxProp";
import QuestionCheckboxStat from "./QuestionCheckboxStat";


export default {
    title: "多选框",
    type: "questionCheckbox", // 与后端中定义的一致
    Component: QuestionCheckbox, // 画布中的组件
    Prop : QuestionCheckboxProp, // 画布中组件对应的右侧栏中的属性组件
    defaultProps: defaultQuestionCheckboxProp,
    StatComponent : QuestionCheckboxStat,   
}