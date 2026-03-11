import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log errorInfo to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "red", background: "#fff7e6", padding: 24, borderRadius: 12, margin: 24, textAlign: "center" }}>
          <h2>Something went wrong in this section.</h2>
          <div>{this.state.error && this.state.error.toString()}</div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
