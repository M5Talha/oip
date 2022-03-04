export default function getText(text){
    if(text.indexOf('<p>'!=-1)){
        const startIndex=text.indexOf('>');
    const LastIndex=text.lastIndexOf('<')
    const onlyText=text.slice(startIndex+1,LastIndex)
    return onlyText
    }else{
        return text
    }

    
}