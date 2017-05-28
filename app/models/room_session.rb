class RoomSession < ApplicationRecord
  has_many :messages
  has_many :users, through: :room_sessions_users
  has_many :room_sessions_users
end