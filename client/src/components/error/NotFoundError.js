import React, { useEffect } from 'react';
import ErrorScreenTemplate from './ErrorScreenTemplate';
import { PageNotFound } from 'statics/images';
import { useHistory } from 'react-router-dom';


function NotFoundError() {
  const history = useHistory();

  useEffect(() => {
  });

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
        //   reset();
        }}
      />
    </>
  );
}

export default NotFoundError;
