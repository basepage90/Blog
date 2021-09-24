import styled from 'styled-components'
import { BaseURL, ServerPort } from 'constants/AddressConstant'
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router";
import InitKakao from "util/initKakao";

const StSpan = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
`;

const SigninKakao = () => {

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const code = params.get("code");

    const getUrl = async () => {
        const apiClient = axios.create({
            baseURL: BaseURL + ServerPort,
            withCredentials: true,
          });
        const url = "/getRequestURL?code=" + code;
        await apiClient.get(url)
        .then( (response) => {
            // try
            getKakaoToken(response.data.requestURL)
        }).catch( (error) => {
            // catch
            window.location.replace('/');
        }).then( () => {
            // finally
        });
    }

    const getKakaoToken = async (requestURL: string) => {
        await axios.post(requestURL)
        .then( (response) => {
            // try
            window.Kakao.Auth.setAccessToken(response.data.access_token);
            var access_token = window.Kakao.Auth.getAccessToken()
            getLogin_kakao(access_token);
        }).catch( (error) => {
            // catch
        }).then( () => {
            // finally
        });
    }

    const getLogin_kakao = async (access_token: string) => {
        const url = BaseURL + ServerPort + "/doSignin/kakao"
        const formData = {"access_token":access_token}
        const config:any = { 
            headers: {"Content-Type": "application/json"},
            withCredentials: "true",
        };

        await axios.post(url,formData,config)
        .then( (response) => {
            window.location.replace('/');
        }).catch( (error) => {
            // catch
            // case1) 서비스연결끊기 : 약관동의만료 + 토큰만료
            window.Kakao.API.request({
            url: '/v1/user/unlink',
            success: function(response: any) {
                window.location.replace('/');
            },
            fail: function(error: any) {
                window.location.replace('/');
            },
        });
        }).then( () => {
            // finally
        });
    }

    useEffect(()=> {
        InitKakao();
        getUrl();
    })

    return (
        <StSpan>
            Working For Login...
        </StSpan>
    )
}

export default SigninKakao;