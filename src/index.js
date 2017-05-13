import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
var time;
function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	var ms = today.getMilliseconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('clock').innerHTML = h + ":" + m + ":" + s + ":" + ms;
	var t = setTimeout(startTime, 1);
}
function checkTime(i) {
	if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	return i;
}
function loadData(url,callback) {
	  var xhttp = new XMLHttpRequest();
	  xhttp.overrideMimeType("application/json");
	  xhttp.open("GET", url, true);
	  xhttp.onreadystatechange = function() {
		if (xhttp.readyState === 4 && xhttp.status === 200) {
		   callback(xhttp.responseText);
		}
	  };
	  xhttp.send();
}

function dBLoad(){
	const dbName = "JSONDatabase";
	var request =  window.indexedDB.open(dbName,2);
	request.onerror = function(event) {
		alert("Database error: " + event.target.errorCode);
	};
	request.onupgradeneeded = function(event) {
		var db = event.target.result;
		var obj1 = db.createObjectStore("comments", { keyPath: "id" });
		obj1.createIndex("postId", "postId", { unique: false });
		obj1.createIndex("name", "name", { unique: false });
		obj1.createIndex("email", "email", { unique: false });
		obj1.createIndex("body", "body", { unique: false });
		var obj2 = db.createObjectStore("photos", { keyPath: "id" });
		obj2.createIndex("albumId", "albumId", { unique: false });
		obj2.createIndex("title", "title", { unique: false });
		obj2.createIndex("url", "url", { unique: false });
		obj2.createIndex("thumbnailUrl", "thumbnailUrl", { unique: false });
		var obj3 = db.createObjectStore("todos", { keyPath: "id" });
		obj3.createIndex("userId", "userId", { unique: false });
		obj3.createIndex("title", "title", { unique: false });
		obj3.createIndex("completed", "completed", { unique: false });
		var obj4 = db.createObjectStore("posts", { keyPath: "id" });
		obj4.createIndex("userId", "userId", { unique: false });
		obj4.createIndex("title", "title", { unique: false });
		obj4.createIndex("body", "body", { unique: false });
	};;
}
function dBSave(json,i){
	const dbName = "JSONDatabase";
	var request =  window.indexedDB.open(dbName,2);
	request.onsuccess = function(event){
		var db = event.target.result;
		if(i===1){
			time = new Date();
			var startsave= time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+":"+time.getMilliseconds();
			document.getElementById('startsave1').innerHTML=startsave;
			var transaction = db.transaction(["comments"], "readwrite");
			var objectStore = transaction.objectStore("comments");
			for (var j in json) {
			  var request = objectStore.add(json[j]);
			  request.onsuccess = function(event) {
			  };
			}
			time = new Date();
			var endsave= time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+":"+time.getMilliseconds();
			document.getElementById('endsave'+i.toString()).innerHTML=endsave;	
		}
		if(i===2){
			time = new Date();
			var startsave= time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+":"+time.getMilliseconds();
			document.getElementById('startsave2').innerHTML=startsave;
			var transaction = db.transaction(["photos"], "readwrite");
			var objectStore = transaction.objectStore("photos");
			for (var j in json) {
			  var request = objectStore.add(json[j]);
			  request.onsuccess = function(event) {
			  };
			}
			time = new Date();
			var endsave= time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+":"+time.getMilliseconds();
			document.getElementById('endsave'+i.toString()).innerHTML=endsave;	
		}
		if(i===3){
			time = new Date();
			var startsave= time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+":"+time.getMilliseconds();
			document.getElementById('startsave3').innerHTML=startsave;
			var transaction = db.transaction(["todos"], "readwrite");
			var objectStore = transaction.objectStore("todos");
			for (var j in json) {
			  var request = objectStore.add(json[j]);
			  request.onsuccess = function(event) {
			  };
			}
			time = new Date();
			var endsave= time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+":"+time.getMilliseconds();
			document.getElementById('endsave'+i.toString()).innerHTML=endsave;	
		}
		if(i===4){
			time = new Date();
			var startsave= time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+":"+time.getMilliseconds();
			document.getElementById('startsave4').innerHTML=startsave;
			var transaction = db.transaction(["posts"], "readwrite");
			var objectStore = transaction.objectStore("posts");
			for (var j in json) {
			  var request = objectStore.add(json[j]);
			  request.onsuccess = function(event) {
			  };
			}
			time = new Date();
			var endsave= time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+":"+time.getMilliseconds();
			document.getElementById('endsave'+i.toString()).innerHTML=endsave;	
		}
	};	
}

