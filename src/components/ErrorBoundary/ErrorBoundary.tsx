import React,{ErrorInfo, ReactNode} from "react";
import {Link} from "react-router-dom"
import ErrorMessage from "../ErrorMessage/ErrorMessage";

type Kids = {
    children: ReactNode;
}

type ErrorState = {
    hasError: boolean
}

class ErrorBoundary extends React.Component<Kids,ErrorState> {
    constructor(props: Kids) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError():ErrorState {
        return {
            hasError: true
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(`${error},
            The error is located at: ${errorInfo.componentStack} 
        `)
    }

    render () {
        if (this.state.hasError) {
            return (
                <ErrorMessage/>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary;