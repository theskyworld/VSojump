/**
 * @description 当前问卷中QuestionParagraph组件的配置，根据该配置动态生成该组件
 */
import QuestionParagraph, {defaultQuestionParagraphProps} from "./index";
import QuestionParagraphProp from "./QuestionParagraphProp";


export default {
    title: "输入框",
    type: "questionParagraph", // 与后端中定义的一致
    Component: QuestionParagraph, // 画布中的组件
    Prop : QuestionParagraphProp, // 画布中组件对应的右侧栏中的属性组件
    defaultProps : defaultQuestionParagraphProps,
}