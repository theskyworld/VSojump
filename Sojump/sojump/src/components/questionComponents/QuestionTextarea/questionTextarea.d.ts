// 定义展示在画布右侧的组件属性

export declare interface QuestionTextareaProps {
    title?: string;
    placeholder?: string;
    onChange?: (newProps: QuestionInputProps) => void; // 在上级Prop组件中监听当前组件中值的变化
    disabled?: boolean; // 是否禁用右侧的表单，例如画布中对应组件被锁定时
}

