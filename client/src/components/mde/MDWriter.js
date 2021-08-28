import { useMemo, useEffect } from 'react'
import { BaseURL, ServerPort } from 'constants/AddressConstant'
import SimpleMDE from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css";
import { useSelector, useDispatch } from "react-redux";
import { setContents } from 'store/store'

// let flag = true;

const pattern1 = /^!\[\]\(/;
const pattern2 = /\)$/;

const resizeImage = { 
    name : "custom" , 
    action : (editor) => {
        var cm = editor.codemirror;
        var output = '';
        var selectedText = cm.getSelection();
        var text = selectedText.replace(pattern1, "").replace(pattern2,"");
        output = '<figure>\n\t<img src="'+text+'" alt="" title="" width="100%"/>\n\t<figcaption></figcaption>\n</figure>';
        cm.replaceSelection(output);
    },
    className :"fa fa-file-image-o" , 
    title : "Resize Image Helper" , 
};

const MDWriter = ({pdata}) => {
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
    const optionsWriteMode = useMemo(() => {
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
        imageMaxSize: 1024*1024*50,
        imageUploadEndpoint: BaseURL + ServerPort + "/upload/postImg",
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

    const optionsEditMode = useMemo(() => {
        return {
        autofocus: false,
        spellChecker: false,
        lineWrapping : true,
        renderingConfig: {
            singleLineBreaks: false,
        },
        autosave: {
            enabled: false,
            delay,
        },
        onToggleFullScreen: function(fullScreen) {
            return setOverflow(fullScreen);
        },
        uploadImage: false,
        imageMaxSize: 1024*1024*50,
        imageUploadEndpoint: BaseURL + ServerPort + "/upload/postImg",
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
        if(pdata === null){
            // write mode
            const autosavedValue = localStorage.getItem(`smde_autoSaving`);
            dispatch(setContents(autosavedValue));
        } else {
            // edit mode
            const autosavedValue = pdata.contents;
            dispatch(setContents(autosavedValue));
        }
    },[pdata,dispatch]);

    return (
        <>
        {pdata === null ? 
            <SimpleMDE 
            options={optionsWriteMode}
            value={contents}
            onChange={updateContents}
            />
        :
            <SimpleMDE 
            options={optionsEditMode}
            value={contents}
            onChange={updateContents}
            />
        }
        </>
    )
}

export default MDWriter;