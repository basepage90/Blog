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
            getSignin_kakao(access_token);
        }
    });

});

function getSignin_kakao(access_token){
    var url = '/getSignin/kakao'
    var data = {"access_token":access_token}
    data = JSON.stringify(data);
    $.ajax({
        type:'post',
        url: url,
        contentType :'application/json',
        data:data,
        error:function(res){
            alert(res.responseJSON.err);
            $(location).attr('href', 'http://wjk.ddns.net/');
        },
        success:function(data){
            $(location).attr('href', 'http://wjk.ddns.net/');
        }
    });
}