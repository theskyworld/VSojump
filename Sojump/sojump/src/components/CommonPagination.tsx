import { Pagination } from "antd";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DEFAULT_PER_PAGE_SIZE, PAGE_PARM_KEY, PER_PAGE_SIZE_PARM_KEY } from "../assets/ts/constants";


interface CommonPaginationProps {
    total: number;
}

const CommonPagination: FC<CommonPaginationProps> = (props: CommonPaginationProps) => {
    const { total } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PER_PAGE_SIZE);
    const [searchParams] = useSearchParams();
    
    // 根据url中page和perPageSize参数来设置当前页和每页条数
    useEffect(() => {
        const page = parseInt(searchParams.get(PAGE_PARM_KEY) || "") || 1;
        setCurrentPage(page);
        const perPageSize = parseInt(searchParams.get(PER_PAGE_SIZE_PARM_KEY) || "") || DEFAULT_PER_PAGE_SIZE;
        setPageSize(perPageSize);
    }, [searchParams]);


    // 当因点击页码导致页码发生变化时,重新设置当前页和每页条数
    const nav = useNavigate();
    const { pathname } = useLocation();
    function handlePageChange(page: number, pageSize: number) {
        // 当前页或者每页条数发生变化时，更新searchParams，更新url
        searchParams.set(PAGE_PARM_KEY, page.toString());
        searchParams.set(PER_PAGE_SIZE_PARM_KEY, pageSize.toString());
        // 每次searchParams发生变化时，重新向后端请求新的数据

        nav({
            pathname,
            search: searchParams.toString()
        })
    }



    return <Pagination current={currentPage} pageSize={pageSize} total={total} onChange={handlePageChange}></Pagination>
}


export default CommonPagination;