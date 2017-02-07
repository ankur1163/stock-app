import React, { PropTypes as T } from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from '../utils/AuthService'



export class Login extends React.Component {
    
    
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }
  
  
  render() {
    const { auth } = this.props
    console.log("here's props",this.props)
    console.log("here's the auth",auth)
    return (
      <div>
        <h2>Login</h2>
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login2</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Login;