import React, { Component } from 'react';
import ReactApexChart from "react-apexcharts";

class ApexChart extends Component {

    constructor(props) {
        super(props);

        this.state = {

            series: [
                {
                    name: 'Heart Rate',
                    data: [21, 22, 10, 16],
                },
                {
                    name: 'Calories',
                    data: [14, 44, 34, 22],
                },
                {
                    name: 'Av. Speed',
                    data: [42, 21, 52, 59],
                },
                {
                    name: 'Distance',
                    data: [9, 16, 33, 4],
                }
            ],
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
                        ['test', 'test']
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
        console.log(this.props.checked)
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
            </div>
        );
    }

}

export default ApexChart;