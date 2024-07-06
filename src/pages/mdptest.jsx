/*import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  color: white;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0)),
              url(${props => `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`}) center/cover no-repeat;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  text-align: left;
  margin-left: 20px;
  width: 100%;
  padding: 100px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const Poster = styled.img`
  width: 300px;
  height: 450px;
  border-radius: 3px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

const Title = styled.h1`
  font-size: 35px;
  margin: 20px 0 10px;
  color: white;
`;

const Rating = styled.div`
  font-size: 25px;
  margin: 10px 0;
  color: white;
  
`;

const ReleaseDate = styled.div`
  font-size: 20px;
  margin: 10px 0;
  font-weight: 700;
`;

const Overtext = styled.div`
  color: white;
  font-size: 20px;
  margin: 10px 0;
  font-weight: 700;

`;

const Overview = styled.div`
  font-size: 20px;
  margin: 10px 0;
  max-width: 600px;
  line-height: 1.2;
`;

const CastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
`;

const CastMember = styled.div`
  margin: 10px;
  text-align: center;
  color: white;
`;

const CastImage = styled.img`
  width: 110px;
  height: 130px;
  border-radius: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const CastName = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: white;
`;

const SectionTitle = styled.h2`
  font-size: 25px;
  margin: 120px 0 10px;
  color: white;
  text-align: center;
`;

const Loading = styled.div`
  color: white;
  font-size: 20px;
  margin: 20px;
  text-align: center;
`;

const NoImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

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
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <Loading>Loading...</Loading>;
  }

  const stars = "⭐️".repeat(Math.floor(movie.vote_average));

  return (
    <InfoContainer movie={movie}>
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
          <Overtext>줄거리</Overtext>
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
}*/