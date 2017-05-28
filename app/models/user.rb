class User < ApplicationRecord
  has_many :messages
  has_many :room_sessions, through: :room_sessions_users
  has_many :room_sessions_users
end
