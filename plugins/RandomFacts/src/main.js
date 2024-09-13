import { registerCommand } from "@vendetta/commands"

let dogFactCommand = [
]

let catFactCommand = [
]

let uselessFactCommand = [
]

const uselessFact = async function () {
    const response = await fetch(`https://uselessfacts.jsph.pl/api/v2/facts/random`);
    const resp = await response.json();
    return resp['text']
}

const dogFact = async function () {
    const response = await fetch(`https://dogapi.dog/api/v2/facts?limit=1`);
    const resp = await response.json();
    return resp['data']['0']['attributes']['body']
}

const catFact = async function () {
    const response = await fetch(`https://catfact.ninja/fact`);
    const resp = await response.json();
    return resp["fact"]
}

export const onLoad = () => {
    catFactCommand = registerCommand({
        name: "catfact",
        displayName: "catfact",
        description: "Sends a random cat fact.",
        displayDescription: "Sends a random cat fact.",
        applicationId: '-1',
        inputType: 1,
        type: 1,

        execute: async () => { return { content: await catFact() }}
    });
    dogFactCommand = registerCommand({
        name: "dogfact",
        displayName: "dogfact",
        description: "Sends a dog fact.",
        displayDescription: "Sends a dot fact.",
        applicationId: '-1',
        inputType: 1,
        type: 1,

        execute: async () => { return { content: await dogFact() }}
    });
    uselessFactCommand = registerCommand({
        name: "useless",
        displayName: "useless",
        description: "Sends a useless fact.",
        displayDescription: "Sends a useless fact.",
        applicationId: '-1',
        inputType: 1,
        type: 1,

        execute: async () => { return { content: await uselessFact() }}
    });
}

export const onUnload = () => {
    catFactCommand();
    dogFactCommand();
    uselessFactCommand();
}
