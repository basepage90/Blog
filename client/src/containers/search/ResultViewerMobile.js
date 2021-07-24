import { useEffect, useRef, useCallback  } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'
import ResultCardMobile from 'components/card/ResultCardMobile'
import ResultContainer from 'components/common/layoutContainer/ResultContainer'
import { useQuery } from '@apollo/react-hooks'
import { GetArticlesList } from 'gql/query'
import { useInView } from "react-intersection-observer"
import { useState } from 'react'

const Div = styled.div`
    position: relative;
    z-index: 2000;
    top: 64px;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    box-shadow: ${({theme}) => theme.shadow[10]};
    background-color: #FAFAFA;
    overflow: auto;

    ::-webkit-scrollbar {
        width: 12px;
    }
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 4px grey; 
        border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb {
        background: ${({theme}) => theme.palette.gray5}; 
        border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${({theme}) => theme.palette.gray6}; 
    }
`;

const FetchMoreChekcer = styled.div`
    visibility: hidden;
    position: relative;
    bottom: 100px;
    width: 1px;
    height: 1px;
`;

const NotFoundText = styled.div`
    padding: 16px;
    width: 100%;
    text-align: center;

    & .highlight {
        font-weight: bold;
        color: ${({theme}) => theme.palette.sky1 };
    }
`;

let cursorId = 0;
const limit = 5;

const ResultViewerMobile = () => {
    const { searchwordMobile, admin_flag, mobileFlag } = useSelector(
        state => ({
            searchwordMobile: state.search.searchwordMobile,
            admin_flag: state.user.admin_flag,
            mobileFlag: state.sideBarHidden.mobileFlag,
        }),shallowEqual);

    const [skip, setSkip] = useState(true)
    const [flag, setFlag] = useState(false)

    const checker = useRef();

    const [ref, inView] = useInView();

    const { loading, data, fetchMore } = useQuery(GetArticlesList, {
        variables: { searchType: 1, searchWord: searchwordMobile, limit: limit },
        fetchPolicy: "cache-first",
        skip: skip,
    });

    const ShowText = useCallback(() => {
        if(checker.current !== null && checker.current !== undefined){
            if(checker.current.children[0] === undefined){
                setFlag(true)
                return;
            }
        }

        if(!loading && data !== undefined && data.articlesList.length === 0){
            setFlag(true);
            return;
        }
        
        setFlag(false);

    },[data,loading]);
    
    useEffect(() => {
        // searchwordMobile가 없으면 검색을 skip 한다.
        if(searchwordMobile !== ""){
            setSkip(false);
        } else{
            setSkip(true);
        }
        
        ShowText();
    },[searchwordMobile,ShowText]);

    useEffect(() => {
        if(inView === true && data !== undefined && data.articlesList !== undefined ){
            fetchMore({
                variables: { cursorId: cursorId, limit: limit, searchType: 1, searchWord: searchwordMobile },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    if (prev !== undefined){
                        return Object.assign({}, prev, {
                            articlesList: [...prev.articlesList, ...fetchMoreResult.articlesList]
                        });
                    }
                }
            })
        }
    },[inView,searchwordMobile,data,fetchMore]);
    
    return (
        <Div>
            {!loading && data !== undefined && data.articlesList.length > 0  &&
                <> 
                    <ResultContainer className="sub__container" ref={checker} checker={checker} mobileFlag={mobileFlag} >
                        {data.articlesList.map((articlesData,key) => {
                                cursorId = articlesData.id
                                return admin_flag === false && articlesData.privacy === "private" ? null
                                :
                                <ResultCardMobile data={articlesData} key={key} /> ;
                            }
                        )}
                    </ResultContainer>
                    {data.articlesList.length !== 0 && <FetchMoreChekcer ref={ref} />}
                </>
            }
            { flag && <NotFoundText>'<span className="highlight">{searchwordMobile}</span>' 에 대한 검색 결과가 없습니다.</NotFoundText>}
        </Div>
    )
}

export default ResultViewerMobile;