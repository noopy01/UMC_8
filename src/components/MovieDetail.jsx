//65392f8691a0611f13753784ee967687
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const NoImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s';

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Poster = styled.img`
  width: 300px;
  height: 450px;
  object-fit: cover;
  margin-right: 20px;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Rating = styled.div`
  font-size: 20px;
  color: gold;
`;

const ReleaseDate = styled.div`
  font-size: 16px;
  margin-top: 10px;
`;

const Overview = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-top: 20px;
`;

const CastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const CastMember = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const CastImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const CastName = styled.div`
  font-size: 14px;
  text-align: center;
`;

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = '65392f8691a0611f13753784ee967687'; 
        const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`;
        const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=ko-KR`;

        const [movieResponse, creditsResponse] = await Promise.all([
          axios.get(movieUrl),
          axios.get(creditsUrl)
        ]);

        if (movieResponse.status === 200 && creditsResponse.status === 200) {
            setMovie(movieResponse.data);
            setCast(creditsResponse.data.cast);
            console.log('Movie Response:', movieResponse.data); // 디버깅 로그 추가
            console.log('Credits Response:', creditsResponse.data); // 디버깅 로그 추가
          } else {
            console.error('Failed to fetch data');
          }
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching movie details:', error);
          setIsLoading(false);
        }
      };
  
    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const starCount = () => {
    const star = [];
    for (let i = 0; i < Math.floor(movie.vote_average); i++) {
      star.push("⭐️ ");
    }
    return star;
  };

  return (
    <InfoContainer>
      <Content>
        <Poster 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt='영화 포스터 이미지' 
          onError={(e) => e.target.src = NoImage}
        />
        <TextContent>
          <Title>{movie.title}</Title>
          <Rating>{starCount()}</Rating>
          <ReleaseDate>개봉일 {movie.release_date}</ReleaseDate>
          <Overview>
            {movie.overview ? movie.overview : 'TMDB에서 제공하는 상세 줄거리 정보가 없습니다.'}
          </Overview>
        </TextContent>
      </Content>
      <SectionTitle>출연진 및 제작진</SectionTitle>
      <CastContainer>
        {cast.map(member => (
          <CastMember key={member.cast_id}>
            <CastImage 
              src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : NoImage}
              alt={`${member.name} 사진`}
            />
            <CastName>{member.name} <br/> {member.known_for_department}</CastName>
          </CastMember>
        ))}
      </CastContainer>
    </InfoContainer>
  );
}


/*import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

const NoImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s';

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Poster = styled.img`
  width: 300px;
  height: 450px;
  object-fit: cover;
  margin-right: 20px;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Rating = styled.div`
  font-size: 20px;
  color: gold;
`;

const ReleaseDate = styled.div`
  font-size: 16px;
  margin-top: 10px;
`;

const Overview = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-top: 20px;
`;

const CastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const CastMember = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const CastImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const CastName = styled.div`
  font-size: 14px;
  text-align: center;
`;

export default function MovieDetail() {
  const { id } = useParams();  // URL에서 id 가져오기
  const { state } = useLocation();
  const [movie, setMovie] = useState(state);
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: '65392f8691a0611f13753784ee967687',
            language: 'ko-KR'
          }
        });

        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          params: {
            api_key: '65392f8691a0611f13753784ee967687',
            language: 'ko-KR'
          }
        });

        console.log('Movie Response:', movieResponse.data); // 디버깅을 위한 로그
        console.log('Credits Response:', creditsResponse.data); // 디버깅을 위한 로그

        setMovie(movieResponse.data);
        setCast(creditsResponse.data.cast);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setIsLoading(false);
      }
    };

    if (!state) {
      fetchMovieDetails();
    } else {
      setIsLoading(false);
    }
  }, [id, state]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const stars = "⭐️".repeat(Math.floor(movie.vote_average));

  return (
    <InfoContainer>
      <Content>
        <Poster 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt='영화 포스터 이미지' 
          onError={(e) => e.target.src = NoImage}
        />
        <TextContent>
          <Title>{movie.title}</Title>
          <Rating>{stars}</Rating>
          <ReleaseDate>개봉일 {movie.release_date}</ReleaseDate>
          <Overview>
            {movie.overview ? movie.overview : 'TMDB에서 제공하는 상세 줄거리 정보가 없습니다.'}
          </Overview>
        </TextContent>
      </Content>
      <SectionTitle>출연진 및 제작진</SectionTitle>
      <CastContainer>
        {cast.map(member => (
          <CastMember key={member.cast_id}>
            <CastImage 
              src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : NoImage}
              alt={`${member.name} 사진`}
            />
            <CastName>{member.name} <br/> {member.known_for_department}</CastName>
          </CastMember>
        ))}
      </CastContainer>
    </InfoContainer>
  );
} */



