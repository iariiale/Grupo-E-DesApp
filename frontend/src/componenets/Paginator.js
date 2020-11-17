import React, {useState} from 'react';
import '../styles/Paginator.css';
import axios from 'axios';

export default function Paginator(props) {
    const [lastPage, setLastPage] = useState(0)

    function changePage(pageNumber) {
        if(pageNumber >= 0) {
            axios.get('http://localhost:8080/project/get/' + pageNumber)
                .then(res => props.onChangePage(res.data))
                .catch(() => [])
                setLastPage(pageNumber)
        }
    }


    return(
        <div className={"paginator-container"}>
            <div className={"paginator-item"} onClick={() => changePage(lastPage - 1)}>{"<"}</div>
            <div className={"paginator-item"} onClick={() => changePage(1)}>{"1"}</div>
            <div className={"paginator-item"} onClick={() => changePage(2)}>{"2"}</div>
            <div className={"paginator-item"} onClick={() => changePage(3)}>{"3"}</div>
            <div className={"paginator-item"} onClick={() => changePage(lastPage + 1)}> {">"}</div>
        </div>
    )
}