const WEEKLY_GRAPH_MOCK = {
  title: 'Grafik Weekly Progress Problem',
  series: [
    {
      name: 'Closed',
      data: [400, 430, 448, 470],
    },
    {
      name: 'On Progress',
      data: [400, 430, 448, 470],
    },
    {
      name: 'Delay',
      data: [400, 430, 448, 470],
    },
  ],
  colors: ['#e20c0c', '#22e00d', '#fff700'],
  categories: ['W1', 'W2', 'W3', 'W4'],
  legends: [
    {
      label: 'Closed',
      color: '#22e00d',
    },
    {
      label: 'On Progress',
      color: '#fff700',
    },
    {
      label: 'Delay',
      color: '#e20c0c',
    },
  ],
  groupBy: 'department',
}

export default WEEKLY_GRAPH_MOCK
