import { ITutorial } from "./model/ITutorial";
import ReactDOM = require("react-dom");
import { TutorialItemDisplay } from "./components/Tutorial";
import { ITutorialItem } from "./model/ITutorialItem";
import { assign } from "office-ui-fabric-react";
import React = require("react");

const TUTORIAL_ANCHOR_ATTRIBUTE = "data-tutorial-anchor";

interface ILinkedTutorialItem extends ITutorialItem {
    next: ILinkedTutorialItem;
}

const LOCAL_STORAGE_TUTORIAL_PLAYED_PREFIX = "TutorialPlayed";

export const shouldPlayTutorial = (tutorial: ITutorial) => {
    let tutorialCacheKey = `${LOCAL_STORAGE_TUTORIAL_PLAYED_PREFIX}_${tutorial.id}`;
    let cacheValue = localStorage.getItem(tutorialCacheKey);
    return cacheValue != "true";
};

export const tutorialWasPlayed = (tutorial: ITutorial) => {
    let tutorialCacheKey = `${LOCAL_STORAGE_TUTORIAL_PLAYED_PREFIX}_${tutorial.id}`;
    localStorage.setItem(tutorialCacheKey, "true");
};

export const refreshTutorial = (tutorial: ITutorial) => {
    let tutorialCacheKey = `${LOCAL_STORAGE_TUTORIAL_PLAYED_PREFIX}_${tutorial.id}`;
    localStorage.removeItem(tutorialCacheKey);
}

const playTutorial = (tutorial: ITutorial) => {
    if (!tutorial) {
        throw new Error("The tutorial data is not specified");
    }

    if (tutorial.items.length == 0) {
        console.log('No items in the tutorial');
        return;
    }

    // create the tutorial component host
    const host = document.createElement("div");
    document.body.append(host);

    // Build linked list from tutorial items array
    const itemsChain = buildLinkedListFromArray(tutorial.items);

    console.log(`Items chain : ${itemsChain.length} elements`);
    console.log(itemsChain);

    renderTutorialItem(itemsChain[0], host, () => {
        tutorialWasPlayed(tutorial);
    });

};

export const playTutorialIfNeeded = (tutorial:ITutorial) => {
    if (shouldPlayTutorial(tutorial)) {
        playTutorial(tutorial);
    }
};

const renderTutorialItem = (item: ILinkedTutorialItem, host: HTMLElement, completed: () => void) => {

    if (!item) {
        console.log('Clear the tutorial item');
        ReactDOM.render(null, host);
        completed && completed();
        return;
    }

    console.log(`Render tutorial item ${item.key}...`);

    const next = (argItem: ILinkedTutorialItem) => {
        console.log(`Call the next callback on ${argItem.key}`);
        console.log(argItem);
        if (argItem.next) {
            console.log(`Has a next element ${argItem.next.key}`);
            renderTutorialItem(argItem.next, host, completed);
        } else {
            console.log(`${argItem.key} has no next element`);
            renderTutorialItem(null, host, completed);
        }
    };

    // Get all the elements from the DOM tagged with a data-tutorial-anchor attribute
    let targetElement = document.querySelector(`[${TUTORIAL_ANCHOR_ATTRIBUTE}='${item.key}']`);
    if (!targetElement) {
        console.log(`target element with anchor ${item.key} not found!`);
        next(item);
        return;
    }

    if (targetElement) {
        console.log('Rendering tutorial item');
        ReactDOM.render(<TutorialItemDisplay targetElement={targetElement as HTMLElement} tutorialItem={item} next={next} />, host);
    }

    if (item.nextTrigger == "delay" && item.delay) {
        setTimeout(() => next(item), item.delay);
    }
};

const buildLinkedListFromArray: ((items: ITutorialItem[]) => ILinkedTutorialItem[]) = (items) => {

    const itemsChain: ILinkedTutorialItem[] = [];

    let linkedItem = assign({},
        items[items.length - 1],
        { next: null }) as ILinkedTutorialItem;

    for (let i = items.length - 1; i > 0; i--) {
        let previous = items[i - 1];
        linkedItem = assign({}, previous, { next: linkedItem }) as ILinkedTutorialItem;
    }

    let current = linkedItem;
    while (current) {
        itemsChain.push(current);
        current = current.next;
    }

    return itemsChain;
};

export default playTutorial;