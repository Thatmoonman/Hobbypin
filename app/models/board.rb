# == Schema Information
#
# Table name: boards
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  user_id     :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :text
#
class Board < ApplicationRecord
    validates :title, 
        length: { in: 3..25, messages: 'Board title must be between 3 and 25 characters' },
        uniqueness: { scope: :user_id, messages: 'You already have a board with that name' }
    validates :user_id, presence: true

    has_many :pinned_boards, dependent: :destroy
    has_many :pins, through: :pinned_boards

    belongs_to :user
end
