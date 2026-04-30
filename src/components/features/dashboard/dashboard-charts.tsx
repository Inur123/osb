"use client"

import {
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon 
} from "lucide-react"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const lineChartConfig = {
  pendaftar: {
    label: "Pendaftar",
    color: "#10b981",
  },
} satisfies ChartConfig

const pieChartConfig = {
  ipnu: {
    label: "IPNU",
    color: "#2563eb",
  },
  ippnu: {
    label: "IPPNU",
    color: "#db2777",
  },
} satisfies ChartConfig

interface DashboardChartsProps {
  weeklyData: { week: string; count: number }[]
  genderData: { name: string; value: number; fill: string }[]
}

export function DashboardCharts({ weeklyData, genderData }: DashboardChartsProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-10">
      {/* Line Chart - 70% */}
      <div className="lg:w-[70%] flex flex-col">
        <Card className="flex-1 border rounded-xl bg-card shadow-sm overflow-hidden">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-xl font-bold tracking-tight text-foreground">Tren Pendaftaran</CardTitle>
            <CardDescription className="text-sm">Jumlah pendaftar baru per minggu</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-4 flex-1 flex flex-col justify-center min-h-[300px]">
            {weeklyData.every(d => d.count === 0) ? (
              <div className="flex flex-col items-center justify-center py-10 text-muted-foreground italic gap-2">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <LineChartIcon className="size-6 opacity-20" />
                </div>
                <p className="text-sm">Belum ada data pendaftaran.</p>
              </div>
            ) : (
              <ChartContainer config={lineChartConfig} className="h-[300px] w-full">
                <LineChart
                  data={weeklyData}
                  margin={{ left: 0, right: 10, top: 10, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted/50" />
                  <XAxis
                    dataKey="week"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    className="text-xs font-medium"
                  />
                  <YAxis 
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    className="text-xs font-medium"
                  />
                  <ChartTooltip content={<ChartTooltipContent className="rounded-xl border-none shadow-2xl" />} />
                  <Line
                    type="monotone"
                    dataKey="count"
                    name="Pendaftar"
                    stroke="var(--color-pendaftar)"
                    strokeWidth={4}
                    dot={{ r: 5, fill: "var(--color-pendaftar)", strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 7, strokeWidth: 0 }}
                  />
                </LineChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart - 30% */}
      <div className="lg:w-[30%] flex flex-col">
        <Card className="flex-1 border rounded-xl bg-card shadow-sm overflow-hidden">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-xl font-bold tracking-tight text-foreground">Organisasi</CardTitle>
            <CardDescription className="text-sm">IPNU vs IPPNU</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-4 flex-1 flex flex-col justify-center min-h-[300px]">
            {genderData.every(d => d.value === 0) ? (
              <div className="flex flex-col items-center justify-center py-10 text-muted-foreground italic gap-2">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <PieChartIcon className="size-6 opacity-20" />
                </div>
                <p className="text-sm text-center">Data organisasi<br/>belum tersedia.</p>
              </div>
            ) : (
              <ChartContainer config={pieChartConfig} className="h-[300px] w-full">
                <PieChart>
                  <Pie
                    data={genderData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={5}
                    cornerRadius={4}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent className="rounded-xl border-none shadow-2xl" />} />
                  <ChartLegend content={<ChartLegendContent className="pt-4 font-bold text-xs" />} />
                </PieChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
