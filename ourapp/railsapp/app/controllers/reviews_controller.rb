class ReviewsController < ApplicationController
    before_action :authorize_request
    before_action :set_review, only: [:show, :update, :destroy]
  
    def index
      reviews = @current_user.reviews
      render json: reviews
    end
  
    def show
      render json: @review
    end
  
    def create
      review = @current_user.reviews.new(review_params)
      if review.save
        render json: review, status: :created
      else
        render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      if @review.update(review_params)
        render json: @review
      else
        render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy
      @review.destroy
      head :no_content
    end
  
    private
  
    def set_review
      @review = @current_user.reviews.find(params[:id])
    end
  
    def review_params
      params.require(:review).permit(:duration_call, :presenting_problem, :background_information, :successful_techniques, :unsuccessful_techniques, :additional_comments)
    end
  
    def authorize_request
      @current_user = User.find_by(id: session[:user_id])
      render json: { error: 'Not authorized' }, status: :unauthorized unless @current_user
    end

    def statistics
        reviews = @current_user.reviews
        render json: {
          most_common_successful_technique: reviews.group(:successful_techniques).order('count_id DESC').count(:id).first,
          most_common_unsuccessful_technique: reviews.group(:unsuccessful_techniques).order('count_id DESC').count(:id).first,
          most_common_presenting_problem: reviews.group(:presenting_problem).order('count_id DESC').count(:id).first
        }
    end
  end
  