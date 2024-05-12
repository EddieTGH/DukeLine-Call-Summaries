# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Uncomment and modify the following lines according to your application's need.

# Create default admin user
# Admin.create!(username: 'admin', email: 'admin@example.com', password: 'securepassword')

# Add initial data for dropdowns or constants
# Status.create!([{ name: 'Active' }, { name: 'Inactive' }])

# Add other necessary seeds below...


# Clear the users table before seeding to avoid creating duplicates when you re-seed the database
User.destroy_all

# Create initial users
User.create([
  { name: "Alice Smith", email: "alice@example.com", age: 28 },
  { name: "Bob Jones", email: "bob@example.com", age: 34 },
  { name: "Carol White", email: "carol@example.com", age: 22 }
])
