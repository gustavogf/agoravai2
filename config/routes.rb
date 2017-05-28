Rails.application.routes.draw do
  root 'home#index'

  controller 'messages' do
    post 'transcript'
  end

end
