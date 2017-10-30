var moment = require('moment');
// var lodash = require('lodash');

export const fn = ({ term, display }) => {
  // Put your plugin code here
  if(term === "sat"){
    display({
      title: `You've entered ${term} hi carlo`
    });
  }
};


function getStaturdayList(length){
  var now = moment();
  var index = 0;
  var stat_lists = [];
  if(length <= 0){
    return [];
  }
  while(index < length){
    isoWeekday = now.isoWeekday();
    if(isoWeekday == 6){
      stat_lists[stat_lists.length] = now.clone();
      index++;
    }
    now =  now.add(1, 'days');
  }
  return stat_lists;
}
