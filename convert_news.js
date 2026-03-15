const fs = require('fs');
const path = require('path');

// Read news.json
const news = JSON.parse(fs.readFileSync('news.json', 'utf-8'));

const date = news.date;
const categories = news.categories;

// Create posts directory
const postsDir = path.join('source', '_posts');
if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
}

// Generate main index page content
let indexContent = `---
title: ${date} 新闻简报
date: ${date} 12:00:00
layout: page
---

# 📰 ${date} 每日新闻

## 🤖 AI / 科技

`;

categories.ai.forEach(item => {
    indexContent += `- [${item.title}](${item.url}) - ${item.summary}\n`;
});

indexContent += `\n## 📈 金融\n\n`;

categories.tech.forEach(item => {
    indexContent += `- [${item.title}](${item.url}) - ${item.summary}\n`;
});

indexContent += `\n## 🌍 美股\n\n`;

if (categories.us_stock.length > 0) {
    categories.us_stock.forEach(item => {
        indexContent += `- [${item.title}](${item.url}) - ${item.summary}\n`;
    });
} else {
    indexContent += `- 暂无\n`;
}

indexContent += `\n---\n*由 教官🤖 自动更新*\n`;

// Write main page
fs.writeFileSync(path.join(postsDir, `${date}.md`), indexContent);

console.log(`Generated news post for ${date}`);
