class Message < ApplicationRecord
  belongs_to :user
  has_many   :terms

  after_create :breakup_into_terms

  USELESS_TERMS = %w(e o a os as um uma uns umas à aos com de da do das dos para ante desde em no na nos nas entre até sem contra sobre trás perante sob por após durante mas contudo entretanto todavia que quê ou se porque quê como mais menos quando)

  def breakup_into_terms
    content.split(/\s+/).each do |value|
      next if value == ""
      next if value.in?(USELESS_TERMS)
      terms.create(value: value.mb_chars.downcase.to_s)
    end
  end
end
