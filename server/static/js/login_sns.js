$(document).ready(function() {
    Kakao.init('c3399cefa864023dc0dd9737a09a0e98');
    
    var requestURL = $('.requestURL').val();
    $.ajax({
        type:'get',
        url: requestURL,
        contentType :'application/json',
        error:function(res){
        },
        success:function(data){
            Kakao.Auth.setAccessToken(data.access_token);
            var access_token = Kakao.Auth.getAccessToken()
            getLogin_kakao(access_token);
        }
    });

});

function getLogin_kakao(access_token){
    var url = '/getLogin/kakao'
    var data = {"access_token":access_token}
    data = JSON.stringify(data);
    $.ajax({
        type:'post',
        url: url,
        contentType :'application/json',
        data:data,
        error:function(res){
            $(location).attr('href', '/login');
            // alert(res.responseJSON.err);
        },
        success:function(data){
            $(location).attr('href', '/');
        }
    });
}