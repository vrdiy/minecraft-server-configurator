
import { BooleanProperty,IntegerProperty,OptionProperty,StringProperty } from './Property';
import {ImportButton, ExportButton} from './Buttons';


function importServerProperties(){
    const importedFiles = document.getElementById("importServerPropertiesFile").files;
    const defServerProps = DefaultServerProperties();
    for (let i = 0; i < importedFiles.length; i++){
      
      const fileName = importedFiles[i].name;
  
      if (fileName === "server.properties"){
        const reader = new FileReader();
        reader.onload = () =>{
          // Load values from server.properties into fields
          const lines = reader.result.split('\r\n');
          lines.forEach(doThing);
          function doThing(val){
            const propertyName = val.split('=')[0];
            var propertyValue = val.split('=')[1];
  
            var element = document.getElementById(propertyName);
            if (element === null){
              //console.log(`null property: ${propertyName}`);
            }
            else{
              if (propertyValue === "true"){
                propertyValue=true; 
                element.checked = true;
              }
              if (propertyValue === "false"){
                propertyValue=false;
                element.checked = false;
              }
              if (propertyValue != defServerProps[propertyName]){
                element.parentElement.classList.add('non-default');
              }
              else{
                element.parentElement.classList.remove('non-default');
              }
              element.value = propertyValue;
            }
          }
          document.getElementById("importForm").reset();
        }
        reader.readAsText(importedFiles[i]);
      }
    }
}
export function exportServerProperties(){
    const propertiesDict = {};
    const propertyElements = document.getElementsByClassName('sPropertyField');
    
    // Export server.properties
    for (let i = 0; i < propertyElements.length; i++){
      const elem = propertyElements.item(i);
      var elemValue = elem.value;
      if (elem.type === 'checkbox'){
        elemValue = elem.checked;
      }
      propertiesDict[elem.id] = elemValue;
    }
    var propertiesToExport = '';
    propertiesToExport = propertiesToExport.concat("# Config Exported from Minecraft Server Configurator\n");
    propertiesToExport = propertiesToExport.concat(`# ${new Date().toLocaleString()}\n`);
    for (const [key, value] of Object.entries(propertiesDict)){
      propertiesToExport = propertiesToExport.concat(`${key.toString()}=${value.toString()}\r\n`);
    }
    console.log(propertiesToExport);
    const downloadURL = window.URL.createObjectURL(new Blob([propertiesToExport], {type: 'text/plain'}));
    var download = document.createElement('a');
    download.href = downloadURL;
    download.download = 'server.properties';
    download.click();

    // Export server-icon
    
  }
