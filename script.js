Vue.createApp({
    data: function () {
        return {
            workoutCounter: 3,
            reps: 0,
            rows: [{
                    weight: "",
                    date: new Date().toISOString().slice(0, 10),
                    sets: ""
                }]
        };
    },
    methods: {
        setStartingWeight: function () {
            this.rows[0].weight = this.startWeight;
        },
        endWorkout: function () {
            // this.rows.weight = this.startingWeight
            this.workoutCounter++;
            // this.rows[0].weight = this.rows[0].weight+5;
            var newWeight = 0;
            if (this.reps > 5) {
                newWeight = this.rows[0].weight + 5;
            }
            this.rows.push({
                weight: newWeight,
                date: new Date().toISOString().slice(0, 10),
                sets: 5
            });
        }
    }
}).mount('main');
//# sourceMappingURL=script.js.map