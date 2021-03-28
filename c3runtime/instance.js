"use strict";

{
	const C3 = self.C3;

	C3.Plugins.SmugRainbowPony_INK.Instance = class InkInstance extends C3.SDKInstanceBase {
		constructor(inst, properties) {
			super(inst);

			// story data
			this._story = null;

			// caches and buffers
			this._storyjson = null;
			this._loopedChoice = null;
			this._loopedTag = null;

			this._changedvars = {};

			if (properties)		// note properties may be null in some cases
			{
			}
		}

		Release() {
			super.Release();
		}

		//#region Setup
		_SetStory(jsonstr) {
			this._storyjson = jsonstr;
			this._story = new inkjs.Story(jsonstr);
		}
		//#endregion

		SaveToJson() {
			return {
				storyjson: this._story ? this._story.ToJson() : null,
				storystate: this._story ? this._story.state.ToJson() : null
			};
		}

		LoadFromJson(o) {
			this._story = new inkjs.Story(o.storyjson);
			this._story.state.LoadJson(o.storystate);
		}

		GetScriptInterfaceClass() {
			return self.IMyInkInstance;
		}
	};

	// Script interface. Use a WeakMap to safely hide the internal implementation details from the
	// caller using the script interface.
	const map = new WeakMap();

	self.IMyInkInstance = class IMyInkInstance extends self.IInstance {
		constructor() {
			super();

			// Map by SDK instance
			map.set(this, self.IInstance._GetInitInst().GetSdkInstance());
		}

		loadStory(jsonstr) {
			map.get(this)._SetStory(jsonstr);
		}

		get story() {
			return map.get(this)._story;
		}
	};
}