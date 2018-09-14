import * as React from 'react';
import { graphql, compose } from 'react-apollo';
import withMutationState from 'apollo-mutation-state';
import { Form, Field } from 'react-final-form';

import withFlashMessage from 'components/flash/withFlashMessage';
import RenderField from 'components/form/RenderField';
import SubmitField from 'components/form/SubmitField';
import {
  required,
  isEmail,
  isPhoneNumber,
  composeValidators,
} from 'components/form/validation';
import USER_FOR_EDITING from 'graphql/users/userForEditingQuery.graphql';
import UPDATE_USER from 'graphql/users/updateUserMutation.graphql';
import CANCEL_ACCOUNT from 'graphql/users/cancelAccountMutation.graphql';
import InterestOptions from 'utils/interestOptions';

// typings
import { ApolloQueryResult } from 'apollo-client/core/types';
import {
  FlashMessageVariables,
  CancelAccountMutation,
  UpdateUserMutationVariables,
  UpdateUserMutation,
  GetUserForEditingQuery,
  MutationState,
  MutationStateProps,
  User,
} from 'types';

interface IProps {
  redirect: (path: string, message: FlashMessageVariables) => void;
  handleSubmit: (event: any) => void;
  cancelAccount: () => Promise<ApolloQueryResult<CancelAccountMutation>>;
  updateUser: (
    {  }: UpdateUserMutationVariables,
  ) => Promise<ApolloQueryResult<UpdateUserMutation>>;
  data: GetUserForEditingQuery;
  mutation: MutationState;
}

class EditUserProfile extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  private async submitForm(values: any) {
    const { data: { updateUser: { errors } } } = await this.props.updateUser(
      values,
    );
    if (!errors) {
      this.props.redirect('/users/profile/edit/', {
        notice: 'User was successfully updated',
      });
    } else {
      return errors;
    }
  }

  public render() {
    const { mutation: { loading }, data: { currentUser } } = this.props;

    return (
      <div className="edit-user-profile">
        <div className="columns">
          <div className="column is-offset-one-quarter is-half">
            <h1 className="title is-2">Edit profile</h1>
            <Form
              onSubmit={this.submitForm}
              initialValues={currentUser}
              render={({ handleSubmit, pristine }: any) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    label="First Name"
                    name="first_name"
                    type="text"
                    component={RenderField}
                    validate={required}
                    readonly
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
                  <SubmitField
                    loading={loading}
                    disabled={pristine}
                    value="Update"
                  />
                </form>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

const withUserForEditing = graphql(USER_FOR_EDITING, {
  options: () => ({
    fetchPolicy: 'network-only',
  }),
});

const withUpdateUser = graphql<
  UpdateUserMutation,
  UpdateUserMutationVariables & MutationStateProps
>(UPDATE_USER, {
  props: ({ mutate, ownProps: { wrapMutate } }) => ({
    updateUser(user: User) {
      return wrapMutate(mutate!({ variables: { ...user } }));
    },
  }),
});

const withCancelAccount = graphql<CancelAccountMutation>(CANCEL_ACCOUNT, {
  props: ({ mutate }) => ({
    cancelAccount() {
      return mutate!({});
    },
  }),
});

export default compose(
  withUserForEditing,
  withFlashMessage,
  withCancelAccount,
  withMutationState({ wrapper: true, propagateError: true }),
  withUpdateUser,
)(EditUserProfile);
