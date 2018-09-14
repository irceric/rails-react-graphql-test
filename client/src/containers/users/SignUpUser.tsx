import * as React from 'react';
import { graphql, compose } from 'react-apollo';
import withMutationState from 'apollo-mutation-state';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

import RenderField from 'components/form/RenderField';
import SubmitField from 'components/form/SubmitField';
import {
  required,
  isEmail,
  isPhoneNumber,
  minLength,
  composeValidators,
} from 'components/form/validation';
import withFlashMessage from 'components/flash/withFlashMessage';

import SIGN_UP from 'graphql/users/signUpMutation.graphql';
import CURRENT_USER from 'graphql/users/currentUserQuery.graphql';

// typings
import { ApolloQueryResult } from 'apollo-client/core/types';
import { DataProxy } from 'apollo-cache';
import {
  FlashMessageVariables,
  SignUpMutation,
  SignUpMutationVariables,
  CurrentUserQuery,
  MutationState,
  MutationStateProps,
  User,
} from 'types';
import * as Styled from 'components/StyledComponents';
import InterestOptions from 'utils/interestOptions';

interface IProps {
  redirect: (path: string, message: FlashMessageVariables) => void;
  handleSubmit: (event: any) => void;
  signUp: (
    {  }: SignUpMutationVariables,
  ) => Promise<ApolloQueryResult<SignUpMutation>>;
  mutation: MutationState;
}

interface IState {
  page: number;
}

class SignUpUser extends React.Component<IProps, IState> {
  private signUpForm: any;

  constructor(props: IProps) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.state = {
      page: 0,
    };
  }

  private next() {
    this.setState((state) => ({
      page: Math.min(state.page + 1, 1),
    }));
  }

  private previous() {
    this.setState((state) => ({
      page: Math.max(state.page - 1, 0),
    }));
  }

  private async submitForm(values: any) {
    const { page } = this.state;
    const isLastPage = page === 1;
    if (isLastPage) {
      const { data: { signUp: payload } } = await this.props.signUp(values);
      if (!payload.errors && payload.currentUser && payload.currentUser.token) {
        window.localStorage.setItem('blog:token', payload.currentUser.token);
        this.props.redirect('/users/profile/edit', {
          notice: 'Welcome! You have signed up successfully.',
        });
      } else {
        this.signUpForm.form.change('password', '');
        this.signUpForm.form.change('password_confirmation', '');
        return payload.errors;
      }
    } else {
      this.next();
    }
  }

  public render() {
    const { mutation: { loading } } = this.props;
    const { page } = this.state;
    const isLastPage = page === 1;

    return (
      <div className="columns">
        <div className="column is-offset-2 is-8">
          <Form
            onSubmit={this.submitForm}
            validate={(values: any) => {
              const errors = {
                password: '',
              };

              if (
                values.password &&
                values.password_confirmation &&
                values.password !== values.password_confirmation
              ) {
                errors.password = 'Password MUST match';
              } else {
                return undefined;
              }

              return errors;
            }}
            ref={(input: any) => {
              this.signUpForm = input;
            }}
            render={({ handleSubmit }: any) => (
              <form onSubmit={handleSubmit}>
                {page === 0 && (
                  <div>
                    <Field
                      label="First Name"
                      name="first_name"
                      type="text"
                      component={RenderField}
                      validate={required}
                    />
                    <Field
                      label="Last Name"
                      name="last_name"
                      type="text"
                      component={RenderField}
                      validate={required}
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="text"
                      component={RenderField}
                      validate={composeValidators(required, isEmail)}
                    />
                    <Field
                      name="password"
                      type="password"
                      validate={composeValidators(required, minLength)}
                      component={RenderField}
                    />
                    <Field
                      name="password_confirmation"
                      label="Password confirmation"
                      type="password"
                      validate={composeValidators(required, minLength)}
                      component={RenderField}
                    />
                  </div>
                )}
                {page === 1 && (
                  <div>
                    <Field
                      label="Phone Number"
                      name="phone_no"
                      type="text"
                      component={RenderField}
                      validate={composeValidators(required, isPhoneNumber)}
                    />
                    <Field
                      label="Interest"
                      name="interest"
                      type="select"
                      options={InterestOptions}
                      component={RenderField}
                      validate={required}
                    />
                  </div>
                )}

                <Styled.ActionFooter>
                  {page > 0 && (
                    <button
                      type="button"
                      onClick={this.previous}
                      className="button is-primary"
                    >
                      « Previous
                    </button>
                  )}
                  {!isLastPage && (
                    <SubmitField
                      value="Next >>"
                      cancel={false}
                      loading={loading}
                    />
                  )}
                  {isLastPage && (
                    <SubmitField
                      value="Sign up"
                      cancel={false}
                      loading={loading}
                    />
                  )}
                  <Link to="/users/signin">Log in</Link>
                </Styled.ActionFooter>
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}

const withSignUp = graphql<
  SignUpMutation,
  SignUpMutationVariables & MutationStateProps
>(SIGN_UP, {
  props: ({ mutate, ownProps: { wrapMutate } }) => ({
    signUp(user: User) {
      return wrapMutate(
        mutate!({
          variables: { ...user },
          update: (
            store: DataProxy,
            { data: { signUp: { currentUser } } }: any,
          ): void => {
            if (!currentUser) return;
            const data = store.readQuery({
              query: CURRENT_USER,
            }) as CurrentUserQuery;
            data.currentUser = currentUser;
            store.writeQuery({ query: CURRENT_USER, data });
          },
        }),
      );
    },
  }),
});

export default compose(
  withMutationState({ wrapper: true, propagateError: true }),
  withSignUp,
  withFlashMessage,
)(SignUpUser);
