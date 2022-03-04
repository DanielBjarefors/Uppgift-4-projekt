//graph from API
//html layout
//finishing CSS
//try loops
//better names for variables
Vue.createApp({
    data: function () {
        return {
            startWeight: [],
            reps: [{ set1: 0 }, { set2: 0 }, { set3: 0 }, { set4: 0 }, { set5: 0 }],
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
        clearAll: function () {
            window.localStorage.removeItem('items' + this.id);
            window.localStorage.removeItem('startWeight' + this.id);
            window.localStorage.removeItem('workoutNr' + this.id);
            window.localStorage.removeItem('total' + this.id);
            window.location.reload();
        },
        saveItem: function () {
            var copy1 = Object.assign({}, this.startWeight);
            var copy2 = Object.assign({}, this.reps);
            var copy3 = JSON.parse(JSON.stringify(this.date));
            var copy4 = this.total;
            var copy5 = this.workoutNr;
            this.items.unshift({
                startWeight: copy1,
                reps: copy2,
                date: copy3,
                total: copy4,
                workoutNr: copy5
            }),
                this.workoutNr++;
            this.startWeight.push(this.reps.set1 > 5 ? this.startWeight[0] + 5 : this.startWeight[0], this.reps.set2 > 5 ? this.startWeight[1] + 5 : this.startWeight[1], this.reps.set3 > 5 ? this.startWeight[2] + 5 : this.startWeight[2], this.reps.set4 > 5 ? this.startWeight[3] + 5 : this.startWeight[3], this.reps.set5 > 5 ? this.startWeight[4] + 5 : this.startWeight[4]);
            this.startWeight.splice(0, 5);
            this.total = 0;
            for (var i = 0; i < this.startWeight.length; i++) {
                this.total += this.startWeight[i];
            }
            this.reps.splice(0, 5);
            this.reps.set1 = 5;
            this.reps.set2 = 5;
            this.reps.set3 = 5;
            this.reps.set4 = 5;
            this.reps.set5 = 5;
            window.localStorage.setItem('items' + this.id, JSON.stringify(this.items));
            window.localStorage.setItem('startWeight' + this.id, JSON.stringify(this.startWeight));
            window.localStorage.setItem('workoutNr' + this.id, JSON.stringify(this.workoutNr));
            window.localStorage.setItem('total' + this.id, JSON.stringify(this.total));
        },
        setStartingWeight: function () {
            this.startWeight.splice(0, 5);
            this.startWeight.push(this.newWeight, this.newWeight, this.newWeight, this.newWeight, this.newWeight);
            for (var i = 0; i < this.startWeight.length; i++) {
                this.total += this.startWeight[i];
            }
            this.toggle = !this.toggle;
        },
        setUnits: function () {
            //shorten
            var check = JSON.parse(window.localStorage.getItem('items' + this.id));
            if (check !== null) {
                this.items = JSON.parse(window.localStorage.getItem('items' + this.id));
                this.startWeight = JSON.parse(window.localStorage.getItem('startWeight' + this.id));
                this.workoutNr = JSON.parse(window.localStorage.getItem('workoutNr' + this.id));
                this.total = JSON.parse(window.localStorage.getItem('total' + this.id));
            }
            else {
                this.startWeight[0] = 0;
                this.startWeight[1] = 0;
                this.startWeight[2] = 0;
                this.startWeight[3] = 0;
                this.startWeight[4] = 0;
            }
            if (check !== null) {
                this.toggle = true;
            }
            this.reps.set1 = 5;
            this.reps.set2 = 5;
            this.reps.set3 = 5;
            this.reps.set4 = 5;
            this.reps.set5 = 5;
            this.newWeight = 100;
        }
    },
    mounted: function () {
        this.id = this.$refs.id.innerHTML.slice(0, 5);
        this.setUnits();
    }
}).mount('main');
//# sourceMappingURL=script.js.map