FLOW.child.build = class{
    constructor(group, width, height){
        this.#init(width, height)
        this.#create()
        this.#add(group)
    }


    // init
    #init(width, height){
        this.param = new FLOW.child.param()

        this.width = width
        this.height = height
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

        const position = FLOW.child.method.createPoints(this.param, this.width, this.height, index)

        geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
        
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
            opacity: 1.0,
            transparent: true
        })
    }


    // resize
    resize(width, height){
        this.width = width
        this.height = height

        this.mesh.geometry.dispose()
        this.mesh.geometry = this.#createGeometry()
    }
}