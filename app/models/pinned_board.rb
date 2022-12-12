# == Schema Information
#
# Table name: pinned_boards
#
#  id         :bigint           not null, primary key
#  pin_id     :bigint           not null
#  board_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class PinnedBoard < ApplicationRecord
    validates :pin_id, :board_id, presence: true
    validates :pin_id, uniqueness: { scope: :board_id }

    belongs_to :pin
    belongs_to :board
end
