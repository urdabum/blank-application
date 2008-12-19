# == Schema Information
# Schema version: 20181126085723
#
# Table name: videos
#
#  id           :integer(4)      not null, primary key
#  user_id      :integer(4)
#  title        :string(255)
#  description  :text
#  state        :string(255)
#  file_path    :string(255)
#  encoded_file :string(255)
#  thumbnail    :string(255)
#  created_at   :datetime
#  updated_at   :datetime
#  tags         :string(255)
#

require 'heywatch'
require 'ftools'

class Video < ActiveRecord::Base
  acts_as_item
  acts_as_xapian :texts => [:title, :description, :tags, :file_path]
  	
  file_column :file_path
  
  validates_presence_of :file_path

  after_save  :encode_video
  
  def self.label
    "Video"
  end
  
  def encoded_file
    return super if attributes['encoded_file'] && File.exists?(RAILS_ROOT + '/public' + attributes['encoded_file'])
    nil
  end
  
  def set_encoded_file_path
    public_directory = "/video/#{self.id}/"
    self.update_attribute(:encoded_file, public_directory + 'video.flv')
    @dest_directory = RAILS_ROOT + '/public' + public_directory
  end
  
  def encode_video
    return false if !self.file_path_just_uploaded? || @encoding_in_progress
    @encoding_in_progress = true
    set_encoded_file_path
		VideoEncoder.new(self.id, self.file_path, @dest_directory)
  end
end

class VideoEncoder
  def initialize(*args)
    p args
    @video_id, @file_path, @dest_directory = args
    Thread.new do
       begin
				 HeyWatch::Base::establish_connection! :login => 'thinkdry', :password => 'thinkdry38'
         upload
         encode
         download
       rescue Exception => e
         require 'pp' ; p e; pp e.backtrace[0..20]
         raise e
       end
     end
  end
  
  private
  def upload
    @uploaded_video = HeyWatch::Video.create(:file => @file_path, :title => 'video') { |*args| true }
  end

  def encode
    @encoded_video = HeyWatch::Job.create(:video_id => @uploaded_video.id, :format_id => 31) { |*args| true }
  end
  
  def download
    File.makedirs(@dest_directory)
    @encoded_video.download(@dest_directory) { |*args| nil }
  end
end
