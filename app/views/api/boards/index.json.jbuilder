@boards.each do |board|
    json.set! board.id do
        json.extract! board, :id, :title, :user_id, :description
        json.coverPhoto url_for(board.pins.first.photo)
        json.length board.pins.length
    end
end