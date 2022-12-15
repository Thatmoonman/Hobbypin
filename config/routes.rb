Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    
    resources :users, only: [:create, :show, :update, :index] do
      resources :boards, only: [:index, :show]
      resources :pins, only: [:index, :show]
    end

    resources :boards, only: [:create, :update, :destroy] do
      resources :pinned_boards, only: [:index]
    end
    
    resources :pins, only: [:create, :update, :destroy] do
      resources :pinned_boards, only: [:index]
      resources :comments, only: [:index]
    end
    
    resources :pinned_boards, only: [:create]
    resource :pinned_boards, only: [:destroy]
    resources :comments, only: [:create, :update, :destroy]
    
    resource :session, only: [:show, :create, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"

end
