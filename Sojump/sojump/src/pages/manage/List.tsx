// 列表页组件
import { FC, useEffect, useRef, useMemo } from "react";
import React, { useState } from "react";
import QuestionCard from "../../components/QuestionCard"
import { produce } from "immer";
import styles from "./List.module.scss";
import { useSearchParams } from "react-router-dom";
import { useDebounceFn, useRequest, useTitle } from "ahooks";
import { Empty, Spin, Typography } from "antd";
import Search from "../../components/Search";
import { SEARCH_PARAM_KEY } from "../../assets/ts/constants";
import { getQuestionListService } from "../../service/question";
import useSearchQuestionList from "../../hooks/useSearchQuestionList";
import CommonPagination from "../../components/CommonPagination";
import { DEFAULT_PER_PAGE_SIZE } from "../../assets/ts/constants";


export interface Question {
  id: string,
  title: string,
  isPublished: boolean,
  isStar: boolean,
  answerCount: number;
  createTime: string,
  isDeleted: boolean;
}

const List: FC = () => {
  // 在不同页面中使用useTitle来修改不同页面对应的标题
  useTitle("V问卷-我的问卷")
  const { Title } = Typography;
  const [searchParams] = useSearchParams();
  const loadMoreContainerRef = useRef<HTMLDivElement>(null);
  const keyword = searchParams.get(SEARCH_PARAM_KEY) || "";

  // 当前页（每次上滑至加载更多时，更新当前页(当前页+1)）
  const [curPage, setCurPage] = useState(1);
  // 渲染在列表中已经加载的数据(累加)
  const [list, setList] = useState<Question[]>([]);
  // 后端返回的总的数据条数
  const [total, setTotal] = useState(0);
  // 继续上滑动是否能加载更多
  const isHasMore = total > list.length;
  const [isStarted, setIsStarted] = useState(false); // 是否已经开始加载更多数据
  const [isLoading, setIsLoading] = useState(true);

  // 当keyword值发生变化时，重置以下内容
  useEffect(() => {
    setIsStarted(false);
    setCurPage(1);
    setList([]);
    setTotal(0);
  }, [keyword])

  // 触发加载更多的函数,每次加载更多时，向后端加载新的数据，累加进list中
  // 判断加载更多的时机
  // 使用debounce来防止频繁触发请求
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const loadMoreContainerElem = loadMoreContainerRef.current;
      if (loadMoreContainerElem === null) return;
      const loadMoreContainerRect = loadMoreContainerElem.getBoundingClientRect();  
      if (loadMoreContainerRect === null) return;
      const { bottom } = loadMoreContainerRect;
      // 上滑至加载更多时触发加载更多的时机
      if (bottom <= window.innerHeight) {
        // 加载更多
        loadMore();
        setIsStarted(true);
      }
    },
    {
      wait: 1000,
    }
  )

  // 加载更多的触发时机为：页面初始化或者重新渲染时,页面上滑至加载更多时,url中的搜索关键字(keyword)发生变化时
  useEffect(() => {
    tryLoadMore();
  }, [searchParams])
  useEffect(() => {
    if (isHasMore) {
      window.addEventListener("scroll", tryLoadMore);
    }

    return () => {
      window.removeEventListener("scroll", tryLoadMore);
    }
  }, [searchParams, isHasMore]);


  const { run : loadMore, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page: curPage,
        perPageSize: DEFAULT_PER_PAGE_SIZE,
        keyword 
      });
      return data;
      }, {
      manual: true,
      onSuccess: (result) => {
        setList(list.concat(result.list));
        setTotal(result.total);
        setCurPage(curPage + 1);
        setIsLoading(false);
      }
  })



  // 优化DOM中加载更多中的显示内容
  const LoadMoreContentElem = useMemo(() => {
    // 是否显示加载中...
    if (isLoading) {
      return (
        <div style={{ textAlign: "center" }}>
          <Spin tip="加载中..." size="small">
            <div className="content" />
          </Spin>
        </div>
      )
    }

    // 是否显示暂无数据
    if(total === 0 || list.length === 0){
      return (<Empty description="暂无数据"></Empty>)
    }

    // 是否显示无更多数据
    if(!isHasMore){
      return (<span>无更多数据了...</span>)
    }

    // 是否显示加载下一页数据中
    return <span>加载下一页数据中...</span>
  }, [isHasMore, isStarted, loading])
 

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <Search></Search>
        </div>
      </div>
      <div className={styles.content}>
        {
          list.length > 0 && list.map(question => {
            const { id, title, isPublished, isStar, answerCount, createTime } = question;
            return <QuestionCard key={id} id={id} title={title} isPublished={isPublished} isStar={isStar} answerCount={answerCount} createTime={createTime}></QuestionCard>
          })
        }
      </div>
      <div className={styles.footer}>
        <div ref={loadMoreContainerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  );
};

export default List;
