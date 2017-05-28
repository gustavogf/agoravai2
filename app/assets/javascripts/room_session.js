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
      $("#username").val(user)
      submitUserForm()
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

function play() {
  $(".wave-container").toggleClass("hide");
  if (recognizing) {
    window.recognition.stop();
    return;
  }
  final_transcript = '';
  window.recognition.start();
  start_timestamp = event.timeStamp;
}

var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;

$(document).ready(function(){
  $('.modal').modal();
  app.checkCookie();

  if (!('webkitSpeechRecognition' in window)) {
    console.log('browser does not support webkitSpeechRecognition');
  } else {
    window.recognition = new webkitSpeechRecognition();
    window.recognition.continuous = true;
    window.recognition.interimResults = true;
    window.recognition.lang = 'pt-BR';

    window.recognition.onstart = function() {
      recognizing = true;
    }

    window.recognition.onend = function() {
      recognizing = false;
    }

    window.recognition.onresult = function(event) {
      var interim_transcript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      if (final_transcript) {
        $.ajax({
          type: "POST",
          url: "/transcript",
          data: { user: app.getCookie("av_username"),
            message: final_transcript,
            timestamp: start_timestamp
          },
          success: function (data){
            console.log(data);
            final_transcript = '';
            //window.recognition.stop();
            //window.recognition.start();
            start_timestamp = event.timeStamp;
          },
          error: function(data) {
            return false;
          }
        })
      } //else if (interim_transcript) {
      //console.log('interim_transcript', interim_transcript);
      //}
    };
  }
});
