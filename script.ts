declare var Vue:any;
//graph from API
//local storage
//finishing CSS



    Vue.createApp({
        data() {
            return {                
                newItem: [],
                startWeight: [],
                reps:[{ set1: 0 }, { set2: 0 }, { set3: 0 }, { set4: 0 }, { set5: 0 }],
                newWeight: '',
                items:[],
                date: new Date().toISOString().slice(0,10),
                total: 0,
                workoutNr:1,
                toggle: false,
                saveData: []
            };
        },
        methods: {     
            
            clearAll(){
                window.localStorage.removeItem("user")

            },

            saveItem(){  

                

                const copy1 = Object.assign({}, this.startWeight);                
                const copy2 = Object.assign({}, this.reps);                
                const copy3 = JSON.parse(JSON.stringify( this.date));                
                const copy4 = this.total;                
                const copy5 = this.workoutNr;                

                this.items.unshift({
                    startWeight: copy1 ,
                    reps: copy2,
                    date: copy3,
                    total: copy4,
                    workoutNr: copy5
                }),
                      
                this.workoutNr++;

                this.startWeight.push(
                    this.reps.set1>5?this.startWeight[0]+5:this.startWeight[0],
                    this.reps.set2>5?this.startWeight[1]+5:this.startWeight[1],
                    this.reps.set3>5?this.startWeight[2]+5:this.startWeight[2],
                    this.reps.set4>5?this.startWeight[3]+5:this.startWeight[3],
                    this.reps.set5>5?this.startWeight[4]+5:this.startWeight[4]                   
                );
               
                this.startWeight.splice(0,5);

                this.total = 0;
                for (let i = 0; i < this.startWeight.length; i++) {
                    this.total+= this.startWeight[i];                    
                }
                
                this.reps.splice(0,5);
                this.reps.set1 =5;
                this.reps.set2 =5;
                this.reps.set3 =5;
                this.reps.set4 =5;
                this.reps.set5 =5;

                
                
                window.localStorage.setItem('items', JSON.stringify(this.items));
                window.localStorage.setItem('startWeight', JSON.stringify(this.startWeight));
                window.localStorage.setItem('workoutNr', JSON.stringify(this.workoutNr));
                window.localStorage.setItem('total', JSON.stringify(this.total));

              },


            setStartingWeight(){
                this.startWeight.splice(0,5);
                this.startWeight.push(
                    this.newWeight,
                    this.newWeight,
                    this.newWeight,
                    this.newWeight,
                    this.newWeight
                );
                this.newItem = "";

                for (let i = 0; i < this.startWeight.length; i++) {
                    this.total+= this.startWeight[i];
                    
                }
                this.toggle = !this.toggle;

            },


            setUnits() {
              
                let check =JSON.parse(window.localStorage.getItem('items'));
               
               
                if (check!==null) {
                    this.items = JSON.parse(window.localStorage.getItem('items'));
                    this.startWeight = JSON.parse(window.localStorage.getItem('startWeight'));
                    this.workoutNr = JSON.parse(window.localStorage.getItem('workoutNr'));
                    this.total = JSON.parse(window.localStorage.getItem('total'));
             
                }
                else{
                    this.startWeight[0]=0;
                    this.startWeight[1]=0;
                    this.startWeight[2]=0;
                    this.startWeight[3]=0;
                    this.startWeight[4]=0;

                }
                
                if (check!==null) {
                    this.toggle = true;
                }
                
                // this.total = this.items
                this.startWeight
                this.workoutNr

                
                this.reps.set1=5;
                this.reps.set2=5;
                this.reps.set3=5;
                this.reps.set4=5;
                this.reps.set5=5;

                this.newWeight=100;
                
                
            }
            
        },
        beforeMount(){
            this.setUnits()
         }


    }).mount('main');
