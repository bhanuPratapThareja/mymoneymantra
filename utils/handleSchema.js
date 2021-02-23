export const addSchemaScript = (schema,id) =>{
   if(schema){
    const script  = document.createElement('script')
    script.type = "application/json"
    script.id = id
    script.append(schema)
    const head  = document.querySelector('head')
    head.appendChild(script)
   return id
   }
}

export const removeSchemaScript = id =>{
    var script = document.getElementById(id);
    script.parentNode.removeChild(script);
    
}

export const createLearnMoreSchema = () =>{
    
}