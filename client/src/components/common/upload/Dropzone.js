import React from 'react'
import styled from 'styled-components';
import { DropzoneArea } from 'material-ui-dropzone'

const Div = styled.div`
    margin: 20px 0;
    .dropzone__main {
        width: 350px;
        margin: 0 auto;
    }

    .MuiDropzoneArea-root {
        border-width: 0.5em;
    }

    .dropzone__paragraph {
        width: 200px;
        padding: 5px;
        margin-left: auto;
        margin-right: auto;
        color: #FFF;
        background-color: rgba(0, 0, 0, 0.12);
    }

    .MuiGrid-container {
        justify-content: center;
    }
    
    .MuiGrid-spacing-xs-8 > .MuiGrid-item{
        margin:  16px;
    }

    .MuiDropzonePreviewList-imageContainer{
        flex:1 1 auto;
        max-width: 100%;
    }

    .dropzone__main img {
        width: 300px;
        height: 252px;
        object-fit: cover;
    }

    .MuiDropzonePreviewList-removeButton {
        position: absolute;
        top: 16px;
        right: 16px;
    } 

`;

const Dropzone = ({pdata, setFile}) => {

    const handleChange = (files) => {
        if(files.length === 0 ){
            document.getElementsByClassName("MuiDropzoneArea-textContainer")[0].style.display="block";
        } else{
            document.getElementsByClassName("MuiDropzoneArea-textContainer")[0].style.display="none";
            setFile(files[0])
        }
    }
    return (
        <Div>
            <DropzoneArea
            onChange={(files) => handleChange(files)}
            filesLimit={1}
            getFileAddedMessage={(fileName) => "썸네일에 [ "+  fileName +" ] 를 추가했어요!" }
            getFileRemovedMessage={(fileName) => "썸네일에서 [ "+  fileName +" ] 를 제거했어요!" }
            dropzoneText="썸네일 업로드"
            dropzoneClass="dropzone__main"
            dropzoneParagraphClass="dropzone__paragraph"
            maxFileSize={10000000}
            initialFiles={ pdata === null ? [] : [pdata.thumbnail] }
            />
        </Div>
    )
}

export default Dropzone;