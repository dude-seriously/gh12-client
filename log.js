var $logElement;

function LogI(tag, data) {
	Log(tag, data, ' important');
}
function LogW(tag, data) {
	Log(tag, data, ' warning');
}
function LogE(tag, data) {
	Log(tag, data, ' error');
}

function Log(tag, data, type) {
	if ($logElement.length > 0) {
		if (!type) {
			type = '';
		}
		var $eRow = $('<div class="row' + type + '">');
		var $eTag = $('<div class="tag">');
		var $eData = $('<div class="data">');
		
		$eTag.html(tag);
		$eData.html(data);
		
		$eRow.append($eTag);
		$eRow.append($eData);
		
		$logElement.prepend($eRow);
	}
}