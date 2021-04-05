new Vue({
    el: '#wrap',
    data(){
        return{
        }
    },
    OBJECTuted: {
    },
    mounted(){
        this.init()
    },
    methods: {
        // init
        init(){
            this.initThree()
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
        },


        // three
        initThree(){
            OBJECT.app = new APP.build()

            this.createObject(OBJECT.app)
        },
        resizeThree(){
            const {app} = OBJECT

            for(let i in OBJECT) {
                if(OBJECT[i].resize === undefined) continue
                OBJECT[i].resize({app})
            }
        },
        renderThree(){
            const {app} = OBJECT

            for(let i in OBJECT) {
                if(OBJECT[i].animate === undefined) continue
                OBJECT[i].animate({app})
            }
        },
        createObject(app){
            this.createFlow()
        },
        createFlow(){
            OBJECT.flow = new FLOW.build()
        },


        // event
        onWindowResize(){
            this.resizeThree()
        },


        // render
        render(){
            this.renderThree()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})