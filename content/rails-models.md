---
title: Rails models
category: Rails
layout: 2017/sheet
---

Generating
----------

### Generating

    $ rails g model User

Using models
------------

### Query methods

```ruby
items = Model
  .where(first_name: 'Harvey')
  .where('id = 3')
  .where('id = ?', 3)
```

```ruby
  .order(:title)
  .order(title: :desc)
  .order("title DESC")
```

```ruby
  .reorder(:title)  # discards other .order's
  .rewhere(...)     # discards other .where's
```

```ruby
  .limit(2)
  .offset(1)
  .uniq
```

See: [QueryMethods](http://devdocs.io/rails/activerecord/querymethods)

### Advanced query methods

```ruby
items = Model
  .select(:id)
  .select([:id, :name])
```

```ruby
  .group(:name)   # GROUP BY name
  .group('name AS grouped_name, age')
  .having('SUM(price) > 30')  # needs to be chained with .group
```

```ruby
  .includes(:user)
  .includes(user: [:articles])
```

```ruby
  .references(:posts)
  # aka: .where("posts.name = 'foo'").references(:posts)
```

### Finder methods

```ruby
item = Model.find(id)
item = Model.find_by_email(email)
item = Model.where(email: email).first
```

```ruby
Model
  .exists?(5)
  .exists?(name: "David")
```

```ruby
  .first
  .last
  .find_nth(4, [offset])
```

See: [FinderMethods](http://devdocs.io/rails/activerecord/findermethods)

### Persistence

```ruby
item.new_record?
item.persisted?
item.destroyed?

item.serialize_hash
```

```ruby
item.save
item.save!      # Same as above, but raises an Exception
```

```ruby
item.update  name: 'John'  # Saves immediately
item.update! name: 'John'
```

```ruby
item.update_column  :name, 'John'  # skips validations and callbacks
item.update_columns  name: 'John'
item.update_columns! name: 'John'
```

```ruby
item.touch                 # updates :updated_at
item.touch :published_at
```

```ruby
item.destroy
item.delete  # skips callbacks
```

```ruby
Model.create     # Same an #new then #save
Model.create!    # Same as above, but raises an Exception
```

See: [Persistence](http://devdocs.io/rails/activerecord/persistence)

### Attribute Assignment

```ruby
item.attributes                      # #<Hash>
```

```ruby
item.attributes = { name: 'John' }   # Merges attributes in. Doesn't save.
item.assign_attributes name: 'John'  # Same as above
```

See: [AttributeAssignment](http://devdocs.io/rails/activerecord/attributeassignment)

### Dirty

```ruby
item.changed?
item.changed             # ['name']
item.changed_attributes  # { 'name' => 'Bob' } - original values
item.changes             # { 'name' => ['Bob', 'Robert'] }
item.previous_changes    # available after #save
item.restore_attributes
```

```ruby
item.name = 'Robert'
item.name_was         # 'Bob'
item.name_change      # [ 'Bob', 'Robert' ]
item.name_changed?    # true
item.name_changed?(from: 'Bob', to: 'Robert')
```

See: [Dirty](http://devdocs.io/rails/activemodel/dirty)

### Validations

```ruby
item.valid?
item.invalid?
```

See: [Validations](http://devdocs.io/rails/activerecord/validations)

### Calculations

```ruby
Person.count
Person.count(:age)    # counts non-nil's
```

```ruby
Person.average(:age)
Person.maximum(:age)
Person.minimum(:age)
Person.sum('2 * age')
```

```ruby
Person.calculate(:count, :all)
```

Advanced:

```ruby
Person.distinct.count
Person.group(:city).count
```

See: [Calculations](http://devdocs.io/rails/activerecord/calculations)

### Dynamic attribute-based finders

Given a field called `name`:
{: .-setup}

```ruby
# Returns one record
Person.find_by_name(name)
Person.find_last_by_name(name)
Person.find_or_create_by_name(name)
Person.find_or_initialize_by_name(name)
```

```ruby
# Returns a list of records
Person.find_all_by_name(name)
```

```ruby
# Add a bang to make it raise an exception
Person.find_by_name!(name)
```

```ruby
# You may use `scoped` instead of `find`
Person.scoped_by_user_name
```

Associations
------------

### Associations

- `belongs_to`
- `has_one`
- `has_many`
- `has_many :through`
- `has_one :through`
- `has_and_belongs_to_many`

### Has many

```ruby
belongs_to :parent, :foreign_key => 'parent_id' class_name: 'Folder'
has_many :folders, :foreign_key => 'parent_id', class_name: 'Folder'

has_many :comments,                -> { order('posted_on DESC') }
has_many :comments,    :include    => :author
has_many :people,      :class_name => "Person"
has_many :people,      :conditions => "deleted = 0"
has_many :tracks,                  -> { order(:position) }
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
```

### belongs to

```ruby
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
```

### Many-to-many

If you have a join model:
{: .-setup}

```ruby
class Programmer < ActiveRecord::Base
  has_many :assignments
  has_many :projects, :through => :assignments
end
```
{: data-line="2,3"}

```ruby
class Project < ActiveRecord::Base
  has_many :assignments
  has_many :programmers, :through => :assignments
end
```
{: data-line="2,3"}

```ruby
class Assignment
  belongs_to :project
  belongs_to :programmer
end
```
{: data-line="2,3"}

### Many-to-many (HABTM)

```ruby
has_and_belongs_to_many :projects
has_and_belongs_to_many :projects, :include => [ :milestones, :manager ]
has_and_belongs_to_many :nations, :class_name => "Country"
has_and_belongs_to_many :categories, :join_table => "prods_cats"
has_and_belongs_to_many :categories, :readonly => true
has_and_belongs_to_many :active_projects, :join_table => 'developers_projects', :delete_sql =>
"DELETE FROM developers_projects WHERE active=1 AND developer_id = #{id} AND project_id = #{record.id}"
```

### Polymorphic associations

```ruby
class Post
  has_many :attachments, as: :parent
end
```
{: data-line="2"}

```ruby
class Image
  belongs_to :parent, polymorphic: true
end
```
{: data-line="2"}

And in migrations:

```ruby
create_table :images do |t|
  t.references :post, polymorphic: true
end
```
{: data-line="2"}

Validation
----------

### Validation

```ruby
class Person < ActiveRecord::Base
```
{:.-setup}

```ruby
  # Presence
  validates :name,     presence: true
```
{: data-line="2"}

```ruby
  # Acceptance
  validates :terms,    acceptance: true
```

```ruby
  # Confirm
  validates :email,    confirmation: true
```

```ruby
  # Unique
  validates :slug,     uniqueness: true
  validates :slug,     uniqueness: { case_sensitive: false }
  validates :holiday,  uniqueness: { scope: :year, message: 'yearly only' }
```

```ruby
  # Format
  validates :code,     format: /regex/
  validates :code,     format: { with: /regex/ }
```

```ruby
  # Length
  validates :name,     length: { minimum: 2 }
  validates :bio,      length: { maximum: 500 }
  validates :password, length: { in: => 6..20 }
  validates :number,   length: { is: => 6 }
```

```ruby
  # Include/exclude
  validates :gender,   inclusion: %w(male female)
  validates :gender,   inclusion: { in: %w(male female) }
  validates :lol,      exclusion: %w(xyz)
```

```ruby
  # Numeric
  validates :points,   numericality: true
  validates :played,   numericality: { only_integer: true }
  # ... greater_than, greater_than_or_equal_to,
  # ... less_than, less_than_or_equal_to
  # ... odd, even, equal_to
```

```ruby
  # Validate the associated records to ensure they're valid as well
  has_many :books
  validates_associated :books
```

```ruby
  # Length (full options)
  validates :content, length: {
    minimum:   300,
    maximum:   400,
    tokenizer: lambda { |str| str.scan(/\w+/) },
    too_short: "must have at least %{count} words",
    too_long:  "must have at most %{count} words" }
```

```ruby
  # Multiple
  validates :login, :email, presence: true
```

```ruby
  # Conditional
  validates :description, presence: true, if: :published?
  validates :description, presence: true, if: lambda { |obj| .. }
```

```ruby
  validates :title, presence: true, on: :save   # :save | :create | :update
```

```ruby
end
```
{: .-setup}

### Custom validations

```ruby
class Person < ActiveRecord::Base
  validate :foo_cant_be_nil

  def foo_cant_be_nil
    errors.add(:foo, 'cant be nil')  if foo.nil?
  end
end
```
{: data-line="2"}

### Errors

```ruby
record.errors.valid?      # → false
record.errors             # → { :name => ["can't be blank"] }
record.errors.messages    # → { :name => ["can't be blank"] }
```

```ruby
record.errors[:name].any?
```

Other API
---------

### Callbacks

 * [Guides: callbacks](http://guides.rubyonrails.org/active_record_validations_callbacks.html)

### Mass updates

 ```ruby
# Updates person id 15
Person.update 15, name: "John", age: 24
Person.update [1,2], [{name: "John"}, {name: "foo"}]
```

### Joining

```ruby
# Basic joins
Student.joins(:schools).where(schools: { type: 'public' })
Student.joins(:schools).where('schools.type' => 'public' )
```

```ruby
# Multiple associations
Article.joins(:category, :comments)
```

```ruby
# Nested associations
Article.joins(comments: :guest)
```

```ruby
# SQL
Author.joins(
  'INNER JOIN posts ' +
  'ON posts.author_id = authors.id ' +
  'AND posts.published = "t"'
)
```

### Where interpolation

```ruby
where('name = ?', 'John')
where(['name = :name', { name: 'John' }])
```

### Serialize

```ruby
class User < ActiveRecord::Base
  serialize :preferences
end
```
{: data-line="2"}

```ruby
user = User.create(
  preferences: {
    'background' => 'black',
    'display' => 'large'
  }
)
```

You can also specify a class option as the second parameter that’ll raise an 
exception if a serialized object is retrieved as a descendant of a class not in 
the hierarchy.

```ruby
# Only Hash allowed!
class User < ActiveRecord::Base
  serialize :preferences, Hash
end
```
{: data-line="3"}

```ruby
# Reading it raises SerializationTypeMismatch
user = User.create(preferences: %w(one two three))
User.find(user.id).preferences
```

Other tricks
------------

### Overriding accessors

```ruby
class Song < ActiveRecord::Base
  # Uses an integer of seconds to hold the length of the song

  def length=(minutes)
    write_attribute(:length, minutes.to_i * 60)
  end

  def length
    read_attribute(:length) / 60
  end
end
```
{: data-line="4,8"}

See: <http://api.rubyonrails.org/classes/ActiveRecord/Base.html>

Callbacks
---------

- after_create
- after_initialize
- after_validation
- after_save
- after_commit
