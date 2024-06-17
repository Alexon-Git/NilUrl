const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'build', 'index.html');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Заменяем <title> и добавляем мета-теги
  const updatedContent = data.replace(
    /<title>.*<\/title>/,
    `<title>NilUrl - Аналитика и сокращение ваших ссылок</title>
    <meta name="description" content="NilUrl предоставляет мощную аналитику ваших ссылок, включая информацию о геолокации, устройстве, браузере и реферере." />
    <meta name="keywords" content="анализ ссылок, сокращение ссылок, геолокация, устройство, браузер, реферер" />
    <meta name="yandex-verification" content="69602e98dddc0155" />
    <script>
        window.YandexRotorSettings = {
            WaiterEnabled: true,
            FailOnTimeout: false,
            NoJsRedirectsToMain: true
        }
    </script>`
  );

  fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Title and meta tags have been updated in index.html');
  });
});