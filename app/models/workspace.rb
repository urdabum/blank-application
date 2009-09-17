# == Schema Information
# Schema version: 20181126085723
#
# Table name: workspaces
#
#  id                 :integer(4)      not null, primary key
#  creator_id         :integer(4)
#  description        :text
#  title              :string(255)
#  state              :string(255)
#  created_at         :datetime
#  updated_at         :datetime
#  ws_items           :string(255)     default("")
#  ws_item_categories :string(255)     default("")
#  logo_file_name     :string(255)
#  logo_content_type  :string(255)
#  logo_file_size     :integer(4)
#  ws_available_types :string(255)     default("")
#

# This object deals with the link between users and items.
# Actually, an item is linked to a workspace (through the 'items' table)
# and an user too (through the 'users_workspaces' table, with a specific role).
#
class Workspace < ActiveRecord::Base

	# Relation N-1 with the 'users_workspaces' table
	has_many :users_workspaces, :dependent => :delete_all
	# Relation N-1 getting the roles linked to that workspace, through the 'users_workspaces' table
	has_many :roles, :through => :users_workspaces
	# Relation N-1 getting the users linked to that workspace, through the 'users_workspaces' table
	has_many :users, :through => :users_workspaces
	# Relation N-1 with the 'items' table
	has_many :items_workspaces, :dependent => :delete_all
	# Relation N-1 getting the different item types, through the 'items' table
	ITEMS.each do |item|
		has_many item.pluralize.to_sym, :source => :itemable, :through => :items_workspaces, :source_type => item.classify.to_s, :class_name => item.classify.to_s
	end
	# Relation N-1 getting the FeedItem objects, through the 'feed_sources' table
	has_many :feed_items, :through => :feed_sources
	# Relation 1-N to the 'users' table
	belongs_to :creator, :class_name => 'User'

	has_many :contacts_workspaces,:dependent => :destroy
  
	has_many :groups, :dependent => :delete_all

  has_many  :people,
            :through      => :contacts_workspaces,
            :source       => :contactable,
            :source_type  => "Person",
            :foreign_key => "contactable_id",
            :conditions   => "contacts_workspaces.contactable_type = 'Person'",
            :order => "people.email ASC"
          
	# Mixin method alloing to make easy search on the model
	acts_as_searchable :full_text_fields => [:title, :description],
					:conditionnal_attribute => []

	acts_as_authorizable

  # Paperclip attachment definition
	has_attached_file :logo,
    :default_url => "/images/logo.png",
    :url =>  "/uploaded_files/workspace/:id/:style/:basename.:extension",
    :path => ":rails_root/public/uploaded_files/workspace/:id/:style/:basename.:extension",
		:styles => { :medium => "450x100>", :thumb => "48x48>" }
  # Validation of the type of a attached file
  validates_attachment_content_type :logo, :content_type => ['image/jpeg','image/jpg', 'image/png', 'image/gif','image/bmp' ]
	# Validation of the size of a attached file
  validates_attachment_size :logo, :less_than => 2.megabytes
	# Validation of the prsence of these fields
	validates_presence_of :title, :description
	#
	validates_associated :users_workspaces
	# Validation of the uniqueness of users associated to that workspace
	validate :uniqueness_of_users
  # Validation of fields not in format of
  validates_not_format_of   :title, :with => /(#{SCRIPTING_TAGS})/
	# After Updation Save the associated Users in UserWorkspaces
	after_update  :save_users_workspaces

  # Scope getting the 5 last workspaces created
  named_scope :latest,
    :order => 'created_at DESC',
    :limit => 5

  # Method used for the validation of the uniqueness of users linked to the workspace
	def uniqueness_of_users #:nodoc:
	  new_users = self.users_workspaces.collect { |e| e.user }
	  new_users.size.times do
		  self.errors.add_to_base('Same user added twice') and return if new_users.include?(new_users.pop)
	  end
  end

  # Users of the workspace with the defined role
  #
	# This method retrieves the users of the given role in that workspace.
	#
  # Usage :
  # <tt>workspace.users_by_role('ws_admin')</tt>
  #
  # Parameters :
  # - role_name: String defining the role name (ex : 'superadmin', 'reader', ...)
	def users_by_role role_name
	  role = self.roles.find_by_name(role_name)
	  res = []
		if role
			# TODO find_by_mysql
			uw = UsersWorkspace.find(:all, :conditions => { :role_id => role.id, :workspace_id => self.id })
			uw.each do |e|
				res << e.user
			end
		end
		return res
  end

  # Method setting the item types available for that workspace
	#
	# This method will convert the Array given in parameters in an String, where
	# the different elements of this array are joined by ','.
	#
	# Parameters :
	# - params: Array of Strings defining the item types
	def ws_items= params
		self[:ws_items] = params.join(',')
	end

  # Method setting the item categories available for that workspace
	#
	# This method will convert the Array given in parameters in an String, where
	# the different elements of this array are joined by ','.
	#
	# Parameters :
	# - params: Array of Strings defining the item categories
	def ws_item_categories= params
		self[:ws_item_categories] = params.join(',')
	end

  # Method setting the available types available for that workspace
	#
	# This method will convert the Array given in parameters in an String, where
	# the different elements of this array are joined by ','.
	#
	# Parameters :
	# - params: Array of Strings defining the available types
	def ws_available_types= params
		self[:available_types] = params.join(',')
	end
	
	# Link the attributesof Users directly
	def new_user_attributes= user_attributes
	  #downcase_user_attributes(user_attributes)
	  user_attributes.each do |attributes| 
      users_workspaces.build(attributes) 
    end
  end

  # Check if the User is Associated with worksapce or not
  def existing_user_attributes= user_attributes
    #downcase_user_attributes(user_attributes)
    users_workspaces.reject(&:new_record?).each do |uw|
      attributes = user_attributes[uw.id.to_s]
      attributes ? uw.attributes = attributes : users_workspaces.delete(uw)
    end
  end

  # Save the workspace assocaitions for Users in UsersWorkspace
  def save_users_workspaces 
    users_workspaces.each do |uw| 
      uw.save(false) 
    end 
  end

  # will save contacts in contacts_workpsaces table and contact_ids = "Person_1,Person_2"
  def selected_contacts= contact_ids
    tmp = contact_ids.split(',') || []
    self.contacts_workspaces.each do |k|
      k.destroy unless tmp.delete(k.contactable_type+'_'+k.contactable_id.to_s)
    end
    tmp.each do |contact|
      if !ContactsWorkspace.exists?(:workspace_id => self.id, :contactable_id => contact.split('_')[1], :contactable_type => contact.split('_')[0])
        self.contacts_workspaces << contacts_workspaces.build(:workspace_id => self.id, :contactable_id => contact.split('_')[1], :contactable_type => contact.split('_')[0])
      end
    end
  end

  private
  def downcase_user_attributes(attributes)
    attributes.each { |value| value['user_login'].downcase! }
  end
  
end