function JSONLoad(timer,url,i){
	var starttime = timer.getHours()+":"+timer.getMinutes()+":"+timer.getSeconds()+":"+timer.getMilliseconds();
	document.getElementById('start'+i.toString()).innerHTML=starttime;
	loadData(url,function(response){
		var j = JSON.parse(response);
		time = new Date();
		var endtime= time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+":"+time.getMilliseconds();
		document.getElementById('end'+i.toString()).innerHTML=endtime;
		dBSave(j,i);
		
	});
}
class Upload extends React.Component{
	constructor(props){
		super(props);
		this.load=this.load.bind();
		startTime();
		dBLoad();
	}	
	load(event){
		var i = event.target.value;
		document.getElementById('start'+i).innerHTML="Loading...";
		document.getElementById('end'+i).innerHTML="Loading...";
		document.getElementById('startsave'+i).innerHTML="Loading...";
		document.getElementById('endsave'+i).innerHTML="Loading...";
		time = new Date();
		if(i==='1')
			JSONLoad(time,'https://jsonplaceholder.typicode.com/comments',1);
		if(i==='2')
			JSONLoad(time,'https://jsonplaceholder.typicode.com/photos',2);
		if(i==='3')
			JSONLoad(time,'https://jsonplaceholder.typicode.com/todos',3);
		if(i==='4')
			JSONLoad(time,'https://jsonplaceholder.typicode.com/posts',4);
	}
	render(){
		setTimeout(function (){
			var i;
			time = new Date();
			JSONLoad(time,'https://jsonplaceholder.typicode.com/comments',1);
			JSONLoad(time,'https://jsonplaceholder.typicode.com/photos',2);
			JSONLoad(time,'https://jsonplaceholder.typicode.com/todos',3);
			JSONLoad(time,'https://jsonplaceholder.typicode.com/posts',4);
		},5000);	
		return(
			<div>
			<table>
				<tr>
					<td>
						<b><label>Start:&nbsp;</label></b><label id='start1'>Loading...</label><br/>
						<b><label>End:&nbsp;</label></b><label id='end1'>Loading...</label><br/>
						<b><label>Start Save:&nbsp;</label></b><label id='startsave1'>Loading...</label><br/>
						<b><label>End Save:&nbsp;</label></b><label id='endsave1'>Loading...</label><br/>
					</td>
					<td>
						<b><label>Start:&nbsp;</label></b><label id='start2'>Loading...</label><br/>
						<b><label>End:&nbsp;</label></b><label id='end2'>Loading...</label><br/>
						<b><label>Start Save:&nbsp;</label></b><label id='startsave2'>Loading...</label><br/>
						<b><label>End Save:&nbsp;</label></b><label id='endsave2'>Loading...</label><br/>
					</td>
				</tr>
				<tr>
					<td>
						<b><label>Start:&nbsp;</label></b><label id='start3'>Loading...</label><br/>
						<b><label>End:&nbsp;</label></b><label id='end3'>Loading...</label><br/>
						<b><label>Start Save:&nbsp;</label></b><label id='startsave3'>Loading...</label><br/>
						<b><label>End Save:&nbsp;</label></b><label id='endsave3'>Loading...</label><br/>
					</td>
					<td>
						<b><label>Start:&nbsp;</label></b><label id='start4'>Loading...</label><br/>
						<b><label>End:&nbsp;</label></b><label id='end4'>Loading...</label><br/>
						<b><label>Start Save:&nbsp;</label></b><label id='startsave4'>Loading...</label><br/>
						<b><label>End Save:&nbsp;</label></b><label id='endsave4'>Loading...</label><br/>
					</td>
				</tr>
				<tr>
					<td><button id="b1" onClick={this.load} value="1">Button 1</button></td>
					<td><button id="b2" onClick={this.load} value="2">Button 2</button></td>
				</tr>
				<tr>
					<td><button id="b3" onClick={this.load} value="3">Button 3</button></td>
					<td><button id="b4" onClick={this.load} value="4">Button 4</button></td>
				</tr>
			</table>
			</div>
		);
	}
}

ReactDOM.render(
  <Upload />,
  document.getElementById('root')
);
