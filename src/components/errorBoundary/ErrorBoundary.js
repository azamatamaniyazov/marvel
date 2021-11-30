import { Component } from "react";
import Error from "../onError/Error";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, errorMessage) {
    console.log(error, errorMessage);
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <Error />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
