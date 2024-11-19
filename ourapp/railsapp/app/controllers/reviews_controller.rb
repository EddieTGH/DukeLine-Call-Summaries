# app/controllers/reviews_controller.rb

require 'openai' # Add this at the top

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

  # GET /users/:user_id/reviews/summary
  def summary
    @user = User.find(params[:user_id])
    @reviews = @user.reviews

    # Collect data from reviews
    background_infos = @reviews.pluck(:background_information).compact.join("\n")
    presenting_problems = @reviews.pluck(:presenting_problem).compact.join("\n")
    successful_techniques = @reviews.pluck(:successful_techniques).compact.join("\n")
    unsuccessful_techniques = @reviews.pluck(:unsuccessful_techniques).compact.join("\n")

    # Initialize OpenAI client
    client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])

    summaries = {}

    # Generate summaries for each field
    summaries[:background_information_summary] = generate_summary(client, background_infos, "Provide a brief overview of who the client is and the client's history.")
    summaries[:presenting_problem_summary] = generate_summary(client, presenting_problems, "Provide a brief summary of what the client has struggled with in the past.")
    summaries[:successful_techniques_summary] = generate_summary(client, successful_techniques, "Provide a brief summary of what strategies worked for the client.")
    summaries[:unsuccessful_techniques_summary] = generate_summary(client, unsuccessful_techniques, "Provide a brief summary of what strategies didn't work for the client.")

    render json: summaries
  end

  private

  def generate_summary(client, text, instruction)
    return "" if text.blank?

    prompt = "#{instruction}\n\n#{text}"

    response = client.chat(
      parameters: {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        temperature: 0.7
      }
    )

    if response && response['choices'] && response['choices'][0] && response['choices'][0]['message'] && response['choices'][0]['message']['content']
      return response['choices'][0]['message']['content'].strip
    else
      return ""
    end
  end

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
