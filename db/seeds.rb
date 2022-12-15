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
    PinnedBoard.destroy_all
    User.destroy_all
    Pin.destroy_all
    Board.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    puts "demo user..."
    demo = User.create( 
      username: 'demoUser',
      email: 'demo.user@demo.io', 
      password: 'password',
      age: 1
    )
    profile_demo = URI.open("https://hobbypin-dev.s3.amazonaws.com/profilepics/pexels-alex-knight-2599244.jpg")
    demo.photo.attach(io: profile_demo, filename: "pexels-alex-knight-2599244.jpg")
    demo.save!

    pin_demo_1 = Pin.create(
      title: "Potted Cat",
      uploader_id: 1,
      description: "Awww, look at this little guy, he thinks he's catnip."
    )
    img_demo_1 = URI.open("https://hobbypin-dev.s3.amazonaws.com/cats/pexels-helena-lopes-1931367.jpg")
    pin_demo_1.photo.attach(io: img_demo_1, filename: "pexels-helena-lopes-1931367.jpg")
    pin_demo_1.save!

    pin_demo_2 = Pin.create(
      title: "Curtain Cat",
      uploader_id: 1,
      description: "Hide 'n Seek."
    )
    img_demo_2 = URI.open("https://hobbypin-dev.s3.amazonaws.com/cats/pexels-henda-watani-320014.jpg")
    pin_demo_2.photo.attach(io: img_demo_2, filename: "pexels-henda-watani-320014.jpg")
    pin_demo_2.save!

    pin_demo_3 = Pin.create(
      title: "Flowers in hand",
      uploader_id: 1,
      description: "Holding flowers."
    )
    img_demo_3 = URI.open("https://hobbypin-dev.s3.amazonaws.com/flowers/pexels-javon-swaby-1697912.jpg")
    pin_demo_3.photo.attach(io: img_demo_3, filename: "pexels-javon-swaby-1697912.jpg")
    pin_demo_3.save!

    foodSplashPin_1 = Pin.create(
      title: "red fruit",
      uploader_id: 1,
      description: "froooooot"
    )
    img_demo_4 = URI.open("https://hobbypin-dev.s3.amazonaws.com/splash_food/pexels-felipe-daza-3020318.jpg")
    foodSplashPin_1.photo.attach(io: img_demo_4, filename: "pexels-felipe-daza-3020318.jpg")
    foodSplashPin_1.save!

    travelSplashPin_1 = Pin.create(
      title: "summer coast",
      uploader_id: 1,
      description: "pretty coastline"
    )
    img_demo_5 = URI.open("https://hobbypin-dev.s3.amazonaws.com/splash_travel/pexels-ad-thiry-14268524.jpg")
    travelSplashPin_1.photo.attach(io: img_demo_5, filename: "pexels-ad-thiry-14268524.jpg")
    travelSplashPin_1.save!

    puts "user 1..."
    user_1 = User.create(
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    )
    profile_1 = URI.open("https://hobbypin-dev.s3.amazonaws.com/profilepics/pexels-al-d'vilas-5565783.jpg")
    user_1.photo.attach(io: profile_1, filename: "pexels-al-d'vilas-5565783.jpg")
    user_1.save!  

    pin_1_1 = Pin.create(
      title: "Sleepy Kitten...",
      uploader_id: 2,
      description: "So liddle, so sweepy."
    )
    img_1_1 = URI.open("https://hobbypin-dev.s3.amazonaws.com/cats/pexels-khangnht-_-nocte-9370681.jpg")
    pin_1_1.photo.attach(io: img_1_1, filename: "pexels-khangnht-_-nocte-9370681.jpg")
    pin_1_1.save!
    
    pin_1_2 = Pin.create(
      title: "Pink Rose",
      uploader_id: 2,
      description: "Pretty..."
    )
    img_1_2 = URI.open("https://hobbypin-dev.s3.amazonaws.com/flowers/pexels-jonas-kakaroto-736230.jpg")
    pin_1_2.photo.attach(io: img_1_2, filename: "pexels-jonas-kakaroto-736230.jpg")
    pin_1_2.save!
    
    pin_1_3 = Pin.create(
      title: "Galaxy",
      uploader_id: 2,
      description: "Space is scary..."
    )
    img_1_3 = URI.open("https://hobbypin-dev.s3.amazonaws.com/space/pexels-alex-andrews-816608.jpg")
    pin_1_3.photo.attach(io: img_1_3, filename: "pexels-alex-andrews-816608.jpg")
    pin_1_3.save!

    foodSplashPin_2 = Pin.create(
      title: "blue cookies",
      uploader_id: 2,
      description: "Cookies :)"
    )
    img_1_4 = URI.open("https://hobbypin-dev.s3.amazonaws.com/splash_food/pexels-luis-quintero-12811285.jpg")
    foodSplashPin_2.photo.attach(io: img_1_4, filename: "pexels-luis-quintero-12811285.jpg")
    foodSplashPin_2.save!

    travelSplashPin_2 = Pin.create(
      title: "autumnal drive",
      uploader_id: 2,
      description: "a welcome weave through autumn leaves"
    )
    img_1_5 = URI.open("https://hobbypin-dev.s3.amazonaws.com/splash_travel/pexels-francesco-ungaro-1526717.jpg")
    travelSplashPin_2.photo.attach(io: img_1_5, filename: "pexels-francesco-ungaro-1526717.jpg")
    travelSplashPin_2.save!
  
    puts "user two..."
    user_2 = User.create(
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    )
    profile_2 = URI.open("https://hobbypin-dev.s3.amazonaws.com/profilepics/pexels-cris-feliciano-1717673.jpg")
    user_2.photo.attach(io: profile_2, filename: "pexels-cris-feliciano-1717673.jpg")
    user_2.save!

    pin_2_1 = Pin.create(
      title: "aurora.",
      uploader_id: 3,
      description: "Aurora / wave of spectral light / nice indeed."
    )
    img_2_1 = URI.open("https://hobbypin-dev.s3.amazonaws.com/space/pexels-jack-redgate-3069875.jpg")
    pin_2_1.photo.attach(io: img_2_1, filename: "pexels-jack-redgate-3069875.jpg")
    pin_2_1.save!

    pin_2_2 = Pin.create(
      title: "moon.",
      uploader_id: 3,
      description: "Full or new / celestial rock / made of cheese."
    )
    img_2_2 = URI.open("https://hobbypin-dev.s3.amazonaws.com/space/pexels-kush-kaushik-2078126.jpg")
    pin_2_2.photo.attach(io: img_2_2, filename: "pexels-kush-kaushik-2078126.jpg")
    pin_2_2.save!
    
    pin_2_3 = Pin.create(
      title: "starscape.",
      uploader_id: 3,
      description: "Try to count / all the light at night / soon morning."
    )
    img_2_3 = URI.open("https://hobbypin-dev.s3.amazonaws.com/space/pexels-marco-milanesi-2670898.jpg")
    pin_2_3.photo.attach(io: img_2_3, filename: "pexels-marco-milanesi-2670898.jpg")
    pin_2_3.save!

    foodSplashPin_3 = Pin.create(
      title: "Pink Drinks",
      uploader_id: 3,
      description: "mmmmmmmmm"
    )
    img_2_4 = URI.open("https://hobbypin-dev.s3.amazonaws.com/splash_food/pexels-nataliya-vaitkevich-10477138.jpg")
    foodSplashPin_3.photo.attach(io: img_2_4, filename: "pexels-nataliya-vaitkevich-10477138.jpg")
    foodSplashPin_3.save!

    travelSplashPin_3 = Pin.create(
      title: "Winter Lake",
      uploader_id: 3,
      description: "snowy lake front"
    )
    img_2_4 = URI.open("https://hobbypin-dev.s3.amazonaws.com/splash_travel/pexels-luca-chiandoni-3375674.jpg")
    travelSplashPin_3.photo.attach(io: img_2_4, filename: "pexels-luca-chiandoni-3375674.jpg")
    travelSplashPin_3.save!

    puts "user 3..."
    user_3 = User.create(
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    )
    profile_3 = URI.open("https://hobbypin-dev.s3.amazonaws.com/profilepics/pexels-karolina-grabowska-5420864.jpg")
    user_3.photo.attach(io: profile_3, filename: "pexels-karolina-grabowska-5420864.jpg")
    user_3.save!
    
    pin_3_1 = Pin.create(
      title: "CAT WITH HANDKERCHIEF!",
      uploader_id: 4,
      description: "AHHHH! SO CUTE!!!"
    )
    img_3_1 = URI.open("https://hobbypin-dev.s3.amazonaws.com/cats/pexels-lina-kivaka-1741205.jpg")
    pin_3_1.photo.attach(io: img_3_1, filename: "pexels-lina-kivaka-1741205.jpg")
    pin_3_1.save!
        
    pin_3_2 = Pin.create(
      title: "PUGS! I LOVE PUGS!!",
      uploader_id: 4,
      description: "AHHHH! SO SO CUTE!!!"
    )
    img_3_2 = URI.open("https://hobbypin-dev.s3.amazonaws.com/dogs/pexels-charles-1851164.jpg")
    pin_3_2.photo.attach(io: img_3_2, filename: "pexels-charles-1851164.jpg")
    pin_3_2.save!

    foodSplashPin_4 = Pin.create(
      title: "greenfork",
      uploader_id: 4,
      description: "THE GREENEST FORK"
    )
    img_3_3 = URI.open("https://hobbypin-dev.s3.amazonaws.com/splash_food/pexels-pixabay-262896.jpg")
    foodSplashPin_4.photo.attach(io: img_3_3, filename: "pexels-pixabay-262896.jpg")
    foodSplashPin_4.save!

    travelSplashPin_4 = Pin.create(
      title: "cherry blossoms",
      uploader_id: 4,
      description: "pretty cherry blossoms"
    )
    img_3_4 = URI.open("https://hobbypin-dev.s3.amazonaws.com/splash_travel/pexels-taryn-elliott-4198572.jpg")
    travelSplashPin_4.photo.attach(io: img_3_4, filename: "pexels-taryn-elliott-4198572.jpg")
    travelSplashPin_4.save!
          
    puts 'user 4...'
    user_4 = User.create(
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    )
    profile_4 = URI.open("https://hobbypin-dev.s3.amazonaws.com/profilepics/pexels-polina-tankilevitch-3905781.jpg")
    user_4.photo.attach(io: profile_4, filename: "pexels-polina-tankilevitch-3905781.jpg")
    user_4.save!

    pin_4_1 = Pin.create(
      title: "winky dog",
      uploader_id: 5,
      description: "a dog thats winking"
    )
    img_4_1 = URI.open("https://hobbypin-dev.s3.amazonaws.com/dogs/pexels-dominika-roseclay-2023384.jpg")
    pin_4_1.photo.attach(io: img_4_1, filename: "pexels-dominika-roseclay-2023384.jpg")
    pin_4_1.save!
    
    pin_4_2 = Pin.create(
      title: "white kitten",
      uploader_id: 5,
      description: "a kitten that is white"
    )
    img_4_2 = URI.open("https://hobbypin-dev.s3.amazonaws.com/cats/pexels-pixabay-45201.jpg")
    pin_4_2.photo.attach(io: img_4_2, filename: "pexels-pixabay-45201.jpg")
    pin_4_2.save!
    
    puts 'user 5...'
    user_5 = User.create(
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    )
    profile_5 = URI.open("https://hobbypin-dev.s3.amazonaws.com/profilepics/pexels-tara-winstead-8386366.jpg")
    user_5.photo.attach(io: profile_5, filename: "pexels-tara-winstead-8386366.jpg")
    user_5.save!

    pin_5_1 = Pin.create(
      title: "Sunflower",
      uploader_id: 6,
      description: "Some sunflowers that remind me of summer and that one time I met someone and they were amazing and they just reminded me of sunflowers but then I embarassed myself so I guess it wasn't a good memory but I just like the sunflowers."
    )
    img_5_1 = URI.open("https://hobbypin-dev.s3.amazonaws.com/flowers/pexels-pixabay-46216.jpg")
    pin_5_1.photo.attach(io: img_5_1, filename: "pexels-pixabay-46216.jpg")
    pin_5_1.save!
    
    pin_5_2 = Pin.create(
      title: "curly dog",
      uploader_id: 6,
      description: "A dog with curly hair that I really like.  I had a dog once. It didn't look like this one but it was a dog and it died and that made me very sad because I really liked that dog but this dog seems nice too."
    )
    img_5_2 = URI.open("https://hobbypin-dev.s3.amazonaws.com/dogs/pexels-hoy-1390784.jpg")
    pin_5_2.photo.attach(io: img_5_2, filename: "pexels-hoy-1390784.jpg")
    pin_5_2.save!

    foodSplashPin_5 = Pin.create(
      title: "yellow coffee",
      uploader_id: 6,
      description: "coffeecoffeecoffee yumyumyum"
    )
    img_5_3 = URI.open("https://hobbypin-dev.s3.amazonaws.com/splash_food/pexels-shvets-production-9743269.jpg")
    foodSplashPin_5.photo.attach(io: img_5_3, filename: "pexels-shvets-production-9743269.jpg")
    foodSplashPin_5.save!

    travelSplashPin_5 = Pin.create(
      title: "dunes",
      uploader_id: 6,
      description: "lookin for worms!"
    )
    img_5_4 = URI.open("https://hobbypin-dev.s3.amazonaws.com/splash_travel/pexels-vlada-karpovich-4449320.jpg")
    travelSplashPin_5.photo.attach(io: img_5_4, filename: "pexels-vlada-karpovich-4449320.jpg")
    travelSplashPin_5.save!

    puts 'board 1...'
    board_1 = Board.create!({
      user_id: demo.id,
      title: "CATS!!!"
    })
    
    PinnedBoard.create!({
      pin_id: pin_demo_1.id,
      board_id: board_1.id
    })

    PinnedBoard.create!({
      pin_id: pin_demo_2.id,
      board_id: board_1.id
    })

    puts 'board 2...'
    board_2 = Board.create!({
      user_id: demo.id,
      title: "pretty things"
    })

    PinnedBoard.create!({
      pin_id: pin_2_3.id,
      board_id: board_2.id
    })

    PinnedBoard.create!({
      pin_id: pin_5_1.id,
      board_id: board_2.id
    })

    puts "Done!"
  end