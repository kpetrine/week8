(function(canvas) {
  // #region Canvas / Rendering / Utilities
  const defaultSpriteSize = 32;
  const context = get2dContext(canvas); 

  /**
   * Retrieves the 2d context from the HTML Canvas.
   * @param {HTMLCanvasElement} canvas The canvas element to get / configure the context for.
   * @returns 
   */
  function get2dContext(canvas) {
    const context = canvas.getContext('2d');
    return Object.assign(context, {
      font : `${ defaultSpriteSize }px serif`,
      textAlign : 'center',
      textBaseline : 'middle'
    });
  }

  /**
   * Retrieves a random icon for a person to be rendered.
   * @returns {String} Icon to use to represent person.
   */
  function getRandomPersonIcon() {
    let icons = [
      '🧑','🧔','🧔🏿','🧑🏿','🧑🏻','🧔🏻','👧🏻',
      '👧🏾','👧🏼','👵🏼','👵🏿','💂🏼‍♀️','💂🏻‍♀️','👩🏻‍🚒',
      '👩🏻‍🍳','👩🏽‍🌾','👩🏽‍🎤','👩🏾‍🏭','🙅🏾‍♀️','💇🏻‍♀️','🦸‍♀️'
    ];
    return icons[getRandomInt(icons.length)];
  }

  /**
   * Retrieves a random number between 0 and max value.
   * @param {Integer} max The maximum value to return.
   * @returns The random number.
   */
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  let frames = 0;
  setInterval(function() {
    // console.log(`Rendering frame ${ frames + 1 }...`);
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update Positions
    for(let sprite of sprites) {
      if (sprite instanceof MoveableSprite) {
        sprite.move();

        let collided = sprite.getCollided(sprites);
        if ((collided || []).length) {
          console.log(`${ sprite } collided with [${ collided }]`);
          handleCollision(sprite, collided);
        }
      }
    };

    // Render
    sprites.forEach((sprite,index) => {
      sprite.render(context);
    });
    frames++;
  }, 100);

  /**
   * Sprite that is able to render to the screen.
   */
  class Sprite {
    constructor(icon, x, y) {
      this.icon = icon;
      this.size = defaultSpriteSize;
      // Ensure that the sprite is positioned ON the canvas.
      this.x = Math.min(canvas.width - defaultSpriteSize - 1, Math.max(defaultSpriteSize + 1, x));
      this.y = Math.min(canvas.height - defaultSpriteSize - 1, Math.max(defaultSpriteSize + 1, y));
    }

    /**
     * Renders the sprite to the specified canvas.
     * @param {CasnvasRenderingContext2D} context The context to draw on.
     */
    render(context) {
      context.fillText(this.icon, this.x, this.y);
    }

    /**
     * Retrieves the bounding rectange for the sprite.
     * @returns {Object} The bounding x1,y1;x2,y2 rectangle.
     */
    getBoundingRectangle() {
      return {
        x1: this.x - (this.size / 2),
        y1: this.y - (this.size / 2),
        x2: this.x + (this.size / 2),
        y2: this.y + (this.size / 2),
      };
    }

    /**
     * Checks to see if the currect sprite collides or interects the bounding rectangle.
     * @param {Integer} size The size of the current sprite.
     * @param {Integer} x1 The upper left bounding x coordinate.
     * @param {Integer} y1 The upper left bounding u coordinate.
     * @param {Integer} x2 The lower right bounding x coordinate.
     * @param {Integer} y2 The lower right bounding y coordinate.
     * @returns {Boolean} True if the sprite intersects, false if othewise.
     */
    intersectsWith(x1, y1, x2, y2) {
      let self = this.getBoundingRectangle();
      return ((self.x1 < x2) && (self.x2 > x1) &&
              (self.y1 < y2) && (self.y2 > y1));
    }

    /**
     * Gets the collection of sprites and are colliding or intersecting with the current sprite.
     * @param {Array.Sprite} sprites The collection of sprites to inspect.
     * @returns The collection of colliding sprites.
     */
    getCollided(sprites) {
      let boundingRectangle = this.getBoundingRectangle();
      return (sprites || []).filter((sprite) => {
        return (sprite != this) &&
               sprite.intersectsWith(boundingRectangle.x1, boundingRectangle.y1,
                                     boundingRectangle.x2, boundingRectangle.y2);
      });
    }

    /**
     * Interacts with the specified item.
     * @param {Sprite} thing 
     */
    interactWith(thing) {
    }

    /**
     * Checks to see if the specified item can be interacted with.
     * @param {Sprite} thing The thing to check for interaction.
     * @returns {Boolean} True if the object can interact with the thing.
     */
    canInteractWith(thing) {
      return false;
    }

    toString() {
      return `${ this.icon }; x: ${ this.x }, y: ${ this.y }`;
    }
  }

  /**
   * Sprite that is able to render to the screen.
   */
  class MoveableSprite extends Sprite {
    #modifier = {
      x: 1,
      y: 1
    };

    constructor(icon, x, y, speed, direction) {
      super(icon, x, y);
      this.speed = speed || getRandomInt(10);
      this.direction = direction || getRandomInt(360);
    }
    /**
     * Moves the specified sprite to the new position or moves based on speed and direction.
     * @param {Integer} x The optional new X coordinate of the sprite. If not specified, then will move based on speed and direction.
     * @param {Integer} y The optional new y coordinate of the sprite. If not specified, then will move based on speed and direction.
     */
    move(x, y) {
      if ((! x) || (! y)) {
        let angle = this.direction * (Math.PI / 180);
        x = (this.speed * this.#modifier.x) * Math.cos(angle) + this.x;
        y = (this.speed * this.#modifier.y) * Math.sin(angle) + this.y;

        // At edge of screen? Bounce back...
        if (((x - defaultSpriteSize) <= 0) || ((x + defaultSpriteSize) >= canvas.width)) {
          this.#modifier.x *= -1;
        }
        if (((y - defaultSpriteSize) <= 0) || ((y + defaultSpriteSize) >= canvas.height)) {
          this.#modifier.y *= -1;
        }
      }
      this.x = x;
      this.y = y;
      // console.log(`x: ${ this.x }, y: ${ this.y }`);
    }
  }  

  /**
   * Handles the collision between one or more items.
   * @param {Sprite} sprite The sprite that collided with another sprite.
   * @param {Array.Sprite} collided The collection of sprites collided with.
   */
  function handleCollision(sprite, collided) {
    if ((sprite) && ((collided || []).length)) {
      collided.forEach(other => {
        if (sprite.canInteractWith(other)) {
          sprite.interactWith(other);
        }
      });
    }
  }
  // #endregion Canvas / Rendering / Utilities

  class Person extends MoveableSprite[
    constructor(name, icon, x, y, speed) {
      super(icon || getRandonPeronsIcon(),
      x || getRandomInt (canvas.width),
      y || getRandomInt (canvas.height),
      speed|| getRandomInt (10));
      this.name = name;
    }
  ]

  class Zombie extends Person {
    constructor(name, icon, x, y, speed) {
      super(name, icon || getRandonPeronsIcon(),
  }

  infect(person {
    let zombie = new Zombie(person.name, this.icon, person.x, person.y, getRandomInt(4));
    let personIndex = sprites.indexOf(person);
    if (personIndex >= 0){
      sprites[personIndex] = 
    }
  })

  let sprites = [
    //new Sprite("", 50, 200), // x: 0 - 400, y: 0 - 400
    //new Sprite(" ",300, 10),
    //new MoveableSprite("", 10, 10, 10, 33),
  ];
  
})(document.getElementById('game'));