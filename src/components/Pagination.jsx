import React, { useContext } from 'react';
import {userContext} from '../contexts/UserContext'

 const Pagination = () => {
    const {totalPosts, postPerPage, handlePage, currentPage} = useContext(userContext)
    const pageNumbers = []
    for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <div className="pagination">
            <ul>
                {
                    pageNumbers.map((page)=>(
                        <li key={page}>
                            <button
                            style={{background: page===currentPage ? "red" : "lightblue"}}
                            onClick={()=>handlePage(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Pagination;