# == Schema Information
#
# Table name: pins
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Pin < ApplicationRecord
    validates :title, presence: true

    has_one_attached :photo
end
