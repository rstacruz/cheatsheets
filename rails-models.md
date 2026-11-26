---
title: Rails models
subtitle: ActiveRecord model reference
category: Rails
intro: |
  Rails models wrap database tables with Active Record: associations, validations, queries, callbacks, and persistence.
links:
  - title: Active Record basics
    url: https://guides.rubyonrails.org/active_record_basics.html
  - title: Active Record query interface
    url: https://guides.rubyonrails.org/active_record_querying.html
  - title: ActiveRecord::Base API
    url: https://api.rubyonrails.org/classes/ActiveRecord/Base.html
tier: t3
last_verified_with: "Rails 8.1.4.1."
updated: 2026-11-26
---

Generating
----------

### Generating

```
$ rails g model User
```
<!-- {: data-highlight="rails g model"} -->

See: [Creating Active Record models](https://guides.rubyonrails.org/active_record_basics.html#creating-active-record-models)

Using models
------------

### Query methods

```ruby
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
  .distinct
```
<!-- {: data-highlight="where; order"} -->

See: [QueryMethods API](https://api.rubyonrails.org/classes/ActiveRecord/QueryMethods.html)

### Advanced query methods

```ruby
items = Model
  .select(:id)
  .select([:id, :name])

  .group(:name)   # GROUP BY name
  .group('name AS grouped_name, age')
  .having('SUM(price) > 30')  # needs to be chained with .group

  .includes(:user)
  .includes(user: [:articles])

  .references(:posts)
  # aka: .where("posts.name = 'foo'").references(:posts)
```
<!-- {: data-highlight="select; group; includes; references"} -->

See: [Selecting fields](https://guides.rubyonrails.org/active_record_querying.html#selecting-fields)

### Finder methods

```ruby
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
<!-- {: data-highlight="find; find_by_email; exists?"} -->

See: [FinderMethods API](https://api.rubyonrails.org/classes/ActiveRecord/FinderMethods.html)

### Persistence

```ruby
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

Model.create     # Same an #new then #save
Model.create!    # Same as above, but raises an Exception
```
<!-- {: data-highlight="save; update; touch; destroy"} -->

See: [Persistence API](https://api.rubyonrails.org/classes/ActiveRecord/Persistence.html)

### Attribute Assignment

```ruby
item.attributes                      # #<Hash>

item.attributes = { name: 'John' }   # Merges in; doesn't save
item.assign_attributes name: 'John'  # Same as above
```
<!-- {: data-highlight="assign_attributes"} -->

See: [AttributeAssignment API](https://api.rubyonrails.org/classes/ActiveModel/AttributeAssignment.html)

### Dirty

```ruby
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
<!-- {: data-highlight="changed?; name_was; previous_changes"} -->

See: [ActiveModel::Dirty API](https://api.rubyonrails.org/classes/ActiveModel/Dirty.html)

### Validations

```ruby
item.valid?
item.invalid?
```
<!-- {: data-highlight="valid?; invalid?"} -->

See: [Validations API](https://api.rubyonrails.org/classes/ActiveRecord/Validations.html)


### Calculations

```ruby
Person.count
Person.count(:age)    # counts non-nil's

Person.average(:age)
Person.maximum(:age)
Person.minimum(:age)
Person.sum('2 * age')

Person.calculate(:count, :all)

# Advanced:
Person.distinct.count
Person.group(:city).count
```
<!-- {: data-highlight="count; calculate"} -->

See: [Calculations API](https://api.rubyonrails.org/classes/ActiveRecord/Calculations.html)

Associations
------------

### Associations

- `belongs_to`
- `has_one`
- `has_many`
- `has_many :through`
- `has_one :through`
- `has_and_belongs_to_many`

See: [Associations guide](https://guides.rubyonrails.org/association_basics.html)

### Has many

```ruby
belongs_to :parent, :foreign_key => 'parent_id', class_name: 'Folder'
has_many :folders, :foreign_key => 'parent_id', class_name: 'Folder'

has_many :comments,                -> { order('posted_on DESC') }
has_many :comments, -> { includes(:author) }
has_many :people,      :class_name => "Person"
has_many :people, -> { where(deleted: 0) }
has_many :tracks,                  -> { order(:position) }
has_many :comments,    :dependent  => :nullify
has_many :comments,    :dependent  => :destroy
has_many :tags,        :as         => :taggable
has_many :reports,     :readonly   => true
has_many :subscribers, :through    => :subscriptions,
  class_name: "User", :source => :user
```
<!-- {: data-highlight="has_many"} -->

See: [has_many API](https://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html#method-i-has_many)

### belongs to

```ruby
belongs_to :author,
  :dependent      => :destroy    # or :delete

  :class_name     => "Person"
  :select         => "*"
  :counter_cache  => true
  :counter_cache  => :custom_counter
  :readonly       => true

  :touch          => true
  :touch          => :authors_last_updated_at

  :primary_key    => "name"
  :foreign_key    => "author_name"
```
<!-- {: data-highlight="belongs_to"} -->

See: [belongs_to API](https://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html#method-i-belongs_to)

### Many-to-many

#### Programmer

```ruby
# If you have a join model:
class Programmer < ActiveRecord::Base
  has_many :assignments
  has_many :projects, :through => :assignments
end
```
<!-- {: data-highlight="has_many :projects, :through => :assignments"} -->

#### Project

```ruby
class Project < ActiveRecord::Base
  has_many :assignments
  has_many :programmers, :through => :assignments
end
```
<!-- {: data-highlight="has_many :programmers, :through => :assignments"} -->

#### Assignment

```ruby
class Assignment
  belongs_to :project
  belongs_to :programmer
end
```
<!-- {: data-highlight="belongs_to :programmer"} -->

See: [has-many-through](https://guides.rubyonrails.org/association_basics.html#has-many-through)

### Many-to-many (HABTM)

```ruby
has_and_belongs_to_many :projects
has_and_belongs_to_many :nations, :class_name => "Country"
has_and_belongs_to_many :categories, :join_table => "prods_cats"
has_and_belongs_to_many :categories, :readonly => true
```
<!-- {: data-highlight="has_and_belongs_to_many"} -->

See: [has-and-belongs-to-many](https://guides.rubyonrails.org/association_basics.html#has-and-belongs-to-many)

### Polymorphic associations

#### Post

```ruby
class Post
  has_many :attachments, as: :parent
end
```
<!-- {: data-highlight="has_many :attachments, as: :parent"} -->

#### Image

```ruby
class Image
  belongs_to :parent, polymorphic: true
end
```
<!-- {: data-highlight="polymorphic: true"} -->

#### Migration

```ruby
# And in migrations:
create_table :images do |t|
  t.references :post, polymorphic: true
end
```
<!-- {: data-highlight="t.references"} -->

See: [Polymorphic associations](https://guides.rubyonrails.org/association_basics.html#polymorphic-associations)

Validation
----------

### Validation

```ruby
item.valid?
item.invalid?

class Person < ActiveRecord::Base
  # Presence
  validates :name,     presence: true

  # Acceptance
  validates :terms,    acceptance: true

  # Confirm
  validates :email,    confirmation: true
end
```
<!-- {: data-highlight="validates"} -->

See: [Validations](https://guides.rubyonrails.org/active_record_validations.html#validations)

### Uniqueness and format validation

```ruby
class Person < ActiveRecord::Base
  # Unique
  validates :slug,     uniqueness: true
  validates :slug,     uniqueness: { case_sensitive: false }
  validates :holiday,  uniqueness: {
    scope: :year, message: 'yearly only'
  }

  # Format
  validates :code,     format: /regex/
  validates :code,     format: { with: /regex/ }
end
```
<!-- {: data-highlight="uniqueness: true; format: /regex/"} -->

See: [Uniqueness](https://guides.rubyonrails.org/active_record_validations.html#uniqueness), [Format](https://guides.rubyonrails.org/active_record_validations.html#format)

### Length validation

```ruby
class Person < ActiveRecord::Base
  # Length
  validates :name,     length: { minimum: 2 }
  validates :bio,      length: { maximum: 500 }
  validates :password, length: { in: 6..20 }
  validates :number,   length: { is: 6 }

  # Length (full options)
  validates :content, length: {
    minimum:   300,
    maximum:   400,
    tokenizer: lambda { |str| str.scan(/\w+/) },
    too_short: "must have at least %{count} words",
    too_long:  "must have at most %{count} words" }
end
```
<!-- {: data-highlight="length: { minimum: 2 }"} -->

See: [Length](https://guides.rubyonrails.org/active_record_validations.html#length)

### Inclusion, exclusion and numericality

```ruby
class Person < ActiveRecord::Base
  # Include/exclude
  validates :gender,   inclusion: %w(male female)
  validates :gender,   inclusion: { in: %w(male female) }
  validates :lol,      exclusion: %w(xyz)

  # Numeric
  validates :points,   numericality: true
  validates :played,   numericality: { only_integer: true }
  # ... greater_than, greater_than_or_equal_to,
  # ... less_than, less_than_or_equal_to
  # ... odd, even, equal_to
end
```
<!-- {: data-highlight="inclusion: %w(male female); exclusion: %w(xyz); numericality: true"} -->

See: [Inclusion and exclusion](https://guides.rubyonrails.org/active_record_validations.html#inclusion-and-exclusion), [Numericality](https://guides.rubyonrails.org/active_record_validations.html#numericality)

### Validating associations

```ruby
class Person < ActiveRecord::Base
  # Validate the associated records to ensure they're valid as well
  has_many :books
  validates_associated :books
end
```
<!-- {: data-highlight="validates_associated"} -->

See: [validates-associated](https://guides.rubyonrails.org/active_record_validations.html#validates-associated)

### Conditional validation

```ruby
class Person < ActiveRecord::Base
  # Multiple
  validates :login, :email, presence: true

  # Conditional
  validates :description, presence: true, if: :published?
  validates :description, presence: true, if: lambda { |obj| .. }
  validates :title, presence: true, on: :save
  # :save | :create | :update
end
```
<!-- {: data-highlight="if: :published?; on: :save"} -->

See: [Conditional validations](https://guides.rubyonrails.org/active_record_validations.html#conditional-validations)

### Custom validations

```ruby
class Person < ActiveRecord::Base
  validate :foo_cant_be_nil

  def foo_cant_be_nil
    errors.add(:foo, 'cant be nil')  if foo.nil?
  end
end
```

<!-- {: data-highlight="validate :foo_cant_be_nil"} -->

See: [Custom methods](https://guides.rubyonrails.org/active_record_validations.html#custom-methods)

### Errors

```ruby
record.errors.valid?      # → false
record.errors             # → { :name => ["can't be blank"] }
record.errors.messages    # → { :name => ["can't be blank"] }

record.errors[:name].any?
```
<!-- {: data-highlight="errors.messages"} -->

See: [ActiveModel::Errors API](https://api.rubyonrails.org/classes/ActiveModel/Errors.html)

Other API
---------

### Callbacks

 * [Guides: callbacks](https://guides.rubyonrails.org/active_record_callbacks.html)

See: [ActiveRecord callbacks guide](https://guides.rubyonrails.org/active_record_callbacks.html)

### Mass updates

```ruby
# Updates person id 15
Person.update 15, name: "John", age: 24
Person.update [1,2], [{name: "John"}, {name: "foo"}]
```
<!-- {: data-highlight="Person.update"} -->

See: [Persistence update API](https://api.rubyonrails.org/classes/ActiveRecord/Persistence/ClassMethods.html#method-i-update)

### Joining

#### Basic joins

```ruby
Student.joins(:schools).where(schools: { type: 'public' })
Student.joins(:schools).where('schools.type' => 'public' )
```
<!-- {: data-highlight="joins"} -->

#### Multiple associations

```ruby
Article.joins(:category, :comments)
```

#### Nested associations

```ruby
Article.joins(comments: :guest)
```

#### Raw SQL join

```ruby
Author.joins(
  'INNER JOIN posts ' +
  'ON posts.author_id = authors.id ' +
  'AND posts.published = "t"'
)
```

See: [Joining tables](https://guides.rubyonrails.org/active_record_querying.html#joining-tables)

### Where interpolation

```ruby
where('name = ?', 'John')
where(['name = :name', { name: 'John' }])
```
<!-- {: data-highlight="where('name = ?', 'John')"} -->

See: [Array conditions](https://guides.rubyonrails.org/active_record_querying.html#array-conditions)

### Serialize

#### Define

```ruby
class User < ActiveRecord::Base
  serialize :preferences
end
```
<!-- {: data-highlight="serialize"} -->

#### Use

```ruby
user = User.create(
  preferences: {
    'background' => 'black',
    'display' => 'large'
  }
)
```

#### Restrict the type

```ruby
# Only Hash allowed!
class User < ActiveRecord::Base
  serialize :preferences, type: Hash, coder: YAML
end
```
<!-- {: data-highlight="type: Hash"} -->

#### Type mismatch

```ruby
User.create(preferences: %w(one two three))
# => ActiveRecord::SerializationTypeMismatch
```

A non-Hash value raises a type mismatch instead of being stored.

See: [serialize API](https://api.rubyonrails.org/classes/ActiveRecord/AttributeMethods/Serialization/ClassMethods.html#method-i-serialize)

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

<!-- {: data-highlight="write_attribute; read_attribute"} -->

See: [Overwriting default accessors](https://api.rubyonrails.org/classes/ActiveRecord/Base.html#class-activerecord-base-overwriting-default-accessors)

Callbacks
---------

- after_initialize
- before_validation / after_validation
- before_save / after_save / around_save
- before_create / after_create / around_create
- before_update / after_update / around_update
- before_destroy / after_destroy / around_destroy
- after_commit
- after_rollback

See: [ActiveRecord Callbacks](https://guides.rubyonrails.org/active_record_callbacks.html)
