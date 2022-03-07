declare var Vue: any;
declare var CanvasJS: any;
//graph from API
//html layout
//finishing CSS
//better names for variables
//remove induvidual workouts



Vue.createApp({
    data() {
        return {
            workoutWeight: [],
            reps: [],
            startWeight: "",
            completedWorkouts: [],
            date: new Date().toISOString().slice(0, 10),
            total: 0,
            workoutNr: 1,
            toggle: false,
            id: "",
            dataPoints: [],
            dataLength:10
        };
    },
    methods: {

    },
    mounted() {
        this.completedWorkouts = JSON.parse(window.localStorage.getItem('completedWorkoutsBench'));

        for (let i = 0; i < this.completedWorkouts.length; i++) {

            this.dataPoints.unshift({ y: this.completedWorkouts[i].total, x:this.completedWorkouts[i].workoutNr})
        }

        if (this.completedWorkouts.length > this.dataLength) {

            for (let i = 0; i < this.completedWorkouts.length-this.dataLength; i++) {
                this.dataPoints.shift();            
            }            
        }

        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "dark2",
            backgroundColor: "grey",
            title: {
                text: "Progress"
            },
            axisX:{
                title: "Workout number",
                interval: 1
            },
            axisY:{
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








    },
}).mount('main');
