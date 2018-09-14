UserType = GraphQL::ObjectType.define do
  name "User"
  description "An user entry, returns basic user information"

  field :id, !types.ID
  field :first_name, types.String, "The first name of this user"
  field :last_name, types.String, "The last name of this user"
  field :email, types.String,  "The email of this user"
  field :phone_no, types.String,  "The phone no of this user"
  field :interest, types.String,  "The interest of this user"
  field :created_at, types.String,  "The date this user created an account"
  field :token, types.String, "Access token" do
    resolve ->(user, args, ctx) {
      user.access_token
    }
  end 
end
