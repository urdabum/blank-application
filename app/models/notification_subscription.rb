class NotificationSubscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :notification_filter
end
