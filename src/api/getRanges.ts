type Range = { min: number | null; max: number | null };
type Ranges = Record<'pump_power' | 'pump_head' | 'pump_flow', Range>;

export async function getRanges(): Promise<Ranges> {
  const res = await fetch('/wp-json/pumps/v1/ranges');
  if (!res.ok) {
    throw new Error(`Ranges: ${res.status}`);
  }
  return res.json();
}
