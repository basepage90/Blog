$(document).ready(function() {
  
    var animating = false,
        submitPhase1 = 1000,
        submitPhase2 = 400,
        logoutPhase1 = 800,
        $login = $(".login"),
        $app = $(".app"),
        animating2= false,
        $signup = $(".signup");
    
    // validation - login
    function validator_login(email,password){
      // validate
      if ( email.length==0 ||password.length==0 ){
        return false;
      }
      return true
    }
        
    // signin button
    $(document).on("click", ".login__submit", function(e) {
      var email = document.getElementsByClassName("login__input").namedItem("email").value;
      var password = document.getElementsByClassName("login__input").namedItem("password").value;

      if (!validator_login(email,password)){
        return;
      }

      // animate
      if (animating) return;
      animating = true;
      var that = this;
      // ripple($(that), e);
      $(that).addClass("processing");

      // login
      var email = document.getElementById("email").value;
      var pw = document.getElementById("password").value;
      var url = '/getLogin'
      var data = {"email":email,"password":pw}
      data = JSON.stringify(data);
      setTimeout(function() {
        $.ajax({
            type:'post',
            url: url,
            contentType :'application/json',
            data:data,
            error:function(res){
              $(that).removeClass("processing");
              animating = false;
              var msg;
              if(res.responseJSON.err == 1 ){
                msg = '가입되지않은 이메일 입니다';
              }else if(res.responseJSON.err == 2 ) {
                msg = '이메일로 전송된 로그인 링크를 확인하세요';
              }else{
                msg = '이메일과 패스워드가 일치하지 않습니다';
              }
              $('.login__error-text').text(msg)
              $(".login__error").show();
            },
            success:function(data){
              $(that).addClass("success");
              setTimeout(function() {
                $login.hide();
                animating = false;
                $(that).removeClass("success processing");
                $(location).attr('href', '/');
              }, submitPhase2);
            }
        });

      }, submitPhase1);

    });

    // signup button
    $(document).on("click", ".entersignup", function(e) {
      $login.hide();
      $signup.show();
      $(".login__input").val(null)
    });
    
    // back signin
    $(document).on("click", ".signup__back img", function(e) {
      $signup.hide();
      $login.show();
      $(".signup__input").val(null)
      $('.signup__back img').css('filter','brightness(0)');
      $('.signup__back img').css('filter','invert(1)');
      $(".signup__succ").hide();
      $(".signup__back").css('animation-play-state','paused');
    });


    // validation - signup
    function validator(nickname,email,password,confirmpassword){
      // init validation 
      $(".signup__form").removeClass("was-validated");
      $(".signup__input")[0].setCustomValidity("");
      $(".signup__input")[1].setCustomValidity("");
      $(".signup__input")[2].setCustomValidity("");
      $(".signup__input")[3].setCustomValidity("");

      // define pattern
      var regexpNickname = /^(?=.*).{1,25}$/;
      var regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      var regexpPwd = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

      // null check
      if (nickname.length==0 || email.length==0 ||password.length==0 ||confirmpassword.length==0){
        $('.signup__form').addClass('was-validated');
        return false;
      }

      // validate nickname
      if( !regexpNickname.test(nickname) ){
        $('.signup__input[name="nickname"]')[0].setCustomValidity('Nickname은 1~25 자리로 입력해주세요');
        return false;
      }

      // validate email
      if( !regExpEmail.test(email) ){
        $('.signup__input[name="email"]')[0].setCustomValidity('Email 형식이 아닙니다');
        return false;
      }

      // validate password
      if (!regexpPwd.test(password)){
        $('.signup__input[name="password"]')[0].setCustomValidity('Password 는 영문+숫자+특수문자 조합으로 8~25 자리를 사용해야 합니다');
        return false;
      }

      // compare password with confirmpassword
      if (password != confirmpassword ){
        $('.signup__input[name="confirmpassword"]')[0].setCustomValidity('Password 와 일치하지 않습니다');
        return false;
      }
      return true
    }

    // signup button
    $(document).on("click", ".signup__submit", function(e) {
      
      var nickname = document.getElementsByClassName("signup__input").namedItem("nickname").value;
      var email = document.getElementsByClassName("signup__input").namedItem("email").value;
      var password = document.getElementsByClassName("signup__input").namedItem("password").value;
      var confirmpassword = document.getElementsByClassName("signup__input").namedItem("confirmpassword").value;
      
      if (!validator(nickname,email,password,confirmpassword)){
        return;
      }
      
      // animate
      if (animating2) return;
      animating2 = true;
      var that = this;
      $(that).addClass("processing");
      
      var url = '/signup'
      var data = {"nickname":nickname,"password":password,"email":email}
      data = JSON.stringify(data);
      setTimeout(function() {
        $.ajax({
          type:'post',
          url: url,
          contentType :'application/json',
          data:data,
          error:function(res){
            alert(res.responseJSON.err)
            $(that).removeClass("processing");
            animating2 = false;
            
          },
          success:function(data){
            
            $(".signup__input").val(null)
            
            $(that).addClass("success");

            setTimeout(function() {
              $login.hide();
              animating2 = false;
              $(that).removeClass("success processing");
              $('.signup__back img').css('filter','invert(0)');
              var msg = '회원가입이 완료되었습니다. 로그인 후 이용해주세요 :)';
              $('.signup__succ-text').text(msg)
              $(".signup__succ").show();
              $(".signup__back").css('animation-play-state','running');
            }, submitPhase2);
          }
        });
        
      }, submitPhase1);
      
    });
    
  });
    
    
    /******************** KAKAO API Section ********************/
    Kakao.init('c3399cefa864023dc0dd9737a09a0e98');

    function loginWithKakao() {
      Kakao.Auth.authorize({
        redirectUri: 'http://wjk.ddns.net:8080/login/kakao'
      })
    }
          
    