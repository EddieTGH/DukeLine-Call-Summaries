class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token # Not recommended for production!

end