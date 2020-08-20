import React from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);

const dataSource = {
  chart: {
    caption: "Life Span of key systems - Top 3 stores",
    subcaption: "(With Error Values)",
    numbersuffix: " Years",
    yaxisname: "Life Span (years)",
    theme: "fusion",
    plottooltext: "Life span of $label in $seriesName is <b>$dataValue</b>"
  },
  categories: [
    {
      category: [
        {
          label: "Central AC"
        },
        {
          label: "Computers"
        },
        {
          label: "Bar-code Scanners"
        },
        {
          label: "Packaging Machines"
        },
        {
          label: "Chilling Compartments"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "Daly City Serramonte",
      data: [
        {
          value: "8",
          errorvalue: "2"
        },
        {
          value: "3",
          errorvalue: "0.5"
        },
        {
          value: "2",
          errorvalue: "1"
        },
        {
          value: "6",
          errorvalue: "1.8"
        },
        {
          value: "8",
          errorvalue: "1.2"
        }
      ]
    },
    {
      seriesname: "Bakersfield Central",
      data: [
        {
          value: "7",
          errorvalue: "1"
        },
        {
          value: "4",
          errorvalue: "0.5"
        },
        {
          value: "2",
          errorvalue: "1"
        },
        {
          value: "4",
          errorvalue: "0.8"
        },
        {
          value: "7",
          errorvalue: "1"
        }
      ]
    },
    {
      seriesname: "Garden Groove harbour",
      data: [
        {
          value: "9",
          errorvalue: "2"
        },
        {
          value: "3",
          errorvalue: "0.7"
        },
        {
          value: "3",
          errorvalue: "1"
        },
        {
          value: "6",
          errorvalue: "1.8"
        },
        {
          value: "7",
          errorvalue: "1.2"
        }
      ]
    }
  ]
};

class EventsDetailsFusioncharts extends React.Component {
  render() {
    return (
      <ReactFusioncharts
        type="errorbar2d"
        width="100%"
        height="100%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    );
  }
}
export default EventsDetailsFusioncharts;