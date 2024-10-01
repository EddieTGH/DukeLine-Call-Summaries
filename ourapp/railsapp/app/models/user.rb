class User < ApplicationRecord
    has_many :posts, dependent: :destroy
    
    has_many :friendships
    has_many :friends, through: :friendships, source: :friend

    validates :email, presence: true, uniqueness: true
end
