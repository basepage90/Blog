import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';



function SearchMenu(){
    const ShowSearchBox = () => {
        
    }
    return (
            <>
                <IconButton
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={ShowSearchBox}
                    color="inherit"
                >
                    <SearchIcon/>
                </IconButton>
            </>
    );
};

export default SearchMenu;