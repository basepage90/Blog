import ErrorScreenTemplate from './ErrorScreenTemplate';
import { PageNotFound } from 'statics/images';
import { useHistory } from 'react-router-dom';

const NotFoundError = () => {
  const history = useHistory();
  return (
    <>
      <ErrorScreenTemplate
        image={PageNotFound}
        message="DON'T CRY..."
        reason="It's just 404 Error"
        reasonDesc="(PageNotFound)"
        buttonText="홈으로"
        onButtonClick={() => {
          history.push('/');
        }}
      />
    </>
  );
}

export default NotFoundError;