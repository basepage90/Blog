import ErrorScreenTemplate from './ErrorScreenTemplate';
import { Shhhhh } from 'statics/images';
import { useHistory } from 'react-router-dom';

const SecretError = () => {
  const history = useHistory();
  return (
    <>
      <ErrorScreenTemplate
        image={Shhhhh}
        message="TOP Secret π"
        reason="λΉκ³΅κ° ν¬μ€νΈλλλ€"
        reasonDesc="(Private Post)"
        buttonText="νμΌλ‘"
        onButtonClick={() => {
          history.push('/');
        }}
      />
    </>
  );
}

export default SecretError;