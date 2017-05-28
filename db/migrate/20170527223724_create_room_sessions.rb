class CreateRoomSessions < ActiveRecord::Migration[5.0]
  def change
    create_table :room_sessions do |t|
      t.string :name
      t.timestamp :start_time
      t.timestamp :end_time
      t.integer :num_participants

      t.timestamps
    end
  end
end
