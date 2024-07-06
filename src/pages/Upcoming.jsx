import React, { useState, useEffect } from "react";
import Movie from "../components/Movie";
import getAPI from "../Api"
import Paging from './Paging'; 

export default function Upcoming (){
  const [items, setItems] = useState({});
  const [pages, setPages] = useState("1");

  useEffect(()=>{
      getAPI("upcoming", "ko-KR", pages, "movie", "")
          .then(n => {
          setItems(n);
          })
          .catch(error => {
              console.error(error);
          });
  }, [pages])
  const handlePageChange = (pageNumber) => {
    setPages(pageNumber);
  };
  

    return (
        <div >
        <div className="app-container">
        {
            items.length > 0 ? items.map((item) => {
              return(
                <Movie
                 title={item.title}
                 poster_path = {item.poster_path}
                 vote_average = {item.vote_average}
                 overview = {item.overview}
                 release_date = {item.release_date}
                />
              );
            }) : "로딩중입니다."
          }
        </div>
        <div style={{ display: 'flex',justifyContent: 'center',  alignItems: 'center'}}>
          <Paging  onPageChange={handlePageChange} />
          </div>
      </div>
    )
}