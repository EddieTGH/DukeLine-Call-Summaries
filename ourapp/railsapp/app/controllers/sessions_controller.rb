class SessionsController < ApplicationController
  def create
    user = User.find_by(first_name: params[:first_name])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :ok
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end

  def destroy
    session.clear
    head :no_content
  end
end
