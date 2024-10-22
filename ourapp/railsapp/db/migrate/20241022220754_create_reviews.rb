class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :duration_call
      t.text :presenting_problem
      t.text :background_information
      t.text :successful_techniques
      t.text :unsuccessful_techniques
      t.text :additional_comments

      t.timestamps
    end
  end
end
