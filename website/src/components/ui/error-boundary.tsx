"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "rgba(196,98,10,0.06)",
          border: "1px solid rgba(196,98,10,0.18)",
          borderRadius: "12px",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "13px",
          color: "#8a8a9a",
        }}>
          Something went wrong. Please refresh the page.
        </div>
      );
    }
    return this.props.children;
  }
}
