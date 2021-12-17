"use strict";

{
    self.C3.Plugins.SmugRainbowPony_INK.Exps = {
        StateToJson() {
            return this._story.state.ToJson();
        },
        CurrentText() {
            return this._story.currentText;
        },
        ChoiceText(i) {
            return this._story.currentChoices[i].text;
        },
        ChoicesAmount() {
            return this._story.currentChoices.length;
        },
        KeyValueTag(key, sep) {
            for (const tag of this._story.currentTags) {
                let indexofsep = tag.indexOf(sep);
                if (indexofsep >= 0 && tag.slice(0, indexofsep).trim() == key) {
                    return tag.slice(indexofsep + sep.length).trim();
                }
            }
            return undefined;
        },
        LoopChoiceText() {
            return this._loopedChoice.text;
        },
        LoopChoiceIndex() {
            return this._loopedChoice.index;
        },
        LoopTagText() {
            return this._loopedTag;
        },
        VariableValue(name) {
            let value = this._story.variablesState[name];
            if (value instanceof inkjs.InkList) {
                return value.maxItem.Key.itemName;
            } else {
                return value;
            }
        },
    };
}
