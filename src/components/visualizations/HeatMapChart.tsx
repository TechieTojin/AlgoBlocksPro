import React from 'react';
import { ResponsiveContainer, Tooltip, Rectangle, ScatterChart, XAxis, YAxis, ZAxis, Scatter } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface HeatMapDataPoint {
  x: number | string;
  y: number | string;
  value: number;
  [key: string]: any;
}

interface HeatMapChartProps {
  data: HeatMapDataPoint[];
  width?: number | string;
  height?: number | string;
  xAxisDataKey?: string;
  yAxisDataKey?: string;
  valueDataKey?: string;
  title?: string;
  description?: string;
  colorRange?: string[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  tooltipFormatter?: (value: number) => string;
  xLabels?: string[];
  yLabels?: string[];
}

interface CustomizedCellProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  payload?: HeatMapDataPoint;
  dataKey?: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: HeatMapDataPoint;
  }>;
}

const defaultColors = ['#f3e5f5', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2'];

export function HeatMapChart({
  data,
  width = '100%',
  height = 400,
  xAxisDataKey = 'x',
  yAxisDataKey = 'y',
  valueDataKey = 'value',
  title = 'Heat Map',
  description = '',
  colorRange = defaultColors,
  xAxisLabel = '',
  yAxisLabel = '',
  tooltipFormatter = (value: number) => `Value: ${value}`,
  xLabels,
  yLabels
}: HeatMapChartProps) {
  // Get unique x and y values for cell positioning
  const uniqueXValues = Array.from(new Set(data.map(item => item.x))).sort((a, b) => 
    typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b))
  );
  const uniqueYValues = Array.from(new Set(data.map(item => item.y))).sort((a, b) => 
    typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b))
  );

  // Use provided labels if available
  const xAxisLabels = xLabels || uniqueXValues;
  const yAxisLabels = yLabels || uniqueYValues;

  // Get min and max values for color scale
  const minValue = Math.min(...data.map(item => item.value));
  const maxValue = Math.max(...data.map(item => item.value));
  const valueRange = maxValue - minValue;

  // Generate the heatmap cells
  const getColor = (value: number) => {
    if (valueRange === 0) return colorRange[colorRange.length - 1];
    
    const normalizedValue = (value - minValue) / valueRange;
    const colorIndex = Math.min(
      Math.floor(normalizedValue * colorRange.length),
      colorRange.length - 1
    );
    return colorRange[colorIndex];
  };

  // Cell renderer for ScatterChart
  const renderCell = (props: CustomizedCellProps) => {
    if (!props || !props.payload) return null;
    
    const { x, y, width, height, payload } = props;
    const value = payload[valueDataKey];
    
    return (
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={getColor(value)}
        stroke="#fff"
        strokeWidth={1}
      />
    );
  };

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-background border rounded shadow p-2 text-xs">
          <p className="font-semibold">{`${dataPoint[xAxisDataKey]}, ${dataPoint[yAxisDataKey]}`}</p>
          <p>{tooltipFormatter(dataPoint[valueDataKey])}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ width, height }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
            >
              <XAxis 
                type="category" 
                dataKey={xAxisDataKey} 
                name={xAxisLabel || xAxisDataKey} 
                allowDuplicatedCategory={false}
                tickLine={false}
                axisLine={true}
                label={{ value: xAxisLabel, position: 'bottom', offset: 20 }}
              />
              <YAxis 
                type="category" 
                dataKey={yAxisDataKey} 
                name={yAxisLabel || yAxisDataKey} 
                allowDuplicatedCategory={false}
                tickLine={false}
                axisLine={true}
                label={{ value: yAxisLabel, angle: -90, position: 'left', offset: -20 }}
              />
              <ZAxis 
                type="number" 
                dataKey={valueDataKey} 
                range={[0, 0]} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter
                data={data}
                shape={renderCell}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 