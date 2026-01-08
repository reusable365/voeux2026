import { NextResponse } from 'next/server';
import { getHistoricalData, getDailyPerformance } from '@/lib/dataService';

export async function GET() {
    try {
        const historical = getHistoricalData();
        const performance = getDailyPerformance();

        return NextResponse.json({
            historical,
            performanceCount: performance.length,
            samplePerformance: performance.slice(0, 5),
            lastPerformance: performance[performance.length - 1]
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
