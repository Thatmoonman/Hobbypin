
@pins.each do |pin|
    json.set! pin.id do
        json.extract! pin, :id, :title, :uploader_id, :description
        json.photoUrl url_for(pin.photo)
        json.boards pin.boards.map { |board| board.id}
    end
end