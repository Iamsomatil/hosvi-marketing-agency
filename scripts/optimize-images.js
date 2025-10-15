const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create optimized versions of images
async function optimizeImages() {
  const publicDir = path.join(__dirname, '..', 'public');
  const images = [
    { input: 'hero-hosvi.jpg', output: 'hero-hosvi.webp', width: 1920, quality: 80 },
    { input: 'hosvi-logo.jpg', output: 'hosvi-logo.webp', width: 400, quality: 90 },
  ];

  // Create optimized versions
  await Promise.all(
    images.map(async ({ input, output, width, quality }) => {
      const inputPath = path.join(publicDir, input);
      const outputPath = path.join(publicDir, output);
      
      if (fs.existsSync(inputPath)) {
        await sharp(inputPath)
          .resize(width)
          .webp({ quality })
          .toFile(outputPath);
        console.log(`Optimized ${input} -> ${output}`);
      }
    })
  );

  // Optimize SVG
  const svgPath = path.join(publicDir, 'grid-pattern.svg');
  if (fs.existsSync(svgPath)) {
    const { optimize } = require('svgo');
    const svg = fs.readFileSync(svgPath, 'utf8');
    
    const result = optimize(svg, {
      plugins: [
        { name: 'removeViewBox', active: false },
        { name: 'removeDimensions', active: true },
        { name: 'removeXMLNS', active: true },
      ],
    });
    
    fs.writeFileSync(svgPath, result.data);
    console.log('Optimized grid-pattern.svg');
  }
}

optimizeImages().catch(console.error);
