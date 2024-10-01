# Clear existing records if necessary
User.destroy_all
Post.destroy_all
Friendship.destroy_all

# Create some users with Hogwarts houses
alex = User.create(name: 'Alex', email: 'alex@example.com', house: 'Slytherin')
john = User.create(name: 'John', email: 'john@example.com', house: 'Hufflepuff')
sarah = User.create(name: 'Sarah', email: 'sarah@example.com', house: 'Ravenclaw')

# Create some posts for the users
Post.create(content: 'First post by Alex', user: alex)
Post.create(content: 'First post by John', user: john)
Post.create(content: 'Second post by Alex', user: alex)

# Establish friendships
Friendship.create(user: alex, friend: john)
Friendship.create(user: alex, friend: sarah)
Friendship.create(user: john, friend: sarah)

puts "Seed data created successfully!"