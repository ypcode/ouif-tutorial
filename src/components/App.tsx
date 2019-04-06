import * as React from "react";
import MyComponent from "./MyComponent";
import { Tutorial } from "./Tutorial";
import { ITutorialItem } from "../model/ITutorialItem";
import { ITutorial } from "../model/ITutorial";
import { Toggle } from "office-ui-fabric-react";


const item1: ITutorialItem = {
    key: 'c1',
    caption: 'This is the first component',
    content: 'This is the description of the first component',
    nextTrigger: "action",
    learnMore: {
        text: 'Learn more about React',
        url: 'https://www.google.com/?q=react'
    }
};

const item2: ITutorialItem = {
    key: 'c2',
    caption: 'This is the second component',
    content: <div>
        <h2>There is a cool feature with this component !</h2>
        <Toggle label="Do you want to enable it ?" />
    </div>,
    nextTrigger: "action"
};

const item3: ITutorialItem = {
    key: 'c3',
    caption: 'This is the third component',
    content: 'This is the description of the third component',
    nextTrigger: "action",
    nextActionText: "Got it!"
};

const item4: ITutorialItem = {
    key: 's1',
    caption: 'This is static HTML',
    content: 'This is the description of the component',
    delay: null,
    nextTrigger: "action",
    nextActionText: "Got it!"
};

const item5: ITutorialItem = {
    key: 's2',
    caption: 'This is also static HTML',
    content: 'This is the description of that component',
    delay: null,
    nextTrigger: "action",
    nextActionText: "Got it!"
};

const item6: ITutorialItem = {
    key: 's3',
    caption: 'This is as well PURE HTML',
    content: 'This is the description of the HTML element',
    delay: null,
    nextTrigger: "action",
    nextActionText: "Got it!"
};

const demoTutorial1: ITutorial = {
    id: "Demo Tuto 1",
    items: [item1, item2, item3, item4, item5, item6]
};

export interface AppProps {
}

export default class App extends React.Component<AppProps, undefined> {
    render() {
        return (
            <div className="app">
                <MyComponent data-tutorial-anchor="c1" title="Component 1">
                    Component 1 content
            </MyComponent>

                <MyComponent data-tutorial-anchor="c2" title="Component 2">
                    Component 2 content
            </MyComponent>

                <MyComponent data-tutorial-anchor="c3" title="Component 3">
                    Component 3 content
            </MyComponent>

                <MyComponent data-tutorial-anchor="c4">
                    Component 4
            </MyComponent>

                <MyComponent data-tutorial-anchor="c5">
                    Component 5
            </MyComponent>



                <Tutorial tutorial={demoTutorial1} showReplayTutorial={true} replayTutorialLabel="Please replay the tutorial..." />
            </div>
        );
    }
}