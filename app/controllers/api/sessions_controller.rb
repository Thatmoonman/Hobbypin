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
      email = User.find_by(email: params[:email])
      if email.nil?
        render json: { errors: ['The Email account you entered does not belong to an account.']}, status: :unauthorized
      else
        render json: { errors: ['The Password you entered is incorrect.'] }, status: :unauthorized
      end
    end
  end

  def destroy
    return unless current_user
    
    logout! 
    render json: { message: 'success' }
  end
end
