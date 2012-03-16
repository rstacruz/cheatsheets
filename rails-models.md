title: Rails Models
----

### Generating models

    $ rails g model User

### Associations

    belongs_to
    has_one
    has_many
    has_many :through
    has_one :through
    has_and_belongs_to_many

    belongs_to :author,
      class_name: 'User',
      dependent: :destroy  // delete this

### Has many

    belongs_to :parent, :foreign_key => 'parent_id' class_name: 'Folder'
    has_many :folders, :foreign_key => 'parent_id', class_name: 'Folder'

    has_many :comments,    :order      => "posted_on"
    has_many :comments,    :include    => :author
    has_many :people,      :class_name => "Person"
    has_many :people,      :conditions => "deleted = 0"
    has_many :tracks,      :order      => "position"
    has_many :comments,    :dependent  => :nullify
    has_many :comments,    :dependent  => :destroy
    has_many :tags,        :as         => :taggable
    has_many :reports,     :readonly   => true
    has_many :subscribers, :through    => :subscriptions, class_name: "User", :source => :user
    has_many :subscribers, :finder_sql =>
        'SELECT DISTINCT people.* ' +
        'FROM people p, post_subscriptions ps ' +
        'WHERE ps.post_id = #{id} AND ps.person_id = p.id ' +
        'ORDER BY p.first_name'

### Many-to-many

If you have a join model:

    class Programmer < ActiveRecord::Base
      has_many :assignments
      has_many :projects, :through => :assignments
    end

    class Project < ActiveRecord::Base
      has_many :assignments
      has_many :programmers, :through => :assignments
    end

    class Assignment
      belongs_to :project
      belongs_to :programmer
    end

Or HABTM:

    has_and_belongs_to_many :projects
    has_and_belongs_to_many :projects, :include => [ :milestones, :manager ]
    has_and_belongs_to_many :nations, :class_name => "Country"
    has_and_belongs_to_many :categories, :join_table => "prods_cats"
    has_and_belongs_to_many :categories, :readonly => true
    has_and_belongs_to_many :active_projects, :join_table => 'developers_projects', :delete_sql =>
    "DELETE FROM developers_projects WHERE active=1 AND developer_id = #{id} AND project_id = #{record.id}"

### Polymorphic associations

    class Post
      has_many :attachments, :as => :parent
    end

    class Image
      belongs_to :parent, :polymorphic => true
    end

And in migrations:

    create_table :images do
      t.references :post, :polymorphic => true
    end

Validation
----------

    class Person < ActiveRecord::Base

      # Checkboxes
      validates :terms_of_service, :acceptance => true

      # Validate associated records
      has_many :books
      validates_associated :books

      # Confirmation (like passwords)
      validates :email, :confirmation => true

      # Format
      validates :legacy_code, :format => {
        :with    => /\A[a-zA-Z]+\z/,
        :message => "Only letters allowed"
      }

      # Length
      validates :name,     :length => { :minimum => 2 }
      validates :bio,      :length => { :maximum => 500 }
      validates :password, :length => { :in => 6..20 }
      validates :number,   :length => { :is => 6 }

      # Length (full enchalada)
      validates :content, :length => {
        :minimum   => 300,
        :maximum   => 400,
        :tokenizer => lambda { |str| str.scan(/\w+/) },
        :too_short => "must have at least %{count} words",
        :too_long  => "must have at most %{count} words"
      }
    end

      # Numeric
      validates :points,       :numericality => true
      validates :games_played, :numericality => { :only_integer => true }

      # Non empty
      validates :name, :presence => true
    
      # Multiple
      validate :login, :email, :presence => true
    end

### Custom validations

    class Person < ActiveRecord::Base
      validate :foo_cant_be_nil

      def foo_cant_be_nil
        errors.add(:foo, 'cant be nil')  if foo.nil?
      end
    end
      
API
---

    items = Model.find_by_email(email)
    items = Model.where(first_name: "Harvey")

    item = Model.find(id)

    item.serialize_hash
    item.new_record?

    item.create     # Same an #new then #save
    item.create!    # Same as above, but raises an Exception

    item.save
    item.save!      # Same as above, but raises an Exception

    item.update
    item.update_attributes
    item.update_attributes!

    item.valid?
    item.invalid?


http://guides.rubyonrails.org/active_record_validations_callbacks.html

### Mass updates

    # Updates person id 15
    Person.update 15, name: "John", age: 24
    Person.update [1,2], [{name: "John"}, {name: "foo"}]

### Joining

    Student.joins(:schools).where(:schools => { :type => 'public' })
    Student.joins(:schools).where('schools.type' => 'public' )

### Serialize

    class User < ActiveRecord::Base
      serialize :preferences
    end

    user = User.create(:preferences => { "background" => "black", "display" => large })

You can also specify a class option as the second parameter that’ll raise an 
exception if a serialized object is retrieved as a descendant of a class not in 
the hierarchy.

    class User < ActiveRecord::Base
      serialize :preferences, Hash
    end

    user = User.create(:preferences => %w( one two three ))
    User.find(user.id).preferences    # raises SerializationTypeMismatch

Overriding accessors
--------------------

    class Song < ActiveRecord::Base
      # Uses an integer of seconds to hold the length of the song

      def length=(minutes)
        write_attribute(:length, minutes.to_i * 60)
      end

      def length
        read_attribute(:length) / 60
      end
    end

 * http://api.rubyonrails.org/classes/ActiveRecord/Base.html

Callbacks
---------

    after_create
    after_initialize
    after_validation
    after_save
    after_commit
