const InitKakao = () => {
    // kakaoSDK-access : window.Kakao
    if (window.Kakao) {
        //  initialization duplicate 방지
        if (!window.Kakao.isInitialized()) {
            // kakao.init(env.REACT_APP_KAKAO_KEY)
            window.Kakao.init('c3399cefa864023dc0dd9737a09a0e98');
        }
    }
}

export default InitKakao;