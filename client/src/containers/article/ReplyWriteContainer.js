import { useSelector, shallowEqual } from "react-redux";
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { CreateReply } from 'gql/query';
import { useSnackbar } from 'notistack';
import ReplyWriter from 'components/article/ReplyWriter'

const ReplyWriterContainer = ({replyId,depth,siblingName,groupNo,refetch,setOpenReply}) =>{
    const { admin_flag, nickname } = useSelector(
        state => ({
          admin_flag: state.user.admin_flag,
          nickname: state.user.nickname,
        }),shallowEqual)
      
      const { id } = useParams();
      
      const replyValidator = (name,password,contents) => {
        if (admin_flag){
          if ( contents.length === 0 ) {
            return '댓글 내용';
          }else{
            return true;
          }
        }else{
          if ( name.length === 0 ){
            return '이름';
          } else if ( password.length < 4  ) {
            return '비밀번호';
          } else if ( contents.length === 0 ) {
            return '댓글 내용';
          }else{
            return true;
          }
        }
      };
    
      const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    
      const handleSnackbaraVariant = (variant, rv) => {
        let msg;
        switch (variant) {
          case 'success':
            msg = '댓글을 등록했어요 :)'
            break;
          case 'error':
            msg = '댓들등록에 실패했어요 (server response error)'
            break;
          case 'warning':
            if(rv === "비밀번호"){
              msg = rv + ' 는 4글자 이상 입력해주세요!';
            }else{
              msg = rv + ' 이(가) 비어 있어요!';
            }
            break;
          default:
              break;
        }
        const key = enqueueSnackbar(msg, { variant, onClick: () => {closeSnackbar(key)} })
      };
    
      const [ createReply ] = useMutation(CreateReply)
      
      const doCreateReply = () => {
        let name;
        let password;
        const contents = document.getElementById('reply__contents__'+replyId).value;
        // const secret = document.getElementById('reply__secret__'+replyId).checked;
    
        if(admin_flag){
          name = nickname;
          password = "";
        }else{
          name = document.getElementById('reply__name__'+replyId).value;
          password = document.getElementById('reply__password__'+replyId).value;
        }
    
        const rp = replyValidator(name,password,contents)
    
        if(rp !== true ){
          handleSnackbaraVariant('warning', rp)
          return;
        }
        
        const success = createReply({ variables: {
          article_id : id,
          depth: depth === undefined ? 0 : depth,
          group_no: groupNo === undefined ? 0 : groupNo,
          sibling_name: siblingName === undefined ? "" : siblingName,
          name: name,
          password: password,
          contents: contents,
          admin_flag: admin_flag,
        }})
    
          success.then(({data})=> {
              // gql server 로 부터의 return 은 id. 즉, 생성한 id 를 반환받으면 성공
              if(data.createReply.id !== undefined || data.createReply.id !== null) {
                  handleSnackbaraVariant('success')
                  document.getElementById('reply__contents__'+replyId).value = "";
                  if(setOpenReply !== undefined ){
                    setOpenReply(false);
                  }
                  refetch();
              } else {
                  handleSnackbaraVariant('error')
              }
          })
        }
    return (
        <ReplyWriter
            replyId={replyId}
            doCreateReply={doCreateReply}
            admin_flag={admin_flag}
        />
    )
}

export default ReplyWriterContainer;