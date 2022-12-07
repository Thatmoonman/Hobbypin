@users.each do |user|
    json.set! user.id do
        json.extract! user, :id, :email, :username, :age, :created_at, :updated_at, :first_name, :last_name, :about, :preferred_pronouns, :img_url, :website
    end
end