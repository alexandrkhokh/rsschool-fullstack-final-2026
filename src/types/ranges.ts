export interface Range {
  min: number | null
  max: number | null
}

type PumpsProperties = 'pump_flow' | 'pump_head' | 'pump_power';
export type Ranges = Record<PumpsProperties, Range>
