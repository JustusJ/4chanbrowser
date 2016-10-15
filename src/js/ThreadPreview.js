import React, { Component } from 'react';
import "../css/ThreadPreview.css"

class ThreadPreview extends Component {

	previewThumbUrl() {
		return this.props.thread.previewThumbUrl;
	}

	render() {
		return <span className="ThreadPreview">
			<a href={this.props.thread.url}>
				<img className="ThreadPreview-image" src={this.previewThumbUrl() } alt="" />
			</a>
			<span className="ThreadPreview-info">tim: {this.props.thread.tim}</span>
			<span className="ThreadPreview-info">images: {this.props.thread.images}</span>
			<span className="ThreadPreview-info">no: {this.props.thread.no}</span>
		</span>
	}

}

export default ThreadPreview;
