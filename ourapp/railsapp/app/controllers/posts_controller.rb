# app/controllers/posts_controller.rb

class PostsController < ApplicationController
  # Set up actions to run before certain controller methods
  before_action :set_post, only: [:show, :update, :destroy]
  before_action :set_user, only: [:user_posts]

  # GET /posts
  # Retrieves all posts from the database
  def index
    @posts = Post.all
    render json: @posts, status: :ok
  end

  # GET /posts/:id
  # Retrieves a specific post by its ID
  def show
    render json: @post, status: :ok
  end

  # GET /users/:user_id/posts
  # Retrieves all posts for a specific user
  def user_posts
    @posts = Post.where(user_id: params[:user_id])
    render json: @posts, status: :ok
  end

  # POST /posts
  # Creates a new post
  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/:id
  # Updates an existing post
  def update
    if @post.update(post_params)
      render json: @post, status: :ok
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/:id
  # Deletes a specific post
  def destroy
    @post.destroy
    head :no_content
  end

  private

  # Helper method to find a post by its ID
  def set_post
    @post = Post.find(params[:id])
  end

  # Helper method to find a user by their ID
  def set_user
    @user = User.find(params[:user_id])
  end

  # Defines which parameters are allowed when creating or updating a post
  def post_params
    params.require(:post).permit(:title, :content, :user_id)
  end
end