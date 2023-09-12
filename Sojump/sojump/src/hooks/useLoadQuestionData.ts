import { useRequest } from "ahooks";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../service/question";

export default function useLoadQuestionData() {
    const { id = "" } = useParams();
    async function getQuestionData() {
        const data = await getQuestionService(id);
        return data;
    }

    // 使用useRequest第三方钩子来根据传入的异步请求函数，在内部进行处理并得到最后的loading、data和error值，并返回
    // 无需手动对loading、data和error进行维护
    // 默认在页面初始化时进行执行getQuestionData函数
    const { loading, data, error } = useRequest(getQuestionData);
    
    return {
        loading,
        data,
        error,
    }
}