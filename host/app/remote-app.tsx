"use client";

import { Component, type ComponentType } from "react";

type RemoteAppState = {
  error: string | null;
  RemoteComponent: ComponentType | null;
};

export default class RemoteApp extends Component<Record<string, never>, RemoteAppState> {
  state: RemoteAppState = {
    error: null,
    RemoteComponent: null,
  };

  private cancelled = false;

  async componentDidMount() {
    try {
      const { default: RemoteModule } = (await import("remote/remote-app")) as {
        default?: ComponentType | null;
      };

      if (!RemoteModule) {
        throw new Error("Remote module did not expose a default component.");
      }

      if (!this.cancelled) {
        this.setState({ RemoteComponent: RemoteModule });
      }
    } catch (loadError) {
      if (!this.cancelled) {
        this.setState({
          error: loadError instanceof Error ? loadError.message : String(loadError),
        });
      }
    }
  }

  componentWillUnmount() {
    this.cancelled = true;
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            background: "#4b1f1f",
            borderRadius: "10px",
            color: "white",
            maxWidth: "260px",
            padding: "20px",
          }}
        >
          Failed to load remote: {this.state.error}
        </div>
      );
    }

    const { RemoteComponent } = this.state;
    return RemoteComponent ? <RemoteComponent /> : null;
  }
}
