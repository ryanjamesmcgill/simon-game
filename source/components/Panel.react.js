var React = require("react");
var $ = require("jquery");

var Panel = React.createClass({
	onStartClick: function(){
		$(".start-button").addClass("animated bounceOut");
		window.setTimeout(this.props.startNewGame,800);
	},
	render: function(){
		var content = <p style={{margin:0, fontSize: 40}}>{this.props.level_number}</p>;
		var bigMessage = "";
		if(this.props.level_number === 0){
			bigMessage = <div className="start-button" onClick={this.onStartClick}>click to start</div>;
			content = "";
		}
		else if(this.props.win){
			bigMessage = <div className="win-message" >You Win!!!</div>;
			content = "";
		}
		else if(this.props.animatingSequence){
			content = <p style={{margin:0, fontSize: 40}}>!!!</p>;
		}
		return (
			<div>
				{bigMessage}
				<div id="panel">
					{content}
				</div>
			</div>
		);
	}
});

module.exports = Panel;

