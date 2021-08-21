import styled from 'styled-components';
import { bottomMargin } from 'constants/StyleConstant'

const GridContainer = styled.div`
    margin-bottom: ${bottomMargin};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 300px));
    grid-auto-rows: minmax(300px, 420px);
    justify-content: center;
    grid-column-gap: 15px;
    grid-row-gap: 20px;
    
    ${({theme}) => theme.media.xsmall}{
        grid-template-columns: 96%;
    }
`;

export default GridContainer;