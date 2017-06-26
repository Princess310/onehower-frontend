import React from 'react';
import ReactDOM from 'react-dom';
import Icon from 'components/Icon';
import Gtx from 'utils/gtx';

class Grid extends React.PureComponent {
	destoryGrid = () => {
		this.system.style.display = "none";
	}

	drawGrid = () => {
		this.system.style.display = "block";

		let unitWidth = 8;
		let unitHeight = 8;
		let gtx = new Gtx(this.canvas);

		gtx.fitParent();

		let width = this.canvas.clientWidth;
		let height = this.canvas.clientHeight;

		gtx.setStrokeStyle("#ddd");
		gtx.lineWidth(1);
		for(let i = 0; i * unitWidth < width; i++){
			gtx.beginPath();
			gtx.moveTo((i + 1) * unitWidth, 0);
			gtx.lineTo((i + 1) * unitWidth, height);
			gtx.stroke();
		}

		for(let i = 0; i * unitHeight < height; i++){
			gtx.beginPath();
			gtx.moveTo(0, (i + 1) * unitHeight);
			gtx.lineTo(width, (i + 1) * unitHeight);
			gtx.stroke();
		}
	}
	
	render() {
		return (
			<div className="grid-system">
				<div className="grid-canvas" style={{display: "none"}} ref={r => this.system = r}>
					<canvas ref={r => this.canvas = r} onClick={this.destoryGrid}></canvas>
				</div>
				<Icon className="toggle-grid" type={require('icons/actions/grid.svg')} onClick={this.drawGrid} />
			</div>
		);
	}
}

export default Grid;