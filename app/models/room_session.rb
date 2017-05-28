class RoomSession < ApplicationRecord
  has_many :messages
  has_many :terms, through: :messages
  has_many :users, through: :room_sessions_users
  has_many :room_sessions_users

  def word_cloud
    text = messages.pluck(:content).join("\n")
    entities = analyze_entities(text)
    process_entities(entities)
  end

  def analyze_entities(text)
    language_service_client = Google::Cloud::Language::V1beta2::LanguageServiceClient.new
    document = Google::Cloud::Language::V1beta2::Document.new
    encoding_type = Google::Cloud::Language::V1beta2::EncodingType::NONE

    document.content = text
    document.language = 'pt-BR'
    document.type = :PLAIN_TEXT

    response = language_service_client.analyze_entities(document, encoding_type)
  end

  def process_entities(response)
    response.entities.map { |e| [e.name, e.salience] }.sort { |e| -e[1] }
  end

  def analyze_syntax(text)
    language_service_client = Google::Cloud::Language::V1beta2::LanguageServiceClient.new
    document = Google::Cloud::Language::V1beta2::Document.new
    encoding_type = Google::Cloud::Language::V1beta2::EncodingType::NONE

    document.content = text
    document.language = 'pt-BR'
    document.type = :PLAIN_TEXT

    response = language_service_client.analyze_syntax(document, encoding_type)
    response.tokens
  end

  def pos_not_in_tokens(tokens, pos_list)
    tokens.reject { |t| t.part_of_speech.tag.in?(pos_list) }
  end

  def labels_in(tokens, label_list)
    tokens.select { |t| t.dependency_edge.label.in? label_list }
  end

  def build_graph2(text)
    tokens = analyze_syntax(text)
    entities = analyze_entities(text)
    best_labels = labels_in(tokens, [:ROOT, :NSUBJ, :POBJ])
    filtered_tags = pos_not_in_tokens(best_labels, [:DET, :PUNCT, :PRON, :ADP])

    process_entities(entities)
  end

  def top_words
    word_cloud.uniq{ |name, salience| name }.take(8).each_with_index.inject([]) do |a, ((name, salience), index)|
      a << {
        id: index+1, value: salience, label: name
      }
    end
  end
end
