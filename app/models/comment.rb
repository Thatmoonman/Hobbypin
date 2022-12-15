# == Schema Information
#
# Table name: comments
#
#  id           :bigint           not null, primary key
#  text         :text             not null
#  commenter_id :bigint           not null
#  pin_id       :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Comment < ApplicationRecord
    validates :text, length: { in: 5..100, message: "Message needs to be between 5 and 100 characters" }
    validates :commenter_id, :pin_id, presence: true

    belongs_to :commenter, 
        foreign_key: :commenter_id,    
        class_name: :User

    belongs_to :pin
    
end
