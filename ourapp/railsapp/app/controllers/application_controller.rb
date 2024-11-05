# app/controllers/application_controller.rb

require 'rack_authenticator'

class ApplicationController < ActionController::Base
  # Skip CSRF verification for API requests
  skip_before_action :verify_authenticity_token

  # Set CORS headers for all requests
  before_action :set_cors_headers

  # Method to set CORS headers
  def set_cors_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
    headers['Access-Control-Request-Method'] = '*'
    headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  end
end
