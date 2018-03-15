/**
 * Lunr-based searching
 *
 * @example
 *
 *     <meta name="search:index" content="https://search.devhints.io/index.json">
 *
 *     s = new Search()
 *     s.inferFromMeta()
 *     s.search('hello').then(() => ...)
 *
 *     s.loadFromData({ index, store })
 */

class Search {
  constructor (opts) {
    const once = require('once')
    const Emitter = require('events')

    this.indexPath = opts && opts.index
    this.load = once(this.load)
    this.index = null
    this.store = null
    this.emitter = new Emitter()
  }

  load () {
    return this.loadRemote()
  }

  /**
   * Infers `indexPath` from meta tags.
   */

  inferFromMeta () {
    // Safeguard, in case we're not loaded in a browser context
    if (typeof document === 'undefined') return this

    const meta = document.querySelector('meta[name="search:index"]')
    if (!meta) return this

    const value = meta.getAttribute('content')
    this.indexPath = value
    return this
  }

  /**
   * Loads the search index remotely (via `indexPath`).
   */

  loadRemote () {
    return window.fetch(this.indexPath)
      .then(res => res.json())
      .then(data => {
        this.loadFromData(data)
      })
  }

  /**
   * Loads the search index locally.
   */

  loadFromData (data) {
    const lunr = require('lunr')

    const { index, store } = data
    this.index = lunr.Index.load(index)
    this.store = store
    this.emitter.emit('load')
  }

  /**
   * Waits until the data is loaded, then resolves.
   *
   * - When called when the data is still loading, it'll wait until the data is
   *   loaded.
   */

  loaded () {
    return new Promise((resolve, reject) => {
      if (this.index) return resolve(this)

      this.emitter.on('load', () => {
        resolve(this)
      })

      this.load()
    })
  }

  /*
   * Searches for keywords.
   */

  async search (keywords) {
    await this.loaded()
    const results = this.index.search(keywords)
    const fullResults = results.map(result => {
      return {
        ...result,
        object: this.store[result.ref]
      }
    })

    return fullResults
  }
}

/*
 * The primary instance
 */

const search = new Search().inferFromMeta()

/*
 * Export
 */

module.exports = {
  Search,
  search
}
