import React from 'react';
import {BarChart, Bar, ResponsiveContainer, XAxis, Tooltip} from "recharts";

export function SimpleLineChart(props) {
    const { data } = props;
    return (
        <ResponsiveContainer width="99%" height={225}>
            <BarChart data={data}>
                <XAxis dataKey="name"/>
                <Tooltip/>
                <Bar dataKey="sales" fill="#8884d8" name="Скидки" />
                <Bar dataKey="promoCodes" fill="#82ca9d" name="Промокоды" />
            </BarChart>
        </ResponsiveContainer>
    );
}

