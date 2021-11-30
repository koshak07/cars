import { Button } from '@mui/material';
import React, { useContext } from 'react';
import {userContext} from '../contexts/UserContext'

 const Pagination = () => {
    const {totalPosts, postPerPage, handlePage, currentPage} = useContext(userContext)
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
        <div className="pagination">
            <ul>
                {
                    pageNumbers.map((page)=>(
                        <li key={page}>
                            
                            <Button
                            style={{background: page === currentPage ? "#1a50e4f0" : "lightblue"}}
                            onClick={()=>handlePage(page)}
                            > {page}
                            </Button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Pagination;