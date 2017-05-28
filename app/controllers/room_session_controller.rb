class RoomSessionController < ApplicationController
  def show
    @room = RoomSession.where(name: params['room_name']).first
    @users = @room.users
  end

  def create
    room = RoomSession.create(name: params['room_name'])
    redirect_to room_path(room.name)
  end

  def set_user
    user = User.where(name: params['username']).first_or_create
    room_sessions_user = RoomSessionsUser.where(user_id: user.id, room_session_id: params['room_session_id']).first_or_create

    respond_to do |format|
      format.json {
        render :json => {
          user_id: user.id,
          user_name: user.name,
          room_session_user_id: room_sessions_user.id,
          status: :ok
        }
      }
    end
  end
end

