import React from "react";
import styled from "styled-components";

import SearchIcon from '@material-ui/icons/Search';

const Div = styled.div`
    position: relative;
    border-radius: 8px;
    background-color: ${({theme}) => theme.palette.sky1};
    margin-right: 10px;
    &:hover{
        background-color: ${({theme}) => theme.palette.sky2};
    };
    .searchIcon {
        padding-left: 0.4rem ;
        height: 100%;
        position: absolute;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const Input = styled.input`
    color: white;
    background-color: inherit;
    padding: 0.5rem 0 0.5rem 2.5rem;
    width: 16ch;
    border: none;
    border-radius: 8px;
    transition: all 500ms ease;
    &:focus {
        width: 32ch;
        outline: none;
        transition: all 500ms ease;
    }
    &::placeholder {
        color: ${({theme}) => theme.palette.placeHolder};
        font-weight: bold;
    }
`;

function SearchBox(){
    return (
        <Div>
            <div className="searchIcon">
                <SearchIcon/>
            </div>
            <Input type="text" placeholder="Search..."/>
        </Div>
    );
};

export default SearchBox;