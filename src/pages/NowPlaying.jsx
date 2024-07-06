import React, { useState, useEffect, useCallback } from "react";
import Movie from "../components/Movie";
import getAPI from "../Api";
import InfiniteScroll from "react-infinite-scroll-component";

export default function NowPlaying() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(() => {
    getAPI("now_playing", "ko-KR", page, "movie", "12")
      .then(newItems => {
        if (newItems.length === 0) {
          setHasMore(false); // 더 이상 불러올 데이터가 없는 경우
        } else {
          setItems(prevItems => [...prevItems, ...newItems]);
          setPage(prevPage => prevPage + 1);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length} // This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>더 이상 없슈</b>
          </p>
        }
      >
        <div className="app-container">
          {items.length > 0
            ? items.map((item) => (
                <Movie
                  key={item.id}
                  id={item.id}  // id prop을 전달합니다
                  title={item.title}
                  poster_path={item.poster_path}
                  vote_average={item.vote_average}
                  overview={item.overview}
                  release_date={item.release_date}
                />
              ))
            : "로딩중입니다."}
        </div>
      </InfiniteScroll>
    </div>
  );
}



/*import React, { useState, useEffect, useCallback } from "react";
import Movie from "../components/Movie";
import getAPI from "../Api";
import InfiniteScroll from "react-infinite-scroll-component";
//import axios from 'axios';

export default function NowPlaying() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(() => {
    getAPI("now_playing", "ko-KR", page, "movie", "12")
      .then(newItems => {
        if (newItems.length === 0) {
          setHasMore(false); // 더 이상 불러올 데이터가 없는 경우
        } else {
          setItems(prevItems => [...prevItems, ...newItems]);
          setPage(prevPage => prevPage + 1);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length} // This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>더 이상 없슈</b>
          </p>
        }
      >
        <div className="app-container">
          {items.length > 0
            ? items.map((item) => (
                <Movie
                  key={item.id}
                  title={item.title}
                  poster_path={item.poster_path}
                  vote_average={item.vote_average}
                  overview={item.overview}
                  release_date={item.release_date}
                />
              ))
            : "로딩중입니다."}
        </div>
      </InfiniteScroll>
    </div>
  );
}

*/

/*import React, { useState, useEffect } from "react";
import Movie from "../components/Movie";
import getAPI from "../Api";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';

export default function NowPlaying() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getAPI("now_playing", "ko-KR", page, "movie", "12")
      .then(newItems => {
        if (newItems.length === 0) {
          setHasMore(false); // 더 이상 불러올 데이터가 없는 경우
        } else {
          setItems(prevItems => [...prevItems, ...newItems]);
          setPage(prevPage => prevPage + 1);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length} // This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>더 이상 없슈</b>
          </p>
        }
      >
        <div className="app-container">
          {items.length > 0
            ? items.map((item) => (
                <Movie
                  key={item.id}
                  title={item.title}
                  poster_path={item.poster_path}
                  vote_average={item.vote_average}
                  overview={item.overview}
                  release_date={item.release_date}
                />
              ))
            : "로딩중입니다."}
        </div>
      </InfiniteScroll>
    </div>
  );
}
*/