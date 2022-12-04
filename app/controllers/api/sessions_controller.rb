class Api::SessionsController < ApplicationController

  def show
    if current_user
      @user = current_user
      render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(
      email: params[:email],
      password: params[:password]
    )
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
    end
  end

  def destroy
    return unless current_user
    
    logout! 
    render json: { message: 'success' }
  end
end
