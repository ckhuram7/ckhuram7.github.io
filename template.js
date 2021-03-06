var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400);
frameRate(60);


//ProgramCodeGoesHere

// Khuram Chughtai
// Final Project
angleMode = "radians";

/////////////////////////////////////////////
////////////////Start of Game Code /////////
////////////////////////////////////////////

// Global Variables Defined
var start = 0;        // Start Variable updated when you hit Enter
var gameover = 0;     // Triggered when time runs out
var restart = 0;      // Something I plan to implement to restart the game
var mycontrol;        // The player you will be controlling.
var clear = 1;        // Variable Used to clear the screen as you move through the inital splash screens
var lives = 5;        //  Sort of a Health bar as you are allowed five hits total before game is over
var level = 0;        //  Used to show what level you are on as you try to play the game
var score = 0;        // Updated Score as you beat the time
var time = 20;        // Time given for the first level will be updated as you move on
var milli = 0;        // Used to Update Time and clock count down
var nextlevel = 0;
var updatescore = 0;
// End of Global Variables

//////////// Variables  Used for the srolling tab when you select color //////
var moving = null;
var c = [{x:100,y:210},{x:100,y:260},{x:100,y:310}];


/////////////////////////////////////////
////////////Animal Objects///////////////
/////////////////////////////////////////
var animalObj = function(x, y,dir) {
    this.x = x;
    this.y = y;
    this.currFrame = frameCount;
    this.i = 0;
    this.dir = dir;
};

var animal1 = new animalObj(110, 110);

animalObj.prototype.draw = function() {
    //this.x = mouseX;
    //this.y = mouseY;
    switch (this.i) {
        case 0:
            fill(166, 149, 149);
            ellipse(this.x, this.y, 15, 25);  // Body
            fill(0, 0, 0);
            ellipse(this.x-3,this.y+7,2,2);  // Eye L
            ellipse(this.x+3,this.y+7,2,2);  // Eye R
            ellipse(this.x,this.y-12,2,8);   // Tail
            ellipse(this.x,this.y-16,2,6);  // Tail extension
            fill(166, 149, 149);
            ellipse(this.x-8,this.y+5,8,8);  // Ear L
            ellipse(this.x+8,this.y+5,8,8);  // Ear R
            fill(0, 0, 0);
            line(this.x-3, this.y+10, this.x-8, this.y+12);  // Whisker 1 L
            line(this.x+3, this.y+10, this.x+8, this.y+12);  // Whisker 1 R
            line(this.x-3, this.y+12, this.x-10, this.y+14); // Whisker 2 L
            line(this.x+3, this.y+12, this.x+10, this.y+14); // Whisker 2 R
            break;
        case 1:
            fill(166, 149, 149);
            ellipse(this.x, this.y, 15, 25);  // Body
            fill(0, 0, 0);
            ellipse(this.x-3,this.y+7,2,2);  // Eye L
            ellipse(this.x+3,this.y+7,2,2);  // Eye R
            ellipse(this.x,this.y-12,2,8);   // Tail
            ellipse(this.x,this.y-16,3,6);  // Tail extension
            fill(166, 149, 149);
            ellipse(this.x-8,this.y+5,8,8);  // Ear L
            ellipse(this.x+8,this.y+5,8,8);  // Ear R
            fill(0, 0, 0);
            line(this.x-3, this.y+10, this.x-5, this.y+12);  // Whisker 1 L
            line(this.x+3, this.y+10, this.x+5, this.y+12);  // Whisker 1 R
            line(this.x-3, this.y+12, this.x-8, this.y+14); // Whisker 2 L
            line(this.x+3, this.y+12, this.x+8, this.y+14); // Whisker 2 R
            break;
        case 2:
            fill(166, 149, 149);
            ellipse(this.x, this.y, 15, 25);  // Body
            fill(0, 0, 0);
            ellipse(this.x-3,this.y+7,2,2);  // Eye L
            ellipse(this.x+3,this.y+7,2,2);  // Eye R
            ellipse(this.x,this.y-12,2,8);   // Tail
            ellipse(this.x,this.y-16,4,6);  // Tail extension
            fill(166, 149, 149);
            ellipse(this.x-8,this.y+5,8,8);  // Ear L
            ellipse(this.x+8,this.y+5,8,8);  // Ear R
            fill(0, 0, 0);
            line(this.x-3, this.y+10, this.x-8, this.y+12);  // Whisker 1 L
            line(this.x+3, this.y+10, this.x+8, this.y+12);  // Whisker 1 R
            line(this.x-3, this.y+12, this.x-10, this.y+14); // Whisker 2 L
            line(this.x+3, this.y+12, this.x+10, this.y+14); // Whisker 2 R
            break;
    }
    if (this.currFrame < (frameCount - 30)) {
        this.currFrame = frameCount;
        this.i++;
        if (this.i > 2) {
            this.i = 0;
        }
    }

};

animalObj.prototype.move =function(){
    if(this.dir === 1) {
        this.x += 1;
        if ((this.x > 390) || (this.x < 10)) {
            this.x = 12;
        }
    }
    else if (this.dir === 0) {
        this.x -= 1;
        if ((this.x > 390) || (this.x < 10)) {
            this.x = 390;
        }
    }
    // Collision Check with walls
    //for (var i=0; i<walls.length; i++) {
    //    if (dist(this.x, this.y, walls[i].x-10, walls[i].y-25) < 20) {
    //        this.x = this.x;
    //        this.y = this.y;
    //    }
    //}
};


