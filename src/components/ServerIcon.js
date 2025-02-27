
import './ServerIcon.css';
import {ExportButton, ImportButton} from './Buttons';
function getServerIcon(){
    const userImage = document.getElementById("importServerIcon").files[0];
    if (userImage == null){
      console.log("no images selected");
      return;
    }
    if (!userImage.type.startsWith("image/")){
      console.log("user selected non-image");
      return;
    }
    
    const previewImage = document.getElementById("previewImage");
    previewImage.id = "previewImage";

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      previewImage.src = e.target.result;
    };
    fileReader.readAsDataURL(userImage);
  }
  async function exportServerIcon(){
    const serverIcon = document.getElementById('previewImage');
    const offscreen = new OffscreenCanvas(
      64,
      64,
    )
    const ctx = offscreen.getContext('2d')
    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      serverIcon,
      0,
      0,
      serverIcon.naturalWidth,
      serverIcon.naturalHeight,
      0,
      0,
      64,
      64
    )
    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    })
    const anchor = document.createElement('a');
    const downloadURL = URL.createObjectURL(new Blob([blob]))
    anchor.href = downloadURL;
    anchor.download = 'server-icon.png';
    anchor.click();
    return;
  }
  export default function ServerIcon({icon}){ 
      
    return (
        <div id="ServerIcon">
        <h2 id="serverIconFileNameBanner">server-icon.png</h2>
        <div style={{display:'flex',width:'100%',justifyContent:'space-between',marginBottom:'16px'}}>
                <ImportButton importFunction={getServerIcon} id={'importServerIcon'}/>
                <ExportButton exportFunction={exportServerIcon} id={'exportServerIcon'}/>
              </div>
            <img id="previewImage" src={icon} alt="preview"/>
            
        </div>
    )
}