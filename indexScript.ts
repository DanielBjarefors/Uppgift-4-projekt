declare var Vue: any;
declare var CanvasJS: any;
//graph from API
//html layout
//finishing CSS
//remove induvidual workouts



Vue.createApp({
    data() {
        return {
            completedWorkouts: [],
            dataPoints: [],
            dataLength: 10,

            workoutWeightB: [],
            workoutWeightS: [],
            workoutWeightD: [],

            totalB: 0,
            totalS: 0,
            totalD: 0,

            workoutNrB: 1,
            workoutNrS: 1,
            workoutNrD: 1,

        };
    },
    methods: {
        async loadSampleDatat() {

            window.localStorage.clear();

            let response = await fetch('data.json');
            let json = await response.json();

            Object.entries(json)
            .forEach(([k, v]) => localStorage.setItem(k, v))
            window.location.reload();


            // Object.entries({ "totalBench": "515", "workoutNrBench": "4", "completedWorkoutsSquat": "[{\"workoutWeight\":[105,105,110,110,105],\"reps\":[5,6,5,5,5],\"date\":\"2022-03-08\",\"total\":535,\"workoutNr\":4},{\"workoutWeight\":[105,105,105,105,100],\"reps\":[5,5,6,6,6],\"date\":\"2022-03-08\",\"total\":520,\"workoutNr\":3},{\"workoutWeight\":[105,105,105,105,100],\"reps\":[5,5,5,5,5],\"date\":\"2022-03-08\",\"total\":520,\"workoutNr\":2},{\"workoutWeight\":[100,100,100,100,100],\"reps\":[6,6,6,6,5],\"date\":\"2022-03-08\",\"total\":500,\"workoutNr\":1}]", "totalSquat": "540", "totalDeadl": "530", "completedWorkoutsBench": "[{\"workoutWeight\":[100,105,105,100,100],\"reps\":[6,5,5,5,5],\"date\":\"2022-03-08\",\"total\":510,\"workoutNr\":3},{\"workoutWeight\":[100,105,100,100,100],\"reps\":[5,5,6,5,5],\"date\":\"2022-03-08\",\"total\":505,\"workoutNr\":2},{\"workoutWeight\":[100,100,100,100,100],\"reps\":[5,6,5,5,5],\"date\":\"2022-03-08\",\"total\":500,\"workoutNr\":1}]", "workoutNrDeadl": "5", "workoutWeightSquat": "[105,110,110,110,105]", "completedWorkoutsDeadl": "[{\"workoutWeight\":[110,105,105,105,105],\"reps\":[5,5,5,5,5],\"date\":\"2022-03-08\",\"total\":530,\"workoutNr\":4},{\"workoutWeight\":[105,105,105,105,105],\"reps\":[6,5,5,5,5],\"date\":\"2022-03-08\",\"total\":525,\"workoutNr\":3},{\"workoutWeight\":[105,105,100,100,100],\"reps\":[5,5,6,6,6],\"date\":\"2022-03-08\",\"total\":510,\"workoutNr\":2},{\"workoutWeight\":[100,100,100,100,100],\"reps\":[6,6,5,5,5],\"date\":\"2022-03-08\",\"total\":500,\"workoutNr\":1}]", "workoutWeightBench": "[105,105,105,100,100]", "workoutWeightDeadl": "[110,105,105,105,105]", "workoutNrSquat": "5" })
            //     .forEach(([k, v]) => localStorage.setItem(k, v))

           
        },




        getData(id) {
            let name = "";
            let check = JSON.parse(window.localStorage.getItem('completedWorkouts' + id));
            if (check !== null) {
                this.completedWorkouts = JSON.parse(window.localStorage.getItem('completedWorkouts' + id));

                this.dataPoints = [];
                for (let i = 0; i < this.completedWorkouts.length; i++) {

                    this.dataPoints.unshift({ y: this.completedWorkouts[i].total, x: this.completedWorkouts[i].workoutNr })
                }

                if (this.completedWorkouts.length > this.dataLength) {

                    for (let i = 0; i < this.completedWorkouts.length - this.dataLength; i++) {
                        this.dataPoints.shift();
                    }
                }

                switch (id) {
                    case "Bench":
                        name = "Bench Press Progress"
                        this.workoutWeightB = JSON.parse(window.localStorage.getItem('workoutWeight' + id));
                        this.workoutNrB = JSON.parse(window.localStorage.getItem('workoutNr' + id));
                        this.totalB = JSON.parse(window.localStorage.getItem('total' + id));
                        break;
                    case "Squat":
                        name = "Squat Progress"
                        this.workoutWeightS = JSON.parse(window.localStorage.getItem('workoutWeight' + id));
                        this.workoutNrS = JSON.parse(window.localStorage.getItem('workoutNr' + id));
                        this.totalS = JSON.parse(window.localStorage.getItem('total' + id));
                        break;
                    case "Deadl":
                        name = "Deadlift Progress"
                        this.workoutWeightD = JSON.parse(window.localStorage.getItem('workoutWeight' + id));
                        this.workoutNrD = JSON.parse(window.localStorage.getItem('workoutNr' + id));
                        this.totalD = JSON.parse(window.localStorage.getItem('total' + id));
                        break;
                }
            }
            var chart = new CanvasJS.Chart(id, {
                animationEnabled: true,
                theme: "dark2",
                backgroundColor: "grey",
                title: {
                    text: name
                },
                axisX: {
                    title: "Workout number",
                    interval: 1
                },
                axisY: {
                    title: "Total weight",
                    interval: 10
                },
                data: [{
                    type: "line",
                    lineColor: "#00d2be",
                    markerColor: "#00d2be",
                    indexLabelFontSize: 16,
                    dataPoints: this.dataPoints
                }]
            });
            chart.render();
        }
    },
    mounted() {
        this.getData("Bench")
        this.getData("Squat")
        this.getData("Deadl")

    },
}).mount('main');
