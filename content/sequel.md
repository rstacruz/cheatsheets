---
title: Sequel
category: Ruby libraries
---

### Open a database

    require 'rubygems'
    require 'sequel'

    DB = Sequel.sqlite('my_blog.db')
    DB = Sequel.connect('postgres://user:password@localhost/my_db')
    DB = Sequel.postgres('my_db', :user => 'user', :password => 'password', :host => 'localhost')
    DB = Sequel.ado('mydb')

### Open an SQLite memory database

Without a filename argument, the sqlite adapter will setup a new sqlite database in memory.

    DB = Sequel.sqlite

### Logging SQL statements

    require 'logger'
    DB = Sequel.sqlite '', :loggers => [Logger.new($stdout)]
    # or
    DB.loggers << Logger.new(...)

### Using raw SQL

    DB.run "CREATE TABLE users (name VARCHAR(255) NOT NULL, age INT(3) NOT NULL)"
    dataset = DB["SELECT age FROM users WHERE name = ?", name]
    dataset.map(:age)
    DB.fetch("SELECT name FROM users") do |row|
      p row[:name]
    end

### Create a dataset

    dataset = DB[:items]
    dataset = DB.from(:items)

### Most dataset methods are chainable

    dataset = DB[:managers].where(:salary => 5000..10000).order(:name, :department)

### Insert rows

    dataset.insert(:name => 'Sharon', :grade => 50)

### Retrieve rows

    dataset.each{|r| p r}
    dataset.all # => [{...}, {...}, ...]
    dataset.first # => {...}

### Update/Delete rows

    dataset.filter(~:active).delete
    dataset.filter('price < ?', 100).update(:active => true)

### Datasets are Enumerable

    dataset.map{|r| r[:name]}
    dataset.map(:name) # same as above

    dataset.inject(0){|sum, r| sum + r[:value]}
    dataset.sum(:value) # same as above

### Filtering (see also doc/dataset_filtering.rdoc)

#### Equality

    dataset.filter(:name => 'abc')
    dataset.filter('name = ?', 'abc')

#### Inequality

    dataset.filter{value > 100}
    dataset.exclude{value <= 100}

#### Inclusion

    dataset.filter(:value => 50..100)
    dataset.where{(value >= 50) & (value <= 100)}

    dataset.where('value IN ?', [50,75,100])
    dataset.where(:value=>[50,75,100])

    dataset.where(:id=>other_dataset.select(:other_id))

#### Subselects as scalar values

    dataset.where('price > (SELECT avg(price) + 100 FROM table)')
    dataset.filter{price > dataset.select(avg(price) + 100)}

#### LIKE/Regexp

    DB[:items].filter(:name.like('AL%'))
    DB[:items].filter(:name => /^AL/)

#### AND/OR/NOT

    DB[:items].filter{(x > 5) & (y > 10)}.sql 
    # SELECT * FROM items WHERE ((x > 5) AND (y > 10))

    DB[:items].filter({:x => 1, :y => 2}.sql_or & ~{:z => 3}).sql 
    # SELECT * FROM items WHERE (((x = 1) OR (y = 2)) AND (z != 3))

#### Mathematical operators

    DB[:items].filter((:x + :y) > :z).sql 
    # SELECT * FROM items WHERE ((x + y) > z)

    DB[:items].filter{price - 100 < avg(price)}.sql 
    # SELECT * FROM items WHERE ((price - 100) < avg(price))

### Ordering

    dataset.order(:kind)
    dataset.reverse_order(:kind)
    dataset.order(:kind.desc, :name)

### Limit/Offset

    dataset.limit(30) # LIMIT 30
    dataset.limit(30, 10) # LIMIT 30 OFFSET 10

### Joins

    DB[:items].left_outer_join(:categories, :id => :category_id).sql 
    # SELECT * FROM items LEFT OUTER JOIN categories ON categories.id = items.category_id

    DB[:items].join(:categories, :id => :category_id).join(:groups, :id => :items__group_id) 
    # SELECT * FROM items INNER JOIN categories ON categories.id = items.category_id INNER JOIN groups ON groups.id = items.group_id
	
