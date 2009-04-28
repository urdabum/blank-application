class ItemsController < ApplicationController
  
  def index
		params[:item_type] ||= get_default_item_type
		@current_objects = get_items_list(params[:item_type])
		@paginated_objects = @current_objects.paginate(:per_page => get_per_page_value, :page => params[:page])
		respond_to do |format|
			format.html
			format.xml { render :xml => @current_objects }
			format.json { render :json => @current_objects }
			format.atom { render :template => "#{params[:item_type]}/index.atom.builder", :layout => false }
		end
  end

  def ajax_index
		params[:item_type] ||= get_default_item_type
		@current_objects = get_items_list(params[:item_type])
		@paginated_objects = @current_objects.paginate(:per_page => get_per_page_value, :page => params[:page])
    render :partial => "items/tab_list" , :layout => false
  end

	# TODO do something clean, this is too much, take a look in the view to understand ...
  def display_item_in_pop_up
    if params[:selected_item] == 'all' || params[:item_type] == 'all'
      params[:item_type] = 'all'
    end
    if params[:content] != 'all'
      params[:workspace_id] ||= session[:fck_item_type].classify.constantize.find(session[:fck_item_id]).workspaces.first.id
      @workspace = Workspace.find(params[:workspace_id])
      params[:selected_item] = get_default_item_type(@workspace) if params[:selected_item].nil? || params[:selected_item] == 'all'
      if !params[:workspace_id].to_s.blank?
        @current_objects = get_items_list(params[:selected_item], @workspace)
      else
         render :text => "No workspace"
      return
      end
    else
       @current_objects = get_items_list(params[:selected_item], nil)
    end
    render :layout => 'pop_up', :object => @current_objects
  end
end