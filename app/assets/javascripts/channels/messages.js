App.messages = App.cable.subscriptions.create('MessagesChannel', {
  received: function(data) {
    // $("#messages").removeClass('hidden')
    // return $('#messages').append(this.renderMessage(data));
    console.log(data);

    $('#messages-list').append(
      $('<li class="collection-item avatar">').append('<i class="material-icons circle"></i> <span class="title">' + data['user'] + '</span> <p>' + data['message'] + '</p> <span class="secondary-content">' + data['timestamp'] + '</span>'));
  },

  // renderMessage: function(data) {
  //   return "<p> <b>" + data.user + ": </b>" + data.message + "</p>";
  // }
});