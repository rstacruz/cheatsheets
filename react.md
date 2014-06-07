---
title: React.js
layout: default
---

### Basic class

    React.createClass({
      render: function () {
        return (
          <div>Hello {this.props.name}</div>
        );
      }
    });

### Using

    var Component = React.createClass({ ... });

    var compo = React.renderComponent(Component(), mountnode);

### [API](http://facebook.github.io/react/docs/component-api.html)

    c.setState({ x: y });
    c.setProps({ .. });

    c.replaceProps({ .. });
    c.replaceState({ .. });

    c.getDOMNode()

    c.forceUpdate()
    c.isMounted()

### [Lifecycle](http://facebook.github.io/react/docs/component-specs.html)

    render: function()
    getInitialState: function()
    getDefaultProps: function()
    propTypes: {}
    mixins: []
    statics: { .. } /* static methods */
    displayName: '..'

    componentWillMount
    componentWillUpdate
    componentWillUnmount

    componentDidMount
    componentDidUpdate
    componentDidUnmount


### Initial states

    React.createClass({
      getInitialState: function () {
        return {data: []};
      },

      render: function () {
        return (
          <CommentList data={this.state.data} />
        );
      }
    });

### Default properties

    React.createClass({
      getDefaultProps: function () {
        return {name: ''};
      }
    );

### Before rendering

    React.createClass({
      componentWillMount: function () {
        $.get(this.props.url, function (data) {
          this.setState(data);
        });
      },

      render: function () {
        return (
          <CommentList data={this.state.data} />
        );
      }
    });

### Actions

    <form onSubmit={this.handleSubmit}>
      Name: <input ref="name">
    </form>

    React.createClass({
      handleSubmit: function (event) {
        name = this.refs['name'].getDOMNode().value;
        // see two-way binding below
      }
    })

### [Two-way binding](http://facebook.github.io/react/docs/two-way-binding-helpers.html)

    React.createClass({
      mixins: [React.addons.LinkedStateMixin],
      getInitialState: function() {
        return {value: 'Hello!'};
      },
      render: function() {
        return <input type="text" valueLink={this.linkState('value')} />;
      }
    });
    // LinkedStateMixin adds a method to your React component called
    // linkState(). 

### Lists

    var TodoList = React.createClass({
      render: function() {
        var createItem = function(itemText) {
          return <li>{itemText}</li>;
        };
        return <ul>{this.props.items.map(createItem)}</ul>;
      }
    });

### Class set

    render: function() {
      var cx = React.addons.classSet;
      var classes = cx({
        'message': true,
        'message-important': this.props.isImportant,
        'message-read': this.props.isRead
      });
      // same final string, but much cleaner
      return <div className={classes}>Great Scott!</div>;
    }

### Propagating properties to children

    var CheckLink = React.createClass({
      render: function() {
        // transferPropsTo() will take any props passed to CheckLink
        // and copy them to <a>
        return this.transferPropsTo(<a>{'√ '}{this.props.children}</a>);
      }
    });

### Mixins

    var TickTock = React.createClass({
      mixins: [SetIntervalMixin]
    }

    SetIntervalMixin = {
      componentWillMount: function() { .. }
    }

### [Reusable components](http://facebook.github.io/react/docs/reusable-components.html)

  * Prop validation
