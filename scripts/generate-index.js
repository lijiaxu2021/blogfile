const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'images');
const indexDir = path.join(__dirname, '..', 'index');

if (!fs.existsSync(imagesDir)) {
  console.log('No images directory found');
  process.exit(0);
}

const monthlyIndex = {};

function scanDirectory(dir, relativePath = '') {
  if (!fs.existsSync(dir)) return;
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const itemRelativePath = path.join(relativePath, item.name);
    
    if (item.isDirectory()) {
      scanDirectory(fullPath, itemRelativePath);
    } else if (item.isFile() && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(item.name)) {
      const dateMatch = item.name.match(/(\d{4})(\d{2})(\d{2})/);
      if (dateMatch) {
        const year = dateMatch[1];
        const month = dateMatch[2];
        const key = `${year}-${month}`;
        
        if (!monthlyIndex[key]) {
          monthlyIndex[key] = [];
        }
        
        monthlyIndex[key].push({
          name: item.name,
          path: itemRelativePath.replace(/\\/g, '/'),
          url: `/proxy/image/${itemRelativePath.replace(/\\/g, '/')}`,
          size: fs.statSync(fullPath).size,
          createdAt: new Date(year, parseInt(month) - 1, dateMatch[3] || 1).toISOString()
        });
      }
    }
  }
}

scanDirectory(imagesDir);

if (!fs.existsSync(indexDir)) {
  fs.mkdirSync(indexDir, { recursive: true });
}

for (const [month, images] of Object.entries(monthlyIndex)) {
  const indexPath = path.join(indexDir, `${month}.json`);
  fs.writeFileSync(indexPath, JSON.stringify({
    month,
    total: images.length,
    images: images.sort((a, b) => b.name.localeCompare(a.name))
  }, null, 2));
  console.log(`Generated index for ${month}: ${images.length} images`);
}

const masterIndex = path.join(indexDir, 'master.json');
fs.writeFileSync(masterIndex, JSON.stringify({
  generatedAt: new Date().toISOString(),
  months: Object.keys(monthlyIndex).sort().reverse(),
  totalImages: Object.values(monthlyIndex).reduce((sum, arr) => sum + arr.length, 0)
}, null, 2));

console.log('Master index generated');
