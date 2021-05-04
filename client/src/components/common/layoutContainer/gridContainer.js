import styled from 'styled-components';

const GridContainer = styled.div`
    color: ${({theme}) => theme.palette.sky0};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 300px));
    grid-auto-rows: minmax(300px, 420px);
    justify-content: center;
    grid-column-gap: 1%;
    grid-row-gap: 1.5%;
    
    ${({theme}) => theme.media.xsmall}{
        grid-template-columns: minmax(400px, 500px);
    }
`;

export default GridContainer;