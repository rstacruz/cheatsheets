# frozen_string_literal: true

require 'minitest/autorun'

require_relative 'renderer'

def run_test(input:, expected:, label:)
  label ||= (input[0...20]).to_s
  it(label) do
    output = Renderer.render(input: input)
    assert_equal(output.strip, expected.strip)
  end
end

describe 'Renderer' do
  it 'with react.md' do
    input = File.read('./react.md').split("---")[2].strip
    output = Renderer.render(input: input)
    refute_includes(output, %(%raw%))
    refute_includes(output, %(% raw %))
  end

  it 'With "{% include %}" tags' do
    input = ['{% include common/moment_format.md title="Moment" %}', 'This is some text'].join("\n")
    output = Renderer.render(input: input)
    assert_includes(output, %(<h2 class="-three-column" id="moment">Moment</h2>))
    assert_includes(output, %(<p>This is some text</p>))
  end

  run_test(
    label: 'Basic test',
    input: 'hola mundo',
    expected: '<p>hola mundo</p>'
  )

  run_test(
    label: 'H1',
    input: '# hola mundo',
    expected: %(<h1 id="hola-mundo">hola mundo</h1>)
  )

  run_test(
    label: 'H1 with class',
    input: "# hola mundo\n{: .heading}",
    expected: %(<h1 class="heading" id="hola-mundo">hola mundo</h1>)
  )

  run_test(
    label: 'With "{% raw %}" tags',
    input: ['{% raw %}', 'This is some text', '{% endraw %}'].join("\n"),
    expected: %(<p>This is some text</p>)
  )

  run_test(
    label: 'With "{%raw%}" tags',
    input: ['{%raw%}', 'This is some text', '{%endraw%}'].join("\n"),
    expected: %(<p>This is some text</p>)
  )

  run_test(
    label: 'With "{% raw %}" tags with new line',
    input: ['{% raw %}', 'This is some text', '{% endraw %}', 'next line'].join("\n"),
    expected: %(<p>This is some text\nnext line</p>)
  )

  run_test(
    label: 'With "{% raw %}" tags with 2 new lines',
    input: ['{% raw %}', 'This is some text', '{% endraw %}', '', 'next paragraph'].join("\n"),
    expected: %(<p>This is some text</p>\n\n<p>next paragraph</p>)
  )
end
