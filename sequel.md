---
title: Sequel
subtitle: Ruby database toolkit
logo: { set: icon-park-outline, name: data-server }
category: Ruby libraries
tier: t3
last_verified_with: "Sequel 5.110.0."
created_at: 2013-10-14
updated: 2026-11-26
intro: |
  Sequel is a database toolkit for Ruby.
links:
  - title: https://github.com/jeremyevans/sequel
    url: https://github.com/jeremyevans/sequel
---

### Open a database

```
require 'rubygems'
require 'sequel'

DB = Sequel.sqlite('my_blog.db')
DB = Sequel.connect('postgres://user:password@localhost/my_db')
DB = Sequel.postgres('my_db',
  :user => 'user', :password => 'password',
  :host => 'localhost')
DB = Sequel.ado('mydb')
```
<!-- {: data-highlight="Sequel.connect; Sequel.postgres; Sequel.ado"} -->

See: [Connecting to a database](https://sequel.jeremyevans.net/doc/opening_databases.html)

### Open an SQLite memory database

```
DB = Sequel.sqlite
```
<!-- {: data-highlight="Sequel.sqlite"} -->

Without a filename argument, the SQLite adapter creates an in-memory database.

See: [SQLite adapter](https://sequel.jeremyevans.net/doc/opening_databases.html#label-sqlite)

### Logging SQL statements

```
require 'logger'
DB = Sequel.sqlite '', :loggers => [Logger.new($stdout)]
# or
DB.loggers << Logger.new(...)
```

See: [Connection options](https://sequel.jeremyevans.net/doc/opening_databases.html#label-General+connection+options)

### Using raw SQL

```
DB.run "CREATE TABLE users (name VARCHAR(255) NOT NULL, " \
  "age INT(3) NOT NULL)"
dataset = DB["SELECT age FROM users WHERE name = ?", name]
dataset.map(:age)
DB.fetch("SELECT name FROM users") do |row|
  p row[:name]
end
```

See: [Using SQL](https://sequel.jeremyevans.net/doc/sql.html#label-You+Can+Just+Use+SQL)

### Create a dataset

```
dataset = DB[:items]
dataset = DB.from(:items)
```
<!-- {: data-highlight="DB[:items]; DB.from(:items)"} -->

See: [Dataset basics](https://sequel.jeremyevans.net/doc/dataset_basics.html)

### Most dataset methods are chainable

```
dataset = DB[:managers]
  .where(:salary => 5000..10000)
  .order(:name, :department)
```

See: [Dataset basics: chainability](https://sequel.jeremyevans.net/doc/dataset_basics.html#label-Basics)

### Insert rows

```
dataset.insert(:name => 'Sharon', :grade => 50)
```

See: [Dataset basics: methods that execute SQL](https://sequel.jeremyevans.net/doc/dataset_basics.html#label-Methods+that+execute+code+on+the+database)

### Retrieve rows

```
dataset.each{|r| p r}
dataset.all # => [{...}, {...}, ...]
dataset.first # => {...}
```

See: [Dataset API](https://sequel.jeremyevans.net/rdoc/classes/Sequel/Dataset.html)

### Update/Delete rows

```
dataset.filter(~:active).delete
dataset.filter('price < ?', 100).update(:active => true)
```

See: [Dataset basics: methods that execute SQL](https://sequel.jeremyevans.net/doc/dataset_basics.html#label-Methods+that+execute+code+on+the+database)

### Datasets are Enumerable

```
dataset.map{|r| r[:name]}
dataset.map(:name) # same as above

dataset.inject(0){|sum, r| sum + r[:value]}
dataset.sum(:value) # same as above
```

See: [Dataset API](https://sequel.jeremyevans.net/rdoc/classes/Sequel/Dataset.html)

### Filtering

#### Equality

```
dataset.filter(:name => 'abc')
dataset.filter('name = ?', 'abc')
```

#### Inequality

```
dataset.filter{value > 100}
dataset.exclude{value <= 100}
```

#### Inclusion

```
dataset.filter(:value => 50..100)
dataset.where{(value >= 50) & (value <= 100)}

dataset.where('value IN ?', [50,75,100])
dataset.where(:value=>[50,75,100])

dataset.where(:id=>other_dataset.select(:other_id))
```

#### Subselects as scalar values

```
dataset.where('price > (SELECT avg(price) + 100 FROM table)')
dataset.filter{price > dataset.select(avg(price) + 100)}
```

#### LIKE/Regexp

```
DB[:items].filter(:name.like('AL%'))
DB[:items].filter(:name => /^AL/)
```

See: [Dataset filtering](https://sequel.jeremyevans.net/doc/dataset_filtering.html)

### Logical and mathematical filters

#### AND/OR/NOT

```
DB[:items].filter{(x > 5) & (y > 10)}.sql
# SELECT * FROM items WHERE ((x > 5) AND (y > 10))

DB[:items].filter({:x => 1, :y => 2}.sql_or & ~{:z => 3}).sql
# SELECT * FROM items WHERE (((x = 1) OR (y = 2)) AND (z != 3))
```

#### Mathematical operators

```
DB[:items].filter((:x + :y) > :z).sql
# SELECT * FROM items WHERE ((x + y) > z)

DB[:items].filter{price - 100 < avg(price)}.sql
# SELECT * FROM items WHERE ((price - 100) < avg(price))
```

See: [Virtual row blocks](https://sequel.jeremyevans.net/doc/virtual_rows.html)

### Ordering

```
dataset.order(:kind)
dataset.reverse_order(:kind)
dataset.order(:kind.desc, :name)
```

See: [Dataset basics](https://sequel.jeremyevans.net/doc/dataset_basics.html)

### Limit/Offset

```
dataset.limit(30) # LIMIT 30
dataset.limit(30, 10) # LIMIT 30 OFFSET 10
```

See: [Dataset basics](https://sequel.jeremyevans.net/doc/dataset_basics.html)

### Joins

```
DB[:items]
  .left_outer_join(:categories, :id => :category_id)
  .sql
# SELECT * FROM items LEFT OUTER JOIN categories
#   ON categories.id = items.category_id

DB[:items]
  .join(:categories, :id => :category_id)
  .join(:groups, :id => :items__group_id)
  .sql
# SELECT * FROM items INNER JOIN categories
#   ON categories.id = items.category_id
#   INNER JOIN groups ON groups.id = items.group_id
```

See: [Dataset basics](https://sequel.jeremyevans.net/doc/dataset_basics.html)

### Aggregate functions methods

```
dataset.count #=> record count
dataset.max(:price)
dataset.min(:price)
dataset.avg(:price)
dataset.sum(:stock)

dataset.group_and_count(:category)
dataset.group(:category).select(:category, :AVG.sql_function(:price))
```

See: [Dataset basics: aggregate methods](https://sequel.jeremyevans.net/doc/dataset_basics.html#label-Methods+that+execute+code+on+the+database)

### SQL Functions / Literals

```
dataset.update(:updated_at => :NOW.sql_function)
dataset.update(:updated_at => 'NOW()'.lit)

dataset.update(:updated_at => "DateValue('1/1/2001')".lit)
dataset.update(:updated_at => :DateValue.sql_function('1/1/2001'))
```

See: [Sequel for SQL users](https://sequel.jeremyevans.net/doc/sql.html)

### Schema Manipulation

```
DB.create_table :items do
  primary_key :id
  String :name, :unique => true, :null => false
  TrueClass :active, :default => true
  foreign_key :category_id, :categories
  DateTime :created_at

  index :created_at
end

DB.drop_table :items

DB.create_table :test do
  String :zipcode
  enum :system, :elements => ['mac', 'linux', 'windows']
end
```

See: [Schema modification](https://sequel.jeremyevans.net/doc/schema_modification.html)

### Aliasing

```
DB[:items].select(:name.as(:item_name))
DB[:items].select(:name___item_name)
DB[:items___items_table].select(:items_table__name___item_name)
# SELECT items_table.name AS item_name FROM items AS items_table
```

See: [Sequel for SQL users](https://sequel.jeremyevans.net/doc/sql.html)

### Transactions

#### Basic transaction

```ruby
DB.transaction do
  dataset.insert(:first_name => 'Inigo', :last_name => 'Montoya')
  dataset.insert(:first_name => 'Farm', :last_name => 'Boy')
end # Either both are inserted or neither are inserted
```

#### Re-entrant transactions

```ruby
DB.transaction do # BEGIN issued only here
  DB.transaction do
    dataset << {
      :first_name => 'Inigo', :last_name => 'Montoya'
    }
  end
end # COMMIT issued only here; nested transactions are re-entrant
```

#### Rollback on error

```ruby
DB.transaction do
  raise "some error occurred"
end # ROLLBACK issued and the error is re-raised
```

#### Explicit rollback

```ruby
DB.transaction do
  raise(Sequel::Rollback) if something_bad_happened
end # ROLLBACK issued and no error raised
```
<!-- {: data-highlight="DB.transaction"} -->

Raising `Sequel::Rollback` aborts without re-raising.

See: [Database transactions](https://sequel.jeremyevans.net/doc/transactions.html)

### Savepoints

```ruby
DB.transaction do
  dataset << { :first_name => 'Farm', :last_name => 'Boy' } # Inserted
  DB.transaction(:savepoint => true) do
    dataset << {
      :first_name => 'Inigo', :last_name => 'Montoya'
    } # Not inserted
    raise(Sequel::Rollback) if something_bad_happened
  end
  dataset << {
    :first_name => 'Prince', :last_name => 'Humperdink'
  } # Inserted
end
```
<!-- {: data-highlight=":savepoint => true"} -->

See: [Database transactions](https://sequel.jeremyevans.net/doc/transactions.html)

### Miscellaneous

```
dataset.sql # "SELECT * FROM items"
dataset.delete_sql # "DELETE FROM items"
dataset.where(:name => 'sequel').exists
# "EXISTS ( SELECT * FROM items WHERE name = 'sequel' )"

dataset.columns #=> array of columns in the result set, does a SELECT
DB.schema(:items)
# => [[:id, {:type=>:integer, ...}],
#     [:name, {:type=>:string, ...}], ...]
```

See: [Dataset API](https://sequel.jeremyevans.net/rdoc/classes/Sequel/Dataset.html)

---

### Documents

```
https://sequel.jeremyevans.net/doc/association_basics.html
https://sequel.jeremyevans.net/doc/schema_modification.html
https://sequel.jeremyevans.net/doc/validations.html
https://sequel.jeremyevans.net/rdoc/classes/Sequel/Model.html
```

See: [Sequel documentation](https://sequel.jeremyevans.net/documentation.html)

### Alter table

```
database.alter_table :deals do
  add_column :name, String
  drop_column :column_name
  rename_column :from, :to

  add_constraint :valid_name, :name.like('A%')
  drop_constraint :constraint

  add_full_text_index :body
  add_spacial_index [columns]

  add_index :price
  drop_index :index

  add_foreign_key :artist_id, :table
  add_primary_key :id
  add_unique_constraint [columns]
  set_column_allow_null :foo, false
  set_column_default :title, ''

  set_column_type :price, 'char(10)'
end
```

See: [Schema modification](https://sequel.jeremyevans.net/doc/schema_modification.html)

### Model associations

#### Define associations

```
class Deal < Sequel::Model

  # Us (left) <=> Them (right)
  many_to_many  :images,
    left_key:   :deal_id,
    right_key:  :image_id,
    join_table: :image_links

  one_to_many   :files,
    key:        :deal_id,
    class:      :DataFile

  many_to_one   :parent, class: self
  one_to_many   :children, key: :parent_id, class: self

  one_to_many :gold_albums, class: :Album do |ds|
    ds.filter { copies_sold > 50000 }
  end
end
```
<!-- {: data-highlight="many_to_many; one_to_many; many_to_one"} -->

#### Use associations

```
Deal[1].images
Deal[1].add_image
Deal[1].remove_image
Deal[1].remove_all_images
```

See: [Model associations](https://sequel.jeremyevans.net/doc/association_basics.html)

### Validations

```
def validate
    super
    errors.add(:name, 'cannot be empty') if !name || name.empty?

    validates_presence [:title, :site]
    validates_unique :name
    validates_format(/\Ahttps?:\/\//, :website,
      :message => 'is not a valid URL')
    validates_integer :rating
    validates_numeric :number
    validates_type String, [:title, :description]

    validates_integer :rating  if new?

    # options: :message =>, :allow_nil =>, :allow_blank =>,
    #          :allow_missing =>,

    validates_exact_length 17, :isbn
    validates_min_length 3, :name
    validates_max_length 100, :name
    validates_length_range 3..100, :name

    # Setter override
    def filename=(name)
      @values[:filename] = name
    end
  end
end

deal.errors
```

See: [Model validations](https://sequel.jeremyevans.net/doc/validations.html)

### Model stuff

```
deal = Deal[1]
deal.changed_columns
deal.destroy  # Calls hooks
deal.delete   # No hooks
deal.exists?
deal.new?
deal.hash  # Only uniques
deal.keys  #=> [:id, :name]
deal.modified!
deal.modified?

deal.lock!
```

See: [Sequel object model](https://sequel.jeremyevans.net/doc/object_model.html)

### Callbacks

```
before_create
after_create

before_validation
after_validation
before_save
before_update
UPDATE QUERY
after_update
after_save

before_destroy
DELETE QUERY
after_destroy
```

See: [Model hooks](https://sequel.jeremyevans.net/doc/model_hooks.html)

### Schema

```
class Deal < Sequel::Model
  set_schema do
    primary_key :id
    primary_key [:id, :title]
    String :name, primary_key: true

    String  :title
    Numeric :price
    DateTime :expires

    unique :whatever
    check(:price) { num > 0 }

    foreign_key :artist_id
    String :artist_name, key: :id

    index :title
    index [:artist_id, :name]
    full_text_index :title

    # String, Integer, Fixnum, Bignum, Float, Numeric, BigDecimal,
    # Date, DateTime, Time, File, TrueClass, FalseClass
  end
end
```

See: [Model API](https://sequel.jeremyevans.net/rdoc/classes/Sequel/Model.html)

### Unrestrict primary key

```
Category.create id: 'travel'   # error
Category.unrestrict_primary_key
Category.create id: 'travel'   # ok
```

See: [Mass assignment](https://sequel.jeremyevans.net/doc/mass_assignment.html)
