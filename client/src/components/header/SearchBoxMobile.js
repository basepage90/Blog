import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { showResultMobile, updateSearchwordMobile } from "store/store";

import SearchIcon from '@material-ui/icons/Search';

const Div = styled.div`
    position: relative;
    border-radius: 8px;
    width: 100%;
    background-color: ${({theme}) => theme.palette.sky1};
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
    border: none;
    width: inherit;
    border-radius: 8px;
    transition: all 500ms ease;
    &:focus {
        outline: none;
        transition: all 500ms ease;
    }
    &::placeholder {
        color: ${({theme}) => theme.palette.placeHolder};
        font-weight: bold;
    }
`;

function SearchBoxMobile(){

    const dispatch = useDispatch();

    const handleInputFocus = () => {
        dispatch(showResultMobile());
    };

    const updateValue = (props) => {
        const rawValue = props.target.value;
        const searchword = rawValue.trim(rawValue);
        dispatch(updateSearchwordMobile(searchword));
    };

    return (
        <Div>
            <div className="searchIcon">
                <SearchIcon/>
            </div>
            <Input
                type="text"
                id="searchbox"
                placeholder="Search..."
                autoComplete="off"
                onFocus={handleInputFocus}
                onChange={updateValue}
            />
        </Div>
    );
};

export default SearchBoxMobile;