### Aggregate functions methods

    dataset.count #=> record count
    dataset.max(:price)
    dataset.min(:price)
    dataset.avg(:price)
    dataset.sum(:stock)

    dataset.group_and_count(:category)
    dataset.group(:category).select(:category, :AVG.sql_function(:price))

### SQL Functions / Literals

    dataset.update(:updated_at => :NOW.sql_function)
    dataset.update(:updated_at => 'NOW()'.lit)

    dataset.update(:updated_at => "DateValue('1/1/2001')".lit)
    dataset.update(:updated_at => :DateValue.sql_function('1/1/2001'))

### Schema Manipulation

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

### Aliasing

    DB[:items].select(:name.as(:item_name))
    DB[:items].select(:name___item_name)
    DB[:items___items_table].select(:items_table__name___item_name)
    # SELECT items_table.name AS item_name FROM items AS items_table

### Transactions

    DB.transaction do
      dataset.insert(:first_name => 'Inigo', :last_name => 'Montoya')
      dataset.insert(:first_name => 'Farm', :last_name => 'Boy')
    end # Either both are inserted or neither are inserted

Database#transaction is re-entrant:

    DB.transaction do # BEGIN issued only here
      DB.transaction
        dataset << {:first_name => 'Inigo', :last_name => 'Montoya'}
      end
    end # COMMIT issued only here

Transactions are aborted if an error is raised:

    DB.transaction do
      raise "some error occurred"
    end # ROLLBACK issued and the error is re-raised

Transactions can also be aborted by raising Sequel::Rollback:

    DB.transaction do
      raise(Sequel::Rollback) if something_bad_happened
    end # ROLLBACK issued and no error raised

Savepoints can be used if the database supports it:

    DB.transaction do
      dataset << {:first_name => 'Farm', :last_name => 'Boy'} # Inserted
      DB.transaction(:savepoint=>true) # This savepoint is rolled back
        dataset << {:first_name => 'Inigo', :last_name => 'Montoya'} # Not inserted
        raise(Sequel::Rollback) if something_bad_happened
      end
      dataset << {:first_name => 'Prince', :last_name => 'Humperdink'} # Inserted
    end

### Miscellaneous:

    dataset.sql # "SELECT * FROM items"
    dataset.delete_sql # "DELETE FROM items"
    dataset.where(:name => 'sequel').exists # "EXISTS ( SELECT * FROM items WHERE name = 'sequel' )"
    dataset.columns #=> array of columns in the result set, does a SELECT
    DB.schema(:items) => [[:id, {:type=>:integer, ...}], [:name, {:type=>:string, ...}], ...]

----------------------------------------------------------------------------------------------------------------------------------------------------------------

### Documents

    http://sequel.rubyforge.org/rdoc/files/doc/association_basics_rdoc.html
    http://sequel.rubyforge.org/rdoc/classes/Sequel/Schema/Generator.html
    http://sequel.rubyforge.org/rdoc/files/doc/validations_rdoc.html
    http://sequel.rubyforge.org/rdoc/classes/Sequel/Model.html

### Alter table

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

### Model associations

    class Deal < Sequel::Model

      # Us (left) <=> Them (right)
      many_to_many  :images,
        left_id:    :deal_id,
        right_id:   :image_id,
        join_table: :image_links

      one_to_many   :files,
        key:        :deal_id,
        class:      :DataFile,

      many_to_one   :parent, class: self
      one_to_many   :children, key: :parent_id, class: self

      one_to_many :gold_albums, class: :Album do |ds|
        ds.filter { copies_sold > 50000 }
      end

Provided by many_to_many

    Deal[1].images
    Deal[1].add_image
    Deal[1].remove_image
    Deal[1].remove_all_images

### Validations

      def validate
        super
        errors.add(:name, 'cannot be empty') if !name || name.empty?

        validates_presence [:title, :site]
        validates_unique :name
        validates_format /\Ahttps?:\/\//, :website, :message=>'is not a valid URL'
        validates_includes %w(a b c), :type
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

### Model stuff

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

### Callbacks

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

### Schema

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

### Unrestrict primary key

    Category.create id: 'travel'   # error
    Category.unrestrict_primary_key
    Category.create id: 'travel'   # ok
