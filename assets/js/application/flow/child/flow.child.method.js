FLOW.child.method = {
    // createPoints(param, width, height){
    //     const position = []
        
    //     const {start, end} = this.createEgdePoint(width, height)

    //     const m = (end.y - start.y) / (end.x - start.x)
    //     const gap = Math.abs(end.x - start.x) / (param.seg - 1)

    //     for(let i = 0; i < param.seg; i++){
    //         const x = gap * i + start.x
    //         const y = m * (x - start.x) + start.y
            
    //         position[i * 3] = x
    //         position[i * 3 + 1] = y
    //         position[i * 3 + 2] = 0
    //     }

    //     return new Float32Array(position)
    // },
    // createEgdePoint(width, height){
    //     const top = height / 2
    //     const right = width / 2
    //     const bottom = height / -2
    //     const left = width / -2

    //     const pos = [
    //         {x: Math.random() > 0.5 ? Math.random() * width / 2 : Math.random() * width / -2, y: top},
    //         {x: Math.random() > 0.5 ? Math.random() * width / 2 : Math.random() * width / -2, y: bottom},
    //         {x: right, y: Math.random() > 0.5 ? Math.random() * height / 2 : Math.random() * height / -2}, 
    //         {x: left, y: Math.random() > 0.5 ? Math.random() * height / 2 : Math.random() * height / -2}
    //     ]

    //     let start, end

    //     for(let i = 0; i < 2; i++){
    //         const index = Math.floor(Math.random() * pos.length)
    //         if(i === 0) start = pos[index]
    //         else end = pos[index]
    //         pos.splice(index, 1)
    //     }

    //     if(end.x - start.x < 0){
    //         const temp = end
    //         end = start
    //         start = temp
    //     }

    //     return {start, end}
    // }
    // createPoints(param, width, height, index){
    //     const position = []

    //     const w = width * param.rd
    //     const h = width * param.rd
    //     const d = Math.sqrt(w ** 2 + h ** 2)
    //     const gap = d / param.seg - 1

    //     for(let i = 0; i < param.seg; i++){
    //         const x = gap * i - d / 2
    //         const y = SIMPLEX.noise2D(x / 1000, index / 100) * 100

    //         position.push(x, y, 0)
    //     }

    //     return new Float32Array(position)
    // }
    createPoints(param, index){
        const position = []

        const degree = 360 / param.seg

        for(let i = 0; i < param.seg; i++){
            const deg = degree * i
            // const rx = Math.cos(deg * RADIAN) * param.radius
            // const ry = Math.sin(deg * RADIAN) * param.radius

            // const r = SIMPLEX.noise3D(rx / 500, ry / 500, index / 100)
            // const n = METHOD.normalize(r, 0.75, 1, -1, 1) * param.radius
            // const x = Math.cos(deg * RADIAN) * n
            // const y = Math.sin(deg * RADIAN) * n
            const x = Math.cos(deg * RADIAN) * param.radius
            const y = Math.sin(deg * RADIAN) * param.radius
            
            position.push(x, y, 0)
            
            if(i === param.seg - 1) position.push(position[0], position[1], 0)
        }

        return new Float32Array(position)
    }
}