import React from 'react'
import Logo from './Logo'

const Header = () => {
  return (
    <header className="card">
      <nav className="navbar is-light" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <div className="logo"><Logo /></div>
            <div className="is-size-4 has-text-grey-dark has-text-right has-text-weight-bold">Soundboard</div>
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Header