class CreateJoinTableUserRoomSessions < ActiveRecord::Migration[5.0]
  def change
    create_join_table :users, :room_sessions do |t|
      # t.index [:user_id, :room_session_id]
      # t.index [:room_session_id, :user_id]
    end
  end
end
