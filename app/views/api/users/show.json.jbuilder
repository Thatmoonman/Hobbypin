json.user do
    json.extract! @user, :id, :email, :username, :age, :first_name, :last_name, :about, :preferred_pronouns, :img_url, :website
    json.profilePic url_for(@user.photo)
end