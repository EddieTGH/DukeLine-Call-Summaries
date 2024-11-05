class DropAllTables < ActiveRecord::Migration[6.0]
  def change
    drop_table :reviews
    drop_table :users
  end
end