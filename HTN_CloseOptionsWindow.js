"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// --------------------------------------------------------------------------
//
// CloseOptionsWindow
//
// Copyright (c) 2017 hatonekoe
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
// 2016/04/30 ver0.1.0 ひとまずの完成
// 2016/04/29 ver0.0.1 開発開始
//
// --------------------------------------------------------------------------
/*:
 * @plugindesc タイトル画面の「オプション」を閉じる選択肢を追加します
 * @author ハトネコエ - http://hato-neko.x0.com
 *
 * @help
 * Command Name : オプションを閉じる選択肢の名前を変更できます。デフォルトは「Close」です
 * Only Moblile : YESにすると、スマホでのプレイ時にのみオプションを閉じる選択肢が表示されます。デフォルトは「NO」です
 *
 * @param Close Command Name
 * @desc 「オプション」を閉じる選択肢の名前
 * @default Close
 *
 * @param Only Moblile
 * @desc モバイル端末でのプレイ時のみ閉じる選択肢を表示（YES/NO）
 * @default NO
 *
 */

(function () {
  "use strict";

  var pluginName = "HTN_CloseOptionsWindow";

  var parameters = PluginManager.parameters(pluginName);
  var closeCommandName = String(parameters["Close Command Name"]);
  var isOnlyMoblileMode = String(parameters["Only Moblile"]).toUpperCase() === "YES";
  var closeCommandSymbol = "closeOptionsWindow";

  var Window_Options_addCloseCommand = function (_Window_Options) {
    _inherits(Window_Options_addCloseCommand, _Window_Options);

    function Window_Options_addCloseCommand() {
      _classCallCheck(this, Window_Options_addCloseCommand);

      return _possibleConstructorReturn(this, (Window_Options_addCloseCommand.__proto__ || Object.getPrototypeOf(Window_Options_addCloseCommand)).call(this));
    }

    _createClass(Window_Options_addCloseCommand, [{
      key: "makeCommandList",
      value: function makeCommandList() {
        _get(Window_Options_addCloseCommand.prototype.__proto__ || Object.getPrototypeOf(Window_Options_addCloseCommand.prototype), "makeCommandList", this).call(this);

        if (isOnlyMoblileMode && !Utils.isMobileDevice()) {
          // Only Moblile が YES で、携帯端末でない場合は選択肢の表示なし
        } else {
          this.addCloseCommand();
        }
      }
    }, {
      key: "addCloseCommand",
      value: function addCloseCommand() {
        this.addCommand(closeCommandName, closeCommandSymbol, true);
      }
    }, {
      key: "processOk",
      value: function processOk() {
        if (this.commandSymbol(this.index()) === closeCommandSymbol) {
          SceneManager.pop();
        } else {
          _get(Window_Options_addCloseCommand.prototype.__proto__ || Object.getPrototypeOf(Window_Options_addCloseCommand.prototype), "processOk", this).call(this);
        }
      }

      // ON・OFFが右側に表示されないように

    }, {
      key: "statusText",
      value: function statusText(index) {
        if (this.commandSymbol(index) === closeCommandSymbol) {
          return "";
        } else {
          return _get(Window_Options_addCloseCommand.prototype.__proto__ || Object.getPrototypeOf(Window_Options_addCloseCommand.prototype), "statusText", this).call(this, index);
        }
      }
    }]);

    return Window_Options_addCloseCommand;
  }(Window_Options);

  Window_Options = Window_Options_addCloseCommand;
})();