/*import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

const NoImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s';

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Poster = styled.img`
  width: 300px;
  height: 450px;
  object-fit: cover;
  margin-right: 20px;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Rating = styled.div`
  font-size: 20px;
  color: gold;
`;

const ReleaseDate = styled.div`
  font-size: 16px;
  margin-top: 10px;
`;

const Overview = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-top: 20px;
`;

const CastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const CastMember = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const CastImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const CastName = styled.div`
  font-size: 14px;
  text-align: center;
`;

export default function MovieDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const [movie, setMovie] = useState(state);
  const [cast, setCast] = useState([]);
  // 'crew' 변수를 사용하지 않으면 제거합니다.
  // const [crew, setCrew] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: '65392f8691a0611f13753784ee967687',
            language: 'ko-KR'
          }
        });

        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          params: {
            api_key: '65392f8691a0611f13753784ee967687',
            language: 'ko-KR'
          }
        });

        console.log('Movie Response:', movieResponse.data); // 디버깅을 위한 로그
        console.log('Credits Response:', creditsResponse.data); // 디버깅을 위한 로그

        setMovie(movieResponse.data);
        setCast(creditsResponse.data.cast);
        // setCrew(creditsResponse.data.crew); // 사용하지 않을 경우 제거합니다.
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setIsLoading(false);
      }
    };

    if (!state) {
      fetchMovieDetails();
    } else {
      setIsLoading(false);
    }
  }, [id, state]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const stars = "⭐️".repeat(Math.floor(movie.vote_average));

  return (
    <InfoContainer>
      <Content>
        <Poster 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt='영화 포스터 이미지' 
          onError={(e) => e.target.src = NoImage}
        />
        <TextContent>
          <Title>{movie.title}</Title>
          <Rating>{stars}</Rating>
          <ReleaseDate>개봉일 {movie.release_date}</ReleaseDate>
          <Overview>
            {movie.overview ? movie.overview : 'TMDB에서 제공하는 상세 줄거리 정보가 없습니다.'}
          </Overview>
        </TextContent>
      </Content>
      <SectionTitle>출연진 및 제작진</SectionTitle>
      <CastContainer>
        {cast.map(member => (
          <CastMember key={member.cast_id}>
            <CastImage 
              src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : NoImage}
              alt={`${member.name} 사진`}
            />
            <CastName>{member.name} <br/> {member.known_for_department}</CastName>
          </CastMember>
        ))}
      </CastContainer>
    </InfoContainer>
  );
}
*/

