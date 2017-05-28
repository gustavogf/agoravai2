//= require_tree ./channels

var app = {
  setCookie: function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },

  getCookie: function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
    }
    return "";
  },

  checkCookie: function() {
    var user = this.getCookie("av_username");
    if (user == "") {
      $('#modal').modal('open');
    }
    else {
      console.log(user + " entrou")
    }
  }
}

function submitUserForm() {
  $.ajax({
    url: $('#user-name-form').prop('action'),
    type: $('#user-name-form').prop('method'),
    data: $('#user-name-form').serialize(),
    success: function(data) {
      app.setCookie("av_username", data.user_name, 2);
      $('#modal').modal('close');
      console.log(data.user_name + " entrou")
    }
  });
}

$(document).ready(function(){
  $('.modal').modal();
  app.checkCookie();
});
