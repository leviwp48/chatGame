import React ,{useEffect, useRef, useState} from "react";
import "./BoardList.css" 
import BoardListItem from "../boardlistitem/BoardListItem";
import axios from 'axios';
const ENDPOINT = "http://localhost:3001/";

const BoardList=({username, goToBoard, createBoard})=>{

    const[dataLoaded, setDataLoaded] = useState(false)
    const[boardInfo, setBoardInfo] = useState()
    const[numOfBoards, setNumOfBoards] = useState(0)

// ---------------- Get list of boards ----------------

    useEffect(() => {
        async function getMyBoards() {
            console.log(username)
            axios.post(`${ENDPOINT}api/board/getMyBoards`, {userId: username})
            .then(res => {
            setBoardInfo(res.data.boardData)
            setNumOfBoards(res.data.boardData.length)
            setDataLoaded(true)
            })
            .catch(err => {
                console.log(err.response)
            });
        }
        getMyBoards();
    }, []);


// ---------------- Present board list if any ----------------

    if(dataLoaded){
        return (
            <div>
                <div className="listWrapper">
                    <div className="listGrid">
                        {boardInfo.map((board, id) => 
                            <BoardListItem boardInfo={board} key={id} goToBoard={goToBoard}/>
                        )}  
                    </div>
                    
                </div>
                
                <button
                className="createBoard"
                type="button"
                onClick={() => createBoard()}
                >
                    create board
                </button>
            </div>
            
        )
    }

// ---------------- If no boards are found

    else{
        return(
            <div className="listWrapper">
            <div className="listGrid">     
                No Boards Found
            </div>
            <button
            className="createBoard"
            type="button"
            onClick={() => createBoard()}
            >
                create board
            </button>
        </div>
        )
    }
}
 
export default BoardList;

