import useScript from "util/useScript";
import SigninKakao from "components/common/kakao/SigninKakao";

const SigninKakaoPage = () => {
    // useScript('https://developers.kakao.com/sdk/js/kakao.js');
    // useScript(process.env.PUBLIC_URL+'/kakaoSDK.js');
    return (
        <div style={{border: '1px solid red'}}>
        <SigninKakao />
        </div>
    )
}

export default SigninKakaoPage;