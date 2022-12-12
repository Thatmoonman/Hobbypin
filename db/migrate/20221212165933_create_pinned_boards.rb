class CreatePinnedBoards < ActiveRecord::Migration[7.0]
  def change
    create_table :pinned_boards do |t|
      t.references :pin, null: false, foreign_key: true
      t.references :board, null: false, foreign_key: true
      t.index [:pin_id, :board_id], unique: true

      t.timestamps
    end
    
  end
end
