function conbin(n, r) {
    if (n / 2 >= r) {
        let num = 1;
        for (let i = 0; i < r; i++) {
            num *= (n - i) / (i + 1);
        }
        return num;
    } else {
        let num = 1;
        for (let i = 0; i < n - r; i++) {
            num *= (n - i) / (i + 1);
        }
        return num;
    }
}

var myChart = null;

function main() {
    var ctx = document.getElementById('myChart').getContext('2d');
    if (myChart !== null) {
        myChart.destroy();
    }
    let a = Number(document.getElementById('g').value);
    let b = Number(document.getElementById('t').value);
    let c = Number(document.getElementById('p').value);
    let n = document.getElementById('n').value;
    let h_list = [1];
    let label = ["1人"];
    let inv = [1];
    for (let i = 2; i <= n; i++) {
        let h = 0;
        for (let j = 1; j < i; j++) {
            h += conbin(i - 1, j - 1) * a ** (i - j) * c ** (j - 1) * h_list[j - 1];
        }
        h /= (a + c) ** (i - 1) + (b + c) ** (i - 1) - 2 * c **(i - 1);
        h_list.push(h);
        label.push(i + "人");
        inv.push(1 / i);
    }

    var data = {
        labels: label,
        datasets: [
            {
                label: '勝率',
                data: h_list,
                fill: false,
                borderColor: 'rgb(255, 50, 50)',
                tension: 0
            },
            {
                label: '1/n',
                data: inv,
                fill: false,
                borderColor: 'rgb(50, 50, 255)',
                tension: 0
            }
        ]
    };

    var config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {beginAtZero: true}
            }
        }
    };

    window.myChart = new Chart(ctx, config);
};

main();
