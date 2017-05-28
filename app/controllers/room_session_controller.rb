class RoomSessionController < ApplicationController
  def show
    @room_name = params['room_name']
  end

  def create
    room = RoomSession.create(name: params['room_name'])
    redirect_to room_path(room.name)
  end
end

