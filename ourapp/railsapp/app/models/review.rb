class Review < ApplicationRecord
  belongs_to :user

  # Optional: Add validation for date
  validates :date, presence: true
end
