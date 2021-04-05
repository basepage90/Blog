$(document).ready(function() {
  
    var animating = false,
        submitPhase1 = 1000,
        submitPhase2 = 400,
        logoutPhase1 = 800,
        $login = $(".login"),
        $app = $(".app"),
        animating2= false,
        $signup = $(".signup");
    
    function ripple(elem, e) {
      $(".ripple").remove();
      var elTop = elem.offset().top,
          elLeft = elem.offset().left,
          x = e.pageX - elLeft,
          y = e.pageY - elTop;
      var $ripple = $("<div class='ripple'></div>");
      $ripple.css({top: y, left: x});
      elem.append($ripple);
    };

    function ripple2(elem, e) {
      $(".ripple2").remove();
      var elTop = elem.offset().top,
          elLeft = elem.offset().left,
          x = e.pageX - elLeft,
          y = e.pageY - elTop;
      var $ripple = $("<div class='ripple2'></div>");
      $ripple.css({top: y, left: x});
      elem.append($ripple);
    };
    
    // signin button
    $(document).on("click", ".login__submit", function(e) {

      // animate
      if (animating) return;
      animating = true;
      var that = this;
      ripple($(that), e);
      $(that).addClass("processing");

      // login
      var id = document.getElementById("username").value;
      var pw = document.getElementById("password").value;
      var url = '/getLogin'
      var data = {"username":id,"password":pw}

      setTimeout(function() {
        $.ajax({
            type:'post',
            url: url,
            data:data,
            error:function(){

              $(that).removeClass("processing");
              animating = false;

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
    });

    // signup button
    $(document).on("click", ".signup__submit", function(e) {

      // animate
      if (animating2) return;
      animating2 = true;
      var that = this;
      ripple2($(that), e);
      $(that).addClass("processing");



      var username = document.getElementsByClassName("signup__input").namedItem("fullname").value;
      var password = document.getElementsByClassName("signup__input").namedItem("password").value;
      var email = document.getElementsByClassName("signup__input").namedItem("email").value;
      
      var url = '/signup'
      var data = {"username":username,"password":password,"email":email}
      setTimeout(function() {
        $.ajax({
            type:'post',
            url: url,
            data:data,
            error:function(){
              $(that).removeClass("processing");
              animating2 = false;
                // signup__error 에 에러내용 셋팅
                // $(".signup__error").show();

            },
            success:function(res){

              if (res.err == null){
                console.log(data.err)
                // $(that).addClass("success");
                setTimeout(function() {
                  $(that).removeClass("processing");
                  animating2 = false;
                  $signup.hide();
                  $login.show();
  
                  // $(location).attr('href', '/confimSignup');
                }, submitPhase2);

              } else{
                alert(res.err)
                $(that).removeClass("processing");
                animating2 = false;
                // signup__error 에 에러내용 셋팅
                // $(".signup__error").show();
              }
            }
        });

      }, submitPhase1);
     
    });
    
  });