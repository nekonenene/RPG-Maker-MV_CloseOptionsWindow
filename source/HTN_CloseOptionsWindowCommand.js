// --------------------------------------------------------------------------
//
// CloseOptionsWindowCommand
//
// Copyright (c) 2017 hatonekoe
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
// 2017/04/30 ver0.1.2 より正確な表記に
// 2017/04/30 ver0.1.1 SceneManager.pop() でなく processCancel メソッドを
// 2017/04/30 ver0.1.0 ひとまずの完成
// 2017/04/29 ver0.0.1 開発開始
//
// --------------------------------------------------------------------------
/*:
 * @plugindesc 「オプション」を閉じる選択肢を追加します
 * @author ハトネコエ - http://hato-neko.x0.com
 *
 * @help
 * Command Name : オプションを閉じる選択肢の名前を変更できます。デフォルトは「Close」です
 * Only Moblile : YESにすると、スマホでのプレイ時にのみオプションを閉じる選択肢が表示されます。デフォルトは「NO」です
 *
 * @param Close Command Name
 * @desc オプションを閉じる選択肢の名前
 * @default Close
 *
 * @param Only Moblile
 * @desc モバイル端末でのプレイ時のみ閉じる選択肢を表示（YES/NO）
 * @default NO
 *
 */

(function() {
	"use strict";

	var pluginName = "HTN_CloseOptionsWindowCommand";

	var parameters = PluginManager.parameters(pluginName);
	var closeCommandName = String(parameters["Close Command Name"]);
	var isOnlyMoblileMode = (String(parameters["Only Moblile"]).toUpperCase() === "YES");
	var closeCommandSymbol = "closeOptionsWindow";

	class Window_Options_addCloseCommand extends Window_Options {
		constructor() {
			super();
		}

		makeCommandList() {
			super.makeCommandList();

			if (isOnlyMoblileMode && !Utils.isMobileDevice()) {
				// Only Moblile が YES で、携帯端末でない場合は選択肢の表示なし
			} else {
				this.addCloseCommand();
			}
		}

		addCloseCommand() {
			this.addCommand(closeCommandName, closeCommandSymbol, true);
		}

		processOk() {
			if (this.commandSymbol(this.index()) === closeCommandSymbol) {
				this.processCancel();
			} else {
				super.processOk();
			}
		}

		// ON・OFFが右側に表示されないように
		statusText(index) {
			if (this.commandSymbol(index) === closeCommandSymbol) {
				return "";
			} else {
				return super.statusText(index);
			}
		}
	}

	Window_Options = Window_Options_addCloseCommand;

})();
