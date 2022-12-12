# == Schema Information
#
# Table name: pins
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :text
#  uploader_id :bigint           not null
#
class Pin < ApplicationRecord
    validates :title, length: { in: 3..25, message: "Title must be between 3 and 25 characters." }
    validates :uploader_id, presence: true

    belongs_to :user,
        foreign_key: :uploader_id,
        class_name: :User
    
    has_many :pinned_boards
    has_many :boards through: :pinned_boards

    has_one_attached :photo

end
