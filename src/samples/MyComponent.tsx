import * as React from "react";


export default class MyComponent extends React.Component<any, undefined> {
    render() {
        return (
            <div className="myComponent component" {...this.props}>
                <h1>
                    My React component {this.props.title}
                </h1>
                <hr/>
                {this.props.children}
            </div>
        );
    }
}