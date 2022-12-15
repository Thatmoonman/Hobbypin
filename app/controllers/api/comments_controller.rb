
class Api::CommentsController < ApplicationController

    def create
        comment = Comment.new(comment_params)
        if comment.save
            redirect_to :index
        end
    end

    def index
        @comments = Comment.where(pin_id: params[:pin_id])
        render :index
    end

    def update
        @comment = Comment.find_by(id: params[:id])
        if @comment.update(comment_params)
            renderect_to :index
        end
    end

    def destroy
        comment = Comment.find_by(id: params[:id])
        comment.delete
    end

    private

    def comment_params
        params.require(:comment).permit(:text, :commenter_id, :pin_id)
    end
end