/*import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

const NoImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s';

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Poster = styled.img`
  width: 300px;
  height: 450px;
  object-fit: cover;
  margin-right: 20px;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Rating = styled.div`
  font-size: 20px;
  color: gold;
`;

const ReleaseDate = styled.div`
  font-size: 16px;
  margin-top: 10px;
`;

const Overview = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-top: 20px;
`;

const CastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const CastMember = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const CastImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const CastName = styled.div`
  font-size: 14px;
  text-align: center;
`;

export default function MovieDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const [movie, setMovie] = useState(state);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: '65392f8691a0611f13753784ee967687',
            language: 'ko-KR'
          }
        });

        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          params: {
            api_key: 'Y65392f8691a0611f13753784ee967687',
            language: 'ko-KR'
          }
        });

        console.log('Movie Response:', movieResponse.data); // 디버깅을 위한 로그
        console.log('Credits Response:', creditsResponse.data); // 디버깅을 위한 로그

        setMovie(movieResponse.data);
        setCast(creditsResponse.data.cast);
        setCrew(creditsResponse.data.crew);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setIsLoading(false);
      }
    };

    if (!state) {
      fetchMovieDetails();
    } else {
      setIsLoading(false);
    }
  }, [id, state]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const stars = "⭐️".repeat(Math.floor(movie.vote_average));

  return (
    <InfoContainer>
      <Content>
        <Poster 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt='영화 포스터 이미지' 
          onError={(e) => e.target.src = NoImage}
        />
        <TextContent>
          <Title>{movie.title}</Title>
          <Rating>{stars}</Rating>
          <ReleaseDate>개봉일 {movie.release_date}</ReleaseDate>
          <Overview>
            {movie.overview ? movie.overview : 'TMDB에서 제공하는 상세 줄거리 정보가 없습니다.'}
          </Overview>
        </TextContent>
      </Content>
      <SectionTitle>출연진 및 제작진</SectionTitle>
      <CastContainer>
        {cast.map(member => (
          <CastMember key={member.cast_id}>
            <CastImage 
              src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : NoImage}
              alt={`${member.name} 사진`}
            />
            <CastName>{member.name} <br/> {member.known_for_department}</CastName>
          </CastMember>
        ))}
      </CastContainer>
    </InfoContainer>
  );
}
*/



/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IMG_BASE_URL } from '../components/Movie';
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const NoImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s';

export default function MovieDetail() {
  const { id } = useParams();  // URL로 넘긴 영화 ID useParams로 받기
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: '65392f8691a0611f13753784ee967687', // TMDB API 키를 여기에 입력하세요
            language: 'ko-KR'
          }
        });

        console.log('Movie Response:', movieResponse.data);

        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          params: {
            api_key: '65392f8691a0611f13753784ee967687', // TMDB API 키를 여기에 입력하세요
            language: 'ko-KR'
          }
        });

        console.log('Credits Response:', creditsResponse.data);

        setMovie(movieResponse.data);
        setCast(creditsResponse.data.cast);
        setCrew(creditsResponse.data.crew);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const stars = [];
  for (let i = 0; i < Math.floor(movie.vote_average); i++) {
    stars.push(<FaStar key={i} />);
  }
  for (let i = 0; i < 10 - Math.floor(movie.vote_average); i++) {
    stars.push(<FaRegStar key={i + Math.floor(movie.vote_average)} />);
  }

  const directors = crew.filter(member => member.job === 'Director');

  return (
    <div className="detail-container">
      <div style={{ display: 'flex', margin: '5%' }}>
        <img 
          style={{ width: "300px", height: "450px" }}
          src={movie.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : NoImage} 
          alt='영화 포스터 이미지'
          onError={(e) => e.target.src = NoImage}
        />
      </div>
      <div className="title_box">
        <p className="title_text">{movie.title}</p>
        <br />
        <p style={{ fontSize: "22px" }}> 평점
          <span> {Math.floor(movie.vote_average)} {stars}</span>
        </p>
        <br />
        <p style={{ fontSize: "22px" }}> 개봉일 <span> {movie.release_date} </span></p> 
        <br />
        <p style={{ fontSize: "22px" }}> 줄거리 <br /><br /><span>{movie.overview ? movie.overview : "상세 줄거리 정보가 없습니다"}</span></p>
      </div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>출연진</h2>
      <div className="cast-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cast.map(member => (
          <div key={member.cast_id} style={{ margin: '10px', textAlign: 'center', color: 'black' }}>
            <img 
              src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : NoImage}
              alt={`${member.name} 사진`}
              style={{ width: '110px', height: '130px', borderRadius: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
            />
            <div style={{ marginTop: '10px', fontSize: '16px' }}>{member.name} <br /> {member.character}</div>
          </div>
        ))}
      </div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>감독진</h2>
      <div className="crew-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {directors.map(member => (
          <div key={member.id} style={{ margin: '10px', textAlign: 'center', color: 'black' }}>
            <img 
              src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : NoImage}
              alt={`${member.name} 사진`}
              style={{ width: '110px', height: '130px', borderRadius: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
            />
            <div style={{ marginTop: '10px', fontSize: '16px' }}>{member.name} <br /> {member.job}</div>
          </div>
        ))}
      </div>
    </div>
  );
}*/