/////////////////////////////////////////
////////////Space Ship Obj///////////////
/////////////////////////////////////////
// Defination of SpaceShipObject
var spaceShipObj = function(x,y,dir,r,g,b){
    this.r = r;  this.g = g;  this.b = b;  // THis allows for different colors
    this.dir = dir;  // This allows for the movement of different directions
    this.x = x;      //  The X and Y cordinates
    this.y = y;
};
// SpaceShipObj that I Control
//var myControl = new spaceShipObj(350,350,1,82,87,82);
// Space Ship Prototype Draw Function
spaceShipObj.prototype.display = function(){
    fill (this.r, this.g, this.b);   // Changes the Color of the Objects created
    ellipse(this.x,this.y,12,8); // Top Circle
    ellipse(this.x,this.y+8,20,10);  // Makes the Shape of the Body
    fill (0, 217, 255); // Changes the color to blue for the Windows
    rect(this.x-8 ,this.y+6,3,3); // Window 1
    rect(this.x -3,this.y+6,3,3); // Window 2
    rect(this.x + 2,this.y+6,3,3); // Window 3
    fill(138, 28, 138);  // Fills the Color of the Tires to Black.
    ellipse(this.x-10,this.y+10,4,4); // Most Left Bottom Tire
    ellipse(this.x-6,this.y+13,4,4); // Second One
    ellipse(this.x-2,this.y+13,4,4); // Third One
    ellipse(this.x+2,this.y+13,4,4); // Forth One
    ellipse(this.x+6,this.y+13,4,4); // Fifth One
    ellipse(this.x+10,this.y+10,4,4); // Most Right Bottom Tire
    fill(71, 18, 82);
    ellipse(this.x,this.y+2,12,2); // Top Bar
};
// Space Ship Move Function
spaceShipObj.prototype.move =function(){
    if(this.dir === 1) {
        this.x += 1;
        if ((this.x > 390) || (this.x < 10)) {
            this.x = 12;
        }
    }
    else if (this.dir === 0) {
        this.x -= 1;
        if ((this.x > 390) || (this.x < 10)) {
            this.x = 390;
        }
    }
    //if (dist(this.x, this.y, mycontrol.x, mycontrol.y) < 14) {
    //    gameover = 1;
    //}
};
//spaceShipObj.prototype.checkCollision = function() {
//    if (dist(this.x, this.y, myControl.x, myControl.y) < 14) {
//        gameover = 1;
//    }
//};

/////////////////////////////////////////
////////////Turkey Obj  /////////////////
/////////////////////////////////////////

var turkObj = function(x, y) {
    this.position = new PVector(x, y);
    //this.state = [new haltState(), new turnState(), new chaseState()];
    this.currState = 0;
    this.angle = 0;
    this.whisker1 = new PVector(0, 0);
    this.whisker2 = new PVector(0, 0);
};

turkObj.prototype.draw = function() {
    //noFill();
    fill (219, 44, 164);
    ellipse(this.position.x-7,this.position.y-4,5,10);
    fill (237, 176, 23);
    ellipse(this.position.x-3,this.position.y-4,6,10);
    fill (72, 191, 53);
    ellipse(this.position.x+3,this.position.y-4,6,10);
    fill (61, 142, 179);
    ellipse(this.position.x+7,this.position.y-4,5,10);
    fill (92, 52, 52);
    ellipse(this.position.x,this.position.y,16,12);
    fill (43, 12, 43);
    ellipse(this.position.x-2,this.position.y+3,5,5);
    ellipse(this.position.x+2,this.position.y+3,5,5);
       // for (var i = 0; i < points.length; i++) {
        //    vertex(points[i].x, points[i].y);
        ///vertex(points[0].x, points[0].y);
    //endShape();
};

///////////////NOTES ///////////////////////
// Use the Turkey Character as one of the monsters,
// Make possible animation as either the head moves or its feathers
/////////////////////////////////////////////

/////////////////////////////////////////
////////////Tile Maps  /////////////////
/////////////////////////////////////////

// These will be used in later portions of the project.
var tileMap = [
   "wwwwwwwwwwwwwwwwwwww",
    "w          ww      w",
    "w wwwww          www",
    "w w  w     ww   wwww",
    "w      www  w      w",
    "w w w            www",
    "w      www   ww    w",
    "w   ww          wwww",
    "w  ww       www   ww",
    "w    www        wwww",
    "w      w    ww w   w",
    "w  ww            www",
    "w  w         ww wwww",
    "w      www   ww    w",
    "w ww            wwww",
    "w      wwwww       w",
    "w      wwwww    wwww",
    "w                ww",
    "w     ww    ww  wwww",
    "wwwwwwwwwwwwwwwwwwww"];


var tileMap2 = [
        "                    ",
        "                    ",
        "                    ",
        "      w             ",
        "       w            ",
        "        w           ",
        "         w          ",
        "       c  w         ",
        "           w        ",
        "            w       ",
        "             w      ",
        "       w            ",
        "      w             ",
        "     w              ",
        "    w               ",
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "      w             ",
        "       w            ",
        "        w           ",
        "         w          ",
        "      c   w         ",
        "           w        ",
        "            w       ",
        "             w      ",
        "       w            ",
        "      w             ",
        "     w              ",
        "    w               ",
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "      w             ",
        "       w            ",
        "        w           ",
        "         w          ",
        "      c   w         ",
        "           w        ",
        "            w       ",
        "             w      ",
        "       w            ",
        "      w             ",
        "     w              ",
        "    w               ",
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "      w             ",
        "       w            ",
        "        w           ",
        "         w          ",
        "      c   w         ",
        "           w        ",
        "            w       ",
        "             w      ",
        "       w            ",
        "      w             ",
        "     w              ",
        "    w               ",
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "      w             ",
        "       w            ",
        "        w           ",
        "         w          ",
        "      c   w         ",
        "           w        ",
        "            w       ",
        "             w      ",
        "       w            ",
        "      w             ",
        "     w              ",
        "    w               ",
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "            w       ",
        "                    ",
        "    w               ",
        "                    ",
        "                    ",
        "                    ",];

