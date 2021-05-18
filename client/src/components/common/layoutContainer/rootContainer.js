import styled from 'styled-components';
import {sidebarWidth,headerHeight} from 'styles/styleConst'

const RootContainer = styled.div`
  position: relative;
  margin-top: ${headerHeight};
  float:right;
  width: calc(100% - ${sidebarWidth});
  display: grid;
  padding: 2% 2% 0 2%;
  transition: all ${({theme}) => theme.transition.duration.standard};
`;

export default RootContainer;