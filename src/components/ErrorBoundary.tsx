import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary] Caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  handleGoHome = (): void => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="max-w-md mx-auto min-h-screen bg-[var(--bg-warm)] font-body flex items-center justify-center p-6">
          <div className="w-full bg-white border-2 border-black shadow-[4px_4px_0px_var(--black)] rounded-xl p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--yellow-light)] border-2 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0px_var(--black)]">
              <AlertTriangle size={32} className="text-[var(--mango)]" />
            </div>

            <h1 className="text-2xl font-headline font-bold text-[var(--black)] mb-2">
              Oops! Something went wrong
            </h1>

            <p className="text-sm text-gray-600 mb-4">
              The app hit an unexpected snag (often a corrupt or unreadable data file).
              Your progress is safe — try reloading, or come back in a moment.
            </p>

            {this.state.error && (
              <details className="mb-5 text-left bg-[var(--surface-low)] border-2 border-black rounded-lg p-3">
                <summary className="text-xs font-bold text-[var(--black)] cursor-pointer">
                  Technical details
                </summary>
                <pre className="mt-2 text-[11px] leading-snug text-[var(--on-surface-variant)] whitespace-pre-wrap break-words max-h-40 overflow-auto">
                  {this.state.error.name}: {this.state.error.message}
                </pre>
              </details>
            )}

            <div className="flex flex-col gap-2">
              <button
                onClick={this.handleReload}
                className="w-full flex items-center justify-center gap-2 bg-[var(--mango)] text-white font-bold py-2.5 rounded-lg border-2 border-black shadow-[3px_3px_0px_var(--black)] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_var(--black)] transition-all"
              >
                <RefreshCw size={18} />
                Reload
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={this.handleReset}
                  className="flex items-center justify-center gap-1 bg-white text-[var(--black)] font-bold py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_var(--black)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_var(--black)] transition-all text-sm"
                >
                  Try again
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="flex items-center justify-center gap-1 bg-white text-[var(--black)] font-bold py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_var(--black)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_var(--black)] transition-all text-sm"
                >
                  <Home size={14} />
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
