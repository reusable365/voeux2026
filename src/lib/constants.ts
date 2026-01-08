import sovalemData from "@/data/sovalem_data.json";

export const CONVERSION_CONSTANTS = {
    SAC_30L_TO_KWH: 2.2,
    HEAT_NETWORK_YIELD: 0.87,
    BASE_YEAR: 2011,
    TOTAL_TONS_TARGET: sovalemData.historique.tonnage_cumule,
};

export const PERFORMANCE_2025 = {
    TONS: sovalemData.stats_2025.tonnage_incinere,
    ELECTRICITY_MWH: sovalemData.stats_2025.mwh_electrique,
    HEAT_MWH: sovalemData.stats_2025.mwh_thermique,
    HOURS_OP: sovalemData.stats_2025.heures_fonct,
};
