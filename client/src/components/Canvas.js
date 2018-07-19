import React, { Component } from "react";
import Tone from "tone";

// Holds circle objects to be drawn on canvas
let circles = [];

// Colors a circle can be
const colors = [
  "#63A69F", "#F2E1AC", "#F2836B",
  "#F2594B", "#CD2C24"
];

// Cycles through the array of notes
// Notes come from the Canvas state as an array
let counter = 0;
const getNote = noteArr => {
  let pickedNote = noteArr[counter];
  counter++;
  if(counter >= noteArr.length) counter = 0;
  return pickedNote;
}

// Circle object constructor
class Circle {

  constructor(coords, radius, dx, dy) {
    this.x = coords.x;
    this.y = coords.y;
    this.radius = radius;
    this.dx = this.getVelocity();
    this.dy = this.getVelocity();;
    this.color = this.getColor();
  }

  draw(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  // Update function takes the canvas reference from the Canvas component
  // It also takes the synth and notes grabbed from the Canvas constructor
  update(canvas, synth, notes) {
    if(this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
      // LOGIC TO PLAY SOUND GOES HERE
      let note = getNote(notes);
      synth.triggerAttackRelease(note, "32n");
    }
    this.x += this.dx;
    if(this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
      // LOGIC TO PLAY SOUND GOES HERE
      let note = getNote(notes);
      synth.triggerAttackRelease(note, "32n");
    }
    this.y += this.dy;
  }

  getVelocity() {
    let velocity = ((Math.random() * 0.5) * 2) + 1;
    let coinflip = Math.floor(Math.random() * 2);
    return coinflip === 0 ? velocity : -velocity;
  }

  getColor() {
    let picker = Math.floor(Math.random() * colors.length);
    return colors[picker];
  }
}

class Canvas extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.animate = this.animate.bind(this);
    this.runCanvas = true;

    this.state = {
      user: "TestUser",
      postTitle: "C Major Scale",
      synthType: "poly",
      postNotes: "C4,D4,E4,F4,G4,A4,B4,C5"
    }
  }

  componentDidMount() {
    // Sets initial size of canvas
    this.myCanvas.height = this.boxSize.clientHeight;
    this.myCanvas.width = this.boxSize.clientWidth;

    // Resizes canvas on window size change
    window.addEventListener("resize", () => {
      if(!this.canvas) {
        return;
      }
      circles = [];
      this.myCanvas.height = this.boxSize.clientHeight;
      this.myCanvas.width = this.boxSize.clientWidth;
    });

    this.synth;
    this.notes = "";

    // Animation entry point for the Canvas
    this.animate();
  }

  componentWillUnmount() {
    // Cancels the recursive animate function & empties the circles array
    this.runCanvas = false;
    circles = [];
  }

  handleClick(e) {
    e.preventDefault();
    let location = {
      x: this.myCanvas.width / 2,
      y: window.innerHeight - this.myCanvas.height
    }
    let newCircle = new Circle(location, this.getRadius());
    circles.push(newCircle);
  }

  getRadius() {
    return Math.floor(Math.random() * 30) + 10;
  }

  animate() {
    if(!this.runCanvas) {
      return;
    }
    requestAnimationFrame(this.animate);
    let c = this.myCanvas.getContext("2d");
    c.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
    circles.forEach(circle => {
      circle.draw(this.myCanvas);
      circle.update(this.myCanvas, this.synth, this.state.postNotes.split(","));
    });
  }

  render() {

    // Chooses synth type based on component state
    switch(this.state.synthType) {
      case "synth":
        this.synth = new Tone.Synth();
        this.synth.toMaster();
        break;
      case "mono":
        this.synth = new Tone.MonoSynth();
        this.synth.toMaster();
        break;
      case "poly":
        this.synth = new Tone.PolySynth();
        this.synth.toMaster();
        break;
    }

    return (
      <div className="postWrapper">
        <div className="post">
          <div className="cycle">
            <i className="fas fa-arrow-left fa-2x"></i>
          </div>
          <div className="postInfo">
            <h1>{this.state.user} - {this.state.postTitle}</h1>
          </div>
          <div className="cycle">
            <i className="fas fa-arrow-right fa-2x"></i>
          </div>
        </div>
        <div className="canvasWrapper" ref={boxSize => this.boxSize = boxSize}>
          <canvas ref={myCanvas => this.myCanvas = myCanvas} onClick={this.handleClick}></canvas>
        </div>
      </div>
    );
  }
}

export default Canvas;