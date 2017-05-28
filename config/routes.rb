Rails.application.routes.draw do
  root 'home#index'

  get 'room/:room_name' => 'room_session#show'

  controller 'messages' do
    post 'transcript'
  end
end
