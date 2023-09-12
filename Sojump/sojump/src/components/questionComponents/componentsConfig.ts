import { QuestionCheckboxStatProps } from './QuestionCheckbox/questionCheckbox.d';
/**
 * @description 当前问卷中不同组件的共同配置
 */

import { QuestionInputProps } from "./QuestionInput/questionInput";
import { QuestionTitleProps } from "./QuestionTitle/questionTitle";
import { FC } from "react";
import questionInputConfig from "./QuestionInput/questionInputConfig";
import questionTitleConfig from "./QuestionTitle/questionTitleConfig";
import QuestionTitle from "./QuestionTitle";
import { QuestionParagraphProps } from "./QuestionParagraph/questionParagraph";
import questionParagraphConfig from "./QuestionParagraph/questionParagraphConfig";
import { QuestionInfoProps } from "./QuestionInfo/questionInfo";
import questionInfoConfig from "./QuestionInfo/questionInfoConfig";
import { QuestionTextareaProps } from "./QuestionTextarea/questionTextarea";
import questionTextareaConfig from "./QuestionTextarea/questionTextareaConfig";
import { QuestionRadioProps, QuestionRadioStatProps } from "./QuestionRadio/questionRadio";
import questionRadioConfig from "./QuestionRadio/questionRadioConfig";
import { QuestionCheckboxProps } from "./QuestionCheckbox/questionCheckbox";
import questionCheckboxConfig from "./QuestionCheckbox/questionCheckboxConfig";


export type ComponentInfoProps = QuestionTitleProps & QuestionInputProps & QuestionParagraphProps & QuestionInfoProps & QuestionTextareaProps & QuestionRadioProps & QuestionCheckboxProps;

// 组件公共配置的类型
export interface ComponentsConfig {
    title: string;
    type: string;
    Component: FC<ComponentInfoProps>; // 对应画布中的组件
    Prop: FC<ComponentInfoProps>; // 对应右侧栏中的根画布中组件对应的属性组件
    defaultProps: ComponentInfoProps;
    StatComponent? : FC<ComponentStats>
}

type ComponentStats = QuestionRadioStatProps & QuestionCheckboxStatProps;

// 当前问卷中包含的所有组件配置的列表
const ComponentsConfigList: ComponentsConfig[] = [
    questionInputConfig,
    questionTitleConfig,
    questionParagraphConfig,
    questionInfoConfig,
    questionTextareaConfig,
    questionRadioConfig,
    questionCheckboxConfig
]


// 根据配置中的type属性获取对应的组件配置
// 获取组件配置之后，再根据组件的配置生成对应的组件，将动态生成的组件渲染到EditCanvas组件之中
export function getComponentConfigByType(type: string): ComponentsConfig {
    return ComponentsConfigList.find(config => config.type === type)!
}


// 组件库分组配置
export const componentsGroupConfig = [
    {
        groupId: 'textGroup',
        groupName: "文本显示",
        components: [questionInfoConfig, questionTitleConfig, questionParagraphConfig]
    },
    {
        groupId: 'inputGroup',
        groupName: "用户输入",
        components: [questionInputConfig, questionTextareaConfig]
    },
    {
        groupId: "chooseGroup",
        groupName: "用户选择",
        components : [questionRadioConfig, questionCheckboxConfig],
    }
]