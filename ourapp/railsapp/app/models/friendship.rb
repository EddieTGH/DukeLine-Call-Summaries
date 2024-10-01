class Friendship < ApplicationRecord
  belongs_to :user
  belongs_to :friend, class_name: 'User'

  # Ensure uniqueness of a friendship pair
  validates :user_id, uniqueness: { scope: :friend_id, message: 'This friendship already exists' }

end
