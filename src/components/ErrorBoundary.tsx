import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
    name?: string;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(`Uncaught error in ${this.props.name || 'Component'}:`, error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center p-8 bg-red-900/10 border border-red-500/20 rounded-xl text-center h-full w-full min-h-[300px]">
                    <h2 className="text-red-500 font-mono text-lg mb-2 tracking-tighter">SYSTEM_RUNTIME_ERROR</h2>
                    <p className="text-white/60 text-sm font-sans max-w-md">
                        The {this.props.name || 'component'} encountered a critical failure during initialization or rendering.
                    </p>
                    <pre className="mt-4 p-4 bg-black/40 rounded text-[10px] text-red-400/80 font-mono overflow-auto max-w-full text-left border border-red-500/10">
                        {this.state.error?.message}
                    </pre>
                    <button
                        onClick={() => {
                            this.setState({ hasError: false, error: null });
                            // Optional: window.location.reload();
                        }}
                        className="mt-6 px-6 py-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/40 rounded-full text-xs text-white transition-all font-mono tracking-widest"
                    >
                        REINITIALIZE
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
