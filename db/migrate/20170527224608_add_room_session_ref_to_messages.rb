class AddRoomSessionRefToMessages < ActiveRecord::Migration[5.0]
  def change
    add_reference :messages, :room_session, foreign_key: true
  end
end
