class CreateWalkers < ActiveRecord::Migration[7.0]
  def change
    create_table :walkers do |t|
      t.string :first_name
      t.string :last_name
      t.integer :salary

      t.timestamps
    end
  end
end
