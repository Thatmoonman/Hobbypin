# == Schema Information
#
# Table name: users
#
#  id                 :bigint           not null, primary key
#  email              :string           not null
#  username           :string           not null
#  age                :integer
#  password_digest    :string           not null
#  session_token      :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  first_name         :string
#  last_name          :string
#  about              :text
#  preferred_pronouns :string
#  img_url            :string
#  website            :string
#
require 'open-uri'
class User < ApplicationRecord
  has_secure_password

  validates :username, 
    uniqueness: true, 
    length: { in: 3..30, message: "Username must be between 3 and 30 characters" }, 
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "Username can't be an email" }
  validates :email, 
    uniqueness: true, 
    length: { in: 3..255, message: "Hmmm...that doesn't look like an email addess." }, 
    format: { with: URI::MailTo::EMAIL_REGEXP, message: "Hmmm...that doesn't look like an email addess." }
  validates :age, numericality: { greater_than: 0, message: "Oops you forgot to tell us how old you are."}, allow_nil: true
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255, message: "Your password is too Short! You need 6+ characters." }, allow_nil: true

  before_validation :ensure_session_token, :generate_default_pic

  has_one_attached :photo

  has_many :boards, dependent: :destroy
  has_many :pins,
    foreign_key: :uploader_id,
    class_name: :Pin,
    dependent: :destroy
  has_many :comments,
    foreign_key: :commenter_id,
    class_name: :Comment,
    dependent: :destroy
  has_many :commenters, through: :comments
  # has_many :commented_pins, through: :pins

  def self.find_by_credentials(email:, password:)
    user = User.find_by(email: email)
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

  def generate_default_pic
    unless self.photo.attached?
      file = URI.open("https://hobbypin-dev.s3.amazonaws.com/profilepics/pexels-alex-knight-2599244.jpg");
      self.photo.attach(io: file, filename: "default.jpg")
    end
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
