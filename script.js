document.addEventListener('DOMContentLoaded', function () {
    // Mock data for all months in Kenya Shillings
    const revenueData = [2000, 3000, 4000, 3500, 5000, 6000, 5500, 4500, 4200, 3800, 4200, 4800];
    const revenueLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Determine thresholds for revenue levels
    const maxRevenue = Math.max(...revenueData);
    const minRevenue = Math.min(...revenueData);
    const thresholdHigh = maxRevenue * 0.8; // 80% of max revenue
    const thresholdMedium = maxRevenue * 0.5; // 50% of max revenue

    // Define colors based on revenue levels
    const backgroundColors = revenueData.map(revenue => {
        if (revenue >= thresholdHigh) {
            return '#00FF00'; // Green for high revenue
        } else if (revenue >= thresholdMedium) {
            return '#FFFF00'; // Yellow for medium revenue
        } else if (revenue === minRevenue) {
            return '#FF0000'; // Red for lowest revenue
        } else {
            // Use purple, indigo, and blue for other segments
            const colors = ['rgba(128, 0, 128, 0.5)', 'rgba(75, 0, 130, 0.5)', 'rgba(0, 0, 255, 0.5)'];
            return colors[(revenueData.indexOf(revenue) - 3) % colors.length];
        }
    });

    // Calculate total revenue in KES
    const totalRevenue = revenueData.reduce((acc, curr) => acc + curr, 0);

    // Create revenue pie chart
    const ctxPie = document.getElementById('revenuePieChart').getContext('2d');
    const revenuePieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: revenueLabels,
            datasets: [{
                label: 'Revenue',
                data: revenueData,
                backgroundColor: backgroundColors
            }]
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    color: 'white', // Text color
                    formatter: function(value, context) {
                        return `${context.chart.data.labels[context.dataIndex]}: KES ${value.toLocaleString()}`; // Formatting revenue in KES
                    },
                    backgroundColor: function(context) {
                        return context.dataset.backgroundColor;
                    },
                    borderRadius: 5,
                    font: {
                        weight: 'bold'
                    }
                }
            },
            // Display total revenue in the chart
            title: {
                display: true,
                text: `Total Revenue: KES ${totalRevenue.toLocaleString()}`,
                position: 'bottom'
            }
        }
    });
});
