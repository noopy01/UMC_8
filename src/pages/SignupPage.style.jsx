import styled from "styled-components";

export const title = styled.div`
    color : #ffffff;
    text-align : center;
    margin-top : 2vh;
    margin-bottom : 5vh;
`
export const inputset = styled.div`
    margin-top : 3vh;
    display : block;
    text-align : center;
    .box{
        padding-left : 1vw;
        border-radius : 3vw;
        width : 28vw;
        height : 4vh;
    }
    .sub{
        margin-top : 2vh;
        border-radius : 3vw;
        width : 30vw;
        height : 6vh;
    }
    .sub-active{
        background-color : #FFFF00;
        margin-top : 2vh;
        border-radius : 3vw;
        width : 30vw;
        height : 6vh;
    }
`
export const info = styled.div`
    font-size : 0.6em;
    color : #FF0000;
    text-align: left;
    margin: 0 auto;
    margin-top : 1vh;
    width : 28vw;
`
export const manage=styled.div`
    margin-top : 5vh;
    display : flex;
    align-items : center;
    justify-content : center;
    .manage{
        color : #ffffff;
        background-color : #0B0B3B;
        border : none; 
        margin-left : 1vw;
        margin-right : 1vw;
    }
`