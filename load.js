/**
 * Created by narendra on 11/1/15.
 */



var socket = io('http://localhost');

function render(){
  document.getElementById("log").innerHTML = JSON.stringify(shared);
};


SyncLib.start(socket, function () {
  //On Change of Shared Variable
  render();
});

//
//var a = {
//  name: "Narendra Sisodiya",
//  id:"23465436fssdfg",
//  persons: [{name:"rahul"}, {name:"pinki"}],
//  products: [
//    {
//      title: "a",
//      price:34
//    },
//    {
//      title: "b",
//      price:12
//    }
//  ]
//};
//
//sightglass.adapters = rivets.adapters;
//sightglass.root = '.';
//
//sightglass(a, "persons", function () {
//  console.log(arguments);
//  document.getElementById("log").innerHTML = "Sending XHR call to update a.name -><br/>" +
// 'util.ajax("/update/person/' + a.id + '", {name:"'+a.name+'"})'; });  //window.setTimeout(function () { //
// alert("Ohh, we have received Some data from socket.io"); //  a.name = "James Bond"; //  //TODO - updating a.name
// this way should not generate additional XHR call ! //}, 6000);  rivets.bind(document.getElementById("myComponent"),
// { scope: a });