
class Api::PinnedBoardsController < ApplicationController

    def index
        if params[:board_id]
            board = Board.find_by(id: params[:board_id])
            @pins = board.pins
            render '/api/pins/index'
        elsif params[:pin_id]
            pin = Pin.find_by(id: params[:pin_id])
            @boards = pin.boards
            render '/api/boards/index'
        else
            render json: { error: 'something went wrong'}
        end
    end

    def show
        pinned_board = PinnedBoard.find_by(pin_id: 1, board_id: 1)
    end

    def create
        @pinned_board = PinnedBoard.new(pinned_boards_params)
        if @pinned_board.save
            redirect_to '/api/pins/show'
        end   
    end

    def destroy
        pinned_board = PinnedBoard.find_by(pin_id: params[:pin_id], board_id: params[:board_id])
        pinned_board.destroy
    end

    private

    def pinned_boards_params
        params.require(:pinned_board).permit(:pin_id, :board_id)
    end

end