#/usr/bin/env ruby
input = $stdin.read

# Kramdown annotations
input = input.gsub(%r{\n\n\{: }, "\n{: ")

$stdout.write input
