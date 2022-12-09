class EditBoard < ActiveRecord::Migration[7.0]
  def change
    add_column :boards, :description, :text
  end
end
