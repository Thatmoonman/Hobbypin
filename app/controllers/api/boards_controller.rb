class Api::BoardsController < ApplicationController

    def create
        @board = Board.new(board_params)
        if @board.save
            render :show
        else
            render json: { errors: @board.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index
        @boards = Board.where(user_id: params[:id])
        render :index
    end

    def show
        @board = Board.find_by(id: params[:id])
        render :show
    end

    def update

    end

    def destroy

    end

    private

    def board_params
        params.require(:board).permit(:title, :user_id)
    end
end