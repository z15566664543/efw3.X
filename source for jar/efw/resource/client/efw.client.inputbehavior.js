/**** efw3.X Copyright 2016 efwGrp ****/
/**
 * The class to customize input behavior.
 * 
 * @author Chang Kejun
 */
function efwClientInputBehavior() {
};
/**
 * The event to disable F1.
 * @returns {Boolean}
 */
efwClientInputBehavior.prototype.unDohelp = function() {
	return false;
};
/**
 * The event about shortcut.
 * @param e
 * @returns {Boolean}
 */
efwClientInputBehavior.prototype.DoShortcut = function(e) {
	var keyCode = parseInt(e.keyCode, 10);
	var ctrl = e.ctrlKey;
	var alt = e.altKey;
	var fcsElt = $(":focus");
	var doShortcut = false;
	var key=null;
	if (!isNaN(keyCode) && keyCode >= 112 && keyCode <= 123) {// function key
		key = "F" + (keyCode - 111);
	} else if (ctrl && !isNaN(keyCode)) {
		if (keyCode != 17) {// 17 is ctrl
			key = "CTRL+" + String.fromCharCode(keyCode);
		}
	} else if (alt && !isNaN(keyCode)) {
		if (keyCode != 18) {// 18 is alt
			key = "ALT+" + String.fromCharCode(keyCode);
		}
	}
	if (key!=null){
		var btns=$("[data-shortcut='"+key+"']");
		if(btns.length>0){doShortcut = true;};
		//dialog is shown and it is modal,take btn in dialog
		if($(".ui-dialog:visible").length!=0 && $(".ui-widget-overlay:visible").length!=0){
			var topDialog=null;
			$(".ui-dialog:visible").each(function(){
				if (topDialog==null){
					topDialog=this;
				}else{
					if($(topDialog).css("z-index")<$(this).css("z-index")){
						topDialog=this;
					}
				}
			});
			btns=$("[data-shortcut='"+key+"']",topDialog);
		}else{//or take btn not in dialog
			btns=$("[data-shortcut='"+key+"']:not(.ui-dialog [data-shortcut='"+key+"'])");
		}
		$(btns).each(function(){
			var btn = $(this);
			this.focus();
			setTimeout(function() {
				btn.click();
				$(fcsElt).focus();
			}, 100);
			return false;//run only once.it means you can not define a key muti times.
		});
	}
	
	if (doShortcut) return false;
};
/**
 * The event of focus.
 */
efwClientInputBehavior.prototype.DoFocus = function() {
	$(this).addClass("efw_input_focus");
};
/**
 * The event of blur.
 */
efwClientInputBehavior.prototype.DoBlur = function() {
	$(this).removeClass("efw_input_focus");
};
/**
 * The event of format focus.
 */
efwClientInputBehavior.prototype.DoFormatFocus = function() {
	var vl = $(this).val();
	if (vl != "") {
		var format = $(this).attr("data-format");
		if (format != null && format != "") {
			// if it is number format
			if (format.indexOf("0") > -1 || format.indexOf("#") > -1) {
				try {
					$(this).val(
							EfwClientFormat.prototype.parseNumber(vl, format));
				} catch (e) {
					$(this).val("");
				}
			} else {// if it is date format
				try {
					var dt = EfwClientFormat.prototype.parseDate(vl, format);
					var dtstr = EfwClientFormat.prototype._formatDateToNumber(
							dt, format);
					$(this).val(dtstr);
				} catch (e) {
					$(this).val("");
				}
			}
		}
	}
	if (this.selectionStart) {
		this.selectionStart = this.selectionEnd = this.value.length;
	} else if(this.createTextRange) {
		this.createTextRange().select();
	}
};
/**
 * The event of format blur.
 */
efwClientInputBehavior.prototype.DoFormatBlur = function() {
	var vl = $(this).val();
	if (vl != "") {
		var format = $(this).attr("data-format");
		if (format != null && format != "") {
			// if it is number format
			if (format.indexOf("0") > -1 || format.indexOf("#") > -1) {
				try {
					$(this).val(
							EfwClientFormat.prototype.formatNumber(vl, format));
				} catch (e) {
					$(this).val("");
				}
			} else {// it it is date format
				var dt = null;
				try {
					dt = EfwClientFormat.prototype._parseDateFromNumber(vl,
							format);
					if (dt == null) {
						dt = EfwClientFormat.prototype.parseDate(vl, format);
					}
					if (dt != null) {
						var dtstr = EfwClientFormat.prototype.formatDate(dt,
								format);
						$(this).val(dtstr);
					} else {
						$(this).val("");
					}
				} catch (e) {
					$(this).val("");
				}
			}
		}
	}
};