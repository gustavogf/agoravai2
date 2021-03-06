# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170528125444) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "messages", force: :cascade do |t|
    t.string   "content"
    t.datetime "received_at"
    t.integer  "room_session_id"
    t.integer  "user_id"
    t.index ["room_session_id"], name: "index_messages_on_room_session_id", using: :btree
    t.index ["user_id"], name: "index_messages_on_user_id", using: :btree
  end

  create_table "room_sessions", force: :cascade do |t|
    t.string   "name"
    t.datetime "start_time"
    t.datetime "end_time"
    t.integer  "num_participants"
  end

  create_table "room_sessions_users", id: false, force: :cascade do |t|
    t.integer "user_id",         null: false
    t.integer "room_session_id", null: false
  end

  create_table "terms", force: :cascade do |t|
    t.string  "value"
    t.integer "message_id"
    t.index ["message_id"], name: "index_terms_on_message_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
  end

  add_foreign_key "messages", "room_sessions"
  add_foreign_key "messages", "users"
end