/*import React, { useEffect, useState } from 'react';

import { useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import { IMG_BASE_URL } from '../components/Movie';
import { FaRegStar, FaStar } from "react-icons/fa6";

const NoImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s';

export default function MovieDetail() {
  const { id } = useParams();  // URL로 넘긴 영화 ID useParams로 받기
  const { state } = useLocation(); // 페이지 이동 시 넘긴 props를 useLocation으로 받기
  const [movie, setMovie] = useState(state);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: '65392f8691a0611f13753784ee967687', // TMDB API 키를 여기에 입력하세요
            language: 'ko-KR'
          }
        });

        console.log('Movie Response:', movieResponse.data); // 응답 데이터 확인

        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          params: {
            api_key: '65392f8691a0611f13753784ee967687', // TMDB API 키를 여기에 입력하세요
            language: 'ko-KR'
          }
        });

        console.log('Credits Response:', creditsResponse.data); // 응답 데이터 확인

        setMovie(movieResponse.data);
        setCast(creditsResponse.data.cast);
        setCrew(creditsResponse.data.crew);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setIsLoading(false);
      }
    };

    if (!state) {
      fetchMovieDetails();
    } else {
      setIsLoading(false);
    }
  }, [id, state]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const stars = [];
  for (let i = 0; i < Math.floor(movie.vote_average); i++) {
    stars.push(<FaStar key={i} />);
  }
  for (let i = 0; i < 10 - Math.floor(movie.vote_average); i++) {
    stars.push(<FaRegStar key={i + Math.floor(movie.vote_average)} />);
  }

  const directors = crew.filter(member => member.job === 'Director');

  return (
    <div className="detail-container">
      <div style={{ display: 'flex', margin: '5%' }}>
        <img 
          style={{ width: "300px", height: "450px" }}
          src={movie.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : NoImage} 
          alt='영화 포스터 이미지'
          onError={(e) => e.target.src = NoImage}
        />
      </div>
      <div className="title_box">
        <p className="title_text">{movie.title}</p>
        <br />
        <p style={{ fontSize: "22px" }}> 평점
          <span> {Math.floor(movie.vote_average)} {stars}</span>
        </p>
        <br />
        <p style={{ fontSize: "22px" }}> 개봉일 <span> {movie.release_date} </span></p> 
        <br />
        <p style={{ fontSize: "22px" }}> 줄거리 <br /><br /><span>{movie.overview ? movie.overview : "상세 줄거리 정보가 없습니다"}</span></p>
      </div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>출연진</h2>
      <div className="cast-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cast.map(member => (
          <div key={member.cast_id} style={{ margin: '10px', textAlign: 'center', color: 'black' }}>
            <img 
              src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : NoImage}
              alt={`${member.name} 사진`}
              style={{ width: '110px', height: '130px', borderRadius: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
            />
            <div style={{ marginTop: '10px', fontSize: '16px' }}>{member.name} <br /> {member.character}</div>
          </div>
        ))}
      </div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>감독진</h2>
      <div className="crew-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {directors.map(member => (
          <div key={member.id} style={{ margin: '10px', textAlign: 'center', color: 'black' }}>
            <img 
              src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : NoImage}
              alt={`${member.name} 사진`}
              style={{ width: '110px', height: '130px', borderRadius: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
            />
            <div style={{ marginTop: '10px', fontSize: '16px' }}>{member.name} <br /> {member.job}</div>
          </div>
        ))}
      </div>
    </div>
  );
}*/

