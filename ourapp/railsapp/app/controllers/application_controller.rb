require 'rack_authenticator'
class ApplicationController < ActionController::Base
    # config.web_console.whiny_requests = false
    #skip_before_action :verify_authenticity_token

    def set_cors_headers
      #Temporary for local dev, proxy setup will remove the need for this
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
      headers['Access-Control-Request-Method'] = '*'
      headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    end


  end
