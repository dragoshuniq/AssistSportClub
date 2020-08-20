import React, { Component } from 'react';
import ReactApexChart from "react-apexcharts";

class ApexChart extends Component {

    constructor(props) {
        super(props);

        this.state = {

            series: [{
                data: [21, 22, 10, 28, 16, 21, 13, 30, 8, 14, 20, 12],
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'bar',
                    events: {
                        click: function (chart, w, e) {
                            // console.log(chart, w, e)
                        }
                    }
                },
                colors: ['#000'],
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                xaxis: {
                    categories: [
                        ['John', 'Doe'],
                        ['Joe', 'Smith'],
                        ['Jake', 'Williams'],
                        'Amber',
                        ['Peter', 'Brown'],
                        ['Mary', 'Evans'],
                        ['David', 'Wilson'],
                        ['Lily', 'Roberts'],
                        ['test', 'test'],
                        ['test', 'test'],
                        ['test', 'test'],
                        ['test', 'test'],
                    ],
                    labels: {
                        style: {
                            // colors: colors,
                            fontSize: '12px'
                        }
                    }
                }
            },


        };
    }



    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
            </div>
        );
    }

}

export default ApexChart;