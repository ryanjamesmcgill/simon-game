var React = require("react");
var SettingsModal = require("./SettingsModal.react");
var _ = require("lodash");
var $ = require("jquery");
var Panel = require("./Panel.react");
var flash = require('../utils/flash');
var Wad = require('web-audio-daw');

var Application = React.createClass({
	getDefaultProps: function(){
		var sound = new Wad({
		    source : 'square', 
		    env : {
		        attack : .01, 
		        decay : .005, 
		        sustain : .2, 
		        hold : .015, 
		        release : .3
		    }, 
		    filter : {
		        type : 'lowpass', 
		        frequency : 1200, 
		        q : 8.5, 
		        env : {
		            attack : .2, 
		            frequency : 600
		        }
		    }
		});
		return ({
			sound: sound,
			notes: {
				b0: 'C3',
				b1: 'G3',
				b2: 'C4',
				b3: 'E4'
			},
			snailSpeed: 1200,
			slowSpeed: 1000,
			medSpeed: 700,
			fastSpeed: 500,
			buttonCount: 4,
			activeColors: {
				b0: '#00F000',
				b1: '#FFFF00',
				b2: '#FF0000',
				b3: '#0080FF'
			}
		});	
	},
	getInitialState: function(){
		return ({
			seq: [],
			userSeq: [],
			speed: this.props.snailSpeed,
			strictMode: false,
			animationCount: 0,
			animationProgressCount: 0,
			animatingSequence: false,
			win: false,
			audio: true
		});	
	},
	getRandId: function(){
		var buttonCount = this.props.buttonCount;
		var num = Math.floor(Math.random()*buttonCount);
		var id = 'b'+String(num);
		return id;
	},
	startNewGame: function(){
		var firstId = this.getRandId();
		var startSeq = [firstId];
		this.setState({
			seq: startSeq,
			userSeq: [],
			speed: this.props.snailSpeed,
			playingSeq: false
		});
		this.animateSequence(startSeq);
	},
	animateSequence: function(seq){
		if(!seq){
			seq = this.state.seq;
		}

		//increment animation counter
		this.setState({
			animationProgressCount: this.state.animationProgressCount+1,
			animatingSequence: true});
		
		var self = this;
		var delay = 0;
		_.forEach(seq, function(id){
			window.setTimeout(function(){
				self.animateButton(id);
			}, delay);
			delay += self.state.speed;
		});
		
		window.setTimeout(function(){
			//decrement animation counter
			self.setState({
				animationProgressCount: self.state.animationProgressCount-1,
				animatingSequence: false});			
		},delay);
	},
	animateButton: function(id, done){
		//takes id and animates button
		var selector = '#'+id;
		var color = this.props.activeColors[id];
		
		if(this.state.audio){
			this.props.sound.play({pitch:this.props.notes[id]});
		}

		//increment animation counter
		this.setState({animationProgressCount: this.state.animationProgressCount+1});
		var self = this;
		flash(selector, color, 1.1, function(){
			//decrement animation counter
			self.setState({animationProgressCount: self.state.animationProgressCount-1});
			if(typeof done === "function"){
				done();
			}
		});
	},
	animateCorrect: function(done){
		//increment animation counter
		this.setState({animationProgressCount: this.state.animationProgressCount+1});
		
		var self = this;
		flash("#CenterCircle", "#9AFF9A", 1.0);
		flash("#b0", "#9AFF9A", 1.0);
		flash("#b1", "#9AFF9A", 1.0);
		flash("#b2", "#9AFF9A", 1.0);
		flash("#b3", "#9AFF9A", 1.0);
		flash("body","#375437", 1.0, function(){
			//decrement animation counter
			self.setState({animationProgressCount: self.state.animationProgressCount-1});
			if(typeof done === "function"){
				done();
			}
		});	
	},
	animateWrong: function(done){
		//increment animation counter
		this.setState({animationProgressCount: this.state.animationProgressCount+1});
		
		var self = this;
		flash('#CenterCircle', '#B96868',1.0);
		flash('#b0', '#B96868', 1.0);
		flash('#b1', '#B96868', 1.0);
		flash('#b2', '#B96868', 1.0);
		flash('#b3', '#B96868', 1.0);
		flash("body","#602E2E", 1.0, function(){
			//decrement animation counter
			self.setState({animationProgressCount: self.state.animationProgressCount-1});
			if(typeof done === "function"){
				done();
			}
		});		
	},
	animateWin: function(done){
		console.log('[simon] animateWin()!');
		//increment animation counter
		this.setState({animationProgressCount: this.state.animationProgressCount+1,
						win: true});
		var self = this;
		flash('.game-container', '#FFF',1.0);
		flash('#panel', '#FFF',1.0);
		flash('#b0', '#FFF', 1.0);
		flash('#b1', '#FFF', 1.0);
		flash('#b2', '#FFF', 1.0);
		flash('#b3', '#FFF', 1.0);
		flash("body","#FFF", 1.0, function(){
			flash('.game-container', '#FFF',1.0);
			flash('#panel', '#FFF',1.0);
			flash('#b0', '#FFF', 1.0);
			flash('#b1', '#FFF', 1.0);
			flash('#b2', '#FFF', 1.0);
			flash('#b3', '#FFF', 1.0);
			flash("body","#FFF", 1.0, function(){
				flash('.game-container', '#FFF',1.0);
				flash('#panel', '#FFF',1.0);
				flash('#b0', '#FFF', 1.0);
				flash('#b1', '#FFF', 1.0);
				flash('#b2', '#FFF', 1.0);
				flash('#b3', '#FFF', 1.0);
				flash("body","#FFF", 1.0, function(){
					flash('.game-container', '#FFF',1.0);
					flash('#panel', '#FFF',1.0);
					flash('#b0', '#FFF', 1.0);
					flash('#b1', '#FFF', 1.0);
					flash('#b2', '#FFF', 1.0);
					flash('#b3', '#FFF', 1.0);
					flash("body","#FFF", 1.0, function(){
						flash('.game-container', '#FFF',1.0);
						flash('#panel', '#FFF',1.0);
						flash('#b0', '#FFF', 1.0);
						flash('#b1', '#FFF', 1.0);
						flash('#b2', '#FFF', 1.0);
						flash('#b3', '#FFF', 1.0);
						flash("body","#FFF", 1.0, function(){
							//decrement animation counter
							self.setState({animationProgressCount: self.state.animationProgressCount-1,
											win: false});
							if(typeof done === "function"){
								done();
							}
						});
					});
				});
			});
		});	
		
	},
	onShapeClick: function(e){
		var id = e.currentTarget.id;
		var userSeq = this.state.userSeq.slice(0);
		userSeq.push(id);
		var self = this;
		//check current sequence
		for(var i=0; i<userSeq.length; i++){
			var btn_pressed = userSeq[i];
			var btn_expected = this.state.seq[i];
			if(btn_pressed !== btn_expected){
				this.handleError();
				return;
			}
		}
		
		
		this.animateButton(id, function(){
			if(userSeq.length === self.state.seq.length){
				self.handleCompletion();
			}			
		});
		
		this.setState({userSeq: userSeq});
		
	},
	handleError: function(){
		var self = this;
		this.setState({userSeq: []});
		this.animateWrong(function(){
			if(self.state.strictMode){
				self.startNewGame();
			} else {
				self.animateSequence();
			}			
		});
	},
	handleCompletion: function(){
		var level = this.state.seq.length;
		var speed = this.state.speed;
		switch(level){
			case 20:
				console.log('[simon] you win!!!');
				this.animateWin(this.startNewGame);
				return;
			case 13:
				console.log('[simon] fast speed');
				speed = this.props.fastSpeed;
				break;
			case 9:
				console.log('[simon] med speed');
				speed = this.props.medSpeed;
				break;
			case 5:
				console.log('[simon] speeding up, but dont worry it is still slow');
				speed = this.props.slowSpeed;
				break;
		}
		var newId = this.getRandId();
		var newSeq = this.state.seq.slice(0);
		newSeq.push(newId);
		this.setState({
			seq: newSeq,
			userSeq: [],
			speed: speed
		});
		
		var self = this;
		this.animateCorrect(function(){
			self.animateSequence();
		});
	},
	setMode: function(mode){
		if(mode === "hard"){
			this.setState({strictMode: true});
		}
		else if(mode ==="easy"){
			this.setState({strictMode: false});
		}
		else {
			console.assert(false, 'unexpected value for mode');
		}
	},
	setAudio: function(bool){
		this.setState({audio: bool});	
	},
	render: function(){
		var startNewGame = this.startNewGame;
		var onShapeClick = this.onShapeClick;
		var buttonStyle = {padding: 0, cursor: 'pointer'};
		if(this.state.animationProgressCount > 0){
			startNewGame = function(){};
			onShapeClick = function(){};
			buttonStyle.cursor = 'default';
		}
		return (
		<div className="container">
			<i onClick={function(){$('#settings-btn').click()}} className="fa fa-cog" aria-hidden="true"></i>
			<div className="row">
				<div className="col-xs-12" style={{display: 'flex', justifyContent:'center',alignItems:'center'}}>
					<div className="game-container">
						<div className="game-panel">
							<Panel level_number={this.state.seq.length} 
								startNewGame={this.startNewGame} 
								win={this.state.win}
								animatingSequence={this.state.animatingSequence}/>
						</div>
						<div className="game-row">
							<div className="col-left">
								<div style={buttonStyle} onClick={onShapeClick} id="b0" className="simonButton"></div>
							</div>
							<div className="col-mid"></div>
							<div className="col-right">
								<div style={buttonStyle} onClick={onShapeClick} id="b1" className="simonButton"></div>
							</div>						
						</div>
						<div className="game-row">
							<div className="col-left"></div>
							<div className="col-mid"></div>
							<div className="col-right"></div>
						</div>
						<div className="game-row">
							<div className="col-left">
								<div style={buttonStyle} onClick={onShapeClick} id="b2" className="simonButton"></div>
							</div>
							<div className="col-mid"></div>
							<div className="col-right">
								<div style={buttonStyle} onClick={onShapeClick} id="b3" className="simonButton"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<SettingsModal
				startNewGame={startNewGame}
				setMode={this.setMode}
				setAudio={this.setAudio}/>
		</div>
		);
	}
});

module.exports = Application;