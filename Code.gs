var my_url="Initial value";
var spsheet= SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1GZr1yOOvi-R76HKKdFQy-6p204-ZgBy-rSuqix0OpC8/edit#gid=0');
var ssheet = spsheet.getSheets();
var sheet = ssheet[0];


function doGet(e) {
  
  if(e.parameter.row!=null && e.parameter.col!=null)
  {
    //var userProperties = PropertiesService.getUserProperties();
    //var newProperties = {col: 'Unpressed'};
    //userProperties.setProperties(newProperties);
 
  }
  else if(e.parameter.col!=null)
  {
    //--------------------------//
    /*
    //my_url=e.parameter.col;
    var userProperties = PropertiesService.getUserProperties();
    var newProperties = {col: e.parameter.col};
    userProperties.setProperties('col', 'hello');
    */
    //var np = e.parameter.col;
    //var sp = Session.getActiveUser().getEmail().toString();
    //tmp.pstn=sp;
    //var userProperties = PropertiesService.getUserProperties();
    //var newProperties = {col: sp};
    //userProperties.setProperties(newProperties);
    //----------------------------//
    
    
    var col=e.parameter.col;
    var name=e.parameter.name;
    
    var tmp = HtmlService.createTemplateFromFile("profile");
    var date1 = new Date();
    var date2 = Utilities.formatDate(date1, "GMT+5:30", "MM/dd/yyyy");
    tmp.date = date2;
    var row=0;
    //var sheet= SpreadsheetApp.getActiveSheet();
  
    var date_list = sheet.getRange(3, 1, sheet.getMaxRows(), 1).getValues();
    for(var i=0; i<date_list.length; i++)
    {
      if(date_list[i][0]==date2)
          {
          row=i+3;
          break;
          }
    }
  
    var weekly = 0;
    for(var i=1; i<=7; i++)
    {
    if(row-i>2)
    {
     var temp = Number(sheet.getRange(row-i, col).getValue());
     weekly = weekly+temp;
    }
    }
    
    var total= 0;
    var totl_col=sheet.getRange(3,col,sheet.getMaxRows(),1).getValues();
    for(var i=0; i<totl_col.length; i++)
    {
    total+=Number(totl_col[i][0]);
    }
    
    
    var phone = sheet.getRange(2, col).getValue();
    tmp.row=row;
    tmp.col=col;
    tmp.name=name;
    tmp.phone = phone;
    tmp.weekly=weekly;
    tmp.total=total;
    tmp.date = date2; 
    tmp.link = ScriptApp.getService().getUrl();
    
    
    var raw=tmp.evaluate();
    return raw.addMetaTag('viewport', 'width=device-width, initial-scale=1'); 
  }
  else
  {
     
    /* Publish as User code
    var sheet=SpreadsheetApp.create("mySheet");
    var id=sheet.getId();
    return ContentService.createTextOutput(JSON.stringify(id))
    .setMimeType(ContentService.MimeType.JSON);
    */
  
    
     //var sheet= SpreadsheetApp.getActiveSheet();
    
    //var ssheet = spsheet.getSheets();
    //var sheet = ssheet[0];
    //-----------------Colour To coloumns------------//
    
    var date1 = new Date();
    var date2 = Utilities.formatDate(date1, "GMT+5:30", "MM/dd/yyyy");
    var row=0;
    var date_list = sheet.getRange(3, 1, sheet.getMaxRows(), 1).getValues();
    for(var i=0; i<date_list.length; i++)
    {
      if(date_list[i][0]==date2)
          {
          row=i+3;
          break;
          }
    }
    
    
    var today_col = sheet.getRange(row, 1, 1, sheet.getMaxColumns()).getValues();
    var sum=0;
    for(var i=1;i<sheet.getMaxColumns(); i++)
    {
    var temp=Number(today_col[0][i]);
    sum += temp;
    }
   
    //--------------Colour To coloumns------------------//
    
   
    var list = sheet.getRange(1, 1, 1, sheet.getMaxColumns()).getValues();
    var htmlListArray = list.map(function(r){ 
      var html="";
      for(var i=1; i<sheet.getMaxColumns(); i++)
      {
        if(today_col[0][i]!="")
          html+='<tr><td class="success text-center">'+r[i]+'</td><td class="success text-center">'+today_col[0][i]+'</td><td class="success text-center"><a href="'+ ScriptApp.getService().getUrl()+'?col='+(i+1)+'&name='+r[i].toString()+'" target="_top"><button type="button" class="btn btn-info"><span class="glyphicon glyphicon-chevron-right"></span></button></a></td></tr>';
        else
          html+='<tr><td class="text-center">'+r[i]+'</td><td class="text-center">'+today_col[0][i]+'</td><td class="text-center"><a href="'+ ScriptApp.getService().getUrl()+'?col='+(i+1)+'&name='+r[i].toString()+'" target="_top"><button type="button" class="btn btn-info"><span class="glyphicon glyphicon-chevron-right"></span></button></a></td></tr>';
          
        //html += '<tr><td>'+"ID"+'</td><td>'+r[0]+'</td><td>'+"Amount"+'</td></tr>';
      }
     return html;
      //return  '<tr><td>'+"ID"+'</td><td>'+r[0]+'</td><td>'+"Amount"+'</td></tr>';
    }).join('');
    var tmp = HtmlService.createTemplateFromFile("page");
    tmp.list = htmlListArray;
    tmp.sum = sum;
    //tmp.url = PropertiesService.getUserProperties().getProperty('col');
    var raw=tmp.evaluate();
    return raw.addMetaTag('viewport', 'width=device-width, initial-scale=1');
    
    
  }
}


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function userClicked(userInfo){
   //var sheet= SpreadsheetApp.getActiveSheet();
 
   var done = sheet.getRange(Number(userInfo.row), Number(userInfo.col)).setValue(userInfo.val);
   //var urlString= "https://wa.me/+91"+userInfo.phone+"?text=Collected+"+userInfo.val+"+rupees+today.+Collected+"+userInfo.weekly+"rupees+in+last+7+days.+Total+Collection+up+to+yesterday+is+"+userInfo.total+"Rupees.+Thank+You+ধন্যবাদ.";
   var urlString= "https://wa.me/+91"+userInfo.phone+"?text=আজি+আপোনাৰ+পৰা+"+userInfo.val+"+টকা+জমা+লোৱা+হ'ল।+ধন্যবাদ।+-+ইতি+প্ৰশান্ত+শৰ্মা";
   var encoded=(urlString);
   //Logger.log(encoded);
   return encoded;
   //encodeURIComponent
   //Logger.log(userInfo);
   //Logger.log(userInfo.row, userInfo.col, userInfo.val);
   //Logger.log(userInfo.val);
}

function userClicked2(userInfo){
   //var sheet= SpreadsheetApp.getActiveSheet();
   //var urlString= "sms:+91"+userInfo.phone+"?body=Collected+"+userInfo.val+"+rupees+today.+Collected+"+userInfo.weekly+"rupees+in+last+7+days.+Total+Collection+up+to+yesterday+is+"+userInfo.total+"Rupees.+Thank+You.+ধন্যবাদ";
   var urlString= "sms:+91"+userInfo.phone+"?body=আজি+আপোনাৰ+পৰা+"+userInfo.val+"+টকা+জমা+লোৱা+হ'ল।+ধন্যবাদ।+-+ইতি+প্ৰশান্ত+শৰ্মা";
   var encoded=(urlString);
   Logger.log(encoded);
   return encoded;
   //encodeURIComponent
   //Logger.log(userInfo);
   //Logger.log(userInfo.row, userInfo.col, userInfo.val);
   //Logger.log(userInfo.val);
}


function doSomething() {
  Logger.log('I was called!');
}