//var wallObj = function()


/////////////////////////////////////////
////////////Loading Dock/////////////////
/////////////////////////////////////////
// Object for the space ship to land on.
var loadingDock = function(x,y,dir){
   this.x = x;
   this.y = y;
   this.dir = dir;
};

// Display Function to create the Object
loadingDock.prototype.display = function(){
    fill(74, 37, 27);
    rect(this.x,this.y,25,5);
};
// Loading Dock Move Function to allow for both backwards and Front Moving Functions
loadingDock.prototype.move =function(){
    if(this.dir === 1) {
        this.x += 1;
        if ((this.x > 390) || (this.x < 10)) {
            this.x = 12;
        }
    }
    else if (this.dir === 0) {
        this.x -= 1;
        if ((this.x > 390) || (this.x < 10)) {
            this.x = 390;
        }
    }
    //if (dist(this.x, this.y, myControl.x, myControl.y) < 18) {
    //    myControl.x = this.x;
    //}
    //if(myControl.y < 170)
    //{
    //    if (dist(this.x, this.y, myControl.x, myControl.y) > 35) {
    //        gameover = 1;
    //    }
    //}
};

/////////////////////////////////////////
////////////Cat     Objects//////////////
/////////////////////////////////////////


var wanderState = function() {
    this.angle = 0;
    this.wanderDist = 0;
    this.step = new PVector(0,0);
};

var chaseState = function() {
    this.step = new PVector(0,0);
};

var catObj = function(x, y) {
    this.position = new PVector(x, y);
    this.state = [new wanderState(), new chaseState()];
    this.currState = 0;
};

var targetObj = function(x, y) {
    this.x = x;
    this.y = y;
};

//var cat = new catObj(100, 100);
var target = new targetObj(0, 0);

catObj.prototype.changeState = function(x) {
    this.currState = x;
};

///// EXPERIMENT /////
wanderState.prototype.execute = function(me) {
    if (this.wanderDist <= 0) {
        this.wanderDist = random(50, 80);
        this.angle = random(0, 360);
        this.step.set(cos(this.angle), sin(this.angle));
    }
    this.wanderDist--;
    me.position.add(this.step);
    if (me.position.x > 415) {
        me.position.x = -15;
    }
    else if (me.position.x < -15) {
        me.position.x = 415;
    }
    if (me.position.y > 415) {
        me.position.y = -15;
    }
    else if (me.position.y < -15) {
        me.position.y = 415;
    }

    if (dist(me.position.x, me.position.y, target.x, target.y) < 150) {
        me.changeState(1);
    }
};

///// EXPERIMENT /////
chaseState.prototype.execute = function(me) {
    if (dist(target.x, target.y, me.position.x, me.position.y) > 5) {
        this.step.set(target.x - me.position.x, target.y - me.position.y);
        this.step.normalize();
        this.step.mult(1/2);
        me.position.add(this.step);
    }

    if (dist(me.position.x, me.position.y, target.x, target.y) > 150) {
        me.changeState(0);
    }
};

catObj.prototype.draw = function() {
    fill(255, 255,255);
    ellipse(this.position.x, this.position.y, 30, 30);
    triangle(this.position.x-2, this.position.y-14, this.position.x-19, this.position.y-16, this.position.x-14, this.position.y-2);
    triangle(this.position.x+2, this.position.y-14, this.position.x+19, this.position.y-16, this.position.x+14, this.position.y-2);
    fill(0,0,0);
    ellipse(this.position.x - 8, this.position.y, 5, 5);  // eyes
    ellipse(this.position.x + 8, this.position.y, 5, 5);
    ellipse(this.position.x, this.position.y+3, 3, 3);    // nose
    line(this.position.x-3, this.position.y+3, this.position.x-16, this.position.y);    // whiskers
    line(this.position.x+3, this.position.y+3, this.position.x+16, this.position.y);
    line(this.position.x-3, this.position.y+4, this.position.x-18, this.position.y+4);
    line(this.position.x+3, this.position.y+4, this.position.x+18, this.position.y+4);
    line(this.position.x-3, this.position.y+6, this.position.x-16, this.position.y+10);
    line(this.position.x+3, this.position.y+6, this.position.x+16, this.position.y+10);
};




/////////////////////////////////////////
////////////BallOBJ Objects//////////////
/////////////////////////////////////////
var ballObj = function(x, y) {
    this.position = new PVector(x, y);
    this.dir = new PVector(0, 0);
    this.thrown = 0;
    this.gravity = new PVector(0,-0.5);
    this.wind = new PVector(random(-0.3,0.3),0);

};

var ball = new ballObj(500, 600);
//var gravity = new PVector(0, -1);
//var wind = new PVector(1, 0);
//var windSpeed = 0;


