import React, { Component } from 'react'
import Typed from 'typed.js'

// Components
import Login from '../Login'

const TypedOptions = {
  strings: ['Welcome to Task Flow ^1000', 'Manage multiple projects ^1000', 'Keep track of deadlines ^1000', 'Stay in touch with clients ^1000'],
  typeSpeed: 50,
  loop: true,
  showCursor: false,
  backSpeed: 50
}

export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      showLogin: true
    }

    this.closeLoginModal = this.closeLoginModal.bind(this)
  }

  componentDidMount() {
    new Typed('#typed-element', TypedOptions)
  }

  closeLoginModal() {
    this.setState({ showLogin: false })
  }

  render() {
    const { showLogin } = this.state

    return (
      <div id="Home-container">
        <section id="Home-top" style={{ zIndex: showLogin ? '0' : '2' }}>
          <div id="Home-top-left">
            <h1 className="font-lobster">Task Flow</h1>
          </div>

          <div id="Home-top-right">
            <span id="Home-top-link" onClick={() => this.setState({ showLogin: !showLogin })}>
              Login
            </span>

            <span>|</span>

            <span id="Home-top-link">Register</span>
          </div>
        </section>

        <section id="Home-bottom" style={{ zIndex: showLogin ? '0' : '2' }}>
          <span id="typed-element" />
        </section>

        <Login closeFn={this.closeLoginModal} loginVisible={showLogin} />
      </div>
    )
  }
}
