const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../Kutsal_Pazar_Listesi.csv');
const dataJsPath = path.join(__dirname, '../js/data.js');

try {
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const lines = csvContent.split(/\r?\n/);
    const result = [];

    // Helper to parse a CSV line handling quotes
    const parseLine = (line) => {
        const parts = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                parts.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        parts.push(current.trim());
        return parts;
    };

    // Skip header (index 0)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const parts = parseLine(line);
        // Clean quotes from name if present
        let name = parts[0];
        if (name.startsWith('"') && name.endsWith('"')) {
            name = name.slice(1, -1);
        }

        const link = parts[1];
        const price = parseFloat(parts[2]);

        if (name && link && !isNaN(price)) {
            result.push({ name, link, price });
        }
    }

    const fileContent = `/**
 * Nexus Tools - Static Data
 * Generated from Kutsal_Pazar_Listesi.csv
 */

const marketData = ${JSON.stringify(result, null, 4)};
`;

    fs.writeFileSync(dataJsPath, fileContent);
    console.log(`Successfully converted ${result.length} items to data.js`);

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
