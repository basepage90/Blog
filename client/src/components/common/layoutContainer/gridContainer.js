import styled from 'styled-components';
import { bottomMargin } from 'styles/styleConst'

const GridContainer = styled.div`
    margin-bottom: ${bottomMargin};
    color: ${({theme}) => theme.palette.sky0};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 300px));
    grid-auto-rows: minmax(300px, 420px);
    justify-content: center;
    grid-column-gap: 15px;
    grid-row-gap: 20px;
    
    ${({theme}) => theme.media.xsmall}{
        grid-template-columns: 95%;
    }
`;

export default GridContainer;