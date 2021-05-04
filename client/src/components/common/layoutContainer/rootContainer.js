import styled from 'styled-components';
import {sidebarWidth} from 'styles/styleConst'

const RootContainer = styled.div`
  position: relative;
  float:right;
  width: calc(100% - ${sidebarWidth});
  display: grid;
  padding: 2% 2% 0 2%;
`;

export default RootContainer;