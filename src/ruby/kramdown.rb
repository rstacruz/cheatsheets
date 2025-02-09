# frozen_string_literal: true

require_relative 'renderer'
puts Renderer.render(input: $stdin.read)
