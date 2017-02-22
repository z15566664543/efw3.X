/**** efw3.X Copyright 2017 efwGrp ****/
/**
 * The class is for include google charts.
 */
function EfwClientChart(chartId,dataId,type,isStacked){
	this.chartId=chartId;
	this.dataId=dataId;
	this.type=type;
	this.isStacked=isStacked;
}
/**
 * The id to operate the chart.
 */
EfwClientChart.prototype.chartId=null;
/**
 * The id of the data table. 
 */
EfwClientChart.prototype.dataId=null;
/**
 * The type of the chart.
 */
EfwClientChart.prototype.type=null;
/**
 * The data.
 */
EfwClientChart.prototype.data=[];
/**
 * The opetions.
 */
EfwClientChart.prototype.options={};
/**
 * The function to draw the chart.
 */
EfwClientChart.prototype.draw=function(){
	var d=[];
	$("#"+this.dataId+" tr").each(function(){
		var row=[];
		$("td,th",this).each(function(){
			var value=$(this).html();
			var num=Number.parse(value);
			if (isNaN(num)){
				row[row.length]=value;
			}else{
				row[row.length]=0+num;
			}
		});
		d[d.length]=row;
	});
	this.data=d;
	this.options={
		     title:$("#"+this.dataId+" caption").html(),
		     hAxis:{title: $("#"+this.dataId+" td,th:eq(0)").html()},
		 };
	window.frames["iframe_"+this.chartId].location="chart/"+this.type+".html";
	this._draw();
	
};
EfwClientChart.prototype._draw=function(){
    var win = window.frames["iframe_"+this.chartId];
    var doc = win.document;
    if (	doc!=null
    		&&doc.readyState=="complete"
    		&&win.drawChart!=null 
    		&&win.googleChartIsLoaded==true) {
    	win.drawChart(this.data,this.options);
    	return;
    }
    var _chart=this;
    window.setTimeout(function(){_chart._draw();}, 100);
};
/**
 * The function to reset the chart type.
 */
EfwClientChart.prototype.setType=function(type){
	this.type=type;
    var win = window.frames["iframe_"+this.chartId];
    win.googleChartIsLoaded=false;
	this.draw();
};
/**
 * The function to reset the chart width.
 * @param width
 */
EfwClientChart.prototype.setWidth=function(width){
	$("#iframe_"+this.chartId).css("width",width);
    var win = window.frames["iframe_"+this.chartId];
    win.googleChartIsLoaded=false;
	this.draw();
};
/**
 * The function to reset the chart height.
 * @param height
 */
EfwClientChart.prototype.setHeight=function(height){
	$("#iframe_"+this.chartId).css("height",height);
    var win = window.frames["iframe_"+this.chartId];
    win.googleChartIsLoaded=false;
	this.draw();
};