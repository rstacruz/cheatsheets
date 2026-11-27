---
title: Rails migrations
subtitle: Database schema migrations
logo: { set: icon-park-outline, name: update-rotation }
category: Rails
intro: |
  Rails migrations evolve a database schema through versioned Ruby files.
links:
  - title: Active Record migrations guide
    url: https://guides.rubyonrails.org/active_record_migrations.html
  - title: ActiveRecord::Migration API
    url: https://api.rubyonrails.org/classes/ActiveRecord/Migration.html
tier: t3
last_verified_with: "Rails 8.1.4.1."
updated: 2026-11-26
---

### Automatically make migrations

```sh
$ rails generate migration RemovePartNumberFromProducts \
    part_number:string
$ rails generate migration remove_part_number_from_products \
    part_number
$ rails generate migration AddNameToWidgets name:string
$ rails g migration add_name_to_widgets name:string
```
<!-- {: data-highlight="rails generate migration"} -->

Snake case and omitted types are accepted; `g` shortens `generate`.

See: [Generating migration files](https://guides.rubyonrails.org/active_record_migrations.html#generating-migration-files)

### Run migrations

```sh
$ bin/rails db:migrate
$ rake db:migrate  # older Rails
```
<!-- {: data-highlight="db:migrate"} -->

See: [Running migrations](https://guides.rubyonrails.org/active_record_migrations.html#running-migrations)

### Creating tables

```
create_table :users do |t|
  t.string :name
  t.text   :description

  t.primary_key :id
  t.string      :title
  t.text        :description
  t.integer     :games_count
  t.float       :lol
  t.decimal     :price
  t.decimal     :price, :precision => 10, :scale => 2
  t.datetime    :expiration
  t.timestamp   :time_in
  t.time        :time_in
  t.date        :expiry
  t.binary      :image_data
  t.boolean     :is_admin
end

# Options:
  :null (boolean)
  :limit (integer)
  :default
```
<!-- {: data-highlight="create_table"} -->

See: [Creating a table](https://guides.rubyonrails.org/active_record_migrations.html#creating-a-table)

### Operations

```
add_column    :users, :first_name, :string
remove_column :users, :first_name, :string

change_column :users, :first_name, :text

change_column_default :users, :admin, nil
change_column_null    :users, :email, false # adds NOT NULL constraint

create_table
change_table
drop_table

add_column
change_column
rename_column
remove_column

add_index
remove_index
```
<!-- {: data-highlight="change_column"} -->

See: [Changing columns](https://guides.rubyonrails.org/active_record_migrations.html#changing-columns)

### Use models

```ruby
class AddFlagToProduct < ActiveRecord::Migration[8.1]
  class Product < ActiveRecord::Base
  end
 
  def change
    add_column :products, :flag, :boolean
    Product.reset_column_information
    reversible do |dir|
      dir.up { Product.update_all flag: false }
    end
  end
end
```
<!-- {: data-highlight="reversible"} -->

See: [Data migrations](https://guides.rubyonrails.org/active_record_migrations.html#data-migrations)

### Associations

```
t.references :category   # kinda same as t.integer :category_id

# Can have different types
t.references :category, polymorphic: true
```
<!-- {: data-highlight="t.references"} -->

See: [Creating associations](https://guides.rubyonrails.org/active_record_migrations.html#creating-associations)

### Auto-Add/remove columns

```
$ rails generate migration RemovePartNumberFromProducts \
    part_number:string
```
<!-- {: data-highlight="RemovePartNumberFromProducts"} -->

See: [Removing columns](https://guides.rubyonrails.org/active_record_migrations.html#removing-columns)

### Indices

```
# Simple
add_index :suppliers, :name
```

```
# Unique
add_index :accounts, [:branch_id, :party_id], :unique => true
```

```
# Named (:name => ...)
add_index :accounts, [:branch_id, :party_id],
  :unique => true, :name => "by_branch_party"
```

```
# Length
add_index :accounts, :name, :name => "by_name", :length => 10
add_index :accounts, [:name, :surname], :name => "by_name_surname",
  :length => {
    :name => 10,
    :surname => 15
  }
```

```
# Sort order (no MySQL support)
add_index :accounts, [:branch_id, :party_id, :surname],
  :order => {:branch_id => :desc, :part_id => :asc}
```
<!-- {: data-highlight="add_index"} -->

See: [SchemaStatements#add_index](https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_index)

### In console

```ruby
ActiveRecord::Migration.add_index :posts, :slug
```
<!-- {: data-highlight="ActiveRecord::Migration.add_index"} -->

Use `ActiveRecord::Migration` in the Rails console.

See: [Migration API](https://api.rubyonrails.org/classes/ActiveRecord/Migration.html)

### References

 * <https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html>

See: [Active Record migrations guide](https://guides.rubyonrails.org/active_record_migrations.html)
