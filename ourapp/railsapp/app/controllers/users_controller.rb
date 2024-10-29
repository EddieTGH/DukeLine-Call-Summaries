class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token

    # GET /users
    def index
      @users = User.all
      render json: @users
    end
  
    # POST /users
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end
  
    # GET /users/:id
    def show
      @user = User.find(params[:id])
      render json: @user
    end
  
    private
  
    def user_params
      params.permit(:email, :password, :first_name, :last_name)
    end
  end
  