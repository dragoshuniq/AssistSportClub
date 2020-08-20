import React, { Component } from 'react';
import ReactApexChart from "react-apexcharts";

class ApexChart2 extends Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: 'HeartRate',
                type: 'column',
                data: [1, 1, 1, 1]
            }, {
                name: 'Calories',
                type: 'column',
                data: [2, 2, 2, 2]
            }, {
                name: 'Av.Speed',
                type: 'column',
                data: [3, 3, 3, 3]
            }, {
                name: 'Distance',
                type: 'column',
                data: [4, 4, 4, 4]
            }
        ],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    stacked: false
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: [1, 1, 4]
                },
                title: {
                    text: 'XYZ - Stock Analysis (2009 - 2016)',
                    align: 'left',
                    offsetX: 110
                },
                xaxis: {
                    categories: [2009, 2010, 2011, 2012],
                },
                yaxis: [
                    {
                        axisTicks: {
                            show: false,
                        },
                        axisBorder: {
                            show: false,
                            color: '#008FFB'
                        },
                        labels: {
                            style: {
                                colors: '#008FFB',
                            }
                        },
                        title: {
                            // text: "Income (thousand crores)",
                            style: {
                                color: '#008FFB',
                            }
                        },
                        tooltip: {
                            enabled: true
                        }
                    },
                    {
                        seriesName: 'HeartRate',
                        opposite: false,
                        axisTicks: {
                            show: false,
                        },
                        axisBorder: {
                            show: false,
                            color: '#00E396'
                        },
                        labels: {
                            show: false,
                            style: {
                                colors: '#00E396',
                            }
                        },
                        title: {
                            // text: "Operating Cashflow (thousand crores)",
                            style: {
                                color: '#00E396',
                            }
                        },
                    },
                    {
                        seriesName: 'Calories',
                        opposite: false,
                        axisTicks: {
                            show: false,
                        },
                        axisBorder: {
                            show: false,
                            color: '#00E396'
                        },
                        labels: {
                            show: false,
                            style: {
                                colors: '#00E396',
                            }
                        },
                        title: {
                            // text: "Operating Cashflow (thousand crores)",
                            style: {
                                color: '#00E396',
                            }
                        },
                    },
                    {
                        seriesName: 'Av.Speed',
                        opposite: false,
                        axisTicks: {
                            show: false,
                        },
                        axisBorder: {
                            show: false,
                            color: '#00E396'
                        },
                        labels: {
                            show: false,
                            style: {
                                colors: '#00E396',
                            }
                        },
                        title: {
                            // text: "Operating Cashflow (thousand crores)",
                            style: {
                                color: '#00E396',
                            }
                        },
                    },
                    {
                        seriesName: 'Distance',
                        opposite: false,
                        axisTicks: {
                            show: false,
                        },
                        axisBorder: {
                            show: false,
                            color: '#FEB019'
                        },
                        labels: {
                            show: false,
                            style: {
                                colors: '#FEB019',
                            },
                        },
                        title: {
                            // text: "Revenue (thousand crores)",
                            style: {
                                color: '#FEB019',
                            }
                        }
                    },
                ],
                tooltip: {
                    fixed: {
                        enabled: true,
                        position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                        offsetY: 30,
                        offsetX: 60
                    },
                },
                legend: {
                    horizontalAlign: 'left',
                    offsetX: 40
                }
            },


        };
    }


    changeCart = () => {
        const datas = this.state.series;
        const obj = datas[0];
        const ser = obj.data;
        const cacat = [0, 0, 0, 0, 0, 0, 0, 0];
        obj.data = cacat;
        datas[0] = obj;
        

        this.setState({ series: datas });
    console.log('series: ',this.state.series)
    }


    render() {
        return (
            <>
                <div id="chart">
                    <button onClick={() => this.changeCart()}>hfhtyfuhj</button>
                    <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
                </div>
            </>
        );
    }
}

export default ApexChart2;