ActionController::Routing::Routes.draw do |map|
  
  # Generated by Restful Authentification
  map.logout '/logout', :controller => 'sessions', :action => 'destroy'
  map.login '/login', :controller => 'sessions', :action => 'new'
  map.register '/register', :controller => 'users', :action => 'create'
  map.signup '/signup', :controller => 'users', :action => 'new'
  map.resources :users
  map.resource :session

  # TODO: Publishing, Bookmarks, Admin related controllers: rights...

  map.root :controller => 'account', :action => 'index'

  # Items are CMS component types
  # => Those items may be scoped to different resources
  def items_ressources(parent)
    [:items, :articles, :audios, :videos, :artic_files, :publications, :images].each do |name|
      parent.resources name, :member => {
        :rate => :any,
        :add_tag => :any,
        :remove_tag => :any,
        :comment => :any
      }
    end
    # Publication sources are private, but need to be scoped to import publication
    # into right workspace
    parent.resources :pubmed_sources
  end

  # Items created outside any workspace are private or fully public.
  # Items may be acceded by a list that gives all items the user can consult.
  # => (his items, the public items, and items in workspaces he has permissions)
  items_ressources(map)

  # Items in context of workspaces
  map.resources(:workspaces) { |workspaces| items_ressources(workspaces) }
  
  # Project management
  map.resources(:projects) do |projects|
    projects.resources :meetings do |meetings|
      meetings.resources :objectives
    end
  end
    
  # Install the default routes as the lowest priority.
  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end