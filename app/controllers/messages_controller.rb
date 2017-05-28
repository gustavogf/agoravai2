class MessagesController < ApplicationController
  def index
  end

  def transcript
    binding.pry

    user_name = params['user']
    content = params['message']

    user = User.find_or_create_by(name: user_name)
    message = Message.create(user: user, content: content)

  end
end
