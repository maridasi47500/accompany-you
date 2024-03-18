require 'nokogiri'
require 'open-uri'
@artist=[]
@maliste=[]
"1".upto("11").each do |nombre|
  p nombre
  @doc=Nokogiri::HTML(URI.open("https://www.mistralfm.com/artistes-#{nombre}"))
@doc.css(".whole-div-link.title-link h4").each do |x|
  @artist.push(x.text.strip.titleize.split("(")[0].strip)
end
end
["anglaise","am%C3%A9ricaine","australienne"].each do |pays|
  p pays
@doc=Nokogiri::HTML(URI.open("https://fr.wikipedia.org/wiki/Cat%C3%A9gorie:Chanteuse_#{pays}_de_pop"))
@doc.css(".mw-category-group a").each do |x|
  @maliste.push(x.text.strip.titleize)
end
rescue => e
  p e
end
p @artist.map{|g|" "+g+" "}.join+"hey"
p @maliste[1]+"hey"
p @artist & @maliste
