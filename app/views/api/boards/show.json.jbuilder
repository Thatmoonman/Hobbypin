json.board do
    json.extract! @board, :id, :title, :user_id, :description
end