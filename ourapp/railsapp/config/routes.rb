# This is the end of the Rails application routes configuration.
# It marks the end of the block where routes are defined using the `draw` method.
# Any additional code should be placed after this line.
# config/routes.rb

# Rails.application.routes.draw do
#   resources :friendships
#   resources :posts do
#   # GET http://localhost:3000/posts/1 –– what user
#     get 'user_posts', on: :collection
#   end
#   resources :users
#   namespace :api do
#   end
# end

Rails.application.routes.draw do
  resources :users, only: [:index, :create, :show] do
    resources :reviews, only: [:index, :create] do
      collection do
        get 'summary'
      end
    end
  end

  resources :reviews, only: [:show, :update, :destroy]
end

# !Note from Alex: add this code if you want to work with the Sidekiq Web UI
# What is Sidekiq? Sidekiq is a background processing framework for Ruby. It uses threads to handle many jobs at the same time in the same process. It does not require Rails but will integrate tightly with Rails 3/4/5 to make background processing dead simple.  
# For Sidekiq Web UI
# require "sidekiq/web"
# mount Sidekiq::Web => "/sidekiq"
