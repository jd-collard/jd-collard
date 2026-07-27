(function () {
  var container = document.getElementById('posthaven-feed');
  if (!container) return;
  var feedUrl = container.getAttribute('data-feed');
  if (!feedUrl) return;

  var proxy = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feedUrl);

  fetch(proxy)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var items = data && data.items;
      if (!items || items.length === 0) return;
      var html = items.slice(0, 5).map(function (item) {
        var title = item.title || 'Untitled';
        var link = item.link || '#';
        var date = item.pubDate ? new Date(item.pubDate) : null;
        var dateStr = '';
        if (date && !isNaN(date)) {
          dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
        return '<a class="posthaven-item" href="' + link + '" target="_blank" rel="noopener noreferrer">' +
          '<span class="ph-title">' + escapeHtml(title) + '</span>' +
          (dateStr ? '<span class="ph-date">' + dateStr + '</span>' : '') +
          '</a>';
      }).join('');
      if (html) container.innerHTML = html;
    })
    .catch(function () {});

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
})();