/*import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import { IMG_BASE_URL } from '../components/Movie';
import { FaRegStar, FaStar } from "react-icons/fa6";

const NoImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s';

export default function MovieDetail() {
  const { id } = useParams();  // URL로 넘긴 영화 ID useParams로 받기
  const { state } = useLocation(); // 페이지 이동 시 넘긴 props를 useLocation으로 받기
  const [movie, setMovie] = useState(state);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: '65392f8691a0611f13753784ee967687', // TMDB API 키를 여기에 입력하세요
            language: 'ko-KR'
          }
        });

        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          params: {
            api_key: '65392f8691a0611f13753784ee967687', // TMDB API 키를 여기에 입력하세요
            language: 'ko-KR'
          }
        });
        console.log('Credits Response:', creditsResponse.data); 
        
        setMovie(movieResponse.data);
        setCast(creditsResponse.data.cast);
        setCrew(creditsResponse.data.crew);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setIsLoading(false);
      }
    };

    if (!state) {
      fetchMovieDetails();
    } else {
      setIsLoading(false);
    }
  }, [id, state]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const stars = [];
  for (let i = 0; i < Math.floor(movie.vote_average); i++) {
    stars.push(<FaStar key={i} />);
  }
  for (let i = 0; i < 10 - Math.floor(movie.vote_average); i++) {
    stars.push(<FaRegStar key={i + Math.floor(movie.vote_average)} />);
  }

  const directors = crew.filter(member => member.job === 'Director');

  return (
    <div className="detail-container">
      <div style={{ display: 'flex', margin: '5%' }}>
        <img 
          style={{ width: "300px", height: "450px" }}
          src={movie.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : NoImage} 
          alt='영화 포스터 이미지'
          onError={(e) => e.target.src = NoImage}
        />
      </div>
      <div className="title_box">
        <p className="title_text">{movie.title}</p>
        <br />
        <p style={{ fontSize: "22px" }}> 평점
          <span> {Math.floor(movie.vote_average)} {stars}</span>
        </p>
        <br />
        <p style={{ fontSize: "22px" }}> 개봉일 <span> {movie.release_date} </span></p> 
        <br />
        <p style={{ fontSize: "22px" }}> 줄거리 <br /><br /><span>{movie.overview ? movie.overview : "상세 줄거리 정보가 없습니다"}</span></p>
      </div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>출연진</h2>
      <div className="cast-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cast.map(member => (
          <div key={member.cast_id} style={{ margin: '10px', textAlign: 'center', color: 'white' }}>
            <img 
              src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : NoImage}
              alt={`${member.name} 사진`}
              style={{ width: '110px', height: '130px', borderRadius: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
            />
            <div style={{ marginTop: '10px', fontSize: '16px' }}>{member.name} <br /> {member.character}</div>
          </div>
        ))}
      </div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>감독진</h2>
      <div className="crew-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {directors.map(member => (
          <div key={member.id} style={{ margin: '10px', textAlign: 'center', color: 'white' }}>
            <img 
              src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : NoImage}
              alt={`${member.name} 사진`}
              style={{ width: '110px', height: '130px', borderRadius: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
            />
            <div style={{ marginTop: '10px', fontSize: '16px' }}>{member.name} <br /> {member.job}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
*/


