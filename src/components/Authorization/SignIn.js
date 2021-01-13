import React, { useEffect } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/actions';
import loading from '../../../public/img/loading.gif';
import * as allActions from '../../redux/actions';

const Authorization = () => {
  const dispatch = useDispatch();

  const signInSchema = Yup.object().shape({
    username: Yup.string()
      .required('Field is required'),
    password: Yup.string()
      .required('Field is required'),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  const history = useHistory();

  const { authorization: authorizationState } = useSelector((state) => state);

  const { signInErr } = useSelector((state) => state.errors);

  const tryToSignIn = (values) => {
    const { username, password } = values;
    signIn({ username }, { password })(dispatch);
  };

  useEffect(() => {
    if (authorizationState === 'finished') {
      history.push('/');
    }
  }, [authorizationState]);

  useEffect(() => () => dispatch(allActions.cleanStatus()), []);

  return (
    <div className="form">
      <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
        onSubmit={(values) => {
          tryToSignIn(values);
        }}
      >
        {(formik) => {
          const {
            errors,
            touched,
            isValid,
            dirty,
          } = formik;
          return (
            <div className="registration">
              <h1>Sign in</h1>
              <Form className="registration-form">

                <div className="form-row">
                  <label htmlFor="username">Username</label>
                  <Field
                    type="text"
                    name="username"
                    id="email"
                    autoComplete="on"
                    className={
                      errors.username && touched.username ? 'input-error' : null
                    }
                  />
                  <ErrorMessage name="username" component="span" className="error" />
                </div>

                <div className="form-row">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="on"
                    className={
                      errors.password && touched.password ? 'input-error' : null
                    }
                  />
                  <ErrorMessage
                    name="password" component="span" className="error"
                  />
                </div>

                <button type="submit"
                        disabled={!(dirty && isValid)}
                        className={!(dirty && isValid)
                          ? 'btn disabled-btn'
                          : 'btn'}>
                  Sign in
                </button>
              </Form>
              <Link className="form-link" to="/signup">Sign up</Link>

              <div className="info-block">
                {signInErr
                  ? <div className="error">Sign in error</div>
                  : ''
                }
                {authorizationState === 'requested'
                  ? <img className="loading-img" src={loading} alt="loading"/>
                  : ''
                }
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Authorization;
