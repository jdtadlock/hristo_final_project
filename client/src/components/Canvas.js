import React, { Component } from "react";
import Tone from "tone";
import axios from "axios";
import Auth0Lock from "auth0-lock";

const lock = new Auth0Lock(
  'YUadYYPuO51bN-WUz50wcPU3ww97-q_1',
  'aarick-f.auth0.com'
);
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
    this.cycleLeft = this.cycleLeft.bind(this);
    this.cycleRight = this.cycleRight.bind(this);
    this.clear = this.clear.bind(this);
    this.runCanvas = true;

    this.posts;
    this.postSelector = 0;

    this.state = {
      user: "TestUser",
      postTitle: "C Major Scale",
      synthType: "poly",
      postNotes: ""
    }
  }

  componentDidMount() {
    // Sets initial size of canvas
    this.myCanvas.height = this.boxSize.clientHeight;
    this.myCanvas.width = this.boxSize.clientWidth;

    // Resizes canvas on window size change
    window.addEventListener("resize", () => {
      if(!this.runCanvas) {
        return;
      }
      circles = [];
      this.myCanvas.height = this.boxSize.clientHeight;
      this.myCanvas.width = this.boxSize.clientWidth;
    });

    this.synth;
    this.notes = "";

    axios.get("/api/post")
      .then(res => {
        console.log(res.data);
        this.posts = res.data;
        this.setState({
          postTitle: this.posts[this.postSelector].title,
          synthType: this.posts[this.postSelector].synthType,
          notes: this.posts[this.postSelector].notes
        });
        // Animation entry point for the Canvas
        this.animate();
      })
      .catch(err => err);
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

  cycleLeft() {
    if(this.postSelector > 0) {
      this.postSelector--;
      this.setState({
        postTitle: this.posts[this.postSelector].title,
        synthType: this.posts[this.postSelector].synthType,
        notes: this.posts[this.postSelector].notes
      });
    } else {
      console.log("Cycle Left Clicked");
    }
  }

  cycleRight() {
    if(this.postSelector < this.posts.length - 1) {
      this.postSelector++;
      console.log(this.postSelector);
      this.setState({
        postTitle: this.posts[this.postSelector].title,
        synthType: this.posts[this.postSelector].synthType,
        notes: this.posts[this.postSelector].notes
      });
    } else {
      console.log("Cycle Right Clicked");
    }
  }

  clear() {
    circles = [];
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
      circle.update(this.myCanvas, this.synth, this.state.notes.split(","));
    });
  }

  render() {

    // Chooses synth type based on component state
    switch(this.state.synthType) {
      case "synth":
        this.synth = new Tone.Synth();
        this.synth.toMaster();
        break;
      case "pluck":
        this.synth = new Tone.PluckSynth();
        this.synth.volume.value = 0.5;
        this.synth.toMaster();
        break;
      case "poly":
        this.synth = new Tone.PolySynth();
        this.synth.toMaster();
        break;
      case "duo":
        this.synth = new Tone.DuoSynth();
        this.synth.toMaster();
        break;
    }

    return (
      <div className="postWrapper">
        <div className="post">
          <div className="cycle">
            <i className="fas fa-arrow-left fa-2x" onClick={this.cycleLeft}></i>
          </div>
          <div className="postInfo">
            <h1>{this.state.user} - {this.state.postTitle}</h1>
            <div className="clear" onClick={this.clear}>CLEAR</div>
          </div>
          <div className="cycle">
            <i className="fas fa-arrow-right fa-2x" onClick={this.cycleRight}></i>
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