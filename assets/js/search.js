---
---
documents = [
    {% for post in site.posts %}
      {
        "title": "{{ post.title | xml_escape }}",
        "author": "{{ post.author | xml_escape }}",
        "category": "{{ post.category | xml_escape }}",
        "content": {{ post.content | strip_html | strip_newlines | jsonify }},
        "url": "{{ post.url | xml_escape }}"
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];

const options = {
  keys: ['title'],
  includeMatches: true,
  minMatchCharLength: 1,
  ignoreLocation: true,
  threshold: 0.2
}

const fuse = new Fuse(documents, options)

var search_form = document.getElementById('search-input')
var results_c = document.getElementById('search-results')
var search_container = document.getElementById('search-container')

function display_title(r) {
  results_string = ''
  indices = []
  r.matches.forEach( function(m) {
    if ( m.key == "title" ) {
      m.indices.forEach( function(i) {
        indices.push( i );
      } );
    }
  } );

  var title = r.item.title

  var start = 0
  indices.forEach( function(i) {
    // Normal text
    results_string += title.substring(start, i[0])
    // Highlighted
    results_string += '<span class="highlight">' + title.substring(i[0], i[1] + 1) + "</span>"
    start = i[1] + 1
  } )

  results_string += title.substring(start)

  return results_string
}

search_form.addEventListener("input", function (e) {
  var results = fuse.search(this.value)
  var results_string = ''
  results.forEach( function(r) {

    results_string += "<li><a href=\"" + r.item.url + "\">" + display_title(r) + "</a></li>"
  } )
  if ( ( this.value.length > 0 ) && ( results.length == 0 ) ) {
    results_string = "<li>No Results Found</li>"
  }
  results_c.innerHTML = results_string
  update_display()
} );

var hovering = false
var focused = false
function update_display() {
  if ( ( hovering || focused ) && ( search_form.value.length > 0 ) ) {
    results_c.style.display = "flex"
  } else if ( ( !hovering && !focused ) || ( search_form.value.length == 0 ) ) {
    results_c.style.display = "none"
  }
}

search_form.addEventListener("focus", function(e) {
  focused = true
  update_display()
} );

search_form.addEventListener("blur", function(e) {
  focused = false
  update_display()
} );

results_c.addEventListener("mouseenter", function(e) {
  hovering = true
  update_display()
} );

results_c.addEventListener("mouseleave", function(e) {
  hovering = false
  update_display()
} );

results_c.addEventListener("mousedown", function(e) {
  e.preventDefault()
} );
