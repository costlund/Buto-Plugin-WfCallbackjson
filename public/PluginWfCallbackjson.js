/**
 * Class to handle json response.
 */
function plugin_wf_callbackjson(){
  /**
   * Call function from any source.
   * @param {type} json
   * @returns {Boolean}
   */
  this.call = function(json){
    try {
      json = JSON.parse(json);
    } catch (e) {
      console.log('Bad json in PluginWfCallbackjson.js.');
      return false;
    }
    // Handler if success is true...
    if(json.success && json.success == true){
    }
    /**
     * PluginBootstrapAlertwait
     */
    if(typeof PluginBootstrapAlertwait == 'object'){
      PluginBootstrapAlertwait.close();
    }
    //Alert.
    if(json.alert){
      for(var i = 0; i<json.alert.length; i++){
        alert(json.alert[i]);
      }
    }
    //Reload page.
    if(json.reload){
      location.reload();
    }
    //Remove.
    if(json.remove && typeof PluginWfDom  == 'object'){
      for(var i = 0; i<json.remove.length; i++){
        PluginWfDom.remove(json.remove[i]);
      }
    }
    //Update.
    if(json.update){
      for(var i = 0; i<json.update.length; i++){
        if(typeof PluginWfAjax == 'object'){
          PluginWfAjax.update(json.update[i]);
        }
      }
    }
    //Click.
    if(json.click){
      for(var i = 0; i<json.click.length; i++){
        document.getElementById(json.click[i]).click();
      }
    }
    //Script.
    if(json.script){
      for(var i = 0; i<json.script.length; i++){
        eval(json.script[i]);
      }
    }
    return null; 
  }
  /**
   * Method to post to div.
   * @param string id
   * @param string url
   * @param string form_id
   * @returns null;
   */
  this.setElement = function(id, url, form_id){
    /**
     * Show loading gif.
     */
    if(document.getElementById(id)){
      document.getElementById(id).innerHTML='<img style="margin:10px;" src="/plugin/wf/ajax/loading.gif">';
    }
    /**
     * Ajax request.
     */
    $.post(url, $('#'+form_id).serialize()).done(function(data){
      document.getElementById(id).innerHTML = data;
      /**
       * Eval script.
       */
      var scripts = document.getElementById(id).getElementsByTagName('script');
      for (var i=0;i<scripts.length;i++) {
        eval(scripts[i].innerHTML);
      }
    });
    return null;
  }
}
var PluginWfCallbackjson = new plugin_wf_callbackjson();