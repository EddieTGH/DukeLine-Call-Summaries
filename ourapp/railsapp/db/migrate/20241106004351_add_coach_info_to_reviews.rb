class AddCoachInfoToReviews < ActiveRecord::Migration[7.0]
  def change
    add_column :reviews, :coach_full_name, :string
    add_column :reviews, :coach_email_address, :string
  end
end
