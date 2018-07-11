---
---
/**
 * @name  {{ site.name }}
 * @description  {{ site.description }}
 * @author  {{ site.author }} <{{ site.author_email }}> ({{ site.url }})
 * @version  {{ site.version }}
 * @copyright  {{ site.author }} 2017
 * @license  {{ site.license }}
 */

self.addEventListener('message', function (e) {
    var source = e.data.source;

    self._window = self.window;
    self.window = {};

    if (e.data.beautify) {
        self.importScripts('{{ "/assets/js/lib/js-beautify/beautify.min.js" | relative_url }}');
        source = self.window.js_beautify(source, {
            unescape_strings: true,
            jslint_happy: true
        });
    }

    self.window = self._window;

    if (e.data.highlight) {
        self.importScripts('{{ "/assets/js/lib/highlight-js/highlight.pack.js" | relative_url }}');
        source = self.hljs.highlight('javascript', source).value;
    }

    self.postMessage(source);
});