ballObj.prototype.draw = function() {
    fill(100, 219, 31);
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    ellipse(0, 0, 30, 30);
    fill(166, 5, 166);
    ellipse(6, 0, 6, 6);
    ellipse(-6, 0, 6, 6);
    ellipse(0, 6, 6, 6);
    ellipse(0, -6, 6, 6);
    popMatrix();
    //ellipse(ball.position.x, ball.position.y, 20, 20);
    if (this.thrown === 2) {
        ball.position.add(this.dir);
        ball.dir.add(this.gravity);
        ball.dir.add(this.wind);
    }
    if ((ball.position.x < -10) || (ball.position.x > 410) ||
    (ball.position.y < -10) || (ball.position.y > 410)) {
        this.thrown = 0;
    }
};



/////////////////////////////////////////
////////////Player Controls//////////////
/////////////////////////////////////////
// Function to Start the Game
var mouseDragged = function () {
    for (var i = 0; i < c.length; i ++) {
        if (dist (mouseX, mouseY, c[i].x, c[i].y) < 10) {
            moving = i;
        }
    }
};

var mouseMoved = function () {
    moving = null;
};
var mouseClicked = function() {
    //start = 1;
};
// Player Movements Using the Arrow Keys
var keyPressed = function() {
    if (keyCode === ENTER) {
       start++;
       clear = 0;
    }
    // Player Movements Using the Arrow Keys
    if (keyCode === LEFT) {
        mycontrol.x-= 6;
    }
    if (keyCode === RIGHT) {
        mycontrol.x+= 6;
    }
    if (keyCode === UP) {
        mycontrol.y-= 4;
    }
    if (keyCode === DOWN) {
        mycontrol.y+= 4;
    }
    if (keyCode === 32){
        // Updates the wind everytime
        this.wind = new PVector(random(-0.3,0.3),0);
        //ball.dir.set(mouseX-pmouseX, mouseY - pmouseY);
        ball.dir.set(0,-2);
        ball.position.set(mycontrol.x,mycontrol.y);
        ball.thrown = 2;
    }
    if(keyCode === 115)
    {
        gameover = 1;
    }
};
/////////////////////////////////////////
///Animals for start screen Animation ///
/////////////////////////////////////////
var animals = [new animalObj(30,30,1),new animalObj(70,70,1),new animalObj(90,90,0),new animalObj(120,130,1),new animalObj(150,150,0),new animalObj(90,170,1)];
var spaceShips = [new spaceShipObj(150,300,1,100,200,82),new spaceShipObj(10,270,0,200,200,82),new spaceShipObj(150,200,0,0,200,82),new spaceShipObj(10,230,0,200,200,82)];
var spaceShips2 = [];

//var spaceShipsLevelOne = [new spaceShipObj(150,100,1,100,200,82),new spaceShipObj(10,210,0,200,200,82),new spaceShipObj(150,290,0,0,200,82),new spaceShipObj(10,230,0,200,200,82)];

//var docks = [new loadingDock(30,30,0),new loadingDock(70,70,1),new loadingDock(90,90,0),new loadingDock(120,130,0),new loadingDock(150,150,1),new loadingDock(90,170,0)];

