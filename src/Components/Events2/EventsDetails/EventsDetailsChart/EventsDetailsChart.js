import React, { Component } from 'react';
import ReactApexChart from "react-apexcharts";

class ApexChart extends Component {

    constructor(props) {
        super(props);

        this.state = {

            series: [
                {
                    name: 'Heart Rate',
                    data: [10, 22, 10, 16],
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

    modifica = () => {

        const max = 90;
        const min = 30;
        const newSeries = [];

        this.state.series.forEach(s => {
            const data = s.data.map(() => {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            });
            newSeries.push({ data: data });
        });

        console.log('viteza: ',Math.floor(Math.random() * (max - min + 1)) + min)

        this.setState({
            series: newSeries,
            options: {
                xaxis: {
                    categories: this.props.name,

                }
            },
        })
    }

    render() {
        return (
            <div id="chart">
                {console.log('data: ', this.props.data)}
                <button onClick={() => this.modifica()}>update</button>
                {console.log('props: ', this.props.name)}
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
            </div>
        );
    }

}

export default ApexChart;