Vue.createApp({
    data: function () {
        return {
            workoutCounter: 1,
            rows: [{
                    weight: "",
                    date: new Date().toISOString().slice(0, 10)
                }]
        };
    },
    methods: {
        setStartingWeight: function () {
            this.rows[0].weight = this.startWeight;
        },
        endWorkout: function () {
            // this.rows.weight = this.startingWeight
            this.rows.push({
                weight: this.startWeight,
                workoutCounter: this.workoutCounter + 1,
                date: new Date().toISOString().slice(0, 10)
            });
        }
    }
}).mount('main');
//# sourceMappingURL=script.js.map