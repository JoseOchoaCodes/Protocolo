/**
 * Created by adrian on 27/08/2018.
 */
import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, FormGroup, FormControl, ControlLabel, Button, Grid, Row, Col, Alert } from 'react-bootstrap';
import { userActions } from '../../actions/user'

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            boleta: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(this.state.boleta,this.state.password);
    }

    handleSubmit(e) {
        e.preventDefault();

        const { boleta, password } = this.state;
        const { dispatch } = this.props;
        console.log(this.props);
        if (boleta && password) {
            dispatch(userActions.login(boleta, password));
        }
    }
    
    render() {
        const { loggedIn, error } = this.props;
        let reDirect = loggedIn ? <Redirect to="/" push /> : '';
        const { boleta, password } = this.state;
        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={6}>
                        <Form horizontal onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Boleta
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="boleta" id="boleta" name="boleta" placeholder="Boleta" value={ boleta } onChange={this.handleChange} required />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Password
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="password" id="password" name="password" placeholder="Password" value={ password } onChange={this.handleChange}  required />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button bsStyle="primary" type="submit">Sign in</Button>
                                    {' '}or{' '}<Link to="/signup">Register</Link>
                                </Col>
                            </FormGroup>
                            {reDirect}
                        </Form>
                        {error && <Alert bsStyle="danger"><p>{error}</p></Alert>}
                    </Col>
                </Row>
              </Grid>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn, error } = state.authentication;
    return {
        loggedIn,
        error
    };
}

const connectedLoginForm = withRouter(connect(mapStateToProps)(LoginForm));
export { connectedLoginForm as  LoginForm };