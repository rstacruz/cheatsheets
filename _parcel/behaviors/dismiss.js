import closest from 'dom101/closest'
import remove from 'dom101/remove'
import on from 'dom101/on'
import { getData } from '../helpers/data'
import onmount from 'onmount'
import * as Dismiss from '../helpers/dismiss'

/**
 * Dismiss button
 */

onmount('[data-js-dismiss]', function () {
  const parent = closest(this, '[data-js-dismissable]')
  const dismissable = getData(parent, 'js-dismissable')
  const id = (dismissable && dismissable.id) || ''

  on(this, 'click', (e) => {
    Dismiss.setDismissed(id)
    e.preventDefault()
    if (parent) remove(parent)
  })
})
