var React = require("react");

var SettingsModal = React.createClass({
	onModeClick: function(e){
		this.props.setMode(e.currentTarget.id);	
	},
	onSoundClick: function(e){
		var id = e.currentTarget.id;
		if(id === 'sound'){
			this.props.setAudio(true);
		} 
		else if(id==='mute') {
			this.props.setAudio(false);
		}
		else {
			console.assert(false, 'unexpected value sent to onSoundClick()');
		}
	},
	onStartNewGame: function(){
		window.setTimeout(this.props.startNewGame,400);
	},
	render: function(){
		return (
			<div>
				<button style={{display:'none'}} id="settings-btn" type="button" data-toggle="modal" data-target="#settings-modal">Launch modal</button>		
				<div id="settings-modal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="settings-dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								<h4 className="modal-title">Simon settings...</h4>
							</div>
							<div className="modal-body">
								<div className="row" style={{marginBottom: 10}}>
									<div className="col-xs-4">
										Mode:
									</div>
									<div className="col-xs-8">
										<div className="btn-group" data-toggle="buttons">
											<label onClick={this.onModeClick} id="easy" className="btn btn-default active">
												<input type="radio" name="options" id="option1" autoComplete="off" defaultChecked />Easy (lax)
											</label>
											<label onClick={this.onModeClick} id="hard" className="btn btn-default">
												<input type="radio" name="options" id="option2" autoComplete="off" />Hard (strict)
											</label>
										</div>
									</div>
								</div>
								<div className="row" style={{marginBottom: 10}}>
									<div className="col-xs-4">
										Audio:
									</div>
									<div className="col-xs-8">
										<div className="btn-group" data-toggle="buttons">
											<label onClick={this.onSoundClick} id="sound" className="btn btn-default active">
												<input type="radio" name="options" id="option1" autoComplete="off" defaultChecked />Play Sounds
											</label>
											<label onClick={this.onSoundClick} id="mute" className="btn btn-default">
												<input type="radio" name="options" id="option2" autoComplete="off" />Mute
											</label>
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button data-dismiss="modal" type="button" className="btn btn-primary">Continue Game</button>
								<button onClick={this.onStartNewGame} data-dismiss="modal" type="button" className="btn btn-default">New Game</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = SettingsModal;

