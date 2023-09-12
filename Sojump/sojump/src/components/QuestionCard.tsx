import React, { FC, useEffect, useState } from "react";
// import "../assets/css/App.css"
import styles from "./QuestionCard.module.scss";
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from "antd";
import { EditOutlined, LineChartOutlined, StarOutlined, CopyOutlined, DeleteOutlined, ExclamationCircleOutlined, StarFilled } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { MANAGE_STAR_URL, QUESTION_EDIT_URL, QUESTION_STAT_URL, } from "../assets/ts/constants";
import { useRequest } from "ahooks";
import { copyQuestionService, updateQuestionService } from "../service/question";
interface QuestionCardProps {
    id: string;
    title: string;
    isPublished: boolean;
    isStar: boolean;
    answerCount: number;
    createTime: string;
    deleteQuestion?: (id: string) => void;
    publishQuestion?: (id: string) => void;
    editQuestion?: (id: string) => void;
}

const QuestionCard: FC<QuestionCardProps> = (props: QuestionCardProps) => {
    const { id, title, isPublished, createTime, answerCount, isStar } = props;
    const [isStarState, setIsStarState] = useState(isStar);
    const nav = useNavigate();
    const { confirm } = Modal;

    // 标星问卷
    const { run: toggleIsStarState, loading: isStarLoading, error } = useRequest(async () => {
        await updateQuestionService(id, {
            isStar: !isStarState,
        })
    }, {
        manual: true,
        onSuccess() {
            setIsStarState(!isStarState);
            if (!isStarState) {
                message.success("已标星")
            } else {
                message.success("已取消标星")
            }
        }
    })

    // 复制问卷
    const { loading: copyLoading, run: copyQuestion } = useRequest(
        async () => await copyQuestionService(id),
        {
            manual: true,
            onSuccess(result) {
                message.success("复制成功");
                nav(`${QUESTION_EDIT_URL}/${result.id}`);
            }
        }
    )


    // 删除问卷
    const { loading: deleteLoading, run: deleteQuestion } = useRequest(
        async () => updateQuestionService(id, {
            isDeleted: true,
        }), {
        manual: true,
        onSuccess() {
            message.success("删除成功");
            setIsDeletedState(true);
        }
    }
    )


    function deleteSojumpModal() {
        confirm({
            title: "确定删除该问卷?",
            icon: <ExclamationCircleOutlined />,
            okText: "确定",
            cancelText: "取消",
            onOk: deleteQuestion
        })
    }

    const [isDeletedState, setIsDeletedState] = useState(false);
    // 对于已经删除的问卷，前端渲染时直接返回null，不渲染该问卷对应的卡片信息
    if (isDeletedState) return null;
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.left}>
                    <Space>
                        {isStarState && <StarOutlined style={{ color: "red" }}></StarOutlined>}
                        <Link to={isPublished ? `${QUESTION_STAT_URL}/${id}` : `${QUESTION_EDIT_URL}/${id}`}>{title}</Link>
                    </Space>
                </div>
                <div className={styles.right}>
                    <Space>
                        {isPublished ? <Tag color='processing'>已发布</Tag> : <Tag>未发布</Tag>}
                        &nbsp;
                        <span>答卷 : {answerCount}</span>
                        &nbsp;
                        <span>{createTime}</span>
                    </Space>
                </div>
            </div>
            <Divider style={{ margin: "12px 0" }} />
            <div className={styles["button-container"]}>
                <div className={styles["left"]}>
                    {/* <button>编辑问卷</button>
                    <button>数据统计</button> */}
                    <Space>
                        <Button size="small" icon={<EditOutlined />} onClick={() => { nav(`${QUESTION_EDIT_URL}/${id}`) }}>编辑问卷</Button>
                        <Button size="small" icon={<LineChartOutlined />} onClick={() => { nav(`${QUESTION_STAT_URL}/${id}`) }} disabled={!isPublished}>数据统计</Button>
                    </Space>
                </div>
                <div className={styles["right"]}>
                    <Space>
                        <Button style={{ color: isStarState ? "red" : "" }} onClick={toggleIsStarState} disabled={isStarLoading} type="text" size="small" icon={isStarState ? <StarFilled style={{ color: "red" }} /> : <StarOutlined />}>{isStarState ? "取消标星" : "标星"}</Button>
                        <Popconfirm title="是否确定复制该问卷?" okText="确定" cancelText="取消" onConfirm={copyQuestion}>
                            <Button type="text" size="small" icon={<CopyOutlined />} disabled={copyLoading}>复制</Button>
                        </Popconfirm>
                        <Button type="text" size="small" icon={<DeleteOutlined />} onClick={deleteSojumpModal} disabled={deleteLoading}>删除</Button>
                    </Space>

                </div>
            </div>
        </div>
    )
}


export default QuestionCard;