class Api::PinsController < ApplicationController
    # wrap_parameters include: Pin.attribute_names + [:photo]

    def index
        if params[:user_id] == 'all'
            @pins = Pin.all
        else
            @pins = Pin.where(uploader_id: params[:user_id])
        end            
        render :index
    end

    def show
        @pin = Pin.find_by(id: params[:id])
        render :show
    end
    
    def create
        @pin = Pin.new(pin_params)
        if @pin.save
            render :show
        else   
            render json: @pin.errors.full_messages, status: 422
        end
    end

    def update
        @pin = Pin.find_by(id: params[:id])
        if @pin.update(pin_params)
            render :show
        else
            pin = Pin.new(pin_params)
            render json: { errors: pin.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def pin_params
        params.require(:pin).permit(:title, :description, :photo, :uploader_id)
    end
    
end