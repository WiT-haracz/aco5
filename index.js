const express = require('express');
const config = require('./config/config.json');

const app = express();
const port = process.env.PORT || 8080;

function formatConfig(config, prefix = '') {
  let html = '<ul>';
  for (const [key, value] of Object.entries(config)) {
    if (typeof value === 'object' && !Array.isArray(value)) {
      html += `<li><strong>${prefix}${key}:</strong> ${formatConfig(value, `${prefix}${key}.`)}</li>`;
    } else {
      html += `<li><strong>${prefix}${key}:</strong> ${value}</li>`;
    }
  }
  html += '</ul>';
  return html;
}

app.get('/', (req, res) => {
  res.send(`
    <h1>Configuration ${process.env.APP_NAME || "Viewer"}</h1>
    <div style="padding: 20px;">
      ${formatConfig(config)}
    </div>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
