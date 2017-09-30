import onmount from 'onmount'
import remove from 'dom101/remove'
import removeClass from 'dom101/remove-class'

import { getData } from '../helpers/data'
import { isDismissed } from '../helpers/dismiss'
import { isPreview } from '../helpers/preview'

onmount('[data-js-dismissable]', function () {
  const id = getData(this, 'js-dismissable').id || ''

  if (isPreview() || isDismissed(id)) {
    remove(this)
  } else {
    removeClass(this, '-hide')
  }
})
