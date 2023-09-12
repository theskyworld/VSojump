
export declare interface Option {
    id: string;
    value: string;
    text: string;
}

export declare interface QuestionRadioProps {
    title?: string;
    isVertical?: boolean;
    options?: Option[];
    value?: string;

    onChange? : (newProps: QuestionRadioProps) => void
    disabled?: boolean;
}

// 统计组件的属性类型
export interface QuestionRadioStatProps{
  stat: Array<{ name: string; count: number }>
}
