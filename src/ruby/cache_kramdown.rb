# frozen_string_literal: true

# Caches Kramdown results in .cache/
# Normally, Kramdown is invoked as needed (kramdown.rb), but this is
# going to be slow down builds significantly. By doing all Kramdown
# rendering beforehand, this cuts down the time from 70s to 10s.
require 'fileutils'
require 'digest'
require_relative 'renderer'

# This seems to default to US-ASCII in some environments, which causes
# errors in some sheets
Encoding.default_external = Encoding::UTF_8

def remove_frontmatter(input_string)
  input_string.sub(/\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)/m, '')
end

FileUtils.mkdir_p '.cache'

ARGV.each do |filepath|
  input = File.read(filepath)
  input = remove_frontmatter(input)
  digest = Digest::SHA2.hexdigest(input.strip)
  outfile = ".cache/#{digest}.html"
  output = Renderer.render(input: input)
  File.write(outfile, output)
end
