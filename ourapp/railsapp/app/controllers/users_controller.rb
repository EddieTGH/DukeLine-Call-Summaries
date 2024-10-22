# app/controllers/users_controller.rb

class UsersController < ApplicationController
  # Set up a filter to find the user before show, update, and destroy actions
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  # Retrieve all users from the database
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/:id
  # Show a specific user
  def show
    render json: @user
  end

  # POST /users
  # Create a new user
  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/:id
  # Update an existing user
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/:id
  # Delete a user
  def destroy
    @user.destroy
    head :no_content
  end

  private

  # Find a user by ID
  def set_user
    @user = User.find(params[:id])
  end

  # Define allowed parameters for user creation and update
  def user_params
    params.require(:user).permit(:first_name, :last_name, :password, :password_confirmation)
  end
end
