Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    
    resources :users, only: [:create, :show, :update, :index] do
      resources :boards, only: [:index, :show]
    end

    resources :boards, only: [:create, :update, :destroy]
    
    resource :session, only: [:show, :create, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"

end
