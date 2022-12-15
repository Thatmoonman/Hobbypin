@boards.each do |board|
    json.set! board.id do
        json.extract! board, :id, :title, :user_id, :description
        json.length board.pins.length
        json.coverPhoto url_for(board.pins.first.photo) if board.pins.length > 0 
    end
end