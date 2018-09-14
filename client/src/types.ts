export type FlashMessageVariables = {
  notice?: string | null;
  error?: string | null;
};

export type FlashMessage = {
  type: string;
  text: string;
};

export type FlashMessageQuery = {
  message: FlashMessage;
};

export type MutationState = {
  loading: boolean;
  error: any;
  success: boolean;
};

export type MutationStateProps = {
  wrapMutate: (promise: Promise<any>) => Promise<any>;
};

export type RevokeTokenMutation = {
  revokeToken: {
    errors: any;
  };
};

export type SignInMutationVariables = {
  email: string;
  password: string;
};

export type SignInMutation = {
  signIn: {
    __typename: 'signInPayload';
    token?: string;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type CancelAccountMutation = {
  cancelAccount: {
    errors: any;
  };
};

export type CurrentUserQuery = {
  currentUser: User | null;
};

export type SignUpMutationVariables = {
  first_name: string;
  lastst_name: string;
  email: string;
  phone_no: string;
  interest: string;
  password: string;
  passwordConfirmation: string;
};

export type SignUpMutation = {
  signUp: {
    __typename: 'UserPayload';
    currentUser: {
      __typename: 'User';
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      phone_no: string;
      interest: string;
      token: string;
    } | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type UpdateUserMutationVariables = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_no?: string;
  interest?: string;
};

export type UpdateUserMutation = {
  updateUser: {
    __typename: 'UserPayload';
    user: UserForEditingFragment | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type GetUserForEditingQuery = {
  // Fetch the current user
  currentUser: UserForEditingFragment | null;
};

export type UserForEditingFragment = {
  __typename: 'User';
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  interest: string;
};

export type ValidationMessage = {
  __typename: 'ValidationMessage';
  field: string;
  message: string;
};

export type User = {
  __typename: 'User';
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  interest: string;
};
