# frozen_string_literal: true

# Renders Markdown to HTML, emulating Jekyll 2 quirks.
module Renderer
  module_function

  KRAMDOWN_OPTIONS = {
    input: 'GFM',
    hard_wrap: false
  }.freeze

  def render(input:)
    require 'kramdown'

    new_input = input.to_s
      .gsub(/^{% ?raw ?%}\n/, '') # raw on its own line
      .gsub(/{% ?raw ?%}/, '') # inline in another line
      .gsub(/{% include (common\/[^ ]+) title="([^"]+)" %}/) {
        # a reduced subset of Jekyll includes
        title = $2
        file = $1
        filepath = Pathname.new("_includes/#{file}").cleanpath.to_s

        if filepath.start_with?("/") || filepath.start_with?(".")
          raise Errno::ENOENT, "Invalid include - #{filepath}"
        end

        if !File.exist?(filepath)
          raise Errno::ENOENT, "Cannot find include - #{filepath}"
        end

        data = File.read(filepath)
        data = data.gsub(/{{ include.title }}/m, title)
        data
      }
      .gsub(/^{% ?endraw ?%}\n/, '')
      .gsub(/{% ?endraw ?%}/, '')
      .gsub(/ {%- if 0 -%}{%- endif -%} /, '') # Used in jinja.md
      .gsub(/{%- raw -%}\n?/, '') # Used in jinja.md
    Kramdown::Document.new(new_input, KRAMDOWN_OPTIONS).to_html
  end
end
