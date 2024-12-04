var _paq = window._paq = window._paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function () {
    var u = "//log.getmx.com/";
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', '23']);
    _paq.push(["setDomains", ["*.lookup-dns.com"]]);
    _paq.push(["enableCrossDomainLinking"]);
    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript'; g.async = true; g.src = '/js/matomo.js'; s.parentNode.insertBefore(g, s);
})();