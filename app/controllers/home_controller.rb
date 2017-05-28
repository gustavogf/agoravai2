class HomeController < ApplicationController
  def index
    @rooms = RoomSession.all
  end
end
