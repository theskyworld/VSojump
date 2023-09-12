import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Input } from "antd";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SEARCH_PARAM_KEY } from "../assets/ts/constants";



const Search: FC = () => {
    const [keyWord, setKeyWord] = useState('');
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const { Search: AntdSeach } = Input;
    const nav = useNavigate();
    const { pathname } = useLocation();
    

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setKeyWord(event.target.value.trim());
        handleSearch(event.target.value);
    }



    function handleSearch(value: string) {
        // 先根据搜索关键字修改url，再根据url中的参数和分页信息分别对展示列表和分页组件进行处理
        // console.log("搜索中...");
        // console.log(value);
        // 点击搜索按钮，进行搜索之后，需要在对应的路由中添加搜索参数和分页信息的值(例如/list?keyword=123&page=1)，避免重新刷新页面时丢失搜索结果和当前页的信息
        // 先对url进行修改，在url中添加参数信息
        nav({
            pathname,
            search: `?${SEARCH_PARAM_KEY}=${value.trim()}`
        })

        // 然后获取并根据url中的参数信息来对展示的列表进行过滤，最后呈现搜索结果
        // 如果存在分页内容的话，根据url中的分页参数来对分页组件进行设置
        // 而不是展示列表中依据搜索组件中的关键字来重新更新展示列表，然后分页组件根据展示列表组件中展示的信息来进行分页的更新
        // 实现组件之间的解耦
    }

    return (

        <AntdSeach loading={isSearchLoading} size="large" placeholder="请输入关键字..." allowClear value={keyWord} onChange={handleChange} onSearch={(value) => handleSearch(value)} style={{ width: "200px" }}>
        </AntdSeach>
    )
}


export default Search;