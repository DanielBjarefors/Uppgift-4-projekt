declare var Vue: any;
//graph from API
//html layout
//finishing CSS
//better names for variables



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
            id: ""
        };
    },
    methods: {
        clearAll() {
            //clear all workouts from active page
            window.localStorage.removeItem('completedWorkouts' + this.id)
            window.localStorage.removeItem('workoutWeight' + this.id)
            window.localStorage.removeItem('workoutNr' + this.id)
            window.localStorage.removeItem('total' + this.id)
            window.location.reload();
        },
        saveCompletedWorkout() {
            //add workout to list
            this.completedWorkouts.unshift({
                workoutWeight: Object.assign({}, this.workoutWeight),
                reps: Object.assign({}, this.reps),
                date: JSON.parse(JSON.stringify(this.date)),
                total: this.total,
                workoutNr: this.workoutNr
            }),
            //increase nr for next workout
            this.workoutNr++;
            //set weight for next workout
            for (let i = 0; i < this.workoutWeight.length; i++) {
                this.reps[i] > 5 ? this.workoutWeight[i] += 5 : this.workoutWeight[i]
            }
            //reset total for next workout
            this.total = 0;
            for (let i = 0; i < this.workoutWeight.length; i++) {
                this.total += this.workoutWeight[i];
            }
            //reset reps for next workout
            for (let i = 0; i < this.reps.length; i++) {
                this.reps[i] = 5
            }
            //save data for finnished workout and next workout
            window.localStorage.setItem('completedWorkouts' + this.id, JSON.stringify(this.completedWorkouts));
            window.localStorage.setItem('workoutWeight' + this.id, JSON.stringify(this.workoutWeight));
            window.localStorage.setItem('workoutNr' + this.id, JSON.stringify(this.workoutNr));
            window.localStorage.setItem('total' + this.id, JSON.stringify(this.total));
        },
        setStartingWeight() {
            //Fill empty array for first workout
            for (let i = 0; i < 5; i++) {
                this.workoutWeight[i] = this.startWeight
            }
            //total for starting weight
            for (let i = 0; i < this.workoutWeight.length; i++) {
                this.total += this.workoutWeight[i];
            }
            //hide "set starting weight" when it´s set
            this.toggle = !this.toggle;
        },
        setUnits() {
            //check local storage for data
            let check = JSON.parse(window.localStorage.getItem('completedWorkouts' + this.id));
            if (check !== null) {
                this.completedWorkouts = JSON.parse(window.localStorage.getItem('completedWorkouts' + this.id));
                this.workoutWeight = JSON.parse(window.localStorage.getItem('workoutWeight' + this.id));
                this.workoutNr = JSON.parse(window.localStorage.getItem('workoutNr' + this.id));
                this.total = JSON.parse(window.localStorage.getItem('total' + this.id));
            }
            //hide "set starting weight" if loading from starage
            if (check !== null) {
                this.toggle = true;
            }
            //Fill empty array for first workout
            for (let i = 0; i < 5; i++) {
                this.reps[i] = 5
            }
            this.startWeight = 100;
        }
    },
    //get page id for local storage
    mounted() {
        this.id = this.$refs.id.innerHTML.slice(0, 5)
        this.setUnits()
    },
}).mount('main');
