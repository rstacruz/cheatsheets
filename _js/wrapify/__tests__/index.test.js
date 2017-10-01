/* eslint-env jest */
import wrapify from '../index'
import $ from 'jquery'

it('simple usage', run(`
  <div>
    <h2>simple usage<h2>

    <h3>install</h3>
    <p>(install)</p>

    <h3>usage</h3>
    <p>(usage)</p>
  </div>
`, $div => {
  expect($div.find('.h2-section .h3-section-list .h3-section').length).toEqual(2)
}))

it('h3 with class', run(`
  <div>
    <h3 class='-hello'>install</h3>
    <p>(install)</p>
  </div>
`, $div => {
  expect($div.find('div.h3-section.-hello').length).toEqual(1)
  expect($div.find('div.h3-section-list.-hello').length).toEqual(1)
}))

it('multiple h2s', run(`
  <div>
    <h2>multiple h2<h2>

    <h3>install</h3>
    <p>(install)</p>

    <h3>usage</h3>
    <p>(usage)</p>

    <h2>getting started<h2>

    <h3>first</h3>
    <p>(first)</p>

    <h3>second</h3>
    <p>(second)</p>
  </div>
`))

function run (input, fn) {
  return function () {
    const $div = $(input)
    wrapify($div[0])
    expect($div[0]).toMatchSnapshot()
    if (fn) fn($div)
  }
}
