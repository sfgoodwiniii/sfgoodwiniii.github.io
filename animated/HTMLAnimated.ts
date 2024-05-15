// Create a new objected called MoveableHTMLElement that extends the HTMLElement class
// The constructor takes in an HTML element as a parameter



function calc(value: string) { return `calc(${value})`; }
function sCalc(value: string) { return value.substring(5, value.length - 1); } // Strip calc function


export enum Origin {
    Absolute,
    Relative,
    Self,
    Centered,
    Default
}

export class MoveableHTMLElement extends HTMLElement {
    
    // The constructor takes in an HTML element as a parameter
    constructor(element: HTMLElement) { 
        super();
        this.style.left = element.getAttribute("x0")!;
        this.style.top = element.getAttribute("y0")!;
        this.style.width = element.getAttribute("width")!;
        this.style.height = element.getAttribute("height")!;
    }

    // Getters and setters for the default position
    get x0(): string { return this.getAttribute("x0")!; }
    get y0(): string { return this.getAttribute("y0")!; }
    set x0(value: string) { this.setAttribute("x0", value); }
    set y0(value: string) { this.setAttribute("y0", value); }

    // Getters and setters for the current position
    get x() { return sCalc(this.style.left); }
    get y() { return sCalc(this.style.top); }
    set x(value: string) { this.style.left = value; }
    set y(value: string) { this.style.top = value; }

    // Save the current position as the default position
    savePosition() { this.x0 = this.x; this.y0 = this.y; }

    // Select the origin for movement based on the origin parameter
    private selectOrigin(origin: Origin, object: MoveableHTMLElement | null = null) {
        switch (origin) {
            case Origin.Absolute:
                return { x: "0px", y: "0px" };
            case Origin.Self:
                return { x: this.x, y: this.y };
            case Origin.Centered:
                return { x: `50% - ${this.style.width}/2`, y: `50% - ${this.style.height}/2` };
            case Origin.Default:
                return { x: this.x0, y: this.y0 };
            case Origin.Relative:
                if (object == null) throw new Error("Relative origin requires a second object");
                return { x: object.x, y: object.y };
        }
    }

    // Move the card to a new position
    move(dx: string, dy: string, transition: string, origin: Origin, object: MoveableHTMLElement | null = null) {

        // Select the origin for movement
        let _origin = this.selectOrigin(origin, object);

        // Move the object
        this.x = calc(`${_origin.x} + ${dx}`);
        this.y = calc(`${_origin.y} + (${dy}) * (-1)`);
        this.style.transition = transition;
    }
}