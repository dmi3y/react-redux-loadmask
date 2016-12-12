import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import loadmaskStyles from './shared/styles'

class Loadmask extends Component {
  static propTypes = {
    showLoadmask: PropTypes.bool
  }

  render () {
    if (!this.props.showLoadmask) return <noscript />

    return (
      <div id='__react-redux-loadmask__' style={loadmaskStyles} />
    )
  }
}

function mapStateToProps (state) {
  return {
    showLoadmask: state.loadmaskReducer.showLoadmask
  }
}

export default connect(mapStateToProps)(Loadmask)
