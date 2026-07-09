require "liquid"

module Jekyll
  # Inline icon tag, e.g.  {% icon ri-book-line %}  or  {% icon book-line %}  or  {% icon ri-book-line ri-2x %}  (size modifier)
  class IconTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @text = text.to_s.strip
    end

    def render(context)
      return "" if @text.empty?

      parts = @text.split(/\s+/)
      name = parts.shift.to_s.gsub(/\A["']|["']\z/, "").strip
      return "" if name.empty?

      # Accept both "ri-book-line" and "book-line"
      name = name.sub(/\Ari-/, "")
      icon_class = "ri-#{name}"

      extra = parts.join(" ")

      classes = ["doc-icon", icon_class, extra].reject(&:empty?).join(" ")
      %(<i class="#{classes}" role="img" aria-hidden="true"></i>)
    end
  end
end

Liquid::Template.register_tag("icon", Jekyll::IconTag)
