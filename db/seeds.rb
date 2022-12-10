# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    require 'open-uri'

    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Pin.destroy_all
    Board.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!( 
      username: 'demoUser',
      email: 'demo.user@demo.io', 
      password: 'password',
      age: 1
    )

    pin_1 = Pin.create(
      title: "Potted Cat",
      uploader_id: 1,
      description: "Awww, look at this little guy, he thinks he's catnip."
    )
    img_1 = URI.open("https://hobbypin-dev.s3.amazonaws.com/cats/pexels-helena-lopes-1931367.jpg")
    pin_1.photo.attach(io: img_1, filename: "pexels-helena-lopes-1931367.jpg")
    pin_1.save!

    pin_2 = Pin.create(
      title: "Curtain Cat",
      uploader_id: 1,
      description: "Hide 'n Seek."
    )
    img_2 = URI.open("https://hobbypin-dev.s3.amazonaws.com/cats/pexels-henda-watani-320014.jpg")
    pin_2.photo.attach(io: img_2, filename: "pexels-henda-watani-320014.jpg")
    pin_2.save!

    pin_3 = Pin.create(
      title: "Flowers in hand",
      uploader_id: 1,
      description: "Holding flowers."
    )
    img_3 = URI.open("https://hobbypin-dev.s3.amazonaws.com/flowers/pexels-javon-swaby-1697912.jpg")
    pin_3.photo.attach(io: img_3, filename: "pexels-javon-swaby-1697912.jpg")
    pin_3.save!


    
    puts "Creating demo user boards..."
    6.times do
      Board.create!({
        title: Faker::Adjective.unique.positive,
        user_id: 1
      })
    end
  
    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end
  
    puts "Done!"
  end