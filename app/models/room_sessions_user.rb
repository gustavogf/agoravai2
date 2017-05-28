class RoomSessionsUser < ApplicationRecord
  belongs_to :room_session
  belongs_to :user
end
