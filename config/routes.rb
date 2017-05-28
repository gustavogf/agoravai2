Rails.application.routes.draw do
  root 'home#index'

  mount ActionCable.server => '/cable'

  controller 'room_session' do
    get  '/room/:room_name' => :show,   as: :room
    post '/room/new'        => :create, as: :create_room
  end

  controller 'messages' do
    post 'transcript'
  end
end


