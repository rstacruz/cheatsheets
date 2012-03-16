# This file exists to make this project Rack-compatible.
# You may delete it if you're not concerned about this.

require 'rubygems'  unless defined?(::Gem)

# Use Bundler if possible.
begin
  require 'bundler'
  Bundler.setup
rescue LoadError
  gem 'proton', '0.3.2'
end

# Optional: use the 'rack-cache' gem for cacheing.
if ENV['RACK_ENV'] == 'production'
  begin
    require 'rack/cache'
    use Rack::Cache
  rescue LoadError
  end
end

# Load Proton.
require 'proton/server'
Proton::Project.new File.dirname(__FILE__)
run Proton::Server
