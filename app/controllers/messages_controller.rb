class MessagesController < ApplicationController
  def index
  end

  def transcript
    user_name = params['user']
    content   = params['message']
    timestamp = params['timestamp']
    room_id   = params['room']

    user    = User.find_or_create_by(name: user_name)
    message = Message.create(user: user, content: content)
    room    = RoomSession.find(room_id)

    ActionCable.server.broadcast 'messages',
      message: message.content,
      nodes: room.terms.top_five,
      user: user_name,
      timestamp: timestamp

    head :ok
  end
end
