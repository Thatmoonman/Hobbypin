# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  age             :integer
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  validates :username, 
    uniqueness: true, 
    length: { in: 3..30, message: "Username must be between 3 and 30 characters" }, 
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "Username can't be an email" }
  validates :email, 
    uniqueness: true, 
    length: { in: 3..255, message: "Invalid email" }, 
    format: { with: URI::MailTo::EMAIL_REGEXP, message: "Invalid email" }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255, message: "Invalid password" }, allow_nil: true

  before_validation :ensure_session_token

  def self.find_by_credentials(credential, password)
    user = credential.match(URI::MailTo::EMAIL_REGEXP) ? User.find_by(email: credential) : User.find_by(username: credential)
    if user && user.authenticate(password)
      user
    else
      nil
    end
  end

  def reset_session_token!
    self.session_token = User.generate_unique_session_token
    self.save!
    self.session_token
  end


  private

  def self.generate_unique_session_token
    while true
      session_token = SecureRandom.urlsafe_base64
      return session_token unless User.exists?(session_token)
    end
  end

  def ensure_session_token
    self.session_token ||= User.generate_unique_session_token
  end

end
