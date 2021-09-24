import ErrorScreenTemplate from './ErrorScreenTemplate';
import { Shhhhh } from 'statics/images';
import { useHistory } from 'react-router-dom';

const SecretError = () => {
  const history = useHistory();
  return (
    <>
      <ErrorScreenTemplate
        image={Shhhhh}
        message="TOP Secret 😎"
        reason="비공개 포스트랍니다"
        reasonDesc="(Private Post)"
        buttonText="홈으로"
        onButtonClick={() => {
          history.push('/');
        }}
      />
    </>
  );
}

export default SecretError;