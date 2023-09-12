
export declare interface QuestionCheckboxOption {
    id: string;
    value: string;
    text: string;
    isChecked: boolean; 
}

export declare interface QuestionCheckboxProps {
    title?: string;
    isVertical?: boolean;
    list?: QuestionCheckboxOption[];
    value?: string;

    onChange? : (newProps: QuestionCheckboxProps) => void
    disabled?: boolean;
}

// 统计组件的属性类型
export interface QuestionCheckboxStatProps{
  stat: Array<{ name: string; count: number }>
}
