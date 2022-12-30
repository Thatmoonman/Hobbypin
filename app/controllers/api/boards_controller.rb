class Api::BoardsController < ApplicationController
    wrap_parameters include: Board.attribute_names

    def create
        @board = Board.new(board_params)
        if @board.save
            render :show
        else
            render json: { errors: @board.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index
        @boards = Board.where(user_id: params[:user_id])
        render :index
    end

    def show
        @board = Board.find_by(id: params[:id])
        if @board
            render :show
        else
            render json: { errors: "Board does not exist" }, status: :unprocessable_entity
        end
    end

    def update
        @board = Board.find_by(id: params[:id])
        if @board.update(board_params)
            render :show
        else
            board = board.new(board_params)
            render json: { errors: board.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        board = Board.find_by(id: params[:id])
        board.destroy
    end

    private

    def board_params
        params.require(:board).permit(:title, :user_id, :description)
    end
end