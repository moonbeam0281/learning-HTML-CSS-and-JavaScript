export class MapHandler{
    constructor()
    {
        this.maps = [];
        this.currentMap = null;
        this.players = [];
    }
}

function getAllTypesOf(baseType) {
    // Similar implementation but using the passed base type
    if (typeof window !== 'undefined') {
        return Array.from(Object.keys(window))
            .filter(key => 
                window[key] && 
                typeof window[key] === 'function' && 
                window[key].prototype instanceof baseType
            );
    }
    
    // Similar logic for other environments
    return [];
}