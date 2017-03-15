<?php
/**
<p>
Javascript to handle json from an action.
</p>
<p>
Post a form with id edit_save to /editor/edit and handle the json response.
</p>
#code-javascript# 
onclick: "$.post('/editor/edit', $('#edit_save').serialize()).done(function(data) { PluginWfCallbackjson.call( data ); });return false;"
#code#
<p>
Response from any plugin could be like this.
</p>
#code-php#
$json = array('success' => false, 'alert' => array('An error occure.'));
exit(json_encode($json));
#code#
#code-javascript# 
#load:[app_dir]/plugin/[plugin]/public/PluginWfCallbackjson.js:load#
#code#
 *  */
class PluginWfCallbackjson{
  /**
  Including js resource in html/head section.
  #code-yml# 
  type: widget
  data:
    plugin: 'wf/callbackjson'
    method: include
  #code#
    */
  public static function widget_include(){
    $element = wfDocument::createHtmlElement('script', null, array('src' => '/plugin/wf/callbackjson/PluginWfCallbackjson.js?t='.wfFilesystem::getFiletime(wfArray::get($GLOBALS, 'sys/app_dir').'/plugin/wf/callbackjson/public/PluginWfCallbackjson.js')));
    wfDocument::renderElement(array($element));
  }
  
  
}