declare var Vue: any;
declare var CanvasJS: any;

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
        //get sample workouts from json
        async loadSampleData() {
            window.localStorage.clear();
            let response = await fetch('data.json');
            let json = await response.json();
            Object.entries(json)
                .forEach(([k, v]) => localStorage.setItem(k, v))
            window.location.reload();
        },
        //get data from local storage for pages by id      
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
                if (this.dataPoints[0].x>1) {
                    for (let i = 0; i < this.dataPoints.length; i++) {
                        this.dataPoints[i].x = i+1
                    }
    
                }
                
                switch (id) {
                    case "Bench":
                        name = "Bench Press Progress"
                        this.workoutWeightB = JSON.parse(window.localStorage.getItem('workoutWeight' + id));
                        this.workoutNrB = JSON.parse(window.localStorage.getItem('workoutNr' + id));
                        this.totalB = JSON.parse(window.localStorage.getItem('total' + id));
                        this.loadCanvasData(this.dataPoints, this.canvasBench);

                        break;
                    case "Squat":
                        name = "Squat Progress"
                        this.workoutWeightS = JSON.parse(window.localStorage.getItem('workoutWeight' + id));
                        this.workoutWeightS = JSON.parse(window.localStorage.getItem('workoutWeight' + id));
                        this.workoutNrS = JSON.parse(window.localStorage.getItem('workoutNr' + id));
                        this.totalS = JSON.parse(window.localStorage.getItem('total' + id));
                        this.loadCanvasData(this.dataPoints, this.canvasSquat);

                        break;
                    case "Deadl":
                        name = "Deadlift Progress"
                        this.workoutWeightD = JSON.parse(window.localStorage.getItem('workoutWeight' + id));
                        this.workoutNrD = JSON.parse(window.localStorage.getItem('workoutNr' + id));
                        this.totalD = JSON.parse(window.localStorage.getItem('total' + id));
                        this.loadCanvasData(this.dataPoints, this.canvasDeadl);

                        break;
                }
            }

        },

        loadCanvasData(dataArray, canvas) {
            let previousX = 15;
            let previousY = 0;

            for (let i = 1; i < dataArray.length; i++) {

                this.drawLine(
                    canvas,
                    previousX,
                    previousY,
                    dataArray[i].x * 15,
                    dataArray[i].y - dataArray[i - 1].y + previousY
                );
                previousX = dataArray[i].x * 15;
                previousY = dataArray[i].y - dataArray[i - 1].y + previousY;
            }



        },

        drawLine(c, x1, y1, x2, y2) {
            c.beginPath();
            c.strokeStyle = 'whitesmoke';
            c.lineWidth = 1;
            c.moveTo(x1, y1);
            c.lineTo(x2, y2);
            c.stroke();
            c.closePath();
            c.fillStyle = 'whitesmoke';
            c.fillRect(x2 - 2, y2, 5, 1);
            c.fillRect(x2, y2 - 2, 1, 5);
            // c.setLineDash([5,10,15])
            // c.fillText("hello baby")
        }

    },
    mounted() {

        this.canvasBench = this.$refs.Bench.getContext('2d');
        this.canvasBench.transform(1, 0, 0, -1, 10, 140);
        this.canvasSquat = this.$refs.Squat.getContext('2d');
        this.canvasSquat.transform(1, 0, 0, -1, 10, 140);
        this.canvasDeadl = this.$refs.Deadl.getContext('2d');
        this.canvasDeadl.transform(1, 0, 0, -1, 10, 140);
        // this.canvas.scale(0.65,0.99);
        this.getData("Bench");
        this.getData("Squat")
        this.getData("Deadl")

    },
}).mount('body');
