class User < ApplicationRecord
    has_many :reviews, dependent: :destroy

    validates :caller_id, presence: true
  end
  