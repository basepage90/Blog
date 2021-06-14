import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ImageNotFound } from 'statics/images';
import { useLocation } from 'react-router-dom';

const Item = styled.div`
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-decoration: none;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: ${({theme}) => theme.shadow[1]};
    position: relative;
    transition: ${({theme}) => theme.transition.duration.long};
    &:hover {
        transition: ${({theme}) => theme.transition.duration.long};
        transform : translate(0px, -2%); 
        box-shadow: ${({theme}) => theme.shadow[5]};
    }
`;

const thumbHeight= "60%";

const Thumb = styled.div`
    border-radius: 12px 12px 0 0;
    height: ${thumbHeight};
    background-image: url('${ImageNotFound}');
    background-size: cover;
    background-position: center;
`;

const Article = styled.div`
    border-radius: 0 0 12px 12px;
    height: calc(100% - ${thumbHeight});
    display: flex;
    flex-direction: column;
    padding: 8px 16px;
    & p{
        flex: 1;
    }
    & span{
        font-size: 0.8rem;
    }

    & .title {
        flex:1 1 auto;
        margin-bottom: 8px;
        color: #212429;
        font-size: 1.1rem;
        font-weight: bold;
        
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

    }
    & .subtitle {
        flex:1 1 auto;
        margin-bottom: 8px;
        color: #444A55;
        font-size: 0.9rem;
        font-weight: bold;
        
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

    }
    & .desc {
        flex:2 2 auto;
        margin-bottom: 16px;
        color: #444A55;
        font-size: 0.875rem;
        
        word-break: break-word;
        overflow-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    & .reg_date {
        color: #808999;
    }
`;
export default function Card({data}){
    const {pathname} = useLocation();
    const {id,title,subtitle,reg_date,desc,thumbnail} = data;

    return (
        <Link to={pathname === '/' ? { pathname: `/${id}` } : { pathname: `${pathname}/${id}` }} style={{textDecoration: 'none'}} >
        <Item >
            {thumbnail === "" ? <Thumb /> :
                <Thumb style={{backgroundImage: 'url("'+thumbnail+'")'}} />
            }
            <Article>
                <h4 className="title">{title}</h4>
                <p className="subtitle">{subtitle}</p>
                <p className="desc">{desc}</p>
                <span className="reg_date">{reg_date}</span>
            </Article>
        </Item>
        </Link>
    );
};
