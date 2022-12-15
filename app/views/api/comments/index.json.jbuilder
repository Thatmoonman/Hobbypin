
@comments.each do |comment|
    json.set! comment.id do
        json.extract! comment, :id, :text, :commenter_id, :pin_id
    end
end