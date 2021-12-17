"use strict";

{
    self.C3.Plugins.SmugRainbowPony_INK.Acts = {
        SetStory(jsonstr) {
            this._SetStory(jsonstr);
        },
        LoadState(jsonstr) {
            this._story.state.LoadJson(jsonstr);
        },
        StartObservingVariable(name) {
            this._story.ObserveVariable(name, (name, new_value) => {
                this._changedvars[name] = new_value;
                this.Trigger(
                    C3.Plugins.SmugRainbowPony_INK.Cnds.VariableChanged
                );
            });
        },
        Continue(maximally) {
            if (maximally) {
                this._story.ContinueMaximally();
            } else {
                this._story.Continue();
            }
        },
        Choose(choice) {
            this._loopedChoice = null;
            this._story.ChooseChoiceIndex(choice);
        },
        GoTo(path) {
            this._story.ChoosePathString(path);
        },
        SetVariable(name, value) {
            this._story.variablesState[name] = value;
        },
    };
}
