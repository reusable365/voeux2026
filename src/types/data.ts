export interface YearlyProduction {
    annee: number;
    tonnage: number;
    mwh_electrique: number;
    mwh_thermique: number;
}

export interface SovalemData {
    stats_2025: {
        tonnage_incinere: number;
        mwh_electrique: number;
        mwh_thermique: number;
        heures_fonct: number;
        dispo_pourcentage: number;
    };
    historique: {
        tonnage_cumule: number;
        invest_initial: number;
        etudes_heures: number;
        tubes_chaudiere_km: number;
    };
    production_history: YearlyProduction[];
    pedagogie: {
        smartphones_recharges: number;
        douches_chaudes: number;
        tours_eiffel_poids: number;
    };
    metadata: {
        last_update: string;
        source: string;
        real_scanned_history: number;
    };
}

export interface HistoricalData {
    tonnage_cumule: number;
    invest_initial: number;
    etudes_heures: number;
    tubes_chaudiere_km: number;
    milestones?: {
        year: number;
        event: string;
    }[];
}

export interface DailyPerformance {
    date: string;
    day: string;
    tonnage_incinerated: number;
    availability_percent: number;
    functioning_hours: number;
    thermal_production_mwh: number;
    steam_flow_avg: number;
    electricity_production_mwh: number;
    events: string;
}
