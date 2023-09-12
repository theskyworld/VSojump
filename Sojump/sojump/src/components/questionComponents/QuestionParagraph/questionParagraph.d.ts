export declare interface QuestionParagraphProps {
    text?: string;
    isCenter?: boolean;

    // 用于对应的属性组件中的表单
    onChange?: (newProps: QuestionParagraphProps) => void;
    disabled?: boolean;
}