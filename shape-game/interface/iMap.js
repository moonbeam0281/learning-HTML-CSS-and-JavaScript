//iMap interface will handle our maps and display our terrain

export class iMap{
    constructor(w, l) {
        if(this.constructor === iMap ){
            throw new Error("Cannot instantiate interface directly");
        }
        this.widht;
        this.lenght;
    }

    generate(scene){
        throw new Error("Method 'generate()' must be implemented")
    }

    getFloor(){
        throw new Error("Method 'getFloor()' must be implemented")
    }

    destroy() {
        throw new Error("Method 'destroy()' must be implemented.");
    }

}