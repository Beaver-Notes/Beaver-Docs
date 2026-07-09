# Native Markdown shorthand: :ri-book-line:  ->  <i class="doc-icon ri-book-line" ...>
# Runs after Markdown -> HTML conversion and skips <pre>/<code> blocks.
Jekyll::Hooks.register([:documents, :pages], :post_convert) do |item|
  next unless item.output_ext == ".html"

  content = item.content.to_s

  # Protect code blocks/spans so the shorthand is never replaced inside them
  protected_chunks = []
  content.gsub!(%r{<pre\b.*?</pre>|<code\b.*?</code>}mi) do |match|
    protected_chunks << match
    "\x00#{protected_chunks.size - 1}\x00"
  end

  content.gsub!(/:ri-([a-z0-9]+(?:-[a-z0-9]+)*):/i) do
    name = Regexp.last_match(1)
    %(<i class="doc-icon ri-#{name}" role="img" aria-hidden="true"></i>)
  end

  # Restore protected chunks
  content.gsub!(/\x00(\d+)\x00/) { protected_chunks[Regexp.last_match(1).to_i] }
  item.content = content
end
