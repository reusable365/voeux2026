import fs from 'fs';
import path from 'path';
import { HistoricalData, DailyPerformance } from '@/types/data';

export function getHistoricalData(): HistoricalData {
    const filePath = path.join(process.cwd(), 'src/data/history.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
}

export function getDailyPerformance(): DailyPerformance[] {
    const filePath = path.join(process.cwd(), 'src/data/tdb-2025.csv');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');

    const performanceData: DailyPerformance[] = [];

    // Skip the first 33 lines of headers/metadata
    // Data starts at line 34 (0-indexed: 33)
    for (let i = 33; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Split by comma, but handle potential quoted commas if necessary 
        // (the sample didn't show lots of quotes, but numbers like "23,04" use comma as decimal in FR)
        // Actually, "23,04" is in quotes in the CSV: "23,04"
        // We need a proper CSV parser or a regex for this.
        const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

        if (parts.length < 10) continue;

        const date = parts[2]?.trim();
        if (!date || date === 'Date') continue; // Skip header lines repeating if any

        const cleanValue = (val: string) => {
            if (!val) return 0;
            return parseFloat(val.replace(/"/g, '').replace(',', '.').replace(/\s/g, '')) || 0;
        };

        performanceData.push({
            date: date.replace(/"/g, ''),
            day: parts[3]?.replace(/"/g, '').trim() || '',
            tonnage_incinerated: cleanValue(parts[6]),
            availability_percent: cleanValue(parts[12]),
            functioning_hours: cleanValue(parts[13]),
            thermal_production_mwh: cleanValue(parts[51]), // Production thermique SST (Col 51/52 index)
            steam_flow_avg: cleanValue(parts[50]), // Débit vapeur moyen (Col 50)
            electricity_production_mwh: cleanValue(parts[53]), // Energie GTA (Col 53)
            events: parts[19]?.replace(/"/g, '').trim() || '' // Evènements (Col 19)
        });
    }

    return performanceData;
}
