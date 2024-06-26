import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import AddBoxIcon from '@material-ui/icons/AddBox'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import { Link, withRouter } from 'react-router-dom'

const Menu = withRouter(({ history }) => {
  const isActive = (path) => {
    if (history.location.pathname === path) {
      return { color: '#f99084', fontWeight: 'bold' }
    } else {
      return { color: '#efdcd5' }
    }
  }

  return (
    <AppBar position="static" style={{ backgroundColor: '#333' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Streamify
        </Typography>
        <div>
          <Link to="/">
            <IconButton aria-label="Home" style={isActive('/')}>
              <HomeIcon />
            </IconButton>
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!auth.isAuthenticated() ? (
            <span>
              <Link to="/signup">
                <Button style={isActive('/signup')}>Sign up</Button>
              </Link>
              <Link to="/signin">
                <Button style={isActive('/signin')}>Sign In</Button>
              </Link>
            </span>
          ) : (
            <span>
              <Link to="/media/new">
                <Button style={isActive('/media/new')}>
                  <AddBoxIcon style={{ marginRight: '8px' }} />
                  Add Media
                </Button>
              </Link>
              <Link to={`/user/${auth.isAuthenticated().user._id}`}>
                <Button style={isActive(`/user/${auth.isAuthenticated().user._id}`)}>
                  My Profile
                </Button>
              </Link>
              <Button
                color="inherit"
                onClick={() => {
                  auth.signout(() => history.push('/'))
                }}
              >
                Sign out
              </Button>
            </span>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
})

export default Menu