/*import React from 'react';
import { useLocation, useParams } from "react-router-dom";
import {IMG_BASE_URL} from '../components/Movie';
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

export default function MovieDetail(){
    const{ id } = useParams();  // url로 넘긴 영화 이름 useParams로 받기
    const{ state } = useLocation(); // 페이지 이동 시 넘긴 props를 useLocation로 받기
    const score = [];
    
    for (let i = 0; i < Math.floor(state.vote_average); i++){
        score.push(true);
    }
    for (let i = 0; i <10-Math.floor(state.vote_average) ; i++){
        score.push(false);
    }
    return(
        <div className="detail-container">
            <div style={{display: 'flex', margin: '5%'}}>
                <img 
                style={{width:"300px", height: "450px"}}
                src ={IMG_BASE_URL + state.poster_path} 
                alt='영화 포스터 이미지'
                />
            </div>
            <div className="title_box ">
              <p className="title_text">{id}</p>  
                 <br /> 
                 <p style={{fontSize:"22px"}}> 평점             
                    <span> {Math.floor(state.vote_average)}{ score.map((value, index) => ( value ? <FaStar /> : <FaRegStar />)) }</span>
                 
                 </p>
                <br />
               <p style={{fontSize:"22px"}}> 개봉일 <span> {state.release_date} </span></p> <br />
               <p style={{fontSize:"22px"}}> 줄거리 < br />< br /><span>{state.overview.length < 2 ? "상세 줄거리 정보가 없습니다" : state.overview} </span> </p>
               
                
            </div>
            
        </div>
    )
}
*/
/*import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import { IMG_BASE_URL } from '../components/Movie';
import { FaRegStar, FaStar } from "react-icons/fa6";

const NoImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s';

export default function MovieDetail() {
  const { id } = useParams();  // URL로 넘긴 영화 ID useParams로 받기
  const { state } = useLocation(); // 페이지 이동 시 넘긴 props를 useLocation으로 받기
  const [movie, setMovie] = useState(state);
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: '1efcaf84f10ffaf1588ba14cda33695d',
            language: 'ko-KR'
          }
        });

        const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          params: {
            api_key: '1efcaf84f10ffaf1588ba14cda33695d',
            language: 'ko-KR'
          }
        });

        setMovie(movieResponse.data);
        setCast(castResponse.data.cast);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setIsLoading(false);
      }
    };

    if (!state) {
      fetchMovieDetails();
    } else {
      setIsLoading(false);
    }
  }, [id, state]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const stars = [];
  for (let i = 0; i < Math.floor(movie.vote_average); i++) {
    stars.push(<FaStar key={i} />);
  }
  for (let i = 0; i < 10 - Math.floor(movie.vote_average); i++) {
    stars.push(<FaRegStar key={i + Math.floor(movie.vote_average)} />);
  }

  return (
    <div className="detail-container">
      <div style={{ display: 'flex', margin: '5%' }}>
        <img 
          style={{ width: "300px", height: "450px" }}
          src={movie.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : NoImage} 
          alt='영화 포스터 이미지'
          onError={(e) => e.target.src = NoImage}
        />
      </div>
      <div className="title_box">
        <p className="title_text">{movie.title}</p>
        <br />
        <p style={{ fontSize: "22px" }}> 평점
          <span> {Math.floor(movie.vote_average)} {stars}</span>
        </p>
        <br />
        <p style={{ fontSize: "22px" }}> 개봉일 <span> {movie.release_date} </span></p> 
        <br />
        <p style={{ fontSize: "22px" }}> 줄거리 <br /><br /><span>{movie.overview ? movie.overview : "상세 줄거리 정보가 없습니다"}</span></p>
      </div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>출연진 및 제작진</h2>
      <div className="cast-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cast.map(member => (
          <div key={member.cast_id} style={{ margin: '10px', textAlign: 'center', color: 'white' }}>
            <img 
              src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : NoImage}
              alt={`${member.name} 사진`}
              style={{ width: '110px', height: '130px', borderRadius: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
            />
            <div style={{ marginTop: '10px', fontSize: '16px' }}>{member.name} <br /> {member.known_for_department}</div>
          </div>
        ))}
      </div>
    </div>
  );
}*/
