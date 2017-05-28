class Term < ApplicationRecord
  belongs_to :message

  def self.top_five
    self.limit(5)
        .order('COUNT(*) DESC, value')
        .group('value')
        .pluck('value, COUNT(*)').each_with_index.inject([]) do |a, ((value, count), index)|
          a << {
            id: index+1, value: count, label: value
          }
        end
  end
end
