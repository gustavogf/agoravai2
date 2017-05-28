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
    recognizing = false;
    window.recognition.stop();
    return;
  }
  final_transcript = '';
  window.recognition.start();
  start_timestamp = event.timeStamp;
}

function draw(nodes) {
  // var nodes = null;
  var edges = null;
  var network = null;

  // create people.
  // value corresponds with the age of the person
  // nodes = [
    // {id: 1,  value: 1000,  label: 'Algie' },
    // {id: 2,  value: 31, label: 'Alston'},
    // {id: 3,  value: 12, label: 'Barney'},
    // {id: 4,  value: 16, label: 'Coley' },
    // {id: 5,  value: 17, label: 'Grant' },
    // {id: 6,  value: 15, label: 'Langdon'},
    // {id: 7,  value: 6,  label: 'Lee'},
    // {id: 8,  value: 5,  label: 'Merlin'},
    // {id: 9,  value: 30, label: 'Mick'},
    // {id: 10, value: 18, label: 'Tod'},
  // ];

  // create connections between people
  // value corresponds with the amount of contact between two people
  edges = [
    // {from: 2, to: 8, value: 3, title: '3 emails per week'},
    // {from: 2, to: 9, value: 5, title: '5 emails per week'},
    // {from: 2, to: 10,value: 1, title: '1 emails per week'},
    // {from: 4, to: 6, value: 8, title: '8 emails per week'},
    // {from: 5, to: 7, value: 2, title: '2 emails per week'},
    // {from: 4, to: 5, value: 1, title: '1 emails per week'},
    // {from: 9, to: 10,value: 2, title: '2 emails per week'},
    // {from: 2, to: 3, value: 6, title: '6 emails per week'},
    // {from: 3, to: 9, value: 4, title: '4 emails per week'},
    // {from: 5, to: 3, value: 1, title: '1 emails per week'},
    // {from: 2, to: 7, value: 4, title: '4 emails per week'}
  ];

  // Instantiate our network object.
  var container = document.getElementById('graph');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
    nodes: {
      shape: 'dot',
    }
  };
  network = new vis.Network(container, data, options);
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
      console.log('onstart');
      recognizing = true;
    }

    window.recognition.onend = function() {
      //recognizing = false;
      console.log('onend');
      if(recognizing)
        window.recognition.start();
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
        var date = new Date();
        $.ajax({
          type: "POST",
          url: "/transcript",
          data: { user: app.getCookie("av_username"),
            message: final_transcript,
            timestamp: date.getHours() + ':' + date.getMinutes()
          },
          success: function (data){
            //console.log(data);
            final_transcript = '';
            // draw(data.nodes);
            //window.recognition.stop();
            //window.recognition.start();
            //start_timestamp = event.timeStamp;
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

  draw([]);
});


