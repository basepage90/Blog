import { useEffect, useRef, useCallback } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'
import ResultCard from 'components/card/ResultCard'
import ResultContainer from 'components/common/layoutContainer/ResultContainer'
import { useQuery } from '@apollo/react-hooks'
import { GetArticlesList } from 'gql/query'
import { useInView } from "react-intersection-observer"
import { useState } from 'react'
import { RootState } from "store/store"

const Div = styled.div<{focus: boolean}>`
    visibility: ${props => !props.focus && 'hidden'};
    & > * {
        visibility: ${props => !props.focus && 'hidden'};
    }
    transition-property: visibility;
    transition-duration: ${({theme}) => theme.transition.duration.shortest};
    position: absolute;
    z-index: 2000;
    top: 64px;
    right: 80px;
    width: 80%;
    height: auto;
    max-width: 500px;
    max-height: 600px;
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

const ResultViewer = () => {
    const { focus, searchword, admin_flag } = useSelector(
        (state: RootState) => ({
            focus: state.search.focus,
            searchword: state.search.searchword,
            admin_flag: state.user.admin_flag
        }),shallowEqual);

    const [skip, setSkip] = useState(true)
    const [flag, setFlag] = useState(false)

    const checker = useRef<HTMLElement>();

    const [ref, inView] = useInView();

    const { loading, data, fetchMore } = useQuery(GetArticlesList, {
        variables: { cursorId: 0, searchType: 1, searchWord: searchword, limit: limit },
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
        // searchword가 없으면 검색을 skip 한다.
        if(searchword !== ""){
            setSkip(false);
        } else{
            setSkip(true);
        }
        
        ShowText();
    },[searchword,ShowText]);

    useEffect(() => {
        if(inView === true && data !== undefined && data.articlesList !== undefined ){
            fetchMore({
                variables: { cursorId: cursorId, limit: limit, searchType: 1, searchWord: searchword },
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
    },[inView,searchword,data,fetchMore]);
    
    return (
        <Div className="test" focus={focus} >
            {!loading && data !== undefined && data.articlesList.length > 0  &&
                <> 
                    <ResultContainer className="sub__container" ref={checker} checker={checker} >
                        {data.articlesList.map((articlesData: any, key: string) => {
                                cursorId = articlesData.id
                                return admin_flag === false && articlesData.privacy === "private" ? null : <ResultCard data={articlesData} key={key} /> ;
                            }
                        )}
                    </ResultContainer>
                    {data.articlesList.length !== 0 && <FetchMoreChekcer ref={ref} />}
                </>
            }
            { flag && <NotFoundText>'<span className="highlight">{searchword}</span>' 에 대한 검색 결과가 없습니다.</NotFoundText>}
        </Div>
    )
}

export default ResultViewer;