export function DefaultServerProperties(){
    const defaultServerProps = {};
    defaultServerProps["allow-flight"] = false;
    defaultServerProps["allow-nether"] = true;
    defaultServerProps["broadcast-console-to-ops"] = true;
    defaultServerProps["broadcast-rcon-to-ops"] = true;
    defaultServerProps["difficulty"] = 'easy';
    defaultServerProps["enable-command-block"] = false;
    defaultServerProps["enable-jmx-monitoring"] = false;
    defaultServerProps["enable-rcon"] = false;
    defaultServerProps["enable-status"] = true;
    defaultServerProps["enable-query"] = false;
    defaultServerProps["enforce-secure-profile"] = true;
    defaultServerProps["enforce-whitelist"] = false;
    defaultServerProps["entity-broadcast-range-percentage"] = 100;
    defaultServerProps["force-gamemode"] = false;
    defaultServerProps["function-permission-level"] = 2;
    defaultServerProps["gamemode"] = 'survival';
    defaultServerProps["generate-structures"] = true;
    defaultServerProps["generator-settings"] = "{}";
    defaultServerProps["hardcore"] = false;
    defaultServerProps["hide-online-players"] = false;
    defaultServerProps["initial-disabled-packs"] = '';
    defaultServerProps["initial-enabled-packs"] = 'vanilla';
    defaultServerProps["level-name"] = 'world';
    defaultServerProps["level-seed"] = '';
    defaultServerProps["level-type"] = 'minecraft\\:normal';
    defaultServerProps["max-chained-neighbor-updates"] = 1000000;
    defaultServerProps["max-players"] = 20;
    defaultServerProps["max-tick-time"] = 60000;
    defaultServerProps["max-world-size"] = 29999984;
    defaultServerProps["motd"] = 'A Minecraft Server';
    defaultServerProps["network-compression-threshold"] = 256;
    defaultServerProps["online-mode"] = true;
    defaultServerProps["op-permission-level"] = 4;
    defaultServerProps["player-idle-timeout"] = 0;
    defaultServerProps["prevent-proxy-connections"] = false;
    defaultServerProps["previews-chat"] = false;
    defaultServerProps["pvp"] = true;
    defaultServerProps["query.port"] = 25565;
    defaultServerProps["rate-limit"] = 0;
    defaultServerProps["rcon.password"] = '';
    defaultServerProps["rcon.port"] = 25575;
    defaultServerProps["resource-pack"] = '';
    defaultServerProps["resource-pack-prompt"] = '';
    defaultServerProps["resource-pack-sha1"] = '';
    defaultServerProps["require-resource-pack"] = false;
    defaultServerProps["server-ip"] = '';
    defaultServerProps["server-port"] = 25565;
    defaultServerProps["simulation-distance"] = 10;
    defaultServerProps["snooper-enabled"] = true;
    defaultServerProps["spawn-animals"] = true;
    defaultServerProps["spawn-monsters"] = true;
    defaultServerProps["spawn-npcs"] = true;
    defaultServerProps["spawn-protection"] = 16;
    defaultServerProps["sync-chunk-writes"] = true;
    defaultServerProps["text-filtering-config"] = '';
    defaultServerProps["use-native-transport"] = true;
    defaultServerProps["view-distance"] = 10;
    defaultServerProps["white-list"] = false;
    return defaultServerProps;
}
export default function ServerProperties(){
    const props = DefaultServerProperties();
    return (
        <div id="ServerProperties">
            <h2 id="serverPropertiesFileNameBanner">server.properties</h2>
            <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
              <form id="importForm">
                <ImportButton importFunction={importServerProperties} id="importServerPropertiesFile"/>
              </form>
                <ExportButton exportFunction={exportServerProperties} id="exportServerPropertiesFile"/>
            </div>
          
            <ul id="PropertyList">

            <BooleanProperty name={"allow-flight"} defaultValue={props["allow-flight"]}/>
            <BooleanProperty name={"allow-nether"} defaultValue={props["allow-nether"]}/>
            <BooleanProperty name={"broadcast-console-to-ops"} defaultValue={props["broadcast-console-to-ops"]}/>
            <BooleanProperty name={"broadcast-rcon-to-ops"} defaultValue={props["broadcast-rcon-to-ops"]}/>
            <OptionProperty name={"difficulty"} defaultValue={props["difficulty"]} 
                options={['peaceful','easy','normal','hard']}/>
            <BooleanProperty name={"enable-command-block"} defaultValue={props["enable-command-block"]}/>
            <BooleanProperty name={"enable-jmx-monitoring"} defaultValue={props["enable-jmx-monitoring"]}/>
            <BooleanProperty name={"enable-rcon"} defaultValue={props["enable-rcon"]}/>
            <BooleanProperty name={"enable-status"} defaultValue={props["enable-status"]}/>
            <BooleanProperty name={"enable-query"} defaultValue={props["enable-query"]}/>
            <BooleanProperty name={"enforce-secure-profile"} defaultValue={props["enforce-secure-profile"]}/>
            <BooleanProperty name={"enforce-whitelist"} defaultValue={props["enforce-whitelist"]}/>
            <IntegerProperty name={"entity-broadcast-range-percentage"} 
                min={10}
                max={1000}
                defaultValue={props["entity-broadcast-range-percentage"]}/>
            <BooleanProperty name={"force-gamemode"} defaultValue={props["force-gamemode"]}/>
            <IntegerProperty name={"function-permission-level"} 
                min={1}
                max={4}
                defaultValue={props["function-permission-level"]}/>
            <OptionProperty name={"gamemode"} defaultValue={props["gamemode"]} 
                options={['survival','creative','adventure','spectator']}/>
            <BooleanProperty name={"generate-structures"} defaultValue={props["generate-structures"]}/>
            <StringProperty name={"generator-settings"} defaultValue={props["generator-settings"]}/>
            <BooleanProperty name={"hardcore"} defaultValue={props["hardcore"]}/>
            <BooleanProperty name={"hide-online-players"} defaultValue={props["hide-online-players"]}/>
            <StringProperty name={"initial-disabled-packs"} defaultValue={props["initial-disabled-packs"]}/>
            <StringProperty name={"initial-enabled-packs"} defaultValue={props["initial-enabled-packs"]}/>
            <StringProperty name={"level-name"} defaultValue={props["level-name"]}/>
            <StringProperty name={"level-seed"} defaultValue={props["level-seed"]}/>
            <OptionProperty name={"level-type"} defaultValue={props["level-type"]}
                options={['minecraft\\:normal','minecraft\\:flat','minecraft\\:large_biomes','minecraft\\:amplified','minecraft\\:single_biome_surface']}/>
            <IntegerProperty name={"max-chained-neighbor-updates"} min={null} max={null} defaultValue={props["max-chained-neighbor-updates"]}/>
            <IntegerProperty name={"max-players"} min={0} max={(2**31 - 1)} defaultValue={props["max-players"]}/>
            <IntegerProperty name={"max-tick-time"} min={-1} max={(2**63 - 1)} defaultValue={props["max-tick-time"]}/>
            <IntegerProperty name={"max-world-size"} min={1} max={29999984} defaultValue={props["max-world-size"]}/>
            <StringProperty name={"motd"} defaultValue={props["motd"]}/>
            <IntegerProperty name={"network-compression-threshold"} min={-1} max={1500} defaultValue={props["network-compression-threshold"]}/>
            <BooleanProperty name={"online-mode"} defaultValue={props["online-mode"]}/>
            <IntegerProperty name={"op-permission-level"} min={0} max={4} defaultValue={props["op-permission-level"]}/>
            <IntegerProperty name={"player-idle-timeout"} min={0} max={null} defaultValue={props["player-idle-timeout"]}/>
            <BooleanProperty name={"prevent-proxy-connections"} defaultValue={props["prevent-proxy-connections"]}/>
            <BooleanProperty name={"previews-chat"} defaultValue={props["previews-chat"]}/>
            <BooleanProperty name={"pvp"} defaultValue={props["pvp"]}/>
            <IntegerProperty name={"query.port"} min={1} max={(2**16 - 2)} defaultValue={props["query.port"]}/>
            <IntegerProperty name={"rate-limit"} min={0} max={null} defaultValue={props["rate-limit"]}/>
            <StringProperty name={"rcon.password"} defaultValue={props["rcon.password"]}/>
            <IntegerProperty name={"rcon.port"} min={1} max={(2**16 - 2)} defaultValue={props["rcon.port"]}/>
            <StringProperty name={"resource-pack"} defaultValue={props["resource-pack"]}/>
            <StringProperty name={"resource-pack-prompt"} defaultValue={props["resource-pack-prompt"]}/>
            <StringProperty name={"resource-pack-sha1"} defaultValue={props["resource-pack-sha1"]}/>
            <BooleanProperty name={"require-resource-pack"} defaultValue={props["require-resource-pack"]}/>
            <StringProperty name={"server-ip"} defaultValue={props["server-ip"]}/>
            <IntegerProperty name={"server-port"} min={1} max={(2**16 - 2)} defaultValue={props["server-port"]}/>
            <IntegerProperty name={"simulation-distance"} min={3} max={32} defaultValue={props["simulation-distance"]}/>
            <BooleanProperty name={"snooper-enabled"} defaultValue={props["snooper-enabled"]}/>
            <BooleanProperty name={"spawn-animals"} defaultValue={props["spawn-animals"]}/>
            <BooleanProperty name={"spawn-monsters"} defaultValue={props["spawn-monsters"]}/>
            <BooleanProperty name={"spawn-npcs"} defaultValue={props["spawn-npcs"]}/>
            <IntegerProperty name={"spawn-protection"} min={0} max={null} defaultValue={props["spawn-protection"]}/>
            <BooleanProperty name={"sync-chunk-writes"} defaultValue={props["sync-chunk-writes"]}/>
            <StringProperty name={"text-filtering-config"} defaultValue={props["text-filtering-config"]}/>
            <BooleanProperty name={"use-native-transport"} defaultValue={props["use-native-transport"]}/>
            <IntegerProperty name={"view-distance"} min={3} max={32} defaultValue={props["view-distance"]}/>
            <BooleanProperty name={"white-list"} defaultValue={props["white-list"]}/>
            </ul>
        </div>
    )
    
}
