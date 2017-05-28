Rails.application.config.assets.version = '1.0'

Rails.application.config.assets.precompile += %w(
  home.js
  home.scss
  room_session.js
  room_session.css
)

