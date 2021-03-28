"use strict";

{
	self.C3.Plugins.SmugRainbowPony_INK.Cnds =
	{
		CanContinue() {
			return this._story.canContinue;
		},
		HasChoices() {
			return this._story.currentChoices.length > 0;
		},
		CheckTags(tag) {
			return this._story.currentTags.includes(tag);
		},
		ForEachTag() {
			// Get necessary references
			const runtime = this._runtime;
			const eventSheetManager = runtime.GetEventSheetManager();
			const currentEvent = runtime.GetCurrentEvent();
			const solModifiers = currentEvent.GetSolModifiers();
			const eventStack = runtime.GetEventStack();

			// Get current stack frame and push new one
			const oldFrame = eventStack.GetCurrentStackFrame();
			const newFrame = eventStack.Push(currentEvent);

			for (const tag of this._story.currentTags) {

				this._loopedTag = tag;

				// Push a copy of the current SOL
				eventSheetManager.PushCopySol(solModifiers);

				// Retrigger the current event, running a single loop iteration
				currentEvent.Retrigger(oldFrame, newFrame);

				// Pop the current SOL
				eventSheetManager.PopSol(solModifiers);
			}

			this._loopedTag = null;
			// Pop the event stack frame
			eventStack.Pop();

			// Return false since event already executed
			return false;

		},
		ForEachChoice() {

			// Get necessary references
			const runtime = this._runtime;
			const eventSheetManager = runtime.GetEventSheetManager();
			const currentEvent = runtime.GetCurrentEvent();
			const solModifiers = currentEvent.GetSolModifiers();
			const eventStack = runtime.GetEventStack();

			// Get current stack frame and push new one
			const oldFrame = eventStack.GetCurrentStackFrame();
			const newFrame = eventStack.Push(currentEvent);

			for (const choice of this._story.currentChoices) {

				this._loopedChoice = choice;

				// Push a copy of the current SOL
				eventSheetManager.PushCopySol(solModifiers);

				// Retrigger the current event, running a single loop iteration
				currentEvent.Retrigger(oldFrame, newFrame);

				// Pop the current SOL
				eventSheetManager.PopSol(solModifiers);
			}

			this._loopedChoice = null;
			// Pop the event stack frame
			eventStack.Pop();

			// Return false since event already executed
			return false;
		},
		VariableChanged(name) {
			var var_logged = false;
			if (typeof this._changedvars[name] !== "undefined") {
				var_logged = true;
			}
			delete this._changedvars[name];
			return var_logged;
		}
	};
}