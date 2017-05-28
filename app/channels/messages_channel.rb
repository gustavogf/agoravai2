class MessagesChannel < ApplicationCable::Channel
  def subscribed
    puts 'someone subscribed to messages'
    stream_from 'messages'
  end
end