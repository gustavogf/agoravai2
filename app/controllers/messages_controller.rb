class MessagesController < ApplicationController
  def index
  end

  def transcript
    user_name = params['user']
    content   = params['message']
    timestamp = params['timestamp']

    user    = User.find_or_create_by(name: user_name)
    message = Message.create(user: user, content: content)

    ActionCable.server.broadcast 'messages',
      message: message.content,
      nodes: Term.top_five,
      user: user_name,
      timestamp: timestamp

    head :ok
  end
end
