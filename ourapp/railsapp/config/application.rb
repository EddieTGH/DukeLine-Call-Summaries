require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

# module Exampleapp
#   class Application < Rails::Application
#     # Initialize configuration defaults for originally generated Rails version.
    

#     # Configuration for the application, engines, and railties goes here.
#     #
#     # These settings can be overridden in specific environments using the files
#     # in config/environments, which are processed later.

    
#     #
#     # config.time_zone = "Central Time (US & Canada)"
#     # config.eager_load_paths << Rails.root.join("extras")
#   end
# end

# config/application.rb

module Exampleapp
  class Application < Rails::Application
    # ... other configurations ...
    config.load_defaults 7.0
    config.time_zone = 'Eastern Time (US & Canada)'
    
    # CORS configuration
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3001' # Your React app's origin

        resource '*',
                 headers: :any,
                 methods: [:get, :post, :put, :patch, :delete, :options, :head],
                 credentials: false
      end
    end
  end
end