/////////////////////////////////////////
////////////Main Draw Function///////////
/////////////////////////////////////////
var draw = function() {
        if (start === 0 ){
        background(220,243,245); // Sets Background to Blue
        fill(255, 0, 255);
        textSize(40);
        if(level === 0)
        {
            if(start === 0 && clear === 1)
            {
                for (var i = 0; i< animals.length; i++){
                    animals[i].draw();
                    animals[i].move();
                    //animals[i].display();
                }
                for (var i = 0; i< spaceShips.length; i++){
                    spaceShips[i].move();
                    spaceShips[i].display();
                }
            }
        }
        text("Animal Attack", 100, 180);
        text("Click enter to begin", 30, 350);
        text("Khuram Chughtai", 45, 380);
        restart = 0;
    }
    else if( start === 1 && gameover === 0){
        clear = 0;
        textSize(16);
        background(220,243,245); // Sets Background to Blue
        text("Welcome this game has many levels that you will be able to enjoy and collect             perks from as you go through.  You will start off Dodging several different                 obstatcles as you lead up to get the ability to shoot your obstacles and move on             to different parts.  The robots will start to get more advanced as you move on,             you will get points for beating the clocks and killing obstacles as you progress             .",50,50,300,300);
    }
    else if (start === 2 && gameover === 0){
        textSize(25);
        var r = round ((c[0].x - 100) / 200 * 255);
        var g = round ((c[1].x - 100) / 200 * 255);
        var b = round ((c[2].x - 100) / 200 * 255);
        background(220,243,245);
        fill(0, 0, 0);
        text("R", 70, 220);
        rect(100, 200, 200, 20, 29);
        text("G", 70, 270);
        rect(100, 250, 200, 20, 29);
        text("B", 70, 320);
        rect(100, 300, 200, 20, 29);
        fill(158, 158, 158);
        noStroke();

        for (var i = 0; i < c.length; i ++) {
            line (c[i].x, 100, c[i].x, 300);
            fill (255, 255, 255);
            ellipse (c[i].x, c[i].y, 20, 20);
        }

        if (moving !== null) {
            c[moving].x = constrain (mouseX, 100,300);
        }
        //animal1.draw();
        //animal1.move();
        //rect(xPos, yPos, 17, 40, 20);
        var drawspaceship = new spaceShipObj(190,100,1,r,g,b);
        drawspaceship.display();
        mycontrol = drawspaceship;
        level = 1;
        mycontrol.x = 350;
        mycontrol.y = 370;
        //var sample = spaceShipObj(190,100,1,r,g,b);
        //sample.display();
        text("Click enter to begin", 90, 350);
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////Level One        ///////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    else if (start === 3 && gameover === 0 && nextlevel === 0)
    {
        background(220,243,245);
        textSize(16);
        milli++;
        if(milli ===100){
             time--;
             milli=0;
        }
        if(time < 1)
        {
            gameover = 1;
        }
        text("Round One: Dodge",0,20);
        text("Level: " + level,0,35);
        text("Lives: " + lives,69,35);
        text("Time: " + time ,250,20);
        text("Score: " + score ,250,35);
        mycontrol.display();
        if (start > 3)
        {
            start = 3;
        }
        if(lives < 1)
        {
          gameover = 1;
        }
        if(spaceShips.length < 6 )
        {
            spaceShips.push(new spaceShipObj(random(0,400),random(30,340),1,random(0,255),random(0,255),random(0,255)));
            //particles.push(new particleObj(mouseX,mouseY));
        }
        if(level === 1 )
        {
             for (var i = 0; i< spaceShips.length; i++){

                spaceShips[i].display();
                spaceShips[i].move();
                if (dist(spaceShips[i].x, spaceShips[i].y, mycontrol.x, mycontrol.y) < 30) {
                    lives--;
                    mycontrol.x = 350;
                    mycontrol.y = 360;
                }
            }
        }
        if(mycontrol.y < 10)
        {
            level = 2;
            start = 3;
            nextlevel = 1;
            updatescore = 1;
        }
    }
    else if (start === 3 && gameover === 0 && nextlevel === 1)
    {
        background(220,243,245);
        if ( updatescore === 1 )
        {
            score = score + time;
            updatescore = 0;
        }
        text("Congrats click enter to go to next level",150,150,100,100);
        mycontrol.y = 380;
        mycontrol.x = 100;
        time = 20;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////Level Two        ///////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    else if (start === 4 && gameover === 0 && nextlevel === 1)
    {
        background(220,243,245);
        textSize(16);
        milli++;
        if(milli ===100){
             time--;
             milli=0;
        }
        if(time < 1)
        {
            gameover = 1;
        }
        if(lives < 1)
        {
          gameover = 1;
        }
        text("Round One: Dodge",0,20);
        text("Level: " + level,0,35);
        text("Lives: " + lives,69,35);
        text("Time: " + time ,250,20);
        text("Score: " + score ,250,35);
        mycontrol.display();
        if(spaceShips.length < 8 )
        {
            spaceShips.push(new spaceShipObj(random(0,400),random(30,350),0,random(0,255),random(0,255),random(0,255)));
            //particles.push(new particleObj(mouseX,mouseY));
        }
        if(level === 2 )
        {
             for (var i = 0; i< spaceShips.length; i++){
                spaceShips[i].move();
                spaceShips[i].display();
                if (dist(spaceShips[i].x, spaceShips[i].y, mycontrol.x, mycontrol.y) < 30) {
                    lives--;
                    mycontrol.x = 350;
                    mycontrol.y = 360;
                }
            }
        }

        if(mycontrol.y < 10)
        {
            level = 3;
            start = 4;
            nextlevel = 2;
            updatescore = 1;
        }
    }
    else if (start === 4 && gameover === 0 && nextlevel === 2)
    {
        background(220,243,245);
        if ( updatescore === 1 )
        {
            score = score + time;
            updatescore = 0;
        }
        text("Congrats on Level 2 click enter to go to next level",150,150,100,100);
        mycontrol.y = 380;
        mycontrol.x = 100;
        time = 20;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////Level Three        /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    else if (start === 5 && gameover === 0 && nextlevel === 2)
    {
        background(220,243,245);
        textSize(16);
        milli++;
        if(milli ===100){
             time--;
             milli=0;
        }
        if(time < 1)
        {
            gameover = 1;
        }
        if(lives < 1)
        {
          gameover = 1;
        }
        text("Round Two: Shoot",0,20);
        text("Level: " + level,0,35);
        text("Lives: " + lives,69,35);
        text("Time: " + time ,250,20);
        text("Score: " + score ,250,35);
        mycontrol.display();
        if(spaceShips.length < 10 )
        {
            spaceShips.push(new spaceShipObj(random(0,400),random(30,350),1,random(0,255),random(0,255),random(0,255)));
            //particles.push(new particleObj(mouseX,mouseY));
        }
        if(level === 3 )
        {
            if (ball.thrown > 0)
            {
              ball.draw();
              //score = score -1;
            }


            for (var i = 0; i< spaceShips.length; i++){
                spaceShips[i].move();
                spaceShips[i].display();
                if (dist(spaceShips[i].x, spaceShips[i].y, mycontrol.x, mycontrol.y) < 30) {
                    lives--;
                    mycontrol.x = 350;
                    mycontrol.y = 360;
                }

                if(dist(spaceShips[i].x,spaceShips[i].y,ball.position.x,
                    ball.position.y) < 30){
                    spaceShips[i] = new spaceShipObj(random(0,400),random(30,370),0,random(0,255),random(0,255),random(0,255));
                    score += 2;
                }
            }
        }

        if(mycontrol.y < 10)
        {
            level = 4;   // Update this value Accordingly
            start = 5;   // Update this value Accordingly
            nextlevel = 3;
            updatescore = 1;
        }
    }
    else if (start === 5 && gameover === 0 && nextlevel === 3)
    {
        background(220,243,245);
        if ( updatescore === 1 )
        {
            score = score + time;
            updatescore = 0;
        }
        text("Congrats on Level 3 click enter to go to next level",150,150,100,100);
        mycontrol.y = 380;
        mycontrol.x = 100;
        time = 30;
    }



        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////Level Four         /////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        else if (start === 6 && gameover === 0 && nextlevel === 3)
        {
            background(220,243,245);
            textSize(16);
            milli++;
            if(milli ===100){
                 time--;
                 milli=0;
            }
            if(time < 1)
            {
                gameover = 1;
            }
            if(lives < 1)
            {
              gameover = 1;
            }
            text("Round Two: Shoot",0,20);
            text("Level: " + level,0,35);
            text("Lives: " + lives,69,35);
            text("Time: " + time ,250,20);
            text("Score: " + score ,250,35);
            mycontrol.display();
            if(spaceShips.length < 14)
            {
                spaceShips.push(new spaceShipObj(random(0,400),random(30,350),1,random(0,255),random(0,255),random(0,255)));
                //particles.push(new particleObj(mouseX,mouseY));
            }
            if(level === 4 )
            {
                if (ball.thrown > 0)
                {
                  ball.draw();
                  //score = score -1;
                }


                for (var i = 0; i< spaceShips.length; i++){
                    spaceShips[i].move();
                    spaceShips[i].display();
                    if (dist(spaceShips[i].x, spaceShips[i].y, mycontrol.x, mycontrol.y) < 30) {
                        lives--;
                        mycontrol.x = 350;
                        mycontrol.y = 360;
                    }

                    if(dist(spaceShips[i].x,spaceShips[i].y,ball.position.x,
                        ball.position.y) < 30){
                        spaceShips[i] = new spaceShipObj(random(0,400),random(30,370),0,random(0,255),random(0,255),random(0,255));
                        score += 2;
                    }
                }
            }

            if(mycontrol.y < 10)
            {
                level = 5;   // Update this value Accordingly
                start = 6;   // Update this value Accordingly
                nextlevel = 4;
                updatescore = 1;
            }
        }
        else if (start === 6 && gameover === 0 && nextlevel === 4)
        {
            background(220,243,245);
            if ( updatescore === 1 )
            {
                score = score + time;
                updatescore = 0;
            }
            text("Congrats on Level 4 click enter to go to next level",150,150,100,100);
            mycontrol.y = 380;
            mycontrol.x = 100;
            time = 35;
        }



        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////Level Five         /////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        else if (start === 7 && gameover === 0 && nextlevel === 4)
        {
            background(220,243,245);
            textSize(16);
            milli++;
            if(milli ===100){
                 time--;
                 milli=0;
            }
            if(time < 1)
            {
                gameover = 1;
            }
            if(lives < 1)
            {
              gameover = 1;
            }
            text("Round Two: Shoot",0,20);
            text("Level: " + level,0,35);
            text("Lives: " + lives,69,35);
            text("Time: " + time ,250,20);
            text("Score: " + score ,250,35);
            mycontrol.display();
            if(spaceShips2.length < 2)
            {
                spaceShips2.push(new spaceShipObj(random(0,400),random(30,350),1,random(0,255),random(0,255),random(0,255)));
                //particles.push(new particleObj(mouseX,mouseY));
            }
            if(level === 5 )
            {
                if (ball.thrown > 0)
                {
                  ball.draw();
                  //score = score -1;
                }


                for (var i = 0; i< spaceShips2.length; i++){
                    spaceShips2[i].move();
                    spaceShips2[i].display();
                    if (dist(spaceShips2[i].x, spaceShips2[i].y, mycontrol.x, mycontrol.y) < 30) {
                        lives--;
                        mycontrol.x = 350;
                        mycontrol.y = 360;
                    }

                    if(dist(spaceShips2[i].x,spaceShips2[i].y,ball.position.x,
                        ball.position.y) < 30){
                        spaceShips2[i] = new spaceShipObj(random(0,400),random(30,370),0,random(0,255),random(0,255),random(0,255));
                        score += 2;
                    }
                }

                for (var i = 0; i < animals.length; i++)
                {
                    if(animals[i].y <15){
                        animals[i].y += 5;
                    }
                    animals[i].draw();
                    animals[i].move();
                    if(dist(animals[i].x,animals[i].y,ball.position.x,
                        ball.position.y) < 30){
                        animals[i] = new animalObj(random(0,400),random(100,200),1);
                        score += 4;
                    }

                    if (dist(animals[i].x, animals[i].y, mycontrol.x, mycontrol.y) < 30) {
                        lives--;
                        mycontrol.x = 350;
                        mycontrol.y = 360;
                    }
                    // If it detects the ball it tries to move back
                    if(dist(animals[i].x,animals[i].y,ball.position.x,ball.position.y) < 80){
                            animals[i].x -= 1;
                            animals[i].y -= 1;

                    }
                    if(i <= 2){
                        if(dist(animals[i].x,animals[i].y,animals[i+1].x,
                            animals[i+1].y) < 45){
                            if (animals[i].dir === 1)
                            {
                                animals[i].dir = 0;
                            }
                            else {
                                animals[i].dir = 1;
                            }
                        }
                    }
                  }
            }

            if(mycontrol.y < 10)
            {
                level = 6;   // Update this value Accordingly
                start = 7;   // Update this value Accordingly
                nextlevel = 5;
                updatescore = 1;
            }
        }
        else if (start === 7 && gameover === 0 && nextlevel === 5)
        {
            background(220,243,245);
            if ( updatescore === 1 )
            {
                score = score + time;
                updatescore = 0;
            }
            text("Congrats on Level 5 click enter to go to next level",150,150,100,100);
            mycontrol.y = 380;
            mycontrol.x = 100;
            time = 35;
        }


        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////Level Six         /////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        else if (start === 8 && gameover === 0 && nextlevel === 5)
        {
            background(220,243,245);
            textSize(16);
            milli++;
            if(milli ===100){
                 time--;
                 milli=0;
            }
            if(time < 1)
            {
                gameover = 1;
            }
            if(lives < 1)
            {
              gameover = 1;
            }
            text("Round Two: Shoot",0,20);
            text("Level: " + level,0,35);
            text("Lives: " + lives,69,35);
            text("Time: " + time ,250,20);
            text("Score: " + score ,250,35);
            mycontrol.display();
            if(spaceShips2.length < 3)
            {
                spaceShips2.push(new spaceShipObj(random(0,400),random(30,350),1,random(0,255),random(0,255),random(0,255)));
                //particles.push(new particleObj(mouseX,mouseY));
            }
            if(level === 6 )
            {
                if (ball.thrown > 0)
                {
                  ball.draw();
                  //score = score -1;
                }


                for (var i = 0; i< spaceShips2.length; i++){
                    spaceShips2[i].move();
                    spaceShips2[i].display();
                    if (dist(spaceShips2[i].x, spaceShips2[i].y, mycontrol.x, mycontrol.y) < 30) {
                        lives--;
                        mycontrol.x = 350;
                        mycontrol.y = 360;
                    }

                    if(dist(spaceShips2[i].x,spaceShips2[i].y,ball.position.x,
                        ball.position.y) < 30){
                        spaceShips2[i] = new spaceShipObj(random(0,400),random(30,370),0,random(0,255),random(0,255),random(0,255));
                        score += 2;
                    }
                }

                for (var i = 0; i < 4; i++)
                {
                    if(animals[i].y <15){
                        animals[i].y += 5;
                    }
                    animals[i].draw();
                    animals[i].move();
                    if(dist(animals[i].x,animals[i].y,ball.position.x,
                        ball.position.y) < 30){
                        animals[i] = new animalObj(random(0,400),random(100,200));
                        score += 1;
                    }

                    // If it detects the ball it tries to move back
                    if(dist(animals[i].x,animals[i].y,ball.position.x,ball.position.y) < 80){
                            animals[i].x -= 1;
                            animals[i].y -= 1;

                    }
                    if(i <= 2){
                        if(dist(animals[i].x,animals[i].y,animals[i+1].x,
                            animals[i+1].y) < 45){
                            if (animals[i].dir === 1)
                            {
                                animals[i].dir = 0;
                            }
                            else {
                                animals[i].dir = 1;
                            }
                        }
                    }
                  }
            }

            if(mycontrol.y < 10)
            {
                level = 7;   // Update this value Accordingly
                start = 8;   // Update this value Accordingly
                nextlevel = 6;
                updatescore = 1;
            }
        }
        else if (start === 8 && gameover === 0 && nextlevel === 6)
        {
            background(220,243,245);
            if ( updatescore === 1 )
            {
                score = score + time;
                updatescore = 0;
            }
            text("Congrats on Level 6 click enter to go to next level",150,150,100,100);
            mycontrol.y = 380;
            mycontrol.x = 100;
            time = 35;
        }


                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////Level Seven         /////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                else if (start === 9 && gameover === 0 && nextlevel === 6)
                {
                    background(220,243,245);
                    textSize(16);
                    milli++;
                    if(milli ===100){
                         time--;
                         milli=0;
                    }
                    if(time < 1)
                    {
                        gameover = 1;
                    }
                    if(lives < 1)
                    {
                      gameover = 1;
                    }
                    text("Round Two: Shoot",0,20);
                    text("Level: " + level,0,35);
                    text("Lives: " + lives,69,35);
                    text("Time: " + time ,250,20);
                    text("Score: " + score ,250,35);
                    mycontrol.display();
                    if(spaceShips2.length < 4)
                    {
                        spaceShips2.push(new spaceShipObj(random(0,400),random(30,350),1,random(0,255),random(0,255),random(0,255)));
                        //particles.push(new particleObj(mouseX,mouseY));
                    }
                    if(level === 7 )
                    {
                        if (ball.thrown > 0)
                        {
                          ball.draw();
                          //score = score -1;
                        }


                        for (var i = 0; i< spaceShips2.length; i++){
                            spaceShips2[i].move();
                            spaceShips2[i].display();
                            if (dist(spaceShips2[i].x, spaceShips2[i].y, mycontrol.x, mycontrol.y) < 30) {
                                lives--;
                                mycontrol.x = 350;
                                mycontrol.y = 360;
                            }

                            if(dist(spaceShips2[i].x,spaceShips2[i].y,ball.position.x,
                                ball.position.y) < 30){
                                spaceShips2[i] = new spaceShipObj(random(0,400),random(30,370),0,random(0,255),random(0,255),random(0,255));
                                score += 2;
                            }
                        }

                        for (var i = 0; i < 4; i++)
                        {
                            if(animals[i].y <15){
                                animals[i].y += 5;
                            }
                            animals[i].draw();
                            animals[i].move();
                            if(dist(animals[i].x,animals[i].y,ball.position.x,
                                ball.position.y) < 30){
                                animals[i] = new animalObj(random(0,400),random(100,200));
                                score += 1;
                            }

                            // If it detects the ball it tries to move back
                            if(dist(animals[i].x,animals[i].y,ball.position.x,ball.position.y) < 80){
                                    animals[i].x -= 1;
                                    animals[i].y -= 1;

                            }
                            if(i <= 2){
                                if(dist(animals[i].x,animals[i].y,animals[i+1].x,
                                    animals[i+1].y) < 45){
                                    if (animals[i].dir === 1)
                                    {
                                        animals[i].dir = 0;
                                    }
                                    else {
                                        animals[i].dir = 1;
                                    }
                                }
                            }
                          }
                    }

                    if(mycontrol.y < 10)
                    {
                        level = 8;   // Update this value Accordingly
                        start = 9;   // Update this value Accordingly
                        nextlevel = 7;
                        updatescore = 1;
                    }
                }
                else if (start === 9 && gameover === 0 && nextlevel === 7)
                {
                    background(220,243,245);
                    if ( updatescore === 1 )
                    {
                        score = score + time;
                        updatescore = 0;
                    }
                    text("Congrats on Level 7 click enter to go to next level",150,150,100,100);
                    mycontrol.y = 380;
                    mycontrol.x = 100;
                    time = 35;
                }



                        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        /////////////////////////////////////Level Eight         /////////////////////////////////////////////////////////////
                        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        else if (start === 10 && gameover === 0 && nextlevel === 7)
                        {
                            background(220,243,245);
                            textSize(16);
                            milli++;
                            if(milli ===100){
                                 time--;
                                 milli=0;
                            }
                            if(time < 1)
                            {
                                gameover = 1;
                            }
                            if(lives < 1)
                            {
                              gameover = 1;
                            }
                            text("Round Two: Shoot",0,20);
                            text("Level: " + level,0,35);
                            text("Lives: " + lives,69,35);
                            text("Time: " + time ,250,20);
                            text("Score: " + score ,250,35);
                            mycontrol.display();
                            if(spaceShips2.length < 4)
                            {
                                spaceShips2.push(new spaceShipObj(random(0,400),random(30,350),1,random(0,255),random(0,255),random(0,255)));
                                //particles.push(new particleObj(mouseX,mouseY));
                            }
                            if(level === 8 )
                            {
                                if (ball.thrown > 0)
                                {
                                  ball.draw();
                                  //score = score -1;
                                }

                                cat.draw();
                                cat.state[cat.currState].execute(cat);
                                if (dist(cat.x, cat.y, mycontrol.x, mycontrol.y) < 30) {
                                    lives--;
                                    mycontrol.x = 350;
                                    mycontrol.y = 360;
                                }

                                for (var i = 0; i< spaceShips2.length; i++){
                                    spaceShips2[i].move();
                                    spaceShips2[i].display();
                                    if (dist(spaceShips2[i].x, spaceShips2[i].y, mycontrol.x, mycontrol.y) < 30) {
                                        lives--;
                                        mycontrol.x = 350;
                                        mycontrol.y = 360;
                                    }

                                    if(dist(spaceShips2[i].x,spaceShips2[i].y,ball.position.x,
                                        ball.position.y) < 30){
                                        spaceShips2[i] = new spaceShipObj(random(0,400),random(30,370),0,random(0,255),random(0,255),random(0,255));
                                        score += 2;
                                    }
                                }

                                for (var i = 0; i < 4; i++)
                                {
                                    if(animals[i].y <15){
                                        animals[i].y += 5;
                                    }
                                    animals[i].draw();
                                    animals[i].move();
                                    if(dist(animals[i].x,animals[i].y,ball.position.x,
                                        ball.position.y) < 30){
                                        animals[i] = new animalObj(random(0,400),random(100,200));
                                        score += 1;
                                    }

                                    // If it detects the ball it tries to move back
                                    if(dist(animals[i].x,animals[i].y,ball.position.x,ball.position.y) < 80){
                                            animals[i].x -= 1;
                                            animals[i].y -= 1;

                                    }
                                    if(i <= 2){
                                        if(dist(animals[i].x,animals[i].y,animals[i+1].x,
                                            animals[i+1].y) < 45){
                                            if (animals[i].dir === 1)
                                            {
                                                animals[i].dir = 0;
                                            }
                                            else {
                                                animals[i].dir = 1;
                                            }
                                        }
                                    }
                                  }
                            }

                            if(mycontrol.y < 10)
                            {
                                level = 9;   // Update this value Accordingly
                                start = 10;   // Update this value Accordingly
                                nextlevel = 8;
                                updatescore = 1;
                            }
                        }
                        else if (start === 10 && gameover === 0 && nextlevel === 8)
                        {
                            background(220,243,245);
                            if ( updatescore === 1 )
                            {
                                score = score + time;
                                updatescore = 0;
                            }
                            text("Congrats you won",150,150,100,100);
                            mycontrol.y = 380;
                            mycontrol.x = 100;
                            time = 35;
                        }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////Game Over          /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    else if (gameover === 1){
        background(102, 255, 0);
        fill(255, 0, 255);
        textSize(20);
        text("Try again", 100, 80);
        textSize(48);
        text("Game Over", 100, 150);
        restart = 1;
    }
};

/////////////////////////////////////////////
//////////////////End of Game Code /////////
////////////////////////////////////////////


}};
