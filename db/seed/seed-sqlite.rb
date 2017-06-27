#!/usr/bin/env ruby

require 'sqlite3'
require 'csv'

COLUMNS = {
  entrie_id: 'int',
  restaurant_id: 'int',
  image_url: 'varchar(100)'
}

db = SQLite3::Database.new '../foodporn.sqlite3'

res = db.execute 'SELECT name FROM sqlite_master WHERE type = "table"'

if res.flatten.include?('entries')
  puts 'table `entries` already exists — dropping'
  db.execute 'DROP TABLE entries'
end

columns = COLUMNS.inject('') do |memo, pair|
  name, type = pair
  memo += "\n#{name} #{type},"
end.chomp(',')

db.execute <<-SQL
  create table entries (
    #{columns}
  );
SQL

print "\nWorking..."

dir = File.dirname(File.expand_path(__FILE__))
lineno = 1
CSV.foreach(File.join(dir, 'raw-entries.csv'), 'r:ISO8859-1') do |row|
  print row
  lineno = $.

  next if lineno == 1
  print '.' if lineno % 1000 == 0

  # Humanize descriptions
  row[1] = row[1].capitalize.gsub(/([\,\/])\s*/, '\1 ').gsub(/\s*\&\s*/, ' \1 ')

  sql = <<-SQL
    INSERT INTO entries (#{COLUMNS.keys.join(', ')})
    VALUES (#{(['?'] * COLUMNS.size).join(', ')})
SQL
  db.execute sql, row
end

print "done."
print "\n#{lineno} entries imported."
