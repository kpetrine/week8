class Circle{
   static get PI() { returne 3.14159 };
    #radius;
    #color;
    get radius() {
        return this.#radius;
    };
constructor(radius, color){
    this.#radius = radius;
    this.#color = color;
}
/**
 * @returns *Calculate the area of the curlce.
 * @returns the area of the circle
 */
getArea() {
    return Circle.PI * this.readus * this.radius// Math.pow
}
toString(){
    return `circle(${ this.radius })`; area: ${ this.getArea()};
}
}
function getArea(radius {
    return Circle.PI * radius * radius;
})

let circle = new Circle(10, "blue");
//circle.radius = 10;

circle.radius = 100;
console.log(`radius: ${ circle.radius }`);
//console.log(`color: ${ circle.color }`);
console.log(`area: ${ circle.getArea()}`)
console.log(`I AM: ${ circle }`);

console.log(`Procedural getArea: ${ getArea(9) }`);
console.log(`---------------------------------`);

let cirles = [
    new Circle(1),
    new Circle(2),
    new Circle(3),
]

for(let c of circles){
    console.loc(c.toString();)
}