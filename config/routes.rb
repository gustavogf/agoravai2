Rails.application.routes.draw do
  root 'home#index'

  mount ActionCable.server => '/cable'

  get 'room/:room_name' => 'room_session#show'

  controller 'messages' do
    post 'transcript'
  end
end
