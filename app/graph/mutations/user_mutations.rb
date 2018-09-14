module UserMutations
  SignUp = GraphQL::Relay::Mutation.define do
    name "signUp"
    description "Sign up"

    input_field :first_name, types.String
    input_field :last_name, types.String
    input_field :email, types.String
    input_field :phone_no, types.String
    input_field :interest, types.String
    input_field :password, types.String
    input_field :password_confirmation, types.String

    return_field :user, UserType
    return_field :messages, types[FieldErrorType]

    resolve ->(obj, inputs, ctx) {
      user = User.new(inputs.to_params)

      if user.save
        user.update_tracked_fields(ctx[:request])
        user.generate_access_token!
        { user: user }
      else
        { messages: user.fields_errors }
      end
    }
  end

  Update = GraphQL::Relay::Mutation.define do
    name "updateUser"
    description "Update user"

    input_field :first_name, types.String
    input_field :last_name, types.String
    input_field :email, types.String
    input_field :phone_no, types.String
    input_field :interest, types.String

    return_field :user, UserType
    return_field :messages, types[FieldErrorType]

    resolve(Auth.protect ->(obj, inputs, ctx) {
      current_user = ctx[:current_user]

      if current_user.update(inputs.to_params)
        { user: current_user }
      else
        { messages: current_user.fields_errors }
      end
    })

  CancelAccount = GraphQL::Relay::Mutation.define do
    name "cancelAccount"
    description "Cancel Account"

    return_type types.Boolean

    resolve(Auth.protect ->(obj, inputs, ctx) {
      ctx[:current_user].destroy
      true
    })
  end
  end

end
