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
import { registration } from '../../redux/actions';
import loading from '../../../public/img/loading.gif';
import * as allActions from '../../redux/actions';

const Registration = () => {
  const dispatch = useDispatch();

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const signInSchema = Yup.object().shape({
    name: Yup.string()
      .required('Field is required'),
    surname: Yup.string()
      .required('Field is required'),
    email: Yup.string().email().required('Field is required'),
    password: Yup.string()
      .required('Field is required'),
    invited_by: Yup.string()
      .required('Field is required'),
    country_key: Yup.string()
      .required('Field is required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid'),
  });

  const initialValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
    invited_by: '',
    country_key: '',
  };

  const { registration: registrationState } = useSelector((state) => state);

  const { registrationErr } = useSelector((state) => state.errors);

  const history = useHistory();

  const tryToRegister = (values) => {
    const {
      name,
      surname,
      email,
      password,
      phone,
      // eslint-disable-next-line camelcase
      invited_by,
      // eslint-disable-next-line camelcase
      country_key,
    } = values;
    registration({ email }, { password }, { name },
      { surname }, { phone }, { invited_by }, { country_key })(dispatch);
  };

  useEffect(() => {
    if (registrationState === 'finished') {
      setTimeout(() => history.push('/login'), 1000);
    }
  }, [registrationState]);

  useEffect(() => () => dispatch(allActions.cleanStatus()), []);

  return (
    <div className="form">
      <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
        onSubmit={(values) => {
          tryToRegister(values);
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
              <h1>Registration</h1>
              <Form className="registration-form">
                <div className="form-row">
                  <label htmlFor="name">Name</label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className={
                      errors.name && touched.name ? 'input-error' : null
                    }
                  />
                  <ErrorMessage name="name" component="span" className="error" />
                </div>

                <div className="form-row">
                  <label htmlFor="surname">Surname</label>
                  <Field
                    type="text"
                    name="surname"
                    id="surname"
                    className={
                      errors.surname && touched.surname ? 'input-error' : null
                    }
                  />
                  <ErrorMessage name="surname" component="span" className="error" />
                </div>

                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className={
                      errors.email && touched.email ? 'input-error' : null
                    }
                  />
                  <ErrorMessage name="email" component="span" className="error" />
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

                <div className="form-row">
                  <label htmlFor="phone">Phone number</label>
                  <Field
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="on"
                    className={
                      errors.phone && touched.phone ? 'input-error' : null
                    }
                  />
                  <ErrorMessage
                    name="phone" component="span" className="error"
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="invited_by">Invitation code</label>
                  <Field
                    type="text"
                    name="invited_by"
                    id="invited_by"
                    autoComplete="on"
                    className={
                      errors.invited_by && touched.invited_by ? 'input-error' : null
                    }
                  />
                  <ErrorMessage
                    name="invited_by" component="span" className="error"
                  />
                </div>

                <div className="form-row">
                  <p className="section-header">Choose country</p>

                  <label className="radio-label">
                    <Field className="radio-input" type="radio" name="country_key" value="RU" />
                    Russia
                  </label>
                </div>

                <button type="submit"
                  disabled={!(dirty && isValid)}
                  className={
                    !(dirty && isValid)
                      ? 'btn disabled-btn '
                      : 'btn'
                    } >
                  Sign up
                </button>

              </Form>
              <Link className="form-link" to="/login">Already have an account</Link>

              <div className="info-block">
                {registrationErr
                  ? <div className="error">Registration error</div>
                  : ''
                }
                {registrationState === 'requested'
                  ? <img className="loading-img" src={loading} alt="loading"/>
                  : ''
                }
                {registrationState === 'finished'
                  ? <div className="success">Registration success</div>
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

export default Registration;
