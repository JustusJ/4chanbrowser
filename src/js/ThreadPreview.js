import React, { Component } from 'react';
import "../css/ThreadPreview.css"
import classNames from "classnames";
import shallowCompare from "react-addons-shallow-compare";

class ThreadPreview extends Component {

  constructor() {
  	super();
  	this.state = {showFull: false};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

	previewThumbUrl() {
		return this.props.thread.previewThumbUrl;
	}

	hideThread() {
		this.props.threadActions.hideThread(this.props.thread.no);
	}

	saveThread() {
		this.props.threadActions.saveThread(this.props.thread.no);
	}

	setDebugThread() {
		this.props.threadActions.setDebugThread(this.props.thread);
	}

	teaserText() {
		return [this.props.thread.sub, this.props.thread.com].filter((x) => x).join("<br>");
	}

	toggleShowFull() {
		this.setState({showFull: !this.state.showFull});
	}

	render() {
		if(this.props.threadState && this.props.threadState.get("state")) {
			return null;
		}
		return <span className="ThreadPreview">
			<div className="ThreadPreview-actions">
				<a className="ThreadPreview-action ThreadPreview-action--hide" onClick={this.hideThread.bind(this)}> Hide </a>
				<a className="ThreadPreview-action ThreadPreview-action--save" onClick={this.saveThread.bind(this)}> Save </a>
			</div>
			<a className="ThreadPreview-image" href={this.props.thread.url}>
				<img className="ThreadPreview-img" src={this.previewThumbUrl() } alt="" />
			</a>
			<span
				className={classNames("ThreadPreview-comment", {'ThreadPreview-comment--full': this.state.showFull})}
				onClick={this.toggleShowFull.bind(this)}
				dangerouslySetInnerHTML={{__html: this.teaserText()}}></span>
			<span className="ThreadPreview-info" onClick={this.setDebugThread.bind(this)}>images: {this.props.thread.images}</span>
		</span>
	}

}

export default ThreadPreview;
