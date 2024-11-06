class Review < ApplicationRecord
  belongs_to :user

  # Optional: Add validation for date
  validates :date, presence: true
  validates :coach_full_name, presence: true
  validates :coach_email_address, presence: true
end
