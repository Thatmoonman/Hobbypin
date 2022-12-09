class EditPins < ActiveRecord::Migration[7.0]
  def change
    add_column :pins, :description, :text
    add_column :pins, :uploader_id, :bigint, null: false
    
    add_foreign_key :pins, :users, column: :uploader_id, primary_key: :id
  end
end
