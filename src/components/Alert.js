import { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: '2px',
      borderStyle: 'solid',
      fontWeight: 'bolder',
      borderRadius: '7px',
      borderColor: this.color,
      textAlign: 'center',
      fontSize: '12px',
      margin: '10px 0',
      padding: '10px',
    };
  };

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = '#82b8d6'; // blue
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = '#e57373'; // red
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = '#ff8c42'; // orange
  }
}

export { Alert, InfoAlert, ErrorAlert, WarningAlert };
