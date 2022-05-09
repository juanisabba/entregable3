const fs = require('fs')

class Contenedor{
    constructor(archivo){
        this.archivo = archivo
    }

    async save(objeto){
        let objetos =await this.getAll()
        const objetoNuevo={...objeto, id:objetos.length>0?objetos[objetos.length-1].id+1:1}
        objetos.push(objetoNuevo)
        try{
            await fs.promises.writeFile(this.archivo,JSON.stringify(objetos))            
            console.log("Saved!!")
        }catch(err){
            console.log(err)
        }
        return objetoNuevo.id
    }
    async getById(id){
        let objetos =await this.getAll()
        return Promise.resolve(objetos.find(e=>e.id===id))
    }
    async getAll(){
        try{
            const data=await fs.promises.readFile(this.archivo, "utf-8")
            const objetos= data?Promise.resolve(JSON.parse(data)) : []
            return objetos
        }catch(err){
            console.log(err)
        }
    }
    async deleteById(id){
        let objetos =await this.getAll()
        let result=objetos.filter(e=>e.id!==id)
        await fs.promises.writeFile(this.archivo, JSON.stringify(result))
    }
    async deleteAll(){
        await fs.promises.writeFile(this.archivo,"")
    }
}

module.exports = Contenedor