
async function generateMetadata(){
const key=document.getElementById('apiKey').value;
const file=document.getElementById('image').files[0];
if(!key || !file){alert('API key and image required');return;}

const reader=new FileReader();
reader.onload=async ()=>{
const base64=reader.result.split(',')[1];

const body={
contents:[{
parts:[
{text:"Create stock image title, description and 50 keywords."},
{inline_data:{mime_type:file.type,data:base64}}
]
}]
};

const res=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify(body)
});

const data=await res.json();
document.getElementById('output').value=
data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
};
reader.readAsDataURL(file);
}
