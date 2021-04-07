FLOW.child.build = class{
    constructor(group){
        this.#init()
        this.#create()
        this.#add(group)
    }


    // init
    #init(){
        this.param = new FLOW.child.param()
    }


    // add
    #add(group){
        group.add(this.local)
    }


    // create
    #create(){
        this.#createMesh()
    }
    #createMesh(){
        this.local = new THREE.Group()

        for(let i = 0; i < this.param.count; i++){
            const geometry = this.#createGeometry(i)
            const material = this.#createMaterial()
            const mesh = new THREE.Line(geometry, material)
            
            this.local.add(mesh)
        }
    }
    #createGeometry(index){
        const geometry = new THREE.BufferGeometry()

        const position = FLOW.child.method.createPoints(this.param, index)

        geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
        geometry.position = [...position]

        return geometry
    }
    #createMaterial(){
        // return new THREE.ShaderMaterial({
        //     vertexShader: FLOW.child.shader.vertex,
        //     fragmentShader: FLOW.child.shader.fragment,
        //     transparent: true,
        //     uniforms: {
        //         color: {value: new THREE.Color(this.param.color)}
        //     }
        // })
        return new THREE.LineBasicMaterial({
            color: this.param.color,
            opacity: Math.random() * 0.5,
            transparent: true
        })
    }


    // resize
    resize(){
    }


    // animate
    animate(){
        const time = window.performance.now()

        const degree = 360 / this.param.seg

        this.local.children.forEach((_, index) => {
            const temp = _.geometry.position
            const position = _.geometry.attributes.position
            const array = position.array

            for(let i = 0; i < position.count; i++){
                const deg = degree * i

                const ox = temp[i * 3]
                const oy = temp[i * 3 + 1]

                const r = SIMPLEX.noise4D(ox / 500, oy / 500, index / 35, time / 1000)
                const n = METHOD.normalize(r, 0.9, 1, -1, 1) * this.param.radius

                const x = Math.cos(deg * RADIAN) * n
                const y = Math.sin(deg * RADIAN) * n

                array[i * 3] = x
                array[i * 3 + 1] = y
            }

            position.needsUpdate = true
        })
    }
}