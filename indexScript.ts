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
                // if (this.dataPoints[0].x > 1) {
                //     for (let i = 0; i < this.dataPoints.length; i++) {
                //         this.dataPoints[i].x = i + 1
                //     }

                // }

                switch (id) {
                    case "Bench":
                        name = "Bench Press Progress"
                        // this.canvasBench.scale(0,75.75);
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

        loadCanvasData(dataPoints, canvas) {
            let previousX = 27;
            let previousY = 0;

            // this.drawTicks(canvas);

            for (let i = 1; i < dataPoints.length; i++) {

                this.drawLine(
                    dataPoints,
                    i,
                    canvas,
                    previousX,
                    previousY,
                    previousX + 27,
                    dataPoints[i].y - dataPoints[i - 1].y + previousY
                );
                previousX += 27;
                previousY = dataPoints[i].y - dataPoints[i - 1].y + previousY;

                // if previousY is bigger than graph height scale down y    

            }
        },

        // drawTicks(c) {

        //     for (let xy = 0; xy < 400; xy += 10) {

        //         c.fillStyle = 'whitesmoke';
        //         c.fillRect(0, xy, 3, 1);
        //     }
        // },

        drawLine(dataPoints, i, c, x1, y1, x2, y2) {
            let font = "8px LCD"
            let diff = dataPoints[dataPoints.length-1].y-dataPoints[0].y;
            // change height, 225kg 0.5 ,200kg 0.57,175kg 0.66,150kg 0.77,125kg 0.9, 100kg 1.13, 75kg 1.5 ,50kg 2.2


            if (diff>175) {
                y1 *= 0.5
                y2 *= 0.5
            }
            else if (diff>=145) {
                y1 *= 0.75
                y2 *= 0.75
            }
            else if (diff>=120) {
                y1 *= 0.9
                y2 *= 0.9
            }
            else if (diff>=90) {
                y1 *= 1.1
                y2 *= 1.1
            }
            else{
                y1 *= 1.5
                y2 *= 1.5
            }
            


            if (i === 1) {
                c.fillStyle = 'whitesmoke';
                c.fillRect(x1 - 20, y1, 23, 1);
                c.fillRect(x1, y1 - 2, 1, 5);
                c.save();
                c.transform(1, 0, 0, -1, 0, 140);
                c.font = font
                c.fillText(dataPoints[i - 1].y, x1 - 10, 140 - y1 - 3)
                c.fillText(dataPoints[i - 1].x, x1, 150)
                c.restore();
            }
            c.beginPath();
            c.strokeStyle = 'whitesmoke';
            c.lineWidth = 1;
            c.moveTo(x1, y1);
            c.lineTo(x2, y2);
            c.stroke();
            c.closePath();
            c.fillStyle = 'whitesmoke';
            c.fillRect(x2 - 20, y2, 23, 1);
            c.fillRect(x2, y2 - 2, 1, 5);
            c.fillRect(x2, -2, 1, 5);
            c.save();
            c.transform(1, 0, 0, -1, 0, 140);
            c.font = font
            c.fillText(dataPoints[i].y, x2 - 10, 140 - y2 - 3)
            c.fillText(dataPoints[i].x, x2, 150)
            c.restore();
        },
        setCanvasScale(canvas, htmlCanvas, e) {


            var size = 200;
            canvas.width = size;
            canvas.height = size;
            var scale = window.devicePixelRatio + 1;
            htmlCanvas[e].width = Math.floor((size + 90) * scale);
            htmlCanvas[e].height = Math.floor((size - 45) * scale);
            canvas.scale(scale, scale);
            canvas.textAlign = 'center';
            canvas.transform(1, 0, 0, -1, 0, 140);


        }

    },
    mounted() {


        this.htmlCanvas = document.querySelectorAll("canvas");

        this.canvasBench = this.$refs.Bench.getContext('2d');
        this.setCanvasScale(this.canvasBench, this.htmlCanvas, 0)

        this.canvasSquat = this.$refs.Squat.getContext('2d');
        this.setCanvasScale(this.canvasSquat, this.htmlCanvas, 1)

        this.canvasDeadl = this.$refs.Deadl.getContext('2d');
        this.setCanvasScale(this.canvasDeadl, this.htmlCanvas, 2)

        this.getData("Bench");
        this.getData("Squat")
        this.getData("Deadl")

    },
}).mount('body');
