import styled from 'styled-components';

const NotificationContainer = styled.div<any>`
    display: grid;
    padding: 
    ${props => { if(props.checker.current !== null && props.checker.current !== undefined){
                        if(props.checker.current.children[0] === undefined){
                            return "0";
                        }
                    }

                  if(props.mobileFlag){
                      return "16px 4px";
                  }
                    return "16px";
                }
    };
    grid-template-columns: repeat(auto-fill, minmax(280px, 100%));
    grid-auto-rows: minmax(100px, 120px);
    justify-content: center;
    grid-column-gap: 15px;
    grid-row-gap: 10px;
    
    ${({theme}) => theme.media.xsmall}{
        grid-template-columns: 96%;
    }
`;

export default NotificationContainer;