import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';

export const Home = () => {
    const [data, setData] = useState();
    const [currentItem, setCurrentItem] = useState();
    const [pageCount, setPageCount] = useState(0);
    const [item, setItem] = useState(0);
    const itemsPerPage = 6
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((res) => {
                setData(res.data);
            })
    }, [])
    useEffect(() => {
        const end = item + itemsPerPage
        setCurrentItem(data?.slice(item, end))
        setPageCount(Math.ceil(data?.length / itemsPerPage))
    }, [item, itemsPerPage, data])

    const handlePageClick = (e) => {
        const newItem = (e.selected * itemsPerPage) % data.length
        setItem(newItem);
    };

    //console.log('splicedData', splicedData)
    return (
        <>
            <h4>Pagination</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">UserId</th>
                        <th scope="col">Title</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItem?.map((e, index) => {
                        return <div key={index}>
                            <tr>
                                <td>{e.id}</td>
                                <td>{e.body}</td>
                            </tr>
                        </div>

                    })}
                </tbody>
            </table>
            <div className='pagination'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    pageClassName="page-item"
                    pageLinkClassName='page-link'
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    nextClassName="page-item"
                    nextLinkClassName='page-link'
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                    containerClassName='pagination'
                    activeClassName='acitve'
                />
            </div>


        </>
    )
}
