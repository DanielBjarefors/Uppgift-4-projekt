declare var Vue: any;
//graph from API
//html layout
//finishing CSS
//better names for variables



Vue.createApp({
    data() {
        return {
            startWeight: [],
            reps: [],
            newWeight: "",
            items: [],
            date: new Date().toISOString().slice(0, 10),
            total: 0,
            workoutNr: 1,
            toggle: false,
            id: ""
        };
    },


    methods: {
        clearAll() {
            window.localStorage.removeItem('items' + this.id)
            window.localStorage.removeItem('startWeight' + this.id)
            window.localStorage.removeItem('workoutNr' + this.id)
            window.localStorage.removeItem('total' + this.id)
            window.location.reload();
        },

        saveItem() {
            const copy1 = Object.assign({}, this.startWeight);
            const copy2 = Object.assign({}, this.reps);
            const copy3 = JSON.parse(JSON.stringify(this.date));
            const copy4 = this.total;
            const copy5 = this.workoutNr;

            this.items.unshift({
                startWeight: copy1,
                reps: copy2,
                date: copy3,
                total: copy4,
                workoutNr: copy5
            }),

            this.workoutNr++;

            for (let i = 0; i < this.startWeight.length; i++) {
                this.reps[i] > 5 ? this.startWeight[i] += 5 : this.startWeight[i]
            }

            this.total = 0;
            for (let i = 0; i < this.startWeight.length; i++) {
                this.total += this.startWeight[i];
            }

            for (let i = 0; i < this.reps.length; i++) {
                this.reps[i] = 5
            }

            window.localStorage.setItem('items' + this.id, JSON.stringify(this.items));
            window.localStorage.setItem('startWeight' + this.id, JSON.stringify(this.startWeight));
            window.localStorage.setItem('workoutNr' + this.id, JSON.stringify(this.workoutNr));
            window.localStorage.setItem('total' + this.id, JSON.stringify(this.total));
        },


        setStartingWeight() {
            //Fill empty array for first workout
            for (let i = 0; i < 5; i++) {
                this.startWeight[i] = this.newWeight
            }

            for (let i = 0; i < this.startWeight.length; i++) {
                this.total += this.startWeight[i];
            }
            this.toggle = !this.toggle;
        },


        setUnits() {
            let check = JSON.parse(window.localStorage.getItem('items' + this.id));
            if (check !== null) {
                this.items = JSON.parse(window.localStorage.getItem('items' + this.id));
                this.startWeight = JSON.parse(window.localStorage.getItem('startWeight' + this.id));
                this.workoutNr = JSON.parse(window.localStorage.getItem('workoutNr' + this.id));
                this.total = JSON.parse(window.localStorage.getItem('total' + this.id));
            }

            if (check !== null) {
                this.toggle = true;
            }
            //Fill empty array for first workout
            for (let i = 0; i < 5; i++) {
                this.reps[i] = 5
            }
            this.newWeight = 100;
        }

    },

    mounted() {
        this.id = this.$refs.id.innerHTML.slice(0, 5)
        this.setUnits()
    },

}).mount('main');
