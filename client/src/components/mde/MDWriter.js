import { useMemo, useEffect } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css";
import { useSelector, useDispatch } from "react-redux";
import { setContents } from 'store/store'

let flag = true;

const pattern1 = /^!\[\]\(/;
const pattern2 = /\)$/;

const resizeImage = { 
    name : "custom" , 
    action : (editor) => {
        var cm = editor.codemirror;
        var output = '';
        var selectedText = cm.getSelection();
        var text = selectedText.replace(pattern1, "").replace(pattern2,"");
        output = '<img src="'+text+'" width="100%"/>';
        cm.replaceSelection(output);
    },
    className :"fa fa-file-image-o" , 
    title : "Resize Image Helper" , 
};

const MDWriter = () => {
    const contents = useSelector(state => state.post.contents);
    const dispatch = useDispatch();

    const updateContents = (val) => {
        dispatch(setContents(val));
    }

    const setOverflow = (fullScreen) => {
        if(fullScreen){
            const html = document.getElementsByTagName('html')[0];
            const body =  html.getElementsByTagName('body')[0];
            html.style.overflow='visible';
            body.style.overflow='visible';
        }
    }
    
    const delay = 1000;
    const options = useMemo(() => {
        return {
        autofocus: false,
        spellChecker: false,
        lineWrapping : false,
        renderingConfig: {
            singleLineBreaks: false,
        },
        autosave: {
            enabled: true,
            uniqueId: "autoSaving",
            delay,
        },
        onToggleFullScreen: function(fullScreen) {
            return setOverflow(fullScreen);
        },
        uploadImage: false,
        imageUploadEndpoint: "http://wjk.ddns.net:5000/upload/postImg",
        imagePathAbsolute: true,
        hideIcons: ['image'],
        showIcons: [
            "quote", 
            "strikethrough",
            "code",
            "table",
            "redo",
            "undo",
            "clean-block",
            "horizontal-rule",
            "upload-image",
        ],
        toolbar: [ "bold", "italic", "strikethrough", "heading", "|",
                   "code", "quote", "unordered-list", "ordered-list", "clean-block", "|",
                   "link","upload-image", resizeImage, "table", "horizontal-rule", "|",
                   "preview", "side-by-side", "fullscreen", "|",
                   "guide", "|",
                   "undo", "redo",
        ]
    };
    }, [delay]);

    useEffect(() => {
        if(flag){
            const autosavedValue = localStorage.getItem(`smde_autoSaving`);
            dispatch(setContents(autosavedValue));
            flag = false;
        }
    });

    return (
        <SimpleMDE 
        options={options}
        value={contents}
        onChange={updateContents}
        />
    )
}

export default MDWriter;