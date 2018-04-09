import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../../reducers/auth'

class Login extends Component {
  constructor() {
    super()

    this.state = {
      username: 'jameslemire',
      password: '1234pass',
      selectedOption: 'concerts'
    }
  }

  render() {
    const { loginVisible, closeFn } = this.props
    const { username, password } = this.state

    return (
      <div id="Login-container" style={{ visibility: loginVisible ? 'visible' : 'hidden' }}>
        <div id="Login-mask" style={{ opacity: loginVisible ? '0.5' : '0' }} />

        <div id="Login-content" style={{ opacity: loginVisible ? '1' : '0' }}>
          <section id="Login-content-top">
            <span id="Login-close-btn" onClick={closeFn}>
              <i className="far fa-window-close" />
            </span>
          </section>

          <section id="Login-content-bottom">
            <input type="text" placeholder="Email / Username" value={username} onChange={e => this.setState({ username: e.target.value })} />
            <input type="password" placeholder="Password" value={password} onChange={e => this.setState({ password: e.target.value })} />
            <button onClick={() => this.props.login({ username, password })}>Login</button>
          </section>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('New redux state incoming:', state)
  return state
}

export default connect(mapStateToProps, { login })(Login)
