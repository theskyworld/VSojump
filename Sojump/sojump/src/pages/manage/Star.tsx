import { Empty, Spin, Typography } from "antd";
import React, { FC, useEffect, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import styles from "./List.module.scss";
import { useTitle } from "ahooks";
import { Question } from "./List";
import useSearchQuestionList from "../../hooks/useSearchQuestionList";
import CommonPagination from "../../components/CommonPagination";


const Star: FC = () => {
    const [questionList, setQuestionList] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { Title } = Typography;
    useTitle("V问卷-星标问卷");

    const { data, loading, error } = useSearchQuestionList({ isStar: true });
    const { list, total } = data || {};
    useEffect(() => {
        if (list) {
            setIsLoading(loading);
            setQuestionList(list);
        }
    }, [list])

    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>星标问卷</Title>
                </div>
                <div className={styles.rightr}>搜索</div>
            </div>
            <div className={styles.content}>
                {
                    isLoading && (
                        <div style={{ textAlign: "center" }}>
                            <Spin tip="加载中..." size="large">
                                <div className="content" />
                            </Spin>
                        </div>
                    )
                }
                {!isLoading && questionList.length === 0 && <Empty description="暂无数据"></Empty>}
                {!isLoading && questionList.length > 0 && questionList.map(question => {
                    const { id } = question;
                    return <QuestionCard key={id} {...question}></QuestionCard>
                })}
            </div>
            <div className={styles.footer}>
                {!isLoading && <CommonPagination total={total}></CommonPagination>}
            </div>
        </>
    )
}

export default Star;