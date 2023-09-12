/**
 * @description 当前问卷中QuestionRadio组件的配置，根据该配置动态生成该组件
 */
import QuestionRadio, {defaultQuestionRadioProp} from "./index";
import QuestionRadioProp from "./QuestionRadioProp";
import QuestionRadioStat from "./QuestionRadioStat";

export default {
    title: "单选框",
    type: "questionRadio", // 与后端中定义的一致
    Component: QuestionRadio, // 画布中的组件
    Prop : QuestionRadioProp, // 画布中组件对应的右侧栏中的属性组件
    defaultProps: defaultQuestionRadioProp,
    StatComponent : QuestionRadioStat,
}