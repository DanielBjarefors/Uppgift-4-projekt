Vue.createApp({
    data: function () {
        return {
            header: 'Shopping List App',
            newItem: [],
            startWeight: [],
            reps: [{ set1: 0 }, { set2: 0 }, { set3: 0 }, { set4: 0 }, { set5: 0 }],
            newWeight: '',
            items: []
        };
    },
    methods: {
        saveItem: function () {
            var copy1 = Object.assign({}, this.startWeight);
            var copy2 = Object.assign({}, this.reps);
            this.items.push({
                startWeight: copy1,
                reps: copy2
            }),
                this.startWeight.push(this.reps.set1 > 5 ? this.startWeight[0] + 5 : this.startWeight[0], this.reps.set2 > 5 ? this.startWeight[1] + 5 : this.startWeight[1], this.reps.set3 > 5 ? this.startWeight[2] + 5 : this.startWeight[2], this.reps.set4 > 5 ? this.startWeight[3] + 5 : this.startWeight[3], this.reps.set5 > 5 ? this.startWeight[4] + 5 : this.startWeight[4]);
            this.startWeight.splice(0, 5);
            this.reps.splice(0, 5);
        },
        setStartingWeight: function () {
            this.startWeight.push(this.newWeight, this.newWeight, this.newWeight, this.newWeight, this.newWeight);
            this.newItem = "";
        }
    }
}).mount('main');
// Vue.createApp({
//     data() {
//         return {
//             workoutCounter: 1,
//             weight:[101,102,103,104,105],
//                 set1:0,set2:0,set3:0,set4:0,set5:0,
//                 date: new Date().toISOString().slice(0,10)  ,
//             rows: [{
//                 weight:[101,102,103,104,105],
//                 rep:[6,7,5,4,3],
//                 date: new Date().toISOString().slice(0,10)                                              
//             }],
//         };
//     },
//     methods: {
//         setStartingWeight(){
//             this.rows[0].weight= this.startWeight
//         },
//         endWorkout(){
//             // this.rows.weight = this.startingWeight
//             this.rows.push({
//                 weight: [101,102,103,104,107],
//                 rep:  [this.set1,this.set2,this.set3,this.set4,this.set5],
//                 workoutCounter: this.workoutCounter +1,
//                 date: new Date().toISOString().slice(0,10)
//             });
//         },
//     }
// }).mount('main');
//# sourceMappingURL=script.js.map