---
title: Models
category: Rails
---

### [QueryMethods](http://devdocs.io/rails/activerecord/querymethods)

```rb
items = Model
  .where(first_name: 'Harvey')
  .where('id = 3')
  .where('id = ?', 3)

  .order(:title)
  .order(title: :desc)
  .order("title DESC")

  .reorder(:title)  # discards other .order's
  .rewhere(...)     # discards other .where's

  .limit(2)
  .offset(1)
  .uniq
```

Advanced:

```rb
  .select(:id)
  .select([:id, :name])

  .group(:name)   # GROUP BY name
  .group('name AS grouped_name, age')
  .having('SUM(price) > 30')  # needs to be chained with .group

  .includes(:user)
  .includes(user: [:articles])

  .references(:posts)
  # .where("posts.name = 'foo'").references(:posts)
```

### [FinderMethods](http://devdocs.io/rails/activerecord/findermethods)

```rb
item = Model.find(id)
item = Model.find_by_email(email)
item = Model.where(email: email).first

Model
  .exists?(5)
  .exists?(name: "David")

  .first
  .last
  .find_nth(4, [offset])
```

### [Persistence](http://devdocs.io/rails/activerecord/persistence)

```rb
item.new_record?
item.persisted?
item.destroyed?

item.serialize_hash

item.save
item.save!      # Same as above, but raises an Exception

item.update  name: 'John'  # Saves immediately
item.update! name: 'John'


item.update_column  :name, 'John'  # skips validations and callbacks
item.update_columns  name: 'John'
item.update_columns! name: 'John'

item.touch                 # updates :updated_at
item.touch :published_at

item.destroy
item.delete  # skips callbacks
```

```rb
Model.create     # Same an #new then #save
Model.create!    # Same as above, but raises an Exception
```

### [AttributeAssignment](http://devdocs.io/rails/activerecord/attributeassignment)

```rb
item.attributes                      # #<Hash>

item.attributes = { name: 'John' }   # Merges attributes in. Doesn't save.
item.assign_attributes name: 'John'  # Same as above
```

### [Dirty](http://devdocs.io/rails/activemodel/dirty)

```rb
item.changed?
item.changed             # ['name']
item.changed_attributes  # { 'name' => 'Bob' } - original values
item.changes             # { 'name' => ['Bob', 'Robert'] }
item.previous_changes    # available after #save
item.restore_attributes

item.name = 'Robert'
item.name_was         # 'Bob'
item.name_change      # [ 'Bob', 'Robert' ]
item.name_changed?    # true
item.name_changed?(from: 'Bob', to: 'Robert')
```

### [Validations](http://devdocs.io/rails/activerecord/validations)

```rb
item.valid?
item.invalid?
```

### [Calculations](http://devdocs.io/rails/activerecord/calculations)

```rb
Person.count
Person.count(:age)    # counts non-nil's

Person.average(:age)
Person.maximum(:age)
Person.minimum(:age)
Person.sum('2 * age')

Person.calculate(:count, :all)
```

Advanced:

```
Person.distinct.count
Person.group(:city).count
```

Generating
----------

    $ rails g model User

Associations
------------

    belongs_to
    has_one
    has_many
    has_many :through
    has_one :through
    has_and_belongs_to_many

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

### belongs to

    belongs_to :author,
      :dependent      => :destroy    # or :delete

      :class_name     => "Person"
      :select         => "*"
      :counter_cache  => true
      :counter_cache  => :custom_counter
      :include        => "Book"
      :readonly       => true

      :conditions     => 'published = true'

      :touch          => true
      :touch          => :authors_last_updated_at

      :primary_key    => "name"
      :foreign_key    => "author_name"

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

    create_table :images do |t|
      t.references :post, :polymorphic => true
    end

### Dynamic attribute-based finders

    # Returns one record
    Person.find_by_name(name)
    Person.find_last_by_name(name)
    Person.find_or_create_by_name(name)
    Person.find_or_initialize_by_name(name)

    # Returns a list of recordns
    Person.find_all_by_name(name)

    # Add a bang to make it raise an exception
    Person.find_by_name!(name)

    # You may use `scoped` instead of `find`
    Person.scoped_by_user_name

Validation
----------

    class Person < ActiveRecord::Base

      validates :name,     presence: true

      validates :terms,    acceptance: true

      validates :email,    confirmation: true

      validates :slug,     uniqueness: true
      validates :slug,     uniqueness: { case_sensitive: false }
      validates :holiday,  uniqueness: { scope: :year, :message => "only once a year" }

      validates :code,     format: /regex/
      validates :code,     format: { with: /regex/ }

      validates :name,     length: { minimum: 2 }
      validates :bio,      length: { maximum: 500 }
      validates :password, length: { in: => 6..20 }
      validates :number,   length: { is: => 6 }

      validates :gender,   inclusion: %w(male female)
      validates :gender,   inclusion: { in: %w(male female) }
      validates :lol,      exclusion: %w(xyz)

      validates :points,   numericality: true
      validates :played,   numericality: { only_integer: true }
      # ... greater_than, greater_than_or_equal_to,
      # ... less_than, less_than_or_equal_to
      # ... odd, even, equal_to

      # Validate the associated records to ensure they're valid as well
      has_many :books
      validates_associated :books

      # Length (full enchalada)
      validates :content, length: {
        minimum:   300,
        maximum:   400,
        tokenizer: lambda { |str| str.scan(/\w+/) },
        too_short: "must have at least %{count} words",
        too_long:  "must have at most %{count} words" }

      # Multiple
      validates :login, :email, presence: true

      # Conditional
      validates :description, presence: true, if: :published?
      validates :description, presence: true, if: lambda { |obj| .. }

      validates :title, presence: true, on: :save   # :save | :create | :update
    end

### Custom validations

    class Person < ActiveRecord::Base
      validate :foo_cant_be_nil

      def foo_cant_be_nil
        errors.add(:foo, 'cant be nil')  if foo.nil?
      end
    end

### Errors

    record.errors.valid?      #=> false
    record.errors             #=> { :name => ["can't be blank"] }
    record.errors.messages    #=> { :name => ["can't be blank"] }

    record.errors[:name].any?

Other API
---------

### Callbacks

 * [Guides: callbacks](http://guides.rubyonrails.org/active_record_validations_callbacks.html)

### Mass updates

    # Updates person id 15
    Person.update 15, name: "John", age: 24
    Person.update [1,2], [{name: "John"}, {name: "foo"}]

### Joining

    Student.joins(:schools).where(:schools => { :type => 'public' })
    Student.joins(:schools).where('schools.type' => 'public' )

### Where interpolation

    where("name = ?", "John")
    where(["name = :name", { name: "John" }])

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
