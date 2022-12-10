class Api::PinsController < ApplicationController

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

    
end