class ReviewsController < ApplicationController
    # GET /users/:user_id/reviews
    def index
      @user = User.find(params[:user_id])
      @reviews = @user.reviews
      render json: @reviews
    end
  
    # POST /users/:user_id/reviews
    def create
      @user = User.find(params[:user_id])
      @review = @user.reviews.new(review_params)
      if @review.save
        render json: @review, status: :created
      else
        render json: @review.errors, status: :unprocessable_entity
      end
    end
  
    # GET /reviews/:id
    def show
      @review = Review.find(params[:id])
      render json: @review
    end
  
    # PUT /reviews/:id
    def update
      @review = Review.find(params[:id])
      if @review.update(review_params)
        render json: @review
      else
        render json: @review.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /reviews/:id
    def destroy
      @review = Review.find(params[:id])
      @review.destroy
      head :no_content
    end
  
    private
  
    def review_params
      params.permit(
        :duration_call,
        :presenting_problem,
        :background_information,
        :successful_techniques,
        :unsuccessful_techniques,
        :additional_comments,
        :date,
        :coach_full_name,
        :coach_email_address
      )
    end
  end
  