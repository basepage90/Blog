$(document).ready(function() {
    Kakao.init('c3399cefa864023dc0dd9737a09a0e98');
});


function logout(){
  deleteToken();
  
  // case1) 서비스연결끊기 : 약관동의만료 + 토큰만료
  Kakao.API.request({
    url: '/v1/user/unlink',
    success: function(response) {
      $(location).attr('href','/login');
    },
    fail: function(error) {
      $(location).attr('href','/login');
    },
  });
   
  // case2) 계정로그아웃	: 계정 로그아웃 + 토큰만료
  // $(location).attr('href', 'https://kauth.kakao.com/oauth/logout?client_id=17e2b41913f7f223f6c370c7cfe2d33b&logout_redirect_uri=http://wjkim.ddns.net:8080/login'); 
}

// Delete token by server
function deleteToken(){
  $.ajax({
    type:'post',
    url: "/deleteToken",
    contentType :'application/json'
  });
}
