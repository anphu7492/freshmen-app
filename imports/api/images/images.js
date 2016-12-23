import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/factory';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

var imageStore = new FS.Store.GridFS('images');

export const Images = new FS.Collection('images', {
 stores: [imageStore]
});

console.log("created imagestore");

Images.deny({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 },
 download: function(){
 return false;
 }
 });

Images.allow({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 },
 download: function(){
 return true;
 }
});
