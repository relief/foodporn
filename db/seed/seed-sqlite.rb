#!/usr/bin/env ruby

require 'sqlite3'
require 'csv'

ENTRIE_TABLE_NAME = 'entries'
ENTRIE_CSV = 'Vancouver__restaurant_urls.csv'
ENTRIE_COLUMNS = {
  Id: 'int',
  TrimURL: 'varchar(100)',
  OURL: 'varchar(100)',
  Restaurant_Id: 'int',
  Restaurant: 'varchar(30)'
}


RESTAURANT_TABLE_NAME = 'restaurants'
RESTAURANT_CSV = 'Vancouver__restaurants.csv'
RESTAURANT_COLUMNS = {
  Id: 'int',
  Name: 'varchar(30)',
  Rating: 'float',
  ReviewCount: 'int',
  Price: 'varchar(5)',
  Style: 'varchar(30)',
  Neighborhood: 'varchar(30)',
  Address: 'varchar(100)',
  PhoneNumber: 'varchar(15)',
  Link: 'varchar(100)'  
}


db = SQLite3::Database.new '../foodporn.sqlite3'

res = db.execute 'SELECT name FROM sqlite_master WHERE type = "table"'

# Start to import restaurants
if res.flatten.include?(RESTAURANT_TABLE_NAME)
  puts "table #{RESTAURANT_TABLE_NAME} already exists — dropping"
  db.execute "DROP TABLE #{RESTAURANT_TABLE_NAME}"
end

columns = RESTAURANT_COLUMNS.inject('') do |memo, pair|
  name, type = pair
  memo += "\n#{name} #{type},"
end.chomp(',')

db.execute <<-SQL
  create table #{RESTAURANT_TABLE_NAME} (
    #{columns}
  );
SQL

print "\nStart importing #{RESTAURANT_TABLE_NAME}..."

dir = File.dirname(File.expand_path(__FILE__))
lineno = 1
CSV.foreach(File.join(dir, RESTAURANT_CSV), 'r:ISO8859-1') do |row|
  # print row
  lineno = $.

  next if lineno == 1
  print '.' if lineno % 1000 == 0

  # Humanize descriptions
  row[1] = row[1].capitalize.gsub(/([\,\/])\s*/, '\1 ').gsub(/\s*\&\s*/, ' \1 ')

  sql = <<-SQL
    INSERT INTO #{RESTAURANT_TABLE_NAME} (#{RESTAURANT_COLUMNS.keys.join(', ')})
    VALUES (#{(['?'] * RESTAURANT_COLUMNS.size).join(', ')})
SQL
  db.execute sql, row
end

print "\n#{lineno} restaurants imported."


print "--------------------------------------------------------"

# Start to import entries
if res.flatten.include?(ENTRIE_TABLE_NAME)
  puts "table #{ENTRIE_TABLE_NAME} already exists — dropping"
  db.execute "DROP TABLE #{ENTRIE_TABLE_NAME}"
end

columns = ENTRIE_COLUMNS.inject('') do |memo, pair|
  name, type = pair
  memo += "\n#{name} #{type},"
end.chomp(',')

db.execute <<-SQL
  create table #{ENTRIE_TABLE_NAME} (
    #{columns}
  );
SQL

print "\nStart importing #{ENTRIE_TABLE_NAME}..."

dir = File.dirname(File.expand_path(__FILE__))
lineno = 1
CSV.foreach(File.join(dir, ENTRIE_CSV), 'r:ISO8859-1') do |row|
  print row
  lineno = $.

  next if lineno == 1
  print '.' if lineno % 1000 == 0

  # Humanize descriptions
  row[1] = row[1].capitalize.gsub(/([\,\/])\s*/, '\1 ').gsub(/\s*\&\s*/, ' \1 ')

  sql = <<-SQL
    INSERT INTO #{ENTRIE_TABLE_NAME} (#{ENTRIE_COLUMNS.keys.join(', ')})
    VALUES (#{(['?'] * ENTRIE_COLUMNS.size).join(', ')})
SQL
  db.execute sql, row
end

print "\n#{lineno} entries imported."