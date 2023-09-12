import { useTitle } from "ahooks";
import { Button, Result, Spin } from "antd";
import { divide } from "lodash";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetPageSetting from "../../../hooks/useGetPageSetting";
import useLoadQuestionDataWithComponents from "../../../hooks/useLoadQuestionDataWithComponents";
import AnswerDetail from "./AnswerDetail";
import ChartStat from "./ChartStat";
import QuestionDetail from "./QuestionDetail";
import StatHeader from "./StatHeader";
import styles from "./StatLayout.module.scss";


const StatIndex: FC = () => {
    // 增加loading效果
    const { loading } = useLoadQuestionDataWithComponents();
    const { title, isPublished } = useGetPageSetting();
    const nav = useNavigate();

    // 修改页面标题
    useTitle(`问卷统计-${title}`);


    // 需要在下部左中右三栏中的组件中进行复用
    // 但是的是在同级别的组件中被使用，使用状态提升即可，无需使用redux
    // 将状态由父组件（当前组件）传递给三个同级别的子组件即可
    const [selectedComponentId, setSelectedComponentId] = useState('')
    const [selectedComponentType, setSelectedComponentType] = useState('')

    // loading
    const LoadingElem = (
        <div style={{ textAlign: "center", marginTop: "60px" }}><Spin tip="加载中..."><span></span></Spin></div>
    );

    function generateContentElem() {
        // 如果该问卷尚未发布
        if (typeof isPublished === 'boolean' && !isPublished) {
            return (
                <div style={{ flex: '1' }}>
                    <Result
                        status="warning"
                        title="该问卷尚未发布"
                        extra={
                            <Button type="primary" onClick={() => nav(-1)}>
                                返回
                            </Button>
                        }
                    ></Result>
                </div>
            )
        }

        return (
            <>
                {/* 下部左侧问卷详细信息 */}
                <div className={styles.left}>
                    <QuestionDetail
                        selectedComponentId={selectedComponentId}
                        setSelectedComponentId={setSelectedComponentId}
                        setSelectedComponentType={setSelectedComponentType}
                    />
                </div>
                {/* 下部中间答卷详细信息 */}
                <div className={styles.main}>
                    <AnswerDetail selectedComponentId={selectedComponentId}
                        setSelectedComponentId={setSelectedComponentId}
                        setSelectedComponentType={setSelectedComponentType} />
                </div>
                {/* 下部右侧统计图表 */}
                <div className={styles.right}>
                    <ChartStat selectedComponentId={selectedComponentId}
                        selectedComponentType={selectedComponentType} />
                </div>
            </>
        )
    }
    return (
        <div className={styles.container}>
            <StatHeader />
            <div className={styles['content-wrapper']}>
                {loading && LoadingElem}
                {!loading && <div className={styles.content}>{generateContentElem()}</div>}
            </div>
        </div>
    )
}

export default StatIndex;