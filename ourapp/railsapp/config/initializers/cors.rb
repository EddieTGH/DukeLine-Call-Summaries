Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'vcm-43917.vm.duke.edu:3001', 'localhost:3001'
    # origins 'vcm-43917.vm.duke.edu:3001', 'vcm-43917.vm.duke.edu', 'https://api.replicate.com', 'alexskeleton.colab.duke.edu', "alexskeleton.colab.duke.edu:3001", "alexskeleton.colab.duke.edu:3000" # Replace with your frontend URL or '*' for any origin
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end
