class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    else
      render json: { message: "no such user."}
    end
  end

  def index
    @users = User.all
    render :index
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user && @user.update(user_params)
      render :show
    else
      user = User.new(user_params)
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end


  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :age, :first_name, :last_name, :about, :preferred_pronouns, :img_url, :website, :photo)
  end
end
