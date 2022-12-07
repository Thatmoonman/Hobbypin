@boards.each do |board|
    json.set! board.id do
        board.extract! board, :title, :user_id
    end
end