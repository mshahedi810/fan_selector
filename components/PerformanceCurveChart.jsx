import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function PerformanceCurveChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="airflow" label={{ value: "Airflow", position: "insideBottomRight", offset: -5 }} />
        <YAxis yAxisId="left" label={{ value: "Static Pressure (Pa)", angle: -90, position: "insideLeft" }} />
        <YAxis yAxisId="right" orientation="right" label={{ value: "Power (kW)", angle: -90, position: "insideRight" }} />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line yAxisId="left" type="monotone" dataKey="staticPressure" stroke="#3b82f6" strokeWidth={2} />
        <Line yAxisId="right" type="monotone" dataKey="power" stroke="#ef4444" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
