"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, CartesianGrid } from "recharts";
import { BarChart3, PieChart as PieChartIcon } from "lucide-react";

interface DashboardChartsProps {
    memberGrowthData: { name: string; total: number }[];
    categoryData: { name: string; value: number }[];
}

const COLORS = ['#D61F69', '#5B0F75', '#FFD700', '#00C49F', '#6366F1', '#F59E0B'];

export function DashboardCharts({ memberGrowthData, categoryData }: DashboardChartsProps) {
    const totalCategory = categoryData.reduce((sum, c) => sum + c.value, 0);

    return (
        <div className="grid gap-6 lg:grid-cols-7">
            <Card className="lg:col-span-4">
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-pink-500" />
                        <CardTitle className="text-base">Crecimiento de Socias</CardTitle>
                    </div>
                    <CardDescription>Nuevas socias por mes (últimos 6 meses)</CardDescription>
                </CardHeader>
                <CardContent className="pl-2 pt-4">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={memberGrowthData} barCategoryGap="20%">
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--popover))',
                                    borderColor: 'hsl(var(--border))',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                }}
                                labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
                                itemStyle={{ color: '#D61F69' }}
                                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }}
                            />
                            <Bar dataKey="total" fill="#D61F69" radius={[6, 6, 0, 0]} name="Socias" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="lg:col-span-3">
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                        <PieChartIcon className="h-4 w-4 text-violet-500" />
                        <CardTitle className="text-base">Eventos por Categoría</CardTitle>
                    </div>
                    <CardDescription>{totalCategory} eventos totales</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                    {categoryData.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-12 text-center">Sin datos de eventos</p>
                    ) : (
                        <>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={4}
                                        dataKey="value"
                                        strokeWidth={2}
                                        stroke="hsl(var(--background))"
                                    >
                                        {categoryData.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--popover))',
                                            borderColor: 'hsl(var(--border))',
                                            borderRadius: '8px',
                                            fontSize: '13px',
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 space-y-2">
                                {categoryData.map((entry, index) => (
                                    <div key={entry.name} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="h-3 w-3 rounded-sm"
                                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                            />
                                            <span className="text-muted-foreground">{entry.name}</span>
                                        </div>
                                        <span className="font-medium">{entry.value}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
