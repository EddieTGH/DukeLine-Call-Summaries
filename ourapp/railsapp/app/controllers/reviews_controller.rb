# app/controllers/reviews_controller.rb

require 'openai'

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

    # Combine all texts and instructions into a single prompt
    prompt = <<~PROMPT
      Imagine a therapist is providing data about one or more therapy sessions with a client. Here are some of the therapy session logs that have
       information on the background information of the client, what the client has struggled with in the past, what strategies are most effective, and what strategy are the least effective. The client prefers to remain anonymous, so please prefer to them as "The client".
       Please summarize their information in sections so that the therapist has a broad overview of who the client is, what they tend to struggle with, what therapy strategies typically work to combat their struggles, and what therapy strategies typically don't work to combat their struggles.
 
      1. Client Overview:
      Provide a brief overview of who the client is and the client's history. 
      Use this data and only this data:
      #{background_infos}

      2. Client Struggles:
      Provide a brief summary of what the client has struggled with in the past, highlighting things that were mentioned most often in the beginning of the summary.
      Use this data and only this data:
      #{presenting_problems}

      3. Successful Strategies:
      Provide a brief summary of what strategies worked for the client, highlighting strategies that were mentioned most often and worked best in the beginning of the summary.
      Use this data and only this data:
      #{successful_techniques}

      4. Unsuccessful Strategies:
      Provide a brief summary of what strategies didn't work for the client, highlighting strategies that were mentioned most often and were the least effective in the beginning of the summary.
      Use this data and only this data:
      #{unsuccessful_techniques}

      Provide the summaries numbered as above without repeating the section titles.
    PROMPT

    # Initialize OpenAI client
    client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])

    summaries = {}

    begin
      response = client.chat(
        parameters: {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 600,
          temperature: 0.7
        }
      )

      if response && response['choices'] && response['choices'][0] && response['choices'][0]['message'] && response['choices'][0]['message']['content']
        content = response['choices'][0]['message']['content'].strip

        # Parse the response to extract summaries
        summaries = parse_summaries(content)

        render json: summaries
      else
        Rails.logger.error("OpenAI API response error: #{response.inspect}")
        render json: { error: 'Failed to generate summaries' }, status: :internal_server_error
      end
    rescue OpenAI::Client::RateLimitError => e
      Rails.logger.error("OpenAI API rate limit error: #{e.message}")
      render json: { error: 'Rate limit exceeded. Please try again later.' }, status: :too_many_requests
    rescue OpenAI::Error => e
      Rails.logger.error("OpenAI API error: #{e.message}")
      render json: { error: 'OpenAI API error' }, status: :internal_server_error
    rescue => e
      Rails.logger.error("Unexpected error: #{e.message}")
      render json: { error: 'Internal server error' }, status: :internal_server_error
    end
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

  def parse_summaries(content)
    summaries = {}
    # Simple parsing based on numbering
    content.scan(/^\s*(\d+)\.\s*(.*?)(?=^\s*\d+\.|\z)/m).each do |number, summary|
      case number.to_i
      when 1
        # Remove duplicate "Client Overview:" if present
        cleaned_summary = summary.sub(/^Client Overview:\s*/, '')
        summaries[:background_information_summary] = cleaned_summary.strip
      when 2
        # Remove duplicate "Client Struggles:" if present
        cleaned_summary = summary.sub(/^Client Struggles:\s*/, '')
        summaries[:presenting_problem_summary] = cleaned_summary.strip
      when 3
        # Remove duplicate "Successful Strategies:" if present
        cleaned_summary = summary.sub(/^Successful Strategies:\s*/, '')
        summaries[:successful_techniques_summary] = cleaned_summary.strip
      when 4
        # Remove duplicate "Unsuccessful Strategies:" if present
        cleaned_summary = summary.sub(/^Unsuccessful Strategies:\s*/, '')
        summaries[:unsuccessful_techniques_summary] = cleaned_summary.strip
      end
    end
    summaries
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
