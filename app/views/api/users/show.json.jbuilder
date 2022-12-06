json.user do
    json.extract! @user, :id, :email, :username, :age, :created_at, :updated_at
end