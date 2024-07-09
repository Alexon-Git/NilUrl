const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');

// URLы вашего сайта, которые вы хотите включить в Sitemap
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/main', changefreq: 'weekly', priority: 0.8 },
  { url: '/registration', changefreq: 'monthly', priority: 0.5 },
  { url: '/login', changefreq: 'monthly', priority: 0.5 },
  { url: '/price', changefreq: 'monthly', priority: 0.5 },
  { url: '/setting', changefreq: 'monthly', priority: 0.5 },
  { url: '/links', changefreq: 'monthly', priority: 0.5 },
  { url: '/graph', changefreq: 'monthly', priority: 0.5 },
  { url: '/faq', changefreq: 'monthly', priority: 0.5 },
  // Добавьте другие страницы вашего сайта
];

const sitemap = new SitemapStream({ hostname: 'https://nilurl.ru' });

streamToPromise(sitemap.pipe(createGzip())).then(data => {
  fs.writeFileSync('./public/sitemap.xml.gz', data);
});

links.forEach(link => {
  sitemap.write(link);
});

sitemap.end();