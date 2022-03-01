declare var Vue:any;

    Vue.createApp({
        data() {
            return {
                
                rows: [{
                    workoutCounter: 3,
                    weight: "",
                    date: new Date().toISOString().slice(0,10)                                              
                }],
            };
        },
        methods: {
            setStartingWeight(){
                this.rows[0].weight= this.startWeight
            },
            endWorkout(){
                // this.rows.weight = this.startingWeight
                
                this.rows.push({
                    workoutCounter: this.workoutCounter += 2,
                    weight: this.startWeight,                    
                    date: new Date().toISOString().slice(0,10)                
                });
                
            },
            
        }

    }).mount('main');
    
       