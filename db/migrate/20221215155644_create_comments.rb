class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.text :text, null: false
      t.bigint :commenter_id, null: false, index: true
      t.references :pin, null: false, foreign_key: true, index: true
      

      t.timestamps
    end

    add_foreign_key :comments, :users, column: :commenter_id, primary_key: :id
  end
end
